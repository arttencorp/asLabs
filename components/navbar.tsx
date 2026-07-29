"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  FlaskConical,
  Leaf,
  Menu,
  MessageCircle,
  Microscope,
  Presentation,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

type NavLink = {
  label: string
  href: string
  description?: string
  icon?: typeof Leaf
}

type NavGroup = {
  label: string
  href?: string
  links?: NavLink[]
}

const navigation: NavGroup[] = [
  { label: "Nosotros", href: "/sobre-nosotros" },
  {
    label: "Biotecnología",
    links: [
      {
        label: "Biotecnología vegetal",
        href: "/biotecnologia-vegetal",
        description: "Fundamentos y aplicaciones en el campo",
        icon: Leaf,
      },
      {
        label: "Genética",
        href: "/genetica",
        description: "Genética molecular, PCR y plásmidos",
        icon: FlaskConical,
      },
    ],
  },
  {
    label: "Servicios",
    href: "/servicios",
    links: [
      { label: "Fitopatología", href: "/servicios/fitopatologia", description: "Diagnóstico de patógenos", icon: Microscope },
      { label: "Medio ambiente", href: "/servicios/medio-ambiente", description: "Análisis microbiológicos", icon: Leaf },
      { label: "Microbiológicos", href: "/servicios/microbiologicos", description: "Alimentos, agua y superficies", icon: Microscope },
      { label: "Biotecnología vegetal", href: "/servicios/biotecnologia-vegetal", description: "Cultivo de tejidos in vitro", icon: Leaf },
      { label: "Bacteriología", href: "/servicios/bacteriologia-general", description: "Suspensiones y fermentación", icon: FlaskConical },
      { label: "Apoyo a la investigación", href: "/servicios/apoyo-investigacion", description: "Protocolos e identificación molecular", icon: Microscope },
    ],
  },
  { label: "Plantines", href: "/plantines" },
  { label: "Control biológico", href: "/control-biologico" },
  {
    label: "Cepas",
    href: "/cepas",
    links: [
      { label: "Cepas identificadas", href: "/cepas/identificadas", description: "Cultivos locales certificados", icon: Microscope },
      { label: "Cepas ATCC", href: "/cepas/atcc", description: "Referencias internacionales", icon: FlaskConical },
    ],
  },
  { label: "Investigación", href: "/research" },
  {
    label: "Más",
    links: [
      {
        label: "Trabaja con nosotros",
        href: "/trabaja-con-nosotros",
        description: "Convocatorias y oportunidades",
        icon: BriefcaseBusiness,
      },
      {
        label: "Legal",
        href: "/legal",
        description: "Términos, privacidad y políticas",
        icon: Scale,
      },
      {
        label: "Pitch Deck",
        href: "/pitch-deck",
        description: "Presentación institucional",
        icon: Presentation,
      },
    ],
  },
]

function isPatrioticSeasonInPeru() {
  const parts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    timeZone: "America/Lima",
  }).formatToParts(new Date())
  const year = Number(parts.find((part) => part.type === "year")?.value)
  const month = Number(parts.find((part) => part.type === "month")?.value)
  return year === 2026 && month === 7
}

export type NavbarProps = {
  overlay?: boolean
}

