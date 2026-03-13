"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { Search, Edit, Eye, Trash2, RefreshCw, Loader2, Image, Plus, FileText, Info } from "lucide-react"
import { formatDate, getEstadoColor, getNombreCompleto } from '@/utils/index'
import type { Pedido } from '../types'

// Formato "DD Mes. YYYY" (ej: 08 Mar. 2026)
function formatDateDMY(dateString: string | null | undefined): string {
  if (!dateString) return 'Sin fecha'
  const date = new Date(dateString + (dateString.includes('T') ? '' : 'T00:00:00'))
  const day = date.toLocaleDateString('es-PE', { day: '2-digit', timeZone: 'America/Lima' })
  const month = date.toLocaleDateString('es-PE', { month: 'short', timeZone: 'America/Lima' })
  const year = date.toLocaleDateString('es-PE', { year: 'numeric', timeZone: 'America/Lima' })
  // Capitalize first letter of month
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1)
  return `${day} ${monthCap} ${year}`
}

interface PedidosListProps {
  pedidos: Pedido[]
  loading: boolean
  onEdit: (pedido: Pedido) => void
  onDelete: (id: string) => void
  onRefresh: () => void
  onViewCotizacion: (pedido: Pedido) => void
  onCreate: () => void
}

export function PedidosList({ pedidos, loading, onEdit, onDelete, onRefresh, onViewCotizacion, onCreate }: PedidosListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showObservaciones, setShowObservaciones] = useState(false)
  const [selectedObservaciones, setSelectedObservaciones] = useState<{ observaciones: string, codigo: string } | null>(null)
  const [showImagenes, setShowImagenes] = useState(false)
  const [selectedPedidoImagenes, setSelectedPedidoImagenes] = useState<Pedido | null>(null)

  // Filtrar pedidos basado en el término de búsqueda
  const filteredPedidos = useMemo(() => {
    return pedidos.filter(pedido => {
      const searchLower = searchTerm.toLowerCase()
      const nombreCliente = pedido.cotizacion?.persona ? getNombreCompleto(pedido.cotizacion.persona) : ''

      return (
        pedido.ped_cod_segui_vac.toLowerCase().includes(searchLower) ||
        pedido.ped_cod_rastreo_vac?.toLowerCase().includes(searchLower) ||
        nombreCliente.toLowerCase().includes(searchLower) ||
        pedido.cotizacion?.cot_num_vac.toLowerCase().includes(searchLower)
      )
    })
  }, [pedidos, searchTerm])

  // Configurar paginación
  const pagination = usePagination<Pedido>({
    data: filteredPedidos,
    defaultPageSize: 10,
    defaultPage: 1
  })

  // Manejo de eliminación con confirmación (patrón useBaseCrud)
  const handleDelete = (pedido: Pedido) => {
    if (confirm(`¿Estás seguro de eliminar el pedido ${pedido.ped_cod_segui_vac}?`)) {
      onDelete(pedido.ped_id_int)
    }
  }

  // Manejo de observaciones
  const handleViewObservaciones = (pedido: Pedido) => {
    if (pedido.ped_observacion_vac) {
      setSelectedObservaciones({
        observaciones: pedido.ped_observacion_vac,
        codigo: pedido.ped_cod_segui_vac
      })
      setShowObservaciones(true)
    }
  }

  // Manejo de galería de imágenes
  const handleViewImagenes = (pedido: Pedido) => {
    setSelectedPedidoImagenes(pedido)
    setShowImagenes(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Lista de Pedidos</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onRefresh} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
            <Button className="text-white" onClick={onCreate} disabled={loading}>
              <Plus className="h-4 w-4 mr-2" />
              Iniciar Pedido
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por código, cliente o cotización..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Código Seguimiento</TableHead>
                <TableHead className="text-center">Cotización</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Fecha Pedido</TableHead>
                <TableHead className="text-center">Actualización</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center gap-1">
                    Código Rastreo
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[220px] text-center">
                          <p>Código proporcionado por la empresa encargada del envío (courier)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="text-center">Archivos</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.totalItems === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {loading ? "Cargando pedidos..." : "No hay pedidos registrados"}
                  </TableCell>
                </TableRow>
              ) : (
                pagination.paginatedData.map((pedido) => (
                  <TableRow key={pedido.ped_id_int}>
                    <TableCell className="font-mono font-bold text-blue-600">
                      {pedido.ped_cod_segui_vac}
                    </TableCell>
                    <TableCell className="font-mono">
                      {pedido.cotizacion?.cot_num_vac || 'Sin número'}
                    </TableCell>
                    <TableCell>
                      {pedido.cotizacion?.persona ?
                        getNombreCompleto(pedido.cotizacion.persona) :
                        'Sin cliente'
                      }
                    </TableCell>
                    <TableCell>
                      {pedido.estado_pedido?.est_ped_tipo_int && (
                        <Badge className={`whitespace-nowrap ${getEstadoColor(pedido.estado_pedido.est_ped_tipo_int, 'pedido')}`}>
                          {pedido.estado_pedido.est_ped_desc_vac?.replace(/_/g, ' ') ?? ''}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDateDMY(pedido.ped_fec_pedido_dt || pedido.ped_created_at_dt)}</TableCell>
                    <TableCell>{formatDateDMY(pedido.ped_fec_actualizada_dt)}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {pedido.ped_cod_rastreo_vac || 'Sin código'}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {pedido.documentos && pedido.documentos.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <Image className="h-4 w-4 text-green-600" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Abrir la primera imagen, o se puede mostrar un modal con galería
                                if (pedido.documentos && pedido.documentos.length === 1) {
                                  window.open(pedido.documentos[0].ped_doc_url_vac, '_blank')
                                } else {
                                  // Para múltiples, abrir la primera
                                  window.open(pedido.documentos![0].ped_doc_url_vac, '_blank')
                                }
                              }}
                              className="h-6 px-1 text-xs text-green-600 hover:text-green-700"
                              title="Ver imágenes"
                            >
                              {pedido.documentos.length} {pedido.documentos.length === 1 ? 'archivo' : 'archivos'}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400">
                            <Image className="h-4 w-4" />
                            <span className="text-xs">Sin archivos</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(pedido)}
                          title="Editar pedido"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>{/* 
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(pedido)}
                          disabled={loading}
                          title="Eliminar pedido"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>*/}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewCotizacion(pedido)}
                          disabled={loading}
                          title="Ver cotización"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {pedido.documentos && pedido.documentos.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewImagenes(pedido)}
                            disabled={loading}
                            title="Ver imágenes"
                            className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                          >
                            <Image className="h-4 w-4" />
                          </Button>
                        )}
                        {pedido.ped_observacion_vac && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewObservaciones(pedido)}
                            disabled={loading}
                            title="Ver observaciones"
                            className="text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {pagination.totalItems > 0 && (
          <DataPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
            totalItems={pagination.totalItems}
            onPageChange={pagination.setCurrentPage}
            onPageSizeChange={pagination.setPageSize}
            showPageSizeSelector={true}
            pageSizeOptions={[5, 10, 20, 50]}
            className="mt-4"
          />
        )}
      </CardContent>

      {/* Diálogo de Observaciones */}
      {showObservaciones && selectedObservaciones && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Observaciones del Pedido
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowObservaciones(false)
                  setSelectedObservaciones(null)
                }}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-800">
                  Pedido: {selectedObservaciones.codigo}
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Observaciones:</h4>
                <div className="bg-white border border-gray-200 rounded p-3 min-h-[100px]">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedObservaciones.observaciones}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowObservaciones(false)
                    setSelectedObservaciones(null)
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de Galería de Imágenes */}
      {showImagenes && selectedPedidoImagenes && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Image className="h-5 w-5 text-green-600" />
                Imágenes del Pedido
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowImagenes(false)
                  setSelectedPedidoImagenes(null)
                }}
              >
                ✕
              </Button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-green-800">
                Pedido: {selectedPedidoImagenes.ped_cod_segui_vac}
                <span className="text-green-600 font-normal ml-2">
                  ({selectedPedidoImagenes.documentos?.length || 0} {(selectedPedidoImagenes.documentos?.length || 0) === 1 ? 'imagen' : 'imágenes'})
                </span>
              </p>
            </div>

            {selectedPedidoImagenes.documentos && selectedPedidoImagenes.documentos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedPedidoImagenes.documentos.map((doc) => (
                  <div
                    key={doc.ped_doc_id_int}
                    className="group relative border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => window.open(doc.ped_doc_url_vac, '_blank')}
                  >
                    <img
                      src={doc.ped_doc_url_vac}
                      alt="Documento del pedido"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400">
                            <span class="text-sm">Error al cargar imagen</span>
                          </div>
                        `
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 rounded-full p-2 shadow">
                        <Eye className="h-5 w-5 text-gray-700" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Este pedido no tiene imágenes adjuntas</p>
              </div>
            )}

            <div className="flex justify-end mt-5">
              <Button
                variant="outline"
                onClick={() => {
                  setShowImagenes(false)
                  setSelectedPedidoImagenes(null)
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}