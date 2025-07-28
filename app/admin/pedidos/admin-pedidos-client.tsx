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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Search,
  Lock,
  User,
  Loader2,
  AlertCircle,
  CheckCircle,
  Settings,
  RefreshCw,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ESTADOS_PEDIDO,
  type Cliente,
  type Pedido,
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  obtenerPedidos,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
  crearDatosPrueba,
  verificarConfiguracion,
} from "@/lib/supabase"

interface ConfiguracionStatus {
  configurado: boolean
  conectado: boolean
  error?: string
}

export default function AdminPedidosClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [configStatus, setConfigStatus] = useState<ConfiguracionStatus>({
    configurado: false,
    conectado: false,
  })

  // Estados para formularios
  const [clienteForm, setClienteForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion: "",
  })

  const [pedidoForm, setPedidoForm] = useState({
    cliente_id: "",
    productos: "",
    total: "",
    estado: "recibido",
    codigo_rastreo: "",
    notas: "",
  })

  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Verificar autenticación al cargar
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      initializeApp()
    }
  }, [])

  // Función para verificar configuración
  const checkConfiguration = async () => {
    try {
      const status = await verificarConfiguracion()
      setConfigStatus(status)
      return status
    } catch (error: any) {
      const errorStatus = {
        configurado: false,
        conectado: false,
        error: error.message || "Error desconocido",
      }
      setConfigStatus(errorStatus)
      return errorStatus
    }
  }

  // Función para inicializar la aplicación
  const initializeApp = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("🚀 Inicializando aplicación...")

      // Verificar configuración
      const status = await checkConfiguration()

      if (!status.configurado) {
        setError(status.error || "Configuración de Supabase incompleta")
        return
      }

      if (!status.conectado) {
        setError(status.error || "No se pudo conectar con Supabase")
        return
      }

      // Si todo está bien, cargar datos
      await loadData()
    } catch (error: any) {
      console.error("❌ Error inicializando aplicación:", error)
      setError(error.message || "Error al inicializar la aplicación")
    } finally {
      setLoading(false)
    }
  }

  // Función de login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (loginForm.username === "Antonio041" && loginForm.password === "ASLabs2025") {
      setIsAuthenticated(true)
      localStorage.setItem("admin_authenticated", "true")
      initializeApp()
    } else {
      setLoginError("Usuario o contraseña incorrectos")
    }
  }

  // Función de logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    setLoginForm({ username: "", password: "" })
    setError(null)
    setSuccess(null)
    setConfigStatus({ configurado: false, conectado: false })
  }

  // Cargar datos desde Supabase
  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("📊 Cargando datos...")

      // Crear datos de prueba si no existen
      await crearDatosPrueba()

      // Cargar clientes y pedidos
      const [clientesData, pedidosData] = await Promise.all([obtenerClientes(), obtenerPedidos()])

      setClientes(clientesData)
      setPedidos(pedidosData)
      showSuccess(`Datos cargados: ${clientesData.length} clientes, ${pedidosData.length} pedidos`)
    } catch (error: any) {
      console.error("❌ Error cargando datos:", error)
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

  // Funciones para clientes
  const handleCreateCliente = async () => {
    if (!clienteForm.nombres || !clienteForm.apellidos || !clienteForm.email) {
      setError("Por favor completa los campos obligatorios: nombres, apellidos y email")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const nuevoCliente = await crearCliente(clienteForm)
      if (nuevoCliente) {
        setClientes([nuevoCliente, ...clientes])
        setClienteForm({
          nombres: "",
          apellidos: "",
          email: "",
          telefono: "",
          direccion: "",
        })
        showSuccess(`Cliente "${nuevoCliente.nombres} ${nuevoCliente.apellidos}" creado exitosamente`)
      }
    } catch (error: any) {
      console.error("❌ Error creando cliente:", error)
      setError(error.message || "Error al crear el cliente")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCliente = async () => {
    if (!editingCliente) return

    setLoading(true)
    setError(null)

    try {
      const clienteActualizado = await actualizarCliente(editingCliente.id, editingCliente)
      if (clienteActualizado) {
        setClientes(clientes.map((c) => (c.id === editingCliente.id ? clienteActualizado : c)))
        setEditingCliente(null)
        showSuccess(`Cliente "${clienteActualizado.nombres} ${clienteActualizado.apellidos}" actualizado exitosamente`)
      }
    } catch (error: any) {
      console.error("❌ Error actualizando cliente:", error)
      setError(error.message || "Error al actualizar el cliente")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCliente = async (id: string) => {
    const cliente = clientes.find((c) => c.id === id)
    if (!cliente) return

    if (!confirm(`¿Estás seguro de eliminar al cliente "${cliente.nombres} ${cliente.apellidos}"?`)) return

    setLoading(true)
    setError(null)

    try {
      await eliminarCliente(id)
      setClientes(clientes.filter((c) => c.id !== id))
      showSuccess(`Cliente "${cliente.nombres} ${cliente.apellidos}" eliminado exitosamente`)
    } catch (error: any) {
      console.error("❌ Error eliminando cliente:", error)
      setError(error.message || "Error al eliminar el cliente")
    } finally {
      setLoading(false)
    }
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
      console.error("❌ Error creando pedido:", error)
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
      console.error("❌ Error actualizando pedido:", error)
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
      console.error("❌ Error eliminando pedido:", error)
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

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Panel de Administración</CardTitle>
              <CardDescription className="text-gray-600">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Usuario
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="username"
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      placeholder="Ingresa tu usuario"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="Ingresa tu contraseña"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                {loginError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium"
                >
                  Iniciar Sesión
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 text-center">
                  <p className="mb-2">Credenciales de prueba:</p>
                  <p>
                    <strong>Usuario:</strong> Antonio041
                  </p>
                  <p>
                    <strong>Contraseña:</strong> ASLabs2025
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600 mb-3">Gestiona clientes y pedidos de AS Laboratorios</p>

            {/* Status de configuración */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    configStatus.conectado ? "bg-green-500" : configStatus.configurado ? "bg-yellow-500" : "bg-red-500"
                  }`}
                />
                <span className="text-gray-600">
                  {configStatus.conectado
                    ? "✅ Conectado a Supabase"
                    : configStatus.configurado
                      ? "⚠️ Configurado pero sin conexión"
                      : "❌ No configurado"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={checkConfiguration}
                disabled={loading}
                className="h-6 px-2 text-xs"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${loading ? "animate-spin" : ""}`} />
                Verificar
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={initializeApp}
              disabled={loading}
              className="flex items-center gap-2 bg-transparent"
            >
              <Settings className="h-4 w-4" />
              {loading ? "Inicializando..." : "Reinicializar"}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
              <Lock className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium mb-1">Error:</div>
              <div>{error}</div>
              {!configStatus.configurado && (
                <div className="mt-2 text-sm">
                  <p className="font-medium">Para configurar Supabase:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Crea un proyecto en supabase.com</li>
                    <li>Ve a Settings → API</li>
                    <li>Copia la URL y la clave anónima</li>
                    <li>Configura las variables de entorno:</li>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>NEXT_PUBLIC_SUPABASE_URL</li>
                      <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                    </ul>
                    <li>Ejecuta el script SQL para crear las tablas</li>
                  </ol>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Procesando...</span>
            </div>
          </div>
        )}

        {/* Solo mostrar el contenido si está conectado */}
        {configStatus.conectado ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <Tabs defaultValue="pedidos" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
                <TabsTrigger value="clientes">Clientes</TabsTrigger>
                <TabsTrigger value="cotizacion">Cotizaciones</TabsTrigger>
              </TabsList>

              {/* Pedidos Tab */}
              <TabsContent value="pedidos" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Gestión de Pedidos</CardTitle>
                        <CardDescription>Administra todos los pedidos del sistema</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button disabled={!configStatus.conectado}>
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
              </TabsContent>

              {/* Clientes Tab */}
              <TabsContent value="clientes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Gestión de Clientes</CardTitle>
                        <CardDescription>Administra la información de los clientes</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button disabled={!configStatus.conectado}>
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Cliente
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Crear Nuevo Cliente</DialogTitle>
                            <DialogDescription>Completa la información del cliente</DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="nombres">Nombres *</Label>
                              <Input
                                id="nombres"
                                value={clienteForm.nombres}
                                onChange={(e) => setClienteForm({ ...clienteForm, nombres: e.target.value })}
                                placeholder="María Elena"
                              />
                            </div>
                            <div>
                              <Label htmlFor="apellidos">Apellidos *</Label>
                              <Input
                                id="apellidos"
                                value={clienteForm.apellidos}
                                onChange={(e) => setClienteForm({ ...clienteForm, apellidos: e.target.value })}
                                placeholder="García López"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={clienteForm.email}
                                onChange={(e) => setClienteForm({ ...clienteForm, email: e.target.value })}
                                placeholder="maria@email.com"
                              />
                            </div>
                            <div>
                              <Label htmlFor="telefono">Teléfono</Label>
                              <Input
                                id="telefono"
                                value={clienteForm.telefono}
                                onChange={(e) => setClienteForm({ ...clienteForm, telefono: e.target.value })}
                                placeholder="+51 987 654 321"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="direccion">Dirección</Label>
                              <Textarea
                                id="direccion"
                                value={clienteForm.direccion}
                                onChange={(e) => setClienteForm({ ...clienteForm, direccion: e.target.value })}
                                placeholder="Av. Universitaria 1801, San Martín de Porres, Lima"
                                rows={2}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={handleCreateCliente} disabled={loading}>
                              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                              Crear Cliente
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre Completo</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Dirección</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clientes.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                {loading ? "Cargando clientes..." : "No hay clientes registrados"}
                              </TableCell>
                            </TableRow>
                          ) : (
                            clientes.map((cliente) => (
                              <TableRow key={cliente.id}>
                                <TableCell className="font-medium">
                                  {cliente.nombres} {cliente.apellidos}
                                </TableCell>
                                <TableCell>{cliente.email}</TableCell>
                                <TableCell>{cliente.telefono}</TableCell>
                                <TableCell className="max-w-xs truncate">{cliente.direccion}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setEditingCliente(cliente)}>
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Editar Cliente</DialogTitle>
                                          <DialogDescription>Modifica la información del cliente</DialogDescription>
                                        </DialogHeader>
                                        {editingCliente && (
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <Label htmlFor="edit-nombres">Nombres</Label>
                                              <Input
                                                id="edit-nombres"
                                                value={editingCliente.nombres}
                                                onChange={(e) =>
                                                  setEditingCliente({ ...editingCliente, nombres: e.target.value })
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="edit-apellidos">Apellidos</Label>
                                              <Input
                                                id="edit-apellidos"
                                                value={editingCliente.apellidos}
                                                onChange={(e) =>
                                                  setEditingCliente({ ...editingCliente, apellidos: e.target.value })
                                                }
                                              />
                                            </div>
                                            <div className="col-span-2">
                                              <Label htmlFor="edit-email">Email</Label>
                                              <Input
                                                id="edit-email"
                                                type="email"
                                                value={editingCliente.email}
                                                onChange={(e) =>
                                                  setEditingCliente({ ...editingCliente, email: e.target.value })
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="edit-telefono">Teléfono</Label>
                                              <Input
                                                id="edit-telefono"
                                                value={editingCliente.telefono}
                                                onChange={(e) =>
                                                  setEditingCliente({ ...editingCliente, telefono: e.target.value })
                                                }
                                              />
                                            </div>
                                            <div className="col-span-2">
                                              <Label htmlFor="edit-direccion">Dirección</Label>
                                              <Textarea
                                                id="edit-direccion"
                                                value={editingCliente.direccion}
                                                onChange={(e) =>
                                                  setEditingCliente({ ...editingCliente, direccion: e.target.value })
                                                }
                                                rows={2}
                                              />
                                            </div>
                                          </div>
                                        )}
                                        <div className="flex justify-end gap-2 mt-4">
                                          <Button onClick={handleUpdateCliente} disabled={loading}>
                                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                            Guardar Cambios
                                          </Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeleteCliente(cliente.id)}
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
              </TabsContent>

              <TabsContent value="cotizacion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Gestión de Cotizaciones</CardTitle>
                        <CardDescription>Administra las cotizaciones de los clientes</CardDescription>
                      </div>
                      <Dialog> 
                      </Dialog>
                    </div>
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Configuración Requerida</h3>
              <p className="text-gray-500 mb-4">Configura Supabase para usar el sistema de administración</p>
              <Button onClick={checkConfiguration} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Verificar Configuración
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
