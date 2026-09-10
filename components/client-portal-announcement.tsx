"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPinned,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

const SESSION_KEY = "aslabs-client-portal-announcement-2026"

const features = [
  {
    icon: Clock3,
    title: "Seguimiento 24/7",
    description: "Revisa el avance de tu servicio cuando lo necesites.",
  },
  {
    icon: Route,
    title: "Trazabilidad única",
    description: "Cada etapa, actualización y resultado en un solo historial.",
  },
  {
    icon: Radar,
    title: "Cuadrillas en tiempo real",
    description: "Sigue el trabajo de los equipos de muestreo en campo.",
  },
  {
    icon: MapPinned,
    title: "Zonas de muestreo",
    description: "Selecciona y organiza las áreas que serán evaluadas.",
  },
  {
    icon: CreditCard,
    title: "Pagos online",
    description: "Gestiona tus pagos desde el mismo panel de forma segura.",
  },
]

export default function ClientPortalAnnouncement() {
  const pathname = usePathname()
  const isEcuador = pathname === "/ecuador" || pathname.startsWith("/ecuador/")
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (isEcuador) {
      setOpen(false)
      return
    }

    if (window.sessionStorage.getItem(SESSION_KEY)) {
      setOpen(false)
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isEcuador])

  const close = () => {
    window.sessionStorage.setItem(SESSION_KEY, "seen")
    setOpen(false)
    document.body.style.overflow = ""
  }

  if (isEcuador) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[240] flex items-center justify-center bg-[#061b13]/75 p-3 font-[var(--font-poppins)] backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
          role="presentation"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-portal-title"
            initial={{ opacity: 0, scale: 0.92, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 14, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 155, damping: 22, mass: 0.85 }}
            className="relative max-h-[calc(100vh-1.5rem)] w-full max-w-[980px] overflow-hidden rounded-[2rem] border border-white/20 bg-[#f7f5ed] shadow-[0_42px_120px_-34px_rgba(0,0,0,0.75)] sm:max-h-[calc(100vh-3rem)]"
          >
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[48px] border-[#dce9d6]/65" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#ef9f38]/25 blur-3xl" />

            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#173428]/10 bg-white/85 text-[#355247] shadow-sm backdrop-blur-md transition hover:rotate-90 hover:bg-white hover:text-[#173428] sm:right-5 sm:top-5"
              aria-label="Cerrar anuncio"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative grid lg:grid-cols-[1.03fr_0.97fr]">
              <div className="px-5 pb-7 pt-8 sm:px-9 sm:pb-9 sm:pt-10 lg:px-11 lg:py-12">
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18, duration: 0.45 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#c8dac9] bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#2f6845]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#d9792d]" />
                  Nuevo panel de clientes
                </motion.div>

                <h2 id="client-portal-title" className="mt-5 max-w-xl text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[#14382a]">
                  Conoce nuestra nueva plataforma.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#607168] sm:text-[15px] sm:leading-7">
                  Presentamos una experiencia más clara para consultar avances, coordinar el muestreo y mantener una trazabilidad completa de tus servicios con AS Laboratorios.
                </p>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href="https://clientes.aslaboratorios.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#123d2c] px-5 text-xs font-bold text-white shadow-[0_16px_32px_-18px_rgba(18,61,44,0.85)] transition hover:-translate-y-0.5 hover:bg-[#1c573d]"
                  >
                    Acceder al panel
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="min-h-12 rounded-full border border-[#ced9d1] bg-white/70 px-5 text-xs font-semibold text-[#496057] transition hover:bg-white"
                  >
                    Continuar en la web
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold text-[#6d7d75]">
                  <ShieldCheck className="h-4 w-4 text-[#3b7650]" />
                  Acceso seguro y disponible para nuestros clientes
                </div>
              </div>

              <div className="relative overflow-hidden bg-[#123d2c] p-5 text-white sm:p-8 lg:p-9 lg:pt-16">
                <div className="client-portal-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
                <motion.div
                  className="pointer-events-none absolute -right-14 top-16 h-48 w-48 rounded-full bg-[#70a87b]/35 blur-3xl"
                  animate={{ scale: [1, 1.18, 1], x: [0, -14, 0], y: [0, 12, 0] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#efb461]">Todo en un lugar</p>
                      <p className="mt-1 text-sm font-semibold text-white">Control y seguimiento</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2b6749] px-3 py-1.5 text-[9px] font-bold text-[#d9f0dc]">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#86d29a] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#86d29a]" />
                      </span>
                      En línea
                    </span>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <motion.article
                          key={feature.title}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.24 + index * 0.07, duration: 0.38 }}
                          className={`${index === features.length - 1 ? "sm:col-span-2" : ""} rounded-2xl border border-white/10 bg-white/[0.075] p-3.5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.11]`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#ef9f38] text-[#14382a]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <h3 className="text-[11px] font-bold text-white">{feature.title}</h3>
                              <p className="mt-1 text-[9px] leading-4 text-white/55">{feature.description}</p>
                            </div>
                          </div>
                        </motion.article>
                      )
                    })}
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#efb461]/20 bg-[#efb461]/10 px-4 py-3 text-[10px] leading-4 text-[#f5d7a9]">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Ideal para conocer el avance real de tu servicio sin esperar una actualización manual.
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
