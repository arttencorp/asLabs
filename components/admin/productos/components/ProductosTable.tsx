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
import { Edit, Package, Loader2, Search, RefreshCw, Plus } from "lucide-react"
import { formatearPrecio, obtenerEstadoProducto } from '../utils'
import type { ProductosTableProps } from '../types'

export function ProductosTable({
  productos,
  loading,
  onEdit,
  onDelete,
  onRefresh,
  onCreate
}: ProductosTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filtrar productos basado en el término de búsqueda
  const filteredProductos = useMemo(() => {
    return productos.filter(producto => {
      const searchLower = searchTerm.toLowerCase()
      return (
        (producto.pro_nomb_vac?.toLowerCase().includes(searchLower) || false) ||
        (producto.pro_desc_vac?.toLowerCase().includes(searchLower) || false) ||
        producto.pro_id_int.toString().includes(searchTerm)
      )
    })
  }, [productos, searchTerm])

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
            Catálogo de Productos
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
                    <TableHead>Precio</TableHead> 
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagination.totalItems === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? 'No se encontraron productos que coincidan con la búsqueda' : 'No hay productos registrados. Crea el primer producto usando el botón "Nuevo Producto".'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagination.paginatedData.map((producto) => {
                      const estado = obtenerEstadoProducto(producto.pro_prec_unitario_int)
                      
                      return (
                        <TableRow key={producto.pro_id_int}>
                          <TableCell className="font-medium">
                            {producto.pro_nomb_vac || 'Sin nombre'}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate">
                              {producto.pro_desc_vac || 'Sin descripción'}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">
                            {formatearPrecio(producto.pro_prec_unitario_int)}
                          </TableCell> 
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(producto)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
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
