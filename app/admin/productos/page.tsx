'use client'

import { useBaseCrud } from '@/hooks/useBaseCrud'
import { obtenerProductos } from '@/lib/supabase'
import type { ProductoDatabase } from '@/types/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Plus, Edit, Trash2, Package, Loader2, AlertCircle } from "lucide-react"

// Tipo para formulario de producto (simplificado)
interface ProductoForm {
  pro_nomb_vac: string
  pro_desc_vac: string | null
  pro_prec_unitario_int: number
}

// Funciones CRUD dummy (hasta implementar en Supabase)
const crearProducto = async (data: ProductoForm): Promise<ProductoDatabase> => {
  // TODO: Implementar en lib/supabase.ts
  throw new Error("Función crearProducto no implementada en Supabase")
}

const actualizarProducto = async (id: string, data: Partial<ProductoForm>): Promise<ProductoDatabase> => {
  // TODO: Implementar en lib/supabase.ts  
  throw new Error("Función actualizarProducto no implementada en Supabase")
}

const eliminarProducto = async (id: string): Promise<void> => {
  // TODO: Implementar en lib/supabase.ts
  throw new Error("Función eliminarProducto no implementada en Supabase")
}

const validarProducto = (data: ProductoForm): string[] => {
  const errors: string[] = []
  if (!data.pro_nomb_vac?.trim()) errors.push("El nombre del producto es requerido")
  if (!data.pro_prec_unitario_int || data.pro_prec_unitario_int <= 0) errors.push("El precio debe ser mayor a 0")
  return errors
}

export default function ProductosPage() {
  const {
    items: productos,
    loading,
    error,
    success,
    form,
    editingItem,
    isDialogOpen,
    setForm,
    setError,
    setIsDialogOpen,
    setEditingItem,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useBaseCrud<ProductoDatabase, ProductoForm>({
    fetchFn: obtenerProductos,
    createFn: crearProducto,
    updateFn: actualizarProducto,
    deleteFn: eliminarProducto,
    initialForm: {
      pro_nomb_vac: '',
      pro_desc_vac: null,
      pro_prec_unitario_int: 0
    },
    validateFn: validarProducto,
    getIdFn: (producto) => producto.pro_id_int
  })

  const openEditDialog = (producto: ProductoDatabase) => {
    setEditingItem(producto)
    setForm({
      pro_nomb_vac: producto.pro_nomb_vac || '',
      pro_desc_vac: producto.pro_desc_vac,
      pro_prec_unitario_int: producto.pro_prec_unitario_int || 0
    })
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingItem(null)
    setForm({
      pro_nomb_vac: '',
      pro_desc_vac: null,
      pro_prec_unitario_int: 0
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (editingItem) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <p className="text-gray-600">Administra el catálogo de productos de laboratorio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar Producto' : 'Nuevo Producto'}
              </DialogTitle>
              <DialogDescription>
                {editingItem ? 'Modifica los datos del producto' : 'Completa la información del nuevo producto'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre del Producto *</Label>
                <Input
                  id="nombre"
                  value={form.pro_nomb_vac}
                  onChange={(e) => setForm({ ...form, pro_nomb_vac: e.target.value })}
                  placeholder="Ej: Agar TSA"
                />
              </div>
              
              <div>
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={form.pro_desc_vac || ''}
                  onChange={(e) => setForm({ ...form, pro_desc_vac: e.target.value || null })}
                  placeholder="Descripción detallada del producto..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="precio">Precio Unitario (S/.) *</Label>
                <Input
                  id="precio"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.pro_prec_unitario_int}
                  onChange={(e) => setForm({ ...form, pro_prec_unitario_int: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingItem ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Con Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {productos.filter(p => (p.pro_prec_unitario_int || 0) > 0).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sin Precio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {productos.filter(p => !p.pro_prec_unitario_int || p.pro_prec_unitario_int === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Catálogo de Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
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
                {productos.map((producto) => (
                  <TableRow key={producto.pro_id_int}>
                    <TableCell className="font-medium">
                      {producto.pro_nomb_vac || 'Sin nombre'}
                    </TableCell>
                    <TableCell>
                      {producto.pro_desc_vac || 'Sin descripción'}
                    </TableCell>
                    <TableCell>
                      S/. {(producto.pro_prec_unitario_int || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={producto.pro_prec_unitario_int && producto.pro_prec_unitario_int > 0 ? 'default' : 'secondary'}>
                        {producto.pro_prec_unitario_int && producto.pro_prec_unitario_int > 0 ? 'Disponible' : 'Sin precio'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(producto)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(producto.pro_id_int)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {productos.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No hay productos registrados. Crea el primer producto.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* TODO Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-900">Funcionalidad en desarrollo</h3>
              <p className="text-sm text-orange-700 mt-1">
                Las operaciones de crear, actualizar y eliminar productos requieren implementación en el backend. 
                Actualmente solo se puede visualizar el catálogo existente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}