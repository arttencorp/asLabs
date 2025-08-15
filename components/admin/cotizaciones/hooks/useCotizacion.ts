import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { generarNumeroCotizacion, limpiarDatosParaBD } from '@/utils'
import { crearCotizacion } from '@/lib/supabase'
import { useClientes } from '@/components/admin/clientes'
import { useProductos } from './useProductos'
import { 
  productosPreexistentes, terminosCondicionesDefault, 
  terminosCondicionesLaboratorio, certificadosDefault 
} from '../constants'
import { calcularFechaVencimiento, numeroATexto } from '@/utils/index'
import {  generarCertificadosTexto } from '../utils'
import type { Item, FichaTecnica, TipoDocumento, FormaPagoUI, TabName } from '../types'

export function useCotizacion() {
  const router = useRouter()
  const { clientes } = useClientes()
  const { productos, loading: productosLoading, obtenerProductoPorId, formatearProductoParaSelector } = useProductos()
  
  // Estados principales
  const [activeTab, setActiveTab] = useState<TabName>('informacion')
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>('cotizacion')
  const [preciosConIGV, setPreciosConIGV] = useState(false)
  
  // Información de la cotización
  const [numeroCotizacion, setNumeroCotizacion] = useState(generarNumeroCotizacion())
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
    { id: 1, descripcion: '', cantidad: 1, precioUnitario: 0, total: 0, codigo: '' }
  ])
  
  // Información adicional
  const [terminosCondiciones, setTerminosCondiciones] = useState(terminosCondicionesDefault)
  const [lugarRecojo, setLugarRecojo] = useState('')
  const [formaPago, setFormaPago] = useState<FormaPagoUI>('completo')
  const [formaEntrega, setFormaEntrega] = useState('')
  const [certificadosCalidad, setCertificadosCalidad] = useState(certificadosDefault)
  const [fichasTecnicas, setFichasTecnicas] = useState<FichaTecnica[]>([])
  const [tipoProductoSeleccionado, setTipoProductoSeleccionado] = useState('vegetal')

  // Calcular totales usando utility global
  const calcularTotales = useCallback(() => {
    if (preciosConIGV) {
      const totalConIGV = items.reduce((sum, item) => sum + (item.total || 0), 0)
      const subtotalSinIGV = totalConIGV / 1.18
      const igv = totalConIGV - subtotalSinIGV
      return {
        subtotal: subtotalSinIGV,
        impuesto: igv,
        total: totalConIGV,
      }
    } else {
      const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0)
      const impuesto = subtotal * 0.18
      const total = subtotal + impuesto
      return {
        subtotal,
        impuesto,
        total,
      }
    }
  }, [items, preciosConIGV])

  // Actualizar certificados combinados
  const actualizarCertificadosCombinados = useCallback(() => {
    try {
      const codigosSeleccionados = items
        .filter((item) => item && item.codigo)
        .map((item) => item.codigo)
        .filter((codigo) => codigo && codigo !== "personalizado" && codigo !== "LAB")

      if (!codigosSeleccionados || codigosSeleccionados.length === 0) {
        setCertificadosCalidad(certificadosDefault)
        return
      }

      const codigosUnicos = [...new Set(codigosSeleccionados)]
      let todosCertificados: any[] = []
      
      codigosUnicos.forEach((codigo) => {
        const producto = productosPreexistentes.find((p) => p && p.id === codigo)
        if (producto && producto.certificados && Array.isArray(producto.certificados)) {
          todosCertificados = [...todosCertificados, ...producto.certificados]
        }
      })

      if (todosCertificados.length > 0) {
        const certificadosTexto = generarCertificadosTexto(todosCertificados)
        setCertificadosCalidad(certificadosTexto)
      }
    } catch (error) {
      console.error("Error al actualizar certificados:", error)
      setCertificadosCalidad(certificadosDefault)
    }
  }, [items])

  // Actualizar fichas técnicas
  const actualizarFichasTecnicas = useCallback(() => {
    try {
      const codigosSeleccionados = items
        .filter((item) => item && item.codigo)
        .map((item) => item.codigo)
        .filter((codigo) => codigo && codigo !== "personalizado" && codigo !== "LAB")

      if (!codigosSeleccionados || codigosSeleccionados.length === 0) {
        setFichasTecnicas([])
        return
      }

      const codigosUnicos = [...new Set(codigosSeleccionados)]
      const todasFichas: FichaTecnica[] = []
      
      codigosUnicos.forEach((codigo) => {
        const producto = productosPreexistentes.find((p) => p && p.id === codigo)
        if (producto && producto.fichaTecnica) {
          todasFichas.push(producto.fichaTecnica)
        }
      })

      setFichasTecnicas(todasFichas)
    } catch (error) {
      console.error("Error al actualizar fichas técnicas:", error)
      setFichasTecnicas([])
    }
  }, [items])

  // Seleccionar producto
  const seleccionarProducto = useCallback((id: number, productoId: string) => {
    if (!productoId) return
    
    console.log('🔍 Seleccionando producto:', { id, productoId })

    if (productoId === "personalizado") {
      setItems(items.map((item) => {
        if (item.id === id) {
          return { 
            ...item, 
            codigo: "personalizado",
            descripcion: "", // Limpiar descripción para personalizado
            precioUnitario: 0, // Limpiar precio para personalizado
            total: 0
          }
        }
        return item
      }))
      console.log('✅ Producto personalizado seleccionado')
      return
    }

    // Buscar primero en productos de BD
    const productoBD = obtenerProductoPorId(productoId)
    console.log('🔍 Producto BD encontrado:', productoBD)
    
    if (productoBD) {
      setItems(items.map((item) => {
        if (item.id === id) {
          const itemActualizado = {
            ...item,
            descripcion: productoBD.pro_nomb_vac || '',
            precioUnitario: productoBD.pro_prec_unitario_int || 0,
            total: item.cantidad * (productoBD.pro_prec_unitario_int || 0),
            codigo: productoBD.pro_id_int,
          }
          console.log('✅ Item actualizado con producto BD:', itemActualizado)
          return itemActualizado
        }
        return item
      }))
      
      // Para productos de BD, usar términos por defecto
      setTipoProductoSeleccionado("database")
      setTerminosCondiciones(terminosCondicionesDefault)
      
      setTimeout(() => {
        actualizarCertificadosCombinados()
        actualizarFichasTecnicas()
      }, 0)
      return
    }

    // Fallback a productos preexistentes (constantes) si no se encuentra en BD
    const productoSeleccionado = productosPreexistentes.find((p) => p.id === productoId)
    console.log('🔍 Producto conceptual encontrado:', productoSeleccionado)

    if (productoSeleccionado) {
      setItems(items.map((item) => {
        if (item.id === id) {
          const itemActualizado = {
            ...item,
            descripcion: productoSeleccionado.descripcion,
            precioUnitario: productoSeleccionado.precioUnitario,
            total: item.cantidad * productoSeleccionado.precioUnitario,
            codigo: productoSeleccionado.id,
          }
          console.log('✅ Item actualizado con producto conceptual:', itemActualizado)
          return itemActualizado
        }
        return item
      }))

      if (productoSeleccionado.tipoProducto) {
        setTipoProductoSeleccionado(productoSeleccionado.tipoProducto)

        if (productoSeleccionado.tipoProducto === "laboratorio") {
          setTerminosCondiciones(terminosCondicionesLaboratorio)
        } else {
          setTerminosCondiciones(terminosCondicionesDefault)
        }
      }

      setTimeout(() => {
        actualizarCertificadosCombinados()
        actualizarFichasTecnicas()
      }, 0)
    } else {
      console.log('❌ Producto no encontrado:', productoId)
    }
  }, [items, actualizarCertificadosCombinados, actualizarFichasTecnicas, obtenerProductoPorId])

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
              itemActualizado.descripcion = productoBD.pro_nomb_vac || ''
              itemActualizado.precioUnitario = productoBD.pro_prec_unitario_int || 0
              itemActualizado.total = itemActualizado.cantidad * itemActualizado.precioUnitario
            }
          }

          return itemActualizado
        }
        return item
      }))

      if (campo === "codigo") {
        setTimeout(() => {
          actualizarCertificadosCombinados()
          actualizarFichasTecnicas()
        }, 0)
      }
    } catch (error) {
      console.error("Error al actualizar item:", error)
    }
  }, [items, actualizarCertificadosCombinados, actualizarFichasTecnicas, obtenerProductoPorId])

  // Agregar item
  const agregarItem = useCallback(() => {
    try {
      const nuevoId = Math.max(...items.map((item) => item.id), 0) + 1
      setItems([...items, { 
        id: nuevoId, 
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
        setTimeout(() => {
          actualizarCertificadosCombinados()
          actualizarFichasTecnicas()
        }, 0)
      }
    } catch (error) {
      console.error("Error al eliminar item:", error)
    }
  }, [items, actualizarCertificadosCombinados, actualizarFichasTecnicas])

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

      const totales = calcularTotales()
      
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
        forma_pago_id: null, // Por ahora null, después se puede agregar selector de forma de pago
        lugar_recojo: lugarRecojo,
        forma_entrega: formaEntrega,
        terminos_condiciones: terminosCondiciones
      })

      const cotizacionCreada = await crearCotizacion(cotizacionData)
      
      // Mostrar mensaje de éxito y redirigir
      alert(`Cotización ${cotizacionCreada.cot_num_vac} guardada exitosamente`)
      router.push('/admin/pedidos') // o donde corresponda ver las cotizaciones
      
      return cotizacionCreada
    } catch (error) {
      console.error("Error guardando cotización:", error)
      alert('Error al guardar la cotización: ' + (error as Error).message)
      throw error
    }
  }, [
    clienteSeleccionado, calcularTotales, items, fechaEmision, fechaVencimiento,
    preciosConIGV, lugarRecojo, formaEntrega, terminosCondiciones, router
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
    fichasTecnicas,
    tipoProductoSeleccionado,

    // Productos de BD
    productos,
    productosLoading,
    
    // Funciones
    seleccionarProducto,
    actualizarItem,
    agregarItem,
    eliminarItem,
    vistaPrevia,
    guardarCotizacion,
    avanzarPaso,
    retrocederPaso,
    calcularTotales,

    // Helpers
    tieneLaboratorio,
    obtenerTituloDocumento,
    router,
  }
}