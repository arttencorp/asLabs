import type { ProductoDatabase } from '@/types/database'

// Tipo para formulario de producto (simplificado para crear/actualizar)
export interface ProductoForm {
  pro_nomb_vac: string
  pro_desc_vac: string | null
  pro_prec_unitario_int: number
}

// Tipo para actualización parcial de producto
export interface ProductoUpdateData {
  pro_nomb_vac?: string
  pro_desc_vac?: string | null
  pro_prec_unitario_int?: number
  pro_stock_int?: number
}

// Tipo para el componente de formulario
export interface ProductoFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingProducto: ProductoDatabase | null
  onSubmit: (data: ProductoForm) => void
  loading: boolean
  error: string | null
}

// Tipo para la tabla de productos
export interface ProductosTableProps {
  productos: ProductoDatabase[]
  loading: boolean
  onEdit: (producto: ProductoDatabase) => void
  onDelete: (id: string) => void
}