import { supabase, createAuthenticatedClient } from './client'
import type {
    FichaTecnicaDatabase,
    FichaTecnicaCompletaDatabase,
    DetalleFichaTecnicaDatabase,
    TaxonomiaDatabase,
    ZonaColectaGermDatabase
} from '@/types/database'

// ============================================
// FUNCIONES CRUD PARA FICHAS TÉCNICAS
// ============================================

export async function obtenerFichasTecnicas(): Promise<FichaTecnicaDatabase[]> {
    try {
        const { data, error } = await supabase
            .from('Ficha_Tecnica')
            .select(`
        *,
        producto:Productos(*)
      `)
            .order('fit_tec_created_at_dt', { ascending: false })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error obteniendo fichas técnicas:', error)
        throw error
    }
}

export async function crearFichaTecnica(fichaTecnicaData: {
    fit_tec_nom_planta_vac: string
    fit_tec_cod_vac: string | null
    pro_id_int: string
    fit_tec_imag_vac?: string | null
}): Promise<FichaTecnicaDatabase> {
    try {
        const datosLimpios = {
            fit_tec_nom_planta_vac: fichaTecnicaData.fit_tec_nom_planta_vac?.trim() || null,
            fit_tec_cod_vac: fichaTecnicaData.fit_tec_cod_vac?.trim() || null,
            pro_id_int: fichaTecnicaData.pro_id_int,
            fit_tec_imag_vac: fichaTecnicaData.fit_tec_imag_vac?.trim() || null
        }

        const { data: existingFicha } = await supabase
            .from('Ficha_Tecnica')
            .select('fit_tec_id_int')
            .eq('pro_id_int', datosLimpios.pro_id_int)
            .single()

        if (existingFicha) {
            throw new Error('Ya existe una ficha técnica para este producto')
        }

        const { data, error } = await supabase
            .from('Ficha_Tecnica')
            .insert(datosLimpios)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error creando ficha técnica:', error)
        throw error
    }
}

