import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { to, subject, queja, tipo, action, details } = body

        if (!to || !subject || !queja || !action) {
            return NextResponse.json(
                { error: 'Faltan parámetros: to, subject, queja y action son requeridos' },
                { status: 400 }
            )
        }

        const html = buildNotificationHtml(queja, tipo, action, details)

        const baseUrl = request.nextUrl.origin
        const response = await fetch(`${baseUrl}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to,
                subject,
                html,
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Error enviando correo')
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Error notificando cliente:', error)
        return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 })
    }
}

function buildNotificationHtml(queja: any, tipo: string, action: string, details: any): string {
    const nombre = queja.que_rec_nom_vac
    const codigo = queja.que_rec_cod_registro_vac

    let bodyContent = ''

    if (action === 'estado') {
        const { estadoLabel, nota } = details
        bodyContent = `
            <p style="color:#333;font-size:15px;margin:0 0 20px;">Estimado/a <strong>${nombre}</strong>,</p>
            <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Te informamos que el estado de tu ${tipo.toLowerCase()} con código de seguimiento <strong>${codigo}</strong> ha sido actualizado.
            </p>
            <div style="background:#f8f8f8;border:2px solid #e0e0e0;border-radius:8px;padding:20px;text-align:center;margin:0 0 24px;">
              <p style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Nuevo Estado</p>
              <p style="color:#2e7d32;font-size:24px;font-weight:700;margin:0;">
                ${estadoLabel}
              </p>
            </div>
            ${nota ? `<p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;"><strong>Nota adicional:</strong> ${nota}</p>` : ''}
        `
    } else if (action === 'resolucion') {
        const { respuestaCliente } = details
        bodyContent = `
            <p style="color:#333;font-size:15px;margin:0 0 20px;">Estimado/a <strong>${nombre}</strong>,</p>
            <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Te informamos que se ha emitido la resolución final para tu ${tipo.toLowerCase()} con código de seguimiento <strong>${codigo}</strong>.
            </p>
            <div style="background:#f0fdf4;border-left:4px solid #2e7d32;padding:20px;margin:0 0 24px;">
              <h3 style="color:#1b5e20;margin-top:0;font-size:16px;">Respuesta a tu caso:</h3>
              <p style="color:#333;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${respuestaCliente}</p>
            </div>
        `
    }

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
            <p style="color:#a5d6a7;margin:4px 0 0;font-size:13px;">Actualización de ${tipo}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${bodyContent}
            <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 24px;">
              Puedes consultar el detalle completo de tu caso en cualquier momento visitando:<br>
              <a href="https://aslaboratorios.com/libro-de-reclamaciones" style="color:#2e7d32;font-weight:600;">
                aslaboratorios.com/libro-de-reclamaciones
              </a>
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
            <p style="color:#999;font-size:12px;margin:0;">
              Este correo es una notificación automática. Si tienes alguna consulta adicional, 
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
