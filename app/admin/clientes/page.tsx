"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    Users,
    Loader2,
    RefreshCw,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    type Cliente,
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
} from "@/lib/supabase"

export default function ClientesPage() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Estados para formularios
    const [clienteForm, setClienteForm] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        direccion: "",
    })

    const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)

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
            const clientesData = await obtenerClientes()
            setClientes(clientesData)
            if (mounted) {
                showSuccess(`Datos cargados: ${clientesData.length} clientes`)
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
            console.error("Error creando cliente:", error)
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
            console.error("Error actualizando cliente:", error)
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
            console.error("Error eliminando cliente:", error)
            setError(error.message || "Error al eliminar el cliente")
        } finally {
            setLoading(false)
        }
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Clientes</h1>
                <p className="text-gray-600">Administra la información de los clientes de AS Laboratorios</p>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                                <p className="text-2xl font-bold text-gray-900">{clientes.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
                                <p className="text-2xl font-bold text-gray-900">{clientes.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-purple-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Nuevos este mes</p>
                                <p className="text-2xl font-bold text-gray-900">-</p>
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
                            <CardTitle>Lista de Clientes</CardTitle>
                            <CardDescription>Administra la información de todos los clientes</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={loadData} disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                )}
                                {loading ? "Cargando..." : "Actualizar"}
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
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