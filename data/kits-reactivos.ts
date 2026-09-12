import fisherProducts from "./fisher-products.generated.json"

export const productCategories = [
  "PCR y qPCR",
  "Extracción y purificación",
  "ARN y transcriptómica",
  "Cuantificación y detección",
  "Clonación y expresión",
  "Reactivos moleculares",
  "Electroforesis",
  "Equipos moleculares",
  "Consumibles PCR",
  "Materiales moleculares",
  "Bacteriología y medios",
  "Identificación bacteriana",
] as const

export type ProductCategory = (typeof productCategories)[number]

export type MolecularProduct = {
  id: string
  name: string
  brand: string
  catalogNumber: string
  presentation: string
  category: ProductCategory
  description: string
  longDescription?: string
  pricePen?: number
  image: string
  storage: string
  applications?: string[]
  specifications?: Array<{ label: string; value: string }>
}

export const REFERENCE_SHIPPING_PEN = 250

export function hasVerifiedProductPrice(product: MolecularProduct) {
  return typeof product.pricePen === "number" && Number.isFinite(product.pricePen) && product.pricePen > 0
}

export function getProductReferencePricePen(product: MolecularProduct) {
  return hasVerifiedProductPrice(product) ? product.pricePen! : null
}

const fixedPriceProducts: MolecularProduct[] = [
  {
    id: "cytiva-hyclone-fbs-sh3091002hi",
    name: "Cytiva HyClone™ Suero Fetal Bovino Standard, Heat Inactivated",
    brand: "Cytiva",
    catalogNumber: "SH3091002HI",
    presentation: "100 mL",
    category: "Reactivos moleculares",
    description: "Suero fetal bovino inactivado por calor para suplementación de cultivos celulares y aplicaciones de investigación.",
    longDescription: "HyClone Fetal Bovine Serum, USDA Tested and heat inactivated, supplied as a 100 mL presentation for cell-culture research workflows.",
    pricePen: 4254.21,
    image: "https://assets.fishersci.com/TFS-Assets/CCG/GE-Healthcare-Life-Sciences/product-images/HyClone%20USDA%20Tested%20Fetal%20Bovine%20Serum%20FBS_53412-m29Jan21.jpg-650.jpg",
    storage: "Consultar ficha técnica",
    applications: ["Cultivo celular", "Suplementación de medios", "Investigación in vitro"],
    specifications: [
      { label: "Marca", value: "Cytiva HyClone" },
      { label: "Código de referencia", value: "SH3091002HI" },
      { label: "Presentación", value: "100 mL" },
      { label: "Tratamiento", value: "Inactivado por calor" },
    ],
  },
  {
    id: "invitrogen-cyquant-ldh-c20302",
    name: "Invitrogen™ CyQUANT™ LDH Cytotoxicity Assay, Fluorescence",
    brand: "Invitrogen",
    catalogNumber: "C20302",
    presentation: "200 preparaciones",
    category: "Cuantificación y detección",
    description: "Kit fluorescente para evaluar citotoxicidad mediante la liberación de lactato deshidrogenasa.",
    longDescription: "CyQUANT LDH Cytotoxicity Assay provides a fluorescence-based workflow for measuring lactate dehydrogenase released by damaged cells.",
    pricePen: 6810.2,
    image: "https://assets.fishersci.com/TFS-Assets/LSG/product-images/C20303-650x600.jpg-650.jpg",
    storage: "Consultar ficha técnica",
    applications: ["Citotoxicidad", "Viabilidad celular", "Ensayos fluorescentes"],
    specifications: [
      { label: "Marca", value: "Invitrogen" },
      { label: "Código de referencia", value: "C20302" },
      { label: "Capacidad", value: "200 preparaciones" },
      { label: "Lectura", value: "Fluorescencia" },
    ],
  },
]

const realFisherProducts = fisherProducts as MolecularProduct[]

export const molecularProducts: MolecularProduct[] = [...fixedPriceProducts, ...realFisherProducts]

export function getMolecularProduct(slug: string) {
  return molecularProducts.find((product) => product.id === slug)
}
