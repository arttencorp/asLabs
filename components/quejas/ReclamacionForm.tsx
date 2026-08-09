'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const AREAS = [
    'Laboratorio de Análisis',
    'Biotecnología Vegetal',
    'Control Biológico',
    'Plantines',
    'Tienda / Comercial',
    'Atención al Cliente',
    'Logística y Despacho',
    'Administración',
    'Otro',
]

const schema = z.object({
    tipo: z.enum(['queja', 'reclamo'], { required_error: 'Selecciona el tipo' }),
    nombre: z.string().min(3, 'Nombre completo requerido (mínimo 3 caracteres)'),
    email: z.string().email('Email inválido'),
    telefono: z.string().optional(),
    tipo_documento: z.string().optional(),
    num_documento: z.string().optional(),
    direc: z.string().optional(),
    padre_madre: z.string().optional(),
    area: z.string().optional(),
    tipo_bien: z.enum(['producto', 'servicio']).optional(),
    servicio: z.string().optional(),
    monto: z.string().optional(),
    descripcion: z.string().min(30, 'Por favor describe con más detalle (mínimo 30 caracteres)'),
    pedido: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface ReclamacionFormProps {
    onSuccess?: (codigo: string) => void
}

export function ReclamacionForm({ onSuccess }: ReclamacionFormProps) {
    const [submitting, setSubmitting] = useState(false)
    const [codigoGenerado, setCodigoGenerado] = useState<string | null>(null)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { tipo: 'reclamo' },
    })

    const tipo = watch('tipo')

    const onSubmit = async (values: FormValues) => {
        setSubmitting(true)
        setSubmitError(null)
        try {
            const res = await fetch('/api/quejas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: values.tipo,
                    canal: 'web',
                    nombre: values.nombre,
                    email: values.email,
                    telefono: values.telefono,
                    tipo_documento: values.tipo_documento,
                    num_documento: values.num_documento,
                    direccion: values.direc,
                    padre_madre: values.padre_madre,
                    area_afectada: values.area,
                    tipo_bien: values.tipo_bien,
                    servicio_producto: values.servicio,
                    monto_reclamado: values.monto ? parseFloat(values.monto) : undefined,
                    descripcion: values.descripcion,
                    pedido_reclam: values.pedido,
                }),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || 'Error al registrar')
            setCodigoGenerado(json.codigo)
            onSuccess?.(json.codigo)
            reset()
        } catch (err: any) {
            setSubmitError(err.message || 'Ocurrió un error. Por favor intenta nuevamente.')
        } finally {
            setSubmitting(false)
        }
    }

    if (codigoGenerado) {
        return (
            <div className="text-center py-10 space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                    {tipo === 'reclamo' ? 'Reclamo' : 'Queja'} registrado correctamente
                </h3>
                <p className="text-gray-600">
                    Hemos recibido tu {tipo}. Recibirás una respuesta en un máximo de <strong>15 días hábiles</strong>.
                </p>
                <div className="inline-block bg-gray-900 text-white px-6 py-4 rounded-xl">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Tu código de seguimiento</p>
                    <p className="text-2xl font-mono font-bold tracking-wider">{codigoGenerado}</p>
                </div>
                <p className="text-sm text-gray-500">
                    Guarda este código para consultar el estado de tu {tipo} en cualquier momento.
                </p>
                <Button
                    onClick={() => setCodigoGenerado(null)}
                    variant="outline"
                    className="mt-2"
                >
                    Registrar otro {tipo}
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
                <div className="flex gap-2 items-start bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    {submitError}
                </div>
            )}

            {/* Tipo */}
            <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">¿Qué deseas registrar? *</p>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { value: 'reclamo', label: 'Reclamo', desc: 'Estoy insatisfecho con un producto o servicio' },
                        { value: 'queja', label: 'Queja', desc: 'Tengo una observación o sugerencia de mejora' },
                    ].map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => setValue('tipo', opt.value as any)}
                            className={`text-left p-4 rounded-xl border-2 transition-all ${tipo === opt.value
                                ? 'border-[#2e7d32] bg-[#f1f8f1]'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <p className="font-semibold text-gray-900">{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
                        </button>
                    ))}
                </div>
                {errors.tipo && <p className="text-red-500 text-xs mt-1">{errors.tipo.message}</p>}
            </div>

            {/* Datos personales */}
            <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Tus datos personales</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Nombre completo *</Label>
                        <Input {...register('nombre')} placeholder="Juan Pérez García" className="h-10" />
                        {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Correo electrónico *</Label>
                        <Input {...register('email')} type="email" placeholder="correo@ejemplo.com" className="h-10" />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Teléfono de contacto</Label>
                        <Input {...register('telefono')} placeholder="+51 999 999 999" className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Tipo de documento</Label>
                        <Select onValueChange={(v) => setValue('tipo_documento', v)}>
                            <SelectTrigger className="h-10">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DNI">DNI</SelectItem>
                                <SelectItem value="RUC">RUC</SelectItem>
                                <SelectItem value="CE">Carnet de Extranjería</SelectItem>
                                <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Número de documento</Label>
                        <Input {...register('num_documento')} placeholder="12345678" className="h-10" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label className="text-xs text-gray-500">Padre o Madre <span className="text-gray-400 font-normal">(Para el caso de menores de edad)</span></Label>
                        <Input {...register('padre_madre')} placeholder="Nombre completo del apoderado" className="h-10" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label className="text-xs text-gray-500">Dirección</Label>
                        <Input {...register('direc')} placeholder="Av. Principal 123, Trujillo" className="h-10" />
                    </div>
                </div>
            </div>

            {/* Detalle del reclamo */}
            <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Identificación del bien contratado</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label className="text-xs text-gray-500 block mb-2">¿Qué contrataste?</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm cursor-pointer border px-4 py-2 rounded-lg hover:bg-gray-50">
                                <input type="radio" value="producto" {...register('tipo_bien')} className="accent-[#2e7d32]" />
                                Producto
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer border px-4 py-2 rounded-lg hover:bg-gray-50">
                                <input type="radio" value="servicio" {...register('tipo_bien')} className="accent-[#2e7d32]" />
                                Servicio
                            </label>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Descripción del producto o servicio contratado</Label>
                        <Input {...register('servicio')} placeholder="Análisis de suelo, Plantín..." className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Monto reclamado (S/) — opcional</Label>
                        <Input {...register('monto')} type="number" step="0.01" placeholder="0.00" className="h-10" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs text-gray-500">Área relacionada (opcional)</Label>
                        <Select onValueChange={(v) => setValue('area', v)}>
                            <SelectTrigger className="h-10">
                                <SelectValue placeholder="Seleccionar área" />
                            </SelectTrigger>
                            <SelectContent>
                                {AREAS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <p className="text-sm font-semibold text-gray-700 mb-3 mt-6">Detalle de la reclamación y pedido del consumidor</p>
                <div className="space-y-1.5 mb-4">
                    <Label className="text-xs text-gray-500">
                        Descripción detallada *{' '}
                        <span className="text-gray-400">(mínimo 30 caracteres)</span>
                    </Label>
                    <Textarea
                        {...register('descripcion')}
                        rows={5}
                        placeholder={`Describe con detalle lo ocurrido: fecha, circunstancias, personas involucradas y cualquier información relevante para tu ${tipo}...`}
                        className="resize-none text-sm"
                    />
                    {errors.descripcion && <p className="text-red-500 text-xs">{errors.descripcion.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">Pedido o compensación esperada — opcional</Label>
                    <Textarea
                        {...register('pedido')}
                        rows={2}
                        placeholder="¿Qué solución o compensación esperas de nuestra parte?"
                        className="resize-none text-sm"
                    />
                </div>
            </div>

            {/* Legal notice */}
            <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-700">Aviso legal:</strong> De conformidad con el Código de Protección y Defensa del Consumidor (Ley N.° 29571) y sus modificatorias, 
                AS Laboratorios atenderá tu {tipo} en un plazo máximo e improrrogable de <strong>15 días hábiles</strong>. 
                Tus datos personales serán tratados con confidencialidad según nuestra{' '}
                <a href="/legal" className="underline hover:text-gray-800">Política de Privacidad</a>.
            </div>

            <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 bg-[#2e7d32] hover:bg-[#1b5e20] text-white text-base font-semibold rounded-xl transition-all"
            >
                {submitting ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Registrar {tipo}
                    </>
                )}
            </Button>
        </form>
    )
}
