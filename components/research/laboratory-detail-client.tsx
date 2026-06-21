"use client"

import Link from "next/link"
import { ArrowLeft, Check, Users, Beaker } from "lucide-react"

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
  director?: string
  staff?: string[]
}

export default function LaboratoryDetailClient({ labData }: { labData: LabData }) {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <Link href="/research" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
            <ArrowLeft size={18} />
            Volver a Laboratorios
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className={`${labData.bgColor} border-b py-12 px-4`}>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{labData.name}</h1>
          <p className="text-gray-700 text-lg max-w-3xl">{labData.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">{labData.fullDescription}</p>
        </div>

        {/* Personal Section */}
        {(labData.director || labData.staff) && (
          <div className="mb-12 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-6 border border-emerald-200">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Personal a Cargo</h3>
                {labData.director && (
                  <p className="text-gray-800 mb-2">
                    <span className="font-semibold">Director:</span> {labData.director}
                  </p>
                )}
                {labData.staff && labData.staff.length > 0 && (
                  <div className="space-y-1">
                    {labData.staff.map((member, idx) => (
                      <p key={idx} className="text-gray-800">{member}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Capabilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Beaker className="text-emerald-600" />
                Capacidades Principales
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {labData.capabilities.map((cap, idx) => (
                  <div key={idx} className="bg-white border-l-4 border-emerald-600 pl-4 pr-4 py-3 rounded-r-lg hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{cap.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipamiento</h2>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
                <ul className="grid md:grid-cols-2 gap-4">
                  {labData.equipment.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <Check size={20} className="text-emerald-600 flex-shrink-0 mt-0.5 font-bold" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Services Card */}
            <div className={`${labData.bgColor} rounded-lg p-6 border-2 border-current border-opacity-20 sticky top-4`}>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Servicios Principales</h3>
              <ul className="space-y-3">
                {labData.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6 border-2 border-emerald-300">
              <p className="text-sm text-gray-700 mb-4 font-medium">
                ¿Tienes una consulta?
              </p>
              <a
                href="https://wa.me/51961996645"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all hover:shadow-lg text-center text-sm block"
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
