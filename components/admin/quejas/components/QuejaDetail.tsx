'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    X, AlertTriangle, Clock, CheckCircle2, Send,
    User, Calendar, FileText, ChevronDown, ChevronRight,
    MessageSquare, Timer, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { Queja, HistorialQueja, EstadoQueja } from '../types'
import {
    ESTADO_LABELS, ESTADO_COLORS,
    PRIORIDAD_LABELS, PRIORIDAD_COLORS,
    TIPO_LABELS, AREAS_EMPRESA, FLUJO_ESTADOS,
} from '../types'

interface QuejaDetailProps {
    queja: Queja
    historial: HistorialQueja[]
    onClose: () => void
    onCambiarEstado: (id: string, estado: EstadoQueja, nota: string) => void
    onCambiarTipo: (id: string, nuevoTipo: 'queja' | 'reclamo', nota: string) => void
    onAsignar: (id: string, responsable: string, area: string, nota: string) => void
    onComentario: (id: string, comentario: string) => void
    onResolucion: (id: string, dictamen: string, accion: string, respuestaCliente: string) => void
    loading: boolean
}

const ACCION_ICONS: Record<string, React.ElementType> = {
    creado: FileText,
    asignado: User,
    comentario: MessageSquare,
    cambio_estado: ChevronRight,
    cambio_tipo: RefreshCw,
    prorrogado: Timer,
    resuelto: CheckCircle2,
    cerrado: X,
    email_enviado: Send,
}

function esVencida(queja: Queja): boolean {
    if (queja.que_rec_estado_vac === 'resuelto' || queja.que_rec_estado_vac === 'cerrado') return false
    const now = new Date()
    const limite = queja.que_rec_fec_limite_dt
        ? new Date(queja.que_rec_fec_limite_dt)
        : null
    return limite ? now > limite : false
}

