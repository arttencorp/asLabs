import type { PuestoDatabase } from '@/types/database'

// Tipo para formulario de puesto
export interface PuestoForm {
  puest_nom_vac: string
  puest_dec_vac: string
  puest_perfil_vac: string
  puest_ofrece_vac: string
  puest_benef_vac: string
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
  loading: boolean
  onEdit: (puesto: PuestoDatabase) => void
  onDelete: (id: string) => void
  onToggleEstado: (puesto: PuestoDatabase) => void
}

// Props de stats
export interface PuestosStatsProps {
  puestos: PuestoDatabase[]
}
