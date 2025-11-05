import { numeroATexto } from "@/utils/index"

interface CondicionesEntregaProps {
  formaPago?: string
  total?: number
  totalTexto?: string
  lugarRecojo?: string
  formaEntrega?: string
  esLaboratorio: boolean
}

export function CondicionesEntrega({
  formaPago,
  total,
  totalTexto,
  lugarRecojo,
  formaEntrega,
  esLaboratorio
}: CondicionesEntregaProps) {
  // Cálculo seguro para pagos parciales
  const totalMonto = total || 0
  const primerPago = Math.round((totalMonto / 2) * 100) / 100 // Redondear a 2 decimales
  const segundoPago = Math.round((totalMonto - primerPago) * 100) / 100 // Lo que falta para completar

  return (
    <div className={`mt-3 text-xs ${esLaboratorio ? "bg-gray-50 p-3 rounded-md" : ""}`}>
          <p className="font-semibold">
            {formaPago === "completo" ? (
              <>
                Entrega a coordinar previa confirmación del depósito, equivalente a S/{totalMonto.toFixed(2)}{" "}
                ({totalTexto || ""} soles)
              </>
            ) : formaPago === "parcial" ? (
              <>
                50% al confirmar el pedido equivalente a S/
                {primerPago.toFixed(2)} ({numeroATexto(primerPago) || ""} soles), el 50% restante equivalente a S/
                {segundoPago.toFixed(2)} ({numeroATexto(segundoPago) || ""} soles) previa entrega del producto
              </>
            ) : (
              <>
                50% al confirmar el pedido equivalente a S/
                {primerPago.toFixed(2)} ({numeroATexto(primerPago) || ""} soles), el 50% restante equivalente a S/
                {segundoPago.toFixed(2)} ({numeroATexto(segundoPago) || ""} soles) previa entrega del producto
              </>
            )}
          </p>

          {/* Mostrar información de recojo y entrega solo si NO es producto de laboratorio */}
          {!esLaboratorio && (
            <>
              {lugarRecojo && <p>El recojo: {lugarRecojo}</p>}
              {formaEntrega && <p>Forma de entrega: {formaEntrega}</p>}
            </>
          )}
        </div>
  )
}