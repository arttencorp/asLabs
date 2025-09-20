"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerFichasTecnicasCompletas, 
  obtenerFichasTecnicasCompletasPorCodigos,
  obtenerFichaTecnicaCompleta,
  crearFichaTecnica, 
  actualizarFichaTecnica, 
  eliminarFichaTecnica,
  subirImagenFichaTecnica,
  eliminarImagenFichaTecnica,
  obtenerProductos,
  crearOActualizarFichaTecnicaCompleta
} from '@/lib/supabase'
import type { 
  FichaTecnicaDatabase, 
  ProductoDatabase,
  FichaTecnicaCompletaDatabase,
  FichaTecnicaForm,
  DetalleFichaTecnicaForm,
  TaxonomiaForm,
  ZonaColectaForm
} from '@/types/database'
import { validarFichaTecnica } from '../utils'

interface FormDataCompleta {
  ficha: FichaTecnicaForm
  detalle: DetalleFichaTecnicaForm
  taxonomia: TaxonomiaForm
  zona_colecta: ZonaColectaForm
  selectedFile?: File | null
}

// Cache mejorado para fichas técnicas completas
interface CacheEntry {
  data: FichaTecnicaCompletaDatabase[]
  timestamp: number
  accessCount: number
}

class FichasCompletasCache {
  private cache: { [key: string]: CacheEntry } = {}
  private readonly maxEntries = 50 // Límite de entradas
  private readonly ttl = 5 * 60 * 1000 // 5 minutos en millisegundos

  get(key: string): FichaTecnicaCompletaDatabase[] | null {
    const entry = this.cache[key]
    if (!entry) return null

    // Verificar si la entrada ha expirado
    if (Date.now() - entry.timestamp > this.ttl) {
      delete this.cache[key]
      return null
    }

    // Incrementar contador de acceso
    entry.accessCount++
    return entry.data
  }

  set(key: string, data: FichaTecnicaCompletaDatabase[]): void {
    // Si el cache está lleno, eliminar la entrada menos usada y más antigua
    if (Object.keys(this.cache).length >= this.maxEntries) {
      this.evictLeastUsed()
    }

    this.cache[key] = {
      data,
      timestamp: Date.now(),
      accessCount: 0
    }
  }

  clear(): void {
    this.cache = {}
  }

  private evictLeastUsed(): void {
    let leastUsedKey = ''
    let leastUsedScore = Infinity

    for (const [key, entry] of Object.entries(this.cache)) {
      // Score basado en frecuencia de uso y antigüedad
      const score = entry.accessCount / (Date.now() - entry.timestamp)
      if (score < leastUsedScore) {
        leastUsedScore = score
        leastUsedKey = key
      }
    }

    if (leastUsedKey) {
      delete this.cache[leastUsedKey]
    }
  }

  // Limpiar entradas expiradas automáticamente
  private cleanExpired(): void {
    const now = Date.now()
    for (const [key, entry] of Object.entries(this.cache)) {
      if (now - entry.timestamp > this.ttl) {
        delete this.cache[key]
      }
    }
  }

  // Iniciar limpieza automática cada 2 minutos
  startAutoCleanup(): void {
    setInterval(() => this.cleanExpired(), 2 * 60 * 1000)
  }
}

// Instancia global del cache mejorado
const fichasCompletasCache = new FichasCompletasCache()

// Iniciar limpieza automática
if (typeof window !== 'undefined') {
  fichasCompletasCache.startAutoCleanup()
}

