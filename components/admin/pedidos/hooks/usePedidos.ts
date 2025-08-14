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

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [estadosPedido, setEstadosPedido] = useState<EstadoPedido[]>([])
  const [estadosCotizacion, setEstadosCotizacion] = useState<EstadoCotizacion[]>([])
  const [formasPago, setFormasPago] = useState<FormaPago[]>([])
  const [productos, setProductos] = useState<ProductoDatabase[]>([])
  const [clientes, setClientes] = useState<ClientePersona[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const showSuccess = useCallback((message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [
        pedidosData, 
        cotizacionesData, 
        estadosPedidoData,
        estadosCotizacionData,
        formasPagoData,
        productosData,
        clientesData
      ] = await Promise.all([
        obtenerPedidos(),
        obtenerCotizaciones(),
        obtenerEstadosPedido(),
        obtenerEstadosCotizacion(),
        obtenerFormasPago(),
        obtenerProductos(),
        obtenerPersonas()
      ])

      setPedidos(pedidosData)
      setCotizaciones(cotizacionesData)
      setEstadosPedido(estadosPedidoData)
      setEstadosCotizacion(estadosCotizacionData)
      setFormasPago(formasPagoData)
      setProductos(productosData)
      setClientes(clientesData)
      
      showSuccess(`Datos cargados: ${pedidosData.length} pedidos, ${cotizacionesData.length} cotizaciones`)
    } catch (error: any) {
      setError(error.message || "Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const createPedido = useCallback(async (pedidoForm: PedidoForm) => {
    setLoading(true)
    setError(null)

    try {
      const nuevoPedido = await crearPedido(pedidoForm)
      setPedidos(prev => [nuevoPedido, ...prev])
      showSuccess(`Pedido ${nuevoPedido.ped_cod_segui_vac} creado exitosamente`)
      return nuevoPedido
    } catch (error: any) {
      setError(error.message || "Error al crear el pedido")
      throw error
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const updatePedido = useCallback(async (id: string, pedidoForm: Partial<PedidoForm>) => {
    setLoading(true)
    setError(null)

    try {
      const pedidoActualizado = await actualizarPedido(id, pedidoForm)
      setPedidos(prev => prev.map(p => p.ped_id_int === id ? pedidoActualizado : p))
      showSuccess(`Pedido actualizado exitosamente`)
      return pedidoActualizado
    } catch (error: any) {
      setError(error.message || "Error al actualizar el pedido")
      throw error
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

  const deletePedido = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      await eliminarPedido(id)
      setPedidos(prev => prev.filter(p => p.ped_id_int !== id))
      showSuccess("Pedido eliminado exitosamente")
    } catch (error: any) {
      setError(error.message || "Error al eliminar el pedido")
      throw error
    } finally {
      setLoading(false)
    }
  }, [showSuccess])

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
    
    // States
    loading,
    error,
    success,
    
    // Actions
    loadData,
    createPedido,
    updatePedido,
    deletePedido,
    
    // Utilities
    showSuccess,
    setError
  }
}