export async function actualizarFichaTecnica(id: string, fichaTecnicaData: {
    fit_tec_nom_planta_vac?: string
    fit_tec_cod_vac?: string | null
    pro_id_int?: string
    fit_tec_imag_vac?: string | null
}): Promise<FichaTecnicaDatabase> {
    try {
        const updateData: any = {}

        if (fichaTecnicaData.fit_tec_nom_planta_vac !== undefined) {
            updateData.fit_tec_nom_planta_vac = fichaTecnicaData.fit_tec_nom_planta_vac?.trim() || null
        }
        if (fichaTecnicaData.fit_tec_cod_vac !== undefined) {
            updateData.fit_tec_cod_vac = fichaTecnicaData.fit_tec_cod_vac?.trim() || null
        }
        if (fichaTecnicaData.pro_id_int !== undefined) {
            updateData.pro_id_int = fichaTecnicaData.pro_id_int
        }
        if (fichaTecnicaData.fit_tec_imag_vac !== undefined) {
            updateData.fit_tec_imag_vac = fichaTecnicaData.fit_tec_imag_vac?.trim() || null
        }

        updateData.fit_tec_updated_at_dt = new Date().toISOString()

        if (updateData.fit_tec_nom_planta_vac === null) {
            throw new Error('El nombre de la planta es requerido')
        }

        if (updateData.pro_id_int) {
            const { data: existingFicha } = await supabase
                .from('Ficha_Tecnica')
                .select('fit_tec_id_int')
                .eq('pro_id_int', updateData.pro_id_int)
                .neq('fit_tec_id_int', id)
                .single()

            if (existingFicha) {
                throw new Error('Ya existe una ficha técnica para este producto')
            }
        }

        const { data, error } = await supabase
            .from('Ficha_Tecnica')
            .update(updateData)
            .eq('fit_tec_id_int', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error actualizando ficha técnica:', error)
        throw error
    }
}

export async function eliminarFichaTecnica(id: string): Promise<void> {
    try {
        const { data: fichaTecnica, error: fichaError } = await supabase
            .from('Ficha_Tecnica')
            .select('fit_tec_imag_vac')
            .eq('fit_tec_id_int', id)
            .single()

        if (fichaError) throw fichaError

        if (fichaTecnica?.fit_tec_imag_vac) {
            try {
                const result = await eliminarImagenFichaTecnica(fichaTecnica.fit_tec_imag_vac)
                if (!result.success) {
                    console.error('Error al eliminar imagen del storage:', result.error)
                }
            } catch (imageError) {
                console.error('Error al eliminar imagen del storage, continuando con eliminación de la ficha:', imageError)
            }
        }

        const { error } = await supabase
            .from('Ficha_Tecnica')
            .delete()
            .eq('fit_tec_id_int', id)

        if (error) throw error

    } catch (error) {
        console.error('Error eliminando ficha técnica:', error)
        throw error
    }
}

export async function obtenerFichaTecnicaPorId(id: string): Promise<FichaTecnicaDatabase | null> {
    try {
        const { data, error } = await supabase
            .from('Ficha_Tecnica')
            .select(`
        *,
        producto:Productos(*)
      `)
            .eq('fit_tec_id_int', id)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error obteniendo ficha técnica por ID:', error)
        throw error
    }
}

export async function obtenerFichaTecnicaPorProducto(productoId: string): Promise<FichaTecnicaDatabase | null> {
    try {
        const { data, error } = await supabase
            .from('Ficha_Tecnica')
            .select(`
        *,
        producto:Productos(*)
      `)
            .eq('pro_id_int', productoId)
            .single()

        if (error && error.code !== 'PGRST116') throw error
        return data || null
    } catch (error) {
        console.error('Error obteniendo ficha técnica por producto:', error)
        throw error
    }
}

// ============================================
// FUNCIONES PARA FICHAS TÉCNICAS COMPLETAS
// ============================================

export async function obtenerFichaTecnicaCompleta(id: string): Promise<FichaTecnicaCompletaDatabase | null> {
    try {
        const { data: ficha, error: fichaError } = await supabase
            .from('Ficha_Tecnica')
            .select(`
        *,
        producto:Productos(*)
      `)
            .eq('fit_tec_id_int', id)
            .single()

        if (fichaError) throw fichaError
        if (!ficha) return null

        const { data: detalle } = await supabase
            .from('Detalle_Ficha_Tecnica')
            .select('*')
            .eq('fit_tec_id_int', id)
            .single()

        const { data: taxonomia } = await supabase
            .from('Taxonomias')
            .select('*')
            .eq('fit_tec_id_int', id)
            .single()

        const { data: zonaColecta } = await supabase
            .from('Zona_Colecta_Germ')
            .select('*')
            .eq('fit_tec_id_int', id)
            .single()

        return {
            ...ficha,
            detalle: detalle || null,
            taxonomia: taxonomia || null,
            zona_colecta: zonaColecta || null
        } as FichaTecnicaCompletaDatabase
    } catch (error) {
        console.error('Error obteniendo ficha técnica completa:', error)
        throw error
    }
}

export async function obtenerFichasTecnicasCompletasPorCodigos(codigos: string[]): Promise<FichaTecnicaCompletaDatabase[]> {
    try {
        if (!codigos || codigos.length === 0) return []

        const { data: fichasPorUuid } = await supabase
            .from('Ficha_Tecnica')
            .select(`
        *,
        producto:Productos(*)
      `)
            .in('pro_id_int', codigos)

        const { data: fichasPorCodigo } = await supabase
            .from('Ficha_Tecnica')
            .select(`
        *,
        producto:Productos(*)
      `)
            .in('fit_tec_cod_vac', codigos)

        const { data: productos } = await supabase
            .from('Productos')
            .select('pro_id_int')
            .in('pro_cod_vac', codigos)

        let fichasPorProducto = []
        if (productos && productos.length > 0) {
            const productosIds = productos.map(p => p.pro_id_int)
            const { data } = await supabase
                .from('Ficha_Tecnica')
                .select(`
          *,
          producto:Productos(*)
        `)
                .in('pro_id_int', productosIds)

            fichasPorProducto = data || []
        }

        const todasFichas = [
            ...(fichasPorUuid || []),
            ...(fichasPorCodigo || []),
            ...fichasPorProducto
        ]

        const seen = new Set<string>();
        const fichasUnicas = todasFichas.filter(ficha => {
            if (seen.has(ficha.fit_tec_id_int)) return false;
            seen.add(ficha.fit_tec_id_int);
            return true;
        });

        if (fichasUnicas.length === 0) return []

        const fichasCompletas: FichaTecnicaCompletaDatabase[] = []

        for (const ficha of fichasUnicas) {
            const { data: detalle } = await supabase
                .from('Detalle_Ficha_Tecnica')
                .select('*')
                .eq('fit_tec_id_int', ficha.fit_tec_id_int)
                .single()

            const { data: taxonomia } = await supabase
                .from('Taxonomias')
                .select('*')
                .eq('fit_tec_id_int', ficha.fit_tec_id_int)
                .single()

            const { data: zonaColecta } = await supabase
                .from('Zona_Colecta_Germ')
                .select('*')
                .eq('fit_tec_id_int', ficha.fit_tec_id_int)
                .single()

            fichasCompletas.push({
                ...ficha,
                detalle: detalle || null,
                taxonomia: taxonomia || null,
                zona_colecta: zonaColecta || null
            } as FichaTecnicaCompletaDatabase)
        }

        return fichasCompletas
    } catch (error) {
        console.error('Error obteniendo fichas técnicas completas por códigos:', error)
        throw error
    }
}

export async function obtenerFichasTecnicasCompletas(): Promise<FichaTecnicaCompletaDatabase[]> {
    try {
        const { data: fichasTecnicas, error: fichasError } = await supabase
            .from('Ficha_Tecnica')
            .select('*')
            .order('fit_tec_created_at_dt', { ascending: false })

        if (fichasError) throw fichasError
        if (!fichasTecnicas || fichasTecnicas.length === 0) return []

        const ids = fichasTecnicas.map(ficha => ficha.fit_tec_id_int)

        const [detallesResult, taxonomiasResult, zonasColectaResult] = await Promise.all([
            supabase
                .from('Detalle_Ficha_Tecnica')
                .select('*')
                .in('fit_tec_id_int', ids),
            supabase
                .from('Taxonomias')
                .select('*')
                .in('fit_tec_id_int', ids),
            supabase
                .from('Zona_Colecta_Germ')
                .select('*')
                .in('fit_tec_id_int', ids)
        ])

        const detallesMap = new Map()
        const taxonomiasMap = new Map()
        const zonasColectaMap = new Map()

        detallesResult.data?.forEach(detalle => {
            detallesMap.set(detalle.fit_tec_id_int, detalle)
        })

        taxonomiasResult.data?.forEach(taxonomia => {
            taxonomiasMap.set(taxonomia.fit_tec_id_int, taxonomia)
        })

        zonasColectaResult.data?.forEach(zona => {
            zonasColectaMap.set(zona.fit_tec_id_int, zona)
        })

        const fichasCompletas: FichaTecnicaCompletaDatabase[] = fichasTecnicas.map(ficha => ({
            ...ficha,
            detalle: detallesMap.get(ficha.fit_tec_id_int) || null,
            taxonomia: taxonomiasMap.get(ficha.fit_tec_id_int) || null,
            zona_colecta: zonasColectaMap.get(ficha.fit_tec_id_int) || null
        }))

        return fichasCompletas
    } catch (error) {
        console.error('Error obteniendo fichas técnicas completas:', error)
        throw error
    }
}

// ============================================
// FUNCIONES DE STORAGE PARA IMÁGENES
// ============================================

export async function subirImagenFichaTecnica(file: File, fileName: string): Promise<{ url: string | null; error: string | null }> {
    try {
        const supabaseAuth = createAuthenticatedClient()

        const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

        if (sessionError || !session) {
            console.error('Error de sesión:', sessionError || 'No hay sesión activa')
            return { url: null, error: 'No hay una sesión autenticada activa' }
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            return { url: null, error: 'Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG y WebP.' }
        }

        const timestamp = Date.now()
        const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
        const finalFileName = `${timestamp}_${cleanFileName}`

        const { data, error } = await supabaseAuth.storage
            .from('admin')
            .upload(`fichaTecnica/${finalFileName}`, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            return { url: null, error: `Error al subir la imagen: ${error.message}` }
        }

        const { data: { publicUrl } } = supabaseAuth.storage
            .from('admin')
            .getPublicUrl(`fichaTecnica/${finalFileName}`)

        return { url: publicUrl, error: null }
    } catch (error) {
        return { url: null, error: 'Error inesperado al subir la imagen' }
    }
}

export async function eliminarImagenFichaTecnica(imageUrl: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const supabaseAuth = createAuthenticatedClient()

        const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()

        if (sessionError || !session) {
            console.error('Error de sesión:', sessionError || 'No hay sesión activa')
            return { success: false, error: 'No hay una sesión autenticada activa' }
        }

        try {
            const url = new URL(imageUrl)
            const pathMatch = url.pathname.match(/\/fichaTecnica\/(.+)/)

            if (!pathMatch || !pathMatch[1]) {
                return { success: false, error: 'URL de imagen inválida' }
            }

            const fileName = pathMatch[1]
            const filePath = `fichaTecnica/${fileName}`

            const { error } = await supabaseAuth.storage
                .from('admin')
                .remove([filePath])

            if (error) {
                console.error('Error eliminando imagen:', error)
                return { success: false, error: 'Error al eliminar la imagen' }
            }

            return { success: true, error: null }
        } catch (urlError) {
            return { success: false, error: 'URL de imagen inválida' }
        }
    } catch (error) {
        console.error('Error en eliminación de imagen:', error)
        return { success: false, error: 'Error inesperado al eliminar la imagen' }
    }
}

