import { NextRequest, NextResponse } from 'next/server'
import { crearQueja, obtenerQuejaPorCodigo, type CrearQuejaData } from '@/lib/supabase/quejas'

// GET /api/quejas?codigo=QR-2026-0001 — Consulta pública de estado por código
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const codigo = searchParams.get('codigo')

    if (!codigo) {
        return NextResponse.json({ error: 'Parámetro código requerido' }, { status: 400 })
    }

    try {
        const queja = await obtenerQuejaPorCodigo(codigo)
        if (!queja) {
            return NextResponse.json({ data: null }, { status: 200 })
        }

        // Solo devolver campos públicos (sin info sensible interna)
        return NextResponse.json({
            data: {
                que_rec_cod_registro_vac: queja.que_rec_cod_registro_vac,
                que_rec_tipo_vac: queja.que_rec_tipo_vac,
                que_rec_estado_vac: queja.que_rec_estado_vac,
                que_rec_fec_limite_dt: queja.que_rec_fec_limite_dt,
                que_rec_responsable_vac: queja.que_rec_responsable_vac,
                que_rec_respuesta_cliente_vac: queja.que_rec_respuesta_cliente_vac,
                que_rec_created_at_dt: queja.que_rec_created_at_dt,
            },
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// POST /api/quejas — Registro público de queja/reclamo
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validación básica
        if (!body.nombre || !body.email || !body.descripcion || !body.tipo) {
            return NextResponse.json(
                { error: 'Campos requeridos: nombre, email, descripcion, tipo' },
                { status: 400 }
            )
        }

        if (!['queja', 'reclamo'].includes(body.tipo)) {
            return NextResponse.json({ error: 'Tipo debe ser queja o reclamo' }, { status: 400 })
        }

        const quejaData: CrearQuejaData = {
            tipo: body.tipo,
            canal: 'web',
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            tipo_documento: body.tipo_documento,
            num_documento: body.num_documento,
            direccion: body.direccion,
            padre_madre: body.padre_madre,
            area_afectada: body.area_afectada,
            tipo_bien: body.tipo_bien,
            servicio_producto: body.servicio_producto,
            monto_reclamado: body.monto_reclamado,
            descripcion: body.descripcion,
            pedido_reclam: body.pedido_reclam,
        }

        const nueva = await crearQueja(quejaData)

        // Intentar enviar correo de confirmación (no bloqueante)
        try {
            await fetch(`${request.nextUrl.origin}/api/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: body.email,
                    subject: `AS Laboratorios — Confirmación de ${body.tipo}: ${nueva.que_rec_cod_registro_vac}`,
                    html: buildAcuseHtml(nueva, body.tipo),
                }),
            })
        } catch {
            // No bloquear la respuesta si el correo falla
        }

        return NextResponse.json({
            success: true,
            codigo: nueva.que_rec_cod_registro_vac,
            id: nueva.que_rec_id_int,
        })
    } catch (error: any) {
        console.error('Error registrando queja:', error)
        return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 })
    }
}

function buildAcuseHtml(queja: any, tipo: string): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#1b5e20;padding:28px 40px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">AS Laboratorios</h1>
            <p style="color:#a5d6a7;margin:4px 0 0;font-size:13px;">Confirmación de ${tipo === 'reclamo' ? 'Reclamo' : 'Queja'}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="color:#333;font-size:15px;margin:0 0 20px;">Estimado/a <strong>${queja.que_rec_nom_vac}</strong>,</p>
            <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Hemos recibido correctamente tu ${tipo}. A continuación encontrarás el código de seguimiento para consultar el estado en cualquier momento.
            </p>
            <!-- Código -->
            <div style="background:#f8f8f8;border:2px solid #e0e0e0;border-radius:8px;padding:20px;text-align:center;margin:0 0 24px;">
              <p style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Código de seguimiento</p>
              <p style="color:#111;font-size:28px;font-family:monospace;font-weight:700;margin:0;letter-spacing:4px;">
                ${queja.que_rec_cod_registro_vac}
              </p>
            </div>
            <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 16px;">
              De acuerdo con nuestra política interna (PSG3.1) y el <strong>Código de Protección y Defensa del Consumidor (Ley N.° 29571)</strong>, 
              recibirás una respuesta en un plazo máximo de <strong>15 días hábiles</strong>.
            </p>
            <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Puedes consultar el estado de tu ${tipo} en:<br>
              <a href="https://aslaboratorios.com/libro-de-reclamaciones" style="color:#2e7d32;font-weight:600;">
                aslaboratorios.com/libro-de-reclamaciones
              </a>
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
            <p style="color:#999;font-size:12px;margin:0;">
              Este correo es una confirmación automática. Si tienes alguna consulta adicional, 
              puedes contactarnos en <a href="mailto:ventas@aslaboratorios.com" style="color:#2e7d32;">ventas@aslaboratorios.com</a> 
              o al +51 961 996 645.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;padding:16px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="color:#bbb;font-size:11px;margin:0;">
              AS Laboratorios · MZ J1 San Isidro II Etapa, Trujillo, La Libertad, Perú
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`
}
