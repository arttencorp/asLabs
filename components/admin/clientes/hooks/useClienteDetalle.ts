"use client"

import { useState, useCallback } from 'react'
import { 
  obtenerPersonaPorId, 
  obtenerCotizacionesPorCliente, 
  obtenerPedidosPorCliente 
} from '@/lib/supabase'
import { calcularTotalCotizacion } from '@/utils/index'
import type { ClientePersona } from '@/types/database'
import type { Cotizacion, Pedido } from '@/components/admin/pedidos/types'

interface ClienteStats {
  totalCotizaciones: number
  totalPedidos: number
  pedidosEntregados: number
  valorTotal: number
}

export function useClienteDetalle(clienteId: string) {
  const [cliente, setCliente] = useState<ClientePersona | null>(null)
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadClienteDetalle = useCallback(async () => {
    if (!clienteId) return
    
    setLoading(true)
    setError(null)

    try {
      const [clienteData, cotizacionesData, pedidosData] = await Promise.all([
        obtenerPersonaPorId(clienteId),
        obtenerCotizacionesPorCliente(clienteId),
        obtenerPedidosPorCliente(clienteId)
      ])

      setCliente(clienteData)
      setCotizaciones(cotizacionesData)
      setPedidos(pedidosData)
    } catch (error: any) {
      setError(error.message || 'Error al cargar la información del cliente')
    } finally {
      setLoading(false)
    }
  }, [clienteId])

  // Calcular estadísticas
  const stats: ClienteStats = {
    totalCotizaciones: cotizaciones.length,
    totalPedidos: pedidos.length,
    pedidosEntregados: pedidos.filter(p => 
      p.estado_pedido?.est_ped_tipo_int === 6 // RECIBIDO
    ).length,
    valorTotal: [
      // Valor de pedidos entregados
      ...pedidos
        .filter(p => p.estado_pedido?.est_ped_tipo_int === 6)
        .map(p => {
          if (!p.cotizacion?.detalle_cotizacion) return 0
          const { total } = calcularTotalCotizacion(
            p.cotizacion.detalle_cotizacion.map(d => ({
              cantidad: d.det_cot_cant_int,
              precio: d.det_cot_prec_hist_int
            })),
            p.cotizacion.cot_igv_bol
          )
          return total
        }),
      // Valor de cotizaciones sin pedido (potencial)
      ...cotizaciones
        .filter(c => !pedidos.some(p => p.cot_id_int === c.cot_id_int))
        .map(c => {
          if (!c.detalle_cotizacion) return 0
          const { total } = calcularTotalCotizacion(
            c.detalle_cotizacion.map(d => ({
              cantidad: d.det_cot_cant_int,
              precio: d.det_cot_prec_hist_int
            })),
            c.cot_igv_bol
          )
          return total
        })
    ].reduce((sum, value) => sum + value, 0)
  }

  return {
    cliente,
    cotizaciones,
    pedidos,
    loading,
    error,
    stats,
    loadClienteDetalle
  }
}
