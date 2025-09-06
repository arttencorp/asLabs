import type { CategoriaDatabase, ProductoTiendaDatabase } from '@/types/database'

// Tipo para formulario de categoría (simplificado para crear/actualizar)
export interface CategoriaForm {
  cat_nom_vac: string
  cat_desc_vac: string | null
}

// Tipo para actualización parcial de categoría
export interface CategoriaUpdateData {
  cat_nom_vac?: string
  cat_desc_vac?: string | null
}

// Tipo para el componente de formulario
export interface CategoriaFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingCategoria: CategoriaDatabase | null
  onSubmit: (data: CategoriaForm) => void
  loading: boolean
  error: string | null
}

// Tipo para la tabla de categorías
export interface CategoriasTableProps {
  categorias: CategoriaDatabase[]
  loading: boolean
  onEdit: (categoria: CategoriaDatabase) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string, currentState: boolean) => void
}

// Estadísticas de categorías
export interface CategoriasStats {
  totalCategorias: number
  categoriasConProductos: number
  categoriasSinProductos: number
}

// ==================== PRODUCTOS ====================

// Tipo para formulario de producto (simplificado para crear/actualizar)
export interface ProductoTiendaForm {
  prod_tiend_nom_vac: string
  prod_tiend_desc_vac: string | null
  prod_tiend_prec_vac: string | null
  cat_id_int: string
}

// Tipo para actualización parcial de producto
export interface ProductoTiendaUpdateData {
  prod_tiend_nom_vac?: string
  prod_tiend_desc_vac?: string | null
  prod_tiend_prec_vac?: string | null
  cat_id_int?: string
}

// Tipo para el componente de formulario de productos
export interface ProductoTiendaFormDialogProps {
  isOpen: boolean
  onClose: () => void
  editingProducto: ProductoTiendaDatabase | null
  onSubmit: (data: ProductoTiendaForm) => void
  loading: boolean
  error: string | null
  categorias: CategoriaDatabase[]
}

// Tipo para la tabla de productos
export interface ProductosTiendaTableProps {
  productos: ProductoTiendaDatabase[]
  categorias: CategoriaDatabase[]
  loading: boolean
  onEdit: (producto: ProductoTiendaDatabase) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string, currentState: boolean) => void
}

// Estadísticas de productos
export interface ProductosTiendaStats {
  totalProductos: number
  productosActivos: number
  productosOcultos: number
  productosPorCategoria: { [categoriaId: string]: number }
}
