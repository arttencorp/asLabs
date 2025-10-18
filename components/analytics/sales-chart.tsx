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
    fetchRealData()
  }, [dateRange])

  const fetchRealData = async () => {
    setLoading(true)
    try {
      // Find the REAL minimum date from database
      const { data: oldestOrder } = await supabase
        .from("Pedidos")
        .select("ped_fec_pedido_dt")
        .order("ped_fec_pedido_dt", { ascending: true })
        .limit(1)
      
      let actualStartDate = dateRange.from
      if (oldestOrder && oldestOrder.length > 0) {
        const dbStartDate = new Date(oldestOrder[0].ped_fec_pedido_dt)
        actualStartDate = new Date(Math.max(dateRange.from.getTime(), dbStartDate.getTime()))
      }
      
      const actualEndDate = new Date(Math.min(dateRange.to.getTime(), new Date().getTime()))
      
      // Fetch orders data
      const { data: orders } = await supabase
        .from("Pedidos")
        .select("ped_fec_pedido_dt")
        .gte("ped_fec_pedido_dt", format(actualStartDate, "yyyy-MM-dd"))
        .lte("ped_fec_pedido_dt", format(actualEndDate, "yyyy-MM-dd"))
      
      // Create all dates in range
      const allDates = eachDayOfInterval({ start: actualStartDate, end: actualEndDate })
      
      const salesByDate = allDates.map((date) => {
        // Skip future dates
        if (date > new Date()) return null
        
        const dateStr = format(date, "yyyy-MM-dd")
        const dayOrders = orders?.filter((order: any) => {
          const orderDate = format(new Date(order.ped_fec_pedido_dt), "yyyy-MM-dd")
          return orderDate === dateStr
        }) || []

        const ordersCount = dayOrders.length
        // TODO: Calculate real average when we find the correct total field
        // For now, show order count only until we have real revenue data
        const estimatedSales = ordersCount > 0 ? ordersCount * 1 : 0 // Just show order count as sales for now
        
        return {
          date: `${date.getDate()} ${date.toLocaleDateString('es', { month: 'short' })}`,
          sales: estimatedSales,
          orders: ordersCount
        }
      }).filter(Boolean) as SalesData[]

      setData(salesByDate)
      
    } catch (error) {
      setData([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ventas y Pedidos Diarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas y Pedidos Diarios</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              formatter={(value: any, name: any) => [
                name === "sales" ? `S/ ${value?.toLocaleString()}` : `${value} pedidos`,
                name === "sales" ? "Ventas" : "Pedidos"
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#f97316" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 5, fill: "#f97316" }}
              yAxisId="left"
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 5, fill: "#3b82f6" }}
              yAxisId="right"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
