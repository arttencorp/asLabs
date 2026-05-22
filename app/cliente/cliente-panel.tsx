"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  FileText,
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  Bell,
  User,
  LogOut,
  Home,
  Beaker,
  MessageSquare,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  FlaskConical,
  Microscope,
  Leaf,
  Droplets,
  X,
  Phone,
  Mail,
  Navigation,
  Star,
  BarChart3,
  Zap,
  Settings,
  HelpCircle,
} from "lucide-react"

// Demo data - resultados de ejemplo
const demoResults = [
  {
    id: "AS-2026-0451",
    tipo: "Analisis de Suelo",
    estado: "completado",
    fecha: "2026-05-18",
    cultivo: "Arandano",
    ubicacion: "Fundo San Jose, Trujillo",
    resumen: "pH optimo, deficiencia leve de Nitrogeno",
    pdf: true,
  },
  {
    id: "AS-2026-0438",
    tipo: "Analisis Fitopatologico",
    estado: "completado",
    fecha: "2026-05-15",
    cultivo: "Palta",
    ubicacion: "Parcela Norte, Viru",
    resumen: "Presencia de Phytophthora cinnamomi - Tratamiento recomendado",
    pdf: true,
  },
  {
    id: "AS-2026-0462",
    tipo: "Analisis de Agua",
    estado: "en_proceso",
    fecha: "2026-05-20",
    cultivo: "Esparrago",
    ubicacion: "Pozo 3, Chicama",
    resumen: "En proceso de analisis...",
    pdf: false,
  },
  {
    id: "AS-2026-0470",
    tipo: "Control Biologico",
    estado: "pendiente",
    fecha: "2026-05-21",
    cultivo: "Mango",
    ubicacion: "Sector B, Casma",
    resumen: "Muestra recibida, pendiente de procesamiento",
    pdf: false,
  },
]

// Puntos de recepcion de muestras
const puntosRecepcion = [
  {
    nombre: "Sede Principal - Trujillo",
    direccion: "Av. Larco 1234, Urb. San Andres",
    horario: "Lun-Vie: 8am-6pm | Sab: 8am-1pm",
    telefono: "044-123456",
    coords: { lat: -8.1116, lng: -79.0288 },
    principal: true,
  },
  {
    nombre: "Punto Viru",
    direccion: "Jr. Grau 456, Viru",
    horario: "Lun-Vie: 9am-5pm",
    telefono: "044-789012",
    coords: { lat: -8.4167, lng: -78.75 },
    principal: false,
  },
  {
    nombre: "Punto Chiclayo",
    direccion: "Av. Balta 789, Chiclayo",
    horario: "Lun-Vie: 9am-5pm",
    telefono: "074-345678",
    coords: { lat: -6.7714, lng: -79.8409 },
    principal: false,
  },
]

// Notificaciones demo
const demoNotifications = [
  { id: 1, mensaje: "Tu analisis AS-2026-0451 esta listo para descargar", fecha: "Hace 2 horas", leido: false },
  { id: 2, mensaje: "Nueva recomendacion disponible para tu cultivo de Palta", fecha: "Hace 1 dia", leido: false },
  { id: 3, mensaje: "Recordatorio: Muestra pendiente de entrega", fecha: "Hace 2 dias", leido: true },
]

