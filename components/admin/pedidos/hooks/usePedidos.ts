"use client"

import { useState, useEffect, useCallback } from 'react'
import { 
  obtenerPedidos, 
  obtenerCotizaciones, 
  obtenerEstadosPedido,
  obtenerEstadosCotizacion,
  obtenerFormasPago,
  obtenerProductos,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
  obtenerPersonas
} from '@/lib/supabase'
import { useBaseCrud } from '@/hooks/useBaseCrud'
import { calcularTotalCotizacion } from '@/utils/index'
import type { 
  Pedido, 
  Cotizacion, 
  PedidoForm,
  PedidosStats
} from '../types'
import type { 
  EstadoPedido, 
  EstadoCotizacion,
  FormaPago,
  ProductoDatabase
} from '@/types/database'
import type { ClientePersona } from '@/types/database'

// Formulario inicial para pedidos
const PEDIDO_FORM_INITIAL: PedidoForm = {
  cotizacion_id: '',
  estado_id: '',
  codigo_rastreo: '',
  observaciones: '',
  numero_comprobante: '',
  imagen_url: ''
}

export function usePedidos() {
  // Estados para entidades relacionadas
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [estadosPedido, setEstadosPedido] = useState<EstadoPedido[]>([])
  const [estadosCotizacion, setEstadosCotizacion] = useState<EstadoCotizacion[]>([])
  const [formasPago, setFormasPago] = useState<FormaPago[]>([])
  const [productos, setProductos] = useState<ProductoDatabase[]>([])
  const [clientes, setClientes] = useState<ClientePersona[]>([])

  // Usar useBaseCrud para la gestión de pedidos
  const baseCrud = useBaseCrud<Pedido, PedidoForm>({
    fetchFn: obtenerPedidos,
    createFn: crearPedido,
    updateFn: actualizarPedido,
    deleteFn: eliminarPedido,
    initialForm: PEDIDO_FORM_INITIAL,
    getIdFn: (pedido) => pedido.ped_id_int
  })

  // Extraer funciones y estados de useBaseCrud
  const {
    items: pedidos,
    loading: pedidosLoading,
    error,
    success,
    form: pedidoForm,
    editingItem: editingPedido,
    isDialogOpen,
    setForm: setPedidoForm,
    setError,
    setIsDialogOpen,
    setEditingItem: setEditingPedido,
    loadData: loadPedidos,
    handleCreate: createPedido,
    handleUpdate: updatePedido,
    handleDelete: deletePedido,
    showSuccess
  } = baseCrud

  // Estado de carga adicional para datos relacionados
  const [relatedDataLoading, setRelatedDataLoading] = useState(false)

  // Carga combinada de todos los datos
  const loadData = useCallback(async () => {
    setRelatedDataLoading(true)
    setError(null)

    try {
      const [
        cotizacionesData, 
        estadosPedidoData,
        estadosCotizacionData,
        formasPagoData,
        productosData,
        clientesData
      ] = await Promise.all([
        obtenerCotizaciones(),
        obtenerEstadosPedido(),
        obtenerEstadosCotizacion(),
        obtenerFormasPago(),
        obtenerProductos(),
        obtenerPersonas()
      ])

      setCotizaciones(cotizacionesData)
      setEstadosPedido(estadosPedidoData)
      setEstadosCotizacion(estadosCotizacionData)
      setFormasPago(formasPagoData)
      setProductos(productosData)
      setClientes(clientesData)
      
      // Cargar pedidos usando useBaseCrud
      await loadPedidos()
      
      showSuccess(`Datos cargados: ${cotizacionesData.length} cotizaciones`)
    } catch (error: any) {
      setError(error.message || "Error al cargar los datos")
    } finally {
      setRelatedDataLoading(false)
    }
  }, [loadPedidos, showSuccess, setError])

  // Calcular estadísticas mejoradas
  const stats: PedidosStats = {
    totalPedidos: pedidos.length,
    pedidosPendientes: pedidos.filter(p => 
      p.estado_pedido?.est_ped_tipo_int ? ![5, 6].includes(p.estado_pedido.est_ped_tipo_int) : false
    ).length,
    pedidosEntregados: pedidos.filter(p => 
      p.estado_pedido?.est_ped_tipo_int === 5
    ).length,
    pedidosCancelados: pedidos.filter(p => 
      p.estado_pedido?.est_ped_tipo_int === 6
    ).length,
    ingresoTotal: pedidos
      .filter(p => p.estado_pedido?.est_ped_tipo_int === 5)
      .reduce((sum, p) => {
        if (!p.cotizacion?.detalle_cotizacion) return sum
        const { total } = calcularTotalCotizacion(
          p.cotizacion.detalle_cotizacion.map(d => ({
            cantidad: d.det_cot_cant_int,
            precio: d.det_cot_prec_hist_int
          })),
          p.cotizacion.cot_igv_bol
        )
        return sum + total
      }, 0)
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    // Data
    pedidos,
    cotizaciones,
    estadosPedido,
    estadosCotizacion,
    formasPago,
    productos,
    clientes,
    stats,
    
    // States (combinando estados de useBaseCrud y adicionales)
    loading: pedidosLoading || relatedDataLoading,
    error,
    success,
    pedidoForm,
    editingPedido,
    isDialogOpen,
    
    // Actions (usando funciones de useBaseCrud)
    loadData,
    createPedido,
    updatePedido,
    deletePedido,
    
    // Form management
    setPedidoForm,
    setEditingPedido,
    setIsDialogOpen,
    
    // Utilities
    showSuccess,
    setError
  }
}