import type { PuestoDatabase } from '@/types/database'

// Tipo para formulario de puesto
export interface PuestoForm {
  puest_nom_vac: string
  puest_dec_vac: string
  puest_lugar_vac: string
  puest_perfil_vac: string
  puest_ofrece_vac: string
  puest_benef_vac: string
  puest_adicio_vac: string
  puest_fec_limite_dt: string
  puest_vacantes_vac: string
  puest_duracion_vac: string
  // Modalidad de trabajo
  modalid_nom_vac: string
  // Salario
  puest_salario_vac: string
  // Estado del puesto
  estpuest_nom_vac: string
}

// Props del dialog de formulario
export interface PuestoFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingPuesto: PuestoDatabase | null
  estadoOptions: string[]
  modalidadOptions: string[]
  onSubmit: (data: PuestoForm) => void
  loading: boolean
  error: string | null
}

// Props de la tabla de puestos
export interface PuestosTableProps {
  puestos: PuestoDatabase[]
  postulaciones: import('@/components/admin/postulaciones').PostulanteConPuesto[]
  estadoPostulacionOptions: string[]
  postulacionesLoading: boolean
  loading: boolean
  onEdit: (puesto: PuestoDatabase) => void
  onDelete: (id: string) => void
  onToggleEstado: (puesto: PuestoDatabase) => void
  onCambiarEstadoPostulacion: (postId: string, nuevoEstado: string) => void
  onEliminarPostulacion: (postId: string) => void
}

// Props de stats
export interface PuestosStatsProps {
  puestos: PuestoDatabase[]
}
