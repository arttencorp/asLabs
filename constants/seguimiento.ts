import { ESTADOS_PEDIDO_TIPOS } from './index'

export const ESTADOS_SEGUIMIENTO = [
  {
    id: ESTADOS_PEDIDO_TIPOS.RECIBIDO,
    nombre: "Pedido Recibido",
    descripcion: "Hemos recibido tu pedido y lo estamos procesando",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.CONFIRMADO,
    nombre: "Pago Confirmado",
    descripcion: "Tu pago ha sido confirmado exitosamente",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.PREPARANDO,
    nombre: "Preparando Pedido",
    descripcion: "Estamos preparando tus productos para el envío",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.ENVIADO,
    nombre: "Enviado",
    descripcion: "Tu pedido está en camino a tu dirección",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: ESTADOS_PEDIDO_TIPOS.ENTREGADO,
    nombre: "Entregado",
    descripcion: "Tu pedido ha sido entregado exitosamente",
    color: "bg-green-100 text-green-800 border-green-200",
  },
] as const