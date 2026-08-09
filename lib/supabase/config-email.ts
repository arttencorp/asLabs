import { supabase } from './client'

// ============================================================
// MÓDULO DE CONFIGURACIÓN DE CORREOS SMTP
// ============================================================

export interface ConfigEmail {
    cfg_email_id_int: string
    cfg_email_nombre_vac: string
    cfg_email_host_vac: string
    cfg_email_port_int: number
    cfg_email_seguro_bol: boolean
    cfg_email_user_vac: string
    cfg_email_pass_vac: string
    cfg_email_from_vac: string
    cfg_email_predeter_bol: boolean
    cfg_email_activo_bol: boolean
    cfg_email_created_at_dt: string
    cfg_email_updated_at_dt: string
}

export async function obtenerConfigEmails(): Promise<ConfigEmail[]> {
    try {
        const { data, error } = await supabase
            .from('Config_Email')
            .select('*')
            .order('cfg_email_predeter_bol', { ascending: false })
            .order('cfg_email_created_at_dt', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo config emails:', error)
        throw error
    }
}

export async function obtenerEmailPredeterminado(): Promise<ConfigEmail | null> {
    try {
        const { data, error } = await supabase
            .from('Config_Email')
            .select('*')
            .eq('cfg_email_predeter_bol', true)
            .eq('cfg_email_activo_bol', true)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null
            throw error
        }
        return data
    } catch (error) {
        console.error('Error obteniendo email predeterminado:', error)
        throw error
    }
}

export async function crearConfigEmail(emailData: {
    nombre: string
    host: string
    port: number
    seguro: boolean
    usuario: string
    password: string
    from: string
    predeterminado?: boolean
    activo?: boolean
}): Promise<ConfigEmail> {
    try {
        // Si va a ser predeterminado, desactivar los demás antes
        if (emailData.predeterminado) {
            await supabase
                .from('Config_Email')
                .update({ cfg_email_predeter_bol: false })
                .eq('cfg_email_predeter_bol', true)
        }

        const { data, error } = await supabase
            .from('Config_Email')
            .insert({
                cfg_email_nombre_vac: emailData.nombre,
                cfg_email_host_vac: emailData.host,
                cfg_email_port_int: emailData.port,
                cfg_email_seguro_bol: emailData.seguro,
                cfg_email_user_vac: emailData.usuario,
                cfg_email_pass_vac: emailData.password,
                cfg_email_from_vac: emailData.from,
                cfg_email_predeter_bol: emailData.predeterminado || false,
                cfg_email_activo_bol: emailData.activo !== undefined ? emailData.activo : true,
            })
            .select('*')
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creando config email:', error)
        throw error
    }
}

export async function actualizarConfigEmail(
    id: string,
    emailData: Partial<{
        nombre: string
        host: string
        port: number
        seguro: boolean
        usuario: string
        password: string
        from: string
        predeterminado: boolean
        activo: boolean
    }>
): Promise<ConfigEmail> {
    try {
        const updatePayload: Record<string, unknown> = {
            cfg_email_updated_at_dt: new Date().toISOString(),
        }

        if (emailData.nombre !== undefined) updatePayload.cfg_email_nombre_vac = emailData.nombre
        if (emailData.host !== undefined) updatePayload.cfg_email_host_vac = emailData.host
        if (emailData.port !== undefined) updatePayload.cfg_email_port_int = emailData.port
        if (emailData.seguro !== undefined) updatePayload.cfg_email_seguro_bol = emailData.seguro
        if (emailData.usuario !== undefined) updatePayload.cfg_email_user_vac = emailData.usuario
        if (emailData.password !== undefined && emailData.password !== '') {
            updatePayload.cfg_email_pass_vac = emailData.password
        }
        if (emailData.from !== undefined) updatePayload.cfg_email_from_vac = emailData.from
        if (emailData.predeterminado !== undefined) updatePayload.cfg_email_predeter_bol = emailData.predeterminado
        if (emailData.activo !== undefined) updatePayload.cfg_email_activo_bol = emailData.activo

        // Si se establece como predeterminado, quitar a los demás
        if (emailData.predeterminado === true) {
            await supabase
                .from('Config_Email')
                .update({ cfg_email_predeter_bol: false })
                .neq('cfg_email_id_int', id)
        }

        const { data, error } = await supabase
            .from('Config_Email')
            .update(updatePayload)
            .eq('cfg_email_id_int', id)
            .select('*')
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando config email:', error)
        throw error
    }
}

export async function establecerEmailPredeterminado(id: string): Promise<void> {
    try {
        // Quitar predeterminado de todos
        await supabase
            .from('Config_Email')
            .update({ cfg_email_predeter_bol: false })
            .neq('cfg_email_id_int', 'none')

        // Establecer el nuevo predeterminado
        const { error } = await supabase
            .from('Config_Email')
            .update({ cfg_email_predeter_bol: true })
            .eq('cfg_email_id_int', id)

        if (error) throw error
    } catch (error) {
        console.error('Error estableciendo email predeterminado:', error)
        throw error
    }
}

export async function eliminarConfigEmail(id: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('Config_Email')
            .delete()
            .eq('cfg_email_id_int', id)

        if (error) throw error
    } catch (error) {
        console.error('Error eliminando config email:', error)
        throw error
    }
}
