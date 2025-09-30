"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Loader2, Plus, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usePedidos } from "@/components/admin/pedidos/hooks/usePedidos"
import { PedidosList } from "@/components/admin/pedidos/components/pedidosList"
import { PedidoFormDialog } from "@/components/admin/pedidos/components/pedidosForm"
import { CotizacionViewDialog } from "@/components/admin/pedidos/components/cotizacionViewDialog"
import { PedidosStats } from "@/components/admin/pedidos/components/PedidosStats"
import { formatCurrency } from "@/utils/index"
import { crearPedido, actualizarPedido } from "@/lib/supabase"
import type { Pedido } from "@/components/admin/pedidos/types"

export default function PedidosPage() {
  const {
    pedidos,
    cotizaciones,
    cotizacionesDisponibles,
    estadosPedido,
    loading,
    error,
    success,
    deletePedido,
    loadData,
    setError,
    showSuccess,
    getCotizacionesParaFormulario
  } = usePedidos()

  const [showForm, setShowForm] = useState(false)
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)
  const [showCotizacion, setShowCotizacion] = useState(false)
  const [selectedCotizacion, setSelectedCotizacion] = useState<any>(null) 

  const handleViewCotizacion = (pedido: Pedido) => {
    if (pedido.cotizacion) {
      setSelectedCotizacion(pedido.cotizacion)
      setShowCotizacion(true)
    }
  }

  const handleCreatePedido = async (pedidoForm: any) => {
    try {
      // Solo quitar estado_id, dejar que crearPedido maneje las validaciones
      const { estado_id, ...pedidoData } = pedidoForm
      await crearPedido(pedidoData)
      setShowForm(false)
      await loadData() // Recargar datos
      showSuccess('Pedido creado exitosamente')
    } catch (error: any) {
      setError(error.message || "Error al crear el pedido")
    }
  }

  const handleUpdatePedido = async (pedidoForm: any) => {
    if (!editingPedido) return

    try {
      await actualizarPedido(editingPedido.ped_id_int, pedidoForm)
      setEditingPedido(null)
      setShowForm(false)
      await loadData() // Recargar datos
      showSuccess('Pedido actualizado exitosamente')
    } catch (error: any) {
      setError(error.message || "Error al actualizar el pedido")
    }
  }

  const handleEdit = (pedido: Pedido) => {
    setEditingPedido(pedido)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPedido(null)
  }

  return (
    <div className="space-y-6">
      {/* Mensajes de estado */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pedidos</h1>
        <p className="text-gray-600">Administra todos los pedidos de AS Laboratorios</p>
      </div>

      {/* Estadísticas */}
      <PedidosStats pedidos={pedidos} loading={loading} />

      {/* Lista de Pedidos */}
      <PedidosList
        pedidos={pedidos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deletePedido}
        onRefresh={loadData}
        onViewCotizacion={handleViewCotizacion}
        onCreate={() => setShowForm(true)}
      />

      {/* Formulario Modal */}
      <PedidoFormDialog
        open={showForm}
        onClose={handleCloseForm}
        onSubmit={editingPedido ? handleUpdatePedido : handleCreatePedido}
        pedido={editingPedido}
        cotizaciones={getCotizacionesParaFormulario(editingPedido)}
        estadosPedido={estadosPedido}
        loading={loading}
      />

      {/* Modal para ver cotización */}
      <CotizacionViewDialog
        open={showCotizacion}
        onClose={() => {
          setShowCotizacion(false)
          setSelectedCotizacion(null)
        }}
        cotizacion={selectedCotizacion} 
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-gray-900" />
            <span className="text-gray-900 font-medium">Procesando...</span>
          </div>
        </div>
      )}
    </div>
  )
}