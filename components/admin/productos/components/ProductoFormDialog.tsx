import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Loader2, AlertCircle } from "lucide-react"
import type { ProductoFormDialogProps, ProductoForm } from '../types'

export function ProductoFormDialog({
  isOpen,
  onClose,
  editingProducto,
  onSubmit,
  loading,
  error
}: ProductoFormDialogProps) {
  const [form, setForm] = useState<ProductoForm>({
    pro_nomb_vac: '',
    pro_desc_vac: null,
    pro_prec_unitario_int: 0
  })

  // Actualizar formulario cuando se cambia el producto en edición
  useEffect(() => {
    if (editingProducto) {
      setForm({
        pro_nomb_vac: editingProducto.pro_nomb_vac || '',
        pro_desc_vac: editingProducto.pro_desc_vac,
        pro_prec_unitario_int: editingProducto.pro_prec_unitario_int || 0
      })
    } else {
      setForm({
        pro_nomb_vac: '',
        pro_desc_vac: null,
        pro_prec_unitario_int: 0
      })
    }
  }, [editingProducto, isOpen])

  const handleSubmit = () => {
    onSubmit(form)
  }

  const handleClose = () => {
    setForm({
      pro_nomb_vac: '',
      pro_desc_vac: null,
      pro_prec_unitario_int: 0
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
          <DialogDescription>
            {editingProducto 
              ? 'Modifica los datos del producto seleccionado' 
              : 'Completa la información del nuevo producto de laboratorio'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre del Producto *</Label>
            <Input
              id="nombre"
              value={form.pro_nomb_vac}
              onChange={(e) => setForm({ ...form, pro_nomb_vac: e.target.value })}
              placeholder="Ej: Agar TSA, Kit de Microbiología, etc."
              disabled={loading}
            />
          </div>
          
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={form.pro_desc_vac || ''}
              onChange={(e) => setForm({ ...form, pro_desc_vac: e.target.value || null })}
              placeholder="Descripción detallada del producto, especificaciones técnicas, uso recomendado..."
              rows={4}
              disabled={loading}
            />
          </div>
          
          <div>
            <Label htmlFor="precio">Precio Unitario (S/.) *</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              min="0"
              max="999999.99"
              value={form.pro_prec_unitario_int}
              onChange={(e) => setForm({ ...form, pro_prec_unitario_int: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Ingrese el precio en soles (S/.)
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {editingProducto ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
