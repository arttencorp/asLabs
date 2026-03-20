'use client'

import { Fragment, useMemo, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { PuestosTableProps } from '../types'
import { obtenerEstadoPuesto } from '../utils'
import { PostulacionesTable } from '@/components/admin/postulaciones'

export function PuestosTable({
  puestos,
  postulaciones,
  estadoPostulacionOptions,
  postulacionesLoading,
  loading,
  onEdit,
  onDelete,
  onToggleEstado,
  onCambiarEstadoPostulacion,
  onEliminarPostulacion,
}: PuestosTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [expandedPuestoId, setExpandedPuestoId] = useState<string | null>(null)

  const postulacionesPorPuesto = useMemo(() => {
    const map = new Map<string, typeof postulaciones>()
    for (const post of postulaciones) {
      if (!post.puesto_id) continue
      const list = map.get(post.puesto_id) || []
      list.push(post)
      map.set(post.puesto_id, list)
    }
    return map
  }, [postulaciones])

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
              <TableHead className="w-[10%] text-center">Postulaciones</TableHead>
              <TableHead className="w-[10%] text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {puestos.map((puesto) => {
              const estado = obtenerEstadoPuesto(puesto.Estado_Puesto?.estpuest_nom_vac)
              const postulacionesPuesto = postulacionesPorPuesto.get(puesto.puest_id_int) || []
              const isExpanded = expandedPuestoId === puesto.puest_id_int
              return (
                <Fragment key={puesto.puest_id_int}>
                  <TableRow>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{puesto.puest_nom_vac || 'Sin nombre'}</p>
                        {puesto.puest_lugar_vac && (
                          <p className="text-xs text-gray-500">
                            Lugar: {puesto.puest_lugar_vac}
                          </p>
                        )}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedPuestoId(isExpanded ? null : puesto.puest_id_int)}
                        disabled={postulacionesPuesto.length === 0 && !postulacionesLoading}
                        className="h-8 text-xs gap-1"
                        title={postulacionesPuesto.length > 0 ? 'Ver postulaciones' : 'Sin postulaciones'}
                      >
                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {postulacionesPuesto.length}
                      </Button>
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

                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-gray-50">
                        <div className="p-3">
                          <PostulacionesTable
                            postulaciones={postulacionesPuesto}
                            estadoOptions={estadoPostulacionOptions}
                            loading={postulacionesLoading}
                            onCambiarEstado={onCambiarEstadoPostulacion}
                            onEliminar={onEliminarPostulacion}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
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
