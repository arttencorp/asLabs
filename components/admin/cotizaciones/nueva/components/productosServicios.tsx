import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productosPreexistentes } from '../constants'
import type { Item, ProductosServiciosProps } from '../types'

export function ProductosServicios({
  items,
  preciosConIGV,
  setPreciosConIGV,
  seleccionarProducto,
  actualizarItem,
  agregarItem,
  eliminarItem,
  calcularTotales,
  onAnterior,
  onSiguiente
}: ProductosServiciosProps) {
  const { subtotal, impuesto, total } = calcularTotales()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Productos/Servicios</CardTitle>
          <div className="flex justify-between items-center mb-4">
            <CardDescription>Agrega los productos o servicios incluidos en la cotización</CardDescription>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Precios:</span>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  type="button"
                  className={`px-3 py-1 text-sm ${
                    !preciosConIGV ? "bg-[#5D9848] text-white" : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setPreciosConIGV(false)}
                >
                  SIN IGV
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm ${
                    preciosConIGV ? "bg-[#5D9848] text-white" : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setPreciosConIGV(true)}
                >
                  CON IGV
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Descripción</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Precio Unitario</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={item.descripcion || ""}
                        onChange={(e) => actualizarItem(item.id, "descripcion", e.target.value)}
                        placeholder="Descripción del producto o servicio"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.codigo || ""}
                        onValueChange={(value) => seleccionarProducto(item.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar producto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personalizado">Personalizado</SelectItem>
                          {productosPreexistentes.map((producto) => (
                            <SelectItem key={producto.id} value={producto.id}>
                              {producto.id}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.cantidad || 1}
                        onChange={(e) =>
                          actualizarItem(item.id, "cantidad", Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.precioUnitario || 0}
                        onChange={(e) =>
                          actualizarItem(item.id, "precioUnitario", Number.parseFloat(e.target.value) || 0)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">S/ {(item.total || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => eliminarItem(item.id)}
                        disabled={items.length === 1}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Button variant="outline" size="sm" className="mt-4" onClick={agregarItem} type="button">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Producto/Servicio
          </Button>

          <div className="mt-6 flex flex-col items-end space-y-2">
            <div className="flex w-full justify-between border-t pt-4 sm:w-72">
              <span>Subtotal:</span>
              <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between sm:w-72">
              <span>IGV (18%):</span>
              <span className="font-medium">S/ {impuesto.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between border-t pt-2 sm:w-72">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold">S/ {total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-between">
        <Button className="border-gray-800 text-gray-900 hover:bg-gray-100" variant="outline" onClick={onAnterior} type="button">
          Anterior: Información General
        </Button>
        <Button onClick={onSiguiente} type="button">
          Siguiente: Información Adicional
        </Button>
      </div>
    </>
  )
}