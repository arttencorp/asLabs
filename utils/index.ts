import { ESTADO_COLORS } from '@/constants'
import type { ClientePersona } from '@/types/database'

// Formateo de fechas centralizado
export function formatDate(dateString: string | null | undefined, options?: {
  includeTime?: boolean
  short?: boolean
}): string {
  // Manejar valores null o undefined
  if (!dateString) {
    return 'Sin fecha'
  }

  // Crear la fecha de forma que evite problemas de zona horaria
  const date = new Date(dateString + (dateString.includes('T') ? '' : 'T00:00:00'))

  if (options?.short) {
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: 'America/Lima' // Zona horaria de Lima, Perú
    })
  }

  const baseOptions: Intl.DateTimeFormatOptions = {
    year: "numeric" as const,
    month: "short" as const,
    day: "numeric" as const,
    timeZone: 'America/Lima' // Zona horaria de Lima, Perú
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

// Función para convertir fecha ISO a formato de input date (YYYY-MM-DD)
export function dateToInputValue(dateString: string | null): string {
  if (!dateString) return ''

  try {
    // Si la fecha ya viene como YYYY-MM-DD, devolverla tal como está
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString
    }

    // Si es fecha ISO completa, extraer solo la parte de fecha usando un método más simple
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      console.warn('Fecha inválida recibida:', dateString)
      return ''
    }

    // Método simple: usar toISOString y extraer solo la fecha
    return date.toISOString().split('T')[0]
  } catch (error) {
    console.error('Error en dateToInputValue:', error, 'Input:', dateString)
    return ''
  }
}

