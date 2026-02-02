'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, CheckCircle, Clock, AlertCircle, FileCheck } from 'lucide-react'
import type { DocumentoLabStatsProps } from '../types'

export function DocumentoLabStats({
  total,
  porEstado
}: DocumentoLabStatsProps) {
  // Mapear estados a iconos y colores
  const obtenerConfigEstado = (estado: string) => {
    const estadoLower = estado.toLowerCase()
    
    if (estadoLower.includes('borrador')) {
      return { icon: FileText, color: 'text-gray-500', bgColor: 'bg-gray-100' }
    }
    if (estadoLower.includes('pendiente')) {
      return { icon: Clock, color: 'text-yellow-500', bgColor: 'bg-yellow-100' }
    }
    if (estadoLower.includes('proceso')) {
      return { icon: AlertCircle, color: 'text-blue-500', bgColor: 'bg-blue-100' }
    }
    if (estadoLower.includes('emitido')) {
      return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' }
    }
    if (estadoLower.includes('anulado')) {
      return { icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-100' }
    }
    
    return { icon: FileText, color: 'text-gray-500', bgColor: 'bg-gray-100' }
  }

  const estadosOrdenados = Object.entries(porEstado)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {/* Total */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <FileCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">
            documentos registrados
          </p>
        </CardContent>
      </Card>

      {/* Estados */}
      {estadosOrdenados.slice(0, 4).map(([estado, count]) => {
        const config = obtenerConfigEstado(estado)
        const IconComponent = config.icon
        
        return (
          <Card key={estado}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{estado}</CardTitle>
              <div className={`p-1 rounded ${config.bgColor}`}>
                <IconComponent className={`h-4 w-4 ${config.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground">
                {((count / total) * 100).toFixed(0)}% del total
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
