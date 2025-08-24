import { createClient } from "@supabase/supabase-js"
import { generarCodigoSeguimiento, generarNumeroCotizacion } from '@/utils'
import type {
  PersonaNatural,
  PersonaJuridica,
  Persona,
  EstadoPedido,
  EstadoCotizacion,
  FormaPago,
  ProductoDatabase,
  CertificadoCalidadDatabase,
  FichaTecnicaDatabase
} from '@/types/database'
import type { ClientePersona } from '@/types/database'

// Configuración cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: "public",
    },
    global: {
      headers: {
        "x-client-info": "as-labs-admin",
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  },
)

// ============================================
// FUNCIONES BASE PARA PERSONAS (Clientes)
// ============================================

export async function obtenerPersonas(): Promise<ClientePersona[]> {
  try {
    const { data: personas, error } = await supabase
      .from('Personas')
      .select(`
        *,
        Persona_Natural(*),
        Persona_Juridica(*)
      `)
      .order('per_created_at_dt', { ascending: false })

    if (error) throw error

    return personas.map(persona => ({
      ...persona,
      tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
      persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
        ? persona.Persona_Natural[0]
        : null,
      persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
        ? persona.Persona_Juridica[0]
        : null
    }))
  } catch (error) {
    console.error('Error obteniendo personas:', error)
    throw error
  }
}

function cleanData(obj: any) {
  const cleaned = { ...obj }
  for (const key in cleaned) {
    if (cleaned[key] === '') {
      cleaned[key] = null
    }
  }
  return cleaned
}

export async function crearPersona(personaData: any): Promise<ClientePersona> {
  try {
    cleanData(personaData);

    const { data: persona, error: personaError } = await supabase
      .from('Personas')
      .insert({
        per_nom_contac_vac: personaData.per_nom_contac_vac,
        per_email_vac: personaData.per_email_vac,
        per_telef_int: personaData.per_telef_int,
        per_direc_vac: personaData.per_direc_vac,
        per_cultivo_vac: personaData.per_cultivo_vac,
        per_cantidad_int: personaData.per_cantidad_int,
        per_fec_prob_dt: personaData.per_fec_prob_dt && personaData.per_fec_prob_dt.trim()
          ? personaData.per_fec_prob_dt
          : null,
        per_hec_disp_int: personaData.per_hec_disp_int,
        per_hec_inst_int: personaData.per_hec_inst_int,
        per_observaciones_vac: personaData.per_observaciones_vac
      })
      .select()
      .single()

    if (personaError) throw personaError

    if (personaData.tipo === 'natural') {
      const { error: naturalError } = await supabase
        .from('Persona_Natural')
        .insert({
          per_nat_dni_int: personaData.per_nat_dni_int,
          per_nat_nomb_vac: personaData.per_nat_nomb_vac,
          per_nat_apell_vac: personaData.per_nat_apell_vac,
          per_id_int: persona.per_id_int
        })

      if (naturalError) throw naturalError
    } else {
      const { error: juridicaError } = await supabase
        .from('Persona_Juridica')
        .insert({
          per_jurd_ruc_int: personaData.per_jurd_ruc_int,
          per_jurd_razSocial_vac: personaData.per_jurd_razSocial_vac,
          per_id_int: persona.per_id_int
        })

      if (juridicaError) throw juridicaError
    }

    const clientes = await obtenerPersonas()
    return clientes.find(c => c.per_id_int === persona.per_id_int)!

  } catch (error) {
    console.error('Error creando persona:', error)
    throw error
  }
}

