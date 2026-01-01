"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { supabase } from "@/lib/supabase"
import { format, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns"
import { es } from "date-fns/locale"

interface RevenueChartProps {
  dateRange: { from: Date; to: Date }
}

interface RevenueData {
  month: string
  revenue: number
  orders: number
}

export default function RevenueChart({ dateRange }: RevenueChartProps) {
  const [data, setData] = useState<RevenueData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRevenueData()
  }, [dateRange])

  const fetchRevenueData = async () => {
    setLoading(true)
    try {
      const { data: orders } = await supabase
        .from("pedidos")
        .select("fecha_pedido, total")
        .gte("fecha_pedido", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(dateRange.to, "yyyy-MM-dd"))

      const months = eachMonthOfInterval({ start: dateRange.from, end: dateRange.to })

      const revenueByMonth = months.map((month) => {
        const monthStart = startOfMonth(month)
        const monthEnd = endOfMonth(month)

        const monthOrders =
          orders?.filter((order) => {
            const orderDate = new Date(order.fecha_pedido)
            return orderDate >= monthStart && orderDate <= monthEnd
          }) || []

        return {
          month: format(month, "MMM yyyy", { locale: es }),
          revenue: monthOrders.reduce((sum, order) => sum + (order.total || 0), 0),
          orders: monthOrders.length,
        }
      })

      setData(revenueByMonth)
    } catch (error) {
      console.error("Error fetching revenue data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ingresos Mensuales</CardTitle>
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
        <CardTitle>Ingresos Mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                name === "revenue" ? `S/ ${value}` : value,
                name === "revenue" ? "Ingresos" : "Pedidos",
              ]}
            />
            <Bar dataKey="revenue" fill="#2e7d32" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
