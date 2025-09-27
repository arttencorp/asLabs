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
import { Edit, Trash2, Package, Loader2, ShoppingCart, Eye, EyeOff, Search, RefreshCw, Plus } from "lucide-react"
import { formatDate } from '@/utils/index'
import type { ProductosTiendaTableProps } from '../types'

export function ProductosTiendaTable({
  productos,
  categorias,
  loading,
  onEdit,
  onDelete,
  onToggleVisibility,
  onRefresh,
  onCreate
}: ProductosTiendaTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  const getCategoriaName = (categoriaId: string) => {
    const categoria = categorias.find(cat => cat.cat_id_int === categoriaId)
    return categoria?.cat_nom_vac || 'Sin categoría'
  }

  const formatPrice = (price: string | null) => {
    if (!price) return 'Sin precio'
    
    const numPrice = parseFloat(price)
    if (isNaN(numPrice)) return price
    
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(numPrice)
  }
  
  // Filtrar productos basado en el término de búsqueda
  const filteredProductos = useMemo(() => {
    return productos.filter(producto => {
      const searchLower = searchTerm.toLowerCase()
      const categoriaNombre = getCategoriaName(producto.cat_id_int)
      
      return (
        (producto.prod_tiend_nom_vac?.toLowerCase().includes(searchLower) || false) ||
        (producto.prod_tiend_desc_vac?.toLowerCase().includes(searchLower) || false) ||
        categoriaNombre.toLowerCase().includes(searchLower) ||
        (producto.prod_tiend_prec_vac?.toLowerCase().includes(searchLower) || false) ||
        producto.prod_tiend_id_int.toString().includes(searchTerm)
      )
    })
  }, [productos, searchTerm, categorias])

  // Configurar paginación
  const pagination = usePagination({
    data: filteredProductos,
    defaultPageSize: 10,
    defaultPage: 1
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Productos de Tienda ({pagination.totalItems})
          </CardTitle>
          <div className="flex gap-2">
            {onRefresh && (
              <Button variant="outline" onClick={onRefresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            )}
            {onCreate && (
              <Button className="text-white" onClick={onCreate} disabled={loading}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
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
              placeholder="Buscar por nombre, categoría, precio, descripción o ID..."
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
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Creado</TableHead>
                    <TableHead>Actualizado</TableHead>
                    <TableHead className="w-[180px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagination.totalItems === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        {searchTerm ? (
                          <div className="flex flex-col items-center gap-2">
                            <ShoppingCart className="h-8 w-8 text-gray-300" />
                            <p>No se encontraron productos que coincidan con la búsqueda</p>
                            <p className="text-sm">Intenta con otros términos de búsqueda.</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <ShoppingCart className="h-8 w-8 text-gray-300" />
                            <p>No hay productos registrados</p>
                            <p className="text-sm">Crea tu primer producto para empezar.</p>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagination.paginatedData.map((producto) => (
                      <TableRow key={producto.prod_tiend_id_int}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-600" />
                            {producto.prod_tiend_nom_vac || 'Sin nombre'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {getCategoriaName(producto.cat_id_int)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatPrice(producto.prod_tiend_prec_vac)}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate">
                            {producto.prod_tiend_desc_vac || (
                              <span className="text-gray-400 italic">Sin descripción</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={producto.prod_tiend_activo_bool !== false ? "default" : "secondary"}
                            className={producto.prod_tiend_activo_bool !== false ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {producto.prod_tiend_activo_bool !== false ? (
                              <>
                                <Eye className="h-3 w-3 mr-1" />
                                Visible
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3 mr-1" />
                                Oculto
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {producto.prod_tiend_created_at_dt ? formatDate(producto.prod_tiend_created_at_dt) : 'Sin fecha'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {producto.prod_tiend_updated_at_dt ? formatDate(producto.prod_tiend_updated_at_dt) : 'Sin fecha'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEdit(producto)}
                              title="Editar producto"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onToggleVisibility(producto)}
                              title={producto.prod_tiend_activo_bool !== false ? "Ocultar producto" : "Mostrar producto"}
                              className={producto.prod_tiend_activo_bool !== false ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                            >
                              {producto.prod_tiend_activo_bool !== false ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDelete(producto)}
                              className="text-red-600 hover:text-red-700"
                              title="Eliminar producto"
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
