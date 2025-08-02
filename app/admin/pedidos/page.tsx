"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Package, Search, Loader2, RefreshCw, } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ESTADOS_PEDIDO, type Cliente, type Pedido, obtenerClientes, obtenerPedidos, crearPedido, actualizarPedido, eliminarPedido,
} from "@/lib/supabase"

export default function PedidosPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Estados para formularios
  const [pedidoForm, setPedidoForm] = useState({
    cliente_id: "",
    productos: "",
    total: "",
    estado: "recibido",
    codigo_rastreo: "",
    notas: "",
  })

  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Cargar datos inicial
  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  // Cargar datos desde Supabase
  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [clientesData, pedidosData] = await Promise.all([obtenerClientes(), obtenerPedidos()])
      setClientes(clientesData)
      setPedidos(pedidosData)
      if (mounted) {
        showSuccess(`Datos cargados: ${clientesData.length} clientes, ${pedidosData.length} pedidos`)
      }
    } catch (error: any) {
      setError(error.message || "Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  // Función para mostrar mensajes de éxito temporales
  const showSuccess = (message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }

  // Funciones para pedidos
  const handleCreatePedido = async () => {
    if (!pedidoForm.cliente_id || !pedidoForm.productos || !pedidoForm.total) {
      setError("Por favor completa los campos obligatorios: cliente, productos y total")
      return
    }

    if (isNaN(Number(pedidoForm.total)) || Number(pedidoForm.total) <= 0) {
      setError("El total debe ser un número válido mayor a 0")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const nuevoPedido = await crearPedido({
        cliente_id: pedidoForm.cliente_id,
        productos: pedidoForm.productos,
        total: Number(pedidoForm.total),
        estado: pedidoForm.estado,
        codigo_rastreo: pedidoForm.codigo_rastreo,
        notas: pedidoForm.notas,
      })

      if (nuevoPedido) {
        setPedidos([nuevoPedido, ...pedidos])
        setPedidoForm({
          cliente_id: "",
          productos: "",
          total: "",
          estado: "recibido",
          codigo_rastreo: "",
          notas: "",
        })
        showSuccess(
          `Pedido ${nuevoPedido.numero_pedido} creado exitosamente. Código de seguimiento: ${nuevoPedido.codigo_seguimiento}`,
        )
      }
    } catch (error: any) {
      console.error("Error creando pedido:", error)
      setError(error.message || "Error al crear el pedido")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePedido = async () => {
    if (!editingPedido) return

    setLoading(true)
    setError(null)

    try {
      const pedidoActualizado = await actualizarPedido(editingPedido.id, editingPedido)
      if (pedidoActualizado) {
        setPedidos(pedidos.map((p) => (p.id === editingPedido.id ? pedidoActualizado : p)))
        setEditingPedido(null)
        showSuccess(`Pedido ${pedidoActualizado.numero_pedido} actualizado exitosamente`)
      }
    } catch (error: any) {
      console.error("Error actualizando pedido:", error)
      setError(error.message || "Error al actualizar el pedido")
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePedido = async (id: string) => {
    const pedido = pedidos.find((p) => p.id === id)
    if (!pedido) return

    if (!confirm(`¿Estás seguro de eliminar el pedido ${pedido.numero_pedido}?`)) return

    setLoading(true)
    setError(null)

    try {
      await eliminarPedido(id)
      setPedidos(pedidos.filter((p) => p.id !== id))
      showSuccess(`Pedido ${pedido.numero_pedido} eliminado exitosamente`)
    } catch (error: any) {
      console.error("Error eliminando pedido:", error)
      setError(error.message || "Error al eliminar el pedido")
    } finally {
      setLoading(false)
    }
  }

  const getEstadoInfo = (estado: string) => {
    return ESTADOS_PEDIDO.find((e) => e.id === estado) || ESTADOS_PEDIDO[0]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredPedidos = pedidos.filter(
    (pedido) =>
      pedido.numero_pedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.codigo_seguimiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente?.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente?.apellidos.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalPedidos: pedidos.length,
    pedidosPendientes: pedidos.filter((p) => !["entregado", "cancelado"].includes(p.estado)).length,
    pedidosEntregados: pedidos.filter((p) => p.estado === "entregado").length,
    ingresoTotal: pedidos.reduce((sum, p) => sum + p.total, 0),
  }

  if (!mounted) {
    return null
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <Package className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.ingresoTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Pedidos</CardTitle>
              <CardDescription>Administra todos los pedidos del sistema</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Pedido
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Pedido</DialogTitle>
                  <DialogDescription>Completa la información del pedido</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cliente">Cliente *</Label>
                    <Select
                      value={pedidoForm.cliente_id}
                      onValueChange={(value) => setPedidoForm({ ...pedidoForm, cliente_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nombres} {cliente.apellidos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="total">Total (S/) *</Label>
                    <Input
                      id="total"
                      type="number"
                      step="0.01"
                      min="0"
                      value={pedidoForm.total}
                      onChange={(e) => setPedidoForm({ ...pedidoForm, total: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="productos">Productos *</Label>
                    <Textarea
                      id="productos"
                      value={pedidoForm.productos}
                      onChange={(e) => setPedidoForm({ ...pedidoForm, productos: e.target.value })}
                      placeholder="Describe los productos del pedido..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={pedidoForm.estado}
                      onValueChange={(value) => setPedidoForm({ ...pedidoForm, estado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTADOS_PEDIDO.map((estado) => (
                          <SelectItem key={estado.id} value={estado.id}>
                            {estado.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="codigo_rastreo">Código de Rastreo</Label>
                    <Input
                      id="codigo_rastreo"
                      value={pedidoForm.codigo_rastreo}
                      onChange={(e) => setPedidoForm({ ...pedidoForm, codigo_rastreo: e.target.value })}
                      placeholder="TRACK-001-2024"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="notas">Notas</Label>
                    <Textarea
                      id="notas"
                      value={pedidoForm.notas}
                      onChange={(e) => setPedidoForm({ ...pedidoForm, notas: e.target.value })}
                      placeholder="Notas adicionales..."
                      rows={2}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button onClick={handleCreatePedido} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Crear Pedido
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por número, código o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={loadData} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {loading ? "Cargando..." : "Actualizar"}
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Código Seguimiento</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPedidos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {loading ? "Cargando pedidos..." : "No hay pedidos registrados"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell className="font-mono text-sm">{pedido.numero_pedido}</TableCell>
                      <TableCell className="font-mono font-bold text-blue-600">
                        {pedido.codigo_seguimiento}
                      </TableCell>
                      <TableCell>
                        {pedido.cliente?.nombres} {pedido.cliente?.apellidos}
                      </TableCell>
                      <TableCell>{formatCurrency(pedido.total)}</TableCell>
                      <TableCell>
                        <Badge className={getEstadoInfo(pedido.estado).color}>
                          {getEstadoInfo(pedido.estado).nombre}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(pedido.fecha_pedido)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingPedido(pedido)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Editar Pedido</DialogTitle>
                                <DialogDescription>Modifica la información del pedido</DialogDescription>
                              </DialogHeader>
                              {editingPedido && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Número de Pedido</Label>
                                    <Input value={editingPedido.numero_pedido} disabled />
                                  </div>
                                  <div>
                                    <Label>Código de Seguimiento</Label>
                                    <Input
                                      value={editingPedido.codigo_seguimiento}
                                      disabled
                                      className="font-mono font-bold"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-cliente">Cliente</Label>
                                    <Select
                                      value={editingPedido.cliente_id}
                                      onValueChange={(value) => {
                                        const cliente = clientes.find((c) => c.id === value)
                                        setEditingPedido({ ...editingPedido, cliente_id: value, cliente })
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {clientes.map((cliente) => (
                                          <SelectItem key={cliente.id} value={cliente.id}>
                                            {cliente.nombres} {cliente.apellidos}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-total">Total (S/)</Label>
                                    <Input
                                      id="edit-total"
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={editingPedido.total}
                                      onChange={(e) =>
                                        setEditingPedido({
                                          ...editingPedido,
                                          total: Number(e.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Label htmlFor="edit-productos">Productos</Label>
                                    <Textarea
                                      id="edit-productos"
                                      value={editingPedido.productos}
                                      onChange={(e) =>
                                        setEditingPedido({ ...editingPedido, productos: e.target.value })
                                      }
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-estado">Estado</Label>
                                    <Select
                                      value={editingPedido.estado}
                                      onValueChange={(value) =>
                                        setEditingPedido({ ...editingPedido, estado: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {ESTADOS_PEDIDO.map((estado) => (
                                          <SelectItem key={estado.id} value={estado.id}>
                                            {estado.nombre}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-codigo-rastreo">Código de Rastreo</Label>
                                    <Input
                                      id="edit-codigo-rastreo"
                                      value={editingPedido.codigo_rastreo || ""}
                                      onChange={(e) =>
                                        setEditingPedido({ ...editingPedido, codigo_rastreo: e.target.value })
                                      }
                                      placeholder="TRACK-001-2024"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <Label htmlFor="edit-notas">Notas</Label>
                                    <Textarea
                                      id="edit-notas"
                                      value={editingPedido.notas || ""}
                                      onChange={(e) =>
                                        setEditingPedido({ ...editingPedido, notas: e.target.value })
                                      }
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex justify-end gap-2 mt-4">
                                <Button onClick={handleUpdatePedido} disabled={loading}>
                                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                  Guardar Cambios
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePedido(pedido.id)}
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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