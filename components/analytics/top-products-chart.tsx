"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TopProductsChartProps {
  dateRange: { from: Date; to: Date }
}

interface ProductData {
  name: string
  sales: number
  revenue: number
}

export default function TopProductsChart({ dateRange }: TopProductsChartProps) {
  const [data, setData] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductData()
  }, [dateRange])

  const fetchProductData = async () => {
    setLoading(true)
    try {
      // Since we don't have a products table, we'll simulate with sample data
      // In a real implementation, you would join with order_items and products tables
      const sampleProducts = [
        { name: "Kit Microbiología", sales: 45, revenue: 13500 },
        { name: "Reactivos PCR", sales: 32, revenue: 9600 },
        { name: "Medios de Cultivo", sales: 28, revenue: 8400 },
        { name: "Plantines Banano", sales: 25, revenue: 7500 },
        { name: "Kit Biología Molecular", sales: 22, revenue: 6600 },
        { name: "Reactivos Histología", sales: 18, revenue: 5400 },
      ]

      setData(sampleProducts)
    } catch (error) {
      console.error("Error fetching product data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Productos</CardTitle>
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
        <CardTitle>Top Productos por Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip
              formatter={(value, name) => [
                name === "revenue" ? `S/ ${value}` : value,
                name === "revenue" ? "Ingresos" : "Ventas",
              ]}
            />
            <Bar dataKey="sales" fill="#2e7d32" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
