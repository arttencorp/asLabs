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
import type { Certificado, FichaTecnica } from '@/components/admin/cotizaciones/types'

// Cache global compartido entre todas las instancias del hook
let certificadosCacheGlobal: Record<string, Certificado[]> = {}
let fichasCacheGlobal: Record<string, FichaTecnica[]> = {}

export function useCertificadosFichas() {
  console.log('🏗️ Hook useCertificadosFichas inicializado')
  
  // Estados de carga
  const [certificadosLoading, setCertificadosLoading] = useState(false)
  const [fichasLoading, setFichasLoading] = useState(false)
  // Cargar certificados para múltiples productos (usando IDs UUID)
  const cargarCertificadosParaProductos = useCallback(async (productosIds: string[]) => {
    if (!productosIds || productosIds.length === 0) return
    
    try {
      setCertificadosLoading(true)
      console.log('🔍 Cargando certificados para productos:', productosIds)
      
      const certificadosPorProducto = await obtenerCertificadosPorProductos(productosIds)
      console.log('📋 Certificados obtenidos:', certificadosPorProducto)
      
      // Actualizar cache global
      Object.entries(certificadosPorProducto).forEach(([productoId, certificadosBD]) => {
        if (certificadosBD && certificadosBD.length > 0) {
          certificadosCacheGlobal[productoId] = transformarCertificadosBD(certificadosBD)
        }
      })
      
      console.log('✅ Cache global de certificados actualizado:', certificadosCacheGlobal)
      
    } catch (error) {
      console.error('❌ Error cargando certificados:', error)
    } finally {
      setCertificadosLoading(false)
    }
  }, [])

  // Cargar fichas técnicas para múltiples productos (usando IDs UUID)
  const cargarFichasParaProductos = useCallback(async (productosIds: string[]) => {
    if (!productosIds || productosIds.length === 0) return
    
    try {
      setFichasLoading(true)
      console.log('🔍 Cargando fichas técnicas para productos:', productosIds)
      
      const fichasPorProducto = await obtenerFichasTecnicasPorProductos(productosIds)
      console.log('📋 Fichas técnicas obtenidas:', fichasPorProducto)
      
      // Actualizar cache global
      Object.entries(fichasPorProducto).forEach(([productoId, fichasBD]) => {
        if (fichasBD && fichasBD.length > 0) {
          fichasCacheGlobal[productoId] = transformarFichasTecnicasBD(fichasBD)
        }
      })
      
      console.log('✅ Cache global de fichas actualizado:', fichasCacheGlobal)
      
    } catch (error) {
      console.error('❌ Error cargando fichas técnicas:', error)
    } finally {
      setFichasLoading(false)
    }
  }, [])

  // Obtener certificados de un producto específico del cache global
  const obtenerCertificadosProducto = useCallback((productoId: string): Certificado[] => {
    console.log('🔍 obtenerCertificadosProducto llamado para:', productoId)
    console.log('📦 Cache global actual de certificados:', certificadosCacheGlobal)
    const resultado = certificadosCacheGlobal[productoId] || []
    console.log('📄 Certificados devueltos:', resultado)
    return resultado
  }, [])

  // Obtener fichas técnicas de un producto específico del cache global
  const obtenerFichasProducto = useCallback((productoId: string): FichaTecnica[] => {
    console.log('🔍 obtenerFichasProducto llamado para:', productoId)
    console.log('📦 Cache global actual de fichas:', fichasCacheGlobal)
    const resultado = fichasCacheGlobal[productoId] || []
    console.log('📄 Fichas devueltas:', resultado)
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
