"use client"

import { useState } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import {
  Leaf,
  Shield,
  Phone,
  MessageCircle,
  FlaskConical,
  Sprout,
  Apple,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Calculator,
  BarChart3,
  Target,
  Zap,
  FileText,
  X,
  Thermometer,
  Droplets,
  Sun,
  Calendar,
  Award,
  Activity,
  TreePine,
  Wheat,
  Cherry,
} from "lucide-react"

interface TechnicalData {
  climate: string
  soil: string
  irrigation: string
  fertilization: string
  spacing: string
  maintenance: string
  harvest: string
  storage: string
  diseases: string[]
  benefits: string[]
}

interface Plantin {
  id: string
  name: string
  category: string
  description: string
  features: string[]
  available: boolean
  isResearch?: boolean
  icon: any
  image?: string
  price?: string
  yield?: string
  harvestTime?: string
  profitability?: string
  resistance?: string[]
  technicalData?: TechnicalData
}

const plantines: Plantin[] = [
  // Bananos - Todos a S/. 4.50
  {
    id: "banano-cavendish",
    name: "Banano Cavendish Valery",
    category: "Bananos",
    description: "Variedad comercial de alta productividad y excelente calidad de fruto para exportación.",
    features: ["Alta productividad", "Resistente a vientos", "Fruto de calidad comercial", "Ideal para exportación"],
    available: true,
    icon: Leaf,
    image: "/biotecnologia-vegetal.png",
    price: "S/. 4.50",
    yield: "40-50 ton/ha",
    harvestTime: "12-14 meses",
    profitability: "Alta",
    resistance: ["Vientos fuertes", "Sequías moderadas"],
    technicalData: {
      climate: "Tropical húmedo, temperatura 26-30°C",
      soil: "Franco-arcilloso, pH 6.0-7.5, bien drenado",
      irrigation: "1,200-1,500 mm anuales, riego por goteo recomendado",
      fertilization: "NPK 15-15-15, aplicación cada 3 meses",
      spacing: "2.5m x 2.5m (1,600 plantas/ha)",
      maintenance: "Deshoje mensual, control de malezas, tutorado",
      harvest: "Racimos de 18-22 kg, corte cuando dedos están llenos",
      storage: "Temperatura 13-15°C, humedad 85-90%",
      diseases: ["Sigatoka negra", "Mal de Panamá", "Nematodos"],
      benefits: ["Alto contenido de potasio", "Rica en vitaminas B6 y C", "Fibra dietética"],
    },
  },
  {
    id: "banano-williams",
    name: "Banano Williams",
    category: "Bananos",
    description: "Variedad tradicional con excelente sabor y gran adaptabilidad a diferentes climas.",
    features: ["Sabor excepcional", "Buena adaptabilidad", "Ciclo productivo estable", "Mercado establecido"],
    available: true,
    icon: Leaf,
    price: "S/. 4.50",
    yield: "35-45 ton/ha",
    harvestTime: "11-13 meses",
    profitability: "Media-Alta",
    resistance: ["Cambios climáticos", "Suelos diversos"],
    technicalData: {
      climate: "Tropical y subtropical, temperatura 24-28°C",
      soil: "Franco-limoso, pH 5.5-7.0, drenaje moderado",
      irrigation: "1,000-1,300 mm anuales, tolerante a sequía",
      fertilization: "NPK 12-12-17, aplicación bimensual",
      spacing: "2.0m x 2.0m (2,500 plantas/ha)",
      maintenance: "Poda de hijuelos, fertilización regular",
      harvest: "Racimos de 15-20 kg, maduración uniforme",
      storage: "Temperatura 12-14°C, ventilación adecuada",
      diseases: ["Antracnosis", "Pudrición de corona"],
      benefits: ["Sabor dulce intenso", "Textura cremosa", "Larga vida útil"],
    },
  },
  {
    id: "baby-banano",
    name: "Baby Banano",
    category: "Bananos",
    description: "Banano de tamaño pequeño con alto valor comercial y demanda creciente en mercados premium.",
    features: ["Tamaño compacto", "Dulzor concentrado", "Alto valor comercial", "Demanda premium"],
    available: true,
    icon: Leaf,
    price: "S/. 4.50",
    yield: "25-35 ton/ha",
    harvestTime: "10-12 meses",
    profitability: "Muy Alta",
    resistance: ["Plagas comunes", "Enfermedades foliares"],
    technicalData: {
      climate: "Tropical cálido, temperatura 27-32°C",
      soil: "Franco-arenoso, pH 6.0-7.0, excelente drenaje",
      irrigation: "800-1,200 mm anuales, riego controlado",
      fertilization: "NPK 10-10-10 + micronutrientes",
      spacing: "1.5m x 1.5m (4,400 plantas/ha)",
      maintenance: "Control de densidad, poda selectiva",
      harvest: "Racimos de 8-12 kg, dedos de 8-10 cm",
      storage: "Temperatura 14-16°C, empaque especializado",
      diseases: ["Trips", "Cochinilla"],
      benefits: ["Alto contenido de azúcar", "Ideal para niños", "Snack saludable"],
    },
  },
  {
    id: "banano-tailandes",
    name: "Banano Tailandés",
    category: "Bananos",
    description: "Variedad exótica con características únicas, perfecta para mercados especializados.",
    features: ["Sabor único", "Textura especial", "Variedad exótica", "Nicho de mercado"],
    available: true,
    icon: Leaf,
    price: "S/. 4.50",
    yield: "30-40 ton/ha",
    harvestTime: "12-15 meses",
    profitability: "Muy Alta",
    resistance: ["Hongos", "Bacterias"],
    technicalData: {
      climate: "Tropical húmedo, temperatura 25-29°C",
      soil: "Rico en materia orgánica, pH 6.5-7.5",
      irrigation: "1,400-1,800 mm anuales, humedad constante",
      fertilization: "Fertilización orgánica + NPK 14-14-14",
      spacing: "2.0m x 2.5m (2,000 plantas/ha)",
      maintenance: "Manejo orgánico, control biológico",
      harvest: "Racimos de 12-18 kg, sabor aromático",
      storage: "Temperatura 13-15°C, maduración controlada",
      diseases: ["Resistente a Sigatoka", "Tolerante a virus"],
      benefits: ["Propiedades antioxidantes", "Sabor exótico", "Textura única"],
    },
  },
  {
    id: "banano-fusarium",
    name: "Banano Fusarium Resistente",
    category: "Bananos",
    description: "Revolución genética: banano completamente resistente a Fusarium R4T, el futuro de la bananicultura.",
    features: ["100% Resistente a Fusarium", "Tecnología de vanguardia", "Proyecto revolucionario", "Futuro asegurado"],
    available: false,
    isResearch: true,
    icon: FlaskConical,
    price: "En desarrollo",
    yield: "50-60 ton/ha (proyectado)",
    harvestTime: "11-13 meses (proyectado)",
    profitability: "Revolucionaria",
    resistance: ["Fusarium R4T", "Múltiples patógenos"],
    technicalData: {
      climate: "Adaptable a múltiples climas tropicales",
      soil: "Tolerante a suelos infectados con Fusarium",
      irrigation: "Eficiente uso del agua, 1,000-1,400 mm",
      fertilization: "Optimizada para máxima resistencia",
      spacing: "2.5m x 2.5m (1,600 plantas/ha)",
      maintenance: "Mínimo uso de fungicidas",
      harvest: "Proyectado: racimos de 20-25 kg",
      storage: "Vida útil extendida",
      diseases: ["Inmune a Fusarium R4T", "Resistente a Sigatoka"],
      benefits: ["Sostenibilidad ambiental", "Seguridad alimentaria", "Innovación genética"],
    },
  },
  // Plátanos - A cotizar
  {
    id: "platano-rojo",
    name: "Plátano Rojo",
    category: "Plátanos",
    description: "Plátano de coloración rojiza con alto contenido nutricional y excelente precio de mercado.",
    features: ["Color distintivo", "Alto valor nutricional", "Resistente a plagas", "Precio premium"],
    available: true,
    icon: TreePine,
    price: "A cotizar",
    yield: "20-30 ton/ha",
    harvestTime: "14-16 meses",
    profitability: "Alta",
    resistance: ["Plagas foliares", "Nematodos"],
    technicalData: {
      climate: "Tropical cálido, temperatura 26-30°C",
      soil: "Franco-arcilloso, rico en hierro, pH 6.0-7.0",
      irrigation: "1,200-1,600 mm anuales, drenaje excelente",
      fertilization: "NPK 15-5-20 + hierro quelado",
      spacing: "3.0m x 3.0m (1,100 plantas/ha)",
      maintenance: "Control de hijuelos, fertilización rica en hierro",
      harvest: "Racimos de 15-25 kg, coloración rojiza intensa",
      storage: "Temperatura 12-14°C, evitar golpes",
      diseases: ["Antracnosis", "Pudrición bacteriana"],
      benefits: ["Alto contenido de antocianinas", "Propiedades antioxidantes", "Rico en hierro"],
    },
  },
  {
    id: "platano-malayo",
    name: "Plátano Malayo",
    category: "Plátanos",
    description: "Variedad de origen asiático con excelente adaptación y alta productividad comercial.",
    features: ["Origen asiático", "Adaptación tropical", "Productividad alta", "Resistencia natural"],
    available: true,
    icon: TreePine,
    price: "A cotizar",
    yield: "25-35 ton/ha",
    harvestTime: "13-15 meses",
    profitability: "Media-Alta",
    resistance: ["Clima tropical", "Humedad alta"],
    technicalData: {
      climate: "Tropical húmedo, temperatura 24-28°C",
      soil: "Franco-limoso, pH 5.5-6.5, bien drenado",
      irrigation: "1,300-1,700 mm anuales, tolerante a humedad",
      fertilization: "NPK 12-12-17 + materia orgánica",
      spacing: "2.5m x 3.0m (1,300 plantas/ha)",
      maintenance: "Poda regular, control de densidad",
      harvest: "Racimos de 18-28 kg, frutos grandes",
      storage: "Temperatura 13-15°C, ventilación natural",
      diseases: ["Sigatoka amarilla", "Virus del mosaico"],
      benefits: ["Textura firme", "Sabor suave", "Versatilidad culinaria"],
    },
  },
  {
    id: "platano-azul",
    name: "Plátano Azul",
    category: "Plátanos",
    description: "Variedad única con tonalidades azuladas, perfecta para mercados gourmet y restaurantes.",
    features: ["Coloración única", "Sabor distintivo", "Variedad rara", "Mercado gourmet"],
    available: true,
    icon: TreePine,
    price: "A cotizar",
    yield: "18-25 ton/ha",
    harvestTime: "15-17 meses",
    profitability: "Muy Alta",
    resistance: ["Enfermedades comunes", "Estrés hídrico"],
    technicalData: {
      climate: "Tropical moderado, temperatura 22-26°C",
      soil: "Rico en minerales, pH 6.0-7.0, drenaje perfecto",
      irrigation: "1,000-1,400 mm anuales, riego controlado",
      fertilization: "NPK 10-10-10 + micronutrientes especiales",
      spacing: "2.0m x 2.5m (2,000 plantas/ha)",
      maintenance: "Manejo especializado, control de calidad",
      harvest: "Racimos de 10-18 kg, coloración azul-violeta",
      storage: "Temperatura 14-16°C, empaque premium",
      diseases: ["Resistente a la mayoría de patógenos"],
      benefits: ["Antocianinas únicas", "Sabor exótico", "Alto valor gourmet"],
    },
  },
  // Otros cultivos - A cotizar
  {
    id: "pina-golden",
    name: "Piña Golden",
    category: "Otros Cultivos",
    description: "Piña de variedad dorada con dulzor excepcional, perfecta para exportación y jugos premium.",
    features: ["Dulzor excepcional", "Alta jugosidad", "Calidad premium", "Exportación"],
    available: true,
    icon: Apple,
    price: "A cotizar",
    yield: "60-80 ton/ha",
    harvestTime: "18-20 meses",
    profitability: "Alta",
    resistance: ["Pudrición del corazón", "Cochinilla"],
    technicalData: {
      climate: "Tropical seco, temperatura 24-30°C",
      soil: "Franco-arenoso, pH 4.5-6.5, drenaje excelente",
      irrigation: "800-1,200 mm anuales, riego por goteo",
      fertilization: "NPK 12-4-12 + boro y zinc",
      spacing: "1.2m x 0.3m (25,000 plantas/ha)",
      maintenance: "Control de malezas, aplicación de hormonas",
      harvest: "Frutos de 1.5-2.5 kg, color dorado intenso",
      storage: "Temperatura 7-13°C, humedad 85-90%",
      diseases: ["Pudrición negra", "Cochinilla harinosa"],
      benefits: ["Alto contenido de vitamina C", "Enzimas digestivas", "Bromelina natural"],
    },
  },
  {
    id: "pitahaya",
    name: "Pitahaya",
    category: "Otros Cultivos",
    description: "Fruta del dragón con demanda explosiva en mercados internacionales y precios excepcionales.",
    features: ["Alto valor comercial", "Propiedades nutricionales", "Demanda creciente", "Superfruit"],
    available: true,
    icon: Cherry,
    price: "A cotizar",
    yield: "15-25 ton/ha",
    harvestTime: "24-30 meses",
    profitability: "Excepcional",
    resistance: ["Sequías", "Temperaturas extremas"],
    technicalData: {
      climate: "Tropical seco, temperatura 18-26°C",
      soil: "Cactáceo, pH 6.0-7.5, drenaje perfecto",
      irrigation: "600-1,000 mm anuales, resistente a sequía",
      fertilization: "NPK 8-8-8 + calcio y magnesio",
      spacing: "3.0m x 3.0m (1,100 plantas/ha)",
      maintenance: "Poda de formación, tutorado en espaldera",
      harvest: "Frutos de 300-600g, pulpa blanca o roja",
      storage: "Temperatura 10-15°C, vida útil 2-3 semanas",
      diseases: ["Antracnosis", "Pudrición bacteriana"],
      benefits: ["Antioxidantes naturales", "Bajo en calorías", "Rico en vitamina C"],
    },
  },
  {
    id: "fresa",
    name: "Fresa",
    category: "Otros Cultivos",
    description: "Fresas de alta calidad con producción continua y resistencia superior a enfermedades.",
    features: ["Alta calidad", "Resistente a enfermedades", "Producción continua", "Ciclo corto"],
    available: true,
    icon: Sprout,
    price: "A cotizar",
    yield: "40-60 ton/ha",
    harvestTime: "4-6 meses",
    profitability: "Muy Alta",
    resistance: ["Botrytis", "Antracnosis", "Ácaros"],
    technicalData: {
      climate: "Templado frío, temperatura 15-25°C",
      soil: "Franco-arenoso, pH 5.5-6.5, rico en materia orgánica",
      irrigation: "400-600 mm anuales, riego por goteo",
      fertilization: "NPK 10-10-10 + calcio y boro",
      spacing: "0.3m x 0.3m (110,000 plantas/ha)",
      maintenance: "Deshoje, control de estolones, mulching",
      harvest: "Frutos de 15-25g, cosecha cada 2-3 días",
      storage: "Temperatura 0-2°C, humedad 90-95%",
      diseases: ["Botrytis cinerea", "Antracnosis", "Oidium"],
      benefits: ["Alto contenido de vitamina C", "Antioxidantes", "Ácido fólico"],
    },
  },
]

