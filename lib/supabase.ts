import { createClient } from "@supabase/supabase-js"
import { generarCodigoSeguimiento, generarNumeroCotizacion } from '@/utils'
import type { 
  PersonaNatural, 
  PersonaJuridica, 
  Persona, 
  EstadoPedido,
  EstadoCotizacion,
  FormaPago,
  ProductoDatabase
} from '@/types/database'
import type { ClientePersona } from '@/utils'

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

export async function crearPersona(personaData: {
  // Datos generales
  per_nom_contac_vac: string
  per_email_vac: string
  per_telef_int: string
  per_direc_vac: string
  per_cultivo_vac: string
  per_cantidad_int: number | null
  per_fec_prob_dt: string
  per_hec_disp_int: number | null
  per_hec_inst_int: number | null
  per_observaciones_vac: string
  tipo: 'natural' | 'juridica'
  // Persona Natural
  per_nat_dni_int?: number | null
  per_nat_nomb_vac?: string
  per_nat_apell_vac?: string
  // Persona Jurídica
  per_jurd_ruc_int?: number | null
  per_jurd_razSocial_vac?: string
}): Promise<ClientePersona> {
  try {
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
  estado_id: string
  codigo_rastreo?: string
  observaciones?: string
  numero_comprobante?: string
  imagen_url?: string
}) {
  try {
    const codigoSeguimiento = generarCodigoSeguimiento()
    const fechaActual = new Date().toISOString()

    const { data, error } = await supabase
      .from('Pedidos')
      .insert({
        ped_cod_segui_vac: codigoSeguimiento,
        ped_cod_rastreo_vac: pedidoData.codigo_rastreo,
        ped_fec_pedido_dt: fechaActual,
        ped_fec_actualizada_dt: fechaActual,
        ped_imagen_url: pedidoData.imagen_url,
        ped_observacion_vac: pedidoData.observaciones,
        ped_num_comprob_vac: pedidoData.numero_comprobante,
        est_ped_id_int: pedidoData.estado_id,
        cot_id_int: pedidoData.cotizacion_id
      })
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
  fecha_emision: string
  fecha_vencimiento: string
  incluye_igv: boolean
  productos: Array<{
    producto_id: string
    cantidad: number
    precio_historico: number
  }>
  forma_pago_id: string
  lugar_recojo: string
  forma_entrega: string
  terminos_condiciones: string
}) {
  try {
    const numeroCotizacion = generarNumeroCotizacion()

    // Crear cotización
    const { data: cotizacion, error: cotizacionError } = await supabase
      .from('Cotizaciones')
      .insert({
        cot_num_vac: numeroCotizacion,
        cot_fec_emis_dt: cotizacionData.fecha_emision,
        cot_fec_venc_dt: cotizacionData.fecha_vencimiento,
        cot_igv_bol: cotizacionData.incluye_igv,
        est_cot_id_int: '1', // Borrador por defecto
        per_id_int: cotizacionData.cliente_id
      })
      .select()
      .single()

    if (cotizacionError) throw cotizacionError

    // Crear detalles
    const detalles = cotizacionData.productos.map(prod => ({
      pro_id_int: prod.producto_id,
      cot_id_int: cotizacion.cot_id_int,
      det_cot_cant_int: prod.cantidad,
      det_cot_prec_hist_int: prod.precio_historico
    }))

    const { error: detalleError } = await supabase
      .from('Detalle_Cotizacion')
      .insert(detalles)

    if (detalleError) throw detalleError

    // Crear información adicional
    const { error: infoError } = await supabase
      .from('Informacion_Adicional')
      .insert({
        inf_ad_lug_recojo_vac: cotizacionData.lugar_recojo,
        inf_ad_form_entr_vac: cotizacionData.forma_entrega,
        inf_ad_term_cond_vac: cotizacionData.terminos_condiciones,
        form_pa_id_int: cotizacionData.forma_pago_id,
        cot_id_int: cotizacion.cot_id_int
      })

    if (infoError) throw infoError

    return cotizacion
  } catch (error) {
    console.error('Error creando cotización:', error)
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