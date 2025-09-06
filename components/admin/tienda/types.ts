import type { CategoriaDatabase } from '@/types/database'

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
