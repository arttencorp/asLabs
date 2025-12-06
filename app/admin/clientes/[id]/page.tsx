"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Building2, Mail, Phone, MapPin, Calendar, FileText, Package } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { obtenerPersonaPorId, obtenerCotizacionesPorCliente, obtenerPedidosPorCliente } from '@/lib/supabase'
import { formatDate, formatCurrency, getEstadoColor, getNombreCompleto } from '@/utils/index'
import type { ClientePersona } from '@/types/database'

interface CotizacionCliente {
  cot_id_int: string
  cot_num_vac: string
  cot_fec_emis_dt: string
  cot_fec_venc_dt: string
  cot_igv_bol: boolean
  estado_cotizacion?: {
    est_cot_desc_vac: string
    est_cot_tipo_int: number
  }
  detalle_cotizacion?: Array<{
    det_cot_cant_int: number
    det_cot_prec_hist_int: number
  }>
}

interface PedidoCliente {
  ped_id_int: string
  ped_cod_segui_vac: string
  ped_fec_pedido_dt: string
  ped_cod_rastreo_vac?: string
  estado_pedido?: {
    est_ped_desc_vac: string
    est_ped_tipo_int: number
  }
  cotizacion?: {
    cot_num_vac: string
    detalle_cotizacion?: Array<{
      det_cot_cant_int: number
      det_cot_prec_hist_int: number
    }>
    cot_igv_bol: boolean
  }
}

