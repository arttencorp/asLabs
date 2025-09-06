"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle, AlertCircle } from "lucide-react"
import { useBaseCrud } from '@/hooks/useBaseCrud'
import { 
  obtenerCategorias, 
  crearCategoria, 
  actualizarCategoria, 
  eliminarCategoria,
  ocultarCategoria,
  mostrarCategoria,
  ocultarProductosPorCategoria,
  mostrarProductosPorCategoria,
  contarProductosPorCategoria,
  contarProductosOcultosPorCategoria
} from '@/lib/supabase'
import { CategoriaFormDialog } from './CategoriaFormDialog'
import { CategoriasTable } from './CategoriasTable'
import { OcultarCategoriaDialog } from './OcultarCategoriaDialog'
import { MostrarCategoriaDialog } from './MostrarCategoriaDialog'
import type { CategoriaDatabase } from '@/types/database'
import type { CategoriaForm } from '../types'

const initialForm: CategoriaForm = {
  cat_nom_vac: '',
  cat_desc_vac: ''
}

const validateCategoria = (data: CategoriaForm): string[] => {
  const errors: string[] = []
  
  if (!data.cat_nom_vac?.trim()) {
    errors.push('El nombre de la categoría es obligatorio')
  }
  
  if (data.cat_nom_vac && data.cat_nom_vac.trim().length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres')
  }
  
  if (data.cat_desc_vac && data.cat_desc_vac.trim().length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres')
  }
  
  return errors
}

