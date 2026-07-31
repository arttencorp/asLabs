"use client"

import Image from "next/image"
import { BadgeCheck, Clock3, FileText, MessageCircle, ShieldCheck, TrendingUp } from "lucide-react"
import { Plantin } from "./types"
import { handleWhatsAppContact } from "./utils"

interface PlantinCardProps {
  plantin: Plantin
  onTechnicalSheet: (plantin: Plantin) => void
}

export default function PlantinCard({ plantin, onTechnicalSheet }: PlantinCardProps) {
  const status = plantin.isResearch
    ? { label: "En investigación", className: "bg-blue-600 text-white" }
    : plantin.isProduction
      ? { label: "En producción", className: "bg-amber-500 text-white" }
      : plantin.available
        ? { label: "Disponible", className: "bg-[#2e7048] text-white" }
        : { label: "No disponible", className: "bg-gray-600 text-white" }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dfe8e1] bg-white shadow-[0_18px_55px_-42px_rgba(14,60,38,0.65)] transition duration-300 hover:-translate-y-1 hover:border-[#b8d1bf] hover:shadow-[0_26px_65px_-38px_rgba(14,60,38,0.5)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8f0ea]">
        <Image
          src={plantin.image || "/biotecnologia-vegetal.png"}
          alt={`${plantin.name}, plantín in vitro de ${plantin.category.toLowerCase()}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] shadow-sm ${status.className}`}>
          {status.label}
        </span>
        <span className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-white/90 px-3 py-1 text-[11px] font-bold text-[#214332] backdrop-blur-sm">
          {plantin.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e7f1e8] text-[#2e7048]">
            <plantin.icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-snug text-[#183828] sm:text-xl">{plantin.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">{plantin.description}</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-100 bg-[#f8faf8]">
          <div className="border-r border-gray-100 p-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              <TrendingUp className="h-3.5 w-3.5 text-[#4b8a61]" />Rendimiento
            </span>
            <strong className="mt-1.5 block text-sm text-[#214332]">{plantin.yield && plantin.yield !== "-" ? plantin.yield : "Según variedad"}</strong>
          </div>
          <div className="p-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              <Clock3 className="h-3.5 w-3.5 text-[#4b8a61]" />{plantin.category === "Ornamentales" ? "Entrega" : "Cosecha"}
            </span>
            <strong className="mt-1.5 block text-sm text-[#214332]">{plantin.harvestTime || "A consultar"}</strong>
          </div>
        </div>

        <div className="mb-5 space-y-2">
          {plantin.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-xs font-medium leading-5 text-gray-600">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#4b8a61]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {plantin.resistance && plantin.resistance.length > 0 && (
          <div className="mb-5 mt-auto flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#4b8a61]" />
            <span className="line-clamp-1"><strong className="font-semibold text-gray-700">Tolerancia:</strong> {plantin.resistance.slice(0, 2).join(", ")}</span>
          </div>
        )}

        <div className={`${plantin.resistance?.length ? "" : "mt-auto border-t border-gray-100 pt-4"} grid grid-cols-2 gap-2.5`}>
          {plantin.available ? (
            <button type="button" onClick={() => handleWhatsAppContact(plantin.name)} className="flex items-center justify-center gap-2 rounded-xl bg-[#2e7048] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#245c3b]">
              <MessageCircle className="h-4 w-4" />Cotizar
            </button>
          ) : plantin.isResearch ? (
            <a href="/research/banano-baby" className="flex items-center justify-center rounded-xl bg-blue-600 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700">Investigación</a>
          ) : (
            <button type="button" disabled className="cursor-not-allowed rounded-xl bg-gray-200 px-3 py-3 text-sm font-bold text-gray-500">No disponible</button>
          )}
          <button type="button" onClick={() => onTechnicalSheet(plantin)} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-bold text-gray-700 transition hover:border-[#b8d1bf] hover:bg-[#f5f8f5]">
            <FileText className="h-4 w-4" />Ficha técnica
          </button>
        </div>
      </div>
    </article>
  )
}
