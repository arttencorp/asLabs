"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Beaker, Globe, ArrowRight, CheckCircle, Shield, Zap } from "lucide-react"

export default function CepasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f6f1]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">Catálogo de Cepas</h1>
            <p className="text-xl text-emerald-50 font-light max-w-2xl mx-auto">
              Accede a cepas bacterianas certificadas de máxima calidad para investigación, agricultura e industria
            </p>
          </div>
        </section>

        {/* Two Options Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cepas Identificadas */}
              <Link href="/cepas/identificadas">
                <div className="h-full bg-white rounded-2xl border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <Beaker className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-black">Cepas Identificadas</h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-gray-700 mb-6 font-light leading-relaxed">
                      Cepas bacterianas cultivadas, identificadas y caracterizadas en AS Laboratorios bajo normas ISO. Cultivo a pedido con máxima viabilidad y opciones de presentación personalizadas.
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">11 especies identificadas localmente</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Cultivo bajo demanda</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Cumplimiento ISO 17025 y 9001</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Opciones personalizadas disponibles</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black py-3 rounded-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                      Ver Catálogo
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>

              {/* Cepas ATCC */}
              <Link href="/cepas/atcc">
                <div className="h-full bg-white rounded-2xl border-2 border-blue-300 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <Globe className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-black">Cepas ATCC</h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-gray-700 mb-6 font-light leading-relaxed">
                      Cepas referencia internacionales certificadas por ATCC (American Type Culture Collection). Garantía de identidad, viabilidad y documentación completa con trazabilidad global.
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Certificadas internacionalmente ATCC</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Garantía de identidad y viabilidad</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Importación directa desde USA</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Documentación ATCC incluida</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black py-3 rounded-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                      Ver Catálogo
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-4 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl font-black mb-8 text-center">¿Cuál es la diferencia?</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-black text-emerald-600 mb-3">Cepas Identificadas</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-light">
                  <li>• Cultivadas localmente en AS Labs</li>
                  <li>• Identificadas y caracterizadas</li>
                  <li>• Cultivo bajo demanda (máxima frescura)</li>
                  <li>• Ideales para investigadores y académicos</li>
                  <li>• Máxima disponibilidad</li>
                  <li>• Precios competitivos</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-black text-blue-600 mb-3">Cepas ATCC</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-light">
                  <li>• Referencia internacional certificada</li>
                  <li>• Garantía de identidad absoluta</li>
                  <li>• Trazabilidad global incluida</li>
                  <li>• Ideales para validación de métodos</li>
                  <li>• Stock limitado (bajo disponibilidad)</li>
                  <li>• Mayor costo por certificación</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
