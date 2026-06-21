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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Modern Hero Section with Image Background */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/research-lab.png"
            alt="Investigación de laboratorio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/50"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-2xl">
            {/* Overline */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-emerald-400"></span>
              <span className="text-xs md:text-sm font-semibold text-emerald-300 uppercase tracking-widest">Innovación en Biotecnología</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Investigación de Vanguardia
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Desarrollamos soluciones biotecnológicas innovadoras para transformar la agricultura sostenible a través de control biológico, mejoramiento genético y análisis molecular.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                Explorar Proyectos
                <Beaker className="w-4 h-4" />
              </a>
              <a href="#laboratorios" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 md:px-8 py-3 rounded-lg font-semibold backdrop-blur-sm border border-white/20 transition-all duration-300">
                Ver Laboratorios
                <Microscope className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Gradient divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
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

      {/* Impact Section */}
      <section className="py-16 md:py-20 px-4 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-xs md:text-sm font-semibold text-emerald-600 uppercase tracking-widest">Nuestro Compromiso</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Generando Impacto Sostenible</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl">Transformamos la agricultura peruana mediante investigación de excelencia y soluciones biotecnológicas innovadoras</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Impact Card 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl transition-all duration-300 group-hover:from-emerald-500/20 group-hover:to-emerald-600/15"></div>
              <div className="relative bg-white rounded-xl p-8 border border-gray-200 group-hover:border-emerald-300 transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-emerald-200 transition-colors">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sostenibilidad</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">Reducimos químicos sintéticos promoviendo soluciones biológicas innovadoras para una agricultura regenerativa</p>
              </div>
            </div>

            {/* Impact Card 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl transition-all duration-300 group-hover:from-purple-500/20 group-hover:to-purple-600/15"></div>
              <div className="relative bg-white rounded-xl p-8 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-purple-200 transition-colors">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Excelencia Científica</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">Mantenemos estándares internacionales en investigación y desarrollo de tecnologías agrícolas vanguardistas</p>
              </div>
            </div>

            {/* Impact Card 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl transition-all duration-300 group-hover:from-cyan-500/20 group-hover:to-cyan-600/15"></div>
              <div className="relative bg-white rounded-xl p-8 border border-gray-200 group-hover:border-cyan-300 transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-cyan-200 transition-colors">
                  <Microscope className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovación Continua</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">Invertimos constantemente en nuevas soluciones biotecnológicas adaptadas a desafíos agrícolas modernos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Modern */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white via-emerald-50/30 to-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative bg-gradient-to-r from-emerald-600/95 to-teal-600/95 backdrop-blur-sm rounded-2xl p-10 md:p-16 text-center border border-white/20">
              <div className="inline-flex items-center gap-2 mb-6 justify-center">
                <span className="h-px w-8 bg-emerald-200"></span>
                <span className="text-xs md:text-sm font-semibold text-emerald-100 uppercase tracking-widest">Próximo Paso</span>
                <span className="h-px w-8 bg-emerald-200"></span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Explora nuestros laboratorios</h2>
              <p className="text-lg text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">Descubre nuestras instalaciones de vanguardia especializadas en biotecnología e innovación agrícola</p>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="/laboratorios/biotecnologia-vegetal" className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl">
                  Visitar Laboratorios
                  <span>→</span>
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold py-3 px-8 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  Ver Proyectos
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
