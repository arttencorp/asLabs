import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, AlertTriangle } from "lucide-react"
import type { ProductoDatabase } from '@/types/database'

interface ProductosStatsProps {
  productos: ProductoDatabase[]
}

export function ProductosStats({ productos }: ProductosStatsProps) {
  const totalProductos = productos.length
  const productosConPrecio = productos.filter(p => p.pro_prec_unitario_int && p.pro_prec_unitario_int > 0).length
  const productosSinPrecio = totalProductos - productosConPrecio
  const precioPromedio = productos.length > 0 
    ? productos.reduce((sum, p) => sum + (p.pro_prec_unitario_int || 0), 0) / productos.length
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Total Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProductos}</div>
          <p className="text-xs text-muted-foreground">
            En el catálogo
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Con Precio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {productosConPrecio}
          </div>
          <p className="text-xs text-muted-foreground">
            Listos para venta
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Sin Precio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {productosSinPrecio}
          </div>
          <p className="text-xs text-muted-foreground">
            Requieren precio
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Precio Promedio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            S/. {precioPromedio.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Promedio general
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
