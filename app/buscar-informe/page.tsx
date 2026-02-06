'use client'

import React from "react"

import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function BuscarInforme() {
  const [codigo, setCodigo] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [documento, setDocumento] = useState<any>(null)

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setDocumento(null)
    setLoading(true)

    try {
      const response = await fetch('/api/documents/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'No se encontró el documento')
        return
      }

      setDocumento(data.documento)
    } catch (err) {
      console.error('Error:', err)
      setError('Error al buscar el documento')
    } finally {
      setLoading(false)
    }
  }

  const handleDescargar = () => {
    if (!documento?.html_content) return

    const element = document.createElement('a')
    const file = new Blob([documento.html_content], { type: 'text/html' })
    element.href = URL.createObjectURL(file)
    element.download = `Informe_${documento.codigo}.html`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              AS
            </div>
            <h1 className="text-2xl font-bold text-gray-900">AS Laboratorios</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-green-600 hover:text-green-700 font-semibold">
            Volver al Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {!documento ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Buscar Informe
              </h2>
              <p className="text-center text-gray-600 text-sm mb-8">
                Ingresa tu número de informe y contraseña para ver tus resultados
              </p>

              <form onSubmit={handleBuscar} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Informe
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: LAB-2026-0001"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !codigo || !password}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    'Buscar Informe'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Informe Encontrado
                </h2>
                <p className="text-gray-600">
                  Código: <span className="font-semibold">{documento.codigo}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Generado: {new Date(documento.created_at).toLocaleDateString('es-PE')}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank')
                    if (printWindow) {
                      printWindow.document.write(documento.html_content)
                      printWindow.document.close()
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Ver Informe
                </button>

                <button
                  onClick={handleDescargar}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  Descargar HTML
                </button>

                <button
                  onClick={() => {
                    setDocumento(null)
                    setCodigo('')
                    setPassword('')
                    setError('')
                  }}
                  className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 rounded-lg transition"
                >
                  Buscar Otro
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>¿Problemas con tu búsqueda?</p>
          <p>Contacta a: <span className="font-semibold">ventas@aslaboratorios.com</span></p>
        </div>
      </main>
    </div>
  )
}
