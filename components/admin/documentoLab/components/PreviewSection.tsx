'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Printer, 
  Send, 
  ArrowLeft, 
  FileText,
  Beaker,
  User,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import Image from 'next/image'
import type { PreviewSectionProps } from '../types'
import { INFO_EMPRESA, TIPOS_AGENTE, MATRICES_MUESTRA, DECLARACIONES_AREA } from '../constants'
import { formatDate } from '@/utils'

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
      <div className="h-1.5 w-full bg-[#5D9848]"></div>
      
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
  cliente: PreviewSectionProps['documento']['cliente']
  fechaEmision?: string
}) {
  return (
    <div className="grid grid-cols-2 gap-6 text-sm">
      <div className="space-y-1">
        <h3 className="font-semibold text-[#5D9848] flex items-center gap-2">
          <User className="h-4 w-4" />
          Datos del Cliente
        </h3>
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
        <h3 className="font-semibold text-[#5D9848] flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Información del Documento
        </h3>
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
  muestras: PreviewSectionProps['documento']['muestras'] 
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
  resultados: PreviewSectionProps['documento']['resultados']
  muestras: PreviewSectionProps['documento']['muestras']
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
  agentes: PreviewSectionProps['documento']['agentes']
  muestras: PreviewSectionProps['documento']['muestras']
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
      <h3 className="font-semibold text-[#5D9848] mb-2 flex items-center gap-2">
        <Beaker className="h-4 w-4" />
        Agentes Identificados
      </h3>
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
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
      <h4 className="font-semibold text-gray-700 mb-1">Declaración:</h4>
      <p className="text-gray-600 text-justify leading-relaxed">{declaracion}</p>
    </div>
  )
}

// Componente para pie de firma
function PieFirma() {
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

// Componente para lista de anexos
function ListaAnexos({ anexos }: { anexos: PreviewSectionProps['documento']['anexos'] }) {
  if (!anexos || anexos.length === 0) {
    return null
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-[#5D9848] mb-2 flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Anexos ({anexos.length})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {anexos.map((anexo, index) => (
          <div 
            key={anexo.id} 
            className="border border-gray-200 rounded p-2 text-xs bg-gray-50"
          >
            <p className="font-medium">Anexo {index + 1}</p>
            <p className="text-gray-500 capitalize">{anexo.tipo.replace('_', ' ')}</p>
            {anexo.nota && <p className="text-gray-400 truncate">{anexo.nota}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente principal de Preview
export function PreviewSection({ 
  documento, 
  onEmitir, 
  onImprimir, 
  onVolver 
}: PreviewSectionProps) {
  const router = useRouter()
  
  const esValido = documento.cliente.razonSocial && 
                   documento.muestras.length > 0 && 
                   documento.resultados.length > 0

  const esEmitido = documento.estadoNombre?.toLowerCase().includes('emitido')

  // Función para abrir la vista de impresión en nueva pestaña
  const handleAbrirVistaImpresion = () => {
    // Guardar documento en localStorage para la página de impresión
    localStorage.setItem('documentoLabActual', JSON.stringify(documento))
    // Abrir en nueva pestaña
    window.open('/imprimir/documento-lab', '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Controles de acción - No se imprimen */}
      <Card className="print:hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onVolver}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              
              <div className="flex items-center gap-2">
                {esValido ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Documento válido
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Datos incompletos
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleAbrirVistaImpresion}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Vista de Impresión
              </Button>
              
              {!esEmitido && (
                <Button 
                  onClick={onEmitir} 
                  disabled={!esValido}
                  className="bg-[#5D9848] hover:bg-[#4a7a39]"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Emitir Documento
                </Button>
              )}
            </div>
          </div>
          
          {!esValido && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
              <p className="font-medium text-yellow-800">
                Para emitir el documento, asegúrese de completar:
              </p>
              <ul className="list-disc list-inside text-yellow-700 mt-1 space-y-0.5">
                {!documento.cliente.razonSocial && <li>Datos del cliente</li>}
                {documento.muestras.length === 0 && <li>Al menos una muestra</li>}
                {documento.resultados.length === 0 && <li>Al menos un resultado</li>}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview del documento - Estilo similar a impresión */}
      <div className="print-page">
        <div className="mx-auto max-w-[210mm] bg-white p-6 shadow-lg border border-gray-200 rounded-lg print:shadow-none print:border-none print:p-0 text-sm">
          {/* Encabezado */}
          <EncabezadoDocumento 
            codigo={documento.codigo}
            tipoDocumento={documento.tipoDocumentoNombre}
          />

          {/* Información del servicio/área */}
          <div className="mb-4 flex items-center gap-4 text-xs text-gray-600">
            {documento.areaNombre && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                Área: {documento.areaNombre}
              </Badge>
            )}
            {documento.servicioNombre && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                Servicio: {documento.servicioNombre}
              </Badge>
            )}
          </div>

          {/* Información del cliente */}
          <InformacionCliente 
            cliente={documento.cliente}
            fechaEmision={documento.fechaEmision}
          />

          <Separator className="my-4" />

          {/* Muestras */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#5D9848] mb-2 flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Muestras Analizadas
            </h3>
            <TablaMuestras muestras={documento.muestras} />
          </div>

          <Separator className="my-4" />

          {/* Resultados */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#5D9848] mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resultados del Análisis
            </h3>
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

          {/* Anexos (si hay) */}
          <ListaAnexos anexos={documento.anexos} />

          {/* Declaración */}
          <DeclaracionDocumento areaNombre={documento.areaNombre} />

          {/* Pie de firma */}
          <PieFirma />

          {/* Pie de página */}
          <div className="mt-6 pt-3 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>{INFO_EMPRESA.nombre} - {INFO_EMPRESA.direccionCentral}</p>
            <p>{INFO_EMPRESA.ciudad}, {INFO_EMPRESA.departamento} - {INFO_EMPRESA.pais}</p>
            <p>{INFO_EMPRESA.web} | {INFO_EMPRESA.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
