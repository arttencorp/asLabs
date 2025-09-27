"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { Search, Edit, Eye, Trash2, RefreshCw, Loader2, Image, Plus } from "lucide-react"
import { formatDate, getEstadoColor, getNombreCompleto } from '@/utils/index'
import type { Pedido } from '../types'

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
                <TableHead>Código Seguimiento</TableHead>
                <TableHead>Cotización</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Pedido</TableHead>
                <TableHead>Código Rastreo</TableHead>
                <TableHead>Imagen</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.totalItems === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
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
                        <Badge className={getEstadoColor(pedido.estado_pedido.est_ped_tipo_int, 'pedido')}>
                          {pedido.estado_pedido.est_ped_desc_vac}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(pedido.ped_fec_pedido_dt)}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {pedido.ped_cod_rastreo_vac || 'Sin código'}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {pedido.ped_imagen_url ? (
                          <div className="flex items-center gap-1">
                            <Image className="h-4 w-4 text-green-600" />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(pedido.ped_imagen_url!, '_blank')}
                              className="h-6 px-1 text-xs text-green-600 hover:text-green-700"
                              title="Ver imagen"
                            >
                              Ver
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400">
                            <Image className="h-4 w-4" />
                            <span className="text-xs">Sin imagen</span>
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
                          Ver cotización
                        </Button>
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
    </Card>
  )
}