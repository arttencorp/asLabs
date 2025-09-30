"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle, AlertCircle, FileText, RefreshCw } from "lucide-react"
import { FichaTecnicaFormDialog } from './FichaTecnicaFormDialog'
import { FichasTecnicasTable } from './FichasTecnicasTable'
import { FichasTecnicasStats } from './FichasTecnicasStats'
import { useFichasTecnicas } from '../hooks/useFichasTecnicas'
import type { FichaTecnicaForm } from '../types'

export function FichasTecnicasManagement() {
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
    handleCreateWithForm,
    handleUpdateWithForm,
    handleDelete,
    handleUploadImage,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    setError
  } = useFichasTecnicas()

  const handleFormSubmit = async (formData: FichaTecnicaForm & { selectedFile?: File }) => {
    try {
      let imageUrl = formData.fit_tec_imag_vac

      // Si hay un archivo seleccionado, subirlo primero
      if (formData.selectedFile) {
        const uploadedUrl = await handleUploadImage(
          formData.selectedFile, 
          formData.selectedFile.name
        )
        if (!uploadedUrl) {
          return // El error ya se maneja en handleUploadImage
        }
        imageUrl = uploadedUrl
      }

      // Preparar datos finales
      const finalData: FichaTecnicaForm = {
        fit_tec_nom_planta_vac: formData.fit_tec_nom_planta_vac,
        fit_tec_cod_vac: formData.fit_tec_cod_vac,
        pro_id_int: formData.pro_id_int,
        fit_tec_imag_vac: imageUrl
      }

      // Crear o actualizar
      if (editingItem) {
        await handleUpdateWithForm(finalData)
      } else {
        await handleCreateWithForm(finalData)
      }
    } catch (error: any) {
      setError(error.message || 'Error al procesar la ficha técnica')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gestión de Fichas Técnicas</h1>
          <p className="text-gray-600">
            Administra las fichas técnicas de los productos con sus respectivas imágenes
          </p>
        </div> 
      </div>

      {/* Alertas */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      <FichasTecnicasStats stats={stats} />

      {/* Tabla principal */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              Fichas Técnicas
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" disabled={loading} onClick={loadData}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
              <Button onClick={openCreateDialog} disabled={loading} className="text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Ficha Técnica
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FichasTecnicasTable
            fichasTecnicas={items}
            loading={loading}
            onEdit={openEditDialog}
            onDelete={handleDelete}
            productos={productos}
          />
        </CardContent>
      </Card>

      {/* Diálogo de formulario */}
      <FichaTecnicaFormDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        editingFichaTecnica={editingItem}
        onSubmit={handleFormSubmit}
        loading={loading || uploadLoading}
        error={error}
        productos={productos}
        productosLoading={productosLoading}
      />
    </div>
  )
}