// Tipos para el sistema de schemas dinámicos por servicio
export type SchemaFieldType = "text" | "number" | "select" | "multi-select" | "date" | "textarea" | "list"

export interface SchemaField {
  name: string
  label: string
  type: SchemaFieldType
  required: boolean
  step?: number
  min?: number
  max?: number
  options?: { value: string; label: string }[]
  placeholder?: string
  helpText?: string
}

export interface Referential {
  label: string
  value: string
  range?: { min: number; max: number }
  criteria?: string
  note?: string
  isNormative: boolean // true = norma, false = referencial interno
}

export interface InterpretationRule {
  condition: (values: Record<string, any>) => boolean
  result: string
  description?: string
}

export interface ServiceSchema {
  serviceId: string // combinación "area-servicio"
  area: string
  servicio: string
  resultFields: SchemaField[]
  referencials: Record<string, Referential> // mapeo fieldName -> Referential
  interpretationRules: InterpretationRule[]
  evidenceRequired: {
    type: "foto" | "microfotografia" | "placa" | "opcional"
    minCount: number
    description: string
  }[]
  version: "1.0"
}
