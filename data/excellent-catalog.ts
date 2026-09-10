export type ExcellentService = {
  slug: string
  number: string
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  image: string
  accent: string
  services: string[]
  samples: string[]
  techniques: string[]
  deliverables: string[]
}

export const excellentServices: ExcellentService[] = [
  {
    slug: "diagnostico-molecular-agricola",
    number: "01",
    title: "Diagnóstico molecular agrícola",
    shortTitle: "Diagnóstico agrícola",
    eyebrow: "Sanidad vegetal",
    description: "Detección dirigida de agentes asociados a enfermedades vegetales para complementar la evaluación fitosanitaria y orientar decisiones de manejo.",
    image: "/plant-genetics-research.png",
    accent: "#40a986",
    services: ["Detección de virus y viroides", "Detección de bacterias y fitoplasmas", "Detección de hongos y oomicetos", "Confirmación de agentes fitopatógenos", "Diseño de paneles de vigilancia"],
    samples: ["Hojas", "Raíces", "Tallos", "Frutos", "Semillas", "Suelo y sustrato"],
    techniques: ["PCR convencional", "qPCR", "RT-PCR", "Secuenciación confirmatoria"],
    deliverables: ["Informe de resultados", "Interpretación del alcance", "Registro de muestra y trazabilidad", "Orientación técnica posterior"],
  },
  {
    slug: "identificacion-por-secuenciacion",
    number: "02",
    title: "Identificación por secuenciación",
    shortTitle: "Secuenciación",
    eyebrow: "Taxonomía molecular",
    description: "Identificación molecular de microorganismos mediante amplificación de regiones conservadas, secuenciación y comparación bioinformática.",
    image: "/laboratory-research.png",
    accent: "#4f74ba",
    services: ["Identificación de bacterias", "Identificación de hongos", "Confirmación de cultivos puros", "Comparación de secuencias", "Análisis filogenético bajo alcance"],
    samples: ["Cultivos bacterianos", "Hongos filamentosos", "Levaduras", "Aislados ambientales", "Cepas de investigación"],
    techniques: ["16S rRNA", "ITS", "PCR", "Secuenciación Sanger", "Alineamiento bioinformático"],
    deliverables: ["Secuencia depurada", "Coincidencias taxonómicas", "Informe molecular", "Archivos de resultados acordados"],
  },
  {
    slug: "genetica-vegetal",
    number: "03",
    title: "Genética vegetal",
    shortTitle: "Genética vegetal",
    eyebrow: "Identidad y diversidad",
    description: "Herramientas moleculares para estudiar identidad, autenticidad, variabilidad y trazabilidad de material vegetal de interés productivo.",
    image: "/biotech-concept.png",
    accent: "#6d9330",
    services: ["Código de barras de ADN", "Confirmación de identidad vegetal", "Comparación de materiales", "Evaluación de variabilidad", "Trazabilidad genética de lotes"],
    samples: ["Hojas jóvenes", "Tejido vegetal", "Semillas", "Plantines", "Material in vitro"],
    techniques: ["Extracción de ADN", "PCR", "Marcadores moleculares", "Secuenciación", "Análisis comparativo"],
    deliverables: ["Informe de identidad", "Resultados comparativos", "Trazabilidad de muestras", "Datos moleculares acordados"],
  },
  {
    slug: "pcr-qpcr-rtpcr",
    number: "04",
    title: "PCR, qPCR y RT-PCR",
    shortTitle: "PCR y qPCR",
    eyebrow: "Detección y cuantificación",
    description: "Ensayos cualitativos y cuantitativos adaptados al blanco, la matriz, la sensibilidad esperada y el objetivo de cada proyecto.",
    image: "/research/research-lab.png",
    accent: "#725eb2",
    services: ["Detección cualitativa", "Cuantificación relativa", "Análisis de blancos de ARN", "Estandarización de ensayos", "Verificación de amplificación"],
    samples: ["ADN extraído", "ARN extraído", "Tejidos", "Cultivos microbianos", "Matrices previamente evaluadas"],
    techniques: ["PCR endpoint", "qPCR", "RT-PCR", "Curvas de amplificación", "Electroforesis"],
    deliverables: ["Resultados de amplificación", "Controles de corrida", "Informe técnico", "Archivos de análisis según alcance"],
  },
  {
    slug: "inocuidad-y-autenticidad",
    number: "05",
    title: "Inocuidad y autenticidad",
    shortTitle: "Inocuidad",
    eyebrow: "Control molecular",
    description: "Aplicaciones moleculares que complementan el control de materias primas, alimentos y procesos mediante blancos específicos.",
    image: "/modern-laboratory-scientists.png",
    accent: "#bf6e35",
    services: ["Detección molecular de patógenos", "Confirmación de identidad", "Autenticidad de materias primas", "Paneles de vigilancia", "Evaluación de factibilidad por matriz"],
    samples: ["Alimentos", "Materia prima", "Superficies", "Cultivos aislados", "Muestras de proceso"],
    techniques: ["PCR", "qPCR", "Extracción específica por matriz", "Confirmación por secuenciación"],
    deliverables: ["Informe de detección", "Registro de controles", "Observaciones de matriz", "Orientación sobre el resultado"],
  },
  {
    slug: "muestras-ambientales",
    number: "06",
    title: "Análisis molecular de muestras ambientales",
    shortTitle: "Ambiente",
    eyebrow: "Agua, suelo y entorno",
    description: "Detección e identificación de blancos biológicos en matrices ambientales, con una estrategia definida según interferencias y concentración esperada.",
    image: "/servicios/ambiente.jpg",
    accent: "#218491",
    services: ["ADN ambiental", "Monitoreo microbiano", "Confirmación molecular de aislados", "Detección de blancos específicos", "Estudios exploratorios"],
    samples: ["Agua", "Suelo", "Sedimento", "Sustratos", "Biofilm", "Cultivos ambientales"],
    techniques: ["Extracción de ADN", "PCR", "qPCR", "16S / ITS", "Secuenciación"],
    deliverables: ["Informe molecular", "Descripción de metodología", "Resultados por muestra", "Datos de secuencia bajo alcance"],
  },
  {
    slug: "investigacion-y-bioinformatica",
    number: "07",
    title: "Investigación y bioinformática",
    shortTitle: "Investigación",
    eyebrow: "Tesis e I+D",
    description: "Acompañamiento para convertir preguntas científicas en flujos moleculares reproducibles, datos organizados e interpretaciones defendibles.",
    image: "/scientist-laptop.png",
    accent: "#a04f72",
    services: ["Diseño de primers", "Revisión de estrategia experimental", "Estandarización de protocolos", "Análisis de secuencias", "Apoyo para tesis y proyectos"],
    samples: ["Muestras del proyecto", "ADN o ARN", "Secuencias", "Cultivos", "Bases de datos definidas"],
    techniques: ["Diseño in silico", "PCR", "Secuenciación", "Alineamiento", "Análisis filogenético"],
    deliverables: ["Protocolo acordado", "Informe bioinformático", "Gráficos y tablas", "Archivos de análisis"],
  },
  {
    slug: "desarrollos-a-medida",
    number: "08",
    title: "Desarrollos moleculares a medida",
    shortTitle: "A medida",
    eyebrow: "Proyectos especiales",
    description: "Evaluación de factibilidad para blancos, organismos o matrices que necesitan una estrategia distinta a un análisis de rutina.",
    image: "/proteinmole.png",
    accent: "#3d7467",
    services: ["Paneles multiblanco", "Diseño de flujos analíticos", "Validación técnica", "Optimización de extracción", "Proyectos de vigilancia"],
    samples: ["Matrices no convencionales", "Nuevos organismos", "Muestras piloto", "Material de validación"],
    techniques: ["Revisión bibliográfica", "Diseño experimental", "PCR / qPCR", "Secuenciación", "Análisis estadístico"],
    deliverables: ["Informe de factibilidad", "Plan técnico", "Resultados de validación", "Recomendaciones de implementación"],
  },
]

export function getExcellentService(slug: string) {
  return excellentServices.find((service) => service.slug === slug)
}
