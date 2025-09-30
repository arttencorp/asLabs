"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { eliminarImagenFichaTecnica, actualizarFichaTecnica } from '@/lib/supabase'
import type { FichaTecnicaFormDialogProps, FichaTecnicaForm } from '../types'
import { PLACEHOLDERS, ERROR_MESSAGES } from '../constants'
import { validarArchivoImagen, formatearTamanoArchivo } from '../utils'

export function FichaTecnicaFormDialog({
  isOpen,
  onClose,
  editingFichaTecnica,
  onSubmit,
  loading,
  error,
  productos,
  productosLoading
}: FichaTecnicaFormDialogProps) {
  const [formData, setFormData] = useState<FichaTecnicaForm>({
    fit_tec_nom_planta_vac: '',
    fit_tec_cod_vac: '',
    pro_id_int: '',
    fit_tec_imag_vac: null
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cargar datos del item en edición
  useEffect(() => {
    if (editingFichaTecnica) {
      setFormData({
        fit_tec_nom_planta_vac: editingFichaTecnica.fit_tec_nom_planta_vac || '',
        fit_tec_cod_vac: editingFichaTecnica.fit_tec_cod_vac || '',
        pro_id_int: editingFichaTecnica.pro_id_int || '',
        fit_tec_imag_vac: editingFichaTecnica.fit_tec_imag_vac || null
      })
      if (editingFichaTecnica.fit_tec_imag_vac) {
        setPreviewUrl(editingFichaTecnica.fit_tec_imag_vac)
      }
    } else {
      setFormData({
        fit_tec_nom_planta_vac: '',
        fit_tec_cod_vac: '',
        pro_id_int: '',
        fit_tec_imag_vac: null
      })
      setPreviewUrl(null)
    }
    setSelectedFile(null)
    setFileError(null)
  }, [editingFichaTecnica, isOpen])

  const handleInputChange = (field: keyof FichaTecnicaForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileError(null)

    // Validar archivo
    const validation = validarArchivoImagen(file)
    if (!validation.isValid) {
      setFileError(validation.error || 'Archivo inválido')
      return
    }

    setSelectedFile(file)

    // Crear preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Función que muestra el diálogo de confirmación
  const showDeleteConfirmation = () => {
    setShowDeleteDialog(true)
  }

  // Función que ejecuta la eliminación de imagen
  const executeImageRemoval = async () => {
    setShowDeleteDialog(false) // Cerrar el diálogo
    
    try {
      // Si estamos editando y hay una imagen existente en la BD, eliminarla del storage
      if (editingFichaTecnica?.fit_tec_imag_vac) {
        const result = await eliminarImagenFichaTecnica(editingFichaTecnica.fit_tec_imag_vac)
        
        if (result.success) {
          
          // Actualizar inmediatamente la BD para quitar la referencia
          await actualizarFichaTecnica(editingFichaTecnica.fit_tec_id_int, { fit_tec_imag_vac: null })
        } else {
          console.warn('Error al eliminar imagen del storage:', result.error)
        }
      }
      
      // Limpiar estado local
      setSelectedFile(null)
      setPreviewUrl(null)
      setFormData(prev => ({ ...prev, fit_tec_imag_vac: null }))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error eliminando imagen:', error)
      // Aún así limpiar el estado local
      setSelectedFile(null)
      setPreviewUrl(null)
      setFormData(prev => ({ ...prev, fit_tec_imag_vac: null }))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Si hay un archivo seleccionado, necesitamos subirlo primero
    if (selectedFile) {
      // La función onSubmit del componente padre manejará la subida de imagen
      const dataWithFile = {
        ...formData,
        selectedFile
      }
      onSubmit(dataWithFile as any)
    } else {
      onSubmit(formData)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingFichaTecnica ? 'Editar Ficha Técnica' : 'Nueva Ficha Técnica'}
          </DialogTitle>
          <DialogDescription>
            {editingFichaTecnica 
              ? 'Modifica los datos de la ficha técnica.' 
              : 'Crea una nueva ficha técnica para un producto.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error general */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Nombre de la planta */}
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Planta *</Label>
            <Input
              id="nombre"
              value={formData.fit_tec_nom_planta_vac}
              onChange={(e) => handleInputChange('fit_tec_nom_planta_vac', e.target.value)}
              placeholder={PLACEHOLDERS.PLANT_NAME}
              required
            />
          </div>

          {/* Código técnico */}
          <div className="space-y-2">
            <Label htmlFor="codigo">Código Técnico</Label>
            <Input
              id="codigo"
              value={formData.fit_tec_cod_vac || ''}
              onChange={(e) => handleInputChange('fit_tec_cod_vac', e.target.value)}
              placeholder={PLACEHOLDERS.TECHNICAL_CODE}
            />
          </div>

          {/* Producto */}
          <div className="space-y-2">
            <Label htmlFor="producto">Producto *</Label>
            <Select
              value={formData.pro_id_int}
              onValueChange={(value) => handleInputChange('pro_id_int', value)}
              disabled={productosLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={productosLoading ? "Cargando productos..." : PLACEHOLDERS.SELECT_PRODUCT} />
              </SelectTrigger>
              <SelectContent>
                {productos.map((producto) => (
                  <SelectItem key={producto.pro_id_int} value={producto.pro_id_int}>
                    {producto.pro_nomb_vac || 'Sin nombre'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <Label>Imagen de la Ficha Técnica</Label>
            
            {/* Preview de imagen */}
            {previewUrl && (
              <div className="relative w-full max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={showDeleteConfirmation}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Input de archivo */}
            {!previewUrl && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="imagen"
                />
                <label htmlFor="imagen" className="cursor-pointer">
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

            {/* Error de archivo */}
            {fileError && (
              <Alert variant="destructive">
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            )}

            {/* Información del archivo seleccionado */}
            {selectedFile && (
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Archivo:</strong> {selectedFile.name}</p>
                <p><strong>Tamaño:</strong> {formatearTamanoArchivo(selectedFile.size)}</p>
                <p><strong>Tipo:</strong> {selectedFile.type}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : (editingFichaTecnica ? 'Actualizar' : 'Crear')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    {/* Diálogo de confirmación para eliminar imagen */}
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará permanentemente la imagen de la ficha técnica.
            Esta acción es <strong>irreversible</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={executeImageRemoval}
            className="bg-red-600 hover:bg-red-700"
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}