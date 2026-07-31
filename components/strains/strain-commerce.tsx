"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Dna,
  ExternalLink,
  FileCheck2,
  FlaskConical,
  Info,
  MessageCircle,
  Microscope,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export interface StrainItem {
  id: string
  nombre: string
  codigo: string
  cientifico: string
  bsl: string
  categoria: string
  productFormat: string
  strainDesignation: string
  depositedAs: string
  typeStrain: string
  precio: number
  precioSinEnvio?: number
  cantidad: string
  referencia: string
  disponibilidad: boolean
  link?: string
}

type CatalogKind = "identified" | "atcc"

interface CatalogProps {
  strains: StrainItem[]
  kind: CatalogKind
}

interface DetailProps extends CatalogProps {
  strainId: string
}

interface CartEntry {
  strain: StrainItem
  quantity: number
}

const WHATSAPP_NUMBER = "51961996645"

const catalogCopy = {
  identified: {
    eyebrow: "Colección microbiológica AS Labs",
    title: "Cepas identificadas para investigación y desarrollo",
    description:
      "Microorganismos identificados y caracterizados para proyectos de investigación, docencia, biofertilización y biocontrol.",
    shortLabel: "Identificadas",
    countLabel: "cepas disponibles",
    breadcrumb: "Cepas identificadas",
    catalogPath: "/cepas/identificadas",
    otherPath: "/cepas/atcc",
    otherLabel: "Explorar cepas ATCC",
    shipping: 155,
    shippingLabel: "Envío nacional estimado",
    accent: "emerald",
    storageKey: "aslabs-cart-identificadas-v2",
  },
  atcc: {
    eyebrow: "Microorganismos de referencia",
    title: "Cepas ATCC para resultados comparables y trazables",
    description:
      "Catálogo especializado de microorganismos de referencia para control de calidad, validación de métodos e investigación.",
    shortLabel: "ATCC",
    countLabel: "referencias disponibles",
    breadcrumb: "Cepas ATCC",
    catalogPath: "/cepas/atcc",
    otherPath: "/cepas/identificadas",
    otherLabel: "Ver cepas identificadas",
    shipping: 4500,
    shippingLabel: "Logística internacional estimada",
    accent: "lime",
    storageKey: "aslabs-cart-atcc-v2",
  },
} as const

function getBasePrice(strain: StrainItem) {
  return strain.precioSinEnvio ?? strain.precio
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value)
}

function useCart(strains: StrainItem[], storageKey: string) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved) setQuantities(JSON.parse(saved))
    } catch {
      setQuantities({})
    } finally {
      setHydrated(true)
    }
  }, [storageKey])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(storageKey, JSON.stringify(quantities))
  }, [hydrated, quantities, storageKey])

  const entries = useMemo(
    () =>
      strains
        .filter((strain) => (quantities[strain.id] ?? 0) > 0)
        .map((strain) => ({ strain, quantity: quantities[strain.id] })),
    [quantities, strains],
  )

  const add = (id: string, amount = 1) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(1, (current[id] ?? 0) + amount),
    }))
  }

  const set = (id: string, quantity: number) => {
    setQuantities((current) => {
      if (quantity <= 0) {
        const next = { ...current }
        delete next[id]
        return next
      }
      return { ...current, [id]: quantity }
    })
  }

  const remove = (id: string) => set(id, 0)

  return { entries, add, set, remove }
}

function CatalogSwitcher({ active }: { active: CatalogKind }) {
  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/10 p-1 shadow-2xl shadow-black/10 backdrop-blur-xl">
      <Link
        href="/cepas/identificadas"
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
          active === "identified"
            ? "bg-white text-emerald-950 shadow-lg"
            : "text-white/75 hover:bg-white/10 hover:text-white"
        }`}
      >
        Identificadas
      </Link>
      <Link
        href="/cepas/atcc"
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
          active === "atcc"
            ? "bg-white text-emerald-950 shadow-lg"
            : "text-white/75 hover:bg-white/10 hover:text-white"
        }`}
      >
        ATCC
      </Link>
    </div>
  )
}

