'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    Star, StarOff, Trash2, Edit2, Wifi, WifiOff,
    CheckCircle2, XCircle, Loader2, Plus, Mail,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import type { ConfigEmail } from '@/lib/supabase/config-email'

interface EmailConfigListProps {
    emails: ConfigEmail[]
    loading: boolean
    onEdit: (email: ConfigEmail) => void
    onDelete: (id: string) => void
    onSetDefault: (id: string) => void
    onTestConnection: (id: string) => Promise<{ success: boolean; message: string }>
    onCreate: () => void
}

export function EmailConfigList({
    emails,
    loading,
    onEdit,
    onDelete,
    onSetDefault,
    onTestConnection,
    onCreate,
}: EmailConfigListProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [testingId, setTestingId] = useState<string | null>(null)
    const [testResult, setTestResult] = useState<{ id: string; success: boolean; message: string } | null>(null)

    const handleTest = async (id: string) => {
        setTestingId(id)
        setTestResult(null)
        const result = await onTestConnection(id)
        setTestResult({ id, ...result })
        setTestingId(null)
        setTimeout(() => setTestResult(null), 6000)
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Cuentas de correo configuradas</h2>
                    <p className="text-sm text-gray-500">
                        Se usan para notificaciones automáticas del sistema de quejas y reclamos.
                    </p>
                </div>
                <Button onClick={onCreate} className="bg-gray-900 hover:bg-gray-800 text-white">
                    <Plus className="h-4 w-4 mr-1.5" />
                    Agregar cuenta
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map(i => (
                        <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : emails.length === 0 ? (
                <Card className="border-dashed border-2 border-gray-200">
                    <CardContent className="py-16 text-center">
                        <Mail className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <p className="font-medium text-gray-500">No hay cuentas de correo configuradas</p>
                        <p className="text-sm text-gray-400 mt-1 mb-4">
                            Agrega una cuenta SMTP para habilitar el envío de notificaciones automáticas.
                        </p>
                        <Button onClick={onCreate} variant="outline">
                            <Plus className="h-4 w-4 mr-1.5" />
                            Agregar primera cuenta
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emails.map((email) => (
                        <Card
                            key={email.cfg_email_id_int}
                            className={`transition-all ${email.cfg_email_predeter_bol
                                ? 'ring-2 ring-gray-900 shadow-md'
                                : 'border border-gray-200'
                                } ${!email.cfg_email_activo_bol ? 'opacity-60' : ''}`}
                        >
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-base font-semibold text-gray-900">
                                                {email.cfg_email_nombre_vac}
                                            </CardTitle>
                                            {email.cfg_email_predeter_bol && (
                                                <Badge className="bg-gray-900 text-white text-[10px] px-2 py-0">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Predeterminada
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-0.5">{email.cfg_email_from_vac}</p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={email.cfg_email_activo_bol ? 'text-green-600 border-green-200' : 'text-gray-400'}
                                    >
                                        {email.cfg_email_activo_bol ? 'Activa' : 'Inactiva'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                                    <div>
                                        <span className="text-gray-400 text-xs">Host</span>
                                        <p className="text-gray-700 font-mono text-xs">{email.cfg_email_host_vac}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-xs">Puerto / Seguridad</span>
                                        <p className="text-gray-700 text-xs">
                                            {email.cfg_email_port_int} / {email.cfg_email_seguro_bol ? 'TLS/SSL' : 'Sin TLS'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-xs">Usuario</span>
                                        <p className="text-gray-700 text-xs truncate">{email.cfg_email_user_vac}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-xs">Creada</span>
                                        <p className="text-gray-700 text-xs">
                                            {format(new Date(email.cfg_email_created_at_dt), 'dd MMM yyyy', { locale: es })}
                                        </p>
                                    </div>
                                </div>

                                {/* Test result */}
                                {testResult && testResult.id === email.cfg_email_id_int && (
                                    <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {testResult.success
                                            ? <CheckCircle2 className="h-4 w-4 shrink-0" />
                                            : <XCircle className="h-4 w-4 shrink-0" />
                                        }
                                        {testResult.message || (testResult.success ? 'Conexión exitosa' : 'Error de conexión')}
                                    </div>
                                )}

                                {/* Acciones */}
                                <div className="flex items-center gap-2 pt-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 h-8 text-xs"
                                        onClick={() => handleTest(email.cfg_email_id_int)}
                                        disabled={testingId === email.cfg_email_id_int}
                                    >
                                        {testingId === email.cfg_email_id_int ? (
                                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                        ) : (
                                            <Wifi className="h-3 w-3 mr-1" />
                                        )}
                                        Probar conexión
                                    </Button>

                                    {!email.cfg_email_predeter_bol && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 h-8 text-xs"
                                            onClick={() => onSetDefault(email.cfg_email_id_int)}
                                        >
                                            <Star className="h-3 w-3 mr-1" />
                                            Predeterminar
                                        </Button>
                                    )}

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-gray-500"
                                        onClick={() => onEdit(email)}
                                        title="Editar"
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                                        onClick={() => setDeleteId(email.cfg_email_id_int)}
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar esta cuenta de correo?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Se eliminará la configuración SMTP. Los correos que hayan sido enviados previamente no se ven afectados.
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
