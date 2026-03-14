'use client'

import { useState } from 'react'
import { AlertTriangle, Trash2, Eye, ExternalLink } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { PostulanteConPuesto } from '../hooks/usePostulaciones'

interface PostulacionesTableProps {
    postulaciones: PostulanteConPuesto[]
    estadoOptions: string[]
    loading: boolean
    onCambiarEstado: (postId: string, nuevoEstado: string) => void
    onEliminar: (postId: string) => void
}

export function PostulacionesTable({
    postulaciones,
    estadoOptions,
    loading,
    onCambiarEstado,
    onEliminar,
}: PostulacionesTableProps) {
    const [viewingDetail, setViewingDetail] = useState<PostulanteConPuesto | null>(null)

    if (loading && postulaciones.length === 0) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
            </div>
        )
    }

    if (postulaciones.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No hay postulaciones registradas
            </div>
        )
    }

    return (
        <>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead>Postulante</TableHead>
                            <TableHead>Documento</TableHead>
                            <TableHead>Puesto</TableHead>
                            <TableHead>Carrera</TableHead>
                            <TableHead>Institución</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {postulaciones.map((post) => {
                            return (
                                <TableRow key={post.post_id_int}>
                                    <TableCell className="font-medium">
                                        {post.post_nom_vac || '—'}
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-xs text-gray-500">{post.Tipo_Documento_Identidad?.tip_doc_iden_nom_vac || '—'}:</span>{' '}
                                        {post.post_nrodoc_vac || '—'}
                                    </TableCell>
                                    <TableCell>
                                        <span className={post.puesto_nombre ? 'text-sm text-gray-900' : 'text-sm text-gray-400'}>
                                            {post.puesto_nombre || 'Sin asignar'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{post.post_carrera_vac || '—'}</TableCell>
                                    <TableCell className="max-w-[150px] truncate">
                                        {post.post_institucion_vac || '—'}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={post.Estado_Postulacion?.estpost_nom_vac || ''}
                                            onValueChange={(value) =>
                                                onCambiarEstado(post.post_id_int, value)
                                            }
                                        >
                                            <SelectTrigger className="w-[160px] h-8 text-xs">
                                                <SelectValue placeholder="Sin estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {estadoOptions.map((estado) => (
                                                    <SelectItem key={estado} value={estado}>
                                                        {estado}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                        {post.post_created_at_dt
                                            ? new Date(post.post_created_at_dt).toLocaleDateString('es-PE', {
                                                  day: '2-digit',
                                                  month: '2-digit',
                                                  year: 'numeric',
                                              })
                                            : '—'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setViewingDetail(post)}
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                title="Ver detalle"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="sm:max-w-[420px]">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="flex items-center gap-2 text-red-700">
                                                            <AlertTriangle className="h-5 w-5" />
                                                            Eliminar postulación
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Se eliminará la postulación de <strong>{post.post_nom_vac}</strong>. Esta acción es permanente y no se puede deshacer.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="border-gray-300">Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => onEliminar(post.post_id_int)}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Eliminar definitivamente
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Dialog de Detalle */}
            <Dialog open={!!viewingDetail} onOpenChange={(open) => !open && setViewingDetail(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Detalle de Postulación</DialogTitle>
                        <DialogDescription>
                            Información completa del postulante
                        </DialogDescription>
                    </DialogHeader>
                    {viewingDetail && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Nombre</p>
                                    <p className="font-semibold">{viewingDetail.post_nom_vac || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Tipo Documento</p>
                                    <p className="font-semibold">{viewingDetail.Tipo_Documento_Identidad?.tip_doc_iden_nom_vac || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">N° Documento</p>
                                    <p className="font-semibold">{viewingDetail.post_nrodoc_vac || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Puesto al que postula</p>
                                    <p className="font-semibold">{viewingDetail.puesto_nombre || 'Sin asignar'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Carrera</p>
                                    <p className="font-semibold">{viewingDetail.post_carrera_vac || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Institución</p>
                                    <p className="font-semibold">{viewingDetail.post_institucion_vac || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Ciclo</p>
                                    <p className="font-semibold">{viewingDetail.post_ciclo_int || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Financiamiento Tesis</p>
                                    <p className="font-semibold">{viewingDetail.post_financiam_vac || '—'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Estado</p>
                                    <p className="font-semibold">
                                        {viewingDetail.Estado_Postulacion?.estpost_nom_vac || 'Sin estado'}
                                    </p>
                                </div>
                            </div>

                            {viewingDetail.post_cv_vac && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">CV (Google Drive)</p>
                                    <a
                                        href={viewingDetail.post_cv_vac}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        Ver curriculum
                                    </a>
                                </div>
                            )}

                            {viewingDetail.Postulacion_Detalle_Area && viewingDetail.Postulacion_Detalle_Area.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">Áreas de Interés</p>
                                    <div className="flex flex-wrap gap-2">
                                        {viewingDetail.Postulacion_Detalle_Area.map((detalle) => (
                                            <Badge key={detalle.area_id_int} variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                                                {detalle.Area_Interes?.area_nom_vac || '—'}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {viewingDetail.texto_presentacion && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Presentación</p>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                        {viewingDetail.texto_presentacion}
                                    </p>
                                </div>
                            )}

                            <div className="text-sm pt-2 border-t">
                                Fecha de postulación:{' '}
                                {viewingDetail.post_created_at_dt
                                    ? new Date(viewingDetail.post_created_at_dt).toLocaleString('es-PE')
                                    : '—'}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
