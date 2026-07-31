'use client'

import { motion } from "framer-motion"
import { ArrowDown, CalendarDays, FlaskConical, Leaf } from "lucide-react"

export default function AboutHeader() {
  return (
    <section
      data-navbar-theme="dark"
      className="relative flex min-h-[610px] w-full items-center overflow-hidden bg-[#01283c] px-4 pb-24 pt-32 text-gray-900 sm:min-h-[660px] sm:px-6 lg:px-8 clip-angle-bottom-sm"
      style={{
        backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headernosotros-wl7NufwonCIqKItx5mWUFHFbDX5Snw.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Soft green fade for legibility - the photo stays fully visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b2f18] via-[#1b5e20]/70 to-transparent"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b2f18]/60 via-transparent to-transparent"></div>
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-[3px]"
        style={{ WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 55%)", maskImage: "linear-gradient(to right, black 0%, transparent 55%)" }}
      ></div>
      <div className="pointer-events-none absolute -bottom-24 left-[20%] w-96 h-96 rounded-full bg-[#43a047]/25 blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-3xl space-y-6"
        >
          <div className="inline-block">
            <span className="text-xs font-semibold text-white uppercase tracking-[0.2em] bg-white/20 px-5 py-2 rounded-full border border-white/30 backdrop-blur-sm">
              Quiénes Somos
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold leading-tight text-balance text-white sm:text-5xl md:text-6xl">Ciencia aplicada a una agricultura más sostenible</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-white to-white/50 rounded-full"></div>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-white/[0.88] sm:text-lg">Desde 1997 desarrollamos biotecnología vegetal, diagnóstico y soluciones de laboratorio que conectan investigación rigurosa con necesidades reales del campo.</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#mision" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#1d5136] shadow-lg transition hover:-translate-y-0.5 hover:bg-white/90">
              Conoce nuestra historia
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="/servicios" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">
              <FlaskConical className="h-4 w-4" />
              Ver soluciones
            </a>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, value: "1997", label: "Año de fundación" },
              { icon: FlaskConical, value: "Laboratorio", label: "Ciencia con aplicación" },
              { icon: Leaf, value: "Sostenibilidad", label: "Compromiso agrícola" },
            ].map((item) => (
              <div key={item.value} className="flex items-center gap-3 rounded-2xl border border-white/[0.18] bg-black/10 px-4 py-3 backdrop-blur-sm">
                <item.icon className="h-5 w-5 shrink-0 text-[#bce4bf]" />
                <div>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                  <p className="text-[11px] text-white/65">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
