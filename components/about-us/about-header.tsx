"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowRight, FlaskConical, Leaf, Microscope } from "lucide-react"

export default function AboutHeader() {
  const reduceMotion = useReducedMotion()

  return (
    <section data-navbar-theme="dark" className="relative min-h-[690px] overflow-hidden bg-[#062b22] text-white lg:min-h-[720px]">
      <div className="home-lab-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="mx-auto grid min-h-[690px] max-w-[1480px] lg:min-h-[720px] lg:grid-cols-[0.94fr_1.06fr]">
        <div className="relative z-10 flex items-center px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }} className="max-w-[680px]">
            <div className="flex items-center gap-3 text-[11px] font-medium text-[#b8d8c8]"><span className="h-2 w-2 bg-[#d5a34f]" />AS Laboratorios · Desde 1997<span className="h-px w-20 bg-white/15" /></div>
            <h1 className="mt-6 max-w-[650px] text-[clamp(2.45rem,4.25vw,4.25rem)] font-medium leading-[1.01] tracking-[-.05em]">Ciencia que se construye cerca de los problemas reales.</h1>
            <p className="mt-6 max-w-[590px] text-sm leading-7 text-white/68 sm:text-base">Nacimos para mejorar el material vegetal y hoy conectamos microbiología, diagnóstico, genómica, producción in vitro e investigación aplicada.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#mision" className="group inline-flex h-11 items-center gap-3 bg-[#d5a34f] px-5 text-xs font-semibold text-[#10251e] hover:bg-[#e4b866]">Conoce nuestra trayectoria <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></a>
              <Link href="/servicios" className="group inline-flex h-11 items-center gap-3 border border-white/25 px-5 text-xs font-semibold text-white hover:bg-white hover:text-[#062b22]">Explorar capacidades <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </motion.div>
        </div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .95, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 lg:relative">
          <Image src="/new/SobreASLaboratorios.webp" alt="Instalaciones de biotecnología vegetal de AS Laboratorios" fill priority className="object-cover object-center" sizes="(min-width:1024px) 54vw, 100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,43,34,.98)_0%,rgba(6,43,34,.87)_48%,rgba(6,43,34,.45)_100%)] lg:bg-[linear-gradient(90deg,#062b22_0%,rgba(6,43,34,.28)_23%,rgba(6,43,34,0)_55%)]" />
          <div className="absolute inset-x-5 bottom-6 grid grid-cols-3 border-y border-white/20 bg-[#062b22]/75 backdrop-blur-md sm:inset-x-8 lg:bottom-10 lg:left-auto lg:right-10 lg:w-[480px]">
            {[
              { icon: Leaf, value: "Vegetal", label: "Biotecnología" },
              { icon: Microscope, value: "Microbiana", label: "Investigación" },
              { icon: FlaskConical, value: "Aplicada", label: "Ciencia" },
            ].map((item) => <div key={item.value} className="border-r border-white/15 px-3 py-4 last:border-r-0"><item.icon className="h-4 w-4 text-[#d5a34f]" /><p className="mt-2 text-[10px] font-semibold">{item.value}</p><p className="mt-0.5 text-[8px] text-white/45">{item.label}</p></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
