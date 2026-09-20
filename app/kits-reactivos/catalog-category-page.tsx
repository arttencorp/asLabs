import { getProductReferencePricePen, molecularProducts, type ProductCategory } from "@/data/kits-reactivos"
import { SITE_URL } from "@/lib/metadata"
import KitsReactivosClient, { type CatalogPageConfig } from "./kits-reactivos-client"

const categoriesByScope: Record<CatalogPageConfig["scope"], ProductCategory[]> = {
  molecular: ["PCR y qPCR", "Extracción y purificación", "ARN y transcriptómica", "Cuantificación y detección", "Clonación y expresión", "Reactivos moleculares", "Electroforesis"],
  microbiologia: ["Bacteriología y medios", "Identificación bacteriana"],
  medios: ["Medios de cultivo"],
  equipos: ["Equipos moleculares", "Consumibles PCR", "Materiales moleculares"],
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
          item: {
            "@type": "Product",
            name: product.name,
            sku: product.catalogNumber,
            category: product.category,
            brand: { "@type": "Brand", name: product.brand },
            description: product.description,
            image: product.image,
            url: `${SITE_URL}/kits-reactivos/${product.id}`,
            ...(getProductReferencePricePen(product) !== null
              ? {
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "PEN",
                    price: getProductReferencePricePen(product),
                    availability: "https://schema.org/PreOrder",
                    seller: { "@type": "Organization", name: "AS Laboratorios" },
                  },
                }
              : {}),
          },
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
