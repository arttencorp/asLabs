import { createClient } from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr"
import { generarCodigoSeguimiento, generarNumeroCotizacion } from '@/utils'
import type {
  PersonaNatural,
  PersonaJuridica,
  Persona,
  EstadoPedido,
  EstadoCotizacion,
  FormaPago,
  ProductoDatabase,
  CertificadoCalidadDatabase,
  FichaTecnicaDatabase,
  FichaTecnicaCompletaDatabase,
  DetalleFichaTecnicaDatabase,
  TaxonomiaDatabase,
  ZonaColectaGermDatabase,
  CategoriaDatabase,
  ProductoTiendaDatabase
} from '@/types/database'
import type { ClientePersona } from '@/types/database'

// Configuración cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Cliente para operaciones sin sesión (mantener el existente para compatibilidad)
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: "public",
    },
    global: {
      headers: {
        "x-client-info": "as-labs-admin",
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  },
)

// Cliente para operaciones con sesión (autenticadas)
export const createAuthenticatedClient = () => {
  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-key"
  )
}

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

function cleanData(obj: any) {
  const cleaned = { ...obj }
  for (const key in cleaned) {
    if (cleaned[key] === '') {
      cleaned[key] = null
    }
  }
  return cleaned
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

// ============================================
// FUNCIONES BASE PARA CATÁLOGOS
// ============================================

export async function obtenerEstadosPedido(): Promise<EstadoPedido[]> {
  try {
    const { data, error } = await supabase
      .from('Estado_Pedido')
      .select('*')
      .order('est_ped_tipo_int', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo estados de pedido:', error)
    throw error
  }
}

export async function obtenerEstadosCotizacion(): Promise<EstadoCotizacion[]> {
  try {
    const { data, error } = await supabase
      .from('Estado_Cotizacion')
      .select('*')
      .order('est_cot_tipo_int', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo estados de cotización:', error)
    throw error
  }
}

export async function obtenerFormasPago(): Promise<FormaPago[]> {
  try {
    const { data, error } = await supabase
      .from('Forma_Pago')
      .select('*')
      .order('form_pa_tipo_int', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo formas de pago:', error)
    throw error
  }
}

export async function obtenerProductos(): Promise<ProductoDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos')
      .select('*')
      .order('pro_nomb_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo productos:', error)
    throw error
  }
}

export async function crearProducto(productoData: {
  pro_nomb_vac: string
  pro_desc_vac: string | null
  pro_prec_unitario_int: number
}): Promise<ProductoDatabase> {
  try {
    // Limpiar datos antes de insertar (convertir strings vacíos a null)
    const datosLimpios = {
      pro_nomb_vac: productoData.pro_nomb_vac?.trim() || null,
      pro_desc_vac: productoData.pro_desc_vac?.trim() || null,
      pro_prec_unitario_int: productoData.pro_prec_unitario_int || null,
      pro_stock_int: 0 // Stock inicial en 0
    }

    // Validar que el nombre no esté vacío
    if (!datosLimpios.pro_nomb_vac) {
      throw new Error('El nombre del producto es obligatorio')
    }

    const { data, error } = await supabase
      .from('Productos')
      .insert(datosLimpios)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando producto:', error)
    throw error
  }
}

export async function actualizarProducto(id: string, productoData: {
  pro_nomb_vac?: string
  pro_desc_vac?: string | null
  pro_prec_unitario_int?: number
  pro_stock_int?: number
}): Promise<ProductoDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es obligatorio')
    }

    const updateData: any = {
      pro_updated_at_dt: new Date().toISOString()
    }

    // Solo agregar campos que se están actualizando
    if (productoData.pro_nomb_vac !== undefined) {
      const nombreLimpio = productoData.pro_nomb_vac?.trim()
      if (!nombreLimpio) {
        throw new Error('El nombre del producto es obligatorio')
      }
      updateData.pro_nomb_vac = nombreLimpio
    }
    if (productoData.pro_desc_vac !== undefined) {
      updateData.pro_desc_vac = productoData.pro_desc_vac?.trim() || null
    }
    if (productoData.pro_prec_unitario_int !== undefined) {
      updateData.pro_prec_unitario_int = productoData.pro_prec_unitario_int || null
    }
    if (productoData.pro_stock_int !== undefined) {
      updateData.pro_stock_int = productoData.pro_stock_int || null
    }

    const { data, error } = await supabase
      .from('Productos')
      .update(updateData)
      .eq('pro_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando producto:', error)
    throw error
  }
}

// Obtener certificados de calidad para un producto específico
export async function obtenerCertificadosPorProducto(productoId: string): Promise<CertificadoCalidadDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos_Certificados')
      .select(`
        certificado:Certificados_Calidad(*)
      `)
      .eq('pro_id_int', productoId)

    if (error) throw error

    // Extraer solo los certificados de la respuesta
    return (data?.map(item => item.certificado).filter(Boolean) || []) as unknown as CertificadoCalidadDatabase[]
  } catch (error) {
    console.error('Error obteniendo certificados del producto:', error)
    throw error
  }
}

// Obtener fichas técnicas para un producto específico
export async function obtenerFichasTecnicasPorProducto(productoId: string): Promise<FichaTecnicaDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos_Fichas_Tecnicas')
      .select(`
        ficha_tecnica:Fichas_Tecnicas(*)
      `)
      .eq('pro_id_int', productoId)

    if (error) throw error

    // Extraer solo las fichas técnicas de la respuesta
    return (data?.map(item => item.ficha_tecnica).filter(Boolean) || []) as unknown as FichaTecnicaDatabase[]
  } catch (error) {
    console.error('Error obteniendo fichas técnicas del producto:', error)
    throw error
  }
}

// Obtener certificados de calidad para múltiples productos
export async function obtenerCertificadosPorProductos(productosIds: string[]): Promise<{ [key: string]: CertificadoCalidadDatabase[] }> {
  try {
    if (productosIds.length === 0) return {}

    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .select('*')
      .in('pro_id_int', productosIds)

    if (error) throw error

    // Agrupar certificados por producto ID
    const certificadosPorProducto: { [key: string]: CertificadoCalidadDatabase[] } = {}
    data?.forEach((certificado: CertificadoCalidadDatabase) => {
      if (certificado.pro_id_int) {
        if (!certificadosPorProducto[certificado.pro_id_int]) {
          certificadosPorProducto[certificado.pro_id_int] = []
        }
        certificadosPorProducto[certificado.pro_id_int].push(certificado)
      }
    })

    return certificadosPorProducto
  } catch (error) {
    console.error('Error obteniendo certificados de productos:', error)
    throw error
  }
}

// Obtener fichas técnicas para múltiples productos
export async function obtenerFichasTecnicasPorProductos(productosIds: string[]): Promise<{ [key: string]: FichaTecnicaDatabase[] }> {
  try {
    if (productosIds.length === 0) return {}

    const { data, error } = await supabase
      .from('Ficha_Tecnica')
      .select('*')
      .in('pro_id_int', productosIds)

    if (error) throw error

    // Agrupar fichas técnicas por producto ID
    const fichasPorProducto: { [key: string]: FichaTecnicaDatabase[] } = {}
    data?.forEach((ficha: FichaTecnicaDatabase) => {
      if (ficha.pro_id_int) {
        if (!fichasPorProducto[ficha.pro_id_int]) {
          fichasPorProducto[ficha.pro_id_int] = []
        }
        fichasPorProducto[ficha.pro_id_int].push(ficha)
      }
    })

    return fichasPorProducto
  } catch (error) {
    console.error('Error obteniendo fichas técnicas de productos:', error)
    throw error
  }
}

// ============================================
// FUNCIONES CRUD PARA FICHAS TÉCNICAS
// ============================================

