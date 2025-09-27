"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Eye, 
  Edit, 
  ArrowLeft,
  Download
} from "lucide-react"
import { formatDate } from "@/utils"
import { useCotizacion } from "@/components/admin/cotizaciones/hooks/useCotizacion"
import { InformacionGeneral } from "@/components/admin/cotizaciones/components/informacionGeneral"
import { ProductosServicios } from "@/components/admin/cotizaciones/components/productosServicios"
import { InformacionAdicional } from "@/components/admin/cotizaciones/components/informacionAdicional"
import { CotizacionViewDialog } from "@/components/admin/cotizaciones/components/cotizacionViewDialog"
import { CotizacionesTable } from "@/components/admin/cotizaciones/components/cotizacionesList"
import { useBaseCrud } from "@/hooks/useBaseCrud"
import { obtenerCotizaciones } from "@/lib/supabase"

// Simplificando la interfaz para que coincida con lo que realmente devuelve la BD
interface CotizacionItem {
  cot_id_int: string
  cot_num_vac: string
  cot_fec_emis_dt: string
  cot_fec_venc_dt: string
  cot_igv_bol: boolean
  per_id_int: string
  persona?: {
    per_nom_contac_vac: string | null
    Persona_Natural?: Array<{
      per_nat_nomb_vac: string | null
      per_nat_apell_vac: string | null
    }>
    Persona_Juridica?: Array<{
      per_jurd_razSocial_vac: string | null
    }>
  }
  estado_cotizacion?: {
    est_cot_desc_vac: string
    est_cot_tipo_int: number
  }
  detalle_cotizacion?: Array<{
    det_cot_cant_int: number
    det_cot_prec_hist_int: number
    producto?: {
      pro_nomb_vac: string
    }
  }>
  informacion_adicional?: any
}

