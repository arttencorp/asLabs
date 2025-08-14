import type { TipoCliente } from '@/constants'
import { ClienteForm } from "./types"

export const CLIENTE_FORM_INITIAL: ClienteForm = {
  per_nom_contac_vac: null,
  per_email_vac: null,
  per_telef_int: null,
  per_direc_vac: null,
  per_cultivo_vac: null,
  per_cantidad_int: null,
  per_fec_prob_dt: null,
  per_hec_disp_int: null,
  per_hec_inst_int: null,
  per_observaciones_vac: null,
  tipo: 'natural' as TipoCliente, // Usar el tipo correcto
  per_nat_dni_int: null,
  per_nat_nomb_vac: null,
  per_nat_apell_vac: null,
  per_jurd_ruc_int: null,
  per_jurd_razSocial_vac: null
}
 