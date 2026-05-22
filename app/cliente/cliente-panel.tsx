"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  FileText, Plus, MapPin, Clock, CheckCircle, AlertCircle, Download, Eye, Bell, User, LogOut,
  Home, Beaker, MessageSquare, TrendingUp, Calendar, Search, ChevronRight, ChevronDown,
  FlaskConical, Microscope, Leaf, Droplets, X, Phone, Mail, Navigation, Star, BarChart3,
  Zap, Settings, HelpCircle, Shield, Layers, ArrowUpRight, ArrowDownRight, Target,
  Thermometer, Activity, Package, ClipboardList, UserCheck, TestTube, CircleDot,
} from "lucide-react"

/* =========================================
   DEMO DATA - Resultados con normas ISO
   ========================================= */

interface Parametro {
  nombre: string
  valor: number
  unidad: string
  min: number
  max: number
  optMin: number
  optMax: number
}

interface ResultadoISO {
  id: string
  tipo: string
  estado: "completado" | "en_proceso" | "pendiente"
  fecha: string
  cultivo: string
  ubicacion: string
  zona: string
  resumen: string
  pdf: boolean
  // ISO fields
  lote: string
  codigoMuestra: string
  fechaToma: string
  fechaRecepcion: string
  fechaInicio: string
  fechaEmision: string
  zonaTomaDetalle: string
  coordenadas: string
  microbiologoResp: string
  responsableToma: string
  responsableMedio: string
  metodo: string
  normaISO: string
  temperatura: string
  condiciones: string
  // Timeline
  timeline: { etapa: string; fecha: string; completado: boolean }[]
  // Parametros con valores referenciales
  parametros: Parametro[]
}

