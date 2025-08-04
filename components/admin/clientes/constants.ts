import type { TipoCliente } from '@/constants'
import { ClienteForm } from "./types"

export const TIPO_CLIENTE = {
  NATURAL: 'natural',
  JURIDICA: 'juridica'
} as const

export const CLIENTE_FORM_INITIAL: ClienteForm = {
  per_nom_contac_vac: '',
  per_email_vac: '',
  per_telef_int: '',
  per_direc_vac: '',
  per_cultivo_vac: '',
  per_cantidad_int: null,
  per_fec_prob_dt: null,
  per_hec_disp_int: null,
  per_hec_inst_int: null,
  per_observaciones_vac: '',
  tipo: 'natural' as TipoCliente, // Usar el tipo correcto
  per_nat_dni_int: null,
  per_nat_nomb_vac: '',
  per_nat_apell_vac: '',
  per_jurd_ruc_int: null,
  per_jurd_razSocial_vac: ''
}

export const CULTIVOS_OPCIONES = [
  'Banano',
  'Quinua',
  'Kiwicha',
  'Frijol',
  'Arveja',
  'Otro'
]