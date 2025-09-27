import type { 
  FichaTecnicaDatabase, 
  ProductoDatabase, 
  DetalleFichaTecnicaDatabase,
  TaxonomiaDatabase,
  ZonaColectaGermDatabase
} from '@/types/database'

// Tipo para formulario de ficha técnica (simplificado para crear/actualizar)
export interface FichaTecnicaForm {
  fit_tec_nom_planta_vac: string
  fit_tec_cod_vac: string | null
  pro_id_int: string
  fit_tec_imag_vac?: string | null
}

// Tipo para formulario de detalle de ficha técnica
export interface DetalleFichaTecnicaForm {
  dft_desc_vac?: string | null
  dft_parcela_vac?: string | null
  dft_zona_colecta_vac?: string | null
  dft_present_vac?: string | null
}

// Tipo para formulario de taxonomía
export interface TaxonomiaForm {
  ta_familia_vac?: string | null
  ta_genero_vac?: string | null
  ta_nombre_cientifico_vac?: string | null
  ta_grupo_vac?: string | null
  ta_nombre_comun_vac?: string | null
}

// Tipo para formulario de zona de colecta
export interface ZonaColectaForm {
  zcg_pais_vac?: string | null
  zcg_region_vac?: string | null
  zcg_provincia_vac?: string | null
  zcg_distrito_vac?: string | null
  zcg_zona_vac?: string | null
  zcg_fecha_vac?: string | null
}

// Tipo para formulario completo de ficha técnica
export interface FichaTecnicaCompletaForm extends FichaTecnicaForm {
  detalle?: DetalleFichaTecnicaForm
  taxonomia?: TaxonomiaForm
  zona_colecta?: ZonaColectaForm
}

// Tipo para actualización parcial de ficha técnica
export interface FichaTecnicaUpdateData {
  fit_tec_nom_planta_vac?: string
  fit_tec_cod_vac?: string | null
  pro_id_int?: string
  fit_tec_imag_vac?: string | null
}

// Tipo para el componente de formulario
export interface FichaTecnicaFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingFichaTecnica: FichaTecnicaDatabase | null
  onSubmit: (data: FichaTecnicaForm) => void
  loading: boolean
  error: string | null
  productos: ProductoDatabase[]
  productosLoading: boolean
}

// Tipo para la tabla de fichas técnicas
export interface FichasTecnicasTableProps {
  fichasTecnicas: FichaTecnicaDatabase[]
  loading: boolean
  onEdit: (fichaTecnica: FichaTecnicaDatabase) => void
  onDelete: (id: string) => void
  productos: ProductoDatabase[]
  onRefresh?: () => void
  onCreate?: () => void
}

// Estadísticas de fichas técnicas
export interface FichasTecnicasStats {
  totalFichas: number
  fichasConImagen: number
  fichasSinImagen: number
  ultimaActualizacion: string
}

// Tipo para subida de archivos
export interface FileUploadResult {
  url: string | null
  error: string | null
}