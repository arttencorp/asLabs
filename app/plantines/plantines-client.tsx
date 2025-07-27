"use client"

import { useState } from "react"
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
    icon: Apple,
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
    icon: Apple,
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
    icon: Apple,
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
    icon: Apple,
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
    icon: Apple,
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
    icon: Apple,
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
    icon: Apple,
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
    icon: Apple,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-x-hidden">
      <Navbar />

      {/* Modal de Ficha Técnica */}
      {showTechnicalSheet && selectedTechnicalData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <selectedTechnicalData.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Ficha Técnica</h2>
                    <p className="text-green-100">{selectedTechnicalData.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTechnicalSheet(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Información General */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      <Activity className="w-6 h-6" />
                      Información General
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoría:</span>
                        <span className="font-semibold">{selectedTechnicalData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rendimiento:</span>
                        <span className="font-semibold text-green-600">{selectedTechnicalData.yield}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiempo de cosecha:</span>
                        <span className="font-semibold">{selectedTechnicalData.harvestTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rentabilidad:</span>
                        <span
                          className={`font-semibold px-3 py-1 rounded-full text-sm ${getProfitabilityColor(selectedTechnicalData.profitability || "")}`}
                        >
                          {selectedTechnicalData.profitability}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Condiciones de Cultivo */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                      <Sun className="w-6 h-6" />
                      Condiciones de Cultivo
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <span className="font-semibold text-gray-700">Clima:</span>
                        </div>
                        <p className="text-gray-600 text-sm">{selectedTechnicalData.technicalData?.climate}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-gray-700">Suelo:</span>
                        </div>
                        <p className="text-gray-600 text-sm">{selectedTechnicalData.technicalData?.soil}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold text-gray-700">Riego:</span>
                        </div>
                        <p className="text-gray-600 text-sm">{selectedTechnicalData.technicalData?.irrigation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manejo Agronómico */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                    <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6" />
                      Manejo Agronómico
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold text-gray-700">Fertilización:</span>
                        <p className="text-gray-600 text-sm mt-1">
                          {selectedTechnicalData.technicalData?.fertilization}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Distanciamiento:</span>
                        <p className="text-gray-600 text-sm mt-1">{selectedTechnicalData.technicalData?.spacing}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Mantenimiento:</span>
                        <p className="text-gray-600 text-sm mt-1">{selectedTechnicalData.technicalData?.maintenance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                    <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-6 h-6" />
                      Cosecha y Postcosecha
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="font-semibold text-gray-700">Cosecha:</span>
                        <p className="text-gray-600 text-sm mt-1">{selectedTechnicalData.technicalData?.harvest}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Almacenamiento:</span>
                        <p className="text-gray-600 text-sm mt-1">{selectedTechnicalData.technicalData?.storage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resistencias y Beneficios */}
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-100">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Enfermedades Principales
                  </h3>
                  <div className="space-y-2">
                    {selectedTechnicalData.technicalData?.diseases.map((disease, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{disease}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border border-green-100">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                    <Apple className="w-6 h-6" />
                    Beneficios Nutricionales
                  </h3>
                  <div className="space-y-2">
                    {selectedTechnicalData.technicalData?.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleWhatsAppContact(selectedTechnicalData.name)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Solicitar Cotización
                </button>
                <button
                  onClick={() => setShowTechnicalSheet(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-2">Importante - Verificación Técnica</h4>
                    <p className="text-yellow-700 text-sm leading-relaxed">
                      <strong>
                        Los datos deben ser verificados por nuestros especialistas antes de aplicarlos en campo.
                      </strong>
                      Cada zona agrícola tiene condiciones específicas que pueden requerir ajustes en las
                      recomendaciones técnicas. Contacta con nuestro equipo para una asesoría personalizada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Elementos decorativos animados mejorados */}
      {animationsEnabled && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Partículas flotantes más elegantes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-float opacity-30`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                background: `linear-gradient(45deg, ${
                  ["#10b981", "#059669", "#047857", "#065f46"][Math.floor(Math.random() * 4)]
                }, ${["#34d399", "#6ee7b7", "#a7f3d0"][Math.floor(Math.random() * 3)]})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}

          {/* Ondas de fondo más sutiles */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-green-100/10 to-emerald-100/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-emerald-100/10 to-teal-100/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-100/5 to-green-100/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      )}

      {/* Hero Section Mejorado */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-600/3 via-emerald-600/3 to-teal-600/3"></div>
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-8 py-4 rounded-full text-base font-bold mb-10 shadow-xl animate-bounce-slow border border-green-200">
              <Leaf className="w-6 h-6 animate-spin-slow" />🧬 Biotecnología Vegetal de Vanguardia
              <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
            </div>

            <h1 className="text-7xl lg:text-8xl font-black mb-10 leading-tight">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                Plantines de
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent animate-gradient-reverse">
                Elite Genética
              </span>
            </h1>

            <p className="text-2xl lg:text-3xl text-gray-700 mb-14 leading-relaxed font-medium max-w-4xl mx-auto">
              🌟 <strong>Revoluciona tu agricultura</strong> con plantines in vitro de
              <span className="text-green-600 font-bold"> calidad superior</span>, desarrollados con tecnología de punta
              para
              <span className="text-emerald-600 font-bold"> maximizar tus ganancias</span> 🚀
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              {[
                {
                  icon: TrendingUp,
                  title: "Hasta 60% más productividad",
                  color: "green",
                  bg: "from-green-500 to-emerald-500",
                },
                { icon: Shield, title: "100% libres de plagas", color: "emerald", bg: "from-emerald-500 to-teal-500" },
                { icon: DollarSign, title: "ROI garantizado", color: "teal", bg: "from-teal-500 to-green-500" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 animate-fadeInUp border border-gray-100`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.bg} text-white rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-pulse`}
                  >
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{stat.title}</h3>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button
                onClick={() => handleWhatsAppContact("información completa sobre plantines premium")}
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-6 rounded-full font-bold text-2xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 animate-pulse-slow"
              >
                <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />💬 Asesoría Gratuita
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="group inline-flex items-center gap-4 bg-white text-green-600 px-12 py-6 rounded-full font-bold text-2xl border-3 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:scale-105"
              >
                <Calculator className="w-7 h-7 group-hover:animate-spin" />📊 Calcular Ganancias
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora de Rentabilidad Mejorada */}
      {showCalculator && (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-t-4 border-blue-300">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">🧮 Calculadora de Rentabilidad</h2>
                <p className="text-xl text-gray-600">Descubre cuánto puedes ganar con nuestros plantines premium</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100">
                    <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                      <BarChart3 className="w-8 h-8" />📈 Proyección de Ingresos
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-lg">Hectáreas cultivadas:</span>
                        <span className="font-bold text-xl">5 ha</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-lg">Rendimiento promedio:</span>
                        <span className="font-bold text-xl text-green-600">45 ton/ha</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-lg">Precio por tonelada:</span>
                        <span className="font-bold text-xl">S/. 2,500</span>
                      </div>
                      <hr className="border-green-200 my-4" />
                      <div className="flex justify-between items-center text-2xl font-bold text-green-700 bg-green-100 p-4 rounded-2xl">
                        <span>Ingreso total anual:</span>
                        <span>S/. 562,500</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
                    <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-3">
                      <Target className="w-8 h-8" />💰 Comparación vs. Plantines Tradicionales
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-lg">Plantines tradicionales:</span>
                        <span className="text-xl">S/. 350,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-lg">Plantines AS Labs:</span>
                        <span className="font-bold text-xl text-green-600">S/. 562,500</span>
                      </div>
                      <hr className="border-blue-200 my-4" />
                      <div className="flex justify-between items-center text-2xl font-bold text-blue-700 bg-blue-100 p-4 rounded-2xl">
                        <span>Ganancia adicional:</span>
                        <span className="text-green-600">+S/. 212,500</span>
                      </div>
                      <div className="text-center mt-6">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                          🚀 +60% más rentabilidad
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filtros Mejorados */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🌱 Explora Nuestro Catálogo Premium</h2>
            <p className="text-xl text-gray-600">Selecciona la categoría que más te interese</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/25 scale-105"
                    : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border-2 border-gray-200 hover:border-green-300 shadow-xl hover:shadow-2xl"
                }`}
              >
                <span className="group-hover:animate-pulse">{category}</span>
                {selectedCategory === category && <CheckCircle className="inline-block w-6 h-6 ml-3 animate-bounce" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo Premium Mejorado */}
      <section className="py-24 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            {filteredPlantines.map((plantin, index) => (
              <div
                key={plantin.id}
                className={`group bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-green-200 transform hover:scale-105 hover:-translate-y-3 ${
                  animationsEnabled ? "animate-fadeInUp" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setSelectedPlantin(plantin)}
                onMouseLeave={() => setSelectedPlantin(null)}
              >
                {/* Header de la tarjeta mejorado */}
                <div
                  className={`relative p-10 ${
                    plantin.isResearch
                      ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
                      : "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
                  } overflow-hidden`}
                >
                  {/* Elementos decorativos mejorados */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/30 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-xl group-hover:scale-110 transition-transform duration-300 ${
                          plantin.isResearch
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                            : "bg-gradient-to-br from-green-500 to-emerald-600"
                        } text-white`}
                      >
                        <plantin.icon className="w-10 h-10 group-hover:animate-bounce" />
                      </div>

                      <div className="flex flex-col gap-3">
                        {plantin.isResearch && (
                          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse shadow-lg">
                            🧬 En Investigación
                          </span>
                        )}

                        {plantin.profitability && (
                          <span
                            className={`text-sm font-bold px-4 py-2 rounded-full shadow-lg ${getProfitabilityColor(plantin.profitability)}`}
                          >
                            💰 {plantin.profitability}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">
                      {plantin.name}
                    </h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{plantin.description}</p>

                    {/* Métricas importantes mejoradas */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-sm text-gray-500 mb-2 font-medium">💰 Precio</div>
                        <div className="font-bold text-green-600 text-lg">{plantin.price}</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-sm text-gray-500 mb-2 font-medium">📊 Rendimiento</div>
                        <div className="font-bold text-blue-600 text-lg">{plantin.yield}</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-sm text-gray-500 mb-2 font-medium">⏱️ Cosecha</div>
                        <div className="font-bold text-purple-600 text-lg">{plantin.harvestTime}</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-sm text-gray-500 mb-2 font-medium">🛡️ Resistencia</div>
                        <div className="font-bold text-orange-600 text-lg">{plantin.resistance?.length || 0}+</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Características mejoradas */}
                <div className="p-10 pt-0">
                  <div className="space-y-4 mb-10">
                    {plantin.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-4 group-hover:translate-x-3 transition-transform duration-300"
                        style={{ transitionDelay: `${featureIndex * 0.1}s` }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex-shrink-0 ${plantin.isResearch ? "bg-blue-400" : "bg-green-400"} animate-pulse shadow-lg`}
                        ></div>
                        <span className="text-gray-700 font-medium text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Resistencias mejoradas */}
                  {plantin.resistance && (
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        Resistencias Comprobadas:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {plantin.resistance.map((resistance, idx) => (
                          <span
                            key={idx}
                            className="bg-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full border border-green-200 shadow-sm"
                          >
                            {resistance}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botones de acción mejorados */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {plantin.available ? (
                      <button
                        onClick={() => handleWhatsAppContact(plantin.name)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
                      >
                        <span className="group-hover:animate-pulse">💬 Cotizar</span>
                      </button>
                    ) : plantin.isResearch ? (
                      <a
                        href="/research/banano-baby"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-center group"
                      >
                        <span className="group-hover:animate-pulse">🔬 Ver Investigación</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-500 px-6 py-4 rounded-2xl font-bold cursor-not-allowed"
                      >
                        No Disponible
                      </button>
                    )}

                    <button
                      onClick={() => handleTechnicalSheet(plantin)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
                    >
                      <FileText className="w-5 h-5 mx-auto group-hover:animate-bounce" />
                      <span className="text-sm">Ficha Técnica</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleWhatsAppContact(`información técnica sobre ${plantin.name}`)}
                    className="w-full bg-white text-green-600 border-2 border-green-200 px-6 py-3 rounded-2xl hover:bg-green-50 hover:border-green-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Más Información</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final Mejorado */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-700/20 to-emerald-700/20"></div>
          <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl lg:text-7xl font-black mb-10">
              🚀 ¿Listo para <span className="text-yellow-300">Revolucionar</span> tu Agricultura?
            </h2>
            <p className="text-2xl lg:text-3xl mb-16 opacity-95 leading-relaxed">
              Únete a más de <strong className="text-yellow-300">500+ agricultores exitosos</strong> que han
              transformado sus cultivos con nuestros plantines de elite genética
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Users, title: "500+ Agricultores", subtitle: "Confían en nosotros" },
                { icon: BarChart3, title: "60% Más", subtitle: "Productividad promedio" },
                { icon: Target, title: "98% Éxito", subtitle: "Tasa de supervivencia" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl transform hover:scale-105 transition-all duration-300 border border-white/20"
                >
                  <stat.icon className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                  <div className="text-3xl font-bold text-yellow-300 mb-2">{stat.title}</div>
                  <div className="text-xl opacity-90">{stat.subtitle}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button
                onClick={() =>
                  handleWhatsAppContact(
                    "consulta completa sobre plantines premium - quiero revolucionar mi agricultura",
                  )
                }
                className="group inline-flex items-center gap-5 bg-yellow-400 text-green-800 px-16 py-8 rounded-full font-black text-3xl hover:bg-yellow-300 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25 animate-pulse-slow"
              >
                <MessageCircle className="w-10 h-10 group-hover:animate-bounce" />💬 Asesoría VIP Gratuita
                <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
              </button>

              <a
                href="tel:+51999999999"
                className="group inline-flex items-center gap-5 bg-transparent text-white border-3 border-white px-16 py-8 rounded-full font-black text-3xl hover:bg-white hover:text-green-600 transition-all duration-300 shadow-2xl transform hover:scale-105"
              >
                <Phone className="w-10 h-10 group-hover:animate-bounce" />📞 Llamar Ahora
              </a>
            </div>

            <div className="mt-16 text-xl opacity-80">
              <p>
                🎯 <strong>Garantía de satisfacción</strong> • 🚚 <strong>Envío a todo el Perú</strong> • 🔬{" "}
                <strong>Soporte técnico incluiSoporte técnico incluido</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient-reverse 4s ease infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
