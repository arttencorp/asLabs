import { supabase } from './client'
import type {
    PuestoDatabase,
    AreaInteres,
    EstadoPuesto,
    ModalidadTrabajo,
    PostulanteDatabase,
    EstadoPostulacion,
    TipoDocumentoIdentidad,
} from '@/types/database'

// ============================================
// FUNCIONES PARA CATÁLOGOS DE CONVOCATORIAS
// ============================================

export async function obtenerAreasInteres(): Promise<AreaInteres[]> {
    const { data, error } = await supabase
        .from('Area_Interes')
        .select('*')
        .order('area_nom_vac', { ascending: true })

    if (error) throw error
    return data || []
}

export async function obtenerEstadosPuesto(): Promise<EstadoPuesto[]> {
    const { data, error } = await supabase
        .from('Estado_Puesto')
        .select('*')
        .order('estpuest_nom_vac', { ascending: true })

    if (error) throw error
    return data || []
}

export async function obtenerModalidadesTrabajo(): Promise<ModalidadTrabajo[]> {
    const { data, error } = await supabase
        .from('modalidad_trabajo')
        .select('*')
        .order('modalid_nom_vac', { ascending: true })

    if (error) throw error
    return data || []
}

export async function obtenerEstadosPostulacion(): Promise<EstadoPostulacion[]> {
    const { data, error } = await supabase
        .from('Estado_Postulacion')
        .select('*')
        .order('estpost_nom_vac', { ascending: true })

    if (error) throw error
    return data || []
}

// ============================================
// FUNCIONES PARA OBTENER NOMBRES DISTINTOS DE CATÁLOGOS
// ============================================

export async function obtenerNombresEstadoPuesto(): Promise<string[]> {
    const { data, error } = await supabase
        .from('Estado_Puesto')
        .select('estpuest_nom_vac')

    if (error) throw error
    return [...new Set((data || []).map(e => e.estpuest_nom_vac).filter(Boolean) as string[])].sort()
}

export async function obtenerNombresEstadoPostulacion(): Promise<string[]> {
    const { data, error } = await supabase
        .from('Estado_Postulacion')
        .select('estpost_nom_vac')
        .order('estpost_created_at_dt', { ascending: true })

    if (error) throw error
    return [...new Set((data || []).map(e => e.estpost_nom_vac).filter(Boolean) as string[])]
}

export async function obtenerNombresTipoDocumento(): Promise<string[]> {
    const { data, error } = await supabase
        .from('Tipo_Documento_Identidad')
        .select('tip_doc_iden_nom_vac')

    if (error) throw error
    return [...new Set((data || []).map(e => e.tip_doc_iden_nom_vac).filter(Boolean) as string[])].sort()
}

export async function obtenerNombresModalidadTrabajo(): Promise<string[]> {
    const { data, error } = await supabase
        .from('modalidad_trabajo')
        .select('modalid_nom_vac')

    if (error) throw error
    return [...new Set((data || []).map(e => e.modalid_nom_vac).filter(Boolean) as string[])].sort()
}

// ============================================
// FUNCIONES CRUD PARA PUESTOS
// ============================================

export async function obtenerPuestos(): Promise<PuestoDatabase[]> {
    const { data, error } = await supabase
        .from('Puesto')
        .select(`
            *,
            modalidad_trabajo(*),
            Estado_Puesto(*)
        `)
        .order('puest_created_at_dt', { ascending: false })

    if (error) throw error
    return data || []
}

export async function obtenerPuestosActivos(): Promise<PuestoDatabase[]> {
    const { data, error } = await supabase
        .from('Puesto')
        .select(`
            *,
            modalidad_trabajo(*),
            Estado_Puesto!inner(*)
        `)
        .in('Estado_Puesto.estpuest_nom_vac', ['EN CONVOCATORIA', 'EN EVALUACIÓN'])
        .order('puest_created_at_dt', { ascending: false })

    if (error) throw error
    return data || []
}

