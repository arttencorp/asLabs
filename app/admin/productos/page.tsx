'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import {
  useProductos,
  ProductoFormDialog,
  ProductosTable,
  ProductosStats,
  type ProductoForm
} from '@/components/admin/productos'

export default function ProductosPage() {
  const {
    items: productos,
    loading,
    error,
    success,
    editingItem,
    isDialogOpen,
    setIsDialogOpen,
    setEditingItem,
    handleCreateWithForm,
    handleUpdateWithForm,
  } = useProductos()

  const openEditDialog = (producto: any) => {
    setEditingItem(producto)
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingItem(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = (formData: ProductoForm) => {
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
        <p className="text-gray-600">Administra el catálogo de productos de laboratorio</p>
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
      <ProductosStats productos={productos} />

      {/* Products Table */}
      <ProductosTable
        productos={productos}
        loading={loading}
        onEdit={openEditDialog}
        onDelete={() => {}} // Eliminar deshabilitado según requerimientos
        onCreate={openCreateDialog}
        onRefresh={() => {}} // Añadir función de refresh si es necesaria
      />

      {/* Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ProductoFormDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          editingProducto={editingItem}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Dialog>
    </div>
  )
}