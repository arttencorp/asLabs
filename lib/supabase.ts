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
// TIPOS PARA SISTEMA ANTIGUO (tabla "clientes")
// ============================================
export interface ClienteAntiguo {
  id: string
  nombres: string
  apellidos: string
  email: string
  telefono: string
  direccion: string
  created_at: string
  updated_at: string
}

export interface Pedido {
  id: string
  numero_pedido: string
  codigo_seguimiento: string
  cliente_id: string
  productos: string
  total: number
  estado: string
  codigo_rastreo?: string
  notas?: string
  fecha_pedido: string
  fecha_actualizacion: string
  cliente?: ClienteAntiguo
}

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
// FUNCIONES PARA SISTEMA ANTIGUO (Clientes/Pedidos)
// ============================================

// Funciones para Clientes (sistema antiguo)
export async function obtenerClientes(): Promise<ClienteAntiguo[]> {
  try { 
    const { data, error } = await supabase.from("clientes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error obteniendo clientes:", error)
      throw new Error(`Error al obtener clientes: ${error.message}`)
    }

    console.log("Clientes obtenidos:", data?.length || 0)
    return data || []
  } catch (error: any) {
    console.error("Error en obtenerClientes:", error)
    throw error
  }
}

export async function crearCliente(
  cliente: Omit<ClienteAntiguo, "id" | "created_at" | "updated_at">,
): Promise<ClienteAntiguo | null> {
  try { 
    if (!cliente.nombres?.trim() || !cliente.apellidos?.trim() || !cliente.email?.trim()) {
      throw new Error("Los campos nombres, apellidos y email son obligatorios")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cliente.email.trim())) {
      throw new Error("El formato del email no es válido")
    }

    const clienteData = {
      nombres: cliente.nombres.trim(),
      apellidos: cliente.apellidos.trim(),
      email: cliente.email.trim().toLowerCase(),
      telefono: cliente.telefono?.trim() || "",
      direccion: cliente.direccion?.trim() || "",
    }

    const { data, error } = await supabase.from("clientes").insert([clienteData]).select().single()

    if (error) {
      console.error("Error creando cliente:", error)
      if (error.code === "23505") {
        throw new Error("Ya existe un cliente con ese email")
      }
      throw new Error(`Error al crear cliente: ${error.message}`)
    }

    console.log("Cliente creado exitosamente:", data)
    return data
  } catch (error: any) {
    console.error("Error en crearCliente:", error)
    throw error
  }
}

export async function actualizarCliente(id: string, cliente: Partial<ClienteAntiguo>): Promise<ClienteAntiguo | null> {
  try { 
    if (!id?.trim()) {
      throw new Error("ID del cliente es requerido")
    }

    if (cliente.email && !cliente.email.trim()) {
      throw new Error("El email no puede estar vacío")
    }

    if (cliente.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(cliente.email.trim())) {
        throw new Error("El formato del email no es válido")
      }
    }

    const clienteData: any = {
      updated_at: new Date().toISOString(),
    }

    if (cliente.nombres !== undefined) clienteData.nombres = cliente.nombres.trim()
    if (cliente.apellidos !== undefined) clienteData.apellidos = cliente.apellidos.trim()
    if (cliente.email !== undefined) clienteData.email = cliente.email.trim().toLowerCase()
    if (cliente.telefono !== undefined) clienteData.telefono = cliente.telefono.trim()
    if (cliente.direccion !== undefined) clienteData.direccion = cliente.direccion.trim()

    const { data, error } = await supabase.from("clientes").update(clienteData).eq("id", id).select().single()

    if (error) {
      console.error("Error actualizando cliente:", error)
      if (error.code === "23505") {
        throw new Error("Ya existe un cliente con ese email")
      }
      throw new Error(`Error al actualizar cliente: ${error.message}`)
    }

    console.log("Cliente actualizado exitosamente:", data)
    return data
  } catch (error: any) {
    console.error("Error en actualizarCliente:", error)
    throw error
  }
}

export async function eliminarCliente(id: string): Promise<boolean> {
  try { 
    if (!id?.trim()) {
      throw new Error("ID del cliente es requerido")
    }

    const { data: pedidos, error: pedidosError } = await supabase
      .from("pedidos")
      .select("id")
      .eq("cliente_id", id)
      .limit(1)

    if (pedidosError) {
      console.error("Error verificando pedidos:", pedidosError)
      throw new Error(`Error al verificar pedidos: ${pedidosError.message}`)
    }

    if (pedidos && pedidos.length > 0) {
      throw new Error("No se puede eliminar el cliente porque tiene pedidos asociados")
    }

    const { error } = await supabase.from("clientes").delete().eq("id", id)

    if (error) {
      console.error("Error eliminando cliente:", error)
      throw new Error(`Error al eliminar cliente: ${error.message}`)
    }

    console.log("Cliente eliminado exitosamente")
    return true
  } catch (error: any) {
    console.error("Error en eliminarCliente:", error)
    throw error
  }
}

// Funciones para Pedidos (resto del código de pedidos...)
export async function obtenerPedidos(): Promise<Pedido[]> {
  try { 
    const { data, error } = await supabase
      .from("pedidos")
      .select(`
        *,
        cliente:clientes(*)
      `)
      .order("fecha_pedido", { ascending: false })

    if (error) {
      console.error("Error obteniendo pedidos:", error)
      throw new Error(`Error al obtener pedidos: ${error.message}`)
    }

    console.log("Pedidos obtenidos:", data?.length || 0)
    return data || []
  } catch (error: any) {
    console.error("Error en obtenerPedidos:", error)
    throw error
  }
}

// ... resto de funciones de pedidos (crearPedido, actualizarPedido, eliminarPedido, obtenerPedidoPorCodigo)

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