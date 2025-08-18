import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Edit, Package, Loader2 } from "lucide-react"
import { formatearPrecio, obtenerEstadoProducto } from '../utils'
import type { ProductosTableProps } from '../types'

export function ProductosTable({
  productos,
  loading,
  onEdit,
  onDelete
}: ProductosTableProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Catálogo de Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Catálogo de Productos ({productos.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => {
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
                    <Badge variant={estado.variant}>
                      {estado.texto}
                    </Badge>
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
                      {/* 
                      Botón de eliminar comentado según requerimientos del usuario
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(producto.pro_id_int)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      */}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {productos.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No hay productos registrados. Crea el primer producto usando el botón "Nuevo Producto".
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
