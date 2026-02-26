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
export type TabDocumentoLab = 'informacion' | 'muestras' | 'resultados' | 'agentes' | 'anexos' | 'firmas' | 'preview'
export type TabName = 'lista' | 'crear' | 'cliente' | 'muestras' | 'resultados' | 'firmas' | 'preview'
export type EstadoDocumentoUI = 'borrador' | 'pendiente' | 'en_proceso' | 'emitido' | 'anulado'

// Atributo dinámico de muestra (EAV)
export interface AtributoMuestraUI {
  configCampoId: string
  etiqueta: string
  tipoDato: string   // 'texto' | 'numerico' | 'fecha'
  valor: string
}

// Muestra para UI (simplificada)
export interface MuestraUI {
  id: string
  codigo: string
  matriz: string
  lugarMuestreo: string
  centroRegistro: string
  fechaToma: string
  fechaRecepcion: string
  fechaInicio: string
  fechaFin: string
  rechazada: boolean
  motivoRechazo?: string
  recomendaciones?: string
  observaciones?: string
  atributosDinamicos: Record<string, string>  // configCampoId → valor
  atributosEtiquetas: Record<string, string>   // configCampoId → etiqueta
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
  dataExtra?: Record<string, any>
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

// Nota de resultado para UI
export interface NotaUI {
  id: string
  contenido: string
  resultadoId: string  // FK a ResultadoUI — siempre vinculada
}

// Anexo para UI
export interface AnexoUI {
  id: string
  url: string
  tipo: string
  titulo?: string
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
  servicioConfExtra?: number  // clave numérica para config de campos extra
  areaId?: string
  areaNombre?: string
  estadoId?: string
  estadoNombre?: string
  fechaEmision?: string
  cliente: ClienteUI
  muestras: MuestraUI[]
  resultados: ResultadoUI[]
  notas: NotaUI[]
  agentes: AgenteUI[]
  anexos: AnexoUI[]
  firmas: FirmaDocumentoUI[]
  createdAt?: string
}

// Props para el componente InformacionDocumento
export interface InformacionDocumentoProps {
  documento: DocumentoLabUI
  areas: AreaDatabase[]
  servicios: ServicioDatabase[]
  tiposDocumento: TipoDocumentoDatabase[]
  estadosDocumento: EstadoDocumentoDatabase[]
  clientes: Persona[]
  areaSeleccionada: string
  onAreaChange: (areaId: string) => void
  onServicioChange: (servicioId: string) => void
  onTipoDocumentoChange: (tipoId: string) => void
  onClienteChange: (clienteId: string) => void
  onFechaEmisionChange?: (fecha: string) => void
  onEstadoChange?: (estadoId: string) => void
  disabled?: boolean
}

// Props para MuestrasSection
export interface MuestrasSectionProps {
  muestras: MuestraUI[]
  codigoDocumento: string
  configCampos: import('@/types/database').ConfigCampoMuestraDatabase[]
  onAgregarMuestra: () => void
  onActualizarMuestra: (muestraId: string, campo: keyof MuestraUI, valor: any) => void
  onEliminarMuestra: (muestraId: string) => void
  disabled?: boolean
}

// Props para ResultadosSection
export interface ResultadosSectionProps {
  resultados: ResultadoUI[]
  muestras: MuestraUI[]
  servicioConfExtra?: number
  onAgregarResultado: (muestraId?: string) => void
  onActualizarResultado: (resultadoId: string, campo: keyof ResultadoUI, valor: any) => void
  onEliminarResultado: (resultadoId: string) => void
  disabled?: boolean
}

// Props para NotasResultadoSection
export interface NotasSectionProps {
  notas: NotaUI[]
  resultados: ResultadoUI[]
  onAgregarNota: (resultadoId?: string) => void
  onActualizarNota: (notaId: string, campo: keyof NotaUI, valor: any) => void
  onEliminarNota: (notaId: string) => void
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
  configAnexos: import('@/types/database').ConfigAnexoServicioDatabase[]
  onAgregarAnexo: (url: string, tipo: string, titulo?: string, nota?: string) => void
  onActualizarAnexo: (anexoId: string, campos: { url?: string; titulo?: string; nota?: string }) => void
  onEliminarAnexo: (anexoId: string) => void
  disabled?: boolean
}

// Props para PreviewSection
export interface PreviewSectionProps {
  documento: DocumentoLabUI
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

// Tipos para Firmas del documento
export interface FirmaDocumentoUI {
  id: string // firm_doc_id_int
  firmaId: string // firm_id_int
  nombre: string
  cargo: string
  imagenUrl: string | null
  fechaAsignacion?: string
}

// Props para FirmasSection
export interface FirmasSectionProps {
  firmasAsignadas: FirmaDocumentoUI[]
  onAgregarFirma: (firmaId: string) => void
  onRemoverFirma: (firmaDocId: string) => void
  disabled?: boolean
}
