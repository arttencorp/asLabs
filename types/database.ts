// Tipos de base de datos que se reutilizan en múltiples módulos
export interface PersonaNatural {
  per_nat_id_int: string
  per_nat_dni_int: number | null
  per_nat_nomb_vac: string | null
  per_nat_apell_vac: string | null
  per_id_int: string
}

export interface PersonaJuridica {
  per_jurd_id_int: string
  per_jurd_ruc_int: number | null
  per_jurd_razSocial_vac: string | null
  per_id_int: string
}

export interface Persona {
  per_id_int: string
  per_nom_contac_vac: string | null
  per_email_vac: string | null
  per_telef_int: string | null
  per_direc_vac: string | null
  per_cultivo_vac: string | null
  per_cantidad_int: number | null
  per_fec_prob_dt: string | null
  per_hec_disp_int: number | null
  per_hec_inst_int: number | null
  per_created_at_dt: string
  per_updated_at_dt: string
  per_observaciones_vac: string | null
}

export interface EstadoPedido {
  est_ped_id_int: string
  est_ped_desc_vac: string | null
  est_ped_tipo_int: number | null
}

export interface EstadoCotizacion {
  est_cot_id_int: string
  est_cot_desc_vac: string | null
  est_cot_tipo_int: number | null
}

export interface FormaPago {
  form_pa_id_int: string
  form_pa_desc_vac: string | null
  form_pa_tipo_int: number | null
}

export interface ProductoDatabase {
  pro_id_int: string
  pro_nomb_vac: string | null
  pro_desc_vac: string | null
  pro_prec_unitario_int: number | null
  pro_stock_int: number | null
  pro_created_at_dt: string
  pro_updated_at_dt: string
}