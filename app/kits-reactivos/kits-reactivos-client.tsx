"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Beaker,
  ChevronLeft,
  ChevronRight,
  Dna,
  FlaskConical,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TestTube2,
  Trash2,
  Truck,
  X,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import {
  getProductReferencePricePen,
  hasVerifiedProductPrice,
  molecularProducts,
  productCategories,
  REFERENCE_SHIPPING_PEN,
  type MolecularProduct,
} from "@/data/kits-reactivos"

const PAGE_SIZE = 24

const categoryGroups: Record<string, readonly (typeof productCategories)[number][]> = {
  molecular: ["PCR y qPCR", "Extracción y purificación", "ARN y transcriptómica", "Cuantificación y detección", "Clonación y expresión", "Reactivos moleculares", "Electroforesis"],
  microbiologia: ["Bacteriología y medios", "Identificación bacteriana"],
  medios: ["Medios de cultivo"],
  equipos: ["Equipos moleculares", "Consumibles PCR", "Materiales moleculares"],
  bacteriofagos: ["Bacteriófagos"],
}

export type CatalogPageConfig = {
  scope: "molecular" | "microbiologia" | "medios" | "equipos" | "bacteriofagos"
  eyebrow: string
  title: string
  description: string
  image: string
  introTitle: string
  intro: string[]
  useCases: Array<{ title: string; text: string }>
  faq: Array<{ question: string; answer: string }>
  notice?: string
}

const familyPages = [
  { scope: "molecular", label: "Biología molecular", href: "/kits-reactivos/biologia-molecular", description: "PCR, qPCR, extracción y análisis" },
  { scope: "microbiologia", label: "Microbiología", href: "/kits-reactivos/microbiologia", description: "Identificación y pruebas bacterianas" },
  { scope: "medios", label: "Medios de cultivo", href: "/kits-reactivos/medios-de-cultivo", description: "Agares HiMedia de importación" },
  { scope: "equipos", label: "Equipos y consumibles", href: "/kits-reactivos/equipos-consumibles", description: "Instrumentos y materiales de laboratorio" },
  { scope: "bacteriofagos", label: "Bacteriófagos", href: "/kits-reactivos/bacteriofagos", description: "Mezclas y controles para investigación" },
] as const

function matchesCategory(product: MolecularProduct, selected: string) {
  if (selected === "Todos") return true
  if (selected.startsWith("grupo:")) return categoryGroups[selected.slice(6)]?.includes(product.category) ?? false
  return product.category === selected
}

