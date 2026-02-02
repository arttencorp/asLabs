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
  emitirDocumento,
  agregarMuestra,
  actualizarMuestra,
  eliminarMuestra,
  agregarResultado,
  actualizarResultado,
  eliminarResultado,
  agregarAgente,
  actualizarAgente,
  eliminarAgente,
  agregarAnexo,
  eliminarAnexo,
  obtenerConfigCamposMuestra
} from '@/lib/supabase'
import { obtenerFechaActualLima } from '@/utils'
import { useClientes } from '@/components/admin/clientes'
import type { 
  AreaDatabase, 
  ServicioDatabase, 
  TipoDocumentoDatabase, 
  EstadoDocumentoDatabase,
  DocumentoLabDatabase,
  ConfigCampoMuestraDatabase
} from '@/types/database'
import type { 
  DocumentoLabUI, 
  MuestraUI, 
  ResultadoUI, 
  AgenteUI, 
  AnexoUI,
  ClienteUI,
  TabDocumentoLab 
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
    agentes: [],
    anexos: []
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
        const [areasData, tiposData, estadosData] = await Promise.all([
          obtenerAreas(),
          obtenerTiposDocumento(),
          obtenerEstadosDocumento()
        ])
        
        setAreas(areasData)
        setTiposDocumento(tiposData)
        setEstadosDocumento(estadosData)
        
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
        return
      }
      
      try {
        const configData = await obtenerConfigCamposMuestra(documento.servicioId)
        setConfigCampos(configData)
      } catch (error) {
        console.error('Error cargando config de campos:', error)
        setConfigCampos([])
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
      servicioNombre: ''
    }))
  }, [areas])

  const seleccionarServicio = useCallback((servicioId: string) => {
    const servicio = servicios.find(s => s.serv_id_int === servicioId)
    if (servicio) {
      setDocumento(prev => ({
        ...prev,
        servicioId,
        servicioNombre: servicio.serv_nombre_vac || ''
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

  // === Gestión de Muestras ===
  const agregarMuestraUI = useCallback(() => {
    const nuevaMuestra: MuestraUI = {
      id: generarIdTemporal(),
      codigo: '',
      matriz: '',
      lugarMuestreo: '',
      fechaToma: '',
      fechaRecepcion: obtenerFechaActualLima(),
      fechaInicio: '',
      fechaFin: '',
      rechazada: false
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
    setDocumento(prev => ({
      ...prev,
      muestras: prev.muestras.filter(m => m.id !== muestraId),
      // También eliminar resultados y agentes asociados a esta muestra
      resultados: prev.resultados.filter(r => r.muestraId !== muestraId),
      agentes: prev.agentes.filter(a => a.muestraId !== muestraId)
    }))
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
    setDocumento(prev => ({
      ...prev,
      resultados: prev.resultados.filter(r => r.id !== resultadoId)
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
    setDocumento(prev => ({
      ...prev,
      agentes: prev.agentes.filter(a => a.id !== agenteId)
    }))
  }, [])

  // === Gestión de Anexos ===
  const agregarAnexoUI = useCallback((url: string, tipo: string, nota?: string) => {
    const nuevoAnexo: AnexoUI = {
      id: generarIdTemporal(),
      url,
      tipo,
      nota
    }
    
    setDocumento(prev => ({
      ...prev,
      anexos: [...prev.anexos, nuevoAnexo]
    }))
  }, [])

  const eliminarAnexoUI = useCallback((anexoId: string) => {
    setDocumento(prev => ({
      ...prev,
      anexos: prev.anexos.filter(a => a.id !== anexoId)
    }))
  }, [])

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
          mue_lab_cod_vac: m.codigo || undefined,
          mue_mtrz_vac: m.matriz || undefined,
          mue_lugar_vac: m.lugarMuestreo || undefined,
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
          res_ens_min_int: r.valorMin || undefined,
          res_ens_max_num: r.valorMax || undefined,
          res_ens_graf_bol: r.mostrarGrafico,
          res_ens_rang_ref_vac: r.rangoReferencial || undefined,
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
            nota: a.nota
          }))
        }
        
        documentoGuardado = await crearDocumentoLab(formData)
      }
      
      if (!documentoGuardado) {
        throw new Error('Error al guardar documento')
      }
      
      const docId = documentoGuardado.doc_lab_id_int
      
      // Si estamos en modo edición, actualizar muestras, resultados, etc. individualmente
      if (modoEdicion && documento.id) {
        // Guardar muestras nuevas
        for (const muestra of documento.muestras) {
          if (muestra.id.startsWith('temp_')) {
            const datosMuestra = {
              mue_lab_cod_vac: muestra.codigo || undefined,
              mue_mtrz_vac: muestra.matriz || undefined,
              mue_lugar_vac: muestra.lugarMuestreo || undefined,
              mue_fec_toma_dt: muestra.fechaToma || undefined,
              mue_fec_recep_dt: muestra.fechaRecepcion || undefined,
              mue_fec_inicio_dt: muestra.fechaInicio || undefined,
              mue_fec_fin_dt: muestra.fechaFin || undefined,
              mue_rechazada_bol: muestra.rechazada,
              mue_motiv_rech_vac: muestra.motivoRechazo || undefined,
              mue_recomend_vac: muestra.recomendaciones || undefined
            }
            await agregarMuestra(docId, datosMuestra)
          } else {
            const datosMuestra = {
              mue_lab_cod_vac: muestra.codigo || undefined,
              mue_mtrz_vac: muestra.matriz || undefined,
              mue_lugar_vac: muestra.lugarMuestreo || undefined,
              mue_fec_toma_dt: muestra.fechaToma || undefined,
              mue_fec_recep_dt: muestra.fechaRecepcion || undefined,
              mue_fec_inicio_dt: muestra.fechaInicio || undefined,
              mue_fec_fin_dt: muestra.fechaFin || undefined,
              mue_rechazada_bol: muestra.rechazada,
              mue_motiv_rech_vac: muestra.motivoRechazo || undefined,
              mue_recomend_vac: muestra.recomendaciones || undefined
            }
            await actualizarMuestra(muestra.id, datosMuestra)
          }
        }
        
        // Guardar resultados
        for (const resultado of documento.resultados) {
          const datosResultado = {
            res_ens_param_vac: resultado.parametro,
            res_ens_result_vac: resultado.resultado,
            res_ens_und_vac: resultado.unidad || undefined,
            res_ens_metod_vac: resultado.metodo || undefined,
            res_ens_min_int: resultado.valorMin || undefined,
            res_ens_max_num: resultado.valorMax || undefined,
            res_ens_graf_bol: resultado.mostrarGrafico,
            res_ens_rang_ref_vac: resultado.rangoReferencial || undefined,
            mue_id_int: resultado.muestraId || undefined
          }
          
          if (resultado.id.startsWith('temp_')) {
            await agregarResultado(docId, datosResultado)
          } else {
            await actualizarResultado(resultado.id, datosResultado)
          }
        }
        
        // Guardar agentes
        for (const agente of documento.agentes) {
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
              mue_id_int: agente.muestraId || undefined
            })
          } else {
            await actualizarAgente(agente.id, {
              agen_nomb_cien_vac: agente.nombreCientifico || undefined,
              agen_tipo_vac: agente.tipo || undefined
            })
          }
        }
        
        // Guardar anexos nuevos
        for (const anexo of documento.anexos) {
          if (anexo.id.startsWith('temp_')) {
            await agregarAnexo(docId, {
              url: anexo.url,
              tipo: anexo.tipo,
              nota: anexo.nota
            })
          }
        }
      }
      
      // Actualizar ID del documento guardado
      setDocumento(prev => ({ ...prev, id: docId }))
      setModoEdicion(true)
      
      return true
    } catch (error) {
      console.error('Error guardando documento:', error)
      return false
    } finally {
      setGuardando(false)
    }
  }, [documento, modoEdicion])

  // === Emitir documento ===
  const emitirDocumentoAction = useCallback(async (): Promise<boolean> => {
    if (!documento.id || documento.id.startsWith('temp_')) {
      // Primero guardar
      const guardado = await guardarDocumento()
      if (!guardado) return false
    }
    
    // Verificar que documento.id existe antes de llamar a emitirDocumento
    if (!documento.id) {
      console.error('No se puede emitir: ID de documento no disponible')
      return false
    }
    
    setGuardando(true)
    try {
      const resultado = await emitirDocumento(documento.id)
      if (resultado) {
        // Actualizar estado en UI
        const estadoEmitido = estadosDocumento.find(e => 
          e.est_doc_nomb_vac?.toLowerCase().includes('emitido')
        )
        
        setDocumento(prev => ({
          ...prev,
          estadoId: estadoEmitido?.est_doc_id_int || prev.estadoId,
          estadoNombre: estadoEmitido?.est_doc_nomb_vac || 'Emitido',
          codigo: resultado.doc_lab_cod_vac || prev.codigo,
          fechaEmision: resultado.doc_lab_emision_dt?.split('T')[0] || prev.fechaEmision
        }))
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error emitiendo documento:', error)
      return false
    } finally {
      setGuardando(false)
    }
  }, [documento.id, guardarDocumento, estadosDocumento])

  // === Cargar documento para edición ===
  const cargarDocumentoParaEdicion = useCallback(async (documentoId: string) => {
    setDocumentosLoading(true)
    try {
      const documentoData = await obtenerDocumentoLabPorId(documentoId)
      if (documentoData) {
        const documentoUI = documentoDBToUI(documentoData)
        setDocumento(documentoUI)
        setModoEdicion(true)
        
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
    
    // Gestión de muestras
    agregarMuestra: agregarMuestraUI,
    actualizarMuestra: actualizarMuestraUI,
    eliminarMuestra: eliminarMuestraUI,
    
    // Gestión de resultados
    agregarResultado: agregarResultadoUI,
    actualizarResultado: actualizarResultadoUI,
    eliminarResultado: eliminarResultadoUI,
    
    // Gestión de agentes
    agregarAgente: agregarAgenteUI,
    actualizarAgente: actualizarAgenteUI,
    eliminarAgente: eliminarAgenteUI,
    
    // Gestión de anexos
    agregarAnexo: agregarAnexoUI,
    eliminarAnexo: eliminarAnexoUI,
    
    // Acciones principales
    guardarDocumento,
    emitirDocumento: emitirDocumentoAction,
    cargarDocumentoParaEdicion,
    nuevoDocumento,
    
    // Estadísticas
    estadisticas
  }
}
