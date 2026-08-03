'use client'

import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function AboutImpact() {
  const yearsOfExperience = new Date().getFullYear() - 1997
  const impacts = [
    {
      value: yearsOfExperience,
      suffix: "",
      label: "Años",
      description: "Trayectoria en biotecnología agrícola",
    },
    {
      value: 1000,
      suffix: "+",
      label: "Hectáreas",
      description: "Donde se implementan nuestras soluciones",
    },
    {
      value: 30,
      suffix: "+",
      label: "Profesionales",
      description: "Equipo dedicado a la excelencia",
    },
    {
      value: 100,
      suffix: "%",
      label: "Sostenible",
      description: "Compromiso con el medio ambiente",
    },
  ]

  return (
    <section id="impacto" data-navbar-theme="dark" className="relative w-full scroll-mt-32 overflow-hidden bg-gradient-to-br from-[#173f2e] via-[#276b44] to-[#173f2e] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-10"></div>
      <div className="max-w-5xl mx-auto relative">
        <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-green-100 uppercase tracking-[0.15em] mb-4">
            Resultados
          </p>
          <h2 className="mb-6 text-3xl font-serif font-bold text-white sm:text-4xl md:text-5xl">Nuestro impacto</h2>
          <p className="text-lg text-green-50 max-w-2xl mx-auto">
            Contribuciones concretas a la agricultura sostenible y la educación científica en el Perú
          </p>
        </div>
        </ScrollReveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.1}>
          {impacts.map((impact, index) => (
            <StaggerItem key={index}>
              <div className="h-full rounded-2xl border border-white/[0.15] bg-white/10 p-6 text-center text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.15] hover:shadow-xl">
                <p className="mb-2 text-4xl font-serif font-bold text-white sm:text-5xl">
                  <AnimatedCounter value={impact.value} suffix={impact.suffix} />
                </p>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[#cce8d2]">{impact.label}</p>
                <p className="text-sm text-white/70">{impact.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal delay={0.1}>
        <div className="pt-12 border-t border-white border-opacity-30">
          <h3 className="text-2xl font-serif font-bold text-white mb-4 text-center">Compromiso con la Sostenibilidad</h3>
          <p className="text-lg text-green-50 max-w-3xl mx-auto text-center leading-relaxed">
            Nuestras soluciones en biotecnología vegetal y control biológico reducen significativamente el uso de agroquímicos,
            promoviendo una agricultura responsable que beneficia tanto a productores como al medio ambiente.
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
