'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { PuestosTableProps } from '../types'
import { obtenerEstadoPuesto } from '../utils'

export function PuestosTable({ puestos, loading, onEdit, onDelete, onToggleEstado }: PuestosTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    )
  }

  if (puestos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay puestos registrados. Crea el primero.
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[25%]">Puesto</TableHead>
              <TableHead className="w-[25%]">Descripción</TableHead>
              <TableHead className="w-[15%] text-center">Modalidad</TableHead>
              <TableHead className="w-[15%] text-center">Estado</TableHead>
              <TableHead className="w-[20%] text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {puestos.map((puesto) => {
              const estado = obtenerEstadoPuesto(puesto.Estado_Puesto?.estpuest_nom_vac)
              return (
                <TableRow key={puesto.puest_id_int}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{puesto.puest_nom_vac || 'Sin nombre'}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(puesto.puest_created_at_dt), "dd MMM yyyy", { locale: es })}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {puesto.puest_dec_vac || 'Sin descripción'}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {puesto.modalidad_trabajo?.modalid_nom_vac || 'Sin modalidad'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`text-xs font-medium ${estado.color}`}>
                      {estado.texto}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(puesto)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(puesto.puest_id_int)}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-150"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-red-700">Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 text-sm">
            ¿Estás seguro de que deseas eliminar este puesto? Se eliminarán también todos los datos
            de postulantes asociados. Esta acción no se puede deshacer.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteConfirm) {
                  onDelete(deleteConfirm)
                  setDeleteConfirm(null)
                }
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
