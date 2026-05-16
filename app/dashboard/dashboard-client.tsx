"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  LogOut,
  Download,
  Plus,
  BarChart3,
  Leaf,
  MapPin,
  TrendingUp,
  Settings,
  Bell,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  MessageSquare,
  PieChart,
  LineChart,
  Filter,
} from "lucide-react"

interface Zone {
  id: string
  name: string
  area: number
  crop: string
  location: string
}

interface Service {
  id: string
  zoneId: string
  type: string
  date: string
  status: "completed" | "processing" | "pending"
  result?: string
}

interface Evolution {
  id: string
  zoneId: string
  date: string
  parameter: string
  value: number
  unit: string
}

export default function DashboardClient() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [activeTab, setActiveTab] = useState<"inicio" | "zonas" | "servicios" | "evolucion" | "graficos" | "informes" | "solicitar">("inicio")
  const [zones, setZones] = useState<Zone[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [evolution, setEvolution] = useState<Evolution[]>([])
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem("authToken")
    const user = localStorage.getItem("username")

    if (!token || !user) {
      router.push("/login")
      return
    }

    setUsername(user)

    // Datos de prueba
    const mockZones: Zone[] = [
      { id: "z1", name: "Lote Norte", area: 5.2, crop: "Trigo", location: "Trujillo, La Libertad" },
      { id: "z2", name: "Lote Sur", area: 3.8, crop: "Maíz", location: "Trujillo, La Libertad" },
      { id: "z3", name: "Invernadero A", area: 0.5, crop: "Lechuga", location: "Trujillo, La Libertad" },
    ]

    const mockServices: Service[] = [
      {
        id: "s1",
        zoneId: "z1",
        type: "Análisis de Suelo",
        date: "2026-05-10",
        status: "completed",
        result: "pH: 6.8, N: 45 ppm, P: 28 ppm, K: 180 ppm",
      },
      {
        id: "s2",
        zoneId: "z2",
        type: "Control Biológico - Trichoderma",
        date: "2026-05-12",
        status: "processing",
      },
      {
        id: "s3",
        zoneId: "z1",
        type: "Identificación 16S RNA",
        date: "2026-05-05",
        status: "completed",
        result: "Bacillus subtilis, Pseudomonas fluorescens",
      },
      {
        id: "s4",
        zoneId: "z3",
        type: "Análisis Agroindustrial",
        date: "2026-05-08",
        status: "completed",
        result: "Humedad: 85%, Proteína: 12.5%, Materia seca: 15%",
      },
    ]

    const mockEvolution: Evolution[] = [
      { id: "e1", zoneId: "z1", date: "2026-04-15", parameter: "Rendimiento", value: 2450, unit: "kg/ha" },
      { id: "e2", zoneId: "z1", date: "2026-04-22", parameter: "Rendimiento", value: 2680, unit: "kg/ha" },
      { id: "e3", zoneId: "z1", date: "2026-05-01", parameter: "Rendimiento", value: 2850, unit: "kg/ha" },
      { id: "e4", zoneId: "z1", date: "2026-05-10", parameter: "Rendimiento", value: 3020, unit: "kg/ha" },
      { id: "e5", zoneId: "z2", date: "2026-04-20", parameter: "Salud de Plantas", value: 88, unit: "%" },
      { id: "e6", zoneId: "z2", date: "2026-05-05", parameter: "Salud de Plantas", value: 92, unit: "%" },
      { id: "e7", zoneId: "z2", date: "2026-05-12", parameter: "Salud de Plantas", value: 95, unit: "%" },
    ]

    setZones(mockZones)
    setServices(mockServices)
    setEvolution(mockEvolution)
    if (mockZones.length > 0) setSelectedZone(mockZones[0].id)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("username")
    router.push("/login")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "processing":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const statsCards = [
    { label: "Zonas Activas", value: zones.length.toString(), icon: MapPin, color: "bg-green-500" },
    { label: "Servicios Completados", value: services.filter((s) => s.status === "completed").length.toString(), icon: CheckCircle, color: "bg-blue-500" },
    { label: "En Procesamiento", value: services.filter((s) => s.status === "processing").length.toString(), icon: Clock, color: "bg-orange-500" },
    {
      label: "Área Total",
      value: `${zones.reduce((sum, z) => sum + z.area, 0).toFixed(1)} ha`,
      icon: BarChart3,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">AS Labs</h1>
          <p className="text-sm text-gray-500 mt-1">Panel de Resultados</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: "inicio", label: "Inicio", icon: BarChart3 },
            { id: "zonas", label: "Mis Zonas", icon: MapPin },
            { id: "servicios", label: "Servicios", icon: FileText },
            { id: "evolucion", label: "Evolución del Campo", icon: TrendingUp },
            { id: "graficos", label: "Gráficos", icon: LineChart },
            { id: "informes", label: "Informes", icon: FileText },
            { id: "solicitar", label: "Solicitar Análisis", icon: Plus },
          ].map((item) => {
            const Icon = item.icon as any
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeTab === item.id
                    ? "bg-green-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left text-sm">
            <Settings className="w-5 h-5" />
            Configuración
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left text-sm"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido, {username}!</h2>
            <p className="text-gray-500 text-sm mt-1">Gestiona tus zonas y servicios de análisis</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* INICIO TAB */}
          {activeTab === "inicio" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen General</h3>
                <div className="grid grid-cols-4 gap-4">
                  {statsCards.map((card, idx) => {
                    const Icon = card.icon
                    return (
                      <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                          <div className={`${card.color} p-2 rounded-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Últimos Servicios</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {services.slice(0, 3).map((service) => {
                    const zone = zones.find((z) => z.id === service.zoneId)
                    return (
                      <div key={service.id} className="p-4 border-b border-gray-100 last:border-b-0 flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{service.type}</p>
                          <p className="text-sm text-gray-500">{zone?.name} • {service.date}</p>
                          {service.result && <p className="text-sm text-green-600 mt-1"><strong>Resultado:</strong> {service.result}</p>}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          {service.status === "completed" ? "Completado" : service.status === "processing" ? "Procesando" : "Pendiente"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ZONAS TAB */}
          {activeTab === "zonas" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Mis Zonas</h3>
                <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  <Plus className="w-5 h-5" />
                  Nueva Zona
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedZone(zone.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      {selectedZone === zone.id && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{zone.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        {zone.crop}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {zone.area} ha
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{zone.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICIOS TAB */}
          {activeTab === "servicios" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Historial de Servicios</h3>
              <div className="space-y-3">
                {services.map((service) => {
                  const zone = zones.find((z) => z.id === service.zoneId)
                  return (
                    <div key={service.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{service.type}</h4>
                          <p className="text-sm text-gray-600 mt-1">{zone?.name} • {service.date}</p>
                          {service.result && (
                            <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                              <p className="text-sm text-green-700">
                                <strong>Resultado:</strong> {service.result}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(service.status)}`}>
                            {getStatusIcon(service.status)}
                            {service.status === "completed" ? "Completado" : service.status === "processing" ? "Procesando" : "Pendiente"}
                          </span>
                          {service.status === "completed" && (
                            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                              <Download className="w-5 h-5 text-blue-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* EVOLUCION TAB */}
          {activeTab === "evolucion" && selectedZone && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Evolución - {zones.find((z) => z.id === selectedZone)?.name}</h3>
                <p className="text-gray-600 text-sm mb-6">Selecciona una zona en "Mis Zonas" para ver su evolución</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Rendimiento (kg/ha)</h4>
                <div className="space-y-2">
                  {evolution
                    .filter((e) => e.zoneId === selectedZone && e.parameter === "Rendimiento")
                    .map((data) => (
                      <div key={data.id} className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 w-28">{data.date}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2" style={{ background: "linear-gradient(90deg, #e5e7eb 0%, #10b981 100%)", width: "100%" }}>
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(data.value / 3500) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-gray-900 w-20">{data.value} {data.unit}</span>
                      </div>
                    ))}
                </div>
              </div>

              {evolution.find((e) => e.zoneId === selectedZone && e.parameter === "Salud de Plantas") && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Salud de Plantas (%)</h4>
                  <div className="space-y-2">
                    {evolution
                      .filter((e) => e.zoneId === selectedZone && e.parameter === "Salud de Plantas")
                      .map((data) => (
                        <div key={data.id} className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 w-28">{data.date}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.value}%` }}></div>
                          </div>
                          <span className="font-bold text-gray-900 w-20">{data.value}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GRAFICOS TAB */}
          {activeTab === "graficos" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Gráficos de Análisis</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Análisis por tipo de servicio */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Servicios Realizados por Tipo</h4>
                  <div className="space-y-3">
                    {[
                      { type: "Análisis de Suelo", count: 8, color: "bg-green-500", percentage: 40 },
                      { type: "Control Biológico", count: 6, color: "bg-blue-500", percentage: 30 },
                      { type: "Identificación 16S", count: 5, color: "bg-purple-500", percentage: 25 },
                      { type: "Agroindustrial", count: 1, color: "bg-orange-500", percentage: 5 },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{item.type}</span>
                          <span className="text-sm font-bold text-gray-900">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Análisis por zona */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Análisis por Zona</h4>
                  <div className="space-y-3">
                    {zones.map((zone) => {
                      const zoneServiceCount = services.filter((s) => s.zoneId === zone.id).length
                      const maxServices = 8
                      return (
                        <div key={zone.id}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">{zone.name}</span>
                            <span className="text-sm font-bold text-gray-900">{zoneServiceCount}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(zoneServiceCount / maxServices) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Estado de servicios */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-6">Estado de Servicios</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-green-600">
                        {services.filter((s) => s.status === "completed").length}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Completados</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">
                        {services.filter((s) => s.status === "processing").length}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Procesando</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-600">
                        {services.filter((s) => s.status === "pending").length}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Pendiente</p>
                    </div>
                  </div>
                </div>

                {/* Línea temporal de análisis */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Últimos 30 Días</h4>
                  <div className="flex items-end justify-between h-32 gap-1">
                    {[45, 60, 40, 75, 65, 50, 55, 70, 45, 80].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-green-400 to-green-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${height}%` }}
                        title={`Día ${idx + 1}`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">Actividad de análisis</p>
                </div>
              </div>
            </div>
          )}

          {/* INFORMES TAB */}
          {activeTab === "informes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Informes Disponibles</h3>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filtrar
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Informe Completo de Análisis - Lote Norte",
                    zone: "Lote Norte",
                    date: "2026-05-10",
                    services: 3,
                    type: "Completo",
                  },
                  {
                    title: "Reporte Mensual - Control Biológico",
                    zone: "Lote Sur",
                    date: "2026-04-30",
                    services: 2,
                    type: "Especializado",
                  },
                  {
                    title: "Análisis de Salud del Cultivo - Invernadero A",
                    zone: "Invernadero A",
                    date: "2026-05-08",
                    services: 1,
                    type: "Rápido",
                  },
                  {
                    title: "Comparativo Trimestral",
                    zone: "Todas las Zonas",
                    date: "2026-05-01",
                    services: 6,
                    type: "Comparativo",
                  },
                ].map((informe, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{informe.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {informe.zone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {informe.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {informe.services} análisis
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                          {informe.type}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                          <Download className="w-5 h-5 text-green-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Generar nuevo informe */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
                <h4 className="font-bold text-gray-900 mb-3">Generar Nuevo Informe</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Crea un informe personalizado con los análisis que desees incluir
                </p>
                <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  <Plus className="w-5 h-5" />
                  Crear Informe
                </button>
              </div>
            </div>
          )}

          {/* SOLICITAR TAB */}
          {activeTab === "solicitar" && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Solicitar Nuevo Análisis</h3>
              
              <form className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Zona</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500">
                    {zones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name} ({zone.crop})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Tipo de Análisis</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500">
                    <option>Análisis de Suelo Completo</option>
                    <option>Análisis de Agua</option>
                    <option>Identificación 16S RNA</option>
                    <option>Control Biológico - Trichoderma</option>
                    <option>Control Biológico - Beauveria</option>
                    <option>Análisis Agroindustrial</option>
                    <option>Fitopatología</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Observaciones</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Describe cualquier problema o síntoma que observes..."
                  ></textarea>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Solicitar Análisis
                  </button>
                  <a
                    href="https://wa.me/51961996645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2 rounded-lg hover:bg-[#128C7E] transition-colors font-medium"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Contactar por WhatsApp
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
