import { supabase, createAuthenticatedClient } from './client'
import { generarCodigoSeguimiento } from '@/utils'

// ============================================
// FUNCIONES ESPECÍFICAS DE PEDIDOS
// ============================================

export async function obtenerPedidos() {
    try {
        const { data, error } = await supabase
            .from('Pedidos')
            .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        documentos:Pedidos_Doc(*),
        cotizacion:Cotizaciones(
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
        )
      `)
            .order('ped_created_at_dt', { ascending: false })

        if (error) throw error

        const pedidosTransformados = data?.map(pedido => {
            if (pedido.cotizacion && pedido.cotizacion.persona) {
                const persona = pedido.cotizacion.persona
                pedido.cotizacion.persona = {
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
            return pedido
        })

        return pedidosTransformados || []
    } catch (error) {
        console.error('Error obteniendo pedidos:', error)
        throw error
    }
}

export async function verificarCotizacionTienePedido(cotizacionId: string): Promise<boolean> {
    try {
        const { data, error } = await supabase
            .from('Pedidos')
            .select('ped_id_int')
            .eq('cot_id_int', cotizacionId)
            .limit(1)

        if (error) throw error
        return data && data.length > 0
    } catch (error) {
        console.error('Error verificando cotización con pedido:', error)
        throw error
    }
}

export async function obtenerCotizacionesDisponibles() {
    try {
        const { data: todasCotizaciones, error: cotizacionesError } = await supabase
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

        if (cotizacionesError) throw cotizacionesError

        const { data: pedidos, error: pedidosError } = await supabase
            .from('Pedidos')
            .select('cot_id_int')

        if (pedidosError) throw pedidosError

        const cotizacionesConPedido = new Set(pedidos?.map(p => p.cot_id_int))
        const cotizacionesDisponibles = todasCotizaciones?.filter(c => !cotizacionesConPedido.has(c.cot_id_int)) || []

        const cotizacionesTransformadas = cotizacionesDisponibles.map(cotizacion => {
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

        return cotizacionesTransformadas
    } catch (error) {
        console.error('Error obteniendo cotizaciones disponibles:', error)
        throw error
    }
}

export async function crearPedido(pedidoData: {
    cotizacion_id: string
    estado_id: string
    codigo_rastreo?: string
    observaciones?: string
    numero_comprobante?: string
}) {
    try {
        const yaExistePedido = await verificarCotizacionTienePedido(pedidoData.cotizacion_id)
        if (yaExistePedido) {
            throw new Error('Esta cotización ya tiene un pedido asociado')
        }

        const codigoSeguimiento = await generarCodigoSeguimiento()

        const { data, error } = await supabase
            .from('Pedidos')
            .insert({
                cot_id_int: pedidoData.cotizacion_id,
                est_ped_id_int: pedidoData.estado_id,
                ped_cod_segui_vac: codigoSeguimiento,
                ped_cod_rastreo_vac: pedidoData.codigo_rastreo || null,
                ped_observacion_vac: pedidoData.observaciones || null,
                ped_num_comprob_vac: pedidoData.numero_comprobante || null
            })
            .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        documentos:Pedidos_Doc(*),
        cotizacion:Cotizaciones(
          *,
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          )
        )
      `)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creando pedido:', error)
        throw error
    }
}

