"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, GraduationCap, X } from "lucide-react"

const STORAGE_KEY = "aslabs-internship-callout-2026-10"

const roles = [
  "Bacteriología y bioprocesos",
  "Biología molecular",
  "Biotecnología vegetal",
  "Preparación de medios de cultivo",
  "Control y manejo integrado de plagas",
  "Diagnóstico de sanidad vegetal",
]

export function InternshipCallout() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const excluded =
    pathname.startsWith("/ecuador") ||
    pathname.startsWith("/trabaja-con-nosotros") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login")

  useEffect(() => {
    if (excluded || window.sessionStorage.getItem(STORAGE_KEY)) return
    const timer = window.setTimeout(() => setOpen(true), 850)
    return () => window.clearTimeout(timer)
  }, [excluded])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const close = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "seen")
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[12000] flex items-end justify-center bg-[#041b13]/70 p-2.5 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="internship-callout-title"
            initial={{ opacity: 0, y: 34, scale: 0.97, rotateX: 4 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[30px] bg-[#f8faf7] shadow-[0_40px_120px_rgba(0,0,0,.45)] sm:rounded-[34px]"
          >
            <div className="relative overflow-hidden bg-[#0b3829] px-5 pb-7 pt-5 text-white sm:px-8 sm:pb-8 sm:pt-7">
              <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[38px] border-lime-300/[.08]" />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-lime-300 via-[#eab75e] to-emerald-400" />
              <div className="relative flex items-start justify-between gap-5">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-lime-300">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    Convocatoria abierta
                  </span>
                  <h2 id="internship-callout-title" className="mt-4 max-w-2xl text-2xl font-semibold leading-tight tracking-[-.035em] sm:text-4xl">
                    6 prácticas preprofesionales en AS Labs
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/70">
                    Para estudiantes de Microbiología o Biología que quieran fortalecer su experiencia dentro del laboratorio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Cerrar convocatoria"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[20px] border border-[#dce7df] bg-white p-4">
                  <Clock3 className="h-5 w-5 text-emerald-700" />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[.15em] text-slate-400">Part Time</p>
                  <p className="mt-1 text-xl font-black text-emerald-950">S/ 700–800</p>
                  <p className="mt-1 text-[11px] text-slate-500">mensuales</p>
                </div>
                <div className="rounded-[20px] border border-[#cbe0d1] bg-[#eaf5e9] p-4">
                  <Clock3 className="h-5 w-5 text-emerald-700" />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[.15em] text-emerald-700">Full Time</p>
                  <p className="mt-1 text-xl font-black text-emerald-950">S/ 1,600</p>
                  <p className="mt-1 text-[11px] text-slate-500">mensuales</p>
                </div>
                <div className="rounded-[20px] border border-[#e5e7e4] bg-[#f1f2f0] p-4 text-slate-500">
                  <BriefcaseBusiness className="h-4 w-4" />
                  <p className="mt-4 text-[9px] font-black uppercase tracking-[.14em]">Referencia profesional</p>
                  <p className="mt-1 text-sm font-bold">Más de S/ 4,600 base</p>
                  <p className="mt-1 text-[10px] leading-4">Convocatoria profesional ya cubierta.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-700">Áreas disponibles</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {roles.map((role) => (
                      <div key={role} className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-xs font-semibold leading-5 text-[#304d40] shadow-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {role}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] bg-[#f2eadb] p-5">
                  <GraduationCap className="h-6 w-6 text-[#9b5c27]" />
                  <h3 className="mt-4 font-bold text-[#4d3422]">Requisito indispensable</h3>
                  <p className="mt-2 text-xs leading-5 text-[#715b49]">
                    Mantener la condición de estudiante universitario de 9.º ciclo. Se dará preferencia a estudiantes de quinto o tercio superior.
                  </p>
                  <p className="mt-3 border-t border-[#d8c6ac] pt-3 text-[11px] leading-5 text-[#7d6856]">
                    Se valoran inglés intermedio, buen desempeño académico y conocimientos previos relacionados con el área.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-[#dce5df] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">
                  AS Laboratorios Control Biológico S.A.C.
                </p>
                <Link
                  href="/trabaja-con-nosotros"
                  onClick={close}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#173f31] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#245d47]"
                >
                  Ver convocatoria y postular
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
