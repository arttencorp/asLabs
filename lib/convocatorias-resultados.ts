import type { ConvocatoriaEtapa } from "@/types/database"

export const CONVOCATORIAS_RESULTADOS_BUCKET = "convocatorias-resultados"
export const MAX_RESULTADO_PDF_BYTES = 10 * 1024 * 1024

export const CONVOCATORIA_ETAPAS: ReadonlyArray<{
  id: ConvocatoriaEtapa
  titulo: string
  descripcion: string
}> = [
  { id: 1, titulo: "Participantes aptos", descripcion: "Relación de personas habilitadas para continuar en el proceso." },
  { id: 2, titulo: "Preselección", descripcion: "Resultados de la revisión curricular y de CV." },
  { id: 3, titulo: "Selección primaria", descripcion: "Resultados de la evaluación escrita." },
  { id: 4, titulo: "Selección secundaria", descripcion: "Resultados de la evaluación verbal." },
  { id: 5, titulo: "Resultados finales", descripcion: "Resultado definitivo del proceso de selección." },
]

export function obtenerEtapaConvocatoria(etapa: ConvocatoriaEtapa) {
  return CONVOCATORIA_ETAPAS.find((item) => item.id === etapa)!
}
