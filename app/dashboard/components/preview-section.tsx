"use client"

import type { Document } from "../types"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

interface PreviewSectionProps {
  document: Document
  onBack: () => void
}

export default function PreviewSection({ document, onBack }: PreviewSectionProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 font-serif text-sm">
            ← Volver a edición
          </button>

          {/* Document Preview */}
          <div className="bg-white p-8 shadow-lg">
            {/* Header con Logo */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-300">
              <div className="flex items-center gap-4">
                <Image
                  src="/aslabs-logo.png"
                  alt="AS Laboratorios Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
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

            {/* Client Info */}
            <div className="mb-6">
              <h2 className="text-sm font-serif font-bold text-gray-900 mb-2">INFORMACIÓN DEL CLIENTE</h2>
              <div className="grid grid-cols-2 gap-3 text-xs font-serif text-gray-700">
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
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <h2 className="text-sm font-serif font-bold text-gray-900 mb-2">ANÁLISIS REALIZADO</h2>
              <div className="text-xs font-serif text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Servicio:</span> {document.servicio.servicio}
                </p>
                <p>
                  <span className="font-semibold">Alcance:</span> {document.servicio.alcance}
                </p>
                <p>
                  <span className="font-semibold">Costo:</span> S/ {document.servicio.costo.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Samples */}
            <div className="mb-6">
              <h2 className="text-sm font-serif font-bold text-gray-900 mb-3">MUESTRAS ANALIZADAS</h2>
              <div className="space-y-2">
                {document.muestras.map((muestra, idx) => (
                  <div key={idx} className="border border-gray-300 rounded p-3 text-xs font-serif">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">Código:</p>
                        <p>{muestra.codigoMuestra}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Tipo Matriz:</p>
                        <p>{muestra.tipoMatriz}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Fecha Toma:</p>
                        <p>{muestra.fechaToma}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Fecha Análisis:</p>
                        <p>{muestra.fechaAnalisis}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">Lugar Muestreo:</p>
                        <p>{muestra.lugarMuestreo}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Centro Registro:</p>
                        <p>{muestra.centroRegistro}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Lugar Registro:</p>
                        <p>{muestra.lugarRegistro}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Table */}
            {document.resultados.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-serif font-bold text-gray-900 mb-3">RESULTADOS</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse font-serif">
                    <thead>
                      <tr className="bg-gray-200 border border-gray-300">
                        <th className="px-2 py-1 text-left font-semibold text-gray-900">Parámetro</th>
                        <th className="px-2 py-1 text-left font-semibold text-gray-900">Resultado</th>
                        <th className="px-2 py-1 text-left font-semibold text-gray-900">Unidad</th>
                        <th className="px-2 py-1 text-left font-semibold text-gray-900">Método</th>
                        <th className="px-2 py-1 text-left font-semibold text-gray-900">Observación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.resultados.map((result, idx) => (
                        <tr key={idx} className="border border-gray-300 hover:bg-gray-50">
                          <td className="px-2 py-1">{result.parametro}</td>
                          <td className="px-2 py-1">{result.resultado}</td>
                          <td className="px-2 py-1">{result.unidad}</td>
                          <td className="px-2 py-1">{result.metodo}</td>
                          <td className="px-2 py-1">{result.observacion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Conclusions */}
            {document.conclusiones && (
              <div className="mb-6">
                <h2 className="text-sm font-serif font-bold text-gray-900 mb-2">CONCLUSIONES</h2>
                <p className="text-xs font-serif text-gray-700 bg-gray-50 p-3 rounded-lg">{document.conclusiones}</p>
              </div>
            )}

            {/* Signatures */}
            <div className="mb-8 pt-6 border-t-2 border-gray-300">
              <h2 className="text-sm font-serif font-bold text-gray-900 mb-4">FIRMAS AUTORIZADAS</h2>
              <div className="grid grid-cols-3 gap-6">
                {document.firmas.length > 0 ? (
                  document.firmas.map((firma, idx) => (
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
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mt-8">
              <p className="text-xs font-serif text-gray-700">
                <span className="font-semibold">ACLARACIÓN IMPORTANTE:</span> Los resultados presentados en este
                documento no incluyen factores de corrección. Todos los datos, evidencia y resultados se almacenarán en
                la base de datos de AS Laboratorios de forma indefinida para propósitos de trazabilidad, control de
                calidad y monitoreo según normativas nacionales e internacionales.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center text-xs font-serif text-gray-600">
              <p>AS Laboratorios - Av. Juan Pablo II 306, Trujillo, La Libertad, Perú</p>
              <p>Teléfono: +51 961 996 645 | Email: ventas@aslaboratorios.com</p>
              <p className="mt-2 text-gray-500">Documento generado por sistema ASLAB</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={onBack}
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
      </main>
      <Footer />
    </>
  )
}
