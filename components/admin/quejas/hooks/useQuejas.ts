'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    obtenerQuejas,
    obtenerQuejaPorId,
    obtenerHistorialQueja,
    cambiarEstadoQueja,
    asignarResponsable,
    agregarComentario,
    registrarResolucion,
    aplicarProrroga,
    actualizarPrioridad,
    eliminarQueja,
    cambiarTipoQueja,
    crearQueja,
    type CrearQuejaData,
} from '@/lib/supabase/quejas'
import type { Queja, HistorialQueja, QuejaStats, EstadoQueja } from '../types'
import { ESTADO_LABELS } from '../types'

export function useQuejas() {
    const [quejas, setQuejas] = useState<Queja[]>([])
    const [selectedQueja, setSelectedQueja] = useState<Queja | null>(null)
    const [historial, setHistorial] = useState<HistorialQueja[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const loadQuejas = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await obtenerQuejas()
            setQuejas(data as Queja[])
        } catch (err: any) {
            setError(err.message || 'Error cargando quejas y reclamos')
        } finally {
            setLoading(false)
        }
    }, [])

    const loadHistorial = useCallback(async (quejaId: string) => {
        try {
            const data = await obtenerHistorialQueja(quejaId)
            setHistorial(data as HistorialQueja[])
        } catch (err: any) {
            console.error('Error cargando historial:', err)
        }
    }, [])

    const selectQueja = useCallback(async (quejaId: string) => {
        try {
            const data = await obtenerQuejaPorId(quejaId)
            setSelectedQueja(data as Queja)
            await loadHistorial(quejaId)
        } catch (err: any) {
            setError(err.message || 'Error cargando detalle')
        }
    }, [loadHistorial])

    const showSuccess = (msg: string) => {
        setSuccess(msg)
        setTimeout(() => setSuccess(null), 4000)
    }

    const handleCrearQueja = async (data: CrearQuejaData) => {
        setLoading(true)
        try {
            const nueva = await crearQueja(data)
            await loadQuejas()
            showSuccess(`${data.tipo === 'reclamo' ? 'Reclamo' : 'Queja'} registrado con código ${nueva.que_rec_cod_registro_vac}`)
            return nueva
        } catch (err: any) {
            setError(err.message || 'Error al registrar')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleCambiarEstado = async (
        id: string,
        nuevoEstado: EstadoQueja,
        nota: string
    ) => {
        setLoading(true)
        try {
            await cambiarEstadoQueja(id, nuevoEstado, nota)
            await loadQuejas()
            
            const queja = quejas.find(q => q.que_rec_id_int === id) || selectedQueja
            if (queja && queja.que_rec_email_vac) {
                const tipo = queja.que_rec_tipo_vac === 'reclamo' ? 'Reclamo' : 'Queja'
                const estadoLabel = ESTADO_LABELS[nuevoEstado] || nuevoEstado
                fetch('/api/quejas/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: queja.que_rec_email_vac,
                        subject: `Actualización de tu ${tipo} - ${queja.que_rec_cod_registro_vac}`,
                        queja: queja,
                        tipo: tipo,
                        action: 'estado',
                        details: {
                            estadoLabel: estadoLabel,
                            nota: nota
                        }
                    })
                }).catch(e => console.error('Error enviando notificación de estado', e))
            }
            
            if (selectedQueja?.que_rec_id_int === id) {
                await selectQueja(id)
            }
            showSuccess('Estado actualizado correctamente')
        } catch (err: any) {
            setError(err.message || 'Error cambiando estado')
        } finally {
            setLoading(false)
        }
    }

    const handleCambiarTipo = async (
        id: string,
        nuevoTipo: 'queja' | 'reclamo',
        nota: string
    ) => {
        setLoading(true)
        try {
            await cambiarTipoQueja(id, nuevoTipo, nota)
            await loadQuejas()
            if (selectedQueja?.que_rec_id_int === id) {
                await selectQueja(id)
            }
            showSuccess('Tipo reclasificado correctamente')
        } catch (err: any) {
            setError(err.message || 'Error cambiando tipo')
        } finally {
            setLoading(false)
        }
    }

    const handleAsignar = async (
        id: string,
        responsable: string,
        area: string,
        nota: string
    ) => {
        setLoading(true)
        try {
            await asignarResponsable(id, responsable, area, nota)
            await loadQuejas()
            if (selectedQueja?.que_rec_id_int === id) await selectQueja(id)
            showSuccess('Responsable asignado correctamente')
        } catch (err: any) {
            setError(err.message || 'Error asignando responsable')
        } finally {
            setLoading(false)
        }
    }

    const handleComentario = async (id: string, comentario: string) => {
        try {
            await agregarComentario(id, comentario)
            if (selectedQueja?.que_rec_id_int === id) await loadHistorial(id)
            showSuccess('Comentario agregado')
        } catch (err: any) {
            setError(err.message || 'Error agregando comentario')
        }
    }

    const handleResolucion = async (
        id: string,
        dictamen: string,
        accion: string,
        respuestaCliente: string
    ) => {
        setLoading(true)
        try {
            await registrarResolucion(id, dictamen, accion, respuestaCliente)
            await loadQuejas()
            
            const queja = quejas.find(q => q.que_rec_id_int === id) || selectedQueja
            if (queja && queja.que_rec_email_vac) {
                const tipo = queja.que_rec_tipo_vac === 'reclamo' ? 'Reclamo' : 'Queja'
                fetch('/api/quejas/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: queja.que_rec_email_vac,
                        subject: `Resolución de tu ${tipo} - ${queja.que_rec_cod_registro_vac}`,
                        queja: queja,
                        tipo: tipo,
                        action: 'resolucion',
                        details: {
                            respuestaCliente: respuestaCliente
                        }
                    })
                }).catch(e => console.error('Error enviando notificación de resolución', e))
            }
            
            if (selectedQueja?.que_rec_id_int === id) await selectQueja(id)
            showSuccess('Resolución registrada correctamente')
        } catch (err: any) {
            setError(err.message || 'Error registrando resolución')
        } finally {
            setLoading(false)
        }
    }

    const handleEliminar = async (id: string) => {
        setLoading(true)
        try {
            await eliminarQueja(id)
            await loadQuejas()
            if (selectedQueja?.que_rec_id_int === id) {
                setSelectedQueja(null)
                setHistorial([])
            }
            showSuccess('Registro eliminado')
        } catch (err: any) {
            setError(err.message || 'Error eliminando registro')
        } finally {
            setLoading(false)
        }
    }

    const getStats = useCallback((): QuejaStats => {
        const now = new Date()
        const vencidos = quejas.filter(q => {
            if (q.que_rec_estado_vac === 'resuelto' || q.que_rec_estado_vac === 'cerrado') return false
            const limite = q.que_rec_fec_limite_dt
                ? new Date(q.que_rec_fec_limite_dt)
                : null
            return limite ? now > limite : false
        }).length

        const resueltas = quejas.filter(q =>
            q.que_rec_estado_vac === 'resuelto' || q.que_rec_estado_vac === 'cerrado'
        )

        let promDias = 0
        if (resueltas.length > 0) {
            const tiempos = resueltas
                .filter(q => q.que_rec_fec_resolucion_dt)
                .map(q => {
                    const inicio = new Date(q.que_rec_created_at_dt)
                    const fin = new Date(q.que_rec_fec_resolucion_dt!)
                    return Math.round((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24))
                })
            promDias = tiempos.length > 0
                ? Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length)
                : 0
        }

        return {
            total: quejas.length,
            recibidos: quejas.filter(q => q.que_rec_estado_vac === 'recibido').length,
            enEvaluacion: quejas.filter(q => q.que_rec_estado_vac === 'en_evaluacion').length,
            enInvestigacion: quejas.filter(q => q.que_rec_estado_vac === 'en_investigacion').length,
            resueltos: quejas.filter(q => q.que_rec_estado_vac === 'resuelto').length,
            cerrados: quejas.filter(q => q.que_rec_estado_vac === 'cerrado').length,
            vencidos,
            promedioDiasResolucion: promDias,
        }
    }, [quejas])

    useEffect(() => {
        loadQuejas()
    }, [loadQuejas])

    return {
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
        handleEliminar,
    }
}
