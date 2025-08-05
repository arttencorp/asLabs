import { Cliente, ClienteForm } from './types'

export const formatClienteName = (cliente: Cliente): string | null => {
  if (cliente.tipo === 'natural' && cliente.persona_natural) {
    return `${cliente.persona_natural.per_nat_nomb_vac} ${cliente.persona_natural.per_nat_apell_vac}`
  }
  
  if (cliente.tipo === 'juridica' && cliente.persona_juridica) {
    return cliente.persona_juridica.per_jurd_razSocial_vac
  }
  
  return cliente.per_nom_contac_vac || null
}

export const formatClienteDocument = (cliente: Cliente): string | null => {
  if (cliente.tipo === 'natural' && cliente.persona_natural) {
    return `DNI: ${cliente.persona_natural.per_nat_dni_int}`
  }
  
  if (cliente.tipo === 'juridica' && cliente.persona_juridica) {
    return `RUC: ${cliente.persona_juridica.per_jurd_ruc_int}`
  }
  
  return null
}

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
    if (!form.per_jurd_ruc_int) {
      errors.push('El RUC es obligatorio para persona jurídica')
    }
  }
  
  return errors
}

export const formatHectareas = (hectareas: number): string => {
  return `${hectareas.toFixed(2)} ha`
}

export const formatFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-PE')
}