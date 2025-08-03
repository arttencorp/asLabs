"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usePedidos } from "@/components/admin/pedidos/hooks/usePedidos"
import { PedidosList } from "@/components/admin/pedidos/components/pedidosList"
import { PedidoFormDialog } from "@/components/admin/pedidos/components/pedidosForm"
import { formatCurrency } from "@/components/admin/pedidos/utils"
import type { Pedido } from "@/components/admin/pedidos/types"

export default function PedidosPage() {
  const {
    pedidos,
    cotizaciones,
    estadosPedido,
    loading,
    error,
    success,
    createPedido,
    updatePedido,
    deletePedido,
    loadData,
    setError
  } = usePedidos()

  const [showForm, setShowForm] = useState(false)
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)

  const handleCreatePedido = async (pedidoForm: any) => {
    try {
      await createPedido(pedidoForm)
      setShowForm(false)
    } catch (error: any) {
      setError(error.message || "Error al crear el pedido")
    }
  }

  const handleUpdatePedido = async (pedidoForm: any) => {
    if (!editingPedido) return
    
    try {
      await updatePedido(editingPedido.ped_id_int, pedidoForm)
      setEditingPedido(null)
      setShowForm(false)
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

  // Calcular estadísticas
  const stats = {
    totalPedidos: pedidos.length,
    pedidosPendientes: pedidos.filter(p => 
      p.estado_pedido && ![5, 6].includes(p.estado_pedido.est_ped_tipo_int)
    ).length, // No entregados ni cancelados
    pedidosEntregados: pedidos.filter(p => 
      p.estado_pedido?.est_ped_tipo_int === 5
    ).length, // Entregados
    pedidosCancelados: pedidos.filter(p => 
      p.estado_pedido?.est_ped_tipo_int === 6
    ).length, // Cancelados
    ingresoTotal: pedidos
      .filter(p => p.estado_pedido?.est_ped_tipo_int === 5) // Solo entregados
      .reduce((sum, p) => {
        const total = p.cotizacion?.detalle_cotizacion?.reduce(
          (detSum, detalle) => detSum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int),
          0
        ) || 0
        return sum + (p.cotizacion?.cot_igv_bol ? total * 1.18 : total)
      }, 0)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pedidos</h1>
          <p className="text-gray-600">Administra todos los pedidos de AS Laboratorios</p>
        </div>
        <Button onClick={() => setShowForm(true)} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Pedido
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPedidos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pedidosPendientes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Entregados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pedidosEntregados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pedidosCancelados}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.ingresoTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Pedidos */}
      <PedidosList
        pedidos={pedidos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={deletePedido}
        onRefresh={loadData}
      />

      {/* Formulario Modal */}
      <PedidoFormDialog
        open={showForm}
        onClose={handleCloseForm}
        onSubmit={editingPedido ? handleUpdatePedido : handleCreatePedido}
        pedido={editingPedido}
        cotizaciones={cotizaciones}
        estadosPedido={estadosPedido}
        loading={loading}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Procesando...</span>
          </div>
        </div>
      )}
    </div>
  )
}