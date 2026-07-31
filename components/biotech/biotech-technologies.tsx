"use client"

import { Microscope, Sprout, GitBranch, FlaskConical, Snowflake, Combine } from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import { SectionHeading } from "@/components/ui/section-heading"

const tecnologias = [
  {
    icon: Microscope,
    title: "Cultivo de meristemos",
    description:
      "Técnica que utiliza los tejidos meristemáticos (puntos de crecimiento) de las plantas para obtener material libre de virus, ya que estas zonas suelen estar menos afectadas por patógenos.",
    aplicado: "Banano, papa, fresa",
  },
  {
    icon: Sprout,
    title: "Embriogénesis somática",
    description:
      "Proceso por el cual células somáticas (no reproductivas) se desarrollan formando embriones similares a los zigóticos, que luego se convierten en plantas completas.",
    aplicado: "Café, palma aceitera",
  },
  {
    icon: GitBranch,
    title: "Organogénesis",
    description:
      "Formación de órganos vegetales (brotes, raíces) a partir de tejidos no diferenciados, mediante el uso de reguladores de crecimiento específicos en el medio de cultivo.",
    aplicado: "Orquídeas, plantas ornamentales",
  },
  {
    icon: FlaskConical,
    title: "Cultivo de anteras",
    description:
      "Técnica que utiliza anteras (órganos masculinos de las flores) para producir plantas haploides, con un solo juego de cromosomas, útiles en programas de mejoramiento genético.",
    aplicado: "Arroz, trigo, maíz",
  },
  {
    icon: Snowflake,
    title: "Criopreservación",
    description:
      "Conservación de material vegetal a temperaturas ultra bajas (nitrógeno líquido, -196°C) para mantener su viabilidad durante largos períodos sin alteraciones genéticas.",
    aplicado: "Bancos de germoplasma",
  },
  {
    icon: Combine,
    title: "Cultivo de protoplastos",
    description:
      "Trabajo con células vegetales a las que se les ha eliminado la pared celular, permitiendo la fusión de células de diferentes especies para crear híbridos somáticos.",
    aplicado: "Cítricos, solanáceas",
  },
]

export default function BiotechTechnologies() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Técnicas Avanzadas"
            title="Tecnologías y Métodos en Biotecnología Vegetal"
            description="Además de la micropropagación, la biotecnología vegetal emplea diversas técnicas avanzadas para el mejoramiento y estudio de las plantas."
            align="center"
            className="mb-12"
          />
        </ScrollReveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {tecnologias.map((tec, i) => {
            const Icon = tec.icon
            return (
              <StaggerItem key={i}>
                <div className="group h-full bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_-12px_rgba(46,125,50,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Ilustración de marca en lugar de foto placeholder */}
                  <div className="relative h-32 bg-gradient-to-br from-[#2e7d32] to-[#14401a] flex items-center justify-center overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-20"></div>
                    <Icon className="relative h-12 w-12 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                    <Icon className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 text-white/10" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#2e7d32] mb-2 font-serif">{tec.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{tec.description}</p>
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2e7d32]/8 text-[#2e7d32] font-semibold px-2.5 py-1">
                        Aplicado en
                      </span>
                      <span className="font-medium text-gray-600">{tec.aplicado}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
