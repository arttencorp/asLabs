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

// Tipos para el frontend
export interface Cliente extends Persona {
  persona_natural?: PersonaNatural
  persona_juridica?: PersonaJuridica
  tipo: 'natural' | 'juridica'
}

export interface ClienteForm {
  // Datos generales
  per_nom_contac_vac: string
  per_email_vac: string
  per_telef_int: string
  per_direc_vac: string
  per_cultivo_vac: string
  per_cantidad_int: number | null
  per_fec_prob_dt: string
  per_hec_disp_int: number | null
  per_hec_inst_int: number | null
  per_observaciones_vac: string
  
  // Tipo de persona
  tipo: 'natural' | 'juridica'
  
  // Persona Natural
  per_nat_dni_int?: number | null
  per_nat_nomb_vac?: string
  per_nat_apell_vac?: string
  
  // Persona Jurídica
  per_jurd_ruc_int?: number | null
  per_jurd_razSocial_vac?: string
}

export interface ClientesStats {
  totalClientes: number
  clientesNaturales: number
  clientesJuridicos: number
  nuevosEsteMes: number
}