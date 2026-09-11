export type MolecularProduct = {
  id: string
  name: string
  brand: string
  catalogNumber: string
  presentation: string
  category: "PCR y qPCR" | "Extracción de ADN" | "Electroforesis" | "Reactivos esenciales" | "Cultivo celular" | "Ensayos celulares"
  description: string
  sourcePriceUsd?: number
  pricePen?: number
  sourceUrl: string
  image: string
  storage: string
}

export const REFERENCE_EXCHANGE_RATE = 3.5
export const COMMERCIAL_FACTOR = 1.35
export const REFERENCE_SHIPPING_PEN = 250

export function getReferencePricePen(sourcePriceUsd: number) {
  return Math.ceil((sourcePriceUsd * REFERENCE_EXCHANGE_RATE * COMMERCIAL_FACTOR) / 10) * 10
}

export function getProductReferencePricePen(product: MolecularProduct) {
  if (typeof product.pricePen === "number") return product.pricePen
  return getReferencePricePen(product.sourcePriceUsd ?? 0)
}

export const molecularProducts: MolecularProduct[] = [
  {
    id: "cytiva-hyclone-fbs-sh3091002hi",
    name: "HyClone™ Suero Fetal Bovino Standard, Heat Inactivated",
    brand: "Cytiva",
    catalogNumber: "SH3091002HI",
    presentation: "100 mL",
    category: "Cultivo celular",
    description: "Suero fetal bovino estándar, probado por USDA e inactivado por calor para suplementación de cultivos celulares.",
    pricePen: 4254.21,
    sourceUrl: "https://www.fishersci.com/shop/products/hyclone-fetal-bovine-serum-usda-tested-heat-inactivated-100ml/sh3091002hi",
    image: "/laboratory-research.png",
    storage: "≤ −10 °C",
  },
  {
    id: "invitrogen-cyquant-ldh-c20302",
    name: "CyQUANT™ LDH Cytotoxicity Assay, Fluorescence",
    brand: "Invitrogen",
    catalogNumber: "C20302",
    presentation: "200 ensayos",
    category: "Ensayos celulares",
    description: "Kit fluorescente para cuantificar citotoxicidad celular mediante la liberación de lactato deshidrogenasa (LDH).",
    pricePen: 6810.2,
    sourceUrl: "https://www.fishersci.com/shop/products/cyquant-ldh-cytotoxicity-assay-fluorescence-2/C20303",
    image: "/chemical-reagents.png",
    storage: "Consultar ficha",
  },
  {
    id: "thermo-pcr-master-mix-k0172",
    name: "PCR Master Mix (2X)",
    brand: "Thermo Scientific",
    catalogNumber: "FERK0172",
    presentation: "1,000 reacciones",
    category: "PCR y qPCR",
    description: "Mezcla lista para usar con Taq DNA polimerasa, dNTP y componentes para PCR rutinaria.",
    sourcePriceUsd: 1012,
    sourceUrl: "https://www.fishersci.com/shop/products/pcr-master-mix-2x/ferk0172",
    image: "/kit-biologia-molecular.png",
    storage: "−20 °C",
  },
  {
    id: "fisherbrand-sybr-a59528",
    name: "SYBR Green qPCR Master Mix",
    brand: "Fisherbrand",
    catalogNumber: "A59528",
    presentation: "1 mL",
    category: "PCR y qPCR",
    description: "Mezcla 2X para amplificación cuantitativa de ADN y ADNc mediante PCR en tiempo real.",
    sourcePriceUsd: 72.9,
    sourceUrl: "https://www.fishersci.com/shop/products/sybr-green-qpcr-master-mix-3/A59528",
    image: "/kit-biologia-molecular.png",
    storage: "Consultar ficha",
  },
  {
    id: "thermo-phusion-f631s",
    name: "Phusion Plus PCR Master Mix",
    brand: "Thermo Scientific",
    catalogNumber: "F631S",
    presentation: "100 reacciones, incoloro",
    category: "PCR y qPCR",
    description: "Mezcla 2X de alta fidelidad para amplificaciones exigentes y resultados reproducibles.",
    sourcePriceUsd: 374,
    sourceUrl: "https://www.fishersci.com/shop/products/phusion-plus-green-pcr-master-mix-3/F631S",
    image: "/kit-biologia-molecular.png",
    storage: "−20 °C",
  },
  {
    id: "thermo-genomic-dna-k0512",
    name: "Genomic DNA Purification Kit",
    brand: "Thermo Scientific",
    catalogNumber: "FERK0512",
    presentation: "100 preparaciones",
    category: "Extracción de ADN",
    description: "Purificación de ADN genómico desde bacterias, plantas, tejidos, células, suero o sangre.",
    sourcePriceUsd: 442.5,
    sourceUrl: "https://www.fishersci.com/shop/products/fermentas-genomic-dna-purification-kit/FERK0512",
    image: "/chemical-reagents.png",
    storage: "Temperatura ambiente",
  },
  {
    id: "thermo-genejet-ffpe-k0882",
    name: "GeneJET FFPE DNA Purification Kit",
    brand: "Thermo Scientific",
    catalogNumber: "FERK0882",
    presentation: "250 preparaciones",
    category: "Extracción de ADN",
    description: "Purificación de ADN desde tejido fijado e incluido en parafina para PCR, qPCR o NGS.",
    sourcePriceUsd: 1565,
    sourceUrl: "https://www.fishersci.com/shop/products/thermo-scientific-genejet-genomic-dna-purification-kit-7/ferk0882",
    image: "/chemical-reagents.png",
    storage: "Consultar ficha",
  },
  {
    id: "thermo-agarose-pi17850",
    name: "Agarose I, grado biología molecular",
    brand: "Thermo Scientific",
    catalogNumber: "PI17850",
    presentation: "100 g",
    category: "Electroforesis",
    description: "Agarosa de alta pureza para geles con separación de fragmentos de 100 bp a más de 30 kb.",
    sourcePriceUsd: 620,
    sourceUrl: "https://www.fishersci.com/shop/products/pierce-agarose/pi17850",
    image: "/reactivos-bioquimica.png",
    storage: "Temperatura ambiente",
  },
  {
    id: "invitrogen-ladder-15628019",
    name: "100 bp DNA Ladder",
    brand: "Invitrogen",
    catalogNumber: "15-628-019",
    presentation: "100 aplicaciones",
    category: "Electroforesis",
    description: "Marcador para estimación de tamaño y cuantificación aproximada de ADN entre 100 y 2,000 bp.",
    sourcePriceUsd: 111,
    sourceUrl: "https://www.fishersci.com/shop/products/invitrogen-100-bp-dna-ladder-2/15628019",
    image: "/guia-molecular.png",
    storage: "Consultar ficha",
  },
  {
    id: "thermo-loading-dye-r1151",
    name: "DNA Loading Dye & SDS Solution (6X)",
    brand: "Thermo Scientific",
    catalogNumber: "FERR1151",
    presentation: "5 × 1 mL",
    category: "Electroforesis",
    description: "Colorante de carga con SDS para análisis de ADN en geles de agarosa o acrilamida.",
    sourcePriceUsd: 79,
    sourceUrl: "https://www.fishersci.com/shop/products/fermentas-6x-dna-loading-dye-sds-solution/FERR1151",
    image: "/reactivos-tincion.png",
    storage: "Consultar ficha",
  },
  {
    id: "thermo-nuclease-water-r0582",
    name: "Agua libre de nucleasas",
    brand: "Thermo Scientific",
    catalogNumber: "FERR0582",
    presentation: "30 mL",
    category: "Reactivos esenciales",
    description: "Agua desionizada y filtrada, libre de DNasas, RNasas y fosfatasas para biología molecular.",
    sourcePriceUsd: 69.6,
    sourceUrl: "https://www.fishersci.com/shop/products/fermentas-nuclease-free-water/ferr0582",
    image: "/reactivos-bioquimica.png",
    storage: "Temperatura ambiente",
  },
  {
    id: "bio-pcr-master-mix-nc1100436",
    name: "1-Drop PCR Master Mix con colorante",
    brand: "101 BIO",
    catalogNumber: "NC1100436",
    presentation: "1 unidad",
    category: "PCR y qPCR",
    description: "Master mix hot-start en formato de dosificación directa para reducir pipeteo y contaminación.",
    sourcePriceUsd: 114.38,
    sourceUrl: "https://www.fishersci.com/shop/products/1-drop-pcr-mix-with-dyes/NC1100436",
    image: "/kit-biologia-molecular.png",
    storage: "Consultar ficha",
  },
]
