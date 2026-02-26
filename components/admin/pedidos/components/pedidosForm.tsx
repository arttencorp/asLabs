"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Upload, X, Eye, ImagePlus } from "lucide-react"
import { subirDocumentoPedido, eliminarDocumentoPedido } from "@/lib/supabase"
import type { EstadoPedido } from '@/types/database'
import type { PedidoForm, Cotizacion, Pedido, PedidoDoc } from '../types'

interface PedidoFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: PedidoForm) => Promise<void>
  pedido?: Pedido | null
  cotizaciones: Cotizacion[]
  estadosPedido: EstadoPedido[]
  loading: boolean
  onDocumentosChange?: () => void
}

interface ArchivoPreview {
  file: File
  previewUrl: string
}

export function PedidoFormDialog({
  open,
  onClose,
  onSubmit,
  pedido,
  cotizaciones,
  estadosPedido,
  loading,
  onDocumentosChange
}: PedidoFormProps) {
  const [formData, setFormData] = useState<PedidoForm>({
    cotizacion_id: '',
    estado_id: '',
    codigo_rastreo: '',
    observaciones: '',
    numero_comprobante: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  // Archivos nuevos pendientes de subir
  const [archivosNuevos, setArchivosNuevos] = useState<ArchivoPreview[]>([])
  // Documentos existentes (ya subidos en BD)
  const [documentosExistentes, setDocumentosExistentes] = useState<PedidoDoc[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null)

  useEffect(() => {
    if (pedido) {
      setFormData({
        cotizacion_id: pedido.cot_id_int,
        estado_id: pedido.est_ped_id_int,
        codigo_rastreo: pedido.ped_cod_rastreo_vac || '',
        observaciones: pedido.ped_observacion_vac || '',
        numero_comprobante: pedido.ped_num_comprob_vac || ''
      })

      // Cargar documentos existentes
      setDocumentosExistentes(pedido.documentos || [])
    } else {
      setFormData({
        cotizacion_id: '',
        estado_id: '',
        codigo_rastreo: '',
        observaciones: '',
        numero_comprobante: ''
      })
      setDocumentosExistentes([])
    }

    // Limpiar archivos nuevos y errores al abrir/cerrar
    setArchivosNuevos([])
    setErrors({})
  }, [pedido, open])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.cotizacion_id || formData.cotizacion_id.trim() === '') {
      newErrors.cotizacion_id = 'Debe seleccionar una cotización'
    }

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
      // Primero guardar el pedido (crear o actualizar)
      await onSubmit(formData)

      // Si hay archivos nuevos y estamos editando, subir documentos
      if (archivosNuevos.length > 0 && pedido) {
        setUploadingImages(true)
        try {
          for (const archivo of archivosNuevos) {
            await subirDocumentoPedido(archivo.file, pedido.ped_id_int)
          }
          onDocumentosChange?.()
        } catch (uploadError) {
          console.error('Error subiendo documentos:', uploadError)
          setErrors(prev => ({ ...prev, imagen: 'Algunos archivos no se pudieron subir' }))
        } finally {
          setUploadingImages(false)
        }
      }

      // Limpiar estados
      setArchivosNuevos([])
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

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    const nuevosArchivos: ArchivoPreview[] = []
    const erroresArchivo: string[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('application/pdf')) {
        erroresArchivo.push(`${file.name}: solo se permiten imágenes y PDFs`)
        continue
      }
      const previewUrl = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : '' // No preview for PDFs
      nuevosArchivos.push({ file, previewUrl })
    }

    if (erroresArchivo.length > 0) {
      setErrors(prev => ({ ...prev, imagen: erroresArchivo.join(', ') }))
    } else if (errors.imagen) {
      setErrors(prev => ({ ...prev, imagen: '' }))
    }

    setArchivosNuevos(prev => [...prev, ...nuevosArchivos])

    // Limpiar input
    e.target.value = ''
  }

  const removeArchivoNuevo = (index: number) => {
    setArchivosNuevos(prev => {
      const updated = [...prev]
      // Revocar URL para liberar memoria
      if (updated[index].previewUrl) {
        URL.revokeObjectURL(updated[index].previewUrl)
      }
      updated.splice(index, 1)
      return updated
    })
  }

  const removeDocumentoExistente = async (docId: string) => {
    setDeletingDocId(docId)
    try {
      await eliminarDocumentoPedido(docId)
      setDocumentosExistentes(prev => prev.filter(d => d.ped_doc_id_int !== docId))
      onDocumentosChange?.()
    } catch (error: any) {
      setErrors(prev => ({ ...prev, imagen: error.message || 'Error al eliminar documento' }))
    } finally {
      setDeletingDocId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                          <li>Se generará código de seguimiento único (ASL2025-XXXXX)</li>
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

              {/* Campo de Imágenes / Documentos */}
              <div className="col-span-2">
                <Label htmlFor="imagenes">Imágenes del Pedido</Label>
                <div className="space-y-3">
                  {/* Botón para subir archivos */}
                  <div className="flex items-center gap-2">
                    <Input
                      id="imagenes_file"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFilesChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('imagenes_file')?.click()}
                      disabled={uploadingImages || !!deletingDocId}
                      className="flex items-center gap-2"
                    >
                      <ImagePlus className="h-4 w-4" />
                      Agregar imágenes
                    </Button>
                    <span className="text-xs text-gray-500">
                      {documentosExistentes.length + archivosNuevos.length} archivo(s) adjunto(s)
                    </span>
                  </div>

                  {/* Documentos existentes (ya en BD) */}
                  {documentosExistentes.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-2">Archivos guardados:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {documentosExistentes.map((doc) => (
                          <div key={doc.ped_doc_id_int} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={doc.ped_doc_url_vac}
                              alt="Documento del pedido"
                              className="w-full h-24 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = ''
                                target.alt = 'Error al cargar'
                                target.style.display = 'none'
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => window.open(doc.ped_doc_url_vac, '_blank')}
                                className="h-7 w-7 p-0 bg-white/80 hover:bg-white/90"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => removeDocumentoExistente(doc.ped_doc_id_int)}
                                disabled={deletingDocId === doc.ped_doc_id_int}
                                className="h-7 w-7 p-0 bg-red-500/80 hover:bg-red-600/90 text-white"
                              >
                                {deletingDocId === doc.ped_doc_id_int ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Archivos nuevos pendientes de subir */}
                  {archivosNuevos.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-2">Nuevos archivos (se subirán al guardar):</p>
                      <div className="grid grid-cols-3 gap-2">
                        {archivosNuevos.map((archivo, index) => (
                          <div key={index} className="relative group border border-blue-200 rounded-lg overflow-hidden bg-blue-50">
                            {archivo.previewUrl ? (
                              <img
                                src={archivo.previewUrl}
                                alt={`Preview ${archivo.file.name}`}
                                className="w-full h-24 object-cover"
                              />
                            ) : (
                              <div className="w-full h-24 flex items-center justify-center text-xs text-gray-500">
                                {archivo.file.name}
                              </div>
                            )}
                            <div className="absolute top-1 right-1">
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() => removeArchivoNuevo(index)}
                                className="h-6 w-6 p-0 bg-red-500/80 hover:bg-red-600/90 text-white rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-blue-600/80 text-white text-[10px] px-1 py-0.5 truncate">
                              {archivo.file.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.imagen && (
                    <p className="text-sm text-red-500">{errors.imagen}</p>
                  )}

                  <p className="text-xs text-gray-500">
                    Formatos soportados: JPG, PNG, WebP. Puedes adjuntar varias imágenes.
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
              disabled={loading || uploadingImages || !!deletingDocId || (!pedido && cotizaciones.length === 0)}
            >
              {(loading || uploadingImages || !!deletingDocId) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {uploadingImages ? 'Subiendo imágenes...' : !!deletingDocId ? 'Eliminando...' : (pedido ? 'Actualizar Pedido' : 'Iniciar Pedido')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}