import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ArrowRight, Dna, Leaf, Microscope } from "lucide-react"

export default function TeamMemberSection() {
  return (
    <section data-navbar-theme="dark" className="relative overflow-hidden bg-gradient-to-br from-[#173f2e] via-[#276b44] to-[#123426]">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-[0.12]"></div>
      <div className="pointer-events-none absolute -left-32 top-0 w-96 h-96 rounded-full bg-[#43a047]/40 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#e65100]/15 blur-3xl"></div>

      <div className="relative grid items-stretch lg:grid-cols-[0.92fr_1.08fr]">
        <ScrollReveal direction="right" className="flex">
          <div className="flex w-full flex-col justify-center px-6 py-14 sm:px-10 lg:py-16 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))] lg:pr-14">
            <span className="mb-4 w-fit text-[10px] font-semibold text-[#f0c27a]">Directorio y equipo científico · Desde 1997</span>
            <h2 className="mb-4 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl">Personas que conectan laboratorio, vivero y campo.</h2>
            <p className="mb-6 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              AS Laboratorios reúne especialistas en biotecnología vegetal, microbiología, diagnóstico y producción agrícola para desarrollar soluciones con aplicación real.
            </p>
            <div className="mb-7 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.055]">
              {[{ label: "Microbiología", icon: Microscope }, { label: "Genómica", icon: Dna }, { label: "Cultivo vegetal", icon: Leaf }].map((area) => <div key={area.label} className="flex min-w-0 flex-col items-center gap-2 border-r border-white/10 px-2 py-3 text-center last:border-r-0 sm:flex-row sm:text-left"><area.icon className="h-4 w-4 shrink-0 text-[#f0c27a]" /><span className="truncate text-[9px] font-medium text-white/70 sm:text-[10px]">{area.label}</span></div>)}
            </div>
            <Link href="/sobre-nosotros" className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white hover:text-[#173428]">
              Conoce al equipo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="group relative min-h-[340px] overflow-hidden lg:min-h-[500px]">
          <Image
            src="/new/SobreASLaboratorios.webp"
            alt="Laboratorio de biotecnología de AS Labs"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b5e20] via-[#1b5e20]/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
            <p className="max-w-md text-xl font-medium leading-snug text-white sm:text-2xl">
              La innovación nace cuando distintas disciplinas trabajan sobre un mismo problema.
            </p>
            <p className="mt-4 text-xs text-white/60">AS Laboratorios · Ciencia aplicada desde 1997</p>
          </div>
        </div>
      </div>
    </section>
  )
}
