// Tipos específicos para el módulo de Documentos de Laboratorio (interfaz de usuario)
import type {
  AreaDatabase,
  ServicioDatabase,
  TipoDocumentoDatabase,
  EstadoDocumentoDatabase,
  DocumentoLabDatabase,
  MuestraDatabase,
  ResultadoEnsayoDatabase,
  AgenteIdentificadoDatabase,
  AnexoDocumentoDatabase,
  Persona
} from '@/types/database'

// Re-exportar tipos de database para conveniencia
export type {
  AreaDatabase,
  ServicioDatabase,
  TipoDocumentoDatabase,
  EstadoDocumentoDatabase,
  DocumentoLabDatabase,
  MuestraDatabase,
  ResultadoEnsayoDatabase,
  AgenteIdentificadoDatabase,
  AnexoDocumentoDatabase
}

// Tipos para la UI
export type TabDocumentoLab = 'informacion' | 'muestras' | 'resultados' | 'agentes' | 'anexos' | 'preview'
export type TabName = 'lista' | 'crear' | 'cliente' | 'muestras' | 'resultados' | 'preview'
export type EstadoDocumentoUI = 'borrador' | 'pendiente' | 'en_proceso' | 'emitido' | 'anulado'

// Muestra para UI (simplificada)
export interface MuestraUI {
  id: string
  codigo: string
  matriz: string
  lugarMuestreo: string
  fechaToma: string
  fechaRecepcion: string
  fechaInicio: string
  fechaFin: string
  rechazada: boolean
  motivoRechazo?: string
  recomendaciones?: string
  observaciones?: string
}

// Resultado para UI
export interface ResultadoUI {
  id: string
  parametro: string
  resultado: string
  unidad: string
  metodo: string
  valorMin?: number
  valorMax?: number
  mostrarGrafico: boolean
  rangoReferencial?: string
  observaciones?: string
  muestraId?: string
}

// Agente identificado para UI
export interface AgenteUI {
  id: string
  nombreCientifico: string
  reino?: string
  orden?: string
  familia?: string
  genero?: string
  especie?: string
  tipo: string // bacteria, hongo, virus, etc.
  codigoAislado?: string
  muestraId?: string
}

// Anexo para UI
export interface AnexoUI {
  id: string
  url: string
  tipo: string
  nota?: string
}

// Cliente seleccionado para UI
export interface ClienteUI {
  id: string
  razonSocial: string
  ruc: string
  contacto: string
  email: string
  telefono: string
  direccion: string
}

// Datos completos del documento para UI
export interface DocumentoLabUI {
  id: string
  codigo: string
  tipoDocumentoId: string
  tipoDocumentoNombre?: string
  servicioId: string
  servicioNombre?: string
  areaId?: string
  areaNombre?: string
  estadoId?: string
  estadoNombre?: string
  fechaEmision?: string
  cliente: ClienteUI
  muestras: MuestraUI[]
  resultados: ResultadoUI[]
  agentes: AgenteUI[]
  anexos: AnexoUI[]
  createdAt?: string
}

// Props para el componente InformacionDocumento
export interface InformacionDocumentoProps {
  documento: DocumentoLabUI
  areas: AreaDatabase[]
  servicios: ServicioDatabase[]
  tiposDocumento: TipoDocumentoDatabase[]
  clientes: Persona[]
  areaSeleccionada: string
  onAreaChange: (areaId: string) => void
  onServicioChange: (servicioId: string) => void
  onTipoDocumentoChange: (tipoId: string) => void
  onClienteChange: (clienteId: string) => void
  onFechaEmisionChange?: (fecha: string) => void
  disabled?: boolean
}

// Props para MuestrasSection
export interface MuestrasSectionProps {
  muestras: MuestraUI[]
  codigoDocumento: string
  onAgregarMuestra: () => void
  onActualizarMuestra: (muestraId: string, campo: keyof MuestraUI, valor: any) => void
  onEliminarMuestra: (muestraId: string) => void
  disabled?: boolean
}

// Props para ResultadosSection
export interface ResultadosSectionProps {
  resultados: ResultadoUI[]
  muestras: MuestraUI[]
  onAgregarResultado: (muestraId?: string) => void
  onActualizarResultado: (resultadoId: string, campo: keyof ResultadoUI, valor: any) => void
  onEliminarResultado: (resultadoId: string) => void
  disabled?: boolean
}

// Props para AgentesSection
export interface AgentesSectionProps {
  agentes: AgenteUI[]
  muestras: MuestraUI[]
  onAgregarAgente: (muestraId?: string) => void
  onActualizarAgente: (agenteId: string, campo: keyof AgenteUI, valor: any) => void
  onEliminarAgente: (agenteId: string) => void
  disabled?: boolean
}

// Props para AnexosSection
export interface AnexosSectionProps {
  anexos: AnexoUI[]
  onAgregarAnexo: (url: string, tipo: string, nota?: string) => void
  onEliminarAnexo: (anexoId: string) => void
  disabled?: boolean
}

// Props para PreviewSection
export interface PreviewSectionProps {
  documento: DocumentoLabUI
  onEmitir: () => Promise<void>
  onImprimir: () => void
  onVolver: () => void
}

// Props para DocumentoLabList
export interface DocumentoLabListProps {
  documentos: DocumentoLabUI[]
  areas: AreaDatabase[]
  estadosDocumento: EstadoDocumentoDatabase[]
  filtroEstado: string
  filtroBusqueda: string
  areaSeleccionada: string
  onFiltroEstadoChange: (estado: string) => void
  onFiltroBusquedaChange: (busqueda: string) => void
  onAreaChange: (areaId: string) => void
  onVerDocumento: (documentoId: string) => void
  onEditarDocumento: (documentoId: string) => void
  onImprimirDocumento: (documentoId: string) => void
  onRefrescar: () => void
  loading?: boolean
}

// Props para DocumentoLabStats
export interface DocumentoLabStatsProps {
  total: number
  porEstado: Record<string, number>
}

// Props legacy (mantener por compatibilidad)
export interface DocumentoLabFormProps {
  tiposDocumento: TipoDocumentoDatabase[]
  areas: AreaDatabase[]
  servicios: ServicioDatabase[]
  estados: EstadoDocumentoDatabase[]
  onGuardar: (documento: DocumentoLabUI) => Promise<void>
  onCancelar: () => void
  documentoEditar?: DocumentoLabUI
  loading?: boolean
}

export interface ClienteSectionProps {
  cliente: ClienteUI
  onChange: (cliente: ClienteUI) => void
  onSiguiente: () => void
}

// Filtros para lista de documentos
export interface DocumentoLabFiltros {
  busqueda: string
  tipoDocumentoId?: string
  areaId?: string
  estadoId?: string
  fechaDesde?: string
  fechaHasta?: string
}
