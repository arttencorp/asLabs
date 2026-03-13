import type { FirmaForm, FirmaDatabase } from './types'

export const validateFirmaForm = (form: FirmaForm): string[] => {
  const errors: string[] = []

  if (!form.firm_nomb_vac?.trim()) {
    errors.push('El nombre es obligatorio')
  }

  if (!form.firm_cargo_vac?.trim()) {
    errors.push('El cargo es obligatorio')
  }

  return errors
}

export const formatFirmaNombre = (firma: FirmaDatabase): string => {
  return firma.firm_nomb_vac || 'Sin nombre'
}

export const formatFirmaCargo = (firma: FirmaDatabase): string => {
  return firma.firm_cargo_vac || 'Sin cargo'
}

export const formatFirmaCompleta = (firma: FirmaDatabase): string => {
  const nombre = firma.firm_nomb_vac || 'Sin nombre'
  const cargo = firma.firm_cargo_vac || ''
  return cargo ? `${nombre} - ${cargo}` : nombre
}

export const firmaHasImage = (firma: FirmaDatabase): boolean => {
  return !!firma.firm_url_blob && firma.firm_url_blob.trim() !== ''
}