// Función para convertir fecha de input a ISO completa considerando zona horaria de Lima
export function inputValueToISO(dateString: string): string {
  if (!dateString) return ''

  // Crear fecha en zona horaria de Lima (UTC-5)
  const limaDate = new Date(dateString + 'T00:00:00-05:00')
  return limaDate.toISOString()
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
// Genera un código alfanumérico aleatorio de la longitud especificada
function generarCodigoAleatorio(longitud: number = 8): string {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Sin caracteres confusos (0, O, 1, I)
  let codigo = ''
  for (let i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  }
  return codigo
}

export async function generarCodigoSeguimiento(): Promise<string> {
  try {
    const { createClient } = await import("@supabase/supabase-js")

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const year = new Date().getFullYear()

    // Generar código completamente aleatorio sin límite de intentos
    // Formato: ASL2026-XXXXXXXX (16 caracteres total)
    // El espacio de posibilidades es tan grande que colisiones son prácticamente imposibles
    // 32^8 = 1,099,511,627,776 combinaciones posibles por año
    while (true) {
      const codigoAleatorio = generarCodigoAleatorio(8)
      const codigoGenerado = `ASL${year}-${codigoAleatorio}`

      // Verificar que no exista
      const { data: existeData, error: existeError } = await supabase
        .from("Pedidos")
        .select("ped_cod_segui_vac")
        .eq("ped_cod_segui_vac", codigoGenerado)
        .limit(1)

      if (existeError) {
        console.error("Error al verificar unicidad:", existeError)
        // En caso de error de BD, generar uno con timestamp para no bloquear
        const timestamp = Date.now().toString(36).toUpperCase()
        return `ASL${year}-${timestamp}${generarCodigoAleatorio(3)}`
      }

      // Si no existe, retornar el código único
      if (!existeData || existeData.length === 0) {
        return codigoGenerado
      }

      // Si existe (extremadamente improbable), el while continúa y genera otro
      console.warn(`Código duplicado detectado: ${codigoGenerado}. Generando nuevo...`)
    }

  } catch (error) {
    console.error("Error en generarCodigoSeguimiento:", error)
    // Fallback: código con timestamp + aleatorio
    const year = new Date().getFullYear()
    const timestamp = Date.now().toString(36).toUpperCase()
    return `ASL${year}-${timestamp}${generarCodigoAleatorio(3)}`
  }
}

export async function generarNumeroCotizacion(): Promise<string> {
  try {
    const { createClient } = await import("@supabase/supabase-js")

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const year = new Date().getFullYear()
    const maxIntentos = 10 // Prevenir loops infinitos

    for (let intento = 1; intento <= maxIntentos; intento++) {
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
      const codigoGenerado = `${numeroFormateado}-${year}`

      // Comprobar si el código ya existe
      const { data: existeData, error: existeError } = await supabase
        .from("Cotizaciones")
        .select("cot_num_vac")
        .eq("cot_num_vac", codigoGenerado)
        .limit(1)

      if (existeError) {
        console.error("Error al verificar unicidad:", existeError)
        continue // Reintentar
      }

      // Si no existe, retornar el código único
      if (!existeData || existeData.length === 0) {
        return codigoGenerado
      }

      // Si existe, reintentar (esto maneja race conditions)
      console.warn(`Código duplicado detectado: ${codigoGenerado}. Reintentando...`)
    }

    // Si después de todos los intentos no se pudo generar un código único,
    // usar timestamp como fallback
    console.error("No se pudo generar código único después de", maxIntentos, "intentos")
    const timestamp = Date.now()
    return `${timestamp.toString().slice(-6)}-${year}`

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
  if (typeof obj === 'boolean') return obj // Manejar booleanos explícitamente
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
  const precioBase = detalles.reduce(
    (sum, detalle) => sum + (detalle.cantidad * detalle.precio),
    0
  )

  let subtotal: number
  let igv: number
  let total: number

  if (incluye_igv) {
    // Con IGV: El precio base NO incluye IGV, se agrega 18%
    // Ejemplo: base=100 → subtotal=100, igv=18, total=118
    subtotal = precioBase
    igv = precioBase * 0.18
    total = precioBase + igv
  } else {
    // Sin IGV: El precio base YA incluye IGV, se desglosa
    // Ejemplo: base=100 → subtotal=82, igv=18, total=100
    total = precioBase
    subtotal = precioBase / 1.18
    igv = precioBase - subtotal
  }

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    igv: Math.round(igv * 100) / 100,
    total: Math.round(total * 100) / 100
  }
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

  function convertirGrupo(num: number): string {
    let resultado = ""

    if (num >= 100) {
      if (num === 100) {
        resultado += "cien "
      } else {
        resultado += centenas[Math.floor(num / 100)] + " "
      }
      num = num % 100
    }

    if (num >= 20) {
      resultado += decenas[Math.floor(num / 10)]
      if (num % 10 !== 0) {
        resultado += " y " + unidades[num % 10]
      }
    } else {
      resultado += unidades[num]
    }

    return resultado.trim()
  }

  if (numero === 0) return "cero"

  const entero = Math.floor(numero)
  const decimal = Math.round((numero - entero) * 100)

  let resultado = ""
  let numeroRestante = entero

  // Millones (1,000,000 - 9,999,999)
  if (numeroRestante >= 1000000) {
    const millones = Math.floor(numeroRestante / 1000000)
    if (millones === 1) {
      resultado += "un millón "
    } else {
      resultado += convertirGrupo(millones) + " millones "
    }
    numeroRestante = numeroRestante % 1000000
  }

  // Miles (1,000 - 999,999)
  if (numeroRestante >= 1000) {
    const miles = Math.floor(numeroRestante / 1000)
    if (miles === 1) {
      resultado += "mil "
    } else {
      resultado += convertirGrupo(miles) + " mil "
    }
    numeroRestante = numeroRestante % 1000
  }

  // Unidades, decenas y centenas (0-999)
  if (numeroRestante > 0) {
    resultado += convertirGrupo(numeroRestante)
  }

  resultado = resultado.trim()

  if (decimal > 0) {
    resultado += ` y ${decimal.toString().padStart(2, '0')}/100`
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