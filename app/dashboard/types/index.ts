export type DocumentType = "certificado" | "informe"
export type ServiceArea = "suelo" | "fitopatologia" | "ambiente" | "microbiologicos" | "biotecnologia" | "bacteriologia"
export type MatrixType = "suelo" | "agua" | "tejido" | "alimento" | "superficie" | "plantin" | "cultivo" | "otro"

export interface Service {
  area: ServiceArea
  servicio: string
  alcance: string
  costo: number
  moneda: "PEN"
}

export interface Client {
  razonSocial: string
  ruc: string
  contacto: string
  email: string
  telefono: string
  direccion: string
  proyecto: string
}

export interface Sample {
  codigoMuestra: string
  tipoMatriz: MatrixType
  fechaToma: string
  lugarMuestreo: string
  lugarRegistro: string
  centroRegistro: string
  fechaRecepcion: string
  fechaAnalisis: string
  coordenadas?: string
  observaciones: string
}

export interface Evidence {
  id: string
  archivo: string
  titulo: string
  fecha: string
  sampleId: string
}

export interface ResultRow {
  parametro: string
  resultado: string
  unidad: string
  metodo: string
  observaciones?: string
  observacion?: string
  valorReferencial?: {
    min?: number
    max?: number
    showChart?: boolean
  }
}

export interface BacterialAnalysis {
  mediostilizados?: string[]
  temperatura?: string
  atmosfera?: string[]
  tiempoIncubacion?: string
  tamanoColonia?: string[]
  forma?: string[]
  borde?: string[]
  elevacion?: string[]
  superficie?: string[]
  pigmento?: string
  gramPositivo?: boolean
  gramNegativo?: boolean
  morfologia?: string[]
  arreglo?: string[]
  notas?: string
}

export interface QCControl {
  loteMedios?: string
  venceMedios?: string
  controlPositivoAplicado?: boolean
  controlPositivoCepa?: string
  controlNegativoAplicado?: boolean
  controlNegativoCepa?: string
  incubadoraVerificada?: boolean
  temperaturaRegistrada?: string
  desviaciones?: string
}

export interface TaxonomicInterpretation {
  grupoProbable?: string[]
  generoIdentificado?: string
  especieIdentificada?: string
  nivelConfianza?: "alto" | "medio" | "bajo"
  baseAsignacion?: string[]
  limitacionesTecnicas?: string[]
  recomendacionConfirmacion?: string[]
  notas?: string
}

export interface PhotographicRegistry {
  figura?: string
  nota?: string
  imagenes?: Array<{
    id: string
    url: string
    titulo?: string
    descripcion?: string
  }>
}

export interface Signature {
  id: string
  nombre: string
  cargo: string
  fecha: string
  imagen?: string
}

import type { ServiceSchema } from "./schemas"

export interface Document {
  id: string
  tipo: DocumentType
  area: ServiceArea
  servicio: Service
  cliente: Client
  muestras: Sample[]
  evidencias: Evidence[]
  resultados: ResultRow[]
  responsable: string
  firmas: Signature[]
  fechaEmision: string
  codigoDocumento: string
  conclusiones?: string
  createdAt: Date
  serviceSchema?: ServiceSchema
  serviceResults?: Record<string, any>
  bacterialAnalysis?: BacterialAnalysis
  qcControl?: QCControl
  taxonomicInterpretation?: TaxonomicInterpretation
  photographicRegistry?: PhotographicRegistry
}
