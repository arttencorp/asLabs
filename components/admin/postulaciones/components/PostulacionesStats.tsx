'use client'

import { Users, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PostulanteConPuesto } from '../hooks/usePostulaciones'

interface PostulacionesStatsProps {
    postulaciones: PostulanteConPuesto[]
}

export function PostulacionesStats({ postulaciones }: PostulacionesStatsProps) {
    const total = postulaciones.length
    const pendientes = postulaciones.filter(
        (p) => p.Estado_Postulacion?.estpost_nom_vac === 'PENDIENTE'
    ).length
    const aceptados = postulaciones.filter(
        (p) => p.Estado_Postulacion?.estpost_nom_vac === 'ACEPTADO'
    ).length
    const rechazados = postulaciones.filter(
        (p) => p.Estado_Postulacion?.estpost_nom_vac === 'RECHAZADO'
    ).length

    const stats = [
        { label: 'Total', value: total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pendientes', value: pendientes, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Aceptados', value: aceptados, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Rechazados', value: rechazados, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bg}`}>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