export function QuejaDetail({
    queja,
    historial,
    onClose,
    onCambiarEstado,
    onCambiarTipo,
    onAsignar,
    onComentario,
    onResolucion,
    loading,
}: QuejaDetailProps) {
    const [nuevoEstado, setNuevoEstado] = useState<EstadoQueja>(queja.que_rec_estado_vac)
    const [notaEstado, setNotaEstado] = useState('')
    const [responsable, setResponsable] = useState(queja.que_rec_responsable_vac || '')
    const [areaResp, setAreaResp] = useState(queja.que_rec_area_responsable_vac || '')
    const [notaAsig, setNotaAsig] = useState('')
    const [comentario, setComentario] = useState('')
    const [dictamen, setDictamen] = useState(queja.que_rec_dictamen_vac || '')
    const [accion, setAccion] = useState(queja.que_rec_accion_correctiva_vac || '')
    const [respuestaCliente, setRespuestaCliente] = useState(queja.que_rec_respuesta_cliente_vac || '')
    const [notaTipo, setNotaTipo] = useState('')
    const [activeSection, setActiveSection] = useState<string>('info')

    const vencida = esVencida(queja)
    const limiteFecha = queja.que_rec_fec_limite_dt

    const estadoActualIdx = FLUJO_ESTADOS.indexOf(queja.que_rec_estado_vac as any)

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b bg-gray-50 flex items-start justify-between gap-3 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-gray-900 text-sm">
                                {queja.que_rec_cod_registro_vac}
                            </span>

                            {vencida && (
                                <Badge className="bg-red-100 text-red-700 text-[10px]">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Vencido
                                </Badge>
                            )}
                        </div>
                        <h2 className="font-semibold text-gray-900">{queja.que_rec_nom_vac}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${ESTADO_COLORS[queja.que_rec_estado_vac]}`}>
                                {ESTADO_LABELS[queja.que_rec_estado_vac]}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${PRIORIDAD_COLORS[queja.que_rec_prioridad_vac]}`}>
                                {PRIORIDAD_LABELS[queja.que_rec_prioridad_vac]}
                            </span>
                            <Badge variant="outline" className="text-xs">
                                {TIPO_LABELS[queja.que_rec_tipo_vac]}
                            </Badge>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Progress bar estados */}
                <div className="px-6 pt-3 pb-2 shrink-0">
                    <div className="flex items-center gap-1">
                        {FLUJO_ESTADOS.filter(e => e !== 'anulado').map((estado, i) => (
                            <div key={estado} className="flex items-center flex-1">
                                <div className={`h-2 rounded-full flex-1 transition-colors ${i <= estadoActualIdx
                                    ? 'bg-gray-900'
                                    : 'bg-gray-200'
                                    }`} />
                                {i < FLUJO_ESTADOS.length - 2 && (
                                    <div className={`w-2 h-2 rounded-full mx-1 transition-colors ${i < estadoActualIdx ? 'bg-gray-900' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-1">
                        {FLUJO_ESTADOS.filter(e => e !== 'anulado').map((e) => (
                            <span key={e} className="text-[9px] font-bold text-gray-900 text-center flex-1">{ESTADO_LABELS[e as EstadoQueja]}</span>
                        ))}
                    </div>
                </div>

                {/* Tabs navegación */}
                <div className="flex border-b shrink-0 text-sm">
                    {[
                        { key: 'info', label: 'Información' },
                        { key: 'acciones', label: 'Gestión' },
                        { key: 'historial', label: `Historial (${historial.length})` },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveSection(tab.key)}
                            className={`px-4 py-2.5 font-medium transition-colors ${activeSection === tab.key
                                ? 'border-b-2 border-gray-900 text-gray-900'
                                : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Contenido scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {activeSection === 'info' && (
                        <>
                            {/* Datos del reclamante */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-3">Datos del reclamante</h3>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    <DataRow label="Nombre" value={queja.que_rec_nom_vac} />
                                    <DataRow label="Email" value={queja.que_rec_email_vac} />
                                    <DataRow label="Teléfono" value={queja.que_rec_telef_vac} />
                                    <DataRow label="Tipo doc." value={queja.que_rec_tipo_doc_vac} />
                                    <DataRow label="Nro. documento" value={queja.que_rec_num_doc_vac} />
                                    {queja.que_rec_padre_madre_vac && (
                                        <DataRow label="Padre/Madre (menor edad)" value={queja.que_rec_padre_madre_vac} />
                                    )}
                                    <DataRow label="Dirección" value={queja.que_rec_direc_vac} />
                                </div>
                            </section>

                            <Separator />

                            {/* Datos del reclamo */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-3">Datos del reclamo</h3>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
                                    <DataRow label="Canal" value={queja.que_rec_canal_vac} />
                                    <DataRow label="Área afectada" value={queja.que_rec_area_afect_vac} />
                                    {queja.que_rec_tipo_bien_vac && (
                                        <DataRow label="Tipo de bien" value={queja.que_rec_tipo_bien_vac === 'producto' ? 'Producto' : 'Servicio'} />
                                    )}
                                    <DataRow label="Servicio / Producto (Desc.)" value={queja.que_rec_serv_prod_vac} />
                                    <DataRow label="Monto reclamado" value={queja.que_rec_monto_recla_num ? `S/ ${queja.que_rec_monto_recla_num}` : undefined} />
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-900 font-bold text-xs mb-1">Descripción</p>
                                    <p className="text-gray-900 leading-relaxed bg-gray-50 rounded-lg p-3 text-sm break-words whitespace-pre-wrap">
                                        {queja.que_rec_desc_vac}
                                    </p>
                                </div>
                                {queja.que_rec_pedido_reclam_vac && (
                                    <div className="text-sm mt-3">
                                        <p className="text-gray-900 font-bold text-xs mb-1">Pedido / compensación solicitada</p>
                                        <p className="text-gray-900 bg-blue-50 rounded-lg p-3 text-sm break-words whitespace-pre-wrap">
                                            {queja.que_rec_pedido_reclam_vac}
                                        </p>
                                    </div>
                                )}
                            </section>

                            <Separator />

                            {/* Plazos */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-3">Plazos</h3>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                    <DataRow
                                        label="Fecha límite inicial (15 días hábiles)"
                                        value={queja.que_rec_fec_limite_dt
                                            ? format(new Date(queja.que_rec_fec_limite_dt), "dd 'de' MMM yyyy", { locale: es })
                                            : undefined}
                                    />

                                    <DataRow label="Responsable asignado" value={queja.que_rec_responsable_vac} />
                                    <DataRow label="Área responsable" value={queja.que_rec_area_responsable_vac} />
                                </div>
                            </section>

                            {/* Resolución si existe */}
                            {queja.que_rec_dictamen_vac && (
                                <>
                                    <Separator />
                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 mb-3">Resolución</h3>
                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <p className="text-gray-900 font-bold text-xs mb-1">Dictamen</p>
                                                <p className="text-gray-900 bg-green-50 rounded-lg p-3 text-sm break-words whitespace-pre-wrap">{queja.que_rec_dictamen_vac}</p>
                                            </div>
                                            {queja.que_rec_accion_correctiva_vac && (
                                                <div>
                                                    <p className="text-gray-900 font-bold text-xs mb-1">Acción correctiva</p>
                                                    <p className="text-gray-900 bg-green-50 rounded-lg p-3 text-sm break-words whitespace-pre-wrap">{queja.que_rec_accion_correctiva_vac}</p>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </>
                            )}
                        </>
                    )}

                    {activeSection === 'acciones' && (
                        <>
                            {/* Reclasificar Tipo */}
                            <section className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <h3 className="font-medium text-gray-900 text-sm">Reclasificar Tipo</h3>
                                <div className="text-sm text-gray-600 mb-2">
                                    Actual: <Badge variant="outline" className="font-bold mx-1 bg-white">{TIPO_LABELS[queja.que_rec_tipo_vac as keyof typeof TIPO_LABELS]}</Badge>
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-gray-900 mb-1 block">Motivo de reclasificación (obligatorio)</Label>
                                    <Textarea
                                        placeholder="Ej: El cliente marcó queja, pero pide compensación económica..."
                                        value={notaTipo}
                                        onChange={(e) => setNotaTipo(e.target.value)}
                                        rows={2}
                                        className="text-sm resize-none"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        if (!notaTipo.trim()) {
                                            alert("Debes ingresar el motivo de la reclasificación.")
                                            return
                                        }
                                        onCambiarTipo(
                                            queja.que_rec_id_int, 
                                            queja.que_rec_tipo_vac === 'queja' ? 'reclamo' : 'queja', 
                                            notaTipo
                                        )
                                        setNotaTipo('')
                                    }}
                                    disabled={loading || !notaTipo.trim()}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Convertir en {queja.que_rec_tipo_vac === 'queja' ? 'Reclamo' : 'Queja'}
                                </Button>
                            </section>

                            {/* Cambiar estado */}
                            <section className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <h3 className="font-medium text-gray-900 text-sm">Cambiar estado</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-xs font-bold text-gray-900 mb-1 block">Nuevo estado</Label>
                                        <Select value={nuevoEstado} onValueChange={(v) => setNuevoEstado(v as EstadoQueja)}>
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {FLUJO_ESTADOS.map(e => (
                                                    <SelectItem key={e} value={e}>{ESTADO_LABELS[e as EstadoQueja]}</SelectItem>
                                                ))}
                                                <SelectItem value="anulado">Anulado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-gray-900 mb-1 block">Nota al cliente (obligatoria - Se enviará por correo)</Label>
                                    <Textarea
                                        placeholder="Estimado cliente, su caso ha pasado a esta etapa porque..."
                                        value={notaEstado}
                                        onChange={(e) => setNotaEstado(e.target.value)}
                                        rows={3}
                                        className="text-sm resize-none border-blue-200 focus-visible:ring-blue-500"
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    disabled={loading || !notaEstado.trim() || nuevoEstado === queja.que_rec_estado_vac}
                                    onClick={() => onCambiarEstado(queja.que_rec_id_int, nuevoEstado, notaEstado)}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                                >
                                    Actualizar estado
                                </Button>
                            </section>

                            {/* Asignar responsable */}
                            <section className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <h3 className="font-medium text-gray-900 text-sm">Asignar responsable</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-xs font-bold text-gray-900 mb-1 block">Responsable</Label>
                                        <Input
                                            placeholder="Nombre del responsable"
                                            value={responsable}
                                            onChange={(e) => setResponsable(e.target.value)}
                                            className="h-9 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-gray-900 mb-1 block">Área</Label>
                                        <Select value={areaResp} onValueChange={setAreaResp}>
                                            <SelectTrigger className="h-9">
                                                <SelectValue placeholder="Seleccionar área" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AREAS_EMPRESA.map(a => (
                                                    <SelectItem key={a} value={a}>{a}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-gray-900 mb-1 block">Nota (opcional)</Label>
                                    <Textarea
                                        placeholder="Instrucciones para el responsable..."
                                        value={notaAsig}
                                        onChange={(e) => setNotaAsig(e.target.value)}
                                        rows={2}
                                        className="text-sm resize-none"
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    disabled={loading || !responsable.trim() || !areaResp}
                                    onClick={() => onAsignar(queja.que_rec_id_int, responsable, areaResp, notaAsig)}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Asignar responsable
                                </Button>
                            </section>

                            {/* Registrar resolución */}
                            {queja.que_rec_estado_vac !== 'cerrado' && queja.que_rec_estado_vac !== 'anulado' && (
                                <section className="bg-green-50 rounded-xl p-4 space-y-3">
                                    <h3 className="font-medium text-gray-900 text-sm">Registrar resolución</h3>
                                    <div>
                                        <Label className="text-xs font-bold text-gray-900 mb-1 block">Dictamen interno</Label>
                                        <Textarea
                                            placeholder="Resultado de la investigación (uso interno)..."
                                            value={dictamen}
                                            onChange={(e) => setDictamen(e.target.value)}
                                            rows={3}
                                            className="text-sm resize-none bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-gray-900 mb-1 block">Acción correctiva interna</Label>
                                        <Textarea
                                            placeholder="Medidas tomadas para resolver el problema (uso interno)..."
                                            value={accion}
                                            onChange={(e) => setAccion(e.target.value)}
                                            rows={3}
                                            className="text-sm resize-none bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-gray-900 mb-1 block">Respuesta al cliente (Se enviará por correo)</Label>
                                        <Textarea
                                            placeholder="Estimado cliente, le informamos que..."
                                            value={respuestaCliente}
                                            onChange={(e) => setRespuestaCliente(e.target.value)}
                                            rows={4}
                                            className="text-sm resize-none bg-white border-green-300 focus-visible:ring-green-500"
                                        />
                                    </div>
                                    <Button
                                        size="sm"
                                        disabled={loading || !dictamen.trim() || !respuestaCliente.trim()}
                                        onClick={() => onResolucion(queja.que_rec_id_int, dictamen, accion, respuestaCliente)}
                                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                                        Marcar como resuelto
                                    </Button>
                                </section>
                            )}

                            {/* Comentario */}
                            <section className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <h3 className="font-medium text-gray-900 text-sm">Agregar comentario interno</h3>
                                <Textarea
                                    placeholder="Nota interna visible solo en el panel admin..."
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    rows={3}
                                    className="text-sm resize-none"
                                />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={loading || !comentario.trim()}
                                    onClick={() => {
                                        onComentario(queja.que_rec_id_int, comentario)
                                        setComentario('')
                                    }}
                                    className="w-full"
                                >
                                    <MessageSquare className="h-4 w-4 mr-1.5" />
                                    Agregar comentario
                                </Button>
                            </section>
                        </>
                    )}

                    {activeSection === 'historial' && (
                        <div className="space-y-3">
                            {historial.length === 0 ? (
                                <p className="text-center text-gray-400 text-sm py-8">Sin historial registrado</p>
                            ) : (
                                historial.map((h, i) => {
                                    const Icon = ACCION_ICONS[h.que_hist_accion_vac] || FileText
                                    return (
                                        <div key={h.que_hist_id_int} className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                    <Icon className="h-4 w-4 text-gray-500" />
                                                </div>
                                                {i < historial.length - 1 && (
                                                    <div className="w-px flex-1 bg-gray-200 my-1" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-gray-900 capitalize">
                                                        {h.que_hist_accion_vac.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-gray-900">
                                                        {format(new Date(h.que_hist_created_at_dt), "dd MMM yyyy HH:mm", { locale: es })}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 mt-0.5 leading-relaxed break-words whitespace-pre-wrap">{h.que_hist_desc_vac}</p>
                                                {h.que_hist_estado_ant_vac && h.que_hist_estado_nuevo_vac && (
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                                            {ESTADO_LABELS[h.que_hist_estado_ant_vac as EstadoQueja] || h.que_hist_estado_ant_vac}
                                                        </span>
                                                        <span className="text-gray-400">→</span>
                                                        <span className="text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded">
                                                            {ESTADO_LABELS[h.que_hist_estado_nuevo_vac as EstadoQueja] || h.que_hist_estado_nuevo_vac}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function DataRow({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <p className="text-gray-900 font-bold text-xs">{label}</p>
            <p className="text-gray-900 font-medium text-sm truncate">{value || '—'}</p>
        </div>
    )
}
