import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Dna, FlaskConical, PackageCheck, ShieldCheck, Snowflake } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductQuoteConfigurator from "@/components/product-quote-configurator"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { constructMetadata, SITE_URL } from "@/lib/metadata"
import { getMolecularProduct, getProductReferencePricePen, molecularProducts } from "@/data/kits-reactivos"

function money(value: number) {
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 2 }).format(value)
}

export function generateStaticParams() {
  return molecularProducts.map((product) => ({ slug: product.id }))
}

function getGenericSeoTopic(product: NonNullable<ReturnType<typeof getMolecularProduct>>) {
  const text = `${product.name} ${product.description} ${product.longDescription ?? ""}`.toLocaleLowerCase("es")

  if (product.category === "Medios de cultivo") return `${product.name} en Perú`
  if (product.category === "Bacteriófagos") {
    if (/ms2/.test(text)) return "Bacteriófago MS2 para control molecular en Perú"
    if (/snipha 360/.test(text)) return "SniPha 360 bacteriófagos para investigación en Perú"
    if (/snipha 580/.test(text)) return "SniPha 580 bacteriófagos para investigación en Perú"
    if (/pyo/.test(text)) return "Bacteriófago PYO para investigación en Perú"
    return "Bacteriófagos para investigación en Perú"
  }

  const equipmentTopics: Partial<Record<typeof product.category, string>> = {
    "Agitadores magnéticos": "Agitadores magnéticos de laboratorio en Perú",
    Centrífugas: "Centrífugas de laboratorio en Perú",
    "Pipeteo y dispensación": "Micropipetas y dispensadores en Perú",
    "Mezcladores vortex": "Mezcladores vortex en Perú",
    "Agitadores orbitales": "Agitadores orbitales de laboratorio en Perú",
    "Agitadores de techo": "Agitadores de techo para laboratorio en Perú",
    "Incubadoras y calentadores": "Incubadoras y calentadores de laboratorio en Perú",
    "Medición de pH": "Medidores de pH para laboratorio en Perú",
  }
  if (equipmentTopics[product.category]) return equipmentTopics[product.category]!

  if (product.category === "Extracción y purificación") {
    if (/plant|vegetal/.test(text)) return "Extracción de ADN vegetal en Perú"
    if (/bacter|microbi/.test(text)) return "Extracción de ADN bacteriano en Perú"
    if (/plasmid/.test(text)) return "Purificación de ADN plasmídico en Perú"
    if (/viral|pathogen/.test(text)) return "Extracción de ADN y ácidos nucleicos virales en Perú"
    if (/gel|pcr|cleanup|clean-up/.test(text)) return "Purificación de ADN para PCR en Perú"
    return "Kits de extracción y purificación de ADN en Perú"
  }

  if (product.category === "Identificación bacteriana") {
    if (/salmonella/.test(text)) return "Pruebas de identificación de Salmonella en Perú"
    if (/e\. coli|escherichia|shiga/.test(text)) return "Pruebas de identificación de E. coli en Perú"
    if (/staph|coagulase/.test(text)) return "Pruebas de identificación de Staphylococcus en Perú"
    if (/strep|pneumo|enterococcus/.test(text)) return "Pruebas de identificación de Streptococcus en Perú"
    if (/neisseria/.test(text)) return "Pruebas de identificación de Neisseria en Perú"
    if (/legionella/.test(text)) return "Pruebas de identificación de Legionella en Perú"
    if (/listeria/.test(text)) return "Pruebas de identificación de Listeria en Perú"
    return "Kits y reactivos para identificación bacteriana en Perú"
  }

  const topics: Partial<Record<typeof product.category, string>> = {
    "PCR y qPCR": "Kits y reactivos para PCR y qPCR en Perú",
    "ARN y transcriptómica": "Reactivos para extracción y análisis de ARN en Perú",
    "Cuantificación y detección": "Kits para cuantificación de ADN y ARN en Perú",
    "Clonación y expresión": "Reactivos para clonación molecular en Perú",
    "Reactivos moleculares": "Reactivos de biología molecular en Perú",
    Electroforesis: "Reactivos y equipos de electroforesis en Perú",
    "Equipos moleculares": "Equipos de biología molecular en Perú",
    "Consumibles PCR": "Consumibles para PCR y qPCR en Perú",
    "Materiales moleculares": "Materiales para biología molecular en Perú",
    "Bacteriología y medios": "Medios de cultivo y reactivos bacteriológicos en Perú",
  }
  return topics[product.category] ?? "Kits y reactivos de laboratorio en Perú"
}