export async function actualizarPersona(id: string, personaData: any): Promise<ClientePersona> {
  try {
    const { error: personaError } = await supabase
      .from('Personas')
      .update({
        per_nom_contac_vac: personaData.per_nom_contac_vac,
        per_email_vac: personaData.per_email_vac,
        per_telef_int: personaData.per_telef_int,
        per_direc_vac: personaData.per_direc_vac,
        per_cultivo_vac: personaData.per_cultivo_vac,
        per_cantidad_int: personaData.per_cantidad_int,
        per_fec_prob_dt: personaData.per_fec_prob_dt && personaData.per_fec_prob_dt.trim()
          ? personaData.per_fec_prob_dt
          : null,
        per_hec_disp_int: personaData.per_hec_disp_int,
        per_hec_inst_int: personaData.per_hec_inst_int,
        per_observaciones_vac: personaData.per_observaciones_vac,
        per_updated_at_dt: new Date().toISOString()
      })
      .eq('per_id_int', id)

    if (personaError) throw personaError

    if (personaData.tipo === 'natural') {
      const { error: naturalError } = await supabase
        .from('Persona_Natural')
        .update({
          per_nat_dni_int: personaData.per_nat_dni_int,
          per_nat_nomb_vac: personaData.per_nat_nomb_vac,
          per_nat_apell_vac: personaData.per_nat_apell_vac
        })
        .eq('per_id_int', id)

      if (naturalError) throw naturalError
    } else {
      const { error: juridicaError } = await supabase
        .from('Persona_Juridica')
        .update({
          per_jurd_ruc_int: personaData.per_jurd_ruc_int,
          per_jurd_razSocial_vac: personaData.per_jurd_razSocial_vac
        })
        .eq('per_id_int', id)

      if (juridicaError) throw juridicaError
    }

    const clientes = await obtenerPersonas()
    return clientes.find(c => c.per_id_int === id)!

  } catch (error) {
    console.error('Error actualizando persona:', error)
    throw error
  }
}

export async function eliminarPersona(id: string): Promise<void> {
  try {
    await supabase.from('Persona_Natural').delete().eq('per_id_int', id)
    await supabase.from('Persona_Juridica').delete().eq('per_id_int', id)

    const { error } = await supabase
      .from('Personas')
      .delete()
      .eq('per_id_int', id)

    if (error) throw error

  } catch (error) {
    console.error('Error eliminando persona:', error)
    throw error
  }
}

// ============================================
// FUNCIONES BASE PARA CATÁLOGOS
// ============================================

export async function obtenerEstadosPedido(): Promise<EstadoPedido[]> {
  try {
    const { data, error } = await supabase
      .from('Estado_Pedido')
      .select('*')
      .order('est_ped_tipo_int', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo estados de pedido:', error)
    throw error
  }
}

export async function obtenerEstadosCotizacion(): Promise<EstadoCotizacion[]> {
  try {
    const { data, error } = await supabase
      .from('Estado_Cotizacion')
      .select('*')
      .order('est_cot_tipo_int', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo estados de cotización:', error)
    throw error
  }
}

export async function obtenerFormasPago(): Promise<FormaPago[]> {
  try {
    const { data, error } = await supabase
      .from('Forma_Pago')
      .select('*')
      .order('form_pa_tipo_int', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo formas de pago:', error)
    throw error
  }
}

export async function obtenerProductos(): Promise<ProductoDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos')
      .select('*')
      .order('pro_nomb_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo productos:', error)
    throw error
  }
}

export async function crearProducto(productoData: {
  pro_nomb_vac: string
  pro_desc_vac: string | null
  pro_prec_unitario_int: number
}): Promise<ProductoDatabase> {
  try {
    // Limpiar datos antes de insertar (convertir strings vacíos a null)
    const datosLimpios = {
      pro_nomb_vac: productoData.pro_nomb_vac?.trim() || null,
      pro_desc_vac: productoData.pro_desc_vac?.trim() || null,
      pro_prec_unitario_int: productoData.pro_prec_unitario_int || null,
      pro_stock_int: 0 // Stock inicial en 0
    }

    // Validar que el nombre no esté vacío
    if (!datosLimpios.pro_nomb_vac) {
      throw new Error('El nombre del producto es obligatorio')
    }

    const { data, error } = await supabase
      .from('Productos')
      .insert(datosLimpios)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando producto:', error)
    throw error
  }
}

export async function actualizarProducto(id: string, productoData: {
  pro_nomb_vac?: string
  pro_desc_vac?: string | null
  pro_prec_unitario_int?: number
  pro_stock_int?: number
}): Promise<ProductoDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es obligatorio')
    }

    const updateData: any = {
      pro_updated_at_dt: new Date().toISOString()
    }

    // Solo agregar campos que se están actualizando
    if (productoData.pro_nomb_vac !== undefined) {
      const nombreLimpio = productoData.pro_nomb_vac?.trim()
      if (!nombreLimpio) {
        throw new Error('El nombre del producto es obligatorio')
      }
      updateData.pro_nomb_vac = nombreLimpio
    }
    if (productoData.pro_desc_vac !== undefined) {
      updateData.pro_desc_vac = productoData.pro_desc_vac?.trim() || null
    }
    if (productoData.pro_prec_unitario_int !== undefined) {
      updateData.pro_prec_unitario_int = productoData.pro_prec_unitario_int || null
    }
    if (productoData.pro_stock_int !== undefined) {
      updateData.pro_stock_int = productoData.pro_stock_int || null
    }

    const { data, error } = await supabase
      .from('Productos')
      .update(updateData)
      .eq('pro_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando producto:', error)
    throw error
  }
}

