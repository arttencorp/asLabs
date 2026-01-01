"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { supabase } from "@/lib/supabase"
import { format, eachDayOfInterval } from "date-fns"
import { es } from "date-fns/locale"

interface SalesChartProps {
  dateRange: { from: Date; to: Date }
}

interface SalesData {
  date: string
  sales: number
  orders: number
}

export default function SalesChart({ dateRange }: SalesChartProps) {
  const [data, setData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
  }, [dateRange])

  const fetchSalesData = async () => {
    setLoading(true)
    try {
      const { data: orders } = await supabase
        .from("pedidos")
        .select("fecha_pedido, total")
        .gte("fecha_pedido", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(dateRange.to, "yyyy-MM-dd"))

      // Create array of all dates in range
      const dates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })

      const salesByDate = dates.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd")
        const dayOrders =
          orders?.filter((order) => format(new Date(order.fecha_pedido), "yyyy-MM-dd") === dateStr) || []

        return {
          date: format(date, "dd MMM", { locale: es }),
          sales: dayOrders.reduce((sum, order) => sum + (order.total || 0), 0),
          orders: dayOrders.length,
        }
      })

      setData(salesByDate)
    } catch (error) {
      console.error("Error fetching sales data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ventas Diarias</CardTitle>
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
        <CardTitle>Ventas Diarias</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                name === "sales" ? `S/ ${value}` : value,
                name === "sales" ? "Ventas" : "Pedidos",
              ]}
            />
            <Line type="monotone" dataKey="sales" stroke="#2e7d32" strokeWidth={2} dot={{ fill: "#2e7d32" }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
