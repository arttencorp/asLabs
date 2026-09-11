import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, PackageCheck, ShieldCheck, Snowflake } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { constructMetadata, SITE_URL } from "@/lib/metadata"
import { getMolecularProduct, getProductReferencePricePen, molecularProducts } from "@/data/kits-reactivos"

function money(value: number) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 2 }).format(value)
}

export function generateStaticParams() {
  return molecularProducts.map((product) => ({ slug: product.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getMolecularProduct(params.slug)
  if (!product) return {}
  return constructMetadata({
    title: `${product.name} en Perú | Kits y Reactivos`,
    description: `${product.description} Consulta presentación, aplicaciones y precio referencial en soles con AS Laboratorios.`,
    keywords: [
      `${product.name} Perú`,
      `${product.category} Perú`,
      `${product.brand} Perú`,
      `${product.catalogNumber} Perú`,
      "reactivos de laboratorio Trujillo",
      "kits de biología molecular Perú",
      "medios de cultivo microbiología Perú",
    ],
    path: `/kits-reactivos/${product.id}`,
    image: product.image,
  })
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getMolecularProduct(params.slug)
  if (!product) notFound()

  const price = getProductReferencePricePen(product)
  const specifications = product.specifications ?? [
    { label: "Presentación", value: product.presentation },
    { label: "Categoría", value: product.category },
    { label: "Conservación", value: product.storage },
    { label: "Referencia", value: product.catalogNumber },
  ]
  const applications = product.applications ?? [product.category, "Investigación", "Rutinas de laboratorio"]
  const related = molecularProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3)
  const detailUrl = `${SITE_URL}/kits-reactivos/${product.id}`
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${detailUrl}#product`,
        name: product.name,
        sku: product.catalogNumber,
        image: `${SITE_URL}${product.image}`,
        description: product.longDescription ?? product.description,
        category: product.category,
        brand: { "@type": "Brand", name: product.brand },
        offers: {
          "@type": "Offer",
          url: detailUrl,
          priceCurrency: "PEN",
          price,
          availability: "https://schema.org/PreOrder",
          seller: { "@type": "Organization", name: "AS Laboratorios", url: SITE_URL },
          description: "Precio referencial sujeto a disponibilidad y cotización final.",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Kits y Reactivos", item: `${SITE_URL}/kits-reactivos` },
          { "@type": "ListItem", position: 3, name: product.name, item: detailUrl },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar overlay />
      <main className="bg-[#f4f7f4] text-[#173f2d]">
        <section data-navbar-theme="dark" className="relative isolate overflow-hidden bg-[#082f23] pb-12 pt-24 text-white sm:pb-14 sm:pt-28">
          <Image src={product.image} alt="" fill priority className="-z-20 object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,31,22,.97),rgba(4,31,22,.80)_62%,rgba(4,31,22,.42))]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/kits-reactivos" className="inline-flex items-center gap-2 text-xs font-bold text-white/70 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Volver al catálogo</Link>
            <div className="mt-6 flex max-w-4xl flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d5f2dc]"><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">{product.category}</span><span>{product.brand}</span><span className="text-white/35">•</span><span>{product.catalogNumber}</span></div>
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold leading-[1.06] tracking-[-.04em] sm:text-4xl lg:text-5xl">{product.name}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">{product.description}</p>
          </div>
        </section>

        <section data-navbar-theme="light" className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] lg:px-8">
          <div className="space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_20px_60px_-32px_rgba(6,51,34,.4)]">
              <Image src={product.image} alt={`Imagen referencial de ${product.name}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-[10px] font-bold text-[#285b41] shadow-sm backdrop-blur-md">Imagen referencial</div>
            </div>
            <article className="rounded-[26px] border border-[#dce7df] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Información del producto</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-.03em]">Uso y alcance</h2>
              <p className="mt-4 text-sm leading-7 text-[#63766b]">{product.longDescription ?? `${product.description} La compatibilidad final debe validarse con el protocolo, la matriz y el equipo utilizado por el laboratorio.`}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {applications.map((application) => <div key={application} className="flex items-start gap-2 rounded-2xl bg-[#eff5f0] p-3 text-xs font-bold leading-5 text-[#355a44]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#168158]" />{application}</div>)}
              </div>
            </article>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[26px] border border-[#d9e6dc] bg-white p-6 shadow-[0_18px_55px_-34px_rgba(6,51,34,.45)] sm:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Precio referencial</p>
              <p className="mt-2 text-4xl font-black tracking-[-.04em] text-[#0b4a33]">{money(price)}</p>
              <p className="mt-2 text-xs leading-5 text-[#74857b]">Sujeto a stock, presentación, tipo de cambio y cotización final.</p>
              <WhatsAppContact message={`Hola, quisiera cotizar ${product.name} (${product.catalogNumber}), presentación ${product.presentation}.`} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#14744d] px-5 text-sm font-bold text-white shadow-lg shadow-[#14744d]/20 transition hover:-translate-y-0.5 hover:bg-[#0f5e3e]">Solicitar cotización <ArrowRight className="h-4 w-4" /></WhatsAppContact>
              <Link href={`/kits-reactivos#${product.id}`} className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-[#d5e2d9] text-xs font-bold text-[#3c5e4b] transition hover:bg-[#eff6f1]">Ver dentro del catálogo</Link>
            </div>

            <dl className="overflow-hidden rounded-[26px] border border-[#dce7df] bg-white">
              {specifications.map((item, index) => <div key={item.label} className={`grid grid-cols-[125px_1fr] gap-4 px-5 py-4 text-xs ${index ? "border-t border-[#e5ece7]" : ""}`}><dt className="font-semibold text-[#809087]">{item.label}</dt><dd className="font-bold text-[#2e4b3b]">{item.value}</dd></div>)}
            </dl>

            <div className="grid grid-cols-3 gap-2">
              {[{ icon: ShieldCheck, label: "Trazabilidad" }, { icon: Snowflake, label: "Conservación" }, { icon: PackageCheck, label: "Importación" }].map((item) => <div key={item.label} className="rounded-2xl border border-[#dce7df] bg-white px-2 py-3 text-center text-[9px] font-bold text-[#587064]"><item.icon className="mx-auto mb-1.5 h-4 w-4 text-[#168158]" />{item.label}</div>)}
            </div>
          </aside>
        </section>

        {related.length > 0 && <section data-navbar-theme="light" className="border-t border-[#dfe8e2] bg-white px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">También puede interesarte</p><h2 className="mt-2 text-2xl font-bold tracking-[-.03em]">Referencias relacionadas</h2></div><Link href="/kits-reactivos" className="hidden items-center gap-2 text-xs font-bold text-[#168158] sm:inline-flex">Ver catálogo <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/kits-reactivos/${item.id}`} className="group grid grid-cols-[88px_1fr] gap-4 rounded-[22px] border border-[#dce7df] p-3 transition hover:-translate-y-1 hover:shadow-lg"><div className="relative overflow-hidden rounded-2xl bg-[#eef4ef]"><Image src={item.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="min-w-0 py-1"><p className="text-[9px] font-bold uppercase tracking-[.1em] text-[#548068]">{item.brand}</p><h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5">{item.name}</h3><p className="mt-2 text-xs font-black text-[#0d5137]">{money(getProductReferencePricePen(item))}</p></div></Link>)}</div></div></section>}
      </main>
      <Footer />
    </>
  )
}
