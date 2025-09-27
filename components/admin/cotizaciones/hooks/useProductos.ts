import { useState, useEffect, useCallback } from 'react'
import { obtenerProductos } from '@/lib/supabase'
import type { ProductoDatabase } from '@/types/database'

export function useProductos() {
  const [productos, setProductos] = useState<ProductoDatabase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Función de éxito reutilizable (patrón useBaseCrud)
  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const cargarProductos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const productosData = await obtenerProductos()
      setProductos(productosData) 
    } catch (err) {
      console.error('Error cargando productos:', err)
      setError('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  useEffect(() => {
    cargarProductos()
  }, [cargarProductos])

  // Función para buscar producto por ID
  const obtenerProductoPorId = (id: string) => {
    return productos.find(p => p.pro_id_int === id)
  }

  // Función para formatear producto para el selector
  const formatearProductoParaSelector = (producto: ProductoDatabase) => ({
    id: producto.pro_id_int,
    nombre: producto.pro_nomb_vac || 'Sin nombre',
    descripcion: producto.pro_nomb_vac || 'Sin nombre',
    precioUnitario: producto.pro_prec_unitario_int || 0,
    tipoProducto: 'database' // para distinguir de productos conceptuales
  })

  return {
    productos,
    loading,
    error,
    success,
    cargarProductos,
    obtenerProductoPorId,
    formatearProductoParaSelector,
    showSuccess,
    setError: (error: string | null) => setError(error)
  }
}
