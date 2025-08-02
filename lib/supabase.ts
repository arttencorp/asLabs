import { createClient } from "@supabase/supabase-js"

// Verificar que las variables de entorno estén configuradas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Crear cliente de Supabase con configuración robusta
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

// Tipos
export interface Cliente {
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
  fecha_pedido: string
  fecha_actualizacion: string
  notas?: string
  cliente?: Cliente
}

export interface HistorialEstado {
  id: string
  pedido_id: string
  estado_anterior?: string
  estado_nuevo: string
  comentario?: string
  created_at: string
}

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
 
// Funciones para Clientes
export async function obtenerClientes(): Promise<Cliente[]> {
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
  cliente: Omit<Cliente, "id" | "created_at" | "updated_at">,
): Promise<Cliente | null> {
  try { 
    // Validar datos requeridos
    if (!cliente.nombres?.trim() || !cliente.apellidos?.trim() || !cliente.email?.trim()) {
      throw new Error("Los campos nombres, apellidos y email son obligatorios")
    }

    // Validar formato de email
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

export async function actualizarCliente(id: string, cliente: Partial<Cliente>): Promise<Cliente | null> {
  try { 
    if (!id?.trim()) {
      throw new Error("ID del cliente es requerido")
    }

    // Validar email si se proporciona
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

    // Verificar si el cliente tiene pedidos asociados
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

// Funciones para Pedidos
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

export async function crearPedido(
  pedido: Omit<Pedido, "id" | "numero_pedido" | "codigo_seguimiento" | "fecha_pedido" | "fecha_actualizacion">,
): Promise<Pedido | null> {
  try { 
    // Validar datos requeridos
    if (!pedido.cliente_id?.trim() || !pedido.productos?.trim() || !pedido.total) {
      throw new Error("Los campos cliente_id, productos y total son obligatorios")
    }

    if (pedido.total <= 0) {
      throw new Error("El total debe ser mayor a 0")
    }

    // Verificar que el cliente existe
    const { data: cliente, error: clienteError } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", pedido.cliente_id)
      .single()

    if (clienteError || !cliente) {
      throw new Error("El cliente seleccionado no existe")
    }

    // Generar códigos únicos
    let codigoSeguimiento = generarCodigoSeguimiento()
    let numeroPedido = generarNumeroPedido()

    // Verificar que los códigos sean únicos
    const { data: existingPedido } = await supabase
      .from("pedidos")
      .select("id")
      .or(`codigo_seguimiento.eq.${codigoSeguimiento},numero_pedido.eq.${numeroPedido}`)
      .limit(1)

    // Si existe, generar nuevos códigos
    if (existingPedido && existingPedido.length > 0) {
      codigoSeguimiento = generarCodigoSeguimiento()
      numeroPedido = generarNumeroPedido()
    }

    const pedidoData = {
      numero_pedido: numeroPedido,
      codigo_seguimiento: codigoSeguimiento,
      cliente_id: pedido.cliente_id,
      productos: pedido.productos.trim(),
      total: Number(pedido.total),
      estado: pedido.estado || "recibido",
      codigo_rastreo: pedido.codigo_rastreo?.trim() || null,
      notas: pedido.notas?.trim() || null,
      fecha_pedido: new Date().toISOString(),
      fecha_actualizacion: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("pedidos")
      .insert([pedidoData])
      .select(`
        *,
        cliente:clientes(*)
      `)
      .single()

    if (error) {
      console.error("Error creando pedido:", error)
      throw new Error(`Error al crear pedido: ${error.message}`)
    }

    console.log("Pedido creado exitosamente:", data)
    return data
  } catch (error: any) {
    console.error("Error en crearPedido:", error)
    throw error
  }
}

export async function actualizarPedido(id: string, pedido: Partial<Pedido>): Promise<Pedido | null> {
  try { 
    if (!id?.trim()) {
      throw new Error("ID del pedido es requerido")
    }

    const pedidoData: any = {
      fecha_actualizacion: new Date().toISOString(),
    }

    if (pedido.cliente_id !== undefined) pedidoData.cliente_id = pedido.cliente_id
    if (pedido.productos !== undefined) pedidoData.productos = pedido.productos.trim()
    if (pedido.total !== undefined) {
      if (pedido.total <= 0) {
        throw new Error("El total debe ser mayor a 0")
      }
      pedidoData.total = Number(pedido.total)
    }
    if (pedido.estado !== undefined) pedidoData.estado = pedido.estado
    if (pedido.codigo_rastreo !== undefined) pedidoData.codigo_rastreo = pedido.codigo_rastreo?.trim() || null
    if (pedido.notas !== undefined) pedidoData.notas = pedido.notas?.trim() || null

    const { data, error } = await supabase
      .from("pedidos")
      .update(pedidoData)
      .eq("id", id)
      .select(`
        *,
        cliente:clientes(*)
      `)
      .single()

    if (error) {
      console.error("Error actualizando pedido:", error)
      throw new Error(`Error al actualizar pedido: ${error.message}`)
    }

    console.log("Pedido actualizado exitosamente:", data)
    return data
  } catch (error: any) {
    console.error("Error en actualizarPedido:", error)
    throw error
  }
}

export async function eliminarPedido(id: string): Promise<boolean> {
  try { 
    if (!id?.trim()) {
      throw new Error("ID del pedido es requerido")
    }

    const { error } = await supabase.from("pedidos").delete().eq("id", id)

    if (error) {
      console.error("Error eliminando pedido:", error)
      throw new Error(`Error al eliminar pedido: ${error.message}`)
    }

    console.log("Pedido eliminado exitosamente")
    return true
  } catch (error: any) {
    console.error("Error en eliminarPedido:", error)
    throw error
  }
}

export async function obtenerPedidoPorCodigo(codigo: string): Promise<Pedido | null> {
  try { 
    if (!codigo?.trim()) {
      throw new Error("Código de seguimiento es requerido")
    }

    const { data, error } = await supabase
      .from("pedidos")
      .select(`
        *,
        cliente:clientes(*)
      `)
      .eq("codigo_seguimiento", codigo.trim().toUpperCase())
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        // No se encontró el pedido
        console.log("ℹ️ No se encontró pedido con código:", codigo)
        return null
      }
      console.error("Error obteniendo pedido por código:", error)
      throw new Error(`Error al buscar pedido: ${error.message}`)
    }

    console.log("Pedido encontrado:", data)
    return data
  } catch (error: any) {
    console.error("Error en obtenerPedidoPorCodigo:", error)
    throw error
  }
}