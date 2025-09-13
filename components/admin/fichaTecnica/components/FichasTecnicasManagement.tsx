"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, CheckCircle, AlertCircle, FileText } from "lucide-react"
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
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Fichas Técnicas</h1>
          <p className="text-gray-600 mt-1">
            Administra las fichas técnicas de los productos con sus respectivas imágenes
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nueva Ficha Técnica
        </Button>
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
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fichas Técnicas
          </CardTitle>
          <CardDescription>
            Lista de todas las fichas técnicas registradas en el sistema
          </CardDescription>
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