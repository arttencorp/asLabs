import { supabase } from './client'
import { generarNumeroCotizacion } from '@/utils'

// ============================================
// FUNCIONES ESPECÍFICAS DE COTIZACIONES
// ============================================

export async function obtenerCotizaciones() {
    try {
        const { data, error } = await supabase
            .from('Cotizaciones')
            .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(*)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
            .order('cot_fec_emis_dt', { ascending: false })

        if (error) throw error

        const cotizacionesTransformadas = data?.map(cotizacion => {
            if (cotizacion.persona) {
                const persona = cotizacion.persona
                cotizacion.persona = {
                    ...persona,
                    tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
                    persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
                        ? persona.Persona_Natural[0]
                        : null,
                    persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
                        ? persona.Persona_Juridica[0]
                        : null
                }
            }
            return cotizacion
        })

        return cotizacionesTransformadas || []
    } catch (error) {
        console.error('Error obteniendo cotizaciones:', error)
        throw error
    }
}

export async function crearCotizacion(cotizacionData: {
    cliente_id: string
    fecha_emision: string | null
    fecha_vencimiento: string | null
    incluye_igv: boolean
    productos: Array<{
        producto_id: string | null
        cantidad: number | null
        precio_historico: number | null
    }>
    forma_pago_id: string | null
    lugar_recojo: string | null
    forma_entrega: string | null
    terminos_condiciones: string | null
}) {
    try {
        const numeroCotizacion = await generarNumeroCotizacion()

        const datosLimpios = {
            cliente_id: cotizacionData.cliente_id || null,
            fecha_emision: new Date().toISOString(),
            fecha_vencimiento: cotizacionData.fecha_vencimiento?.trim() ?
                new Date(`${cotizacionData.fecha_vencimiento}T23:59:59-05:00`).toISOString() :
                null,
            incluye_igv: cotizacionData.incluye_igv,
            lugar_recojo: cotizacionData.lugar_recojo?.trim() || null,
            forma_entrega: cotizacionData.forma_entrega?.trim() || null,
            terminos_condiciones: cotizacionData.terminos_condiciones?.trim() || null,
            forma_pago_id: cotizacionData.forma_pago_id || null
        }

        const { data: cotizacion, error: cotizacionError } = await supabase
            .from('Cotizaciones')
            .insert({
                cot_num_vac: numeroCotizacion,
                cot_fec_emis_dt: datosLimpios.fecha_emision,
                cot_fec_venc_dt: datosLimpios.fecha_vencimiento,
                cot_igv_bol: datosLimpios.incluye_igv,
                per_id_int: datosLimpios.cliente_id
            })
            .select()
            .single()

        if (cotizacionError) throw cotizacionError

        const productosValidos = cotizacionData.productos.filter(prod =>
            prod.producto_id &&
            prod.producto_id !== 'personalizado' &&
            prod.cantidad &&
            prod.precio_historico
        )

        if (productosValidos.length > 0) {
            const detalles = productosValidos.map(prod => ({
                pro_id_int: prod.producto_id,
                cot_id_int: cotizacion.cot_id_int,
                det_cot_cant_int: prod.cantidad,
                det_cot_prec_hist_int: prod.precio_historico
            }))

            const { error: detalleError } = await supabase
                .from('Detalle_Cotizacion')
                .insert(detalles)

            if (detalleError) throw detalleError
        }

        if (datosLimpios.lugar_recojo || datosLimpios.forma_entrega || datosLimpios.terminos_condiciones || datosLimpios.forma_pago_id) {
            const { error: infoError } = await supabase
                .from('Informacion_Adicional')
                .insert({
                    inf_ad_lug_recojo_vac: datosLimpios.lugar_recojo,
                    inf_ad_form_entr_vac: datosLimpios.forma_entrega,
                    inf_ad_term_cond_vac: datosLimpios.terminos_condiciones,
                    form_pa_id_int: datosLimpios.forma_pago_id,
                    cot_id_int: cotizacion.cot_id_int
                })

            if (infoError) throw infoError
        }

        return cotizacion
    } catch (error) {
        throw error
    }
}

export async function obtenerCotizacionPorId(id: string) {
    try {
        const { data, error } = await supabase
            .from('Cotizaciones')
            .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(*)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
            .eq('cot_id_int', id)
            .single()

        if (error) throw error

        if (data && data.persona) {
            const persona = data.persona
            data.persona = {
                ...persona,
                tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
                persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
                    ? persona.Persona_Natural[0]
                    : null,
                persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
                    ? persona.Persona_Juridica[0]
                    : null
            }
        }

        return data
    } catch (error) {
        console.error('Error obteniendo cotización por ID:', error)
        throw error
    }
}