// Obtener todas las fichas técnicas con información del producto
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

// Crear una nueva ficha técnica
export async function crearFichaTecnica(fichaTecnicaData: {
  fit_tec_nom_planta_vac: string
  fit_tec_cod_vac: string | null
  pro_id_int: string
  fit_tec_imag_vac?: string | null
}): Promise<FichaTecnicaDatabase> {
  try {
    // Limpiar datos antes de insertar (convertir strings vacíos a null)
    const datosLimpios = {
      fit_tec_nom_planta_vac: fichaTecnicaData.fit_tec_nom_planta_vac?.trim() || null,
      fit_tec_cod_vac: fichaTecnicaData.fit_tec_cod_vac?.trim() || null,
      pro_id_int: fichaTecnicaData.pro_id_int,
      fit_tec_imag_vac: fichaTecnicaData.fit_tec_imag_vac?.trim() || null
    }

    // Verificar que no exista ya una ficha técnica para este producto
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

// Actualizar una ficha técnica existente
export async function actualizarFichaTecnica(id: string, fichaTecnicaData: {
  fit_tec_nom_planta_vac?: string
  fit_tec_cod_vac?: string | null
  pro_id_int?: string
  fit_tec_imag_vac?: string | null
}): Promise<FichaTecnicaDatabase> {
  try {
    // Limpiar datos y crear objeto de actualización
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

    // Agregar timestamp de actualización
    updateData.fit_tec_updated_at_dt = new Date().toISOString()

    // Validar que el nombre no esté vacío si se está actualizando
    if (updateData.fit_tec_nom_planta_vac === null) {
      throw new Error('El nombre de la planta es requerido')
    }

    // Si se está cambiando el producto, verificar que no exista ya una ficha para ese producto
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

// Eliminar una ficha técnica
export async function eliminarFichaTecnica(id: string): Promise<void> {
  try {
    // Primero obtener la ficha técnica para verificar si tiene imagen
    const { data: fichaTecnica, error: fichaError } = await supabase
      .from('Ficha_Tecnica')
      .select('fit_tec_imag_vac')
      .eq('fit_tec_id_int', id)
      .single()

    if (fichaError) throw fichaError

    // Si la ficha técnica tiene imagen, eliminarla primero del storage
    if (fichaTecnica?.fit_tec_imag_vac) {
      try {
        const result = await eliminarImagenFichaTecnica(fichaTecnica.fit_tec_imag_vac)
        if (!result.success) {
          console.error('Error al eliminar imagen del storage:', result.error)
        }
      } catch (imageError) {
        console.error('Error al eliminar imagen del storage, continuando con eliminación de la ficha:', imageError)
        // No lanzar error aquí para permitir que se elimine el registro aunque falle la imagen
      }
    }

    // Eliminar el registro de la base de datos
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

// Obtener ficha técnica por ID
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

// Obtener ficha técnica por producto ID
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

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    return data || null
  } catch (error) {
    console.error('Error obteniendo ficha técnica por producto:', error)
    throw error
  }
}

// ============================================
// FUNCIONES PARA FICHAS TÉCNICAS COMPLETAS (CON RELACIONES)
// ============================================

// Obtener ficha técnica completa con todas sus relaciones
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

    // Obtener detalle
    const { data: detalle } = await supabase
      .from('Detalle_Ficha_Tecnica')
      .select('*')
      .eq('fit_tec_id_int', id)
      .single()

    // Obtener taxonomía
    const { data: taxonomia } = await supabase
      .from('Taxonomias')
      .select('*')
      .eq('fit_tec_id_int', id)
      .single()

    // Obtener zona de colecta
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

// Obtener fichas técnicas completas por códigos de producto
export async function obtenerFichasTecnicasCompletasPorCodigos(codigos: string[]): Promise<FichaTecnicaCompletaDatabase[]> {
  try {
    if (!codigos || codigos.length === 0) return []

    // Los "códigos" pueden ser UUIDs de productos o códigos de texto
    // Primero intentar como UUIDs de productos
    const { data: fichasPorUuid, error: error1 } = await supabase
      .from('Ficha_Tecnica')
      .select(`
        *,
        producto:Productos(*)
      `)
      .in('pro_id_int', codigos)

    // Luego buscar por códigos de texto (tanto de ficha como de producto)
    const { data: fichasPorCodigo, error: error2 } = await supabase
      .from('Ficha_Tecnica')
      .select(`
        *,
        producto:Productos(*)
      `)
      .in('fit_tec_cod_vac', codigos)

    // Buscar productos por código de texto y luego sus fichas
    const { data: productos, error: error3 } = await supabase
      .from('Productos')
      .select('pro_id_int')
      .in('pro_cod_vac', codigos)

    let fichasPorProducto = []
    if (productos && productos.length > 0) {
      const productosIds = productos.map(p => p.pro_id_int)
      const { data, error: error4 } = await supabase
        .from('Ficha_Tecnica')
        .select(`
          *,
          producto:Productos(*)
        `)
        .in('pro_id_int', productosIds)
      
      if (!error4) fichasPorProducto = data || []
    }

    // Combinar todos los resultados y eliminar duplicados
    const todasFichas = [
      ...(fichasPorUuid || []), 
      ...(fichasPorCodigo || []), 
      ...fichasPorProducto
    ]
    const fichasUnicas = todasFichas.filter((ficha, index, self) => 
      self.findIndex(f => f.fit_tec_id_int === ficha.fit_tec_id_int) === index
    )

    if (fichasUnicas.length === 0) return []

    // Para cada ficha, obtener sus relaciones
    const fichasCompletas: FichaTecnicaCompletaDatabase[] = []

    for (const ficha of fichasUnicas) {
      // Obtener detalle
      const { data: detalle } = await supabase
        .from('Detalle_Ficha_Tecnica')
        .select('*')
        .eq('fit_tec_id_int', ficha.fit_tec_id_int)
        .single()

      // Obtener taxonomía
      const { data: taxonomia } = await supabase
        .from('Taxonomias')
        .select('*')
        .eq('fit_tec_id_int', ficha.fit_tec_id_int)
        .single()

      // Obtener zona de colecta
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

// Obtener todas las fichas técnicas completas
export async function obtenerFichasTecnicasCompletas(): Promise<FichaTecnicaCompletaDatabase[]> {
  try {
    // Obtener todas las fichas técnicas básicas
    const { data: fichasTecnicas, error: fichasError } = await supabase
      .from('Ficha_Tecnica')
      .select('*')
      .order('fit_tec_created_at_dt', { ascending: false })

    if (fichasError) throw fichasError
    if (!fichasTecnicas || fichasTecnicas.length === 0) return []

    // Obtener todos los IDs
    const ids = fichasTecnicas.map(ficha => ficha.fit_tec_id_int)

    // Obtener datos relacionados en paralelo
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

    // Crear mapas para acceso rápido
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

    // Construir objetos completos
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

// Subir imagen de ficha técnica al storage
export async function subirImagenFichaTecnica(file: File, fileName: string): Promise<{ url: string | null; error: string | null }> {
  try {
    // Usar cliente autenticado para operaciones de storage
    const supabaseAuth = createAuthenticatedClient()
    
    // Verificar autenticación antes de proceder
    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { url: null, error: 'No hay una sesión autenticada activa' }
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return { url: null, error: 'Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG y WebP.' }
    }

    // Validar tamaño de archivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { url: null, error: 'El archivo es demasiado grande. Tamaño máximo: 5MB.' }
    }

    // Crear nombre único para el archivo
    const timestamp = Date.now()
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const finalFileName = `${timestamp}_${cleanFileName}`

    // Subir archivo al bucket 'admin' en la carpeta 'fichaTecnica'
    const { data, error } = await supabaseAuth.storage
      .from('admin')
      .upload(`fichaTecnica/${finalFileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      return { url: null, error: `Error al subir la imagen: ${error.message}` }
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabaseAuth.storage
      .from('admin')
      .getPublicUrl(`fichaTecnica/${finalFileName}`)

    return { url: publicUrl, error: null }
  } catch (error) {
    return { url: null, error: 'Error inesperado al subir la imagen' }
  }
}

// Eliminar imagen de ficha técnica del storage
export async function eliminarImagenFichaTecnica(imageUrl: string): Promise<{ success: boolean; error: string | null }> {
  try {
    // Usar cliente autenticado para operaciones de storage
    const supabaseAuth = createAuthenticatedClient()
    
    // Verificar autenticación antes de proceder
    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { success: false, error: 'No hay una sesión autenticada activa' }
    }

    // Extraer el path del archivo desde la URL
    const urlParts = imageUrl.split('/fichaTecnica/')
    if (urlParts.length !== 2) {
      return { success: false, error: 'URL de imagen inválida' }
    }

    const fileName = urlParts[1]
    const filePath = `fichaTecnica/${fileName}`

    const { error } = await supabaseAuth.storage
      .from('admin')
      .remove([filePath])

    if (error) {
      console.error('Error eliminando imagen:', error)
      return { success: false, error: 'Error al eliminar la imagen' }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error en eliminación de imagen:', error)
    return { success: false, error: 'Error inesperado al eliminar la imagen' }
  }
}

// ============================================
// FUNCIONES ESPECÍFICAS DE CLIENTES
// ============================================

// Obtener una persona específica por ID
export async function obtenerPersonaPorId(id: string) {
  try {
    const { data, error } = await supabase
      .from('Personas')
      .select(`
        *,
        Persona_Natural(*),
        Persona_Juridica(*)
      `)
      .eq('per_id_int', id)
      .single()

    if (error) throw error

    if (data) {
      // Transformar los datos de persona
      const persona = {
        ...data,
        tipo: data.Persona_Natural && data.Persona_Natural.length > 0 ? 'natural' : 'juridica',
        persona_natural: data.Persona_Natural && data.Persona_Natural.length > 0
          ? data.Persona_Natural[0]
          : null,
        persona_juridica: data.Persona_Juridica && data.Persona_Juridica.length > 0
          ? data.Persona_Juridica[0]
          : null
      }

      return persona
    }

    return null
  } catch (error) {
    console.error('Error obteniendo persona por ID:', error)
    throw error
  }
}

// Obtener cotizaciones de un cliente específico
export async function obtenerCotizacionesPorCliente(clienteId: string) {
  try {
    const { data, error } = await supabase
      .from('Cotizaciones')
      .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(*)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
      .eq('per_id_int', clienteId)
      .order('cot_fec_emis_dt', { ascending: false })

    if (error) throw error

    // Transformar los datos de persona igual que en obtenerCotizaciones
    const cotizacionesTransformadas = data?.map(cotizacion => {
      if (cotizacion.persona) {
        const persona = cotizacion.persona
        cotizacion.persona = {
          ...persona,
          tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
          persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
            ? persona.Persona_Natural[0]
            : null,
          persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
            ? persona.Persona_Juridica[0]
            : null
        }
      }
      return cotizacion
    })

    return cotizacionesTransformadas || []
  } catch (error) {
    console.error('Error obteniendo cotizaciones por cliente:', error)
    throw error
  }
}

// Obtener pedidos de un cliente específico
export async function obtenerPedidosPorCliente(clienteId: string) {
  try {
    // Primero obtener las cotizaciones del cliente
    const { data: cotizacionesCliente, error: cotizacionesError } = await supabase
      .from('Cotizaciones')
      .select('cot_id_int')
      .eq('per_id_int', clienteId)

    if (cotizacionesError) throw cotizacionesError

    if (!cotizacionesCliente || cotizacionesCliente.length === 0) {
      return []
    }

    // Obtener los IDs de las cotizaciones
    const cotizacionIds = cotizacionesCliente.map(c => c.cot_id_int)

    // Obtener pedidos que pertenecen a esas cotizaciones
    const { data, error } = await supabase
      .from('Pedidos')
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        cotizacion:Cotizaciones(
          *,
          estado_cotizacion:Estado_Cotizacion(*),
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          ),
          detalle_cotizacion:Detalle_Cotizacion(
            *,
            producto:Productos(*)
          ),
          informacion_adicional:Informacion_Adicional(
            *,
            forma_pago:Forma_Pago(*)
          )
        )
      `)
      .in('cot_id_int', cotizacionIds)
      .order('ped_created_at_dt', { ascending: false })

    if (error) throw error

    // Transformar los datos de persona igual que en obtenerPedidos
    const pedidosTransformados = data?.map(pedido => {
      if (pedido.cotizacion && pedido.cotizacion.persona) {
        const persona = pedido.cotizacion.persona
        pedido.cotizacion.persona = {
          ...persona,
          tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
          persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
            ? persona.Persona_Natural[0]
            : null,
          persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
            ? persona.Persona_Juridica[0]
            : null
        }
      }
      return pedido
    })

    return pedidosTransformados || []
  } catch (error) {
    console.error('Error obteniendo pedidos por cliente:', error)
    throw error
  }
}

// ============================================
// FUNCIONES ESPECÍFICAS DE PEDIDOS
// ============================================

export async function obtenerPedidos() {
  try {
    const { data, error } = await supabase
      .from('Pedidos')
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        cotizacion:Cotizaciones(
          *,
          estado_cotizacion:Estado_Cotizacion(*),
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          ),
          detalle_cotizacion:Detalle_Cotizacion(
            *,
            producto:Productos(*)
          ),
          informacion_adicional:Informacion_Adicional(
            *,
            forma_pago:Forma_Pago(*)
          )
        )
      `)
      .order('ped_created_at_dt', { ascending: false })

    if (error) throw error

    // Transformar los datos de persona
    const pedidosTransformados = data?.map(pedido => {
      if (pedido.cotizacion && pedido.cotizacion.persona) {
        const persona = pedido.cotizacion.persona
        pedido.cotizacion.persona = {
          ...persona,
          tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
          persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
            ? persona.Persona_Natural[0]
            : null,
          persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
            ? persona.Persona_Juridica[0]
            : null
        }
      }
      return pedido
    })

    return pedidosTransformados || []
  } catch (error) {
    console.error('Error obteniendo pedidos:', error)
    throw error
  }
}

// Función para verificar si una cotización ya tiene un pedido asociado
export async function verificarCotizacionTienePedido(cotizacionId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('Pedidos')
      .select('ped_id_int')
      .eq('cot_id_int', cotizacionId)
      .limit(1)

    if (error) throw error
    return data && data.length > 0
  } catch (error) {
    console.error('Error verificando cotización con pedido:', error)
    throw error
  }
}

// Función para obtener cotizaciones disponibles (sin pedido asociado)
export async function obtenerCotizacionesDisponibles() {
  try {
    // Primero obtener todas las cotizaciones
    const { data: todasCotizaciones, error: cotizacionesError } = await supabase
      .from('Cotizaciones')
      .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(*)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
      .order('cot_fec_emis_dt', { ascending: false })

    if (cotizacionesError) throw cotizacionesError

    // Obtener todas las cotizaciones que ya tienen pedido
    const { data: cotizacionesConPedido, error: pedidosError } = await supabase
      .from('Pedidos')
      .select('cot_id_int')

    if (pedidosError) throw pedidosError

    // Crear un Set con los IDs de cotizaciones que ya tienen pedido
    const cotizacionesUsadas = new Set(
      cotizacionesConPedido?.map(p => p.cot_id_int) || []
    )

    // Filtrar cotizaciones que NO tienen pedido asociado
    const cotizacionesDisponibles = todasCotizaciones?.filter(
      cotizacion => !cotizacionesUsadas.has(cotizacion.cot_id_int)
    ) || []

    // Transformar los datos de persona igual que en obtenerCotizaciones
    const cotizacionesTransformadas = cotizacionesDisponibles.map(cotizacion => {
      if (cotizacion.persona) {
        const persona = cotizacion.persona
        cotizacion.persona = {
          ...persona,
          tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
          persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
            ? persona.Persona_Natural[0]
            : null,
          persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
            ? persona.Persona_Juridica[0]
            : null
        }
      }
      return cotizacion
    })

    return cotizacionesTransformadas
  } catch (error) {
    console.error('Error obteniendo cotizaciones disponibles:', error)
    throw error
  }
}

export async function crearPedido(pedidoData: {
  cotizacion_id: string
  estado_id?: string | null
  codigo_rastreo?: string | null
  observaciones?: string | null
  numero_comprobante?: string | null
  imagen_url?: string | null
}) {
  try {
    // Validar que la cotización no esté vacía
    if (!pedidoData.cotizacion_id || pedidoData.cotizacion_id.trim() === '') {
      throw new Error('La cotización es obligatoria')
    }

    // Verificar si ya existe un pedido para esta cotización
    const yaExistePedido = await verificarCotizacionTienePedido(pedidoData.cotizacion_id.trim())
    if (yaExistePedido) {
      throw new Error('Esta cotización ya tiene un pedido asociado. No se puede crear otro pedido para la misma cotización.')
    }

    const codigoSeguimiento = await generarCodigoSeguimiento()
    const fechaActual = new Date().toISOString()

    // Si no se especifica estado, usar el primer estado por orden (PEDIDO_RECIBIDO)
    let estadoId = pedidoData.estado_id
    if (!estadoId || estadoId.trim() === '') {
      const { data: estados } = await supabase
        .from('Estado_Pedido')
        .select('est_ped_id_int')
        .order('est_ped_tipo_int', { ascending: true })
        .limit(1)
        .single()

      estadoId = estados?.est_ped_id_int
    }

    // Solo enviar campos que no están vacíos
    const insertData: any = {
      ped_cod_segui_vac: codigoSeguimiento,
      ped_fec_pedido_dt: fechaActual,
      ped_fec_actualizada_dt: fechaActual,
      est_ped_id_int: estadoId,
      cot_id_int: pedidoData.cotizacion_id.trim()
    }

    // Solo agregar campos opcionales si tienen valor
    if (pedidoData.codigo_rastreo?.trim()) {
      insertData.ped_cod_rastreo_vac = pedidoData.codigo_rastreo
    }
    if (pedidoData.observaciones?.trim()) {
      insertData.ped_observacion_vac = pedidoData.observaciones
    }
    if (pedidoData.numero_comprobante?.trim()) {
      insertData.ped_num_comprob_vac = pedidoData.numero_comprobante
    }
    if (pedidoData.imagen_url?.trim()) {
      insertData.ped_imagen_url = pedidoData.imagen_url
    }

    const { data, error } = await supabase
      .from('Pedidos')
      .insert(insertData)
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        cotizacion:Cotizaciones(
          *,
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          )
        )
      `)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando pedido:', error)
    throw error
  }
}

export async function actualizarPedido(id: string, pedidoData: any) {
  try {
    // Si se está cambiando la cotización, verificar que la nueva cotización no tenga pedido
    if (pedidoData.cotizacion_id !== undefined) {
      // Obtener el pedido actual para verificar si está cambiando la cotización
      const { data: pedidoActual, error: pedidoError } = await supabase
        .from('Pedidos')
        .select('cot_id_int')
        .eq('ped_id_int', id)
        .single()

      if (pedidoError) throw pedidoError

      // Si está cambiando a una cotización diferente
      if (pedidoActual.cot_id_int !== pedidoData.cotizacion_id) {
        const yaExistePedido = await verificarCotizacionTienePedido(pedidoData.cotizacion_id)
        if (yaExistePedido) {
          throw new Error('La cotización seleccionada ya tiene un pedido asociado. No se puede asignar a otro pedido.')
        }
      }
    }

    const updateData: any = {
      ped_fec_actualizada_dt: new Date().toISOString()
    }

    if (pedidoData.cotizacion_id !== undefined) updateData.cot_id_int = pedidoData.cotizacion_id
    if (pedidoData.estado_id !== undefined) updateData.est_ped_id_int = pedidoData.estado_id
    if (pedidoData.codigo_rastreo !== undefined) updateData.ped_cod_rastreo_vac = pedidoData.codigo_rastreo
    if (pedidoData.observaciones !== undefined) updateData.ped_observacion_vac = pedidoData.observaciones
    if (pedidoData.numero_comprobante !== undefined) updateData.ped_num_comprob_vac = pedidoData.numero_comprobante
    if (pedidoData.imagen_url !== undefined) updateData.ped_imagen_url = pedidoData.imagen_url

    const { data, error } = await supabase
      .from('Pedidos')
      .update(updateData)
      .eq('ped_id_int', id)
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        cotizacion:Cotizaciones(
          *,
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          )
        )
      `)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando pedido:', error)
    throw error
  }
}

export async function eliminarPedido(id: string): Promise<void> {
  try {
    // Primero obtener el pedido para verificar si tiene imagen
    const { data: pedido, error: pedidoError } = await supabase
      .from('Pedidos')
      .select('ped_imagen_url')
      .eq('ped_id_int', id)
      .single()

    if (pedidoError) throw pedidoError

    // Si el pedido tiene imagen, eliminarla primero del storage
    if (pedido?.ped_imagen_url) {
      try {
        await eliminarImagenPedido(pedido.ped_imagen_url)
      } catch (imageError) {
        console.error('Error al eliminar imagen del storage, continuando con eliminación del pedido:', imageError)
        // No lanzar error aquí para permitir que se elimine el registro aunque falle la imagen
      }
    }

    // Eliminar el registro de la base de datos
    const { error } = await supabase
      .from('Pedidos')
      .delete()
      .eq('ped_id_int', id)

    if (error) throw error
    
  } catch (error) {
    console.error('Error eliminando pedido:', error)
    throw error
  }
}

// ============================================
// FUNCIONES DE STORAGE PARA IMÁGENES
// ============================================

export async function subirImagenPedido(file: File, pedidoId?: string): Promise<string> {
  try {
    // Usar cliente autenticado para operaciones de storage
    const supabaseAuth = createAuthenticatedClient()
    
    // Verificar autenticación antes de proceder
    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      throw new Error('No hay una sesión autenticada activa')
    }

    // Validar archivo antes de subir
    if (!file) {
      throw new Error('No se proporcionó archivo')
    }
    
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo debe ser una imagen')
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()?.toLowerCase()
    const fileName = pedidoId 
      ? `pedido_${pedidoId}_${timestamp}.${extension}`
      : `pedido_temp_${timestamp}.${extension}`

    // Subir a bucket 'admin' en carpeta 'pedidos'
    const { data, error } = await supabaseAuth.storage
      .from('admin')
      .upload(`pedidos/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error subiendo imagen de pedido:', error)
      throw new Error(`Error del servidor: ${error.message}`)
    }

    if (!data) {
      throw new Error('No se recibió respuesta del servidor')
    }

    // Obtener URL pública
    const { data: urlData } = supabaseAuth.storage
      .from('admin')
      .getPublicUrl(`pedidos/${fileName}`)

    if (!urlData.publicUrl) {
      throw new Error('No se pudo generar la URL pública')
    }

    return urlData.publicUrl
  } catch (error) {
    console.error('Error en subida de imagen de pedido:', error)
    throw error
  }
}

export async function eliminarImagenPedido(imageUrl: string): Promise<void> {
  try {
    // Usar cliente autenticado para operaciones de storage
    const supabaseAuth = createAuthenticatedClient()
    
    // Verificar autenticación antes de proceder
    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      throw new Error('No hay una sesión autenticada activa')
    }

    if (!imageUrl) {
      throw new Error('No se proporcionó URL de imagen')
    }
    
    // Extraer el path del archivo de la URL
    const urlParts = imageUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    if (!fileName) {
      throw new Error('No se pudo extraer el nombre del archivo de la URL')
    }

    // Eliminar del bucket 'admin' carpeta 'pedidos'
    const { error } = await supabaseAuth.storage
      .from('admin')
      .remove([`pedidos/${fileName}`])

    if (error) {
      console.error('Error eliminando imagen del storage:', error)
      throw new Error(`Error del servidor: ${error.message}`)
    }

  } catch (error) {
    console.error('Error en eliminación de imagen de pedido:', error)
    throw error
  }
}

// ============================================
// FUNCIONES ESPECÍFICAS DE COTIZACIONES
// ============================================

export async function obtenerCotizaciones() {
  try {
    const { data, error } = await supabase
      .from('Cotizaciones')
      .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(*)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
      .order('cot_fec_emis_dt', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo cotizaciones:', error)
    throw error
  }
}

export async function crearCotizacion(cotizacionData: {
  cliente_id: string
  fecha_emision: string | null
  fecha_vencimiento: string | null
  incluye_igv: boolean
  productos: Array<{
    producto_id: string | null
    cantidad: number | null
    precio_historico: number | null
  }>
  forma_pago_id: string | null
  lugar_recojo: string | null
  forma_entrega: string | null
  terminos_condiciones: string | null
}) {
  try {
    const numeroCotizacion = await generarNumeroCotizacion()

    // Limpiar datos antes de insertar (convertir strings vacíos a null)
    const datosLimpios = {
      cliente_id: cotizacionData.cliente_id || null,
      fecha_emision: new Date().toISOString(), 
      fecha_vencimiento: cotizacionData.fecha_vencimiento?.trim() ?
        new Date(`${cotizacionData.fecha_vencimiento}T23:59:59-05:00`).toISOString() :
        null,
      incluye_igv: cotizacionData.incluye_igv,
      lugar_recojo: cotizacionData.lugar_recojo?.trim() || null,
      forma_entrega: cotizacionData.forma_entrega?.trim() || null,
      terminos_condiciones: cotizacionData.terminos_condiciones?.trim() || null,
      forma_pago_id: cotizacionData.forma_pago_id || null
    }

    // Crear cotización
    const { data: cotizacion, error: cotizacionError } = await supabase
      .from('Cotizaciones')
      .insert({
        cot_num_vac: numeroCotizacion,
        cot_fec_emis_dt: datosLimpios.fecha_emision,
        cot_fec_venc_dt: datosLimpios.fecha_vencimiento,
        cot_igv_bol: datosLimpios.incluye_igv,
        per_id_int: datosLimpios.cliente_id 
      })
      .select()
      .single()

    if (cotizacionError) throw cotizacionError

    // Crear detalles (solo productos válidos de BD)
    const productosValidos = cotizacionData.productos.filter(prod =>
      prod.producto_id &&
      prod.producto_id !== 'personalizado' &&
      prod.cantidad &&
      prod.precio_historico
    )

    // Crear detalles solo si hay productos válidos
    if (productosValidos.length > 0) {
      const detalles = productosValidos.map(prod => ({
        pro_id_int: prod.producto_id, // ya es el ID real de BD
        cot_id_int: cotizacion.cot_id_int,
        det_cot_cant_int: prod.cantidad,
        det_cot_prec_hist_int: prod.precio_historico
      }))

      const { error: detalleError } = await supabase
        .from('Detalle_Cotizacion')
        .insert(detalles)

      if (detalleError) {
      }
    } else {
    }

    // Crear información adicional (solo si hay datos para insertar)
    if (datosLimpios.lugar_recojo || datosLimpios.forma_entrega || datosLimpios.terminos_condiciones || datosLimpios.forma_pago_id) {
      const { error: infoError } = await supabase
        .from('Informacion_Adicional')
        .insert({
          inf_ad_lug_recojo_vac: datosLimpios.lugar_recojo,
          inf_ad_form_entr_vac: datosLimpios.forma_entrega,
          inf_ad_term_cond_vac: datosLimpios.terminos_condiciones,
          form_pa_id_int: datosLimpios.forma_pago_id,
          cot_id_int: cotizacion.cot_id_int
        })

      if (infoError) throw infoError
    }

    return cotizacion
  } catch (error) {
    throw error
  }
}

export async function obtenerCotizacionPorId(id: string) {
  try {
    const { data, error } = await supabase
      .from('Cotizaciones')
      .select(`
        *,
        estado_cotizacion:Estado_Cotizacion(*),
        persona:Personas(
          *,
          Persona_Natural(*),
          Persona_Juridica(*)
        ),
        detalle_cotizacion:Detalle_Cotizacion(
          *,
          producto:Productos(*)
        ),
        informacion_adicional:Informacion_Adicional(
          *,
          forma_pago:Forma_Pago(*)
        )
      `)
      .eq('cot_id_int', id)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error obteniendo cotización por ID:', error)
    throw error
  }
}

export async function actualizarCotizacion(id: string, cotizacionData: {
  cliente_id?: string
  fecha_emision?: string | null
  fecha_vencimiento?: string | null
  incluye_igv?: boolean
  productos?: Array<{
    producto_id: string | null
    cantidad: number | null
    precio_historico: number | null
  }>
  forma_pago_id?: string | null
  lugar_recojo?: string | null
  forma_entrega?: string | null
  terminos_condiciones?: string | null
}) {
  try {
    // Actualizar cotización principal
    const datosLimpios: any = {}

    if (cotizacionData.cliente_id !== undefined) datosLimpios.per_id_int = cotizacionData.cliente_id
    
    // Solo actualizar fecha de emisión si se proporciona una fecha válida y diferente
    if (cotizacionData.fecha_emision !== undefined && cotizacionData.fecha_emision?.trim()) {
      try {
        const fechaLima = new Date(`${cotizacionData.fecha_emision}T00:00:00-05:00`)
        if (isNaN(fechaLima.getTime())) {
          throw new Error('Fecha de emisión inválida')
        }
        datosLimpios.cot_fec_emis_dt = fechaLima.toISOString()
      } catch (error) {
        throw new Error(`Error procesando fecha de emisión: ${cotizacionData.fecha_emision}`)
      }
    }
    
    // Solo actualizar fecha de vencimiento si se proporciona una fecha válida y diferente
    if (cotizacionData.fecha_vencimiento !== undefined && cotizacionData.fecha_vencimiento?.trim()) {
      try {
        const fechaLima = new Date(`${cotizacionData.fecha_vencimiento}T23:59:59-05:00`)
        if (isNaN(fechaLima.getTime())) {
          throw new Error('Fecha de vencimiento inválida')
        }
        datosLimpios.cot_fec_venc_dt = fechaLima.toISOString()
      } catch (error) {
        throw new Error(`Error procesando fecha de vencimiento: ${cotizacionData.fecha_vencimiento}`)
      }
    }
    if (cotizacionData.incluye_igv !== undefined) datosLimpios.cot_igv_bol = cotizacionData.incluye_igv

    if (Object.keys(datosLimpios).length > 0) {
      const { error: cotizacionError } = await supabase
        .from('Cotizaciones')
        .update(datosLimpios)
        .eq('cot_id_int', id)

      if (cotizacionError) throw cotizacionError
    }

    // Actualizar productos si se proporcionan
    if (cotizacionData.productos) {
      // Eliminar detalles existentes
      const { error: deleteError } = await supabase
        .from('Detalle_Cotizacion')
        .delete()
        .eq('cot_id_int', id)

      if (deleteError) throw deleteError

      // Insertar nuevos detalles
      const productosValidos = cotizacionData.productos.filter(prod =>
        prod.producto_id &&
        prod.producto_id !== 'personalizado' &&
        prod.cantidad &&
        prod.precio_historico
      )

      if (productosValidos.length > 0) {
        const detalles = productosValidos.map(prod => ({
          pro_id_int: prod.producto_id,
          cot_id_int: id,
          det_cot_cant_int: prod.cantidad,
          det_cot_prec_hist_int: prod.precio_historico
        }))

        const { error: insertError } = await supabase
          .from('Detalle_Cotizacion')
          .insert(detalles)

        if (insertError) throw insertError
      }
    }

    // Actualizar información adicional si se proporciona
    if (cotizacionData.lugar_recojo !== undefined ||
      cotizacionData.forma_entrega !== undefined ||
      cotizacionData.terminos_condiciones !== undefined ||
      cotizacionData.forma_pago_id !== undefined) {

      const infoLimpia: any = {}
      if (cotizacionData.lugar_recojo !== undefined) infoLimpia.inf_ad_lug_recojo_vac = cotizacionData.lugar_recojo?.trim() || null
      if (cotizacionData.forma_entrega !== undefined) infoLimpia.inf_ad_form_entr_vac = cotizacionData.forma_entrega?.trim() || null
      if (cotizacionData.terminos_condiciones !== undefined) infoLimpia.inf_ad_term_cond_vac = cotizacionData.terminos_condiciones?.trim() || null
      if (cotizacionData.forma_pago_id !== undefined) infoLimpia.form_pa_id_int = cotizacionData.forma_pago_id || null

      // Verificar si ya existe información adicional
      const { data: infoExistente } = await supabase
        .from('Informacion_Adicional')
        .select('*')
        .eq('cot_id_int', id)
        .single()

      if (infoExistente) {
        // Actualizar existente
        const { error: updateInfoError } = await supabase
          .from('Informacion_Adicional')
          .update(infoLimpia)
          .eq('cot_id_int', id)

        if (updateInfoError) throw updateInfoError
      } else {
        // Crear nueva
        const { error: insertInfoError } = await supabase
          .from('Informacion_Adicional')
          .insert({
            ...infoLimpia,
            cot_id_int: id
          })

        if (insertInfoError) throw insertInfoError
      }
    }

    // Obtener cotización actualizada
    return await obtenerCotizacionPorId(id)
  } catch (error) {
    console.error('Error actualizando cotización:', error)
    throw error
  }
}

// ============================================
// SEGUIMIENTO DE PEDIDOS
// ============================================

export async function obtenerPedidoPorCodigo(codigoSeguimiento: string) {
  try {
    const { data, error } = await supabase
      .from('Pedidos')
      .select(`
        *,
        estado_pedido:Estado_Pedido(*),
        cotizacion:Cotizaciones(
          *,
          estado_cotizacion:Estado_Cotizacion(*),
          persona:Personas(
            *,
            Persona_Natural(*),
            Persona_Juridica(*)
          ),
          detalle_cotizacion:Detalle_Cotizacion(
            *,
            producto:Productos(*)
          ),
          informacion_adicional:Informacion_Adicional(
            *,
            forma_pago:Forma_Pago(*)
          )
        )
      `)
      .eq('ped_cod_segui_vac', codigoSeguimiento)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }

    // Transformar los datos para que coincidan con nuestro tipo ClientePersona
    if (data && data.cotizacion && data.cotizacion.persona) {
      const persona = data.cotizacion.persona

      // Los datos vienen como arrays, necesitamos convertirlos
      data.cotizacion.persona = {
        ...persona,
        tipo: persona.Persona_Natural && persona.Persona_Natural.length > 0 ? 'natural' : 'juridica',
        persona_natural: persona.Persona_Natural && persona.Persona_Natural.length > 0
          ? persona.Persona_Natural[0]
          : null,
        persona_juridica: persona.Persona_Juridica && persona.Persona_Juridica.length > 0
          ? persona.Persona_Juridica[0]
          : null
      }
    }

    return data
  } catch (error) {
    console.error('Error obteniendo pedido por código:', error)
    throw error
  }
}

// ============================================
// FUNCIONES HELPER PARA CERTIFICADOS Y FICHAS TÉCNICAS
// ============================================

// Transformar certificado de BD a formato UI
export function transformarCertificadoBD(certificado: CertificadoCalidadDatabase): import('@/components/admin/cotizaciones/types').Certificado {
  return {
    titulo: `Certificado de Calidad - ${certificado.cer_cal_tipo_vac || 'Sin Tipo'}`,
    codigo: certificado.cer_cal_cod_muestra_int ? certificado.cer_cal_cod_muestra_int.toString() : '',
    tipo: certificado.cer_cal_tipo_vac || '',
    informe: certificado.cer_cal_infor_ensayo_vac || '',
    detalle: [
      certificado.cer_cal_result_vac || '',
      certificado.cer_cal_resum_vac || ''
    ].filter(Boolean), // Solo incluir elementos no vacíos
    link: certificado.cer_cal_imag_url || undefined
  }
}

// Transformar ficha técnica de BD a formato UI
export function transformarFichaTecnicaBD(fichaTecnica: FichaTecnicaDatabase): import('@/components/admin/cotizaciones/types').FichaTecnica {
  return {
    titulo: fichaTecnica.fit_tec_nom_planta_vac || 'Ficha Técnica',
    descripcion: `Código: ${fichaTecnica.fit_tec_cod_vac || 'Sin código'}`,
    archivo: fichaTecnica.fit_tec_imag_vac || ''
  }
}

// Transformar múltiples certificados de BD a formato UI
export function transformarCertificadosBD(certificados: CertificadoCalidadDatabase[]): import('@/components/admin/cotizaciones/types').Certificado[] {
  return certificados.map(transformarCertificadoBD)
}

// Transformar múltiples fichas técnicas de BD a formato UI
export function transformarFichasTecnicasBD(fichasTecnicas: FichaTecnicaDatabase[]): import('@/components/admin/cotizaciones/types').FichaTecnica[] {
  return fichasTecnicas.map(transformarFichaTecnicaBD)
}

// ============================================
// FUNCIONES BASE PARA CATEGORÍAS DE TIENDA
// ============================================

export async function obtenerCategorias(): Promise<CategoriaDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Categoria')
      .select('*')
      .order('cat_nom_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo categorías:', error)
    throw error
  }
}

