"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Plus, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle2,
  FileText
} from "lucide-react"
import { useCertificadosCalidad } from '../hooks/useCertificadosCalidad'
import { CertificadosCalidadStatsComponent as CertificadosCalidadStats } from './CertificadosCalidadStats'
import { CertificadosCalidadTable } from './CertificadosCalidadTable'
import { CertificadoCalidadFormDialog } from './CertificadoCalidadFormDialog'

export function CertificadosCalidadManagement() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const {
    // Estado
    items,
    productos,
    loading,
    productosLoading,
    uploadLoading,
    error,
    success,
    editingItem,
    isDialogOpen,
    stats,
    
    // Acciones
    loadData,
    handleSubmit,
    handleDelete,
    updateEditingItem,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    setError
  } = useCertificadosCalidad()

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await handleDelete(deletingId)
      setShowDeleteAlert(false)
      setDeletingId(null)
    }
  }

  const handleDeleteClick = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este certificado de calidad?')) {
      await handleDelete(id)
    }
  }

  const handleEditClick = (certificado: any) => {
    openEditDialog(certificado)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificados de Calidad</h1>
          <p className="text-muted-foreground">
            Gestiona los certificados de calidad de los productos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={loadData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button onClick={openCreateDialog} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Certificado
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      <CertificadosCalidadStats 
        stats={stats}
        loading={loading}
      />

      {/* Contenido Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Lista de Certificados
          </CardTitle>
          <CardDescription>
            Gestiona todos los certificados de calidad del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertificadosCalidadTable
            certificados={items}
            loading={loading}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            productos={productos}
          />
        </CardContent>
      </Card>

      {/* Diálogo de Formulario */}
      <CertificadoCalidadFormDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog()
        }}
        certificado={editingItem}
        onSubmit={handleSubmit}
        onUpdateEditingItem={updateEditingItem}
        loading={loading || uploadLoading}
        productos={productos}
      />

      {/* Diálogo de Confirmación de Eliminación */}
      {showDeleteAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Confirmar Eliminación</CardTitle>
              <CardDescription>
                ¿Estás seguro de que deseas eliminar este certificado de calidad? 
                Esta acción no se puede deshacer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteAlert(false)
                    setDeletingId(null)
                  }}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirmDelete}
                  disabled={loading}
                >
                  {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}