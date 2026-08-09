import { supabase, createAuthenticatedClient } from './client'

// ============================================================
// MÓDULO DE QUEJAS Y RECLAMOS — PSG3.1 / PSG3.2
// ============================================================

// Genera código único tipo QR-2026-0001
async function generarCodigoQueja(): Promise<string> {
    const year = new Date().getFullYear()
    const prefix = `QR-${year}-`

    const { data } = await supabase
        .from('Quejas_Reclamos')
        .select('que_rec_cod_registro_vac')
        .like('que_rec_cod_registro_vac', `${prefix}%`)
        .order('que_rec_cod_registro_vac', { ascending: false })
        .limit(1)

    let nextNum = 1
    if (data && data.length > 0) {
        const lastCode = data[0].que_rec_cod_registro_vac
        const lastNum = parseInt(lastCode.split('-').pop() || '0', 10)
        nextNum = lastNum + 1
    }

    return `${prefix}${String(nextNum).padStart(4, '0')}`
}

// Calcula fecha límite añadiendo días hábiles (lun-vie, sin feriados básicos)
function calcularFechaLimite(diasHabiles: number): Date {
    const fecha = new Date()
    let contador = 0
    while (contador < diasHabiles) {
        fecha.setDate(fecha.getDate() + 1)
        const dia = fecha.getDay()
        if (dia !== 0 && dia !== 6) contador++ // excluir sábado y domingo
    }
    return fecha
}

// ──────────────────────────────────────────────────────────
// LECTURA
// ──────────────────────────────────────────────────────────

export async function obtenerQuejas() {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .select('*')
            .order('que_rec_created_at_dt', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo quejas:', error)
        throw error
    }
}

export async function obtenerQuejaPorId(id: string) {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .select('*')
            .eq('que_rec_id_int', id)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error obteniendo queja por ID:', error)
        throw error
    }
}

export async function obtenerQuejaPorCodigo(codigo: string) {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .select('*')
            .eq('que_rec_cod_registro_vac', codigo.toUpperCase())
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null
            throw error
        }
        return data
    } catch (error) {
        console.error('Error obteniendo queja por código:', error)
        throw error
    }
}

export async function obtenerHistorialQueja(quejaId: string) {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos_Historial')
            .select('*')
            .eq('que_rec_id_int', quejaId)
            .order('que_hist_created_at_dt', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo historial:', error)
        throw error
    }
}

// ──────────────────────────────────────────────────────────
// CREACIÓN
// ──────────────────────────────────────────────────────────

export interface CrearQuejaData {
    tipo: 'queja' | 'reclamo'
    canal?: 'web' | 'presencial' | 'email' | 'whatsapp'
    nombre: string
    email: string
    telefono?: string
    tipo_documento?: string
    num_documento?: string
    direccion?: string
    padre_madre?: string
    area_afectada?: string
    tipo_bien?: 'producto' | 'servicio'
    servicio_producto?: string
    monto_reclamado?: number
    descripcion: string
    pedido_reclam?: string
    adjunto_url?: string
}

