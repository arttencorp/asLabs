import type { CategoriaDatabase } from '@/types/database'

// Utilidades específicas para el módulo de tienda

export function formatearNombreCategoria(categoria: CategoriaDatabase): string {
  return categoria.cat_nom_vac || 'Sin nombre'
}

export function formatearDescripcionCategoria(categoria: CategoriaDatabase): string {
  return categoria.cat_desc_vac || 'Sin descripción'
}

export function obtenerEstadoCategoria(categoria: CategoriaDatabase): {
  texto: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
} {
  const tienedescripcion = Boolean(categoria.cat_desc_vac?.trim())
  
  return {
    texto: tienedescripcion ? 'Completa' : 'Básica',
    variant: tienedescripcion ? 'default' : 'secondary'
  }
}