function CatalogHero({ kind, count }: { kind: CatalogKind; count: number }) {
  const copy = catalogCopy[kind]

  return (
    <section
      data-navbar-theme="dark"
      className="relative isolate overflow-hidden bg-[#062d21] pb-20 pt-28 text-white sm:pb-24 sm:pt-32"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(52,211,153,.24),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(163,230,53,.16),transparent_30%),linear-gradient(145deg,#062d21_0%,#0a4b36_55%,#062d21_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 top-20 -z-10 h-72 w-72 rounded-full border border-white/10"
        animate={{ rotate: 360, scale: [1, 1.06, 1] }}
        transition={{ rotate: { duration: 32, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
      >
        <div className="absolute left-10 top-4 h-5 w-5 rounded-full bg-lime-300 shadow-[0_0_35px_rgba(190,242,100,.8)]" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl rounded-[32px] border border-white/10 bg-[#031f17]/55 p-6 shadow-[0_30px_90px_-42px_rgba(0,0,0,.9)] backdrop-blur-[4px] sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <CatalogSwitcher active={kind} />
            <span className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e9fff0]">
              <Sparkles className="h-4 w-4" />
              {copy.eyebrow}
            </span>
          </div>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.62)] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.92] drop-shadow-[0_2px_12px_rgba(0,0,0,.45)] sm:text-lg">
            {copy.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="grid grid-cols-2 gap-3 lg:grid-cols-1"
        >
          <div className="rounded-3xl border border-white/20 bg-[#031f17]/70 p-5 shadow-xl backdrop-blur-xl">
            <p className="text-3xl font-semibold text-white">{count}</p>
            <p className="mt-1 text-sm text-white/[0.82]">{copy.countLabel}</p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-[#031f17]/70 p-5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-lime-200">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-semibold">BSL-1</span>
            </div>
            <p className="mt-1 text-sm text-white/[0.82]">Selección para uso profesional</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StrainCard({
  strain,
  kind,
  index,
  onAdd,
}: {
  strain: StrainItem
  kind: CatalogKind
  index: number
  onAdd: (strain: StrainItem) => void
}) {
  const copy = catalogCopy[kind]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.25) }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-emerald-950/10 bg-white shadow-[0_16px_50px_rgba(5,46,34,.07)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(5,46,34,.14)]"
    >
      <div className="h-1 w-full bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-700 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative overflow-hidden border-b border-emerald-950/8 bg-gradient-to-br from-emerald-50 via-white to-lime-50/70 p-6">
        <div className="absolute -right-7 -top-7 h-28 w-28 rounded-full border-[18px] border-emerald-500/[0.06] transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110" />
        <motion.span
          aria-hidden="true"
          className="absolute right-16 top-20 h-2.5 w-2.5 rounded-full bg-lime-300/70"
          animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.08 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute right-10 top-28 h-1.5 w-1.5 rounded-full bg-emerald-500/50"
          animate={{ x: [0, 7, 0], y: [0, -5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: index * 0.05 }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-100 shadow-lg shadow-emerald-950/20">
            <Dna className="h-6 w-6" />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <span className="rounded-full border border-emerald-200 bg-white/85 px-3 py-1 text-xs font-bold text-emerald-800">
              {strain.bsl}
            </span>
            {strain.typeStrain === "Sí" && (
              <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-bold text-lime-950">Cepa tipo</span>
            )}
          </div>
        </div>
        <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.17em] text-emerald-700">{strain.codigo}</p>
        <h2 className="relative mt-2 text-2xl font-semibold leading-tight tracking-[-0.025em] text-emerald-950">
          <span className="italic">{strain.nombre}</span>
        </h2>
        <p className="relative mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-600">{strain.cientifico}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{strain.categoria}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">{strain.productFormat}</span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
            <dt className="text-xs text-slate-500">Presentación</dt>
            <dd className="mt-1 font-semibold text-slate-800">{strain.cantidad}</dd>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
            <dt className="text-xs text-slate-500">Disponibilidad</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              A confirmar
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">Precio referencial desde</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-950">{formatMoney(getBasePrice(strain))}</p>
            </div>
            <p className="max-w-[125px] text-right text-[11px] leading-4 text-slate-500">Envío calculado una vez por pedido</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`${copy.catalogPath}/${strain.id}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-950/15 px-4 text-sm font-bold text-emerald-950 transition-all hover:border-emerald-700 hover:bg-emerald-50"
            >
              Ver ficha
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <motion.button
              type="button"
              whileTap={{ scale: 0.93 }}
              onClick={() => onAdd(strain)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 px-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              aria-label={`Añadir ${strain.nombre} al pedido`}
            >
              <ShoppingCart className="h-4 w-4" />
              Añadir
            </motion.button>
          </div>
          {kind === "atcc" && strain.link && (
            <a
              href={strain.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-emerald-700"
            >
              Consultar referencia genómica
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function CartDrawer({
  open,
  onClose,
  entries,
  kind,
  onSet,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  entries: CartEntry[]
  kind: CatalogKind
  onSet: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}) {
  const copy = catalogCopy[kind]
  const subtotal = entries.reduce((sum, entry) => sum + getBasePrice(entry.strain) * entry.quantity, 0)
  const shipping = entries.length ? copy.shipping : 0
  const total = subtotal + shipping
  const units = entries.reduce((sum, entry) => sum + entry.quantity, 0)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const requestQuote = () => {
    if (!entries.length) return
    const lines = entries.map(
      ({ strain, quantity }) =>
        `• ${strain.nombre} (${strain.codigo}) — ${quantity} × ${formatMoney(getBasePrice(strain))}`,
    )
    const message = [
      `Hola, deseo solicitar una cotización de cepas ${copy.shortLabel}:`,
      "",
      ...lines,
      "",
      `Subtotal referencial: ${formatMoney(subtotal)}`,
      `${copy.shippingLabel}: ${formatMoney(shipping)}`,
      `Total estimado: ${formatMoney(total)}`,
      "",
      "Por favor, confirmen disponibilidad, documentación, destino y plazo de entrega.",
    ].join("\n")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[180]">
          <motion.button
            type="button"
            aria-label="Cerrar pedido"
            className="absolute inset-0 bg-emerald-950/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Resumen de pedido"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-[#fbfdfb] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-emerald-950/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Solicitud de cotización</p>
                <h2 className="mt-1 text-2xl font-semibold text-emerald-950">Tu pedido</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {!entries.length ? (
                <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-emerald-950">Tu pedido está vacío</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">
                    Añade una o más cepas. Podrás revisar cantidades y costos antes de solicitar la cotización.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
                  >
                    Seguir explorando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.map(({ strain, quantity }) => (
                    <motion.div
                      layout
                      key={strain.id}
                      className="rounded-3xl border border-emerald-950/10 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-950 text-emerald-100">
                          <Dna className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-emerald-950">{strain.nombre}</p>
                          <p className="mt-0.5 text-xs font-semibold text-emerald-700">{strain.codigo}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(strain.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Eliminar ${strain.nombre}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                          <button
                            type="button"
                            onClick={() => onSet(strain.id, quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-800">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => onSet(strain.id, quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="font-bold text-emerald-950">{formatMoney(getBasePrice(strain) * quantity)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {entries.length > 0 && (
              <div className="border-t border-emerald-950/10 bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-7">
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <dt>Subtotal · {units} {units === 1 ? "unidad" : "unidades"}</dt>
                    <dd className="font-semibold text-slate-800">{formatMoney(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-5 text-slate-600">
                    <dt>{copy.shippingLabel}</dt>
                    <dd className="shrink-0 font-semibold text-slate-800">{formatMoney(shipping)}</dd>
                  </div>
                  <div className="mt-3 flex items-end justify-between border-t border-dashed border-slate-200 pt-4">
                    <dt>
                      <span className="block font-bold text-emerald-950">Total estimado</span>
                      <span className="text-xs text-slate-500">Sujeto a confirmación</span>
                    </dt>
                    <dd className="text-2xl font-bold tracking-tight text-emerald-950">{formatMoney(total)}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={requestQuote}
                  className="mt-5 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-5 text-base font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl"
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[11px] leading-4 text-slate-500">
                  Un asesor verificará disponibilidad, documentación y condiciones de entrega.
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

function TrustStrip({ kind }: { kind: CatalogKind }) {
  const items =
    kind === "atcc"
      ? [
          { icon: BadgeCheck, title: "Trazabilidad", text: "Referencia y designación visibles" },
          { icon: FileCheck2, title: "Documentación", text: "Validada antes de la entrega" },
          { icon: PackageCheck, title: "Logística asistida", text: "Importación y envío coordinados" },
        ]
      : [
          { icon: Microscope, title: "Identificación", text: "Información técnica por cepa" },
          { icon: FileCheck2, title: "Ficha técnica", text: "Datos para evaluar tu proyecto" },
          { icon: PackageCheck, title: "Atención especializada", text: "Coordinación de disponibilidad" },
        ]

  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-[28px] border border-emerald-950/10 bg-white shadow-[0_18px_60px_rgba(5,46,34,.12)] md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`flex items-center gap-4 p-5 sm:p-6 ${index < items.length - 1 ? "border-b border-slate-100 md:border-b-0 md:border-r" : ""}`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-emerald-950">{item.title}</p>
              <p className="mt-0.5 text-sm text-slate-500">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StrainCatalog({ strains, kind }: CatalogProps) {
  const copy = catalogCopy[kind]
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Todas")
  const [cartOpen, setCartOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const cart = useCart(strains, copy.storageKey)

  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(strains.map((strain) => strain.categoria)))],
    [strains],
  )

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es")
    return strains.filter((strain) => {
      const matchesCategory = category === "Todas" || strain.categoria === category
      const haystack = [
        strain.nombre,
        strain.codigo,
        strain.cientifico,
        strain.categoria,
        strain.strainDesignation,
        strain.productFormat,
      ]
        .join(" ")
        .toLocaleLowerCase("es")
      return matchesCategory && (!normalized || haystack.includes(normalized))
    })
  }, [category, query, strains])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 2200)
    return () => window.clearTimeout(timer)
  }, [notice])

  const addToCart = (strain: StrainItem) => {
    cart.add(strain.id)
    setNotice(`${strain.nombre} se añadió a tu pedido`)
  }

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-sans text-slate-900">
      <Navbar overlay />
      <main>
        <CatalogHero kind={kind} count={strains.length} />
        <TrustStrip kind={kind} />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Catálogo disponible</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-emerald-950 sm:text-4xl">
                  Encuentra la cepa que necesitas
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"} · precios referenciales en soles
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((value) => !value)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-950/10 bg-white px-4 text-sm font-bold text-emerald-950 shadow-sm lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </button>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-950 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 lg:flex-none"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Ver pedido
                  {cart.entries.length > 0 && (
                    <span className="rounded-full bg-lime-300 px-2 py-0.5 text-xs text-emerald-950">{cart.entries.length}</span>
                  )}
                </button>
              </div>
            </div>

            <div className="grid items-start gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
              <aside
                className={`${filtersOpen ? "block" : "hidden"} rounded-[28px] border border-emerald-950/10 bg-white p-5 shadow-[0_14px_45px_rgba(5,46,34,.06)] lg:sticky lg:top-28 lg:block`}
              >
                <div className="flex items-center justify-between lg:hidden">
                  <p className="font-bold text-emerald-950">Filtrar catálogo</p>
                  <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <label className="mt-4 block lg:mt-0">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Buscar</span>
                  <span className="relative mt-2 block">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Nombre o código"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </span>
                </label>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Aplicación</p>
                  <div className="mt-3 space-y-1.5">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setCategory(item)
                          setFiltersOpen(false)
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left text-sm transition-all ${
                          category === item
                            ? "bg-emerald-950 font-bold text-white shadow-md"
                            : "font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"
                        }`}
                      >
                        <span>{item}</span>
                        {category === item && <Check className="h-4 w-4 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
                {(query || category !== "Todas") && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("")
                      setCategory("Todas")
                    }}
                    className="mt-5 w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Limpiar filtros
                  </button>
                )}
              </aside>

              <div>
                <div className="relative mb-5 hidden lg:block">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Busca por especie, código, categoría o presentación…"
                    className="h-16 w-full rounded-2xl border border-emerald-950/10 bg-white pl-14 pr-5 text-base shadow-[0_10px_35px_rgba(5,46,34,.05)] outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
                <motion.div layout className="grid gap-5 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((strain, index) => (
                      <StrainCard key={strain.id} strain={strain} kind={kind} index={index} onAdd={addToCart} />
                    ))}
                  </AnimatePresence>
                </motion.div>
                {!filtered.length && (
                  <div className="rounded-[28px] border border-dashed border-emerald-950/20 bg-white px-6 py-16 text-center">
                    <FlaskConical className="mx-auto h-10 w-10 text-emerald-300" />
                    <h3 className="mt-4 text-xl font-semibold text-emerald-950">No encontramos coincidencias</h3>
                    <p className="mt-2 text-sm text-slate-600">Prueba con otra especie, código o categoría.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <CatalogContent kind={kind} />
      </main>
      <Footer />

      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="fixed bottom-24 left-1/2 z-[170] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 shadow-2xl sm:bottom-7"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
            <span className="flex-1">{notice}</span>
            <button type="button" onClick={() => setCartOpen(true)} className="text-xs font-bold text-emerald-700">
              Ver
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCartOpen(true)}
        className="fixed bottom-5 right-4 z-[140] flex min-h-14 items-center gap-3 rounded-full border border-white/15 bg-emerald-950 px-4 text-sm font-bold text-white shadow-[0_16px_40px_rgba(5,46,34,.4)] sm:right-7 sm:px-5"
        aria-label={`Abrir pedido, ${cart.entries.reduce((sum, entry) => sum + entry.quantity, 0)} productos`}
      >
        <span className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-2.5 -top-2.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime-300 px-1 text-[10px] font-black text-emerald-950">
            {cart.entries.reduce((sum, entry) => sum + entry.quantity, 0)}
          </span>
        </span>
        <span className="ml-1">Pedido</span>
        {cart.entries.length > 0 && (
          <>
            <span className="h-5 w-px bg-white/20" />
            <span className="hidden sm:inline">
              {formatMoney(cart.entries.reduce((sum, entry) => sum + getBasePrice(entry.strain) * entry.quantity, 0))}
            </span>
          </>
        )}
      </motion.button>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        entries={cart.entries}
        kind={kind}
        onSet={cart.set}
        onRemove={cart.remove}
      />
    </div>
  )
}

