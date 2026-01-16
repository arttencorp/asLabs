"use client"

import type { Document } from "../types"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface PreviewSectionProps {
  document: Document
  onBack: () => void
}

export default function PreviewSection({ document, onBack }: PreviewSectionProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-900 font-serif">
            ← Volver a edición
          </button>

          {/* Document Preview */}
          <div className="border-2 border-gray-300 p-8 bg-white">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
              <h1 className="text-3xl font-serif font-bold text-gray-900">AS LABORATORIOS</h1>
              <p className="text-gray-600 font-serif mt-2">
                {document.tipo === "certificado" ? "CERTIFICADO DE ANÁLISIS" : "INFORME DE ANÁLISIS"}
              </p>
              <p className="text-sm text-gray-600 font-serif mt-1">Código: {document.codigoDocumento}</p>
            </div>

            {/* Client Info */}
            <div className="mb-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Información del Cliente</h2>
              <div className="grid grid-cols-2 gap-4 text-sm font-serif text-gray-700">
                <div>
                  <p className="font-semibold">Razón Social:</p>
                  <p>{document.cliente.razonSocial}</p>
                </div>
                <div>
                  <p className="font-semibold">RUC/DNI:</p>
                  <p>{document.cliente.ruc}</p>
                </div>
                <div>
                  <p className="font-semibold">Contacto:</p>
                  <p>{document.cliente.contacto}</p>
                </div>
                <div>
                  <p className="font-semibold">Teléfono:</p>
                  <p>{document.cliente.telefono}</p>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="mb-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Análisis Realizado</h2>
              <div className="text-sm font-serif text-gray-700 space-y-2">
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
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Muestras</h2>
              <div className="space-y-3">
                {document.muestras.map((muestra, idx) => (
                  <div key={idx} className="border border-gray-300 rounded p-3 text-sm font-serif">
                    <p>
                      <span className="font-semibold">Código:</span> {muestra.codigoMuestra}
                    </p>
                    <p>
                      <span className="font-semibold">Tipo:</span> {muestra.tipoMatriz}
                    </p>
                    <p>
                      <span className="font-semibold">Fecha:</span> {muestra.fechaToma}
                    </p>
                    <p>
                      <span className="font-semibold">Lugar:</span> {muestra.lugarMuestreo}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            {document.resultados.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Resultados</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse font-serif">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left">Parámetro</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Resultado</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Unidad</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Método</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.resultados.map((result, idx) => (
                        <tr key={idx} className="border-b border-gray-300">
                          <td className="border border-gray-300 px-3 py-2">{result.parametro}</td>
                          <td className="border border-gray-300 px-3 py-2">{result.resultado}</td>
                          <td className="border border-gray-300 px-3 py-2">{result.unidad}</td>
                          <td className="border border-gray-300 px-3 py-2">{result.metodo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center text-sm font-serif text-gray-600">
              <p>Fecha de emisión: {document.fechaEmision}</p>
              <p className="mt-2">AS Laboratorios - Av. Juan Pablo II 306, Trujillo, La Libertad, Perú</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-serif"
            >
              Editar Documento
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-serif"
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
