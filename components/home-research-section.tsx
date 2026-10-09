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
    <section data-navbar-theme="light" className="border-y border-[#dfe7e1] bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-9 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <ScrollReveal className="lg:sticky lg:top-28 lg:h-fit">
          <span className="text-[10px] font-semibold text-[#2e7048]">Investigación e innovación</span>
          <h2 className="mt-3 max-w-[540px] text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.03] tracking-[-0.04em] text-[#173428]">Preguntas de campo, respuestas de laboratorio.</h2>
          <p className="mt-5 max-w-[520px] text-sm leading-6 text-[#63736b]">Genética, microorganismos y cultivo de tejidos orientados a problemas concretos de la agricultura.</p>
          <Link href="/research" className="group mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#173428] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#245a40]">
            Explorar investigación
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>

        <StaggerGroup className="overflow-hidden rounded-[1.5rem] border border-[#dfe7e1] bg-[#f7f9f6]" staggerDelay={0.09}>
          {projects.map((project, index) => (
            <StaggerItem key={project.title}>
              <Link href={project.href} className="group grid border-b border-[#dfe7e1] bg-[#f7f9f6] transition-colors last:border-b-0 hover:bg-white sm:grid-cols-[180px_1fr]">
                <div className="relative min-h-[168px] overflow-hidden sm:min-h-[190px]">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b3024]/40 via-transparent to-transparent" />
                  <span className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${project.color}`}>
                    <project.icon className="h-3.5 w-3.5" />
                    {project.label}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-4"><span className="text-[10px] font-medium text-[#9aaa9f]">Proyecto activo · 0{index + 1}</span><ArrowRight className="h-4 w-4 text-[#2e7048] transition-transform group-hover:translate-x-1" /></div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#173428] sm:text-xl">{project.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#66756e] sm:text-sm sm:leading-6">{project.description}</p>
                  <div className="mt-4 h-px w-12 bg-[#c59b52] transition-all duration-300 group-hover:w-20" />
                  </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