const demoResults: ResultadoISO[] = [
  {
    id: "AS-2026-0451",
    tipo: "Analisis de Suelo",
    estado: "completado",
    fecha: "2026-05-18",
    cultivo: "Arandano",
    ubicacion: "Fundo San Jose, Trujillo",
    zona: "Zona Norte - Lote A",
    resumen: "pH optimo, deficiencia leve de Nitrogeno",
    pdf: true,
    lote: "LT-2026-0451-SUE",
    codigoMuestra: "M-SUE-0451-A",
    fechaToma: "2026-05-14",
    fechaRecepcion: "2026-05-14",
    fechaInicio: "2026-05-15",
    fechaEmision: "2026-05-18",
    zonaTomaDetalle: "Parcela A, cuadrante NE, profundidad 0-30cm, suelo franco arcilloso",
    coordenadas: "-8.1116, -79.0288",
    microbiologoResp: "Blg. Maria Torres Sanchez",
    responsableToma: "Ing. Carlos Mendoza",
    responsableMedio: "Tec. Ana Perez Rios",
    metodo: "NOM-021-RECNAT-2000 / ISO 11464:2006",
    normaISO: "ISO/IEC 17025:2017",
    temperatura: "22C",
    condiciones: "Muestra seca al aire, tamizada 2mm",
    timeline: [
      { etapa: "Toma de Muestra", fecha: "2026-05-14 08:30", completado: true },
      { etapa: "Recepcion en Lab", fecha: "2026-05-14 14:00", completado: true },
      { etapa: "Preparacion de Muestra", fecha: "2026-05-15 09:00", completado: true },
      { etapa: "Analisis en Proceso", fecha: "2026-05-16 10:00", completado: true },
      { etapa: "Control de Calidad", fecha: "2026-05-17 15:00", completado: true },
      { etapa: "Emision de Informe", fecha: "2026-05-18 11:00", completado: true },
    ],
    parametros: [
      { nombre: "pH", valor: 6.5, unidad: "", min: 4.0, max: 9.0, optMin: 5.5, optMax: 7.0 },
      { nombre: "Nitrogeno Total", valor: 0.08, unidad: "%", min: 0, max: 0.5, optMin: 0.15, optMax: 0.35 },
      { nombre: "Fosforo Disponible", valor: 18.5, unidad: "ppm", min: 0, max: 50, optMin: 14, optMax: 30 },
      { nombre: "Potasio Disponible", valor: 245, unidad: "ppm", min: 0, max: 500, optMin: 150, optMax: 350 },
      { nombre: "Materia Organica", valor: 3.2, unidad: "%", min: 0, max: 10, optMin: 2, optMax: 5 },
      { nombre: "CE", valor: 1.8, unidad: "dS/m", min: 0, max: 8, optMin: 0, optMax: 2 },
      { nombre: "CIC", valor: 15.2, unidad: "meq/100g", min: 0, max: 40, optMin: 12, optMax: 25 },
      { nombre: "Calcio", valor: 8.5, unidad: "meq/100g", min: 0, max: 20, optMin: 5, optMax: 15 },
    ],
  },
  {
    id: "AS-2026-0438",
    tipo: "Analisis Fitopatologico",
    estado: "completado",
    fecha: "2026-05-15",
    cultivo: "Palta",
    ubicacion: "Parcela Norte, Viru",
    zona: "Zona Sur - Lote B",
    resumen: "Presencia de Phytophthora cinnamomi - Tratamiento recomendado",
    pdf: true,
    lote: "LT-2026-0438-FIT",
    codigoMuestra: "M-FIT-0438-B",
    fechaToma: "2026-05-10",
    fechaRecepcion: "2026-05-10",
    fechaInicio: "2026-05-11",
    fechaEmision: "2026-05-15",
    zonaTomaDetalle: "Parcela Norte, arboles con sintomas de marchitez, sector irrigado",
    coordenadas: "-8.4167, -78.7500",
    microbiologoResp: "Blg. Roberto Diaz Flores",
    responsableToma: "Ing. Luis Aguilar",
    responsableMedio: "Tec. Rosa Campos",
    metodo: "Aislamiento en medio PDA / Molecular PCR",
    normaISO: "ISO/IEC 17025:2017",
    temperatura: "25C",
    condiciones: "Tejido vegetal fresco, raices y cuello de planta",
    timeline: [
      { etapa: "Toma de Muestra", fecha: "2026-05-10 09:00", completado: true },
      { etapa: "Recepcion en Lab", fecha: "2026-05-10 15:00", completado: true },
      { etapa: "Preparacion de Muestra", fecha: "2026-05-11 08:00", completado: true },
      { etapa: "Analisis en Proceso", fecha: "2026-05-12 10:00", completado: true },
      { etapa: "Control de Calidad", fecha: "2026-05-14 14:00", completado: true },
      { etapa: "Emision de Informe", fecha: "2026-05-15 10:00", completado: true },
    ],
    parametros: [
      { nombre: "Phytophthora sp.", valor: 85, unidad: "UFC/g", min: 0, max: 200, optMin: 0, optMax: 10 },
      { nombre: "Fusarium sp.", valor: 12, unidad: "UFC/g", min: 0, max: 200, optMin: 0, optMax: 20 },
      { nombre: "Rhizoctonia sp.", valor: 5, unidad: "UFC/g", min: 0, max: 100, optMin: 0, optMax: 15 },
      { nombre: "Trichoderma sp.", valor: 45, unidad: "UFC/g", min: 0, max: 200, optMin: 30, optMax: 100 },
      { nombre: "Humedad Muestra", valor: 68, unidad: "%", min: 0, max: 100, optMin: 50, optMax: 80 },
    ],
  },
  {
    id: "AS-2026-0462",
    tipo: "Analisis de Agua",
    estado: "en_proceso",
    fecha: "2026-05-20",
    cultivo: "Esparrago",
    ubicacion: "Pozo 3, Chicama",
    zona: "Zona Norte - Lote A",
    resumen: "En proceso de analisis...",
    pdf: false,
    lote: "LT-2026-0462-AGU",
    codigoMuestra: "M-AGU-0462-C",
    fechaToma: "2026-05-19",
    fechaRecepcion: "2026-05-19",
    fechaInicio: "2026-05-20",
    fechaEmision: "",
    zonaTomaDetalle: "Pozo tubular N3, 45m de profundidad, riego por goteo",
    coordenadas: "-7.8431, -79.2175",
    microbiologoResp: "Blg. Maria Torres Sanchez",
    responsableToma: "Ing. Pedro Vargas",
    responsableMedio: "Tec. Ana Perez Rios",
    metodo: "EPA 200.7 / SM 2340C",
    normaISO: "ISO/IEC 17025:2017",
    temperatura: "20C",
    condiciones: "Agua recolectada en frasco esteril, cadena de frio",
    timeline: [
      { etapa: "Toma de Muestra", fecha: "2026-05-19 07:00", completado: true },
      { etapa: "Recepcion en Lab", fecha: "2026-05-19 12:00", completado: true },
      { etapa: "Preparacion de Muestra", fecha: "2026-05-20 08:00", completado: true },
      { etapa: "Analisis en Proceso", fecha: "2026-05-20 14:00", completado: true },
      { etapa: "Control de Calidad", fecha: "", completado: false },
      { etapa: "Emision de Informe", fecha: "", completado: false },
    ],
    parametros: [
      { nombre: "pH", valor: 7.2, unidad: "", min: 4, max: 10, optMin: 6.5, optMax: 8.5 },
      { nombre: "CE", valor: 1.5, unidad: "dS/m", min: 0, max: 5, optMin: 0, optMax: 2 },
      { nombre: "Dureza Total", valor: 180, unidad: "mg/L", min: 0, max: 500, optMin: 0, optMax: 200 },
    ],
  },
  {
    id: "AS-2026-0470",
    tipo: "Control Biologico",
    estado: "pendiente",
    fecha: "2026-05-21",
    cultivo: "Mango",
    ubicacion: "Sector B, Casma",
    zona: "Zona Sur - Lote B",
    resumen: "Muestra recibida, pendiente de procesamiento",
    pdf: false,
    lote: "LT-2026-0470-BIO",
    codigoMuestra: "M-BIO-0470-D",
    fechaToma: "2026-05-21",
    fechaRecepcion: "2026-05-21",
    fechaInicio: "",
    fechaEmision: "",
    zonaTomaDetalle: "Sector B cuadrante SE, hojas con sintomas de antracnosis",
    coordenadas: "-9.4756, -78.2500",
    microbiologoResp: "Pendiente asignacion",
    responsableToma: "Ing. Luis Aguilar",
    responsableMedio: "Pendiente",
    metodo: "Aislamiento selectivo / Bioensayo",
    normaISO: "ISO/IEC 17025:2017",
    temperatura: "N/A",
    condiciones: "Pendiente procesamiento",
    timeline: [
      { etapa: "Toma de Muestra", fecha: "2026-05-21 10:00", completado: true },
      { etapa: "Recepcion en Lab", fecha: "2026-05-21 16:00", completado: true },
      { etapa: "Preparacion de Muestra", fecha: "", completado: false },
      { etapa: "Analisis en Proceso", fecha: "", completado: false },
      { etapa: "Control de Calidad", fecha: "", completado: false },
      { etapa: "Emision de Informe", fecha: "", completado: false },
    ],
    parametros: [],
  },
]

