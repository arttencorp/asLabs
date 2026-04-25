"use client"

import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

interface LabData {
  id: string
  name: string
  color: string
  bgColor: string
  description: string
  fullDescription: string
  capabilities: Array<{
    title: string
    description: string
  }>
  equipment: string[]
  services: string[]
}

export default function LaboratoryDetailClient({ labData }: { labData: LabData }) {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <Link href="/research" className="flex items-center gap-2 text-green-600 hover:text-green-700">
            <ArrowLeft size={18} />
            Volver a Investigación
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className={`${labData.bgColor} border-b py-12 px-4`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <div className={`${labData.color} text-3xl`}>
              {/* Icon would go here */}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{labData.name}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">{labData.fullDescription}</p>
          <p className="text-gray-600">{labData.description}</p>
        </div>

        {/* Image Placeholder */}
        <div className={`${labData.bgColor} rounded-lg h-80 flex items-center justify-center mb-12 border`}>
          <p className="text-gray-400">Galería de imágenes (por agregar)</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Capabilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Capacidades Principales</h2>
              <div className="space-y-6">
                {labData.capabilities.map((cap, idx) => (
                  <div key={idx} className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-bold text-gray-900 mb-2">{cap.title}</h3>
                    <p className="text-gray-600 text-sm">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipamiento</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {labData.equipment.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Services Card */}
            <div className={`${labData.bgColor} rounded-lg p-6 border`}>
              <h3 className="font-bold text-gray-900 mb-4">Servicios</h3>
              <ul className="space-y-3">
                {labData.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className={`${labData.color} font-bold`}>•</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <p className="text-sm text-gray-700 mb-4">
                ¿Tienes una consulta sobre este laboratorio?
              </p>
              <a
                href="https://wa.me/51961996645"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors text-center text-sm block"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