function money(value: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(value)
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: MolecularProduct
  index: number
  onAdd: (product: MolecularProduct) => void
}) {
  const price = getProductReferencePricePen(product)

  return (
    <motion.article
      id={product.id}
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.045, 0.25) }}
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#dfe9e2] bg-white shadow-[0_10px_28px_rgba(8,48,33,.05)] transition-shadow hover:shadow-[0_16px_36px_rgba(8,48,33,.11)]"
    >
      <div className="relative h-32 overflow-hidden border-b border-[#edf1ee] bg-white sm:h-36">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-[#dfe9e2] bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[.08em] text-[#285d42] shadow-sm backdrop-blur-md">
          {product.category}
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-[#123e2d] px-2.5 py-1 text-[8px] font-bold text-white">
          {product.catalogNumber}
        </span>
        {product.researchUseOnly && <span className="absolute right-3 top-3 rounded-full border border-amber-200 bg-amber-50/95 px-2.5 py-1 text-[8px] font-black uppercase tracking-[.08em] text-amber-800 shadow-sm">Solo investigación</span>}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#4d7d60]">{product.brand}</p>
        <h2 className="mt-1.5 line-clamp-2 text-base font-bold leading-5 tracking-[-.02em] text-[#123e2d]">{product.name}</h2>
        <p className="mt-2 line-clamp-1 text-[10px] font-medium text-[#77877e]">{product.presentation}</p>

        <div className="mt-auto pt-3">
          <div>
            {price !== null ? (
              <>
                <p className="text-[9px] font-semibold uppercase tracking-[.08em] text-[#718279]">Precio referencial{product.priceBasis ? ` · ${product.priceBasis}` : ""}</p>
                <p className="mt-0.5 text-lg font-black tracking-[-.03em] text-[#0b4a33]">{product.priceBasis ? money(price) : `Desde ${money(price)}`} {product.taxNote && <span className="text-[10px] font-bold text-[#5f7569]">{product.taxNote}</span>}</p>
              </>
            ) : (
              <>
                <p className="text-[9px] font-semibold uppercase tracking-[.08em] text-[#718279]">Precio</p>
                <p className="mt-0.5 text-sm font-black tracking-[-.02em] text-[#0b4a33]">Bajo cotización</p>
              </>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/kits-reactivos/${product.id}`}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#ceded3] px-2 text-[11px] font-bold text-[#285b41] transition hover:border-[#8eb19d] hover:bg-[#eff6f1]"
            >
              Ver ficha <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {product.presentationOptions?.length ? (
              <Link href={`/kits-reactivos/${product.id}`} className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#14744d] px-2 text-[11px] font-bold text-white shadow-md shadow-[#14744d]/15 transition hover:-translate-y-0.5 hover:bg-[#0f5e3e]"><SlidersHorizontal className="h-4 w-4" /> Elegir</Link>
            ) : (
              <button
                type="button"
                onClick={() => onAdd(product)}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-[#14744d] px-2 text-[11px] font-bold text-white shadow-md shadow-[#14744d]/15 transition hover:-translate-y-0.5 hover:bg-[#0f5e3e]"
              >
                <ShoppingCart className="h-4 w-4" /> {price !== null ? "Añadir" : "Cotizar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function CartDrawer({
  open,
  cart,
  onClose,
  onSet,
}: {
  open: boolean
  cart: Record<string, number>
  onClose: () => void
  onSet: (id: string, quantity: number) => void
}) {
  const entries = molecularProducts.filter((product) => (cart[product.id] ?? 0) > 0)
  const units = entries.reduce((total, product) => total + cart[product.id], 0)
  const allPricesAvailable = entries.length > 0 && entries.every(hasVerifiedProductPrice)
  const hasTaxExcludedProducts = entries.some((product) => Boolean(product.taxNote))
  const subtotalFrom = allPricesAvailable
    ? entries.reduce((total, product) => total + getProductReferencePricePen(product)! * cart[product.id], 0)
    : null
  const message = [
    "Hola, deseo solicitar una cotización de kits y reactivos:",
    "",
    ...entries.map((product) => `• ${product.name} (${product.catalogNumber}) — ${cart[product.id]} unidad(es)${product.taxNote ? ` · ${product.taxNote}` : ""}${product.researchUseOnly ? " · solo para investigación" : ""}`),
    "",
    ...(subtotalFrom !== null
      ? [`Subtotal referencial desde: ${money(subtotalFrom)}${hasTaxExcludedProducts ? " (incluye productos con IGV no sumado)" : ""}`, `Envío base referencial desde: ${money(REFERENCE_SHIPPING_PEN)}`, "Total final: por confirmar según variables, impuestos y conservación."]
      : ["Precio, presentación, importación y envío: por confirmar en cotización."]),
    "",
    "Por favor, confirmen disponibilidad, tipo de cambio y plazo de importación.",
  ].join("\n")

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[180]">
          <motion.button type="button" aria-label="Cerrar pedido" className="absolute inset-0 bg-[#062c20]/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside role="dialog" aria-modal="true" aria-label="Pedido de kits y reactivos" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 34 }} className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-[#f9fbf9] shadow-2xl">
            <header className="flex items-center justify-between border-b border-[#dfe8e2] px-5 py-5 sm:px-7">
              <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4f8062]">Solicitud referencial</p><h2 className="mt-1 text-2xl font-bold text-[#173f2d]">Tu pedido</h2></div>
              <button type="button" onClick={onClose} aria-label="Cerrar" className="grid h-11 w-11 place-items-center rounded-full border border-[#dbe5de] bg-white text-[#53675b]"><X className="h-5 w-5" /></button>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {entries.length ? entries.map((product) => {
                const quantity = cart[product.id]
                const price = getProductReferencePricePen(product)
                return (
                  <article key={product.id} className="mb-3 rounded-3xl border border-[#dfe8e2] bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e7f2ea] text-[#1e6a46]"><FlaskConical className="h-5 w-5" /></span>
                      <div className="min-w-0 flex-1"><p className="font-bold leading-5 text-[#173f2d]">{product.name}</p><p className="mt-1 text-[10px] font-semibold text-[#648071]">{product.catalogNumber}</p></div>
                      <button type="button" onClick={() => onSet(product.id, 0)} aria-label={`Eliminar ${product.name}`} className="grid h-9 w-9 place-items-center rounded-xl text-[#9aa69f] hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[#dfe7e2] bg-[#f5f8f5] p-1">
                        <button type="button" onClick={() => onSet(product.id, quantity - 1)} aria-label="Reducir cantidad" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                        <button type="button" onClick={() => onSet(product.id, quantity + 1)} aria-label="Aumentar cantidad" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <p className="text-right font-black text-[#0d5137]">{price !== null ? `Desde ${money(price * quantity)}${product.taxNote ? ` ${product.taxNote}` : ""}` : "Bajo cotización"}</p>
                    </div>
                  </article>
                )
              }) : (
                <div className="flex min-h-[55vh] flex-col items-center justify-center text-center"><span className="grid h-20 w-20 place-items-center rounded-full bg-[#e8f3eb] text-[#28704d]"><ShoppingCart className="h-8 w-8" /></span><h3 className="mt-5 text-xl font-bold text-[#173f2d]">Tu pedido está vacío</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[#718178]">Añade las referencias que deseas cotizar.</p></div>
              )}
            </div>
            {entries.length > 0 && (
              <footer className="max-h-[48vh] overflow-y-auto border-t border-[#dfe8e2] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-7">
                {subtotalFrom !== null ? (
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between text-[#66786e]"><dt>Subtotal desde · {units} {units === 1 ? "unidad" : "unidades"}</dt><dd className="font-bold text-[#2d4639]">{money(subtotalFrom)}</dd></div>
                    <div className="flex justify-between text-[#66786e]"><dt className="flex items-center gap-2"><Truck className="h-4 w-4" />Envío base desde</dt><dd className="font-bold text-[#2d4639]">{money(REFERENCE_SHIPPING_PEN)}</dd></div>
                    <div className="border-t border-dashed border-[#dfe8e2] pt-4"><p className="font-bold text-[#173f2d]">Total final por confirmar</p><p className="mt-1 text-[10px] leading-4 text-[#829087]">Depende de la variante, impuestos, destino y cadena de frío.</p></div>
                    {hasTaxExcludedProducts && <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] leading-4 text-amber-900">El subtotal contiene referencias publicadas “+ IGV”. El impuesto se calcula en la cotización final.</div>}
                  </dl>
                ) : (
                  <div className="rounded-2xl border border-[#ead9ba] bg-[#fff9ee] p-4">
                    <p className="text-sm font-bold text-[#60491e]">Cotización personalizada · {units} {units === 1 ? "unidad" : "unidades"}</p>
                    <p className="mt-1 text-xs leading-5 text-[#7b6845]">No se calculará ningún total hasta validar precio, presentación, importación y envío.</p>
                  </div>
                )}
                <WhatsAppContact message={message} className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#14744d] px-5 text-base font-bold text-white shadow-lg shadow-[#14744d]/20 transition hover:bg-[#0f5e3e]">
                  Solicitar cotización <ArrowRight className="h-4 w-4" />
                </WhatsAppContact>
                <p className="mt-3 text-center text-[10px] leading-4 text-[#809087]">Un asesor confirmará el precio, stock, tipo de cambio y condiciones de importación.</p>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function KitsReactivosClient({ pageConfig }: { pageConfig?: CatalogPageConfig }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(pageConfig ? `grupo:${pageConfig.scope}` : "Todos")
  const [brand, setBrand] = useState("Todas")
  const [sort, setSort] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)

  const brandFilterOptions = useMemo(
    () => {
      const scopedProducts = pageConfig
        ? molecularProducts.filter((product) => matchesCategory(product, `grupo:${pageConfig.scope}`))
        : molecularProducts
      return ["Todas", ...Array.from(new Set(scopedProducts.map((product) => product.brand))).sort()]
    },
    [pageConfig],
  )

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase("es")
    const results = molecularProducts.filter((product) => {
      const categoryMatch = matchesCategory(product, category)
      const matchesBrand = brand === "Todas" || product.brand === brand
      const haystack = `${product.name} ${product.brand} ${product.catalogNumber} ${product.description}`.toLocaleLowerCase("es")
      return categoryMatch && matchesBrand && haystack.includes(normalized)
    })

    return [...results].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "es")
      return 0
    })
  }, [brand, category, query, sort])

  useEffect(() => setCurrentPage(1), [brand, category, query, sort])

  useEffect(() => {
    if (pageConfig) return
    const params = new URLSearchParams(window.location.search)
    const requestedGroup = params.get("grupo")
    const requestedCategory = params.get("categoria")
    if (requestedGroup && categoryGroups[requestedGroup]) setCategory(`grupo:${requestedGroup}`)
    else if (requestedCategory && productCategories.includes(requestedCategory as (typeof productCategories)[number])) setCategory(requestedCategory)
  }, [pageConfig])

  const scopedCategories = pageConfig ? categoryGroups[pageConfig.scope] : productCategories
  const heroIcon = pageConfig?.scope === "molecular" ? Dna : pageConfig?.scope === "equipos" ? SlidersHorizontal : pageConfig?.scope === "bacteriofagos" ? ShieldCheck : FlaskConical
  const HeroIcon = heroIcon

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageProducts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    const requestedPage = Number(new URLSearchParams(window.location.search).get("pagina"))
    if (Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= pageCount) setCurrentPage(requestedPage)
  }, [pageCount])

  const pageItems = useMemo(() => {
    const pages = new Set([1, pageCount, currentPage - 1, currentPage, currentPage + 1])
    return [...pages].filter((page) => page >= 1 && page <= pageCount).sort((a, b) => a - b)
  }, [currentPage, pageCount])

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), pageCount))
    window.requestAnimationFrame(() => document.getElementById("catalog-results")?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  const add = (product: MolecularProduct) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }))
  }

  const setQuantity = (id: string, quantity: number) => {
    setCart((current) => {
      const next = { ...current }
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }

  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const catalogPath = pageConfig ? familyPages.find((item) => item.scope === pageConfig.scope)?.href ?? "/kits-reactivos" : "/kits-reactivos"
  const paginationHref = (page: number) => `${catalogPath}${page > 1 ? `?pagina=${page}` : ""}#catalog-results`

  return (
    <>
      <Navbar overlay />
      <main className="overflow-hidden bg-[#f4f7f4] text-[#173f2d]">
        <section data-navbar-theme="dark" className="relative isolate overflow-hidden bg-[#082f23] pb-14 pt-24 text-white sm:pb-16 sm:pt-28">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(76,195,132,.23),transparent_32%),linear-gradient(115deg,#05251b_0%,#0b4934_60%,#133b2e_100%)]" />
          <Image src={pageConfig?.image ?? "/lab-scientists.png"} alt={pageConfig?.title ?? "Kits y reactivos para laboratorio"} fill priority className="-z-10 object-cover object-center opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,30,21,.97)_0%,rgba(4,30,21,.83)_55%,rgba(4,30,21,.34)_100%)]" />
          <motion.div aria-hidden="true" className="absolute -right-24 top-20 h-80 w-80 rounded-full border border-white/10" animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}><span className="absolute left-12 top-2 h-4 w-4 rounded-full bg-[#c2f2cd] shadow-[0_0_30px_rgba(194,242,205,.8)]" /></motion.div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-4xl">
              {pageConfig && <nav aria-label="Ruta de navegación" className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-white/58"><Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/kits-reactivos">Kits y reactivos</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-white/90">{pageConfig.eyebrow}</span></nav>}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d9f7df] backdrop-blur-md"><HeroIcon className="h-4 w-4" /> {pageConfig?.eyebrow ?? "Catálogo de laboratorio"}</div>
              <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-[1.04] tracking-[-.04em] sm:text-4xl lg:text-5xl">{pageConfig?.title ?? "Kits y reactivos para tu laboratorio."}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/78 sm:text-base">{pageConfig?.description ?? "Biología molecular y bacteriología en un catálogo referencial con importación coordinada."}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#catalogo" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#efaa4a] px-5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc875]">Explorar catálogo <ArrowRight className="h-4 w-4" /></a>
                <WhatsAppContact message={pageConfig ? `Hola, quisiera asesoría sobre ${pageConfig.eyebrow.toLocaleLowerCase("es")}.` : "Hola, quisiera consultar el servicio de extracción de ADN."} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"><Dna className="h-4 w-4 text-[#bfe9c8]" /><span><strong>{pageConfig ? "Asesoría técnica" : "Extracción de ADN"}</strong><span className="ml-2 hidden font-normal text-white/60 sm:inline">{pageConfig ? "para elegir la referencia correcta" : "vegetal, bacteriano y tejidos"}</span></span></WhatsAppContact>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="catalogo" data-navbar-theme="light" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div>
              <nav aria-label="Familias del catálogo" className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {familyPages.map((family) => {
                  const active = pageConfig?.scope === family.scope
                  return <Link key={family.scope} href={family.href} aria-current={active ? "page" : undefined} className={`group rounded-[18px] border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${active ? "border-[#5f9877] bg-[#173f2d] text-white shadow-md" : "border-[#d9e5dd] bg-white text-[#264b39]"}`}><span className={`text-xs font-black ${active ? "text-white" : "text-[#176844]"}`}>{family.label}</span><span className={`mt-1 block text-[10px] leading-4 ${active ? "text-white/65" : "text-[#718178]"}`}>{family.description}</span></Link>
                })}
              </nav>
              {pageConfig?.notice && <div role="note" className="mb-6 flex items-start gap-3 rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950 shadow-sm"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><p><strong>Uso restringido.</strong> {pageConfig.notice}</p></div>}
              {pageConfig && (
                <section aria-labelledby="catalog-introduction" className="mb-8 grid gap-5 rounded-[24px] border border-[#d9e6dd] bg-white p-5 shadow-[0_16px_45px_-36px_rgba(8,48,33,.45)] sm:p-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,.75fr)]">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Suministro especializado en Perú</p>
                    <h2 id="catalog-introduction" className="mt-2 text-2xl font-bold tracking-[-.03em] text-[#173f2d] sm:text-3xl">{pageConfig.introTitle}</h2>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-[#5c7065]">{pageConfig.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    {pageConfig.useCases.map((useCase) => <article key={useCase.title} className="rounded-2xl border border-[#e0e9e3] bg-[#f5f9f6] p-4"><h3 className="text-xs font-black text-[#24583e]">{useCase.title}</h3><p className="mt-1.5 text-[11px] leading-5 text-[#6b7d72]">{useCase.text}</p></article>)}
                  </div>
                </section>
              )}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Catálogo AS Laboratorios</p><h2 className="mt-1 text-2xl font-bold tracking-[-.03em] sm:text-3xl">Encuentra la referencia adecuada</h2><p className="mt-2 text-xs leading-5 text-[#687970]">Cotización validada según presentación, stock e importación.</p></div>
                <div className="flex flex-wrap gap-2">
                  <WhatsAppContact message="Hola, quisiera asesoría para elegir un kit, reactivo o medio de cultivo." className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[#b8cfc0] bg-white px-5 text-sm font-bold text-[#176844] shadow-sm transition hover:-translate-y-0.5 hover:border-[#76a88b]"><MessageCircle className="h-4 w-4" /> WhatsApp</WhatsAppContact>
                  <button type="button" onClick={() => setCartOpen(true)} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#173f2d] px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"><ShoppingCart className="h-4 w-4" /> Pedido {itemCount > 0 && <span className="rounded-full bg-[#d7f2dd] px-2 py-0.5 text-[10px] text-[#173f2d]">{itemCount}</span>}</button>
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-[#dce7df] bg-white p-3 shadow-sm">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(260px,1fr)_220px_200px_170px]">
                  <label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7f74]" /><span className="sr-only">Buscar producto</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar producto, marca o código…" className="h-11 w-full rounded-xl border border-[#dfe8e2] bg-[#f8faf8] pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[#72a387] focus:ring-4 focus:ring-[#72a387]/10" /></label>
                  <label><span className="sr-only">Filtrar por categoría</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 w-full rounded-xl border border-[#dfe8e2] bg-[#f8faf8] px-3 text-xs font-bold text-[#385344] outline-none focus:border-[#72a387]"><option value={pageConfig ? `grupo:${pageConfig.scope}` : "Todos"}>{pageConfig ? `Toda la familia: ${familyPages.find((item) => item.scope === pageConfig.scope)?.label}` : "Todas las categorías"}</option>{!pageConfig && <optgroup label="Familias principales"><option value="grupo:molecular">Biología molecular</option><option value="grupo:microbiologia">Microbiología</option><option value="grupo:medios">Medios de cultivo</option><option value="grupo:equipos">Equipos y consumibles</option><option value="grupo:bacteriofagos">Bacteriófagos</option></optgroup>}<optgroup label="Categorías específicas">{scopedCategories.map((item) => <option key={item} value={item}>{item}</option>)}</optgroup></select></label>
                  <label className="relative"><span className="sr-only">Filtrar por marca</span><SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7f74]" /><select value={brand} onChange={(event) => setBrand(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-[#dfe8e2] bg-[#f8faf8] pl-10 pr-3 text-xs font-bold text-[#385344] outline-none focus:border-[#72a387]"><option value="Todas">Todas las marcas</option>{brandFilterOptions.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label>
                  <label><span className="sr-only">Ordenar productos</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 w-full rounded-xl border border-[#dfe8e2] bg-[#f8faf8] px-3 text-xs font-bold text-[#385344] outline-none focus:border-[#72a387]"><option value="featured">Destacados</option><option value="name">Nombre A–Z</option></select></label>
                </div>
              </div>

              <div id="catalog-results" className="mt-4 scroll-mt-28 flex items-center justify-between"><p className="text-sm font-bold text-[#385344]">{filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}</p><span className="text-[10px] font-semibold text-[#829087]">Página {currentPage} de {pageCount}</span></div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {pageProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={add} />)}
                </AnimatePresence>
              </div>
              {filtered.length > PAGE_SIZE && (
                <nav aria-label="Paginación del catálogo" className="mt-9 flex flex-wrap items-center justify-center gap-2">
                  {currentPage === 1 ? <span aria-disabled="true" className="grid h-10 w-10 place-items-center rounded-xl border border-[#ceded3] bg-white text-[#285b41] opacity-35"><ChevronLeft className="h-4 w-4" /></span> : <Link href={paginationHref(currentPage - 1)} onClick={() => goToPage(currentPage - 1)} aria-label="Página anterior" className="grid h-10 w-10 place-items-center rounded-xl border border-[#ceded3] bg-white text-[#285b41] transition hover:border-[#78a48a] hover:bg-[#eff6f1]"><ChevronLeft className="h-4 w-4" /></Link>}
                  {pageItems.map((page, index) => (
                    <div key={page} className="contents">
                      {index > 0 && pageItems[index - 1] !== page - 1 && <span className="px-1 text-[#8b9b91]">…</span>}
                      <Link href={paginationHref(page)} onClick={() => goToPage(page)} aria-current={page === currentPage ? "page" : undefined} className={`grid h-10 min-w-10 place-items-center rounded-xl px-3 text-xs font-bold transition ${page === currentPage ? "bg-[#14744d] text-white shadow-md shadow-[#14744d]/20" : "border border-[#ceded3] bg-white text-[#486052] hover:border-[#78a48a] hover:bg-[#eff6f1]"}`}>{page}</Link>
                    </div>
                  ))}
                  {currentPage === pageCount ? <span aria-disabled="true" className="grid h-10 w-10 place-items-center rounded-xl border border-[#ceded3] bg-white text-[#285b41] opacity-35"><ChevronRight className="h-4 w-4" /></span> : <Link href={paginationHref(currentPage + 1)} onClick={() => goToPage(currentPage + 1)} aria-label="Página siguiente" className="grid h-10 w-10 place-items-center rounded-xl border border-[#ceded3] bg-white text-[#285b41] transition hover:border-[#78a48a] hover:bg-[#eff6f1]"><ChevronRight className="h-4 w-4" /></Link>}
                </nav>
              )}
              {!filtered.length && <div className="mt-5 rounded-[28px] border border-dashed border-[#cbd9cf] bg-white px-6 py-16 text-center"><Search className="mx-auto h-8 w-8 text-[#84a08f]" /><h3 className="mt-4 text-lg font-bold">No encontramos esa referencia</h3><p className="mt-2 text-sm text-[#74857b]">Prueba con otro término o solicita una búsqueda especial.</p></div>}

              <div className="mt-8 rounded-[26px] border border-[#ead9ba] bg-[#fff9ee] p-5 text-sm leading-6 text-[#715b35]">
                <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9d6a1e]" /><p><strong>Precios referenciales desde.</strong> Cada ficha agrupa sus variables sin asignarles un precio individual. Un asesor confirmará presentación, impuestos, stock, cadena de frío y condiciones de importación antes de cualquier pedido.</p></div>
              </div>
          </div>
        </section>

        {pageConfig && (
          <section data-navbar-theme="light" className="border-t border-[#dfe8e2] bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Preguntas frecuentes</p><h2 className="mt-2 text-2xl font-bold tracking-[-.03em] text-[#173f2d] sm:text-3xl">Antes de solicitar una cotización</h2></div>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {pageConfig.faq.map((item) => <details key={item.question} className="group rounded-[20px] border border-[#dce7df] bg-[#f8faf8] p-5 open:bg-white open:shadow-sm"><summary className="cursor-pointer list-none pr-6 text-sm font-bold leading-6 text-[#264b39] marker:content-none">{item.question}<span aria-hidden="true" className="float-right -mr-6 text-[#168158] transition group-open:rotate-45">+</span></summary><p className="mt-3 text-xs leading-6 text-[#687a70]">{item.answer}</p></details>)}
              </div>
            </div>
          </section>
        )}

        <section data-navbar-theme="dark" className="bg-[#0b3225] px-4 py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Beaker, title: "Selección técnica", text: "Referencias filtradas según aplicación y protocolo." },
              { icon: PackageCheck, title: "Importación coordinada", text: "Validamos stock, conservación y tiempo de entrega." },
              { icon: Truck, title: "Envío referencial", text: "S/250 por pedido, sujeto a destino y condiciones." },
              { icon: TestTube2, title: "Soporte molecular", text: "Acompañamiento para elegir kits y reactivos." },
            ].map((item) => <article key={item.title} className="rounded-[26px] border border-white/10 bg-white/[.06] p-5"><item.icon className="h-5 w-5 text-[#bfe9c8]" /><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-xs leading-5 text-white/55">{item.text}</p></article>)}
          </div>
        </section>
      </main>

      <button type="button" onClick={() => setCartOpen(true)} aria-label={`Abrir pedido, ${itemCount} productos`} className="fixed bottom-5 right-4 z-[120] inline-flex min-h-14 items-center gap-3 rounded-full bg-[#173f2d] px-5 text-sm font-bold text-white shadow-[0_18px_50px_-16px_rgba(5,45,31,.75)] transition hover:-translate-y-1 sm:bottom-7 sm:right-7"><ShoppingCart className="h-5 w-5" />Pedido{itemCount > 0 && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#d9f4df] px-1 text-[10px] text-[#173f2d]">{itemCount}</span>}</button>
      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onSet={setQuantity} />
      <Footer />
    </>
  )
}
