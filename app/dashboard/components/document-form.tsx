"use client"
import { useState } from "react"
import type { DocumentType, Service, Document, Client, Sample, ResultRow } from "../types"
import { useDocumentStore } from "../hooks/useDocumentStore"
import ClientSection from "./client-section"
import SampleSection from "./sample-section"
import ResultsSection from "./results-section"
import PreviewSection from "./preview-section"
import ActionButtons from "./action-buttons"

interface DocumentFormProps {
  documentType: DocumentType
  service: Service
  onClose: () => void
}

export default function DocumentForm({ documentType, service, onClose }: DocumentFormProps) {
  const { generateDocumentCode, saveDocument } = useDocumentStore()

  const [cliente, setCliente] = useState<Client>({
    razonSocial: "",
    ruc: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    proyecto: "",
  })

  const [muestras, setMuestras] = useState<Sample[]>([
    {
      codigoMuestra: `MUESTRA-${Date.now()}`,
      tipoMatriz: "suelo",
      fechaToma: new Date().toISOString().split("T")[0],
      lugarMuestreo: "",
      observaciones: "",
    },
  ])

  const [resultados, setResultados] = useState<ResultRow[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const handleSave = () => {
    const newDocument: Document = {
      id: Date.now().toString(),
      tipo: documentType,
      area: service.area,
      servicio: service,
      cliente,
      muestras,
      evidencias: [],
      resultados,
      responsable: "",
      fechaEmision: new Date().toISOString().split("T")[0],
      codigoDocumento: generateDocumentCode(),
      createdAt: new Date(),
    }
    saveDocument(newDocument)
    alert("Documento guardado exitosamente")
  }

  if (showPreview) {
    return (
      <PreviewSection
        document={{
          id: Date.now().toString(),
          tipo: documentType,
          area: service.area,
          servicio: service,
          cliente,
          muestras,
          evidencias: [],
          resultados,
          responsable: "",
          fechaEmision: new Date().toISOString().split("T")[0],
          codigoDocumento: generateDocumentCode(),
          createdAt: new Date(),
        }}
        onBack={() => setShowPreview(false)}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={onClose} className="mb-6 text-gray-600 hover:text-gray-900 font-serif">
        ← Volver
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">
          Crear {documentType === "certificado" ? "Certificado" : "Informe"}
        </h1>

        <div className="space-y-8">
          <ClientSection client={cliente} onChange={setCliente} />
          <SampleSection samples={muestras} onChange={setMuestras} />
          <ResultsSection results={resultados} onChange={setResultados} documentType={documentType} />
        </div>

        <ActionButtons onSave={handleSave} onPreview={() => setShowPreview(true)} onNew={onClose} />
      </div>
    </div>
  )
}
