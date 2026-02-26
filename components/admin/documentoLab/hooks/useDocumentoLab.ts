import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  obtenerAreas,
  obtenerServicios,
  obtenerTiposDocumento,
  obtenerEstadosDocumento,
  obtenerDocumentosLab,
  obtenerDocumentoLabPorId,
  crearDocumentoLab,
  actualizarDocumentoLab,
  agregarMuestra,
  actualizarMuestra,
  eliminarMuestra,
  agregarResultado,
  actualizarResultado,
  eliminarResultado,
  agregarNotaResultado,
  actualizarNotaResultado,
  eliminarNotaResultado,
  agregarAgente,
  actualizarAgente,
  eliminarAgente,
  agregarAnexo,
  actualizarAnexoBD,
  eliminarAnexo,
  eliminarImagenAnexo,
  obtenerConfigCamposMuestra,
  obtenerConfigAnexosServicio,
  guardarAtributosMuestra,
  obtenerFirmas,
  obtenerFirmasDeDocumento,
  asignarFirmaADocumento,
  removerFirmaDeDocumento
} from '@/lib/supabase'
import { obtenerFechaActualLima } from '@/utils'
import { useClientes } from '@/components/admin/clientes'
import type { 
  AreaDatabase, 
  ServicioDatabase, 
  TipoDocumentoDatabase, 
  EstadoDocumentoDatabase,
  DocumentoLabDatabase,
  ConfigCampoMuestraDatabase,
  ConfigAnexoServicioDatabase
} from '@/types/database'
import type { 
  DocumentoLabUI, 
  MuestraUI, 
  ResultadoUI, 
  AgenteUI, 
  AnexoUI,
  NotaUI,
  ClienteUI,
  TabDocumentoLab,
  FirmaDocumentoUI
} from '../types'
import { 
  generarIdTemporal, 
  documentoDBToUI, 
  muestraUIToDB, 
  resultadoUIToDB,
  validarDocumentoParaEmision,
  personaToClienteUI
} from '../utils'
import { ESTADO_INICIAL_DOCUMENTO } from '../constants'

// Función para crear el estado inicial vacío del documento
function crearDocumentoInicial(): DocumentoLabUI {
  return {
    id: '',
    codigo: '',
    tipoDocumentoId: '',
    tipoDocumentoNombre: '',
    servicioId: '',
    servicioNombre: '',
    servicioConfExtra: undefined,
    estadoId: '',
    estadoNombre: 'Borrador',
    fechaEmision: obtenerFechaActualLima(),
    cliente: {
      id: '',
      razonSocial: '',
      ruc: '',
      contacto: '',
      email: '',
      telefono: '',
      direccion: ''
    },
    muestras: [],
    resultados: [],
    notas: [],
    agentes: [],
    anexos: [],
    firmas: []
  }
}