// ============================================
// CRUD PARA TABLAS RELACIONADAS
// ============================================

export async function crearOActualizarDetalleFichaTecnica(
    fichaTecnicaId: string,
    detalleData: {
        dft_desc_vac?: string | null
        dft_parcela_vac?: string | null
        dft_zona_colecta_vac?: string | null
        dft_present_vac?: string | null
    }
): Promise<DetalleFichaTecnicaDatabase> {
    try {
        const { data: existingDetalle } = await supabase
            .from('Detalle_Ficha_Tecnica')
            .select('*')
            .eq('fit_tec_id_int', fichaTecnicaId)
            .single()

        if (existingDetalle) {
            const { data, error } = await supabase
                .from('Detalle_Ficha_Tecnica')
                .update(detalleData)
                .eq('fit_tec_id_int', fichaTecnicaId)
                .select()
                .single()

            if (error) throw error
            return data
        } else {
            const { data, error } = await supabase
                .from('Detalle_Ficha_Tecnica')
                .insert({
                    ...detalleData,
                    fit_tec_id_int: fichaTecnicaId
                })
                .select()
                .single()

            if (error) throw error
            return data
        }
    } catch (error) {
        console.error('Error creando/actualizando detalle de ficha técnica:', error)
        throw error
    }
}

export async function crearOActualizarTaxonomia(
    fichaTecnicaId: string,
    taxonomiaData: {
        ta_familia_vac?: string | null
        ta_genero_vac?: string | null
        ta_nombre_cientifico_vac?: string | null
        ta_grupo_vac?: string | null
        ta_nombre_comun_vac?: string | null
    }
): Promise<TaxonomiaDatabase> {
    try {
        const { data: existingTaxonomia } = await supabase
            .from('Taxonomias')
            .select('*')
            .eq('fit_tec_id_int', fichaTecnicaId)
            .single()

        if (existingTaxonomia) {
            const { data, error } = await supabase
                .from('Taxonomias')
                .update(taxonomiaData)
                .eq('fit_tec_id_int', fichaTecnicaId)
                .select()
                .single()

            if (error) throw error
            return data
        } else {
            const { data, error } = await supabase
                .from('Taxonomias')
                .insert({
                    ...taxonomiaData,
                    fit_tec_id_int: fichaTecnicaId
                })
                .select()
                .single()

            if (error) throw error
            return data
        }
    } catch (error) {
        console.error('Error creando/actualizando taxonomía:', error)
        throw error
    }
}