export default function ClienteDetallePage() {
  const params = useParams()
  const router = useRouter()
  const clienteId = params.id as string

  const [cliente, setCliente] = useState<ClientePersona | null>(null)
  const [cotizaciones, setCotizaciones] = useState<CotizacionCliente[]>([])
  const [pedidos, setPedidos] = useState<PedidoCliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarDatos = async () => {
      if (!clienteId) return

      setLoading(true)
      setError(null)

      try {
        const [clienteData, cotizacionesData, pedidosData] = await Promise.all([
          obtenerPersonaPorId(clienteId),
          obtenerCotizacionesPorCliente(clienteId),
          obtenerPedidosPorCliente(clienteId)
        ])

        setCliente(clienteData)
        setCotizaciones(cotizacionesData)
        setPedidos(pedidosData)
      } catch (error: any) {
        setError(error.message || 'Error al cargar los datos del cliente')
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [clienteId])

  const calcularTotalCotizacion = (detalles: Array<{ det_cot_cant_int: number, det_cot_prec_hist_int: number }>, incluyeIgv: boolean) => {
    const precioBase = detalles.reduce((sum, detalle) => 
      sum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int), 0
    )
    
    if (incluyeIgv) {
      // CON IGV: El precio base NO incluye IGV, se agrega 18%
      return precioBase + (precioBase * 0.18)
    } else {
      // SIN IGV: El precio base YA incluye IGV, el total es el precio base
      return precioBase
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando información del cliente...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!cliente) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertDescription>Cliente no encontrado</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header con botón de regreso */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Detalle del Cliente
          </h1>
          <p className="text-gray-600">
            Información completa, cotizaciones y pedidos
          </p>
        </div>
      </div>

      {/* Información del Cliente */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {cliente.tipo === 'natural' ? (
              <User className="h-5 w-5 text-blue-600" />
            ) : (
              <Building2 className="h-5 w-5 text-purple-600" />
            )}
            {getNombreCompleto(cliente)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Información básica */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={cliente.tipo === 'natural' ? 'default' : 'secondary'}>
                  {cliente.tipo === 'natural' ? 'Persona Natural' : 'Persona Jurídica'}
                </Badge>
              </div>
              
              {cliente.tipo === 'natural' && cliente.persona_natural ? (
                <div className="space-y-2">
                  <p className="text-sm"><strong>DNI:</strong> {cliente.persona_natural.per_nat_dni_int || 'No registrado'}</p>
                  <p className="text-sm"><strong>Nombres:</strong> {cliente.persona_natural.per_nat_nomb_vac || 'No registrado'}</p>
                  <p className="text-sm"><strong>Apellidos:</strong> {cliente.persona_natural.per_nat_apell_vac || 'No registrado'}</p>
                </div>
              ) : cliente.tipo === 'juridica' && cliente.persona_juridica ? (
                <div className="space-y-2">
                  <p className="text-sm"><strong>RUC:</strong> {cliente.persona_juridica.per_jurd_ruc_int || 'No registrado'}</p>
                  <p className="text-sm"><strong>Razón Social:</strong> {cliente.persona_juridica.per_jurd_razSocial_vac || 'No registrado'}</p>
                </div>
              ) : null}
            </div>

            {/* Información de contacto */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contacto
              </h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Email:</strong> {cliente.per_email_vac || 'No registrado'}</p>
                <p className="text-sm"><strong>Teléfono:</strong> {cliente.per_telef_int || 'No registrado'}</p>
                <p className="text-sm"><strong>Contacto:</strong> {cliente.per_nom_contac_vac || 'No registrado'}</p>
              </div>
            </div>

            {/* Información agrícola */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Información Agrícola
              </h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Cultivo:</strong> {cliente.per_cultivo_vac || 'No especificado'}</p>
                <p className="text-sm"><strong>Hectáreas Disponibles:</strong> {cliente.per_hec_disp_int || 0} ha</p>
                <p className="text-sm"><strong>Hectáreas Instaladas:</strong> {cliente.per_hec_inst_int || 0} ha</p>
                <p className="text-sm"><strong>Dirección:</strong> {cliente.per_direc_vac || 'No registrada'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para Cotizaciones y Pedidos */}
      <Tabs defaultValue="cotizaciones" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cotizaciones" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Cotizaciones ({cotizaciones.length})
          </TabsTrigger>
          <TabsTrigger value="pedidos" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Pedidos ({pedidos.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab de Cotizaciones */}
        <TabsContent value="cotizaciones">
          <Card>
            <CardHeader>
              <CardTitle>Cotizaciones del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {cotizaciones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Este cliente no tiene cotizaciones registradas</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Fecha Emisión</TableHead>
                        <TableHead>Fecha Vencimiento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>IGV</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cotizaciones.map((cotizacion) => {
                        const total = cotizacion.detalle_cotizacion ? 
                          calcularTotalCotizacion(cotizacion.detalle_cotizacion, cotizacion.cot_igv_bol) : 0
                        
                        return (
                          <TableRow key={cotizacion.cot_id_int}>
                            <TableCell className="font-medium">
                              {cotizacion.cot_num_vac}
                            </TableCell>
                            <TableCell>
                              {formatDate(cotizacion.cot_fec_emis_dt)}
                            </TableCell>
                            <TableCell>
                              {formatDate(cotizacion.cot_fec_venc_dt)}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={getEstadoColor(
                                  cotizacion.estado_cotizacion?.est_cot_tipo_int || 0,
                                  'cotizacion'
                                )}
                              >
                                {cotizacion.estado_cotizacion?.est_cot_desc_vac || 'Sin estado'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={cotizacion.cot_igv_bol ? "default" : "secondary"}>
                                {cotizacion.cot_igv_bol ? 'Con IGV' : 'Sin IGV'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(total)}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Pedidos */}
        <TabsContent value="pedidos">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {pedidos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Este cliente no tiene pedidos registrados</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código Seguimiento</TableHead>
                        <TableHead>Cotización</TableHead>
                        <TableHead>Fecha Pedido</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Código Rastreo</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pedidos.map((pedido) => {
                        const total = pedido.cotizacion?.detalle_cotizacion ? 
                          calcularTotalCotizacion(pedido.cotizacion.detalle_cotizacion, pedido.cotizacion.cot_igv_bol) : 0
                        
                        return (
                          <TableRow key={pedido.ped_id_int}>
                            <TableCell className="font-mono font-bold text-blue-600">
                              {pedido.ped_cod_segui_vac}
                            </TableCell>
                            <TableCell className="font-mono">
                              {pedido.cotizacion?.cot_num_vac || 'Sin número'}
                            </TableCell>
                            <TableCell>
                              {formatDate(pedido.ped_fec_pedido_dt)}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={getEstadoColor(
                                  pedido.estado_pedido?.est_ped_tipo_int || 0,
                                  'pedido'
                                )}
                              >
                                {pedido.estado_pedido?.est_ped_desc_vac || 'Sin estado'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {pedido.ped_cod_rastreo_vac || 'Sin código'}
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(total)}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resumen estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Cotizaciones</p>
                <p className="text-2xl font-bold text-gray-900">{cotizaciones.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{pedidos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cliente desde</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatDate(cliente.per_created_at_dt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
