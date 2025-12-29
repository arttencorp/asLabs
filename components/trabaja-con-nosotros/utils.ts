import { JobPosition, FormFieldOption, JobApplicationFormData } from "./types"

// Configuración del email de destino
export const RECRUITMENT_EMAIL = "ventas@aslaboratorios.com"

// Posición actual de la convocatoria
export const currentJobPosition: JobPosition = {
  id: "practicante-microbiologia-2025",
  title: "Practicante en Microbiología, Biología o Técnico en Laboratorio",
  type: "full-time",
  salary: "S/ 1,130 base",
  profiles: [
    "Microbiólogo/a (Full Time)",
    "Biólogo/a (Full Time)",
    "Técnico en Laboratorio (Part Time)",
  ],
  areas: [
    "Biotecnología Vegetal",
    "Embriogénesis Vegetal",
    "Propagación de Plantas",
    "Detección de Patógenos",
    "Cultivo in vitro",
    "Microbiología General",
  ],
  benefits: [
    "Posibilidad de financiamiento de tesis",
    "Ambiente de trabajo científico",
    "Mentoría especializada",
    "Experiencia en proyectos de investigación reales",
    "Certificado de prácticas pre-profesionales",
  ],
  requirements: [
    "Estudiante de últimos ciclos o egresado reciente",
    "Disponibilidad inmediata",
    "Interés en biotecnología y microbiología",
    "Responsabilidad y puntualidad",
  ],
}

// Opciones para el campo de carrera
export const carreraOptions: FormFieldOption[] = [
  { value: "microbiologia", label: "Microbiología" },
  { value: "biologia", label: "Biología" },
  { value: "biotecnologia", label: "Biotecnología" },
  { value: "tecnico_laboratorio", label: "Técnico en Laboratorio" },
  { value: "agronomia", label: "Agronomía" },
  { value: "ingenieria_ambiental", label: "Ingeniería Ambiental" },
  { value: "otro", label: "Otro" },
]

// Opciones para el ciclo académico
export const cicloOptions: FormFieldOption[] = [
  { value: "6", label: "6to Ciclo" },
  { value: "7", label: "7mo Ciclo" },
  { value: "8", label: "8vo Ciclo" },
  { value: "9", label: "9no Ciclo" },
  { value: "10", label: "10mo Ciclo" },
  { value: "egresado", label: "Egresado" },
  { value: "titulado", label: "Titulado" },
]

// Opciones para áreas preferidas
export const areasOptions: FormFieldOption[] = [
  { value: "biotecnologia_vegetal", label: "Biotecnología Vegetal" },
  { value: "embriogenesis", label: "Embriogénesis Vegetal" },
  { value: "propagacion", label: "Propagación de Plantas" },
  { value: "deteccion_patogenos", label: "Detección de Patógenos" },
  { value: "cultivo_invitro", label: "Cultivo in vitro" },
  { value: "microbiologia_general", label: "Microbiología General" },
  { value: "fitopatologia", label: "Fitopatología" },
  { value: "genetica_molecular", label: "Genética Molecular" },
]

// Opciones para financiamiento de tesis
export const financiamientoOptions: FormFieldOption[] = [
  { value: "si", label: "Sí, me interesa" },
  { value: "no", label: "No, gracias" },
  { value: "tal_vez", label: "Tal vez, necesito más información" },
]

// Validación del DNI peruano (8 dígitos)
export function validateDNI(dni: string): boolean {
  return /^\d{8}$/.test(dni)
}

// Validación de URL de Google Drive
export function validateDriveLink(url: string): boolean {
  if (!url) return true // opcional
  return url.includes("drive.google.com") || url.includes("docs.google.com")
}

// Formatear datos del formulario para envío por email
export function formatApplicationEmail(data: JobApplicationFormData): string {
  const areasText = data.areasPreferidas.length > 0 
    ? data.areasPreferidas.map(area => {
        const option = areasOptions.find(opt => opt.value === area)
        return option?.label || area
      }).join(", ")
    : "No especificado"

  const financiamientoText = financiamientoOptions.find(
    opt => opt.value === data.financiamientoTesis
  )?.label || "No especificado"

  return `
NUEVA POSTULACIÓN - Prácticas Pre-Profesionales
================================================

DATOS PERSONALES
----------------
Nombres y Apellidos: ${data.nombresApellidos}
DNI: ${data.dni}

INFORMACIÓN ACADÉMICA
---------------------
Universidad/Instituto: ${data.universidadInstituto}
Ciclo: ${data.ciclo}
Carrera: ${data.carrera}
Puesto actual en centro de estudios: ${data.puestoActual || "No especificado"}

PREFERENCIAS
------------
Áreas de interés: ${areasText}
Interés en financiamiento de tesis: ${financiamientoText}

DOCUMENTOS
----------
Curriculum (Google Drive): ${data.linkCurriculum || "No proporcionado"}

INFORMACIÓN ADICIONAL
---------------------
${data.sobreUsted || "No proporcionado"}

================================================
Fecha de postulación: ${new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
  `.trim()
}

// Generar asunto del email
export function generateEmailSubject(data: JobApplicationFormData): string {
  return `[Postulación] ${data.nombresApellidos} - ${data.carrera} - Prácticas Pre-Profesionales`
}
