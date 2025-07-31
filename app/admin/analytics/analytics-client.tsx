"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, TrendingDown, Users, Package, DollarSign, ShoppingCart } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { es } from "date-fns/locale"
import SalesChart from "@/components/analytics/sales-chart"
import OrderStatusChart from "@/components/analytics/order-status-chart"
import CustomerGrowthChart from "@/components/analytics/customer-growth-chart"
import RevenueChart from "@/components/analytics/revenue-chart"
import TopProductsChart from "@/components/analytics/top-products-chart"
import GeographicChart from "@/components/analytics/geographic-chart"
import DateRangePicker from "@/components/ui/date-range-picker"

interface KPIData {
  totalRevenue: number
  revenueGrowth: number
  totalOrders: number
  ordersGrowth: number
  newCustomers: number
  customersGrowth: number
  averageOrderValue: number
  aovGrowth: number
}

interface RecentOrder {
  id: string
  numero_pedido: string
  cliente_nombre: string
  total: number
  estado: string
  fecha_pedido: string
}

export default function AnalyticsClient() {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [kpiData, setKpiData] = useState<KPIData>({
    totalRevenue: 0,
    revenueGrowth: 0,
    totalOrders: 0,
    ordersGrowth: 0,
    newCustomers: 0,
    customersGrowth: 0,
    averageOrderValue: 0,
    aovGrowth: 0,
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [dateRange])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Fetch KPI data
      const { data: orders } = await supabase
        .from("pedidos")
        .select("*")
        .gte("fecha_pedido", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(dateRange.to, "yyyy-MM-dd"))

      const { data: allOrders } = await supabase.from("pedidos").select("*")

      const { data: customers } = await supabase
        .from("clientes")
        .select("*")
        .gte("fecha_registro", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_registro", format(dateRange.to, "yyyy-MM-dd"))

      // Calculate KPIs
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0
      const totalOrders = orders?.length || 0
      const newCustomers = customers?.length || 0
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

      // Calculate growth (comparing with previous period)
      const periodLength = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
      const previousPeriodStart = subDays(dateRange.from, periodLength)
      const previousPeriodEnd = subDays(dateRange.to, periodLength)

      const { data: previousOrders } = await supabase
        .from("pedidos")
        .select("*")
        .gte("fecha_pedido", format(previousPeriodStart, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(previousPeriodEnd, "yyyy-MM-dd"))

      const { data: previousCustomers } = await supabase
        .from("clientes")
        .select("*")
        .gte("fecha_registro", format(previousPeriodStart, "yyyy-MM-dd"))
        .lte("fecha_registro", format(previousPeriodEnd, "yyyy-MM-dd"))

      const previousRevenue = previousOrders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0
      const previousOrdersCount = previousOrders?.length || 0
      const previousCustomersCount = previousCustomers?.length || 0
      const previousAOV = previousOrdersCount > 0 ? previousRevenue / previousOrdersCount : 0

      const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0
      const ordersGrowth =
        previousOrdersCount > 0 ? ((totalOrders - previousOrdersCount) / previousOrdersCount) * 100 : 0
      const customersGrowth =
        previousCustomersCount > 0 ? ((newCustomers - previousCustomersCount) / previousCustomersCount) * 100 : 0
      const aovGrowth = previousAOV > 0 ? ((averageOrderValue - previousAOV) / previousAOV) * 100 : 0

      setKpiData({
        totalRevenue,
        revenueGrowth,
        totalOrders,
        ordersGrowth,
        newCustomers,
        customersGrowth,
        averageOrderValue,
        aovGrowth,
      })

      // Fetch recent orders
      const { data: recent } = await supabase
        .from("pedidos")
        .select("*")
        .order("fecha_pedido", { ascending: false })
        .limit(5)

      setRecentOrders(recent || [])
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = async () => {
    try {
      const { data: orders } = await supabase
        .from("pedidos")
        .select(`
          *,
          clientes (nombre, email, telefono, ciudad)
        `)
        .gte("fecha_pedido", format(dateRange.from, "yyyy-MM-dd"))
        .lte("fecha_pedido", format(dateRange.to, "yyyy-MM-dd"))

      if (!orders) return

      const csvContent = [
        ["Número Pedido", "Cliente", "Email", "Teléfono", "Ciudad", "Total", "Estado", "Fecha"],
        ...orders.map((order) => [
          order.numero_pedido,
          order.clientes?.nombre || "",
          order.clientes?.email || "",
          order.clientes?.telefono || "",
          order.clientes?.ciudad || "",
          order.total,
          order.estado,
          format(new Date(order.fecha_pedido), "dd/MM/yyyy", { locale: es }),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `analytics-${format(new Date(), "yyyy-MM-dd")}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting data:", error)
    }
  }

  const quickDateRanges = [
    { label: "Últimos 7 días", days: 7 },
    { label: "Últimos 30 días", days: 30 },
    { label: "Últimos 90 días", days: 90 },
    { label: "Este mes", range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
    { label: "Este año", range: { from: startOfYear(new Date()), to: endOfYear(new Date()) } },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount)
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "completado":
        return "bg-green-100 text-green-800"
      case "en_proceso":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">
              Período: {format(dateRange.from, "dd MMM yyyy", { locale: es })} -{" "}
              {format(dateRange.to, "dd MMM yyyy", { locale: es })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickDateRanges.map((range) => (
              <Button
                key={range.label}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (range.days) {
                    setDateRange({
                      from: subDays(new Date(), range.days),
                      to: new Date(),
                    })
                  } else if (range.range) {
                    setDateRange(range.range)
                  }
                }}
              >
                {range.label}
              </Button>
            ))}
            {/*<DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} /> */}
            <Button onClick={exportData} className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(kpiData.totalRevenue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpiData.revenueGrowth >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                <span className={kpiData.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(kpiData.revenueGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.totalOrders}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpiData.ordersGrowth >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                <span className={kpiData.ordersGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(kpiData.ordersGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.newCustomers}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpiData.customersGrowth >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                <span className={kpiData.customersGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(kpiData.customersGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Promedio Pedido</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(kpiData.averageOrderValue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpiData.aovGrowth >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                <span className={kpiData.aovGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(kpiData.aovGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart dateRange={dateRange} />
          <OrderStatusChart dateRange={dateRange} />
          <CustomerGrowthChart dateRange={dateRange} />
          <RevenueChart dateRange={dateRange} />
          <TopProductsChart dateRange={dateRange} />
          <GeographicChart dateRange={dateRange} />
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{order.numero_pedido}</p>
                      <p className="text-sm text-gray-500">{order.cliente_nombre}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(order.estado)}>{order.estado.replace("_", " ")}</Badge>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(order.total)}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(order.fecha_pedido), "dd MMM yyyy", { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
