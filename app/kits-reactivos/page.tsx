import type { Metadata } from "next"
import { constructMetadata, SITE_URL } from "@/lib/metadata"
import { getProductReferencePricePen, molecularProducts, REFERENCE_SHIPPING_PEN } from "@/data/kits-reactivos"
import KitsReactivosClient from "./kits-reactivos-client"

export const metadata: Metadata = constructMetadata({
  title: "Kits, Reactivos y Medios de Cultivo en Perú",
  description:
    "Cotiza kits, reactivos y medios de cultivo para PCR, qPCR, extracción de ADN, electroforesis y bacteriología en Perú. Más de 100 referencias en soles.",
  keywords: [
    "kits de biología molecular Perú",
    "reactivos de laboratorio Perú",
    "reactivos PCR Perú",
    "PCR Master Mix Perú",
    "SYBR Green qPCR Perú",
    "kit extracción ADN Perú",
    "agarosa grado molecular Perú",
    "DNA ladder Perú",
    "agua libre de nucleasas Perú",
    "Fisher Scientific Perú",
    "Thermo Scientific Perú",
    "reactivos moleculares Trujillo",
    "extracción de ADN Trujillo",
    "servicio extracción ADN Perú",
    "suero fetal bovino Perú",
    "HyClone suero fetal bovino",
    "ensayo de citotoxicidad LDH Perú",
    "CyQUANT LDH Cytotoxicity Assay",
    "importación de reactivos de laboratorio",
    "medios de cultivo bacteriología Perú",
    "MacConkey agar Perú",
    "Mueller Hinton agar Perú",
    "reactivos microbiología Perú",
    "tinción de Gram Perú",
    "kits identificación bacteriana Perú",
  ],
  path: "/kits-reactivos",
  image: "/lab-scientists.png",
})

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/kits-reactivos#page`,
      url: `${SITE_URL}/kits-reactivos`,
      name: "Kits, reactivos y medios de cultivo en Perú",
      description:
        "Catálogo referencial con más de 100 kits, reactivos y medios para biología molecular y bacteriología con importación coordinada en Perú.",
      inLanguage: "es-PE",
      mainEntity: { "@id": `${SITE_URL}/kits-reactivos#catalog` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/kits-reactivos#catalog`,
      name: "Catálogo de kits y reactivos moleculares",
      numberOfItems: molecularProducts.length,
      itemListElement: molecularProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          sku: product.catalogNumber,
          category: product.category,
          brand: { "@type": "Brand", name: product.brand },
          description: product.description,
          image: product.image,
          url: `${SITE_URL}/kits-reactivos/${product.id}`,
          offers: {
            "@type": "Offer",
            priceCurrency: "PEN",
            price: getProductReferencePricePen(product),
            availability: "https://schema.org/PreOrder",
            seller: { "@type": "Organization", name: "AS Laboratorios" },
            description: "Precio referencial sujeto a stock, tipo de cambio y cotización final.",
          },
        },
      })),
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/kits-reactivos#extraccion-adn`,
      name: "Servicio de extracción de ADN",
      serviceType: "Extracción y purificación de ADN para PCR, qPCR y secuenciamiento",
      provider: { "@type": "Organization", name: "AS Laboratorios", url: SITE_URL },
      areaServed: { "@type": "Country", name: "Perú" },
      description:
        "Extracción de ADN de matrices vegetales, bacterianas y de tejido usando kits seleccionados según la muestra. AS Laboratorios no comercializa kits QIAGEN.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Los precios de kits y reactivos son finales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Todos los precios son referenciales y la cotización final depende del tipo de cambio, stock, presentación, conservación y condiciones de importación.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta el envío de kits y reactivos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `La página muestra un envío referencial de S/${REFERENCE_SHIPPING_PEN} por pedido, sujeto a confirmación según destino y condiciones de conservación.`,
          },
        },
        {
          "@type": "Question",
          name: "¿AS Laboratorios vende kits QIAGEN?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. AS Laboratorios utiliza kits QIAGEN dentro de su servicio de extracción de ADN, pero no comercializa esos kits.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Kits y Reactivos", item: `${SITE_URL}/kits-reactivos` },
      ],
    },
  ],
}

export default function KitsReactivosPage() {
  return (
    <>
      <script
        id="kits-reactivos-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <KitsReactivosClient />
    </>
  )
}
