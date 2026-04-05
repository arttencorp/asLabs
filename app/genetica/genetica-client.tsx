"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  Dna,
  Microscope,
  FlaskConical,
  Zap,
  BookOpen,
  ArrowRight,
  Play,
  Pause,
  TestTube,
  Activity,
  Leaf,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function GeneticaClient() {
  const [activeSection, setActiveSection] = useState("introduccion")
  const [isAnimating, setIsAnimating] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "introduccion", title: "Introducción", icon: BookOpen },
    { id: "genes", title: "Genes y ADN", icon: Dna },
    { id: "plasmidos", title: "Plásmidos", icon: FlaskConical },
    { id: "pcr", title: "PCR y Taq Polimerasa", icon: Zap },
    { id: "aplicaciones", title: "Aplicaciones", icon: Microscope },
  ]

  const geneticConcepts = [
    {
      id: "genes",
      title: "Genes y Inserción Génica",
      description: "Los genes son secuencias de ADN que codifican proteínas específicas.",
      details: [
        "Un gen es una unidad hereditaria que contiene la información para producir una proteína",
        "La inserción génica permite introducir nuevos genes en organismos",
        "Se utiliza para conferir nuevas características como resistencia a enfermedades",
        "El proceso requiere vectores como plásmidos para transportar el gen",
      ],
      applications: ["Resistencia a virus en plantas", "Producción de insulina", "Cultivos resistentes a herbicidas"],
    },
    {
      id: "plasmidos",
      title: "Plásmidos como Vectores",
      description: "Moléculas de ADN circular que actúan como vehículos para transportar genes.",
      details: [
        "Son moléculas de ADN independientes del cromosoma principal",
        "Pueden replicarse de forma autónoma en las células",
        "Se modifican para incluir genes de interés y marcadores de selección",
        "Los plásmidos Ti de Agrobacterium son especialmente útiles en plantas",
      ],
      applications: ["Transformación de plantas", "Producción de proteínas recombinantes", "Terapia génica"],
    },
    {
      id: "pcr",
      title: "PCR y Taq Polimerasa",
      description: "Técnica para amplificar secuencias específicas de ADN mediante ciclos de temperatura.",
      details: [
        "PCR significa Reacción en Cadena de la Polimerasa",
        "Taq polimerasa es una enzima termoestable que sintetiza ADN",
        "Permite amplificar millones de copias de una secuencia específica",
        "Requiere primers, dNTPs y ciclos de desnaturalización, hibridación y extensión",
      ],
      applications: ["Diagnóstico molecular", "Clonación de genes", "Análisis forense", "Detección de patógenos"],
    },
  ]

  const FloatingElement: React.FC<{ children?: React.ReactNode; delay?: number; className?: string }> = ({
    children,
    delay = 0,
    className = "",
  }) => (
    <div
      className={`floating-element ${className}`}
      style={{
        animationDelay: `${delay}s`,
        transform: `translateY(${scrollY * 0.1}px)`,
      }}
    >
      {children}
    </div>
  )

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        {/* Elementos decorativos animados mejorados */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <FloatingElement className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20"/>
          <FloatingElement
            delay={1}
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-20"
          />
          <FloatingElement
            delay={2}
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20"
          />
          <FloatingElement
            delay={0.5}
            className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-20"
          />

          {/* Elementos adicionales */}
          <FloatingElement
            delay={3}
            className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-15"
          />
          <FloatingElement
            delay={1.5}
            className="absolute top-1/3 right-10 w-12 h-12 bg-gradient-to-r from-pink-200 to-red-200 rounded-full opacity-15"
          />
        </div>

        {/* Partículas flotantes */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-30 ${isAnimating ? "animate-float" : ""}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Section Mejorado */}
        <section className="relative py-32 px-4 text-center overflow-hidden">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 p-6 rounded-full shadow-2xl animate-pulse-slow">
                  <Dna className="h-16 w-16 text-white animate-spin-slow" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 animate-ping" />
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-gradient">
                Genética Molecular
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full animate-pulse" />
            </div>

            <p className="text-2xl lg:text-3xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed animate-fade-in-up">
              Explora los fundamentos de la genética moderna: desde la inserción de genes hasta las aplicaciones
              biotecnológicas que están transformando la agricultura y la medicina.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                { text: "Inserción Génica", color: "from-blue-500 to-blue-600", icon: Dna },
                { text: "Plásmidos", color: "from-green-500 to-green-600", icon: FlaskConical },
                { text: "PCR", color: "from-purple-500 to-purple-600", icon: Zap },
                { text: "Taq Polimerasa", color: "from-orange-500 to-orange-600", icon: TestTube },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${item.color} text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 animate-fade-in-up group cursor-pointer`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 group-hover:animate-bounce" />
                      <span className="font-semibold text-lg">{item.text}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* DNA Helix Animation Mejorada */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className={`w-[600px] h-[600px] ${isAnimating ? "animate-spin-slow" : ""}`}>
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>

                {/* Múltiples hélices para efecto más complejo */}
                <path
                  d="M50,200 Q150,50 250,200 T450,200"
                  stroke="url(#gradient1)"
                  strokeWidth="6"
                  fill="none"
                  className={isAnimating ? "animate-pulse-slow" : ""}
                />
                <path
                  d="M50,200 Q150,350 250,200 T450,200"
                  stroke="url(#gradient2)"
                  strokeWidth="6"
                  fill="none"
                  className={isAnimating ? "animate-pulse-slow" : ""}
                  style={{ animationDelay: "1s" }}
                />

                {/* Conexiones entre hélices */}
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1={50 + i * 50}
                    y1={200 + Math.sin(i * 0.5) * 100}
                    x2={50 + i * 50}
                    y2={200 - Math.sin(i * 0.5) * 100}
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    opacity="0.6"
                    className={isAnimating ? "animate-pulse" : ""}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </section>

        {/* Navigation Tabs Mejoradas */}
        <section className="py-8 px-4 bg-white/80 backdrop-blur-lg sticky top-0 z-20 border-b border-gray-200 shadow-lg">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500 transform hover:scale-105 ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white shadow-xl scale-105"
                        : "bg-white text-gray-600 hover:bg-gray-50 shadow-lg hover:shadow-xl"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className={`h-6 w-6 ${activeSection === section.id ? "animate-bounce" : ""}`} />
                    <span className="font-semibold text-lg">{section.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Content Sections Mejoradas */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            {activeSection === "introduccion" && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold mb-8 text-gray-800 animate-fade-in-up">
                    Fundamentos de la Genética Molecular
                  </h2>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-8" />
                  <p
                    className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    La genética molecular es la disciplina que estudia la estructura y función de los genes a nivel
                    molecular, enfocándose en los mecanismos de expresión génica, regulación transcripcional y las
                    técnicas de manipulación del material genético para aplicaciones biotecnológicas.
                  </p>
                </div>

                {/* Conceptos Fundamentales Expandidos */}
                <div className="max-w-6xl mx-auto mb-16">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-12">
                    <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-4">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl">
                        <Dna className="h-8 w-8 text-white" />
                      </div>
                      Dogma Central de la Biología Molecular
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                        <div className="text-4xl mb-4">🧬</div>
                        <h4 className="text-xl font-bold text-blue-800 mb-3">ADN</h4>
                        <p className="text-gray-600">
                          Ácido desoxirribonucleico que contiene la información genética en secuencias de nucleótidos
                          (A, T, G, C)
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                        <div className="text-4xl mb-4">📜</div>
                        <h4 className="text-xl font-bold text-green-800 mb-3">ARN</h4>
                        <p className="text-gray-600">
                          Ácido ribonucleico que actúa como intermediario en la síntesis de proteínas (transcripción)
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                        <div className="text-4xl mb-4">🔗</div>
                        <h4 className="text-xl font-bold text-purple-800 mb-3">Proteína</h4>
                        <p className="text-gray-600">
                          Producto final que ejecuta las funciones celulares específicas (traducción)
                        </p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-2xl">
                      <p className="text-center text-lg font-semibold text-gray-800">
                        ADN → ARN → Proteína (Flujo unidireccional de la información genética)
                      </p>
                    </div>
                  </div>

                  {/* Técnicas Moleculares Detalladas */}
                  <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-3xl shadow-2xl p-12 mb-12">
                    <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-4">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                        <FlaskConical className="h-8 w-8 text-white" />
                      </div>
                      Técnicas de Biología Molecular
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
                          <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                            <Zap className="w-6 h-6" />
                            Electroforesis en Gel
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Técnica de separación de ácidos nucleicos basada en su tamaño molecular y carga eléctrica.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• Gel de agarosa para ADN (0.8-2%)</li>
                            <li>• Gel de poliacrilamida para ARN y proteínas</li>
                            <li>• Voltaje típico: 80-120V</li>
                            <li>• Marcadores moleculares para determinar tamaño</li>
                          </ul>
                        </div>
                        <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
                          <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                            <Microscope className="w-6 h-6" />
                            Clonación Molecular
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Proceso de inserción de genes de interés en vectores de clonación para su amplificación.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• Vectores: plásmidos, cósmidos, BACs</li>
                            <li>• Enzimas de restricción para cortes específicos</li>
                            <li>• Ligasas para unir fragmentos de ADN</li>
                            <li>• Transformación en células competentes</li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
                          <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                            <TestTube className="w-6 h-6" />
                            Secuenciación de ADN
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Determinación del orden exacto de nucleótidos en una molécula de ADN.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• Método de Sanger (terminadores de cadena)</li>
                            <li>• Secuenciación de nueva generación (NGS)</li>
                            <li>• Análisis bioinformático de secuencias</li>
                            <li>• Comparación con bases de datos (BLAST)</li>
                          </ul>
                        </div>
                        <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
                          <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                            <Activity className="w-6 h-6" />
                            RT-PCR Cuantitativa
                          </h4>
                          <p className="text-gray-600 mb-4">
                            Técnica para cuantificar la expresión génica en tiempo real.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li>• Transcriptasa reversa para síntesis de cDNA</li>
                            <li>• Sondas fluorescentes (SYBR Green, TaqMan)</li>
                            <li>• Genes de referencia para normalización</li>
                            <li>• Análisis de curvas de melting</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aplicaciones en Biotecnología Vegetal */}
                  <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl shadow-2xl p-12">
                    <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-4">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl">
                        <Leaf className="h-8 w-8 text-white" />
                      </div>
                      Biotecnología Vegetal Aplicada
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white/80 p-8 rounded-2xl shadow-lg">
                        <h4 className="text-2xl font-bold text-green-800 mb-6">Transformación Genética</h4>
                        <div className="space-y-4">
                          <div className="border-l-4 border-green-400 pl-4">
                            <h5 className="font-bold text-gray-800">Agrobacterium tumefaciens</h5>
                            <p className="text-gray-600 text-sm">
                              Vector natural que transfiere su plásmido Ti a células vegetales, integrándose al genoma
                              nuclear.
                            </p>
                          </div>
                          <div className="border-l-4 border-blue-400 pl-4">
                            <h5 className="font-bold text-gray-800">Biobalística</h5>
                            <p className="text-gray-600 text-sm">
                              Bombardeo de partículas de oro o tungsteno recubiertas con ADN a alta velocidad.
                            </p>
                          </div>
                          <div className="border-l-4 border-purple-400 pl-4">
                            <h5 className="font-bold text-gray-800">Electroporación</h5>
                            <p className="text-gray-600 text-sm">
                              Aplicación de pulsos eléctricos para crear poros temporales en la membrana celular.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 p-8 rounded-2xl shadow-lg">
                        <h4 className="text-2xl font-bold text-blue-800 mb-6">Marcadores Moleculares</h4>
                        <div className="space-y-4">
                          <div className="border-l-4 border-red-400 pl-4">
                            <h5 className="font-bold text-gray-800">RAPD (Random Amplified Polymorphic DNA)</h5>
                            <p className="text-gray-600 text-sm">
                              Primers aleatorios de 10 nucleótidos para detectar polimorfismos genéticos.
                            </p>
                          </div>
                          <div className="border-l-4 border-yellow-400 pl-4">
                            <h5 className="font-bold text-gray-800">SSR (Simple Sequence Repeats)</h5>
                            <p className="text-gray-600 text-sm">
                              Microsatélites altamente polimórficos para estudios de diversidad genética.
                            </p>
                          </div>
                          <div className="border-l-4 border-indigo-400 pl-4">
                            <h5 className="font-bold text-gray-800">SNP (Single Nucleotide Polymorphisms)</h5>
                            <p className="text-gray-600 text-sm">
                              Variaciones de un solo nucleótido para mapeo genético de alta resolución.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conceptos Básicos Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[
                    {
                      icon: Dna,
                      title: "Estructura del ADN",
                      description:
                        "Doble hélice antiparalela con apareamiento de bases complementarias (A-T, G-C) estabilizada por puentes de hidrógeno.",
                      color: "from-blue-500 to-blue-600",
                      bgColor: "from-blue-50 to-blue-100",
                      details: ["Surco mayor y menor", "Direccionalidad 5' → 3'", "Empaquetamiento en nucleosomas"],
                    },
                    {
                      icon: FlaskConical,
                      title: "Enzimas Clave",
                      description:
                        "Proteínas especializadas que catalizan reacciones específicas en los procesos de replicación, transcripción y reparación.",
                      color: "from-green-500 to-green-600",
                      bgColor: "from-green-50 to-green-100",
                      details: ["ADN polimerasas", "Endonucleasas de restricción", "Ligasas y topoisomerasas"],
                    },
                    {
                      icon: Microscope,
                      title: "Regulación Génica",
                      description:
                        "Mecanismos de control de la expresión génica a nivel transcripcional, post-transcripcional y epigenético.",
                      color: "from-purple-500 to-purple-600",
                      bgColor: "from-purple-50 to-purple-100",
                      details: ["Promotores y enhancers", "Factores de transcripción", "Modificaciones epigenéticas"],
                    },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${item.bgColor} p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up group`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div
                          className={`bg-gradient-to-r ${item.color} p-6 rounded-full w-fit mb-8 group-hover:animate-bounce`}
                        >
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">{item.title}</h3>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">{item.description}</p>
                        <ul className="space-y-2">
                          {item.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-600">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeSection !== "introduccion" && activeSection !== "aplicaciones" && (
              <div className="animate-fade-in-up">
                {geneticConcepts
                  .filter((concept) => concept.id === activeSection)
                  .map((concept) => (
                    <div key={concept.id} className="max-w-5xl mx-auto">
                      <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-8 text-gray-800 animate-fade-in-up">{concept.title}</h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-8" />
                        <p
                          className="text-2xl text-gray-600 leading-relaxed animate-fade-in-up"
                          style={{ animationDelay: "0.2s" }}
                        >
                          {concept.description}
                        </p>
                      </div>

                      <div
                        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-16 animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                      >
                        <h3 className="text-3xl font-bold mb-10 text-gray-800 flex items-center gap-4">
                          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl">
                            <BookOpen className="h-8 w-8 text-white" />
                          </div>
                          Conceptos Fundamentales
                        </h3>
                        <div className="space-y-6">
                          {concept.details.map((detail, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:from-blue-50 hover:to-green-50 transition-all duration-500 hover:scale-102 animate-fade-in-up group"
                              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                            >
                              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full mt-1 group-hover:animate-pulse">
                                <ChevronRight className="h-6 w-6 text-white" />
                              </div>
                              <p className="text-gray-700 leading-relaxed text-lg">{detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        className="bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 rounded-3xl p-12 animate-fade-in-up"
                        style={{ animationDelay: "0.8s" }}
                      >
                        <h3 className="text-3xl font-bold mb-10 text-gray-800 flex items-center gap-4">
                          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-xl">
                            <Zap className="h-8 w-8 text-white" />
                          </div>
                          Aplicaciones Prácticas
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {concept.applications.map((application, index) => (
                            <div
                              key={index}
                              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up group"
                              style={{ animationDelay: `${1 + index * 0.1}s` }}
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="bg-gradient-to-r from-green-400 to-blue-400 p-3 rounded-xl group-hover:animate-bounce">
                                  <ArrowRight className="h-6 w-6 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800 text-lg">{application}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {activeSection === "aplicaciones" && (
              <div className="animate-fade-in-up">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold mb-8 text-gray-800 animate-fade-in-up">
                    Aplicaciones en AS Laboratorios
                  </h2>
                  <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-8" />
                  <p
                    className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Descubre cómo aplicamos estos conceptos en nuestros proyectos de investigación y desarrollo.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up">
                    <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-6 rounded-full w-fit mb-8">
                      <Dna className="h-12 w-12 text-white animate-spin-slow" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">Proyecto Banano Baby</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      Desarrollo de bananos resistentes a Fusarium mediante inserción del gen de quitinasa usando
                      plásmidos Ti.
                    </p>
                    <a
                      href="/research/banano-baby"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-500 hover:scale-105 text-lg font-semibold"
                    >
                      Ver Proyecto
                      <ArrowRight className="h-6 w-6" />
                    </a>
                  </div>

                  <div
                    className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6 rounded-full w-fit mb-8">
                      <FlaskConical className="h-12 w-12 text-white animate-bounce-slow" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 text-gray-800">Servicios de Laboratorio</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      Ofrecemos servicios especializados en PCR, clonación y análisis genético para instituciones
                      educativas.
                    </p>
                    <a
                      href="/tienda"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-500 hover:scale-105 text-lg font-semibold"
                    >
                      Ver Servicios
                      <ArrowRight className="h-6 w-6" />
                    </a>
                  </div>
                </div>

                <div
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="text-3xl font-bold mb-12 text-center text-gray-800">Técnicas que Utilizamos</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        name: "PCR",
                        description: "Amplificación de ADN",
                        color: "from-blue-400 to-blue-600",
                        icon: Zap,
                      },
                      {
                        name: "Clonación",
                        description: "Inserción en vectores",
                        color: "from-green-400 to-green-600",
                        icon: Dna,
                      },
                      {
                        name: "Transformación",
                        description: "Introducción en células",
                        color: "from-purple-400 to-purple-600",
                        icon: FlaskConical,
                      },
                      {
                        name: "Análisis",
                        description: "Verificación molecular",
                        color: "from-orange-400 to-orange-600",
                        icon: Microscope,
                      },
                    ].map((technique, index) => {
                      const Icon = technique.icon
                      return (
                        <div
                          key={index}
                          className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:from-white hover:to-gray-50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up group"
                          style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                        >
                          <div
                            className={`bg-gradient-to-r ${technique.color} p-6 rounded-full w-fit mx-auto mb-6 group-hover:animate-bounce`}
                          >
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-800 mb-3 text-xl">{technique.name}</h4>
                          <p className="text-gray-600 text-lg">{technique.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulseSlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spinSlow 20s linear infinite;
          }
          
          .animate-pulse-slow {
            animation: pulseSlow 3s ease-in-out infinite;
          }
          
          .animate-bounce-slow {
            animation: bounceSlow 2s ease-in-out infinite;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
          
          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }
          
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }
        `}</style>
      </div>

      <Footer />
    </>
  )
}