export async function crearCategoria(categoriaData: {
  cat_nom_vac: string
  cat_desc_vac: string | null
}): Promise<CategoriaDatabase> {
  try {
    // Limpiar datos antes de insertar (convertir strings vacíos a null)
    const datosLimpios = {
      cat_nom_vac: categoriaData.cat_nom_vac?.trim() || null,
      cat_desc_vac: categoriaData.cat_desc_vac?.trim() || null
    }

    // Validar que el nombre no esté vacío
    if (!datosLimpios.cat_nom_vac) {
      throw new Error('El nombre de la categoría es obligatorio')
    }

    const { data, error } = await supabase
      .from('Categoria')
      .insert(datosLimpios)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando categoría:', error)
    throw error
  }
}

export async function actualizarCategoria(id: string, categoriaData: {
  cat_nom_vac?: string
  cat_desc_vac?: string | null
}): Promise<CategoriaDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const updateData: any = {}

    // Solo agregar campos que se están actualizando
    if (categoriaData.cat_nom_vac !== undefined) {
      const nombreLimpio = categoriaData.cat_nom_vac?.trim()
      if (!nombreLimpio) {
        throw new Error('El nombre de la categoría es obligatorio')
      }
      updateData.cat_nom_vac = nombreLimpio
    }
    if (categoriaData.cat_desc_vac !== undefined) {
      updateData.cat_desc_vac = categoriaData.cat_desc_vac?.trim() || null
    }

    const { data, error } = await supabase
      .from('Categoria')
      .update(updateData)
      .eq('cat_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando categoría:', error)
    throw error
  }
}

