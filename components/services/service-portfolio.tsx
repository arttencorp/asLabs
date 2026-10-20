"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, CircleCheck, FileCheck2, PackageOpen, Search, SlidersHorizontal } from "lucide-react"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export type ServicePortfolioTheme = "orange" | "emerald" | "blue" | "teal" | "purple" | "sky"

export type ServicePortfolioItem = {
  concepto: string
  icon: LucideIcon
  unidad: string
  descripcionTecnica: {
    req: string
    proc: string
    ent: string
  }
  descripcion: string
}

type ServiceAssurance = {
  icon: LucideIcon
  title: string
  desc: string
}

type ServicePortfolioProps = {
  services: ServicePortfolioItem[]
  assurances: ServiceAssurance[]
  theme: ServicePortfolioTheme
  discipline: string
  intro: string
  whatsappMessage: string
}

const themes = {
  orange: { accent: "#d87525", ink: "#8c4311", pale: "#fff0e3", line: "#edc9ad", button: "bg-[#d87525]" },
  emerald: { accent: "#247a4b", ink: "#165535", pale: "#e8f4ec", line: "#b9d8c4", button: "bg-[#247a4b]" },
  blue: { accent: "#286a99", ink: "#174b70", pale: "#e8f2f8", line: "#b9d3e4", button: "bg-[#286a99]" },
  teal: { accent: "#16756f", ink: "#0e514d", pale: "#e5f3f1", line: "#b3d8d4", button: "bg-[#16756f]" },
  purple: { accent: "#72539a", ink: "#50366f", pale: "#f0ebf6", line: "#d5c7e4", button: "bg-[#72539a]" },
  sky: { accent: "#357b9a", ink: "#245870", pale: "#e8f3f7", line: "#bdd8e3", button: "bg-[#357b9a]" },
} as const

