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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Compact Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 mb-3">
              <Beaker className="w-3 h-3 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Ciencia e Innovación</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Investigación en Biotecnología
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Desarrollamos soluciones innovadoras en control biológico, mejoramiento genético y biotecnología molecular.
            </p>
          </div>

          {/* Statistics Grid - Compact */}
          <div className="grid md:grid-cols-4 gap-3 mb-8">
            <div className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalProjects}</h3>
                <p className="text-gray-600 text-xs font-medium">Proyectos Totales</p>
              </div>
            </div>

            <div className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{activeProjects}</h3>
                <p className="text-gray-600 text-xs font-medium">Proyectos Activos</p>
              </div>
            </div>

            <div className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-300">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{completedProjects}</h3>
                <p className="text-gray-600 text-xs font-medium">Completados</p>
              </div>
            </div>

            <div className="group relative bg-white rounded-lg p-4 border border-gray-200 hover:border-cyan-500 hover:shadow-md transition-all duration-300">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalPlantsProduced.toLocaleString()}+</h3>
                <p className="text-gray-600 text-xs font-medium">Plantas Producidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <LaboratoriesSection />

      {/* Research Areas Section */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nuestras Áreas de Investigación</h2>
            <p className="text-base text-gray-600">Cuatro líneas estratégicas de investigación</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200 hover:border-purple-500 hover:shadow-md transition-all duration-300">
              <Shield className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Control Biológico</h3>
              <p className="text-gray-700 text-sm">Agentes microbianos para manejo sostenible de plagas</p>
            </div>

            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200 hover:border-blue-500 hover:shadow-md transition-all duration-300">
              <Microscope className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Secuenciamiento</h3>
              <p className="text-gray-700 text-sm">Análisis genómico avanzado de patógenos</p>
            </div>

            <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200 hover:border-green-500 hover:shadow-md transition-all duration-300">
              <Dna className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mejoramiento Genético</h3>
              <p className="text-gray-700 text-sm">Desarrollo de variedades resistentes</p>
            </div>

            <div className="group relative bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6 border border-cyan-200 hover:border-cyan-500 hover:shadow-md transition-all duration-300">
              <Leaf className="w-10 h-10 text-cyan-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Biotecnología Molecular</h3>
              <p className="text-gray-700 text-sm">Herramientas moleculares sostenibles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestras Áreas de Investigación</h2>
            <p className="text-lg text-slate-400">Desarrollamos soluciones innovadoras en cuatro líneas estratégicas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative bg-gradient-to-br from-purple-900/40 to-purple-900/10 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Shield className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Control Biológico</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Agentes microbianos y estrategias sostenibles para el manejo integrado de plagas</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-blue-900/40 to-blue-900/10 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Microscope className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Secuenciamiento</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Análisis genómico avanzado de patógenos y organismos beneficiosos</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-900/40 to-green-900/10 rounded-2xl p-8 border border-green-500/20 hover:border-green-500/60 transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Dna className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Mejoramiento Genético</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Desarrollo de variedades resistentes, productivas y de calidad superior</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-cyan-900/40 to-cyan-900/10 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <Leaf className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Biotecnología Molecular</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Herramientas moleculares para mejorar la agricultura sostenible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 border border-gray-300 rounded-lg p-1">
              <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Proyectos Activos
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-md data-[state=active]:bg-purple-500 data-[state=active]:text-white">
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
    </div>
  )
}
