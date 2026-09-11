"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Beaker,
  CheckCircle2,
  Dna,
  ExternalLink,
  FileCheck2,
  FlaskConical,
  Microscope,
  Minus,
  PackageCheck,
  Plus,
  Search,
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
  molecularProducts,
  REFERENCE_SHIPPING_PEN,
  type MolecularProduct,
} from "@/data/kits-reactivos"

const categories = ["Todos", "PCR y qPCR", "Extracción de ADN", "Electroforesis", "Reactivos esenciales", "Cultivo celular", "Ensayos celulares"] as const

const brands = [
  { name: "Fisher Scientific", detail: "Kits y reactivos", tone: "text-[#e85b2a]" },
  { name: "HiMedia", detail: "Medios y microbiología", tone: "text-[#2859a5]" },
  { name: "CavBio", detail: "Biología molecular", tone: "text-[#157f67]", image: "/partners/cavbio.png" },
  { name: "Arttencorp", detail: "Equipamiento científico", tone: "text-[#643d8c]", image: "/trustUs/arttencorp.jpg" },
  { name: "ATCC", detail: "Importación gestionada", tone: "text-[#d33345]" },
  { name: "BIOSTELLAR", detail: "Soluciones de laboratorio", tone: "text-[#087d89]" },
]

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
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#dfe9e2] bg-white shadow-[0_16px_46px_rgba(8,48,33,.07)] transition-shadow hover:shadow-[0_24px_60px_rgba(8,48,33,.13)]"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#edf6ef] via-white to-[#e8f1ea]">
        <Image
          src={product.image}
          alt={`${product.name} para laboratorio de biología molecular`}
          fill
          className="object-cover opacity-90 transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a3426]/35 via-transparent to-white/10" />
        <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#285d42] shadow-sm backdrop-blur-md">
          {product.category}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-[#123e2d]/90 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
          {product.catalogNumber}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#4d7d60]">{product.brand}</p>
        <h2 className="mt-2 text-xl font-bold leading-tight tracking-[-.025em] text-[#123e2d]">{product.name}</h2>
        <p className="mt-3 text-sm leading-6 text-[#66786e]">{product.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-2xl bg-[#f4f7f4] p-3">
            <dt className="text-[#809087]">Presentación</dt>
            <dd className="mt-1 font-bold leading-4 text-[#334a3e]">{product.presentation}</dd>
          </div>
          <div className="rounded-2xl bg-[#f4f7f4] p-3">
            <dt className="text-[#809087]">Conservación</dt>
            <dd className="mt-1 font-bold leading-4 text-[#334a3e]">{product.storage}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold text-[#718279]">Precio referencial</p>
              <p className="mt-1 text-2xl font-black tracking-[-.03em] text-[#0b4a33]">{money(price)}</p>
            </div>
            <span className="rounded-full bg-[#fff4e4] px-3 py-1.5 text-[10px] font-bold text-[#955d18]">Stock a confirmar</span>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-[#829087]">No incluye el envío fijo referencial de {money(REFERENCE_SHIPPING_PEN)} por pedido.</p>
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#14744d] px-4 text-sm font-bold text-white shadow-lg shadow-[#14744d]/20 transition hover:-translate-y-0.5 hover:bg-[#0f5e3e]"
            >
              <ShoppingCart className="h-4 w-4" /> Añadir
            </button>
            <a
              href={product.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ficha original de ${product.name} en Fisher Scientific`}
              className="grid min-h-12 w-12 place-items-center rounded-2xl border border-[#d8e4dc] text-[#486658] transition hover:border-[#8eb19d] hover:bg-[#eff6f1]"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function BrandStrip() {
  return (
    <section data-navbar-theme="light" aria-labelledby="brands-title" className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-white bg-white p-5 shadow-[0_22px_70px_-34px_rgba(7,49,33,.45)] sm:p-7">
        <div className="flex flex-col gap-2 border-b border-[#e5ebe7] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#4e7c61]">Red técnica y comercial</p>
            <h2 id="brands-title" className="mt-1 text-xl font-bold tracking-[-.02em] text-[#173f2d]">Trabajamos con estas marcas</h2>
          </div>
          <p className="text-xs text-[#718178]">Disponibilidad y representación sujetas a cada referencia.</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <article key={brand.name} className="flex min-h-24 flex-col items-center justify-center rounded-2xl border border-[#e3ebe5] bg-[#fafcf9] px-3 py-4 text-center transition hover:-translate-y-0.5 hover:border-[#b8d0c0] hover:bg-white hover:shadow-md">
              {brand.image ? (
                <div className="relative h-8 w-full">
                  <Image src={brand.image} alt={brand.name} fill className="object-contain" />
                </div>
              ) : (
                <p className={`text-base font-black tracking-[-.025em] ${brand.tone}`}>{brand.name}</p>
              )}
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[.08em] text-[#829087]">{brand.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DnaExtractionService() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-[30px] bg-[#092f23] text-white shadow-[0_24px_70px_-30px_rgba(5,41,29,.75)] lg:sticky lg:top-28"
    >
      <div className="relative overflow-hidden p-6 sm:p-7">
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[24px] border-white/[.05]" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#b9efc6] text-[#0b432f]"><Dna className="h-6 w-6" /></span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#d8f6df]">Servicio especializado</span>
          </div>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-[.2em] text-[#a8ddb5]">Procesamiento en laboratorio</p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-.035em]">Extracción de ADN</h2>
          <p className="mt-4 text-sm leading-6 text-white/70">Procesamos muestras vegetales, bacterianas y de tejido para obtener ADN apto para PCR, qPCR, secuenciamiento y análisis posteriores.</p>

          <ul className="mt-6 space-y-3">
            {["Evaluación de la matriz y protocolo", "Extracción con kits QIAGEN seleccionados", "Control de concentración y pureza", "Entrega coordinada para análisis posteriores"].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-white/80"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#b9efc6]" />{item}</li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[.07] p-4">
            <p className="text-lg font-black tracking-wide">QIAGEN</p>
            <p className="mt-1 text-[11px] leading-5 text-white/55">Usamos sus kits dentro del servicio. AS Laboratorios no comercializa kits QIAGEN.</p>
          </div>

          <WhatsAppContact
            message="Hola, quisiera cotizar el servicio de extracción de ADN."
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#efaa4a] px-5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc875]"
          >
            Consultar extracción <ArrowRight className="h-4 w-4" />
          </WhatsAppContact>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-white/10 bg-black/10 text-center text-[10px] font-semibold text-white/65">
        <span className="border-r border-white/10 px-3 py-4"><Microscope className="mx-auto mb-1.5 h-4 w-4 text-[#b9efc6]" />Múltiples matrices</span>
        <span className="px-3 py-4"><FileCheck2 className="mx-auto mb-1.5 h-4 w-4 text-[#b9efc6]" />Trazabilidad</span>
      </div>
    </motion.aside>
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
  const subtotal = entries.reduce((total, product) => total + getProductReferencePricePen(product) * cart[product.id], 0)
  const total = subtotal + (entries.length ? REFERENCE_SHIPPING_PEN : 0)
  const message = [
    "Hola, deseo solicitar una cotización referencial de kits y reactivos:",
    "",
    ...entries.map((product) => `• ${product.name} (${product.catalogNumber}) — ${cart[product.id]} unidad(es)`),
    "",
    `Subtotal referencial: ${money(subtotal)}`,
    `Envío referencial: ${money(REFERENCE_SHIPPING_PEN)}`,
    `Total referencial: ${money(total)}`,
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
                      <p className="font-black text-[#0d5137]">{money(getProductReferencePricePen(product) * quantity)}</p>
                    </div>
                  </article>
                )
              }) : (
                <div className="flex min-h-[55vh] flex-col items-center justify-center text-center"><span className="grid h-20 w-20 place-items-center rounded-full bg-[#e8f3eb] text-[#28704d]"><ShoppingCart className="h-8 w-8" /></span><h3 className="mt-5 text-xl font-bold text-[#173f2d]">Tu pedido está vacío</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[#718178]">Añade las referencias que deseas cotizar.</p></div>
              )}
            </div>
            {entries.length > 0 && (
              <footer className="max-h-[48vh] overflow-y-auto border-t border-[#dfe8e2] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-7">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#66786e]"><dt>Subtotal · {units} {units === 1 ? "unidad" : "unidades"}</dt><dd className="font-bold text-[#2d4639]">{money(subtotal)}</dd></div>
                  <div className="flex justify-between text-[#66786e]"><dt className="flex items-center gap-2"><Truck className="h-4 w-4" />Envío referencial</dt><dd className="font-bold text-[#2d4639]">{money(REFERENCE_SHIPPING_PEN)}</dd></div>
                  <div className="flex items-end justify-between border-t border-dashed border-[#dfe8e2] pt-4"><dt><span className="block font-bold text-[#173f2d]">Total estimado</span><span className="text-[10px] text-[#829087]">Sujeto a cotización final</span></dt><dd className="text-2xl font-black text-[#0d5137]">{money(total)}</dd></div>
                </dl>
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

export default function KitsReactivosClient() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos")
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase("es")
    return molecularProducts.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category
      const haystack = `${product.name} ${product.brand} ${product.catalogNumber} ${product.description}`.toLocaleLowerCase("es")
      return matchesCategory && haystack.includes(normalized)
    })
  }, [category, query])

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

  return (
    <>
      <Navbar overlay />
      <main className="overflow-hidden bg-[#f4f7f4] text-[#173f2d]">
        <section data-navbar-theme="dark" className="relative isolate overflow-hidden bg-[#082f23] pb-20 pt-28 text-white sm:pb-24 sm:pt-32">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,rgba(76,195,132,.23),transparent_32%),linear-gradient(115deg,#05251b_0%,#0b4934_60%,#133b2e_100%)]" />
          <Image src="/laboratory-research.png" alt="Kits y reactivos para biología molecular en laboratorio" fill priority className="-z-10 object-cover object-center opacity-25 mix-blend-luminosity" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,30,21,.97)_0%,rgba(4,30,21,.83)_55%,rgba(4,30,21,.34)_100%)]" />
          <motion.div aria-hidden="true" className="absolute -right-24 top-20 h-80 w-80 rounded-full border border-white/10" animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}><span className="absolute left-12 top-2 h-4 w-4 rounded-full bg-[#c2f2cd] shadow-[0_0_30px_rgba(194,242,205,.8)]" /></motion.div>

          <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d9f7df] backdrop-blur-md"><Sparkles className="h-4 w-4" /> Catálogo molecular</div>
              <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.03] tracking-[-.045em] sm:text-5xl lg:text-6xl">Kits y reactivos para resultados reproducibles.</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">Referencias internacionales para PCR, qPCR, extracción de ADN y electroforesis, cotizadas en soles y con importación coordinada.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#catalogo" className="inline-flex items-center gap-2 rounded-full bg-[#efaa4a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc875]">Explorar catálogo <ArrowRight className="h-4 w-4" /></a><a href="#extraccion-adn" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">Extracción de ADN <Dna className="h-4 w-4" /></a></div>
            </motion.div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/15 bg-[#031f17]/65 p-5 backdrop-blur-xl"><p className="text-3xl font-black">{molecularProducts.length}</p><p className="mt-1 text-xs text-white/65">referencias seleccionadas</p></div>
              <div className="rounded-3xl border border-white/15 bg-[#031f17]/65 p-5 backdrop-blur-xl"><p className="text-3xl font-black">S/250</p><p className="mt-1 text-xs text-white/65">envío referencial por pedido</p></div>
            </div>
          </div>
        </section>

        <BrandStrip />

        <section id="catalogo" data-navbar-theme="light" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
            <div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#4e7c61]">Selección Fisher Scientific</p><h2 className="mt-2 text-3xl font-bold tracking-[-.035em] sm:text-4xl">Encuentra la referencia adecuada</h2><p className="mt-3 text-sm leading-6 text-[#687970]">Precios de lista consultados el 10 de septiembre de 2026 y convertidos a soles. Todo valor es referencial.</p></div>
                <button type="button" onClick={() => setCartOpen(true)} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#173f2d] px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5"><ShoppingCart className="h-4 w-4" /> Pedido {itemCount > 0 && <span className="rounded-full bg-[#d7f2dd] px-2 py-0.5 text-[10px] text-[#173f2d]">{itemCount}</span>}</button>
              </div>

              <div className="mt-8 rounded-[26px] border border-[#dce7df] bg-white p-4 shadow-sm">
                <label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6c7f74]" /><span className="sr-only">Buscar producto</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por producto, marca o código…" className="h-12 w-full rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[#72a387] focus:ring-4 focus:ring-[#72a387]/10" /></label>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${category === item ? "bg-[#14744d] text-white" : "bg-[#edf3ee] text-[#50685b] hover:bg-[#e0ebe3]"}`}>{item}</button>)}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between"><p className="text-sm font-bold text-[#385344]">{filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}</p><span className="text-[10px] text-[#829087]">Disponibilidad a confirmar</span></div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={add} />)}
                </AnimatePresence>
              </div>
              {!filtered.length && <div className="mt-5 rounded-[28px] border border-dashed border-[#cbd9cf] bg-white px-6 py-16 text-center"><Search className="mx-auto h-8 w-8 text-[#84a08f]" /><h3 className="mt-4 text-lg font-bold">No encontramos esa referencia</h3><p className="mt-2 text-sm text-[#74857b]">Prueba con otro término o solicita una búsqueda especial.</p></div>}

              <div className="mt-8 rounded-[26px] border border-[#ead9ba] bg-[#fff9ee] p-5 text-sm leading-6 text-[#715b35]">
                <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#9d6a1e]" /><p><strong>Condiciones referenciales.</strong> Los precios pueden variar por tipo de cambio, disponibilidad del fabricante, cadena de frío, recargos o cambios de presentación. La cotización final será confirmada por un asesor antes de cualquier pedido.</p></div>
              </div>
            </div>

            <div id="extraccion-adn" className="scroll-mt-28"><DnaExtractionService /></div>
          </div>
        </section>

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
