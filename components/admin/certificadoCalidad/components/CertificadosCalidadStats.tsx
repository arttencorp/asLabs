"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Image, Clock } from "lucide-react"
import type { CertificadosCalidadStats } from '../types/index'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface CertificadosCalidadStatsProps {
  stats: CertificadosCalidadStats
  loading?: boolean
}

export function CertificadosCalidadStatsComponent({ stats, loading }: CertificadosCalidadStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Certificados
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            certificados registrados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Con Imagen
          </CardTitle>
          <Image className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conImagen}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0 ? Math.round((stats.conImagen / stats.total) * 100) : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Solo Texto
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.sinImagen}</div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0 ? Math.round((stats.sinImagen / stats.total) * 100) : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Última Actualización
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.ultimaActualizacion ? (
              <Badge variant="secondary" className="text-xs">
                {formatDistanceToNow(new Date(stats.ultimaActualizacion), { 
                  addSuffix: true, 
                  locale: es 
                })}
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">Sin datos</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            cambio más reciente
          </p>
        </CardContent>
      </Card>
    </div>
  )
}