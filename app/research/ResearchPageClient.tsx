"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Award, Microscope, Dna, Leaf, Shield, CheckCircle, Clock, Beaker, Zap } from "lucide-react"
import CategorySection from "@/components/research/category-section"
import LaboratoriesSection from "@/components/research/laboratories-section"
import {
  pipelineData,
  ingenieriaGenetica,
  controlBiologico,
  secuenciamiento,
  investigacionesTerminadas,
} from "@/data/pipeline-data"

export default function ResearchPageClient() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate statistics
  const totalProjects = pipelineData.reduce((total, category) => {
    return (
      total +
      category.subsections.reduce((subTotal, subsection) => {
        return subTotal + subsection.projects.length
      }, 0)
    )
  }, 0)

  const activeProjects = pipelineData.reduce((total, category) => {
    if (category.title === "Investigaciones Terminadas") return total
    return (
      total +
      category.subsections.reduce((subTotal, subsection) => {
        return subTotal + subsection.projects.length
      }, 0)
    )
  }, 0)

  const completedProjects = investigacionesTerminadas.reduce((total, subsection) => {
    return total + subsection.projects.length
  }, 0)

  const totalPlantsProduced = investigacionesTerminadas.reduce((total, subsection) => {
    return (
      total +
      subsection.projects.reduce((subTotal, project) => {
        if (project.plantsProduced) {
          const number = Number.parseInt(project.plantsProduced.replace(/[^0-9]/g, ""))
          return subTotal + number
        }
        return subTotal
      }, 0)
    )
  }, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Compact with Lab Image Background */}
      <section className="relative py-10 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/research-lab.png')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/60"></div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs md:text-sm font-medium border border-emerald-500/30">
              <Beaker className="w-3.5 h-3.5" />
              Centro de Investigación
            </span>
            <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-teal-500/20 text-teal-300 rounded-full text-xs md:text-sm font-medium border border-teal-500/30">
              <BarChart3 className="w-3.5 h-3.5" />
              {totalProjects} Proyectos
            </span>
          </div>

          {/* Title and Description */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight max-w-2xl">
            Investigación en Biotecnología
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl leading-relaxed">
            Desarrollamos soluciones innovadoras en control biológico, mejoramiento genético, secuenciamiento y biotecnología molecular para la agricultura sostenible.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200 hover:shadow-md transition-shadow">
              <div className="text-xs font-semibold text-emerald-600 mb-1 uppercase">Proyectos Totales</div>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-900">{totalProjects}</h3>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow">
              <div className="text-xs font-semibold text-blue-600 mb-1 uppercase">Activos</div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-900">{activeProjects}</h3>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 hover:shadow-md transition-shadow">
              <div className="text-xs font-semibold text-purple-600 mb-1 uppercase">Completados</div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-900">{completedProjects}</h3>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow">
              <div className="text-xs font-semibold text-amber-600 mb-1 uppercase">Plantas</div>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-900">{totalPlantsProduced.toLocaleString()}+</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <section className="py-16 px-4 bg-gray-50 border-b border-gray-200">
        <LaboratoriesSection />
      </section>

      {/* Research Areas Section */}
      <section className="py-16 px-4 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Líneas Estratégicas</h2>
            <p className="text-gray-600">Cuatro áreas de investigación enfocadas en innovación agrícola sostenible</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/laboratorios/control-biologico" className="group relative bg-white rounded-lg p-5 border border-purple-200 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Control Biológico</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">Trichoderma, Trichogramma, Paratheresia. Agentes para manejo sostenible</p>
                <div className="text-purple-600 text-xs font-semibold flex items-center gap-1">
                  Ver más →
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative bg-white rounded-lg p-5 border border-blue-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Microscope className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Secuenciamiento</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">Análisis genómico avanzado de patógenos y organismos beneficiosos</p>
                <div className="text-blue-600 text-xs font-semibold flex items-center gap-1">
                  Ver más →
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative bg-white rounded-lg p-5 border border-green-200 hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Dna className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mejoramiento Genético</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">Variedades resistentes, productivas y de calidad superior</p>
                <div className="text-green-600 text-xs font-semibold flex items-center gap-1">
                  Ver más →
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative bg-white rounded-lg p-5 border border-cyan-200 hover:border-cyan-500 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-100 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                  <Leaf className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Biotecnología Molecular</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">Herramientas moleculares sostenibles para agricultura</p>
                <div className="text-cyan-600 text-xs font-semibold flex items-center gap-1">
                  Ver más →
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 px-4 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Proyectos de Investigación</h2>
            <p className="text-gray-600">Explora nuestros proyectos actuales y completados en las cuatro líneas estratégicas</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 border border-gray-300 rounded-lg p-1">
              <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-gray-700 font-semibold">
                Resumen General
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white text-gray-700 font-semibold">
                Proyectos Activos
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-md data-[state=active]:bg-purple-500 data-[state=active]:text-white text-gray-700 font-semibold">
                Completados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="space-y-8">
                <CategorySection title="CONTROL BIOLÓGICO" subsections={controlBiologico} color="purple" />
                <CategorySection title="SECUENCIAMIENTO" subsections={secuenciamiento} color="blue" />
                <CategorySection title="MEJORAMIENTO GENÉTICO" subsections={ingenieriaGenetica} color="green" />
                <CategorySection
                  title="BIOTECNOLOGÍA MOLECULAR"
                  subsections={pipelineData.find((item) => item.title === "Biotecnología Molecular")?.subsections || []}
                  color="green"
                />
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-8">
              <div className="space-y-8">
                <CategorySection title="CONTROL BIOLÓGICO" subsections={controlBiologico} color="purple" />
                <CategorySection title="SECUENCIAMIENTO" subsections={secuenciamiento} color="blue" />
                <CategorySection title="MEJORAMIENTO GENÉTICO" subsections={ingenieriaGenetica} color="green" />
                <CategorySection
                  title="BIOTECNOLOGÍA MOLECULAR"
                  subsections={pipelineData.find((item) => item.title === "Biotecnología Molecular")?.subsections || []}
                  color="green"
                />
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-3xl font-bold text-green-600 mb-1">{completedProjects}</h3>
                    <p className="text-green-800">Proyectos Completados</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-blue-600 mb-1">{totalPlantsProduced.toLocaleString()}+</h3>
                    <p className="text-blue-800">Plantas Producidas</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-purple-600 mb-1">6</h3>
                    <p className="text-purple-800">Variedades Clonadas</p>
                  </div>
                </div>
              </div>

              <CategorySection
                title="CLONACIÓN DE VARIEDADES COMPLETADAS"
                subsections={investigacionesTerminadas}
                color="green"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nuestro Impacto</h2>
            <p className="text-gray-600">Contribuimos al desarrollo sostenible de la agricultura peruana mediante investigación de excelencia</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-emerald-200 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sostenibilidad</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Reducimos el uso de químicos sintéticos promoviendo soluciones biológicas innovadoras para una agricultura más sostenible.</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-teal-200 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Excelencia Científica</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Mantenemos estándares internacionales en investigación y desarrollo de nuevas tecnologías agrícolas de vanguardia.</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-cyan-200 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Microscope className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Innovación Continua</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Invertimos constantemente en nuevas soluciones biotecnológicas adaptadas a los desafíos agrícolas modernos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-10 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Conoce nuestros laboratorios</h2>
            <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-2xl mx-auto">Explora nuestras instalaciones especializadas y colabora con nosotros en soluciones innovadoras para la agricultura</p>
            <a href="/laboratorios/biotecnologia-vegetal" className="inline-block bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors shadow-lg">
              Explorar Laboratorios →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
