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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-7000"></div>
          <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-6">
              <Beaker className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Ciencia e Innovación</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 leading-tight">
              Investigación en Biotecnología
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Transformamos la agricultura a través de investigación científica de vanguardia, desarrollando soluciones innovadoras en control biológico, mejoramiento genético y biotecnología molecular.
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500"></div>
              <Zap className="w-5 h-5 text-emerald-400" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500"></div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{totalProjects}</h3>
                <p className="text-slate-400 text-sm font-medium">Proyectos Totales</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{activeProjects}</h3>
                <p className="text-slate-400 text-sm font-medium">Proyectos Activos</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{completedProjects}</h3>
                <p className="text-slate-400 text-sm font-medium">Completados</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{totalPlantsProduced.toLocaleString()}+</h3>
                <p className="text-slate-400 text-sm font-medium">Plantas Producidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <LaboratoriesSection />

      {/* SEO Section - Control Biológico Detailed */}
      <section className="py-20 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Agentes de Control Biológico en Trujillo, La Libertad, Perú
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            AS Laboratorios es un centro de investigación especializado en control biológico ubicado en Trujillo, La Libertad, Perú. Desarrollamos, producimos e investigamos los principales agentes biocontroladores para agricultura sostenible, reconocidos por SENASA como proveedores autorizados. Nuestras líneas de investigación incluyen Trichoderma, Trichogramma, Paratheresia claripalpis, Bacillus y consorcios microbianos para manejo integrado de plagas (MIP).
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Trichoderma</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Hongo antagonista efectivo contra Fusarium oxysporum, Rhizoctonia y otros patógenos fúngicos del suelo. Producción de cepas nativas de Trichoderma aisladas de La Libertad.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Control de enfermedades radicales</li>
                <li>• Promotor de crecimiento vegetal</li>
                <li>• Biodegradación de residuos</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors">
              <h3 className="text-xl font-bold text-blue-300 mb-3">Trichogramma</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Parasitoide de huevos de lepidópteros. Ampliamente utilizado en manejo integrado de plagas (MIP) para control de polillas y mariposas plagas en cultivos.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Control biológico de polillas</li>
                <li>• Reducción de plaguicidas</li>
                <li>• Producción en laboratorio</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-bold text-purple-300 mb-3">Paratheresia claripalpis</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Mosca parasitoide especializada en control de plagas de hemípteros y otros insectos. Producción especializada reconocida por SENASA para cultivos en La Libertad.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Control de chinches</li>
                <li>• Sostenibilidad agrícola</li>
                <li>• Cultivos Sin Plaguicidas</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Bacillus & Consorcios</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Bacterias entomopatógenas y bioprotectoras. Consorcios microbianos para múltiples plagas y enfermedades en plantas.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Entomopatógenos naturales</li>
                <li>• Bioprotección de cultivos</li>
                <li>• Soluciones integradas</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">¿Por qué elegir Control Biológico?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-slate-300">
              <div>
                <h4 className="font-semibold text-emerald-300 mb-2">Sostenible</h4>
                <p className="text-sm">Reduce dependencia de plaguicidas químicos. Control natural y ecológico de plagas sin contaminar el ambiente.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Económico</h4>
                <p className="text-sm">Reduce costos de producción a largo plazo. Agricultores reportan hasta 50% de reducción en gastos de agroquímicos.</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-300 mb-2">Eficiente</h4>
                <p className="text-sm">Resultados comprobados por SENASA. Casos de éxito en Proyecto Chavimochic y empresas agroindustriales peruanas.</p>
              </div>
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700 rounded-lg p-1">
              <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600">
                Proyectos Activos
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600">
                Completados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-12">
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

            <TabsContent value="active" className="space-y-12">
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

            <TabsContent value="completed" className="space-y-12">
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {completedProjects}
                    </h3>
                    <p className="text-slate-300">Proyectos Completados</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {totalPlantsProduced.toLocaleString()}+
                    </h3>
                    <p className="text-slate-300">Plantas Producidas</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      6
                    </h3>
                    <p className="text-slate-300">Variedades Clonadas</p>
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