export async function actualizarPedido(id: string, pedidoData: {
    cotizacion_id?: string
    estado_id?: string
    codigo_rastreo?: string
    observaciones?: string
    numero_comprobante?: string
}) {
    try {
        if (pedidoData.cotizacion_id) {
            const { data: pedidoActual, error: pedidoError } = await supabase
                .from('Pedidos')
                .select('cot_id_int')
                .eq('ped_id_int', id)
                .single()

            if (pedidoError) throw pedidoError

            if (pedidoActual.cot_id_int !== pedidoData.cotizacion_id) {
                const yaExistePedido = await verificarCotizacionTienePedido(pedidoData.cotizacion_id)
                if (yaExistePedido) {
                    throw new Error('La cotización seleccionada ya tiene un pedido asociado. No se puede asignar a otro pedido.')
                }
            }
        }

        const updateData: any = {
            ped_fec_actualizada_dt: new Date().toISOString()
        }

        if (pedidoData.cotizacion_id !== undefined) updateData.cot_id_int = pedidoData.cotizacion_id
        if (pedidoData.estado_id !== undefined) updateData.est_ped_id_int = pedidoData.estado_id
        if (pedidoData.codigo_rastreo !== undefined) updateData.ped_cod_rastreo_vac = pedidoData.codigo_rastreo
        if (pedidoData.observaciones !== undefined) updateData.ped_observacion_vac = pedidoData.observaciones
        if (pedidoData.numero_comprobante !== undefined) updateData.ped_num_comprob_vac = pedidoData.numero_comprobante

        const { data, error } = await supabase
            .from('Pedidos')
            .update(updateData)
            .eq('ped_id_int', id)
            .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        documentos:Pedidos_Doc(*),
        cotizacion:Cotizaciones(
          *,
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          )
        )
      `)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando pedido:', error)
        throw error
    }
}

export async function eliminarPedido(id: string): Promise<void> {
    try {
        // Obtener todos los documentos asociados al pedido
        const { data: documentos, error: docsError } = await supabase
            .from('Pedidos_Doc')
            .select('ped_doc_url_vac')
            .eq('ped_id_int', id)

        if (docsError) throw docsError

        // Eliminar cada imagen del storage
        if (documentos && documentos.length > 0) {
            for (const doc of documentos) {
                if (doc.ped_doc_url_vac) {
                    try {
                        await eliminarImagenPedido(doc.ped_doc_url_vac)
                    } catch (imageError) {
                        console.error('Error al eliminar imagen del storage, continuando:', imageError)
                    }
                }
            }
        }

        // Eliminar registros de Pedidos_Doc (por FK cascade o manualmente)
        const { error: deleteDocsError } = await supabase
            .from('Pedidos_Doc')
            .delete()
            .eq('ped_id_int', id)

        if (deleteDocsError) throw deleteDocsError

        // Eliminar el pedido
        const { error } = await supabase
            .from('Pedidos')
            .delete()
            .eq('ped_id_int', id)

        if (error) throw error

    } catch (error) {
        console.error('Error eliminando pedido:', error)
        throw error
    }
}

export async function obtenerPedidoPorCodigo(codigoSeguimiento: string) {
    try {
        const { data, error } = await supabase
            .from('Pedidos')
            .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        cotizacion:Cotizaciones(
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
        ),
        documentos:Pedidos_Doc(*)
      `)
            .eq('ped_cod_segui_vac', codigoSeguimiento)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return null
            }
            throw error
        }

        if (data && data.cotizacion && data.cotizacion.persona) {
            const persona = data.cotizacion.persona

            data.cotizacion.persona = {
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
        console.error('Error obteniendo pedido por código:', error)
        throw error
    }
}

// ============================================
// FUNCIONES DE STORAGE PARA IMÁGENES
// ============================================

export async function subirImagenPedido(file: File, pedidoId?: string): Promise<string> {
    try {
        const supabaseAuth = createAuthenticatedClient()

        const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

        if (sessionError || !session) {
            console.error('Error de sesión:', sessionError || 'No hay sesión activa')
            throw new Error('No hay una sesión autenticada activa')
        }

        if (!file) {
            throw new Error('No se proporcionó archivo')
        }

        if (!file.type.startsWith('image/')) {
            throw new Error('El archivo debe ser una imagen')
        }

        if (!file.name.includes('.')) {
            throw new Error('El archivo debe tener una extensión válida')
        }

        const timestamp = Date.now()
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const fileName = pedidoId
            ? `pedido_${pedidoId}_${timestamp}.${extension}`
            : `pedido_temp_${timestamp}.${extension}`

        const { data, error } = await supabaseAuth.storage
            .from('admin')
            .upload(`pedidos/${fileName}`, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Error subiendo imagen de pedido:', error)
            throw new Error(`Error del servidor: ${error.message}`)
        }

        if (!data) {
            throw new Error('No se recibió respuesta del servidor')
        }

        const { data: urlData } = supabaseAuth.storage
            .from('admin')
            .getPublicUrl(`pedidos/${fileName}`)

        if (!urlData.publicUrl) {
            throw new Error('No se pudo generar la URL pública')
        }

        return urlData.publicUrl
    } catch (error) {
        console.error('Error en subida de imagen de pedido:', error)
        throw error
    }
}

export async function eliminarImagenPedido(imageUrl: string): Promise<void> {
    try {
        const supabaseAuth = createAuthenticatedClient()

        const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

        if (sessionError || !session) {
            console.error('Error de sesión:', sessionError || 'No hay sesión activa')
            throw new Error('No hay una sesión autenticada activa')
        }

        if (!imageUrl) {
            throw new Error('No se proporcionó URL de imagen')
        }

        const url = new URL(imageUrl)
        const pathParts = url.pathname.split('/')
        const fileName = pathParts[pathParts.length - 1]

        if (!fileName) {
            throw new Error('No se pudo extraer el nombre del archivo de la URL')
        }

        const { error } = await supabaseAuth.storage
            .from('admin')
            .remove([`pedidos/${fileName}`])

        if (error) {
            console.error('Error eliminando imagen del storage:', error)
            throw new Error(`Error del servidor: ${error.message}`)
        }

    } catch (error) {
        console.error('Error en eliminación de imagen de pedido:', error)
        throw error
    }
}

// ============================================
// FUNCIONES CRUD PARA PEDIDOS_DOC
// ============================================

/**
 * Sube una imagen al storage y crea el registro en Pedidos_Doc
 */
