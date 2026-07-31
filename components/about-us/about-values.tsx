'use client'

import { ArrowUpRight, HandHeart, Leaf, Microscope, ShieldCheck, Sparkles } from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const values = [
  {
    number: "01",
    icon: Microscope,
    title: "Excelencia Científica",
    description: "Investigación rigurosa, innovación continua y compromiso con la calidad en cada proyecto.",
    proof: "Métodos claros, revisión técnica y aprendizaje permanente.",
    accent: "#2e7048",
    soft: "#e7f0e9",
  },
  {
    number: "02",
    icon: Leaf,
    title: "Sostenibilidad",
    description: "Prácticas agrícolas responsables que respetan el ambiente y aprovechan mejor sus recursos.",
    proof: "Soluciones que consideran productividad e impacto ambiental.",
    accent: "#6f7e35",
    soft: "#eff1df",
  },
  {
    number: "03",
    icon: HandHeart,
    title: "Compromiso Social",
    description: "Transferencia de conocimiento y capacitación para fortalecer a las comunidades agrícolas.",
    proof: "Ciencia compartida para que más personas puedan aplicarla.",
    accent: "#b66e33",
    soft: "#f7eadf",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Integridad",
    description: "Actuamos con principios éticos, responsabilidad y transparencia en todas nuestras relaciones.",
    proof: "Decisiones coherentes, información protegida y comunicación honesta.",
    accent: "#315f80",
    soft: "#e7eef4",
  },
]

export default function AboutValues() {
  return (
    <section id="valores" data-navbar-theme="light" className="relative w-full scroll-mt-32 overflow-hidden bg-[#f7f4ee] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="pointer-events-none absolute -left-48 -top-52 h-[520px] w-[520px] rounded-full bg-[#9dc7a4]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-60 -right-48 h-[560px] w-[560px] rounded-full bg-[#e3ad70]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d9cdbb] bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#a15d2d] shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Principios fundamentales
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.035em] text-[#243d31] sm:text-5xl">Nuestros valores</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#69776f] sm:text-lg">
              No son declaraciones aisladas: son criterios que orientan cómo investigamos, atendemos y construimos relaciones de largo plazo.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/80 bg-white/75 p-5 shadow-[0_20px_55px_-38px_rgba(69,54,34,.42)] backdrop-blur-lg sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a7c5e]">Una misma forma de trabajar</p>
            <p className="mt-3 text-lg font-black leading-7 text-[#304b3d]">Ciencia rigurosa, decisiones responsables y conocimiento que genera valor compartido.</p>
          </div>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2" staggerDelay={0.1}>
          {values.map((value) => {
            const Icon = value.icon
            return (
              <StaggerItem key={value.number} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white p-6 shadow-[0_20px_55px_-38px_rgba(65,51,35,.42)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_65px_-38px_rgba(65,51,35,.5)] sm:p-8">
                  <div className="absolute right-5 top-3 font-serif text-[72px] font-black leading-none opacity-[0.055] sm:right-7 sm:text-[88px]" style={{ color: value.accent }}>{value.number}</div>

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl transition duration-300 group-hover:scale-105" style={{ color: value.accent, backgroundColor: value.soft }}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full border px-3 py-1.5 text-[10px] font-black tracking-[0.12em]" style={{ color: value.accent, borderColor: `${value.accent}32`, backgroundColor: value.soft }}>
                      {value.number}
                    </span>
                  </div>

                  <div className="relative z-10 mt-7">
                    <h3 className="text-2xl font-black tracking-[-0.02em] text-[#263f33]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#6c7972] sm:text-base">{value.description}</p>
                  </div>

                  <div className="relative z-10 mt-7 flex items-start gap-3 border-t border-[#e8e3dc] pt-5">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ color: value.accent, backgroundColor: value.soft }}>
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#9a8b7c]">Cómo se vive</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[#53665c]">{value.proof}</p>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerGroup>

        <ScrollReveal className="mt-8" delay={0.1}>
          <div className="flex flex-col gap-3 rounded-2xl border border-[#ded5c8] bg-[#eee7dc]/65 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs font-semibold leading-5 text-[#66746d]">Estos principios acompañan cada proyecto, desde la primera conversación hasta la entrega final.</p>
            <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.16em] text-[#2e7048]">AS Laboratorios · Desde 1997</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