export async function crearQueja(quejaData: CrearQuejaData) {
    try {
        const codigo = await generarCodigoQueja()
        const fechaLimite = calcularFechaLimite(15)

        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .insert({
                que_rec_cod_registro_vac: codigo,
                que_rec_tipo_vac: quejaData.tipo,
                que_rec_canal_vac: quejaData.canal || 'web',
                que_rec_nom_vac: quejaData.nombre,
                que_rec_email_vac: quejaData.email,
                que_rec_telef_vac: quejaData.telefono || null,
                que_rec_tipo_doc_vac: quejaData.tipo_documento || null,
                que_rec_num_doc_vac: quejaData.num_documento || null,
                que_rec_direc_vac: quejaData.direccion || null,
                que_rec_padre_madre_vac: quejaData.padre_madre || null,
                que_rec_area_afect_vac: quejaData.area_afectada || null,
                que_rec_tipo_bien_vac: quejaData.tipo_bien || null,
                que_rec_serv_prod_vac: quejaData.servicio_producto || null,
                que_rec_monto_recla_num: quejaData.monto_reclamado || null,
                que_rec_desc_vac: quejaData.descripcion,
                que_rec_pedido_reclam_vac: quejaData.pedido_reclam || null,
                que_rec_adjunto_url_vac: quejaData.adjunto_url || null,
                que_rec_estado_vac: 'recibido',
                que_rec_fec_limite_dt: fechaLimite.toISOString(),
            })
            .select('*')
            .single()

        if (error) throw error

        // Insertar entrada inicial en historial
        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: data.que_rec_id_int,
            que_hist_accion_vac: 'creado',
            que_hist_desc_vac: `${quejaData.tipo === 'reclamo' ? 'Reclamo' : 'Queja'} registrado por ${quejaData.nombre} vía ${quejaData.canal || 'web'}.`,
            que_hist_estado_nuevo_vac: 'recibido',
        })

        return data
    } catch (error) {
        console.error('Error creando queja:', error)
        throw error
    }
}

// ──────────────────────────────────────────────────────────
// ACTUALIZACIÓN Y CAMBIO DE ESTADO
// ──────────────────────────────────────────────────────────

export async function cambiarEstadoQueja(
    id: string,
    nuevoEstado: string,
    nota: string,
    usuarioId?: string
) {
    try {
        // Obtener estado actual
        const { data: actual, error: fetchError } = await supabase
            .from('Quejas_Reclamos')
            .select('que_rec_estado_vac')
            .eq('que_rec_id_int', id)
            .single()

        if (fetchError) throw fetchError

        const estadoAnterior = actual.que_rec_estado_vac

        const updatePayload: Record<string, unknown> = {
            que_rec_estado_vac: nuevoEstado,
            que_rec_updated_at_dt: new Date().toISOString(),
        }

        if (nuevoEstado === 'resuelto') {
            updatePayload.que_rec_fec_resolucion_dt = new Date().toISOString()
        }
        if (nuevoEstado === 'cerrado') {
            updatePayload.que_rec_fec_cierre_dt = new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .update(updatePayload)
            .eq('que_rec_id_int', id)
            .select('*')
            .single()

        if (error) throw error

        // Registrar en historial
        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: id,
            que_hist_accion_vac: 'cambio_estado',
            que_hist_desc_vac: nota,
            que_hist_estado_ant_vac: estadoAnterior,
            que_hist_estado_nuevo_vac: nuevoEstado,
            usr_id_int: usuarioId || null,
        })

        return data
    } catch (error) {
        console.error('Error cambiando estado:', error)
        throw error
    }
}

export async function cambiarTipoQueja(
    id: string,
    nuevoTipo: 'queja' | 'reclamo',
    nota: string,
    usuarioId?: string
) {
    try {
        const { data: actual, error: fetchError } = await supabase
            .from('Quejas_Reclamos')
            .select('que_rec_tipo_vac')
            .eq('que_rec_id_int', id)
            .single()

        if (fetchError) throw fetchError
        
        const tipoAnterior = actual.que_rec_tipo_vac

        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .update({
                que_rec_tipo_vac: nuevoTipo,
                que_rec_updated_at_dt: new Date().toISOString(),
            })
            .eq('que_rec_id_int', id)
            .select('*')
            .single()

        if (error) throw error

        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: id,
            que_hist_accion_vac: 'cambio_tipo',
            que_hist_desc_vac: `Reclasificado de ${tipoAnterior.toUpperCase()} a ${nuevoTipo.toUpperCase()}. Razón: ${nota}`,
            usr_id_int: usuarioId || null,
        })

        return data
    } catch (error) {
        console.error('Error cambiando tipo:', error)
        throw error
    }
}

