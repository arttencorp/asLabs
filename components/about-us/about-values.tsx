"use client"

import { HandHeart, Leaf, Microscope, ShieldCheck } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const values = [
  { icon: Microscope, title: "Excelencia científica", description: "Métodos claros, revisión técnica y aprendizaje permanente." },
  { icon: Leaf, title: "Sostenibilidad", description: "Soluciones que consideran productividad e impacto ambiental." },
  { icon: HandHeart, title: "Compromiso", description: "Conocimiento compartido para que más personas puedan aplicarlo." },
  { icon: ShieldCheck, title: "Integridad", description: "Decisiones coherentes, información protegida y comunicación honesta." },
]

export default function AboutValues() {
  return (
    <section id="valores" data-navbar-theme="dark" className="scroll-mt-28 bg-[#062b22] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <ScrollReveal className="grid gap-7 border-b border-white/15 pb-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div><p className="text-[11px] font-semibold text-[#a8d8c1]">Nuestros valores</p><h2 className="mt-3 text-[clamp(2rem,3.8vw,3.8rem)] font-medium leading-[1.03] tracking-[-.045em]">Cómo se reconoce nuestro trabajo.</h2></div>
          <p className="max-w-[590px] text-sm leading-7 text-white/60 lg:justify-self-end">No son declaraciones decorativas. Son criterios que orientan cómo investigamos, atendemos y construimos relaciones de largo plazo.</p>
        </ScrollReveal>
        <div className="mt-8 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => <article key={value.title} className="border-b border-r border-white/15 p-5 sm:min-h-[230px] sm:p-6"><value.icon className="h-5 w-5 text-[#d5a34f]" /><h3 className="mt-12 text-lg font-medium">{value.title}</h3><p className="mt-3 text-xs leading-6 text-white/55">{value.description}</p></article>)}
        </div>
      </div>
    </section>
  )
}
