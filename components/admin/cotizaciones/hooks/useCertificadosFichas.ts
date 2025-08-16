import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerCertificadosPorProductos, 
  obtenerFichasTecnicasPorProductos,
  transformarCertificadosBD,
  transformarFichasTecnicasBD
} from '@/lib/supabase'
import type { Certificado, FichaTecnica } from '../types'

export function useCertificadosFichas() {
  const [certificadosLoading, setCertificadosLoading] = useState(false)
  const [fichasLoading, setFichasLoading] = useState(false)
  const [certificadosError, setCertificadosError] = useState<string | null>(null)
  const [fichasError, setFichasError] = useState<string | null>(null)
  
  // Cache para certificados y fichas por producto
  const [certificadosCache, setCertificadosCache] = useState<{[key: string]: Certificado[]}>({})
  const [fichasCache, setFichasCache] = useState<{[key: string]: FichaTecnica[]}>({})

  // Cargar certificados para múltiples productos
  const cargarCertificadosParaProductos = useCallback(async (productosIds: string[]) => {
    if (productosIds.length === 0) return

    // Filtrar solo productos que no están en caché y son de BD
    const productosParaCargar = productosIds.filter(id => 
      id && 
      id !== 'personalizado' && 
      id !== 'LAB' &&
      !id.startsWith('ASW') && // Productos conceptuales
      !id.startsWith('ASC') && // Productos conceptuales  
      !certificadosCache[id]
    )

    if (productosParaCargar.length === 0) return

    try {
      setCertificadosLoading(true)
      setCertificadosError(null)
      
      const certificadosBD = await obtenerCertificadosPorProductos(productosParaCargar)
      
      // Transformar y actualizar cache
      const nuevosCache: {[key: string]: Certificado[]} = {}
      for (const [productoId, certificados] of Object.entries(certificadosBD)) {
        nuevosCache[productoId] = transformarCertificadosBD(certificados)
      }

      setCertificadosCache(prev => ({ ...prev, ...nuevosCache }))
    } catch (error) {
      console.error('Error cargando certificados:', error)
      setCertificadosError('Error al cargar certificados de calidad')
    } finally {
      setCertificadosLoading(false)
    }
  }, [certificadosCache])

  // Cargar fichas técnicas para múltiples productos
  const cargarFichasParaProductos = useCallback(async (productosIds: string[]) => {
    if (productosIds.length === 0) return

    // Filtrar solo productos que no están en caché y son de BD
    const productosParaCargar = productosIds.filter(id => 
      id && 
      id !== 'personalizado' && 
      id !== 'LAB' &&
      !id.startsWith('ASW') && // Productos conceptuales
      !id.startsWith('ASC') && // Productos conceptuales
      !fichasCache[id]
    )

    if (productosParaCargar.length === 0) return

    try {
      setFichasLoading(true)
      setFichasError(null)
      
      const fichasBD = await obtenerFichasTecnicasPorProductos(productosParaCargar)
      
      // Transformar y actualizar cache
      const nuevosCache: {[key: string]: FichaTecnica[]} = {}
      for (const [productoId, fichas] of Object.entries(fichasBD)) {
        nuevosCache[productoId] = transformarFichasTecnicasBD(fichas)
      }

      setFichasCache(prev => ({ ...prev, ...nuevosCache }))
    } catch (error) {
      console.error('Error cargando fichas técnicas:', error)
      setFichasError('Error al cargar fichas técnicas')
    } finally {
      setFichasLoading(false)
    }
  }, [fichasCache])

  // Obtener certificados para un producto específico
  const obtenerCertificadosProducto = useCallback((productoId: string): Certificado[] => {
    if (!productoId) return []
    
    // Verificar si está en cache
    if (certificadosCache[productoId]) {
      return certificadosCache[productoId]
    }

    // Si es un producto conceptual, devolver array vacío (se manejará con la lógica existente)
    if (productoId === 'personalizado' || productoId === 'LAB' || 
        productoId.startsWith('ASW') || productoId.startsWith('ASC')) {
      return []
    }

    return []
  }, [certificadosCache])

  // Obtener fichas técnicas para un producto específico
  const obtenerFichasProducto = useCallback((productoId: string): FichaTecnica[] => {
    if (!productoId) return []
    
    // Verificar si está en cache
    if (fichasCache[productoId]) {
      return fichasCache[productoId]
    }

    // Si es un producto conceptual, devolver array vacío (se manejará con la lógica existente)
    if (productoId === 'personalizado' || productoId === 'LAB' || 
        productoId.startsWith('ASW') || productoId.startsWith('ASC')) {
      return []
    }

    return []
  }, [fichasCache])

  // Limpiar cache
  const limpiarCache = useCallback(() => {
    setCertificadosCache({})
    setFichasCache({})
  }, [])

  return {
    // Estados de carga
    certificadosLoading,
    fichasLoading,
    certificadosError,
    fichasError,
    
    // Funciones principales
    cargarCertificadosParaProductos,
    cargarFichasParaProductos,
    obtenerCertificadosProducto,
    obtenerFichasProducto,
    limpiarCache,
    
    // Cache (para debug)
    certificadosCache,
    fichasCache
  }
}