/* =========================================
   ZONAS DEL CLIENTE (delimitadas por el)
   ========================================= */

interface ZonaCliente {
  id: string
  nombre: string
  cultivo: string
  area: string
  ubicacion: string
  color: string
  historial: { mes: string; ph: number; n: number; p: number; k: number; mo: number }[]
}

const zonasCliente: ZonaCliente[] = [
  {
    id: "zona-1",
    nombre: "Zona Norte - Lote A",
    cultivo: "Arandano Biloxi",
    area: "12 hectareas",
    ubicacion: "Fundo San Jose, Trujillo",
    color: "green",
    historial: [
      { mes: "Ene", ph: 5.8, n: 0.12, p: 14, k: 200, mo: 2.8 },
      { mes: "Feb", ph: 5.9, n: 0.13, p: 15, k: 210, mo: 2.9 },
      { mes: "Mar", ph: 6.0, n: 0.11, p: 16, k: 220, mo: 3.0 },
      { mes: "Abr", ph: 6.2, n: 0.10, p: 17, k: 230, mo: 3.1 },
      { mes: "May", ph: 6.5, n: 0.08, p: 18.5, k: 245, mo: 3.2 },
    ],
  },
  {
    id: "zona-2",
    nombre: "Zona Sur - Lote B",
    cultivo: "Palta Hass",
    area: "8 hectareas",
    ubicacion: "Parcela Norte, Viru",
    color: "blue",
    historial: [
      { mes: "Ene", ph: 6.8, n: 0.18, p: 22, k: 180, mo: 3.5 },
      { mes: "Feb", ph: 6.7, n: 0.17, p: 21, k: 175, mo: 3.4 },
      { mes: "Mar", ph: 6.9, n: 0.16, p: 20, k: 170, mo: 3.3 },
      { mes: "Abr", ph: 7.0, n: 0.15, p: 19, k: 165, mo: 3.2 },
      { mes: "May", ph: 7.1, n: 0.14, p: 18, k: 160, mo: 3.1 },
    ],
  },
  {
    id: "zona-3",
    nombre: "Zona Este - Lote C",
    cultivo: "Esparrago UC157",
    area: "15 hectareas",
    ubicacion: "Valle Chicama",
    color: "purple",
    historial: [
      { mes: "Ene", ph: 7.2, n: 0.20, p: 25, k: 300, mo: 2.5 },
      { mes: "Feb", ph: 7.1, n: 0.19, p: 24, k: 290, mo: 2.6 },
      { mes: "Mar", ph: 7.0, n: 0.21, p: 26, k: 310, mo: 2.7 },
      { mes: "Abr", ph: 6.9, n: 0.22, p: 27, k: 320, mo: 2.8 },
      { mes: "May", ph: 6.8, n: 0.23, p: 28, k: 330, mo: 2.9 },
    ],
  },
]

/* =========================================
   PUNTOS DE RECEPCION
   ========================================= */

const puntosRecepcion = [
  {
    nombre: "Sede Principal - Trujillo",
    direccion: "Av. Larco 1234, Urb. San Andres",
    horario: "Lun-Vie: 8am-6pm | Sab: 8am-1pm",
    telefono: "044-123456",
    principal: true,
  },
  {
    nombre: "Punto Viru",
    direccion: "Jr. Grau 456, Viru",
    horario: "Lun-Vie: 9am-5pm",
    telefono: "044-789012",
    principal: false,
  },
  {
    nombre: "Punto Chiclayo",
    direccion: "Av. Balta 789, Chiclayo",
    horario: "Lun-Vie: 9am-5pm",
    telefono: "074-345678",
    principal: false,
  },
]

const demoNotifications = [
  { id: 1, mensaje: "Tu analisis AS-2026-0451 esta listo para descargar", fecha: "Hace 2 horas", leido: false },
  { id: 2, mensaje: "Alerta: Nitrogeno bajo en Zona Norte - Lote A", fecha: "Hace 5 horas", leido: false },
  { id: 3, mensaje: "Nueva recomendacion para Palta Hass - Zona Sur", fecha: "Hace 1 dia", leido: false },
  { id: 4, mensaje: "Analisis AS-2026-0462 paso a etapa de Control de Calidad", fecha: "Hace 1 dia", leido: true },
  { id: 5, mensaje: "Recordatorio: Muestra pendiente de entrega", fecha: "Hace 2 dias", leido: true },
]

