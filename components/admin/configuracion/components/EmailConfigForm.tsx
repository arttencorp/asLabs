'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { ConfigEmail } from '@/lib/supabase/config-email'

const schema = z.object({
    nombre: z.string().min(2, 'Nombre requerido'),
    host: z.string().min(3, 'Host requerido (ej: smtp.gmail.com)'),
    port: z.number().int().min(1).max(65535),
    seguro: z.boolean(),
    usuario: z.string().email('Debe ser un email válido'),
    password: z.string().optional(),
    from: z.string().min(3, 'Remitente requerido (ej: AS Laboratorios <correo@asl.com>)'),
    predeterminado: z.boolean(),
    activo: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface EmailConfigFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: FormValues & { password: string }) => Promise<void>
    editing?: ConfigEmail | null
    loading: boolean
}

export function EmailConfigForm({ open, onClose, onSubmit, editing, loading }: EmailConfigFormProps) {
    const [showPass, setShowPass] = useState(false)

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            port: 587,
            seguro: true,
            predeterminado: false,
            activo: true,
        },
    })

    useEffect(() => {
        if (editing) {
            reset({
                nombre: editing.cfg_email_nombre_vac,
                host: editing.cfg_email_host_vac,
                port: editing.cfg_email_port_int,
                seguro: editing.cfg_email_seguro_bol,
                usuario: editing.cfg_email_user_vac,
                password: '',
                from: editing.cfg_email_from_vac,
                predeterminado: editing.cfg_email_predeter_bol,
                activo: editing.cfg_email_activo_bol,
            })
        } else {
            reset({ port: 587, seguro: true, predeterminado: false, activo: true })
        }
    }, [editing, reset])

    const seguro = watch('seguro')
    const predeterminado = watch('predeterminado')
    const activo = watch('activo')

    const onFormSubmit = async (values: FormValues) => {
        if (!editing && !values.password) return
        await onSubmit({ ...values, password: values.password || '' })
        reset()
        onClose()
    }

    // Presets SMTP populares
    const presets = [
        { label: 'Gmail', host: 'smtp.gmail.com', port: 587, seguro: true },
        { label: 'Outlook', host: 'smtp-mail.outlook.com', port: 587, seguro: true },
        { label: 'Yahoo', host: 'smtp.mail.yahoo.com', port: 587, seguro: true },
        { label: 'Zoho', host: 'smtp.zoho.com', port: 587, seguro: true },
        { label: 'Personalizado', host: '', port: 587, seguro: true },
    ]

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {editing ? 'Editar cuenta de correo' : 'Agregar nueva cuenta de correo'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    {/* Presets */}
                    {!editing && (
                        <div>
                            <Label className="text-xs text-gray-500 mb-2 block">Configuración rápida</Label>
                            <div className="flex flex-wrap gap-2">
                                {presets.map(p => (
                                    <button
                                        key={p.label}
                                        type="button"
                                        onClick={() => {
                                            if (p.host) setValue('host', p.host)
                                            setValue('port', p.port)
                                            setValue('seguro', p.seguro)
                                        }}
                                        className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <Label className="text-xs">Nombre descriptivo *</Label>
                        <Input {...register('nombre')} className="h-9" placeholder='Gmail ventas, SMTP principal...' />
                        {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 space-y-1.5">
                            <Label className="text-xs">Host SMTP *</Label>
                            <Input {...register('host')} className="h-9 font-mono text-sm" placeholder="smtp.gmail.com" />
                            {errors.host && <p className="text-red-500 text-xs">{errors.host.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Puerto *</Label>
                            <Input
                                {...register('port', { valueAsNumber: true })}
                                type="number"
                                className="h-9 font-mono text-sm"
                                placeholder="587"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Usuario (email de la cuenta) *</Label>
                        <Input {...register('usuario')} type="email" className="h-9" placeholder="ventas@aslaboratorios.com" />
                        {errors.usuario && <p className="text-red-500 text-xs">{errors.usuario.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">
                            Contraseña {editing ? '(dejar vacío para no cambiar)' : '*'}
                        </Label>
                        <div className="relative">
                            <Input
                                {...register('password')}
                                type={showPass ? 'text' : 'password'}
                                className="h-9 pr-9"
                                placeholder={editing ? '••••••••' : 'Contraseña o App Password'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Nombre y email del remitente *</Label>
                        <Input {...register('from')} className="h-9" placeholder='AS Laboratorios <ventas@aslaboratorios.com>' />
                        {errors.from && <p className="text-red-500 text-xs">{errors.from.message}</p>}
                    </div>

                    {/* Switches */}
                    <div className="flex items-center justify-between py-1">
                        <div>
                            <p className="text-sm font-medium">TLS / SSL</p>
                            <p className="text-xs text-gray-500">Recomendado para seguridad</p>
                        </div>
                        <Switch checked={seguro} onCheckedChange={(v) => setValue('seguro', v)} />
                    </div>

                    <div className="flex items-center justify-between py-1">
                        <div>
                            <p className="text-sm font-medium">Predeterminada</p>
                            <p className="text-xs text-gray-500">Usada automáticamente para notificaciones</p>
                        </div>
                        <Switch checked={predeterminado} onCheckedChange={(v) => setValue('predeterminado', v)} />
                    </div>

                    <div className="flex items-center justify-between py-1">
                        <div>
                            <p className="text-sm font-medium">Activa</p>
                            <p className="text-xs text-gray-500">Desactivar sin eliminar</p>
                        </div>
                        <Switch checked={activo} onCheckedChange={(v) => setValue('activo', v)} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                            {loading ? 'Guardando...' : editing ? 'Actualizar cuenta' : 'Agregar cuenta'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
