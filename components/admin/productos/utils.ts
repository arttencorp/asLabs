import type { ProductoForm } from './types'

// Función para validar datos del producto
export const validarProducto = (data: ProductoForm): string[] => {
  const errors: string[] = []
  
  if (!data.pro_nomb_vac?.trim()) {
    errors.push('El nombre del producto es requerido')
  }
  
  if (data.pro_nomb_vac && data.pro_nomb_vac.trim().length < 3) {
    errors.push('El nombre del producto debe tener al menos 3 caracteres')
  }
  
  if (!data.pro_prec_unitario_int || data.pro_prec_unitario_int <= 0) {
    errors.push('El precio debe ser mayor a 0')
  }
  
  if (data.pro_prec_unitario_int && data.pro_prec_unitario_int > 999999.99) {
    errors.push('El precio no puede exceder S/. 999,999.99')
  }
  
  return errors
}

// Función para formatear precio
export const formatearPrecio = (precio: number | null): string => {
  if (!precio || precio === 0) return 'S/. 0.00'
  return `S/. ${precio.toFixed(2)}`
}

// Función para obtener el estado del producto basado en precio
export const obtenerEstadoProducto = (precio: number | null): { 
  texto: string 
  variant: 'default' | 'secondary' | 'destructive' 
} => {
  if (!precio || precio === 0) {
    return { texto: 'Sin precio', variant: 'secondary' }
  }
  return { texto: 'Disponible', variant: 'default' }
}