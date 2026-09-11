export const productCategories = [
  "PCR y qPCR",
  "Extracción de ADN",
  "Preparación de ARN",
  "Electroforesis",
  "Reactivos esenciales",
  "Cultivo celular",
  "Ensayos celulares",
  "Medios de cultivo",
  "Identificación bacteriana",
  "Tinciones y colorantes",
  "Antimicrobianos y suplementos",
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
  sourcePriceUsd?: number
  pricePen?: number
  image: string
  storage: string
  applications?: string[]
  specifications?: Array<{ label: string; value: string }>
}

export const REFERENCE_EXCHANGE_RATE = 3.5
export const COMMERCIAL_FACTOR = 1.4
export const REFERENCE_SHIPPING_PEN = 250

export function getReferencePricePen(sourcePriceUsd: number) {
  return Math.ceil((sourcePriceUsd * REFERENCE_EXCHANGE_RATE * COMMERCIAL_FACTOR) / 10) * 10
}

export function getProductReferencePricePen(product: MolecularProduct) {
  if (typeof product.pricePen === "number") return product.pricePen
  return getReferencePricePen(product.sourcePriceUsd ?? 0)
}

const featuredProducts: MolecularProduct[] = [
  {
    id: "cytiva-hyclone-fbs-sh3091002hi",
    name: "HyClone™ Suero Fetal Bovino Standard, Heat Inactivated",
    brand: "Cytiva",
    catalogNumber: "SH3091002HI",
    presentation: "100 mL",
    category: "Cultivo celular",
    description: "Suero fetal bovino estándar, probado por USDA e inactivado por calor para suplementación de cultivos celulares.",
    longDescription: "Suplemento para protocolos de cultivo celular que requieren una fuente definida de factores de crecimiento. La referencia se presenta inactivada por calor y su disponibilidad se confirma antes de cada importación.",
    pricePen: 4254.21,
    image: "/lab-scientists.png",
    storage: "≤ −10 °C",
    applications: ["Cultivo celular", "Suplementación de medios", "Ensayos in vitro"],
  },
  {
    id: "invitrogen-cyquant-ldh-c20302",
    name: "CyQUANT™ LDH Cytotoxicity Assay, Fluorescence",
    brand: "Invitrogen",
    catalogNumber: "C20302",
    presentation: "200 ensayos",
    category: "Ensayos celulares",
    description: "Kit fluorescente para cuantificar citotoxicidad celular mediante la liberación de lactato deshidrogenasa (LDH).",
    longDescription: "Ensayo para estimar daño de membrana y citotoxicidad en cultivos celulares mediante una lectura fluorescente. La ficha permite revisar presentación, conservación y alcance antes de solicitar una cotización.",
    pricePen: 6810.2,
    image: "/microscope-scientist.png",
    storage: "Consultar ficha técnica",
    applications: ["Citotoxicidad", "Viabilidad celular", "Investigación biomédica"],
  },
  {
    id: "thermo-pcr-master-mix-k0172",
    name: "PCR Master Mix (2X)", brand: "Thermo Scientific", catalogNumber: "FERK0172", presentation: "1,000 reacciones", category: "PCR y qPCR",
    description: "Mezcla lista para usar con Taq DNA polimerasa, dNTP y componentes para PCR rutinaria.", sourcePriceUsd: 1012,
    image: "/lab-header-bg.jpg", storage: "−20 °C", applications: ["PCR convencional", "Genotipado", "Amplificación de ADN"],
  },
  {
    id: "fisherbrand-sybr-a59528",
    name: "SYBR Green qPCR Master Mix", brand: "Fisherbrand", catalogNumber: "A59528", presentation: "1 mL", category: "PCR y qPCR",
    description: "Mezcla 2X para amplificación cuantitativa de ADN y ADNc mediante PCR en tiempo real.", sourcePriceUsd: 72.9,
    image: "/lab-header-bg.jpg", storage: "−20 °C, protegido de la luz", applications: ["qPCR", "Expresión génica", "Cuantificación relativa"],
  },
  {
    id: "thermo-phusion-f631s",
    name: "Phusion Plus PCR Master Mix", brand: "Thermo Scientific", catalogNumber: "F631S", presentation: "100 reacciones, incoloro", category: "PCR y qPCR",
    description: "Mezcla 2X de alta fidelidad para amplificaciones exigentes y resultados reproducibles.", sourcePriceUsd: 374,
    image: "/lab-header-bg.jpg", storage: "−20 °C", applications: ["PCR de alta fidelidad", "Clonación", "Secuenciamiento"],
  },
  {
    id: "thermo-genomic-dna-k0512",
    name: "Genomic DNA Purification Kit", brand: "Thermo Scientific", catalogNumber: "FERK0512", presentation: "100 preparaciones", category: "Extracción de ADN",
    description: "Purificación de ADN genómico desde bacterias, plantas, tejidos, células, suero o sangre.", sourcePriceUsd: 442.5,
    image: "/microscope-scientist.png", storage: "Temperatura ambiente", applications: ["Extracción de ADN", "PCR", "Secuenciamiento"],
  },
  {
    id: "thermo-genejet-ffpe-k0882",
    name: "GeneJET FFPE DNA Purification Kit", brand: "Thermo Scientific", catalogNumber: "FERK0882", presentation: "250 preparaciones", category: "Extracción de ADN",
    description: "Purificación de ADN desde tejido fijado e incluido en parafina para PCR, qPCR o NGS.", sourcePriceUsd: 1565,
    image: "/microscope-scientist.png", storage: "Consultar ficha técnica", applications: ["Muestras FFPE", "PCR", "NGS"],
  },
  {
    id: "thermo-agarose-pi17850",
    name: "Agarose I, grado biología molecular", brand: "Thermo Scientific", catalogNumber: "PI17850", presentation: "100 g", category: "Electroforesis",
    description: "Agarosa de alta pureza para geles con separación de fragmentos de 100 bp a más de 30 kb.", sourcePriceUsd: 620,
    image: "/offer/insumosLab.jpeg", storage: "Temperatura ambiente", applications: ["Electroforesis de ADN", "Recuperación de fragmentos", "Control de amplicones"],
  },
  {
    id: "invitrogen-ladder-15628019",
    name: "100 bp DNA Ladder", brand: "Invitrogen", catalogNumber: "15-628-019", presentation: "100 aplicaciones", category: "Electroforesis",
    description: "Marcador para estimación de tamaño y cuantificación aproximada de ADN entre 100 y 2,000 bp.", sourcePriceUsd: 111,
    image: "/proteinmole.png", storage: "−20 °C", applications: ["Estimación de tamaño", "Electroforesis", "Control de PCR"],
  },
  {
    id: "thermo-loading-dye-r1151",
    name: "DNA Loading Dye & SDS Solution (6X)", brand: "Thermo Scientific", catalogNumber: "FERR1151", presentation: "5 × 1 mL", category: "Electroforesis",
    description: "Colorante de carga con SDS para análisis de ADN en geles de agarosa o acrilamida.", sourcePriceUsd: 79,
    image: "/servicios/micro.jpeg", storage: "Temperatura ambiente", applications: ["Carga de geles", "Electroforesis de ADN", "Visualización de corrida"],
  },
  {
    id: "thermo-nuclease-water-r0582",
    name: "Agua libre de nucleasas", brand: "Thermo Scientific", catalogNumber: "FERR0582", presentation: "30 mL", category: "Reactivos esenciales",
    description: "Agua desionizada y filtrada, libre de DNasas, RNasas y fosfatasas para biología molecular.", sourcePriceUsd: 69.6,
    image: "/offer/insumosLab.jpeg", storage: "Temperatura ambiente", applications: ["PCR", "Preparación de buffers", "Dilución de ácidos nucleicos"],
  },
  {
    id: "bio-pcr-master-mix-nc1100436",
    name: "1-Drop PCR Master Mix con colorante", brand: "101 BIO", catalogNumber: "NC1100436", presentation: "1 unidad", category: "PCR y qPCR",
    description: "Master mix hot-start en formato de dosificación directa para reducir pipeteo y contaminación.", sourcePriceUsd: 114.38,
    image: "/lab-header-bg.jpg", storage: "Consultar ficha técnica", applications: ["PCR rutinaria", "Docencia", "Preparación rápida"],
  },
]

