import type { CertificadoCalidadDatabase, ProductoDatabase } from '@/types/database'

// Formulario para crear/actualizar certificados
export interface CertificadoCalidadForm {
  tipo: string
  codMuestra: string
  informacionEnsayo: string
  resultados: string
  observaciones: string
  proId: string
  imagen: File | null
}

// Datos para actualización parcial
export interface CertificadoCalidadUpdateData {
  cer_cal_cod_muestra_int?: number | null
  cer_cal_tipo_vac?: string
  cer_cal_infor_ensayo_vac?: string | null
  cer_cal_result_vac?: string | null
  cer_cal_resum_vac?: string | null
  cer_cal_imag_url?: string | null
  pro_id_int?: string
}

// Props para el diálogo de formulario
export interface CertificadoCalidadFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  certificado?: CertificadoCalidadDatabase | null
  onSubmit: (data: CertificadoCalidadForm) => Promise<void>
  onUpdateEditingItem?: (updates: Partial<CertificadoCalidadDatabase>) => void
  loading: boolean
  productos: ProductoDatabase[]
}

// Props para la tabla
export interface CertificadosCalidadTableProps {
  certificados: CertificadoCalidadDatabase[]
  loading: boolean
  onEdit: (certificado: CertificadoCalidadDatabase) => void
  onDelete: (id: string) => Promise<void>
  productos: ProductoDatabase[]
}

// Estadísticas
export interface CertificadosCalidadStats {
  total: number
  conImagen: number
  sinImagen: number
  ultimaActualizacion?: string
}