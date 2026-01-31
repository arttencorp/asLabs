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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Image as ImageIcon, Leaf, MapPin, FileText } from "lucide-react"
import { eliminarImagenFichaTecnica, actualizarFichaTecnica, crearOActualizarFichaTecnicaCompleta } from '@/lib/supabase'
import type { 
  FichaTecnicaForm,
  DetalleFichaTecnicaForm,
  TaxonomiaForm,
  ZonaColectaForm,
  ProductoDatabase,
  FichaTecnicaDatabase,
  FichaTecnicaCompletaDatabase
} from '@/types/database'
import { PLACEHOLDERS, ERROR_MESSAGES } from '../constants'
import { validarArchivoImagen, formatearTamanoArchivo } from '../utils'

interface FichaTecnicaCompletaFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingFichaTecnica?: FichaTecnicaCompletaDatabase | null
  onSubmit: (data: any) => Promise<void>
  loading: boolean
  error?: string | null
  productos: ProductoDatabase[]
  productosLoading: boolean
}

interface FormDataCompleta {
  ficha: FichaTecnicaForm
  detalle: DetalleFichaTecnicaForm
  taxonomia: TaxonomiaForm
  zona_colecta: ZonaColectaForm
  selectedFile?: File | null
}

export function FichaTecnicaCompletaFormDialog({
  isOpen,
  onClose,
  editingFichaTecnica,
  onSubmit,
  loading,
  error,
  productos,
  productosLoading
}: FichaTecnicaCompletaFormDialogProps) {
  const [formData, setFormData] = useState<FormDataCompleta>({
    ficha: {
      fit_tec_nom_planta_vac: '',
      fit_tec_cod_vac: '',
      pro_id_int: '',
      fit_tec_imag_vac: null
    },
    detalle: {
      dft_desc_vac: '',
      dft_parcela_vac: '',
      dft_zona_colecta_vac: '',
      dft_present_vac: ''
    },
    taxonomia: {
      ta_familia_vac: '',
      ta_genero_vac: '',
      ta_nombre_cientifico_vac: '',
      ta_grupo_vac: '',
      ta_nombre_comun_vac: ''
    },
    zona_colecta: {
      zcg_pais_vac: '',
      zcg_region_vac: '',
      zcg_provincia_vac: '',
      zcg_distrito_vac: '',
      zcg_zona_vac: '',
      zcg_fecha_vac: ''
    }
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("basic")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cargar datos del item en edición
  useEffect(() => {
    if (editingFichaTecnica) {
      setFormData({
        ficha: {
          fit_tec_nom_planta_vac: editingFichaTecnica.fit_tec_nom_planta_vac || '',
          fit_tec_cod_vac: editingFichaTecnica.fit_tec_cod_vac || '',
          pro_id_int: editingFichaTecnica.pro_id_int || '',
          fit_tec_imag_vac: editingFichaTecnica.fit_tec_imag_vac || null
        },
        detalle: {
          dft_desc_vac: editingFichaTecnica.detalle?.dft_desc_vac || '',
          dft_parcela_vac: editingFichaTecnica.detalle?.dft_parcela_vac || '',
          dft_zona_colecta_vac: editingFichaTecnica.detalle?.dft_zona_colecta_vac || '',
          dft_present_vac: editingFichaTecnica.detalle?.dft_present_vac || ''
        },
        taxonomia: {
          ta_familia_vac: editingFichaTecnica.taxonomia?.ta_familia_vac || '',
          ta_genero_vac: editingFichaTecnica.taxonomia?.ta_genero_vac || '',
          ta_nombre_cientifico_vac: editingFichaTecnica.taxonomia?.ta_nombre_cientifico_vac || '',
          ta_grupo_vac: editingFichaTecnica.taxonomia?.ta_grupo_vac || '',
          ta_nombre_comun_vac: editingFichaTecnica.taxonomia?.ta_nombre_comun_vac || ''
        },
        zona_colecta: {
          zcg_pais_vac: editingFichaTecnica.zona_colecta?.zcg_pais_vac || '',
          zcg_region_vac: editingFichaTecnica.zona_colecta?.zcg_region_vac || '',
          zcg_provincia_vac: editingFichaTecnica.zona_colecta?.zcg_provincia_vac || '',
          zcg_distrito_vac: editingFichaTecnica.zona_colecta?.zcg_distrito_vac || '',
          zcg_zona_vac: editingFichaTecnica.zona_colecta?.zcg_zona_vac || '',
          zcg_fecha_vac: editingFichaTecnica.zona_colecta?.zcg_fecha_vac || ''
        }
      })
      if (editingFichaTecnica.fit_tec_imag_vac) {
        setPreviewUrl(editingFichaTecnica.fit_tec_imag_vac)
      }
    } else {
      setFormData({
        ficha: {
          fit_tec_nom_planta_vac: '',
          fit_tec_cod_vac: '',
          pro_id_int: '',
          fit_tec_imag_vac: null
        },
        detalle: {
          dft_desc_vac: '',
          dft_parcela_vac: '',
          dft_zona_colecta_vac: '',
          dft_present_vac: ''
        },
        taxonomia: {
          ta_familia_vac: '',
          ta_genero_vac: '',
          ta_nombre_cientifico_vac: '',
          ta_grupo_vac: '',
          ta_nombre_comun_vac: ''
        },
        zona_colecta: {
          zcg_pais_vac: '',
          zcg_region_vac: '',
          zcg_provincia_vac: '',
          zcg_distrito_vac: '',
          zcg_zona_vac: '',
          zcg_fecha_vac: ''
        }
      })
      setPreviewUrl(null)
    }
    setSelectedFile(null)
    setFileError(null)
    setActiveTab("basic")
  }, [editingFichaTecnica, isOpen])

  const handleInputChange = (
    section: keyof FormDataCompleta, 
    field: string, 
    value: string
  ) => {
    if (section === 'selectedFile') return

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value || null // Convertir strings vacíos a null para campos opcionales
      }
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
          console.warn('⚠️ Error al eliminar imagen del storage:', result.error)
        }
      }
      
      // Limpiar estado local
      setSelectedFile(null)
      setPreviewUrl(null)
      setFormData(prev => ({ 
        ...prev, 
        ficha: { ...prev.ficha, fit_tec_imag_vac: null }
      }))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('💥 Error eliminando imagen:', error)
      // Aún así limpiar el estado local
      setSelectedFile(null)
      setPreviewUrl(null)
      setFormData(prev => ({ 
        ...prev, 
        ficha: { ...prev.ficha, fit_tec_imag_vac: null }
      }))
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Preparar datos para envío
    const dataToSubmit = {
      ...formData,
      selectedFile
    }

    onSubmit(dataToSubmit)
  }

  // Función para verificar si un valor es "no vacío" de forma robusta
  const isNonEmptyValue = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '';
    if (typeof value === 'number') return !isNaN(value);
    if (typeof value === 'boolean') return value === true;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return false;
  }

  // Función para verificar si una sección tiene datos
  const hasDataInSection = (section: 'detalle' | 'taxonomia' | 'zona_colecta'): boolean => {
    const sectionData = formData[section]
    return Object.values(sectionData).some(isNonEmptyValue)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingFichaTecnica ? 'Editar Ficha Técnica Completa' : 'Nueva Ficha Técnica Completa'}
          </DialogTitle>
          <DialogDescription>
            {editingFichaTecnica 
              ? 'Modifica los datos de la ficha técnica y su información adicional.' 
              : 'Crea una nueva ficha técnica con información detallada.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error general */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Básica
              </TabsTrigger>
              <TabsTrigger value="taxonomia" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Taxonomía
                {hasDataInSection('taxonomia') && <div className="w-2 h-2 bg-green-600 rounded-full" />}
              </TabsTrigger>
              <TabsTrigger value="detalle" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Detalle
                {hasDataInSection('detalle') && <div className="w-2 h-2 bg-purple-600 rounded-full" />}
              </TabsTrigger>
              <TabsTrigger value="zona_colecta" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Zona Colecta
                {hasDataInSection('zona_colecta') && <div className="w-2 h-2 bg-orange-600 rounded-full" />}
              </TabsTrigger>
            </TabsList>

            {/* Pestaña Básica */}
            <TabsContent value="basic" className="space-y-4">
              {/* Nombre de la planta */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Planta *</Label>
                <Input
                  id="nombre"
                  value={formData.ficha.fit_tec_nom_planta_vac}
                  onChange={(e) => handleInputChange('ficha', 'fit_tec_nom_planta_vac', e.target.value)}
                  placeholder={PLACEHOLDERS.PLANT_NAME}
                  required
                />
              </div>

              {/* Código técnico */}
              <div className="space-y-2">
                <Label htmlFor="codigo">Código Técnico</Label>
                <Input
                  id="codigo"
                  value={formData.ficha.fit_tec_cod_vac || ''}
                  onChange={(e) => handleInputChange('ficha', 'fit_tec_cod_vac', e.target.value)}
                  placeholder={PLACEHOLDERS.TECHNICAL_CODE}
                />
              </div>

              {/* Producto */}
              <div className="space-y-2">
                <Label htmlFor="producto">Producto *</Label>
                <Select
                  value={formData.ficha.pro_id_int}
                  onValueChange={(value) => handleInputChange('ficha', 'pro_id_int', value)}
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
                            JPG, PNG o WebP
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
              </div>
            </TabsContent>

            {/* Pestaña Taxonomía */}
            <TabsContent value="taxonomia" className="space-y-4">
              <div className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200 mb-4">
                <p><strong className="text-green-800">Nota:</strong> Todos los campos de taxonomía son opcionales. Completa solo los que tengas disponibles.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="familia">Familia</Label>
                  <Input
                    id="familia"
                    value={formData.taxonomia.ta_familia_vac || ''}
                    onChange={(e) => handleInputChange('taxonomia', 'ta_familia_vac', e.target.value)}
                    placeholder="Ej: Solanaceae"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genero">Género</Label>
                  <Input
                    id="genero"
                    value={formData.taxonomia.ta_genero_vac || ''}
                    onChange={(e) => handleInputChange('taxonomia', 'ta_genero_vac', e.target.value)}
                    placeholder="Ej: Solanum"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre_cientifico">Nombre Científico</Label>
                <Input
                  id="nombre_cientifico"
                  value={formData.taxonomia.ta_nombre_cientifico_vac || ''}
                  onChange={(e) => handleInputChange('taxonomia', 'ta_nombre_cientifico_vac', e.target.value)}
                  placeholder="Ej: Solanum tuberosum"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grupo">Grupo</Label>
                <Input
                  id="grupo"
                  value={formData.taxonomia.ta_grupo_vac || ''}
                  onChange={(e) => handleInputChange('taxonomia', 'ta_grupo_vac', e.target.value)}
                  placeholder="Ej: Dicotiledóneas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombre_comun">Nombre Común</Label>
                <Input
                  id="nombre_comun"
                  value={formData.taxonomia.ta_nombre_comun_vac || ''}
                  onChange={(e) => handleInputChange('taxonomia', 'ta_nombre_comun_vac', e.target.value)}
                  placeholder="Ej: Papa, Patata"
                />
              </div>
            </TabsContent>

            {/* Pestaña Detalle */}
            <TabsContent value="detalle" className="space-y-4">
              <div className="text-sm text-gray-700 bg-purple-50 p-3 rounded-lg border border-purple-200 mb-4">
                <p><strong className="text-purple-800">Nota:</strong> Todos los campos de detalle son opcionales.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={formData.detalle.dft_desc_vac || ''}
                  onChange={(e) => handleInputChange('detalle', 'dft_desc_vac', e.target.value)}
                  placeholder="Descripción de la variedad o características"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parcela">Parcela</Label>
                <Input
                  id="parcela"
                  value={formData.detalle.dft_parcela_vac || ''}
                  onChange={(e) => handleInputChange('detalle', 'dft_parcela_vac', e.target.value)}
                  placeholder="Ej: Parcela A-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zona_colecta_detalle">Zona de Colecta</Label>
                <Input
                  id="zona_colecta_detalle"
                  value={formData.detalle.dft_zona_colecta_vac || ''}
                  onChange={(e) => handleInputChange('detalle', 'dft_zona_colecta_vac', e.target.value)}
                  placeholder="Zona específica de colecta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentacion">Presentación</Label>
                <Input
                  id="presentacion"
                  value={formData.detalle.dft_present_vac || ''}
                  onChange={(e) => handleInputChange('detalle', 'dft_present_vac', e.target.value)}
                  placeholder="Ej: Semillas, Esquejes, Plántulas"
                />
              </div>
            </TabsContent>

            {/* Pestaña Zona de Colecta */}
            <TabsContent value="zona_colecta" className="space-y-4">
              <div className="text-sm text-gray-700 bg-orange-50 p-3 rounded-lg border border-orange-200 mb-4">
                <p><strong className="text-orange-800">Nota:</strong> Todos los campos de zona de colecta son opcionales.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Input
                    id="pais"
                    value={formData.zona_colecta.zcg_pais_vac || ''}
                    onChange={(e) => handleInputChange('zona_colecta', 'zcg_pais_vac', e.target.value)}
                    placeholder="Ej: Perú"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Región</Label>
                  <Input
                    id="region"
                    value={formData.zona_colecta.zcg_region_vac || ''}
                    onChange={(e) => handleInputChange('zona_colecta', 'zcg_region_vac', e.target.value)}
                    placeholder="Ej: Cusco"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provincia">Provincia</Label>
                  <Input
                    id="provincia"
                    value={formData.zona_colecta.zcg_provincia_vac || ''}
                    onChange={(e) => handleInputChange('zona_colecta', 'zcg_provincia_vac', e.target.value)}
                    placeholder="Ej: Calca"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distrito">Distrito</Label>
                  <Input
                    id="distrito"
                    value={formData.zona_colecta.zcg_distrito_vac || ''}
                    onChange={(e) => handleInputChange('zona_colecta', 'zcg_distrito_vac', e.target.value)}
                    placeholder="Ej: Pisaq"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zona">Zona</Label>
                <Input
                  id="zona"
                  value={formData.zona_colecta.zcg_zona_vac || ''}
                  onChange={(e) => handleInputChange('zona_colecta', 'zcg_zona_vac', e.target.value)}
                  placeholder="Ej: Valle Sagrado"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Colecta</Label>
                <Input
                  id="fecha"
                  type="text"
                  placeholder="Ej: Marzo 2024"
                  value={formData.zona_colecta.zcg_fecha_vac || ''}
                  onChange={(e) => handleInputChange('zona_colecta', 'zcg_fecha_vac', e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

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
            Esta acción eliminará permanentemente la imagen de la ficha técnica completa.
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