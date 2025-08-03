export const ESTADOS_PEDIDO_TIPOS = {
  RECIBIDO: 1,
  CONFIRMADO: 2,
  PREPARANDO: 3,
  ENVIADO: 4,
  ENTREGADO: 5,
  CANCELADO: 6
} as const

export const ESTADOS_COTIZACION_TIPOS = {
  BORRADOR: 1,
  ENVIADA: 2,
  ACEPTADA: 3,
  RECHAZADA: 4,
  VENCIDA: 5
} as const

export const FORMAS_PAGO_TIPOS = {
  CONTADO: 1,
  CREDITO_30: 2,
  CREDITO_60: 3,
  TRANSFERENCIA: 4,
  EFECTIVO: 5
} as const

export const ESTADO_PEDIDO_COLORS = {
  1: "bg-blue-100 text-blue-800 border-blue-200", // Recibido
  2: "bg-green-100 text-green-800 border-green-200", // Confirmado
  3: "bg-yellow-100 text-yellow-800 border-yellow-200", // Preparando
  4: "bg-purple-100 text-purple-800 border-purple-200", // Enviado
  5: "bg-green-100 text-green-800 border-green-200", // Entregado
  6: "bg-red-100 text-red-800 border-red-200" // Cancelado
} as const

export const ESTADO_COTIZACION_COLORS = {
  1: "bg-gray-100 text-gray-800 border-gray-200", // Borrador
  2: "bg-blue-100 text-blue-800 border-blue-200", // Enviada
  3: "bg-green-100 text-green-800 border-green-200", // Aceptada
  4: "bg-red-100 text-red-800 border-red-200", // Rechazada
  5: "bg-orange-100 text-orange-800 border-orange-200" // Vencida
} as const

export const ITEMS_PER_PAGE = 10
export const SEARCH_DEBOUNCE_MS = 300