import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerFirmas, 
  crearFirma, 
  actualizarFirma, 
  eliminarFirma,
  subirImagenFirma,
  eliminarImagenFirma
} from '@/lib/supabase'
import { useBaseCrud } from '@/hooks/useBaseCrud'
import { FIRMA_FORM_INITIAL } from '../constants'
import { validateFirmaForm, firmaHasImage } from '../utils'
import type { FirmaForm, FirmasStats, FirmaDatabase } from '../types'

export function useFirmas() {
  const [mounted, setMounted] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  // Usar useBaseCrud para la funcionalidad CRUD básica
  const baseCrud = useBaseCrud<FirmaDatabase, FirmaForm>({
    fetchFn: obtenerFirmas,
    createFn: crearFirma,
    updateFn: async (id: string, data: Partial<FirmaForm>) => {
      return await actualizarFirma(id, data as FirmaForm)
    },
    deleteFn: eliminarFirma,
    initialForm: FIRMA_FORM_INITIAL,
    validateFn: validateFirmaForm,
    getIdFn: (firma) => firma.firm_id_int
  })

  // Estados y funciones desde useBaseCrud
  const {
    items: firmas,
    loading,
    error,
    success,
    form: firmaForm,
    editingItem: editingFirma,
    isDialogOpen,
    setForm: setFirmaForm,
    setError,
    setIsDialogOpen,
    setEditingItem: setEditingFirma,
    loadData,
    handleCreate: handleCreateFirma,
    handleUpdate: handleUpdateFirma,
    handleDelete: handleDeleteFirma,
    showSuccess
  } = baseCrud

  useEffect(() => {
    setMounted(true)
  }, [])

  // Función para subir imagen
  const handleUploadImage = useCallback(async (archivo: File, nombreArchivo: string): Promise<string | null> => {
    setUploadLoading(true)
    setError(null)
    try {
      const result = await subirImagenFirma(archivo, nombreArchivo)
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
  }, [showSuccess, setError])

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
  }, [setError])

  // Funciones específicas de firmas
  const resetForm = useCallback(() => {
    setFirmaForm(FIRMA_FORM_INITIAL)
    setEditingFirma(null)
  }, [setFirmaForm, setEditingFirma])

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
