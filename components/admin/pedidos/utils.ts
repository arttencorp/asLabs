export function generarCodigoSeguimiento(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "ASL-"
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function generarNumeroCotizacion(): string {
  const timestamp = Date.now()
  const year = new Date().getFullYear()
  return `COT-${year}-${timestamp.toString().slice(-6)}`
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

export function calcularTotalCotizacion(
  detalles: Array<{ det_cot_cant_int: number; det_cot_prec_hist_int: number }>,
  incluye_igv: boolean = false
): number {
  const subtotal = detalles.reduce(
    (sum, detalle) => sum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int), 
    0
  )
  
  if (incluye_igv) {
    return subtotal * 1.18 // 18% IGV
  }
  
  return subtotal
}

export function calcularIGV(subtotal: number): number {
  return subtotal * 0.18
}

export function getEstadoPedidoColor(tipo: number): string {
  return ESTADO_PEDIDO_COLORS[tipo as keyof typeof ESTADO_PEDIDO_COLORS] || 
         "bg-gray-100 text-gray-800 border-gray-200"
}

export function getEstadoCotizacionColor(tipo: number): string {
  return ESTADO_COTIZACION_COLORS[tipo as keyof typeof ESTADO_COTIZACION_COLORS] || 
         "bg-gray-100 text-gray-800 border-gray-200"
}

export function validarRUC(ruc: string): boolean {
  if (!ruc || ruc.length !== 11) return false
  return /^\d{11}$/.test(ruc)
}

export function validarDNI(dni: string): boolean {
  if (!dni || dni.length !== 8) return false
  return /^\d{8}$/.test(dni)
}

export function getNombreCompleto(persona: ClientePersona): string {
  if (persona.tipo === 'natural' && persona.persona_natural) {
    return `${persona.persona_natural.per_nat_nomb_vac} ${persona.persona_natural.per_nat_apell_vac}`
  }
  
  if (persona.tipo === 'juridica' && persona.persona_juridica) {
    return persona.persona_juridica.per_jurd_razSocial_vac
  }
  
  return persona.per_nom_contac_vac || 'Sin nombre'
}

import { ESTADO_PEDIDO_COLORS, ESTADO_COTIZACION_COLORS } from './constants'
import type { ClientePersona } from './types'