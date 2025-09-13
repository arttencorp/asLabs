import type { FichaTecnicaDatabase, ProductoDatabase } from '@/types/database'

// Tipo para formulario de ficha técnica (simplificado para crear/actualizar)
export interface FichaTecnicaForm {
  fit_tec_nom_planta_vac: string
  fit_tec_cod_vac: string | null
  pro_id_int: string
  fit_tec_imag_vac?: string | null
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