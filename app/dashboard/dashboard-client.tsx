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
  const [activeTab, setActiveTab] = useState<"inicio" | "zonas" | "servicios" | "evolucion" | "solicitar">("inicio")
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
                  <div key={zone.id} className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedZone(zone.id)}>
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
        date: "2026-05-10",
        status: "completed",
        statusLabel: "Completado",
        observations: "Secuenciación exitosa. Identificada cepa bacteriana: Bacillus subtilis",
      },
      {
        id: "003",
        title: "Análisis Microbiológico - Agua",
        service: "Medio Ambiente",
        date: "2026-05-12",
        status: "completed",
        statusLabel: "Completado",
        observations: "Muestras dentro de estándares de calidad.",
      },
      {
        id: "004",
        title: "Control Biológico - Trichoderma",
        service: "Control Biológico",
        date: "2026-05-08",
        status: "completed",
        statusLabel: "Completado",
        observations: "Viabilidad: 95%. Recomendado para uso inmediato.",
      },
    ]

    setResults(mockResults)
    setLoading(false)
  }, [router])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mi Panel</h1>
            <p className="text-gray-600 text-sm">Bienvenido, {username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Mis Resultados de Análisis</h2>
          <p className="text-gray-600">Aquí puedes descargar y revisar todos tus análisis completados</p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg">{result.title}</h3>
                      <p className="text-green-100 text-sm">{result.service}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(result.status)} flex items-center gap-1`}>
                      {result.status === "completed" && <CheckCircle size={14} />}
                      {result.statusLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    {new Date(result.date).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  {/* Observations */}
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700 text-sm">{result.observations}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors font-medium text-sm">
                      <Eye size={16} />
                      Ver
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium text-sm">
                      <Download size={16} />
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Aún no tienes resultados disponibles</p>
            <p className="text-gray-500 text-sm">Los análisis aparecerán aquí cuando se completen</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="font-bold text-gray-900 mb-2">¿Necesitas ayuda?</h3>
          <p className="text-gray-600 text-sm mb-4">Si tienes dudas sobre tus resultados o necesitas más información, contáctanos:</p>
          <a
            href="https://wa.me/51961996645"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </main>
    </div>
  )
}
