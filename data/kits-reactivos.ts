import fisherProducts from "./fisher-products.generated.json"
import fisherPricesPen from "./fisher-prices-pen.generated.json"
import {
  ONILAB_EXCHANGE_RATE_PEN,
  ONILAB_MARGIN_MULTIPLIER,
  ONILAB_REFERENCE_SHIPPING_PEN,
  onilabProductSeeds,
  type OnilabCategory,
} from "./onilab-products"

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
  "Medios de cultivo",
  "Identificación bacteriana",
  "Bacteriófagos",
  "Agitadores magnéticos",
  "Centrífugas",
  "Pipeteo y dispensación",
  "Mezcladores vortex",
  "Agitadores orbitales",
  "Agitadores de techo",
  "Incubadoras y calentadores",
  "Medición de pH",
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
  presentationOptions?: string[]
  priceBasis?: string
  imported?: boolean
  applications?: string[]
  specifications?: Array<{ label: string; value: string }>
  taxNote?: string
  researchUseOnly?: boolean
  sourcePriceUsd?: number
  shippingPen?: number
  pricingNote?: string
  sourceCheckedAt?: string
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

const bacteriophageProducts: MolecularProduct[] = [
  {
    id: "snipha-360-bacteriofagos-20ml",
    name: "SniPha 360 Bacteriófagos Microorganismos",
    brand: "Phage24 · SniPha",
    catalogNumber: "SNIPHA-360",
    presentation: "Vial estéril de 20 mL",
    category: "Bacteriófagos",
    description: "Mezcla de bacteriófagos líticos altamente específicos para seis especies bacterianas, presentada en solución estéril para investigación.",
    longDescription: "SniPha 360 es una mezcla de bacteriófagos líticos dirigida a Escherichia coli, Staphylococcus aureus, Pseudomonas aeruginosa, Streptococcus pyogenes, Proteus vulgaris y Proteus mirabilis. La especificidad del preparado permite trabajar con las bacterias objetivo sin afectar de manera general a otros microorganismos. El suministro incluye una jeringa desechable de 5 mL, una cánula roma y las indicaciones de manipulación para extraer la solución del vial.",
    pricePen: 320,
    taxNote: "+ IGV",
    researchUseOnly: true,
    imported: true,
    image: "https://www.phage24.com/media/image/product/1/lg/snipha-360-bakteriophagen-mikroorganismen-20ml~2.jpg",
    storage: "Refrigerado entre 2 y 8 °C; conservar sin abrir hasta la fecha de caducidad indicada",
    applications: ["Investigación microbiológica", "Ensayos con bacteriófagos", "Estudios de especificidad bacteriana"],
    specifications: [
      { label: "Presentación", value: "1 vial estéril de 20 mL" },
      { label: "Concentración declarada", value: "1 × 10⁶ UFP/mL" },
      { label: "Bacterias objetivo", value: "E. coli, S. aureus, P. aeruginosa, S. pyogenes, P. vulgaris y P. mirabilis" },
      { label: "Incluye", value: "Jeringa desechable de 5 mL y cánula roma" },
      { label: "Conservación", value: "2–8 °C" },
      { label: "Uso", value: "Únicamente para investigación" },
    ],
  },
  {
    id: "snipha-580-bacteriofagos-20ml",
    name: "SniPha 580 Bacteriófagos Microorganismos",
    brand: "Phage24 · SniPha",
    catalogNumber: "SNIPHA-580",
    presentation: "Vial estéril de 20 mL",
    category: "Bacteriófagos",
    description: "Mezcla específica de bacteriófagos para E. coli, Klebsiella pneumoniae y Enterococcus faecalis en solución estéril.",
    longDescription: "SniPha 580 es una mezcla de bacteriófagos líticos dirigida a Escherichia coli, Klebsiella pneumoniae y Enterococcus faecalis. El producto se suministra en un vial estéril de 20 mL e incluye una jeringa desechable de 5 mL y una cánula roma de 1,2 × 40 mm para la extracción segura de la solución.",
    pricePen: 320,
    taxNote: "+ IGV",
    researchUseOnly: true,
    imported: true,
    image: "/products/bacteriophages/snipha-580.png",
    storage: "Refrigerado entre 2 y 8 °C; el vial sin abrir puede transportarse sin refrigeración hasta 30 días acumulados, según la información suministrada",
    applications: ["Investigación microbiológica", "Ensayos con bacteriófagos", "Estudios de especificidad bacteriana"],
    specifications: [
      { label: "Presentación", value: "1 vial estéril de 20 mL" },
      { label: "Concentración declarada", value: "1 × 10⁶ UFP/mL" },
      { label: "Bacterias objetivo", value: "E. coli, K. pneumoniae y E. faecalis" },
      { label: "Incluye", value: "Jeringa desechable de 5 mL y cánula roma de 1,2 × 40 mm" },
      { label: "Conservación", value: "2–8 °C" },
      { label: "Transporte", value: "Hasta 30 días acumulados sin refrigeración, sin abrir" },
      { label: "Uso", value: "Únicamente para investigación" },
    ],
  },
  {
    id: "zeptometrix-ms2-bacteriofago-0810052",
    name: "ZeptoMetrix™ MS2 Bacteriófago Low",
    brand: "ZeptoMetrix",
    catalogNumber: "0810052",
    presentation: "1 alícuota congelada de 0,1 mL",
    category: "Bacteriófagos",
    description: "Bacteriófago MS2 vivo y titulado, virus de ARN monocatenario que infecta E. coli, para control de procesos de amplificación molecular.",
    longDescription: "Cada alícuota contiene 0,1 mL de bacteriófago MS2 vivo, parcialmente purificado y titulado. El preparado se suministra en tampón SM, puede contener ácidos nucleicos de E. coli y está diseñado como control interno o de proceso en flujos de extracción, retrotranscripción y amplificación de ácidos nucleicos. Los controles deben procesarse con protocolos equivalentes a los empleados para las muestras evaluadas.",
    pricePen: 1400,
    researchUseOnly: true,
    imported: true,
    image: "/products/bacteriophages/zeptometrix-ms2.png",
    storage: "Congelado a −20 °C o menos; evitar ciclos repetidos de congelación y descongelación",
    applications: ["Control interno para RT-PCR", "Amplificación de ácidos nucleicos", "Monitoreo de extracción de ARN"],
    specifications: [
      { label: "Tipo", value: "Bacteriófago MS2 vivo, ARN monocatenario" },
      { label: "Presentación", value: "0,1 mL por alícuota" },
      { label: "Título objetivo", value: "1,0 × 10⁹ UFP/mL" },
      { label: "Hospedador", value: "Escherichia coli" },
      { label: "Matriz", value: "Tampón SM; puede contener ácidos nucleicos de E. coli" },
      { label: "Conservación", value: "−20 °C o menos" },
      { label: "Clasificación", value: "RUO · Solo para investigación, no para procedimientos diagnósticos" },
    ],
  },
  {
    id: "eliava-pyo-bacteriofago-5x10ml",
    name: "Bacteriófago PYO",
    brand: "Eliava BioPreparations",
    catalogNumber: "PYO-5X10ML",
    presentation: "1 caja · 5 viales × 10 mL",
    category: "Bacteriófagos",
    description: "Mezcla líquida de fagos con actividad específica declarada frente a cinco grupos bacterianos, en caja de cinco viales.",
    longDescription: "PYO es una mezcla de filtrados estériles de lisados de fagos con actividad específica declarada frente a Staphylococcus aureus, Streptococcus spp., diferentes serotipos de Escherichia coli, Pseudomonas aeruginosa y Proteus spp. AS Laboratorios ofrece esta presentación exclusivamente como material para investigación y no comunica ni recomienda usos clínicos.",
    pricePen: 870,
    researchUseOnly: true,
    imported: true,
    image: "https://mybacteriophage.net/cdn/shop/files/IMG-6852_1200x1200.jpg?v=1728558959",
    storage: "Entre 2 y 8 °C, en lugar seco y protegido de la luz directa",
    applications: ["Investigación microbiológica", "Estudios de lisis bacteriana", "Ensayos con mezclas de fagos"],
    specifications: [
      { label: "Presentación", value: "1 caja con 5 viales de 10 mL" },
      { label: "S. aureus", value: "Título no menor de 10⁵ mL⁻¹" },
      { label: "Streptococcus spp.", value: "Título no menor de 10⁴ mL⁻¹" },
      { label: "E. coli", value: "Diferentes serotipos; título no menor de 10⁵ mL⁻¹" },
      { label: "P. aeruginosa", value: "Título no menor de 10⁵ mL⁻¹" },
      { label: "Proteus spp.", value: "Título no menor de 10⁵ mL⁻¹" },
      { label: "Conservación", value: "2–8 °C" },
      { label: "Uso", value: "Únicamente para investigación" },
    ],
  },
]

