"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Users,
  Target,
  Microscope,
  Database,
  Cpu,
  FlaskConical,
  BookOpen,
  Award,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Dna,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react"

export default function SecuenciamientoFusariumClient() {
  const [activeTab, setActiveTab] = useState("overview")

  const projectProgress = 3 // 3% de progreso actual

  const milestones = [
    {
      id: 1,
      title: "Colección de Muestras",
      status: "in-progress",
      date: "Enero 2024 - Marzo 2024",
      description:
        "Recolección de aislados de Fusarium oxysporum f. sp. cubense Raza 4 de diferentes regiones del Perú",
    },
    {
      id: 2,
      title: "Aislamiento y Purificación",
      status: "pending",
      date: "Abril 2024 - Mayo 2024",
      description: "Aislamiento en medio selectivo y purificación de cultivos monospóricos",
    },
    {
      id: 3,
      title: "Identificación Molecular",
      status: "pending",
      date: "Junio 2024 - Julio 2024",
      description: "Confirmación de identidad mediante secuenciación de genes marcadores",
    },
    {
      id: 4,
      title: "Extracción de ADN Genómico",
      status: "pending",
      date: "Agosto 2024",
      description: "Extracción de ADN de alta calidad para secuenciación de genoma completo",
    },
    {
      id: 5,
      title: "Preparación de Librerías",
      status: "pending",
      date: "Septiembre 2024",
      description: "Preparación de librerías de secuenciación para plataformas NGS",
    },
    {
      id: 6,
      title: "Secuenciación NGS",
      status: "pending",
      date: "Octubre 2024 - Noviembre 2024",
      description: "Secuenciación masiva del genoma completo usando tecnología Illumina",
    },
    {
      id: 7,
      title: "Ensamblaje del Genoma",
      status: "pending",
      date: "Diciembre 2024 - Enero 2025",
      description: "Ensamblaje de novo y refinamiento del genoma de referencia",
    },
    {
      id: 8,
      title: "Anotación Funcional",
      status: "pending",
      date: "Febrero 2025 - Marzo 2025",
      description: "Predicción y anotación de genes, identificación de factores de virulencia",
    },
    {
      id: 9,
      title: "Análisis Comparativo",
      status: "pending",
      date: "Abril 2025 - Mayo 2025",
      description: "Comparación con genomas de otras razas y especies de Fusarium",
    },
    {
      id: 10,
      title: "Análisis Filogenético",
      status: "pending",
      date: "Junio 2025",
      description: "Construcción de árboles filogenéticos y análisis evolutivo",
    },
    {
      id: 11,
      title: "Redacción de Tesis",
      status: "pending",
      date: "Julio 2025 - Agosto 2025",
      description: "Redacción final de la tesis y preparación de manuscritos para publicación",
    },
  ]

  const methodologies = [
    {
      title: "Secuenciación de Nueva Generación (NGS)",
      description:
        "Utilizaremos tecnología Illumina NovaSeq 6000 para obtener lecturas paired-end de 150 bp con cobertura mínima de 100X",
      icon: <Dna className="h-6 w-6" />,
    },
    {
      title: "Ensamblaje de Genoma de Novo",
      description:
        "Implementación de algoritmos híbridos usando SPAdes, Canu y HGAP para obtener un ensamblaje de alta calidad",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Anotación Funcional Automatizada",
      description:
        "Pipeline bioinformático con MAKER, Augustus y GeneMark para predicción génica y anotación funcional",
      icon: <Cpu className="h-6 w-6" />,
    },
    {
      title: "Análisis Comparativo de Genomas",
      description: "Comparación sinténica usando MUMmer, progressiveMauve y análisis de ortología con OrthoFinder",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      title: "Identificación de Factores de Virulencia",
      description: "Búsqueda de genes de virulencia usando bases de datos PHI-base, VFDB y análisis de efectores",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Análisis Filogenético Molecular",
      description: "Construcción de filogenias usando máxima verosimilitud con RAxML y análisis bayesiano con MrBayes",
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ]

  const technicalSpecs = [
    {
      category: "Secuenciación",
      items: [
        "Plataforma: Illumina NovaSeq 6000",
        "Tipo de lecturas: Paired-end 150 bp",
        "Cobertura objetivo: &gt;100X",
        "Tamaño estimado del genoma: ~60 Mb",
      ],
    },
    {
      category: "Bioinformática",
      items: [
        "Servidor de cómputo: 64 cores, 512 GB RAM",
        "Almacenamiento: 50 TB NAS RAID",
        "Software: Galaxy, QIIME2, R/Bioconductor",
        "Bases de datos: NCBI, UniProt, KEGG, GO",
      ],
    },
  ]

  const expectedResults = [
    {
      title: "Genoma de Referencia Completo",
      description: "Genoma ensamblado de alta calidad con &gt;95% de completitud y N50 &gt;1 Mb",
      metric: "Calidad: &gt;Q30",
    },
    {
      title: "Catálogo de Genes Anotados",
      description: "Identificación y anotación funcional de ~18,000 genes predichos",
      metric: "Genes: ~18K",
    },
    {
      title: "Factores de Virulencia",
      description: "Identificación de genes relacionados con patogenicidad y virulencia",
      metric: "Efectores: &gt;200",
    },
    {
      title: "Análisis Evolutivo",
      description: "Relaciones filogenéticas con otras especies de Fusarium oxysporum",
      metric: "Especies: &gt;50",
    },
  ]

  const teamMembers = [
    {
      name: "Guevara Escobar Antonio Victor",
      role: "Tesista",
      specialization: "Genética",
      email: "avguevaraes@unitru.edu.pe",
      responsibilities: "Trabajo de laboratorio, extracción de ADN, análisis bioinformático",
    },
    {
      name: "Guevara Nuñez Hellem Iveth",
      role: "Tesista",
      specialization: "Genética",
      email: "",
      responsibilities: "Aislamiento de patógenos, caracterización molecular, análisis filogenético",
    },
  ]

  const collaborations = [
    {
      institution: "Universidad Nacional de Trujillo",
      department: "Facultad de Ciencias Biológicas",
      contribution: "Supervisión académica y acceso a laboratorios especializados",
    },
    {
      institution: "SENASA Perú",
      department: "Servicio Nacional de Sanidad Agraria",
      contribution: "Provisión de aislados certificados y datos epidemiológicos",
    },
    {
      institution: "INIA Perú",
      department: "Instituto Nacional de Innovación Agraria",
      contribution: "Colaboración en colección de muestras de campo",
    },
    {
      institution: "Macrogen Inc.",
      department: "Servicios de Secuenciación",
      contribution: "Servicios de secuenciación NGS y soporte técnico",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Proyecto de Investigación SGF-015</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Secuenciación del Genoma de
              <span className="block text-yellow-300">Fusarium oxysporum f. sp. cubense Raza 4</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Proyecto pionero de secuenciación genómica completa del patógeno causante de la enfermedad de Panamá en
              cultivos de banano
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Trujillo, La Libertad, Perú</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Enero 2024 - Agosto 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>2 Tesistas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              Progreso del Proyecto
            </CardTitle>
            <CardDescription>Estado actual: Colección de muestras - {projectProgress}% completado</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={projectProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">20 meses</div>
                <div className="text-sm text-gray-600">Duración total</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3 meses</div>
                <div className="text-sm text-gray-600">Tiempo transcurrido</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">17 meses</div>
                <div className="text-sm text-gray-600">Tiempo restante</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="methodology">Metodología</TabsTrigger>
            <TabsTrigger value="timeline">Cronograma</TabsTrigger>
            <TabsTrigger value="technical">Técnico</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-600" />
                    Objetivos del Proyecto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Objetivo General</h4>
                    <p className="text-gray-700">
                      Secuenciar, ensamblar y anotar el genoma completo de Fusarium oxysporum f. sp. cubense Raza 4 para
                      identificar factores de virulencia y desarrollar estrategias de control molecular.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Objetivos Específicos</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        Obtener un genoma de referencia de alta calidad con cobertura &gt;100X
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        Identificar y anotar genes relacionados con patogenicidad
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        Realizar análisis comparativo con otras razas de F. oxysporum
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        Establecer relaciones filogenéticas y evolutivas
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    Importancia del Proyecto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Impacto Económico</h4>
                    <p className="text-gray-700">
                      La enfermedad de Panamá causa pérdidas millonarias en la industria bananera mundial. Este proyecto
                      contribuirá al desarrollo de estrategias de control más efectivas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Contribución Científica</h4>
                    <p className="text-gray-700">
                      Será el primer genoma de F. oxysporum f. sp. cubense Raza 4 secuenciado en Perú, aportando
                      información valiosa sobre la diversidad genética local del patógeno.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Aplicaciones Futuras</h4>
                    <p className="text-gray-700">
                      Los datos genómicos permitirán desarrollar marcadores moleculares para diagnóstico rápido y
                      estrategias de mejoramiento genético para resistencia.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  Antecedentes y Justificación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    <strong>Fusarium oxysporum</strong> f. sp. <strong>cubense</strong> Raza 4 Tropical (Foc R4T) es el
                    agente causal de la enfermedad de Panamá, una de las enfermedades más devastadoras del cultivo de
                    banano a nivel mundial. Esta raza patogénica ha causado la destrucción de plantaciones enteras en
                    Asia y se ha expandido recientemente a América Latina, representando una amenaza crítica para la
                    seguridad alimentaria global.
                  </p>
                  <p className="mb-4">
                    En Perú, el cultivo de banano es de gran importancia económica, especialmente en las regiones de
                    Piura y La Libertad, donde se concentra la mayor producción para exportación. La presencia
                    confirmada de Foc R4T en el país hace urgente el desarrollo de herramientas moleculares para su
                    detección, caracterización y control.
                  </p>
                  <p>
                    La secuenciación del genoma completo de aislados peruanos de Foc R4T proporcionará información
                    fundamental sobre la estructura genética, factores de virulencia y mecanismos de patogenicidad
                    específicos de las poblaciones locales, contribuyendo al desarrollo de estrategias de manejo
                    integrado más efectivas y sostenibles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {methodologies.map((method, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {method.icon}
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-6 w-6 text-blue-600" />
                  Pipeline Bioinformático
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Control de Calidad</h4>
                      <p className="text-sm text-gray-600">FastQC, Trimmomatic, MultiQC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Ensamblaje</h4>
                      <p className="text-sm text-gray-600">SPAdes, Canu, QUAST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Anotación</h4>
                      <p className="text-sm text-gray-600">MAKER, Augustus, InterProScan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Análisis Comparativo</h4>
                      <p className="text-sm text-gray-600">OrthoFinder, MUMmer, Circos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Cronograma Detallado del Proyecto
                </CardTitle>
                <CardDescription>
                  Hitos principales y actividades programadas para 20 meses de investigación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-start gap-4 p-4 rounded-lg border-l-4 border-l-blue-500 bg-gray-50"
                    >
                      <div className="flex-shrink-0">
                        {milestone.status === "completed" && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                        {milestone.status === "in-progress" && <Clock className="h-6 w-6 text-blue-500" />}
                        {milestone.status === "pending" && <AlertCircle className="h-6 w-6 text-gray-400" />}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                          <Badge
                            variant={
                              milestone.status === "completed"
                                ? "default"
                                : milestone.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {milestone.status === "completed"
                              ? "Completado"
                              : milestone.status === "in-progress"
                                ? "En Progreso"
                                : "Pendiente"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                        <p className="text-xs text-blue-600 font-medium">{milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {technicalSpecs.map((spec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-6 w-6 text-blue-600" />
                      Especificaciones {spec.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spec.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-purple-600" />
                  Herramientas y Software Especializado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "Galaxy", category: "Plataforma", description: "Análisis bioinformático" },
                    { name: "SPAdes", category: "Ensamblaje", description: "Ensamblador de genomas" },
                    { name: "MAKER", category: "Anotación", description: "Pipeline de anotación" },
                    { name: "OrthoFinder", category: "Comparativo", description: "Análisis de ortología" },
                    { name: "RAxML", category: "Filogenética", description: "Máxima verosimilitud" },
                    { name: "InterProScan", category: "Funcional", description: "Dominios proteicos" },
                    { name: "BLAST+", category: "Búsqueda", description: "Alineamiento local" },
                    { name: "Circos", category: "Visualización", description: "Gráficos circulares" },
                  ].map((tool, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                      <p className="text-xs text-blue-600 mb-1">{tool.category}</p>
                      <p className="text-xs text-gray-600">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                      {member.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <Badge variant="secondary">{member.role}</Badge>
                      <span className="text-sm">Especialización: {member.specialization}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">{member.responsibilities}</p>
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                          {member.email}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-6 w-6 text-green-600" />
                  Colaboraciones Institucionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collaborations.map((collab, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">{collab.institution}</h4>
                      <p className="text-sm text-blue-600 mb-2">{collab.department}</p>
                      <p className="text-sm text-gray-700">{collab.contribution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                  Financiamiento y Recursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">AS LABORATORIOS</div>
                    <div className="text-sm text-gray-600">Financiamiento Principal</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$25,000</div>
                    <div className="text-sm text-gray-600">Presupuesto Total</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">20 meses</div>
                    <div className="text-sm text-gray-600">Duración del Proyecto</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expectedResults.map((result, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-6 w-6 text-green-600" />
                      {result.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{result.description}</p>
                    <Badge variant="outline" className="text-blue-600">
                      {result.metric}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                  Productos Esperados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Tesis de Grado</h4>
                    <p className="text-blue-800">
                      Documento de tesis completo con metodología, resultados y discusión del proyecto de secuenciación
                      genómica
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Publicación Científica</h4>
                    <p className="text-green-800">
                      Manuscrito para revista indexada con los hallazgos principales del genoma de F. oxysporum f. sp.
                      cubense R4T
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Base de Datos Genómica</h4>
                    <p className="text-purple-800">
                      Depósito del genoma ensamblado y anotado en bases de datos públicas (NCBI GenBank)
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Herramientas Moleculares</h4>
                    <p className="text-orange-800">
                      Desarrollo de primers específicos y marcadores moleculares para diagnóstico del patógeno
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Impacto Esperado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    Este proyecto representa un hito importante en la investigación genómica de fitopatógenos en Perú y
                    contribuirá significativamente al conocimiento científico sobre Fusarium oxysporum f. sp. cubense
                    Raza 4.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Microscope className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-blue-900">Científico</h4>
                      <p className="text-sm text-blue-800">Primer genoma peruano de Foc R4T</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-green-900">Aplicado</h4>
                      <p className="text-sm text-green-800">Herramientas de diagnóstico molecular</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-900">Académico</h4>
                      <p className="text-sm text-purple-800">Formación de recursos humanos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-blue-600" />
              Información de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Institución Principal</h4>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    AS Laboratorios
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Trujillo, La Libertad, Perú
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    info@aslaboratorios.com
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contacto del Proyecto</h4>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Tesistas: Antonio Victor Guevara Escobar, Hellem Iveth Guevara Nuñez
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    avguevaraes@unitru.edu.pe
                  </p>
                  <p className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Universidad Nacional de Trujillo
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