export async function asignarResponsable(
    id: string,
    responsable: string,
    areaResponsable: string,
    nota: string,
    usuarioId?: string
) {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .update({
                que_rec_responsable_vac: responsable,
                que_rec_area_responsable_vac: areaResponsable,
                que_rec_estado_vac: 'en_evaluacion',
                que_rec_updated_at_dt: new Date().toISOString(),
            })
            .eq('que_rec_id_int', id)
            .select('*')
            .single()

        if (error) throw error

        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: id,
            que_hist_accion_vac: 'asignado',
            que_hist_desc_vac: `Asignado a ${responsable} (${areaResponsable}). ${nota}`,
            que_hist_estado_ant_vac: 'recibido',
            que_hist_estado_nuevo_vac: 'en_evaluacion',
            usr_id_int: usuarioId || null,
        })

        return data
    } catch (error) {
        console.error('Error asignando responsable:', error)
        throw error
    }
}

export async function agregarComentario(
    id: string,
    comentario: string,
    usuarioId?: string
) {
    try {
        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: id,
            que_hist_accion_vac: 'comentario',
            que_hist_desc_vac: comentario,
            usr_id_int: usuarioId || null,
        })

        await supabase
            .from('Quejas_Reclamos')
            .update({ que_rec_updated_at_dt: new Date().toISOString() })
            .eq('que_rec_id_int', id)
    } catch (error) {
        console.error('Error agregando comentario:', error)
        throw error
    }
}

export async function registrarResolucion(
    id: string,
    dictamen: string,
    accionCorrectiva: string,
    respuestaCliente: string,
    usuarioId?: string
) {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .update({
                que_rec_dictamen_vac: dictamen,
                que_rec_accion_correctiva_vac: accionCorrectiva,
                que_rec_respuesta_cliente_vac: respuestaCliente,
                que_rec_estado_vac: 'resuelto',
                que_rec_fec_resolucion_dt: new Date().toISOString(),
                que_rec_updated_at_dt: new Date().toISOString(),
            })
            .eq('que_rec_id_int', id)
            .select('*')
            .single()

        if (error) throw error

        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: id,
            que_hist_accion_vac: 'resuelto',
            que_hist_desc_vac: `Dictamen: ${dictamen}. Acción correctiva: ${accionCorrectiva}`,
            que_hist_estado_ant_vac: 'en_investigacion',
            que_hist_estado_nuevo_vac: 'resuelto',
            usr_id_int: usuarioId || null,
        })

        return data
    } catch (error) {
        console.error('Error registrando resolución:', error)
        throw error
    }
}

export async function aplicarProrroga(id: string, usuarioId?: string) {
    try {
        const fechaProrroga = calcularFechaLimite(30) // 15 + 15 días hábiles

        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .update({
                que_rec_prorrogado_bol: true,
                que_rec_fec_limite_prorroga_dt: fechaProrroga.toISOString(),
                que_rec_updated_at_dt: new Date().toISOString(),
            })
            .eq('que_rec_id_int', id)
            .select('*')
            .single()

        if (error) throw error

        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: id,
            que_hist_accion_vac: 'prorrogado',
            que_hist_desc_vac: `Plazo prorrogado por 15 días hábiles adicionales. Nueva fecha límite: ${fechaProrroga.toLocaleDateString('es-PE')}.`,
            usr_id_int: usuarioId || null,
        })

        return data
    } catch (error) {
        console.error('Error aplicando prórroga:', error)
        throw error
    }
}

export async function actualizarPrioridad(id: string, prioridad: string) {
    try {
        const { data, error } = await supabase
            .from('Quejas_Reclamos')
            .update({
                que_rec_prioridad_vac: prioridad,
                que_rec_updated_at_dt: new Date().toISOString(),
            })
            .eq('que_rec_id_int', id)
            .select('*')
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando prioridad:', error)
        throw error
    }
}



export async function registrarEmailEnviado(quejaId: string, destinatario: string, asunto: string) {
    try {
        await supabase.from('Quejas_Reclamos_Historial').insert({
            que_rec_id_int: quejaId,
            que_hist_accion_vac: 'email_enviado',
            que_hist_desc_vac: `Correo enviado a ${destinatario} — Asunto: ${asunto}`,
        })
    } catch (error) {
        console.error('Error registrando email enviado:', error)
    }
}
