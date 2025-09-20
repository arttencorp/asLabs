"use client"

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Loader2, Upload, X, FileText } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { CertificadoCalidadFormDialogProps, CertificadoCalidadForm } from '../types/index'

export function CertificadoCalidadFormDialog({
  open,
  onOpenChange,
  certificado,
  onSubmit,
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
  const [dragActive, setDragActive] = useState(false)

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        handleImageChange(file)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const removeImage = () => {
    handleImageChange(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Certificado de Calidad' : 'Nuevo Certificado de Calidad'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Certificado *</Label>
            <Input
              id="tipo"
              value={formData.tipo}
              onChange={(e) => handleInputChange('tipo', e.target.value)}
              placeholder="Ej: Análisis microbiológico, Control de calidad..."
              required
            />
          </div>

          {/* Código de Muestra */}
          <div className="space-y-2">
            <Label htmlFor="codMuestra">Código de Muestra</Label>
            <Input
              id="codMuestra"
              type="number"
              value={formData.codMuestra}
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
              value={formData.informacionEnsayo}
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
              value={formData.resultados}
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
              value={formData.observaciones}
              onChange={(e) => handleInputChange('observaciones', e.target.value)}
              placeholder="Observaciones adicionales..."
              rows={2}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Imagen del Certificado</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={imagePreview} alt="Preview" />
                    <AvatarFallback>
                      <FileText className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage()
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </div>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              className="hidden"
            />
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
            <Button type="submit" disabled={loading || !formData.tipo.trim()}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}