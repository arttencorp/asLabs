"use client"

import { useMemo, useState } from "react"
import { ArrowRight, Minus, Plus, SlidersHorizontal } from "lucide-react"
import { WhatsAppContact } from "@/components/whatsapp-contact"

type ProductQuoteConfiguratorProps = {
  productName: string
  catalogNumber: string
  presentation: string
  pricePen: number | null
}

function money(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value)
}

export default function ProductQuoteConfigurator({
  productName,
  catalogNumber,
  presentation,
  pricePen,
}: ProductQuoteConfiguratorProps) {
  const [quantity, setQuantity] = useState(1)
  const [variables, setVariables] = useState("")

  const message = useMemo(
    () => [
      `Hola, quisiera cotizar ${productName} (${catalogNumber}).`,
      `Cantidad: ${quantity}.`,
      variables.trim()
        ? `Presentación o variables requeridas: ${variables.trim()}.`
        : `Familia consultada: ${presentation}. Necesito ayuda para elegir la presentación correcta.`,
      "Entiendo que el importe publicado es referencial desde y que la configuración final debe ser cotizada.",
    ].join("\n"),
    [catalogNumber, presentation, productName, quantity, variables],
  )

  return (
    <div className="mt-5 border-t border-[#e5ece7] pt-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-[#14744d]" />
        <p className="text-xs font-bold text-[#294c3a]">Configura tu solicitud</p>
      </div>
      <p className="mt-2 text-[11px] leading-5 text-[#74857b]">
        Indica solo las variables que necesitas. No se asigna un precio automático a cada variante.
      </p>

      <label className="mt-4 block">
        <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#62776b]">
          Presentación, formato o número de ensayos
        </span>
        <input
          value={variables}
          onChange={(event) => setVariables(event.target.value)}
          placeholder="Ej. 100 ensayos, 500 mL, formato kit…"
          className="mt-2 h-12 w-full rounded-2xl border border-[#d8e4dc] bg-[#f8faf8] px-4 text-sm text-[#294c3a] outline-none transition placeholder:text-[#9ba8a0] focus:border-[#76a68a] focus:ring-4 focus:ring-[#76a68a]/10"
        />
      </label>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-2 pl-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[.1em] text-[#788a80]">Cantidad</p>
          <p className="text-xs font-semibold text-[#385344]">Unidades a cotizar</p>
        </div>
        <div className="inline-flex items-center rounded-full border border-[#d9e4dc] bg-white p-1">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            aria-label="Reducir cantidad"
            className="grid h-8 w-8 place-items-center rounded-full text-[#41604f] transition hover:bg-[#eaf3ec]"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-9 text-center text-sm font-black text-[#173f2d]">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((current) => current + 1)}
            aria-label="Aumentar cantidad"
            className="grid h-8 w-8 place-items-center rounded-full text-[#41604f] transition hover:bg-[#eaf3ec]"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {pricePen !== null && (
        <div className="mt-3 rounded-2xl bg-[#edf6ef] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#4e765f]">Referencia base</p>
          <p className="mt-1 text-sm font-black text-[#0b4a33]">Desde {money(pricePen)}</p>
          <p className="mt-1 text-[10px] leading-4 text-[#687c70]">No cambia al escribir una variable; el valor final se confirma por cotización.</p>
        </div>
      )}

      <WhatsAppContact
        message={message}
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#14744d] px-5 text-sm font-bold text-white shadow-lg shadow-[#14744d]/20 transition hover:-translate-y-0.5 hover:bg-[#0f5e3e]"
      >
        Solicitar cotización <ArrowRight className="h-4 w-4" />
      </WhatsAppContact>
    </div>
  )
}