export async function crearPuesto(puestoData: {
    puest_nom_vac: string
    puest_dec_vac?: string | null
    puest_lugar_vac?: string | null
    puest_perfil_vac?: string | null
    puest_ofrece_vac?: string | null
    puest_benef_vac?: string | null
    puest_adicio_vac?: string | null
    puest_fec_limite_dt?: string | null
    puest_vacantes_vac?: string | null
    puest_duracion_vac?: string | null
    modalid_nom_vac?: string | null
    puest_salario_vac?: string | null
    estpuest_nom_vac?: string | null
}): Promise<PuestoDatabase> {
    // 1. Buscar o crear la modalidad de trabajo en el catálogo
    let modalidId: string | null = null
    if (puestoData.modalid_nom_vac) {
        const { data: existente } = await supabase
            .from('modalidad_trabajo')
            .select('modalid_id_int')
            .eq('modalid_nom_vac', puestoData.modalid_nom_vac)
            .maybeSingle()

        if (existente) {
            modalidId = existente.modalid_id_int
        } else {
            const { data: nueva, error: modalErr } = await supabase
                .from('modalidad_trabajo')
                .insert({
                    modalid_nom_vac: puestoData.modalid_nom_vac,
                })
                .select('modalid_id_int')
                .single()
            if (modalErr) throw modalErr
            modalidId = nueva.modalid_id_int
        }
    }

    // 2. Buscar el estado del puesto en el catálogo
    let estpuestId: string | null = null
    if (puestoData.estpuest_nom_vac) {
        const { data: estado } = await supabase
            .from('Estado_Puesto')
            .select('estpuest_id_int')
            .eq('estpuest_nom_vac', puestoData.estpuest_nom_vac)
            .maybeSingle()
        if (estado) estpuestId = estado.estpuest_id_int
    }

    // 3. Crear el Puesto con FKs a los catálogos
    const { data: puesto, error: puestoError } = await supabase
        .from('Puesto')
        .insert({
            puest_nom_vac: puestoData.puest_nom_vac,
            puest_dec_vac: puestoData.puest_dec_vac || null,
            puest_lugar_vac: puestoData.puest_lugar_vac || null,
            puest_perfil_vac: puestoData.puest_perfil_vac || null,
            puest_ofrece_vac: puestoData.puest_ofrece_vac || null,
            puest_benef_vac: puestoData.puest_benef_vac || null,
            puest_salario_vac: puestoData.puest_salario_vac || null,
            puest_adicio_vac: puestoData.puest_adicio_vac || null,
            puest_fec_limite_dt: puestoData.puest_fec_limite_dt || null,
            puest_vacantes_vac: puestoData.puest_vacantes_vac || null,
            puest_duracion_vac: puestoData.puest_duracion_vac || null,
            modalid_id_int: modalidId,
            estpuest_id_int: estpuestId,
        })
        .select(`*, modalidad_trabajo(*), Estado_Puesto(*)`)
        .single()

    if (puestoError) throw puestoError
    return puesto
}