type Family = {
  slug: string; name: string; brand: string; category: ProductCategory; description: string; baseUsd: number; image: string; storage: string; applications: string[]
  variants: Array<{ slug: string; label: string; multiplier: number }>
}

const standardVariants = (labels: string[]) => labels.map((label, index) => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  multiplier: [1, 1.65, 2.7, 4.1][index] ?? index + 1,
}))

const catalogFamilies: Family[] = [
  { slug: "taq-dna-polimerasa", name: "Taq DNA polimerasa", brand: "Thermo Scientific", category: "PCR y qPCR", description: "Enzima termoestable para amplificación rutinaria de fragmentos de ADN.", baseUsd: 72, image: "/lab-header-bg.jpg", storage: "−20 °C", applications: ["PCR convencional", "Genotipado", "Control de amplicones"], variants: standardVariants(["100 U", "500 U", "1,000 U", "2,500 U"]) },
  { slug: "qpcr-sybr-green", name: "Master Mix qPCR SYBR Green", brand: "Applied Biosystems", category: "PCR y qPCR", description: "Mezcla optimizada para cuantificación de ADN mediante fluorescencia SYBR Green.", baseUsd: 118, image: "/lab-header-bg.jpg", storage: "−20 °C, protegido de la luz", applications: ["qPCR", "Expresión génica", "Detección molecular"], variants: standardVariants(["100 reacciones", "200 reacciones", "500 reacciones", "1,000 reacciones"]) },
  { slug: "rt-pcr-one-step", name: "Kit RT-PCR One-Step", brand: "Invitrogen", category: "PCR y qPCR", description: "Sistema integrado para transcripción reversa y amplificación en un mismo tubo.", baseUsd: 165, image: "/proteinmole.png", storage: "−20 °C", applications: ["ARN viral", "Expresión génica", "RT-PCR"], variants: standardVariants(["25 reacciones", "50 reacciones", "100 reacciones", "200 reacciones"]) },
  { slug: "dntp-mix", name: "Mezcla de dNTP grado molecular", brand: "Thermo Scientific", category: "Reactivos esenciales", description: "Solución balanceada de nucleótidos para PCR, síntesis y marcaje de ADN.", baseUsd: 44, image: "/offer/insumosLab.jpeg", storage: "−20 °C", applications: ["PCR", "Síntesis de ADN", "Secuenciamiento"], variants: standardVariants(["1 mL · 10 mM", "2 mL · 10 mM", "5 mL · 10 mM", "10 mL · 10 mM"]) },
  { slug: "kit-adn-plantas", name: "Kit de extracción de ADN vegetal", brand: "Thermo Scientific", category: "Extracción de ADN", description: "Purificación en columna de ADN genómico a partir de hojas y tejidos vegetales.", baseUsd: 96, image: "/microscope-scientist.png", storage: "Temperatura ambiente", applications: ["Tejido vegetal", "Fitopatología", "PCR y secuenciamiento"], variants: standardVariants(["25 preparaciones", "50 preparaciones", "100 preparaciones", "250 preparaciones"]) },
  { slug: "kit-adn-bacteriano", name: "Kit de extracción de ADN bacteriano", brand: "Invitrogen", category: "Extracción de ADN", description: "Purificación de ADN genómico bacteriano para análisis moleculares posteriores.", baseUsd: 88, image: "/microscope-scientist.png", storage: "Temperatura ambiente", applications: ["Bacterias Gram positivas", "Bacterias Gram negativas", "PCR"], variants: standardVariants(["25 preparaciones", "50 preparaciones", "100 preparaciones", "250 preparaciones"]) },
  { slug: "kit-adn-suelo", name: "Kit de extracción de ADN de suelo", brand: "Fisher BioReagents", category: "Extracción de ADN", description: "Extracción de ácidos nucleicos desde matrices de suelo con remoción de inhibidores.", baseUsd: 122, image: "/microscope-scientist.png", storage: "Temperatura ambiente", applications: ["Microbioma de suelo", "Metagenómica", "Fitopatología"], variants: standardVariants(["25 preparaciones", "50 preparaciones", "100 preparaciones", "200 preparaciones"]) },
  { slug: "kit-arn-total", name: "Kit de purificación de ARN total", brand: "Invitrogen", category: "Preparación de ARN", description: "Purificación de ARN total para RT-PCR, transcriptómica y análisis de expresión.", baseUsd: 105, image: "/proteinmole.png", storage: "Temperatura ambiente", applications: ["RT-PCR", "Expresión génica", "Transcriptómica"], variants: standardVariants(["25 preparaciones", "50 preparaciones", "100 preparaciones", "250 preparaciones"]) },
  { slug: "dnasa-i", name: "DNasa I libre de RNasa", brand: "Thermo Scientific", category: "Preparación de ARN", description: "Enzima para remoción controlada de ADN durante la preparación de ARN.", baseUsd: 52, image: "/offer/insumosLab.jpeg", storage: "−20 °C", applications: ["Preparación de ARN", "RT-PCR", "Eliminación de ADN"], variants: standardVariants(["250 U", "1,000 U", "2,500 U", "5,000 U"]) },
  { slug: "agarosa-molecular", name: "Agarosa grado biología molecular", brand: "Fisher BioReagents", category: "Electroforesis", description: "Agarosa de alta pureza para separación y recuperación de ácidos nucleicos.", baseUsd: 64, image: "/offer/insumosLab.jpeg", storage: "Temperatura ambiente", applications: ["Electroforesis", "Separación de ADN", "Recuperación de fragmentos"], variants: standardVariants(["25 g", "50 g", "100 g", "500 g"]) },
  { slug: "dna-ladder", name: "Marcador de peso molecular de ADN", brand: "Invitrogen", category: "Electroforesis", description: "Patrón premezclado para estimación de tamaño de fragmentos en geles de agarosa.", baseUsd: 48, image: "/proteinmole.png", storage: "−20 °C", applications: ["Electroforesis", "Estimación de tamaño", "Control de PCR"], variants: standardVariants(["50 bp", "100 bp", "1 kb", "1 kb Plus"]) },
  { slug: "buffer-tae-tbe", name: "Buffer para electroforesis", brand: "Fisher BioReagents", category: "Electroforesis", description: "Solución concentrada para preparación reproducible de geles y cubas de electroforesis.", baseUsd: 36, image: "/offer/insumosLab.jpeg", storage: "Temperatura ambiente", applications: ["Geles de agarosa", "Electroforesis de ADN", "Electroforesis de ARN"], variants: standardVariants(["TAE 10X · 1 L", "TAE 50X · 1 L", "TBE 10X · 1 L", "TBE 5X · 4 L"]) },
  { slug: "lb-medio", name: "Medio Luria Bertani (LB)", brand: "BD Difco", category: "Medios de cultivo", description: "Medio nutritivo de uso general para crecimiento y mantenimiento de bacterias.", baseUsd: 42, image: "/servicios/micro.jpeg", storage: "15–30 °C", applications: ["Cultivo bacteriano", "Clonación", "Producción de biomasa"], variants: standardVariants(["Caldo · 100 g", "Caldo · 500 g", "Agar · 100 g", "Agar · 500 g"]) },
  { slug: "tryptic-soy", name: "Tryptic Soy", brand: "Oxoid", category: "Medios de cultivo", description: "Medio complejo y no selectivo para cultivo de microorganismos exigentes y no exigentes.", baseUsd: 48, image: "/servicios/servMicrobiologicos.jpeg", storage: "10–30 °C", applications: ["Control microbiológico", "Cultivo bacteriano", "Ensayos de esterilidad"], variants: standardVariants(["Caldo · 100 g", "Caldo · 500 g", "Agar · 100 g", "Agar · 500 g"]) },
  { slug: "macconkey", name: "Medio MacConkey", brand: "Oxoid", category: "Medios de cultivo", description: "Medio selectivo y diferencial para aislamiento de bacilos Gram negativos entéricos.", baseUsd: 51, image: "/servicios/micro.jpeg", storage: "10–30 °C", applications: ["Coliformes", "Enterobacterias", "Control microbiológico"], variants: standardVariants(["Agar · 100 g", "Agar · 500 g", "Placas × 10", "Placas × 100"]) },
  { slug: "mannitol-salt", name: "Mannitol Salt Agar", brand: "HiMedia", category: "Medios de cultivo", description: "Medio selectivo y diferencial para aislamiento presuntivo de estafilococos.", baseUsd: 46, image: "/servicios/servMicrobiologicos.jpeg", storage: "10–30 °C", applications: ["Staphylococcus", "Control de higiene", "Bacteriología"], variants: standardVariants(["100 g", "500 g", "Placas × 10", "Placas × 100"]) },
  { slug: "cetrimide", name: "Cetrimide Agar", brand: "HiMedia", category: "Medios de cultivo", description: "Medio selectivo para aislamiento y diferenciación presuntiva de Pseudomonas aeruginosa.", baseUsd: 54, image: "/servicios/micro.jpeg", storage: "10–30 °C", applications: ["Pseudomonas", "Agua", "Control ambiental"], variants: standardVariants(["100 g", "500 g", "Placas × 10", "Placas × 100"]) },
  { slug: "potato-dextrose", name: "Potato Dextrose Agar", brand: "BD Difco", category: "Medios de cultivo", description: "Medio para cultivo, aislamiento y recuento de levaduras y hongos filamentosos.", baseUsd: 44, image: "/servicios/servMicrobiologicos.jpeg", storage: "10–30 °C", applications: ["Hongos", "Levaduras", "Fitopatología"], variants: standardVariants(["100 g", "500 g", "Placas × 10", "Placas × 100"]) },
  { slug: "muller-hinton", name: "Mueller Hinton Agar", brand: "Oxoid", category: "Medios de cultivo", description: "Medio estandarizado para pruebas de susceptibilidad antimicrobiana por difusión.", baseUsd: 49, image: "/servicios/micro.jpeg", storage: "10–30 °C", applications: ["Antibiograma", "Susceptibilidad", "Bacteriología clínica"], variants: standardVariants(["100 g", "500 g", "Placas × 10", "Placas × 100"]) },
  { slug: "gram-stain", name: "Kit de tinción de Gram", brand: "Fisher Scientific", category: "Tinciones y colorantes", description: "Reactivos coordinados para diferenciación de bacterias Gram positivas y Gram negativas.", baseUsd: 38, image: "/servicios/micro.jpeg", storage: "Temperatura ambiente", applications: ["Tinción de Gram", "Microscopía", "Identificación presuntiva"], variants: standardVariants(["4 × 100 mL", "4 × 250 mL", "4 × 500 mL", "4 × 1 L"]) },
  { slug: "acid-fast-stain", name: "Kit de tinción ácido-alcohol resistente", brand: "BD Difco", category: "Tinciones y colorantes", description: "Conjunto de colorantes para observación de microorganismos ácido-alcohol resistentes.", baseUsd: 45, image: "/servicios/micro.jpeg", storage: "Temperatura ambiente", applications: ["Microscopía", "Tinción Ziehl-Neelsen", "Identificación presuntiva"], variants: standardVariants(["3 × 100 mL", "3 × 250 mL", "3 × 500 mL", "3 × 1 L"]) },
  { slug: "oxidase-test", name: "Prueba de oxidasa", brand: "Thermo Scientific", category: "Identificación bacteriana", description: "Reactivo rápido para detección de actividad citocromo c oxidasa en colonias bacterianas.", baseUsd: 32, image: "/modern-laboratory-scientists.png", storage: "2–8 °C", applications: ["Identificación bacteriana", "Pseudomonas", "Control microbiológico"], variants: standardVariants(["10 pruebas", "50 pruebas", "100 pruebas", "250 pruebas"]) },
  { slug: "catalase-test", name: "Prueba de catalasa", brand: "HiMedia", category: "Identificación bacteriana", description: "Reactivo para diferenciación bacteriana basada en la actividad de la enzima catalasa.", baseUsd: 28, image: "/modern-laboratory-scientists.png", storage: "2–8 °C", applications: ["Identificación bacteriana", "Staphylococcus", "Control microbiológico"], variants: standardVariants(["10 mL", "25 mL", "50 mL", "100 mL"]) },
  { slug: "antibiotic-discs", name: "Discos para susceptibilidad antimicrobiana", brand: "Oxoid", category: "Antimicrobianos y suplementos", description: "Discos impregnados para evaluación cualitativa de susceptibilidad bacteriana.", baseUsd: 31, image: "/servicios/servMicrobiologicos.jpeg", storage: "2–8 °C", applications: ["Antibiograma", "Investigación", "Control de cepas"], variants: standardVariants(["Ampicilina × 50", "Ciprofloxacino × 50", "Gentamicina × 50", "Tetraciclina × 50"]) },
  { slug: "selective-supplements", name: "Suplemento selectivo para medios", brand: "Oxoid", category: "Antimicrobianos y suplementos", description: "Suplementos liofilizados para preparar medios selectivos de microbiología.", baseUsd: 39, image: "/offer/insumosLab.jpeg", storage: "2–8 °C", applications: ["Medios selectivos", "Aislamiento bacteriano", "Control microbiológico"], variants: standardVariants(["Listeria × 10 viales", "Campylobacter × 10 viales", "Salmonella × 10 viales", "Pseudomonas × 10 viales"]) },
]

