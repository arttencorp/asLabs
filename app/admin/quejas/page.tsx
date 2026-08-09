'use client'

import { useQuejas } from '@/components/admin/quejas/hooks/useQuejas'
import { QuejaStatsCard } from '@/components/admin/quejas/components/QuejaStats'
import { QuejasList } from '@/components/admin/quejas/components/QuejasList'
import { QuejaDetail } from '@/components/admin/quejas/components/QuejaDetail'
import { QuejaForm } from '@/components/admin/quejas/components/QuejaForm'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { Queja } from '@/components/admin/quejas/types'

export default function QuejasPage() {
    const {
        quejas,
        selectedQueja,
        setSelectedQueja,
        historial,
        loading,
        error,
        success,
        setError,
        loadQuejas,
        selectQueja,
        getStats,
        handleCrearQueja,
        handleCambiarEstado,
        handleCambiarTipo,
        handleAsignar,
        handleComentario,
        handleResolucion,
    } = useQuejas()

    const [showForm, setShowForm] = useState(false)

    const handleViewQueja = (queja: Queja) => {
        selectQueja(queja.que_rec_id_int)
    }

    return (
        <div className="space-y-6">
            {/* Mensajes */}
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Libro de Reclamaciones</h1>
                    <p className="text-gray-500 text-sm">
                        Gestión de quejas y reclamos — PSG3.1 / PSG3.2 · Ley 29571 (Código del Consumidor)
                    </p>
                </div>
            </div>

            {/* KPIs */}
            <QuejaStatsCard stats={getStats()} loading={loading} />

            {/* Lista */}
            <QuejasList
                quejas={quejas}
                loading={loading}
                onView={handleViewQueja}
                onCreate={() => setShowForm(true)}
                onRefresh={loadQuejas}
            />

            {/* Panel de detalle slide-in */}
            {selectedQueja && (
                <QuejaDetail
                    queja={selectedQueja}
                    historial={historial}
                    onClose={() => setSelectedQueja(null)}
                    onCambiarEstado={handleCambiarEstado}
                    onCambiarTipo={handleCambiarTipo}
                    onAsignar={handleAsignar}
                    onComentario={handleComentario}
                    onResolucion={handleResolucion}
                    loading={loading}
                />
            )}

            {/* Formulario para canal presencial */}
            <QuejaForm
                open={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleCrearQueja}
                loading={loading}
            />

            {/* Loading overlay */}
            {loading && quejas.length === 0 && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl flex items-center gap-3 shadow-xl">
                        <Loader2 className="h-5 w-5 animate-spin text-gray-700" />
                        <span className="text-gray-800 font-medium">Cargando...</span>
                    </div>
                </div>
            )}
        </div>
    )
}
