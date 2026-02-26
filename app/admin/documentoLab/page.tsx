'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Printer,
  Loader2,
  Settings
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  useDocumentoLab,
  InformacionDocumento,
  MuestrasSection,
  ResultadosSection,
  NotasResultadoSection,
  AgentesSection,
  AnexosSection,
  FirmasSection,
  DocumentoLabList,
  DocumentoLabStats,
  PreviewSection
} from '@/components/admin/documentoLab'
import type { TabDocumentoLab } from '@/components/admin/documentoLab'

export default function DocumentoLabPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mainTab, setMainTab] = useState<'lista' | 'crear'>('lista')
  
  const {
    // Catálogos
    areas,
    servicios,
    tiposDocumento,
    estadosDocumento,
    clientes,
    
    // Estados de carga
    catalogosLoading,
    documentosLoading,
    guardando,
    
    // Documento actual
    documento,
    modoEdicion,
    activeTab,
    setActiveTab,
    
    // Lista de documentos
    documentos,
    cargarDocumentos,
    
    // Filtros
    areaSeleccionada,
    setAreaSeleccionada,
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
    agregarMuestra,
    actualizarMuestra,
    eliminarMuestra,
    
    // Gestión de resultados
    agregarResultado,
    actualizarResultado,
    eliminarResultado,
    
    // Gestión de notas
    agregarNota,
    actualizarNota,
    eliminarNota,
    
    // Gestión de agentes
    agregarAgente,
    actualizarAgente,
    eliminarAgente,
    
    // Gestión de anexos
    agregarAnexo,
    actualizarAnexo,
    eliminarAnexo,
    
    // Configuraciones EAV
    configCampos,
    configAnexos,
    
    // Gestión de firmas
    firmasDisponibles,
    agregarFirma,
    removerFirma,
    
    // Acciones principales
    guardarDocumento,
    cargarDocumentoParaEdicion,
    nuevoDocumento,
    
    // Estadísticas
    estadisticas
  } = useDocumentoLab()

  // Cargar documentos al montar y cuando cambien filtros
  useEffect(() => {
    cargarDocumentos()
  }, [cargarDocumentos])

  // Deep-linking: abrir documento desde el módulo de recepción u otros
  const returnTo = searchParams.get('returnTo')
  useEffect(() => {
    const docId = searchParams.get('docId')
    const modo = searchParams.get('modo')
    if (docId) {
      cargarDocumentoParaEdicion(docId)
      setMainTab('crear')
      if (modo === 'ver') {
        setActiveTab('preview')
      }
    }
    // Solo ejecutar cuando cambian los searchParams
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Handlers
  const handleNuevoDocumento = () => {
    nuevoDocumento()
    setMainTab('crear')
  }

  const handleVerDocumento = (documentoId: string) => {
    cargarDocumentoParaEdicion(documentoId)
    setMainTab('crear')
    setActiveTab('preview')
  }

  const handleEditarDocumento = (documentoId: string) => {
    cargarDocumentoParaEdicion(documentoId)
    setMainTab('crear')
  }

  const handleImprimirDocumento = (documentoId: string) => {
    router.push(`/imprimir/documento-lab/${documentoId}`)
  }

  const handleGuardar = async () => {
    const exito = await guardarDocumento()
    if (exito) {
      // Mostrar mensaje de éxito (podrías usar un toast)
      console.log('Documento guardado exitosamente')
    }
  }

  const handleVolverALista = () => {
    if (returnTo) {
      router.push(returnTo)
      return
    }
    setMainTab('lista')
    cargarDocumentos()
  }

  const stats = estadisticas()

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Documentos de Laboratorio
          </h1>
          <p className="text-muted-foreground">
            Gestión de certificados, informes y otros documentos de laboratorio
          </p>
        </div>
        
        {mainTab === 'lista' && (
          <div className="flex gap-2">
            <Link href="/admin/documentoLab/configuracion">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
            </Link>
            {/* <Button onClick={handleNuevoDocumento}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Documento
            </Button>*/}
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as 'lista' | 'crear')}>
        <TabsList>
          <TabsTrigger value="lista">Lista de Documentos</TabsTrigger>
          <TabsTrigger value="crear">
            {modoEdicion ? 'Editar Documento' : 'Nuevo Documento'}
          </TabsTrigger>
        </TabsList>

        {/* Tab Lista */}
        <TabsContent value="lista" className="space-y-6">
          {/* Estadísticas */}
          <DocumentoLabStats 
            total={stats.total}
            porEstado={stats.porEstado}
          />

          {/* Lista */}
          <DocumentoLabList
            documentos={documentos}
            areas={areas}
            estadosDocumento={estadosDocumento}
            filtroEstado={filtroEstado}
            filtroBusqueda={filtroBusqueda}
            areaSeleccionada={areaSeleccionada}
            onFiltroEstadoChange={setFiltroEstado}
            onFiltroBusquedaChange={setFiltroBusqueda}
            onAreaChange={setAreaSeleccionada}
            onVerDocumento={handleVerDocumento}
            onEditarDocumento={handleEditarDocumento}
            onImprimirDocumento={handleImprimirDocumento}
            onRefrescar={cargarDocumentos}
            loading={documentosLoading}
          />
        </TabsContent>

        {/* Tab Crear/Editar */}
        <TabsContent value="crear" className="space-y-6">
          {/* Acciones del formulario */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handleVolverALista}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la lista
            </Button>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleGuardar}
                disabled={guardando || catalogosLoading}
              >
                {guardando ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Guardar
              </Button>
              
              {documento.id && !documento.id.startsWith('temp_') && (
                <Button 
                  variant="outline"
                  onClick={() => handleImprimirDocumento(documento.id)}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
              )}
            </div>
          </div>

          {/* Tabs del formulario */}
          {catalogosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Tabs 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as TabDocumentoLab)}
            >
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="informacion">Información</TabsTrigger>
                <TabsTrigger value="muestras">
                  Muestras ({documento.muestras.length})
                </TabsTrigger>
                <TabsTrigger value="resultados">
                  Resultados ({documento.resultados.length})
                </TabsTrigger>
                <TabsTrigger value="agentes">
                  Agentes ({documento.agentes.length})
                </TabsTrigger>
                <TabsTrigger value="anexos">
                  Anexos ({documento.anexos.length})
                </TabsTrigger>
                <TabsTrigger value="firmas">
                  Firmas ({documento.firmas?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="preview" className="bg-green-50 data-[state=active]:bg-green-100">
                  Preview
                </TabsTrigger>
              </TabsList>

              {/* Tab Información */}
              <TabsContent value="informacion">
                <InformacionDocumento
                  documento={documento}
                  areas={areas}
                  servicios={servicios}
                  tiposDocumento={tiposDocumento}
                  estadosDocumento={estadosDocumento}
                  clientes={clientes}
                  areaSeleccionada={areaSeleccionada}
                  onAreaChange={seleccionarArea}
                  onServicioChange={seleccionarServicio}
                  onTipoDocumentoChange={seleccionarTipoDocumento}
                  onClienteChange={seleccionarCliente}
                  onEstadoChange={seleccionarEstado}
                />
              </TabsContent>

              {/* Tab Muestras */}
              <TabsContent value="muestras">
                <MuestrasSection
                  muestras={documento.muestras}
                  codigoDocumento={documento.codigo}
                  configCampos={configCampos}
                  onAgregarMuestra={agregarMuestra}
                  onActualizarMuestra={actualizarMuestra}
                  onEliminarMuestra={eliminarMuestra}
                />
              </TabsContent>

              {/* Tab Resultados */}
              <TabsContent value="resultados">
                <ResultadosSection
                  resultados={documento.resultados}
                  muestras={documento.muestras}
                  servicioConfExtra={documento.servicioConfExtra}
                  onAgregarResultado={agregarResultado}
                  onActualizarResultado={actualizarResultado}
                  onEliminarResultado={eliminarResultado}
                />
                {/* Sub-sección de Notas */}
                <div className="mt-6">
                  <NotasResultadoSection
                    notas={documento.notas}
                    resultados={documento.resultados}
                    onAgregarNota={agregarNota}
                    onActualizarNota={actualizarNota}
                    onEliminarNota={eliminarNota}
                  />
                </div>
              </TabsContent>

              {/* Tab Agentes */}
              <TabsContent value="agentes">
                <AgentesSection
                  agentes={documento.agentes}
                  muestras={documento.muestras}
                  onAgregarAgente={agregarAgente}
                  onActualizarAgente={actualizarAgente}
                  onEliminarAgente={eliminarAgente}
                />
              </TabsContent>

              {/* Tab Anexos */}
              <TabsContent value="anexos">
                <AnexosSection
                  anexos={documento.anexos}
                  configAnexos={configAnexos}
                  onAgregarAnexo={agregarAnexo}
                  onActualizarAnexo={actualizarAnexo}
                  onEliminarAnexo={eliminarAnexo}
                />
              </TabsContent>

              {/* Tab Firmas */}
              <TabsContent value="firmas">
                <FirmasSection
                  firmasAsignadas={documento.firmas || []}
                  firmasDisponibles={firmasDisponibles}
                  onAgregarFirma={agregarFirma}
                  onRemoverFirma={removerFirma}
                />
              </TabsContent>

              {/* Tab Preview */}
              <TabsContent value="preview">
                <PreviewSection
                  documento={documento}
                  onImprimir={() => documento.id && handleImprimirDocumento(documento.id)}
                  onVolver={() => setActiveTab('informacion')}
                />
              </TabsContent>
            </Tabs>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