function CatalogContent({ kind }: { kind: CatalogKind }) {
  const copy = catalogCopy[kind]
  const isAtcc = kind === "atcc"
  const faqs = isAtcc
    ? [
        ["¿Qué documentación acompaña a una cepa ATCC?", "La documentación aplicable se confirma según la referencia seleccionada y el alcance del pedido."],
        ["¿El precio incluye importación y entrega?", "La interfaz separa el valor referencial de la cepa y la logística internacional estimada. La cotización final depende del destino y disponibilidad."],
        ["¿Puedo solicitar una cepa para control de calidad?", "Sí. Indica el método, microorganismo y uso previsto para recibir orientación sobre la referencia adecuada."],
      ]
    : [
        ["¿Para qué se utilizan las cepas identificadas?", "Se emplean en investigación, docencia y proyectos de desarrollo microbiológico, de acuerdo con la ficha y el uso previsto."],
        ["¿Las cepas tienen ficha técnica?", "Cada referencia cuenta con información de identificación, formato, presentación y datos técnicos para evaluar su compatibilidad con el proyecto."],
        ["¿Cómo confirmo disponibilidad y entrega?", "Añade las referencias al pedido y solicita la cotización. Un especialista confirmará stock, destino, documentación y plazo."],
      ]

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Compra informada</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-emerald-950 sm:text-4xl">
              {isAtcc
                ? "Solicita cepas ATCC de referencia con acompañamiento especializado"
                : "Compra cepas microbianas identificadas en Perú con información clara"}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {isAtcc
                ? "Selecciona la referencia, revisa sus características y arma una solicitud sin perder el contexto técnico. La disponibilidad, documentación y logística se validan antes de confirmar."
                : "Compara especies, códigos, presentaciones y aplicaciones desde un mismo catálogo. El equipo de AS Laboratorios confirma la compatibilidad de la referencia con el objetivo declarado."}
            </p>
            <Link
              href={copy.otherPath}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-950/15 px-5 py-3 text-sm font-bold text-emerald-950 transition-all hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              {copy.otherLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map(([question, answer], index) => (
              <motion.details
                key={question}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-3xl border border-emerald-950/10 bg-[#f7faf7] p-5 open:bg-emerald-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-emerald-950">
                  {question}
                  <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pt-3 text-sm leading-6 text-slate-600">{answer}</p>
              </motion.details>
            ))}
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[38px] bg-[#082f22] p-6 text-white sm:p-9 lg:p-12">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[42px] border-white/[0.035]" />
          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />
          <div className="relative">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-200">Pedido en cuatro pasos</p>
                <h3 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Del catálogo a una entrega coordinada
                </h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-emerald-100 backdrop-blur-xl">
                <ShieldCheck className="h-4 w-4 text-lime-200" />
                Atención especializada
              </span>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["01", "Explora", "Busca por nombre, código o aplicación."],
                ["02", "Revisa", "Lee formato, presentación y ficha."],
                ["03", "Arma tu pedido", "Ajusta cantidades y consulta el total."],
                ["04", "Confirma", "Validamos disponibilidad y entrega."],
              ].map(([step, title, description], index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl"
                >
                  <span className="text-xs font-black tracking-[0.18em] text-lime-200">{step}</span>
                  <p className="mt-5 font-bold">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-emerald-50/55">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function detailBenefits(strain: StrainItem, kind: CatalogKind) {
  if (kind === "atcc") {
    return [
      "Referencia microbiológica reconocible por código y designación",
      "Adecuada para evaluar controles, métodos y desempeño analítico",
      "Información de presentación y trazabilidad visible antes de solicitar",
    ]
  }
  const category = strain.categoria.toLocaleLowerCase("es")
  if (category.includes("biocontrol")) {
    return [
      "Alternativa microbiológica para proyectos de control biológico",
      "Cepa identificada para evaluación técnica y experimental",
      "Presentación definida para facilitar la planificación del ensayo",
    ]
  }
  if (category.includes("nitrógeno") || category.includes("biofert")) {
    return [
      "Aplicable a proyectos de interacción planta–microorganismo",
      "Información de identificación y origen para sustentar el diseño experimental",
      "Formato pensado para investigación y desarrollo microbiológico",
    ]
  }
  return [
    "Cepa identificada para investigación y desarrollo experimental",
    "Información técnica centralizada para evaluar su uso",
    "Acompañamiento en disponibilidad, presentación y despacho",
  ]
}

function detailApplications(strain: StrainItem, kind: CatalogKind) {
  if (kind === "atcc") {
    return ["Control de calidad microbiológico", "Validación o verificación de métodos", "Docencia e investigación comparativa"]
  }
  const category = strain.categoria.toLocaleLowerCase("es")
  if (category.includes("biocontrol")) return ["Ensayos de antagonismo", "Investigación agrícola", "Desarrollo de biocontroladores"]
  if (category.includes("nitrógeno")) return ["Fijación biológica de nitrógeno", "Ensayos de inoculación", "Investigación agronómica"]
  if (category.includes("biofert")) return ["Biofertilización", "Interacción rizosférica", "Desarrollo de formulaciones"]
  return ["Investigación microbiológica", "Docencia aplicada", "Desarrollo experimental"]
}

export function StrainDetail({ strains, kind, strainId }: DetailProps) {
  const copy = catalogCopy[kind]
  const strain = strains.find((item) => item.id === strainId)
  const [quantity, setQuantity] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const cart = useCart(strains, copy.storageKey)

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(false), 2200)
    return () => window.clearTimeout(timer)
  }, [notice])

  if (!strain) {
    return (
      <div className="min-h-screen bg-[#f5f8f5] font-sans">
        <Navbar overlay />
        <main className="flex min-h-[75vh] items-center justify-center px-4 pt-28 text-center">
          <div>
            <FlaskConical className="mx-auto h-12 w-12 text-emerald-400" />
            <h1 className="mt-5 text-3xl font-semibold text-emerald-950">Cepa no encontrada</h1>
            <p className="mt-3 text-slate-600">La referencia solicitada no está disponible en este catálogo.</p>
            <Link href={copy.catalogPath} className="mt-7 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-bold text-white">
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const benefits = detailBenefits(strain, kind)
  const applications = detailApplications(strain, kind)
  const subtotal = getBasePrice(strain) * quantity
  const total = subtotal + copy.shipping
  const related = strains.filter((item) => item.id !== strain.id && item.categoria === strain.categoria).slice(0, 3)

  const addToCart = () => {
    cart.add(strain.id, quantity)
    setNotice(true)
  }

  return (
    <div className="min-h-screen bg-[#f5f8f5] font-sans text-slate-900">
      <Navbar overlay />
      <main>
        <section
          data-navbar-theme="dark"
          className="relative overflow-hidden bg-[#062d21] pb-14 pt-28 text-white sm:pb-20 sm:pt-32"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(163,230,53,.17),transparent_28%),radial-gradient(circle_at_10%_60%,rgba(52,211,153,.16),transparent_32%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/[0.82]">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={copy.catalogPath} className="hover:text-white">{copy.breadcrumb}</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{strain.codigo}</span>
            </nav>

            <div className="mt-7 grid items-end gap-8 lg:grid-cols-[1fr_300px]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="rounded-[30px] border border-white/10 bg-[#031f17]/52 p-6 shadow-[0_28px_80px_-38px_rgba(0,0,0,.82)] backdrop-blur-[4px] sm:p-8"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold">{strain.bsl}</span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold">{strain.categoria}</span>
                  {strain.typeStrain === "Sí" && (
                    <span className="rounded-full bg-lime-300 px-3 py-1.5 text-xs font-bold text-emerald-950">Cepa tipo</span>
                  )}
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-lime-200">{strain.codigo}</p>
                <h1 className="mt-3 text-balance text-3xl font-semibold italic leading-[1.06] tracking-[-0.035em] text-white drop-shadow-[0_3px_16px_rgba(0,0,0,.58)] sm:text-4xl lg:text-5xl">
                  {strain.nombre}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.9] drop-shadow-[0_2px_10px_rgba(0,0,0,.42)]">{strain.cientifico}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.12, duration: 0.6 }}
                className="hidden aspect-[4/3] items-center justify-center rounded-[38px] border border-white/12 bg-white/[0.07] backdrop-blur-xl lg:flex"
              >
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-emerald-200/30">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                    className="absolute inset-3 rounded-full border border-dashed border-lime-200/50"
                  />
                  <Dna className="h-14 w-14 text-lime-200" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8">
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[30px] border border-emerald-950/10 bg-white p-6 shadow-[0_16px_55px_rgba(5,46,34,.06)] sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Ficha de la cepa</p>
                  <h2 className="text-2xl font-semibold text-emerald-950">Información técnica</h2>
                </div>
              </div>
              <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 sm:grid-cols-2">
                {[
                  ["Nombre depositado", strain.depositedAs],
                  ["Designación", strain.strainDesignation || "Consultar documentación"],
                  ["Formato", strain.productFormat],
                  ["Presentación", strain.cantidad],
                  ["Referencia", strain.referencia],
                  ["Cepa tipo", strain.typeStrain],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white p-4">
                    <dt className="text-xs font-semibold text-slate-500">{label}</dt>
                    <dd className="mt-1.5 text-sm font-bold leading-5 text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
              {kind === "atcc" && strain.link && (
                <a
                  href={strain.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
                >
                  Consultar referencia genómica en NCBI
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </motion.section>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-[30px] bg-emerald-950 p-6 text-white sm:p-8">
                <FlaskConical className="h-7 w-7 text-lime-200" />
                <h2 className="mt-5 text-2xl font-semibold">Usos y beneficios</h2>
                <ul className="mt-5 space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm leading-6 text-emerald-50/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-[30px] border border-emerald-950/10 bg-white p-6 sm:p-8">
                <Microscope className="h-7 w-7 text-emerald-700" />
                <h2 className="mt-5 text-2xl font-semibold text-emerald-950">Aplicaciones</h2>
                <ul className="mt-5 space-y-3">
                  {applications.map((application) => (
                    <li key={application} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {application}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="rounded-[30px] border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <h2 className="font-bold text-amber-950">Uso profesional y responsable</h2>
                  <p className="mt-2 text-sm leading-6 text-amber-900/75">
                    La referencia se entrega para el uso declarado y bajo las condiciones técnicas aplicables. Confirma requisitos, documentación y manipulación con el equipo antes de comprar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[30px] border border-emerald-950/10 bg-white shadow-[0_20px_70px_rgba(5,46,34,.12)]">
              <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-lime-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Precio referencial</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-950">{formatMoney(getBasePrice(strain))}</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Disponibilidad a confirmar
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">Cantidad</span>
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((value) => value + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <dl className="mt-6 space-y-3 border-t border-dashed border-slate-200 pt-5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <dt>Subtotal</dt>
                    <dd className="font-semibold text-slate-800">{formatMoney(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 text-slate-600">
                    <dt>{copy.shippingLabel}</dt>
                    <dd className="shrink-0 font-semibold text-slate-800">{formatMoney(copy.shipping)}</dd>
                  </div>
                  <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                    <dt>
                      <span className="block font-bold text-emerald-950">Total estimado</span>
                      <span className="text-[11px] text-slate-500">Sujeto a cotización</span>
                    </dt>
                    <dd className="text-xl font-bold text-emerald-950">{formatMoney(total)}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={addToCart}
                  className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Añadir al pedido
                </button>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-emerald-950/15 font-bold text-emerald-950 transition-colors hover:bg-emerald-50"
                >
                  Ver pedido
                  {cart.entries.length > 0 && (
                    <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-xs text-white">{cart.entries.length}</span>
                  )}
                </button>
                <div className="mt-5 grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-slate-500">
                  <span className="rounded-xl bg-slate-50 px-2 py-3"><FileCheck2 className="mx-auto mb-1 h-4 w-4" />Documentación</span>
                  <span className="rounded-xl bg-slate-50 px-2 py-3"><Truck className="mx-auto mb-1 h-4 w-4" />Entrega coordinada</span>
                </div>
              </div>
            </div>
            <Link
              href={copy.catalogPath}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-slate-600 hover:text-emerald-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </Link>
          </aside>
        </section>

        {related.length > 0 && (
          <section className="border-t border-emerald-950/10 bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">También puede interesarte</p>
                  <h2 className="mt-2 text-3xl font-semibold text-emerald-950">Cepas relacionadas</h2>
                </div>
                <Link href={copy.catalogPath} className="hidden items-center gap-2 text-sm font-bold text-emerald-700 sm:flex">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`${copy.catalogPath}/${item.id}`}
                    className="group rounded-[24px] border border-emerald-950/10 bg-[#f7faf7] p-5 transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">{item.codigo}</p>
                    <h3 className="mt-2 text-xl font-semibold italic text-emerald-950">{item.nombre}</h3>
                    <p className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-600 group-hover:text-emerald-700">
                      Ver ficha <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <AnimatePresence>
        {notice && (
          <motion.button
            type="button"
            onClick={() => setCartOpen(true)}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[170] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl bg-emerald-950 px-5 py-4 text-left text-sm font-semibold text-white shadow-2xl"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-lime-300" />
            <span className="flex-1">Añadido al pedido. Toca para revisarlo.</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCartOpen(true)}
        className="fixed bottom-5 right-4 z-[140] flex min-h-14 items-center gap-3 rounded-full border border-white/15 bg-emerald-950 px-4 text-sm font-bold text-white shadow-[0_16px_40px_rgba(5,46,34,.4)] sm:right-7 sm:px-5"
        aria-label={`Abrir pedido, ${cart.entries.reduce((sum, entry) => sum + entry.quantity, 0)} productos`}
      >
        <span className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-2.5 -top-2.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime-300 px-1 text-[10px] font-black text-emerald-950">
            {cart.entries.reduce((sum, entry) => sum + entry.quantity, 0)}
          </span>
        </span>
        <span className="ml-1">Pedido</span>
        {cart.entries.length > 0 && (
          <>
            <span className="h-5 w-px bg-white/20" />
            <span className="hidden sm:inline">
              {formatMoney(cart.entries.reduce((sum, entry) => sum + getBasePrice(entry.strain) * entry.quantity, 0))}
            </span>
          </>
        )}
      </motion.button>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        entries={cart.entries}
        kind={kind}
        onSet={cart.set}
        onRemove={cart.remove}
      />
    </div>
  )
}