/* =========================================
   PARAMETRO BAR CHART COMPONENT
   ========================================= */

function ParametroBar({ param }: { param: Parametro }) {
  const range = param.max - param.min
  const valPercent = ((param.valor - param.min) / range) * 100
  const optMinPercent = ((param.optMin - param.min) / range) * 100
  const optMaxPercent = ((param.optMax - param.min) / range) * 100
  const isInRange = param.valor >= param.optMin && param.valor <= param.optMax

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">{param.nombre}</span>
        <span className={`text-sm font-bold ${isInRange ? "text-green-600" : "text-red-600"}`}>
          {param.valor} {param.unidad}
        </span>
      </div>
      <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden">
        {/* Optimal range highlight */}
        <div
          className="absolute top-0 h-full bg-green-100 border-l-2 border-r-2 border-green-400"
          style={{ left: `${optMinPercent}%`, width: `${optMaxPercent - optMinPercent}%` }}
        />
        {/* Value marker */}
        <div
          className={`absolute top-0 w-1 h-full ${isInRange ? "bg-green-600" : "bg-red-500"}`}
          style={{ left: `${Math.min(Math.max(valPercent, 1), 99)}%` }}
        />
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full border-2 border-white shadow ${isInRange ? "bg-green-600" : "bg-red-500"}`}
          style={{ left: `${Math.min(Math.max(valPercent - 2, 0), 96)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{param.min} {param.unidad}</span>
        <span className="text-green-600 font-medium">Optimo: {param.optMin}-{param.optMax}</span>
        <span>{param.max} {param.unidad}</span>
      </div>
    </div>
  )
}

/* =========================================
   MAIN COMPONENT
   ========================================= */