const cultureMediaPresentations = ["500 g", "1 kg", "2 kg"]

type CultureMedium = {
  slug: string
  name: string
  code: string
  pricePen: number
  description: string
  longDescription: string
  image: string
  reconstitution: string
  finalPh: string
  applications: string[]
  extra?: Array<{ label: string; value: string }>
}

function cultureMedium({
  slug,
  name,
  code,
  pricePen,
  description,
  longDescription,
  image,
  reconstitution,
  finalPh,
  applications,
  extra = [],
}: CultureMedium): MolecularProduct {
  return {
    id: `himedia-${slug}-${code.toLowerCase()}`,
    name,
    brand: "HiMedia",
    catalogNumber: `${code}-500G`,
    presentation: "500 g · 1 kg · 2 kg",
    presentationOptions: cultureMediaPresentations,
    priceBasis: "500 g",
    imported: true,
    category: "Medios de cultivo",
    description,
    longDescription,
    pricePen,
    image,
    storage: "10–30 °C, en envase bien cerrado y protegido de la humedad",
    applications,
    specifications: [
      { label: "Marca", value: "HiMedia" },
      { label: "Código 500 g", value: `${code}-500G` },
      { label: "Presentaciones", value: "500 g, 1 kg y 2 kg" },
      { label: "Forma", value: "Medio deshidratado en polvo" },
      { label: "Reconstitución", value: reconstitution },
      { label: "pH final", value: finalPh },
      { label: "Envase", value: "Frasco HDPE" },
      { label: "Disponibilidad", value: "Producto de importación" },
      ...extra,
    ],
  }
}