function getCategoryLanding(product: NonNullable<ReturnType<typeof getMolecularProduct>>) {
  if (product.category === "Medios de cultivo") return { label: "Medios de cultivo", href: "/kits-reactivos/medios-de-cultivo" }
  if (product.category === "Bacteriófagos") return { label: "Bacteriófagos", href: "/kits-reactivos/bacteriofagos" }
  if (product.category === "Bacteriología y medios" || product.category === "Identificación bacteriana") return { label: "Microbiología", href: "/kits-reactivos/microbiologia" }
  if (product.category === "Equipos moleculares" || product.category === "Consumibles PCR" || product.category === "Materiales moleculares") return { label: "Equipos y consumibles", href: "/kits-reactivos/equipos-consumibles" }
  if (["Agitadores magnéticos", "Centrífugas", "Pipeteo y dispensación", "Mezcladores vortex", "Agitadores orbitales", "Agitadores de techo", "Incubadoras y calentadores", "Medición de pH"].includes(product.category)) return { label: "Equipos de laboratorio", href: "/kits-reactivos/equipos-de-laboratorio" }
  return { label: "Biología molecular", href: "/kits-reactivos/biologia-molecular" }
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getMolecularProduct(params.slug)
  if (!product) return {}
  const seoTopic = getGenericSeoTopic(product)
  return constructMetadata({
    title: `${seoTopic} | ${product.brand} ${product.catalogNumber}`,
    description: `${seoTopic}. Consulta aplicaciones, características, fotografía y precio referencial de ${product.brand} ${product.catalogNumber}.${product.researchUseOnly ? " Uso únicamente para investigación." : ""}`,
    keywords: [
      seoTopic,
      `${product.category} en Perú`,
      `${product.category} Trujillo Perú`,
      "insumos para biología molecular Perú",
      "reactivos de laboratorio Trujillo",
      "kits de biología molecular Perú",
      "medios de cultivo microbiología Perú",
      "bacteriófagos para investigación Perú",
      "bacteriófagos microbiología Perú",
      "equipos de laboratorio Perú",
      "importación equipos de laboratorio Perú",
      `${product.brand} ${product.catalogNumber} Perú`,
      ...(product.applications?.map((application) => `${application} Perú`) ?? []),
    ],
    path: `/kits-reactivos/${product.id}`,
    image: product.image,
  })
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getMolecularProduct(params.slug)
  if (!product) notFound()

  const price = getProductReferencePricePen(product)
  const categoryLanding = getCategoryLanding(product)
  const hasMultiplePresentations = product.presentation.includes("presentaciones")
  const specifications = product.specifications ?? [
    { label: "Presentación", value: product.presentation },
    { label: "Categoría", value: product.category },
    { label: "Conservación", value: product.storage },
    { label: "Referencia", value: product.catalogNumber },
  ]
  const applications = product.applications ?? [product.category, "Investigación", "Rutinas de laboratorio"]
  const related = molecularProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3)
  const detailUrl = `${SITE_URL}/kits-reactivos/${product.id}`
  const productImage = product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${detailUrl}#product`,
        name: product.name,
        sku: product.catalogNumber,
        mpn: product.catalogNumber,
        image: productImage,
        description: product.longDescription ?? product.description,
        category: product.category,
        brand: { "@type": "Brand", name: product.brand },
        mainEntityOfPage: { "@type": "WebPage", "@id": detailUrl },
        audience: { "@type": "Audience", audienceType: "Laboratorios, universidades e investigadores" },
        additionalProperty: specifications.map((item) => ({ "@type": "PropertyValue", name: item.label, value: item.value })),
        ...(price !== null
          ? {
              offers: {
                "@type": "Offer",
                url: detailUrl,
                priceCurrency: "PEN",
                price,
                availability: "https://schema.org/PreOrder",
                seller: { "@type": "Organization", name: "AS Laboratorios", url: SITE_URL },
                description: product.priceBasis
                  ? `Precio referencial para la presentación ${product.priceBasis}; otras presentaciones se confirman por cotización.`
                  : `Precio referencial desde para una configuración base verificada; la variante y el importe final se confirman por cotización.${product.taxNote ? ` ${product.taxNote}.` : ""}${product.researchUseOnly ? " Uso únicamente para investigación." : ""}`,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Kits y Reactivos", item: `${SITE_URL}/kits-reactivos` },
          { "@type": "ListItem", position: 3, name: categoryLanding.label, item: `${SITE_URL}${categoryLanding.href}` },
          { "@type": "ListItem", position: 4, name: product.name, item: detailUrl },
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
          <Image src="/lab-header-bg.jpg" alt="" fill priority className="-z-20 object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,31,22,.97),rgba(4,31,22,.80)_62%,rgba(4,31,22,.42))]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href={categoryLanding.href} className="inline-flex items-center gap-2 text-xs font-bold text-white/70 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Volver a {categoryLanding.label.toLocaleLowerCase("es")}</Link>
            <div className="mt-6 flex max-w-4xl flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#d5f2dc]"><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">{product.category}</span><span>{product.brand}</span><span className="text-white/35">•</span><span>{product.catalogNumber}</span></div>
            {product.researchUseOnly && <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-100/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.12em] text-amber-100"><ShieldCheck className="h-4 w-4" /> Uso únicamente para investigación</div>}
            <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold leading-[1.06] tracking-[-.04em] sm:text-4xl lg:text-5xl">{product.name}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">{product.description}</p>
          </div>
        </section>

        <section data-navbar-theme="light" className="mx-auto grid max-w-7xl gap-7 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] lg:px-8">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-[#dce7df] bg-white shadow-[0_20px_60px_-32px_rgba(6,51,34,.4)]">
              <div className="relative aspect-[16/10]">
                <Image src={product.image} alt={product.name} fill className="object-contain p-7 sm:p-10" sizes="(max-width: 1024px) 100vw, 58vw" />
              </div>
              <div className="grid grid-cols-3 border-t border-[#e6ede8] bg-[#fbfcfb]">
                {[{ icon: ShieldCheck, label: "Trazabilidad" }, { icon: Snowflake, label: "Conservación" }, { icon: PackageCheck, label: "Importación" }].map((item) => <div key={item.label} className="flex min-h-16 items-center justify-center gap-2 border-r border-[#e6ede8] px-2 text-[10px] font-bold text-[#587064] last:border-r-0 sm:text-xs"><item.icon className="h-4 w-4 shrink-0 text-[#168158]" />{item.label}</div>)}
              </div>
            </div>
            <article className="rounded-[26px] border border-[#dce7df] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Resumen técnico</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-.03em]">Aplicación y características</h2>
              <p className="mt-4 text-sm leading-7 text-[#536b5e]">{product.description}</p>
              {product.researchUseOnly && <div role="note" className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-950"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><p><strong>Uso restringido.</strong> Este producto se ofrece únicamente para investigación. No está destinado a diagnóstico, tratamiento, consumo humano, uso veterinario ni procedimientos clínicos.</p></div>}
              {product.longDescription && product.longDescription !== product.description && <div className="mt-6 rounded-2xl border border-[#deebe2] bg-[#f3f8f4] p-5"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#5f806d]">Información técnica</p><p className="mt-2 text-xs leading-6 text-[#65786d]">{product.longDescription}</p></div>}
              <div className="mt-7 flex flex-wrap gap-2">
                {applications.map((application) => <span key={application} className="inline-flex items-center gap-2 rounded-full bg-[#eaf4ec] px-3 py-2 text-[11px] font-bold text-[#355a44]"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#168158]" />{application}</span>)}
              </div>
            </article>

            <article className="rounded-[26px] border border-[#dce7df] bg-white p-6 sm:p-8">
              <div className="flex items-start gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e9f4eb] text-[#14744d]"><ClipboardCheck className="h-5 w-5" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Compra asistida</p><h2 className="mt-1 text-xl font-bold tracking-[-.025em]">Cómo solicitar esta referencia</h2></div></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[{ n: "01", title: "Indica tu aplicación", text: "Cuéntanos la matriz, técnica y número de muestras." }, { n: "02", title: "Elige presentación", text: hasMultiplePresentations ? `Esta familia reúne ${product.presentation.toLowerCase()}.` : "Validamos la presentación y el código requerido." }, { n: "03", title: "Recibe cotización", text: "Confirmamos precio, conservación y plazo de importación." }].map((step) => <div key={step.n} className="rounded-2xl border border-[#e1eae4] p-4"><span className="text-[10px] font-black tracking-[.12em] text-[#168158]">{step.n}</span><h3 className="mt-3 text-sm font-bold">{step.title}</h3><p className="mt-2 text-[11px] leading-5 text-[#718178]">{step.text}</p></div>)}
              </div>
            </article>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[26px] border border-[#d9e6dc] bg-white p-6 shadow-[0_18px_55px_-34px_rgba(6,51,34,.45)] sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#e5ece7] pb-4"><span className="rounded-full bg-[#edf5ef] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#397052]">{product.brand}</span><span className="text-[10px] font-bold text-[#708178]">{product.catalogNumber}</span></div>
              {price !== null ? (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Precio referencial{product.priceBasis ? ` · ${product.priceBasis}` : ""}</p>
                  <p className="mt-2 text-4xl font-black tracking-[-.04em] text-[#0b4a33]">{product.priceBasis ? money(price) : `Desde ${money(price)}`} {product.taxNote && <span className="text-sm font-black text-[#567064]">{product.taxNote}</span>}</p>
                  <p className="mt-2 text-xs leading-5 text-[#74857b]">{product.priceBasis ? `El precio corresponde a ${product.priceBasis}. Las presentaciones de 1 kg y 2 kg se cotizan por separado según disponibilidad e importación.` : "Parte de una configuración base verificada. Las variables seleccionadas no tienen precio individual publicado y se confirman en la cotización final."}</p>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">Precio protegido</p>
                  <p className="mt-2 text-2xl font-black tracking-[-.03em] text-[#0b4a33]">Bajo cotización</p>
                  <p className="mt-2 text-xs leading-5 text-[#74857b]">Validamos directamente la presentación, el precio vigente, el stock y las condiciones de importación.</p>
                </>
              )}
              <ProductQuoteConfigurator productName={product.name} catalogNumber={product.catalogNumber} presentation={product.presentation} presentationOptions={product.presentationOptions} priceBasis={product.priceBasis} pricePen={price} taxNote={product.taxNote} researchUseOnly={product.researchUseOnly} shippingPen={product.shippingPen} />
              <Link href={`${categoryLanding.href}#${product.id}`} className="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-[#d5e2d9] text-xs font-bold text-[#3c5e4b] transition hover:bg-[#eff6f1]">Ver dentro del catálogo</Link>
            </div>

            <dl className="overflow-hidden rounded-[26px] border border-[#dce7df] bg-white">
              <div className="flex items-center gap-3 border-b border-[#e5ece7] bg-[#f8faf8] px-5 py-4"><FlaskConical className="h-4 w-4 text-[#168158]" /><p className="text-xs font-bold text-[#2e4b3b]">Datos de la referencia</p></div>
              {specifications.map((item, index) => <div key={item.label} className={`grid grid-cols-[125px_1fr] gap-4 px-5 py-4 text-xs ${index ? "border-t border-[#e5ece7]" : ""}`}><dt className="font-semibold text-[#809087]">{item.label}</dt><dd className="font-bold text-[#2e4b3b]">{item.value}</dd></div>)}
            </dl>

            <div className="rounded-[24px] border border-[#bed9c7] bg-[linear-gradient(135deg,#eaf5ec,#f8fbf8)] p-5"><Dna className="h-5 w-5 text-[#14744d]" /><h3 className="mt-4 text-base font-bold">¿Necesitas validar compatibilidad?</h3><p className="mt-2 text-xs leading-5 text-[#63766b]">Te ayudamos a revisar la matriz, el protocolo y la presentación antes de cotizar.</p><WhatsAppContact message={`Hola, necesito asesoría técnica para ${product.name} (${product.catalogNumber}).`} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#14744d]">Consultar con un asesor <ArrowRight className="h-3.5 w-3.5" /></WhatsAppContact></div>
          </aside>
        </section>

        {related.length > 0 && <section data-navbar-theme="light" className="border-t border-[#dfe8e2] bg-white px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4e7c61]">También puede interesarte</p><h2 className="mt-2 text-2xl font-bold tracking-[-.03em]">Referencias relacionadas</h2></div><Link href={categoryLanding.href} className="hidden items-center gap-2 text-xs font-bold text-[#168158] sm:inline-flex">Ver catálogo <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map((item) => { const itemPrice = getProductReferencePricePen(item); return <Link key={item.id} href={`/kits-reactivos/${item.id}`} className="group grid grid-cols-[88px_1fr] gap-4 rounded-[22px] border border-[#dce7df] p-3 transition hover:-translate-y-1 hover:shadow-lg"><div className="relative overflow-hidden rounded-2xl bg-white"><Image src={item.image} alt={`Fotografía de ${item.name}`} fill className="object-contain p-2 transition duration-500 group-hover:scale-105" /></div><div className="min-w-0 py-1"><p className="text-[9px] font-bold uppercase tracking-[.1em] text-[#548068]">{item.brand}</p><h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5">{item.name}</h3><p className="mt-2 text-xs font-black text-[#0d5137]">{itemPrice !== null ? `Desde ${money(itemPrice)}${item.taxNote ? ` ${item.taxNote}` : ""}` : "Bajo cotización"}</p></div></Link> })}</div></div></section>}
      </main>
      <Footer />
    </>
  )
}
