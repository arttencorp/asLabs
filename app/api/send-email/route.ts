import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

// ============================================================
// API ROUTE — POST /api/send-email
// Envía un correo usando las credenciales SMTP configuradas en BD
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { to, subject, html, text, configEmailId } = body

        if (!to || !subject || (!html && !text)) {
            return NextResponse.json(
                { error: 'Faltan parámetros: to, subject y html/text son requeridos' },
                { status: 400 }
            )
        }

        // Obtener configuración SMTP desde Supabase
        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        let emailConfig: any = null

        if (configEmailId) {
            const { data, error } = await supabase
                .from('Config_Email')
                .select('*')
                .eq('cfg_email_id_int', configEmailId)
                .eq('cfg_email_activo_bol', true)
                .single()

            if (error || !data) {
                return NextResponse.json(
                    { error: 'Configuración de correo no encontrada o inactiva' },
                    { status: 404 }
                )
            }
            emailConfig = data
        } else {
            // Usar el predeterminado
            const { data, error } = await supabase
                .from('Config_Email')
                .select('*')
                .eq('cfg_email_predeter_bol', true)
                .eq('cfg_email_activo_bol', true)
                .single()

            if (error || !data) {
                return NextResponse.json(
                    { error: 'No hay una cuenta de correo predeterminada configurada. Configure una en Admin → Config. Correos.' },
                    { status: 404 }
                )
            }
            emailConfig = data
        }

        // Puerto 465 → SSL directo (secure: true)
        // Puerto 587 / 25 → STARTTLS (secure: false + requireTLS: true)
        const port = emailConfig.cfg_email_port_int
        const secure = port === 465

        // Crear transporter de Nodemailer
        const transporter = nodemailer.createTransport({
            host: emailConfig.cfg_email_host_vac,
            port,
            secure,
            auth: {
                user: emailConfig.cfg_email_user_vac,
                pass: emailConfig.cfg_email_pass_vac,
            },
            ...(secure
                ? { tls: { rejectUnauthorized: false } }
                : { requireTLS: true, tls: { rejectUnauthorized: false } }
            ),
        })

        // Enviar correo
        const info = await transporter.sendMail({
            from: emailConfig.cfg_email_from_vac,
            to: Array.isArray(to) ? to.join(', ') : to,
            subject,
            html: html || undefined,
            text: text || undefined,
        })

        return NextResponse.json({
            success: true,
            messageId: info.messageId,
            from: emailConfig.cfg_email_from_vac,
        })
    } catch (error: any) {
        console.error('Error enviando correo:', error)
        return NextResponse.json(
            { error: error.message || 'Error interno al enviar el correo' },
            { status: 500 }
        )
    }
}

// Endpoint para probar la conexión SMTP sin enviar un correo real
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { configEmailId } = body

        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        let emailConfig: any = null

        if (configEmailId) {
            const { data } = await supabase
                .from('Config_Email')
                .select('*')
                .eq('cfg_email_id_int', configEmailId)
                .single()
            emailConfig = data
        } else {
            const { data } = await supabase
                .from('Config_Email')
                .select('*')
                .eq('cfg_email_predeter_bol', true)
                .single()
            emailConfig = data
        }

        if (!emailConfig) {
            return NextResponse.json({ error: 'Configuración no encontrada' }, { status: 404 })
        }

        const port2 = emailConfig.cfg_email_port_int
        const secure2 = port2 === 465

        const transporter = nodemailer.createTransport({
            host: emailConfig.cfg_email_host_vac,
            port: port2,
            secure: secure2,
            auth: {
                user: emailConfig.cfg_email_user_vac,
                pass: emailConfig.cfg_email_pass_vac,
            },
            ...(secure2
                ? { tls: { rejectUnauthorized: false } }
                : { requireTLS: true, tls: { rejectUnauthorized: false } }
            ),
        })

        await transporter.verify()
        return NextResponse.json({ success: true, message: 'Conexión SMTP verificada correctamente' })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Error verificando conexión SMTP' },
            { status: 500 }
        )
    }
}
