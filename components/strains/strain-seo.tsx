import { SITE_URL } from "@/lib/metadata"

interface SeoStrain {
  name: string
  code: string
  origin?: string
}

interface CatalogSeoProps {
  kind: "identified" | "atcc"
  strains: Record<string, SeoStrain>
  market?: "peru" | "ecuador"
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

export function StrainCatalogStructuredData({ kind, strains, market = "peru" }: CatalogSeoProps) {
  const isAtcc = kind === "atcc"
  const isEcuador = market === "ecuador"
  const path = isEcuador ? "/ecuador/cepas" : isAtcc ? "/cepas/atcc" : "/cepas/identificadas"
  const name = isEcuador ? "Catálogo de cepas bacterianas identificadas para Ecuador" : isAtcc ? "Catálogo de cepas ATCC en Perú" : "Catálogo de cepas identificadas en Perú"
  const description = isAtcc
    ? "Cepas ATCC de referencia disponibles en AS Laboratorios para proyectos de investigación, docencia y trabajos de tesis."
    : "Cepas bacterianas y fúngicas identificadas para investigación, biofertilización, biocontrol y docencia."
  const questions = isAtcc
    ? [
        {
          question: "¿Qué documentación acompaña a una cepa ATCC?",
          answer:
            "La documentación aplicable se confirma según la referencia seleccionada y el alcance del proyecto de investigación.",
        },
        {
          question: "¿Quiénes pueden consultar la disponibilidad de una cepa ATCC?",
          answer:
            "Investigadores, tesistas, docentes y equipos académicos con un proyecto definido y un uso científico declarado.",
        },
        {
          question: "¿Qué información se necesita para evaluar el proyecto?",
          answer:
            "Se solicita la institución, el responsable, el objetivo del proyecto, la referencia requerida y el protocolo previsto.",
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
        inLanguage: isEcuador ? "es-EC" : "es-PE",
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
          url: isEcuador ? `${SITE_URL}${path}` : `${SITE_URL}${path}/${id}`,
          name: `${strain.name} ${strain.code}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Cepas", item: isEcuador ? `${SITE_URL}/ecuador/cepas` : `${SITE_URL}/cepas` },
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
        "@type": isAtcc ? "BioChemEntity" : "Product",
        "@id": `${url}#reference`,
        name: `${strain.name} ${strain.code}`,
        alternateName: strain.code,
        sku: strain.code,
        description,
        url,
        category: isAtcc ? "Cepa ATCC de referencia" : "Cepa microbiana identificada",
        ...(isAtcc ? { identifier: strain.code, taxonomicRange: strain.name } : {
          brand: { "@type": "Brand", name: "AS Laboratorios" },
          seller: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "AS Laboratorios",
            url: SITE_URL,
          },
        }),
        additionalProperty: [
          { "@type": "PropertyValue", name: "Nivel de bioseguridad", value: "BSL-1" },
          { "@type": "PropertyValue", name: "Código de referencia", value: strain.code },
          ...(strain.origin ? [{ "@type": "PropertyValue", name: "Origen del aislamiento", value: strain.origin }] : []),
          ...(isAtcc ? [{ "@type": "PropertyValue", name: "Uso", value: "Investigación, docencia y trabajos de tesis" }] : []),
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
