"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import DocumentSelector from "./components/document-selector"
import AreaSelector from "./components/area-selector"
import ServiceCard from "./components/service-card"
import DocumentForm from "./components/document-form"
import { serviceCatalog } from "./data/catalog"
import type { DocumentType, ServiceArea, Service } from "./types"

export default function DashboardPage() {
  const [documentType, setDocumentType] = useState<DocumentType | null>(null)
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const services = selectedArea ? serviceCatalog.filter((s) => s.area === selectedArea) : []

  const handleStartDocument = () => {
    setIsFormOpen(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {!isFormOpen ? (
          <>
            {/* Hero Section */}
            <section className="py-8 lg:py-12 bg-white border-b">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">Emisión de Documentos</h1>
                <p className="text-gray-600 font-serif">Genera certificados e informes de análisis profesionales</p>
              </div>
            </section>

            {/* Selection Section */}
            <section className="py-12">
              <div className="container mx-auto px-4 space-y-8">
                {/* Document Type */}
                <div>
                  <h2 className="text-lg font-serif font-semibold mb-4 text-gray-900">Tipo de Documento</h2>
                  <DocumentSelector selected={documentType} onChange={setDocumentType} />
                </div>

                {/* Area Selection */}
                {documentType && (
                  <div>
                    <h2 className="text-lg font-serif font-semibold mb-4 text-gray-900">Área / Tipo de Informe</h2>
                    <AreaSelector
                      selected={selectedArea}
                      onChange={(area) => {
                        setSelectedArea(area)
                        setSelectedService(null)
                      }}
                    />
                  </div>
                )}

                {/* Service Selection */}
                {selectedArea && (
                  <div>
                    <h2 className="text-lg font-serif font-semibold mb-4 text-gray-900">Servicio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.servicio}
                          onClick={() => setSelectedService(service)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedService?.servicio === service.servicio
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <p className="font-medium text-gray-900 font-serif">{service.servicio}</p>
                          <p className="text-sm text-gray-600 mt-1">{service.alcance}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Detail Card */}
                {selectedService && (
                  <ServiceCard service={selectedService} documentType={documentType!} onStart={handleStartDocument} />
                )}
              </div>
            </section>
          </>
        ) : (
          <DocumentForm
            documentType={documentType!}
            service={selectedService!}
            onClose={() => {
              setIsFormOpen(false)
              setDocumentType(null)
              setSelectedArea(null)
              setSelectedService(null)
            }}
          />
        )}
      </main>
      <Footer />
    </>
  )
}