export function useDocumentoLab() {
  const router = useRouter()
  const { clientes, loading: clientesLoading } = useClientes()

  // === Estados de catálogos ===
  const [areas, setAreas] = useState<AreaDatabase[]>([])
  const [servicios, setServicios] = useState<ServicioDatabase[]>([])
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumentoDatabase[]>([])
  const [estadosDocumento, setEstadosDocumento] = useState<EstadoDocumentoDatabase[]>([])
  const [configCampos, setConfigCampos] = useState<ConfigCampoMuestraDatabase[]>([])
  const [configAnexos, setConfigAnexos] = useState<ConfigAnexoServicioDatabase[]>([])
  const [firmasDisponibles, setFirmasDisponibles] = useState<FirmaDocumentoUI[]>([])
  
  // === Estados de loading ===
  const [catalogosLoading, setCatalogosLoading] = useState(true)
  const [documentosLoading, setDocumentosLoading] = useState(false)
  const [guardando, setGuardando] = useState(false)
  
  // === Estado del formulario ===
  const [documento, setDocumento] = useState<DocumentoLabUI>(() => crearDocumentoInicial())
  const [documentos, setDocumentos] = useState<DocumentoLabUI[]>([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [activeTab, setActiveTab] = useState<TabDocumentoLab>('informacion')
  
  // === Estado de filtros ===
  const [areaSeleccionada, setAreaSeleccionada] = useState<string>('')
  const [filtroEstado, setFiltroEstado] = useState<string>('')
  const [filtroBusqueda, setFiltroBusqueda] = useState('')
  
  // === Tracking de elementos eliminados (para eliminar de BD al guardar) ===
  const [muestrasEliminadas, setMuestrasEliminadas] = useState<string[]>([])
  const [resultadosEliminados, setResultadosEliminados] = useState<string[]>([])
  const [agentesEliminados, setAgentesEliminados] = useState<string[]>([])
  const [anexosEliminados, setAnexosEliminados] = useState<string[]>([])
  const [notasEliminadas, setNotasEliminadas] = useState<string[]>([])
  const [firmasEliminadas, setFirmasEliminadas] = useState<string[]>([])  
  // Ref para acceder al documento actual sin dependencia de closure
  const documentoRef = useRef(documento)
  useEffect(() => {
    documentoRef.current = documento
  }, [documento])

  // === Cargar catálogos al montar ===
  useEffect(() => {
    const cargarCatalogos = async () => {
      setCatalogosLoading(true)
      try {
        const [areasData, tiposData, estadosData, firmasData] = await Promise.all([
          obtenerAreas(),
          obtenerTiposDocumento(),
          obtenerEstadosDocumento(),
          obtenerFirmas()
        ])
        
        setAreas(areasData)
        setTiposDocumento(tiposData)
        setEstadosDocumento(estadosData)
        
        // Convertir firmas a formato UI
        setFirmasDisponibles(firmasData.map(f => ({
          id: '', // No tiene firm_doc_id_int porque no está asignada
          firmaId: f.firm_id_int,
          nombre: f.firm_nomb_vac || '',
          cargo: f.firm_cargo_vac || '',
          imagenUrl: f.firm_url_blob
        })))
        
        // Establecer estado inicial por defecto (Borrador)
        const estadoBorrador = estadosData.find(e => 
          e.est_doc_nomb_vac?.toLowerCase().includes('borrador')
        )
        if (estadoBorrador) {
          setDocumento(prev => ({
            ...prev,
            estadoId: estadoBorrador.est_doc_id_int,
            estadoNombre: estadoBorrador.est_doc_nomb_vac || 'Borrador'
          }))
        }
      } catch (error) {
        console.error('Error cargando catálogos:', error)
      } finally {
        setCatalogosLoading(false)
      }
    }

    cargarCatalogos()
  }, [])

  // === Cargar servicios cuando cambia el área ===
  useEffect(() => {
    const cargarServicios = async () => {
      if (!areaSeleccionada) {
        setServicios([])
        return
      }
      
      try {
        const serviciosData = await obtenerServicios(areaSeleccionada)
        setServicios(serviciosData)
      } catch (error) {
        console.error('Error cargando servicios:', error)
        setServicios([])
      }
    }

    cargarServicios()
  }, [areaSeleccionada])

  // === Cargar config de campos cuando cambia el servicio ===
  useEffect(() => {
    const cargarConfigCampos = async () => {
      if (!documento.servicioId) {
        setConfigCampos([])
        setConfigAnexos([])
        return
      }
      
      try {
        const configData = await obtenerConfigCamposMuestra(documento.servicioId)
        setConfigCampos(configData)
        // Cargar config de anexos del servicio
        const configAnexosData = await obtenerConfigAnexosServicio(documento.servicioId)
        setConfigAnexos(configAnexosData)
      } catch (error) {
        console.error('Error cargando config de campos:', error)
        setConfigCampos([])
        setConfigAnexos([])
      }
    }

    cargarConfigCampos()
  }, [documento.servicioId])

  // === Cargar lista de documentos ===
  const cargarDocumentos = useCallback(async () => {
    setDocumentosLoading(true)
    try {
      const filtros: {
        servicioId?: string
        estadoId?: string
        tipoDocumentoId?: string
        areaId?: string
      } = {}
      
      if (areaSeleccionada) {
        // Obtener servicios del área para filtrar
        const serviciosArea = servicios.filter(s => s.area_id_int === areaSeleccionada)
        if (serviciosArea.length > 0) {
          filtros.servicioId = serviciosArea[0].serv_id_int
        }
      }
      
      if (filtroEstado) {
        filtros.estadoId = filtroEstado
      }
      
      const documentosData = await obtenerDocumentosLab(Object.keys(filtros).length > 0 ? filtros : undefined)
      const documentosUI = documentosData.map(documentoDBToUI)
      
      // Aplicar filtro de búsqueda local
      const documentosFiltrados = filtroBusqueda 
        ? documentosUI.filter(doc => 
            doc.codigo.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
            doc.cliente.razonSocial.toLowerCase().includes(filtroBusqueda.toLowerCase())
          )
        : documentosUI
      
      setDocumentos(documentosFiltrados)
    } catch (error) {
      console.error('Error cargando documentos:', error)
      setDocumentos([])
    } finally {
      setDocumentosLoading(false)
    }
  }, [areaSeleccionada, filtroEstado, filtroBusqueda, servicios])

  // === Obtener servicios filtrados por área para select ===
  const serviciosFiltrados = useCallback(() => {
    if (!areaSeleccionada) return servicios
    return servicios.filter(s => s.area_id_int === areaSeleccionada)
  }, [servicios, areaSeleccionada])

  // === Seleccionar cliente ===
  const seleccionarCliente = useCallback((clienteId: string) => {
    const cliente = clientes.find(c => c.per_id_int === clienteId)
    if (cliente) {
      setDocumento(prev => ({
        ...prev,
        cliente: personaToClienteUI(cliente)
      }))
    }
  }, [clientes])

  // === Seleccionar área y servicio ===
  const seleccionarArea = useCallback((areaId: string) => {
    setAreaSeleccionada(areaId)
    const area = areas.find(a => a.area_id_int === areaId)
    
    // Limpiar servicio al cambiar área
    setDocumento(prev => ({
      ...prev,
      areaId,
      areaNombre: area?.area_nombre_vac || '',
      servicioId: '',
      servicioNombre: '',
      servicioConfExtra: undefined
    }))
  }, [areas])

  const seleccionarServicio = useCallback((servicioId: string) => {
    const servicio = servicios.find(s => s.serv_id_int === servicioId)
    if (servicio) {
      setDocumento(prev => ({
        ...prev,
        servicioId,
        servicioNombre: servicio.serv_nombre_vac || '',
        servicioConfExtra: servicio.serv_conf_extra_int ?? undefined
      }))
    }
  }, [servicios])

  const seleccionarTipoDocumento = useCallback((tipoId: string) => {
    const tipo = tiposDocumento.find(t => t.tip_doc_id_int === tipoId)
    if (tipo) {
      setDocumento(prev => ({
        ...prev,
        tipoDocumentoId: tipoId,
        tipoDocumentoNombre: tipo.tip_doc_nomb_vac || ''
      }))
    }
  }, [tiposDocumento])

  const seleccionarEstado = useCallback((estadoId: string) => {
    const estado = estadosDocumento.find(e => e.est_doc_id_int === estadoId)
    if (estado) {
      setDocumento(prev => ({
        ...prev,
        estadoId: estadoId,
        estadoNombre: estado.est_doc_nomb_vac || ''
      }))
    }
  }, [estadosDocumento])

  // === Gestión de Muestras ===
  const agregarMuestraUI = useCallback(() => {
    const nuevaMuestra: MuestraUI = {
      id: generarIdTemporal(),
      codigo: '',
      matriz: '',
      lugarMuestreo: '',
      centroRegistro: '',
      fechaToma: '',
      fechaRecepcion: obtenerFechaActualLima(),
      fechaInicio: '',
      fechaFin: '',
      rechazada: false,
      atributosDinamicos: {},
      atributosEtiquetas: {}
    }
    
    setDocumento(prev => ({
      ...prev,
      muestras: [...prev.muestras, nuevaMuestra]
    }))
  }, [])

  const actualizarMuestraUI = useCallback((muestraId: string, campo: keyof MuestraUI, valor: any) => {
    setDocumento(prev => ({
      ...prev,
      muestras: prev.muestras.map(m => 
        m.id === muestraId ? { ...m, [campo]: valor } : m
      )
    }))
  }, [])

  const eliminarMuestraUI = useCallback((muestraId: string) => {
    // Guardar IDs reales para eliminar de BD al guardar
    if (!muestraId.startsWith('temp_')) {
      setMuestrasEliminadas(prev => [...prev, muestraId])
    }
    
    setDocumento(prev => {
      // Obtener IDs de resultados y agentes asociados para eliminarlos también
      const resultadosAsociados = prev.resultados.filter(r => r.muestraId === muestraId)
      const agentesAsociados = prev.agentes.filter(a => a.muestraId === muestraId)
      
      // Marcar resultados y agentes asociados para eliminar de BD
      resultadosAsociados.forEach(r => {
        if (!r.id.startsWith('temp_')) {
          setResultadosEliminados(prev => [...prev, r.id])
        }
      })
      agentesAsociados.forEach(a => {
        if (!a.id.startsWith('temp_')) {
          setAgentesEliminados(prev => [...prev, a.id])
        }
      })
      
      return {
        ...prev,
        muestras: prev.muestras.filter(m => m.id !== muestraId),
        resultados: prev.resultados.filter(r => r.muestraId !== muestraId),
        agentes: prev.agentes.filter(a => a.muestraId !== muestraId)
      }
    })
  }, [])

  // === Gestión de Resultados ===
  const agregarResultadoUI = useCallback((muestraId?: string) => {
    const nuevoResultado: ResultadoUI = {
      id: generarIdTemporal(),
      parametro: '',
      resultado: '',
      unidad: '',
      metodo: '',
      mostrarGrafico: false,
      muestraId
    }
    
    setDocumento(prev => ({
      ...prev,
      resultados: [...prev.resultados, nuevoResultado]
    }))
  }, [])

  const actualizarResultadoUI = useCallback((resultadoId: string, campo: keyof ResultadoUI, valor: any) => {
    setDocumento(prev => ({
      ...prev,
      resultados: prev.resultados.map(r => 
        r.id === resultadoId ? { ...r, [campo]: valor } : r
      )
    }))
  }, [])

  const eliminarResultadoUI = useCallback((resultadoId: string) => {
    // Guardar ID real para eliminar de BD al guardar
    if (!resultadoId.startsWith('temp_')) {
      setResultadosEliminados(prev => [...prev, resultadoId])
    }
    setDocumento(prev => ({
      ...prev,
      resultados: prev.resultados.filter(r => r.id !== resultadoId)
    }))
  }, [])

  // === Gestión de Notas ===
  const agregarNotaUI = useCallback((resultadoId?: string) => {
    const nuevaNota: NotaUI = {
      id: generarIdTemporal(),
      contenido: '',
      resultadoId: resultadoId || '',
    }
    setDocumento(prev => ({
      ...prev,
      notas: [...prev.notas, nuevaNota]
    }))
  }, [])

  const actualizarNotaUI = useCallback((notaId: string, campo: keyof NotaUI, valor: any) => {
    setDocumento(prev => ({
      ...prev,
      notas: prev.notas.map(n =>
        n.id === notaId ? { ...n, [campo]: valor } : n
      )
    }))
  }, [])

  const eliminarNotaUI = useCallback((notaId: string) => {
    if (!notaId.startsWith('temp_')) {
      setNotasEliminadas(prev => [...prev, notaId])
    }
    setDocumento(prev => ({
      ...prev,
      notas: prev.notas.filter(n => n.id !== notaId)
    }))
  }, [])

  // === Gestión de Agentes ===
  const agregarAgenteUI = useCallback((muestraId?: string) => {
    const nuevoAgente: AgenteUI = {
      id: generarIdTemporal(),
      nombreCientifico: '',
      tipo: '',
      muestraId
    }
    
    setDocumento(prev => ({
      ...prev,
      agentes: [...prev.agentes, nuevoAgente]
    }))
  }, [])

  const actualizarAgenteUI = useCallback((agenteId: string, campo: keyof AgenteUI, valor: any) => {
    setDocumento(prev => ({
      ...prev,
      agentes: prev.agentes.map(a => 
        a.id === agenteId ? { ...a, [campo]: valor } : a
      )
    }))
  }, [])

  const eliminarAgenteUI = useCallback((agenteId: string) => {
    // Guardar ID real para eliminar de BD al guardar
    if (!agenteId.startsWith('temp_')) {
      setAgentesEliminados(prev => [...prev, agenteId])
    }
    setDocumento(prev => ({
      ...prev,
      agentes: prev.agentes.filter(a => a.id !== agenteId)
    }))
  }, [])

  // === Gestión de Anexos ===
  const agregarAnexoUI = useCallback((url: string, tipo: string, titulo?: string, nota?: string) => {
    const nuevoAnexo: AnexoUI = {
      id: generarIdTemporal(),
      url,
      tipo,
      titulo,
      nota
    }
    
    setDocumento(prev => ({
      ...prev,
      anexos: [...prev.anexos, nuevoAnexo]
    }))
  }, [])

  const eliminarAnexoUI = useCallback((anexoId: string) => {
    // Obtener la URL del anexo antes de eliminar (para limpiar storage)
    setDocumento(prev => {
      const anexo = prev.anexos.find(a => a.id === anexoId)

      // Si es temp (ya subido a storage pero no guardado en BD), limpiar storage
      if (anexo && anexoId.startsWith('temp_') && anexo.url) {
        eliminarImagenAnexo(anexo.url).catch(err =>
          console.error('Error limpiando imagen de anexo del storage:', err)
        )
      }

      // Si es real (guardado en BD), marcar para eliminar al guardar
      if (!anexoId.startsWith('temp_')) {
        setAnexosEliminados(prevElim => [...prevElim, anexoId])
      }

      return {
        ...prev,
        anexos: prev.anexos.filter(a => a.id !== anexoId)
      }
    })
  }, [])

  const actualizarAnexoUI = useCallback((anexoId: string, campos: { url?: string; titulo?: string; nota?: string }) => {
    setDocumento(prev => ({
      ...prev,
      anexos: prev.anexos.map(a =>
        a.id === anexoId ? { ...a, ...campos } : a
      )
    }))
  }, [])

  // === Gestión de Firmas ===
  const agregarFirmaUI = useCallback(async (firmaId: string) => {
    // Buscar la firma en las disponibles
    const firmaInfo = firmasDisponibles.find(f => f.firmaId === firmaId)
    if (!firmaInfo) return
    
    // Si el documento ya está guardado, asignar la firma en la DB
    if (documento.id) {
      try {
        const firmaDoc = await asignarFirmaADocumento({
          doc_lab_id_int: documento.id,
          firm_id_int: firmaId
        })
        
        const nuevaFirma: FirmaDocumentoUI = {
          id: firmaDoc.firm_doc_id_int,
          firmaId: firmaDoc.firm_id_int,
          nombre: firmaDoc.firma?.firm_nomb_vac || firmaInfo.nombre,
          cargo: firmaDoc.firma?.firm_cargo_vac || firmaInfo.cargo,
          imagenUrl: firmaDoc.firma?.firm_url_blob || firmaInfo.imagenUrl,
          fechaAsignacion: firmaDoc.firm_doc_fec_dt || undefined
        }
        
        setDocumento(prev => ({
          ...prev,
          firmas: [...prev.firmas, nuevaFirma]
        }))
      } catch (error) {
        console.error('Error asignando firma:', error)
      }
    } else {
      // Si el documento es nuevo, agregar a la lista local con ID temporal
      const nuevaFirma: FirmaDocumentoUI = {
        id: generarIdTemporal(),
        firmaId: firmaInfo.firmaId,
        nombre: firmaInfo.nombre,
        cargo: firmaInfo.cargo,
        imagenUrl: firmaInfo.imagenUrl
      }
      
      setDocumento(prev => ({
        ...prev,
        firmas: [...prev.firmas, nuevaFirma]
      }))
    }
  }, [documento.id, firmasDisponibles])

  const removerFirmaUI = useCallback(async (firmaDocId: string) => {
    // Si el documento ya está guardado y la firma tiene ID real, eliminar de la DB
    if (documento.id && !firmaDocId.startsWith('temp_')) {
      try {
        await removerFirmaDeDocumento(firmaDocId)
      } catch (error) {
        console.error('Error removiendo firma:', error)
        return
      }
    }
    
    setDocumento(prev => ({
      ...prev,
      firmas: prev.firmas.filter(f => f.id !== firmaDocId)
    }))
  }, [documento.id])

  // === Guardar documento ===
  const guardarDocumento = useCallback(async (): Promise<boolean> => {
    setGuardando(true)
    try {
      const { valido, errores } = validarDocumentoParaEmision(documento)
      
      if (!valido) {
        console.error('Errores de validación:', errores)
        // Aquí podrías mostrar un toast con los errores
        return false
      }
      
      let documentoGuardado: DocumentoLabDatabase | null
      
      if (modoEdicion && documento.id) {
        // Actualizar documento existente
        const datosActualizacion = {
          tip_doc_id_int: documento.tipoDocumentoId,
          serv_id_int: documento.servicioId,
          est_doc_id_int: documento.estadoId
        }
        documentoGuardado = await actualizarDocumentoLab(documento.id, datosActualizacion)
      } else {
        // Crear nuevo documento con estructura completa
        const muestrasForm = documento.muestras.map(m => ({
          _tempId: m.id, // ID temporal para mapeo con resultados/agentes
          _atributosDinamicos: m.atributosDinamicos && Object.keys(m.atributosDinamicos).length > 0 ? m.atributosDinamicos : undefined,
          mue_lab_cod_vac: m.codigo || undefined,
          mue_mtrz_vac: m.matriz || undefined,
          mue_lugar_vac: m.lugarMuestreo || undefined,
          mue_centro_vac: m.centroRegistro || undefined,
          mue_fec_toma_dt: m.fechaToma || undefined,
          mue_fec_recep_dt: m.fechaRecepcion || undefined,
          mue_fec_inicio_dt: m.fechaInicio || undefined,
          mue_fec_fin_dt: m.fechaFin || undefined,
          mue_rechazada_bol: m.rechazada,
          mue_motiv_rech_vac: m.motivoRechazo || undefined,
          mue_recomend_vac: m.recomendaciones || undefined
        }))

        const resultadosForm = documento.resultados.map(r => ({
          res_ens_param_vac: r.parametro,
          res_ens_result_vac: r.resultado,
          res_ens_und_vac: r.unidad || undefined,
          res_ens_metod_vac: r.metodo || undefined,
          res_ens_min_int: r.valorMin ?? undefined,
          res_ens_max_num: r.valorMax ?? undefined,
          res_ens_graf_bol: r.mostrarGrafico,
          res_ens_rang_ref_vac: r.rangoReferencial || undefined,
          res_ens_data_extra_json: r.dataExtra && Object.keys(r.dataExtra).length > 0 ? r.dataExtra : undefined,
          mue_id_int: r.muestraId || undefined
        }))

        const formData = {
          documento: {
            tip_doc_id_int: documento.tipoDocumentoId,
            serv_id_int: documento.servicioId,
            per_id_int: documento.cliente.id,
            doc_lab_emision_dt: documento.fechaEmision || undefined
          },
          muestras: muestrasForm,
          resultados: resultadosForm,
          agentes: documento.agentes.map(a => ({
            agen_nomb_cien_vac: a.nombreCientifico || undefined,
            agen_reino_vac: a.reino || undefined,
            agen_ordn_vac: a.orden || undefined,
            agen_familia_vac: a.familia || undefined,
            agen_gener_vac: a.genero || undefined,
            agen_especi_vac: a.especie || undefined,
            agen_tipo_vac: a.tipo || undefined,
            agen_cod_ais_vac: a.codigoAislado || undefined,
            mue_id_int: a.muestraId || undefined
          })),
          anexos: documento.anexos.map(a => ({
            url: a.url,
            tipo: a.tipo,
            titulo: a.titulo,
            nota: a.nota
          }))
        }
        
        console.log('[GUARDAR] Modo creación - formData.anexos:', JSON.stringify(formData.anexos, null, 2))
        console.log('[GUARDAR] documento.anexos count:', documento.anexos.length)
        documentoGuardado = await crearDocumentoLab(formData)
      }
      
      if (!documentoGuardado) {
        throw new Error('Error al guardar documento')
      }
      
      const docId = documentoGuardado.doc_lab_id_int
      
      // Si estamos en modo edición, actualizar muestras, resultados, etc. individualmente
      if (modoEdicion && documento.id) {
        // Mapa para traducir IDs temporales a IDs reales de muestras
        const muestraIdMap: Record<string, string> = {}
        
        // Guardar muestras nuevas
        for (const muestra of documento.muestras) {
          if (muestra.id.startsWith('temp_')) {
            const datosMuestra = {
              mue_lab_cod_vac: muestra.codigo || undefined,
              mue_mtrz_vac: muestra.matriz || undefined,
              mue_lugar_vac: muestra.lugarMuestreo || undefined,
              mue_centro_vac: muestra.centroRegistro || undefined,
              mue_fec_toma_dt: muestra.fechaToma || undefined,
              mue_fec_recep_dt: muestra.fechaRecepcion || undefined,
              mue_fec_inicio_dt: muestra.fechaInicio || undefined,
              mue_fec_fin_dt: muestra.fechaFin || undefined,
              mue_rechazada_bol: muestra.rechazada,
              mue_motiv_rech_vac: muestra.motivoRechazo || undefined,
              mue_recomend_vac: muestra.recomendaciones || undefined
            }
            const muestraGuardada = await agregarMuestra(docId, datosMuestra)
            // Guardar el mapeo de ID temporal a ID real
            if (muestraGuardada?.mue_id_int) {
              muestraIdMap[muestra.id] = muestraGuardada.mue_id_int
              // Guardar atributos dinámicos EAV
              if (muestra.atributosDinamicos && Object.keys(muestra.atributosDinamicos).length > 0) {
                await guardarAtributosMuestra(muestraGuardada.mue_id_int, muestra.atributosDinamicos)
              }
            }
          } else {
            // Para muestras existentes, el ID ya es real
            muestraIdMap[muestra.id] = muestra.id
            const datosMuestra = {
              mue_lab_cod_vac: muestra.codigo || undefined,
              mue_mtrz_vac: muestra.matriz || undefined,
              mue_lugar_vac: muestra.lugarMuestreo || undefined,
              mue_centro_vac: muestra.centroRegistro || undefined,
              mue_fec_toma_dt: muestra.fechaToma || undefined,
              mue_fec_recep_dt: muestra.fechaRecepcion || undefined,
              mue_fec_inicio_dt: muestra.fechaInicio || undefined,
              mue_fec_fin_dt: muestra.fechaFin || undefined,
              mue_rechazada_bol: muestra.rechazada,
              mue_motiv_rech_vac: muestra.motivoRechazo || undefined,
              mue_recomend_vac: muestra.recomendaciones || undefined
            }
            await actualizarMuestra(muestra.id, datosMuestra)
            // Guardar atributos dinámicos EAV
            if (muestra.atributosDinamicos) {
              await guardarAtributosMuestra(muestra.id, muestra.atributosDinamicos)
            }
          }
        }
        
        // Guardar resultados (usando el mapa de IDs)
        for (const resultado of documento.resultados) {
          // Traducir el muestraId temporal a ID real si existe
          const muestraIdReal = resultado.muestraId 
            ? (muestraIdMap[resultado.muestraId] || resultado.muestraId)
            : undefined
          
          const datosResultado = {
            res_ens_param_vac: resultado.parametro,
            res_ens_result_vac: resultado.resultado,
            res_ens_und_vac: resultado.unidad || undefined,
            res_ens_metod_vac: resultado.metodo || undefined,
            res_ens_min_int: resultado.valorMin ?? undefined,
            res_ens_max_num: resultado.valorMax ?? undefined,
            res_ens_graf_bol: resultado.mostrarGrafico,
            res_ens_rang_ref_vac: resultado.rangoReferencial || undefined,
            res_ens_data_extra_json: resultado.dataExtra && Object.keys(resultado.dataExtra).length > 0 ? resultado.dataExtra : undefined,
            mue_id_int: muestraIdReal
          }
          
          if (resultado.id.startsWith('temp_')) {
            await agregarResultado(docId, datosResultado)
          } else {
            await actualizarResultado(resultado.id, datosResultado)
          }
        }
        
        // Guardar agentes (usando el mapa de IDs)
        for (const agente of documento.agentes) {
          // Traducir el muestraId temporal a ID real si existe
          const muestraIdReal = agente.muestraId 
            ? (muestraIdMap[agente.muestraId] || agente.muestraId)
            : undefined
          
          if (agente.id.startsWith('temp_')) {
            await agregarAgente(docId, {
              agen_nomb_cien_vac: agente.nombreCientifico || undefined,
              agen_reino_vac: agente.reino || undefined,
              agen_ordn_vac: agente.orden || undefined,
              agen_familia_vac: agente.familia || undefined,
              agen_gener_vac: agente.genero || undefined,
              agen_especi_vac: agente.especie || undefined,
              agen_tipo_vac: agente.tipo || undefined,
              agen_cod_ais_vac: agente.codigoAislado || undefined,
              mue_id_int: muestraIdReal
            })
          } else {
            await actualizarAgente(agente.id, {
              agen_nomb_cien_vac: agente.nombreCientifico || undefined,
              agen_reino_vac: agente.reino || undefined,
              agen_ordn_vac: agente.orden || undefined,
              agen_familia_vac: agente.familia || undefined,
              agen_gener_vac: agente.genero || undefined,
              agen_especi_vac: agente.especie || undefined,
              agen_tipo_vac: agente.tipo || undefined,
              agen_cod_ais_vac: agente.codigoAislado || undefined,
              mue_id_int: muestraIdReal
            })
          }
        }
        
        // Guardar anexos nuevos
        console.log('[GUARDAR] Modo edición - documento.anexos:', documento.anexos.length, documento.anexos.map(a => ({ id: a.id, url: a.url?.substring(0, 50), tipo: a.tipo })))
        for (const anexo of documento.anexos) {
          if (anexo.id.startsWith('temp_')) {
            console.log('[GUARDAR] Insertando anexo temp:', anexo.id, 'url:', anexo.url?.substring(0, 50))
            try {
              await agregarAnexo(docId, {
                url: anexo.url,
                tipo: anexo.tipo,
                titulo: anexo.titulo,
                nota: anexo.nota
              })
              console.log('[GUARDAR] Anexo insertado OK')
            } catch (anxErr) {
              console.error('[GUARDAR] ERROR insertando anexo:', anxErr)
              throw anxErr
            }
          } else {
            // Actualizar anexos existentes que pudieron haber sido editados
            console.log('[GUARDAR] Actualizando anexo existente:', anexo.id)
            await actualizarAnexoBD(anexo.id, {
              url: anexo.url,
              titulo: anexo.titulo,
              nota: anexo.nota
            })
          }
        }
        
        // Guardar notas
        for (const nota of documento.notas) {
          // Solo guardar notas con resultado real (no temp_)
          const resIdReal = nota.resultadoId.startsWith('temp_') ? undefined : nota.resultadoId
          if (!resIdReal) continue // No se puede guardar nota sin resultado real

          if (nota.id.startsWith('temp_')) {
            await agregarNotaResultado(resIdReal, nota.contenido)
          } else {
            await actualizarNotaResultado(nota.id, {
              resul_not_cont_vac: nota.contenido,
              res_ens_id_int: resIdReal
            })
          }
        }
        
        // Guardar firmas nuevas
        for (const firma of documento.firmas) {
          if (firma.id.startsWith('temp_')) {
            await asignarFirmaADocumento({
              doc_lab_id_int: docId,
              firm_id_int: firma.firmaId
            })
          }
        }
        
        // Eliminar de BD los elementos marcados para eliminación
        for (const muestraId of muestrasEliminadas) {
          try {
            await eliminarMuestra(muestraId)
          } catch (error) {
            console.error('Error eliminando muestra:', error)
          }
        }
        
        for (const resultadoId of resultadosEliminados) {
          try {
            await eliminarResultado(resultadoId)
          } catch (error) {
            console.error('Error eliminando resultado:', error)
          }
        }
        
        for (const agenteId of agentesEliminados) {
          try {
            await eliminarAgente(agenteId)
          } catch (error) {
            console.error('Error eliminando agente:', error)
          }
        }
        
        for (const anexoId of anexosEliminados) {
          try {
            await eliminarAnexo(anexoId)
          } catch (error) {
            console.error('Error eliminando anexo:', error)
          }
        }
        
        for (const notaId of notasEliminadas) {
          try {
            await eliminarNotaResultado(notaId)
          } catch (error) {
            console.error('Error eliminando nota:', error)
          }
        }
        
        // Limpiar listas de eliminados después de guardar
        setMuestrasEliminadas([])
        setResultadosEliminados([])
        setAgentesEliminados([])
        setAnexosEliminados([])
        setNotasEliminadas([])
      } else {
        // Si es un documento nuevo sin modo edición, también guardar las firmas
        for (const firma of documento.firmas) {
          if (firma.id.startsWith('temp_')) {
            await asignarFirmaADocumento({
              doc_lab_id_int: docId,
              firm_id_int: firma.firmaId
            })
          }
        }
      }
      
      // Recargar el documento para obtener los IDs reales de todos los elementos
      const documentoRecargado = await obtenerDocumentoLabPorId(docId)
      if (documentoRecargado) {
        const documentoUI = documentoDBToUI(documentoRecargado)
        
        // Obtener firmas del documento
        const firmasData = await obtenerFirmasDeDocumento(docId)
        const firmasUI: FirmaDocumentoUI[] = firmasData.map(fd => ({
          id: fd.firm_doc_id_int,
          firmaId: fd.firm_id_int,
          nombre: fd.firma?.firm_nomb_vac || '',
          cargo: fd.firma?.firm_cargo_vac || '',
          imagenUrl: fd.firma?.firm_url_blob || null,
          fechaAsignacion: fd.firm_doc_fec_dt || undefined
        }))
        
        setDocumento({
          ...documentoUI,
          firmas: firmasUI
        })
      }
      
      setModoEdicion(true)
      
      // Limpiar listas de elementos eliminados
      setMuestrasEliminadas([])
      setResultadosEliminados([])
      setAgentesEliminados([])
      setAnexosEliminados([])
      setNotasEliminadas([])
      
      return true
    } catch (error) {
      console.error('Error guardando documento:', error)
      return false
    } finally {
      setGuardando(false)
    }
  }, [documento, modoEdicion, muestrasEliminadas, resultadosEliminados, agentesEliminados, anexosEliminados, notasEliminadas])

  // === Cargar documento para edición ===
  const cargarDocumentoParaEdicion = useCallback(async (documentoId: string) => {
    setDocumentosLoading(true)
    try {
      const [documentoData, firmasData] = await Promise.all([
        obtenerDocumentoLabPorId(documentoId),
        obtenerFirmasDeDocumento(documentoId)
      ])
      
      if (documentoData) {
        const documentoUI = documentoDBToUI(documentoData)
        
        // Convertir firmas de DB a UI
        const firmasUI: FirmaDocumentoUI[] = firmasData.map(fd => ({
          id: fd.firm_doc_id_int,
          firmaId: fd.firm_id_int,
          nombre: fd.firma?.firm_nomb_vac || '',
          cargo: fd.firma?.firm_cargo_vac || '',
          imagenUrl: fd.firma?.firm_url_blob || null,
          fechaAsignacion: fd.firm_doc_fec_dt || undefined
        }))
        
        setDocumento({
          ...documentoUI,
          firmas: firmasUI
        })
        setModoEdicion(true)
        
        // Limpiar listas de eliminados al cargar un documento
        setMuestrasEliminadas([])
        setResultadosEliminados([])
        setAgentesEliminados([])
        setAnexosEliminados([])
        setFirmasEliminadas([])
        
        // Establecer área seleccionada
        if (documentoUI.areaId) {
          setAreaSeleccionada(documentoUI.areaId)
        }
      }
    } catch (error) {
      console.error('Error cargando documento:', error)
    } finally {
      setDocumentosLoading(false)
    }
  }, [])

  // === Nuevo documento ===
  const nuevoDocumento = useCallback(() => {
    const estadoBorrador = estadosDocumento.find(e => 
      e.est_doc_nomb_vac?.toLowerCase().includes('borrador')
    )
    
    setDocumento({
      ...crearDocumentoInicial(),
      estadoId: estadoBorrador?.est_doc_id_int || '',
      estadoNombre: estadoBorrador?.est_doc_nomb_vac || 'Borrador'
    })
    setModoEdicion(false)
    setActiveTab('informacion')
    setAreaSeleccionada('')
    
    // Limpiar listas de eliminados al crear nuevo documento
    setMuestrasEliminadas([])
    setResultadosEliminados([])
    setAgentesEliminados([])
    setAnexosEliminados([])
    setFirmasEliminadas([])
  }, [estadosDocumento])

  // === Estadísticas ===
  const estadisticas = useCallback(() => {
    const total = documentos.length
    const porEstado = estadosDocumento.reduce((acc, estado) => {
      acc[estado.est_doc_nomb_vac || 'Sin estado'] = documentos.filter(
        d => d.estadoId === estado.est_doc_id_int
      ).length
      return acc
    }, {} as Record<string, number>)
    
    return { total, porEstado }
  }, [documentos, estadosDocumento])

  return {
    // Catálogos
    areas,
    servicios: serviciosFiltrados(),
    tiposDocumento,
    estadosDocumento,
    configCampos,
    configAnexos,
    clientes,
    
    // Estados de carga
    catalogosLoading,
    documentosLoading,
    clientesLoading,
    guardando,
    
    // Documento actual
    documento,
    setDocumento,
    modoEdicion,
    activeTab,
    setActiveTab,
    
    // Lista de documentos
    documentos,
    cargarDocumentos,
    
    // Filtros
    areaSeleccionada,
    setAreaSeleccionada: seleccionarArea,
    filtroEstado,
    setFiltroEstado,
    filtroBusqueda,
    setFiltroBusqueda,
    
    // Selecciones
    seleccionarCliente,
    seleccionarArea,
    seleccionarServicio,
    seleccionarTipoDocumento,
    seleccionarEstado,
    
    // Gestión de muestras
    agregarMuestra: agregarMuestraUI,
    actualizarMuestra: actualizarMuestraUI,
    eliminarMuestra: eliminarMuestraUI,
    
    // Gestión de resultados
    agregarResultado: agregarResultadoUI,
    actualizarResultado: actualizarResultadoUI,
    eliminarResultado: eliminarResultadoUI,
    
    // Gestión de notas
    agregarNota: agregarNotaUI,
    actualizarNota: actualizarNotaUI,
    eliminarNota: eliminarNotaUI,
    
    // Gestión de agentes
    agregarAgente: agregarAgenteUI,
    actualizarAgente: actualizarAgenteUI,
    eliminarAgente: eliminarAgenteUI,
    
    // Gestión de anexos
    agregarAnexo: agregarAnexoUI,
    actualizarAnexo: actualizarAnexoUI,
    eliminarAnexo: eliminarAnexoUI,
    
    // Gestión de firmas
    firmasDisponibles,
    agregarFirma: agregarFirmaUI,
    removerFirma: removerFirmaUI,
    
    // Acciones principales
    guardarDocumento,
    cargarDocumentoParaEdicion,
    nuevoDocumento,
    
    // Estadísticas
    estadisticas
  }
}