export async function crearOActualizarZonaColecta(
    fichaTecnicaId: string,
    zonaColectaData: {
        zcg_pais_vac?: string | null
        zcg_region_vac?: string | null
        zcg_provincia_vac?: string | null
        zcg_distrito_vac?: string | null
        zcg_zona_vac?: string | null
        zcg_fecha_vac?: string | null
    }
): Promise<ZonaColectaGermDatabase> {
    try {
        const { data: existingZona } = await supabase
            .from('Zona_Colecta_Germ')
            .select('*')
            .eq('fit_tec_id_int', fichaTecnicaId)
            .single()

        if (existingZona) {
            const { data, error } = await supabase
                .from('Zona_Colecta_Germ')
                .update(zonaColectaData)
                .eq('fit_tec_id_int', fichaTecnicaId)
                .select()
                .single()

            if (error) throw error
            return data
        } else {
            const { data, error } = await supabase
                .from('Zona_Colecta_Germ')
                .insert({
                    ...zonaColectaData,
                    fit_tec_id_int: fichaTecnicaId
                })
                .select()
                .single()

            if (error) throw error
            return data
        }
    } catch (error) {
        console.error('Error creando/actualizando zona de colecta:', error)
        throw error
    }
}

export async function crearOActualizarFichaTecnicaCompleta(
    fichaTecnicaId: string,
    datosCompletos: {
        detalle?: {
            dft_desc_vac?: string | null
            dft_parcela_vac?: string | null
            dft_zona_colecta_vac?: string | null
            dft_present_vac?: string | null
        }
        taxonomia?: {
            ta_familia_vac?: string | null
            ta_genero_vac?: string | null
            ta_nombre_cientifico_vac?: string | null
            ta_grupo_vac?: string | null
            ta_nombre_comun_vac?: string | null
        }
        zona_colecta?: {
            zcg_pais_vac?: string | null
            zcg_region_vac?: string | null
            zcg_provincia_vac?: string | null
            zcg_distrito_vac?: string | null
            zcg_zona_vac?: string | null
            zcg_fecha_vac?: string | null
        }
    }
): Promise<void> {
    try {
        const promesas = []

        if (datosCompletos.detalle) {
            promesas.push(crearOActualizarDetalleFichaTecnica(fichaTecnicaId, datosCompletos.detalle))
        }

        if (datosCompletos.taxonomia) {
            promesas.push(crearOActualizarTaxonomia(fichaTecnicaId, datosCompletos.taxonomia))
        }

        if (datosCompletos.zona_colecta) {
            promesas.push(crearOActualizarZonaColecta(fichaTecnicaId, datosCompletos.zona_colecta))
        }

        await Promise.all(promesas)
    } catch (error) {
        console.error('Error creando/actualizando ficha técnica completa:', error)
        throw error
    }
}
