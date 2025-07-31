import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InformacionGeneralProps} from "../types"

export function InformacionGeneral({
  numeroCotizacion,
  setNumeroCotizacion,
  fechaEmision,
  setFechaEmision,
  fechaVencimiento,
  setFechaVencimiento,
  razonSocial,
  setRazonSocial,
  dniRuc,
  setDniRuc,
  direccion,
  setDireccion,
  telefono,
  setTelefono,
  onSiguiente
}: InformacionGeneralProps) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Cotización</CardTitle>
            <CardDescription>Datos generales de la cotización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="numeroCotizacion">Número de Cotización</Label>
              <Input
                id="numeroCotizacion"
                value={numeroCotizacion}
                onChange={(e) => setNumeroCotizacion(e.target.value)}
              />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="fechaEmision">Fecha de Emisión</Label>
                <Input
                  id="fechaEmision"
                  type="date"
                  value={fechaEmision}
                  onChange={(e) => setFechaEmision(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                <Input
                  id="fechaVencimiento"
                  type="date"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Ingresa los datos del cliente para la cotización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="razonSocial">Razón Social</Label>
              <Input
                id="razonSocial"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                placeholder="Nombre de la empresa o razón social"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dniRuc">DNI/RUC</Label>
              <Input
                id="dniRuc"
                value={dniRuc}
                onChange={(e) => setDniRuc(e.target.value)}
                placeholder="Número de DNI o RUC"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección completa"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Número de teléfono"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={onSiguiente}>
          Siguiente: Productos y Servicios
        </Button>
      </div>
    </>
  )
}