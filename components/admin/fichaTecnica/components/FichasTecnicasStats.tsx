"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Image as ImageIcon, ImageOff, Clock } from "lucide-react"
import { formatDate } from '@/utils/index'
import type { FichasTecnicasStats } from '../types'

interface FichasTecnicasStatsProps {
  stats: FichasTecnicasStats
}

export function FichasTecnicasStats({ stats }: FichasTecnicasStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Total Fichas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalFichas}</div>
          <p className="text-xs text-muted-foreground">
            Fichas técnicas registradas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Con Imagen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.fichasConImagen}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalFichas > 0 ? Math.round((stats.fichasConImagen / stats.totalFichas) * 100) : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ImageOff className="h-4 w-4" />
            Sin Imagen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats.fichasSinImagen}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalFichas > 0 ? Math.round((stats.fichasSinImagen / stats.totalFichas) * 100) : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Última Actualización
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">
            {stats.ultimaActualizacion ? formatDate(stats.ultimaActualizacion) : 'Sin datos'}
          </div>
          <p className="text-xs text-muted-foreground">
            Modificación más reciente
          </p>
        </CardContent>
      </Card>
    </div>
  )
}