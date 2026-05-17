"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowLeft, MapPin, Zap, TrendingUp, MessageSquare, FileText, Bell, BarChart3, Headphones, Clock } from "lucide-react"

export default function LoginClient() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const features = [
    { icon: MapPin, label: "Zonas Personalizadas", color: "bg-blue-500" },
    { icon: Zap, label: "Tiempo Real", color: "bg-purple-500" },
    { icon: TrendingUp, label: "Evolución", color: "bg-green-500" },
    { icon: MessageSquare, label: "Solicitudes", color: "bg-amber-500" },
    { icon: BarChart3, label: "IA 24/7", color: "bg-red-500" },
    { icon: FileText, label: "Reportes", color: "bg-cyan-500" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("El Panel de Control está en desarrollo. Pronto estará disponible.")
    return
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - Branding and Information */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>

        {/* Back button */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:bg-white hover:bg-opacity-10 px-4 py-2 rounded-lg transition-all w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">El Primer Sistema de Entrega de Resultados del Norte del Perú</h1>
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            AS Laboratorios revoluciona la forma en que recibes tus análisis agrícolas. Con tecnología de punta y profesionales dedicados, entregamos resultados precisos y a tiempo para optimizar tu producción.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-green-300 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-green-100">Análisis de suelo y agua precisos</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-green-300 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-green-100">Control biológico y fitopatología</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 bg-green-300 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-green-100">Panel digital de seguimiento 24/7</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-green-100 text-sm relative z-10">© 2026 AS Laboratorios. Innovación en Biotecnología.</p>
      </div>

      {/* RIGHT SIDE - Login Form + Features Compact */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-6 lg:p-10 overflow-y-auto max-h-screen">
        {/* Mobile back button */}
        <Link href="/" className="lg:hidden mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>

        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Panel de Control</h2>
            <p className="text-gray-600 text-sm">Próximamente disponible</p>
          </div>

          {/* Development Notice - Compact */}
          <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
            <p className="text-amber-700 text-xs font-bold">⚠️ Panel en Construcción</p>
            <p className="text-amber-700 text-xs mt-0.5">Disponible muy pronto con funcionalidades innovadoras</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-blue-700 text-xs font-medium">{error}</p>
            </div>
          )}

          {/* Form - Disabled */}
          <form onSubmit={handleSubmit} className="space-y-4 opacity-50 pointer-events-none mb-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-gray-800 mb-1">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu_usuario"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                disabled={true}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-800 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  disabled={true}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={true}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={true}
              className="w-full bg-gray-400 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximamente Disponible
            </button>
          </form>

          {/* Features - Compact Grid */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-3 text-center">Características Próximamente</p>
            <div className="grid grid-cols-3 gap-2">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon
                return (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center hover:bg-gray-100 transition-all">
                    <div className={`${feature.color} w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900">{feature.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA Card - Compact */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 text-white text-center mb-4">
            <p className="text-sm font-semibold mb-2">¿Acceso prioritario?</p>
            <a
              href="https://wa.me/51961996645"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-md font-semibold hover:bg-green-50 transition-all text-xs"
            >
              Solicitar Acceso
            </a>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="text-gray-600 text-xs mb-2">¿Problemas para acceder?</p>
            <a
              href="https://wa.me/51961996645"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-xs"
            >
              Contacta por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
