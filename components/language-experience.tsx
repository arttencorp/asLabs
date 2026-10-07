"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Languages, MapPin, X } from "lucide-react"

type Language = "en" | "es"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  ready: boolean
}

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            autoDisplay: boolean
          },
          elementId: string,
        ) => void
      }
    }
    googleTranslateElementInit?: () => void
  }
}

const LANGUAGE_KEY = "aslabs-language"
const PROMPT_KEY = "aslabs-latam-language-prompt-v1"
const LanguageContext = createContext<LanguageContextValue | null>(null)

const latinAmericanCountries: Record<string, string> = {
  AR: "Argentina",
  BO: "Bolivia",
  BR: "Brasil",
  CL: "Chile",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  DO: "República Dominicana",
  EC: "Ecuador",
  SV: "El Salvador",
  GT: "Guatemala",
  HN: "Honduras",
  MX: "México",
  NI: "Nicaragua",
  PA: "Panamá",
  PY: "Paraguay",
  PE: "Perú",
  PR: "Puerto Rico",
  UY: "Uruguay",
  VE: "Venezuela",
}

const timezoneCountries: Array<[RegExp, string]> = [
  [/Lima/i, "PE"],
  [/Guayaquil/i, "EC"],
  [/Bogota/i, "CO"],
  [/Mexico/i, "MX"],
  [/Argentina|Buenos_Aires/i, "AR"],
  [/Santiago/i, "CL"],
  [/La_Paz/i, "BO"],
  [/Sao_Paulo|Fortaleza|Recife|Manaus|Belem|Bahia/i, "BR"],
  [/Asuncion/i, "PY"],
  [/Montevideo/i, "UY"],
  [/Caracas/i, "VE"],
  [/Panama/i, "PA"],
  [/Costa_Rica/i, "CR"],
  [/Guatemala/i, "GT"],
  [/Tegucigalpa/i, "HN"],
  [/Managua/i, "NI"],
  [/El_Salvador/i, "SV"],
  [/Santo_Domingo/i, "DO"],
  [/Puerto_Rico/i, "PR"],
]

function fallbackCountryFromTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  return timezoneCountries.find(([pattern]) => pattern.test(timezone))?.[1] || ""
}

function writeTranslationCookie(language: Language) {
  if (language === "es") {
    clearTranslationCookies()
    return
  }
  const value = "/es/en"
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `googtrans=${value};path=/;max-age=${maxAge};SameSite=Lax`

  const hostname = window.location.hostname
  if (hostname.endsWith("aslaboratorios.com")) {
    document.cookie = `googtrans=${value};domain=.aslaboratorios.com;path=/;max-age=${maxAge};SameSite=Lax`
  }
}

function clearTranslationCookies() {
  document.cookie = "googtrans=;path=/;max-age=0;SameSite=Lax"
  const hostname = window.location.hostname
  if (hostname.endsWith("aslaboratorios.com")) {
    document.cookie = "googtrans=;domain=.aslaboratorios.com;path=/;max-age=0;SameSite=Lax"
  }
}

