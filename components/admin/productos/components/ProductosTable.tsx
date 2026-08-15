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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Package, Loader2, Search, RefreshCw, Plus, Trash2, Eye } from "lucide-react"
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
  const [viewingProducto, setViewingProducto] = useState<any>(null)
  
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
                            <div title={producto.pro_nomb_vac || ''}>
                              {producto.pro_nomb_vac || 'Sin nombre'}
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
                                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-150 mr-2"
                                onClick={() => setViewingProducto(producto)}
                                title="Ver detalles"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150"
                                onClick={() => onEdit(producto)}
                                title="Editar producto"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {onDelete && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <button
                                      className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-150 ml-2"
                                      title="Eliminar producto"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Está seguro que desea eliminar este producto?</AlertDialogTitle>
                                      <AlertDialogDescription className="text-black">
                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el producto del catálogo.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction 
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                        onClick={() => onDelete(producto.pro_id_int)}
                                      >
                                        Aceptar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
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

      {/* Modal de Detalles */}
      <Dialog open={!!viewingProducto} onOpenChange={(open) => !open && setViewingProducto(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {viewingProducto && (
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-sm font-semibold text-black">Nombre</h4>
                <p className="text-base">{viewingProducto.pro_nomb_vac || 'Sin nombre'}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-black">Descripción</h4>
                <p className="text-base whitespace-pre-wrap">{viewingProducto.pro_desc_vac || 'Sin descripción'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-black">Precio Unitario</h4>
                  <p className="text-base">{formatearPrecio(viewingProducto.pro_prec_unitario_int)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black">Stock</h4>
                  <p className="text-base">{viewingProducto.pro_stock_int ?? 0}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
