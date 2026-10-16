"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, BriefcaseBusiness, X } from "lucide-react"

const STORAGE_KEY = "aslabs-internship-note-2026-10"

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
    const timer = window.setTimeout(() => setOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [excluded])

  const close = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "seen")
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, x: -18, y: 12 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -12, y: 8 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Convocatoria de prácticas"
          className="fixed bottom-4 left-4 z-[115] w-[min(340px,calc(100vw-2rem))] border border-white/15 bg-[#082f25]/95 text-white shadow-[0_22px_70px_-28px_rgba(2,27,19,.85)] backdrop-blur-xl sm:bottom-6 sm:left-6"
        >
          <div className="h-0.5 bg-gradient-to-r from-[#d5a34f] via-[#8bd6ae] to-transparent" />
          <div className="flex items-start gap-3 p-4 pr-11">
            <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/15 text-[#d5a34f]"><BriefcaseBusiness className="h-4 w-4" /></span>
            <div>
              <p className="text-[10px] font-semibold text-[#a9d5c1]">Convocatoria abierta</p>
              <p className="mt-1 text-sm font-semibold leading-5">Prácticas preprofesionales en laboratorio</p>
              <p className="mt-1 text-[10px] leading-4 text-white/55">Microbiología y Biología · Part Time o Full Time</p>
              <Link href="/trabaja-con-nosotros" onClick={close} className="group mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-[#e5bd70]">Ver convocatoria <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
          </div>
          <button type="button" onClick={close} aria-label="Cerrar anuncio" className="absolute right-2.5 top-3.5 grid h-8 w-8 place-items-center text-white/55 transition hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
