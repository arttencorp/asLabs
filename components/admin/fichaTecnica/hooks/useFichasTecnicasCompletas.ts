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

// Cache global para fichas técnicas completas
const fichasCompletasCache: { [key: string]: FichaTecnicaCompletaDatabase[] } = {}

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
      if (fichasCompletasCache[cacheKey]) {
        return fichasCompletasCache[cacheKey]
      }
      
      const fichasCompletas = await obtenerFichasTecnicasCompletasPorCodigos(codigos)
      
      // Guardar en cache
      fichasCompletasCache[cacheKey] = fichasCompletas
      
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
    Object.keys(fichasCompletasCache).forEach(key => {
      delete fichasCompletasCache[key]
    })
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