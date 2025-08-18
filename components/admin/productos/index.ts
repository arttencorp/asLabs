// Componentes
export { ProductoFormDialog } from './components/ProductoFormDialog'
export { ProductosTable } from './components/ProductosTable'
export { ProductosStats } from './components/ProductosStats'

// Hooks
export { useProductos } from './hooks/useProductos'

// Tipos
export type {
  ProductoForm,
  ProductoUpdateData,
  ProductoFormDialogProps,
  ProductosTableProps
} from './types'

// Utilidades
export { 
  validarProducto, 
  formatearPrecio, 
  obtenerEstadoProducto 
} from './utils'
