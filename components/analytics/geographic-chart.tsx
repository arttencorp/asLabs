"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

interface GeographicChartProps {
  dateRange: { from: Date; to: Date }
}

interface CityData {
  city: string
  orders: number
  revenue: number
}

export default function GeographicChart({ dateRange }: GeographicChartProps) {
  const [data, setData] = useState<CityData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGeographicData()
  }, [dateRange])

  const fetchGeographicData = async () => {
    setLoading(true)
    try {
      const { data: orders } = await supabase
        .from("pedidos")
        .select(`
          total,
          clientes (ciudad)
        `)
        .gte("fecha_pedido", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(dateRange.to, "yyyy-MM-dd"))

      const cityStats =
        orders?.reduce(
          (acc, order) => {
            const city = order.clientes?.ciudad || "Sin especificar"
            if (!acc[city]) {
              acc[city] = { orders: 0, revenue: 0 }
            }
            acc[city].orders += 1
            acc[city].revenue += order.total || 0
            return acc
          },
          {} as Record<string, { orders: number; revenue: number }>,
        ) || {}

      const chartData = Object.entries(cityStats)
        .map(([city, stats]) => ({
          city,
          orders: stats.orders,
          revenue: stats.revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 8) // Top 8 cities

      setData(chartData)
    } catch (error) {
      console.error("Error fetching geographic data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ventas por Ciudad</CardTitle>
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
        <CardTitle>Ventas por Ciudad</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
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
