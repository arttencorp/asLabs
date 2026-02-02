import { Card, CardContent } from "@/components/ui/card"
import { PenTool, Image, ImageOff, CalendarPlus } from "lucide-react"
import type { FirmasStats as StatsType } from "../types"

interface FirmaStatsProps {
  stats: StatsType
}

export function FirmaStats({ stats }: FirmaStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <PenTool className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Firmas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFirmas}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Image className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Con Imagen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.firmasConImagen}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <ImageOff className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sin Imagen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.firmasSinImagen}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CalendarPlus className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nuevas este mes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.nuevasEsteMes}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