export function useFichasTecnicasCompletas() {
  const [items, setItems] = useState<FichaTecnicaCompletaDatabase[]>([])
  const [productos, setProductos] = useState<ProductoDatabase[]>([])
  const [loading, setLoading] = useState(false)
  const [productosLoading, setProductosLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<FichaTecnicaCompletaDatabase | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await obtenerFichasTecnicasCompletas()
      setItems(data)
      showSuccess(`Cargadas ${data.length} fichas técnicas completas`)
    } catch (err: any) {
      setError(err.message || 'Error al cargar fichas técnicas')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const loadProductos = useCallback(async () => {
    setProductosLoading(true)
    try {
      const data = await obtenerProductos()
      setProductos(data)
    } catch (err: any) {
      console.error('Error cargando productos:', err)
    } finally {
      setProductosLoading(false)
    }
  }, [])

  // Cargar fichas técnicas completas por códigos de producto
  const cargarFichasCompletasPorCodigos = useCallback(async (codigos: string[]): Promise<FichaTecnicaCompletaDatabase[]> => {
    if (!codigos || codigos.length === 0) return []
    
    try {
      setLoading(true)
      setError(null)

      // Verificar cache primero
      const cacheKey = codigos.sort().join(',')
      const cachedData = fichasCompletasCache.get(cacheKey)
      if (cachedData) {
        return cachedData
      }
      
      const fichasCompletas = await obtenerFichasTecnicasCompletasPorCodigos(codigos)
      
      // Guardar en cache
      fichasCompletasCache.set(cacheKey, fichasCompletas)
      
      return fichasCompletas
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCreateCompleta = useCallback(async (formData: FormDataCompleta) => {
    // Convertir y validar datos
    const fichaForValidation = {
      fit_tec_nom_planta_vac: formData.ficha.fit_tec_nom_planta_vac,
      fit_tec_cod_vac: formData.ficha.fit_tec_cod_vac || null,
      pro_id_int: formData.ficha.pro_id_int,
      fit_tec_imag_vac: formData.ficha.fit_tec_imag_vac || null
    }

    const errors = validarFichaTecnica(fichaForValidation)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      // 1. Subir imagen si hay una seleccionada
      let imageUrl = null
      if (formData.selectedFile) {
        const uploadResult = await subirImagenFichaTecnica(
          formData.selectedFile,
          `${Date.now()}-${formData.selectedFile.name}`
        )
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }
        imageUrl = uploadResult.url
      }

      // 2. Crear la ficha técnica principal
      const fichaTecnicaData = {
        fit_tec_nom_planta_vac: formData.ficha.fit_tec_nom_planta_vac,
        fit_tec_cod_vac: formData.ficha.fit_tec_cod_vac || null,
        pro_id_int: formData.ficha.pro_id_int,
        fit_tec_imag_vac: imageUrl
      }
      const nuevaFichaTecnica = await crearFichaTecnica(fichaTecnicaData)

      // 3. Crear datos relacionados si existen
      const datosRelacionados: any = {}

      // Solo agregar secciones con datos
      const tieneDetalle = Object.values(formData.detalle).some(value => value && value.toString().trim() !== '')
      const tieneTaxonomia = Object.values(formData.taxonomia).some(value => value && value.toString().trim() !== '')
      const tieneZonaColecta = Object.values(formData.zona_colecta).some(value => value && value.toString().trim() !== '')

      if (tieneDetalle) {
        datosRelacionados.detalle = formData.detalle
      }
      if (tieneTaxonomia) {
        datosRelacionados.taxonomia = formData.taxonomia
      }
      if (tieneZonaColecta) {
        datosRelacionados.zona_colecta = formData.zona_colecta
      }

      // Solo crear datos relacionados si hay algo que guardar
      if (Object.keys(datosRelacionados).length > 0) {
        await crearOActualizarFichaTecnicaCompleta(nuevaFichaTecnica.fit_tec_id_int, datosRelacionados)
      }

      // 4. Recargar datos y actualizar UI
      await loadData()
      setIsDialogOpen(false)
      showSuccess('Ficha técnica completa creada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al crear ficha técnica completa')
    } finally {
      setLoading(false)
    }
  }, [showSuccess, loadData])

  const handleUpdateCompleta = useCallback(async (formData: FormDataCompleta) => {
    if (!editingItem) return

    // Convertir y validar datos
    const fichaForValidation = {
      fit_tec_nom_planta_vac: formData.ficha.fit_tec_nom_planta_vac,
      fit_tec_cod_vac: formData.ficha.fit_tec_cod_vac || null,
      pro_id_int: formData.ficha.pro_id_int,
      fit_tec_imag_vac: formData.ficha.fit_tec_imag_vac || null
    }

    const errors = validarFichaTecnica(fichaForValidation)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)
    try {
      // 1. Subir nueva imagen si hay una seleccionada
      let imageUrl = formData.ficha.fit_tec_imag_vac
      if (formData.selectedFile) {
        // Eliminar imagen anterior si existe
        if (editingItem.fit_tec_imag_vac) {
          await eliminarImagenFichaTecnica(editingItem.fit_tec_imag_vac)
        }

        const uploadResult = await subirImagenFichaTecnica(
          formData.selectedFile,
          `${Date.now()}-${formData.selectedFile.name}`
        )
        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }
        imageUrl = uploadResult.url
      }

      // 2. Actualizar la ficha técnica principal
      const fichaTecnicaData = {
        fit_tec_nom_planta_vac: formData.ficha.fit_tec_nom_planta_vac,
        fit_tec_cod_vac: formData.ficha.fit_tec_cod_vac || null,
        pro_id_int: formData.ficha.pro_id_int,
        fit_tec_imag_vac: imageUrl
      }
      await actualizarFichaTecnica(editingItem.fit_tec_id_int, fichaTecnicaData)

      // 3. Actualizar datos relacionados
      const datosRelacionados: any = {}

      // Solo agregar secciones con datos
      const tieneDetalle = Object.values(formData.detalle).some(value => value && value.toString().trim() !== '')
      const tieneTaxonomia = Object.values(formData.taxonomia).some(value => value && value.toString().trim() !== '')
      const tieneZonaColecta = Object.values(formData.zona_colecta).some(value => value && value.toString().trim() !== '')

      if (tieneDetalle) {
        datosRelacionados.detalle = formData.detalle
      }
      if (tieneTaxonomia) {
        datosRelacionados.taxonomia = formData.taxonomia
      }
      if (tieneZonaColecta) {
        datosRelacionados.zona_colecta = formData.zona_colecta
      }

      // Siempre intentar actualizar las relaciones (esto permite borrar datos)
      await crearOActualizarFichaTecnicaCompleta(editingItem.fit_tec_id_int, datosRelacionados)

      // 4. Recargar datos y actualizar UI
      await loadData()
      setIsDialogOpen(false)
      setEditingItem(null)
      showSuccess('Ficha técnica completa actualizada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al actualizar ficha técnica completa')
    } finally {
      setLoading(false)
    }
  }, [editingItem, showSuccess, loadData])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta ficha técnica? Esto eliminará también todos sus datos relacionados.')) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      await eliminarFichaTecnica(id)
      setItems(prevItems => prevItems.filter(item => item.fit_tec_id_int !== id))
      showSuccess('Ficha técnica eliminada exitosamente')
    } catch (err: any) {
      setError(err.message || 'Error al eliminar ficha técnica')
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  // Función para abrir el diálogo de creación
  const openCreateDialog = useCallback(() => {
    setEditingItem(null)
    setIsDialogOpen(true)
    setError(null)
  }, [])

  // Función para abrir el diálogo de edición
  const openEditDialog = useCallback(async (item: FichaTecnicaDatabase) => {
    try {
      setLoading(true)
      // Cargar la ficha técnica completa con todos sus datos relacionados
      const fichaCompleta = await obtenerFichaTecnicaCompleta(item.fit_tec_id_int)
      setEditingItem(fichaCompleta)
      setIsDialogOpen(true)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos completos de la ficha técnica')
    } finally {
      setLoading(false)
    }
  }, [])

  // Función para cerrar el diálogo
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setEditingItem(null)
    setError(null)
  }, [])

  // Limpiar cache
  const limpiarCache = useCallback(() => {
    fichasCompletasCache.clear()
  }, [])

  useEffect(() => {
    loadData()
    loadProductos()
  }, [loadData, loadProductos])

  // Estadísticas
  const stats = {
    totalFichas: items.length,
    fichasConImagen: items.filter(item => item.fit_tec_imag_vac).length,
    fichasSinImagen: items.filter(item => !item.fit_tec_imag_vac).length,
    fichasConTaxonomia: items.filter(item => item.taxonomia).length,
    fichasConDetalle: items.filter(item => item.detalle).length,
    fichasConZonaColecta: items.filter(item => item.zona_colecta).length,
    ultimaActualizacion: items.length > 0 ? 
      new Date(Math.max(...items.map(item => new Date(item.fit_tec_updated_at_dt).getTime()))).toISOString() :
      ''
  }

  return {
    // Estado
    items,
    productos,
    loading,
    productosLoading,
    uploadLoading,
    error,
    success,
    editingItem,
    isDialogOpen,
    stats,
    
    // Setters
    setError,
    setIsDialogOpen,
    setEditingItem,
    
    // Acciones
    loadData,
    loadProductos,
    handleCreateCompleta,
    handleUpdateCompleta,
    handleDelete,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    showSuccess,
    
    // Funciones específicas
    cargarFichasCompletasPorCodigos,
    limpiarCache
  }
}