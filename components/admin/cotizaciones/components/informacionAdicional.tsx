import { ChevronRight, ChevronLeft, Eye, Printer, Save, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InformacionAdicionalProps } from '../types'


export function InformacionAdicional({
  lugarRecojo,
  setLugarRecojo,
  formaEntrega,
  setFormaEntrega,
  formaPago,
  setFormaPago,
  terminosCondiciones,
  setTerminosCondiciones,
  certificadosCalidad,
  setCertificadosCalidad,
  tieneLaboratorio,
  // Nuevas props para formas de pago de BD
  formasPago,
  formaPagoSeleccionada,
  setFormaPagoSeleccionada,
  formasPagoLoading,
  onAnterior,
  onVistaPrevia,
  onGuardar
}: InformacionAdicionalProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
          <CardDescription>Detalles adicionales para la cotización</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mostrar campos específicos solo si NO hay productos de laboratorio */}
          {!tieneLaboratorio && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="lugarRecojo">Lugar de Recojo</Label>
                <Input
                  id="lugarRecojo"
                  value={lugarRecojo}
                  onChange={(e) => setLugarRecojo(e.target.value)}
                  placeholder="Ej: 4 de Abril en nuestro centro de aclimatación ubicado en Pay Pay - Yonan (a 25km cruce)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="formaEntrega">Forma de Entrega</Label>
                <Textarea
                  id="formaEntrega"
                  value={formaEntrega}
                  onChange={(e) => setFormaEntrega(e.target.value)}
                  placeholder="Especifique cuándo y cómo se entregará el producto"
                  rows={2}
                />
              </div>
            </>
          )}

          <div className="grid gap-2">
            <Label htmlFor="formaPagoBD">Método de Pago</Label>
            <Select 
              value={formaPagoSeleccionada} 
              onValueChange={setFormaPagoSeleccionada}
              disabled={formasPagoLoading}
            >
              <SelectTrigger id="formaPagoBD">
                <SelectValue placeholder={formasPagoLoading ? "Cargando..." : "Seleccione el método de pago"} />
              </SelectTrigger>
              <SelectContent>
                {formasPago.map((formaPagoBD) => (
                  <SelectItem key={formaPagoBD.form_pa_id_int} value={formaPagoBD.form_pa_id_int}>
                    {formaPagoBD.form_pa_desc_vac || `Forma de pago ${formaPagoBD.form_pa_tipo_int}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="terminosCondiciones">Términos y Condiciones</Label>
            <Textarea
              id="terminosCondiciones"
              value={terminosCondiciones}
              onChange={(e) => setTerminosCondiciones(e.target.value)}
              placeholder="Ingrese los términos y condiciones de la cotización"
              rows={5}
            />
          </div>

          {/* Mostrar certificados solo si NO hay productos de laboratorio 
          {!tieneLaboratorio && (
            <div className="grid gap-2">
              <Label htmlFor="certificadosCalidad">Certificados de Calidad</Label>
              <Textarea
                id="certificadosCalidad"
                value={certificadosCalidad}
                onChange={(e) => setCertificadosCalidad(e.target.value)}
                placeholder="Ingrese los certificados de calidad"
                rows={3}
              />
            </div>
          )}*/}
        </CardContent>
        <CardFooter>
          <div className="mt-4 space-y-2 w-full">
            <h3 className="font-semibold">Métodos de Pago</h3>
            <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Banco de Crédito del Perú BCP</p>
              <p>Cuenta corriente: 570 1149166-0-11</p>
              <p>CCI: 002-57-000-1149-1660-1101</p>
              <p>Realizar su depósito a la Cuenta Corriente de AS LABORATORIOS CONTROL BIOLOGICO S.A.C</p>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-8 flex justify-between">
        <div className="text-sm text-gray-500">
          Paso 3 de 3 - Información Adicional
        </div>
        <div className="flex justify-between gap-3">
          <Button
            className="border-gray-800 text-gray-900 hover:bg-gray-100"
            variant="outline"
            onClick={onAnterior}
            type="button">
            <ChevronLeft className="h-4 w-4" />
            Volver a Productos/Servicios
          </Button>
          <Button
            onClick={onGuardar}
            className="gap-2 bg-[#1a1a2e] hover:bg-[#24243c]"
            type="button">
            <Save className="h-4 w-4" />
            Guardar
          </Button>
          <Button
            onClick={onVistaPrevia}
            className="gap-2 bg-green-600 hover:bg-green-700"
            type="button">
            <Eye className="h-4 w-4" />
            Vista Previa
          </Button>
        </div>
      </div>
    </>
  )
}