const hiMediaCultureMedia: MolecularProduct[] = [
  cultureMedium({
    slug: "agar-base-sangre-infusion",
    name: "Agar base sangre (agar de infusión)",
    code: "M073",
    pricePen: 1128.4,
    description: "Base nutritiva para preparar agar sangre y cultivar microorganismos exigentes tras la adición de sangre estéril.",
    longDescription: "Blood Agar Base (Infusion Agar) is a highly nutritious infusion medium recommended for the cultivation of fastidious pathogenic microorganisms after enrichment with blood.",
    image: "https://sudospaces.com/vietchem/vietchem/2019/03/m073-500g.jpg",
    reconstitution: "40,0 g/L; esterilizar a 121 °C durante 15 min y añadir 5 % de sangre desfibrinada estéril",
    finalPh: "7,3 ± 0,2 a 25 °C",
    applications: ["Agar sangre", "Microorganismos exigentes", "Aislamiento bacteriano"],
  }),
  cultureMedium({
    slug: "agar-base-urea-christensen",
    name: "Agar base urea (Christensen)",
    code: "M112",
    pricePen: 977.6,
    description: "Medio diferencial para detectar actividad ureasa, especialmente útil en la identificación de especies de Proteus.",
    longDescription: "Urea Agar Base (Christensen) is recommended for the detection of urease production, particularly by Proteus species and other urease-positive microorganisms.",
    image: "https://s3.amazonaws.com/zcom-media/sites/a0iE000000P2ZHyIAN/media/catalog/product/m/1/m112-500g.jpg",
    reconstitution: "24,01 g/950 mL; esterilizar a 115 °C durante 20 min y añadir 50 mL de urea estéril al 40 %",
    finalPh: "6,8 ± 0,2 a 25 °C",
    applications: ["Prueba de ureasa", "Identificación de Proteus", "Diferenciación bacteriana"],
  }),
  cultureMedium({
    slug: "agar-bilis-esculina",
    name: "Agar bilis esculina",
    code: "M340",
    pricePen: 1424.8,
    description: "Base selectiva y diferencial para la detección presuntiva de estreptococos del grupo D por hidrólisis de esculina.",
    longDescription: "Bile Esculin Agar Base is recommended for the presumptive identification of group D streptococci by esculin hydrolysis in the presence of bile.",
    image: "https://s3.amazonaws.com/zcom-media/sites/a0iE000000P2ZHyIAN/media/catalog/product/m/3/m340-500g_1.jpg",
    reconstitution: "31,75 g/500 mL; esterilizar a 121 °C durante 15 min y completar según protocolo con suplemento de esculina",
    finalPh: "6,6 ± 0,2 a 25 °C",
    applications: ["Estreptococos grupo D", "Hidrólisis de esculina", "Microbiología de alimentos"],
    extra: [{ label: "Suplemento", value: "Esculin FD050, según protocolo" }],
  }),
  cultureMedium({
    slug: "agar-citrato-simmons",
    name: "Agar citrato de Simmons",
    code: "M099",
    pricePen: 967.2,
    description: "Medio definido para diferenciar enterobacterias según su capacidad de utilizar citrato como única fuente de carbono.",
    longDescription: "Simmons Citrate Agar is recommended for differentiating members of Enterobacteriaceae based on citrate utilization as the sole carbon source.",
    image: "https://img.mbizmarket.co.id/products/thumbs/800x800/2022/11/24/1386ca18ecb16e786df7cb94754cedeb.jpg",
    reconstitution: "24,28 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "6,8 ± 0,2 a 25 °C",
    applications: ["Utilización de citrato", "Enterobacteriaceae", "Identificación bioquímica"],
  }),
  cultureMedium({
    slug: "agar-lia-lisina-hierro",
    name: "Agar LIA (lisina hierro)",
    code: "M377",
    pricePen: 1216.8,
    description: "Medio diferencial para evaluar descarboxilación y desaminación de lisina, además de producción de sulfuro de hidrógeno.",
    longDescription: "Lysine Iron Agar differentiates enteric organisms, especially Salmonella and Arizonae, through lysine decarboxylation, lysine deamination and hydrogen sulphide production.",
    image: "https://inwfile.com/s-fz/o6v7z9.jpg",
    reconstitution: "34,56 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "6,7 ± 0,2 a 25 °C",
    applications: ["Salmonella", "Descarboxilación de lisina", "Producción de H₂S"],
  }),
  cultureMedium({
    slug: "agar-macconkey",
    name: "Agar MacConkey",
    code: "M008",
    pricePen: 1060.8,
    description: "Medio selectivo y diferencial para bacilos Gram negativos entéricos y diferenciación de fermentadores de lactosa.",
    longDescription: "MacConkey Agar is a selective and differential medium for isolation of enteric Gram-negative bacteria and differentiation based on lactose fermentation.",
    image: "https://cdn.awsli.com.br/2500x2500/1280/1280428/produto/289038950/agar_macconkey_500g_himedia-wmlz9re5zp.png",
    reconstitution: "49,53 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "7,1 ± 0,2 a 25 °C",
    applications: ["Enterobacteriaceae", "Coliformes", "Fermentación de lactosa"],
  }),
  cultureMedium({
    slug: "agar-base-manitol-salado",
    name: "Agar base manitol salado",
    code: "M118",
    pricePen: 629.2,
    description: "Medio selectivo y diferencial con alta concentración de cloruro de sodio para aislamiento de estafilococos.",
    longDescription: "Mannitol Salt Agar Base is recommended for the selective isolation and differentiation of staphylococci based on mannitol fermentation in a high-salt medium.",
    image: "https://cdn.awsli.com.br/2500x2500/1280/1280428/produto/221096444/agar_manitol_sal_500g_himedia-6n88aswy5f.png",
    reconstitution: "111,02 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "7,4 ± 0,2 a 25 °C",
    applications: ["Staphylococcus", "Fermentación de manitol", "Aislamiento selectivo"],
  }),
  cultureMedium({
    slug: "medio-mio",
    name: "Medio MIO (movilidad, indol y ornitina)",
    code: "M378",
    pricePen: 1138.8,
    description: "Medio semisólido para determinar movilidad, producción de indol y descarboxilación de ornitina en enterobacterias.",
    longDescription: "MIO Medium is recommended for identification of Enterobacteriaceae based on motility, indole production and ornithine decarboxylase activity.",
    image: "https://www.chemscience.com/assets/product-images/m378-500g.png",
    reconstitution: "31,02 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "6,5 ± 0,2 a 25 °C",
    applications: ["Movilidad", "Prueba de indol", "Ornitina descarboxilasa"],
  }),
  cultureMedium({
    slug: "agar-mueller-hinton",
    name: "Agar Mueller-Hinton",
    code: "M173",
    pricePen: 826.8,
    description: "Medio estandarizado para pruebas de sensibilidad antimicrobiana mediante difusión en disco.",
    longDescription: "Mueller Hinton Agar is recommended for antimicrobial susceptibility testing of rapidly growing aerobic organisms by the Kirby-Bauer disc diffusion method.",
    image: "https://i5.walmartimages.com/seo/Himedia-Mueller-Hinton-Agar-Code-M173-500G_f18ca85c-ad42-47a4-b6ff-40257ec6a4d5.c75e0f103263757da4b1b4859ce0d32f.png",
    reconstitution: "38,0 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "7,3 ± 0,1 a 25 °C",
    applications: ["Antibiograma", "Kirby-Bauer", "Sensibilidad antimicrobiana"],
  }),
  cultureMedium({
    slug: "agar-sabouraud-dextrosa",
    name: "Agar Sabouraud dextrosa",
    code: "M063",
    pricePen: 764.4,
    description: "Medio de pH ácido para cultivo y recuento de hongos, levaduras y microorganismos acidúricos.",
    longDescription: "Sabouraud Dextrose Agar is recommended for cultivation of yeasts, moulds and aciduric microorganisms from clinical and non-clinical samples.",
    image: "https://data.vietchem.com.vn/labvietchem/2019/03/m063-500g.jpg",
    reconstitution: "65,0 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "5,6 ± 0,2 a 25 °C",
    applications: ["Hongos", "Levaduras", "Recuento microbiológico"],
  }),
  cultureMedium({
    slug: "agar-triptona-soya-tsa",
    name: "Agar triptona soya (TSA)",
    code: "M290",
    pricePen: 670.8,
    description: "Medio nutritivo de uso general para cultivo, mantenimiento y recuento de microorganismos no exigentes y exigentes.",
    longDescription: "Tryptone Soya Agar is a general-purpose, non-selective medium used for cultivation, maintenance and microbial limit or sterility testing workflows.",
    image: "https://cdn.awsli.com.br/2500x2500/1280/1280428/produto/221099972/agar_triptona_soja_tsa_500g_himedia-w0nt5cw92a.png",
    reconstitution: "40,0 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "7,3 ± 0,2 a 25 °C",
    applications: ["Cultivo general", "Recuento microbiano", "Control de esterilidad"],
  }),
  cultureMedium({
    slug: "agar-tsi-triple-azucar-hierro",
    name: "Agar TSI (triple azúcar hierro)",
    code: "M021",
    pricePen: 696.8,
    description: "Medio diferencial para identificar enterobacterias mediante fermentación de azúcares, producción de gas y sulfuro de hidrógeno.",
    longDescription: "Triple Sugar Iron Agar differentiates enteric bacteria on the basis of glucose, lactose and sucrose fermentation, gas production and hydrogen sulphide formation.",
    image: "https://cdn.awsli.com.br/800x800/1280/1280428/produto/237581617/agar_tsi_500g_himedia-msr9norsju.png",
    reconstitution: "64,52 g/L; esterilizar a 121 °C durante 15 min",
    finalPh: "7,4 ± 0,2 a 25 °C",
    applications: ["Enterobacteriaceae", "Fermentación de azúcares", "Producción de H₂S"],
  }),
]

