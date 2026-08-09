'use client'

import { useState } from 'react'
import { useEmailConfig } from '@/components/admin/configuracion/hooks/useEmailConfig'
import { EmailConfigList } from '@/components/admin/configuracion/components/EmailConfigList'
import { EmailConfigForm } from '@/components/admin/configuracion/components/EmailConfigForm'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Info } from 'lucide-react'
import type { ConfigEmail } from '@/lib/supabase/config-email'

export default function CorreosConfigPage() {
    const {
        emails,
        loading,
        error,
        success,
        setError,
        handleCrear,
        handleActualizar,
        handleEliminar,
        handlePredeterminar,
        handleTestConnection,
    } = useEmailConfig()

    const [showForm, setShowForm] = useState(false)
    const [editingEmail, setEditingEmail] = useState<ConfigEmail | null>(null)

    const handleEdit = (email: ConfigEmail) => {
        setEditingEmail(email)
        setShowForm(true)
    }

    const handleFormClose = () => {
        setShowForm(false)
        setEditingEmail(null)
    }

    const handleFormSubmit = async (data: any) => {
        if (editingEmail) {
            await handleActualizar(editingEmail.cfg_email_id_int, {
                nombre: data.nombre,
                host: data.host,
                port: data.port,
                seguro: data.seguro,
                usuario: data.usuario,
                password: data.password,
                from: data.from,
                predeterminado: data.predeterminado,
                activo: data.activo,
            })
        } else {
            await handleCrear({
                nombre: data.nombre,
                host: data.host,
                port: data.port,
                seguro: data.seguro,
                usuario: data.usuario,
                password: data.password,
                from: data.from,
                predeterminado: data.predeterminado,
                activo: data.activo,
            })
        }
    }

    return (
        <div className="space-y-6 max-w-4xl">
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
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Configuración de Correos</h1>
                </div>
                <p className="text-gray-500 text-sm">
                    Gestiona las cuentas SMTP para el envío de notificaciones del sistema de quejas y reclamos.
                </p>
            </div>

            {/* Info box */}
            <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 space-y-1">
                    <p className="font-medium">¿Cómo funciona?</p>
                    <ul className="list-disc list-inside space-y-0.5 text-blue-700">
                        <li>Puedes agregar múltiples cuentas de correo (Gmail, Outlook, SMTP propio, etc.)</li>
                        <li>La cuenta <strong>predeterminada</strong> se usa para enviar notificaciones automáticas al registrar quejas</li>
                        <li>Para Gmail, usa una <strong>App Password</strong> (no tu contraseña habitual)</li>
                        <li>Usa "Probar conexión" para verificar que las credenciales funcionan antes de guardar</li>
                    </ul>
                </div>
            </div>

            {/* Lista de emails */}
            <EmailConfigList
                emails={emails}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleEliminar}
                onSetDefault={handlePredeterminar}
                onTestConnection={handleTestConnection}
                onCreate={() => { setEditingEmail(null); setShowForm(true) }}
            />

            {/* Form dialog */}
            <EmailConfigForm
                open={showForm}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                editing={editingEmail}
                loading={loading}
            />
        </div>
    )
}
