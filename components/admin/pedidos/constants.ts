import { ESTADOS_PEDIDO_TIPOS, ESTADOS_COTIZACION_TIPOS, ESTADO_COLORS } from '@/constants'

// Re-exportar las constantes globales
export { ESTADOS_PEDIDO_TIPOS, ESTADOS_COTIZACION_TIPOS }

// Mapear colores específicos usando las constantes globales
export const ESTADO_PEDIDO_COLORS = ESTADO_COLORS.pedido
export const ESTADO_COTIZACION_COLORS = ESTADO_COLORS.cotizacion

// Constantes específicas de pedidos
export const ITEMS_PER_PAGE = 10
export const SEARCH_DEBOUNCE_MS = 300

export const PEDIDO_FORM_INITIAL = {
  cotizacion_id: '',
  estado_id: '',
  codigo_rastreo: '',
  observaciones: '',
  numero_comprobante: '',
  imagen_url: ''
}