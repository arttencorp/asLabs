import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { pill } from "@/components/ui/button-styles"

export default function TeamMemberSection() {
  return (
    <section data-navbar-theme="dark" className="relative overflow-hidden bg-gradient-to-br from-[#173f2e] via-[#276b44] to-[#123426]">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-[0.12]"></div>
      <div className="pointer-events-none absolute -left-32 top-0 w-96 h-96 rounded-full bg-[#43a047]/40 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#e65100]/15 blur-3xl"></div>

      <div className="relative grid lg:grid-cols-2 items-stretch">
        {/* Left content - Company Summary, straight on the brand block */}
        <ScrollReveal direction="right" className="flex">
          <div className="w-full px-6 sm:px-10 py-16 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))] lg:pr-14 flex flex-col justify-center">
            <span className={`${pill} bg-white/15 text-white w-fit mb-4`}>Desde 1997</span>
            <h2 className="mb-4 text-3xl font-bold text-white font-serif sm:text-4xl">Un equipo que conecta laboratorio, vivero y campo</h2>
            <p className="text-base text-white/80 mb-6 leading-relaxed">
              AS Laboratorios reúne especialistas en biotecnología vegetal, microbiología, diagnóstico y producción agrícola para desarrollar soluciones con aplicación real.
            </p>
            <p className="text-base text-white/80 mb-8 leading-relaxed">
              Trabajamos con productores, empresas, universidades e instituciones de investigación, acompañando cada proyecto desde la pregunta inicial hasta su implementación técnica.
            </p>
            <Link href="/sobre-nosotros" className="inline-flex items-center gap-2 text-white font-medium text-sm group w-fit">
              Conoce Más Sobre Nosotros
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/50 transition-all duration-300 group-hover:bg-white group-hover:text-[#2e7d32] group-hover:translate-x-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Right image - Laboratory, full-bleed to the edge */}
        <div className="relative min-h-[320px] lg:min-h-[600px] overflow-hidden group">
          <Image
            src="/new/SobreASLaboratorios.webp"
            alt="Laboratorio de biotecnología de AS Labs"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b5e20] via-[#1b5e20]/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12">
            <p className="max-w-sm text-2xl font-medium leading-tight text-white font-serif sm:text-3xl">
              La innovación nace cuando distintas disciplinas trabajan sobre un mismo problema.
            </p>
            <p className="mt-auto pt-24 text-sm text-white/70">AS Laboratorios · Desde 1997</p>
          </div>
        </div>
      </div>
    </section>
  )
}
