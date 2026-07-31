export type ResearchMilestoneStatus = "completed" | "active" | "pending"

export type ResearchProjectDetail = {
  slug: string
  code: string
  line: string
  eyebrow: string
  title: string
  shortTitle: string
  summary: string
  heroImage: string
  heroImageAlt: string
  theme: "leaf" | "cyan" | "blue" | "indigo" | "violet"
  status: string
  phase: string
  progress: number
  period: string
  location: string
  scientificFocus: string
  context: string[]
  objective: string
  specificObjectives: string[]
  methodology: Array<{
    title: string
    description: string
  }>
  milestones: Array<{
    title: string
    description: string
    status: ResearchMilestoneStatus
  }>
  expectedOutputs: Array<{
    title: string
    description: string
  }>
  team: Array<{
    name: string
    role: string
    focus: string
  }>
}

export const researchProjects: Record<string, ResearchProjectDetail> = {
  "banano-baby": {
    slug: "banano-baby",
    code: "BB-001",
    line: "Mejoramiento genético",
    eyebrow: "Biotecnología vegetal",
    title: "Banano Baby resistente a hongos",
    shortTitle: "Banano Baby",
    summary:
      "Investigación orientada a desarrollar materiales con una respuesta mejorada frente a hongos fitopatógenos mediante herramientas de ingeniería genética y cultivo in vitro.",
    heroImage: "/plantines/bananoBabyBBG.jpeg",
    heroImageAlt: "Plantines de banano Baby en desarrollo controlado",
    theme: "leaf",
    status: "Investigación en curso",
    phase: "Fase 1 · Preparación experimental",
    progress: 0,
    period: "2024–2026",
    location: "Laboratorio principal · Trujillo",
    scientificFocus: "Resistencia antifúngica",
    context: [
      "El banano Baby es un cultivo de interés comercial expuesto a enfermedades causadas por Fusarium oxysporum, Mycosphaerella fijiensis y Colletotrichum musae.",
      "El proyecto estudia una estrategia de defensa basada en genes de quitinasa. Estas enzimas degradan la quitina de la pared celular de hongos y podrían reforzar la respuesta de la planta.",
    ],
    objective:
      "Desarrollar y evaluar materiales de banano Baby con resistencia mejorada a hongos fitopatógenos mediante transformación genética y regeneración in vitro.",
    specificObjectives: [
      "Seleccionar y optimizar genes de quitinasa con potencial antifúngico.",
      "Diseñar construcciones genéticas y marcadores de selección adecuados.",
      "Establecer un protocolo reproducible de transformación y regeneración.",
      "Evaluar la respuesta de los materiales obtenidos frente a hongos objetivo.",
    ],
    methodology: [
      {
        title: "Diseño genético",
        description: "Selección de genes de quitinasa, promotores y marcadores para construir el vector de trabajo.",
      },
      {
        title: "Transformación",
        description: "Introducción de la construcción mediante Agrobacterium tumefaciens y el sistema de plásmido Ti.",
      },
      {
        title: "Regeneración in vitro",
        description: "Cultivo y selección de tejidos transformados hasta la obtención de plantas completas.",
      },
      {
        title: "Evaluación",
        description: "Confirmación molecular y pruebas controladas de respuesta frente a los patógenos priorizados.",
      },
    ],
    milestones: [
      {
        title: "Diseño y viabilidad",
        description: "Revisión científica, alcance técnico y diseño experimental del proyecto.",
        status: "completed",
      },
      {
        title: "Base de datos experimental",
        description: "Estructura digital para el seguimiento de materiales, cultivos y resultados.",
        status: "completed",
      },
      {
        title: "Selección de genes",
        description: "Estudio de genes que expresan quitinasa y de sus condiciones de expresión.",
        status: "active",
      },
      {
        title: "Transformación y validación",
        description: "Inicio experimental sujeto a la preparación de insumos y equipamiento especializado.",
        status: "pending",
      },
    ],
    expectedOutputs: [
      {
        title: "Protocolo reproducible",
        description: "Ruta documentada de transformación, selección y regeneración para banano Baby.",
      },
      {
        title: "Materiales caracterizados",
        description: "Líneas candidatas evaluadas molecularmente antes de avanzar a pruebas controladas.",
      },
      {
        title: "Menor presión química",
        description: "Base científica para explorar alternativas que reduzcan la dependencia de fungicidas.",
      },
    ],
    team: [
      {
        name: "Antonio Guevara Escobar",
        role: "Investigador responsable",
        focus: "Diseño del proyecto, análisis de datos y biotecnología aplicada.",
      },
    ],
  },
  "bioreactores-bacterianos": {
    slug: "bioreactores-bacterianos",
    code: "DPBSB-002",
    line: "Ingeniería biológica",
    eyebrow: "Escalamiento biotecnológico",
    title: "Bioreactores para suspensiones bacterianas",
    shortTitle: "Bioreactores bacterianos",
    summary:
      "Diseño y optimización de sistemas de fermentación de bajo costo para producir agentes bacterianos de control biológico con parámetros controlados.",
    heroImage: "/research/research-lab.png",
    heroImageAlt: "Investigación en laboratorio para producción de suspensiones bacterianas",
    theme: "cyan",
    status: "Investigación programada",
    phase: "Fase 1 · Diseño conceptual",
    progress: 0,
    period: "2027–2028",
    location: "Laboratorio de microbiología · Trujillo",
    scientificFocus: "Fermentación de 10 a 50 L",
    context: [
      "La producción consistente de microorganismos para control biológico exige controlar pH, oxígeno disuelto, temperatura, aireación y agitación.",
      "El proyecto propone un sistema modular adaptado a condiciones locales, con una ruta de escalamiento que empieza en 10 litros y llega a 50 litros de capacidad útil.",
    ],
    objective:
      "Diseñar, construir y optimizar bioreactores de bajo costo para producir suspensiones bacterianas de calidad controlada y con capacidad de escalamiento.",
    specificObjectives: [
      "Diseñar un prototipo modular para cepas bacterianas de interés agrícola.",
      "Optimizar pH, temperatura, aireación y velocidad de agitación.",
      "Desarrollar protocolos de monitoreo y control de calidad en tiempo real.",
      "Evaluar viabilidad, pureza y estabilidad de las suspensiones producidas.",
      "Validar el escalamiento de 10 a 50 litros y documentar procedimientos operativos.",
    ],
    methodology: [
      {
        title: "Ingeniería de diseño",
        description: "Modelamiento del proceso, balance de variables y definición de componentes del sistema.",
      },
      {
        title: "Fermentación controlada",
        description: "Monitoreo de pH, oxígeno, temperatura y densidad óptica durante el cultivo.",
      },
      {
        title: "Optimización",
        description: "Ensayos comparativos para determinar condiciones de crecimiento por cepa.",
      },
      {
        title: "Control de calidad",
        description: "Evaluación de viabilidad, pureza, estabilidad y potencia biológica de cada lote.",
      },
    ],
    milestones: [
      {
        title: "Diseño conceptual",
        description: "Configuración de operación, criterios de escalamiento y requerimientos técnicos.",
        status: "active",
      },
      {
        title: "Prototipo de 10 L",
        description: "Construcción y calibración del primer equipo a escala piloto.",
        status: "pending",
      },
      {
        title: "Optimización de fermentación",
        description: "Definición experimental de condiciones por microorganismo.",
        status: "pending",
      },
      {
        title: "Escalamiento a 50 L",
        description: "Validación técnica, económica y operativa del sistema ampliado.",
        status: "pending",
      },
    ],
    expectedOutputs: [
      {
        title: "Prototipo modular",
        description: "Bioreactor documentado, calibrado y adaptable a distintas cepas bacterianas.",
      },
      {
        title: "Parámetros definidos",
        description: "Ventanas de operación y criterios de control para una producción consistente.",
      },
      {
        title: "Ruta de escalamiento",
        description: "Procedimientos para pasar de la etapa piloto a volúmenes de producción mayores.",
      },
    ],
    team: [
      {
        name: "Andy Hassan Espinales Gutiérrez",
        role: "Investigador",
        focus: "Microbiología agroindustrial, fermentación y producción de microorganismos.",
      },
      {
        name: "Luis Alonso Flores Ramírez",
        role: "Investigador",
        focus: "Operación de equipos y construcción de sistemas de fermentación a pequeña escala.",
      },
    ],
  },
  "fusarium-genoma": {
    slug: "fusarium-genoma",
    code: "Foc R4",
    line: "Genómica de fitopatógenos",
    eyebrow: "Biología molecular",
    title: "Genoma de Fusarium oxysporum Raza 4",
    shortTitle: "Genoma de Fusarium",
    summary:
      "Secuenciación, ensamblaje y análisis comparativo para reconocer genes de virulencia y mecanismos asociados a la patogenicidad del agente causal del Mal de Panamá.",
    heroImage: "/lab-header-bg.jpg",
    heroImageAlt: "Trabajo de genómica y secuenciación en laboratorio",
    theme: "blue",
    status: "Investigación en curso",
    phase: "Fase 0 · Preparación de muestras",
    progress: 3,
    period: "2024–2025",
    location: "Laboratorio de genómica · Trujillo",
    scientificFocus: "Genoma completo y virulencia",
    context: [
      "Fusarium oxysporum f. sp. cubense Raza 4 es un patógeno de suelo asociado al Mal de Panamá y representa una amenaza relevante para los sistemas productivos de banano.",
      "Comprender su arquitectura genómica permite formular preguntas más precisas sobre virulencia, evolución, diagnóstico y posibles estrategias de manejo.",
    ],
    objective:
      "Obtener y analizar el genoma de Foc R4 para identificar factores de virulencia, comparar su estructura con otras razas y generar información útil para diagnóstico e investigación aplicada.",
    specificObjectives: [
      "Extraer ADN genómico con calidad adecuada para secuenciación masiva.",
      "Ensamblar y evaluar la completitud del genoma de referencia.",
      "Identificar genes candidatos asociados a virulencia y patogenicidad.",
      "Comparar el genoma con otras razas y desarrollar marcadores moleculares.",
    ],
    methodology: [
      {
        title: "Aislamiento y cultivo",
        description: "Obtención de cultivos puros y verificación de material biológico antes del análisis.",
      },
      {
        title: "Extracción de ADN",
        description: "Purificación de ADN genómico de alta calidad con protocolos para hongos filamentosos.",
      },
      {
        title: "Secuenciación NGS",
        description: "Generación de lecturas de nueva generación con cobertura suficiente para el ensamblaje.",
      },
      {
        title: "Análisis comparativo",
        description: "Ensamblaje de novo, anotación funcional y comparación con genomas relacionados.",
      },
    ],
    milestones: [
      {
        title: "Diseño metodológico",
        description: "Revisión bibliográfica, definición de alcance y selección de herramientas.",
        status: "completed",
      },
      {
        title: "Obtención de cultivos",
        description: "Aislamiento y cultivo controlado de las muestras priorizadas.",
        status: "completed",
      },
      {
        title: "Extracción de ADN",
        description: "Optimización de pureza, integridad y concentración del material genómico.",
        status: "active",
      },
      {
        title: "Secuenciación y ensamblaje",
        description: "Generación de lecturas, control de calidad y construcción del genoma.",
        status: "pending",
      },
    ],
    expectedOutputs: [
      {
        title: "Genoma de referencia",
        description: "Ensamblaje evaluado con métricas de calidad y completitud documentadas.",
      },
      {
        title: "Genes candidatos",
        description: "Conjunto priorizado de factores asociados a virulencia y patogenicidad.",
      },
      {
        title: "Marcadores moleculares",
        description: "Base para diseñar herramientas de diagnóstico y estudios comparativos posteriores.",
      },
    ],
    team: [
      {
        name: "Equipo de Genómica AS Laboratorios",
        role: "Investigación y análisis",
        focus: "Preparación de muestras, secuenciación y bioinformática aplicada.",
      },
    ],
  },
  "secuenciamiento-fusarium": {
    slug: "secuenciamiento-fusarium",
    code: "SGF-015",
    line: "Secuenciamiento",
    eyebrow: "Proyecto de tesis e investigación",
    title: "Secuenciación de Fusarium oxysporum Raza 4",
    shortTitle: "Secuenciación Foc R4",
    summary:
      "Proyecto de secuenciación, ensamblaje y anotación de aislados peruanos para fortalecer el conocimiento local sobre el patógeno asociado al banano.",
    heroImage: "/laboratory-research.png",
    heroImageAlt: "Investigación molecular y procesamiento de muestras en laboratorio",
    theme: "indigo",
    status: "Investigación en curso",
    phase: "Colección y preparación de muestras",
    progress: 3,
    period: "Enero 2024–Agosto 2025",
    location: "Trujillo, La Libertad · Perú",
    scientificFocus: "Aislados peruanos y bioinformática",
    context: [
      "La presencia de Foc R4T en el país hace necesario desarrollar capacidades locales para su detección y caracterización molecular.",
      "El proyecto integra trabajo de laboratorio y análisis bioinformático para estudiar aislados vinculados al contexto productivo peruano y generar evidencia trazable.",
    ],
    objective:
      "Secuenciar, ensamblar y anotar el genoma completo de Fusarium oxysporum f. sp. cubense Raza 4 para reconocer factores de virulencia y aportar herramientas de análisis molecular.",
    specificObjectives: [
      "Obtener un ensamblaje de referencia con controles de calidad documentados.",
      "Anotar genes y priorizar aquellos relacionados con patogenicidad.",
      "Comparar aislados con genomas de otras razas de F. oxysporum.",
      "Establecer relaciones filogenéticas y preparar productos académicos.",
    ],
    methodology: [
      {
        title: "Secuenciación NGS",
        description: "Preparación de librerías, lectura paired-end y control de calidad de los datos.",
      },
      {
        title: "Ensamblaje de novo",
        description: "Construcción y refinamiento del genoma con herramientas bioinformáticas especializadas.",
      },
      {
        title: "Anotación funcional",
        description: "Predicción de genes, dominios proteicos y posibles factores de virulencia.",
      },
      {
        title: "Filogenómica",
        description: "Comparación de ortólogos, sintenia y relaciones evolutivas con genomas relacionados.",
      },
    ],
    milestones: [
      {
        title: "Colección de muestras",
        description: "Registro, selección y trazabilidad de aislados procedentes de zonas productivas.",
        status: "active",
      },
      {
        title: "Identificación molecular",
        description: "Confirmación de identidad mediante genes marcadores y controles de pureza.",
        status: "pending",
      },
      {
        title: "Secuenciación y ensamblaje",
        description: "Preparación de librerías, obtención de lecturas y ensamblaje del genoma.",
        status: "pending",
      },
      {
        title: "Análisis y comunicación",
        description: "Anotación, comparación, redacción de tesis y preparación de productos científicos.",
        status: "pending",
      },
    ],
    expectedOutputs: [
      {
        title: "Producto académico",
        description: "Tesis con metodología, resultados, discusión y trazabilidad del proyecto.",
      },
      {
        title: "Base genómica",
        description: "Secuencia ensamblada y anotada, preparada para su revisión y depósito correspondiente.",
      },
      {
        title: "Herramientas moleculares",
        description: "Información para el diseño de primers y marcadores específicos del patógeno.",
      },
    ],
    team: [
      {
        name: "Antonio Victor Guevara Escobar",
        role: "Tesista",
        focus: "Trabajo de laboratorio, extracción de ADN y análisis bioinformático.",
      },
      {
        name: "Hellem Iveth Guevara Nuñez",
        role: "Tesista",
        focus: "Aislamiento de patógenos, caracterización molecular y análisis filogenético.",
      },
    ],
  },
  "trichoderma-fusarium": {
    slug: "trichoderma-fusarium",
    code: "CATFOM-001",
    line: "Control biológico",
    eyebrow: "Microbiología aplicada",
    title: "Trichoderma contra Fusarium oxysporum",
    shortTitle: "Trichoderma vs. Fusarium",
    summary:
      "Caracterización del potencial antagonista de cepas nativas de Trichoderma y de los mecanismos moleculares asociados al biocontrol de Fusarium oxysporum Raza 2.",
    heroImage: "/control-biologico.png",
    heroImageAlt: "Investigación de microorganismos para control biológico",
    theme: "violet",
    status: "Investigación en curso",
    phase: "Fase 2 · Caracterización",
    progress: 55,
    period: "2027",
    location: "La Libertad · Perú",
    scientificFocus: "Antagonismo y metabolitos",
    context: [
      "Fusarium oxysporum Raza 2 puede causar marchitamiento vascular en cultivos de importancia agrícola y su manejo exclusivamente químico presenta limitaciones.",
      "La investigación estudia cepas nativas de Trichoderma, su capacidad de inhibición, los metabolitos producidos y la expresión de genes vinculados al antagonismo.",
    ],
    objective:
      "Caracterizar los mecanismos de antagonismo de cepas nativas de Trichoderma frente a Fusarium oxysporum Raza 2 para orientar el desarrollo de formulaciones sostenibles.",
    specificObjectives: [
      "Aislar e identificar molecularmente cepas de Trichoderma de suelos de La Libertad.",
      "Medir su capacidad antagonista mediante cultivos duales controlados.",
      "Caracterizar metabolitos y enzimas con posible actividad antifúngica.",
      "Estudiar genes implicados en el antagonismo y proponer mecanismos de biocontrol.",
    ],
    methodology: [
      {
        title: "Cultivos duales",
        description: "Medición de la inhibición del crecimiento en distintos medios y condiciones.",
      },
      {
        title: "Análisis bioquímico",
        description: "Caracterización de metabolitos secundarios y enzimas degradativas.",
      },
      {
        title: "Análisis molecular",
        description: "Identificación de aislados y evaluación de expresión génica mediante qRT-PCR.",
      },
      {
        title: "Pruebas de eficacia",
        description: "Evaluación del efecto antagonista en modelos biológicos controlados.",
      },
    ],
    milestones: [
      {
        title: "Aislamiento y caracterización",
        description: "Obtención de cepas nativas y confirmación molecular de su identidad.",
        status: "completed",
      },
      {
        title: "Antagonismo in vitro",
        description: "Comparación de la capacidad inhibitoria de los aislados seleccionados.",
        status: "active",
      },
      {
        title: "Metabolitos y expresión",
        description: "Caracterización bioquímica y evaluación de genes relacionados con biocontrol.",
        status: "pending",
      },
      {
        title: "Validación controlada",
        description: "Integración de resultados y pruebas de eficacia en modelos biológicos.",
        status: "pending",
      },
    ],
    expectedOutputs: [
      {
        title: "Cepas priorizadas",
        description: "Selección de aislados con actividad antagonista reproducible en condiciones controladas.",
      },
      {
        title: "Mecanismos descritos",
        description: "Evidencia bioquímica y molecular sobre las rutas que participan en el antagonismo.",
      },
      {
        title: "Base para formulación",
        description: "Criterios técnicos para avanzar hacia productos biológicos y nuevas validaciones.",
      },
    ],
    team: [
      {
        name: "Antonio Victor Gabriel Guevara Escobar",
        role: "Investigador",
        focus: "Análisis de datos, biotecnología y microbiología molecular aplicada.",
      },
      {
        name: "Hellem Iveth Guevara Nuñez",
        role: "Investigadora",
        focus: "Cultivos microbianos y caracterización de patógenos.",
      },
    ],
  },
}

export const researchProjectList = Object.values(researchProjects)