export async function actualizarPuesto(
    id: string,
    puestoData: {
        puest_nom_vac?: string
        puest_dec_vac?: string | null
        puest_lugar_vac?: string | null
        puest_perfil_vac?: string | null
        puest_ofrece_vac?: string | null
        puest_benef_vac?: string | null
        puest_adicio_vac?: string | null
        puest_fec_limite_dt?: string | null
        puest_vacantes_vac?: string | null
        puest_duracion_vac?: string | null
        modalid_nom_vac?: string | null
        puest_salario_vac?: string | null
        estpuest_nom_vac?: string | null
    }
): Promise<PuestoDatabase> {
    const updateData: Record<string, unknown> = {
        puest_nom_vac: puestoData.puest_nom_vac,
        puest_dec_vac: puestoData.puest_dec_vac || null,
        puest_lugar_vac: puestoData.puest_lugar_vac || null,
        puest_perfil_vac: puestoData.puest_perfil_vac || null,
        puest_ofrece_vac: puestoData.puest_ofrece_vac || null,
        puest_benef_vac: puestoData.puest_benef_vac || null,
        puest_salario_vac: puestoData.puest_salario_vac || null,
        puest_adicio_vac: puestoData.puest_adicio_vac || null,
        puest_fec_limite_dt: puestoData.puest_fec_limite_dt || null,
        puest_vacantes_vac: puestoData.puest_vacantes_vac || null,
        puest_duracion_vac: puestoData.puest_duracion_vac || null,
    }

    // Buscar o crear modalidad
    if (puestoData.modalid_nom_vac) {
        const { data: existente } = await supabase
            .from('modalidad_trabajo')
            .select('modalid_id_int')
            .eq('modalid_nom_vac', puestoData.modalid_nom_vac)
            .maybeSingle()

        if (existente) {
            updateData.modalid_id_int = existente.modalid_id_int
        } else {
            const { data: nueva, error: modalErr } = await supabase
                .from('modalidad_trabajo')
                .insert({
                    modalid_nom_vac: puestoData.modalid_nom_vac,
                })
                .select('modalid_id_int')
                .single()
            if (modalErr) throw modalErr
            updateData.modalid_id_int = nueva.modalid_id_int
        }
    }

    // Buscar estado del puesto en catálogo
    if (puestoData.estpuest_nom_vac) {
        const { data: estado } = await supabase
            .from('Estado_Puesto')
            .select('estpuest_id_int')
            .eq('estpuest_nom_vac', puestoData.estpuest_nom_vac)
            .maybeSingle()
        if (estado) updateData.estpuest_id_int = estado.estpuest_id_int
    }

    // Actualizar el puesto
    const { error: puestoError } = await supabase
        .from('Puesto')
        .update(updateData)
        .eq('puest_id_int', id)

    if (puestoError) throw puestoError

    // Retornar actualizado con relaciones
    const { data, error } = await supabase
        .from('Puesto')
        .select(`*, modalidad_trabajo(*), Estado_Puesto(*)`)
        .eq('puest_id_int', id)
        .single()

    if (error) throw error
    return data
}

export async function eliminarPuesto(id: string): Promise<void> {
    // Solo eliminar el Puesto; los catálogos (modalidad, estado) se mantienen
    const { error } = await supabase
        .from('Puesto')
        .delete()
        .eq('puest_id_int', id)

    if (error) throw error
}

export async function toggleEstadoPuesto(
    puestoId: string,
    nuevoEstado: string
): Promise<void> {
    // Buscar el estado en el catálogo y actualizar el FK del puesto
    const { data: estado } = await supabase
        .from('Estado_Puesto')
        .select('estpuest_id_int')
        .eq('estpuest_nom_vac', nuevoEstado)
        .maybeSingle()

    if (!estado) throw new Error(`Estado "${nuevoEstado}" no encontrado en el catálogo`)

    const { error } = await supabase
        .from('Puesto')
        .update({ estpuest_id_int: estado.estpuest_id_int })
        .eq('puest_id_int', puestoId)

    if (error) throw error
}

// ============================================
// FUNCIONES CRUD PARA POSTULANTES
// ============================================

export async function obtenerPostulantes(): Promise<PostulanteDatabase[]> {
    const { data, error } = await supabase
        .from('Postulante')
        .select(`
            *,
            Tipo_Documento_Identidad(*),
            Estado_Postulacion(*)
        `)
        .order('post_created_at_dt', { ascending: false })

    if (error) throw error
    const postulantes: PostulanteDatabase[] = data || []

    // Cargar áreas de interés por separado (no bloquea si falla)
    try {
        const postIds = postulantes.map(p => p.post_id_int)
        const [detalleRes, areasRes] = await Promise.all([
            supabase.from('Postulacion_Detalle_Area').select('post_id_int, area_id_int').in('post_id_int', postIds),
            supabase.from('Area_Interes').select('*'),
        ])
        const detalles = detalleRes.data || []
        const todasAreas = areasRes.data || []
        if (detalles.length > 0) {
            const areasMap = new Map(todasAreas.map(a => [a.area_id_int, a]))
            const areasByPost = new Map<string, { area_id_int: string; Area_Interes: AreaInteres | null }[]>()
            for (const d of detalles) {
                const list = areasByPost.get(d.post_id_int) || []
                list.push({ area_id_int: d.area_id_int, Area_Interes: areasMap.get(d.area_id_int) || null })
                areasByPost.set(d.post_id_int, list)
            }
            for (const p of postulantes) {
                p.Postulacion_Detalle_Area = areasByPost.get(p.post_id_int) || null
            }
        }
    } catch {
        // Si falla la carga de áreas, los postulantes se muestran sin áreas
    }

    return postulantes
}

