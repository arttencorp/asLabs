"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Calendar, User, Phone, Mail, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ESTADOS_PEDIDO, type Pedido, obtenerPedidoPorCodigo } from "@/lib/supabase"

export default function SeguimientoClient() {
  const [codigo, setCodigo] = useState("")
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!codigo.trim()) {
      setError("Por favor ingresa un código de seguimiento")
      return
    }

    setLoading(true)
    setError(null)
    setPedido(null)
    setSearched(false)

    try {
      console.log("🔍 Buscando pedido con código:", codigo.trim())
      const pedidoEncontrado = await obtenerPedidoPorCodigo(codigo.trim())

      if (pedidoEncontrado) {
        setPedido(pedidoEncontrado)
        console.log("✅ Pedido encontrado:", pedidoEncontrado)
      } else {
        setError("No se encontró ningún pedido con ese código de seguimiento")
      }

      setSearched(true)
    } catch (error: any) {
      console.error("❌ Error buscando pedido:", error)
      setError(error.message || "Error al buscar el pedido. Inténtalo de nuevo.")
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  const getEstadoInfo = (estado: string) => {
    return ESTADOS_PEDIDO.find((e) => e.id === estado) || ESTADOS_PEDIDO[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEstadoIndex = (estado: string) => {
    return ESTADOS_PEDIDO.findIndex((e) => e.id === estado)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Seguimiento de Pedidos</h1>
              <p className="text-gray-600 mt-2">Rastrea tu pedido en tiempo real</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">¿Necesitas ayuda?</p>
                <p className="text-sm font-medium text-blue-600">ventas@aslaboratorios.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Search className="h-6 w-6 text-blue-600" />
              Buscar Pedido
            </CardTitle>
            <CardDescription>Ingresa tu código de seguimiento para ver el estado de tu pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ej: ABC123XY"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  className="flex-1 text-center font-mono text-lg"
                  maxLength={8}
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !codigo.trim()}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                El código de seguimiento se encuentra en tu confirmación de pedido
              </p>
            </form>

            {/* Código de prueba */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm text-center">
                <strong>Código de prueba:</strong> ABC123XY
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* No Results */}
        {searched && !pedido && !error && !loading && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontró el pedido</h3>
              <p className="text-gray-500 mb-4">Verifica que el código de seguimiento sea correcto</p>
              <Button
                variant="outline"
                onClick={() => {
                  setCodigo("")
                  setSearched(false)
                  setError(null)
                }}
              >
                Intentar de nuevo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {pedido && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-6 w-6 text-blue-600" />
                      Pedido {pedido.numero_pedido}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Código de seguimiento:{" "}
                      <span className="font-mono font-bold text-blue-600">{pedido.codigo_seguimiento}</span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getEstadoInfo(pedido.estado).color} text-sm px-3 py-1`}>
                      {getEstadoInfo(pedido.estado).nombre}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">Total: {formatCurrency(pedido.total)}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Progress Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Pedido</CardTitle>
                <CardDescription>{getEstadoInfo(pedido.estado).descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ESTADOS_PEDIDO.map((estado, index) => {
                    const isCompleted = getEstadoIndex(pedido.estado) >= index
                    const isCurrent = pedido.estado === estado.id

                    return (
                      <div key={estado.id} className="flex items-center gap-4">
                        <div
                          className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                          ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}
                          ${isCurrent ? "ring-4 ring-green-200 scale-110" : ""}
                        `}
                        >
                          {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${isCompleted ? "text-green-700" : "text-gray-500"}`}>
                            {estado.nombre}
                          </h4>
                          <p className="text-sm text-gray-500">{estado.descripcion}</p>
                        </div>
                        {isCurrent && (
                          <div className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                            Estado actual
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Productos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-700">{pedido.productos}</p>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-lg">{formatCurrency(pedido.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              {pedido.cliente && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información del Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>
                          {pedido.cliente.nombres} {pedido.cliente.apellidos}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{pedido.cliente.email}</span>
                      </div>
                      {pedido.cliente.telefono && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{pedido.cliente.telefono}</span>
                        </div>
                      )}
                      {pedido.cliente.direccion && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-sm">{pedido.cliente.direccion}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historial del Pedido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Pedido realizado</p>
                      <p className="text-sm text-gray-500">{formatDate(pedido.fecha_pedido)}</p>
                    </div>
                  </div>

                  {pedido.fecha_actualizacion !== pedido.fecha_pedido && (
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Última actualización</p>
                        <p className="text-sm text-gray-500">{formatDate(pedido.fecha_actualizacion)}</p>
                      </div>
                    </div>
                  )}

                  {pedido.codigo_rastreo && (
                    <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Código de rastreo asignado</p>
                        <p className="text-sm text-gray-500 font-mono">{pedido.codigo_rastreo}</p>
                      </div>
                    </div>
                  )}

                  {pedido.notas && (
                    <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium">Notas especiales</p>
                        <p className="text-sm text-gray-600">{pedido.notas}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardContent className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">¿Tienes alguna pregunta sobre tu pedido?</h3>
                <p className="text-gray-600 mb-4">Nuestro equipo de atención al cliente está aquí para ayudarte</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Mail className="h-4 w-4" />
                    ventas@aslaboratorios.com
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Phone className="h-4 w-4" />
                    +51 961 996 645
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}