export function Navbar({ overlay = false }: NavbarProps) {
  const pathname = usePathname()
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navTheme, setNavTheme] = useState<"light" | "dark">("light")
  const [showPatrioticMessage, setShowPatrioticMessage] = useState(false)

  useEffect(() => {
    setShowPatrioticMessage(isPatrioticSeasonInPeru())
  }, [])

  useEffect(() => {
    let frame = 0
    const updateNavbar = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 14)

        const sampleY = window.innerWidth >= 640 ? 48 : 42
        const themedSections = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-theme]"))
        const activeSection = themedSections.find((section) => {
          const rect = section.getBoundingClientRect()
          return rect.top <= sampleY && rect.bottom >= sampleY
        })

        setNavTheme(activeSection?.dataset.navbarTheme === "dark" ? "dark" : "light")
      })
    }

    updateNavbar()
    window.addEventListener("scroll", updateNavbar, { passive: true })
    window.addEventListener("resize", updateNavbar)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateNavbar)
      window.removeEventListener("resize", updateNavbar)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenGroup(null)
  }, [pathname])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
        setOpenGroup(null)
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  const isActive = (item: NavGroup) => {
    if (item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`))) return true
    return item.links?.some((link) => pathname === link.href || pathname.startsWith(`${link.href}/`)) ?? false
  }

  const useDarkContrast = navTheme === "dark" && !mobileOpen
  const inactiveLinkClass = useDarkContrast
    ? "text-white/90 hover:bg-white/[0.14] hover:text-white"
    : "text-[#28483a] hover:bg-[#eaf1eb] hover:text-[#1f6240]"
  const activeLinkClass = useDarkContrast
    ? "bg-white/[0.17] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
    : "bg-[#e3ede5] text-[#1f6240] shadow-[inset_0_0_0_1px_rgba(31,98,64,0.08)]"

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
        className={`pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 transition-[padding] duration-500 sm:px-5 ${scrolled ? "pt-2 sm:pt-2.5" : "pt-3 sm:pt-4"}`}
      >
        <nav
          aria-label="Navegación principal"
          className={`pointer-events-auto relative mx-auto max-w-[1420px] rounded-[1.35rem] border font-[var(--font-poppins)] backdrop-blur-[12px] backdrop-saturate-150 transition-all duration-500 ${
            useDarkContrast
              ? `border-white/25 bg-[#0d3024]/[0.72] ring-1 ring-white/[0.08] shadow-[0_14px_42px_-20px_rgba(0,0,0,0.5)] ${scrolled ? "bg-[#0d3024]/[0.84] shadow-[0_18px_48px_-20px_rgba(0,0,0,0.62)]" : ""}`
              : `border-white/85 bg-[#fbfdf9]/[0.82] ring-1 ring-[#173428]/[0.05] shadow-[0_14px_42px_-22px_rgba(8,47,32,0.38)] ${scrolled ? "bg-[#fbfdf9]/[0.93] shadow-[0_18px_48px_-20px_rgba(8,47,32,0.4)]" : ""}`
          }`}
        >
          <div aria-hidden="true" className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${useDarkContrast ? "via-white/55" : "via-white"}`} />
          <AnimatePresence initial={false}>
            {showPatrioticMessage && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 25, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-center justify-center gap-2 overflow-hidden px-4 text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px] ${
                  useDarkContrast ? "text-white/90" : "text-[#385645]"
                }`}
                role="status"
                aria-label="Felices Fiestas Patrias"
              >
                <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent via-[#d71939] to-white/80 sm:w-16" />
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#dc1738]" />
                <span>¡Felices Fiestas, Perú!</span>
                <span className={`hidden normal-case tracking-normal sm:inline ${useDarkContrast ? "text-white/55" : "text-[#718177]"}`}>
                  Ciencia peruana que siembra futuro.
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent via-[#d71939] to-white/80 sm:w-16" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`flex items-center justify-between px-3.5 transition-[height] duration-500 sm:px-5 ${scrolled ? "h-[54px] sm:h-[58px]" : "h-[58px] sm:h-[62px]"}`}>
            <Link href="/" aria-label="AS Labs — Inicio" className="flex shrink-0 items-center rounded-xl border border-white/80 bg-white/95 px-2 py-1 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7048]">
              <Image
                src="/Frame23.png"
                alt="AS Labs"
                width={150}
                height={52}
                priority
                className={`h-auto transition-all duration-500 ${scrolled ? "w-[116px] sm:w-[126px]" : "w-[120px] sm:w-[132px]"}`}
              />
            </Link>

            <div className="hidden items-center gap-0.5 xl:flex">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.links && setOpenGroup(item.label)}
                  onMouseLeave={() => item.links && setOpenGroup(null)}
                >
                  {item.links ? (
                    <button
                      type="button"
                      onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                      aria-expanded={openGroup === item.label}
                      className={`relative flex h-9 items-center gap-1 rounded-full px-2.5 text-[11.5px] font-medium transition-all duration-200 ${
                        isActive(item) ? activeLinkClass : inactiveLinkClass
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openGroup === item.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      className={`relative flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[11.5px] font-medium transition-all duration-200 ${
                        isActive(item) ? activeLinkClass : inactiveLinkClass
                      }`}
                    >
                      {item.label === "Control biológico" && <ShieldCheck className="h-3.5 w-3.5" />}
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.links && openGroup === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.975, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 7, scale: 0.985, filter: "blur(3px)" }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/90 bg-white/[0.97] p-2 shadow-[0_24px_64px_-24px_rgba(8,47,32,0.52)] backdrop-blur-xl before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-[''] ${item.label === "Servicios" ? "w-[560px]" : "w-[330px]"}`}
                      >
                        {item.href && (
                          <Link href={item.href} className="mb-1 flex items-center justify-between rounded-xl bg-[#0c3928] px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#15543a]">
                            Ver todos: {item.label}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        )}
                        <div className={item.label === "Servicios" ? "grid grid-cols-2 gap-1" : "space-y-1"}>
                          {item.links.map((link) => {
                            const Icon = link.icon || Leaf
                            return (
                              <Link key={link.href} href={link.href} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#edf3ee]">
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#dfeade] text-[#2d7047] transition-colors group-hover:bg-[#cfe1cf]">
                                  <Icon className="h-4 w-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-xs font-semibold text-[#203e31]">{link.label}</span>
                                  <span className="mt-0.5 block truncate text-[10px] text-[#6c7c74]">{link.description}</span>
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden items-center gap-1.5 xl:flex">
              <Link
                href="/seguimiento"
                className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-semibold transition-all duration-200 ${
                  pathname.startsWith("/seguimiento") ? activeLinkClass : inactiveLinkClass
                }`}
              >
                <ClipboardCheck className="h-3.5 w-3.5" />
                Seguimiento
              </Link>
              <span className={`mx-0.5 h-5 w-px ${useDarkContrast ? "bg-white/20" : "bg-[#173428]/15"}`} />
              <a href="https://wa.me/51961996645" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#ef9f38] px-3.5 text-[12px] font-bold text-[#173428] shadow-[0_8px_22px_-12px_rgba(173,91,18,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffc56f] hover:shadow-[0_12px_26px_-12px_rgba(173,91,18,0.9)]">
                <MessageCircle className="h-3.5 w-3.5" />
                Hablemos
              </a>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${useDarkContrast ? "bg-white text-[#173c2b]" : "bg-[#143d2d] text-white"}`}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-[#d9e3dc]/80 xl:hidden"
              >
                <div className="max-h-[calc(100vh-96px)] overflow-y-auto px-3 pb-4 pt-2 sm:px-5">
                  {navigation.map((item) => (
                    <div key={item.label} className="border-b border-[#e3ebe5] last:border-none">
                      {item.links ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                            className={`flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-sm font-semibold transition-colors ${isActive(item) ? "bg-[#e8f0e9] text-[#1f6240]" : "text-[#203e31]"}`}
                          >
                            {item.label}
                            <ChevronDown className={`h-4 w-4 transition-transform ${openGroup === item.label ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {openGroup === item.label && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pb-2">
                                {item.href && <Link href={item.href} className="block rounded-lg bg-[#e8f0e9] px-3 py-2 text-xs font-semibold text-[#235d3d]">Ver todos</Link>}
                                {item.links.map((link) => (
                                  <Link key={link.href} href={link.href} className="block px-3 py-2 text-xs text-[#566a60]">{link.label}</Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link href={item.href || "/"} className={`block rounded-lg px-2 py-3 text-sm font-semibold transition-colors ${isActive(item) ? "bg-[#e8f0e9] text-[#1f6240]" : "text-[#203e31]"}`}>{item.label}</Link>
                      )}
                    </div>
                  ))}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link href="/seguimiento" className="rounded-full border border-[#d2ded4] px-4 py-2.5 text-center text-xs font-semibold text-[#294b3b]">Seguimiento</Link>
                    <a href="https://wa.me/51961996645" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#ef9f38] px-4 py-2.5 text-center text-xs font-bold text-[#173428]">WhatsApp</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {!overlay && (
        <div
          aria-hidden="true"
          className={showPatrioticMessage ? "h-[103px] sm:h-[111px]" : "h-[78px] sm:h-[86px]"}
        />
      )}
    </>
  )
}

export default Navbar
