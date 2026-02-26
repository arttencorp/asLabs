// Hooks
export { useDocumentoLab } from './hooks/useDocumentoLab'

// Components
export { InformacionDocumento } from './components/InformacionDocumento'
export { MuestrasSection } from './components/MuestrasSection'
export { ResultadosSection } from './components/ResultadosSection'
export { NotasResultadoSection } from './components/NotasResultadoSection'
export { AgentesSection } from './components/AgentesSection'
export { AnexosSection } from './components/AnexosSection'
export { FirmasSection } from './components/FirmasSection'
export { DocumentoLabList } from './components/DocumentoLabList'
export { DocumentoLabStats } from './components/DocumentoLabStats'
export { PreviewSection } from './components/PreviewSection'

// Types
export type {
  MuestraUI,
  ResultadoUI,
  AgenteUI,
  AnexoUI,
  ClienteUI,
  DocumentoLabUI,
  TabDocumentoLab,
  NotaUI,
  FirmaDocumentoUI,
  InformacionDocumentoProps,
  MuestrasSectionProps,
  ResultadosSectionProps,
  NotasSectionProps,
  AgentesSectionProps,
  AnexosSectionProps,
  FirmasSectionProps,
  PreviewSectionProps,
  DocumentoLabListProps,
  DocumentoLabStatsProps
} from './types'

// Constants
export {
  MATRICES_MUESTRA,
  TIPOS_AGENTE,
  UNIDADES_RESULTADO,
  METODOS_ANALISIS,
  REINOS_TAXONOMICOS,
  DECLARACIONES_AREA,
  COLORES_ESTADO,
  ESTADO_INICIAL_DOCUMENTO,
  INFO_EMPRESA
} from './constants'

// Utils
export {
  generarCodigoMuestra,
  obtenerNombreCliente,
  obtenerRucDniCliente,
  personaToClienteUI,
  muestraDBToUI,
  muestraUIToDB,
  resultadoDBToUI,
  resultadoUIToDB,
  agenteDBToUI,
  notaDBToUI,
  notaUIToDB,
  anexoDBToUI,
  documentoDBToUI,
  obtenerDeclaracion,
  generarGraficoReferencial,
  formatearFecha,
  generarIdTemporal,
  validarDocumentoParaEmision,
  obtenerColorEstado
} from './utils'
