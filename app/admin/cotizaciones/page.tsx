"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Eye, 
  Edit, 
  ArrowLeft
} from "lucide-react"
import { useCotizacion } from "@/components/admin/cotizaciones/hooks/useCotizacion"
import { InformacionGeneral } from "@/components/admin/cotizaciones/components/informacionGeneral"
import { ProductosServicios } from "@/components/admin/cotizaciones/components/productosServicios"
import { InformacionAdicional } from "@/components/admin/cotizaciones/components/informacionAdicional"
import { CotizacionViewDialog } from "@/components/admin/cotizaciones/components/cotizacionViewDialog"
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
          <div className="bg-white rounded-lg shadow">
            {/* Mensajes de estado */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-t-lg">
                Error: {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-t-lg">
                {success}
              </div>
            )}

            {cotizacionesLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando cotizaciones...</p>
              </div>
            ) : cotizaciones && cotizaciones.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Número
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Emisión
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IGV
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cotizaciones.map((cotizacion: CotizacionItem) => {
                      // Calcular nombre completo del cliente
                      const nombreCliente = (() => {
                        if (cotizacion.persona?.Persona_Juridica?.[0]?.per_jurd_razSocial_vac) {
                          return cotizacion.persona.Persona_Juridica[0].per_jurd_razSocial_vac
                        }
                        if (cotizacion.persona?.Persona_Natural?.[0]) {
                          const natural = cotizacion.persona.Persona_Natural[0]
                          return `${natural.per_nat_nomb_vac || ''} ${natural.per_nat_apell_vac || ''}`.trim()
                        }
                        if (cotizacion.persona?.per_nom_contac_vac) {
                          return cotizacion.persona.per_nom_contac_vac
                        }
                        return 'Cliente no especificado'
                      })()

                      // Calcular total desde detalle_cotizacion (cantidad × precio histórico)
                      const total = cotizacion.detalle_cotizacion?.reduce((sum, detalle) => {
                        return sum + (detalle.det_cot_cant_int * detalle.det_cot_prec_hist_int)
                      }, 0) || 0

                      return (
                        <tr key={cotizacion.cot_id_int} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {cotizacion.cot_num_vac}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {nombreCliente}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(cotizacion.cot_fec_emis_dt).toLocaleDateString('es-ES')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            S/ {total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {cotizacion.cot_igv_bol ? 'Con IGV' : 'Sin IGV'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleVerCotizacion(cotizacion)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditarCotizacion(cotizacion)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600 mb-4">No hay cotizaciones registradas</p>
                <Button
                  onClick={handleNuevaCotizacion}
                  className="bg-green-600 hover:bg-[#4a7c3a] text-white flex items-center gap-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  Crear primera cotización
                </Button>
              </div>
            )}
          </div>
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