'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    obtenerConfigEmails,
    crearConfigEmail,
    actualizarConfigEmail,
    eliminarConfigEmail,
    establecerEmailPredeterminado,
    type ConfigEmail,
} from '@/lib/supabase/config-email'

export function useEmailConfig() {
    const [emails, setEmails] = useState<ConfigEmail[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const showSuccess = (msg: string) => {
        setSuccess(msg)
        setTimeout(() => setSuccess(null), 4000)
    }

    const loadEmails = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await obtenerConfigEmails()
            setEmails(data)
        } catch (err: any) {
            setError(err.message || 'Error cargando configuraciones de correo')
        } finally {
            setLoading(false)
        }
    }, [])

    const handleCrear = async (data: Parameters<typeof crearConfigEmail>[0]) => {
        setLoading(true)
        try {
            await crearConfigEmail(data)
            await loadEmails()
            showSuccess('Cuenta de correo agregada correctamente')
        } catch (err: any) {
            setError(err.message || 'Error al agregar la cuenta')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleActualizar = async (id: string, data: Parameters<typeof actualizarConfigEmail>[1]) => {
        setLoading(true)
        try {
            await actualizarConfigEmail(id, data)
            await loadEmails()
            showSuccess('Cuenta de correo actualizada correctamente')
        } catch (err: any) {
            setError(err.message || 'Error al actualizar la cuenta')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleEliminar = async (id: string) => {
        setLoading(true)
        try {
            await eliminarConfigEmail(id)
            await loadEmails()
            showSuccess('Cuenta de correo eliminada')
        } catch (err: any) {
            setError(err.message || 'Error al eliminar la cuenta')
        } finally {
            setLoading(false)
        }
    }

    const handlePredeterminar = async (id: string) => {
        setLoading(true)
        try {
            await establecerEmailPredeterminado(id)
            await loadEmails()
            showSuccess('Cuenta establecida como predeterminada')
        } catch (err: any) {
            setError(err.message || 'Error al establecer predeterminado')
        } finally {
            setLoading(false)
        }
    }

    const handleTestConnection = async (id: string): Promise<{ success: boolean; message: string }> => {
        try {
            const res = await fetch('/api/send-email', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ configEmailId: id }),
            })
            const json = await res.json()
            return { success: json.success, message: json.message || json.error || '' }
        } catch (err: any) {
            return { success: false, message: err.message || 'Error de conexión' }
        }
    }

    useEffect(() => {
        loadEmails()
    }, [loadEmails])

    return {
        emails,
        loading,
        error,
        success,
        setError,
        loadEmails,
        handleCrear,
        handleActualizar,
        handleEliminar,
        handlePredeterminar,
        handleTestConnection,
    }
}
