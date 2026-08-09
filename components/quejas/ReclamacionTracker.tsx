'use client'

import { useState } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { EstadoQueja } from '@/components/admin/quejas/types'
import { ESTADO_LABELS, FLUJO_ESTADOS } from '@/components/admin/quejas/types'

export function ReclamacionTracker() {
    const [codigo, setCodigo] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!codigo.trim()) return
        setLoading(true)
        setError(null)
        setResult(null)
        try {
            const res = await fetch(`/api/quejas?codigo=${encodeURIComponent(codigo.trim().toUpperCase())}`)
            const json = await res.json()
            if (!res.ok || !json.data) {
                setError('No se encontró ningún registro con ese código. Verifica que esté escrito correctamente.')
                return
            }
            setResult(json.data)
        } catch {
            setError('Ocurrió un error al buscar. Por favor intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    const estadoActualIdx = result
        ? FLUJO_ESTADOS.indexOf(result.que_rec_estado_vac)
        : -1

    const estadoColorMap: Record<string, string> = {
        recibido: 'bg-blue-100 text-blue-800',
        en_evaluacion: 'bg-yellow-100 text-yellow-800',
        en_investigacion: 'bg-orange-100 text-orange-800',
        resuelto: 'bg-green-100 text-green-800',
        cerrado: 'bg-gray-100 text-gray-700',
        anulado: 'bg-red-100 text-red-700',
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                        placeholder="QR-2026-0001"
                        className="pl-9 h-11 font-mono text-sm uppercase"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading || !codigo.trim()}
                    className="h-11 px-6 bg-[#2e7d32] hover:bg-[#1b5e20] text-white"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Consultar'}
                </Button>
            </form>

            {error && (
                <div className="flex gap-2 items-center bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            {result && (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Header del resultado */}
                    <div className="bg-gray-50 px-5 py-4 border-b">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Código de registro</p>
                                <p className="font-mono font-bold text-gray-900 text-xl">
                                    {result.que_rec_cod_registro_vac}
                                </p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estadoColorMap[result.que_rec_estado_vac] || 'bg-gray-100 text-gray-700'}`}>
                                {ESTADO_LABELS[result.que_rec_estado_vac as EstadoQueja] || result.que_rec_estado_vac}
                            </span>
                        </div>
                    </div>

                    {/* Progreso */}
                    <div className="px-5 py-4 bg-white border-b">
                        <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest">Progreso de tu {result.que_rec_tipo_vac}</p>
                        <div className="flex items-center gap-0">
                            {FLUJO_ESTADOS.filter(e => e !== 'anulado').map((estado, i) => {
                                const done = i <= estadoActualIdx
                                return (
                                    <div key={estado} className="flex items-center flex-1">
                                        <div className={`flex flex-col items-center w-full ${i === 0 ? '' : ''}`}>
                                            <div className="flex items-center w-full">
                                                {i > 0 && (
                                                    <div className={`flex-1 h-1.5 ${i <= estadoActualIdx ? 'bg-[#2e7d32]' : 'bg-gray-200'}`} />
                                                )}
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-[#2e7d32]' : 'bg-gray-200'}`}>
                                                    {done && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                {i < FLUJO_ESTADOS.filter(e => e !== 'anulado').length - 1 && (
                                                    <div className={`flex-1 h-1.5 ${i < estadoActualIdx ? 'bg-[#2e7d32]' : 'bg-gray-200'}`} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-between mt-2">
                            {FLUJO_ESTADOS.filter(e => e !== 'anulado').map((e) => (
                                <span key={e} className="text-[9px] text-gray-400 text-center leading-tight" style={{ width: `${100 / FLUJO_ESTADOS.filter(x => x !== 'anulado').length}%` }}>
                                    {ESTADO_LABELS[e as EstadoQueja]}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Datos */}
                    <div className="px-5 py-4 space-y-3 bg-white">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                            <Info label="Tipo" value={result.que_rec_tipo_vac === 'reclamo' ? 'Reclamo' : 'Queja'} />
                            <Info label="Fecha de registro" value={format(new Date(result.que_rec_created_at_dt), "dd 'de' MMM yyyy", { locale: es })} />
                            <Info
                                label="Fecha límite de respuesta"
                                value={result.que_rec_fec_limite_dt
                                    ? format(new Date(result.que_rec_fec_limite_dt), "dd 'de' MMM yyyy", { locale: es })
                                    : '—'}
                            />
                            {result.que_rec_responsable_vac && (
                                <Info label="Responsable asignado" value={result.que_rec_responsable_vac} />
                            )}
                        </div>

                        {result.que_rec_respuesta_cliente_vac && (
                            <div className="mt-3 bg-green-50 rounded-lg p-4 border border-green-100">
                                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Respuesta a su caso</p>
                                <p className="text-sm text-gray-800 whitespace-pre-wrap">{result.que_rec_respuesta_cliente_vac}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-gray-400 text-xs">{label}</p>
            <p className="text-gray-900 font-medium">{value}</p>
        </div>
    )
}
