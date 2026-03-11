'use client'

import {
    usePostulaciones,
    PostulacionesTable,
    PostulacionesStats,
} from '@/components/admin/postulaciones'

export default function PostulacionesPage() {
    const {
        items: postulaciones,
        estadoOptions,
        loading,
        error,
        success,
        handleCambiarEstado,
        handleEliminar,
    } = usePostulaciones()

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Postulaciones</h1>
                <p className="text-gray-600">Gestiona las postulaciones recibidas para cada puesto</p>
            </div>

            {/* Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Stats */}
            <PostulacionesStats postulaciones={postulaciones} />

            {/* Table */}
            <PostulacionesTable
                postulaciones={postulaciones}
                estadoOptions={estadoOptions}
                loading={loading}
                onCambiarEstado={handleCambiarEstado}
                onEliminar={handleEliminar}
            />
        </div>
    )
}
