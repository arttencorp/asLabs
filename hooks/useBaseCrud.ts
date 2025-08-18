import { useState, useEffect, useCallback } from 'react'

interface UseBaseCrudOptions<T, FormT> {
  fetchFn: () => Promise<T[]>
  createFn: (data: FormT) => Promise<T>
  updateFn: (id: string, data: Partial<FormT>) => Promise<T>
  deleteFn: (id: string) => Promise<void>
  initialForm: FormT
  validateFn?: (data: FormT) => string[]
  getIdFn?: (item: T) => string
}

export function useBaseCrud<T, FormT>({
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  initialForm,
  validateFn,
  getIdFn = (item: any) => item.id
}: UseBaseCrudOptions<T, FormT>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [form, setForm] = useState<FormT>(initialForm)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFn()
      setItems(data)
      showSuccess(`Cargados ${data.length} elementos`)
    } catch (error: any) {
      setError(error.message || 'Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }, [fetchFn, showSuccess])

  const handleCreate = async () => {
    if (validateFn) {
      const errors = validateFn(form)
      if (errors.length > 0) {
        setError(errors.join(', '))
        return
      }
    }

    setLoading(true)
    setError(null)
    try {
      const newItem = await createFn(form)
      setItems([newItem, ...items])
      setForm(initialForm)
      setIsDialogOpen(false)
      showSuccess('Elemento creado exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al crear elemento')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingItem) return

    if (validateFn) {
      const errors = validateFn(form)
      if (errors.length > 0) {
        setError(errors.join(', '))
        return
      }
    }

    setLoading(true)
    setError(null)
    try {
      const updatedItem = await updateFn(getIdFn(editingItem), form)
      setItems(items.map(item => 
        getIdFn(item) === getIdFn(editingItem) ? updatedItem : item
      ))
      setForm(initialForm)
      setEditingItem(null)
      setIsDialogOpen(false)
      showSuccess('Elemento actualizado exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al actualizar elemento')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return

    setLoading(true)
    setError(null)
    try {
      await deleteFn(id)
      setItems(items.filter(item => getIdFn(item) !== id))
      showSuccess('Elemento eliminado exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al eliminar elemento')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    // Estado
    items,
    loading,
    error,
    success,
    form,
    editingItem,
    isDialogOpen,
    
    // Setters
    setItems,
    setForm,
    setError,
    setIsDialogOpen,
    setEditingItem,
    
    // Acciones
    loadData,
    handleCreate,
    handleUpdate,
    handleDelete,
    showSuccess
  }
}