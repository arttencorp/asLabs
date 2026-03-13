"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, RefreshCw, Search, Plus } from "lucide-react"
import { useState } from "react"

// Importar todos los componentes y hooks organizados
import {
  useFirmas,
  FirmaHeader,
  FirmaStats,
  FirmaTable,
  FirmaDialog,
} from "@/components/admin/firma"
import type { FirmaDatabase } from '@/components/admin/firma/types'

export default function FirmasPage() {
  const {
    // Estados
    firmas,
    loading,
    mounted,
    error,
    success,
    firmaForm,
    editingFirma,
    isDialogOpen,
    stats,
    uploadLoading,

    // Acciones
    setFirmaForm,
    setError,
    setIsDialogOpen,
    loadData,
    handleCreateFirma,
    handleUpdateFirma,
    handleDeleteFirma,
    openEditDialog,
    openCreateDialog,
    resetForm,
    handleUploadImage
  } = useFirmas()

  // Estado local para búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar firmas según término de búsqueda
  const filteredFirmas = firmas.filter((firma: FirmaDatabase) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      (firma.firm_nomb_vac?.toLowerCase().includes(searchLower) || false) ||
      (firma.firm_cargo_vac?.toLowerCase().includes(searchLower) || false)
    )
  })

  const handleSubmit = () => {
    if (editingFirma) {
      handleUpdateFirma()
    } else {
      handleCreateFirma()
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
      <FirmaHeader />

      {/* Stats Cards */}
      <FirmaStats stats={stats} />

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Catálogo de Firmas</CardTitle>
              <CardDescription>
                Administra las firmas que se utilizarán en los documentos de laboratorio
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
              <Button className="text-white" onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Firma
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
                placeholder="Buscar por nombre o cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabla de firmas */}
          <FirmaTable
            firmas={filteredFirmas}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={handleDeleteFirma}
          />
        </CardContent>
      </Card>

      {/* Dialog para crear/editar firma */}
      <FirmaDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        firmaForm={firmaForm}
        setFirmaForm={setFirmaForm}
        editingFirma={editingFirma}
        loading={loading}
        uploadLoading={uploadLoading}
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
