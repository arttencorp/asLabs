import { SITE_URL } from "@/lib/metadata"

interface SeoStrain {
  name: string
  code: string
}

interface CatalogSeoProps {
  kind: "identified" | "atcc"
  strains: Record<string, SeoStrain>
}

interface DetailSeoProps extends CatalogSeoProps {
  id: string
}

function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function StrainCatalogStructuredData({ kind, strains }: CatalogSeoProps) {
  const isAtcc = kind === "atcc"
  const path = isAtcc ? "/cepas/atcc" : "/cepas/identificadas"
  const name = isAtcc ? "Catálogo de cepas ATCC en Perú" : "Catálogo de cepas identificadas en Perú"
  const description = isAtcc
    ? "Microorganismos ATCC de referencia para control de calidad, validación de métodos, docencia e investigación."
    : "Cepas bacterianas y fúngicas identificadas para investigación, biofertilización, biocontrol y docencia."
  const questions = isAtcc
    ? [
        {
          question: "¿Qué documentación acompaña a una cepa ATCC?",
          answer:
            "La documentación aplicable se confirma según la referencia seleccionada y el alcance del pedido.",
        },
        {
          question: "¿El precio de una cepa ATCC incluye importación y entrega?",
          answer:
            "La cotización separa el valor referencial de la cepa y la logística internacional estimada. El total final depende del destino y disponibilidad.",
        },
        {
          question: "¿Puedo solicitar una cepa ATCC para control de calidad?",
          answer:
            "Sí. AS Laboratorios atiende solicitudes para control de calidad, validación de métodos, docencia e investigación.",
        },
      ]
    : [
        {
          question: "¿Para qué se utilizan las cepas identificadas?",
          answer:
            "Se emplean en investigación, docencia y proyectos de desarrollo microbiológico, según la ficha y el uso previsto.",
        },
        {
          question: "¿Las cepas identificadas tienen ficha técnica?",
          answer:
            "Cada referencia muestra identificación, formato, presentación y datos técnicos para evaluar su compatibilidad con el proyecto.",
        },
        {
          question: "¿Cómo se confirma la disponibilidad y entrega?",
          answer:
            "AS Laboratorios confirma existencias, documentación, destino y plazo después de recibir la solicitud de cotización.",
        },
      ]

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}${path}#collection`,
        url: `${SITE_URL}${path}`,
        name,
        description,
        inLanguage: "es-PE",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: isAtcc
          ? ["Cepas ATCC", "Microorganismos de referencia", "Control de calidad microbiológico"]
          : ["Cepas microbianas identificadas", "Biocontrol", "Biofertilización"],
        mainEntity: { "@id": `${SITE_URL}${path}#catalog` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}${path}#catalog`,
        name,
        numberOfItems: Object.keys(strains).length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: Object.entries(strains).map(([id, strain], index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}${path}/${id}`,
          name: `${strain.name} ${strain.code}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cepas", item: `${SITE_URL}/cepas` },
          { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${path}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  }

  return <JsonLd id={`strain-catalog-${kind}-structured-data`} data={graph} />
}

export function StrainDetailStructuredData({ kind, strains, id }: DetailSeoProps) {
  const strain = strains[id]
  if (!strain) return null

  const isAtcc = kind === "atcc"
  const catalogPath = isAtcc ? "/cepas/atcc" : "/cepas/identificadas"
  const url = `${SITE_URL}${catalogPath}/${id}`
  const catalogName = isAtcc ? "Cepas ATCC" : "Cepas identificadas"
  const description = isAtcc
    ? `${strain.name} ${strain.code}, microorganismo de referencia para control de calidad, validación de métodos e investigación.`
    : `${strain.name} ${strain.code}, cepa identificada para investigación y aplicaciones microbiológicas.`

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: `${strain.name} ${strain.code}`,
        alternateName: strain.code,
        sku: strain.code,
        description,
        url,
        category: isAtcc ? "Cepa ATCC de referencia" : "Cepa microbiana identificada",
        brand: {
          "@type": "Brand",
          name: isAtcc ? "ATCC" : "AS Laboratorios",
        },
        seller: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "AS Laboratorios",
          url: SITE_URL,
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Nivel de bioseguridad", value: "BSL-1" },
          { "@type": "PropertyValue", name: "Código de referencia", value: strain.code },
        ],
      },
      {
        "@type": "BioChemEntity",
        "@id": `${url}#organism`,
        name: strain.name,
        identifier: strain.code,
        description,
        url,
        taxonomicRange: strain.name,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cepas", item: `${SITE_URL}/cepas` },
          { "@type": "ListItem", position: 3, name: catalogName, item: `${SITE_URL}${catalogPath}` },
          { "@type": "ListItem", position: 4, name: `${strain.name} ${strain.code}`, item: url },
        ],
      },
    ],
  }

  return <JsonLd id={`strain-${kind}-${id}-structured-data`} data={graph} />
}
