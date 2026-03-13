'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  usePuestos,
  PuestoFormDialog,
  PuestosTable,
  PuestosStats,
  type PuestoForm
} from '@/components/admin/convocatorias'

export default function ConvocatoriasPage() {
  const {
    items: puestos,
    estadoPuestoOptions,
    modalidadOptions,
    loading,
    error,
    success,
    editingItem,
    isDialogOpen,
    setIsDialogOpen,
    setEditingItem,
    handleCreateWithForm,
    handleUpdateWithForm,
    handleDelete,
    handleToggleEstado,
  } = usePuestos()

  const openEditDialog = (puesto: any) => {
    setEditingItem(puesto)
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingItem(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = (formData: PuestoForm) => {
    if (editingItem) {
      handleUpdateWithForm(formData)
    } else {
      handleCreateWithForm(formData)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Convocatorias</h1>
          <p className="text-gray-600">Gestiona los puestos de trabajo publicados</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Puesto
        </Button>
      </div>

      {/* Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Stats */}
      <PuestosStats puestos={puestos} />

      {/* Table */}
      <PuestosTable
        puestos={puestos}
        loading={loading}
        onEdit={openEditDialog}
        onDelete={handleDelete}
        onToggleEstado={handleToggleEstado}
      />

      {/* Dialog */}
      <PuestoFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        editingPuesto={editingItem}
        estadoOptions={estadoPuestoOptions}
        modalidadOptions={modalidadOptions}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  )
}
