'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { PenLine, Plus, Trash2, User } from 'lucide-react'
import Image from 'next/image'
import type { FirmasSectionProps, FirmaDocumentoUI } from '../types'

interface FirmasSectionPropsExtended extends FirmasSectionProps {
  firmasDisponibles: FirmaDocumentoUI[]
}

export function FirmasSection({
  firmasAsignadas,
  firmasDisponibles,
  onAgregarFirma,
  onRemoverFirma,
  disabled = false
}: FirmasSectionPropsExtended) {
  const [firmaSeleccionada, setFirmaSeleccionada] = useState<string>('')
  const [firmaAEliminar, setFirmaAEliminar] = useState<FirmaDocumentoUI | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  // Filtrar firmas disponibles que aún no están asignadas
  const firmasNoAsignadas = firmasDisponibles.filter(
    fd => !firmasAsignadas.some(fa => fa.firmaId === fd.firmaId)
  )

  const handleAgregar = () => {
    if (firmaSeleccionada) {
      onAgregarFirma(firmaSeleccionada)
      setFirmaSeleccionada('')
    }
  }

  const handleConfirmarEliminar = () => {
    if (firmaAEliminar) {
      onRemoverFirma(firmaAEliminar.id)
      setFirmaAEliminar(null)
    }
    setConfirmDialogOpen(false)
  }

  const handleEliminar = (firma: FirmaDocumentoUI) => {
    setFirmaAEliminar(firma)
    setConfirmDialogOpen(true)
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <PenLine className="h-5 w-5 text-primary" />
            Firmas del Documento ({firmasAsignadas.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selector para agregar firma */}
        {!disabled && (
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Select
                value={firmaSeleccionada}
                onValueChange={setFirmaSeleccionada}
                disabled={firmasNoAsignadas.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    firmasNoAsignadas.length === 0 
                      ? 'No hay más firmas disponibles' 
                      : 'Seleccionar firma...'
                  } />
                </SelectTrigger>
                <SelectContent>
                  {firmasNoAsignadas.map(firma => (
                    <SelectItem key={firma.firmaId} value={firma.firmaId}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{firma.nombre}</span>
                        {firma.cargo && (
                          <span className="text-muted-foreground text-xs">
                            — {firma.cargo}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleAgregar} 
              disabled={!firmaSeleccionada}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>
        )}

        {/* Lista de firmas asignadas */}
        {firmasAsignadas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <PenLine className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No hay firmas asignadas</p>
            <p className="text-sm">Agregue las firmas que aparecerán en el documento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {firmasAsignadas.map(firma => (
              <div
                key={firma.id}
                className="relative border rounded-lg p-4 bg-card hover:shadow-sm transition-shadow"
              >
                {/* Imagen de la firma */}
                <div className="h-20 flex items-center justify-center mb-3 bg-muted/30 rounded">
                  {firma.imagenUrl ? (
                    <Image
                      src={firma.imagenUrl}
                      alt={`Firma de ${firma.nombre}`}
                      width={150}
                      height={60}
                      className="max-h-16 w-auto object-contain"
                    />
                  ) : (
                    <PenLine className="h-8 w-8 text-muted-foreground/50" />
                  )}
                </div>
                
                {/* Datos de la firma */}
                <div className="text-center">
                  <p className="font-medium text-sm">{firma.nombre}</p>
                  {firma.cargo && (
                    <p className="text-xs text-muted-foreground">{firma.cargo}</p>
                  )}
                </div>
                
                {/* Botón eliminar */}
                {!disabled && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleEliminar(firma)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar firma?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción removerá la firma de <strong>{firmaAEliminar?.nombre}</strong> del documento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmarEliminar}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
