'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Printer, Home, Download, Loader2 } from 'lucide-react'
import { 
  INFO_EMPRESA, 
  TIPOS_AGENTE, 
  MATRICES_MUESTRA, 
  DECLARACIONES_AREA 
} from '@/components/admin/documentoLab/constants'
import type { DocumentoLabUI, FirmaDocumentoUI } from '@/components/admin/documentoLab/types'
import { formatDate } from '@/utils'
import { generarPdfDocumentoLab } from '@/utils/generarPdfDocumentoLab'

// Componente para los controles de impresión (no se imprimen)
function ControlesImpresion({ 
  onVolver, 
  onDescargarPDF,
  tipoDocumento,
  generandoPDF
}: { 
  onVolver: () => void
  onDescargarPDF: () => void
  tipoDocumento?: string
  generandoPDF: boolean
}) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm print:hidden">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onVolver}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <span className="text-sm text-muted-foreground">
            Vista previa: {tipoDocumento || 'Documento de Laboratorio'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={onDescargarPDF} 
            className="bg-[#5D9848] hover:bg-[#4a7a39]"
            disabled={generandoPDF}
          >
            {generandoPDF ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {generandoPDF ? 'Generando PDF...' : 'Descargar PDF'}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Componente para el encabezado del documento
function EncabezadoDocumento({ 
  codigo, 
  tipoDocumento 
}: { 
  codigo: string
  tipoDocumento?: string 
}) {
  return (
    <>
      <div className="h-1.5 w-full bg-[#5D9848] print:h-1.5"></div>
      
      <div className="mt-4 flex justify-between items-start">
        <div className="text-xs space-y-0.5">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            {tipoDocumento || 'Documento de Laboratorio'}
          </h1>
          <p className="text-base font-semibold text-[#5D9848]">{codigo || 'Sin código'}</p>
          <div className="mt-2 text-gray-600">
            <p className="font-semibold">{INFO_EMPRESA.nombre}</p>
            <p>RUC: {INFO_EMPRESA.ruc}</p>
            <p>{INFO_EMPRESA.direccionCentral}</p>
            <p>{INFO_EMPRESA.ciudad}, {INFO_EMPRESA.departamento}</p>
            <p>{INFO_EMPRESA.email}</p>
            <p>Tel: {INFO_EMPRESA.telefono}</p>
          </div>
        </div>
        <div className="flex items-start justify-end">
          <Image
            src="/images/new-logo.png"
            alt="AS Laboratorios"
            width={140}
            height={40}
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="my-4 h-[1px] w-full bg-gray-300"></div>
    </>
  )
}

// Componente para información del cliente
function InformacionCliente({ 
  cliente, 
  fechaEmision 
}: { 
  cliente: DocumentoLabUI['cliente']
  fechaEmision?: string
}) {
  return (
    <div className="grid grid-cols-2 gap-6 text-sm">
      <div className="space-y-1">
        <h3 className="font-semibold text-[#5D9848]">Datos del Cliente</h3>
        <div className="space-y-0.5 text-gray-700">
          <p><span className="font-medium">Razón Social:</span> {cliente.razonSocial || '-'}</p>
          <p><span className="font-medium">RUC/DNI:</span> {cliente.ruc || '-'}</p>
          <p><span className="font-medium">Dirección:</span> {cliente.direccion || '-'}</p>
          <p><span className="font-medium">Contacto:</span> {cliente.contacto || '-'}</p>
          <p><span className="font-medium">Email:</span> {cliente.email || '-'}</p>
          <p><span className="font-medium">Teléfono:</span> {cliente.telefono || '-'}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-semibold text-[#5D9848]">Información del Documento</h3>
        <div className="space-y-0.5 text-gray-700">
          <p><span className="font-medium">Fecha de Emisión:</span> {fechaEmision ? formatDate(fechaEmision) : 'Pendiente'}</p>
        </div>
      </div>
    </div>
  )
}

// Componente para tabla de muestras
function TablaMuestras({ 
  muestras 
}: { 
  muestras: DocumentoLabUI['muestras']
}) {
  if (!muestras || muestras.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        No hay muestras registradas
      </div>
    )
  }

  const getMatrizLabel = (value: string) => {
    const matriz = MATRICES_MUESTRA.find(m => m.value === value)
    return matriz?.label || value
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#5D9848] text-white">
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Código</th>
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Matriz</th>
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Lugar de Muestreo</th>
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Centro Registro</th>
            <th className="border border-gray-300 px-2 py-1.5 text-center font-semibold">F. Toma</th>
            <th className="border border-gray-300 px-2 py-1.5 text-center font-semibold">F. Recepción</th>
            <th className="border border-gray-300 px-2 py-1.5 text-center font-semibold">Estado</th>
          </tr>
        </thead>
        <tbody>
          {muestras.map((muestra, index) => (
            <tr key={muestra.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-2 py-1.5 font-medium">{muestra.codigo}</td>
              <td className="border border-gray-300 px-2 py-1.5">{getMatrizLabel(muestra.matriz)}</td>
              <td className="border border-gray-300 px-2 py-1.5">{muestra.lugarMuestreo || '-'}</td>
              <td className="border border-gray-300 px-2 py-1.5">{muestra.centroRegistro || '-'}</td>
              <td className="border border-gray-300 px-2 py-1.5 text-center">
                {muestra.fechaToma ? formatDate(muestra.fechaToma) : '-'}
              </td>
              <td className="border border-gray-300 px-2 py-1.5 text-center">
                {muestra.fechaRecepcion ? formatDate(muestra.fechaRecepcion) : '-'}
              </td>
              <td className="border border-gray-300 px-2 py-1.5 text-center">
                {muestra.rechazada ? (
                  <span className="text-red-600 font-medium">Rechazada</span>
                ) : (
                  <span className="text-green-600 font-medium">Aceptada</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Componente para tabla de resultados
function TablaResultados({ 
  resultados,
  muestras
}: { 
  resultados: DocumentoLabUI['resultados']
  muestras: DocumentoLabUI['muestras']
}) {
  if (!resultados || resultados.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        No hay resultados registrados
      </div>
    )
  }

  const getMuestraCodigo = (muestraId?: string) => {
    if (!muestraId) return '-'
    const muestra = muestras.find(m => m.id === muestraId)
    return muestra?.codigo || '-'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[#5D9848] text-white">
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Muestra</th>
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Parámetro</th>
            <th className="border border-gray-300 px-2 py-1.5 text-center font-semibold">Resultado</th>
            <th className="border border-gray-300 px-2 py-1.5 text-center font-semibold">Unidad</th>
            <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Método</th>
            <th className="border border-gray-300 px-2 py-1.5 text-center font-semibold">Ref.</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((resultado, index) => (
            <tr key={resultado.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-2 py-1.5 font-medium">
                {getMuestraCodigo(resultado.muestraId)}
              </td>
              <td className="border border-gray-300 px-2 py-1.5">{resultado.parametro}</td>
              <td className="border border-gray-300 px-2 py-1.5 text-center font-semibold">
                {resultado.resultado}
              </td>
              <td className="border border-gray-300 px-2 py-1.5 text-center">{resultado.unidad}</td>
              <td className="border border-gray-300 px-2 py-1.5">{resultado.metodo}</td>
              <td className="border border-gray-300 px-2 py-1.5 text-center text-gray-600">
                {resultado.rangoReferencial || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Componente para tabla de agentes identificados
function TablaAgentes({ 
  agentes,
  muestras
}: { 
  agentes: DocumentoLabUI['agentes']
  muestras: DocumentoLabUI['muestras']
}) {
  if (!agentes || agentes.length === 0) {
    return null
  }

  const getMuestraCodigo = (muestraId?: string) => {
    if (!muestraId) return '-'
    const muestra = muestras.find(m => m.id === muestraId)
    return muestra?.codigo || '-'
  }

  const getTipoLabel = (value: string) => {
    const tipo = TIPOS_AGENTE.find(t => t.value === value)
    return tipo?.label || value
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-[#5D9848] mb-2">Agentes Identificados</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-[#5D9848] text-white">
              <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Muestra</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Tipo</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Nombre Científico</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Reino</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Familia</th>
              <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold">Código Aislado</th>
            </tr>
          </thead>
          <tbody>
            {agentes.map((agente, index) => (
              <tr key={agente.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-2 py-1.5 font-medium">
                  {getMuestraCodigo(agente.muestraId)}
                </td>
                <td className="border border-gray-300 px-2 py-1.5">{getTipoLabel(agente.tipo)}</td>
                <td className="border border-gray-300 px-2 py-1.5 italic">{agente.nombreCientifico}</td>
                <td className="border border-gray-300 px-2 py-1.5">{agente.reino || '-'}</td>
                <td className="border border-gray-300 px-2 py-1.5">{agente.familia || '-'}</td>
                <td className="border border-gray-300 px-2 py-1.5">{agente.codigoAislado || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Componente para declaración/observaciones
function DeclaracionDocumento({ areaNombre }: { areaNombre?: string }) {
  const areaKey = areaNombre?.toLowerCase().replace(/[áéíóú]/g, (match) => {
    const map: Record<string, string> = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' }
    return map[match] || match
  }).replace(/\s+/g, '_') || 'default'

  const declaracion = DECLARACIONES_AREA[areaKey] || DECLARACIONES_AREA.default

  return (
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs print:bg-gray-100">
      <h4 className="font-semibold text-gray-700 mb-1">Declaración:</h4>
      <p className="text-gray-600 text-justify leading-relaxed">{declaracion}</p>
    </div>
  )
}

// Componente para sección de firmas
function SeccionFirmas({ firmas }: { firmas: FirmaDocumentoUI[] }) {
  // Si no hay firmas asignadas, mostrar el formato por defecto
  if (!firmas || firmas.length === 0) {
    return (
      <div className="mt-8 pt-4 border-t border-gray-300">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="h-16 border-b border-gray-400 mb-2"></div>
            <p className="text-xs text-gray-600">Firma del Responsable</p>
            <p className="text-xs text-gray-500">Director Técnico</p>
          </div>
          <div className="text-center">
            <div className="h-16 border-b border-gray-400 mb-2"></div>
            <p className="text-xs text-gray-600">Sello del Laboratorio</p>
          </div>
        </div>
      </div>
    )
  }

  // Determinar el número de columnas según la cantidad de firmas
  const gridCols = firmas.length === 1 
    ? 'grid-cols-1' 
    : firmas.length === 2 
      ? 'grid-cols-2' 
      : firmas.length === 3 
        ? 'grid-cols-3' 
        : 'grid-cols-2'

  return (
    <div className="mt-8 pt-4 border-t border-gray-300">
      <div className={`grid ${gridCols} gap-6`}>
        {firmas.map(firma => (
          <div key={firma.id} className="text-center">
            {/* Imagen de la firma */}
            <div className="h-16 flex items-end justify-center mb-1">
              {firma.imagenUrl ? (
                <Image
                  src={firma.imagenUrl}
                  alt={`Firma de ${firma.nombre}`}
                  width={120}
                  height={60}
                  className="max-h-14 w-auto object-contain"
                />
              ) : (
                <div className="w-full border-b border-gray-400"></div>
              )}
            </div>
            {/* Línea debajo si no hay imagen */}
            {!firma.imagenUrl && (
              <div className="border-b border-gray-400 mb-2"></div>
            )}
            {/* Nombre y cargo */}
            <p className="text-xs font-medium text-gray-700">{firma.nombre}</p>
            {firma.cargo && (
              <p className="text-xs text-gray-500">{firma.cargo}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente para anexos (imágenes en páginas separadas) — APA 7ª edición
function AnexosImpresion({ anexos }: { anexos: DocumentoLabUI['anexos'] }) {
  if (!anexos || anexos.length === 0) {
    return null
  }

  const anexosConImagen = anexos.filter(a => a.url && (
    a.url.includes('.jpg') || 
    a.url.includes('.jpeg') || 
    a.url.includes('.png') || 
    a.url.includes('.gif') ||
    a.url.includes('.webp')
  ))

  if (anexosConImagen.length === 0) return null

  return (
    <>
      {anexosConImagen.map((anexo, index) => (
        <div key={anexo.id} className="page-break-before">
          <div className="mx-auto max-w-[210mm] bg-white print:p-0">
            <div className="p-4">
              {/* APA 7ª ed.: Número de imagen + título en negrita */}
              <p className="text-sm font-bold text-gray-800 mb-1">
                Imagen {index + 1}{anexo.titulo ? `: ${anexo.titulo}` : ''}
              </p>
              <div className="ficha-tecnica-print mb-3">
                <img 
                  src={anexo.url} 
                  alt={`Figura ${index + 1}`}
                  className="max-w-full h-auto"
                />
              </div>
              {/* APA 7ª ed.: "Nota. " en itálica + texto normal */}
              {anexo.nota && (
                <p className="text-xs text-gray-600 mt-2">
                  <span className="italic">Nota. </span>
                  {anexo.nota}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

// Página principal de impresión
export default function ImprimirDocumentoLab() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [documento, setDocumento] = useState<DocumentoLabUI | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generandoPDF, setGenerandoPDF] = useState(false)
  const documentoRef = useRef<HTMLDivElement>(null)
  const anexosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      // Recuperar datos del documento del localStorage
      const documentoGuardado = localStorage.getItem('documentoLabActual')
      if (documentoGuardado) {
        const documentoData = JSON.parse(documentoGuardado)
        setDocumento(documentoData)
      } else {
        setError('No se encontró información del documento')
      }
    } catch (err) {
      console.error('Error al cargar documento:', err)
      setError('Error al cargar los datos del documento')
    } finally {
      setCargando(false)
    }
  }, [])

  const handleVolver = () => {
    router.back()
  }

  const handleDescargarPDF = async () => {
    if (!documento) return
    
    setGenerandoPDF(true)
    try {
      await generarPdfDocumentoLab(documento)
    } catch (err) {
      console.error('Error generando PDF:', err)
      alert('Error al generar el PDF. Intente nuevamente.')
    } finally {
      setGenerandoPDF(false)
    }
  }

  if (cargando) {
    return (
      <div className="container mx-auto flex h-[70vh] items-center justify-center py-8">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#5D9848] border-t-transparent mx-auto"></div>
          <p>Cargando información del documento...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">{error}</p>
          <Button className="mt-4" onClick={() => router.push('/admin/documentoLab')}>
            <Home className="h-4 w-4 mr-2" />
            Volver a Documentos
          </Button>
        </div>
      </div>
    )
  }

  if (!documento) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg font-medium">No se encontró información del documento</p>
          <Button className="mt-4" onClick={() => router.push('/admin/documentoLab')}>
            <Home className="h-4 w-4 mr-2" />
            Volver a Documentos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Controles - No se imprimen */}
      <ControlesImpresion
        onVolver={handleVolver}
        onDescargarPDF={handleDescargarPDF}
        tipoDocumento={documento.tipoDocumentoNombre}
        generandoPDF={generandoPDF}
      />

      {/* Espacio para los controles fijos */}
      <div className="h-16 print:hidden"></div>

      {/* Documento principal */}
      <div className="print-page" ref={documentoRef}>
        <div className="mx-auto max-w-[210mm] bg-white p-6 print:p-0 text-sm">
          {/* Encabezado */}
          <EncabezadoDocumento 
            codigo={documento.codigo}
            tipoDocumento={documento.tipoDocumentoNombre}
          />

          {/* Info del servicio/área */}
          {(documento.areaNombre || documento.servicioNombre) && (
            <div className="mb-4 text-xs text-gray-600 flex items-center gap-4">
              {documento.areaNombre && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                  Área: {documento.areaNombre}
                </span>
              )}
              {documento.servicioNombre && (
                <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">
                  Servicio: {documento.servicioNombre}
                </span>
              )}
            </div>
          )}

          {/* Información del cliente */}
          <InformacionCliente 
            cliente={documento.cliente}
            fechaEmision={documento.fechaEmision}
          />

          <div className="my-4 h-[1px] w-full bg-gray-300"></div>

          {/* Muestras */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#5D9848] mb-2">Muestras Analizadas</h3>
            <TablaMuestras muestras={documento.muestras} />
          </div>

          <div className="my-4 h-[1px] w-full bg-gray-300"></div>

          {/* Resultados */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#5D9848] mb-2">Resultados del Análisis</h3>
            <TablaResultados 
              resultados={documento.resultados} 
              muestras={documento.muestras}
            />
          </div>

          {/* Agentes identificados (si hay) */}
          <TablaAgentes 
            agentes={documento.agentes} 
            muestras={documento.muestras}
          />

          {/* Declaración */}
          <DeclaracionDocumento areaNombre={documento.areaNombre} />

          {/* Firmas del documento */}
          <SeccionFirmas firmas={documento.firmas || []} />

          {/* Pie de página */}
          <div className="mt-6 pt-3 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>{INFO_EMPRESA.nombre} - {INFO_EMPRESA.direccionCentral}</p>
            <p>{INFO_EMPRESA.ciudad}, {INFO_EMPRESA.departamento} - {INFO_EMPRESA.pais}</p>
            <p>{INFO_EMPRESA.web} | {INFO_EMPRESA.email}</p>
          </div>
        </div>
      </div>

      {/* Anexos en páginas separadas */}
      <div ref={anexosRef}>
        <AnexosImpresion anexos={documento.anexos} />
      </div>
    </>
  )
}
