'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    Plus, RefreshCw, Search, Filter,
    Eye, Trash2, AlertTriangle, ChevronDown,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
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
import type { Queja, EstadoQueja, PrioridadQueja } from '../types'
import {
    ESTADO_LABELS, ESTADO_COLORS,
    PRIORIDAD_LABELS, PRIORIDAD_COLORS,
    TIPO_LABELS,
} from '../types'

interface QuejasListProps {
    quejas: Queja[]
    loading: boolean
    onView: (queja: Queja) => void
    onDelete: (id: string) => void
    onCreate: () => void
    onRefresh: () => void
}

function esVencida(queja: Queja): boolean {
    if (queja.que_rec_estado_vac === 'resuelto' || queja.que_rec_estado_vac === 'cerrado') return false
    const now = new Date()
    const limite = queja.que_rec_fec_limite_dt
        ? new Date(queja.que_rec_fec_limite_dt)
        : null
    return limite ? now > limite : false
}

export function QuejasList({
    quejas,
    loading,
    onView,
    onDelete,
    onCreate,
    onRefresh,
}: QuejasListProps) {
    const [search, setSearch] = useState('')
    const [filterEstado, setFilterEstado] = useState<string>('todos')
    const [filterTipo, setFilterTipo] = useState<string>('todos')
    const [filterPrioridad, setFilterPrioridad] = useState<string>('todos')
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const filtered = useMemo(() => {
        return quejas.filter((q) => {
            const matchSearch =
                search === '' ||
                q.que_rec_cod_registro_vac.toLowerCase().includes(search.toLowerCase()) ||
                q.que_rec_nom_vac.toLowerCase().includes(search.toLowerCase()) ||
                q.que_rec_email_vac.toLowerCase().includes(search.toLowerCase()) ||
                q.que_rec_desc_vac.toLowerCase().includes(search.toLowerCase())

            const matchEstado = filterEstado === 'todos' || q.que_rec_estado_vac === filterEstado
            const matchTipo = filterTipo === 'todos' || q.que_rec_tipo_vac === filterTipo
            const matchPrioridad = filterPrioridad === 'todos' || q.que_rec_prioridad_vac === filterPrioridad

            return matchSearch && matchEstado && matchTipo && matchPrioridad
        })
    }, [quejas, search, filterEstado, filterTipo, filterPrioridad])

    return (
        <>
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <CardTitle className="text-lg">Registro de Quejas y Reclamos</CardTitle>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
                                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            </Button>
                            <Button size="sm" onClick={onCreate} className="bg-gray-900 hover:bg-gray-800 text-white">
                                <Plus className="h-4 w-4 mr-1" />
                                Nuevo registro
                            </Button>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por código, nombre, email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 h-9"
                            />
                        </div>
                        <Select value={filterEstado} onValueChange={setFilterEstado}>
                            <SelectTrigger className="w-full sm:w-[160px] h-9">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos los estados</SelectItem>
                                <SelectItem value="recibido">Recibido</SelectItem>
                                <SelectItem value="en_evaluacion">En Evaluación</SelectItem>
                                <SelectItem value="en_investigacion">En Investigación</SelectItem>
                                <SelectItem value="resuelto">Resuelto</SelectItem>
                                <SelectItem value="cerrado">Cerrado</SelectItem>
                                <SelectItem value="anulado">Anulado</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterTipo} onValueChange={setFilterTipo}>
                            <SelectTrigger className="w-full sm:w-[140px] h-9">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Queja y Reclamo</SelectItem>
                                <SelectItem value="queja">Queja</SelectItem>
                                <SelectItem value="reclamo">Reclamo</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={filterPrioridad} onValueChange={setFilterPrioridad}>
                            <SelectTrigger className="w-full sm:w-[140px] h-9">
                                <SelectValue placeholder="Prioridad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Toda prioridad</SelectItem>
                                <SelectItem value="urgente">Urgente</SelectItem>
                                <SelectItem value="alta">Alta</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="baja">Baja</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    {loading ? (
                        <div className="space-y-2 p-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-14 bg-gray-100 animate-pulse rounded" />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <Filter className="h-10 w-10 mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No se encontraron registros</p>
                            <p className="text-sm">Ajusta los filtros o registra una nueva queja/reclamo</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-gray-50 text-left">
                                        <th className="px-4 py-2 font-medium text-gray-600">Código</th>
                                        <th className="px-4 py-2 font-medium text-gray-600">Reclamante</th>
                                        <th className="px-4 py-2 font-medium text-gray-600">Tipo</th>
                                        <th className="px-4 py-2 font-medium text-gray-600">Estado</th>
                                        <th className="px-4 py-2 font-medium text-gray-600">Prioridad</th>
                                        <th className="px-4 py-2 font-medium text-gray-600">Fecha límite</th>
                                        <th className="px-4 py-2 font-medium text-gray-600">Fecha registro</th>
                                        <th className="px-4 py-2 font-medium text-gray-600 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filtered.map((q) => {
                                        const vencida = esVencida(q)
                                        const limite = q.que_rec_fec_limite_dt

                                        return (
                                            <tr
                                                key={q.que_rec_id_int}
                                                className={`hover:bg-gray-50 transition-colors ${vencida ? 'bg-red-50/40' : ''}`}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-1.5">
                                                        {vencida && (
                                                            <AlertTriangle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                                                        )}
                                                        <span className="font-mono font-semibold text-gray-900 text-xs">
                                                            {q.que_rec_cod_registro_vac}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="font-medium text-gray-900 leading-tight">{q.que_rec_nom_vac}</div>
                                                    <div className="text-gray-500 text-xs">{q.que_rec_email_vac}</div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline" className="text-xs capitalize">
                                                        {TIPO_LABELS[q.que_rec_tipo_vac]}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${ESTADO_COLORS[q.que_rec_estado_vac]}`}>
                                                        {ESTADO_LABELS[q.que_rec_estado_vac]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PRIORIDAD_COLORS[q.que_rec_prioridad_vac]}`}>
                                                        {PRIORIDAD_LABELS[q.que_rec_prioridad_vac]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {limite ? (
                                                        <span className={`text-xs ${vencida ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                                                            {format(new Date(limite), 'dd MMM yyyy', { locale: es })}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-xs text-gray-500">
                                                    {format(new Date(q.que_rec_created_at_dt), 'dd MMM yyyy', { locale: es })}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => onView(q)}
                                                            className="h-7 w-7 p-0 text-gray-600 hover:text-blue-600"
                                                            title="Ver detalle"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setDeleteId(q.que_rec_id_int)}
                                                            className="h-7 w-7 p-0 text-gray-400 hover:text-red-600"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="px-4 py-2 border-t text-xs text-gray-400">
                                Mostrando {filtered.length} de {quejas.length} registros
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Confirmación eliminar */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar este registro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Se eliminará el registro y todo su historial de acciones.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => {
                                if (deleteId) onDelete(deleteId)
                                setDeleteId(null)
                            }}
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
