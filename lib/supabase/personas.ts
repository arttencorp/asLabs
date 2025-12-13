import { supabase, cleanData } from './client'
import type { ClientePersona } from '@/types/database'

// ============================================
// FUNCIONES BASE PARA PERSONAS (Clientes)
// ============================================

export async function obtenerPersonas(): Promise<ClientePersona[]> {
    try {
        const { data: personas, error } = await supabase
            .from('Personas')
            .select(`
        *,
        Persona_Natural(*),
        Persona_Juridica(*)
      `)
            .order('per_created_at_dt', { ascending: false })

        if (error) throw error

        return personas.map(persona => ({
            ...persona,
            tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
            persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
                ? persona.Persona_Natural[0]
                : null,
            persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
                ? persona.Persona_Juridica[0]
                : null
        }))
    } catch (error) {
        console.error('Error obteniendo personas:', error)
        throw error
    }
}

export async function crearPersona(personaData: any): Promise<ClientePersona> {
    try {
        cleanData(personaData);

        const { data: persona, error: personaError } = await supabase
            .from('Personas')
            .insert({
                per_nom_contac_vac: personaData.per_nom_contac_vac,
                per_email_vac: personaData.per_email_vac,
                per_telef_int: personaData.per_telef_int,
                per_direc_vac: personaData.per_direc_vac,
                per_cultivo_vac: personaData.per_cultivo_vac,
                per_cantidad_int: personaData.per_cantidad_int,
                per_fec_prob_dt: personaData.per_fec_prob_dt && personaData.per_fec_prob_dt.trim()
                    ? personaData.per_fec_prob_dt
                    : null,
                per_hec_disp_int: personaData.per_hec_disp_int,
                per_hec_inst_int: personaData.per_hec_inst_int,
                per_observaciones_vac: personaData.per_observaciones_vac
            })
            .select()
            .single()

        if (personaError) throw personaError

        if (personaData.tipo === 'natural') {
            const { error: naturalError } = await supabase
                .from('Persona_Natural')
                .insert({
                    per_nat_dni_int: personaData.per_nat_dni_int,
                    per_nat_nomb_vac: personaData.per_nat_nomb_vac,
                    per_nat_apell_vac: personaData.per_nat_apell_vac,
                    per_id_int: persona.per_id_int
                })

            if (naturalError) throw naturalError
        } else {
            const { error: juridicaError } = await supabase
                .from('Persona_Juridica')
                .insert({
                    per_jurd_ruc_int: personaData.per_jurd_ruc_int,
                    per_jurd_razSocial_vac: personaData.per_jurd_razSocial_vac,
                    per_id_int: persona.per_id_int
                })

            if (juridicaError) throw juridicaError
        }

        const clientes = await obtenerPersonas()
        return clientes.find(c => c.per_id_int === persona.per_id_int)!

    } catch (error) {
        console.error('Error creando persona:', error)
        throw error
    }
}

export async function actualizarPersona(id: string, personaData: any): Promise<ClientePersona> {
    try {
        const { error: personaError } = await supabase
            .from('Personas')
            .update({
                per_nom_contac_vac: personaData.per_nom_contac_vac,
                per_email_vac: personaData.per_email_vac,
                per_telef_int: personaData.per_telef_int,
                per_direc_vac: personaData.per_direc_vac,
                per_cultivo_vac: personaData.per_cultivo_vac,
                per_cantidad_int: personaData.per_cantidad_int,
                per_fec_prob_dt: personaData.per_fec_prob_dt && personaData.per_fec_prob_dt.trim()
                    ? personaData.per_fec_prob_dt
                    : null,
                per_hec_disp_int: personaData.per_hec_disp_int,
                per_hec_inst_int: personaData.per_hec_inst_int,
                per_observaciones_vac: personaData.per_observaciones_vac,
                per_updated_at_dt: new Date().toISOString()
            })
            .eq('per_id_int', id)

        if (personaError) throw personaError

        if (personaData.tipo === 'natural') {
            const { error: naturalError } = await supabase
                .from('Persona_Natural')
                .update({
                    per_nat_dni_int: personaData.per_nat_dni_int,
                    per_nat_nomb_vac: personaData.per_nat_nomb_vac,
                    per_nat_apell_vac: personaData.per_nat_apell_vac
                })
                .eq('per_id_int', id)

            if (naturalError) throw naturalError
        } else {
            const { error: juridicaError } = await supabase
                .from('Persona_Juridica')
                .update({
                    per_jurd_ruc_int: personaData.per_jurd_ruc_int,
                    per_jurd_razSocial_vac: personaData.per_jurd_razSocial_vac
                })
                .eq('per_id_int', id)

            if (juridicaError) throw juridicaError
        }

        const clientes = await obtenerPersonas()
        return clientes.find(c => c.per_id_int === id)!

    } catch (error) {
        console.error('Error actualizando persona:', error)
        throw error
    }
}

export async function eliminarPersona(id: string): Promise<void> {
    try {
        await supabase.from('Persona_Natural').delete().eq('per_id_int', id)
        await supabase.from('Persona_Juridica').delete().eq('per_id_int', id)

        const { error } = await supabase
            .from('Personas')
            .delete()
            .eq('per_id_int', id)

        if (error) throw error

    } catch (error) {
        console.error('Error eliminando persona:', error)
        throw error
    }
}
