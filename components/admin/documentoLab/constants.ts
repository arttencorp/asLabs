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

// ─── Esquema de campos extra por servicio ────────────────────────
// Define qué campos adicionales (res_ens_data_extra_json) requiere cada servicio.
// Se usa el serv_id_int como clave.
export interface CampoExtraSchema {
  key: string          // clave en el JSON (ej: "halo_c1")
  label: string        // etiqueta visible
  type: 'number' | 'text' | 'select'  // tipo de input
  placeholder?: string
  options?: { value: string; label: string }[]  // solo para type='select'
  unidad?: string      // unidad de medida (ej: "mm")
}

export interface ServicioExtraConfig {
  nombre: string              // nombre legible del servicio
  descripcion: string         // para tooltip / ayuda
  campos: CampoExtraSchema[]
}

export const CAMPOS_EXTRA_POR_SERVICIO: Record<number, ServicioExtraConfig> = {
  // Prueba de Susceptibilidad (sensibilidad a fungicidas)
  1: {
    nombre: 'Susceptibilidad a Fungicidas',
    descripcion: 'Registrar diámetro de halo de inhibición por concentración',
    campos: [
      { key: 'halo_c1', label: 'Halo C1', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'halo_c2', label: 'Halo C2', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'halo_c3', label: 'Halo C3', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'interpretacion', label: 'Interpretación', type: 'select', options: [
        { value: 'sensible', label: 'Sensible (S)' },
        { value: 'intermedio', label: 'Intermedio (I)' },
        { value: 'resistente', label: 'Resistente (R)' },
      ]},
    ],
  },
  // Sensibilidad comparativa in vitro
  2: {
    nombre: 'Sensibilidad comparativa in vitro',
    descripcion: 'Registrar diámetro de halo de inhibición por concentración',
    campos: [
      { key: 'halo_c1', label: 'Halo C1', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'halo_c2', label: 'Halo C2', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'halo_c3', label: 'Halo C3', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'interpretacion', label: 'Interpretación', type: 'select', options: [
        { value: 'sensible', label: 'Sensible (S)' },
        { value: 'intermedio', label: 'Intermedio (I)' },
        { value: 'resistente', label: 'Resistente (R)' },
      ]},
    ],
  },
  // Sensibilidad Desinfectante
  3: {
    nombre: 'Sensibilidad a Desinfectante',
    descripcion: 'Registrar diámetro de halo de inhibición por concentración',
    campos: [
      { key: 'halo_c1', label: 'Halo C1', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'halo_c2', label: 'Halo C2', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'halo_c3', label: 'Halo C3', type: 'number', placeholder: 'mm', unidad: 'mm' },
      { key: 'interpretacion', label: 'Interpretación', type: 'select', options: [
        { value: 'eficaz', label: 'Eficaz' },
        { value: 'parcial', label: 'Parcialmente eficaz' },
        { value: 'ineficaz', label: 'Ineficaz' },
      ]},
    ],
  },
  // Antagonismo in vitro (dual culture)
  4: {
    nombre: 'Antagonismo in vitro',
    descripcion: 'Registrar porcentaje de inhibición y zona de interacción',
    campos: [
      { key: 'porcentaje_inhibicion', label: '% Inhibición', type: 'number', placeholder: '%', unidad: '%' },
      { key: 'zona_interaccion', label: 'Zona de interacción', type: 'select', options: [
        { value: 'tipo_A', label: 'Tipo A – Sobreposición' },
        { value: 'tipo_B', label: 'Tipo B – Detención al contacto' },
        { value: 'tipo_C', label: 'Tipo C – Inhibición a distancia' },
        { value: 'tipo_D', label: 'Tipo D – Sin efecto' },
      ]},
    ],
  },
  // Análisis de Suelos (Análisis agrícola completo – AMPLIADO)
  5: {
    nombre: 'Análisis de Suelos Ampliado',
    descripcion: 'Clasificación descriptiva del parámetro analizado',
    campos: [
      { key: 'estado_escala', label: 'Escala descriptiva', type: 'select', options: [
        { value: 'muy_bajo', label: 'Muy Bajo' },
        { value: 'bajo', label: 'Bajo' },
        { value: 'medio', label: 'Medio' },
        { value: 'alto', label: 'Alto' },
        { value: 'muy_alto', label: 'Muy Alto' },
      ]},
      { key: 'clasificacion_textura', label: 'Clase textural', type: 'select', options: [
        { value: 'arenoso', label: 'Arenoso' },
        { value: 'franco_arenoso', label: 'Franco Arenoso' },
        { value: 'franco', label: 'Franco' },
        { value: 'franco_arcilloso', label: 'Franco Arcilloso' },
        { value: 'arcilloso', label: 'Arcilloso' },
      ]},
    ],
  },
  // Análisis microbiológico de agua potable
  6: {
    nombre: 'Análisis de Agua Potable',
    descripcion: 'Norma de referencia y conformidad',
    campos: [
      { key: 'norma_referencia', label: 'Norma Ref.', type: 'text', placeholder: 'Ej: DS N° 031-2010-SA' },
      { key: 'conformidad', label: 'Conformidad', type: 'select', options: [
        { value: 'conforme', label: 'Conforme' },
        { value: 'no_conforme', label: 'No Conforme' },
      ]},
    ],
  },
  // ANÁLISIS DE AGUA (Físico-Químico) – Paquete
  7: {
    nombre: 'Análisis de Agua Físico-Químico',
    descripcion: 'Norma de referencia y conformidad',
    campos: [
      { key: 'norma_referencia', label: 'Norma Ref.', type: 'text', placeholder: 'Ej: DS N° 004-2017-MINAM' },
      { key: 'conformidad', label: 'Conformidad', type: 'select', options: [
        { value: 'conforme', label: 'Conforme' },
        { value: 'no_conforme', label: 'No Conforme' },
      ]},
    ],
  },
  // Prueba de patogenicidad (bacteria aislada)
  8: {
    nombre: 'Prueba de patogenicidad',
    descripcion: 'Resultado de la inoculación en planta indicadora',
    campos: [
      { key: 'planta_indicadora', label: 'Planta indicadora', type: 'text', placeholder: 'Ej: Tomate cv. Rio Grande' },
      { key: 'sintomas', label: 'Síntomas observados', type: 'text', placeholder: 'Describir síntomas' },
      { key: 'resultado_patogenicidad', label: 'Resultado', type: 'select', options: [
        { value: 'positivo', label: 'Patógeno confirmado (+)' },
        { value: 'negativo', label: 'No patógeno (–)' },
      ]},
    ],
  },
}
