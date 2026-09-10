"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Headphones, MessageCircle, X } from "lucide-react"

const advisors = [
  {
    name: "Andy Hassan",
    role: "Asesor",
    phone: "+51 952 194 005",
    whatsapp: "51952194005",
    initials: "AH",
  },
  {
    name: "Luis Cabrera",
    role: "Asesor",
    phone: "+51 961 996 645",
    whatsapp: "51961996645",
    initials: "LC",
  },
] as const

type WhatsAppContactProps = {
  children: React.ReactNode
  className?: string
  message?: string
  mode?: "dropdown" | "modal"
  ariaLabel?: string
  onOpen?: () => void
  disabled?: boolean
}

type MenuPosition = {
  left: number
  top: number
  width: number
}

export function WhatsAppContact({
  children,
  className = "",
  message = "Hola, quisiera recibir información sobre los servicios de AS Labs.",
  mode = "dropdown",
  ariaLabel = "Elegir asesor de WhatsApp",
  onOpen,
  disabled = false,
}: WhatsAppContactProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<MenuPosition | null>(null)

  const updatePosition = useCallback(() => {
    if (!buttonRef.current || mode !== "dropdown") return
    const rect = buttonRef.current.getBoundingClientRect()
    const width = Math.min(360, window.innerWidth - 24)
    const left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - width / 2),
      window.innerWidth - width - 12,
    )
    const menuHeight = 238
    const openAbove = window.innerHeight - rect.bottom < menuHeight + 16 && rect.top > menuHeight
    const top = openAbove ? Math.max(12, rect.top - menuHeight - 10) : rect.bottom + 10
    setPosition({ left, top, width })
  }, [mode])

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    if (mode === "modal") {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)
    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [mode, open, updatePosition])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  const openMenu = () => {
    if (disabled) return
    if (!open) {
      updatePosition()
      onOpen?.()
    }
    setOpen((value) => !value)
  }

  const advisorOptions = (compact: boolean) => (
    <div className={compact ? "mt-3 space-y-2" : "mt-5 space-y-3"}>
      {advisors.map((advisor, index) => (
        <motion.a
          key={advisor.whatsapp}
          href={`https://wa.me/${advisor.whatsapp}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 + index * 0.055 }}
          className={`group flex items-center gap-3 rounded-2xl border border-[#dce8df] bg-white text-left shadow-[0_12px_28px_-24px_rgba(14,62,39,.7)] transition hover:-translate-y-0.5 hover:border-[#9fc2a8] hover:bg-[#f5faf6] ${
            compact ? "p-3" : "p-4"
          }`}
        >
          <span className={`grid shrink-0 place-items-center rounded-xl bg-[#e4f1e7] font-black text-[#286642] ${compact ? "h-10 w-10 text-[11px]" : "h-12 w-12 text-xs"}`}>
            {advisor.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8e82]">
              {advisor.role} {index + 1}
            </span>
            <span className={`${compact ? "text-sm" : "text-[15px]"} mt-0.5 block font-bold text-[#173c2b]`}>
              {advisor.name}
            </span>
            <span className="mt-0.5 block text-[11px] font-medium text-[#64776c]">{advisor.phone}</span>
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_20px_-10px_rgba(37,211,102,.9)] transition group-hover:scale-105">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </motion.a>
      ))}
    </div>
  )

  const layer = mounted
    ? createPortal(
        <AnimatePresence>
          {open && mode === "modal" && (
            <motion.div
              className="fixed inset-0 z-[11000] flex items-center justify-center bg-[#071d15]/70 p-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpen(false)
              }}
            >
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-label="Asesores disponibles por WhatsApp"
                initial={{ opacity: 0, scale: 0.92, y: 18, rotateX: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: "spring", stiffness: 320, damping: 27 }}
                className="relative w-full max-w-[470px] overflow-hidden rounded-[30px] border border-white/80 bg-[#f7faf7] p-5 shadow-[0_35px_100px_-28px_rgba(0,0,0,.7)] sm:p-7"
              >
                <div aria-hidden="true" className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#b8ddbf]/35 blur-2xl" />
                <div className="relative flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#173f2d] text-white shadow-lg shadow-[#173f2d]/20">
                    <Headphones className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3f7655]">Atención personalizada</p>
                    <h2 className="mt-1 text-xl font-bold tracking-[-0.025em] text-[#173c2b] sm:text-2xl">¿Con quién deseas conversar?</h2>
                    <p className="mt-1.5 text-xs leading-5 text-[#6a7b71]">Elige un asesor y continúa directamente en WhatsApp.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar selección de asesores"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dbe6de] bg-white text-[#53675b] transition hover:bg-[#e9f2eb] hover:text-[#173c2b]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {advisorOptions(false)}
              </motion.section>
            </motion.div>
          )}

          {open && mode === "dropdown" && position && (
            <>
              <button
                type="button"
                aria-label="Cerrar selección de asesores"
                className="fixed inset-0 z-[9997] cursor-default bg-transparent"
                onClick={() => setOpen(false)}
              />
              <motion.div
                role="menu"
                aria-label="Asesores disponibles por WhatsApp"
                initial={{ opacity: 0, y: -7, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 29 }}
                className="fixed z-[9998] rounded-[24px] border border-white/90 bg-[#f7faf7]/[0.98] p-3.5 shadow-[0_28px_75px_-25px_rgba(7,39,25,.65)] backdrop-blur-2xl"
                style={{ left: position.left, top: position.top, width: position.width }}
              >
                <div className="flex items-center gap-3 px-1">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#173f2d] text-white">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#173c2b]">Elige un asesor</p>
                    <p className="mt-0.5 text-[10px] text-[#74857b]">Te atenderemos por WhatsApp</p>
                  </div>
                </div>
                {advisorOptions(true)}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openMenu}
        aria-label={ariaLabel}
        aria-haspopup={mode === "modal" ? "dialog" : "menu"}
        aria-expanded={open}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
      {layer}
    </>
  )
}
