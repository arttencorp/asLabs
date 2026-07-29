"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Dna, FlaskConical, Leaf } from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

const projects = [
  {
    title: "Secuenciamiento de Fusarium",
    description: "Caracterización molecular para comprender la variabilidad del patógeno y fortalecer el diagnóstico.",
    href: "/research/secuenciamiento-fusarium",
    image: "/lab-header-bg.jpg",
    label: "Genómica",
    icon: Dna,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Trichoderma frente a Fusarium",
    description: "Evaluación de microorganismos benéficos como alternativa para el manejo biológico de enfermedades.",
    href: "/research/trichoderma-fusarium",
    image: "/control-biologico.png",
    label: "Control biológico",
    icon: FlaskConical,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Programa Banano Baby",
    description: "Desarrollo y validación de material vegetal orientado a calidad, adaptación y valor productivo.",
    href: "/research/banano-baby",
    image: "/plantines/bananoBabyBBG.jpeg",
    label: "Mejoramiento vegetal",
    icon: Leaf,
    color: "bg-green-100 text-green-700",
  },
]

export default function HomeResearchSection() {
  return (
    <section data-navbar-theme="light" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <ScrollReveal className="mb-11 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2e7048]">Investigación e innovación</span>
            <h2 className="mt-3 text-[clamp(2.2rem,4vw,3.75rem)] leading-[1.04] tracking-[-0.04em] text-[#173428]">Proyectos que convierten preguntas en soluciones.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#63736b] sm:text-base">Exploramos genética, microorganismos y cultivo de tejidos para responder a problemas concretos de la agricultura peruana.</p>
          </div>
          <Link href="/research" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#173428] px-5 py-3 text-sm font-semibold text-white">
            Ver toda la investigación
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>

        <StaggerGroup className="grid gap-5 lg:grid-cols-3" staggerDelay={0.1}>
          {projects.map((project, index) => (
            <StaggerItem key={project.title}>
              <Link href={project.href} className="group block h-full overflow-hidden rounded-3xl border border-[#dfe7e1] bg-[#f8faf8] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#b7cdbb] hover:bg-white hover:shadow-[0_24px_65px_-34px_rgba(14,60,38,0.45)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b3024]/65 via-transparent to-transparent" />
                  <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${project.color}`}>
                    <project.icon className="h-3.5 w-3.5" />
                    {project.label}
                  </span>
                  <span className="absolute bottom-4 right-4 text-5xl font-light text-white/[0.35]">0{index + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-[#173428]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#66756e]">{project.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#dfe7e1] pt-4 text-xs font-semibold text-[#2e7048]">
                    Conocer el proyecto
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
