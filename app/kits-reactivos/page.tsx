import type { Metadata } from "next"
import { constructMetadata, SITE_URL } from "@/lib/metadata"
import { REFERENCE_SHIPPING_PEN } from "@/data/kits-reactivos"
import KitsReactivosClient from "./kits-reactivos-client"

export const metadata: Metadata = constructMetadata({
  title: "Kits, Reactivos y Equipos de Laboratorio en Perú",
  description:
    "Cotiza kits, reactivos, bacteriófagos, medios de cultivo y equipos ONiLAB para PCR, extracción de ADN, microbiología y rutinas de laboratorio en Perú.",
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
    "kit identificación E coli Perú",
    "kit identificación Salmonella Perú",
    "pruebas bioquímicas bacterianas Perú",
    "extracción ADN bacteriano Perú",
    "extracción ADN vegetal Perú",
    "purificación ADN plasmídico Perú",
    "bacteriófagos para investigación Perú",
    "bacteriófago MS2 Perú",
    "SniPha 360 Perú",
    "SniPha 580 Perú",
    "bacteriófago PYO Perú",
    "equipos de laboratorio Perú",
    "equipos ONiLAB Perú",
    "centrífugas de laboratorio Perú",
    "agitadores magnéticos Perú",
    "mezcladores vortex Perú",
    "micropipetas Perú",
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
      name: "Kits, reactivos y equipos de laboratorio en Perú",
      description:
        "Catálogo referencial de kits, reactivos, bacteriófagos, materiales moleculares y equipos ONiLAB con importación coordinada en Perú.",
      inLanguage: "es-PE",
      mainEntity: { "@id": `${SITE_URL}/kits-reactivos#catalog` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/kits-reactivos#catalog`,
      name: "Familias del catálogo de laboratorio",
      numberOfItems: 6,
      itemListElement: [
        { name: "Biología molecular", path: "/kits-reactivos/biologia-molecular" },
        { name: "Microbiología", path: "/kits-reactivos/microbiologia" },
        { name: "Medios de cultivo", path: "/kits-reactivos/medios-de-cultivo" },
        { name: "Equipos y consumibles", path: "/kits-reactivos/equipos-consumibles" },
        { name: "Bacteriófagos", path: "/kits-reactivos/bacteriofagos" },
        { name: "Equipos de laboratorio ONiLAB", path: "/kits-reactivos/equipos-de-laboratorio" },
      ].map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${SITE_URL}${category.path}`,
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
          name: "¿Cómo se confirma el precio de kits y reactivos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cada familia muestra un precio referencial desde cuando existe una configuración base validada. Las variables no tienen precios individuales publicados; presentación, impuestos, stock, conservación y condiciones de importación se confirman antes del pedido.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta el envío de kits y reactivos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `La página muestra un envío base referencial desde S/${REFERENCE_SHIPPING_PEN} por pedido, sujeto a confirmación según destino, peso, impuestos y condiciones de conservación.`,
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
