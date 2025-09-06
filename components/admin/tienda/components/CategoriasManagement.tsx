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
  mostrarCategoria
} from '@/lib/supabase'
import { CategoriaFormDialog } from './CategoriaFormDialog'
import { CategoriasTable } from './CategoriasTable'
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
    setError(null)
    
    try {
      if (currentState) {
        // Está visible, lo vamos a ocultar
        await ocultarCategoria(id)
      } else {
        // Está oculto, lo vamos a mostrar
        await mostrarCategoria(id)
      }
      
      // Recargar datos
      await loadData()
      
    } catch (error: any) {
      setError(error.message || 'Error al cambiar visibilidad de categoría')
    }
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
    </div>
  )
}
