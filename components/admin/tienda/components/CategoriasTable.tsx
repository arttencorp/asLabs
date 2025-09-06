"use client"

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
import { Edit, Trash2, Package, Loader2, Tags, Eye, EyeOff } from "lucide-react"
import { formatDate } from '@/utils/index'
import type { CategoriasTableProps } from '../types'

export function CategoriasTable({
  categorias,
  loading,
  onEdit,
  onDelete,
  onToggleVisibility
}: CategoriasTableProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="h-5 w-5" />
            Categorías de Tienda
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
          <Tags className="h-5 w-5" />
          Categorías de Tienda ({categorias.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
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
            {categorias.map((categoria) => (
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
                      onClick={() => onToggleVisibility(categoria.cat_id_int, categoria.cat_activo_bool !== false)}
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
                      onClick={() => onDelete(categoria.cat_id_int)}
                      className="text-red-600 hover:text-red-700"
                      title="Eliminar categoría"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {categorias.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Tags className="h-8 w-8 text-gray-300" />
                    <p>No hay categorías registradas</p>
                    <p className="text-sm">Crea tu primera categoría para empezar.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
