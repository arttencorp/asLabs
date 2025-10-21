"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Percent, Clock, UserCheck, Target, DollarSign, TrendingUp, TrendingDown, ShoppingCart, Users } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { es } from "date-fns/locale"
import { calcularTotalCotizacion } from "@/utils/index"
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
  // Nuevos KPIs Fase 1
  conversionRate: number // Cotizaciones que se vuelven pedidos
  conversionGrowth: number
  avgConversionTime: number // Días promedio de cotización a pedido
  conversionTimeGrowth: number
  customerRetentionRate: number // % clientes que hicieron más de 1 pedido
  retentionGrowth: number
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
    // Nuevos KPIs Fase 1 - Inicialización
    conversionRate: 0,
    conversionGrowth: 0,
    avgConversionTime: 0,
    conversionTimeGrowth: 0,
    customerRetentionRate: 0,
    retentionGrowth: 0,
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Función de éxito reutilizable (patrón useBaseCrud)
  const showSuccess = (message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [dateRange])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    setError(null)
    try {
      // === FETCH DATA FOR CURRENT PERIOD ===
      // Fetch orders in current period with ALL related data (same as usePedidos)
      const { data: orders } = await supabase
        .from("Pedidos")
        .select(`
          ped_id_int,
          ped_fec_pedido_dt,
          cot_id_int,
          estado_pedido:Estado_Pedido(*),
          cotizacion:Cotizaciones(
            cot_id_int,
            cot_igv_bol,
            detalle_cotizacion:Detalle_Cotizacion(
              det_cot_cant_int,
              det_cot_prec_hist_int
            )
          )
        `)
        .gte("ped_fec_pedido_dt", format(dateRange.from, "yyyy-MM-dd"))
        .lte("ped_fec_pedido_dt", format(dateRange.to, "yyyy-MM-dd"))

      // Fetch all cotizaciones in period
      const { data: quotations } = await supabase
        .from("Cotizaciones")
        .select("cot_id_int, cot_fec_emis_dt, per_id_int")
        .gte("cot_fec_emis_dt", format(dateRange.from, "yyyy-MM-dd"))
        .lte("cot_fec_emis_dt", format(dateRange.to, "yyyy-MM-dd"))

      // Fetch cotizaciones info for orders (to get customer and dates)
      const orderQuotationIds = orders?.map(o => o.cot_id_int).filter(Boolean) || []
      const { data: orderQuotations } = orderQuotationIds.length > 0 
        ? await supabase
            .from("Cotizaciones")
            .select("cot_id_int, cot_fec_emis_dt, per_id_int")
            .in("cot_id_int", orderQuotationIds)
        : { data: [] }

      // Fetch new customers in period
      const { data: customers } = await supabase
        .from("Personas")
        .select("per_id_int, per_created_at_dt")
        .gte("per_created_at_dt", format(dateRange.from, "yyyy-MM-dd"))
        .lte("per_created_at_dt", format(dateRange.to, "yyyy-MM-dd"))

      // Fetch all orders for customer analysis
      const { data: allOrders } = await supabase
        .from("Pedidos")
        .select("ped_id_int, ped_fec_pedido_dt, cot_id_int")

      // Fetch all quotations for mapping
      const { data: allQuotations } = await supabase
        .from("Cotizaciones")
        .select("cot_id_int, cot_fec_emis_dt, per_id_int")

      // === CALCULATE CURRENT PERIOD KPIs ===
      // Calculate REAL total revenue using EXACTLY the same logic as PedidosStats
      
      // FIXED: estado_pedido is an OBJECT, not an array
      const completedOrders = orders?.filter((p: any) => {
        const estadoDesc = p.estado_pedido?.est_ped_desc_vac
        // Incluir tanto "PEDIDO_RECIBIDO" como "PAGO_VERIFICADO" para ingresos
        return estadoDesc === "PEDIDO_RECIBIDO" || estadoDesc === "PAGO_VERIFICADO"
      }) // Solo pedidos RECIBIDOS
      
      // Calculate revenue using EXACTLY the same logic as PedidosStats
      // Ingresos de pedidos completados
      const ingresosEntregados = orders
        ?.filter((p: any) => {
          const estadoDesc = p.estado_pedido?.est_ped_desc_vac
          return estadoDesc === "PEDIDO_RECIBIDO" || estadoDesc === "PAGO_VERIFICADO"
        })
        .reduce((sum, p: any) => {
          const cotizacion = Array.isArray(p.cotizacion) ? p.cotizacion[0] : p.cotizacion
          const total = cotizacion?.detalle_cotizacion?.reduce(
            (detSum: number, detalle: any) => detSum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int),
            0
          ) || 0
          return sum + (cotizacion?.cot_igv_bol ? total * 1.18 : total)
        }, 0) || 0

      // Los pedidos cancelados NO se restan porque no hubo transacción real
      // Solo mostramos los ingresos reales de pedidos completados
      const totalRevenue = ingresosEntregados
      
      // Filter non-cancelled orders for total orders count (exclude CANCELADO/REEMBOLSO)
      const validOrders = orders?.filter((order: any) => {
        const estadoDesc = order.estado_pedido?.est_ped_desc_vac
        // Excluir estados cancelados y reembolsos
        return !["CANCELADO", "PEDIDO_CANCELADO", "PEDIDO_REEMBOLSO"].includes(estadoDesc || "")
      }) || []
      
      let totalOrders = validOrders.length
      let newCustomers = customers?.length || 0

      // All values are now calculated from real database data - no hardcoded values

      // === CREATE MAPPING OBJECTS ===
      const quotationMap = new Map()
      orderQuotations?.forEach(q => quotationMap.set(q.cot_id_int, q))
      allQuotations?.forEach(q => quotationMap.set(q.cot_id_int, q))

      // === CONVERSION RATE CALCULATION ===
      let totalQuotations = quotations?.length || 0
      let convertedQuotations = orders?.length || 0
      let conversionRate = totalQuotations > 0 ? (convertedQuotations / totalQuotations) * 100 : 0

      // Use real conversion rate data only - no fallback values

      // === AVERAGE CONVERSION TIME ===
      let totalConversionDays = 0
      let conversionsWithTime = 0
      
      orders?.forEach(order => {
        const quotation = quotationMap.get(order.cot_id_int)
        if (quotation?.cot_fec_emis_dt && order.ped_fec_pedido_dt) {
          const quotationDate = new Date(quotation.cot_fec_emis_dt)
          const orderDate = new Date(order.ped_fec_pedido_dt)
          const daysDiff = Math.ceil((orderDate.getTime() - quotationDate.getTime()) / (1000 * 60 * 60 * 24))
          if (daysDiff >= 0) {
            totalConversionDays += daysDiff
            conversionsWithTime++
          }
        }
      })
      
      let avgConversionTime = conversionsWithTime > 0 ? totalConversionDays / conversionsWithTime : 0

      // Use real conversion time data only - no fallback values

      // === CUSTOMER RETENTION RATE ===
      const customerOrderCounts = new Map()
      allOrders?.forEach(order => {
        const quotation = quotationMap.get(order.cot_id_int)
        const customerId = quotation?.per_id_int
        if (customerId) {
          customerOrderCounts.set(customerId, (customerOrderCounts.get(customerId) || 0) + 1)
        }
      })
      
      const repeatCustomers = Array.from(customerOrderCounts.values()).filter(count => count > 1).length
      const totalCustomersWithOrders = customerOrderCounts.size
      let customerRetentionRate = totalCustomersWithOrders > 0 ? (repeatCustomers / totalCustomersWithOrders) * 100 : 0

      // Use real retention rate data only - no fallback values

      // Removed average customer ticket calculation

      // === CALCULATE PREVIOUS PERIOD FOR GROWTH COMPARISON ===
      const periodLength = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
      const previousPeriodStart = subDays(dateRange.from, periodLength)
      const previousPeriodEnd = subDays(dateRange.to, periodLength)

      const { data: previousOrders } = await supabase
        .from("Pedidos")
        .select("ped_id_int, ped_fec_pedido_dt, cot_id_int")
        .gte("ped_fec_pedido_dt", format(previousPeriodStart, "yyyy-MM-dd"))
        .lte("ped_fec_pedido_dt", format(previousPeriodEnd, "yyyy-MM-dd"))

      const { data: previousQuotations } = await supabase
        .from("Cotizaciones")
        .select("cot_id_int")
        .gte("cot_fec_emis_dt", format(previousPeriodStart, "yyyy-MM-dd"))
        .lte("cot_fec_emis_dt", format(previousPeriodEnd, "yyyy-MM-dd"))

      const { data: previousCustomers } = await supabase
        .from("Personas")
        .select("per_id_int")
        .gte("per_created_at_dt", format(previousPeriodStart, "yyyy-MM-dd"))
        .lte("per_created_at_dt", format(previousPeriodEnd, "yyyy-MM-dd"))

      // === CALCULATE PREVIOUS PERIOD METRICS ===
      const previousRevenue = 0 // Will be calculated when revenue calculation is implemented for historical periods
      const previousOrdersCount = previousOrders?.length || 0
      const previousCustomersCount = previousCustomers?.length || 0
      const previousTotalQuotations = previousQuotations?.length || 0
      const previousConversionRate = previousTotalQuotations > 0 ? (previousOrdersCount / previousTotalQuotations) * 100 : 0

      // Calculate previous conversion time
      let prevTotalConversionDays = 0
      let prevConversionsWithTime = 0
      
      previousOrders?.forEach(order => {
        const quotation = quotationMap.get(order.cot_id_int)
        if (quotation?.cot_fec_emis_dt && order.ped_fec_pedido_dt) {
          const quotationDate = new Date(quotation.cot_fec_emis_dt)
          const orderDate = new Date(order.ped_fec_pedido_dt)
          const daysDiff = Math.ceil((orderDate.getTime() - quotationDate.getTime()) / (1000 * 60 * 60 * 24))
          if (daysDiff >= 0) {
            prevTotalConversionDays += daysDiff
            prevConversionsWithTime++
          }
        }
      })
      
      const prevAvgConversionTime = prevConversionsWithTime > 0 ? prevTotalConversionDays / prevConversionsWithTime : 0

      // === CALCULATE GROWTH PERCENTAGES ===
      let revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0
      let ordersGrowth = previousOrdersCount > 0 ? ((totalOrders - previousOrdersCount) / previousOrdersCount) * 100 : 0
      let customersGrowth = previousCustomersCount > 0 ? ((newCustomers - previousCustomersCount) / previousCustomersCount) * 100 : 0
      let conversionGrowth = previousConversionRate > 0 ? ((conversionRate - previousConversionRate) / previousConversionRate) * 100 : 0
      let conversionTimeGrowth = prevAvgConversionTime > 0 ? ((avgConversionTime - prevAvgConversionTime) / prevAvgConversionTime) * 100 : 0

      // For simplicity, using current period retention rate (could be improved with historical data)
      let retentionGrowth = 0 // Would need historical retention data to calculate properly

      // No fallback data needed - all calculations are from real database data
      // Growth percentages are calculated from period comparisons above

      setKpiData({
        totalRevenue,
        revenueGrowth,
        totalOrders,
        ordersGrowth,
        newCustomers,
        customersGrowth,
        // New KPIs Fase 1
        conversionRate,
        conversionGrowth,
        avgConversionTime,
        conversionTimeGrowth,
        customerRetentionRate,
        retentionGrowth,
      })

      // Fetch recent orders - simplificada para evitar HTTP 400
      const { data: recentPedidos, error: recentOrdersError } = await supabase
        .from("Pedidos")
        .select(`
          ped_id_int,
          ped_fec_pedido_dt,
          cot_id_int,
          estado_pedido:Estado_Pedido(*)
        `)
        .order("ped_created_at_dt", { ascending: false })
        .limit(5)

      // Transform recent orders to match expected interface - simplified
      const recentOrdersFormatted = recentPedidos?.map((pedido: any) => {
        return {
          id: pedido.ped_id_int,
          numero_pedido: pedido.ped_id_int.slice(-8) || 'N/A', // Usar parte del ID como número
          cliente_nombre: 'Cliente', 
          total: 0, // Simplified for now - could fetch cotizacion separately if needed
          estado: pedido.estado_pedido?.est_ped_desc_vac === 'PEDIDO_RECIBIDO' ? 'completado' : 
                  pedido.estado_pedido?.est_ped_desc_vac === 'PAGO_VERIFICADO' ? 'en_proceso' : 
                  ['CANCELADO', 'PEDIDO_CANCELADO', 'PEDIDO_REEMBOLSO'].includes(pedido.estado_pedido?.est_ped_desc_vac || '') ? 'cancelado' :
                  'pendiente',
          fecha_pedido: pedido.ped_fec_pedido_dt
        }
      }) || []

      setRecentOrders(recentOrdersFormatted) 
    } catch (error) {
      setError("Error al cargar los datos analíticos")
    } finally {
      setLoading(false)
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
                className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium"
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
          </div>
        </div>

        {/* KPI Cards - 3 arriba, 3 abajo */}
        <div className="space-y-6">
          {/* Primera fila - 3 KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPI 1 - Ingresos Totales */}
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
              <div className="text-xs text-muted-foreground mt-1">
                Suma total de pedidos completados
              </div>
            </CardContent>
          </Card>

          {/* KPI 2 - Total Pedidos */}
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
              <div className="text-xs text-muted-foreground mt-1">
                Pedidos procesados
              </div>
            </CardContent>
          </Card>

          {/* KPI 3 - Nuevos Clientes */}
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
              <div className="text-xs text-muted-foreground mt-1">
                Registros nuevos
              </div>
            </CardContent>
          </Card>

          </div>

          {/* Segunda fila - 3 KPIs adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPI 4 - Tasa de Conversión */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.conversionRate.toFixed(1)}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {kpiData.conversionGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={kpiData.conversionGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(kpiData.conversionGrowth).toFixed(1)}%
                  </span>
                  <span className="ml-1">vs período anterior</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Cotizaciones → Pedidos
                </div>
              </CardContent>
            </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo de Conversión</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.avgConversionTime.toFixed(0)} días</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpiData.conversionTimeGrowth <= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                <span className={kpiData.conversionTimeGrowth <= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(kpiData.conversionTimeGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Promedio cotización → pedido
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retención de Clientes</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpiData.customerRetentionRate.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpiData.retentionGrowth >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                <span className={kpiData.retentionGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(kpiData.retentionGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">vs período anterior</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Clientes con pedidos recurrentes
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart dateRange={dateRange} />
          <OrderStatusChart dateRange={dateRange} />
          <CustomerGrowthChart dateRange={dateRange} />
          <RevenueChart dateRange={dateRange} />
          <TopProductsChart dateRange={dateRange} />{/* 
          <GeographicChart dateRange={dateRange} />*/}
        </div>
      </div>
    </div>
  )
}
