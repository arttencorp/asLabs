import { ESTADOS_PEDIDO_TIPOS } from './index'

export const ESTADOS_SEGUIMIENTO = [
  {
    id: ESTADOS_PEDIDO_TIPOS.PEDIDO_RECIBIDO,
    nombre: "Pedido Recibido",
    descripcion: "Hemos recibido tu pedido y lo estamos procesando",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.PAGO_VERIFICADO,
    nombre: "Pago Verificado",
    descripcion: "Tu pago ha sido verificado exitosamente",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.PREPARANDO_PEDIDO,
    nombre: "Preparando Pedido",
    descripcion: "Estamos preparando tus productos",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.EMPACANDO_PEDIDO,
    nombre: "Empacando Pedido",
    descripcion: "Estamos empacando tu pedido para el envío",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.ENVIADO,
    nombre: "Enviado",
    descripcion: "Tu pedido está en camino a tu dirección",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.RECIBIDO,
    nombre: "Recibido",
    descripcion: "Tu pedido ha sido entregado exitosamente",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.CANCELADO,
    nombre: "Cancelado",
    descripcion: "El pedido ha sido cancelado",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.REEMBOLSO,
    nombre: "Reembolso",
    descripcion: "Se está procesando el reembolso",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
] as const