export default function CotizacionesPage() {
  const [mainTab, setMainTab] = useState<'lista' | 'crear'>('lista')
  
  // Estados para el modal de visualización
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedCotizacion, setSelectedCotizacion] = useState<CotizacionItem | null>(null)

  // Hook para gestionar las cotizaciones (lista)
  const {
    items: cotizaciones,
    loading: cotizacionesLoading,
    error,
    success,
    loadData: recargarCotizaciones
  } = useBaseCrud<CotizacionItem, any>({
    fetchFn: obtenerCotizaciones,
    createFn: async () => { throw new Error("Use el formulario de nueva cotización") },
    updateFn: async () => { throw new Error("Use el formulario de edición") },
    deleteFn: async () => { throw new Error("Eliminar cotización no implementado") },
    initialForm: {},
    getIdFn: (cotizacion) => cotizacion.cot_id_int
  })

  // Hook para creación - SIEMPRE se inicializa, nunca condicionalmente
  const cotizacionHook = useCotizacion()

  // Función para ver cotización
  const handleVerCotizacion = (cotizacion: CotizacionItem) => {
    setSelectedCotizacion(cotizacion)
    setShowViewDialog(true)
  }

  // Función para crear nueva cotización (limpiar formulario)
  const handleNuevaCotizacion = () => {
    cotizacionHook.limpiarModoEdicion()
    setMainTab('crear')
  }

  // Función para editar cotización
  const handleEditarCotizacion = async (cotizacion: CotizacionItem) => {
    try {
      await cotizacionHook.cargarCotizacionParaEdicion(cotizacion.cot_id_int)
      setMainTab('crear') // Cambiar al tab de crear/editar
    } catch (error) {
      console.error('Error cargando cotización para edición:', error)
      alert('Error al cargar la cotización para edición')
    }
  }

  // Función para descargar/reimprimir cotización
  const handleDescargarCotizacion = async (cotizacion: CotizacionItem) => {
    try {
      // Importar funciones necesarias desde supabase
      const { 
        obtenerCotizacionPorId,
        obtenerCertificadosPorProductos,
        obtenerFichasTecnicasPorProductos,
        transformarFichasTecnicasBD 
      } = await import('@/lib/supabase')
      
      // Importar utilidades necesarias
      const { calcularTotalCotizacion, numeroATexto } = await import('@/utils/index')
      
      // Obtener los datos completos de la cotización con todas las relaciones
      const cotizacionCompleta = await obtenerCotizacionPorId(cotizacion.cot_id_int)
      
      if (!cotizacionCompleta) {
        alert('No se pudo cargar la cotización completa')
        return
      }

      // Extraer información del cliente
      const persona = cotizacionCompleta.persona
      let razonSocial = ''
      let dniRuc = ''
      let tipoCliente = 'natural'

      if (persona?.Persona_Natural?.[0]) {
        const natural = persona.Persona_Natural[0]
        razonSocial = `${natural.per_nat_nomb_vac || ''} ${natural.per_nat_apell_vac || ''}`.trim()
        dniRuc = natural.per_nat_dni_int ? natural.per_nat_dni_int.toString() : ''
        tipoCliente = 'natural'
      } else if (persona?.Persona_Juridica?.[0]) {
        const juridica = persona.Persona_Juridica[0]
        razonSocial = juridica.per_jurd_razSocial_vac || ''
        dniRuc = juridica.per_jurd_ruc_int ? juridica.per_jurd_ruc_int.toString() : ''
        tipoCliente = 'juridica'
      } else if (persona?.per_nom_contac_vac) {
        razonSocial = persona.per_nom_contac_vac
        dniRuc = '' // No hay documento disponible para contactos genéricos
        tipoCliente = 'natural' // Default para contactos genéricos
      }

      // Procesar items con productos de BD
      const items = cotizacionCompleta.detalle_cotizacion?.map((detalle: any, index: number) => ({
        id: index + 1,
        descripcion: detalle.producto?.pro_nomb_vac || '',
        nombre: detalle.producto?.pro_nomb_vac || '',
        cantidad: detalle.det_cot_cant_int || 0,
        precioUnitario: detalle.det_cot_prec_hist_int || 0,
        total: (detalle.det_cot_cant_int || 0) * (detalle.det_cot_prec_hist_int || 0),
        codigo: detalle.producto?.pro_id_int || ''
      })) || []

      // Calcular totales usando la misma lógica que el hook
      const { total: totalCalculado } = calcularTotalCotizacion(
        cotizacionCompleta.detalle_cotizacion?.map((d: any) => ({
          cantidad: d.det_cot_cant_int,
          precio: d.det_cot_prec_hist_int
        })) || [],
        cotizacionCompleta.cot_igv_bol
      )

      const subtotal = items.reduce((sum: number, item: any) => sum + (item.total || 0), 0)
      const impuesto = cotizacionCompleta.cot_igv_bol ? subtotal * 0.18 : 0
      const total = cotizacionCompleta.cot_igv_bol ? subtotal + impuesto : subtotal

      // Obtener IDs de productos para cargar certificados y fichas técnicas
      const productosIds = items
        .map((item: any) => item.codigo)
        .filter((codigo: string) => codigo && codigo !== 'personalizado') as string[]

      let certificadosEstructurados: any[] = []
      let fichasTecnicas: any[] = []
      let certificadosCalidad = ""

      // Cargar certificados y fichas técnicas si hay productos de BD
      if (productosIds.length > 0) {
        try {
          const [certificadosMap, fichasMap] = await Promise.all([
            obtenerCertificadosPorProductos(productosIds),
            obtenerFichasTecnicasPorProductos(productosIds)
          ])

          // Consolidar certificados de todos los productos
          Object.values(certificadosMap).forEach((certs: any) => {
            certificadosEstructurados = [...certificadosEstructurados, ...certs]
          })

          // Consolidar fichas técnicas de todos los productos
          Object.values(fichasMap).forEach((fichas: any) => {
            const fichasTransformadas = transformarFichasTecnicasBD(fichas)
            fichasTecnicas = [...fichasTecnicas, ...fichasTransformadas]
          })

          // Generar texto de certificados (usar lógica similar al hook)
          if (certificadosEstructurados.length > 0) {
            certificadosCalidad = certificadosEstructurados
              .map((cert: any) => `${cert.cert_cal_nomb_vac || 'Certificado'}: ${cert.cert_cal_desc_vac || 'Descripción no disponible'}`)
              .join('\n\n')
          }

          // Transformar certificados de BD al formato esperado por el componente
          certificadosEstructurados = certificadosEstructurados.map((cert: any) => ({
            titulo: cert.cer_cal_tipo_vac || 'Certificado de Calidad',
            codigo: cert.cer_cal_cod_muestra_int?.toString() || 'N/A',
            tipo: cert.cer_cal_tipo_vac || 'Análisis',
            informe: cert.cer_cal_infor_ensayo_vac || 'N/A',
            detalle: cert.cer_cal_result_vac ? [cert.cer_cal_result_vac] : ['Resultado no disponible'],
            link: cert.cer_cal_imag_url || undefined
          }))

        } catch (error) {
          console.error('Error cargando certificados y fichas:', error)
        }
      }

      // Estructurar datos exactamente como en vistaPrevia
      const cotizacionParaImpresion = {
        numeroCotizacion: cotizacionCompleta.cot_num_vac || "",
        tipoDocumento: "cotizacion",
        fechaEmision: cotizacionCompleta.cot_fec_emis_dt || "",
        fechaVencimiento: cotizacionCompleta.cot_fec_venc_dt || "",
        razonSocial,
        dniRuc,
        direccion: persona?.per_direc_vac || "",
        telefono: persona?.per_telef_int || "",
        tipoCliente,
        items,
        subtotal,
        impuesto,
        total,
        terminosCondiciones: cotizacionCompleta.informacion_adicional?.[0]?.inf_ad_term_cond_vac || "",
        lugarRecojo: cotizacionCompleta.informacion_adicional?.[0]?.inf_ad_lug_recojo_vac || "",
        formaPago: (() => {
          const infoAdicional = cotizacionCompleta.informacion_adicional?.[0]
          const formaPagoBD = infoAdicional?.forma_pago
          if (!formaPagoBD) return "completo"
          // Mapear usando form_pa_tipo_int: 1 = completo, 2 = parcial
          return formaPagoBD.form_pa_tipo_int === 2 ? "parcial" : "completo"
        })(),
        formaEntrega: cotizacionCompleta.informacion_adicional?.[0]?.inf_ad_form_entr_vac || "",
        totalTexto: numeroATexto(total) || "",
        certificadosCalidad: certificadosCalidad || "",
        certificadosEstructurados, // Como en vistaPrevia
        fichasTecnicas,
        tipoProductoSeleccionado: "vegetal", // Default
        preciosConIGV: cotizacionCompleta.cot_igv_bol
      }

      // Guardar en localStorage y abrir impresión
      localStorage.setItem("cotizacionActual", JSON.stringify(cotizacionParaImpresion))
      window.open("/imprimir", "_blank")
      
    } catch (error) {
      console.error('Error descargando cotización:', error)
      alert('Error al preparar la cotización para descarga: ' + (error as Error).message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cotizaciones</h1>
        <p className="text-gray-600">Gestione las cotizaciones de AS Laboratorios</p>
      </div>

      {/* Tabs principales: Lista y Crear */}
      <Tabs 
        value={mainTab} 
        onValueChange={(value) => {
          if (value === 'crear' && !cotizacionHook.isEditMode) {
            handleNuevaCotizacion()
          } else {
            setMainTab(value as 'lista' | 'crear')
          }
        }} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="lista"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Ver Cotizaciones
          </TabsTrigger>
          <TabsTrigger
            value="crear"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            {cotizacionHook.isEditMode ? 'Editar Cotización' : 'Nueva Cotización'}
          </TabsTrigger>
        </TabsList>

        {/* Tab Lista */}
        <TabsContent value="lista">
          {/* Mensajes de estado */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-4">
              Error: {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg mb-4">
              {success}
            </div>
          )}

          <CotizacionesTable
            cotizaciones={cotizaciones}
            loading={cotizacionesLoading}
            onVerCotizacion={handleVerCotizacion}
            onEditarCotizacion={handleEditarCotizacion}
            onDescargarCotizacion={handleDescargarCotizacion}
            onRefresh={recargarCotizaciones}
            onCreate={() => setMainTab('crear')}
          />
        </TabsContent>

        {/* Tab Crear */}
        <TabsContent value="crear">
          <CrearCotizacionContent 
            cotizacionHook={cotizacionHook} 
            onSuccess={() => {
              setMainTab('lista')
              recargarCotizaciones()
            }} 
          />
        </TabsContent>
      </Tabs>

      {/* Modal para ver cotización */}
      <CotizacionViewDialog
        open={showViewDialog}
        onClose={() => {
          setShowViewDialog(false)
          setSelectedCotizacion(null)
        }}
        cotizacion={selectedCotizacion}
      />
    </div>
  )
}

// Componente separado para el contenido de crear cotización
function CrearCotizacionContent({ 
  cotizacionHook, 
  onSuccess 
}: { 
  cotizacionHook: any, 
  onSuccess: () => void 
}) {
  const {
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
    certificadosEstructurados,
    productos,
    productosLoading,
    formasPago,
    formaPagoSeleccionada,
    setFormaPagoSeleccionada,
    cambiarFormaPagoSeleccionada,
    formasPagoLoading,
    seleccionarProducto,
    actualizarItem,
    agregarItem,
    eliminarItem,
    vistaPrevia,
    guardarCotizacion,
    guardarOActualizarCotizacion,
    avanzarPaso,
    retrocederPaso,
    calcularTotales,
    tieneLaboratorio,
    obtenerTituloDocumento,
    // Estados de edición
    isEditMode
  } = cotizacionHook

  const handleGuardar = async () => {
    try {
      await guardarOActualizarCotizacion()
      onSuccess()
    } catch (error) {
      console.error('Error al guardar cotización:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Selección de tipo de documento */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-3 text-gray-900">Seleccione el tipo de documento</h2>
        <div className="flex gap-3">
          <Button
            variant={tipoDocumento === "cotizacion" ? "default" : "outline"}
            onClick={() => setTipoDocumento("cotizacion")}
            className={
              tipoDocumento === "cotizacion"
                ? "bg-green-600 hover:bg-[#4a7c3a]"
                : "border-gray-800 text-gray-900 hover:bg-gray-100"
            }
          >
            Cotización
          </Button>
          <Button
            variant={tipoDocumento === "boleta" ? "default" : "outline"}
            onClick={() => setTipoDocumento("boleta")}
            className={
              tipoDocumento === "boleta"
                ? "bg-green-600 hover:bg-[#4a7c3a]"
                : "border-gray-800 text-gray-900 hover:bg-gray-100"
            }
          >
            Boleta
          </Button>
          <Button
            variant={tipoDocumento === "factura" ? "default" : "outline"}
            onClick={() => setTipoDocumento("factura")}
            className={
              tipoDocumento === "factura"
                ? "bg-green-600 hover:bg-[#4a7c3a]"
                : "border-gray-800 text-gray-900 hover:bg-gray-100"
            }
          >
            Factura
          </Button>
        </div>
      </div>

      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Nueva {obtenerTituloDocumento()}</h2>
        <p className="text-muted-foreground">
          Crea una {obtenerTituloDocumento().toLowerCase()} profesional en pocos pasos
        </p>
      </div>

      {/* Tabs del formulario */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "informacion" | "productos" | "adicional")} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="informacion"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            1. Información General
          </TabsTrigger>
          <TabsTrigger
            value="productos"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            2. Productos y Servicios
          </TabsTrigger>
          <TabsTrigger
            value="adicional"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            3. Información Adicional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="informacion">
          <InformacionGeneral
            numeroCotizacion={numeroCotizacion}
            setNumeroCotizacion={setNumeroCotizacion}
            fechaEmision={fechaEmision}
            setFechaEmision={setFechaEmision}
            fechaVencimiento={fechaVencimiento}
            setFechaVencimiento={setFechaVencimiento}
            clienteSeleccionado={clienteSeleccionado}
            setClienteSeleccionado={setClienteSeleccionado}
            razonSocial={razonSocial}
            setRazonSocial={setRazonSocial}
            dniRuc={dniRuc}
            setDniRuc={setDniRuc}
            direccion={direccion}
            setDireccion={setDireccion}
            telefono={telefono}
            setTelefono={setTelefono}
            onSiguiente={avanzarPaso}
          />
        </TabsContent>

        <TabsContent value="productos">
          <ProductosServicios
            items={items}
            preciosConIGV={preciosConIGV}
            setPreciosConIGV={setPreciosConIGV}
            productos={productos}
            productosLoading={productosLoading}
            seleccionarProducto={seleccionarProducto}
            actualizarItem={actualizarItem}
            agregarItem={agregarItem}
            eliminarItem={eliminarItem}
            calcularTotales={calcularTotales}
            onAnterior={retrocederPaso}
            onSiguiente={avanzarPaso}
          />
        </TabsContent>

        <TabsContent value="adicional">
          <InformacionAdicional
            lugarRecojo={lugarRecojo}
            setLugarRecojo={setLugarRecojo}
            formaEntrega={formaEntrega}
            setFormaEntrega={setFormaEntrega}
            formaPago={formaPago}
            setFormaPago={setFormaPago}
            terminosCondiciones={terminosCondiciones}
            setTerminosCondiciones={setTerminosCondiciones}
            certificadosCalidad={certificadosCalidad}
            setCertificadosCalidad={setCertificadosCalidad}
            certificadosEstructurados={certificadosEstructurados}
            tieneLaboratorio={tieneLaboratorio}
            formasPago={formasPago}
            formaPagoSeleccionada={formaPagoSeleccionada}
            setFormaPagoSeleccionada={setFormaPagoSeleccionada}
            cambiarFormaPagoSeleccionada={cambiarFormaPagoSeleccionada}
            formasPagoLoading={formasPagoLoading}
            isEditMode={isEditMode}
            onAnterior={retrocederPaso}
            onVistaPrevia={vistaPrevia}
            onGuardar={handleGuardar}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}