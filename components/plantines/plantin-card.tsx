"use client"

import Image from "next/image"
import { ArrowUpRight, BadgeCheck, Clock3, FileText, ShieldCheck, TrendingUp } from "lucide-react"
import { Plantin } from "./types"
import { WhatsAppContact } from "@/components/whatsapp-contact"

interface PlantinCardProps {
  plantin: Plantin
  onTechnicalSheet: (plantin: Plantin) => void
}

export default function PlantinCard({ plantin, onTechnicalSheet }: PlantinCardProps) {
  const status = plantin.isResearch
    ? { label: "En investigación", className: "text-[#315f80] border-[#9bb4c7] bg-[#f1f6fa]" }
    : plantin.isProduction
      ? { label: "En producción", className: "text-[#98601d] border-[#dcc39f] bg-[#fff9ed]" }
      : plantin.available
        ? { label: "Disponible", className: "text-[#0b6b49] border-[#9bc6ad] bg-[#eff8f2]" }
        : { label: "No disponible", className: "text-[#68716c] border-[#cdd3cf] bg-[#f3f5f3]" }

  return (
    <article className="group grid overflow-hidden border border-[#d2dbd5] bg-white transition-colors duration-300 hover:border-[#7ca58e] md:grid-cols-[220px_minmax(0,1fr)_190px] xl:grid-cols-[250px_minmax(0,1fr)_205px]">
      <div className="relative min-h-[205px] overflow-hidden bg-[#e8f0ea] md:min-h-[220px]">
        <Image src={plantin.image || "/biotecnologia-vegetal.png"} alt={`${plantin.name}, plantín in vitro de ${plantin.category.toLowerCase()}`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="(max-width: 767px) 100vw, 250px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/58 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 border border-white/30 bg-[#062b22]/72 px-3 py-1 text-[9px] font-semibold text-white backdrop-blur-md">{plantin.category}</span>
      </div>

      <div className="min-w-0 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center border border-[#cbd8cf] text-[#2e7048]"><plantin.icon className="h-4 w-4" /></span>
            <div className="min-w-0"><h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-[#183828] sm:text-xl">{plantin.name}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-[#64736b]">{plantin.description}</p></div>
          </div>
          <span className={`shrink-0 border px-2.5 py-1 text-[9px] font-semibold ${status.className}`}>{status.label}</span>
        </div>

        <div className="mt-5 grid border-y border-[#e0e6e2] sm:grid-cols-2">
          <div className="flex items-center gap-3 py-3 sm:border-r sm:pr-4"><TrendingUp className="h-4 w-4 shrink-0 text-[#4b8a61]" /><div><span className="text-[9px] font-semibold text-[#7b8981]">Rendimiento</span><strong className="block text-xs text-[#214332]">{plantin.yield && plantin.yield !== "-" ? plantin.yield : "Según variedad"}</strong></div></div>
          <div className="flex items-center gap-3 border-t border-[#e0e6e2] py-3 sm:border-l sm:border-t-0 sm:pl-4"><Clock3 className="h-4 w-4 shrink-0 text-[#4b8a61]" /><div><span className="text-[9px] font-semibold text-[#7b8981]">{plantin.category === "Ornamentales" ? "Entrega" : "Cosecha"}</span><strong className="block text-xs text-[#214332]">{plantin.harvestTime || "A consultar"}</strong></div></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {plantin.features.slice(0, 3).map((feature) => <span key={feature} className="flex items-center gap-1.5 text-[10px] font-medium text-[#5f6f66]"><BadgeCheck className="h-3.5 w-3.5 text-[#4b8a61]" />{feature}</span>)}
        </div>
        {!!plantin.resistance?.length && <div className="mt-4 flex items-center gap-2 text-[10px] text-[#6d7a73]"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#4b8a61]" /><span className="line-clamp-1"><strong className="text-[#44564c]">Tolerancia:</strong> {plantin.resistance.slice(0, 2).join(", ")}</span></div>}
      </div>

      <div className="flex flex-col justify-center border-t border-[#dfe6e1] bg-[#f8faf8] px-5 py-4 md:border-l md:border-t-0">
        <p className="text-[9px] font-semibold text-[#809087]">Consulta técnica</p>
        {plantin.available ? (
          <WhatsAppContact message={`Hola, quisiera cotizar ${plantin.name}`} className="group/action mt-2 flex w-full items-center justify-between border-y border-[#cdd8d1] py-3 text-left text-xs font-semibold text-[#0b6b49] transition hover:border-[#0b6b49]"><span>Solicitar cotización</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" /></WhatsAppContact>
        ) : plantin.isResearch ? (
          <a href="/research/banano-baby" className="group/action mt-2 flex w-full items-center justify-between border-y border-[#cdd8d1] py-3 text-xs font-semibold text-[#315f80]"><span>Ver investigación</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" /></a>
        ) : (
          <span className="mt-2 border-y border-[#d9dfdb] py-3 text-xs font-semibold text-[#89928d]">Sin disponibilidad</span>
        )}
        <button type="button" onClick={() => onTechnicalSheet(plantin)} className="group/action flex w-full items-center justify-between border-b border-[#cdd8d1] py-3 text-left text-xs font-semibold text-[#394b42] transition hover:border-[#0b6b49] hover:text-[#0b6b49]"><span className="flex items-center gap-2"><FileText className="h-3.5 w-3.5" />Ficha técnica</span><ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5" /></button>
      </div>
    </article>
  )
}
