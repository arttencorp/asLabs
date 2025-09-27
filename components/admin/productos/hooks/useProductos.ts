import { useState, useEffect, useCallback } from 'react'
import { obtenerProductos, crearProducto, actualizarProducto } from '@/lib/supabase'
import type { ProductoDatabase } from '@/types/database'
import type { ProductoForm } from '../types'
import { validarProducto } from '../utils'

export function useProductos() {
  const [items, setItems] = useState<ProductoDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<ProductoDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await obtenerProductos()
      setItems(data) 
    } catch (error: any) {
      setError(error.message || 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const handleCreateWithForm = useCallback(async (formData: ProductoForm) => {
    const errors = validarProducto(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const newItem = await crearProducto(formData)
      setItems(prevItems => [newItem, ...prevItems])
      setIsDialogOpen(false)
      showSuccess('Producto creado exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al crear producto')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const handleUpdateWithForm = useCallback(async (formData: ProductoForm) => {
    if (!editingItem) return

    const errors = validarProducto(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const updatedItem = await actualizarProducto(editingItem.pro_id_int, formData)
      setItems(prevItems => prevItems.map(item => 
        item.pro_id_int === editingItem.pro_id_int ? updatedItem : item
      ))
      setIsDialogOpen(false)
      setEditingItem(null)
      showSuccess('Producto actualizado exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al actualizar producto')
    } finally {
      setLoading(false)
    }
  }, [editingItem, showSuccess])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    // Estado
    items,
    loading,
    error,
    success,
    editingItem,
    isDialogOpen,
    
    // Setters
    setError,
    setIsDialogOpen,
    setEditingItem,
    
    // Acciones
    loadData,
    handleCreateWithForm,
    handleUpdateWithForm,
    showSuccess
  }
}
