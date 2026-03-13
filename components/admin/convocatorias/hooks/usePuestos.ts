import { useState, useEffect, useCallback } from 'react'
import { obtenerPuestos, crearPuesto, actualizarPuesto, eliminarPuesto, obtenerNombresEstadoPuesto, obtenerNombresModalidadTrabajo } from '@/lib/supabase'
import { transformarError } from '@/utils'
import type { PuestoDatabase } from '@/types/database'
import type { PuestoForm } from '../types'
import { validarPuesto } from '../utils'

export function usePuestos() {
  const [items, setItems] = useState<PuestoDatabase[]>([])
  const [estadoPuestoOptions, setEstadoPuestoOptions] = useState<string[]>([])
  const [modalidadOptions, setModalidadOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<PuestoDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [data, estadoNombres, modalidadNombres] = await Promise.all([
        obtenerPuestos(),
        obtenerNombresEstadoPuesto(),
        obtenerNombresModalidadTrabajo(),
      ])
      setItems(data)
      if (estadoNombres.length > 0) setEstadoPuestoOptions(estadoNombres)
      if (modalidadNombres.length > 0) setModalidadOptions(modalidadNombres)
    } catch (err) {
      setError(transformarError(err, 'Error al cargar puestos'))
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCreateWithForm = useCallback(async (formData: PuestoForm) => {
    const errors = validarPuesto(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const newItem = await crearPuesto(formData)
      setItems(prevItems => [newItem, ...prevItems])
      setIsDialogOpen(false)
      showSuccess('Puesto creado exitosamente')
    } catch (err) {
      setError(transformarError(err, 'Error al crear puesto'))
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const handleUpdateWithForm = useCallback(async (formData: PuestoForm) => {
    if (!editingItem) return

    const errors = validarPuesto(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      const updatedItem = await actualizarPuesto(editingItem.puest_id_int, formData)
      setItems(prevItems => prevItems.map(item =>
        item.puest_id_int === editingItem.puest_id_int ? updatedItem : item
      ))
      setIsDialogOpen(false)
      setEditingItem(null)
      showSuccess('Puesto actualizado exitosamente')
    } catch (err) {
      setError(transformarError(err, 'Error al actualizar puesto'))
    } finally {
      setLoading(false)
    }
  }, [editingItem, showSuccess])

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await eliminarPuesto(id)
      setItems(prevItems => prevItems.filter(item => item.puest_id_int !== id))
      showSuccess('Puesto eliminado exitosamente')
    } catch (err) {
      setError(transformarError(err, 'Error al eliminar puesto'))
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const handleToggleEstado = useCallback(async (puesto: PuestoDatabase) => {
    // El estado se cambia desde el formulario de edición
    setEditingItem(puesto)
    setIsDialogOpen(true)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    items,
    estadoPuestoOptions,
    modalidadOptions,
    loading,
    error,
    success,
    editingItem,
    isDialogOpen,
    setError,
    setIsDialogOpen,
    setEditingItem,
    loadData,
    handleCreateWithForm,
    handleUpdateWithForm,
    handleDelete,
    handleToggleEstado,
  }
}
