// Tipos de base de datos que se reutilizan en múltiples módulos
export interface PersonaNatural {
  per_nat_id_int: string
  per_nat_dni_int: number
  per_nat_nomb_vac: string
  per_nat_apell_vac: string
  per_id_int: string
}

export interface PersonaJuridica {
  per_jurd_id_int: string
  per_jurd_ruc_int: number
  per_jurd_razSocial_vac: string
  per_id_int: string
}

export interface Persona {
  per_id_int: string
  per_nom_contac_vac: string
  per_email_vac: string
  per_telef_int: string
  per_direc_vac: string
  per_cultivo_vac: string
  per_cantidad_int: number
  per_fec_prob_dt: string
  per_hec_disp_int: number
  per_hec_inst_int: number
  per_created_at_dt: string
  per_updated_at_dt: string
  per_observaciones_vac: string
}

export interface EstadoPedido {
  est_ped_id_int: string
  est_ped_desc_vac: string
  est_ped_tipo_int: number
}

export interface EstadoCotizacion {
  est_cot_id_int: string
  est_cot_desc_vac: string
  est_cot_tipo_int: number
}

export interface FormaPago {
  form_pa_id_int: string
  form_pa_desc_vac: string
  form_pa_tipo_int: number
}

export interface ProductoDatabase {
  pro_id_int: string
  pro_nomb_vac: string
  pro_desc_vac: string
  pro_prec_unitario_int: number
  pro_stock_int: number
  pro_created_at_dt: string
  pro_updated_at_dt: string
}