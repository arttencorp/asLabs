import { Cotizacion, EstadoCotizacion, EstadoPedido, FormaPago, Pedido, PedidoForm, Producto } from "@/components/admin/pedidos/types"
import { createClient } from "@supabase/supabase-js"

// Verificar que las variables de entorno estén configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Crear cliente de Supabase
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
// TIPOS PARA SISTEMA NUEVO (tabla "Personas")
// ============================================
export interface PersonaNatural {
  per_nat_id_int: string
  per_nat_dni_int: number
  per_nat_nomb_vac: string
  per_nat_apell_vac: string
  per_id_int: string
}

export interface PersonaJuridica {
  per_jurd_id_int: string
  per_jurd_ruc_int: number
  per_jurd_razSocial_vac: string
  per_id_int: string
}

export interface Persona {
  per_id_int: string
  per_nom_contac_vac: string
  per_email_vac: string
  per_telef_int: string
  per_direc_vac: string
  per_cultivo_vac: string
  per_cantidad_int: number
  per_fec_prob_dt: string
  per_hec_disp_int: number
  per_hec_inst_int: number
  per_created_at_dt: string
  per_updated_at_dt: string
  per_observaciones_vac: string
}

export interface ClientePersona extends Persona {
  persona_natural?: PersonaNatural
  persona_juridica?: PersonaJuridica
  tipo: 'natural' | 'juridica'
}

export interface ClienteForm {
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
  
  // Tipo de persona
  tipo: 'natural' | 'juridica'
  
  // Persona Natural
  per_nat_dni_int?: number | null
  per_nat_nomb_vac?: string
  per_nat_apell_vac?: string
  
  // Persona Jurídica
  per_jurd_ruc_int?: number | null
  per_jurd_razSocial_vac?: string
}

// Estados de pedido
export const ESTADOS_PEDIDO = [
  {
    id: "recibido",
    nombre: "Pedido Recibido",
    descripcion: "Hemos recibido tu pedido y lo estamos procesando",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "pago_verificado",
    nombre: "Pago Verificado",
    descripcion: "Tu pago ha sido confirmado exitosamente",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "preparando",
    nombre: "Preparando Pedido",
    descripcion: "Estamos preparando tus productos para el envío",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: "empacando",
    nombre: "Empacando Pedido",
    descripcion: "Tus productos están siendo empacados cuidadosamente",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    id: "enviado",
    nombre: "Enviado",
    descripcion: "Tu pedido está en camino a tu dirección",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "entregado",
    nombre: "Entregado",
    descripcion: "Tu pedido ha sido entregado exitosamente",
    color: "bg-green-100 text-green-800 border-green-200",
  },
]

// Función para generar código de seguimiento
export function generarCodigoSeguimiento(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Función para generar número de pedido
export function generarNumeroPedido(): string {
  const timestamp = Date.now()
  return `PED-${timestamp}`
}

// ============================================
// FUNCIONES PARA SISTEMA NUEVO (Personas)
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
      tipo: persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
      persona_natural: persona.Persona_Natural[0] || null,
      persona_juridica: persona.Persona_Juridica[0] || null
    }))
  } catch (error) {
    console.error('Error obteniendo personas:', error)
    throw error
  }
}