export async function crearPostulante(postulanteData: {
    post_nom_vac: string
    post_nrodoc_vac?: string | null
    post_institucion_vac?: string | null
    post_ciclo_int?: number | null
    post_carrera_vac?: string | null
    post_cv_vac?: string | null
    post_presentac_vac?: string | null
    post_financiam_vac?: string | null
    tip_doc_iden_nom_vac?: string | null
    estpost_nom_vac?: string | null
    areas_interes?: string[]
    puest_id_int?: string | null
    puest_nom_vac?: string | null
}): Promise<PostulanteDatabase> {
    // Codificar información del puesto en post_presentac_vac como JSON
    const presentacionData = JSON.stringify({
        puesto_id: postulanteData.puest_id_int || null,
        puesto_nombre: postulanteData.puest_nom_vac || null,
        texto: postulanteData.post_presentac_vac || '',
    })

    // 1. Buscar Tipo_Documento_Identidad en el catálogo por nombre
    let tipDocId: string | null = null
    if (postulanteData.tip_doc_iden_nom_vac) {
        const { data: tipDoc } = await supabase
            .from('Tipo_Documento_Identidad')
            .select('tip_doc_iden_id_int')
            .eq('tip_doc_iden_nom_vac', postulanteData.tip_doc_iden_nom_vac)
            .maybeSingle()
        if (tipDoc) tipDocId = tipDoc.tip_doc_iden_id_int
    }

    // 2. Buscar Estado_Postulacion en el catálogo por nombre
    let estpostId: string | null = null
    if (postulanteData.estpost_nom_vac) {
        const { data: estado } = await supabase
            .from('Estado_Postulacion')
            .select('estpost_id_int')
            .eq('estpost_nom_vac', postulanteData.estpost_nom_vac)
            .maybeSingle()
        if (estado) estpostId = estado.estpost_id_int
    }

    // 3. Crear Postulante con FKs a los catálogos
    const { data: postulante, error: postError } = await supabase
        .from('Postulante')
        .insert({
            post_nom_vac: postulanteData.post_nom_vac,
            post_nrodoc_vac: postulanteData.post_nrodoc_vac || null,
            post_institucion_vac: postulanteData.post_institucion_vac || null,
            post_ciclo_int: postulanteData.post_ciclo_int || null,
            post_carrera_vac: postulanteData.post_carrera_vac || null,
            post_cv_vac: postulanteData.post_cv_vac || null,
            post_presentac_vac: presentacionData,
            post_financiam_vac: postulanteData.post_financiam_vac || null,
            tip_doc_iden_id_int: tipDocId,
            estpost_id_int: estpostId,
        })
        .select(`*, Tipo_Documento_Identidad(*), Estado_Postulacion(*)`)
        .single()

    if (postError) throw postError

    // 4. Crear relaciones con Áreas de Interés (tabla intermedia)
    if (postulanteData.areas_interes && postulanteData.areas_interes.length > 0) {
        const areasInsert = postulanteData.areas_interes.map(areaId => ({
            post_id_int: postulante.post_id_int,
            area_id_int: areaId,
        }))
        await supabase.from('Postulacion_Detalle_Area').insert(areasInsert)
    }

    // 5. Vincular Puesto con el postulante
    if (postulanteData.puest_id_int) {
        await supabase
            .from('Puesto')
            .update({ post_id_int: postulante.post_id_int })
            .eq('puest_id_int', postulanteData.puest_id_int)
    }

    return postulante
}

