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
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 mb-4">
              <Beaker className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-100 uppercase tracking-wider">Centro de Investigación</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
              Investigación en<br />Biotecnología
            </h1>
            
            <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Desarrollamos soluciones innovadoras en control biológico, mejoramiento genético, secuenciamiento y biotecnología molecular para la agricultura sostenible.
            </p>
          </div>

          {/* Statistics Grid - Enhanced */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-emerald-300/50 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-400/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{totalProjects}</h3>
              <p className="text-emerald-200 text-sm font-medium">Proyectos Totales</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-cyan-300/50 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl">
              <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-cyan-400/30 transition-colors">
                <Zap className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{activeProjects}</h3>
              <p className="text-cyan-200 text-sm font-medium">Proyectos Activos</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-purple-300/50 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl">
              <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-400/30 transition-colors">
                <CheckCircle className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{completedProjects}</h3>
              <p className="text-purple-200 text-sm font-medium">Completados</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-amber-300/50 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl">
              <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-amber-400/30 transition-colors">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{totalPlantsProduced.toLocaleString()}+</h3>
              <p className="text-amber-200 text-sm font-medium">Plantas Producidas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <LaboratoriesSection />

      {/* Research Areas Section */}
      <section className="py-16 px-4 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Áreas de Investigación</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Cuatro líneas estratégicas enfocadas en innovación y sostenibilidad agrícola</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/laboratorios/control-biologico" className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">Control Biológico</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">Trichoderma, Trichogramma, Paratheresia claripalpis. Agentes microbianos para manejo sostenible</p>
                <div className="text-purple-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explorar <span>→</span>
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Microscope className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">Secuenciamiento</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">Análisis genómico avanzado de patógenos y organismos beneficiosos</p>
                <div className="text-blue-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explorar <span>→</span>
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:border-green-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                  <Dna className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">Mejoramiento Genético</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">Desarrollo de variedades resistentes, productivas y de calidad superior</p>
                <div className="text-green-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explorar <span>→</span>
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative overflow-hidden bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-200/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                  <Leaf className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors">Biotecnología Molecular</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">Herramientas moleculares sostenibles para agricultura moderna</p>
                <div className="text-cyan-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explorar <span>→</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Proyectos de Investigación</h2>
            <p className="text-lg text-gray-600">Explora nuestros proyectos actuales y completados</p>
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
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Nuestro Impacto</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Contribuimos al desarrollo sostenible de la agricultura peruana mediante investigación de excelencia</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sostenibilidad</h3>
              <p className="text-gray-600">Promovemos prácticas agrícolas sostenibles que reduce el uso de químicos sintéticos en favor de soluciones biológicas innovadoras.</p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-teal-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excelencia Científica</h3>
              <p className="text-gray-600">Nuestro equipo mantiene estándares internacionales en investigación y desarrollo de nuevas tecnologías agrícolas.</p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-cyan-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Microscope className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovación Continua</h3>
              <p className="text-gray-600">Invertimos constantemente en investigación para desarrollar nuevas soluciones biotecnológicas adaptadas a los desafíos agrícolas actuales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Interesado en nuestras investigaciones?</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">Conoce nuestros laboratorios especializados y colabora con nosotros en soluciones innovadoras para la agricultura</p>
            <a href="/laboratorios/biotecnologia-vegetal" className="inline-block bg-white text-emerald-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              Explorar Laboratorios →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
