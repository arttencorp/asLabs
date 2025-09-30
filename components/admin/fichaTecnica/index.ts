// Componentes
export { 
  FichaTecnicaFormDialog, 
  FichasTecnicasTable, 
  FichasTecnicasStats, 
  FichasTecnicasManagement,
  FichaTecnicaDinamica,
} from './components'

// Hooks
export { useFichasTecnicas } from './hooks'
export { useFichasTecnicasCompletas } from './hooks/useFichasTecnicasCompletas'

// Tipos (exportamos solo los necesarios para evitar conflictos)
export type { 
  FichaTecnicaForm, 
  FichaTecnicaUpdateData, 
  FichaTecnicaFormDialogProps, 
  FichasTecnicasTableProps,
  FileUploadResult 
} from './types'

// Constantes y utilidades
export * from './constants'
export * from './utils'