'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { AREAS_EMPRESA } from '../types'
import type { CrearQuejaData } from '@/lib/supabase/quejas'

const schema = z.object({
    tipo: z.enum(['queja', 'reclamo']),
    canal: z.enum(['web', 'presencial', 'email', 'whatsapp']),
    nombre: z.string().min(3, 'Nombre requerido'),
    email: z.string().email('Email inválido'),
    telefono: z.string().optional(),
    tipo_documento: z.string().optional(),
    num_documento: z.string().optional(),
    direccion: z.string().optional(),
    padre_madre: z.string().optional(),
    area_afectada: z.string().optional(),
    tipo_bien: z.enum(['producto', 'servicio']).optional(),
    servicio_producto: z.string().optional(),
    monto_reclamado: z.string().optional(),
    descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
    pedido_reclam: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface QuejaFormProps {
    open: boolean
    onClose: () => void
    onSubmit: (data: CrearQuejaData) => Promise<void>
    loading: boolean
}

export function QuejaForm({ open, onClose, onSubmit, loading }: QuejaFormProps) {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            tipo: 'reclamo',
            canal: 'presencial',
        },
    })

    const onFormSubmit = async (values: FormValues) => {
        await onSubmit({
            tipo: values.tipo,
            canal: values.canal,
            nombre: values.nombre,
            email: values.email,
            telefono: values.telefono,
            tipo_documento: values.tipo_documento,
            num_documento: values.num_documento,
            direccion: values.direccion,
            padre_madre: values.padre_madre,
            area_afectada: values.area_afectada,
            tipo_bien: values.tipo_bien,
            servicio_producto: values.servicio_producto,
            monto_reclamado: values.monto_reclamado ? parseFloat(values.monto_reclamado) : undefined,
            descripcion: values.descripcion,
            pedido_reclam: values.pedido_reclam,
        })
        reset()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Registrar Queja / Reclamo (Canal Presencial)</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                    {/* Tipo y canal */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Tipo *</Label>
                            <Select defaultValue="reclamo" onValueChange={(v) => setValue('tipo', v as any)}>
                                <SelectTrigger className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reclamo">Reclamo</SelectItem>
                                    <SelectItem value="queja">Queja</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Canal *</Label>
                            <Select defaultValue="presencial" onValueChange={(v) => setValue('canal', v as any)}>
                                <SelectTrigger className="h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="presencial">Presencial</SelectItem>
                                    <SelectItem value="web">Web</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Datos del reclamante */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Datos del reclamante</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs">Nombre completo *</Label>
                                <Input {...register('nombre')} className="h-9" placeholder="Juan Pérez García" />
                                {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Email *</Label>
                                <Input {...register('email')} type="email" className="h-9" placeholder="correo@ejemplo.com" />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Teléfono</Label>
                                <Input {...register('telefono')} className="h-9" placeholder="+51 999 999 999" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Tipo de documento</Label>
                                <Select onValueChange={(v) => setValue('tipo_documento', v)}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DNI">DNI</SelectItem>
                                        <SelectItem value="RUC">RUC</SelectItem>
                                        <SelectItem value="CE">Carnet de extranjería</SelectItem>
                                        <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Nro. de documento</Label>
                                <Input {...register('num_documento')} className="h-9" placeholder="12345678" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Padre o Madre (Para menores)</Label>
                                <Input {...register('padre_madre')} className="h-9" placeholder="Nombre completo" />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Dirección</Label>
                                <Input {...register('direccion')} className="h-9" placeholder="Av. Principal 123, Trujillo" />
                            </div>
                        </div>
                    </div>

                    {/* Datos del reclamo */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Datos del reclamo</p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs">Área afectada</Label>
                                <Select onValueChange={(v) => setValue('area_afectada', v)}>
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
                            <div className="space-y-1.5">
                                <Label className="text-xs">Tipo de bien contratado</Label>
                                <Select onValueChange={(v) => setValue('tipo_bien', v as any)}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="producto">Producto</SelectItem>
                                        <SelectItem value="servicio">Servicio</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Servicio / Producto (Descripción)</Label>
                                <Input {...register('servicio_producto')} className="h-9" placeholder="Análisis de suelo, Plantín..." />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Monto reclamado (S/)</Label>
                                <Input {...register('monto_reclamado')} type="number" step="0.01" className="h-9" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="space-y-1.5 mb-4">
                            <Label className="text-xs">Descripción detallada *</Label>
                            <Textarea
                                {...register('descripcion')}
                                rows={4}
                                className="resize-none text-sm"
                                placeholder="Describe detalladamente el motivo de la queja o reclamo..."
                            />
                            {errors.descripcion && <p className="text-red-500 text-xs">{errors.descripcion.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Pedido / compensación solicitada</Label>
                            <Textarea
                                {...register('pedido_reclam')}
                                rows={2}
                                className="resize-none text-sm"
                                placeholder="¿Qué espera como solución o compensación?"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading} className="bg-gray-900 hover:bg-gray-800 text-white">
                            {loading ? 'Registrando...' : 'Registrar reclamo'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