const realFisherProducts = (fisherProducts as MolecularProduct[]).map((product, index) => {
  const verifiedPrice = fisherPricesPen[index]
  return typeof verifiedPrice === "number" && Number.isFinite(verifiedPrice) && verifiedPrice > 0
    ? { ...product, pricePen: verifiedPrice }
    : product
})

const onilabApplications: Record<OnilabCategory, string[]> = {
  "Agitadores magnéticos": ["Preparación de soluciones", "Mezcla con o sin calentamiento", "Rutinas de laboratorio"],
  Centrífugas: ["Separación de muestras", "Procesamiento de tubos", "Flujos de biología molecular"],
  "Pipeteo y dispensación": ["Transferencia de líquidos", "Preparación de ensayos", "Trabajo con microvolúmenes"],
  "Mezcladores vortex": ["Homogeneización rápida", "Mezcla de tubos", "Preparación de muestras"],
  "Agitadores orbitales": ["Agitación orbital", "Mezcla de matraces y placas", "Cultivo y preparación de muestras"],
  "Agitadores de techo": ["Mezcla de alta viscosidad", "Formulación", "Homogeneización mecánica"],
  "Incubadoras y calentadores": ["Incubación controlada", "Calentamiento de muestras", "Preparación térmica"],
  "Medición de pH": ["Control de pH", "Preparación de medios", "Verificación de soluciones"],
}

