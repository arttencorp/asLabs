"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, MessageCircle, PackageCheck, ShieldCheck, Sprout } from "lucide-react"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section data-navbar-theme="dark" className="relative min-h-[680px] overflow-hidden bg-[#062b22] text-white lg:min-h-[710px]">
      <div className="home-lab-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="mx-auto grid min-h-[680px] max-w-[1480px] lg:min-h-[710px] lg:grid-cols-[.94fr_1.06fr]">
        <div className="relative z-10 flex items-center px-5 pb-28 pt-28 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28 xl:px-16">
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }} className="max-w-[690px]">
            <div className="flex items-center gap-3 text-[11px] font-medium text-[#b8d8c8]"><span className="h-2 w-2 bg-[#d5a34f]" />Biotecnología vegetal<span className="h-px w-24 bg-white/15" /></div>
            <h1 className="mt-6 max-w-[650px] text-[clamp(2.45rem,4.15vw,4.15rem)] font-medium leading-[1.01] tracking-[-.05em]">Plantines in vitro para una producción más predecible.</h1>
            <p className="mt-6 max-w-[590px] text-sm leading-7 text-white/68 sm:text-base">Material clonal uniforme producido bajo condiciones controladas, con orientación técnica para seleccionar variedad, volumen y etapa de entrega.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogo-plantines" className="group inline-flex h-11 items-center gap-3 bg-[#d5a34f] px-5 text-xs font-semibold text-[#10251e] hover:bg-[#e4b866]">Explorar catálogo <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></a>
              <WhatsAppContact message="Hola, quisiera información completa sobre plantines in vitro" className="inline-flex h-11 items-center gap-2 border border-white/25 px-5 text-xs font-semibold text-white hover:bg-white hover:text-[#062b22]"><MessageCircle className="h-4 w-4" />Solicitar asesoría</WhatsAppContact>
            </div>
          </motion.div>
        </div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .95, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 lg:relative">
          <Image src="/new/HEADER.webp" alt="Área de producción de plantines in vitro de AS Laboratorios" fill priority className="object-cover object-center" sizes="(min-width:1024px) 54vw, 100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,43,34,.98)_0%,rgba(6,43,34,.86)_50%,rgba(6,43,34,.35)_100%)] lg:bg-[linear-gradient(90deg,#062b22_0%,rgba(6,43,34,.28)_23%,rgba(6,43,34,0)_55%)]" />
          <div className="absolute bottom-6 left-5 right-5 border-y border-white/20 bg-[#062b22]/76 p-4 backdrop-blur-md sm:left-8 sm:right-8 lg:bottom-10 lg:left-auto lg:right-10 lg:w-[420px]">
            <p className="text-[9px] font-semibold text-[#b8d8c8]">Producción coordinada</p><p className="mt-1 text-sm font-medium">Del laboratorio al establecimiento del cultivo</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#082f25]/94 backdrop-blur-lg">
        <div className="mx-auto grid max-w-[1480px] grid-cols-3 divide-x divide-white/10">
          {[
            { icon: Sprout, title: "Uniformidad", text: "Material clonal" },
            { icon: ShieldCheck, title: "Control", text: "Producción in vitro" },
            { icon: PackageCheck, title: "Coordinación", text: "Volumen y entrega" },
          ].map((item) => <div key={item.title} className="flex items-center gap-3 px-3 py-4 sm:px-7"><item.icon className="h-4 w-4 shrink-0 text-[#d5a34f]" /><div><p className="text-[10px] font-semibold">{item.title}</p><p className="hidden text-[8px] text-white/45 sm:block">{item.text}</p></div></div>)}
        </div>
      </div>
    </section>
  )
}
