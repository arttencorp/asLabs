"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const projects = [
  {
    title: "Secuenciamiento de Fusarium",
    description: "Caracterización molecular para comprender la variabilidad del patógeno y fortalecer el diagnóstico.",
    href: "/research/secuenciamiento-fusarium",
    image: "/lab-header-bg.jpg",
    label: "Genómica",
  },
  {
    title: "Trichoderma frente a Fusarium",
    description: "Evaluación de microorganismos benéficos como alternativa para el manejo biológico.",
    href: "/research/trichoderma-fusarium",
    image: "/control-biologico.png",
    label: "Control biológico",
  },
  {
    title: "Programa Banano Baby",
    description: "Desarrollo y validación de material vegetal orientado a calidad y adaptación productiva.",
    href: "/research/banano-baby",
    image: "/plantines/bananoBabyBBG.jpeg",
    label: "Mejoramiento vegetal",
  },
]

export default function HomeResearchSection() {
  return (
    <section data-navbar-theme="light" className="border-y border-[#d6ddd8] bg-[#edf2ee] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <ScrollReveal className="grid gap-6 border-b border-[#cbd5ce] pb-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold text-[#0b7a55]">Investigación activa</p>
            <h2 className="mt-3 text-[clamp(2rem,3.8vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#17211d]">Preguntas de campo. Evidencia de laboratorio.</h2>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <p className="max-w-xl text-sm leading-7 text-[#5d6c64]">Genética, microorganismos y cultivo de tejidos aplicados a problemas concretos de la agricultura.</p>
            <Link href="/research" className="group inline-flex items-center gap-3 text-xs font-semibold text-[#0b7a55]">Ver investigación <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid border-l border-t border-[#cbd5ce] lg:grid-cols-12">
          {projects.map((project, index) => (
            <Link key={project.title} href={project.href} className={`group border-b border-r border-[#cbd5ce] bg-white ${index === 0 ? "lg:col-span-6" : "lg:col-span-3"}`}>
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[1.5/1]" : "aspect-[1.25/1] lg:aspect-[.83/1]"}`}>
                <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes={index === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 100vw"} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/55 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-white/90 px-2.5 py-1 text-[9px] font-semibold text-[#184b38] backdrop-blur">{project.label}</span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5"><h3 className={`${index === 0 ? "text-xl sm:text-2xl" : "text-base sm:text-lg"} font-medium leading-tight tracking-[-0.025em] text-[#17211d]`}>{project.title}</h3><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#0b7a55] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
                <p className="mt-3 text-[11px] leading-5 text-[#5d6c64] sm:text-xs">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
