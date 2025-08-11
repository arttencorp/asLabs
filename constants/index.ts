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

// Cambiar esto para que coincida con los valores de BD
export const TIPO_CLIENTE = {
  NATURAL: 'natural',
  JURIDICA: 'juridica'
} as const

// Crear tipo para los valores
export type TipoCliente = typeof TIPO_CLIENTE[keyof typeof TIPO_CLIENTE] // 'natural' | 'juridica'

export const CULTIVOS_OPCIONES = [
  'Banano', 'Quinua', 'Kiwicha', 'Frijol', 'Arveja', 'Otro'
]

// Colores para estados
export const ESTADO_COLORS = {
  pedido: {
    1: "bg-blue-100 text-blue-800 border-blue-200",
    2: "bg-green-100 text-green-800 border-green-200",
    3: "bg-yellow-100 text-yellow-800 border-yellow-200",
    4: "bg-purple-100 text-purple-800 border-purple-200",
    5: "bg-green-100 text-green-800 border-green-200",
    6: "bg-red-100 text-red-800 border-red-200"
  },
  cotizacion: {
    1: "bg-gray-100 text-gray-800 border-gray-200",
    2: "bg-blue-100 text-blue-800 border-blue-200",
    3: "bg-green-100 text-green-800 border-green-200",
    4: "bg-red-100 text-red-800 border-red-200",
    5: "bg-orange-100 text-orange-800 border-orange-200"
  }
} as const