const categories = ["Todos", "Bananos", "Plátanos", "Otros Cultivos"]

export default function PlantinesClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [selectedPlantin, setSelectedPlantin] = useState<Plantin | null>(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showTechnicalSheet, setShowTechnicalSheet] = useState(false)
  const [selectedTechnicalData, setSelectedTechnicalData] = useState<Plantin | null>(null)
  const [hectareas, setHectareas] = useState(5)

  const filteredPlantines =
    selectedCategory === "Todos" ? plantines : plantines.filter((plantin) => plantin.category === selectedCategory)

  const handleWhatsAppContact = (plantinName: string) => {
    const message = `🌱 Hola AS Laboratorios! Estoy interesado en ${plantinName}. ¿Podrían proporcionarme información detallada sobre precios, disponibilidad y asesoría técnica? Soy agricultor y busco mejorar mi producción.`
    const whatsappUrl = `https://walink.co/0441cf?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleTechnicalSheet = (plantin: Plantin) => {
    setSelectedTechnicalData(plantin)
    setShowTechnicalSheet(true)
  }

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case "Excepcional":
        return "text-purple-600 bg-purple-100"
      case "Revolucionaria":
        return "text-indigo-600 bg-indigo-100"
      case "Muy Alta":
        return "text-green-600 bg-green-100"
      case "Alta":
        return "text-emerald-600 bg-emerald-100"
      case "Media-Alta":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* Modal de Ficha Técnica */}
      {showTechnicalSheet && selectedTechnicalData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <selectedTechnicalData.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Ficha Técnica</h2>
                    <p className="text-emerald-100 text-sm">{selectedTechnicalData.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTechnicalSheet(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Información General */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      Información General
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoría:</span>
                        <span className="font-medium">{selectedTechnicalData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rendimiento:</span>
                        <span className="font-medium text-emerald-600">{selectedTechnicalData.yield}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiempo de cosecha:</span>
                        <span className="font-medium">{selectedTechnicalData.harvestTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rentabilidad:</span>
                        <span
                          className={`font-medium px-2 py-1 rounded text-xs ${getProfitabilityColor(selectedTechnicalData.profitability || "")}`}
                        >
                          {selectedTechnicalData.profitability}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Condiciones de Cultivo */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      Condiciones de Cultivo
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Thermometer className="w-3 h-3 text-red-500" />
                          <span className="font-medium text-gray-700">Clima:</span>
                        </div>
                        <p className="text-gray-600 text-xs">{selectedTechnicalData.technicalData?.climate}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Leaf className="w-3 h-3 text-green-500" />
                          <span className="font-medium text-gray-700">Suelo:</span>
                        </div>
                        <p className="text-gray-600 text-xs">{selectedTechnicalData.technicalData?.soil}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span className="font-medium text-gray-700">Riego:</span>
                        </div>
                        <p className="text-gray-600 text-xs">{selectedTechnicalData.technicalData?.irrigation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manejo Agronómico */}
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Manejo Agronómico
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Fertilización:</span>
                        <p className="text-gray-600 text-xs mt-1">
                          {selectedTechnicalData.technicalData?.fertilization}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Distanciamiento:</span>
                        <p className="text-gray-600 text-xs mt-1">{selectedTechnicalData.technicalData?.spacing}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Mantenimiento:</span>
                        <p className="text-gray-600 text-xs mt-1">{selectedTechnicalData.technicalData?.maintenance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Cosecha y Postcosecha
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Cosecha:</span>
                        <p className="text-gray-600 text-xs mt-1">{selectedTechnicalData.technicalData?.harvest}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Almacenamiento:</span>
                        <p className="text-gray-600 text-xs mt-1">{selectedTechnicalData.technicalData?.storage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resistencias y Beneficios */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Enfermedades Principales
                  </h3>
                  <div className="space-y-2">
                    {selectedTechnicalData.technicalData?.diseases.map((disease, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <span className="text-gray-700 text-xs">{disease}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Apple className="w-5 h-5" />
                    Beneficios Nutricionales
                  </h3>
                  <div className="space-y-2">
                    {selectedTechnicalData.technicalData?.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span className="text-gray-700 text-xs">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleWhatsAppContact(selectedTechnicalData.name)}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Solicitar Cotización
                </button>
                <button
                  onClick={() => setShowTechnicalSheet(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
                >
                  Cerrar
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-xs">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Importante - Verificación Técnica</h4>
                    <p className="text-yellow-700 text-xs leading-relaxed">
                      Los datos deben ser verificados por nuestros especialistas antes de aplicarlos en campo.
                      Cada zona agrícola tiene condiciones específicas que pueden requerir ajustes en las
                      recomendaciones técnicas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section Profesional - Layout Texto + Calculadora */}
      <section className="relative bg-white py-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            
            {/* Panel Izquierdo - TEXTO */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <FlaskConical className="w-4 h-4" />
                Biotecnología Vegetal de Vanguardia
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                Plantines de <span className="text-emerald-600">Elite Genética</span>
                <br />para Agricultura Profesional
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Desarrollados con tecnología in vitro de vanguardia para maximizar tu productividad agrícola. 
                Libres de plagas, alta resistencia y rendimientos superiores garantizados.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-xs">Mayor Productividad</h3>
                  <p className="text-xs text-gray-600">Hasta {Math.round(((20 - 14) / 14) * 100)}% más rendimiento</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-xs">100% Libres de Plagas</h3>
                  <p className="text-xs text-gray-600">Tecnología in vitro</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-xs">ROI Garantizado</h3>
                  <p className="text-xs text-gray-600">Inversión rentable</p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => handleWhatsAppContact("información completa sobre plantines premium")}
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Asesoría Gratuita
                </button>
              </div>
            </div>

            {/* Panel Derecho - CALCULADORA */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4">
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculadora de Rentabilidad
                </h3>
                <p className="text-emerald-100 text-xs">Descubre cuánto más puedes ganar</p>
              </div>

              <div className="p-4 space-y-4">
                {/* Input de Hectáreas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ¿Cuántas hectáreas planeas cultivar?
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={hectareas}
                      onChange={(e) => setHectareas(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 text-xl font-bold text-center border-2 border-emerald-300 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors"
                      placeholder="5"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      hectáreas
                    </span>
                  </div>
                  
                  {/* Botones rápidos */}
                  <div className="flex gap-2 mt-3">
                    {[1, 5, 10, 20, 50].map((value) => (
                      <button
                        key={value}
                        onClick={() => setHectareas(value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          hectareas === value
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {value} ha
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comparación de Rendimientos */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">Comparación de Ingresos Anuales</h4>
                  
                  {/* Plantines Tradicionales */}
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-red-800">Plantines Tradicionales</span>
                      <span className="text-xs text-red-600">14 ton/ha</span>
                    </div>
                    <div className="text-lg font-bold text-red-700">
                      S/. {(hectareas * 14 * 2500).toLocaleString()}
                    </div>
                  </div>

                  {/* Plantines In Vitro */}
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-emerald-800">Plantines In Vitro AS Labs</span>
                      <span className="text-xs text-emerald-600">20 ton/ha</span>
                    </div>
                    <div className="text-lg font-bold text-emerald-700">
                      S/. {(hectareas * 20 * 2500).toLocaleString()}
                    </div>
                  </div>

                  {/* Ganancia Adicional */}
                  <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-300 text-center">
                    <div className="text-xs text-blue-800 mb-1">Ganancia Adicional</div>
                    <div className="text-xl font-bold text-blue-700">
                      +S/. {((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {Math.round(((20 - 14) / 14) * 100)}% más rentabilidad
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <button
                  onClick={() => handleWhatsAppContact(`¡Hola! He calculado que con ${hectareas} hectáreas puedo ganar S/. ${((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()} adicionales con sus plantines in vitro. Quiero más información.`)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Solicitar Cotización para {hectareas} hectáreas
                </button>

                {/* Disclaimer de estudios */}
                <div className="text-xs text-gray-500 text-center">
                  <p className="mb-2">Precio calculado estimado según los siguientes estudios:</p>
                  <div className="space-y-1">
                    <a 
                      href="https://www.fao.org/fileadmin/templates/ex_act/pdf/EXACT_VC/Case_study_Banana_organico_installacion_Peru.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-emerald-600 hover:text-emerald-700 underline"
                    >
                      FAO - Caso de estudio: Banano orgánico en Perú
                    </a>
                    <a 
                      href="https://www.musalit.org/viewPostPrint.php?file=IN130316_pp.pdf&id=14818" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-emerald-600 hover:text-emerald-700 underline"
                    >
                      Musalit.org - Estudio de rendimiento de banano
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de Rentabilidad Interactiva */}
      {showCalculator && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="text-center p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                <h2 className="text-2xl font-bold mb-2">Calculadora de Rentabilidad</h2>
                <p className="text-emerald-100">Descubre cuánto más puedes ganar con nuestros plantines in vitro</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Panel Izquierdo - Información y Control */}
                <div className="p-8 bg-gray-50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-600" />
                        Configura tu Cultivo
                      </h3>
                      
                      {/* Input de Hectáreas */}
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          ¿Cuántas hectáreas planeas cultivar?
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="1000"
                            value={hectareas}
                            onChange={(e) => setHectareas(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full px-4 py-3 text-xl font-bold text-center border-2 border-emerald-300 rounded-lg focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none transition-colors"
                            placeholder="5"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                            hectáreas
                          </span>
                        </div>
                        
                        {/* Botones rápidos */}
                        <div className="flex gap-2 mt-4">
                          {[1, 5, 10, 20, 50].map((value) => (
                            <button
                              key={value}
                              onClick={() => setHectareas(value)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                hectareas === value
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {value} ha
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Información de Rendimientos */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Rendimientos Promedio</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Plantines Tradicionales:</span>
                          <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">14 ton/ha</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Plantines In Vitro AS Labs:</span>
                          <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">20 ton/ha</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-medium">Diferencia:</span>
                            <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              +{20 - 14} ton/ha (+{Math.round(((20 - 14) / 14) * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel Derecho - Calculadora con Resultados */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    Proyección de Ingresos
                  </h3>

                  <div className="space-y-6">
                    {/* Plantines Tradicionales */}
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <h4 className="text-lg font-semibold text-red-800 mb-4">Plantines Tradicionales</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Hectáreas cultivadas:</span>
                          <span className="font-semibold">{hectareas} ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rendimiento:</span>
                          <span className="font-semibold">14 ton/ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Producción total:</span>
                          <span className="font-semibold">{hectareas * 14} toneladas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Precio por tonelada:</span>
                          <span className="font-semibold">S/. 2,500</span>
                        </div>
                        <hr className="border-red-200" />
                        <div className="flex justify-between text-lg font-bold text-red-700 bg-red-100 p-3 rounded">
                          <span>Ingreso anual:</span>
                          <span>S/. {(hectareas * 14 * 2500).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Plantines In Vitro */}
                    <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                      <h4 className="text-lg font-semibold text-emerald-800 mb-4">Plantines In Vitro AS Labs</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Hectáreas cultivadas:</span>
                          <span className="font-semibold">{hectareas} ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rendimiento:</span>
                          <span className="font-semibold text-emerald-600">20 ton/ha</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Producción total:</span>
                          <span className="font-semibold">{hectareas * 20} toneladas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Precio por tonelada:</span>
                          <span className="font-semibold">S/. 2,500</span>
                        </div>
                        <hr className="border-emerald-200" />
                        <div className="flex justify-between text-lg font-bold text-emerald-700 bg-emerald-100 p-3 rounded">
                          <span>Ingreso anual:</span>
                          <span>S/. {(hectareas * 20 * 2500).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Diferencia Final */}
                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                      <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Ganancia Adicional con AS Labs
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-lg font-bold text-blue-700">
                          <span>Ingresos adicionales:</span>
                          <span className="text-emerald-600">
                            +S/. {((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-center mt-4">
                          <span className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-xl">
                            {Math.round(((20 - 14) / 14) * 100)}% más rentabilidad
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gray-100 p-6 text-center border-t border-gray-200">
                <button
                  onClick={() => handleWhatsAppContact(`¡Hola! He calculado que con ${hectareas} hectáreas puedo ganar S/. ${((hectareas * 20 * 2500) - (hectareas * 14 * 2500)).toLocaleString()} adicionales con sus plantines in vitro. Quiero más información.`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors flex items-center gap-3 mx-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  Solicitar Cotización para {hectareas} hectáreas
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Catálogo de Plantines con mejor UX/UI y Menú Lateral */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header de la sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Plantines de Elite</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada plantín está desarrollado con tecnología in vitro de vanguardia, garantizando 
              la más alta calidad genética y resistencia para tu cultivo.
            </p>
          </div>

          <div className="flex gap-8 max-w-7xl mx-auto">
            {/* Menú Lateral - Filtros de Categorías */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Explora Nuestro Catálogo</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === category
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <span>{category}</span>
                      {selectedCategory === category && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Información adicional en el sidebar */}
                <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">¿Necesitas ayuda?</h4>
                  <p className="text-sm text-emerald-700 mb-3">
                    Nuestros especialistas están listos para asesorarte
                  </p>
                  <button
                    onClick={() => handleWhatsAppContact("asesoría especializada para elegir los mejores plantines")}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consulta Gratis
                  </button>
                </div>
              </div>
            </div>

            {/* Contenido Principal - Grid de Plantines */}
            <div className="flex-1">
              {/* Grid responsivo moderno */}
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-8">
                {filteredPlantines.map((plantin, index) => (
                  <div
                    key={plantin.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1"
                  >
                    {/* Imagen destacada */}
                    <div className="aspect-video relative bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden">
                      <Image
                        src={plantin.image || "/biotecnologia-vegetal.png"}
                        alt={plantin.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Badge de estado sobre la imagen */}
                      <div className="absolute top-4 right-4">
                        {plantin.isResearch && (
                          <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                            En Investigación
                          </span>
                        )}
                        {plantin.profitability && !plantin.isResearch && (
                          <span className={`text-xs font-medium px-3 py-1 rounded-full shadow-lg ${getProfitabilityColor(plantin.profitability)}`}>
                            {plantin.profitability}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Header con título y descripción */}
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        {/* Icono */}
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          plantin.isResearch
                            ? "bg-blue-500 text-white"
                            : plantin.id === "pitahaya"
                            ? "bg-purple-500 text-white"
                            : "bg-emerald-500 text-white"
                        } shadow-md`}>
                          <plantin.icon className="w-6 h-6" />
                        </div>
                        
                        {/* Título y categoría */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                            {plantin.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            {plantin.category}
                          </p>
                        </div>
                      </div>
                      
                      {/* Descripción */}
                      <p className="text-gray-600 text-sm leading-snug mb-4">
                        {plantin.description}
                      </p>

                      {/* Métricas en 2x2 para mejor distribución */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1 font-medium">Precio</div>
                          <div className="font-bold text-emerald-600 text-sm">{plantin.price}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1 font-medium">Rendimiento</div>
                          <div className="font-bold text-blue-600 text-sm">{plantin.yield}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1 font-medium">Cosecha</div>
                          <div className="font-bold text-purple-600 text-sm">{plantin.harvestTime}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500 mb-1 font-medium">Resistencias</div>
                          <div className="font-bold text-orange-600 text-sm">{plantin.resistance?.length || 0}+</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Características principales compactas */}
                    <div className="px-6 pb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Características Principales
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {plantin.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              plantin.isResearch 
                                ? "bg-blue-400" 
                                : plantin.id === "pitahaya"
                                ? "bg-purple-400"
                                : "bg-emerald-400"
                            }`}></div>
                            <span className="text-gray-700 text-xs font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resistencias destacadas (si existen) */}
                    {plantin.resistance && (
                      <div className="px-6 pb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 uppercase tracking-wide">
                          <Shield className="w-3 h-3 text-emerald-500" />
                          Resistencias
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {plantin.resistance.slice(0, 3).map((resistance, idx) => (
                            <span
                              key={idx}
                              className={`text-xs font-medium px-2 py-1 rounded-full border ${
                                plantin.id === "pitahaya"
                                  ? "bg-purple-100 text-purple-700 border-purple-200"
                                  : plantin.isResearch
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-emerald-100 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {resistance}
                            </span>
                          ))}
                          {plantin.resistance.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                              +{plantin.resistance.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Botones lado a lado - DISEÑO PROFESIONAL */}
                    <div className="px-6 pb-6">
                      <div className="flex gap-2">
                        {/* Botón principal */}
                        {plantin.available ? (
                          <button
                            onClick={() => handleWhatsAppContact(plantin.name)}
                            className={`flex-1 px-2 py-1.5 rounded-md font-medium transition-colors flex items-center justify-center gap-1 shadow-sm text-xs ${
                              plantin.id === "pitahaya"
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                            }`}
                          >
                            <MessageCircle className="w-3 h-3" />
                            Cotizar
                          </button>
                        ) : plantin.isResearch ? (
                          <a
                            href="/research/banano-baby"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded-md font-medium transition-colors text-center block shadow-sm text-xs"
                          >
                            Ver Investigación
                          </a>
                        ) : (
                          <button
                            disabled
                            className="flex-1 bg-gray-300 text-gray-500 px-2 py-1.5 rounded-md font-medium cursor-not-allowed text-xs"
                          >
                            No Disponible
                          </button>
                        )}

                        {/* Botón secundario */}
                        <button
                          onClick={() => handleTechnicalSheet(plantin)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-md font-medium transition-colors flex items-center justify-center gap-1 text-xs"
                        >
                          <FileText className="w-3 h-3" />
                          Ficha Técnica
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mensaje si no hay resultados */}
              {filteredPlantines.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Leaf className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron plantines</h3>
                  <p className="text-gray-500">Intenta seleccionar otra categoría</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final con mejor paleta de colores */}
      <section className="py-8 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white relative overflow-hidden">
        {/* Elementos decorativos sutiles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Título principal */}
            <div className="mb-8">
              <span className="inline-block bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Transforma tu Agricultura Hoy
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                ¿Listo para <span className="text-emerald-400 relative">
                  Maximizar
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400 rounded"></div>
                </span> tus Ganancias?
              </h2>
              <p className="text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Únete a más de <strong className="text-emerald-400">500+ agricultores exitosos</strong> que han 
                transformado sus cultivos con nuestros plantines de elite genética
              </p>
            </div>

            {/* Estadísticas destacadas */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">500+</div>
                <div className="text-lg opacity-90">Agricultores Exitosos</div>
                <div className="text-sm opacity-70 mt-2">Confiando en nuestra tecnología</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-400 mb-2">60%</div>
                <div className="text-lg opacity-90">Más Productividad</div>
                <div className="text-sm opacity-70 mt-2">Promedio vs plantines tradicionales</div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                <div className="text-lg opacity-90">Tasa de Supervivencia</div>
                <div className="text-sm opacity-70 mt-2">Tecnología in vitro comprobada</div>
              </div>
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
              <button
                onClick={() =>
                  handleWhatsAppContact(
                    "¡Hola! Quiero una consulta completa sobre plantines premium. Estoy listo para transformar mi agricultura y maximizar mis ganancias."
                  )
                }
                className="group bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">Asesoría VIP Gratuita</div>
                  <div className="text-sm opacity-80">Respuesta en menos de 5 minutos</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <div className="text-white/60">o</div>

              <a
                href="tel:+51999999999"
                className="group bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-4"
              >
                <Phone className="w-6 h-6 group-hover:animate-pulse" />
                <div className="text-left">
                  <div>Llamar Ahora</div>
                  <div className="text-sm opacity-70 group-hover:opacity-100">Línea directa</div>
                </div>
              </a>
            </div>

            {/* Garantías y beneficios */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">¿Por qué elegir AS Laboratorios?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Garantía Total</div>
                    <div className="text-sm opacity-80">100% de satisfacción garantizada</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Envío Nacional</div>
                    <div className="text-sm opacity-80">Llegamos a todo el Perú</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Soporte Técnico</div>
                    <div className="text-sm opacity-80">Asesoría especializada incluida</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
