"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { DataPagination } from "@/components/ui/data-pagination"
import { usePagination } from "@/hooks/usePagination"
import { Edit, Trash2, Package, Loader2, Tags, Eye, EyeOff, Search, RefreshCw, Plus } from "lucide-react"
import { formatDate } from '@/utils/index'
import type { CategoriasTableProps } from '../types'

export function CategoriasTable({
  categorias,
  loading,
  onEdit,
  onDelete,
  onToggleVisibility,
  onRefresh,
  onCreate
}: CategoriasTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filtrar categorías basado en el término de búsqueda
  const filteredCategorias = useMemo(() => {
    return categorias.filter(categoria => {
      const searchLower = searchTerm.toLowerCase()
      return (
        (categoria.cat_nom_vac?.toLowerCase().includes(searchLower) || false) ||
        (categoria.cat_desc_vac?.toLowerCase().includes(searchLower) || false) ||
        categoria.cat_id_int.toString().includes(searchTerm)
      )
    })
  }, [categorias, searchTerm])

  // Configurar paginación
  const pagination = usePagination({
    data: filteredCategorias,
    defaultPageSize: 10,
    defaultPage: 1
  })
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            Categorías de Tienda
          </CardTitle>
          <div className="flex gap-2">
            {onRefresh && (
              <Button variant="outline" onClick={onRefresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            )}
            {onCreate && (
              <Button onClick={onCreate} disabled={loading} className="text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Categoría
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nombre, descripción o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Creada</TableHead>
                    <TableHead>Última Actualización</TableHead>
                    <TableHead className="w-[160px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagination.totalItems === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {searchTerm ? (
                          <div className="flex flex-col items-center gap-2">
                            <Tags className="h-8 w-8 text-gray-300" />
                            <p>No se encontraron categorías que coincidan con la búsqueda</p>
                            <p className="text-sm">Intenta con otros términos de búsqueda.</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Tags className="h-8 w-8 text-gray-300" />
                            <p>No hay categorías registradas</p>
                            <p className="text-sm">Crea tu primera categoría para empezar.</p>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagination.paginatedData.map((categoria) => (
                      <TableRow key={categoria.cat_id_int}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {categoria.cat_nom_vac || 'Sin nombre'}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate">
                            {categoria.cat_desc_vac || (
                              <span className="text-gray-400 italic">Sin descripción</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={categoria.cat_activo_bool !== false ? "default" : "secondary"}
                            className={categoria.cat_activo_bool !== false ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {categoria.cat_activo_bool !== false ? (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                Visible
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" />
                                Oculta
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {categoria.cat_created_at_dt ? formatDate(categoria.cat_created_at_dt) : 'Sin fecha'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {categoria.cat_updated_at_dt ? formatDate(categoria.cat_updated_at_dt) : 'Sin fecha'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEdit(categoria)}
                              title="Editar categoría"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onToggleVisibility(categoria)}
                              title={categoria.cat_activo_bool !== false ? "Ocultar categoría" : "Mostrar categoría"}
                              className={categoria.cat_activo_bool !== false ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                            >
                              {categoria.cat_activo_bool !== false ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDelete(categoria)}
                              className="text-red-600 hover:text-red-700"
                              title="Eliminar categoría"
                            >
                              <Trash2 className="h-4 w-4" />
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
          </>
        )}
      </CardContent>
    </Card>
  )
}
