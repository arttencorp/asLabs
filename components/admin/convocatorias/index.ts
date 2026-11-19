// Componentes
export { PuestoFormDialog } from './components/PuestoFormDialog'
export { PuestosTable } from './components/PuestosTable'
export { PuestosStats } from './components/PuestosStats'
export { ResultadosDialog } from './components/ResultadosDialog'

// Hooks
export { usePuestos } from './hooks/usePuestos'
export { useResultadosConvocatoria } from './hooks/useResultadosConvocatoria'

// Tipos
export type {
  PuestoForm,
  PuestoFormDialogProps,
  PuestosTableProps,
  PuestosStatsProps,
} from './types'

// Utilidades
export { validarPuesto, obtenerEstadoPuesto } from './utils'
