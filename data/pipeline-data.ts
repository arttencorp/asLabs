export const pipelineData = [
  {
    title: "Secuenciamiento",
    subsections: [
      {
        title: "",
        projects: [
          {
            name: "Secuenciación, ensamblaje y análisis comparativo del genoma de Fusarium oxysporum f. sp. cubense Raza 4",
            id: "SGF-015",
            progress: 0.03,
            location: "Laboratorio de Genómica - Trujillo",
            status: "Colección de muestras",
            researcher: "Tesistas: Guevara Escobar Antonio Victor, Guevara Nuñez Hellem Iveth",
          },
        ],
      },
    ],
  },
  {
    title: "Mejoramiento Genético",
    subsections: [
      {
        title: "Bananos",
        projects: [
          {
            name: "Banano Baby",
            id: "BB-001",
            progress: 0,
            location: "Laboratorio Principal - Trujillo",
            subtitle: "Resistente a Hongos",
            status: "Fase 1 - En espera de inicio",
            researcher: "Antonio Guevara Escobar",
          },
          {
            name: "Banano Cavendish Plus",
            id: "BCP-002",
            progress: 0.25,
            location: "Laboratorio Principal - Trujillo",
            subtitle: "Mayor vida útil post-cosecha",
            status: "Fase 1 - Investigación Preliminar",
          },
          {
            name: "Banano Orgánico Premium",
            id: "BOP-003",
            progress: 0.15,
            location: "Campo Experimental - La Libertad",
            subtitle: "Adaptado a cultivo orgánico",
            status: "Fase 1 - Selección de Parentales",
          },
        ],
      },
    ],
  },
  {
    title: "Control Biológico",
    subsections: [
      {
        title: "",
        projects: [
          {
            name: "Trichoderma Nativo",
            id: "TN-007",
            progress: 0.75,
            location: "Laboratorio de Microbiología",
            status: "Fase 3 - Producción Piloto",
          },
          {
            name: "Bacillus Biocontrolador",
            id: "BB-008",
            progress: 0.55,
            location: "Laboratorio de Microbiología",
            status: "Fase 3 - Evaluación de Eficacia",
          },
          {
            name: "Consorcio Microbiano",
            id: "CM-009",
            progress: 0.3,
            location: "Laboratorio de Microbiología",
            status: "Fase 2 - Optimización",
          },
          {
            name: "Hongos Entomopatógenos",
            id: "HE-010",
            progress: 0.2,
            location: "Laboratorio Especializado",
            status: "Fase 1 - Aislamiento y Caracterización",
          },
        ],
      },
    ],
  },
  {
    title: "Biotecnología Molecular",
    subsections: [
      {
        title: "",
        projects: [
          {
            name: "Marcadores Moleculares para Resistencia",
            id: "MMR-011",
            progress: 0.65,
            location: "Laboratorio de Biología Molecular",
            status: "Fase 3 - Validación",
          },
          {
            name: "Transformación Genética de Plantas",
            id: "TGP-012",
            progress: 0.4,
            location: "Laboratorio de Biotecnología",
            status: "Fase 2 - Optimización de Protocolos",
          },
          {
            name: "Edición Genética CRISPR",
            id: "EGC-013",
            progress: 0.25,
            location: "Laboratorio Avanzado",
            status: "Fase 1 - Desarrollo de Herramientas",
          },
          {
            name: "Cultivo de Tejidos Vegetales",
            id: "CTV-014",
            progress: 0.8,
            location: "Laboratorio de Cultivo in vitro",
            status: "Fase 3 - Escalamiento",
          },
        ],
      },
    ],
  },
  {
    title: "Investigaciones Terminadas",
    subsections: [
      {
        title: "Clonación de Variedades",
        projects: [
          {
            name: "Clonación Cavendish Williams",
            id: "CCW-001",
            progress: 1,
            location: "Laboratorio de Cultivo in vitro",
            status: "Completado - 2023",
            subtitle: "Protocolo optimizado para producción masiva",
            completedDate: "2023-12-15",
            plantsProduced: "50,000+",
          },
          {
            name: "Clonación Valery",
            id: "CV-002",
            progress: 1,
            location: "Laboratorio de Cultivo in vitro",
            status: "Completado - 2023",
            subtitle: "Resistente a enfermedades foliares",
            completedDate: "2023-11-20",
            plantsProduced: "35,000+",
          },
          {
            name: "Clonación Baby Banano",
            id: "CBB-003",
            progress: 1,
            location: "Laboratorio de Cultivo in vitro",
            status: "Completado - 2024",
            subtitle: "Variedad premium para exportación",
            completedDate: "2024-03-10",
            plantsProduced: "25,000+",
          },
          {
            name: "Clonación Plátano Rojo",
            id: "CPR-004",
            progress: 1,
            location: "Laboratorio de Cultivo in vitro",
            status: "Completado - 2024",
            subtitle: "Alto valor nutricional y comercial",
            completedDate: "2024-05-22",
            plantsProduced: "15,000+",
          },
          {
            name: "Clonación Plátano Dominico Hartón",
            id: "CPDH-005",
            progress: 1,
            location: "Laboratorio de Cultivo in vitro",
            status: "Completado - 2024",
            subtitle: "Variedad tradicional mejorada",
            completedDate: "2024-07-18",
            plantsProduced: "20,000+",
          },
          {
            name: "Clonación Piña Golden",
            id: "CPG-006",
            progress: 1,
            location: "Laboratorio de Cultivo in vitro",
            status: "Completado - 2024",
            subtitle: "Dulzor excepcional y resistencia",
            completedDate: "2024-09-30",
            plantsProduced: "12,000+",
          },
        ],
      },
    ],
  },
]

// Extraer las secciones específicas para usar en diferentes páginas
export const ingenieriaGenetica = pipelineData.find((item) => item.title === "Mejoramiento Genético")?.subsections || []
export const clonacionPlantas = [
  {
    title: "Propagación Masiva",
    projects: [
      {
        name: "Banano Resistente a Fusarium",
        id: "BRF-016",
        progress: 0.15,
        location: "Laboratorio de Cultivo in vitro",
        subtitle: "Clonación masiva",
        status: "En investigación",
      },
    ],
  },
]
export const controlBiologico = pipelineData.find((item) => item.title === "Control Biológico")?.subsections || []
export const materialesEducativos = []
export const secuenciamiento = pipelineData.find((item) => item.title === "Secuenciamiento")?.subsections || []
export const investigacionesTerminadas =
  pipelineData.find((item) => item.title === "Investigaciones Terminadas")?.subsections || []