export async function eliminarCategoria(id: string): Promise<void> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    // Verificar si la categoría tiene productos asociados
    const { data: productos, error: productosError } = await supabase
      .from('Productos_Tienda')
      .select('prod_tiend_id_int')
      .eq('cat_id_int', id)
      .limit(1)

    if (productosError) throw productosError

    if (productos && productos.length > 0) {
      throw new Error('No se puede eliminar la categoría porque tiene productos asociados')
    }

    const { error } = await supabase
      .from('Categoria')
      .delete()
      .eq('cat_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando categoría:', error)
    throw error
  }
}

export async function ocultarCategoria(id: string): Promise<CategoriaDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { data, error } = await supabase
      .from('Categoria')
      .update({ cat_activo_bool: false })
      .eq('cat_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error ocultando categoría:', error)
    throw error
  }
}

export async function mostrarCategoria(id: string): Promise<CategoriaDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { data, error } = await supabase
      .from('Categoria')
      .update({ cat_activo_bool: true })
      .eq('cat_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error mostrando categoría:', error)
    throw error
  }
}

export async function obtenerCategoriaPorId(id: string): Promise<CategoriaDatabase | null> {
  try {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { data, error } = await supabase
      .from('Categoria')
      .select('*')
      .eq('cat_id_int', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No encontrado
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error obteniendo categoría por ID:', error)
    throw error
  }
}

// ============================================
// PRODUCTOS DE TIENDA CRUD
// ============================================

export async function obtenerProductosTienda(): Promise<ProductoTiendaDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Productos_Tienda')
      .select('*')
      .order('prod_tiend_nom_vac', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error obteniendo productos de tienda:', error)
    throw error
  }
}

