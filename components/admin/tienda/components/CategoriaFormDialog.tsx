"use client"

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle } from "lucide-react"
import type { CategoriaFormDialogProps, CategoriaForm } from '../types'

export function CategoriaFormDialog({
  isOpen,
  onClose,
  editingCategoria,
  onSubmit,
  loading,
  error
}: CategoriaFormDialogProps) {
  const [form, setForm] = useState<CategoriaForm>({
    cat_nom_vac: '',
    cat_desc_vac: ''
  })

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Resetear formulario cuando se abre/cierra el diálogo
  useEffect(() => {
    if (isOpen) {
      if (editingCategoria) {
        // Modo edición
        setForm({
          cat_nom_vac: editingCategoria.cat_nom_vac || '',
          cat_desc_vac: editingCategoria.cat_desc_vac || ''
        })
      } else {
        // Modo creación
        setForm({
          cat_nom_vac: '',
          cat_desc_vac: ''
        })
      }
      setValidationErrors([])
    }
  }, [isOpen, editingCategoria])

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (!form.cat_nom_vac?.trim()) {
      errors.push('El nombre de la categoría es obligatorio')
    }

    if (form.cat_nom_vac && form.cat_nom_vac.trim().length > 100) {
      errors.push('El nombre no puede exceder 100 caracteres')
    }

    if (form.cat_desc_vac && form.cat_desc_vac.trim().length > 500) {
      errors.push('La descripción no puede exceder 500 caracteres')
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Limpiar descripción vacía - convertir string vacío a null
    const formData = {
      ...form,
      cat_desc_vac: form.cat_desc_vac?.trim() || null
    }

    onSubmit(formData)
  }

  const handleClose = () => {
    setForm({
      cat_nom_vac: '',
      cat_desc_vac: ''
    })
    setValidationErrors([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
          <DialogDescription>
            {editingCategoria 
              ? 'Modifica los datos de la categoría seleccionada.'
              : 'Completa la información para crear una nueva categoría.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-right">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nombre"
              value={form.cat_nom_vac}
              onChange={(e) => setForm(prev => ({ ...prev, cat_nom_vac: e.target.value }))}
              placeholder="Ej: Medios de Cultivo"
              disabled={loading}
              maxLength={100}
            />
          </div>

          {/* Campo Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              value={form.cat_desc_vac || ''}
              onChange={(e) => setForm(prev => ({ ...prev, cat_desc_vac: e.target.value }))}
              placeholder="Descripción opcional de la categoría..."
              disabled={loading}
              maxLength={500}
              rows={3}
            />
          </div>

          {/* Errores de validación */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
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

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingCategoria ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
