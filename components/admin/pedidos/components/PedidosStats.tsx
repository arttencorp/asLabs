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

  const pedidosPendientes = pedidos.filter(p =>
    p.estado_pedido?.est_ped_tipo_int ? ![6, 7, 8, 9].includes(p.estado_pedido.est_ped_tipo_int) : false
  ).length

  const pedidosEntregados = pedidos.filter(p =>
    p.estado_pedido?.est_ped_tipo_int === 6 // RECIBIDO
  ).length

  const pedidosCancelados = pedidos.filter(p =>
    [7, 8].includes(p.estado_pedido?.est_ped_tipo_int || 0) // CANCELADO o REEMBOLSO
  ).length

  // Calcular ingresos de pedidos entregados
  const ingresosEntregados = pedidos
    .filter(p => p.estado_pedido?.est_ped_tipo_int === 6) // Solo RECIBIDO (entregados)
    .reduce((sum, p) => {
      const total = p.cotizacion?.detalle_cotizacion?.reduce(
        (detSum, detalle) => detSum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int),
        0
      ) || 0
      return sum + (p.cotizacion?.cot_igv_bol ? total * 1.18 : total)
    }, 0)

  // Calcular pérdidas por pedidos cancelados
  const perdidasCancelados = pedidos
    .filter(p => [7, 8].includes(p.estado_pedido?.est_ped_tipo_int || 0)) // CANCELADO o REEMBOLSO
    .reduce((sum, p) => {
      const total = p.cotizacion?.detalle_cotizacion?.reduce(
        (detSum, detalle) => detSum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int),
        0
      ) || 0
      return sum + (p.cotizacion?.cot_igv_bol ? total * 1.18 : total)
    }, 0)

  // Ganancia neta (ingresos - pérdidas)
  const gananciaNeta = ingresosEntregados - perdidasCancelados

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
      title: "Ganancia Neta",
      value: formatCurrency(gananciaNeta),
      description: gananciaNeta >= 0 ? "Ingresos - Pérdidas" : "Pérdidas superan ingresos",
      icon: gananciaNeta >= 0 ? TrendingUp : TrendingDown,
      color: gananciaNeta >= 0 ? "text-green-600" : "text-red-600"
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