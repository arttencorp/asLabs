import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerFirmas, 
  crearFirma, 
  actualizarFirma, 
  eliminarFirma,
  subirImagenFirma,
  eliminarImagenFirma
} from '@/lib/supabase'
import { FIRMA_FORM_INITIAL } from '../constants'
import { validateFirmaForm, firmaHasImage } from '../utils'
import type { FirmaForm, FirmasStats, FirmaDatabase } from '../types'

export function useFirmas() {
  const [mounted, setMounted] = useState(false)
  const [firmas, setFirmas] = useState<FirmaDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [firmaForm, setFirmaForm] = useState<FirmaForm>(FIRMA_FORM_INITIAL)
  const [editingFirma, setEditingFirma] = useState<FirmaDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  // Cargar datos
  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await obtenerFirmas()
      setFirmas(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar firmas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [loadData])

  // Función para subir imagen
  const handleUploadImage = useCallback(async (archivo: File, nombreArchivo: string): Promise<string | null> => {
    setUploadLoading(true)
    setError(null)
    try {
      const result = await subirImagenFirma(archivo, nombreArchivo)
      if (result.success && result.url) {
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
  }, [])

  // Función para eliminar imagen
  const handleDeleteImage = useCallback(async (imageUrl: string) => {
    try {
      const result = await eliminarImagenFirma(imageUrl)
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

  // Funciones específicas de firmas - definir resetForm antes de usarlo
  const resetForm = useCallback(() => {
    setFirmaForm(FIRMA_FORM_INITIAL)
    setEditingFirma(null)
  }, [])

  // Crear firma con manejo de imagen
  const handleCreateFirma = useCallback(async () => {
    // Validar formulario
    const validationErrors = validateFirmaForm(firmaForm)
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      let imagenUrl: string | null = firmaForm.firm_url_blob

      // Subir imagen si se seleccionó una
      if (firmaForm.imagen) {
        const nombreArchivo = `firma-${Date.now()}-${firmaForm.imagen.name}`
        const resultadoUpload = await handleUploadImage(firmaForm.imagen, nombreArchivo)
        if (!resultadoUpload) {
          throw new Error('Error al subir la imagen')
        }
        imagenUrl = resultadoUpload
      }

      const dataToCreate = {
        firm_nomb_vac: firmaForm.firm_nomb_vac,
        firm_cargo_vac: firmaForm.firm_cargo_vac,
        firm_url_blob: imagenUrl
      }

      const nuevaFirma = await crearFirma(dataToCreate)
      setFirmas(prevItems => [nuevaFirma, ...prevItems])
      setIsDialogOpen(false)
      resetForm()
      showSuccess('Firma creada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al crear firma')
    } finally {
      setLoading(false)
    }
  }, [firmaForm, handleUploadImage, showSuccess])

  // Actualizar firma con manejo de imagen (elimina anterior si hay nueva)
  const handleUpdateFirma = useCallback(async () => {
    if (!editingFirma) return

    // Validar formulario
    const validationErrors = validateFirmaForm(firmaForm)
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      let imagenUrl: string | null = firmaForm.firm_url_blob

      // Si se seleccionó una nueva imagen
      if (firmaForm.imagen) {
        // Eliminar imagen anterior si existe
        if (editingFirma.firm_url_blob) {
          await handleDeleteImage(editingFirma.firm_url_blob)
        }

        // Subir nueva imagen
        const nombreArchivo = `firma-${Date.now()}-${firmaForm.imagen.name}`
        const nuevaImagenUrl = await handleUploadImage(firmaForm.imagen, nombreArchivo)
        if (nuevaImagenUrl) {
          imagenUrl = nuevaImagenUrl
        }
      }

      // Si se quitó la imagen manualmente (firm_url_blob es null pero antes había imagen)
      if (firmaForm.firm_url_blob === null && editingFirma.firm_url_blob && !firmaForm.imagen) {
        await handleDeleteImage(editingFirma.firm_url_blob)
        imagenUrl = null
      }

      const dataToUpdate = {
        firm_nomb_vac: firmaForm.firm_nomb_vac,
        firm_cargo_vac: firmaForm.firm_cargo_vac,
        firm_url_blob: imagenUrl
      }

      const firmaActualizada = await actualizarFirma(editingFirma.firm_id_int, dataToUpdate)
      setFirmas(prevItems =>
        prevItems.map(item =>
          item.firm_id_int === editingFirma.firm_id_int ? firmaActualizada : item
        )
      )
      setIsDialogOpen(false)
      setEditingFirma(null)
      resetForm()
      showSuccess('Firma actualizada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al actualizar firma')
    } finally {
      setLoading(false)
    }
  }, [editingFirma, firmaForm, handleUploadImage, handleDeleteImage, showSuccess])

  // Eliminar firma (la función de supabase ya maneja la eliminación de imagen)
  const handleDeleteFirma = useCallback(async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta firma?')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      await eliminarFirma(id)
      setFirmas(prevItems => prevItems.filter(item => item.firm_id_int !== id))
      showSuccess('Firma eliminada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al eliminar firma')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const openEditDialog = useCallback((firma: FirmaDatabase) => {
    setEditingFirma(firma)
    setFirmaForm({
      firm_nomb_vac: firma.firm_nomb_vac,
      firm_cargo_vac: firma.firm_cargo_vac,
      firm_url_blob: firma.firm_url_blob
    })
    setIsDialogOpen(true)
  }, [setEditingFirma, setFirmaForm, setIsDialogOpen])

  const openCreateDialog = useCallback(() => {
    resetForm()
    setIsDialogOpen(true)
  }, [resetForm, setIsDialogOpen])

  // Calcular estadísticas
  const stats: FirmasStats = {
    totalFirmas: firmas.length,
    firmasConImagen: firmas.filter(f => firmaHasImage(f)).length,
    firmasSinImagen: firmas.filter(f => !firmaHasImage(f)).length,
    nuevasEsteMes: firmas.filter(f => {
      const fechaActual = new Date()
      const inicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
      return new Date(f.firm_created_dt) >= inicioMes
    }).length
  }

  return {
    // Estados
    firmas,
    loading,
    mounted,
    error,
    success,
    firmaForm,
    editingFirma,
    isDialogOpen,
    stats,
    uploadLoading,

    // Acciones
    setFirmaForm,
    setError,
    setIsDialogOpen,
    loadData,
    handleCreateFirma,
    handleUpdateFirma,
    handleDeleteFirma,
    openEditDialog,
    openCreateDialog,
    resetForm,
    handleUploadImage,
    handleDeleteImage
  }
}
