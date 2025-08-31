"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Eye, Calendar, DollarSign } from "lucide-react"
import { formatDate, getEstadoColor, calcularTotalCotizacion } from '@/utils/index'
import { CotizacionViewDialog } from "@/components/admin/cotizaciones/components/cotizacionViewDialog"
import type { Cotizacion } from '@/components/admin/pedidos/types'

interface CotizacionesClienteProps {
  cotizaciones: Cotizacion[]
  loading: boolean
}

export function CotizacionesCliente({ cotizaciones, loading }: CotizacionesClienteProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCotizacion, setSelectedCotizacion] = useState<Cotizacion | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)

  // Filtrar cotizaciones por búsqueda
  const filteredCotizaciones = cotizaciones.filter(cotizacion =>
    cotizacion.cot_num_vac?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cotizacion.estado_cotizacion?.est_cot_desc_vac?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewCotizacion = (cotizacion: Cotizacion) => {
    setSelectedCotizacion(cotizacion)
    setShowViewDialog(true)
  }

  const handleCloseViewDialog = () => {
    setShowViewDialog(false)
    setSelectedCotizacion(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Cotizaciones del Cliente ({cotizaciones.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por número o estado..."
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando cotizaciones...</p>
            </div>
          ) : filteredCotizaciones.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No se encontraron cotizaciones que coincidan con la búsqueda' : 'Este cliente no tiene cotizaciones registradas'}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead>Fecha Vencimiento</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>IGV</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCotizaciones.map((cotizacion) => {
                    const total = cotizacion.detalle_cotizacion ? 
                      calcularTotalCotizacion(
                        cotizacion.detalle_cotizacion.map(d => ({
                          cantidad: d.det_cot_cant_int,
                          precio: d.det_cot_prec_hist_int
                        })),
                        cotizacion.cot_igv_bol
                      ).total : 0

                    return (
                      <TableRow key={cotizacion.cot_id_int}>
                        <TableCell className="font-mono font-bold text-blue-600">
                          {cotizacion.cot_num_vac}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={getEstadoColor(cotizacion.estado_cotizacion?.est_cot_tipo_int || 0, 'cotizacion')}
                          >
                            {cotizacion.estado_cotizacion?.est_cot_desc_vac || 'Sin estado'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {formatDate(cotizacion.cot_fec_emis_dt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {formatDate(cotizacion.cot_fec_venc_dt)}
                          </div>
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
                          <Badge variant={cotizacion.cot_igv_bol ? "default" : "secondary"}>
                            {cotizacion.cot_igv_bol ? "Con IGV" : "Sin IGV"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewCotizacion(cotizacion)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Ver
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
        open={showViewDialog}
        onClose={handleCloseViewDialog}
        cotizacion={selectedCotizacion}
      />
    </>
  )
}
