import type { PuestoForm } from './types'

export const validarPuesto = (data: PuestoForm): string[] => {
  const errors: string[] = []

  if (!data.puest_nom_vac?.trim()) {
    errors.push('El nombre del puesto es requerido')
  }

  if (data.puest_nom_vac && data.puest_nom_vac.trim().length < 3) {
    errors.push('El nombre del puesto debe tener al menos 3 caracteres')
  }

  if (!data.puest_dec_vac?.trim()) {
    errors.push('La descripción es requerida')
  }

  if (!data.modalid_nom_vac?.trim()) {
    errors.push('La modalidad de trabajo es requerida')
  }

  return errors
}

export const obtenerEstadoPuesto = (estado: string | null | undefined): {
  texto: string
  color: string
} => {
  switch (estado?.toUpperCase()) {
    case 'EN CONVOCATORIA':
      return { texto: 'En Convocatoria', color: 'text-green-700' }
    case 'EN EVALUACIÓN':
      return { texto: 'En Evaluación', color: 'text-yellow-700' }
    case 'FINALIZADO':
      return { texto: 'Finalizado', color: 'text-blue-700' }
    case 'DESIERTO':
      return { texto: 'Desierto', color: 'text-gray-500' }
    case 'CANCELADO':
      return { texto: 'Cancelado', color: 'text-red-700' }
    default:
      return { texto: estado || 'Sin estado', color: 'text-gray-500' }
  }
}
