"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Package } from "lucide-react"
import type { ProductoTiendaFormDialogProps, ProductoTiendaForm } from '../types'

export function ProductoTiendaFormDialog({
  isOpen,
  onClose,
  editingProducto,
  onSubmit,
  loading,
  error,
  categorias
}: ProductoTiendaFormDialogProps) {
  const [form, setForm] = useState<ProductoTiendaForm>({
    prod_tiend_nom_vac: '',
    prod_tiend_desc_vac: '',
    prod_tiend_prec_vac: '',
    cat_id_int: ''
  })

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Actualizar formulario cuando cambia el producto a editar
  useEffect(() => {
    if (editingProducto) {
      setForm({
        prod_tiend_nom_vac: editingProducto.prod_tiend_nom_vac || '',
        prod_tiend_desc_vac: editingProducto.prod_tiend_desc_vac || '',
        prod_tiend_prec_vac: editingProducto.prod_tiend_prec_vac || '',
        cat_id_int: editingProducto.cat_id_int || ''
      })
    } else {
      setForm({
        prod_tiend_nom_vac: '',
        prod_tiend_desc_vac: '',
        prod_tiend_prec_vac: '',
        cat_id_int: ''
      })
    }
    setValidationErrors([])
  }, [editingProducto, isOpen])

  const validateForm = (): boolean => {
    const errors: string[] = []
    
    if (!form.prod_tiend_nom_vac?.trim()) {
      errors.push('El nombre del producto es obligatorio')
    }
    
    if (!form.cat_id_int) {
      errors.push('La categoría es obligatoria')
    }

    // Validar precio si se proporciona
    if (form.prod_tiend_prec_vac && form.prod_tiend_prec_vac.trim()) {
      const precio = parseFloat(form.prod_tiend_prec_vac.trim())
      if (isNaN(precio) || precio < 0) {
        errors.push('El precio debe ser un número válido mayor o igual a 0')
      }
    }
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Limpiar datos antes de enviar
    const cleanedForm: ProductoTiendaForm = {
      prod_tiend_nom_vac: form.prod_tiend_nom_vac.trim(),
      prod_tiend_desc_vac: form.prod_tiend_desc_vac?.trim() || null,
      prod_tiend_prec_vac: form.prod_tiend_prec_vac?.trim() || null,
      cat_id_int: form.cat_id_int
    }

    onSubmit(cleanedForm)
  }

  const handleInputChange = (field: keyof ProductoTiendaForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const getCategoriaName = (categoriaId: string) => {
    const categoria = categorias.find(cat => cat.cat_id_int === categoriaId)
    return categoria?.cat_nom_vac || 'Sin nombre'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
          <DialogDescription>
            {editingProducto 
              ? 'Modifica los datos del producto seleccionado.'
              : 'Completa la información para crear un nuevo producto de tienda.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Errores de validación */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Error del servidor */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Nombre del producto */}
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={form.prod_tiend_nom_vac}
              onChange={(e) => handleInputChange('prod_tiend_nom_vac', e.target.value)}
              placeholder="Ingresa el nombre del producto"
              disabled={loading}
              required
            />
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría *</Label>
            <Select
              value={form.cat_id_int}
              onValueChange={(value) => handleInputChange('cat_id_int', value)}
              disabled={loading}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias
                  .filter(cat => cat.cat_activo_bool !== false) // Solo mostrar categorías activas
                  .map((categoria) => (
                    <SelectItem key={categoria.cat_id_int} value={categoria.cat_id_int}>
                      {getCategoriaName(categoria.cat_id_int)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              type="text"
              value={form.prod_tiend_prec_vac || ''}
              onChange={(e) => handleInputChange('prod_tiend_prec_vac', e.target.value)}
              placeholder="Ej: 25.50"
              disabled={loading}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={form.prod_tiend_desc_vac || ''}
              onChange={(e) => handleInputChange('prod_tiend_desc_vac', e.target.value)}
              placeholder="Describe el producto (opcional)"
              rows={3}
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingProducto ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                editingProducto ? 'Actualizar' : 'Crear'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