export async function actualizarCotizacion(id: string, cotizacionData: {
    cliente_id?: string
    fecha_emision?: string | null
    fecha_vencimiento?: string | null
    incluye_igv?: boolean
    productos?: Array<{
        producto_id: string | null
        cantidad: number | null
        precio_historico: number | null
    }>
    forma_pago_id?: string | null
    lugar_recojo?: string | null
    forma_entrega?: string | null
    terminos_condiciones?: string | null
}) {
    try {
        const datosLimpios: any = {}

        if (cotizacionData.cliente_id !== undefined) datosLimpios.per_id_int = cotizacionData.cliente_id

        if (cotizacionData.fecha_emision !== undefined && cotizacionData.fecha_emision?.trim()) {
            try {
                const fechaLima = new Date(`${cotizacionData.fecha_emision}T00:00:00-05:00`)
                if (isNaN(fechaLima.getTime())) {
                    throw new Error('Fecha de emisión inválida')
                }
                datosLimpios.cot_fec_emis_dt = fechaLima.toISOString()
            } catch (error) {
                throw new Error(`Error procesando fecha de emisión: ${cotizacionData.fecha_emision}`)
            }
        }

        if (cotizacionData.fecha_vencimiento !== undefined && cotizacionData.fecha_vencimiento?.trim()) {
            try {
                const fechaLima = new Date(`${cotizacionData.fecha_vencimiento}T23:59:59-05:00`)
                if (isNaN(fechaLima.getTime())) {
                    throw new Error('Fecha de vencimiento inválida')
                }
                datosLimpios.cot_fec_venc_dt = fechaLima.toISOString()
            } catch (error) {
                throw new Error(`Error procesando fecha de vencimiento: ${cotizacionData.fecha_vencimiento}`)
            }
        }
        if (cotizacionData.incluye_igv !== undefined) datosLimpios.cot_igv_bol = cotizacionData.incluye_igv

        if (Object.keys(datosLimpios).length > 0) {
            const { error: cotizacionError } = await supabase
                .from('Cotizaciones')
                .update(datosLimpios)
                .eq('cot_id_int', id)

            if (cotizacionError) throw cotizacionError
        }

        if (cotizacionData.productos) {
            const { error: deleteError } = await supabase
                .from('Detalle_Cotizacion')
                .delete()
                .eq('cot_id_int', id)

            if (deleteError) throw deleteError

            const productosValidos = cotizacionData.productos.filter(prod =>
                prod.producto_id &&
                prod.producto_id !== 'personalizado' &&
                prod.cantidad &&
                prod.precio_historico
            )

            if (productosValidos.length > 0) {
                const detalles = productosValidos.map(prod => ({
                    pro_id_int: prod.producto_id,
                    cot_id_int: id,
                    det_cot_cant_int: prod.cantidad,
                    det_cot_prec_hist_int: prod.precio_historico
                }))

                const { error: insertError } = await supabase
                    .from('Detalle_Cotizacion')
                    .insert(detalles)

                if (insertError) throw insertError
            }
        }

        if (cotizacionData.lugar_recojo !== undefined ||
            cotizacionData.forma_entrega !== undefined ||
            cotizacionData.terminos_condiciones !== undefined ||
            cotizacionData.forma_pago_id !== undefined) {

            const { data: existingInfo } = await supabase
                .from('Informacion_Adicional')
                .select('inf_ad_id_int')
                .eq('cot_id_int', id)
                .single()

            const infoData: any = {}
            if (cotizacionData.lugar_recojo !== undefined) infoData.inf_ad_lug_recojo_vac = cotizacionData.lugar_recojo?.trim() || null
            if (cotizacionData.forma_entrega !== undefined) infoData.inf_ad_form_entr_vac = cotizacionData.forma_entrega?.trim() || null
            if (cotizacionData.terminos_condiciones !== undefined) infoData.inf_ad_term_cond_vac = cotizacionData.terminos_condiciones?.trim() || null
            if (cotizacionData.forma_pago_id !== undefined) infoData.form_pa_id_int = cotizacionData.forma_pago_id

            if (Object.keys(infoData).length > 0) {
                if (existingInfo) {
                    const { error: updateError } = await supabase
                        .from('Informacion_Adicional')
                        .update(infoData)
                        .eq('cot_id_int', id)

                    if (updateError) throw updateError
                } else {
                    const { error: insertError } = await supabase
                        .from('Informacion_Adicional')
                        .insert({
                            ...infoData,
                            cot_id_int: id
                        })

                    if (insertError) throw insertError
                }
            }
        }

        const cotizacionActualizada = await obtenerCotizacionPorId(id)
        return cotizacionActualizada
    } catch (error) {
        console.error('Error actualizando cotización:', error)
        throw error
    }
}

export async function eliminarCotizacion(id: string) {
    try {
        await supabase.from('Detalle_Cotizacion').delete().eq('cot_id_int', id)
        await supabase.from('Informacion_Adicional').delete().eq('cot_id_int', id)

        const { error } = await supabase
            .from('Cotizaciones')
            .delete()
            .eq('cot_id_int', id)

        if (error) throw error

    } catch (error) {
        console.error('Error eliminando cotización:', error)
        throw error
    }
}

export async function actualizarEstadoCotizacion(id: string, estadoId: string) {
    try {
        const { data, error } = await supabase
            .from('Cotizaciones')
            .update({ est_cot_id_int: estadoId })
            .eq('cot_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando estado de cotización:', error)
        throw error
    }
}

// Funciones auxiliares para transformar datos
export function transformarCertificadoBD(certificado: any): any {
    return {
        titulo: `Certificado de Calidad - ${certificado.cer_cal_tipo_vac || 'Sin Tipo'}`,
        codigo: certificado.cer_cal_cod_muestra_int ? certificado.cer_cal_cod_muestra_int.toString() : '',
        tipo: certificado.cer_cal_tipo_vac || '',
        informe: certificado.cer_cal_infor_ensayo_vac || '',
        detalle: [
            certificado.cer_cal_result_vac || '',
            certificado.cer_cal_resum_vac || ''
        ].filter(Boolean),
        link: certificado.cer_cal_imag_url || undefined
    }
}

export function transformarFichaTecnicaBD(fichaTecnica: any): any {
    return {
        titulo: fichaTecnica.fit_tec_nom_planta_vac || 'Ficha Técnica',
        descripcion: `Código: ${fichaTecnica.fit_tec_cod_vac || 'Sin código'}`,
        archivo: fichaTecnica.fit_tec_imag_vac || ''
    }
}

export function transformarCertificadosBD(certificados: any[]): any[] {
    return certificados.map(transformarCertificadoBD)
}

export function transformarFichasTecnicasBD(fichasTecnicas: any[]): any[] {
    return fichasTecnicas.map(transformarFichaTecnicaBD)
}
