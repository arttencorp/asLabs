"use client"

import {
  ArrowDown,
  FlaskConical,
  TrendingUp,
  Shield,
  DollarSign,
  MessageCircle
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { handleWhatsAppContact } from "./utils"
import { StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import { btnAccent, iconBadge } from "@/components/ui/button-styles"

export default function HeroSection() {
  return (
    <section data-navbar-theme="dark" className="relative min-h-[650px] overflow-hidden bg-[#123b2b] pb-24 pt-32 text-white clip-angle-bottom-sm sm:min-h-[700px]">
      <Image src="/plantines/pagina18.webp" alt="Plantines in vitro de AS Laboratorios" fill priority className="object-cover object-center opacity-[0.45]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f22] via-[#123b2b]/95 to-[#123b2b]/[0.45]"></div>
      <div className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-[0.12]"></div>
      <div className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-[#74c57d]/20 blur-3xl"></div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="w-full">

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* TEXTO - Izquierda */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-center lg:text-left"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#cce8d2] backdrop-blur-sm">
                <FlaskConical className="w-3.5 h-3.5" />
                Biotecnología Vegetal de Vanguardia
              </div>

              <h1 className="mb-4 text-4xl font-bold leading-tight text-white font-serif sm:text-5xl">
                Plantines in vitro para cultivos que empiezan mejor
              </h1>

              <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base lg:mx-0">
                Material vegetal uniforme, producido bajo condiciones controladas y acompañado por orientación técnica para elegir la variedad adecuada.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <button
                  onClick={() => handleWhatsAppContact("información completa sobre plantines in vitro")}
                  className={btnAccent}
                >
                  <MessageCircle className="w-4 h-4" />
                  Solicitar asesoría
                </button>
                <a href="#catalogo-plantines" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">
                  Ver catálogo
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* CUADRADOS - Derecha */}
            <StaggerGroup className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
              <StaggerItem>
                <div className="h-full rounded-2xl border border-white/[0.15] bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.15]">
                  <div className={`${iconBadge} mx-auto mb-3 h-12 w-12`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">Mayor uniformidad</h3>
                  <p className="mt-1 text-xs text-white/60">Lotes más consistentes</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="h-full rounded-2xl border border-white/[0.15] bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.15]">
                  <div className={`${iconBadge} mx-auto mb-3 w-12 h-12`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">Producción controlada</h3>
                  <p className="mt-1 text-xs text-white/60">Tecnología in vitro</p>
                </div>
              </StaggerItem>

              <StaggerItem className="col-span-2 flex justify-center">
                <div className="w-[calc(50%-0.5rem)] rounded-2xl border border-white/[0.15] bg-white/10 p-6 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.15]">
                  <div className={`${iconBadge} mx-auto mb-3 w-12 h-12`}>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">Acompañamiento</h3>
                  <p className="mt-1 text-xs text-white/60">Orientación técnica</p>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
