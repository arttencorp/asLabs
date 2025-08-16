'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { 
  obtenerCertificadosPorProductos, 
  obtenerFichasTecnicasPorProductos,
  transformarCertificadosBD,
  transformarFichasTecnicasBD
} from '@/lib/supabase'
import type { 
  CertificadoCalidadDatabase, 
  FichaTecnicaDatabase 
} from '@/types/database'
import type { Certificado, FichaTecnica } from '@/components/admin/cotizaciones/types'

export function useCertificadosFichas() {
  // Usar useRef para el cache local en lugar de variables globales
  const certificadosCache = useRef<Record<string, Certificado[]>>({})
  const fichasCache = useRef<Record<string, FichaTecnica[]>>({})
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    // Durante SSR/build, retornar funciones vacías
    return {
      certificadosLoading: false,
      fichasLoading: false,
      cargarCertificadosParaProductos: async () => {},
      cargarFichasParaProductos: async () => {},
      obtenerCertificadosProducto: () => [],
      obtenerFichasProducto: () => [],
      certificadosCache: {},
      fichasCache: {}
    }
  }
  // Estados de carga
  const [certificadosLoading, setCertificadosLoading] = useState(false)
  const [fichasLoading, setFichasLoading] = useState(false)
  // Cargar certificados para múltiples productos (usando IDs UUID)
  const cargarCertificadosParaProductos = useCallback(async (productosIds: string[]) => {
    if (!productosIds || productosIds.length === 0) return
    
    try {
      setCertificadosLoading(true)
      
      const certificadosPorProducto = await obtenerCertificadosPorProductos(productosIds)
      
      // Actualizar cache local
      Object.entries(certificadosPorProducto).forEach(([productoId, certificadosBD]) => {
        if (certificadosBD && certificadosBD.length > 0) {
          certificadosCache.current[productoId] = transformarCertificadosBD(certificadosBD)
        }
      })
      
      
    } catch (error) {
    } finally {
      setCertificadosLoading(false)
    }
  }, [])

  // Cargar fichas técnicas para múltiples productos (usando IDs UUID)
  const cargarFichasParaProductos = useCallback(async (productosIds: string[]) => {
    if (!productosIds || productosIds.length === 0) return
    
    try {
      setFichasLoading(true)
      
      const fichasPorProducto = await obtenerFichasTecnicasPorProductos(productosIds)
      
      // Actualizar cache local
      Object.entries(fichasPorProducto).forEach(([productoId, fichasBD]) => {
        if (fichasBD && fichasBD.length > 0) {
          fichasCache.current[productoId] = transformarFichasTecnicasBD(fichasBD)
        }
      })
      
    } catch (error) {
    } finally {
      setFichasLoading(false)
    }
  }, [])

  // Obtener certificados de un producto específico del cache local
  const obtenerCertificadosProducto = useCallback((productoId: string): Certificado[] => {
    const resultado = certificadosCache.current[productoId] || []
    return resultado
  }, [])

  // Obtener fichas técnicas de un producto específico del cache local
  const obtenerFichasProducto = useCallback((productoId: string): FichaTecnica[] => {
    const resultado = fichasCache.current[productoId] || []
    return resultado
  }, [])

  return {
    // Estados de carga
    certificadosLoading,
    fichasLoading,
    
    // Funciones de carga
    cargarCertificadosParaProductos,
    cargarFichasParaProductos,
    
    // Funciones de acceso
    obtenerCertificadosProducto,
    obtenerFichasProducto,
    
    // Cache local (para debugging)
    certificadosCache: certificadosCache.current,
    fichasCache: fichasCache.current
  }
}
