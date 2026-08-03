"use client"

import { Eye, FlaskConical, Sprout, Target } from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const milestones = [
  { year: "1997", title: "El inicio", text: "Nacemos en Trujillo con una visión enfocada en biotecnología vegetal.", icon: Sprout },
  { year: "Evolución", title: "Más capacidades", text: "Integramos microbiología, diagnóstico agrícola y control biológico.", icon: FlaskConical },
  { year: "Hoy", title: "Ciencia aplicada", text: "Conectamos laboratorio, vivero, campo e investigación en una sola propuesta.", icon: Target },
]

export default function AboutMission() {
  return (
    <section id="mision" data-navbar-theme="light" className="w-full scroll-mt-32 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left - Text Content */}
          <ScrollReveal direction="right" className="space-y-7">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
                  Nuestra Trayectoria
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold leading-tight text-gray-900 sm:text-5xl">Nuestra <span className="text-[#2e7d32]">historia</span></h2>
              </div>
              <p className="max-w-2xl text-base font-medium leading-7 text-gray-700 sm:text-lg sm:leading-8">
                Desde 1997 convertimos conocimiento científico en soluciones para la agricultura peruana. Crecimos desde la biotecnología vegetal hasta integrar diagnóstico, control biológico, producción de plantines e investigación aplicada.
              </p>
            </div>

            <StaggerGroup className="relative grid gap-3 sm:grid-cols-3" staggerDelay={0.1}>
              <span className="absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-[#bfd2c2] sm:block" />
              {milestones.map((milestone) => {
                const Icon = milestone.icon
                return (
                  <StaggerItem key={milestone.year} className="relative flex gap-4 rounded-2xl border border-[#dfe9e1] bg-[#f7faf7] p-4 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-white bg-[#2e7d32] text-white shadow-sm sm:mb-4">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d06d28]">{milestone.year}</p>
                      <h3 className="mt-1 text-base font-bold text-gray-900">{milestone.title}</h3>
                      <p className="mt-1.5 text-xs font-medium leading-5 text-gray-600">{milestone.text}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </ScrollReveal>

          {/* Right - Image */}
          <ScrollReveal direction="left" delay={0.1} className="group relative order-last min-h-[340px] h-full overflow-hidden rounded-[1.75rem] shadow-[0_28px_80px_-34px_rgba(12,57,38,0.5)] sm:min-h-[480px] lg:min-h-[560px]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AGROINDUSTRIAL%20ANALISIS-ObbdnPOmz6huCECzNFRd8h6eOPR2nr.webp"
              alt="Investigadores de AS Laboratorios en acción"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </ScrollReveal>
        </div>

        <StaggerGroup className="mt-10 grid gap-4 border-t border-gray-200 pt-8 sm:mt-12 sm:grid-cols-2" staggerDelay={0.12}>
          <StaggerItem className="rounded-2xl border border-[#dfe9e1] bg-[#f7faf7] p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32]"><Target className="h-5 w-5" /></div>
              <h3 className="text-xl font-serif font-bold text-gray-900 sm:text-2xl">Misión</h3>
            </div>
            <p className="text-sm font-medium leading-6 text-gray-700">Desarrollar soluciones biotecnológicas innovadoras y sostenibles para la agricultura peruana, la conservación ambiental y la formación científica.</p>
          </StaggerItem>

          <StaggerItem className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-[#e65100]"><Eye className="h-5 w-5" /></div>
              <h3 className="text-xl font-serif font-bold text-gray-900 sm:text-2xl">Visión</h3>
            </div>
            <p className="text-sm font-medium leading-6 text-gray-700">Ser referentes latinoamericanos en biotecnología agrícola por la calidad de nuestra investigación, innovación continua y compromiso sostenible.</p>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  )
}
