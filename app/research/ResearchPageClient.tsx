"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Award, Microscope, Dna, Leaf, Shield, CheckCircle, Clock, Beaker, Zap, ArrowRight } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Premium Modern Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden flex items-center">
        {/* Background with Image and Multiple Overlays */}
        <div className="absolute inset-0">
          <img
            src="/images/research-lab.png"
            alt="Investigación de laboratorio"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/75 to-gray-900/40"></div>
          {/* Subtle noise effect */}
          <div className="absolute inset-0 mix-blend-overlay opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 filter=%22url(%23noiseFilter)%22 /%3E%3C/svg%3E')" }}></div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl opacity-10"></div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10 py-20 md:py-32">
          <div className="max-w-3xl">
            {/* Animated Overline */}
            <div className="inline-flex items-center gap-3 mb-8 group">
              <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:w-16 transition-all duration-500"></div>
              <span className="text-xs md:text-sm font-bold text-emerald-300 uppercase tracking-widest">Centro Biotecnológico Líder</span>
            </div>

            {/* Premium Title with Gradient */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tight">
              Investig<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">ación</span> de Punta
            </h1>

            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-4 font-light">
              Transformamos la agricultura del futuro con soluciones biotecnológicas innovadoras
            </p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Control biológico avanzado, mejoramiento genético molecular, secuenciamiento de última generación y análisis de laboratorio de excelencia internacional.
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-wrap gap-5 items-center">
              <a href="#projects" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 md:px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105">
                <span>Explorar Proyectos</span>
                <Beaker className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#laboratorios" className="group relative inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 md:px-10 py-4 rounded-xl font-bold text-lg backdrop-blur-xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-xl">
                <span>Laboratorios</span>
                <Microscope className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Stats Row */}
            <div className="mt-16 flex flex-wrap gap-8 text-white/90">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">{totalProjects}+</div>
                <div className="text-sm text-gray-400 mt-1">Proyectos Activos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-teal-400">{completedProjects}+</div>
                <div className="text-sm text-gray-400 mt-1">Investigaciones Completadas</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-300">{totalPlantsProduced.toLocaleString()}+</div>
                <div className="text-sm text-gray-400 mt-1">Plantas Producidas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-gray-300 font-medium">Desplázate</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
      </section>

      {/* Statistics Section - Modern Cards */}
      <section className="py-12 md:py-16 bg-white relative z-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-emerald-300 transition-all duration-300 group-hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Total de Proyectos</p>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{totalProjects}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 group-hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">En Progreso</p>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{activeProjects}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 group-hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Completados</p>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{completedProjects}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-amber-300 transition-all duration-300 group-hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Plantas</p>
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{totalPlantsProduced.toLocaleString()}+</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <section id="laboratorios" className="py-16 md:py-20 px-4 bg-white border-b border-gray-100">
        <LaboratoriesSection />
      </section>

      {/* Research Areas Section - Modern Design */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs md:text-sm font-semibold text-emerald-600 uppercase tracking-widest">Investigación Especializada</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Líneas Estratégicas</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl">Cuatro áreas de investigación enfocadas en innovación y sostenibilidad agrícola</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <a href="/laboratorios/control-biologico" className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl transition-all duration-300 group-hover:from-purple-500/20 group-hover:to-purple-600/10"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 h-full flex flex-col group-hover:shadow-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Control Biológico</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">Soluciones microbianas para manejo sostenible de plagas</p>
                <div className="text-purple-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Descubrir <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl transition-all duration-300 group-hover:from-blue-500/20 group-hover:to-blue-600/10"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 h-full flex flex-col group-hover:shadow-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Microscope className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Secuenciamiento</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">Análisis genómico avanzado de organismos</p>
                <div className="text-blue-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Descubrir <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl transition-all duration-300 group-hover:from-green-500/20 group-hover:to-green-600/10"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-green-300 transition-all duration-300 h-full flex flex-col group-hover:shadow-xl">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Dna className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mejoramiento Genético</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">Variedades resistentes y de calidad superior</p>
                <div className="text-green-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Descubrir <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>

            <a href="/research?tab=overview" className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl transition-all duration-300 group-hover:from-cyan-500/20 group-hover:to-cyan-600/10"></div>
              <div className="relative bg-white rounded-xl p-6 border border-gray-200 group-hover:border-cyan-300 transition-all duration-300 h-full flex flex-col group-hover:shadow-xl">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-200 transition-colors">
                  <Leaf className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Biotecnología Molecular</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">Herramientas sostenibles para agricultura</p>
                <div className="text-cyan-600 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Descubrir <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Tabs Section - Modern */}
      <section id="projects" className="py-16 md:py-20 px-4 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs md:text-sm font-semibold text-emerald-600 uppercase tracking-widest">Catálogo Completo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Proyectos de Investigación</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl">Explora nuestros proyectos actuales y completados en las cuatro líneas estratégicas de investigación</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 border border-gray-200/50 rounded-xl p-1.5">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md text-gray-700 font-semibold py-2.5 transition-all duration-200 data-[state=active]:text-emerald-600">
                Resumen General
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md text-gray-700 font-semibold py-2.5 transition-all duration-200 data-[state=active]:text-blue-600">
                Proyectos Activos
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md text-gray-700 font-semibold py-2.5 transition-all duration-200 data-[state=active]:text-purple-600">
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

      {/* Impact Section - Premium */}
      <section className="py-20 md:py-24 px-4 bg-white border-t border-gray-100 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl -ml-40 opacity-50"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -mr-48 opacity-50"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-widest">Nuestro Impacto</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Transformando la <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Agricultura</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              Mediante investigación de excelencia, generamos soluciones biotecnológicas que hacen la diferencia en la agricultura sostenible peruana
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Impact Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-emerald-50/30 rounded-2xl transition-all duration-300 group-hover:from-emerald-100/80 group-hover:to-emerald-50/50"></div>
              <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-gray-200 group-hover:border-emerald-300 transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Sostenibilidad</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">Reducimos químicos sintéticos promoviendo soluciones biológicas innovadoras que regeneran ecosistemas agrícolas</p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-bold text-emerald-600">+ Biodiversidad agrícola</p>
                </div>
              </div>
            </div>

            {/* Impact Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-purple-50/30 rounded-2xl transition-all duration-300 group-hover:from-purple-100/80 group-hover:to-purple-50/50"></div>
              <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Excelencia Científica</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">Mantenemos estándares internacionales en investigación, validando cada solución con rigor científico comprobado</p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-bold text-purple-600">+ Tecnología de punta</p>
                </div>
              </div>
            </div>

            {/* Impact Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 to-cyan-50/30 rounded-2xl transition-all duration-300 group-hover:from-cyan-100/80 group-hover:to-cyan-50/50"></div>
              <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-gray-200 group-hover:border-cyan-300 transition-all duration-300 group-hover:shadow-2xl h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Microscope className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">Innovación Continua</h3>
                <p className="text-gray-600 text-base leading-relaxed flex-grow">Invertimos constantemente en nuevas soluciones biotecnológicas adaptadas a desafíos agrícolas del futuro</p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-bold text-cyan-600">+ Investigación avanzada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Premium */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 relative overflow-hidden">
        {/* Premium background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Premium CTA Card */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-20"></div>

            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 lg:p-20 border border-emerald-400/50 backdrop-blur-xl overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
              </div>

              <div className="relative text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-white/10 rounded-full border border-white/30 backdrop-blur-sm">
                  <span className="h-1 w-6 bg-gradient-to-r from-emerald-300 to-teal-300"></span>
                  <span className="text-xs md:text-sm font-bold text-emerald-100 uppercase tracking-widest">Conecta con Nosotros</span>
                  <span className="h-1 w-6 bg-gradient-to-r from-teal-300 to-emerald-300"></span>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Descubre Nuestras <span className="text-emerald-200">Soluciones</span>
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Visita nuestros laboratorios de investigación y conoce de cerca cómo transformamos la biotecnología en soluciones reales para la agricultura
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                  <a href="/laboratorios/biotecnologia-vegetal" className="group relative inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105">
                    <span>Explorar Laboratorios</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#projects" className="group inline-flex items-center gap-3 bg-white/10 text-white px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl border-2 border-white/40 hover:border-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                    <span>Ver Proyectos</span>
                    <BarChart3 className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="mt-14 pt-10 border-t border-white/20 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-emerald-200">{totalProjects}+</div>
                    <div className="text-sm md:text-base text-emerald-100 mt-2 font-medium">Proyectos</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-emerald-200">4</div>
                    <div className="text-sm md:text-base text-emerald-100 mt-2 font-medium">Laboratorios</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-emerald-200">{totalPlantsProduced.toLocaleString()}+</div>
                    <div className="text-sm md:text-base text-emerald-100 mt-2 font-medium">Plantas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
