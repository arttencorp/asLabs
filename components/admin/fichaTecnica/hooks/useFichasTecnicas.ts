import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerFichasTecnicas, 
  crearFichaTecnica, 
  actualizarFichaTecnica, 
  eliminarFichaTecnica,
  subirImagenFichaTecnica,
  eliminarImagenFichaTecnica,
  obtenerProductos
} from '@/lib/supabase'
import type { FichaTecnicaDatabase, ProductoDatabase } from '@/types/database'
import type { FichaTecnicaForm } from '../types'
import { validarFichaTecnica } from '../utils'

export function useFichasTecnicas() {
  const [items, setItems] = useState<FichaTecnicaDatabase[]>([])
  const [productos, setProductos] = useState<ProductoDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [productosLoading, setProductosLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<FichaTecnicaDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await obtenerFichasTecnicas()
      setItems(data)
      showSuccess(`Cargadas ${data.length} fichas técnicas`)
    } catch (error: any) {
      setError(error.message || 'Error al cargar fichas técnicas')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const loadProductos = useCallback(async () => {
    setProductosLoading(true)
    try {
      const data = await obtenerProductos()
      setProductos(data)
    } catch (error: any) {
      console.error('Error cargando productos:', error)
    } finally {
      setProductosLoading(false)
    }
  }, [])

  const handleCreateWithForm = useCallback(async (formData: FichaTecnicaForm) => {
    const errors = validarFichaTecnica(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const newItem = await crearFichaTecnica(formData)
      setItems(prevItems => [newItem, ...prevItems])
      setIsDialogOpen(false)
      showSuccess('Ficha técnica creada exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al crear ficha técnica')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const handleUpdateWithForm = useCallback(async (formData: FichaTecnicaForm) => {
    if (!editingItem) return

    const errors = validarFichaTecnica(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const updatedItem = await actualizarFichaTecnica(editingItem.fit_tec_id_int, formData)
      setItems(prevItems => prevItems.map(item => 
        item.fit_tec_id_int === editingItem.fit_tec_id_int ? updatedItem : item
      ))
      setIsDialogOpen(false)
      setEditingItem(null)
      showSuccess('Ficha técnica actualizada exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al actualizar ficha técnica')
    } finally {
      setLoading(false)
    }
  }, [editingItem, showSuccess])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta ficha técnica?')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      // Buscar la ficha técnica para obtener la URL de la imagen
      const fichaTecnica = items.find(item => item.fit_tec_id_int === id)
      
      // Si tiene imagen, eliminarla del storage
      if (fichaTecnica?.fit_tec_imag_vac) {
        await eliminarImagenFichaTecnica(fichaTecnica.fit_tec_imag_vac)
      }

      // Eliminar la ficha técnica de la base de datos
      await eliminarFichaTecnica(id)
      setItems(prevItems => prevItems.filter(item => item.fit_tec_id_int !== id))
      showSuccess('Ficha técnica eliminada exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al eliminar ficha técnica')
    } finally {
      setLoading(false)
    }
  }, [items, showSuccess])

  const handleUploadImage = useCallback(async (file: File, fileName: string) => {
    setUploadLoading(true)
    setError(null)
    try {
      const result = await subirImagenFichaTecnica(file, fileName)
      if (result.error) {
        setError(result.error)
        return null
      }
      return result.url
    } catch (error: any) {
      setError(error.message || 'Error al subir imagen')
      return null
    } finally {
      setUploadLoading(false)
    }
  }, [])

  const handleDeleteImage = useCallback(async (imageUrl: string) => {
    try {
      const result = await eliminarImagenFichaTecnica(imageUrl)
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

  // Función para abrir el diálogo de creación
  const openCreateDialog = useCallback(() => {
    setEditingItem(null)
    setIsDialogOpen(true)
    setError(null)
  }, [])

  // Función para abrir el diálogo de edición
  const openEditDialog = useCallback((item: FichaTecnicaDatabase) => {
    setEditingItem(item)
    setIsDialogOpen(true)
    setError(null)
  }, [])

  // Función para cerrar el diálogo
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setEditingItem(null)
    setError(null)
  }, [])

  useEffect(() => {
    loadData()
    loadProductos()
  }, [loadData, loadProductos])

  // Estadísticas
  const stats = {
    totalFichas: items.length,
    fichasConImagen: items.filter(item => item.fit_tec_imag_vac).length,
    fichasSinImagen: items.filter(item => !item.fit_tec_imag_vac).length,
    ultimaActualizacion: items.length > 0 ? 
      new Date(Math.max(...items.map(item => new Date(item.fit_tec_updated_at_dt).getTime()))).toISOString() :
      ''
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
    handleCreateWithForm,
    handleUpdateWithForm,
    handleDelete,
    handleUploadImage,
    handleDeleteImage,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    showSuccess
  }
}