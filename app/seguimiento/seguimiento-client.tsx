"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Calendar, User, Phone, Mail, Loader2, Eye, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { obtenerPedidoPorCodigo } from "@/lib/supabase"
import { formatCurrency, formatDate, getNombreCompleto, getDocumentoCliente, calcularTotalCotizacion } from "@/utils"
import { ESTADOS_SEGUIMIENTO } from "@/constants/seguimiento"
import type { Pedido } from "@/components/admin/pedidos/types"

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
      const pedidoEncontrado = await obtenerPedidoPorCodigo(codigo.trim())

      if (pedidoEncontrado) {
        setPedido(pedidoEncontrado)
      } else {
        setError("No se encontró ningún pedido con ese código de seguimiento")
      }
      setSearched(true)
    } catch {
      setError("Error al buscar el pedido. Inténtalo de nuevo.")
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  const getEstadoInfo = (estadoTipo: number) => {
    return ESTADOS_SEGUIMIENTO.find((e) => e.id === estadoTipo) || ESTADOS_SEGUIMIENTO[0]
  }

  const getEstadoIndex = (estadoTipo: number) => {
    return ESTADOS_SEGUIMIENTO.findIndex((e) => e.id === estadoTipo)
  }

  // Función para obtener estados que debe ver el cliente según el estado actual del pedido
  const getEstadosVisibles = (estadoActual: number) => {
    // Estados del flujo normal (siempre visibles)
    const estadosNormales = ESTADOS_SEGUIMIENTO.filter(estado => 
      [1, 2, 3, 4, 5, 6].includes(estado.id) // PEDIDO_RECIBIDO, PAGO_VERIFICADO, PREPARANDO, EMPACANDO, ENVIADO, RECIBIDO
    )

    // Si el pedido está cancelado, mostrar solo hasta donde llegó + CANCELADO
    if (estadoActual === 7) { // CANCELADO
      const estadoCancelado = ESTADOS_SEGUIMIENTO.find(e => e.id === 7)
      return estadoCancelado ? [...estadosNormales, estadoCancelado] : estadosNormales
    }

    // Si el pedido está en reembolso, mostrar flujo completo + REEMBOLSO
    if (estadoActual === 8) { // REEMBOLSO
      const estadoReembolso = ESTADOS_SEGUIMIENTO.find(e => e.id === 8)
      return estadoReembolso ? [...estadosNormales, estadoReembolso] : estadosNormales
    }

    // Si el pedido está en pago contraentrega, mostrar flujo hasta enviado + PAGO_CONTRAENTREGA + RECIBIDO
    if (estadoActual === 9) { // PAGO_CONTRAENTREGA
      const estadosHastaEnviado = ESTADOS_SEGUIMIENTO.filter(estado => 
        [1, 2, 3, 4, 5].includes(estado.id) // Hasta ENVIADO
      )
      const estadoPagoContraentrega = ESTADOS_SEGUIMIENTO.find(e => e.id === 9)
      const estadoRecibido = ESTADOS_SEGUIMIENTO.find(e => e.id === 6) // RECIBIDO como paso final
      
      const estadosVisibles = [...estadosHastaEnviado]
      if (estadoPagoContraentrega) estadosVisibles.push(estadoPagoContraentrega)
      if (estadoRecibido) estadosVisibles.push(estadoRecibido)
      
      return estadosVisibles
    }

    // Para cualquier otro estado, solo mostrar flujo normal
    return estadosNormales
  }

  const getTotalPedido = (pedido: Pedido): number => {
    if (!pedido.cotizacion?.detalle_cotizacion) return 0

    const { total } = calcularTotalCotizacion(
      pedido.cotizacion.detalle_cotizacion.map(d => ({
        cantidad: d.det_cot_cant_int,
        precio: d.det_cot_prec_hist_int
      })),
      pedido.cotizacion.cot_igv_bol
    )

    return total
  }

  const getProductosTexto = (pedido: Pedido): string => {
    if (!pedido.cotizacion?.detalle_cotizacion) return 'Sin productos'

    return pedido.cotizacion.detalle_cotizacion
      .map(d => `${d.producto?.pro_nomb_vac || 'Producto'} (${d.det_cot_cant_int})`)
      .join(', ')
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
                  placeholder="Ej: ASL2026-ABCD1234"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                  className="flex-1 text-center font-mono text-lg"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading || !codigo.trim()}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 text-white" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                El código de seguimiento se encuentra en tu confirmación de pedido
              </p>
            </form>
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
                      Pedido {pedido.ped_cod_segui_vac}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Código de seguimiento:{" "}
                      <span className="font-mono font-bold text-blue-600">{pedido.ped_cod_segui_vac}</span>
                    </CardDescription>
                    {pedido.cotizacion && (
                      <CardDescription className="mt-1">
                        Cotización: {pedido.cotizacion.cot_num_vac}
                      </CardDescription>
                    )}
                  </div>
                  <div className="text-right">
                    {pedido.estado_pedido && (
                      <Badge className={`${getEstadoInfo(pedido.estado_pedido.est_ped_tipo_int || 1).color} text-sm px-3 py-1`}>
                        {getEstadoInfo(pedido.estado_pedido.est_ped_tipo_int || 1).nombre}
                      </Badge>
                    )}
                    <p className="text-sm text-gray-500 mt-1">Total: {formatCurrency(getTotalPedido(pedido))}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Progress Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Pedido</CardTitle>
                {pedido.estado_pedido && (
                  <CardDescription>
                    {getEstadoInfo(pedido.estado_pedido.est_ped_tipo_int || 1).descripcion}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEstadosVisibles(pedido.estado_pedido?.est_ped_tipo_int || 1).map((estado, index) => {
                    const currentEstadoTipo = pedido.estado_pedido?.est_ped_tipo_int || 1
                    const estadosVisibles = getEstadosVisibles(currentEstadoTipo)
                    const isCompleted = estadosVisibles.findIndex(e => e.id === currentEstadoTipo) >= index
                    const isCurrent = currentEstadoTipo === estado.id

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
                  <div className="space-y-3">
                    {pedido.cotizacion?.detalle_cotizacion?.map((detalle, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {detalle.producto?.pro_nomb_vac || 'Producto sin nombre'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Cantidad: {detalle.det_cot_cant_int} | Precio: {formatCurrency(detalle.det_cot_prec_hist_int)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int)}
                          </p>
                        </div>
                      </div>
                    )) || (
                        <p className="text-gray-500 text-center py-4">No hay productos disponibles</p>
                      )}

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-lg">{formatCurrency(getTotalPedido(pedido))}</span>
                      </div>
                      {pedido.cotizacion?.cot_igv_bol && (
                        <p className="text-xs text-gray-500 text-right">Incluye IGV</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              {pedido.cotizacion?.persona && (
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
                        <span>{getNombreCompleto(pedido.cotizacion.persona)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{pedido.cotizacion.persona.per_email_vac}</span>
                      </div>
                      {pedido.cotizacion.persona.per_telef_int && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{pedido.cotizacion.persona.per_telef_int}</span>
                        </div>
                      )}
                      {pedido.cotizacion.persona.per_direc_vac && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-sm">{pedido.cotizacion.persona.per_direc_vac}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {getDocumentoCliente(pedido.cotizacion.persona)}
                        </span>
                      </div>
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
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Imagen del Pedido - Lado Izquierdo */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Imagen del Pedido
                    </h4>
                    {pedido.ped_imagen_url ? (
                      <div className="space-y-3">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={pedido.ped_imagen_url}
                            alt="Imagen del pedido"
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                          <div className="hidden bg-gray-100 h-48 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <Package className="h-8 w-8 mx-auto mb-2" />
                              <p className="text-sm">Error al cargar imagen</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(pedido.ped_imagen_url, '_blank')}
                          className="w-full flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Ver completo
                        </Button>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg bg-gray-50 h-48 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Package className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">No hay imagen disponible</p>
                          <p className="text-xs">Se agregará cuando el pedido esté en preparación</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Historial - Lado Derecho */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Cronología
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">Pedido creado</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(pedido.ped_fec_pedido_dt, { includeTime: true })}
                          </p>
                        </div>
                      </div>

                      {pedido.ped_fec_actualizada_dt !== pedido.ped_fec_pedido_dt && (
                        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium">Última actualización</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(pedido.ped_fec_actualizada_dt, { includeTime: true })}
                            </p>
                          </div>
                        </div>
                      )}

                      {pedido.ped_cod_rastreo_vac && (
                        <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="font-medium">Código de rastreo asignado</p>
                            <p className="text-sm text-gray-500 font-mono">{pedido.ped_cod_rastreo_vac}</p>
                          </div>
                        </div>
                      )}

                      {/*pedido.ped_observacion_vac && (
                        <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="font-medium">Observaciones</p>
                            <p className="text-sm text-gray-600">{pedido.ped_observacion_vac}</p>
                          </div>
                        </div>
                      )*/}

                      {/* Información adicional de la cotización */}
                      {pedido.cotizacion?.informacion_adicional && (
                        <>
                          {pedido.cotizacion.informacion_adicional.inf_ad_lug_recojo_vac && (
                            <div className="flex items-start gap-4 p-3 bg-orange-50 rounded-lg">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="font-medium">Lugar de recojo</p>
                                <p className="text-sm text-gray-600">
                                  {pedido.cotizacion.informacion_adicional.inf_ad_lug_recojo_vac}
                                </p>
                              </div>
                            </div>
                          )}

                          {pedido.cotizacion.informacion_adicional.inf_ad_form_entr_vac && (
                            <div className="flex items-start gap-4 p-3 bg-teal-50 rounded-lg">
                              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="font-medium">Forma de entrega</p>
                                <p className="text-sm text-gray-600">
                                  {pedido.cotizacion.informacion_adicional.inf_ad_form_entr_vac}
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
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