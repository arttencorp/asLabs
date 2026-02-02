// Constantes para el módulo de Documentos de Laboratorio

// Matrices de muestra disponibles
export const MATRICES_MUESTRA = [
  { value: 'suelo', label: 'Suelo' },
  { value: 'agua', label: 'Agua' },
  { value: 'tejido_vegetal', label: 'Tejido Vegetal' },
  { value: 'raiz', label: 'Raíz' },
  { value: 'hoja', label: 'Hoja' },
  { value: 'tallo', label: 'Tallo' },
  { value: 'fruto', label: 'Fruto' },
  { value: 'semilla', label: 'Semilla' },
  { value: 'alimento', label: 'Alimento' },
  { value: 'superficie', label: 'Superficie' },
  { value: 'otro', label: 'Otro' },
] as const

// Tipos de agentes identificados
export const TIPOS_AGENTE = [
  { value: 'bacteria', label: 'Bacteria' },
  { value: 'hongo', label: 'Hongo' },
  { value: 'virus', label: 'Virus' },
  { value: 'nematodo', label: 'Nematodo' },
  { value: 'insecto', label: 'Insecto' },
  { value: 'otro', label: 'Otro' },
] as const

// Tipos de anexos
export const TIPOS_ANEXO = [
  { value: 'foto_microscopio', label: 'Foto de Microscopio' },
  { value: 'foto_cultivo', label: 'Foto de Cultivo' },
  { value: 'foto_muestra', label: 'Foto de Muestra' },
  { value: 'certificado', label: 'Certificado' },
  { value: 'informe_externo', label: 'Informe Externo' },
  { value: 'otro', label: 'Otro' },
] as const

// Unidades comunes para resultados
export const UNIDADES_RESULTADO = [
  { value: 'UFC/mL', label: 'UFC/mL' },
  { value: 'UFC/g', label: 'UFC/g' },
  { value: 'UFC/cm²', label: 'UFC/cm²' },
  { value: 'NMP/100mL', label: 'NMP/100mL' },
  { value: 'mg/L', label: 'mg/L' },
  { value: 'mg/kg', label: 'mg/kg' },
  { value: '%', label: '%' },
  { value: 'ppm', label: 'ppm' },
  { value: 'pH', label: 'pH' },
  { value: 'mS/cm', label: 'mS/cm' },
  { value: 'meq/100g', label: 'meq/100g' },
  { value: 'presencia/ausencia', label: 'Presencia/Ausencia' },
  { value: 'positivo/negativo', label: 'Positivo/Negativo' },
  { value: 'otro', label: 'Otro' },
] as const

// Métodos de análisis comunes
export const METODOS_ANALISIS = [
  { value: 'recuento_placa', label: 'Recuento en placa' },
  { value: 'nmp', label: 'Número más probable (NMP)' },
  { value: 'pcr', label: 'PCR' },
  { value: 'elisa', label: 'ELISA' },
  { value: 'tincion_gram', label: 'Tinción Gram' },
  { value: 'bioquimico', label: 'Pruebas bioquímicas' },
  { value: 'espectrofotometria', label: 'Espectrofotometría' },
  { value: 'gravimetria', label: 'Gravimetría' },
  { value: 'volumetria', label: 'Volumetría' },
  { value: 'microscopia', label: 'Microscopía' },
  { value: 'cultivo', label: 'Cultivo' },
  { value: 'aislamiento', label: 'Aislamiento' },
  { value: 'otro', label: 'Otro' },
] as const

// Reinos taxonómicos
export const REINOS_TAXONOMICOS = [
  { value: 'bacteria', label: 'Bacteria' },
  { value: 'fungi', label: 'Fungi' },
  { value: 'plantae', label: 'Plantae' },
  { value: 'animalia', label: 'Animalia' },
  { value: 'protista', label: 'Protista' },
  { value: 'chromista', label: 'Chromista' },
  { value: 'archaea', label: 'Archaea' },
] as const

// Texto por defecto para declaraciones según área
export const DECLARACIONES_AREA: Record<string, string> = {
  bacteriologia: `Este documento registra la información declarada por el remitente y la evaluación preanalítica realizada al momento de la recepción, además de resultados de tamizaje y pruebas bioquímicas según el alcance solicitado. La identificación puede ser presuntiva o confirmatoria dependiendo del panel aplicado, controles y consistencia del patrón bioquímico.`,
  fitopatologia: `Los resultados corresponden exclusivamente a la(s) muestra(s) analizada(s) y no pueden extrapolarse a lotes o poblaciones completas. La identificación se basa en características morfológicas y/o moleculares según el método aplicado.`,
  suelo: `Los resultados presentados corresponden a las condiciones de la muestra al momento de su recepción en el laboratorio. Las recomendaciones de manejo deben ser evaluadas por un profesional agrónomo considerando las condiciones específicas del cultivo y zona.`,
  ambiente: `Los resultados del análisis microbiológico son válidos únicamente para la muestra analizada en las condiciones de recepción. La interpretación debe realizarse según la normativa vigente aplicable.`,
  default: `Los resultados corresponden exclusivamente a la(s) muestra(s) analizada(s) bajo las condiciones especificadas en este documento.`,
}

// Colores para estados de documento
export const COLORES_ESTADO: Record<string, { bg: string; text: string; border: string }> = {
  borrador: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  pendiente: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  en_proceso: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  emitido: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  anulado: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
}

// Estado inicial del documento
export const ESTADO_INICIAL_DOCUMENTO = 'borrador'

// Prefijos de código por tipo de documento
export const PREFIJOS_DOCUMENTO: Record<string, string> = {
  certificado: 'CERT',
  informe: 'INF',
  default: 'DOC',
}

// Información de la empresa para documentos
export const INFO_EMPRESA = {
  nombre: 'AS LABORATORIOS',
  ruc: '20482456291',
  direccionCentral: 'Jr. Huancavelica 315, II Piso, Urb. Palermo',
  direccionLab: 'Mz J1 II Piso, Urb. San Isidro 2da Etapa',
  ciudad: 'Trujillo',
  departamento: 'La Libertad',
  pais: 'Perú',
  telefono: '044-123456',
  email: 'contacto@aslaboratorios.com',
  web: 'www.aslaboratorios.com',
}

// Columnas para tabla de documentos
export const COLUMNAS_TABLA_DOCUMENTOS = [
  { key: 'codigo', label: 'Código', sortable: true },
  { key: 'tipo', label: 'Tipo', sortable: true },
  { key: 'area', label: 'Área', sortable: true },
  { key: 'cliente', label: 'Cliente', sortable: true },
  { key: 'fecha', label: 'Fecha Emisión', sortable: true },
  { key: 'estado', label: 'Estado', sortable: true },
  { key: 'acciones', label: 'Acciones', sortable: false },
] as const
