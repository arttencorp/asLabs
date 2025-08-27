import type { ClienteForm } from './types'
import type { ClientePersona } from '@/types/database'

export const validateClienteForm = (form: ClienteForm): string[] => {
  const errors: string[] = []
    
  if (form.tipo === 'natural') {
    if (!form.per_nat_nomb_vac?.trim()) {
      errors.push('Los nombres son obligatorios para persona natural')
    }
    if (!form.per_nat_apell_vac?.trim()) {
      errors.push('Los apellidos son obligatorios para persona natural')
    } 
  }
  
  if (form.tipo === 'juridica') {
    if (!form.per_jurd_razSocial_vac?.trim()) {
      errors.push('La razón social es obligatoria para persona jurídica')
    } 
  }
  
  return errors
}

export const formatHectareas = (hectareas: number | null): string => {
  if (hectareas !== null && hectareas !== undefined) {
    return `${hectareas.toFixed(2)} ha`
  }
  return '-'
}