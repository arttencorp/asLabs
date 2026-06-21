"use client"

import Link from "next/link"
import { ArrowLeft, Check, Users, Beaker, Award, Target, Phone, Mail, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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
  objectives?: string[]
  applications?: string[]
}

export default function LaboratoryDetailClient({ labData }: { labData: LabData }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-100 border-b sticky top-0 z-40">
          <div className="container mx-auto max-w-6xl px-4 py-3">
            <Link href="/research" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              <ArrowLeft size={18} />
              Volver a Laboratorios
            </Link>
          </div>
        </div>

        {/* Hero Header */}
        <div className={`${labData.bgColor} border-b py-16 px-4`}>
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-start gap-4 mb-6">
              <div className={`${labData.color} p-3 bg-white rounded-lg`}>
                <Beaker size={32} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{labData.name}</h1>
                <p className="text-gray-700 text-lg max-w-3xl leading-relaxed">{labData.description}</p>
              </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          {/* Introduction */}
          <div className="mb-16 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca del Laboratorio</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{labData.fullDescription}</p>
          </div>

          {/* Personal Section */}
          {(labData.director || labData.staff) && (
            <div className="mb-16 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-8 border-2 border-emerald-200 shadow-sm">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal a Cargo</h3>
                  {labData.director && (
                    <p className="text-gray-800 mb-3 text-lg">
                      <span className="font-bold text-emerald-700">Director:</span> {labData.director}
                    </p>
                  )}
                  {labData.staff && labData.staff.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-900">Equipo:</p>
                      {labData.staff.map((member, idx) => (
                        <p key={idx} className="text-gray-800 ml-4">• {member}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Capabilities */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Award className="text-emerald-600" size={28} />
                  Capacidades Principales
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {labData.capabilities.map((cap, idx) => (
                    <div key={idx} className="border-l-4 border-emerald-600 pl-4 py-3 hover:bg-emerald-50 transition-colors rounded-r-lg">
                      <h3 className="font-bold text-gray-900 mb-2">{cap.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{cap.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objectives */}
              {labData.objectives && labData.objectives.length > 0 && (
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="text-emerald-600" size={28} />
                    Objetivos
                  </h2>
                  <ul className="space-y-3">
                    {labData.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-emerald-600 font-bold mt-1">→</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Equipment */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipamiento</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {labData.equipment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-gray-700 p-3 bg-emerald-50 rounded-lg">
                      <Check size={20} className="text-emerald-600 flex-shrink-0 mt-0.5 font-bold" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              {labData.applications && labData.applications.length > 0 && (
                <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Aplicaciones</h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {labData.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Services Card */}
              <div className={`${labData.bgColor} rounded-lg p-6 shadow-sm border-2 border-current border-opacity-20 sticky top-24`}>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Servicios</h3>
                <ul className="space-y-3">
                  {labData.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-6 text-white shadow-md">
                <h3 className="font-bold text-lg mb-4">Contacto</h3>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone size={18} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <a href="https://wa.me/51961996645" className="hover:underline">+51 961 996 645</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={18} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:info@aslabs.pe" className="hover:underline">info@aslabs.pe</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Ubicación</p>
                      <p>Trujillo, Perú</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://wa.me/51961996645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-emerald-600 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all block text-center"
                >
                  Contactar Ahora
                </a>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Información Rápida</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span className="font-semibold">Estado:</span>
                    <span className="text-emerald-600 font-bold">Activo</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold">Especializació n:</span>
                    <span>{labData.name}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
    </div>
  )
}
