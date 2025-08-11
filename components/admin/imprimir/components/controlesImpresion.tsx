import { Button } from "@/components/ui/button"
import { Printer, ArrowLeft, Download, FileEdit } from "lucide-react"

interface ControlesImpresionProps {
  onVolverInicio: () => void
  onVolverACrear: () => void
  onImprimir: () => void
  tipoDocumento?: string
}

export function ControlesImpresion({ 
  onVolverInicio, 
  onVolverACrear, 
  onImprimir, 
  tipoDocumento 
}: ControlesImpresionProps) {
  return (
    <div className="container mx-auto py-4 print:hidden">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Button variant="outline" onClick={onVolverInicio} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Button>
          <Button variant="outline" onClick={onVolverACrear} className="gap-2">
            <FileEdit className="h-4 w-4" />
            Editar{" "}
            {tipoDocumento === "boleta"
              ? "boleta"
              : tipoDocumento === "factura"
                ? "factura"
                : "cotización"}
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
            <Download className="h-4 w-4" />
            Descargar PDF
          </Button>
          <Button onClick={onImprimir} className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>
    </div>
  )
}