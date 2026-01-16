import type { ServiceArea, MatrixType, Service } from "../types"

export interface ConditionalField {
  name: string
  label: string
  type: "text" | "number" | "select" | "textarea"
  options?: string[]
}

export const getConditionalFields = (
  area: ServiceArea,
  servicio: Service,
  matrixType?: MatrixType,
): ConditionalField[] => {
  const fields: ConditionalField[] = []

  // Medio Ambiente y Microbiológicos con agua/alimento/superficie
  if (
    (area === "ambiente" || area === "microbiologicos") &&
    (matrixType === "agua" || matrixType === "alimento" || matrixType === "superficie")
  ) {
    fields.push({
      name: "temperatura",
      label: "Temperatura de recepción (°C)",
      type: "number",
    })
    fields.push({
      name: "integridad",
      label: "Integridad del muestreo",
      type: "select",
      options: ["Íntegra", "Parcial", "Comprometida"],
    })
  }

  // Susceptibilidad o Sensibilidad
  if (
    servicio.servicio.toLowerCase().includes("susceptibilidad") ||
    servicio.servicio.toLowerCase().includes("sensibilidad")
  ) {
    fields.push({
      name: "productos",
      label: "Productos evaluados",
      type: "textarea",
    })
    fields.push({
      name: "concentraciones",
      label: "Concentraciones (mg/L)",
      type: "text",
    })
  }

  // Aislamiento o Banco de aislados
  if (
    servicio.servicio.toLowerCase().includes("aislamiento") ||
    servicio.servicio.toLowerCase().includes("banco de aislados")
  ) {
    fields.push({
      name: "numeroAislados",
      label: "Número de aislados",
      type: "number",
    })
    fields.push({
      name: "codigoAislado",
      label: "Código del aislado",
      type: "text",
    })
    fields.push({
      name: "medioCultivo",
      label: "Medio de cultivo utilizado",
      type: "text",
    })
  }

  // OD-UFC, Curva de crecimiento, Estabilidad
  if (
    servicio.servicio.toLowerCase().includes("od") ||
    servicio.servicio.toLowerCase().includes("curva de crecimiento") ||
    servicio.servicio.toLowerCase().includes("estabilidad")
  ) {
    fields.push({
      name: "condicion",
      label: "Condición evaluada",
      type: "text",
    })
    fields.push({
      name: "tiemposEvaluacion",
      label: "Tiempos de evaluación (horas)",
      type: "text",
    })
    fields.push({
      name: "replicas",
      label: "Número de réplicas",
      type: "number",
    })
  }

  // Certificado de calidad de plantín
  if (servicio.servicio.toLowerCase().includes("certificado de calidad")) {
    fields.push({
      name: "lote",
      label: "Número de lote",
      type: "text",
    })
    fields.push({
      name: "variedad",
      label: "Variedad",
      type: "text",
    })
    fields.push({
      name: "plantinesEvaluados",
      label: "Número de plantines evaluados",
      type: "number",
    })
    fields.push({
      name: "conformidad",
      label: "Porcentaje de conformidad (%)",
      type: "number",
    })
  }

  return fields
}
