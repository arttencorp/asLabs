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
  observacion: string
}

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
  firma?: string
  fechaEmision: string
  codigoDocumento: string
  conclusiones?: string
  createdAt: Date
}
