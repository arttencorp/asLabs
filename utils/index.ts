import { ESTADO_COLORS } from '@/constants'
import type { ClientePersona } from '@/types/database'

// Formateo de fechas centralizado
export function formatDate(dateString: string, options?: {
  includeTime?: boolean
  short?: boolean
}): string {
  const date = new Date(dateString)

  if (options?.short) {
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const baseOptions = {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
  }

  if (options?.includeTime) {
    return date.toLocaleDateString("es-PE", {
      ...baseOptions,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return date.toLocaleDateString("es-PE", baseOptions)
}

// Formateo de moneda
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(amount)
}

// Validaciones
export function validarRUC(ruc: string): boolean {
  if (!ruc || ruc.length !== 11) return false
  return /^\d{11}$/.test(ruc)
}

export function validarDNI(dni: string): boolean {
  if (!dni || dni.length !== 8) return false
  return /^\d{8}$/.test(dni)
}

// Generadores únicos (sin duplicaciones)
export function generarCodigoSeguimiento(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "ASL-"
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export async function generarNumeroCotizacion(): Promise<string> {
  try {
    const { createClient } = await import("@supabase/supabase-js")
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const year = new Date().getFullYear()

    // Buscar el último número de cotización del año actual
    const { data, error } = await supabase
      .from("Cotizaciones")
      .select("cot_num_vac")
      .ilike("cot_num_vac", `%-${year}`)
      .order("cot_num_vac", { ascending: false })
      .limit(1)

    if (error) {
      console.error("Error al obtener último número de cotización:", error)
      // Fallback: usar timestamp si hay error
      const timestamp = Date.now()
      return `${timestamp.toString().slice(-6)}-${year}`
    }

    let siguienteNumero = 1

    if (data && data.length > 0) {
      // Extraer el número de la cotización (parte antes del guión)
      const ultimaCotizacion = data[0].cot_num_vac
      const match = ultimaCotizacion.match(/^(\d+)-\d{4}$/)
      
      if (match) {
        const ultimoNumero = parseInt(match[1], 10)
        siguienteNumero = ultimoNumero + 1
      }
    }

    // Formatear con ceros a la izquierda (4 dígitos)
    const numeroFormateado = siguienteNumero.toString().padStart(4, "0")
    
    return `${numeroFormateado}-${year}`
  } catch (error) {
    console.error("Error en generarNumeroCotizacion:", error)
    // Fallback: usar timestamp si hay error
    const timestamp = Date.now()
    const year = new Date().getFullYear()
    return `${timestamp.toString().slice(-6)}-${year}`
  }
}

//Re-export ClientePersona type from database types for convenience
export type { ClientePersona } from '@/types/database'

export function getNombreCompleto(persona: ClientePersona): string {
  // Verificar si es persona natural y tiene datos
  if (persona.tipo === 'natural' && persona.persona_natural) {
    const { per_nat_nomb_vac, per_nat_apell_vac } = persona.persona_natural
    if (per_nat_nomb_vac && per_nat_apell_vac) {
      return `${per_nat_nomb_vac} ${per_nat_apell_vac}`.trim()
    }
  }

  // Verificar si es persona jurídica y tiene datos
  if (persona.tipo === 'juridica' && persona.persona_juridica) {
    const { per_jurd_razSocial_vac } = persona.persona_juridica
    if (per_jurd_razSocial_vac) {
      return per_jurd_razSocial_vac.trim()
    }
  }

  // Fallback al nombre de contacto si existe
  if (persona.per_nom_contac_vac && persona.per_nom_contac_vac.trim()) {
    return persona.per_nom_contac_vac.trim()
  }

  // Último fallback
  return ''
}

export function getDocumentoCliente(persona: ClientePersona): string {
  if (persona.tipo === 'natural' && persona.persona_natural?.per_nat_dni_int) {
    return `DNI: ${persona.persona_natural.per_nat_dni_int}`
  }

  if (persona.tipo === 'juridica' && persona.persona_juridica?.per_jurd_ruc_int) {
    return `RUC: ${persona.persona_juridica.per_jurd_ruc_int}`
  }

  return ''
}

export function getEmailCliente(persona: ClientePersona): string {
  if (persona?.per_email_vac) {
    return `${persona.per_email_vac}`
  }

  return ''
} 

export function getTelfCliente(persona: ClientePersona): string {
  if (persona?.per_telef_int) {
    return `${persona.per_telef_int}`
  }

  return ''
}

export function getCultivoCliente(persona: ClientePersona): string {
  if (persona?.per_cultivo_vac && persona.per_cultivo_vac.trim()) {
    return persona.per_cultivo_vac.trim()
  }
  return 'Sin tipo de cultivo'
}

export function getCantidadCultivo(persona: ClientePersona): string {
  if (persona?.per_cantidad_int) {
    return persona.per_cantidad_int.toString()
  }
  return ''
}

// Funciones específicas para impresión de cotizaciones
export function getDocumentoClienteParaImpresion(persona: ClientePersona): {
  etiqueta: string;
  valor: string;
} {
  if (persona.tipo === 'natural' && persona.persona_natural?.per_nat_dni_int) {
    return {
      etiqueta: 'DNI',
      valor: persona.persona_natural.per_nat_dni_int.toString()
    }
  }

  if (persona.tipo === 'juridica' && persona.persona_juridica?.per_jurd_ruc_int) {
    return {
      etiqueta: 'RUC',
      valor: persona.persona_juridica.per_jurd_ruc_int.toString()
    }
  }

  return {
    etiqueta: '',
    valor: ''
  }
}

// Función para limpiar datos antes de enviar a BD (convierte strings vacíos a null)
export function limpiarDatosParaBD(obj: any): any {
  if (obj === null || obj === undefined) return null
  if (typeof obj === 'string') return obj.trim() === '' ? null : obj.trim()
  // No convertir números a null - deja que Supabase maneje los IDs
  if (typeof obj === 'number') return obj
  if (Array.isArray(obj)) return obj.length === 0 ? null : obj
  if (typeof obj === 'object') {
    const cleaned: any = {}
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = limpiarDatosParaBD(value)
    }
    return cleaned
  }
  return obj
}

// Función para formatear datos de cotización para impresión
export function formatearDatosCotizacionParaImpresion(cotizacion: any, cliente?: ClientePersona) {
  const documento = cliente ? getDocumentoClienteParaImpresion(cliente) : { etiqueta: '', valor: '' }
  
  return {
    razonSocial: cotizacion.razonSocial || '',
    documentoEtiqueta: documento.etiqueta,
    documentoValor: documento.valor,
    direccion: cotizacion.direccion || '',
    telefono: cotizacion.telefono || '',
    fechaEmision: cotizacion.fechaEmision || '',
    fechaVencimiento: cotizacion.fechaVencimiento || ''
  }
}

// Estado helpers
export function getEstadoColor(tipo: number, categoria: 'pedido' | 'cotizacion'): string {
  return ESTADO_COLORS[categoria][tipo as keyof typeof ESTADO_COLORS[typeof categoria]] ||
    "bg-gray-100 text-gray-800 border-gray-200"
}

// Cálculos de cotización (centralizados)
export function calcularTotalCotizacion(
  detalles: Array<{ cantidad: number; precio: number }>,
  incluye_igv: boolean = false
): { subtotal: number; igv: number; total: number } {
  const subtotal = detalles.reduce(
    (sum, detalle) => sum + (detalle.cantidad * detalle.precio),
    0
  )

  const igv = incluye_igv ? subtotal * 0.18 : 0
  const total = subtotal + igv

  return { subtotal, igv, total }
}

// Formateo de números como texto (para cotizaciones)
export function numeroATexto(numero: number): string {
  if (typeof numero !== "number") {
    return "cero y 00/100"
  }

  const unidades = [
    "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete",
    "dieciocho", "diecinueve"
  ]

  const decenas = [
    "", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta",
    "ochenta", "noventa"
  ]

  const centenas = [
    "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
    "seiscientos", "setecientos", "ochocientos", "novecientos"
  ]

  if (numero === 0) return "cero"

  const entero = Math.floor(numero)
  const decimal = Math.round((numero - entero) * 100)

  let resultado = ""

  if (entero >= 1000) {
    const miles = Math.floor(entero / 1000)
    resultado += miles === 1 ? "mil " : numeroATexto(miles) + " mil "
    numero = entero % 1000
  } else {
    numero = entero
  }

  if (numero >= 100) {
    resultado += centenas[Math.floor(numero / 100)] + " "
    numero = numero % 100
  }

  if (numero >= 20) {
    resultado += decenas[Math.floor(numero / 10)]
    if (numero % 10 !== 0) {
      resultado += " y " + unidades[numero % 10]
    }
  } else {
    resultado += unidades[numero]
  }

  resultado = resultado.trim()

  if (decimal > 0) {
    resultado += ` y ${decimal}/100`
  } else {
    resultado += " y 00/100"
  }

  return resultado
}

// Helpers de fechas específicos
export function calcularFechaVencimiento(dias: number): string {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toISOString().split("T")[0]
}