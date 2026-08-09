'use client'

import { QuejaStats } from '../types'
import { AlertTriangle, Clock, CheckCircle2, XCircle, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface QuejaStatsCardProps {
    stats: QuejaStats
    loading: boolean
}

const statItems = (stats: QuejaStats) => [
    {
        label: 'Total registros',
        value: stats.total,
        icon: BookOpen,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        label: 'Pendientes',
        value: stats.recibidos + stats.enEvaluacion + stats.enInvestigacion,
        icon: Clock,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
    },
    {
        label: 'Vencidos (sin respuesta)',
        value: stats.vencidos,
        icon: AlertTriangle,
        color: 'text-red-600',
        bg: 'bg-red-50',
    },
    {
        label: 'Resueltos',
        value: stats.resueltos,
        icon: CheckCircle2,
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
    {
        label: 'Cerrados',
        value: stats.cerrados,
        icon: XCircle,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
    },
    {
        label: 'Promedio días resolución',
        value: stats.promedioDiasResolucion,
        icon: TrendingUp,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        suffix: ' días',
    },
]

export function QuejaStatsCard({ stats, loading }: QuejaStatsCardProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardContent className="p-4">
                            <div className="h-4 bg-gray-200 rounded mb-2" />
                            <div className="h-8 bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statItems(stats).map((item) => (
                <Card key={item.label} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                        <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${item.bg} mb-2`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {item.value}{item.suffix || ''}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-tight">{item.label}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
