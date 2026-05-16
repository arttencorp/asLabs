"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function LoginClient() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validación simple de credenciales
    if (username === "admin" && password === "pass") {
      // Guardamos token en localStorage
      localStorage.setItem("authToken", "admin-token-" + Date.now())
      localStorage.setItem("username", username)
      // Redirigimos al panel
      router.push("/dashboard")
    } else {
      setError("Usuario o contraseña incorrectos")
    }

    setLoading(false)
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

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center p-8 lg:p-12">
        {/* Mobile back button */}
        <Link href="/" className="lg:hidden mb-8 flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          Volver
        </Link>

        <div className="max-w-sm mx-auto w-full">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Bienvenido</h2>
            <p className="text-gray-600">Accede a tu panel de resultados con tus credenciales</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-800 mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu_usuario"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                disabled={loading}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ingresando...
                </div>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 text-xs font-bold mb-2">CREDENCIALES DE PRUEBA</p>
            <div className="space-y-1 text-xs text-blue-800">
              <p>Usuario: <code className="font-mono font-bold">admin</code></p>
              <p>Contraseña: <code className="font-mono font-bold">pass</code></p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-3">¿Problemas para acceder?</p>
            <a
              href="https://wa.me/51961996645"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm"
            >
              Contacta por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
