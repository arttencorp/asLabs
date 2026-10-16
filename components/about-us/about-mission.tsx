"use client"

import Image from "next/image"
import { Eye, FlaskConical, Sprout, Target } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const milestones = [
  { year: "1997", title: "Origen", text: "AS Laboratorios nace en Trujillo con una visión centrada en biotecnología vegetal.", icon: Sprout },
  { year: "Evolución", title: "Capacidades conectadas", text: "Integramos microbiología, diagnóstico agrícola, control biológico y soporte a investigación.", icon: FlaskConical },
  { year: "Hoy", title: "Una plataforma científica", text: "Laboratorio, vivero, campo y genómica operan como un flujo técnico continuo.", icon: Target },
]

export default function AboutMission() {
  return (
    <section id="mision" data-navbar-theme="light" className="scroll-mt-28 bg-[#f5f7f4] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <ScrollReveal className="grid gap-7 border-b border-[#cfd8d2] pb-9 lg:grid-cols-[1fr_.78fr] lg:items-end">
          <div><p className="text-[11px] font-semibold text-[#0b7a55]">Nuestra historia</p><h2 className="mt-3 max-w-[820px] text-[clamp(2.1rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-.045em] text-[#17211d]">Una trayectoria que amplió su alcance sin perder el propósito.</h2></div>
          <p className="max-w-[520px] text-sm leading-7 text-[#5d6c64] lg:justify-self-end">Convertimos conocimiento científico en soluciones para la agricultura, desde la propagación vegetal hasta el diagnóstico molecular.</p>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
          <ScrollReveal className="relative min-h-[420px] overflow-hidden sm:min-h-[590px]">
            <Image src="/new/AlternativasSosteniblesParaeLFuturo.jpeg" alt="Trabajo de AS Laboratorios en biotecnología vegetal" fill className="object-cover" sizes="(min-width:1024px) 54vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/84 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-[520px] p-5 text-white sm:p-8"><p className="text-[10px] font-semibold text-[#b8d8c8]">Nuestro propósito</p><p className="mt-3 text-xl font-medium leading-snug sm:text-2xl">Hacer que la ciencia sea útil, comprensible y aplicable en cada etapa productiva.</p></div>
          </ScrollReveal>

          <div className="border-t border-[#cfd8d2]">
            {milestones.map((milestone) => <div key={milestone.year} className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#cfd8d2] py-6 sm:grid-cols-[58px_1fr] sm:py-8"><span className="grid h-10 w-10 place-items-center border border-[#b9c9bf] text-[#0b7a55]"><milestone.icon className="h-4 w-4" /></span><div><p className="text-[10px] font-semibold text-[#b16f2d]">{milestone.year}</p><h3 className="mt-1 text-lg font-medium tracking-[-.02em] text-[#17211d]">{milestone.title}</h3><p className="mt-2 text-xs leading-6 text-[#627168]">{milestone.text}</p></div></div>)}
            <div className="grid border-b border-[#cfd8d2] sm:grid-cols-2">
              <div className="border-b border-[#cfd8d2] p-5 sm:border-b-0 sm:border-r sm:p-6"><Target className="h-5 w-5 text-[#0b7a55]" /><h3 className="mt-5 text-lg font-medium">Misión</h3><p className="mt-2 text-xs leading-6 text-[#627168]">Desarrollar soluciones biotecnológicas rigurosas y sostenibles para agricultura, ambiente e investigación.</p></div>
              <div className="p-5 sm:p-6"><Eye className="h-5 w-5 text-[#d5a34f]" /><h3 className="mt-5 text-lg font-medium">Visión</h3><p className="mt-2 text-xs leading-6 text-[#627168]">Ser un referente latinoamericano por la calidad científica, innovación y capacidad de aplicación.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
