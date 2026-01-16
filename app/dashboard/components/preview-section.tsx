"use client"

import { useState } from "react"
import type { Document } from "../types"
import Image from "next/image"
import ReferentialBarChart from "./referential-bar-chart"

interface PreviewSectionProps {
  document: Document
  onBack: () => void
}

export default function PreviewSection({ document, onBack }: PreviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const content = (
    <div className="bg-white p-12 max-w-4xl mx-auto">
      {/* Header con Logo */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-4 border-green-600">
        <div className="flex items-center gap-4">
          <Image src="/aslabs-logo.png" alt="AS Laboratorios Logo" width={80} height={80} className="h-16 w-auto" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">AS LABORATORIOS</h1>
            <p className="text-xs text-gray-600 font-serif">
              {document.tipo === "certificado" ? "CERTIFICADO DE ANÁLISIS" : "INFORME DE ANÁLISIS"}
            </p>
          </div>
        </div>
        <div className="text-right text-xs font-serif text-gray-600">
          <p className="font-semibold">Código: {document.codigoDocumento}</p>
          <p>Fecha: {document.fechaEmision}</p>
        </div>
      </div>

      {/* Direcciones */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-xs font-serif text-gray-600 bg-green-50 p-3 rounded-lg">
        <div>
          <p className="font-semibold text-gray-900">Of. Central:</p>
          <p>Jr. Huancavelica 315, II Piso</p>
          <p>Urb. Palermo</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Lab. Biotecnología:</p>
          <p>Mz J1 II Piso</p>
          <p>Urb. San Isidro 2da Etapa</p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mb-6">
        <h2 className="text-sm font-serif font-bold text-gray-900 mb-3 p-2 bg-green-600 text-white rounded">
          INFORMACIÓN DEL CLIENTE
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs font-serif text-gray-700 border-2 border-green-200 p-3 rounded">
          <div>
            <p className="font-semibold text-gray-900">Razón Social:</p>
            <p>{document.cliente.razonSocial}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">RUC/DNI:</p>
            <p>{document.cliente.ruc}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Contacto:</p>
            <p>{document.cliente.contacto}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Teléfono:</p>
            <p>{document.cliente.telefono}</p>
          </div>
        </div>
      </div>

      {/* Service Info */}
      <div className="mb-6 p-3 bg-green-50 rounded-lg border-2 border-green-300">
        <h2 className="text-sm font-serif font-bold text-gray-900 mb-2 bg-green-600 text-white p-2 rounded -m-3 mb-3">
          ANÁLISIS REALIZADO
        </h2>
        <div className="text-xs font-serif text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Servicio:</span> {document.servicio.servicio}
          </p>
          <p>
            <span className="font-semibold">Alcance:</span> {document.servicio.alcance}
          </p>
        </div>
      </div>

      {/* Samples */}
      <div className="mb-6">
        <h2 className="text-sm font-serif font-bold text-gray-900 mb-3 p-2 bg-green-600 text-white rounded">
          MUESTRAS ANALIZADAS
        </h2>
        <div className="space-y-2">
          {document.muestras.map((muestra, idx) => (
            <div key={idx} className="border-2 border-green-200 rounded p-3 text-xs font-serif bg-green-50">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="font-semibold text-gray-900">Código Muestra:</p>
                  <p>{muestra.codigoMuestra}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Tipo Matriz:</p>
                  <p>{muestra.tipoMatriz}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lugar Registro:</p>
                  <p>{muestra.lugarRegistro}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <p className="font-semibold text-gray-900">Centro Registro:</p>
                  <p>{muestra.centroRegistro}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fecha Recepción:</p>
                  <p>{muestra.fechaRecepcion}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fecha Análisis:</p>
                  <p>{muestra.fechaAnalisis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Table con gráficos */}
      {document.resultados.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-serif font-bold text-gray-900 mb-3 p-2 bg-green-600 text-white rounded">
            RESULTADOS
          </h2>
          <div className="space-y-3">
            {document.resultados.map((result, idx) => (
              <div key={idx} className="border-2 border-green-200 rounded p-3 bg-green-50 text-xs font-serif">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">Parámetro:</p>
                    <p>{result.parametro}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Resultado:</p>
                    <p className="text-lg font-bold text-green-700">{result.resultado}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Unidad:</p>
                    <p>{result.unidad}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Método:</p>
                    <p>{result.metodo}</p>
                  </div>
                </div>

                {result.valorReferencial?.showChart &&
                  result.valorReferencial?.min &&
                  result.valorReferencial?.max &&
                  result.resultado && (
                    <div className="mt-3 p-2 bg-white border border-green-300 rounded">
                      <ReferentialBarChart
                        resultado={Number.parseFloat(result.resultado)}
                        min={result.valorReferencial.min}
                        max={result.valorReferencial.max}
                        unidad={result.unidad}
                      />
                    </div>
                  )}

                {result.observacion && (
                  <div className="mt-2 text-gray-700">
                    <p className="font-semibold text-gray-900">Observación:</p>
                    <p>{result.observacion}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signatures */}
      <div className="mb-8 pt-6 border-t-4 border-green-600">
        <h2 className="text-sm font-serif font-bold text-gray-900 mb-4 p-2 bg-green-600 text-white rounded">
          FIRMAS AUTORIZADAS
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {document.firmas.length > 0 ? (
            document.firmas.map((firma) => (
              <div key={firma.id} className="text-center">
                <div className="h-20 border-t-2 border-gray-400 mb-1"></div>
                <p className="text-xs font-serif font-semibold text-gray-900">{firma.nombre}</p>
                <p className="text-xs font-serif text-gray-600">{firma.cargo}</p>
                <p className="text-xs font-serif text-gray-600">{firma.fecha}</p>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center">
              <div className="h-20 border-t-2 border-gray-400 mb-1"></div>
              <p className="text-xs font-serif text-gray-600">Firma Autorizada</p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mt-8">
        <p className="text-xs font-serif text-gray-700">
          <span className="font-semibold">ACLARACIÓN IMPORTANTE:</span> Los resultados presentados en este documento no
          incluyen factores de corrección. Todos los datos, evidencia y resultados se almacenarán en la base de datos de
          AS Laboratorios de forma indefinida para propósitos de trazabilidad, control de calidad y monitoreo según
          normativas nacionales e internacionales.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center text-xs font-serif text-gray-600">
        <p>AS Laboratorios - Trujillo, La Libertad, Perú</p>
        <p>Teléfono: +51 961 996 645 | Email: ventas@aslaboratorios.com</p>
        <p className="mt-2 text-gray-500">Documento generado por sistema ASLAB</p>
      </div>
    </div>
  )

  if (!isModalOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-h-screen overflow-y-auto max-w-4xl w-full">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b-2 border-green-600 p-4 flex justify-between items-center">
          <h2 className="text-lg font-serif font-bold text-gray-900">Vista Previa del Documento</h2>
          <button
            onClick={() => {
              setIsModalOpen(false)
              onBack()
            }}
            className="text-gray-600 hover:text-gray-900 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4">{content}</div>

        {/* Modal Actions */}
        <div className="sticky bottom-0 bg-white border-t-2 border-green-600 p-4 flex gap-4 justify-center">
          <button
            onClick={() => {
              setIsModalOpen(false)
              onBack()
            }}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-serif text-sm"
          >
            Editar Documento
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-serif text-sm"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  )
}
