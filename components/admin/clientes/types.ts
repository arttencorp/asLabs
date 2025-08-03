import type { ClientePersona } from '@/utils'
import type { TipoCliente } from '@/constants'

// Solo tipos específicos de clientes
export interface Cliente extends ClientePersona {}

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
  
  // Tipo de persona - usar el tipo correcto
  tipo: TipoCliente // 'natural' | 'juridica'
  
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