export async function crearProductoTienda(productoData: {
  prod_tiend_nom_vac: string
  prod_tiend_desc_vac: string | null
  prod_tiend_prec_vac: string | null
  cat_id_int: string
}): Promise<ProductoTiendaDatabase> {
  try {
    // Limpiar datos antes de insertar
    const datosLimpios = {
      prod_tiend_nom_vac: productoData.prod_tiend_nom_vac?.trim() || null,
      prod_tiend_desc_vac: productoData.prod_tiend_desc_vac?.trim() || null,
      prod_tiend_prec_vac: productoData.prod_tiend_prec_vac?.trim() || null,
      cat_id_int: productoData.cat_id_int
    }

    // Validar que el nombre no esté vacío
    if (!datosLimpios.prod_tiend_nom_vac) {
      throw new Error('El nombre del producto es obligatorio')
    }

    // Validar que la categoría no esté vacía
    if (!datosLimpios.cat_id_int) {
      throw new Error('La categoría es obligatoria')
    }

    const { data, error } = await supabase
      .from('Productos_Tienda')
      .insert(datosLimpios)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creando producto de tienda:', error)
    throw error
  }
}

export async function actualizarProductoTienda(id: string, productoData: {
  prod_tiend_nom_vac?: string
  prod_tiend_desc_vac?: string | null
  prod_tiend_prec_vac?: string | null
  cat_id_int?: string
}): Promise<ProductoTiendaDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es obligatorio')
    }

    const updateData: any = {}

    // Solo agregar campos que se están actualizando
    if (productoData.prod_tiend_nom_vac !== undefined) {
      const nombreLimpio = productoData.prod_tiend_nom_vac?.trim()
      if (!nombreLimpio) {
        throw new Error('El nombre del producto es obligatorio')
      }
      updateData.prod_tiend_nom_vac = nombreLimpio
    }
    if (productoData.prod_tiend_desc_vac !== undefined) {
      updateData.prod_tiend_desc_vac = productoData.prod_tiend_desc_vac?.trim() || null
    }
    if (productoData.prod_tiend_prec_vac !== undefined) {
      updateData.prod_tiend_prec_vac = productoData.prod_tiend_prec_vac?.trim() || null
    }
    if (productoData.cat_id_int !== undefined) {
      if (!productoData.cat_id_int) {
        throw new Error('La categoría es obligatoria')
      }
      updateData.cat_id_int = productoData.cat_id_int
    }

    const { data, error } = await supabase
      .from('Productos_Tienda')
      .update(updateData)
      .eq('prod_tiend_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error actualizando producto de tienda:', error)
    throw error
  }
}

