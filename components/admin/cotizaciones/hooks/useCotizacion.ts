import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { generarNumeroCotizacion, limpiarDatosParaBD, dateToInputValue } from '@/utils'
import { crearCotizacion, actualizarCotizacion, obtenerCotizacionPorId, obtenerFormasPago } from '@/lib/supabase'
import { useClientes } from '@/components/admin/clientes'
import { useProductos } from './useProductos'
import { useCertificadosFichas } from './useCertificadosFichas'
import { 
  productosPreexistentes, terminosCondicionesDefault, 
  terminosCondicionesLaboratorio, certificadosDefault 
} from '../constants'
import { calcularFechaVencimiento, numeroATexto } from '@/utils/index'
import {  generarCertificadosTexto } from '../utils'
import type { Item, FichaTecnica, TipoDocumento, FormaPagoUI, TabName } from '../types'
import type { FormaPago } from '@/types/database'

export function useCotizacion() {
  const router = useRouter()
  const { clientes } = useClientes()
  const { productos, loading: productosLoading, obtenerProductoPorId, formatearProductoParaSelector } = useProductos()
  const { 
    cargarCertificadosParaProductos, 
    cargarFichasParaProductos,
    obtenerCertificadosProducto,
    obtenerFichasProducto,
    certificadosLoading,
    fichasLoading
  } = useCertificadosFichas()
  
  // Estados principales
  const [activeTab, setActiveTab] = useState<TabName>('informacion')
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('cotizacion')
  const [preciosConIGV, setPreciosConIGV] = useState(false)
  
  // Estados para modo de edición
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingCotizacionId, setEditingCotizacionId] = useState<string | null>(null)
  
  // Información de la cotización
  const [numeroCotizacion, setNumeroCotizacion] = useState('')
  const [fechaEmision, setFechaEmision] = useState(new Date().toISOString().split('T')[0])
  const [fechaVencimiento, setFechaVencimiento] = useState(calcularFechaVencimiento(10))
  
  // Información del cliente
  const [clienteSeleccionado, setClienteSeleccionado] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [dniRuc, setDniRuc] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  
  // Productos y servicios
  const [items, setItems] = useState<Item[]>([
    { id: 1, nombre: '', descripcion: '', cantidad: 1, precioUnitario: 0, total: 0, codigo: '' }
  ])
  
  // Ref para acceder a los items actuales sin dependencia de closure
  const itemsRef = useRef(items)
  
  // Sincronizar ref con state
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  // Cargar formas de pago de BD al montar el componente
  useEffect(() => {
    const cargarFormasPago = async () => {
      setFormasPagoLoading(true)
      try {
        const formasPagoBD = await obtenerFormasPago()
        setFormasPago(formasPagoBD)
      } catch (error) {
        console.error('Error cargando formas de pago:', error)
      } finally {
        setFormasPagoLoading(false)
      }
    }

    cargarFormasPago()
  }, [])

  // Generar número de cotización al montar el componente
  useEffect(() => {
    const generarNumero = async () => {
      try {
        const numero = await generarNumeroCotizacion()
        setNumeroCotizacion(numero)
      } catch (error) {
        console.error('Error generando número de cotización:', error)
        // Fallback: usar timestamp
        const timestamp = Date.now()
        const year = new Date().getFullYear()
        setNumeroCotizacion(`${timestamp.toString().slice(-6)}-${year}`)
      }
    }

    generarNumero()
  }, [])
  
  // Información adicional
  const [terminosCondiciones, setTerminosCondiciones] = useState(terminosCondicionesDefault)
  const [lugarRecojo, setLugarRecojo] = useState('')
  const [formaPago, setFormaPago] = useState<FormaPagoUI>('completo')
  const [formaEntrega, setFormaEntrega] = useState('')
  const [certificadosCalidad, setCertificadosCalidad] = useState(certificadosDefault)
  const [certificadosEstructurados, setCertificadosEstructurados] = useState<any[]>([]) // Certificados raw
  const [fichasTecnicas, setFichasTecnicas] = useState<FichaTecnica[]>([])
  const [tipoProductoSeleccionado, setTipoProductoSeleccionado] = useState('vegetal')

  // Estados para formas de pago de BD
  const [formasPago, setFormasPago] = useState<FormaPago[]>([])
  const [formaPagoSeleccionada, setFormaPagoSeleccionada] = useState<string>('') // ID de la forma de pago seleccionada
  const [formasPagoLoading, setFormasPagoLoading] = useState(false)

  // Helper para mapear forma de pago de BD a UI
  // Helper para cambiar forma de pago seleccionada y sincronizar con el tipo UI
  const cambiarFormaPagoSeleccionada = useCallback((nuevaFormaPagoId: string) => {
    setFormaPagoSeleccionada(nuevaFormaPagoId)
    
    // Obtener el tipo desde formasPago y mapear correctamente
    const formaPagoBD = formasPago.find(fp => fp.form_pa_id_int === nuevaFormaPagoId)
    const formaPagoUI = formaPagoBD?.form_pa_tipo_int === 1 ? 'completo' : 'parcial'
    setFormaPago(formaPagoUI)
  }, [formasPago])

  // Calcular totales usando utility global
  const calcularTotales = useCallback(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0)
    
    if (preciosConIGV) {
      // CON IGV: agregar el 18% al precio base
      const impuesto = subtotal * 0.18
      const total = subtotal + impuesto
      return {
        subtotal,
        impuesto,
        total,
      }
    } else {
      // SIN IGV: el precio es tal como está, sin agregar nada
      return {
        subtotal,
        impuesto: 0,
        total: subtotal,
      }
    }
  }, [items, preciosConIGV])

  // Efecto para mantener términos por defecto (NO generar dinámicos)
  // Los términos dinámicos se muestran por separado en CondicionesEntrega
  useEffect(() => {
    // Solo en modo NO edición, mantener términos por defecto
    if (!isEditMode && terminosCondiciones !== terminosCondicionesDefault) {
      setTerminosCondiciones(terminosCondicionesDefault)
    }
  }, [terminosCondicionesDefault, isEditMode])

  // Actualizar certificados combinados
  const actualizarCertificadosCombinados = useCallback(async () => {
    const currentItems = itemsRef.current
    try {
      const codigosSeleccionados = currentItems
        .filter((item) => item && item.codigo)
        .map((item) => item.codigo)
        .filter((codigo) => codigo && codigo !== "personalizado" && codigo !== "LAB")


      if (!codigosSeleccionados || codigosSeleccionados.length === 0) {
        setCertificadosCalidad(certificadosDefault)
        setCertificadosEstructurados([])
        return
      }

      const codigosUnicos = [...new Set(codigosSeleccionados)]
      let todosCertificados: any[] = []
      
      
      // Cargar certificados de BD para todos los productos
      if (codigosUnicos.length > 0) {
        await cargarCertificadosParaProductos(codigosUnicos)
        
        codigosUnicos.forEach((productoId) => {
          const certificadosBD = obtenerCertificadosProducto(productoId)
          if (certificadosBD && certificadosBD.length > 0) {
            todosCertificados = [...todosCertificados, ...certificadosBD]
          } else {
          }
        })
      }
      

      if (todosCertificados.length > 0) {
        const certificadosTexto = generarCertificadosTexto(todosCertificados)
        setCertificadosCalidad(certificadosTexto)
        setCertificadosEstructurados(todosCertificados) // Guardar también los certificados estructurados
      } else {
        setCertificadosCalidad(certificadosDefault)
        setCertificadosEstructurados([])
      }
    } catch (error) {
      console.error("Error al actualizar certificados:", error)
      setCertificadosCalidad(certificadosDefault)
      setCertificadosEstructurados([])
    }
  }, [cargarCertificadosParaProductos, obtenerCertificadosProducto])

  // Actualizar fichas técnicas
  const actualizarFichasTecnicas = useCallback(async () => {
    try {
      const currentItems = itemsRef.current
      const codigosSeleccionados = currentItems
        .filter((item) => item && item.codigo)
        .map((item) => item.codigo)
        .filter((codigo) => codigo && codigo !== "personalizado" && codigo !== "LAB")

      if (!codigosSeleccionados || codigosSeleccionados.length === 0) {
        setFichasTecnicas([])
        return
      }

      const codigosUnicos = [...new Set(codigosSeleccionados)]
      const todasFichas: FichaTecnica[] = []
      
      
      // Cargar fichas técnicas de BD para todos los productos
      if (codigosUnicos.length > 0) {
        await cargarFichasParaProductos(codigosUnicos)
        
        codigosUnicos.forEach((productoId) => {
          const fichasBD = obtenerFichasProducto(productoId)
          if (fichasBD && fichasBD.length > 0) {
            todasFichas.push(...fichasBD)
          } else {
          }
        })
      }
      

      setFichasTecnicas(todasFichas)
    } catch (error) {
      console.error("Error al actualizar fichas técnicas:", error)
      setFichasTecnicas([])
    }
  }, [cargarFichasParaProductos, obtenerFichasProducto])

  // Helper para actualizar certificados y fichas de forma asíncrona
  const actualizarCertificadosYFichas = useCallback(async () => {
    try {
      await actualizarCertificadosCombinados()
      await actualizarFichasTecnicas()
    } catch (error) {
      console.error('Error actualizando certificados y fichas')
    }
  }, [actualizarCertificadosCombinados, actualizarFichasTecnicas])

  // Seleccionar producto
  const seleccionarProducto = useCallback((id: number, productoId: string) => {
    if (!productoId) return
    

    if (productoId === "personalizado") {
      setItems(items.map((item) => {
        if (item.id === id) {
          return { 
            ...item, 
            codigo: "personalizado",
            descripcion: "",
            precioUnitario: 0,
            total: 0
          }
        }
        return item
      }))
      return
    }

    // Buscar producto en BD
    const productoBD = obtenerProductoPorId(productoId)
    
    if (productoBD) {
      setItems(items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            nombre: productoBD.pro_nomb_vac || '',
            descripcion: productoBD.pro_desc_vac || '',
            precioUnitario: productoBD.pro_prec_unitario_int || 0,
            total: item.cantidad * (productoBD.pro_prec_unitario_int || 0),
            codigo: productoBD.pro_id_int,
          }
        }
        return item
      }))
      
      setTipoProductoSeleccionado("database")
      setTerminosCondiciones(terminosCondicionesDefault)
      
      // Actualizar certificados y fichas DESPUÉS del próximo render
      setTimeout(() => {
        actualizarCertificadosYFichas()
      }, 10)
    }
  }, [items, actualizarCertificadosYFichas, obtenerProductoPorId])

  // Actualizar item
  const actualizarItem = useCallback((id: number, campo: string, valor: string | number) => {
    try {
      setItems(items.map((item) => {
        if (item.id === id) {
          const itemActualizado = { ...item, [campo]: valor }

          // Si se cambió la cantidad o precio, recalcular total
          if (campo === "cantidad" || campo === "precioUnitario") {
            itemActualizado.total = itemActualizado.cantidad * itemActualizado.precioUnitario
          }

          // Si se cambió el código, buscar el producto en BD y actualizar información
          if (campo === "codigo" && valor && valor !== 'personalizado') {
            const productoBD = obtenerProductoPorId(valor as string)
            if (productoBD) {
              itemActualizado.nombre = productoBD.pro_nomb_vac || ''
              itemActualizado.descripcion = productoBD.pro_desc_vac || ''
              itemActualizado.precioUnitario = productoBD.pro_prec_unitario_int || 0
              itemActualizado.total = itemActualizado.cantidad * itemActualizado.precioUnitario
            }
          }

          return itemActualizado
        }
        return item
      }))

      if (campo === "codigo") {
        // Actualizar certificados y fichas de forma asíncrona
        actualizarCertificadosYFichas()
      }
    } catch (error) {
      console.error("Error al actualizar item:", error)
    }
  }, [items, actualizarCertificadosYFichas, obtenerProductoPorId])

  // Agregar item
  const agregarItem = useCallback(() => {
    try {
      const nuevoId = Math.max(...items.map((item) => item.id), 0) + 1
      setItems([...items, { 
        id: nuevoId, 
        nombre: "",
        descripcion: "", 
        cantidad: 1, 
        precioUnitario: 0, 
        total: 0, 
        codigo: "" 
      }])
    } catch (error) {
      console.error("Error al agregar item:", error)
    }
  }, [items])

  // Eliminar item
  const eliminarItem = useCallback((id: number) => {
    try {
      if (items.length > 1) {
        setItems(items.filter((item) => item.id !== id))
        // Actualizar certificados y fichas de forma asíncrona
        actualizarCertificadosYFichas()
      }
    } catch (error) {
      console.error("Error al eliminar item:", error)
    }
  }, [items, actualizarCertificadosYFichas])

  // Vista previa
  const vistaPrevia = useCallback(() => {
    try {
      const totales = calcularTotales()
      
      const itemsValidados = Array.isArray(items)
        ? items.map((item) => ({
            id: item?.id || 0,
            descripcion: item?.descripcion || "",
            cantidad: item?.cantidad || 0,
            precioUnitario: item?.precioUnitario || 0,
            total: item?.total || 0,
            codigo: item?.codigo || "",
          }))
        : []

      // Encontrar el cliente seleccionado para determinar el tipo
      const clienteCompleto = clientes.find(cliente => cliente.per_id_int === clienteSeleccionado)
      const tipoCliente = clienteCompleto?.tipo || 'natural' // por defecto natural

      const cotizacion = {
        numeroCotizacion: numeroCotizacion || "",
        tipoDocumento: tipoDocumento || "cotizacion",
        fechaEmision: fechaEmision || new Date().toISOString().split("T")[0],
        fechaVencimiento: fechaVencimiento || calcularFechaVencimiento(10),
        razonSocial: razonSocial || "",
        dniRuc: dniRuc || "",
        direccion: direccion || "",
        telefono: telefono || "",
        tipoCliente: tipoCliente, // Agregar el tipo de cliente
        items: itemsValidados,
        subtotal: totales.subtotal || 0,
        impuesto: totales.impuesto || 0,
        total: totales.total || 0,
        terminosCondiciones: terminosCondiciones || "",
        lugarRecojo: lugarRecojo || "",
        formaPago: formaPago || "completo",
        formaEntrega: formaEntrega || "",
        totalTexto: numeroATexto(totales.total) || "",
        certificadosCalidad: certificadosCalidad || "",
        certificadosEstructurados: certificadosEstructurados || [], // Incluir certificados estructurados
        fichasTecnicas: Array.isArray(fichasTecnicas) ? fichasTecnicas : [],
        tipoProductoSeleccionado: tipoProductoSeleccionado || "vegetal",
        preciosConIGV: preciosConIGV,
      }

      localStorage.setItem("cotizacionActual", JSON.stringify(cotizacion))
      window.open("/imprimir", "_blank")
    } catch (error) {
      console.error("Error al generar vista previa:", error)
      alert("Ocurrió un error al generar la vista previa. Por favor, intente nuevamente.")
    }
  }, [
    items, numeroCotizacion, tipoDocumento, fechaEmision, fechaVencimiento,
    razonSocial, dniRuc, direccion, telefono, terminosCondiciones,
    lugarRecojo, formaPago, formaEntrega, certificadosCalidad,
    fichasTecnicas, tipoProductoSeleccionado, preciosConIGV, calcularTotales,
    clienteSeleccionado, clientes
  ])

  // Guardar cotización en BD
  const guardarCotizacion = useCallback(async () => {
    try {
      if (!clienteSeleccionado) {
        throw new Error('Debe seleccionar un cliente')
      }
      
      // Preparar productos válidos para BD
      const productosValidos = items
        .filter(item => item.codigo && item.cantidad > 0 && item.precioUnitario > 0)
        .map(item => ({
          producto_id: item.codigo === 'personalizado' ? null : item.codigo,
          cantidad: item.cantidad,
          precio_historico: item.precioUnitario
        }))

      const cotizacionData = limpiarDatosParaBD({
        cliente_id: clienteSeleccionado,
        fecha_emision: fechaEmision,
        fecha_vencimiento: fechaVencimiento,
        incluye_igv: preciosConIGV,
        productos: productosValidos,
        forma_pago_id: formaPagoSeleccionada || null, // Usar el ID de la forma de pago seleccionada
        lugar_recojo: lugarRecojo,
        forma_entrega: formaEntrega,
        terminos_condiciones: terminosCondiciones
      })

      const cotizacionCreada = await crearCotizacion(cotizacionData)
      
      // Mostrar mensaje de éxito y redirigir
      alert(`Cotización ${cotizacionCreada.cot_num_vac} guardada exitosamente`)
      router.push('/admin/cotizaciones') // o donde corresponda ver las cotizaciones
      
      return cotizacionCreada
    } catch (error) { 
      alert('Error al guardar la cotización: ' + (error as Error).message)
      throw error
    }
  }, [
    clienteSeleccionado, calcularTotales, items, fechaEmision, fechaVencimiento,
    preciosConIGV, lugarRecojo, formaEntrega, terminosCondiciones, formaPagoSeleccionada, router
  ])

  // Navegación entre tabs
  const avanzarPaso = useCallback(() => {
    if (activeTab === "informacion") {
      setActiveTab("productos")
    } else if (activeTab === "productos") {
      setActiveTab("adicional")
    } else if (activeTab === "adicional") {
      vistaPrevia()
    }
  }, [activeTab, vistaPrevia])

  const retrocederPaso = useCallback(() => {
    if (activeTab === "productos") {
      setActiveTab("informacion")
    } else if (activeTab === "adicional") {
      setActiveTab("productos")
    }
  }, [activeTab])

  // Regenerar número de cotización (útil después de guardar)
  const regenerarNumeroCotizacion = useCallback(async () => {
    try {
      const numero = await generarNumeroCotizacion()
      setNumeroCotizacion(numero)
      return numero
    } catch (error) {
      console.error('Error regenerando número de cotización:', error)
      // Fallback: usar timestamp
      const timestamp = Date.now()
      const year = new Date().getFullYear()
      const numeroFallback = `${timestamp.toString().slice(-6)}-${year}`
      setNumeroCotizacion(numeroFallback)
      return numeroFallback
    }
  }, [])

  // Función para cargar cotización existente para edición
  const cargarCotizacionParaEdicion = useCallback(async (cotizacionId: string) => {
    try {
      const cotizacion = await obtenerCotizacionPorId(cotizacionId)
      
      if (!cotizacion) {
        throw new Error('Cotización no encontrada')
      }

      // Establecer modo de edición
      setIsEditMode(true)
      setEditingCotizacionId(cotizacionId)

      // Cargar información básica
      setNumeroCotizacion(cotizacion.cot_num_vac)
      setFechaEmision(dateToInputValue(cotizacion.cot_fec_emis_dt))
      setFechaVencimiento(dateToInputValue(cotizacion.cot_fec_venc_dt))
      setPreciosConIGV(cotizacion.cot_igv_bol)
      
      // Cargar información del cliente
      setClienteSeleccionado(cotizacion.per_id_int)
      if (cotizacion.persona) {
        const persona = cotizacion.persona
        if (persona.Persona_Natural && persona.Persona_Natural.length > 0) {
          setRazonSocial(`${persona.Persona_Natural[0].per_nat_nomb_vac || ''} ${persona.Persona_Natural[0].per_nat_apell_vac || ''}`.trim())
          setDniRuc(persona.per_num_docum_vac || '')
        } else if (persona.Persona_Juridica && persona.Persona_Juridica.length > 0) {
          setRazonSocial(persona.Persona_Juridica[0].per_jurd_razSocial_vac || '')
          setDniRuc(persona.per_num_docum_vac || '')
        }
        setDireccion(persona.per_direcc_vac || '')
        setTelefono(persona.per_num_telf_vac || '')
      }

      // Cargar productos
      if (cotizacion.detalle_cotizacion && cotizacion.detalle_cotizacion.length > 0) {
        const itemsCargados = cotizacion.detalle_cotizacion.map((detalle: any, index: number) => ({
          id: index + 1,
          nombre: detalle.producto?.pro_nomb_vac || '',
          descripcion: detalle.producto?.pro_desc_vac || '',
          cantidad: detalle.det_cot_cant_int,
          precioUnitario: detalle.det_cot_prec_hist_int,
          total: detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int,
          codigo: detalle.producto?.pro_id_int?.toString() || ''
        }))
        setItems(itemsCargados)
      }

      // Cargar información adicional
      if (cotizacion.informacion_adicional && cotizacion.informacion_adicional.length > 0) {
        const info = cotizacion.informacion_adicional[0]
        setLugarRecojo(info.inf_ad_lug_recojo_vac || '')
        setFormaEntrega(info.inf_ad_form_entr_vac || '')
        
        // Cargar forma de pago
        if (info.form_pa_id_int) {
          setFormaPagoSeleccionada(info.form_pa_id_int)
          
          // Obtener el form_pa_tipo_int desde forma_pago para mapear correctamente
          const tipoFormaPago = info.forma_pago?.form_pa_tipo_int
          // Mapear forma de pago: tipo 1 = completo (PAGO_100), tipo 2 = parcial (PAGO_50_50)
          const formaPagoUI = tipoFormaPago === 1 ? 'completo' : 'parcial'
          setFormaPago(formaPagoUI)
        }
        
        // Cargar términos y condiciones
        setTerminosCondiciones(info.inf_ad_term_cond_vac || terminosCondicionesDefault)
      }

      // Ir al tab de información general
      setActiveTab('informacion')
      
      return cotizacion
    } catch (error) {
      console.error('Error cargando cotización para edición:', error)
      throw error
    }
  }, [terminosCondicionesDefault])

  // Función para limpiar el modo de edición y resetear formulario
  const limpiarModoEdicion = useCallback(async () => {
    setIsEditMode(false)
    setEditingCotizacionId(null)
    
    // Resetear todos los campos del formulario
    setActiveTab('informacion')
    setTipoDocumento('cotizacion')
    setPreciosConIGV(false)
    
    // Generar nuevo número de cotización
    try {
      const numero = await generarNumeroCotizacion()
      setNumeroCotizacion(numero)
    } catch (error) {
      console.error('Error regenerando número:', error)
      const timestamp = Date.now()
      const year = new Date().getFullYear()
      setNumeroCotizacion(`${timestamp.toString().slice(-6)}-${year}`)
    }
    
    setFechaEmision(new Date().toISOString().split('T')[0])
    setFechaVencimiento(calcularFechaVencimiento(10))
    
    // Limpiar información del cliente
    setClienteSeleccionado('')
    setRazonSocial('')
    setDniRuc('')
    setDireccion('')
    setTelefono('')
    
    // Resetear productos a estado inicial
    setItems([
      { id: 1, nombre: '', descripcion: '', cantidad: 1, precioUnitario: 0, total: 0, codigo: '' }
    ])
    
    // Limpiar información adicional
    setTerminosCondiciones(terminosCondicionesDefault)
    setLugarRecojo('')
    setFormaPago('completo')
    setFormaEntrega('')
    setCertificadosCalidad(certificadosDefault)
    setFormaPagoSeleccionada('')
  }, [terminosCondicionesDefault, certificadosDefault])

  // Función para guardar/actualizar cotización
  const guardarOActualizarCotizacion = useCallback(async () => {
    try {
      if (!clienteSeleccionado) {
        throw new Error('Debe seleccionar un cliente')
      }
      
      // Preparar productos válidos para BD
      const productosValidos = items
        .filter(item => item.codigo && item.cantidad > 0 && item.precioUnitario > 0)
        .map(item => ({
          producto_id: item.codigo === 'personalizado' ? null : item.codigo,
          cantidad: item.cantidad,
          precio_historico: item.precioUnitario
        }))

      // Preparar datos base para la cotización
      const baseCotizacionData: any = {
        cliente_id: clienteSeleccionado,
        incluye_igv: preciosConIGV,
        productos: productosValidos,
        forma_pago_id: formaPagoSeleccionada || null,
        lugar_recojo: lugarRecojo,
        forma_entrega: formaEntrega,
        terminos_condiciones: terminosCondiciones
      }

      // Solo incluir fechas si tienen valores válidos (para evitar sobrescribir fechas existentes con null)
      if (fechaEmision && fechaEmision.trim()) {
        baseCotizacionData.fecha_emision = fechaEmision
      }
      if (fechaVencimiento && fechaVencimiento.trim()) {
        baseCotizacionData.fecha_vencimiento = fechaVencimiento
      }

      const cotizacionData = limpiarDatosParaBD(baseCotizacionData)

      let cotizacionCreada
      
      if (isEditMode && editingCotizacionId) {
        // Actualizar cotización existente
        cotizacionCreada = await actualizarCotizacion(editingCotizacionId, cotizacionData)
        alert(`Cotización ${numeroCotizacion} actualizada exitosamente`)
      } else {
        // Crear nueva cotización
        cotizacionCreada = await crearCotizacion(cotizacionData)
        alert(`Cotización ${cotizacionCreada.cot_num_vac} guardada exitosamente`)
      }
      
      // Limpiar modo de edición y redirigir
      limpiarModoEdicion()
      router.push('/admin/cotizaciones')
      
      return cotizacionCreada
    } catch (error) { 
      alert(`Error al ${isEditMode ? 'actualizar' : 'guardar'} la cotización: ` + (error as Error).message)
      throw error
    }
  }, [
    clienteSeleccionado, calcularTotales, items, fechaEmision, fechaVencimiento,
    preciosConIGV, lugarRecojo, formaEntrega, terminosCondiciones, formaPagoSeleccionada, 
    isEditMode, editingCotizacionId, numeroCotizacion, limpiarModoEdicion, router
  ])

  // Helpers
  const tieneLaboratorio = items.some((item) => item.codigo === "LAB")
  const obtenerTituloDocumento = () => {
    switch (tipoDocumento) {
      case "boleta":
        return "Boleta"
      case "factura":
        return "Factura"
      default:
        return "Cotización"
    }
  }

  return {
    // Estados
    activeTab,
    setActiveTab,
    tipoDocumento,
    setTipoDocumento,
    preciosConIGV,
    setPreciosConIGV,
    numeroCotizacion,
    setNumeroCotizacion,
    fechaEmision,
    setFechaEmision,
    fechaVencimiento,
    setFechaVencimiento,
    clienteSeleccionado,
    setClienteSeleccionado,
    razonSocial,
    setRazonSocial,
    dniRuc,
    setDniRuc,
    direccion,
    setDireccion,
    telefono,
    setTelefono,
    items,
    terminosCondiciones,
    setTerminosCondiciones,
    lugarRecojo,
    setLugarRecojo,
    formaPago,
    setFormaPago,
    formaEntrega,
    setFormaEntrega,
    certificadosCalidad,
    setCertificadosCalidad,
    certificadosEstructurados, // Exportar certificados estructurados
    fichasTecnicas,
    tipoProductoSeleccionado,

    // Productos de BD
    productos,
    productosLoading,
    
    // Estados de carga de certificados y fichas
    certificadosLoading,
    fichasLoading,
    
    // Formas de pago de BD
    formasPago,
    formaPagoSeleccionada,
    setFormaPagoSeleccionada,
    cambiarFormaPagoSeleccionada,
    formasPagoLoading,
    
    // Funciones
    seleccionarProducto,
    actualizarItem,
    agregarItem,
    eliminarItem,
    vistaPrevia,
    guardarCotizacion,
    guardarOActualizarCotizacion,
    cargarCotizacionParaEdicion,
    limpiarModoEdicion,
    regenerarNumeroCotizacion,
    avanzarPaso,
    retrocederPaso,
    calcularTotales,

    // Estados de edición
    isEditMode,
    editingCotizacionId,

    // Helpers
    tieneLaboratorio,
    obtenerTituloDocumento,
    router,
  }
}