export default function ClientePanel() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; user: string } | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedResult, setSelectedResult] = useState<typeof demoResults[0] | null>(null)
  const [showNewRequest, setShowNewRequest] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem("as_lab_session")
    if (!session) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(session))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("as_lab_session")
    router.push("/login")
  }

  const filteredResults = demoResults.filter((r) => {
    const matchSearch = r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cultivo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFilter = filterStatus === "todos" || r.estado === filterStatus
    return matchSearch && matchFilter
  })

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "completado":
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"><CheckCircle className="w-3 h-3" /> Completado</span>
      case "en_proceso":
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold"><Clock className="w-3 h-3" /> En Proceso</span>
      case "pendiente":
        return <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold"><AlertCircle className="w-3 h-3" /> Pendiente</span>
      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white flex-shrink-0 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-green-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="font-bold text-lg">AS Laboratorios</p>
              <p className="text-green-300 text-xs">Panel de Cliente</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "dashboard" ? "bg-white/20 text-white" : "text-green-200 hover:bg-white/10"
            }`}
          >
            <Home className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("resultados")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "resultados" ? "bg-white/20 text-white" : "text-green-200 hover:bg-white/10"
            }`}
          >
            <FileText className="w-5 h-5" />
            Mis Resultados
          </button>
          <button
            onClick={() => setActiveTab("solicitar")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "solicitar" ? "bg-white/20 text-white" : "text-green-200 hover:bg-white/10"
            }`}
          >
            <Plus className="w-5 h-5" />
            Solicitar Servicio
          </button>
          <button
            onClick={() => setActiveTab("muestras")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "muestras" ? "bg-white/20 text-white" : "text-green-200 hover:bg-white/10"
            }`}
          >
            <MapPin className="w-5 h-5" />
            Puntos de Entrega
          </button>
          <button
            onClick={() => setActiveTab("estadisticas")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "estadisticas" ? "bg-white/20 text-white" : "text-green-200 hover:bg-white/10"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Estadisticas
          </button>
          <button
            onClick={() => setActiveTab("ayuda")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "ayuda" ? "bg-white/20 text-white" : "text-green-200 hover:bg-white/10"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            Ayuda
          </button>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-green-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-green-300 text-xs">Cliente Premium</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "resultados" && "Mis Resultados"}
              {activeTab === "solicitar" && "Solicitar Servicio"}
              {activeTab === "muestras" && "Puntos de Entrega"}
              {activeTab === "estadisticas" && "Estadisticas"}
              {activeTab === "ayuda" && "Centro de Ayuda"}
            </h1>
            <p className="text-gray-500 text-sm">Bienvenido, {user.name}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Notificaciones</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {demoNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-all ${!n.leido ? "bg-green-50" : ""}`}
                      >
                        <p className="text-sm text-gray-800">{n.mensaje}</p>
                        <p className="text-xs text-gray-500 mt-1">{n.fecha}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3">
                    <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-semibold">
                      Ver todas
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <button
              onClick={() => setActiveTab("solicitar")}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Nuevo Servicio
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                      <p className="text-gray-500 text-sm">Completados</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">1</p>
                      <p className="text-gray-500 text-sm">En Proceso</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">1</p>
                      <p className="text-gray-500 text-sm">Pendientes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">Premium</p>
                      <p className="text-gray-500 text-sm">Tu Plan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Resultados Recientes</h2>
                  <button
                    onClick={() => setActiveTab("resultados")}
                    className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center gap-1"
                  >
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {demoResults.slice(0, 3).map((result) => (
                    <div
                      key={result.id}
                      className="p-4 hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-between"
                      onClick={() => setSelectedResult(result)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {result.tipo.includes("Suelo") && <Leaf className="w-5 h-5 text-green-600" />}
                          {result.tipo.includes("Agua") && <Droplets className="w-5 h-5 text-blue-600" />}
                          {result.tipo.includes("Fito") && <Microscope className="w-5 h-5 text-purple-600" />}
                          {result.tipo.includes("Control") && <Beaker className="w-5 h-5 text-amber-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{result.id}</p>
                          <p className="text-gray-500 text-sm">{result.tipo} - {result.cultivo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(result.estado)}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("solicitar")}
                  className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-all group"
                >
                  <Plus className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-1">Solicitar Analisis</h3>
                  <p className="text-green-100 text-sm">Pide un nuevo servicio de laboratorio</p>
                </button>
                <button
                  onClick={() => setActiveTab("muestras")}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-all group"
                >
                  <MapPin className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-1">Entregar Muestra</h3>
                  <p className="text-blue-100 text-sm">Encuentra el punto mas cercano</p>
                </button>
                <a
                  href="https://wa.me/51961996645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-left hover:shadow-lg transition-all group"
                >
                  <MessageSquare className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-1">Soporte Directo</h3>
                  <p className="text-purple-100 text-sm">Contacta con un especialista</p>
                </a>
              </div>
            </div>
          )}

          {/* Resultados Tab */}
          {activeTab === "resultados" && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por codigo, tipo o cultivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="completado">Completados</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="pendiente">Pendientes</option>
                </select>
              </div>

              {/* Results List */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {filteredResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-6 hover:bg-gray-50 transition-all cursor-pointer"
                      onClick={() => setSelectedResult(result)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            {result.tipo.includes("Suelo") && <Leaf className="w-6 h-6 text-green-600" />}
                            {result.tipo.includes("Agua") && <Droplets className="w-6 h-6 text-blue-600" />}
                            {result.tipo.includes("Fito") && <Microscope className="w-6 h-6 text-purple-600" />}
                            {result.tipo.includes("Control") && <Beaker className="w-6 h-6 text-amber-600" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-gray-900">{result.id}</h3>
                              {getStatusBadge(result.estado)}
                            </div>
                            <p className="text-gray-600 font-medium">{result.tipo}</p>
                            <p className="text-gray-500 text-sm mt-1">{result.cultivo} - {result.ubicacion}</p>
                            <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {result.fecha}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {result.pdf && (
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all">
                              <Download className="w-5 h-5" />
                            </button>
                          )}
                          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-all">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{result.resumen}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Solicitar Tab */}
          {activeTab === "solicitar" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Solicitar Nuevo Servicio</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Analisis</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Selecciona un servicio</option>
                      <option>Analisis de Suelo Completo</option>
                      <option>Analisis de Agua</option>
                      <option>Analisis Fitopatologico</option>
                      <option>Control Biologico</option>
                      <option>Analisis Nematologico</option>
                      <option>Identificacion de Plagas</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cultivo</label>
                      <input
                        type="text"
                        placeholder="Ej: Arandano, Palta, Esparrago"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Variedad</label>
                      <input
                        type="text"
                        placeholder="Ej: Biloxi, Hass, UC157"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ubicacion del Predio</label>
                    <input
                      type="text"
                      placeholder="Direccion o coordenadas del fundo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descripcion del Problema (opcional)</label>
                    <textarea
                      rows={4}
                      placeholder="Describe los sintomas o problemas que has observado..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-700">Despues de enviar la solicitud, deberas entregar la muestra en uno de nuestros puntos de recepcion.</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                      Enviar Solicitud
                    </button>
                    <a
                      href="https://wa.me/51961996645"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-all"
                    >
                      <MessageSquare className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Muestras Tab */}
          {activeTab === "muestras" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Puntos de Recepcion de Muestras</h2>
                <p className="text-gray-600 mb-6">Entrega tu muestra en cualquiera de nuestros puntos autorizados para iniciar el proceso de analisis.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {puntosRecepcion.map((punto, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-xl border-2 ${
                        punto.principal
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {punto.principal && (
                        <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-bold rounded mb-3">
                          SEDE PRINCIPAL
                        </span>
                      )}
                      <h3 className="font-bold text-gray-900 mb-2">{punto.nombre}</h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-start gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          {punto.direccion}
                        </p>
                        <p className="flex items-start gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          {punto.horario}
                        </p>
                        <p className="flex items-start gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          {punto.telefono}
                        </p>
                      </div>
                      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm font-semibold">
                        <Navigation className="w-4 h-4" />
                        Ver en Mapa
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Como Preparar tu Muestra</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Recolecta</h3>
                    <p className="text-gray-600 text-sm">Toma la muestra siguiendo las indicaciones segun el tipo de analisis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Etiqueta</h3>
                    <p className="text-gray-600 text-sm">Identifica la muestra con tu codigo de solicitud y datos del cultivo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Entrega</h3>
                    <p className="text-gray-600 text-sm">Lleva la muestra al punto mas cercano en las proximas 24 horas</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estadisticas Tab */}
          {activeTab === "estadisticas" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Analisis por Tipo</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Suelo</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Fitopatologico</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-1/2 h-full bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">50%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Agua</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-1/4 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Historial de Servicios</h2>
                  <div className="flex items-end gap-2 h-32">
                    <div className="flex-1 bg-green-200 rounded-t" style={{ height: "60%" }}></div>
                    <div className="flex-1 bg-green-300 rounded-t" style={{ height: "80%" }}></div>
                    <div className="flex-1 bg-green-400 rounded-t" style={{ height: "45%" }}></div>
                    <div className="flex-1 bg-green-500 rounded-t" style={{ height: "90%" }}></div>
                    <div className="flex-1 bg-green-600 rounded-t" style={{ height: "70%" }}></div>
                    <div className="flex-1 bg-green-700 rounded-t" style={{ height: "100%" }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Ene</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Abr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Mejora tu Plan</h2>
                    <p className="text-green-100">Accede a estadisticas avanzadas, predicciones IA y soporte prioritario</p>
                  </div>
                  <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition-all">
                    Ver Planes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ayuda Tab */}
          {activeTab === "ayuda" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Centro de Ayuda</h2>
                
                <div className="space-y-4">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="font-semibold text-gray-900">Como tomo una muestra de suelo correctamente?</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4 text-gray-600">
                      Para tomar una muestra de suelo, recoge de 10-15 submuestras en diferentes puntos del lote a una profundidad de 0-30 cm. Mezcla todas las submuestras y toma aproximadamente 1 kg de la mezcla homogenea.
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="font-semibold text-gray-900">Cuanto tiempo demora un analisis?</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4 text-gray-600">
                      El tiempo varia segun el tipo de analisis: Suelo basico (3-5 dias), Suelo completo (5-7 dias), Fitopatologico (5-10 dias), Agua (3-5 dias), Nematologico (7-10 dias).
                    </div>
                  </details>
                  
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="font-semibold text-gray-900">Como interpreto mis resultados?</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="p-4 text-gray-600">
                      Cada informe incluye una seccion de interpretacion con recomendaciones especificas para tu cultivo. Tambien puedes solicitar una consulta con nuestros especialistas.
                    </div>
                  </details>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contacto Directo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/51961996645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">WhatsApp</p>
                      <p className="text-gray-600 text-sm">Respuesta rapida</p>
                    </div>
                  </a>
                  <a
                    href="mailto:contacto@aslaboratorios.com"
                    className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Email</p>
                      <p className="text-gray-600 text-sm">contacto@aslaboratorios.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedResult.id}</h2>
                <p className="text-gray-500">{selectedResult.tipo}</p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                {getStatusBadge(selectedResult.estado)}
                <span className="text-gray-500 text-sm">{selectedResult.fecha}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Cultivo</p>
                  <p className="font-bold text-gray-900">{selectedResult.cultivo}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Ubicacion</p>
                  <p className="font-bold text-gray-900">{selectedResult.ubicacion}</p>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Resumen</p>
                <p className="font-medium text-gray-900">{selectedResult.resumen}</p>
              </div>
              
              <div className="flex gap-3">
                {selectedResult.pdf && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all">
                    <Download className="w-5 h-5" />
                    Descargar PDF
                  </button>
                )}
                <a
                  href="https://wa.me/51961996645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Consultar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
