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
              placeholder="Buscar por nombre o descripción..."
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
            <div className="rounded-md border overflow-hidden">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Nombre</TableHead>
                    <TableHead className="w-[30%]">Descripción</TableHead>
                    <TableHead className="w-[13%] text-center">Precio</TableHead>
                    <TableHead className="w-[12%] text-center">Stock</TableHead>
                    <TableHead className="w-[15%] text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagination.totalItems === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? 'No se encontraron productos que coincidan con la búsqueda' : 'No hay productos registrados. Crea el primer producto usando el botón "Nuevo Producto".'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagination.paginatedData.map((producto) => {
                      const estado = obtenerEstadoProducto(producto.pro_prec_unitario_int)
                      
                      return (
                        <TableRow key={producto.pro_id_int}>
                          <TableCell className="font-medium">
                            <div className="truncate max-w-[300px]" title={producto.pro_nomb_vac || ''}>
                              {producto.pro_nomb_vac || 'Sin nombre'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="truncate max-w-[300px]" title={producto.pro_desc_vac || ''}>
                              {producto.pro_desc_vac || 'Sin descripción'}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-center">
                            {formatearPrecio(producto.pro_prec_unitario_int)}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className={`font-semibold ${
                              (producto.pro_stock_int ?? 0) === 0 
                                ? 'text-red-600' 
                                : (producto.pro_stock_int ?? 0) <= 10 
                                  ? 'text-amber-600' 
                                  : 'text-green-600'
                            }`}>
                              {producto.pro_stock_int ?? 0}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center">
                              <button
                                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150"
                                onClick={() => onEdit(producto)}
                                title="Editar producto"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
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
