'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    obtenerPostulantes,
    actualizarEstadoPostulacion,
    eliminarPostulante,
    parsePresentacionPostulante,
    obtenerNombresEstadoPostulacion,
} from '@/lib/supabase/convocatorias'
import { transformarError } from '@/utils/error-messages'
import type { PostulanteDatabase } from '@/types/database'

export interface PostulanteConPuesto extends PostulanteDatabase {
    puesto_id: string | null
    puesto_nombre: string | null
    texto_presentacion: string
}

export function usePostulaciones() {
    const [items, setItems] = useState<PostulanteConPuesto[]>([])
    const [estadoOptions, setEstadoOptions] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const clearMessages = () => {
        setTimeout(() => {
            setError(null)
            setSuccess(null)
        }, 4000)
    }

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const [data, nombres] = await Promise.all([
                obtenerPostulantes(),
                obtenerNombresEstadoPostulacion(),
            ])
            const enriched: PostulanteConPuesto[] = data.map((p) => {
                const parsed = parsePresentacionPostulante(p.post_presentac_vac)
                return {
                    ...p,
                    puesto_id: parsed.puesto_id,
                    puesto_nombre: parsed.puesto_nombre,
                    texto_presentacion: parsed.texto,
                }
            })
            setItems(enriched)
            if (nombres.length > 0) setEstadoOptions(nombres)
        } catch (err) {
            setError(transformarError(err, 'Error al cargar las postulaciones'))
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleCambiarEstado = async (postId: string, nuevoEstado: string) => {
        try {
            setLoading(true)
            await actualizarEstadoPostulacion(postId, nuevoEstado)
            setItems((prev) =>
                prev.map((p) =>
                    p.post_id_int === postId
                        ? {
                              ...p,
                              Estado_Postulacion: p.Estado_Postulacion
                                  ? { ...p.Estado_Postulacion, estpost_nom_vac: nuevoEstado }
                                  : null,
                          }
                        : p
                )
            )
            setSuccess('Estado actualizado correctamente')
            clearMessages()
        } catch (err) {
            setError(transformarError(err, 'Error al actualizar el estado'))
            clearMessages()
        } finally {
            setLoading(false)
        }
    }

    const handleEliminar = async (postId: string) => {
        try {
            setLoading(true)
            await eliminarPostulante(postId)
            setItems((prev) => prev.filter((p) => p.post_id_int !== postId))
            setSuccess('Postulación eliminada correctamente')
            clearMessages()
        } catch (err) {
            setError(transformarError(err, 'Error al eliminar la postulación'))
            clearMessages()
        } finally {
            setLoading(false)
        }
    }

    return {
        items,
        estadoOptions,
        loading,
        error,
        success,
        handleCambiarEstado,
        handleEliminar,
    }
}