export default function CategoriasManagement() {
  const {
    items: categorias,
    loading,
    error,
    success,
    form,
    editingItem: editingCategoria,
    isDialogOpen,
    setForm,
    setError,
    setIsDialogOpen,
    setEditingItem: setEditingCategoria,
    loadData,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useBaseCrud<CategoriaDatabase, CategoriaForm>({
    fetchFn: obtenerCategorias,
    createFn: crearCategoria,
    updateFn: (id, data) => actualizarCategoria(id, data),
    deleteFn: eliminarCategoria,
    initialForm,
    // Removemos validateFn temporalmente para que no interfiera
    // validateFn: validateCategoria,
    getIdFn: (item) => item.cat_id_int
  })

  // Estados para el modal de ocultar categoría
  const [ocultarDialogOpen, setOcultarDialogOpen] = useState(false)
  const [categoriaAOcultar, setCategoriaAOcultar] = useState<CategoriaDatabase | null>(null)
  const [productosCount, setProductosCount] = useState(0)
  
  // Estados para el modal de mostrar categoría
  const [mostrarDialogOpen, setMostrarDialogOpen] = useState(false)
  const [categoriaAMostrar, setCategoriaAMostrar] = useState<CategoriaDatabase | null>(null)
  const [productosOcultosCount, setProductosOcultosCount] = useState(0)

  const handleOpenDialog = (categoria?: CategoriaDatabase) => {
    if (categoria) {
      // Modo edición
      setEditingCategoria(categoria)
      setForm({
        cat_nom_vac: categoria.cat_nom_vac || '',
        cat_desc_vac: categoria.cat_desc_vac || ''
      })
    } else {
      // Modo creación
      setEditingCategoria(null)
      setForm(initialForm)
    }
    setError(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingCategoria(null)
    setForm(initialForm)
    setError(null)
  }

  const handleSubmit = async (formData: CategoriaForm) => {
    setError(null)
    
    try {
      if (editingCategoria) {
        // Actualizar directamente
        await actualizarCategoria(editingCategoria.cat_id_int, formData)
      } else {
        // Crear directamente  
        await crearCategoria(formData)
      }
      
      // Recargar datos y cerrar modal
      await loadData()
      setForm(initialForm)
      setEditingCategoria(null)
      setIsDialogOpen(false)
      
    } catch (error: any) {
      setError(error.message || 'Error al guardar categoría')
    }
  }

  const handleDeleteCategoria = async (id: string) => {
    await handleDelete(id)
  }

  const handleToggleVisibility = async (id: string, currentState: boolean) => {
    const categoria = categorias.find(cat => cat.cat_id_int === id)
    if (!categoria) return

    if (currentState) {
      // Está visible, queremos ocultarlo - mostrar modal de confirmación
      try {
        // Contar productos activos de esta categoría
        const count = await contarProductosPorCategoria(id)
        setCategoriaAOcultar(categoria)
        setProductosCount(count)
        setOcultarDialogOpen(true)
      } catch (error: any) {
        setError(error.message || 'Error al verificar productos de la categoría')
      }
    } else {
      // Está oculto, queremos mostrarlo - mostrar modal para productos ocultos
      try {
        // Contar productos ocultos de esta categoría
        const count = await contarProductosOcultosPorCategoria(id)
        setCategoriaAMostrar(categoria)
        setProductosOcultosCount(count)
        setMostrarDialogOpen(true)
      } catch (error: any) {
        setError(error.message || 'Error al verificar productos ocultos de la categoría')
      }
    }
  }

  const handleConfirmOcultarCategoria = async (ocultarProductos: boolean) => {
    if (!categoriaAOcultar) return
    
    setError(null)
    
    try {
      // Ocultar la categoría
      await ocultarCategoria(categoriaAOcultar.cat_id_int)
      
      // Si se eligió ocultar productos también
      if (ocultarProductos) {
        await ocultarProductosPorCategoria(categoriaAOcultar.cat_id_int)
      }
      
      // Recargar datos y cerrar modal
      await loadData()
      setOcultarDialogOpen(false)
      setCategoriaAOcultar(null)
      setProductosCount(0)
      
    } catch (error: any) {
      setError(error.message || 'Error al ocultar categoría')
    }
  }

  const handleCloseOcultarDialog = () => {
    setOcultarDialogOpen(false)
    setCategoriaAOcultar(null)
    setProductosCount(0)
  }

  const handleConfirmMostrarCategoria = async (activarProductos: boolean) => {
    if (!categoriaAMostrar) return
    
    setError(null)
    
    try {
      // Mostrar la categoría
      await mostrarCategoria(categoriaAMostrar.cat_id_int)
      
      // Si se eligió activar productos también
      if (activarProductos) {
        await mostrarProductosPorCategoria(categoriaAMostrar.cat_id_int)
      }
      
      // Recargar datos y cerrar modal
      await loadData()
      setMostrarDialogOpen(false)
      setCategoriaAMostrar(null)
      setProductosOcultosCount(0)
      
    } catch (error: any) {
      setError(error.message || 'Error al mostrar categoría')
    }
  }

  const handleCloseMostrarDialog = () => {
    setMostrarDialogOpen(false)
    setCategoriaAMostrar(null)
    setProductosOcultosCount(0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
          <p className="text-gray-600 mt-1">
            Administra las categorías de productos de la tienda online
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      {/* Alertas */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Categorías</CardDescription>
            <CardTitle className="text-2xl">{categorias.length}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Categorías Recientes</CardDescription>
            <CardTitle className="text-2xl">
              {categorias.filter(cat => {
                const diffTime = Math.abs(new Date().getTime() - new Date(cat.cat_created_at_dt).getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return diffDays <= 7
              }).length}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Última Actualización</CardDescription>
            <CardTitle className="text-lg">
              {categorias.length > 0 ? (
                new Date(Math.max(...categorias.map(cat => new Date(cat.cat_updated_at_dt).getTime())))
                  .toLocaleDateString('es-PE', { 
                    day: '2-digit', 
                    month: 'short' 
                  })
              ) : (
                'N/A'
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Tabla de categorías */}
      <CategoriasTable
        categorias={categorias}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteCategoria}
        onToggleVisibility={handleToggleVisibility}
      />

      {/* Dialog de formulario */}
      <CategoriaFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingCategoria={editingCategoria}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      {/* Dialog de confirmación para ocultar categoría */}
      <OcultarCategoriaDialog
        isOpen={ocultarDialogOpen}
        onClose={handleCloseOcultarDialog}
        categoriaNombre={categoriaAOcultar?.cat_nom_vac || ''}
        productosCount={productosCount}
        onConfirm={handleConfirmOcultarCategoria}
        loading={loading}
      />

      {/* Dialog de confirmación para mostrar categoría */}
      <MostrarCategoriaDialog
        isOpen={mostrarDialogOpen}
        onClose={handleCloseMostrarDialog}
        categoriaNombre={categoriaAMostrar?.cat_nom_vac || ''}
        productosOcultosCount={productosOcultosCount}
        onConfirm={handleConfirmMostrarCategoria}
        loading={loading}
      />
    </div>
  )
}