// Parsear post_presentac_vac para extraer puesto_id y puesto_nombre
export function parsePresentacionPostulante(presentac: string | null): {
    puesto_id: string | null
    puesto_nombre: string | null
    texto: string
} {
    if (!presentac) return { puesto_id: null, puesto_nombre: null, texto: '' }
    try {
        const parsed = JSON.parse(presentac)
        return {
            puesto_id: parsed.puesto_id || null,
            puesto_nombre: parsed.puesto_nombre || null,
            texto: parsed.texto || '',
        }
    } catch {
        return { puesto_id: null, puesto_nombre: null, texto: presentac }
    }
}

export async function actualizarEstadoPostulacion(
    postId: string,
    nuevoEstado: string
): Promise<void> {
    // Buscar el estado en el catálogo y actualizar el FK del postulante
    const { data: estado } = await supabase
        .from('Estado_Postulacion')
        .select('estpost_id_int')
        .eq('estpost_nom_vac', nuevoEstado)
        .maybeSingle()

    if (!estado) throw new Error(`Estado "${nuevoEstado}" no encontrado en el catálogo`)

    const { error } = await supabase
        .from('Postulante')
        .update({ estpost_id_int: estado.estpost_id_int })
        .eq('post_id_int', postId)

    if (error) throw error
}

export async function eliminarPostulante(postId: string): Promise<void> {
    // 1. Desvincular el puesto (limpiar el FK)
    await supabase
        .from('Puesto')
        .update({ post_id_int: null })
        .eq('post_id_int', postId)

    // 2. Eliminar relaciones de áreas
    await supabase
        .from('Postulacion_Detalle_Area')
        .delete()
        .eq('post_id_int', postId)

    // 3. Eliminar Postulante (los catálogos no se tocan, son compartidos)
    const { error } = await supabase
        .from('Postulante')
        .delete()
        .eq('post_id_int', postId)

    if (error) throw error
}

// ============================================
// CONSULTA PÚBLICA DE ESTADO DE POSTULACIÓN
// ============================================

export async function consultarEstadoPostulacion(nroDocumento: string): Promise<PostulanteDatabase[]> {
    const { data, error } = await supabase
        .from('Postulante')
        .select(`
            *,
            Tipo_Documento_Identidad(*),
            Estado_Postulacion(*)
        `)
        .eq('post_nrodoc_vac', nroDocumento.trim())
        .order('post_created_at_dt', { ascending: false })

    if (error) throw error
    const postulantes: PostulanteDatabase[] = data || []

    // Cargar áreas de interés por separado
    if (postulantes.length > 0) {
        try {
            const postIds = postulantes.map(p => p.post_id_int)
            const [detalleRes, areasRes] = await Promise.all([
                supabase.from('Postulacion_Detalle_Area').select('post_id_int, area_id_int').in('post_id_int', postIds),
                supabase.from('Area_Interes').select('*'),
            ])
            const detalles = detalleRes.data || []
            const todasAreas = areasRes.data || []
            if (detalles.length > 0) {
                const areasMap = new Map(todasAreas.map(a => [a.area_id_int, a]))
                const areasByPost = new Map<string, { area_id_int: string; Area_Interes: AreaInteres | null }[]>()
                for (const d of detalles) {
                    const list = areasByPost.get(d.post_id_int) || []
                    list.push({ area_id_int: d.area_id_int, Area_Interes: areasMap.get(d.area_id_int) || null })
                    areasByPost.set(d.post_id_int, list)
                }
                for (const p of postulantes) {
                    p.Postulacion_Detalle_Area = areasByPost.get(p.post_id_int) || null
                }
            }
        } catch {
            // Si falla la carga de áreas, los postulantes se muestran sin áreas
        }
    }

    return postulantes
}
