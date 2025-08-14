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
  return (
    <div className={`mt-3 text-xs ${esLaboratorio ? "bg-gray-50 p-3 rounded-md" : ""}`}>
          <p className="font-semibold">
            {formaPago === "completo" ? (
              <>
                Entrega inmediata previa confirmación del depósito, equivalente a S/{(total || 0).toFixed(2)}{" "}
                ({totalTexto || ""} soles)
              </>
            ) : (
              <>
                Depósito del 50% a la confirmación del pedido equivalente a S/
                {((total || 0) / 2).toFixed(2)} ({numeroATexto((total || 0) / 2) || ""} soles) y
                su entrega previa constatación del depósito del 50% restante, equivalente a S/
                {((total || 0) / 2).toFixed(2)} ({numeroATexto((total || 0) / 2) || ""} soles)
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