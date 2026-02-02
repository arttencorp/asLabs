'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Send, 
  Printer,
  Loader2,
  Settings
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  useDocumentoLab,
  InformacionDocumento,
  MuestrasSection,
  ResultadosSection,
  AgentesSection,
  AnexosSection,
  DocumentoLabList,
  DocumentoLabStats,
  PreviewSection
} from '@/components/admin/documentoLab'
import type { TabDocumentoLab } from '@/components/admin/documentoLab'

export default function DocumentoLabPage() {
  const router = useRouter()
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
    
    // Gestión de muestras
    agregarMuestra,
    actualizarMuestra,
    eliminarMuestra,
    
    // Gestión de resultados
    agregarResultado,
    actualizarResultado,
    eliminarResultado,
    
    // Gestión de agentes
    agregarAgente,
    actualizarAgente,
    eliminarAgente,
    
    // Gestión de anexos
    agregarAnexo,
    eliminarAnexo,
    
    // Acciones principales
    guardarDocumento,
    emitirDocumento,
    cargarDocumentoParaEdicion,
    nuevoDocumento,
    
    // Estadísticas
    estadisticas
  } = useDocumentoLab()

  // Cargar documentos al montar y cuando cambien filtros
  useEffect(() => {
    cargarDocumentos()
  }, [cargarDocumentos])

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

  const handleEmitir = async () => {
    const exito = await emitirDocumento()
    if (exito) {
      // Mostrar mensaje de éxito
      console.log('Documento emitido exitosamente')
    }
  }

  const handleVolverALista = () => {
    setMainTab('lista')
    cargarDocumentos()
  }

  const stats = estadisticas()
  const esDocumentoEmitido = documento.estadoNombre?.toLowerCase().includes('emitido')

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
            <Button onClick={handleNuevoDocumento}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Documento
            </Button>
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
              {!esDocumentoEmitido && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleGuardar}
                    disabled={guardando || catalogosLoading}
                  >
                    {guardando ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Guardar Borrador
                  </Button>
                  <Button
                    onClick={handleEmitir}
                    disabled={guardando || catalogosLoading}
                  >
                    {guardando ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Emitir Documento
                  </Button>
                </>
              )}
              
              {esDocumentoEmitido && documento.id && (
                <Button onClick={() => handleImprimirDocumento(documento.id)}>
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
              <TabsList className="grid w-full grid-cols-6">
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
                <TabsTrigger value="preview" className="bg-green-50 data-[state=active]:bg-green-100">
                  👁️ Preview
                </TabsTrigger>
              </TabsList>

              {/* Tab Información */}
              <TabsContent value="informacion">
                <InformacionDocumento
                  documento={documento}
                  areas={areas}
                  servicios={servicios}
                  tiposDocumento={tiposDocumento}
                  clientes={clientes}
                  areaSeleccionada={areaSeleccionada}
                  onAreaChange={seleccionarArea}
                  onServicioChange={seleccionarServicio}
                  onTipoDocumentoChange={seleccionarTipoDocumento}
                  onClienteChange={seleccionarCliente}
                  disabled={esDocumentoEmitido}
                />
              </TabsContent>

              {/* Tab Muestras */}
              <TabsContent value="muestras">
                <MuestrasSection
                  muestras={documento.muestras}
                  codigoDocumento={documento.codigo}
                  onAgregarMuestra={agregarMuestra}
                  onActualizarMuestra={actualizarMuestra}
                  onEliminarMuestra={eliminarMuestra}
                  disabled={esDocumentoEmitido}
                />
              </TabsContent>

              {/* Tab Resultados */}
              <TabsContent value="resultados">
                <ResultadosSection
                  resultados={documento.resultados}
                  muestras={documento.muestras}
                  onAgregarResultado={agregarResultado}
                  onActualizarResultado={actualizarResultado}
                  onEliminarResultado={eliminarResultado}
                  disabled={esDocumentoEmitido}
                />
              </TabsContent>

              {/* Tab Agentes */}
              <TabsContent value="agentes">
                <AgentesSection
                  agentes={documento.agentes}
                  muestras={documento.muestras}
                  onAgregarAgente={agregarAgente}
                  onActualizarAgente={actualizarAgente}
                  onEliminarAgente={eliminarAgente}
                  disabled={esDocumentoEmitido}
                />
              </TabsContent>

              {/* Tab Anexos */}
              <TabsContent value="anexos">
                <AnexosSection
                  anexos={documento.anexos}
                  onAgregarAnexo={agregarAnexo}
                  onEliminarAnexo={eliminarAnexo}
                  disabled={esDocumentoEmitido}
                />
              </TabsContent>

              {/* Tab Preview */}
              <TabsContent value="preview">
                <PreviewSection
                  documento={documento}
                  onEmitir={handleEmitir}
                  onImprimir={() => window.print()}
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