const generatedProducts: MolecularProduct[] = catalogFamilies.flatMap((family, familyIndex) =>
  family.variants.map((variant, variantIndex) => {
    const reference = `AS-${String(familyIndex + 1).padStart(3, "0")}-${String(variantIndex + 1).padStart(2, "0")}`
    return {
      id: `${family.slug}-${variant.slug}`,
      name: `${family.name} — ${variant.label}`,
      brand: family.brand,
      catalogNumber: reference,
      presentation: variant.label,
      category: family.category,
      description: family.description,
      longDescription: `${family.description} Esta presentación forma parte del catálogo referencial de AS Laboratorios y se cotiza de acuerdo con disponibilidad, conservación y plazo de importación. Nuestro equipo puede ayudarte a validar su compatibilidad con el protocolo de trabajo.`,
      sourcePriceUsd: Math.round(family.baseUsd * variant.multiplier * 100) / 100,
      image: family.image,
      storage: family.storage,
      applications: family.applications,
      specifications: [
        { label: "Presentación", value: variant.label },
        { label: "Categoría", value: family.category },
        { label: "Conservación", value: family.storage },
        { label: "Referencia AS Labs", value: reference },
      ],
    }
  }),
)

export const molecularProducts: MolecularProduct[] = [...featuredProducts, ...generatedProducts]

export function getMolecularProduct(slug: string) {
  return molecularProducts.find((product) => product.id === slug)
}
