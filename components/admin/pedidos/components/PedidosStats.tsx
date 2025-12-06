"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Clock, CheckCircle, XCircle, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from '@/utils/index'
import type { Pedido } from '../types'

interface PedidosStatsProps {
  pedidos: Pedido[]
  loading?: boolean
}

export function PedidosStats({ pedidos, loading }: PedidosStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Calcular estadísticas
  const totalPedidos = pedidos.length

  const pedidosPendientes = pedidos.filter(p => {
    const estadoDesc = p.estado_pedido?.est_ped_desc_vac
    return estadoDesc && !["PEDIDO_RECIBIDO", "PAGO_VERIFICADO", "CANCELADO", "PEDIDO_CANCELADO", "PEDIDO_REEMBOLSO"].includes(estadoDesc)
  }).length

  const pedidosEntregados = pedidos.filter(p => {
    const estadoDesc = p.estado_pedido?.est_ped_desc_vac
    return estadoDesc === "PEDIDO_RECIBIDO" || estadoDesc === "PAGO_VERIFICADO"
  }).length

  const pedidosCancelados = pedidos.filter(p => {
    const estadoDesc = p.estado_pedido?.est_ped_desc_vac
    return ["CANCELADO", "PEDIDO_CANCELADO", "PEDIDO_REEMBOLSO"].includes(estadoDesc || "")
  }).length

  // Calcular ingresos de pedidos entregados
  const ingresosEntregados = pedidos
    .filter(p => {
      const estadoDesc = p.estado_pedido?.est_ped_desc_vac
      return estadoDesc === "PEDIDO_RECIBIDO" || estadoDesc === "PAGO_VERIFICADO"
    }) // RECIBIDO o PAGO_VERIFICADO (entregados)
    .reduce((sum, p) => {
      const precioBase = p.cotizacion?.detalle_cotizacion?.reduce(
        (detSum, detalle) => detSum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int),
        0
      ) || 0
      
      // Calcular total correcto según si incluye IGV o no
      let total: number
      if (p.cotizacion?.cot_igv_bol) {
        // CON IGV: precio base + 18%
        total = precioBase + (precioBase * 0.18)
      } else {
        // SIN IGV: precio base ya incluye IGV
        total = precioBase
      }
      
      return sum + total
    }, 0)

  // Los pedidos cancelados no generan pérdidas reales, solo no generan ingresos
  // Mostramos los ingresos totales de pedidos completados
  const ingresosNetos = ingresosEntregados

  const stats = [
    {
      title: "Total Pedidos",
      value: totalPedidos.toString(),
      description: "Pedidos registrados",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Pendientes",
      value: pedidosPendientes.toString(),
      description: "En proceso",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Entregados",
      value: pedidosEntregados.toString(),
      description: "Completados exitosamente",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Cancelados",
      value: pedidosCancelados.toString(),
      description: "Cancelados o reembolsados",
      icon: XCircle,
      color: "text-red-600"
    },
    {
      title: "Ingresos Totales",
      value: formatCurrency(ingresosNetos),
      description: "Suma total de pedidos completados",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}