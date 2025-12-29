// Tipos para el formulario de convocatoria de trabajo

export interface JobApplicationFormData {
  nombresApellidos: string
  dni: string
  universidadInstituto: string
  ciclo: string
  carrera: string
  puestoActual: string
  areasPreferidas: string[]
  financiamientoTesis: "si" | "no" | "tal_vez"
  linkCurriculum: string
  sobreUsted: string
}

export interface JobPosition {
  id: string
  title: string
  type: "full-time" | "part-time"
  salary: string
  profiles: string[]
  areas: string[]
  benefits: string[]
  requirements: string[]
}

export interface FormFieldOption {
  value: string
  label: string
}

export type FormSubmitStatus = "idle" | "loading" | "success" | "error"
