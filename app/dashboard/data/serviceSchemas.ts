import type { ServiceSchema } from "../types/schemas"

export const serviceSchemas: Record<string, ServiceSchema> = {
  // MEDIO AMBIENTE
  "ambiente-Medición de pH": {
    serviceId: "ambiente-Medición de pH",
    area: "ambiente",
    servicio: "Medición de pH",
    resultFields: [
      {
        name: "pH",
        label: "pH",
        type: "number",
        required: true,
        step: 0.01,
        min: 0,
        max: 14,
        placeholder: "6.5",
      },
      {
        name: "temperatura",
        label: "Temperatura de medición (°C)",
        type: "number",
        required: true,
        step: 0.1,
        placeholder: "25",
      },
      {
        name: "metodo",
        label: "Método/Equipo",
        type: "select",
        required: true,
        options: [
          { value: "phmetro", label: "pHmetro" },
          { value: "tiras", label: "Tiras de pH" },
          { value: "otro", label: "Otro" },
        ],
      },
      {
        name: "calibracion",
        label: "Calibración (si aplica)",
        type: "text",
        required: false,
        placeholder: "Indicar calibración",
      },
      {
        name: "observacion",
        label: "Observación",
        type: "textarea",
        required: false,
      },
    ],
    referencials: {
      pH: {
        label: "Agua potable (guía general)",
        value: "6.5–8.5",
        range: { min: 6.5, max: 8.5 },
        note: "Referencial para agua potable",
        isNormative: false,
      },
      temperatura: {
        label: "Condición de medición",
        value: "Registrar temperatura",
        note: "Referencial interno",
        isNormative: false,
      },
    },
    interpretationRules: [
      {
        condition: (v) => v.pH >= 6.5 && v.pH <= 8.5,
        result: "Dentro de referencial",
        description: "pH dentro del rango normal",
      },
      {
        condition: (v) => v.pH < 6.5 || v.pH > 8.5,
        result: "Fuera de referencial",
        description: "pH fuera del rango recomendado",
      },
    ],
    evidenceRequired: [],
    version: "1.0",
  },

  "ambiente-Recuento Aerobios Mesófilos": {
    serviceId: "ambiente-Recuento Aerobios Mesófilos",
    area: "ambiente",
    servicio: "Recuento Aerobios Mesófilos",
    resultFields: [
      {
        name: "recuento",
        label: "Recuento (UFC/mL)",
        type: "number",
        required: true,
        min: 0,
        placeholder: "0",
      },
      {
        name: "dilucion",
        label: "Dilución usada",
        type: "text",
        required: true,
        placeholder: "10⁻³",
      },
      {
        name: "medio",
        label: "Medio de cultivo",
        type: "text",
        required: true,
        placeholder: "PCA",
      },
      {
        name: "incubacion",
        label: "Incubación (°C, horas)",
        type: "text",
        required: true,
        placeholder: "37°C, 24 h",
      },
      {
        name: "observacion",
        label: "Observación",
        type: "textarea",
        required: false,
      },
    ],
    referencials: {
      recuento: {
        label: "Criterio depende del uso",
        value: "Definir umbral interno",
        note: "Referencial interno del cliente",
        isNormative: false,
      },
    },
    interpretationRules: [
      {
        condition: () => true,
        result: "Informe detallado",
        description: "Registrar resultado para análisis",
      },
    ],
    evidenceRequired: [],
    version: "1.0",
  },

  "ambiente-Coliformes Totales/Fecales": {
    serviceId: "ambiente-Coliformes Totales/Fecales",
    area: "ambiente",
    servicio: "Coliformes Totales/Fecales",
    resultFields: [
      {
        name: "coliTotales",
        label: "Coliformes totales",
        type: "select",
        required: true,
        options: [
          { value: "detectado", label: "Detectado" },
          { value: "nodetectado", label: "No detectado" },
        ],
      },
      {
        name: "coliFecales",
        label: "Coliformes fecales",
        type: "select",
        required: true,
        options: [
          { value: "detectado", label: "Detectado" },
          { value: "nodetectado", label: "No detectado" },
        ],
      },
      {
        name: "metodo",
        label: "Método",
        type: "text",
        required: true,
        placeholder: "SMEWW 9221 o similar",
      },
      {
        name: "observacion",
        label: "Observación",
        type: "textarea",
        required: false,
      },
    ],
    referencials: {
      coliTotales: {
        label: "Objetivo frecuente",
        value: "No detectado",
        note: "Referencial típico para agua potable",
        isNormative: false,
      },
    },
    interpretationRules: [
      {
        condition: (v) => v.coliTotales === "nodetectado" && v.coliFecales === "nodetectado",
        result: "Conforme",
        description: "Sin detección de coliformes",
      },
      {
        condition: (v) => v.coliTotales === "detectado" || v.coliFecales === "detectado",
        result: "No conforme",
        description: "Presencia de coliformes",
      },
    ],
    evidenceRequired: [],
    version: "1.0",
  },

  "ambiente-Detección de Escherichia coli": {
    serviceId: "ambiente-Detección de Escherichia coli",
    area: "ambiente",
    servicio: "Detección de Escherichia coli",
    resultFields: [
      {
        name: "ecoli",
        label: "E. coli",
        type: "select",
        required: true,
        options: [
          { value: "detectado", label: "Detectado" },
          { value: "nodetectado", label: "No detectado" },
        ],
      },
      {
        name: "pruebas",
        label: "Pruebas de confirmación",
        type: "multi-select",
        required: false,
        options: [
          { value: "imvic", label: "IMViC" },
          { value: "oxidasa", label: "Oxidasa" },
          { value: "otro", label: "Otro" },
        ],
      },
      {
        name: "observacion",
        label: "Observación",
        type: "textarea",
        required: false,
      },
    ],
    referencials: {
      ecoli: {
        label: "Objetivo frecuente",
        value: "No detectado",
        note: "Referencial típico para agua potable",
        isNormative: false,
      },
    },
    interpretationRules: [
      {
        condition: (v) => v.ecoli === "nodetectado",
        result: "Conforme",
      },
      {
        condition: (v) => v.ecoli === "detectado",
        result: "No conforme",
      },
    ],
    evidenceRequired: [],
    version: "1.0",
  },

  // ANÁLISIS DE SUELO
  "suelo-Análisis de Suelos": {
    serviceId: "suelo-Análisis de Suelos",
    area: "suelo",
    servicio: "Análisis de Suelos",
    resultFields: [
      {
        name: "pH",
        label: "pH",
        type: "number",
        required: true,
        step: 0.1,
        placeholder: "6.5",
      },
      {
        name: "ce",
        label: "Conductividad eléctrica (dS/m)",
        type: "number",
        required: true,
        step: 0.01,
        placeholder: "1.0",
      },
      {
        name: "mo",
        label: "Materia orgánica (%)",
        type: "number",
        required: true,
        step: 0.1,
        placeholder: "3.0",
      },
      {
        name: "n",
        label: "N (mg/kg)",
        type: "number",
        required: true,
        step: 0.1,
        placeholder: "50",
      },
      {
        name: "p",
        label: "P (mg/kg)",
        type: "number",
        required: true,
        step: 0.1,
        placeholder: "20",
      },
      {
        name: "k",
        label: "K (cmol/kg)",
        type: "number",
        required: true,
        step: 0.01,
        placeholder: "0.5",
      },
      {
        name: "textura",
        label: "Textura",
        type: "select",
        required: true,
        options: [
          { value: "arenoso", label: "Arenoso" },
          { value: "franco", label: "Franco" },
          { value: "arcilloso", label: "Arcilloso" },
          { value: "otro", label: "Otro" },
        ],
      },
      {
        name: "recomendacion",
        label: "Recomendación",
        type: "textarea",
        required: false,
        placeholder: "Recomendaciones agronómicas...",
      },
      {
        name: "observacion",
        label: "Observación",
        type: "textarea",
        required: false,
      },
    ],
    referencials: {
      pH: {
        label: "Suelo (general)",
        value: "5.5–7.5",
        range: { min: 5.5, max: 7.5 },
        note: "Referencial general para suelos agrícolas",
        isNormative: false,
      },
      ce: {
        label: "Conductividad máxima",
        value: "<2 dS/m",
        range: { min: 0, max: 2 },
        note: "Referencial general",
        isNormative: false,
      },
      mo: {
        label: "Materia orgánica mínima",
        value: ">3%",
        range: { min: 3, max: 100 },
        note: "Referencial general",
        isNormative: false,
      },
    },
    interpretationRules: [
      {
        condition: (v) => v.pH >= 5.5 && v.pH <= 7.5 && v.ce < 2 && v.mo > 3,
        result: "Suelo apto",
        description: "Parámetros dentro de rangos óptimos",
      },
    ],
    evidenceRequired: [],
    version: "1.0",
  },

  "suelo-Presencia de Hongos en Suelo": {
    serviceId: "suelo-Presencia de Hongos en Suelo",
    area: "suelo",
    servicio: "Presencia de Hongos en Suelo",
    resultFields: [
      {
        name: "genero",
        label: "Género",
        type: "text",
        required: true,
        placeholder: "Fusarium",
      },
      {
        name: "especie",
        label: "Especie",
        type: "text",
        required: false,
        placeholder: "oxysporum",
      },
      {
        name: "orden",
        label: "Orden",
        type: "text",
        required: false,
        placeholder: "Hypocreales",
      },
      {
        name: "familia",
        label: "Familia",
        type: "text",
        required: false,
        placeholder: "Nectriaceae",
      },
      {
        name: "metodoIdentificacion",
        label: "Método de identificación",
        type: "select",
        required: true,
        options: [
          { value: "morfologico", label: "Morfológico" },
          { value: "microfotografia", label: "Microfotografía" },
          { value: "molecular", label: "Molecular" },
          { value: "otro", label: "Otro" },
        ],
      },
      {
        name: "observacion",
        label: "Observación",
        type: "textarea",
        required: false,
      },
    ],
    referencials: {},
    interpretationRules: [
      {
        condition: (v) => v.genero,
        result: "Identificación registrada",
      },
    ],
    evidenceRequired: [
      {
        type: "microfotografia",
        minCount: 1,
        description: "Se requiere mínimo 1 microfotografía del hongo",
      },
    ],
    version: "1.0",
  },
}

export const getServiceSchema = (area: string, servicio: string): ServiceSchema | undefined => {
  const key = `${area}-${servicio}`
  return serviceSchemas[key]
}