export function ServicePortfolio({ services, assurances, theme, discipline, intro, whatsappMessage }: ServicePortfolioProps) {
  const palette = themes[theme]
  const [query, setQuery] = useState("")
  const [selectedName, setSelectedName] = useState(services[0]?.concepto ?? "")

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es")
    if (!normalizedQuery) return services

    return services.filter((service) =>
      [service.concepto, service.descripcion, service.descripcionTecnica.proc, service.unidad]
        .join(" ")
        .toLocaleLowerCase("es")
        .includes(normalizedQuery),
    )
  }, [query, services])

  const selectedService = filteredServices.find((service) => service.concepto === selectedName) ?? filteredServices[0]

  return (
    <>
      <section id="beneficios" className="scroll-mt-28 border-b border-[#d7dfda] bg-white">
        <div className="mx-auto grid max-w-[1380px] divide-y divide-[#d7dfda] px-5 md:grid-cols-4 md:divide-x md:divide-y-0 md:px-8">
          {assurances.map((assurance) => {
            const Icon = assurance.icon
            return (
              <div key={assurance.title} className="flex items-center gap-3 py-4 md:px-5 md:first:pl-0 md:last:pr-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center" style={{ color: palette.accent, background: palette.pale }}>
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <strong className="block text-[12px] font-semibold text-[#1d3d30]">{assurance.title}</strong>
                  <span className="mt-0.5 block text-[10px] text-[#708078]">{assurance.desc}</span>
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <section id="catalogo" className="scroll-mt-28 px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-8 border-b border-[#ccd7d0] pb-9 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold" style={{ color: palette.ink }}>
                <SlidersHorizontal className="h-4 w-4" /> Portafolio técnico
              </div>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-.035em] text-[#15372a] md:text-5xl">
                Encuentra el análisis que responde a tu muestra.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f7168] lg:justify-self-end md:text-base">{intro}</p>
          </div>

          <div className="mt-8 grid overflow-hidden border border-[#cfd9d2] bg-white lg:grid-cols-[.78fr_1.22fr]">
            <aside className="border-b border-[#cfd9d2] bg-[#eef2ee] lg:border-b-0 lg:border-r">
              <div className="border-b border-[#cfd9d2] p-4">
                <label className="relative block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667970]" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`Buscar en ${discipline.toLowerCase()}…`}
                    className="h-11 w-full border border-[#c6d2ca] bg-white pl-10 pr-4 text-sm text-[#17372b] outline-none transition placeholder:text-[#8c9a93] focus:border-[#5f8572] focus:ring-2 focus:ring-[#a9c6b7]/30"
                  />
                </label>
                <div className="mt-3 flex items-center justify-between text-[10px] text-[#6c7d74]">
                  <span>{filteredServices.length} resultados</span>
                  <span>Selecciona para revisar</span>
                </div>
              </div>
              <div className="max-h-[530px] overflow-y-auto overscroll-contain [scrollbar-color:#aebfb5_transparent]">
                {filteredServices.map((service) => {
                  const Icon = service.icon
                  const selected = selectedService?.concepto === service.concepto
                  return (
                    <button
                      type="button"
                      key={service.concepto}
                      onClick={() => setSelectedName(service.concepto)}
                      className="group grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-[#d7dfda] px-4 py-4 text-left transition last:border-b-0"
                      style={selected ? { background: palette.pale } : undefined}
                    >
                      <span className="grid h-10 w-10 place-items-center border bg-white" style={{ borderColor: selected ? palette.line : "#d6dfd9", color: palette.accent }}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <strong className="block text-[12px] font-semibold leading-5 text-[#1d3c30]">{service.concepto}</strong>
                        <span className="mt-0.5 block text-[10px] text-[#74847c]">Unidad: {service.unidad}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#85938c] transition-transform group-hover:translate-x-1" />
                    </button>
                  )
                })}
                {!filteredServices.length && (
                  <div className="p-8 text-center text-sm leading-6 text-[#687970]">
                    No encontramos una coincidencia. Escríbenos: podemos revisar análisis especiales.
                  </div>
                )}
              </div>
            </aside>

            <div className="relative min-h-[530px] p-6 md:p-9 lg:p-11">
              <AnimatePresence mode="wait">
                {selectedService && (
                  <motion.article
                    key={selectedService.concepto}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-start justify-between gap-5 border-b border-[#dce3de] pb-7">
                      <div>
                        <span className="text-[11px] font-semibold" style={{ color: palette.ink }}>{discipline}</span>
                        <h3 className="mt-3 max-w-2xl text-2xl font-medium leading-tight tracking-[-.025em] text-[#15372a] md:text-4xl">{selectedService.concepto}</h3>
                      </div>
                      <span className="shrink-0 border px-3 py-2 text-[10px] font-semibold" style={{ color: palette.ink, borderColor: palette.line, background: palette.pale }}>
                        {selectedService.unidad}
                      </span>
                    </div>
                    <p className="mt-7 max-w-3xl text-sm leading-7 text-[#5a6d63] md:text-[15px]">{selectedService.descripcion}</p>
                    <div className="mt-8 grid gap-px border border-[#d7dfda] bg-[#d7dfda] md:grid-cols-3">
                      {[
                        { icon: PackageOpen, label: "Muestra y requisitos", text: selectedService.descripcionTecnica.req },
                        { icon: FileCheck2, label: "Método de trabajo", text: selectedService.descripcionTecnica.proc },
                        { icon: CircleCheck, label: "Entregable", text: selectedService.descripcionTecnica.ent },
                      ].map((item) => (
                        <div key={item.label} className="bg-[#fafbf9] p-5">
                          <item.icon className="h-5 w-5" style={{ color: palette.accent }} />
                          <h4 className="mt-5 text-[11px] font-semibold text-[#244438]">{item.label}</h4>
                          <p className="mt-2 text-[11px] leading-5 text-[#697a72]">{item.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-col gap-4 border-t border-[#dce3de] pt-7 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-[11px] text-[#65776e]">
                        <CircleCheck className="h-4 w-4" style={{ color: palette.accent }} /> Orientación técnica antes de recibir la muestra
                      </div>
                      <WhatsAppContact
                        message={`${whatsappMessage}. Me interesa: ${selectedService.concepto}`}
                        className={`inline-flex h-11 items-center justify-center gap-3 px-5 text-xs font-semibold text-white transition hover:brightness-110 ${palette.button}`}
                      >
                        Solicitar orientación <ArrowRight className="h-4 w-4" />
                      </WhatsAppContact>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
