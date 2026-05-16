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
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4 relative">
      {/* Botón regresar a inicio */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al Inicio
      </Link>

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -ml-36 -mb-36"></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12">
            <h1 className="text-3xl font-bold text-white text-center mb-2">AS Laboratorios</h1>
            <p className="text-green-100 text-center text-sm">Panel de Resultados</p>
          </div>

          {/* Form Content */}
          <div className="px-8 py-10">
            {/* Subtitle */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Accede a tu Cuenta</h2>
            <p className="text-gray-600 text-sm mb-8">
              Ingresa tus credenciales para ver tus resultados de análisis
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Ingresa tu usuario"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 transition-all"
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
                    placeholder="Ingresa tu contraseña"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 transition-all"
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
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
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
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-xs font-bold mb-3">🔑 CREDENCIALES DE PRUEBA</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 text-xs">Usuario:</span>
                  <code className="bg-white px-3 py-1 rounded text-blue-600 font-mono text-xs font-bold">admin</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 text-xs">Contraseña:</span>
                  <code className="bg-white px-3 py-1 rounded text-blue-600 font-mono text-xs font-bold">pass</code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-600 text-sm mt-8">
              ¿Necesitas ayuda?{" "}
              <a
                href="https://wa.me/51961996645"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Contacta por WhatsApp
              </a>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-white text-xs mt-6 opacity-80">
          © 2026 AS Laboratorios. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
