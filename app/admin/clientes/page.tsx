"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, RefreshCw, Search, Plus } from "lucide-react"
import { useState } from "react"

// Importar todos los componentes y hooks organizados
import {
  useClientes,
  ClientesHeader,
  ClientesStats,
  ClientesTable,
  ClienteDialog,
} from "@/components/admin/clientes"
import type { ClientePersona } from '@/types/database'

export default function ClientesPage() {
  const {
    // Estados
    clientes,
    loading,
    mounted,
    error,
    success,
    clienteForm,
    editingCliente,
    isDialogOpen,
    stats,

    // Acciones
    setClienteForm,
    setError,
    setIsDialogOpen,
    loadData,
    handleCreateCliente,
    handleUpdateCliente,
    handleDeleteCliente,
    openEditDialog,
    openCreateDialog,
    resetForm
  } = useClientes()

  // Estado local para búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar clientes según término de búsqueda
  const filteredClientes = clientes.filter((cliente: ClientePersona) => {
    const searchLower = searchTerm.toLowerCase()
    const nombreCompleto = cliente.tipo === 'natural' && cliente.persona_natural
      ? `${cliente.persona_natural.per_nat_nomb_vac} ${cliente.persona_natural.per_nat_apell_vac}`
      : cliente.persona_juridica?.per_jurd_razSocial_vac || ''

    return (
      nombreCompleto.toLowerCase().includes(searchLower) ||
      (cliente.per_nom_contac_vac?.toLowerCase().includes(searchLower) || false) ||
      (cliente.per_email_vac?.toLowerCase().includes(searchLower) || false) ||
      (cliente.per_cultivo_vac?.toLowerCase().includes(searchLower) || false) ||
      (cliente.persona_natural?.per_nat_dni_int?.toString().includes(searchTerm)) ||
      (cliente.persona_juridica?.per_jurd_ruc_int?.toString().includes(searchTerm))
    )
  })

  const handleSubmit = () => {
    if (editingCliente) {
      handleUpdateCliente()
    } else {
      handleCreateCliente()
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    resetForm()
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
      <ClientesHeader />

      {/* Stats Cards */}
      <ClientesStats stats={stats} />

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>
                Administra la información de personas naturales y jurídicas
              </CardDescription>
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
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Barra de búsqueda */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, email, documento, cultivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabla de clientes */}
          <ClientesTable
            clientes={filteredClientes}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={handleDeleteCliente}
          />
        </CardContent>
      </Card>

      {/* Dialog para crear/editar cliente */}
      <ClienteDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        clienteForm={clienteForm}
        setClienteForm={setClienteForm}
        editingCliente={editingCliente}
        loading={loading}
        onSubmit={handleSubmit}
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