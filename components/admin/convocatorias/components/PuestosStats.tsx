'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, CheckCircle, Clock, XCircle, Ban } from 'lucide-react'
import type { PuestosStatsProps } from '../types'

export function PuestosStats({ puestos }: PuestosStatsProps) {
  const total = puestos.length
  const enConvocatoria = puestos.filter(p => 
    p.Estado_Puesto?.estpuest_nom_vac?.toUpperCase() === 'EN CONVOCATORIA'
  ).length
  const enEvaluacion = puestos.filter(p => 
    p.Estado_Puesto?.estpuest_nom_vac?.toUpperCase() === 'EN EVALUACIÓN'
  ).length
  const finalizados = puestos.filter(p => {
    const estado = p.Estado_Puesto?.estpuest_nom_vac?.toUpperCase()
    return estado === 'FINALIZADO' || estado === 'DESIERTO' || estado === 'CANCELADO'
  }).length

  const stats = [
    { label: 'Total Puestos', value: total, icon: Briefcase, color: 'text-blue-600' },
    { label: 'En Convocatoria', value: enConvocatoria, icon: CheckCircle, color: 'text-green-600' },
    { label: 'En Evaluación', value: enEvaluacion, icon: Clock, color: 'text-yellow-600' },
    { label: 'Cerrados', value: finalizados, icon: Ban, color: 'text-gray-600' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