export async function eliminarProductoTienda(id: string): Promise<void> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es obligatorio')
    }

    const { error } = await supabase
      .from('Productos_Tienda')
      .delete()
      .eq('prod_tiend_id_int', id)

    if (error) throw error
  } catch (error) {
    console.error('Error eliminando producto de tienda:', error)
    throw error
  }
}

export async function ocultarProductoTienda(id: string): Promise<ProductoTiendaDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es obligatorio')
    }

    const { data, error } = await supabase
      .from('Productos_Tienda')
      .update({ prod_tiend_activo_bool: false })
      .eq('prod_tiend_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error ocultando producto de tienda:', error)
    throw error
  }
}

export async function mostrarProductoTienda(id: string): Promise<ProductoTiendaDatabase> {
  try {
    // Validar que el ID no esté vacío
    if (!id || id.trim() === '') {
      throw new Error('El ID del producto es obligatorio')
    }

    const { data, error } = await supabase
      .from('Productos_Tienda')
      .update({ prod_tiend_activo_bool: true })
      .eq('prod_tiend_id_int', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error mostrando producto de tienda:', error)
    throw error
  }
}

export async function ocultarProductosPorCategoria(categoriaId: string): Promise<void> {
  try {
    // Validar que el ID no esté vacío
    if (!categoriaId || categoriaId.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { error } = await supabase
      .from('Productos_Tienda')
      .update({ prod_tiend_activo_bool: false })
      .eq('cat_id_int', categoriaId)

    if (error) throw error
  } catch (error) {
    console.error('Error ocultando productos por categoría:', error)
    throw error
  }
}

export async function mostrarProductosPorCategoria(categoriaId: string): Promise<void> {
  try {
    // Validar que el ID no esté vacío
    if (!categoriaId || categoriaId.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { error } = await supabase
      .from('Productos_Tienda')
      .update({ prod_tiend_activo_bool: true })
      .eq('cat_id_int', categoriaId)

    if (error) throw error
  } catch (error) {
    console.error('Error mostrando productos por categoría:', error)
    throw error
  }
}

export async function contarProductosPorCategoria(categoriaId: string): Promise<number> {
  try {
    // Validar que el ID no esté vacío
    if (!categoriaId || categoriaId.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { data, error } = await supabase
      .from('Productos_Tienda')
      .select('prod_tiend_id_int')
      .eq('cat_id_int', categoriaId)

    if (error) throw error
    
    // Contar manualmente para depurar
    const totalProductos = data?.length || 0
    
    return totalProductos
  } catch (error) {
    console.error('Error contando productos por categoría:', error)
    throw error
  }
}

export async function contarProductosOcultosPorCategoria(categoriaId: string): Promise<number> {
  try {
    // Validar que el ID no esté vacío
    if (!categoriaId || categoriaId.trim() === '') {
      throw new Error('El ID de la categoría es obligatorio')
    }

    const { data, error } = await supabase
      .from('Productos_Tienda')
      .select('prod_tiend_id_int')
      .eq('cat_id_int', categoriaId)
      .eq('prod_tiend_activo_bool', false) // Solo productos ocultos

    if (error) throw error
    
    const productosOcultos = data?.length || 0
    
    return productosOcultos
  } catch (error) {
    console.error('Error contando productos ocultos por categoría:', error)
    throw error
  }
}

// ============================================
// FUNCIONES CRUD PARA TABLAS RELACIONADAS DE FICHAS TÉCNICAS
// ============================================

// Crear o actualizar detalle de ficha técnica
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
    // Verificar si ya existe un detalle
    const { data: existingDetalle } = await supabase
      .from('Detalle_Ficha_Tecnica')
      .select('*')
      .eq('fit_tec_id_int', fichaTecnicaId)
      .single()

    if (existingDetalle) {
      // Actualizar existente
      const { data, error } = await supabase
        .from('Detalle_Ficha_Tecnica')
        .update(detalleData)
        .eq('fit_tec_id_int', fichaTecnicaId)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      // Crear nuevo
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

// Crear o actualizar taxonomía
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
    // Verificar si ya existe una taxonomía
    const { data: existingTaxonomia } = await supabase
      .from('Taxonomias')
      .select('*')
      .eq('fit_tec_id_int', fichaTecnicaId)
      .single()

    if (existingTaxonomia) {
      // Actualizar existente
      const { data, error } = await supabase
        .from('Taxonomias')
        .update(taxonomiaData)
        .eq('fit_tec_id_int', fichaTecnicaId)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      // Crear nueva
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

// Crear o actualizar zona de colecta
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
    // Verificar si ya existe una zona de colecta
    const { data: existingZona } = await supabase
      .from('Zona_Colecta_Germ')
      .select('*')
      .eq('fit_tec_id_int', fichaTecnicaId)
      .single()

    if (existingZona) {
      // Actualizar existente
      const { data, error } = await supabase
        .from('Zona_Colecta_Germ')
        .update(zonaColectaData)
        .eq('fit_tec_id_int', fichaTecnicaId)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      // Crear nueva
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

// Función para crear/actualizar ficha técnica completa
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

// ============================================================================
// CERTIFICADOS DE CALIDAD
// ============================================================================

export async function obtenerCertificadosCalidad(): Promise<CertificadoCalidadDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .select(`
        *,
        producto:Productos(*)
      `)
      .order('cer_cal_created_at_dt', { ascending: false })

    if (error) {
      console.error('Error obteniendo certificados de calidad:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error en obtenerCertificadosCalidad:', error)
    throw error
  }
}

export async function crearCertificadoCalidad(certificado: Omit<CertificadoCalidadDatabase, 'cer_cal_id_int' | 'cer_cal_created_at_dt' | 'cer_cal_updated_at_dt'>): Promise<CertificadoCalidadDatabase> {
  try {
    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .insert(certificado)
      .select(`
        *,
        producto:Productos(*)
      `)
      .single()

    if (error) {
      console.error('Error creando certificado de calidad:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error en crearCertificadoCalidad:', error)
    throw error
  }
}

export async function actualizarCertificadoCalidad(id: string, certificado: Partial<Omit<CertificadoCalidadDatabase, 'cer_cal_id_int' | 'cer_cal_created_at_dt'>>): Promise<CertificadoCalidadDatabase> {
  try {
    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .update({
        ...certificado,
        cer_cal_updated_at_dt: new Date().toISOString()
      })
      .eq('cer_cal_id_int', id)
      .select(`
        *,
        producto:Productos(*)
      `)
      .single()

    if (error) {
      console.error('Error actualizando certificado de calidad:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error en actualizarCertificadoCalidad:', error)
    throw error
  }
}

export async function eliminarCertificadoCalidad(id: string): Promise<void> {
  try {
    // Primero obtener el certificado para ver si tiene imagen
    const { data: certificado } = await supabase
      .from('Certificados_Calidad')
      .select('cer_cal_imag_url')
      .eq('cer_cal_id_int', id)
      .single()

    // Si tiene imagen, eliminarla del storage
    if (certificado?.cer_cal_imag_url) {
      try {
        const result = await eliminarImagenCertificado(certificado.cer_cal_imag_url)
        if (!result.success) {
          console.error('Error al eliminar imagen del storage:', result.error)
        }
      } catch (imageError) {
        console.error('Error al eliminar imagen del storage, continuando con eliminación del certificado:', imageError)
        // No lanzar error aquí para permitir que se elimine el registro aunque falle la imagen
      }
    }

    // Eliminar el registro de la BD
    const { error } = await supabase
      .from('Certificados_Calidad')
      .delete()
      .eq('cer_cal_id_int', id)

    if (error) throw error
    
  } catch (error) {
    console.error('Error eliminando certificado de calidad:', error)
    throw error
  }
}

export async function obtenerCertificadoCalidadPorId(id: string): Promise<CertificadoCalidadDatabase> {
  try {
    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .select(`
        *,
        producto:Productos(*)
      `)
      .eq('cer_cal_id_int', id)
      .single()

    if (error) {
      console.error('Error obteniendo certificado de calidad por ID:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error en obtenerCertificadoCalidadPorId:', error)
    throw error
  }
}

export async function obtenerCertificadosCalidadPorProducto(productoId: string): Promise<CertificadoCalidadDatabase[]> {
  try {
    const { data, error } = await supabase
      .from('Certificados_Calidad')
      .select(`
        *,
        producto:Productos(*)
      `)
      .eq('pro_id_int', productoId)
      .order('cer_cal_created_at_dt', { ascending: false })

    if (error) {
      console.error('Error obteniendo certificados por producto:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error en obtenerCertificadosCalidadPorProducto:', error)
    throw error
  }
}

// ============================================================================
// STORAGE - CERTIFICADOS DE CALIDAD
// ============================================================================

export async function subirImagenCertificado(archivo: File, nombreArchivo: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Usar cliente autenticado para operaciones de storage
    const supabaseAuth = createAuthenticatedClient()
    
    // Verificar autenticación antes de proceder
    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { success: false, error: 'No hay una sesión autenticada activa' }
    }

    const timestamp = Date.now()
    const extension = nombreArchivo.split('.').pop()
    const nombreFinal = `certificado_${timestamp}.${extension}`
    const rutaArchivo = `certificados/${nombreFinal}`

    const { data, error } = await supabaseAuth.storage
      .from('admin')
      .upload(rutaArchivo, archivo)

    if (error) {
      console.error('Error subiendo imagen de certificado:', error)
      return { success: false, error: error.message }
    }

    // Obtener URL pública
    const { data: urlData } = supabaseAuth.storage
      .from('admin')
      .getPublicUrl(rutaArchivo)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('Error en subirImagenCertificado:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}

export async function eliminarImagenCertificado(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Usar cliente autenticado para operaciones de storage
    const supabaseAuth = createAuthenticatedClient()
    
    // Verificar autenticación antes de proceder
    const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession()
    
    if (sessionError || !session) {
      console.error('Error de sesión:', sessionError || 'No hay sesión activa')
      return { success: false, error: 'No hay una sesión autenticada activa' }
    }

    // Extraer el path del archivo desde la URL (mismo patrón que fichas técnicas)
    const urlParts = url.split('/certificados/')
    if (urlParts.length !== 2) {
      console.warn('URL de imagen no válida:', url)
      return { success: false, error: 'URL de imagen inválida' }
    }

    const fileName = urlParts[1]
    const filePath = `certificados/${fileName}`

    const { error } = await supabaseAuth.storage
      .from('admin')
      .remove([filePath])

    if (error) {
      console.error('Error eliminando imagen de certificado del storage:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error en eliminarImagenCertificado:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
  }
}
