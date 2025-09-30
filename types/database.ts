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
  tipo?: 'natural' | 'juridica'
  persona_natural?: PersonaNatural | null
  persona_juridica?: PersonaJuridica | null
}

// Alias para mejor semántica
export type ClientePersona = Persona

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

// Certificados de Calidad - Estructura real de BD
export interface CertificadoCalidadDatabase {
  cer_cal_id_int: string
  cer_cal_cod_muestra_int: number | null
  cer_cal_tipo_vac: string | null
  cer_cal_infor_ensayo_vac: string | null
  cer_cal_result_vac: string | null
  cer_cal_resum_vac: string | null
  cer_cal_imag_url: string | null
  cer_cal_created_at_dt: string
  cer_cal_updated_at_dt: string
  pro_id_int: string // FK a Productos - relación directa
}

// Fichas Técnicas - Estructura real de BD
export interface FichaTecnicaDatabase {
  fit_tec_id_int: string
  fit_tec_nom_planta_vac: string | null
  fit_tec_created_at_dt: string
  fit_tec_updated_at_dt: string
  pro_id_int: string // FK a Productos - relación directa
  fit_tec_imag_vac: string | null
  fit_tec_cod_vac: string | null
}

// Detalle de Ficha Técnica
export interface DetalleFichaTecnicaDatabase {
  dft_id_int: string
  dft_desc_vac: string | null
  dft_parcela_vac: string | null
  dft_zona_colecta_vac: string | null
  dft_present_vac: string | null
  fit_tec_id_int: string // FK a Ficha_Tecnica
}

// Taxonomías
export interface TaxonomiaDatabase {
  ta_id_int: string
  ta_familia_vac: string | null
  ta_genero_vac: string | null
  ta_nombre_cientifico_vac: string | null
  ta_grupo_vac: string | null
  ta_nombre_comun_vac: string | null
  fit_tec_id_int: string // FK a Ficha_Tecnica
}

// Zona de Colecta de Germoplasma
export interface ZonaColectaGermDatabase {
  zcg_id_int: string
  zcg_pais_vac: string | null
  zcg_region_vac: string | null
  zcg_provincia_vac: string | null
  zcg_distrito_vac: string | null
  zcg_zona_vac: string | null
  zcg_fecha_vac: string | null
  fit_tec_id_int: string // FK a Ficha_Tecnica
}

// Ficha Técnica Completa (con relaciones)
export interface FichaTecnicaCompletaDatabase extends FichaTecnicaDatabase {
  detalle?: DetalleFichaTecnicaDatabase | null
  taxonomia?: TaxonomiaDatabase | null
  zona_colecta?: ZonaColectaGermDatabase | null
}

// Categorías de Tienda
export interface CategoriaDatabase {
  cat_id_int: string
  cat_nom_vac: string | null
  cat_desc_vac: string | null
  cat_activo_bool?: boolean | null
  cat_created_at_dt: string
  cat_updated_at_dt: string
}

// Productos de Tienda  
export interface ProductoTiendaDatabase {
  prod_tiend_id_int: string
  prod_tiend_nom_vac: string | null
  prod_tiend_desc_vac: string | null
  prod_tiend_prec_vac: string | null
  prod_tiend_activo_bool?: boolean | null
  prod_tiend_created_at_dt: string
  prod_tiend_updated_at_dt: string
  cat_id_int: string // FK a Categoria
}

// ============================================
// TIPOS PARA FORMULARIOS
// ============================================

// Formularios para crear/actualizar entidades
export interface FichaTecnicaForm {
  fit_tec_nom_planta_vac: string
  fit_tec_cod_vac?: string | null
  pro_id_int: string
  fit_tec_imag_vac?: string | null
}

export interface DetalleFichaTecnicaForm {
  dft_desc_vac?: string | null
  dft_parcela_vac?: string | null
  dft_zona_colecta_vac?: string | null
  dft_present_vac?: string | null
}

export interface TaxonomiaForm {
  ta_familia_vac?: string | null
  ta_genero_vac?: string | null
  ta_nombre_cientifico_vac?: string | null
  ta_grupo_vac?: string | null
  ta_nombre_comun_vac?: string | null
}

export interface ZonaColectaForm {
  zcg_pais_vac?: string | null
  zcg_region_vac?: string | null
  zcg_provincia_vac?: string | null
  zcg_distrito_vac?: string | null
  zcg_zona_vac?: string | null
  zcg_fecha_vac?: string | null
}

export interface FichaTecnicaCompletaForm {
  ficha: FichaTecnicaForm
  detalle?: DetalleFichaTecnicaForm
  taxonomia?: TaxonomiaForm
  zona_colecta?: ZonaColectaForm
}