// Obtener certificados de calidad para un producto específico
export async function obtenerCertificadosPorProducto(productoId: string): Promise<CertificadoCalidadDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos_Certificados')
      .select(`
        certificado:Certificados_Calidad(*)
      `)
      .eq('pro_id_int', productoId)

    if (error) throw error

    // Extraer solo los certificados de la respuesta
    return (data?.map(item => item.certificado).filter(Boolean) || []) as unknown as CertificadoCalidadDatabase[]
  } catch (error) {
    console.error('Error obteniendo certificados del producto:', error)
    throw error
  }
}

// Obtener fichas técnicas para un producto específico
export async function obtenerFichasTecnicasPorProducto(productoId: string): Promise<FichaTecnicaDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos_Fichas_Tecnicas')
      .select(`
        ficha_tecnica:Fichas_Tecnicas(*)
      `)
      .eq('pro_id_int', productoId)

    if (error) throw error

    // Extraer solo las fichas técnicas de la respuesta
    return (data?.map(item => item.ficha_tecnica).filter(Boolean) || []) as unknown as FichaTecnicaDatabase[]
  } catch (error) {
    console.error('Error obteniendo fichas técnicas del producto:', error)
    throw error
  }
}

// Obtener certificados de calidad para múltiples productos
export async function obtenerCertificadosPorProductos(productosIds: string[]): Promise<{ [key: string]: CertificadoCalidadDatabase[] }> {
  try {
    if (productosIds.length === 0) return {}

    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .select('*')
      .in('pro_id_int', productosIds)

    if (error) throw error

    // Agrupar certificados por producto ID
    const certificadosPorProducto: { [key: string]: CertificadoCalidadDatabase[] } = {}
    data?.forEach((certificado: CertificadoCalidadDatabase) => {
      if (certificado.pro_id_int) {
        if (!certificadosPorProducto[certificado.pro_id_int]) {
          certificadosPorProducto[certificado.pro_id_int] = []
        }
        certificadosPorProducto[certificado.pro_id_int].push(certificado)
      }
    })

    return certificadosPorProducto
  } catch (error) {
    console.error('Error obteniendo certificados de productos:', error)
    throw error
  }
}

// Obtener fichas técnicas para múltiples productos
export async function obtenerFichasTecnicasPorProductos(productosIds: string[]): Promise<{ [key: string]: FichaTecnicaDatabase[] }> {
  try {
    if (productosIds.length === 0) return {}

    const { data, error } = await supabase
      .from('Ficha_Tecnica')
      .select('*')
      .in('pro_id_int', productosIds)

    if (error) throw error

    // Agrupar fichas técnicas por producto ID
    const fichasPorProducto: { [key: string]: FichaTecnicaDatabase[] } = {}
    data?.forEach((ficha: FichaTecnicaDatabase) => {
      if (ficha.pro_id_int) {
        if (!fichasPorProducto[ficha.pro_id_int]) {
          fichasPorProducto[ficha.pro_id_int] = []
        }
        fichasPorProducto[ficha.pro_id_int].push(ficha)
      }
    })

    return fichasPorProducto
  } catch (error) {
    console.error('Error obteniendo fichas técnicas de productos:', error)
    throw error
  }
}

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

    // Transformar los datos de persona
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