export async function subirDocumentoPedido(file: File, pedidoId: string): Promise<{ url: string; docId: string }> {
    try {
        // Subir la imagen al storage
        const imageUrl = await subirImagenPedido(file, pedidoId)

        // Crear registro en Pedidos_Doc
        const { data, error } = await supabase
            .from('Pedidos_Doc')
            .insert({
                ped_doc_url_vac: imageUrl,
                ped_id_int: pedidoId
            })
            .select('*')
            .single()

        if (error) {
            // Si falla la inserción en BD, intentar eliminar la imagen del storage
            try {
                await eliminarImagenPedido(imageUrl)
            } catch (cleanupError) {
                console.error('Error limpiando imagen huérfana:', cleanupError)
            }
            throw error
        }

        return { url: imageUrl, docId: data.ped_doc_id_int }
    } catch (error) {
        console.error('Error subiendo documento de pedido:', error)
        throw error
    }
}

/**
 * Sube múltiples imágenes y crea registros en Pedidos_Doc
 */
export async function subirDocumentosPedido(files: File[], pedidoId: string): Promise<{ url: string; docId: string }[]> {
    const resultados: { url: string; docId: string }[] = []

    for (const file of files) {
        const resultado = await subirDocumentoPedido(file, pedidoId)
        resultados.push(resultado)
    }

    return resultados
}

/**
 * Elimina un documento específico de Pedidos_Doc y su imagen del storage
 */
export async function eliminarDocumentoPedido(docId: string): Promise<void> {
    try {
        // Obtener la URL del documento
        const { data: doc, error: docError } = await supabase
            .from('Pedidos_Doc')
            .select('ped_doc_url_vac')
            .eq('ped_doc_id_int', docId)
            .single()

        if (docError) throw docError

        // Eliminar la imagen del storage
        if (doc?.ped_doc_url_vac) {
            try {
                await eliminarImagenPedido(doc.ped_doc_url_vac)
            } catch (imageError) {
                console.error('Error eliminando imagen del storage, continuando con eliminación del registro:', imageError)
            }
        }

        // Eliminar el registro de la BD
        const { error } = await supabase
            .from('Pedidos_Doc')
            .delete()
            .eq('ped_doc_id_int', docId)

        if (error) throw error
    } catch (error) {
        console.error('Error eliminando documento de pedido:', error)
        throw error
    }
}

/**
 * Obtiene todos los documentos de un pedido
 */
export async function obtenerDocumentosPedido(pedidoId: string) {
    try {
        const { data, error } = await supabase
            .from('Pedidos_Doc')
            .select('*')
            .eq('ped_id_int', pedidoId)
            .order('ped_doc_created_at_dt', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo documentos del pedido:', error)
        throw error
    }
}

export async function obtenerPersonaPorId(id: string) {
    try {
        const { data, error } = await supabase
            .from('Personas')
            .select(`
        *,
        Persona_Natural(*),
        Persona_Juridica(*)
      `)
            .eq('per_id_int', id)
            .single()

        if (error) throw error

        if (data) {
            const persona = {
                ...data,
                tipo: data.Persona_Natural && data.Persona_Natural.length > 0 ? 'natural' : 'juridica',
                persona_natural: data.Persona_Natural && data.Persona_Natural.length > 0
                    ? data.Persona_Natural[0]
                    : null,
                persona_juridica: data.Persona_Juridica && data.Persona_Juridica.length > 0
                    ? data.Persona_Juridica[0]
                    : null
            }

            return persona
        }

        return null
    } catch (error) {
        console.error('Error obteniendo persona por ID:', error)
        throw error
    }
}

export async function obtenerCotizacionesPorCliente(clienteId: string) {
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
            .eq('per_id_int', clienteId)
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
        console.error('Error obteniendo cotizaciones por cliente:', error)
        throw error
    }
}

export async function obtenerPedidosPorCliente(clienteId: string) {
    try {
        const { data: cotizacionesCliente, error: cotizacionesError } = await supabase
            .from('Cotizaciones')
            .select('cot_id_int')
            .eq('per_id_int', clienteId)

        if (cotizacionesError) throw cotizacionesError

        if (!cotizacionesCliente || cotizacionesCliente.length === 0) {
            return []
        }

        const cotizacionIds = cotizacionesCliente.map(c => c.cot_id_int)

        const { data, error } = await supabase
            .from('Pedidos')
            .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        documentos:Pedidos_Doc(*),
        cotizacion:Cotizaciones(
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
        )
      `)
            .in('cot_id_int', cotizacionIds)
            .order('ped_created_at_dt', { ascending: false })

        if (error) throw error

        const pedidosTransformados = data?.map(pedido => {
            if (pedido.cotizacion && pedido.cotizacion.persona) {
                const persona = pedido.cotizacion.persona
                pedido.cotizacion.persona = {
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
            return pedido
        })

        return pedidosTransformados || []
    } catch (error) {
        console.error('Error obteniendo pedidos por cliente:', error)
        throw error
    }
}
