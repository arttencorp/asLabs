import { molecularProducts, type ProductCategory } from "@/data/kits-reactivos"
import { SITE_URL } from "@/lib/metadata"
import KitsReactivosClient, { type CatalogPageConfig } from "./kits-reactivos-client"

const categoriesByScope: Record<CatalogPageConfig["scope"], ProductCategory[]> = {
  molecular: ["PCR y qPCR", "Extracción y purificación", "ARN y transcriptómica", "Cuantificación y detección", "Clonación y expresión", "Reactivos moleculares", "Electroforesis"],
  microbiologia: ["Bacteriología y medios", "Identificación bacteriana"],
  medios: ["Medios de cultivo"],
  equipos: ["Equipos moleculares", "Consumibles PCR", "Materiales moleculares"],
  bacteriofagos: ["Bacteriófagos"],
}

export type CatalogCategoryPageProps = {
  config: CatalogPageConfig
  path: string
}

export default function CatalogCategoryPage({ config, path }: CatalogCategoryPageProps) {
  const products = molecularProducts.filter((product) => categoriesByScope[config.scope].includes(product.category))
  const url = `${SITE_URL}${path}`
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: config.title,
        description: config.description,
        inLanguage: "es-PE",
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "AS Laboratorios", url: SITE_URL },
        publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "AS Laboratorios" },
        about: { "@type": "Thing", name: config.eyebrow },
        dateModified: "2026-09-20",
        mainEntity: { "@id": `${url}#catalog` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#catalog`,
        name: config.title,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}/kits-reactivos/${product.id}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: config.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Kits y Reactivos", item: `${SITE_URL}/kits-reactivos` },
          { "@type": "ListItem", position: 3, name: config.eyebrow, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <KitsReactivosClient pageConfig={config} />
    </>
  )
}
