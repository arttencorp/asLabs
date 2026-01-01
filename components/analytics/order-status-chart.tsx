"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

interface OrderStatusChartProps {
  dateRange: { from: Date; to: Date }
}

interface StatusData {
  name: string
  value: number
  color: string
}

const STATUS_COLORS = {
  pendiente: "#fbbf24",
  en_proceso: "#3b82f6",
  completado: "#10b981",
  cancelado: "#ef4444",
}

const STATUS_LABELS = {
  pendiente: "Pendiente",
  en_proceso: "En Proceso",
  completado: "Completado",
  cancelado: "Cancelado",
}

export default function OrderStatusChart({ dateRange }: OrderStatusChartProps) {
  const [data, setData] = useState<StatusData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatusData()
  }, [dateRange])

  const fetchStatusData = async () => {
    setLoading(true)
    try {
      const { data: orders } = await supabase
        .from("pedidos")
        .select("estado")
        .gte("fecha_pedido", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(dateRange.to, "yyyy-MM-dd"))

      const statusCounts =
        orders?.reduce(
          (acc, order) => {
            acc[order.estado] = (acc[order.estado] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ) || {}

      const chartData = Object.entries(statusCounts).map(([status, count]) => ({
        name: STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status,
        value: count,
        color: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || "#6b7280",
      }))

      setData(chartData)
    } catch (error) {
      console.error("Error fetching status data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Estados de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estados de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
