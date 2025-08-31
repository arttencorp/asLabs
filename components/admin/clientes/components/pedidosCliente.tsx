"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Search, Eye, Calendar, DollarSign, Truck } from "lucide-react"
import { formatDate, getEstadoColor, calcularTotalCotizacion } from '@/utils/index'
import { CotizacionViewDialog } from "@/components/admin/pedidos/components/cotizacionViewDialog"
import type { Pedido } from '@/components/admin/pedidos/types'

interface PedidosClienteProps {
  pedidos: Pedido[]
  loading: boolean
}

export function PedidosCliente({ pedidos, loading }: PedidosClienteProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCotizacion, setSelectedCotizacion] = useState<any>(null)
  const [showCotizacionDialog, setShowCotizacionDialog] = useState(false)

  // Filtrar pedidos por búsqueda
  const filteredPedidos = pedidos.filter(pedido =>
    pedido.ped_cod_segui_vac?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.cotizacion?.cot_num_vac?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.estado_pedido?.est_ped_desc_vac?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.ped_cod_rastreo_vac?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewCotizacion = (pedido: Pedido) => {
    if (pedido.cotizacion) {
      setSelectedCotizacion(pedido.cotizacion)
      setShowCotizacionDialog(true)
    }
  }

  const handleCloseCotizacionDialog = () => {
    setShowCotizacionDialog(false)
    setSelectedCotizacion(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              Pedidos del Cliente ({pedidos.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por código, estado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando pedidos...</p>
            </div>
          ) : filteredPedidos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No se encontraron pedidos que coincidan con la búsqueda' : 'Este cliente no tiene pedidos registrados'}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código Seguimiento</TableHead>
                    <TableHead>Cotización</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Pedido</TableHead>
                    <TableHead>Código Rastreo</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[120px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPedidos.map((pedido) => {
                    const total = pedido.cotizacion?.detalle_cotizacion ? 
                      calcularTotalCotizacion(
                        pedido.cotizacion.detalle_cotizacion.map(d => ({
                          cantidad: d.det_cot_cant_int,
                          precio: d.det_cot_prec_hist_int
                        })),
                        pedido.cotizacion.cot_igv_bol
                      ).total : 0

                    return (
                      <TableRow key={pedido.ped_id_int}>
                        <TableCell className="font-mono font-bold text-green-600">
                          {pedido.ped_cod_segui_vac}
                        </TableCell>
                        <TableCell className="font-mono text-blue-600">
                          {pedido.cotizacion?.cot_num_vac || 'Sin número'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={getEstadoColor(pedido.estado_pedido?.est_ped_tipo_int || 0, 'pedido')}
                          >
                            {pedido.estado_pedido?.est_ped_desc_vac || 'Sin estado'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {formatDate(pedido.ped_fec_pedido_dt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {pedido.ped_cod_rastreo_vac ? (
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-orange-500" />
                              <span className="font-mono text-sm">{pedido.ped_cod_rastreo_vac}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">Sin código</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-semibold">
                              S/ {total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewCotizacion(pedido)}
                            disabled={!pedido.cotizacion}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Ver Cotización
                          </Button>
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

      {/* Modal para ver cotización */}
      <CotizacionViewDialog
        open={showCotizacionDialog}
        onClose={handleCloseCotizacionDialog}
        cotizacion={selectedCotizacion}
      />
    </>
  )
}
