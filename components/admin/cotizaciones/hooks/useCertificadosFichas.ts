'use client'

'use client'

import { useState, useCallback } from 'react'
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
import type { Certificado, FichaTecnica } from '../types'

// Cache global compartido entre todas las instancias del hook
let certificadosCacheGlobal: Record<string, Certificado[]> = {}
let fichasCacheGlobal: Record<string, FichaTecnica[]> = {}

export function useCertificadosFichas() {
  // Estados de carga
  const [certificadosLoading, setCertificadosLoading] = useState(false)
  const [fichasLoading, setFichasLoading] = useState(false)
  
  // Cargar certificados para múltiples productos (usando IDs UUID)
  const cargarCertificadosParaProductos = useCallback(async (productosIds: string[]) => {
    if (!productosIds || productosIds.length === 0) return
    
    try {
      setCertificadosLoading(true)
      
      const certificadosPorProducto = await obtenerCertificadosPorProductos(productosIds)
      
      // Actualizar cache global
      Object.entries(certificadosPorProducto).forEach(([productoId, certificadosBD]) => {
        if (certificadosBD && certificadosBD.length > 0) {
          certificadosCacheGlobal[productoId] = transformarCertificadosBD(certificadosBD)
        }
      })
      
    } catch (error) {
      // Error al cargar certificados
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
      
      // Actualizar cache global
      Object.entries(fichasPorProducto).forEach(([productoId, fichasBD]) => {
        if (fichasBD && fichasBD.length > 0) {
          fichasCacheGlobal[productoId] = transformarFichasTecnicasBD(fichasBD)
        }
      })
      
    } catch (error) {
      // Error al cargar fichas técnicas
    } finally {
      setFichasLoading(false)
    }
  }, [])

  // Obtener certificados de un producto específico del cache global
  const obtenerCertificadosProducto = useCallback((productoId: string): Certificado[] => {
    const resultado = certificadosCacheGlobal[productoId] || []
    return resultado
  }, [])

  // Obtener fichas técnicas de un producto específico del cache global
  const obtenerFichasProducto = useCallback((productoId: string): FichaTecnica[] => {
    const resultado = fichasCacheGlobal[productoId] || []
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
    
    // Cache global (para debugging)
    certificadosCache: certificadosCacheGlobal,
    fichasCache: fichasCacheGlobal
  }
}