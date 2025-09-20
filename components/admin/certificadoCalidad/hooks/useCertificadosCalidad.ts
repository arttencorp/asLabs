"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerCertificadosCalidad,
  crearCertificadoCalidad,
  actualizarCertificadoCalidad,
  eliminarCertificadoCalidad,
  subirImagenCertificado,
  eliminarImagenCertificado,
  obtenerProductos
} from '@/lib/supabase'
import type { 
  CertificadoCalidadDatabase, 
  ProductoDatabase
} from '@/types/database'
import type { 
  CertificadoCalidadForm,
  CertificadosCalidadStats
} from '../types/index'

export function useCertificadosCalidad() {
  const [items, setItems] = useState<CertificadoCalidadDatabase[]>([])
  const [productos, setProductos] = useState<ProductoDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [productosLoading, setProductosLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<CertificadoCalidadDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await obtenerCertificadosCalidad()
      setItems(data)
      showSuccess(`Cargados ${data.length} certificados de calidad`)
    } catch (err: any) {
      setError(err.message || 'Error al cargar certificados de calidad')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const loadProductos = useCallback(async () => {
    setProductosLoading(true)
    try {
      const data = await obtenerProductos()
      setProductos(data)
    } catch (err: any) {
      console.error('Error cargando productos:', err)
    } finally {
      setProductosLoading(false)
    }
  }, [])

  const handleUploadImage = useCallback(async (archivo: File, nombreArchivo: string): Promise<string | null> => {
    setUploadLoading(true)
    setError(null)
    try {
      const result = await subirImagenCertificado(archivo, nombreArchivo)
      if (result.success && result.url) {
        showSuccess('Imagen subida exitosamente')
        return result.url
      } else {
        setError(result.error || 'Error al subir imagen')
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Error al subir imagen')
      return null
    } finally {
      setUploadLoading(false)
    }
  }, [showSuccess])

  const handleDeleteImage = useCallback(async (imageUrl: string) => {
    try {
      const result = await eliminarImagenCertificado(imageUrl)
      if (result.error) {
        setError(result.error)
        return false
      }
      return true
    } catch (error: any) {
      setError(error.message || 'Error al eliminar imagen')
      return false
    }
  }, [])

  // Función para actualizar el item en edición (útil cuando se modifica desde el formulario)
  const updateEditingItem = useCallback((updates: Partial<CertificadoCalidadDatabase>) => {
    if (editingItem) {
      const updatedItem = { ...editingItem, ...updates }
      setEditingItem(updatedItem)
      // También actualizar en la lista si está presente
      setItems(prevItems => 
        prevItems.map(item => 
          item.cer_cal_id_int === editingItem.cer_cal_id_int ? updatedItem : item
        )
      )
    }
  }, [editingItem])

  const handleCreateWithForm = useCallback(async (formData: CertificadoCalidadForm) => {
    setLoading(true)
    setError(null)
    try {
      let imagenUrl: string | null = null
      
      // Subir imagen si se seleccionó una
      if (formData.imagen) {
        const nombreArchivo = `certificado-${Date.now()}-${formData.imagen.name}`
        const resultadoUpload = await handleUploadImage(formData.imagen, nombreArchivo)
        if (!resultadoUpload) {
          throw new Error('Error al subir la imagen')
        }
        imagenUrl = resultadoUpload
      }

      const dataToCreate = {
        cer_cal_cod_muestra_int: formData.codMuestra ? parseInt(formData.codMuestra) : null,
        cer_cal_tipo_vac: formData.tipo || null,
        cer_cal_infor_ensayo_vac: formData.informacionEnsayo || null,
        cer_cal_result_vac: formData.resultados || null,
        cer_cal_resum_vac: formData.observaciones || null,
        cer_cal_imag_url: imagenUrl,
        pro_id_int: (formData.proId && formData.proId !== 'sin-producto') ? formData.proId : (productos[0]?.pro_id_int || '1')
      }
      const nuevoCertificado = await crearCertificadoCalidad(dataToCreate)
      setItems(prevItems => [nuevoCertificado, ...prevItems])
      setIsDialogOpen(false)
      showSuccess('Certificado de calidad creado exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al crear certificado de calidad')
    } finally {
      setLoading(false)
    }
  }, [showSuccess, handleUploadImage])

  const handleUpdateWithForm = useCallback(async (formData: CertificadoCalidadForm) => {
    if (!editingItem) return

    setLoading(true)
    setError(null)
    try {
      let imagenUrl: string | null = editingItem.cer_cal_imag_url
      
      // Subir nueva imagen si se seleccionó una
      if (formData.imagen) {
        const nombreArchivo = `certificado-${Date.now()}-${formData.imagen.name}`
        const nuevaImagenUrl = await handleUploadImage(formData.imagen, nombreArchivo)
        if (nuevaImagenUrl) {
          imagenUrl = nuevaImagenUrl
        }
      }

      const dataToUpdate = {
        cer_cal_cod_muestra_int: formData.codMuestra ? parseInt(formData.codMuestra) : null,
        cer_cal_tipo_vac: formData.tipo || null,
        cer_cal_infor_ensayo_vac: formData.informacionEnsayo || null,
        cer_cal_result_vac: formData.resultados || null,
        cer_cal_resum_vac: formData.observaciones || null,
        cer_cal_imag_url: imagenUrl,
        pro_id_int: (formData.proId && formData.proId !== 'sin-producto') ? formData.proId : (editingItem.pro_id_int || productos[0]?.pro_id_int || '1')
      }
      const certificadoActualizado = await actualizarCertificadoCalidad(editingItem.cer_cal_id_int, dataToUpdate)
      setItems(prevItems => 
        prevItems.map(item => 
          item.cer_cal_id_int === editingItem.cer_cal_id_int ? certificadoActualizado : item
        )
      )
      setIsDialogOpen(false)
      setEditingItem(null)
      showSuccess('Certificado de calidad actualizado exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al actualizar certificado de calidad')
    } finally {
      setLoading(false)
    }
  }, [editingItem, showSuccess, handleUploadImage])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este certificado de calidad?')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      await eliminarCertificadoCalidad(id)
      setItems(prevItems => prevItems.filter(item => item.cer_cal_id_int !== id))
      showSuccess('Certificado de calidad eliminado exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al eliminar certificado de calidad')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  // Función para abrir el diálogo de creación
  const openCreateDialog = useCallback(() => {
    setEditingItem(null)
    setIsDialogOpen(true)
    setError(null)
  }, [])

  // Función para abrir el diálogo de edición
  const openEditDialog = useCallback((item: CertificadoCalidadDatabase) => {
    setEditingItem(item)
    setIsDialogOpen(true)
    setError(null)
  }, [])

  // Función para cerrar el diálogo
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setEditingItem(null)
    setError(null)
    // Recargar datos para asegurar sincronización (igual que fichas técnicas)
    loadData()
  }, [loadData])

  // Función unificada para manejar submit del formulario
  const handleSubmit = useCallback(async (formData: CertificadoCalidadForm) => {
    if (editingItem) {
      await handleUpdateWithForm(formData)
    } else {
      await handleCreateWithForm(formData)
    }
  }, [editingItem, handleCreateWithForm, handleUpdateWithForm])

  useEffect(() => {
    loadData()
    loadProductos()
  }, [loadData, loadProductos])

  // Estadísticas
  const stats: CertificadosCalidadStats = {
    total: items.length,
    conImagen: items.filter(item => item.cer_cal_imag_url).length,
    sinImagen: items.filter(item => !item.cer_cal_imag_url).length,
    ultimaActualizacion: items.length > 0 ? 
      new Date(Math.max(...items.map(item => new Date(item.cer_cal_updated_at_dt || item.cer_cal_created_at_dt).getTime()))).toISOString() :
      undefined
  }

  return {
    // Estado
    items,
    productos,
    loading,
    productosLoading,
    uploadLoading,
    error,
    success,
    editingItem,
    isDialogOpen,
    stats,
    
    // Setters
    setError,
    setIsDialogOpen,
    setEditingItem,
    
    // Acciones
    loadData,
    loadProductos,
    handleSubmit,
    handleCreateWithForm,
    handleUpdateWithForm,
    handleDelete,
    handleUploadImage,
    handleDeleteImage,
    updateEditingItem,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    showSuccess
  }
}