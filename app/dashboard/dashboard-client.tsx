"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, Download, Eye, Calendar, FileText, CheckCircle } from "lucide-react"

interface Result {
  id: string
  title: string
  service: string
  date: string
  status: "completed" | "processing" | "pending"
  statusLabel: string
  observations: string
}

export default function DashboardClient() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    // Verificar si está autenticado
    const token = localStorage.getItem("authToken")
    const user = localStorage.getItem("username")

    if (!token || !user) {
      router.push("/login")
      return
    }

    setUsername(user)

    // Datos de prueba - simulando resultados del cliente
    const mockResults: Result[] = [
      {
        id: "001",
        title: "Análisis de Suelo - Lote A",
        service: "Fitopatología",
        date: "2026-05-15",
        status: "completed",
        statusLabel: "Completado",
        observations: "Análisis físico-químico completo. Resultados dentro de los parámetros normales.",
      },
      {
        id: "002",
        title: "Identificación Molecular 16S RNA",
        service: "Apoyo a la Investigación",
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