export default function ClientePanel() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; user: string } | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedResult, setSelectedResult] = useState<ResultadoISO | null>(null)
  const [selectedZona, setSelectedZona] = useState<string>("zona-1")
  const [selectedParam, setSelectedParam] = useState<string>("ph")
  const [mobileSidebar, setMobileSidebar] = useState(false)

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

  const getResultIcon = (tipo: string) => {
    if (tipo.includes("Suelo")) return <Leaf className="w-5 h-5 text-green-600" />
    if (tipo.includes("Agua")) return <Droplets className="w-5 h-5 text-blue-600" />
    if (tipo.includes("Fito")) return <Microscope className="w-5 h-5 text-purple-600" />
    if (tipo.includes("Control")) return <Beaker className="w-5 h-5 text-amber-600" />
    return <TestTube className="w-5 h-5 text-gray-600" />
  }

  // Stats for selected zona
  const currentZona = zonasCliente.find(z => z.id === selectedZona)
  const lastData = currentZona?.historial[currentZona.historial.length - 1]
  const prevData = currentZona?.historial[currentZona.historial.length - 2]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "resultados", label: "Mis Resultados", icon: FileText },
    { key: "zonas", label: "Mis Zonas", icon: Layers },
    { key: "estadisticas", label: "Estadisticas", icon: BarChart3 },
    { key: "solicitar", label: "Solicitar Servicio", icon: Plus },
    { key: "muestras", label: "Puntos de Entrega", icon: MapPin },
    { key: "alertas", label: "Alertas y Reco.", icon: Zap },
    { key: "ayuda", label: "Ayuda", icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 flex-col fixed inset-y-0 z-40 transition-transform lg:translate-x-0 lg:static ${mobileSidebar ? "translate-x-0 flex" : "-translate-x-full hidden lg:flex"}`}>
        <div className="p-5 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-500 rounded-lg flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">AS Laboratorios</p>
              <p className="text-gray-400 text-xs">Panel de Cliente</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setMobileSidebar(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                activeTab === item.key ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user.name}</p>
              <p className="text-gray-400 text-xs">Cliente Premium</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all text-xs"
          >
            <LogOut className="w-3 h-3" />
            Cerrar Sesion
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {mobileSidebar && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileSidebar(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebar(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <ClipboardList className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {navItems.find(n => n.key === activeTab)?.label}
              </h1>
              <p className="text-gray-400 text-xs">Bienvenido, {user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-sm">Notificaciones</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {demoNotifications.map((n) => (
                      <div key={n.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 ${!n.leido ? "bg-green-50/50" : ""}`}>
                        <p className="text-xs text-gray-800">{n.mensaje}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{n.fecha}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setActiveTab("solicitar")} className="hidden md:flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-xs font-semibold">
              <Plus className="w-3 h-3" /> Nuevo Servicio
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">

          {/* ====== DASHBOARD ====== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Completados", value: "2", icon: CheckCircle, color: "green", bg: "bg-green-50" },
                  { label: "En Proceso", value: "1", icon: Clock, color: "blue", bg: "bg-blue-50" },
                  { label: "Pendientes", value: "1", icon: AlertCircle, color: "amber", bg: "bg-amber-50" },
                  { label: "Zonas Activas", value: "3", icon: Layers, color: "purple", bg: "bg-purple-50" },
                ].map((stat, idx) => (
                  <div key={idx} className={`${stat.bg} rounded-xl p-4 border border-${stat.color}-200`}>
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-gray-500 text-xs">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Results */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900 text-sm">Resultados Recientes</h2>
                  <button onClick={() => setActiveTab("resultados")} className="text-green-600 hover:text-green-700 text-xs font-semibold flex items-center gap-1">
                    Ver todos <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {demoResults.slice(0, 3).map((result) => (
                    <div key={result.id} className="p-3 hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-between" onClick={() => setSelectedResult(result)}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">{getResultIcon(result.tipo)}</div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{result.id}</p>
                          <p className="text-gray-500 text-xs">{result.tipo} - {result.cultivo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(result.estado)}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => setActiveTab("solicitar")} className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-5 text-left hover:shadow-lg transition-all group">
                  <Plus className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-1">Solicitar Analisis</h3>
                  <p className="text-green-100 text-xs">Pide un nuevo servicio</p>
                </button>
                <button onClick={() => setActiveTab("zonas")} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 text-left hover:shadow-lg transition-all group">
                  <Layers className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-1">Gestionar Zonas</h3>
                  <p className="text-blue-100 text-xs">Administra tus parcelas</p>
                </button>
                <button onClick={() => setActiveTab("alertas")} className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl p-5 text-left hover:shadow-lg transition-all group">
                  <Zap className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold mb-1">Alertas Activas</h3>
                  <p className="text-amber-100 text-xs">2 alertas pendientes</p>
                </button>
              </div>

              {/* Zona Overview Mini */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <h2 className="font-bold text-gray-900 text-sm mb-3">Resumen de Zonas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {zonasCliente.map((zona) => {
                    const last = zona.historial[zona.historial.length - 1]
                    return (
                      <div key={zona.id} className={`p-3 rounded-lg border-2 border-${zona.color}-200 bg-${zona.color}-50/30`}>
                        <p className="font-bold text-gray-900 text-sm">{zona.nombre}</p>
                        <p className="text-gray-500 text-xs mb-2">{zona.cultivo} - {zona.area}</p>
                        <div className="flex gap-3 text-xs">
                          <span className="text-gray-600">pH: <strong>{last?.ph}</strong></span>
                          <span className="text-gray-600">N: <strong>{last?.n}%</strong></span>
                          <span className="text-gray-600">MO: <strong>{last?.mo}%</strong></span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ====== RESULTADOS ====== */}
          {activeTab === "resultados" && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Buscar por codigo, tipo o cultivo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="todos">Todos</option>
                  <option value="completado">Completados</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="pendiente">Pendientes</option>
                </select>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
                {filteredResults.map((result) => (
                  <div key={result.id} className="p-4 hover:bg-gray-50 transition-all cursor-pointer" onClick={() => setSelectedResult(result)}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">{getResultIcon(result.tipo)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-sm">{result.id}</h3>
                            {getStatusBadge(result.estado)}
                          </div>
                          <p className="text-gray-600 text-sm font-medium">{result.tipo}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{result.cultivo} - {result.zona}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {result.fecha}</span>
                            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {result.normaISO}</span>
                            <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {result.lote}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {result.pdf && <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Download className="w-4 h-4" /></button>}
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                      </div>
                    </div>
                    {/* Mini Timeline */}
                    <div className="mt-3 flex items-center gap-0.5">
                      {result.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-center flex-1">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${step.completado ? "bg-green-500" : "bg-gray-300"}`} />
                          {idx < result.timeline.length - 1 && <div className={`h-0.5 flex-1 ${step.completado ? "bg-green-500" : "bg-gray-200"}`} />}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1 text-[9px] text-gray-400">
                      <span>Toma</span><span>Recep.</span><span>Prep.</span><span>Analisis</span><span>QC</span><span>Emision</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====== MIS ZONAS ====== */}
          {activeTab === "zonas" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm">Gestiona tus parcelas, cultivos y zonas de muestreo</p>
                <button className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold">
                  <Plus className="w-3 h-3" /> Agregar Zona
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {zonasCliente.map((zona) => {
                  const lastH = zona.historial[zona.historial.length - 1]
                  const prevH = zona.historial[zona.historial.length - 2]
                  const phTrend = lastH && prevH ? lastH.ph - prevH.ph : 0
                  const nTrend = lastH && prevH ? lastH.n - prevH.n : 0
                  return (
                    <div key={zona.id} className="bg-white rounded-xl border-2 border-gray-200 shadow-sm overflow-hidden hover:border-green-400 transition-all">
                      <div className={`h-2 bg-${zona.color}-500`} />
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">{zona.nombre}</h3>
                            <p className="text-gray-500 text-xs">{zona.cultivo}</p>
                          </div>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{zona.area}</span>
                        </div>
                        <p className="text-gray-500 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {zona.ubicacion}</p>

                        {/* Last readings */}
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-[10px] text-gray-500">pH</p>
                            <p className="text-sm font-bold text-gray-900">{lastH?.ph}</p>
                            <div className="flex items-center justify-center gap-0.5">
                              {phTrend > 0 ? <ArrowUpRight className="w-3 h-3 text-amber-500" /> : <ArrowDownRight className="w-3 h-3 text-green-500" />}
                              <span className={`text-[10px] ${phTrend > 0 ? "text-amber-500" : "text-green-500"}`}>{Math.abs(phTrend).toFixed(1)}</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-[10px] text-gray-500">N%</p>
                            <p className="text-sm font-bold text-gray-900">{lastH?.n}</p>
                            <div className="flex items-center justify-center gap-0.5">
                              {nTrend >= 0 ? <ArrowUpRight className="w-3 h-3 text-green-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                              <span className={`text-[10px] ${nTrend >= 0 ? "text-green-500" : "text-red-500"}`}>{Math.abs(nTrend).toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-[10px] text-gray-500">MO%</p>
                            <p className="text-sm font-bold text-gray-900">{lastH?.mo}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedZona(zona.id); setActiveTab("estadisticas") }} className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-semibold text-center">
                            Ver Estadisticas
                          </button>
                          <button className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                            <Settings className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ====== ESTADISTICAS POR ZONA ====== */}
          {activeTab === "estadisticas" && (
            <div className="space-y-4">
              {/* Zona Selector */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-gray-900">Evolucion por Zona</h2>
                    <p className="text-gray-500 text-xs">Selecciona una zona y parametro para ver la tendencia</p>
                  </div>
                  <div className="flex gap-2">
                    <select value={selectedZona} onChange={(e) => setSelectedZona(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                      {zonasCliente.map(z => <option key={z.id} value={z.id}>{z.nombre}</option>)}
                    </select>
                    <select value={selectedParam} onChange={(e) => setSelectedParam(e.target.value)} className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option value="ph">pH</option>
                      <option value="n">Nitrogeno (%)</option>
                      <option value="p">Fosforo (ppm)</option>
                      <option value="k">Potasio (ppm)</option>
                      <option value="mo">Materia Organica (%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Chart Area */}
              {currentZona && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full bg-${currentZona.color}-500`} />
                    <h3 className="font-bold text-gray-900">{currentZona.nombre} - {currentZona.cultivo}</h3>
                    <span className="text-gray-400 text-xs">{currentZona.area}</span>
                  </div>

                  {/* Simple bar chart */}
                  <div className="space-y-1 mb-2">
                    <div className="flex items-end gap-3 h-40">
                      {currentZona.historial.map((h, idx) => {
                        const val = h[selectedParam as keyof typeof h] as number
                        const maxVals: Record<string, number> = { ph: 10, n: 0.35, p: 40, k: 400, mo: 6 }
                        const maxVal = maxVals[selectedParam] || 10
                        const heightPercent = (val / maxVal) * 100
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-gray-800">{val}</span>
                            <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: "120px" }}>
                              <div className={`absolute bottom-0 w-full bg-${currentZona.color}-500 rounded-t-lg transition-all duration-500`} style={{ height: `${heightPercent}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-500">{h.mes}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Trends */}
                  {lastData && prevData && (
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {[
                        { label: "pH", curr: lastData.ph, prev: prevData.ph },
                        { label: "N%", curr: lastData.n, prev: prevData.n },
                        { label: "P ppm", curr: lastData.p, prev: prevData.p },
                        { label: "K ppm", curr: lastData.k, prev: prevData.k },
                        { label: "MO%", curr: lastData.mo, prev: prevData.mo },
                      ].map((t, i) => {
                        const diff = t.curr - t.prev
                        const up = diff >= 0
                        return (
                          <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-[10px] text-gray-500 mb-1">{t.label}</p>
                            <p className="text-lg font-bold text-gray-900">{t.curr}</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                              {up ? <ArrowUpRight className="w-3 h-3 text-green-500" /> : <ArrowDownRight className="w-3 h-3 text-red-500" />}
                              <span className={`text-xs font-semibold ${up ? "text-green-600" : "text-red-600"}`}>
                                {up ? "+" : ""}{typeof diff === 'number' ? diff.toFixed(2) : diff}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Compare All Zones */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Comparacion entre Zonas (Ultimo Mes)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-500 font-medium text-xs">Zona</th>
                        <th className="text-center py-2 text-gray-500 font-medium text-xs">Cultivo</th>
                        <th className="text-center py-2 text-gray-500 font-medium text-xs">pH</th>
                        <th className="text-center py-2 text-gray-500 font-medium text-xs">N%</th>
                        <th className="text-center py-2 text-gray-500 font-medium text-xs">P ppm</th>
                        <th className="text-center py-2 text-gray-500 font-medium text-xs">K ppm</th>
                        <th className="text-center py-2 text-gray-500 font-medium text-xs">MO%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zonasCliente.map((z) => {
                        const last = z.historial[z.historial.length - 1]
                        return (
                          <tr key={z.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 font-semibold text-gray-900 flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-${z.color}-500`} />{z.nombre}
                            </td>
                            <td className="py-2 text-center text-gray-600">{z.cultivo}</td>
                            <td className="py-2 text-center font-bold">{last?.ph}</td>
                            <td className="py-2 text-center font-bold">{last?.n}</td>
                            <td className="py-2 text-center font-bold">{last?.p}</td>
                            <td className="py-2 text-center font-bold">{last?.k}</td>
                            <td className="py-2 text-center font-bold">{last?.mo}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====== SOLICITAR SERVICIO ====== */}
          {activeTab === "solicitar" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Solicitar Nuevo Servicio</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Analisis</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Selecciona un servicio</option>
                      <option>Analisis de Suelo Completo</option>
                      <option>Analisis de Agua</option>
                      <option>Analisis Fitopatologico</option>
                      <option>Control Biologico</option>
                      <option>Analisis Nematologico</option>
                      <option>Identificacion de Plagas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Zona de Muestreo</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Selecciona una zona</option>
                      {zonasCliente.map(z => <option key={z.id}>{z.nombre} ({z.cultivo})</option>)}
                      <option>+ Nueva zona</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Cultivo</label>
                      <input type="text" placeholder="Ej: Arandano, Palta" className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Variedad</label>
                      <input type="text" placeholder="Ej: Biloxi, Hass" className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Coordenadas GPS (opcional)</label>
                    <input type="text" placeholder="-8.1116, -79.0288" className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Descripcion del Problema (opcional)</label>
                    <textarea rows={3} placeholder="Describe los sintomas..." className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <p className="text-xs text-amber-700">Despues de enviar la solicitud, entrega la muestra en un punto de recepcion.</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all text-sm">Enviar Solicitud</button>
                    <a href="https://wa.me/51961996645" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-all text-sm">
                      <MessageSquare className="w-4 h-4" /> WhatsApp
                    </a>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ====== PUNTOS DE ENTREGA ====== */}
          {activeTab === "muestras" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Puntos de Recepcion de Muestras</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {puntosRecepcion.map((punto, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border-2 ${punto.principal ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                      {punto.principal && <span className="inline-block px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded mb-2">SEDE PRINCIPAL</span>}
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{punto.nombre}</h3>
                      <div className="space-y-1.5 text-xs">
                        <p className="flex items-start gap-2 text-gray-600"><MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />{punto.direccion}</p>
                        <p className="flex items-start gap-2 text-gray-600"><Clock className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />{punto.horario}</p>
                        <p className="flex items-start gap-2 text-gray-600"><Phone className="w-3 h-3 text-gray-400 flex-shrink-0 mt-0.5" />{punto.telefono}</p>
                      </div>
                      <button className="w-full mt-3 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold">
                        <Navigation className="w-3 h-3" /> Ver en Mapa
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Como Preparar tu Muestra</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { step: "1", title: "Recolecta", desc: "Toma la muestra segun indicaciones", color: "green" },
                    { step: "2", title: "Etiqueta", desc: "Identificala con tu codigo de solicitud", color: "blue" },
                    { step: "3", title: "Refrigera", desc: "Conserva en cadena de frio si aplica", color: "purple" },
                    { step: "4", title: "Entrega", desc: "Lleva al punto mas cercano en 24h", color: "amber" },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className={`w-12 h-12 bg-${s.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <span className={`text-lg font-bold text-${s.color}-600`}>{s.step}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h3>
                      <p className="text-gray-600 text-xs">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ====== ALERTAS Y RECOMENDACIONES ====== */}
          {activeTab === "alertas" && (
            <div className="space-y-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-900">Alerta: Nitrogeno Bajo - Zona Norte Lote A</h3>
                    <p className="text-red-700 text-sm mt-1">El nivel de Nitrogeno (0.08%) esta por debajo del rango optimo (0.15-0.35%). Se recomienda aplicar fertilizacion nitrogenada.</p>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold">Ver Recomendacion</button>
                      <button className="px-3 py-1.5 bg-white border border-red-300 text-red-700 rounded-lg text-xs font-semibold">Solicitar Asesoria</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900">Alerta: Phytophthora Detectada - Zona Sur Lote B</h3>
                    <p className="text-amber-700 text-sm mt-1">Se detecto Phytophthora cinnamomi (85 UFC/g) en su analisis fitopatologico. Se recomienda tratamiento con Trichoderma y fosfito de potasio.</p>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold">Plan de Tratamiento</button>
                      <button className="px-3 py-1.5 bg-white border border-amber-300 text-amber-700 rounded-lg text-xs font-semibold">Comprar Biocontrol</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900">Recomendacion: Programa de Muestreo</h3>
                    <p className="text-green-700 text-sm mt-1">Basado en el historial de tus 3 zonas, recomendamos analisis de suelo mensual para Zona Norte y bimensual para las demas.</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setActiveTab("solicitar")} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold">Programar Analisis</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">Tendencia Positiva: Zona Este Lote C</h3>
                    <p className="text-blue-700 text-sm mt-1">La materia organica y nitrogeno muestran tendencia ascendente en los ultimos 5 meses. El manejo de enmiendas organicas esta dando resultados.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====== AYUDA ====== */}
          {activeTab === "ayuda" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
                <div className="space-y-2">
                  {[
                    { q: "Como tomo una muestra de suelo correctamente?", a: "Recoge de 10-15 submuestras en diferentes puntos del lote a 0-30 cm de profundidad. Mezcla y toma 1 kg de la mezcla homogenea." },
                    { q: "Cuanto tiempo demora un analisis?", a: "Suelo basico: 3-5 dias, Suelo completo: 5-7 dias, Fitopatologico: 5-10 dias, Agua: 3-5 dias." },
                    { q: "Como interpreto mis resultados?", a: "Cada informe incluye graficos con valores referenciales, interpretacion y recomendaciones para tu cultivo." },
                    { q: "Como funciona el sistema de zonas?", a: "Puedes delimitar tus parcelas con nombre, cultivo y ubicacion. El sistema trackea la evolucion de cada zona en el tiempo." },
                  ].map((faq, i) => (
                    <details key={i} className="group">
                      <summary className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer text-sm">
                        <span className="font-semibold text-gray-900">{faq.q}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="p-3 text-gray-600 text-sm">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contacto Directo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a href="https://wa.me/51961996645" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"><MessageSquare className="w-5 h-5 text-white" /></div>
                    <div><p className="font-bold text-gray-900 text-sm">WhatsApp</p><p className="text-gray-600 text-xs">Respuesta rapida</p></div>
                  </a>
                  <a href="mailto:contacto@aslaboratorios.com" className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"><Mail className="w-5 h-5 text-white" /></div>
                    <div><p className="font-bold text-gray-900 text-sm">Email</p><p className="text-gray-600 text-xs">contacto@aslaboratorios.com</p></div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ====== RESULT DETAIL MODAL (ISO COMPLIANT) ====== */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-5 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-xl font-bold">{selectedResult.id}</h2>
                <p className="text-gray-300 text-xs">{selectedResult.tipo} | {selectedResult.normaISO}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedResult.pdf && (
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-xs font-semibold">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                )}
                <button onClick={() => setSelectedResult(null)} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Status + Timeline */}
              <div className="flex items-center gap-3 mb-2">
                {getStatusBadge(selectedResult.estado)}
                <span className="text-gray-500 text-xs">{selectedResult.fecha}</span>
              </div>

              {/* ISO Timeline */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><Activity className="w-4 h-4" /> Trazabilidad del Proceso</h4>
                <div className="flex items-center gap-0">
                  {selectedResult.timeline.map((step, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${step.completado ? "bg-green-500" : "bg-gray-300"}`}>
                        {step.completado ? <CheckCircle className="w-3 h-3 text-white" /> : <CircleDot className="w-3 h-3 text-white" />}
                      </div>
                      {idx < selectedResult.timeline.length - 1 && (
                        <div className={`absolute top-3 left-1/2 w-full h-0.5 ${step.completado ? "bg-green-500" : "bg-gray-200"}`} />
                      )}
                      <p className="text-[9px] font-semibold text-gray-700 mt-2 text-center leading-tight">{step.etapa}</p>
                      <p className="text-[8px] text-gray-400 text-center">{step.fecha || "Pendiente"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ISO Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Lote Trazabilidad", value: selectedResult.lote, icon: Package },
                  { label: "Codigo Muestra", value: selectedResult.codigoMuestra, icon: TestTube },
                  { label: "Microbiologo Resp.", value: selectedResult.microbiologoResp, icon: UserCheck },
                  { label: "Responsable Toma", value: selectedResult.responsableToma, icon: User },
                  { label: "Resp. Medio/Prep.", value: selectedResult.responsableMedio, icon: ClipboardList },
                  { label: "Metodo", value: selectedResult.metodo, icon: Shield },
                  { label: "Norma ISO", value: selectedResult.normaISO, icon: Star },
                  { label: "Temperatura", value: selectedResult.temperatura, icon: Thermometer },
                  { label: "Coordenadas", value: selectedResult.coordenadas, icon: Target },
                ].map((field, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <field.icon className="w-3 h-3 text-gray-400" />
                      <p className="text-[10px] text-gray-500 font-medium">{field.label}</p>
                    </div>
                    <p className="text-xs font-semibold text-gray-900">{field.value}</p>
                  </div>
                ))}
              </div>

              {/* Zona de Toma */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-[10px] text-blue-600 font-medium mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Zona de Toma de Muestra</p>
                <p className="text-xs font-semibold text-gray-900">{selectedResult.zonaTomaDetalle}</p>
                <p className="text-[10px] text-gray-500 mt-1">Condiciones: {selectedResult.condiciones}</p>
              </div>

              {/* Parametros con graficos */}
              {selectedResult.parametros.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Resultados con Valores Referenciales</h4>
                  <div className="space-y-4 bg-gray-50 rounded-xl p-4">
                    {selectedResult.parametros.map((param, idx) => (
                      <ParametroBar key={idx} param={param} />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                    <span className="inline-block w-3 h-2 bg-green-100 border border-green-400 rounded" /> Rango optimo
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-2" /> Dentro del rango
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2" /> Fuera del rango
                  </p>
                </div>
              )}

              {/* Resumen */}
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-[10px] text-green-600 font-medium mb-1">Resumen / Observaciones</p>
                <p className="text-sm font-medium text-gray-900">{selectedResult.resumen}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {selectedResult.pdf && (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all text-sm">
                    <Download className="w-4 h-4" /> Descargar PDF
                  </button>
                )}
                <a href="https://wa.me/51961996645" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all text-sm">
                  <MessageSquare className="w-4 h-4" /> Consultar
                </a>
                <button onClick={() => setSelectedResult(null)} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all text-sm">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