export async function crearPedido(pedidoData: {
  cotizacion_id: string
  estado_id?: string | null
  codigo_rastreo?: string | null
  observaciones?: string | null
  numero_comprobante?: string | null
  imagen_url?: string | null
}) {
  try {
    // Validar que la cotización no esté vacía
    if (!pedidoData.cotizacion_id || pedidoData.cotizacion_id.trim() === '') {
      throw new Error('La cotización es obligatoria')
    }

    const codigoSeguimiento = await generarCodigoSeguimiento()
    const fechaActual = new Date().toISOString()

    // Si no se especifica estado, usar el primer estado por orden (PEDIDO_RECIBIDO)
    let estadoId = pedidoData.estado_id
    if (!estadoId || estadoId.trim() === '') {
      const { data: estados } = await supabase
        .from('Estado_Pedido')
        .select('est_ped_id_int')
        .order('est_ped_tipo_int', { ascending: true })
        .limit(1)
        .single()

      estadoId = estados?.est_ped_id_int
    }

    // Solo enviar campos que no están vacíos
    const insertData: any = {
      ped_cod_segui_vac: codigoSeguimiento,
      ped_fec_pedido_dt: fechaActual,
      ped_fec_actualizada_dt: fechaActual,
      est_ped_id_int: estadoId,
      cot_id_int: pedidoData.cotizacion_id.trim()
    }

    // Solo agregar campos opcionales si tienen valor
    if (pedidoData.codigo_rastreo?.trim()) {
      insertData.ped_cod_rastreo_vac = pedidoData.codigo_rastreo
    }
    if (pedidoData.observaciones?.trim()) {
      insertData.ped_observacion_vac = pedidoData.observaciones
    }
    if (pedidoData.numero_comprobante?.trim()) {
      insertData.ped_num_comprob_vac = pedidoData.numero_comprobante
    }
    if (pedidoData.imagen_url?.trim()) {
      insertData.ped_imagen_url = pedidoData.imagen_url
    }

    const { data, error } = await supabase
      .from('Pedidos')
      .insert(insertData)
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
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

export async function actualizarPedido(id: string, pedidoData: any) {
  try {
    const updateData: any = {
      ped_fec_actualizada_dt: new Date().toISOString()
    }

    if (pedidoData.cotizacion_id !== undefined) updateData.cot_id_int = pedidoData.cotizacion_id
    if (pedidoData.estado_id !== undefined) updateData.est_ped_id_int = pedidoData.estado_id
    if (pedidoData.codigo_rastreo !== undefined) updateData.ped_cod_rastreo_vac = pedidoData.codigo_rastreo
    if (pedidoData.observaciones !== undefined) updateData.ped_observacion_vac = pedidoData.observaciones
    if (pedidoData.numero_comprobante !== undefined) updateData.ped_num_comprob_vac = pedidoData.numero_comprobante
    if (pedidoData.imagen_url !== undefined) updateData.ped_imagen_url = pedidoData.imagen_url

    const { data, error } = await supabase
      .from('Pedidos')
      .update(updateData)
      .eq('ped_id_int', id)
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
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
    return data || []
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

    // Limpiar datos antes de insertar (convertir strings vacíos a null)
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

    // Crear cotización
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

    // Crear detalles (solo productos válidos de BD)
    const productosValidos = cotizacionData.productos.filter(prod =>
      prod.producto_id &&
      prod.producto_id !== 'personalizado' &&
      prod.cantidad &&
      prod.precio_historico
    )

    // Crear detalles solo si hay productos válidos
    if (productosValidos.length > 0) {
      const detalles = productosValidos.map(prod => ({
        pro_id_int: prod.producto_id, // ya es el ID real de BD
        cot_id_int: cotizacion.cot_id_int,
        det_cot_cant_int: prod.cantidad,
        det_cot_prec_hist_int: prod.precio_historico
      }))

      const { error: detalleError } = await supabase
        .from('Detalle_Cotizacion')
        .insert(detalles)

      if (detalleError) {
      }
    } else {
    }

    // Crear información adicional (solo si hay datos para insertar)
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
    // Actualizar cotización principal
    const datosLimpios: any = {}

    if (cotizacionData.cliente_id !== undefined) datosLimpios.per_id_int = cotizacionData.cliente_id
    
    // Solo actualizar fecha de emisión si se proporciona una fecha válida y diferente
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
    
    // Solo actualizar fecha de vencimiento si se proporciona una fecha válida y diferente
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

    // Actualizar productos si se proporcionan
    if (cotizacionData.productos) {
      // Eliminar detalles existentes
      const { error: deleteError } = await supabase
        .from('Detalle_Cotizacion')
        .delete()
        .eq('cot_id_int', id)

      if (deleteError) throw deleteError

      // Insertar nuevos detalles
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

    // Actualizar información adicional si se proporciona
    if (cotizacionData.lugar_recojo !== undefined ||
      cotizacionData.forma_entrega !== undefined ||
      cotizacionData.terminos_condiciones !== undefined ||
      cotizacionData.forma_pago_id !== undefined) {

      const infoLimpia: any = {}
      if (cotizacionData.lugar_recojo !== undefined) infoLimpia.inf_ad_lug_recojo_vac = cotizacionData.lugar_recojo?.trim() || null
      if (cotizacionData.forma_entrega !== undefined) infoLimpia.inf_ad_form_entr_vac = cotizacionData.forma_entrega?.trim() || null
      if (cotizacionData.terminos_condiciones !== undefined) infoLimpia.inf_ad_term_cond_vac = cotizacionData.terminos_condiciones?.trim() || null
      if (cotizacionData.forma_pago_id !== undefined) infoLimpia.form_pa_id_int = cotizacionData.forma_pago_id || null

      // Verificar si ya existe información adicional
      const { data: infoExistente } = await supabase
        .from('Informacion_Adicional')
        .select('*')
        .eq('cot_id_int', id)
        .single()

      if (infoExistente) {
        // Actualizar existente
        const { error: updateInfoError } = await supabase
          .from('Informacion_Adicional')
          .update(infoLimpia)
          .eq('cot_id_int', id)

        if (updateInfoError) throw updateInfoError
      } else {
        // Crear nueva
        const { error: insertInfoError } = await supabase
          .from('Informacion_Adicional')
          .insert({
            ...infoLimpia,
            cot_id_int: id
          })

        if (insertInfoError) throw insertInfoError
      }
    }

    // Obtener cotización actualizada
    return await obtenerCotizacionPorId(id)
  } catch (error) {
    console.error('Error actualizando cotización:', error)
    throw error
  }
}

// ============================================
// SEGUIMIENTO DE PEDIDOS
// ============================================

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
        )
      `)
      .eq('ped_cod_segui_vac', codigoSeguimiento)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }

    // Transformar los datos para que coincidan con nuestro tipo ClientePersona
    if (data && data.cotizacion && data.cotizacion.persona) {
      const persona = data.cotizacion.persona

      // Los datos vienen como arrays, necesitamos convertirlos
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
// FUNCIONES HELPER PARA CERTIFICADOS Y FICHAS TÉCNICAS
// ============================================

// Transformar certificado de BD a formato UI
export function transformarCertificadoBD(certificado: CertificadoCalidadDatabase): import('@/components/admin/cotizaciones/types').Certificado {
  return {
    titulo: `Certificado de Calidad - ${certificado.cer_cal_tipo_vac || 'Sin Tipo'}`,
    codigo: certificado.cer_cal_cod_muestra_int ? certificado.cer_cal_cod_muestra_int.toString() : '',
    tipo: certificado.cer_cal_tipo_vac || '',
    informe: certificado.cer_cal_infor_ensayo_vac || '',
    detalle: [
      certificado.cer_cal_result_vac || '',
      certificado.cer_cal_resum_vac || ''
    ].filter(Boolean), // Solo incluir elementos no vacíos
    link: certificado.cer_cal_imag_url || undefined
  }
}

// Transformar ficha técnica de BD a formato UI
export function transformarFichaTecnicaBD(fichaTecnica: FichaTecnicaDatabase): import('@/components/admin/cotizaciones/types').FichaTecnica {
  return {
    titulo: fichaTecnica.fit_tec_nom_planta_vac || 'Ficha Técnica',
    descripcion: `Código: ${fichaTecnica.fit_tec_cod_vac || 'Sin código'}`,
    archivo: fichaTecnica.fit_tec_imag_vac || ''
  }
}

// Transformar múltiples certificados de BD a formato UI
export function transformarCertificadosBD(certificados: CertificadoCalidadDatabase[]): import('@/components/admin/cotizaciones/types').Certificado[] {
  return certificados.map(transformarCertificadoBD)
}

// Transformar múltiples fichas técnicas de BD a formato UI
export function transformarFichasTecnicasBD(fichasTecnicas: FichaTecnicaDatabase[]): import('@/components/admin/cotizaciones/types').FichaTecnica[] {
  return fichasTecnicas.map(transformarFichaTecnicaBD)
}
