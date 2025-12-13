"use client"

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, X } from "lucide-react"
import { eliminarImagenCertificado, actualizarCertificadoCalidad } from '@/lib/supabase'
import type { CertificadoCalidadFormDialogProps, CertificadoCalidadForm } from '../types/index'

export function CertificadoCalidadFormDialog({
  open,
  onOpenChange,
  certificado,
  onSubmit,
  onUpdateEditingItem,
  loading,
  productos
}: CertificadoCalidadFormDialogProps) {
  const [formData, setFormData] = useState<CertificadoCalidadForm>({
    tipo: '',
    codMuestra: '',
    informacionEnsayo: '',
    resultados: '',
    observaciones: '',
    proId: '',
    imagen: null
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isRemovingImage, setIsRemovingImage] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const isEditing = !!certificado

  // Reset form when dialog opens/closes or certificado changes
  useEffect(() => {
    if (open) {
      if (certificado) {
        setFormData({
          tipo: certificado.cer_cal_tipo_vac || '',
          codMuestra: certificado.cer_cal_cod_muestra_int?.toString() || '',
          informacionEnsayo: certificado.cer_cal_infor_ensayo_vac || '',
          resultados: certificado.cer_cal_result_vac || '',
          observaciones: certificado.cer_cal_resum_vac || '',
          proId: certificado.pro_id_int || 'sin-producto',
          imagen: null
        })
        setImagePreview(certificado.cer_cal_imag_url || null)
      } else {
        setFormData({
          tipo: '',
          codMuestra: '',
          informacionEnsayo: '',
          resultados: '',
          observaciones: '',
          proId: 'sin-producto',
          imagen: null
        })
        setImagePreview(null)
      }
    }
  }, [open, certificado])

  const handleInputChange = (field: keyof CertificadoCalidadForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      imagen: file
    }))

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(isEditing ? certificado?.cer_cal_imag_url || null : null)
    }
  }

  const clearImage = () => {
    setFormData(prev => ({
      ...prev,
      imagen: null
    }))
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  // Función que muestra el diálogo de confirmación
  const showDeleteConfirmation = () => {
    setShowDeleteDialog(true)
  }

  // Función que ejecuta la eliminación de imagen
  const executeImageRemoval = async () => {
    if (isRemovingImage) return // Prevenir múltiples clicks

    setIsRemovingImage(true)
    setShowDeleteDialog(false) // Cerrar el diálogo

    try {
      // Si estamos editando y hay una imagen existente en la BD, eliminarla del storage
      if (certificado?.cer_cal_imag_url) {
        const result = await eliminarImagenCertificado(certificado.cer_cal_imag_url)

        if (result.success) {

          // Actualizar inmediatamente la BD para quitar la referencia
          await actualizarCertificadoCalidad(certificado.cer_cal_id_int, { cer_cal_imag_url: null })

          // Actualizar el item en edición para que el formulario refleje el cambio
          if (onUpdateEditingItem) {
            onUpdateEditingItem({ cer_cal_imag_url: null })
          }
        } else {
          console.warn('⚠️ Error al eliminar imagen del storage:', result.error)
        }
      }

      // Limpiar estado local (igual que fichas técnicas)
      clearImage()
      setFormData(prev => ({ ...prev, imagen: null }))
    } catch (error) {
      console.error('💥 Error eliminando imagen:', error)
      // Aún así limpiar el estado local
      clearImage()
      setFormData(prev => ({ ...prev, imagen: null }))
    } finally {
      setIsRemovingImage(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Certificado de Calidad' : 'Nuevo Certificado de Calidad'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Certificado</Label>
              <Input
                id="tipo"
                value={formData.tipo || ""}
                onChange={(e) => handleInputChange('tipo', e.target.value)}
                placeholder="Ej: Análisis microbiológico, Control de calidad..."
              />
            </div>

            {/* Código de Muestra */}
            <div className="space-y-2">
              <Label htmlFor="codMuestra">Código de Muestra</Label>
              <Input
                id="codMuestra"
                type="number"
                value={formData.codMuestra || ""}
                onChange={(e) => handleInputChange('codMuestra', e.target.value)}
                placeholder="Ej: 12345"
              />
            </div>

            {/* Producto */}
            <div className="space-y-2">
              <Label htmlFor="producto">Producto</Label>
              <Select
                value={formData.proId}
                onValueChange={(value) => handleInputChange('proId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar producto..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sin-producto">Sin producto</SelectItem>
                  {productos.map((producto) => (
                    <SelectItem key={producto.pro_id_int} value={producto.pro_id_int}>
                      {producto.pro_nomb_vac}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Información del Ensayo */}
            <div className="space-y-2">
              <Label htmlFor="informacionEnsayo">Información del Ensayo</Label>
              <Textarea
                id="informacionEnsayo"
                value={formData.informacionEnsayo || ""}
                onChange={(e) => handleInputChange('informacionEnsayo', e.target.value)}
                placeholder="Descripción del ensayo realizado..."
                rows={3}
              />
            </div>

            {/* Resultados */}
            <div className="space-y-2">
              <Label htmlFor="resultados">Resultados</Label>
              <Textarea
                id="resultados"
                value={formData.resultados || ""}
                onChange={(e) => handleInputChange('resultados', e.target.value)}
                placeholder="Resultados obtenidos del análisis..."
                rows={3}
              />
            </div>

            {/* Observaciones */}
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                value={formData.observaciones || ""}
                onChange={(e) => handleInputChange('observaciones', e.target.value)}
                placeholder="Observaciones adicionales..."
                rows={2}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Imagen del Certificado</Label>

              {/* Preview de imagen */}
              {imagePreview && (
                <div className="relative w-full max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    disabled={isRemovingImage}
                    onClick={(e) => {
                      e.stopPropagation()
                      showDeleteConfirmation()
                    }}
                  >
                    {isRemovingImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}

              {/* Input de archivo */}
              {!imagePreview && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                    className="hidden"
                    id="imagen-certificado"
                  />
                  <label htmlFor="imagen-certificado" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Haz clic para seleccionar una imagen
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG o WebP (máx. 5MB)
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Actualizar' : 'Crear'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar imagen */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la imagen del certificado de calidad.
              Esta acción es <strong>irreversible</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeImageRemoval}
              className="bg-red-600 hover:bg-red-700"
              disabled={isRemovingImage}
            >
              {isRemovingImage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                'Sí, eliminar'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}