export async function crearPersona(clienteForm: ClienteForm): Promise<ClientePersona> {
  try {
    const { data: persona, error: personaError } = await supabase
      .from('Personas')
      .insert({
        per_nom_contac_vac: clienteForm.per_nom_contac_vac,
        per_email_vac: clienteForm.per_email_vac,
        per_telef_int: clienteForm.per_telef_int,
        per_direc_vac: clienteForm.per_direc_vac,
        per_cultivo_vac: clienteForm.per_cultivo_vac,
        per_cantidad_int: clienteForm.per_cantidad_int,
        per_fec_prob_dt: clienteForm.per_fec_prob_dt,
        per_hec_disp_int: clienteForm.per_hec_disp_int,
        per_hec_inst_int: clienteForm.per_hec_inst_int,
        per_observaciones_vac: clienteForm.per_observaciones_vac
      })
      .select()
      .single()

    if (personaError) throw personaError

    if (clienteForm.tipo === 'natural') {
      const { error: naturalError } = await supabase
        .from('Persona_Natural')
        .insert({
          per_nat_dni_int: clienteForm.per_nat_dni_int,
          per_nat_nomb_vac: clienteForm.per_nat_nomb_vac,
          per_nat_apell_vac: clienteForm.per_nat_apell_vac,
          per_id_int: persona.per_id_int
        })

      if (naturalError) throw naturalError
    } else {
      const { error: juridicaError } = await supabase
        .from('Persona_Juridica')
        .insert({
          per_jurd_ruc_int: clienteForm.per_jurd_ruc_int,
          per_jurd_razSocial_vac: clienteForm.per_jurd_razSocial_vac,
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

export async function actualizarPersona(id: string, clienteForm: ClienteForm): Promise<ClientePersona> {
  try {
    const { error: personaError } = await supabase
      .from('Personas')
      .update({
        per_nom_contac_vac: clienteForm.per_nom_contac_vac,
        per_email_vac: clienteForm.per_email_vac,
        per_telef_int: clienteForm.per_telef_int,
        per_direc_vac: clienteForm.per_direc_vac,
        per_cultivo_vac: clienteForm.per_cultivo_vac,
        per_cantidad_int: clienteForm.per_cantidad_int,
        per_fec_prob_dt: clienteForm.per_fec_prob_dt,
        per_hec_disp_int: clienteForm.per_hec_disp_int,
        per_hec_inst_int: clienteForm.per_hec_inst_int,
        per_observaciones_vac: clienteForm.per_observaciones_vac,
        per_updated_at_dt: new Date().toISOString()
      })
      .eq('per_id_int', id)

    if (personaError) throw personaError

    if (clienteForm.tipo === 'natural') {
      const { error: naturalError } = await supabase
        .from('Persona_Natural')
        .update({
          per_nat_dni_int: clienteForm.per_nat_dni_int,
          per_nat_nomb_vac: clienteForm.per_nat_nomb_vac,
          per_nat_apell_vac: clienteForm.per_nat_apell_vac
        })
        .eq('per_id_int', id)

      if (naturalError) throw naturalError
    } else {
      const { error: juridicaError } = await supabase
        .from('Persona_Juridica')
        .update({
          per_jurd_ruc_int: clienteForm.per_jurd_ruc_int,
          per_jurd_razSocial_vac: clienteForm.per_jurd_razSocial_vac
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
// FUNCIONES PARA SISTEMA NUEVO (Pedidos/Cotizaciones)
// ============================================

export async function obtenerPedidos(): Promise<Pedido[]> {
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
    return data || []
  } catch (error) {
    console.error('Error obteniendo pedidos:', error)
    throw error
  }
}

export async function obtenerCotizaciones(): Promise<Cotizacion[]> {
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

export async function obtenerProductos(): Promise<Producto[]> {
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

export async function crearPedidoNuevo(pedidoForm: PedidoForm): Promise<Pedido> {
  try {
    const codigoSeguimiento = generarCodigoSeguimiento()
    const fechaActual = new Date().toISOString()

    const { data, error } = await supabase
      .from('Pedidos')
      .insert({
        ped_cod_segui_vac: codigoSeguimiento,
        ped_cod_rastreo_vac: pedidoForm.codigo_rastreo,
        ped_fec_pedido_dt: fechaActual,
        ped_fec_actualizada_dt: fechaActual,
        ped_imagen_url: pedidoForm.imagen_url,
        ped_observacion_vac: pedidoForm.observaciones,
        ped_num_comprob_vac: pedidoForm.numero_comprobante,
        est_ped_id_int: pedidoForm.estado_id,
        cot_id_int: pedidoForm.cotizacion_id
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

export async function actualizarPedidoNuevo(id: string, pedidoForm: Partial<PedidoForm>): Promise<Pedido> {
  try {
    const updateData: any = {
      ped_fec_actualizada_dt: new Date().toISOString()
    }

    if (pedidoForm.estado_id !== undefined) updateData.est_ped_id_int = pedidoForm.estado_id
    if (pedidoForm.codigo_rastreo !== undefined) updateData.ped_cod_rastreo_vac = pedidoForm.codigo_rastreo
    if (pedidoForm.observaciones !== undefined) updateData.ped_observacion_vac = pedidoForm.observaciones
    if (pedidoForm.numero_comprobante !== undefined) updateData.ped_num_comprob_vac = pedidoForm.numero_comprobante
    if (pedidoForm.imagen_url !== undefined) updateData.ped_imagen_url = pedidoForm.imagen_url

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

export async function eliminarPedidoNuevo(id: string): Promise<void> {
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