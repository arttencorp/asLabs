"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle, AlertCircle, ShoppingCart } from "lucide-react"
import { 
  obtenerProductosTienda,
  crearProductoTienda,
  actualizarProductoTienda,
  eliminarProductoTienda,
  ocultarProductoTienda,
  mostrarProductoTienda,
  obtenerCategorias
} from '@/lib/supabase'
import { ProductoTiendaFormDialog } from './ProductoTiendaFormDialog'
import { ProductosTiendaTable } from './ProductosTiendaTable'
import { formatDate } from '@/utils/index'
import type { ProductoTiendaDatabase, CategoriaDatabase } from '@/types/database'
import type { ProductoTiendaForm } from '../types'

const initialForm: ProductoTiendaForm = {
  prod_tiend_nom_vac: '',
  prod_tiend_desc_vac: '',
  prod_tiend_prec_vac: '',
  cat_id_int: ''
}

export function ProductosTiendaManagement() {
  const [productos, setProductos] = useState<ProductoTiendaDatabase[]>([])
  const [categorias, setCategorias] = useState<CategoriaDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [form, setForm] = useState<ProductoTiendaForm>(initialForm)
  const [editingProducto, setEditingProducto] = useState<ProductoTiendaDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = (message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [productosData, categoriasData] = await Promise.all([
        obtenerProductosTienda(),
        obtenerCategorias()
      ])
      setProductos(productosData)
      setCategorias(categoriasData) 
    } catch (error: any) {
      setError(error.message || 'Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenDialog = (producto?: ProductoTiendaDatabase) => {
    if (producto) {
      setEditingProducto(producto)
      setForm({
        prod_tiend_nom_vac: producto.prod_tiend_nom_vac || '',
        prod_tiend_desc_vac: producto.prod_tiend_desc_vac || '',
        prod_tiend_prec_vac: producto.prod_tiend_prec_vac || '',
        cat_id_int: producto.cat_id_int || ''
      })
    } else {
      setEditingProducto(null)
      setForm(initialForm)
    }
    setError(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProducto(null)
    setForm(initialForm)
    setError(null)
  }

  const handleSubmit = async (formData: ProductoTiendaForm) => {
    setError(null)
    
    try {
      if (editingProducto) {
        // Actualizar directamente
        await actualizarProductoTienda(editingProducto.prod_tiend_id_int, formData)
        showSuccess('Producto actualizado exitosamente')
      } else {
        // Crear directamente  
        await crearProductoTienda(formData)
        showSuccess('Producto creado exitosamente')
      }
      
      // Recargar datos y cerrar modal
      await loadData()
      setForm(initialForm)
      setEditingProducto(null)
      setIsDialogOpen(false)
      
    } catch (error: any) {
      setError(error.message || 'Error al guardar producto')
    }
  }

  const handleDeleteProducto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return

    setError(null)
    
    try {
      await eliminarProductoTienda(id)
      await loadData()
      showSuccess('Producto eliminado exitosamente')
    } catch (error: any) {
      setError(error.message || 'Error al eliminar producto')
    }
  }

  const handleToggleVisibility = async (id: string, currentState: boolean) => {
    setError(null)
    
    try {
      if (currentState) {
        // Está visible, lo vamos a ocultar
        await ocultarProductoTienda(id)
        showSuccess('Producto ocultado exitosamente')
      } else {
        // Está oculto, lo vamos a mostrar
        await mostrarProductoTienda(id)
        showSuccess('Producto mostrado exitosamente')
      }
      
      // Recargar datos
      await loadData()
      
    } catch (error: any) {
      setError(error.message || 'Error al cambiar visibilidad del producto')
    }
  }

  // Estadísticas
  const stats = {
    total: productos.length,
    activos: productos.filter(p => p.prod_tiend_activo_bool !== false).length,
    ocultos: productos.filter(p => p.prod_tiend_activo_bool === false).length,
    ultimaActualizacion: productos.length > 0 ? 
      formatDate(
        new Date(Math.max(...productos.map(prod => new Date(prod.prod_tiend_updated_at_dt).getTime()))).toISOString()
      ) : 'Sin datos'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600 mt-1">
            Administra los productos de tu tienda online
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      {/* Mensajes de estado */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Ocultos</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.ocultos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{stats.ultimaActualizacion}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de productos */}
      <ProductosTiendaTable
        productos={productos}
        categorias={categorias}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteProducto}
        onToggleVisibility={handleToggleVisibility}
      />

      {/* Dialog de formulario */}
      <ProductoTiendaFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingProducto={editingProducto}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        categorias={categorias}
      />
    </div>
  )
}