function triggerGoogleLanguage(language: Language) {
  const select = document.querySelector<HTMLSelectElement>("select.goog-te-combo")
  if (!select) return false
  const target = language === "en" ? "en" : "es"
  select.value = target
  select.dispatchEvent(new Event("change", { bubbles: true }))
  return true
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const translationExcluded =
    pathname.startsWith("/admin") || pathname === "/login" || pathname.startsWith("/imprimir")
  const [language, setLanguageState] = useState<Language>("en")
  const [ready, setReady] = useState(false)
  const [countryCode, setCountryCode] = useState("")
  const [showSuggestion, setShowSuggestion] = useState(false)
  const languageRef = useRef<Language>("en")

  const applyLanguage = useCallback((nextLanguage: Language, persist = true) => {
    languageRef.current = nextLanguage
    setLanguageState(nextLanguage)
    document.documentElement.lang = nextLanguage === "en" ? "en" : "es"
    document.documentElement.dataset.language = nextLanguage
    writeTranslationCookie(nextLanguage)
    if (persist) window.localStorage.setItem(LANGUAGE_KEY, nextLanguage)

    let attempts = 0
    const applyToWidget = () => {
      attempts += 1
      if (triggerGoogleLanguage(nextLanguage) || attempts >= 30) {
        setReady(true)
        return
      }
      window.setTimeout(applyToWidget, 150)
    }
    applyToWidget()
  }, [])

  useEffect(() => {
    if (translationExcluded) {
      languageRef.current = "es"
      setLanguageState("es")
      setReady(true)
      document.documentElement.lang = "es"
      document.documentElement.dataset.language = "es"
      return
    }
    const stored = window.localStorage.getItem(LANGUAGE_KEY)
    const initialLanguage: Language = stored === "es" ? "es" : "en"
    languageRef.current = initialLanguage
    setLanguageState(initialLanguage)
    document.documentElement.lang = initialLanguage === "en" ? "en" : "es"
    document.documentElement.dataset.language = initialLanguage
    writeTranslationCookie(initialLanguage)

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en,es",
          autoDisplay: false,
        },
        "google_translate_element",
      )
      if (languageRef.current === "en") {
        window.setTimeout(() => applyLanguage("en", false), 80)
      } else {
        setReady(true)
      }
    }

    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit()
    } else if (!document.querySelector("script[data-aslabs-translate]")) {
      const script = document.createElement("script")
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      script.dataset.aslabsTranslate = "true"
      script.onerror = () => setReady(true)
      document.head.appendChild(script)
    }

    const timeout = window.setTimeout(() => setReady(true), 5000)
    return () => window.clearTimeout(timeout)
  }, [applyLanguage, translationExcluded])

  useEffect(() => {
    if (translationExcluded) return
    const updateRouteLanguage = window.setTimeout(() => {
      if (languageRef.current === "en") triggerGoogleLanguage("en")
      document.documentElement.lang = languageRef.current === "en" ? "en" : "es"
    }, 260)
    return () => window.clearTimeout(updateRouteLanguage)
  }, [pathname, translationExcluded])

  useEffect(() => {
    if (translationExcluded) return
    let active = true
    fetch("/api/location", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { country?: string }) => {
        if (!active) return
        const detected = data.country || fallbackCountryFromTimezone()
        setCountryCode(detected)
        const alreadyHandled = window.localStorage.getItem(PROMPT_KEY) === "handled"
        if (languageRef.current === "en" && latinAmericanCountries[detected] && !alreadyHandled) {
          window.setTimeout(() => active && setShowSuggestion(true), 1400)
        }
      })
      .catch(() => {
        const detected = fallbackCountryFromTimezone()
        if (!active) return
        setCountryCode(detected)
        if (
          languageRef.current === "en" &&
          latinAmericanCountries[detected] &&
          window.localStorage.getItem(PROMPT_KEY) !== "handled"
        ) {
          window.setTimeout(() => active && setShowSuggestion(true), 1400)
        }
      })
    return () => {
      active = false
    }
  }, [pathname, translationExcluded])

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      setShowSuggestion(false)
      window.localStorage.setItem(PROMPT_KEY, "handled")
      if (nextLanguage === languageRef.current) return
      window.localStorage.setItem(LANGUAGE_KEY, nextLanguage)
      languageRef.current = nextLanguage
      document.documentElement.lang = nextLanguage === "en" ? "en" : "es"
      document.documentElement.dataset.language = nextLanguage
      writeTranslationCookie(nextLanguage)
      window.location.reload()
    },
    [],
  )

  const dismissSuggestion = () => {
    setShowSuggestion(false)
    window.localStorage.setItem(PROMPT_KEY, "handled")
  }

  const value = useMemo(() => ({ language, setLanguage, ready }), [language, setLanguage, ready])

  return (
    <LanguageContext.Provider value={value}>
      <div id="google_translate_element" aria-hidden="true" className="aslabs-google-translate" />
      {children}
      <AnimatePresence>
        {showSuggestion && countryCode && (
          <motion.aside
            translate="no"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-[11900] mx-auto flex max-w-[720px] flex-col gap-3 rounded-[22px] border border-white/15 bg-[#0b3427]/95 p-3.5 text-white shadow-[0_26px_80px_-24px_rgba(3,25,17,.85)] backdrop-blur-xl sm:bottom-5 sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:p-2.5 sm:pl-4"
            role="status"
            aria-label="Sugerencia de idioma"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-[#a9e4c8] max-sm:hidden">
              <MapPin className="h-4 w-4" />
            </span>
            <p className="min-w-0 flex-1 text-xs font-medium leading-5 sm:text-[13px]">
              Parece que estás en <strong>{latinAmericanCountries[countryCode]}</strong>. ¿Prefieres ver el sitio en español?
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                className="min-h-10 flex-1 rounded-full bg-[#f0a23a] px-5 text-xs font-black text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc56f] sm:flex-none"
              >
                Cambiar a español
              </button>
              <button
                type="button"
                onClick={dismissSuggestion}
                aria-label="Mantener el sitio en inglés"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}

export function LanguageSwitcher({ dark, compact = false }: { dark: boolean; compact?: boolean }) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" translate="no">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={`Current language: ${language === "en" ? "English" : "Spanish"}. Change language`}
        className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full border px-2.5 text-[10px] font-bold transition-all hover:-translate-y-0.5 ${dark ? "border-white/20 bg-white/10 text-white hover:bg-white/20" : "border-[#c8d7cd] bg-white/75 text-[#244f3b] hover:bg-white"} ${compact ? "w-[52px] px-1.5" : ""}`}
      >
        <Languages className="h-3.5 w-3.5" />
        <span>{language.toUpperCase()}</span>
        {!compact && <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 9, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 7, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-[140] mt-2 w-[190px] overflow-hidden rounded-[18px] border border-white bg-white p-2 text-[#173428] shadow-[0_28px_70px_-24px_rgba(5,38,25,.62)]"
          >
            <p className="px-3 pb-2 pt-1 text-[9px] font-bold uppercase tracking-[.17em] text-[#7b8b83]">Language · Idioma</p>
            {([
              { code: "en" as const, label: "English", detail: "Default" },
              { code: "es" as const, label: "Español", detail: "Latinoamérica" },
            ]).map((option) => {
              const active = language === option.code
              return (
                <button
                  type="button"
                  key={option.code}
                  onClick={() => {
                    setLanguage(option.code)
                    setOpen(false)
                  }}
                  className={`mt-1 flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${active ? "border-[#a7cdbc] bg-[#eaf5ef]" : "border-transparent hover:bg-[#f1f5f2]"}`}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-[10px] font-black shadow-sm">{option.code.toUpperCase()}</span>
                  <span className="min-w-0 flex-1"><strong className="block text-xs">{option.label}</strong><span className="mt-0.5 block text-[9px] text-[#708078]">{option.detail}</span></span>
                  {active && <Check className="h-3.5 w-3.5 text-[#276b50]" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
