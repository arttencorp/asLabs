"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { supabase } from "@/lib/supabase"
import { format, eachDayOfInterval } from "date-fns"
import { es } from "date-fns/locale"

interface CustomerGrowthChartProps {
  dateRange: { from: Date; to: Date }
}

interface GrowthData {
  date: string
  total: number
  new: number
}

export default function CustomerGrowthChart({ dateRange }: CustomerGrowthChartProps) {
  const [data, setData] = useState<GrowthData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGrowthData()
  }, [dateRange])

  const fetchGrowthData = async () => {
    setLoading(true)
    try {
      const { data: allCustomers } = await supabase
        .from("clientes")
        .select("fecha_registro")
        .order("fecha_registro", { ascending: true })

      const dates = eachDayOfInterval({ start: dateRange.from, end: dateRange.to })

      const growthData = dates.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd")

        // Count total customers up to this date
        const totalCustomers = allCustomers?.filter((customer) => new Date(customer.fecha_registro) <= date).length || 0

        // Count new customers on this specific date
        const newCustomers =
          allCustomers?.filter((customer) => format(new Date(customer.fecha_registro), "yyyy-MM-dd") === dateStr)
            .length || 0

        return {
          date: format(date, "dd MMM", { locale: es }),
          total: totalCustomers,
          new: newCustomers,
        }
      })

      setData(growthData)
    } catch (error) {
      console.error("Error fetching growth data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crecimiento de Clientes</CardTitle>
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
        <CardTitle>Crecimiento de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value, name) => [value, name === "total" ? "Total Clientes" : "Nuevos Clientes"]} />
            <Area type="monotone" dataKey="total" stackId="1" stroke="#2e7d32" fill="#2e7d32" fillOpacity={0.6} />
            <Area type="monotone" dataKey="new" stackId="2" stroke="#81c784" fill="#81c784" fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