const onilabProducts: MolecularProduct[] = onilabProductSeeds.map((seed) => {
  const pricePen = Math.round(seed.priceUsd * ONILAB_EXCHANGE_RATE_PEN * ONILAB_MARGIN_MULTIPLIER * 100) / 100
  return {
    id: `onilab-${seed.asin.toLowerCase()}`,
    name: seed.name,
    brand: "ONiLAB",
    catalogNumber: seed.asin,
    presentation: "1 unidad",
    category: seed.category,
    description: seed.summary,
    longDescription: `${seed.name}. ${seed.summary} La configuración, compatibilidad eléctrica, accesorios incluidos y disponibilidad se validan antes de confirmar la importación.`,
    pricePen,
    image: seed.image,
    storage: "Conservar en ambiente seco y seguir las indicaciones del manual del fabricante",
    imported: true,
    applications: onilabApplications[seed.category],
    sourcePriceUsd: seed.priceUsd,
    shippingPen: ONILAB_REFERENCE_SHIPPING_PEN,
    pricingNote: "Precio base en USD × tipo de cambio S/4 × 1,50. El envío referencial se cotiza por separado.",
    sourceCheckedAt: "20 de septiembre de 2026",
    specifications: [
      { label: "Marca", value: "ONiLAB" },
      { label: "Código ASIN", value: seed.asin },
      { label: "Categoría", value: seed.category },
      { label: "Precio base consultado", value: `US$${seed.priceUsd.toFixed(2)}` },
      { label: "Tipo de cambio aplicado", value: "US$1 = S/4,00" },
      { label: "Cálculo referencial", value: "Precio base × S/4 × 1,50" },
      { label: "Envío referencial", value: "US$90 · S/360 por pedido, no incluido" },
      { label: "Disponibilidad", value: "Importación bajo pedido" },
    ],
  }
})

export const molecularProducts: MolecularProduct[] = [...onilabProducts, ...bacteriophageProducts, ...hiMediaCultureMedia, ...fixedPriceProducts, ...realFisherProducts]

export function getMolecularProduct(slug: string) {
  return molecularProducts.find((product) => product.id === slug)
}
