"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Upload, X, Eye } from "lucide-react"
import { obtenerPedidoPorCodigo } from "@/lib/supabase"
import { subirImagenPedido, eliminarImagenPedido } from "@/lib/supabase"
import type { EstadoPedido } from '@/types/database'
import type { PedidoForm, Cotizacion, Pedido } from '../types'

interface PedidoFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: PedidoForm) => Promise<void>
  pedido?: Pedido | null
  cotizaciones: Cotizacion[]
  estadosPedido: EstadoPedido[]
  loading: boolean
}

export function PedidoFormDialog({ 
  open, 
  onClose, 
  onSubmit, 
  pedido, 
  cotizaciones, 
  estadosPedido, 
  loading 
}: PedidoFormProps) {
  const [formData, setFormData] = useState<PedidoForm>({
    cotizacion_id: '',
    estado_id: '',
    codigo_rastreo: '',
    observaciones: '',
    numero_comprobante: '',
    imagen_url: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagenFile, setImagenFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [deletingImage, setDeletingImage] = useState(false)

  useEffect(() => {
    if (pedido) {
      setFormData({
        cotizacion_id: pedido.cot_id_int,
        estado_id: pedido.est_ped_id_int,
        codigo_rastreo: pedido.ped_cod_rastreo_vac || '',
        observaciones: pedido.ped_observacion_vac || '',
        numero_comprobante: pedido.ped_num_comprob_vac || '',
        imagen_url: pedido.ped_imagen_url || ''
      })
      
      // Si el pedido tiene imagen, mostrarla como preview
      if (pedido.ped_imagen_url) {
        setPreviewUrl(pedido.ped_imagen_url)
      }
    } else {
      // Para crear pedido nuevo: solo resetear cotización, estado se asigna automáticamente
      setFormData({
        cotizacion_id: '',
        estado_id: '',
        codigo_rastreo: '',
        observaciones: '',
        numero_comprobante: '',
        imagen_url: ''
      })
      
      // Limpiar imagen states
      setImagenFile(null)
      setPreviewUrl(null)
    }
    
    // Limpiar errores cuando se abre/cierra el modal
    setErrors({})
  }, [pedido, estadosPedido, open])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Cotización siempre es obligatoria (crear y editar)
    if (!formData.cotizacion_id || formData.cotizacion_id.trim() === '') {
      newErrors.cotizacion_id = 'Debe seleccionar una cotización'
    }

    // Estado solo es obligatorio al editar
    if (pedido && (!formData.estado_id || formData.estado_id.trim() === '')) {
      newErrors.estado_id = 'El estado es obligatorio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      let finalFormData = { ...formData }

      // Si hay una nueva imagen, subirla primero
      if (imagenFile) {
        const imageUrl = await uploadImage()
        if (imageUrl) {
          finalFormData.imagen_url = imageUrl
        }
      }

      await onSubmit(finalFormData)
      
      // Limpiar estados de imagen después del submit exitoso
      setImagenFile(null)
      setPreviewUrl(null)
      
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleChange = (field: keyof PedidoForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, imagen: 'Solo se permiten archivos de imagen' }))
        return
      }

      setImagenFile(file)
      
      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Limpiar errores de imagen
      if (errors.imagen) {
        setErrors(prev => ({ ...prev, imagen: '' }))
      }
    }
  }

  const removeImage = async () => {
    setDeletingImage(true)
    
    try {
      // Si estamos editando y hay una imagen existente en la BD, eliminarla del storage
      if (pedido?.ped_imagen_url && previewUrl === pedido.ped_imagen_url) {
        await eliminarImagenPedido(pedido.ped_imagen_url)
        // También actualizar el formData para que se guarde el cambio
        setFormData(prev => ({ ...prev, imagen_url: '' }))
      }
      
      setImagenFile(null)
      setPreviewUrl(null)
      setFormData(prev => ({ ...prev, imagen_url: '' }))
      
      // Limpiar el input file
      const fileInput = document.getElementById('imagen_file') as HTMLInputElement
      if (fileInput) {
        fileInput.value = ''
      }
      
      // Limpiar errores
      if (errors.imagen) {
        setErrors(prev => ({ ...prev, imagen: '' }))
      }
    } catch (error: any) {
      let errorMessage = 'Error al eliminar la imagen del servidor'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      setErrors(prev => ({ ...prev, imagen: errorMessage }))
    } finally {
      setDeletingImage(false)
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imagenFile) return null

    setUploadingImage(true)
    
    try {
      // Si hay una imagen anterior y estamos editando, eliminarla primero
      if (pedido?.ped_imagen_url) {
        try {
          await eliminarImagenPedido(pedido.ped_imagen_url)
        } catch (error) {
          // No lanzar error, continuar con la subida de la nueva imagen
        }
      }

      // Subir nueva imagen
      const imageUrl = await subirImagenPedido(imagenFile, pedido?.ped_id_int)
      return imageUrl
    } catch (error: any) {
      let errorMessage = 'Error al subir la imagen. Inténtalo de nuevo.'
      
      if (error instanceof Error) {
        if (error.message.includes('Bucket not found')) {
          errorMessage = 'Error de configuración: Bucket no encontrado. Contacta al administrador.'
        } else if (error.message.includes('permission')) {
          errorMessage = 'Error de permisos. Contacta al administrador.'
        } else if (error.message.includes('File type')) {
          errorMessage = 'Tipo de archivo no válido. Solo se permiten imágenes.'
        } else {
          errorMessage = error.message
        }
      }
      
      setErrors(prev => ({ ...prev, imagen: errorMessage }))
      throw error
    } finally {
      setUploadingImage(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {pedido ? 'Editar Pedido' : 'Iniciar Nuevo Pedido'}
          </DialogTitle>
          <DialogDescription>
            {pedido ? 'Modifica la información del pedido' : 'Selecciona una cotización para crear un pedido automáticamente'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!pedido ? (
            // CREAR/INICIAR PEDIDO: SOLO mostrar selector de cotización
            <div>
              <Label htmlFor="cotizacion">Seleccionar Cotización *</Label>
              <Select
                value={formData.cotizacion_id}
                onValueChange={(value) => handleChange('cotizacion_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cotización para iniciar pedido" />
                </SelectTrigger>
                <SelectContent>
                  {cotizaciones.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No hay cotizaciones disponibles. 
                      Todas las cotizaciones ya tienen pedidos asociados.
                    </div>
                  ) : (
                    cotizaciones.map((cotizacion) => (
                      <SelectItem key={cotizacion.cot_id_int} value={cotizacion.cot_id_int}>
                        <div className="flex flex-col">
                          <span className="font-medium">{cotizacion.cot_num_vac}</span>
                          <span className="text-sm text-gray-500">
                            {cotizacion.persona ? 
                              (cotizacion.persona.tipo === 'natural' && cotizacion.persona.persona_natural ?
                                `${cotizacion.persona.persona_natural.per_nat_nomb_vac} ${cotizacion.persona.persona_natural.per_nat_apell_vac}` :
                                cotizacion.persona.persona_juridica?.per_jurd_razSocial_vac
                              ) : 'Sin cliente'
                            }
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.cotizacion_id && (
                <p className="text-sm text-red-500 mt-1">{errors.cotizacion_id}</p>
              )}
              
              {/* Mensaje cuando no hay cotizaciones disponibles */}
              {cotizaciones.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">No hay cotizaciones disponibles</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Todas las cotizaciones ya tienen pedidos asociados. Cada cotización solo puede tener un pedido único.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mensaje informativo */}
              {cotizaciones.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Información importante</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li><strong>Solo se muestran cotizaciones disponibles</strong> (sin pedido asociado)</li>
                          <li>Se creará automáticamente con estado "PEDIDO_RECIBIDO"</li>
                          <li>Se generará código de seguimiento único (ASL-XXXXXXXX)</li>
                          <li><strong>Cada cotización solo puede tener UN pedido</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // EDITAR PEDIDO: Mostrar todos los campos necesarios
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cotizacion">Cotización *</Label>
                <Select
                  value={formData.cotizacion_id}
                  onValueChange={(value) => handleChange('cotizacion_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cotización" />
                  </SelectTrigger>
                  <SelectContent>
                    {cotizaciones.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No hay cotizaciones disponibles.
                      </div>
                    ) : (
                      cotizaciones.map((cotizacion) => (
                        <SelectItem key={cotizacion.cot_id_int} value={cotizacion.cot_id_int}>
                          <div className="flex flex-col">
                            <span className="font-medium">{cotizacion.cot_num_vac}</span>
                            <span className="text-sm text-gray-500">
                              {cotizacion.persona ? 
                                (cotizacion.persona.tipo === 'natural' && cotizacion.persona.persona_natural ?
                                  `${cotizacion.persona.persona_natural.per_nat_nomb_vac} ${cotizacion.persona.persona_natural.per_nat_apell_vac}` :
                                  cotizacion.persona.persona_juridica?.per_jurd_razSocial_vac
                                ) : 'Sin cliente'
                              }
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errors.cotizacion_id && (
                  <p className="text-sm text-red-500 mt-1">{errors.cotizacion_id}</p>
                )}
              </div>

              <div>
                <Label htmlFor="estado">Estado *</Label>
                <Select
                  value={formData.estado_id}
                  onValueChange={(value) => handleChange('estado_id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estadosPedido.map((estado) => (
                      <SelectItem key={estado.est_ped_id_int} value={estado.est_ped_id_int}>
                        {estado.est_ped_desc_vac}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.estado_id && (
                  <p className="text-sm text-red-500 mt-1">{errors.estado_id}</p>
                )}
              </div>

              <div>
                <Label htmlFor="codigo_rastreo">Código de Rastreo</Label>
                <Input
                  id="codigo_rastreo"
                  value={formData.codigo_rastreo}
                  onChange={(e) => handleChange('codigo_rastreo', e.target.value)}
                  placeholder="Código de rastreo externo"
                />
              </div>

              <div>
                <Label htmlFor="numero_comprobante">Número de Comprobante</Label>
                <Input
                  id="numero_comprobante"
                  value={formData.numero_comprobante}
                  onChange={(e) => handleChange('numero_comprobante', e.target.value)}
                  placeholder="Número de comprobante"
                />
              </div>

              {/* Campo de Imagen */}
              <div>
                <Label htmlFor="imagen">Imagen del Pedido</Label>
                <div className="space-y-3">
                  {/* Input para subir archivo */}
                  <div className="flex items-center gap-2">
                    <Input
                      id="imagen_file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('imagen_file')?.click()}
                      disabled={uploadingImage || deletingImage}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      {previewUrl ? 'Cambiar imagen' : 'Subir imagen'}
                    </Button>
                    
                    {previewUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeImage}
                        disabled={uploadingImage || deletingImage}
                        className="text-red-600 hover:text-red-700"
                        title="Eliminar imagen"
                      >
                        {deletingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>

                  {/* Preview de la imagen */}
                  {previewUrl && (
                    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Preview del pedido"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(previewUrl, '_blank')}
                          className="bg-white/80 hover:bg-white/90"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Input URL manual (como alternativa) */}
                  <div>
                    <Input
                      id="imagen_url"
                      value={formData.imagen_url}
                      onChange={(e) => {
                        handleChange('imagen_url', e.target.value)
                        if (e.target.value && !imagenFile) {
                          setPreviewUrl(e.target.value)
                        }
                      }}
                      placeholder="O pega la URL de la imagen aquí"
                      className="text-sm"
                    />
                  </div>

                  {errors.imagen && (
                    <p className="text-sm text-red-500">{errors.imagen}</p>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Formatos soportados: JPG, PNG, WebP.
                  </p>
                </div>
              </div>

              <div className="col-span-2">
                <Label htmlFor="observaciones">Observaciones</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleChange('observaciones', e.target.value)}
                  placeholder="Observaciones adicionales del pedido"
                  rows={3}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading || uploadingImage || deletingImage || (!pedido && cotizaciones.length === 0)}
            >
              {(loading || uploadingImage || deletingImage) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {uploadingImage ? 'Subiendo imagen...' : deletingImage ? 'Eliminando imagen...' : (pedido ? 'Actualizar Pedido' : 'Iniciar Pedido')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}