"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Plus, Minus, X, MessageSquare, ArrowLeft, ShoppingCart } from "lucide-react"

interface Presentacion {
  id: string
  tipo: string
  medio?: string
  volumen?: string
  precio: number
}

interface Cepa {
  id: string
  nombre: string
  cientifico: string
  descripcion: string
  beneficios: string[]
  presentaciones: Presentacion[]
  viabilidad: string
  concentracion: string
  almacenamiento: string
  aplicacion: string
  compatibilidad: string
  imagen: string
}

interface CartItem {
  cepaId: string
  presentacionId: string
  cepaNombre: string
  presentacionInfo: string
  precio: number
  cantidad: number
  isStudent?: boolean
  studentDNI?: string
  studentEmail?: string
}

const allCepas: Cepa[] = [
  {
    id: "1",
    nombre: "Bacillus subtilis",
    cientifico: "Bacillus subtilis",
    descripcion: "Bacteria promotora del crecimiento vegetal y fijadora de nitrógeno atmosférico. Mejora la disponibilidad de nutrientes y estimula el desarrollo radicular.",
    beneficios: ["Aumenta disponibilidad de nutrientes", "Fija nitrógeno atmosférico", "Estimula desarrollo radicular", "Mejora salud del suelo"],
    presentaciones: [
      { id: "1-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "1-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "1-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "1-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "1-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 96%",
    concentracion: "2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Riego y aspersión foliar",
    compatibilidad: "Compatible con fungicidas y bactericidas",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20SUBTILIS-lZIT8bmBiVCgmrPslx2UVDtUvih3Xm.png",
  },
  {
    id: "2",
    nombre: "Pseudomonas fluorescens",
    cientifico: "Pseudomonas fluorescens",
    descripcion: "Bacteria solubilizadora de fosfato y productora de reguladores de crecimiento. Mejora absorción de nutrientes.",
    beneficios: ["Solubiliza fosfato", "Produce fitohormonas", "Reduce patógenos del suelo", "Mejora absorción de nutrientes"],
    presentaciones: [
      { id: "2-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "2-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "2-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "2-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "2-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 10 meses",
    aplicacion: "Riego, aspersión, tratamiento de semilla",
    compatibilidad: "No compatible con antibióticos sistémicos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PSEUDOMONAS%20FLURECENS-3T3ftD4NIWWlTMp1gyfXp5mQpDiFwV.png",
  },
  {
    id: "3",
    nombre: "Azospirillum sp.",
    cientifico: "Azospirillum sp.",
    descripcion: "Bacteria fijadora de nitrógeno atmosférico para cultivos agrícolas. Reduce significativamente el uso de fertilizantes.",
    beneficios: ["Fija nitrógeno del aire", "Reduce fertilizantes", "Mejora tolerancia al estrés", "Aumenta rendimiento"],
    presentaciones: [
      { id: "3-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "3-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "3-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "3-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "3-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 94%",
    concentracion: "1.8 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 9 meses",
    aplicacion: "Riego, aspersión, inoculación",
    compatibilidad: "Compatible con la mayoría de agroquímicos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AZOSPIRILLUM%20SP-cfCWWbWFjaJjRmUmzlCzGVGC7IJQ0J.png",
  },
  {
    id: "4",
    nombre: "Bacillus megaterium",
    cientifico: "Bacillus megaterium",
    descripcion: "Bacteria solubilizadora de potasio y fosfato para nutrición vegetal completa.",
    beneficios: ["Solubiliza K y P", "Mejora fertilidad", "Aumenta nutrientes", "Desarrollo radicular"],
    presentaciones: [
      { id: "4-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "4-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "4-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "4-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "4-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 96%",
    concentracion: "2.2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Riego, aspersión, tratamiento de semilla",
    compatibilidad: "Compatible con fungicidas y bactericidas",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20MEGATERIUM-ICuHwaE7UcN8DXXYZRqCkVG448FHFb.png",
  },
  {
    id: "5",
    nombre: "Rhizobium sp.",
    cientifico: "Rhizobium sp.",
    descripcion: "Bacteria fijadora de nitrógeno en simbiosis con leguminosas. Enriquece el suelo naturalmente.",
    beneficios: ["Fija N en simbiosis", "Enriquece suelo", "Para leguminosas", "Sustainable agriculture"],
    presentaciones: [
      { id: "5-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "5-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "5-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "5-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "5-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.9 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 10 meses",
    aplicacion: "Inoculación de semillas",
    compatibilidad: "No compatible con fungicidas sistémicos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RHIZOBIUM%20SP-9obUjUkrKY9hu85SUnccG0wmlNn2AS.png",
  },
  {
    id: "6",
    nombre: "Escherichia coli",
    cientifico: "Escherichia coli (K-12)",
    descripcion: "Bacteria modelo para investigación científica y producción de proteínas recombinantes.",
    beneficios: ["Investigación genética", "Bioingeniería", "Producción de proteínas", "Estudios moleculares"],
    presentaciones: [
      { id: "6-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "6-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "6-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "6-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "6-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 97%",
    concentracion: "2.5 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Investigación de laboratorio",
    compatibilidad: "Compatible con antibióticos selectivos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ESCHERICHIA%20COLI%20-lIupepy5OmLvg5QlzktwmP6HLi2Ua2.png",
  },
  {
    id: "7",
    nombre: "Bacillus cereus",
    cientifico: "Bacillus cereus",
    descripcion: "Bacteria para estudios de control de plagas y patología microbiana.",
    beneficios: ["Investigación patogénica", "Entomología aplicada", "Modelos de investigación", "Estudios de toxinas"],
    presentaciones: [
      { id: "7-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "7-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "7-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "7-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "7-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 96%",
    concentracion: "2.1 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 12 meses",
    aplicacion: "Investigación de laboratorio",
    compatibilidad: "Compatible con medios selectivos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20CEREUS-mRkEvpBkbZTqRieLDfSFcqLNjwjGph.png",
  },
  {
    id: "8",
    nombre: "Bacillus thuringiensis",
    cientifico: "Bacillus thuringiensis",
    descripcion: "Bacteria natural para control biológico de insectos plaga. Compatible con agricultura orgánica.",
    beneficios: ["Control de lepidópteros", "Agricultura orgánica", "Bajo impacto ambiental", "Seguro para enemigos naturales"],
    presentaciones: [
      { id: "8-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "8-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "8-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "8-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "8-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 95%",
    concentracion: "1.8 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 10 meses",
    aplicacion: "Aplicación foliar",
    compatibilidad: "No compatible con surfactantes aniónicos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20THURIGENSIS-WathDWWLzFWpDqIiLScgGmKElVphQj.png",
  },
  {
    id: "9",
    nombre: "Pseudomonas aeruginosa",
    cientifico: "Pseudomonas aeruginosa",
    descripcion: "Bacteria para investigación molecular y microbiología clínica. Modelo para estudios de patogénesis.",
    beneficios: ["Investigación molecular", "Estudios de patogénesis", "Desarrollo antibióticos", "Microbiología clínica"],
    presentaciones: [
      { id: "9-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "9-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "9-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "9-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "9-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 94%",
    concentracion: "1.6 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 9 meses",
    aplicacion: "Investigación de laboratorio",
    compatibilidad: "Compatible con medios selectivos",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PSEUDOMINAS%20AUROGINOSA-2ij7shHccL5vWlnNbV3Y3kgP2eQYak.png",
  },
  {
    id: "10",
    nombre: "Streptomyces spp",
    cientifico: "Streptomyces spp.",
    descripcion: "Actinobacteria productora de compuestos antimicrobianos naturales. Control biológico de patógenos.",
    beneficios: ["Produce antibióticos", "Control de patógenos", "Actinobacteria", "Biocontrol natural"],
    presentaciones: [
      { id: "10-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "10-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "10-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "10-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "10-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 93%",
    concentracion: "1.2 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 8 meses",
    aplicacion: "Riego, aspersión, aplicación foliar",
    compatibilidad: "Compatible con bactericidas",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STREPTOMYCES-yfimx3fV6zPslQL6YRNeG2jpJ5AlPv.png",
  },
  {
    id: "11",
    nombre: "Bacillus firmus",
    cientifico: "Bacillus firmus GB-126",
    descripcion: "Bacteria activadora de crecimiento radicular y tolerante a estrés hídrico.",
    beneficios: ["Tolerancia a sequía", "Desarrollo radicular", "Estrés abiótico", "Aumento de rendimiento"],
    presentaciones: [
      { id: "11-1", tipo: "Placa", medio: "Agar Nutritivo", precio: 175 },
      { id: "11-2", tipo: "Placa", medio: "TSA", precio: 175 },
      { id: "11-3", tipo: "Frasco", medio: "Agar Nutritivo", precio: 225 },
      { id: "11-4", tipo: "Caldo", volumen: "100ml", precio: 225 },
      { id: "11-5", tipo: "Caldo", volumen: "500ml", precio: 495 },
    ],
    viabilidad: "> 96%",
    concentracion: "2.0 x 10^9 UFC/ml",
    almacenamiento: "2-8°C, 11 meses",
    aplicacion: "Riego, aspersión, tratamiento de semilla",
    compatibilidad: "Compatible con fungicidas y bactericidas",
    imagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACILLUS%20FIRMUS%20SP-3e7s9AEf9PCpSzCxfnIMQd0rcr7UDY.png",
  },
]

export default function CepaDetailClient({ cepaId }: { cepaId: string }) {
  const cepa = allCepas.find(c => c.id === cepaId)
  const [selectedPresentacion, setSelectedPresentacion] = useState<Presentacion | null>(cepa?.presentaciones[0] || null)
  const [cantidad, setCantidad] = useState(1)
  const [customConcentration, setCustomConcentration] = useState("")
  const [customCalvinput, setCustomCaldoInput] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [studentDNI, setStudentDNI] = useState("")
  const [studentEmail, setStudentEmail] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cepaId])

  if (!cepa) {
    return <div className="min-h-screen flex items-center justify-center">Cepa no encontrada</div>
  }

  const addToCart = () => {
    // Si hay concentración personalizada
    if (customConcentration) {
      const newItem: CartItem = {
        cepaId: cepa.id,
        presentacionId: `custom-conc-${Date.now()}`,
        cepaNombre: cepa.nombre,
        presentacionInfo: `Concentración Personalizada - 2 x 10^${customConcentration} UFC/ml (A confirmar precio)`,
        precio: 0, // A confirmar con cliente
        cantidad: 1,
        isStudent: isStudent,
        studentDNI: isStudent ? studentDNI : undefined,
        studentEmail: isStudent ? studentEmail : undefined,
      }
      setCart(prev => [...prev, newItem])
      setCustomConcentration("")
      return
    }

    // Si hay caldo personalizado
    if (customCalvinput) {
      const newItem: CartItem = {
        cepaId: cepa.id,
        presentacionId: `custom-caldo-${Date.now()}`,
        cepaNombre: cepa.nombre,
        presentacionInfo: `Caldo Personalizado - ${customCalvinput} litros (A confirmar precio)`,
        precio: 0, // A confirmar con cliente
        cantidad: 1,
        isStudent: isStudent,
        studentDNI: isStudent ? studentDNI : undefined,
        studentEmail: isStudent ? studentEmail : undefined,
      }
      setCart(prev => [...prev, newItem])
      setCustomCaldoInput("")
      return
    }

    // Presentación estándar
    if (!selectedPresentacion) return
    
    const newItem: CartItem = {
      cepaId: cepa.id,
      presentacionId: selectedPresentacion.id,
      cepaNombre: cepa.nombre,
      presentacionInfo: `${selectedPresentacion.tipo} - ${selectedPresentacion.medio || ''} ${selectedPresentacion.volumen || ''}`.trim(),
      precio: selectedPresentacion.precio,
      cantidad,
      isStudent: isStudent,
      studentDNI: isStudent ? studentDNI : undefined,
      studentEmail: isStudent ? studentEmail : undefined,
    }

    setCart(prev => {
      const existing = prev.find(item => item.presentacionId === selectedPresentacion.id)
      if (existing) {
        return prev.map(item => item.presentacionId === selectedPresentacion.id ? { ...item, cantidad: item.cantidad + cantidad } : item)
      }
      return [...prev, newItem]
    })

    setCantidad(1)
  }

  const removeFromCart = (presentacionId: string) => {
    setCart(prev => prev.filter(item => item.presentacionId !== presentacionId))
  }

  const updateCartQuantity = (presentacionId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(presentacionId)
    } else {
      setCart(prev => prev.map(item => item.presentacionId === presentacionId ? { ...item, cantidad: newQuantity } : item))
    }
  }

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const totalConDescuento = cart.some(item => item.isStudent) ? total * 0.8 : total
  const ahorroEstudiante = total - totalConDescuento

  const generateWhatsAppMessage = () => {
    let message = "Hola, quisiera hacer un pedido:%0A%0A"
    
    cart.forEach((item, idx) => {
      const subtotal = item.precio * item.cantidad
      message += `${idx + 1}. ${item.cepaNombre}%0A`
      message += `   Presentación: ${item.presentacionInfo}%0A`
      message += `   Cantidad: ${item.cantidad}%0A`
      message += `   Subtotal: S/ ${subtotal.toFixed(2)}%0A%0A`
    })
    
    message += `Total: S/ ${total.toFixed(2)}%0A`
    
    if (cart.some(item => item.isStudent)) {
      message += `Descuento estudiante (20%): -S/ ${ahorroEstudiante.toFixed(2)}%0A`
      message += `Total Final: S/ ${totalConDescuento.toFixed(2)}%0A%0A`
      
      const firstStudentItem = cart.find(item => item.isStudent)
      if (firstStudentItem?.studentDNI) {
        message += `DNI Estudiante: ${firstStudentItem.studentDNI}%0A`
      }
      if (firstStudentItem?.studentEmail) {
        message += `Email Institucional: ${firstStudentItem.studentEmail}%0A`
      }
    }
    
    return message
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link href="/cepas" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>

          {/* Información Importante */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex gap-4 items-start">
              <div className="text-2xl">ℹ️</div>
              <div className="text-sm">
                <p className="font-black text-blue-900 mb-2">Política de Cultivo a Pedido</p>
                <p className="text-blue-800 text-xs leading-relaxed">Todas nuestras cepas se cultivan a pedido con almacenamiento máximo de 2 días. Ideales para trabajos de investigación (tesistas) y solicitudes especializadas. Caldo: máximo 30 litros a concentración 2 x 10^7 UFC/ml. Tiempos de entrega sujetos a disponibilidad.</p>
              </div>
            </div>
          </div>

          {/* Layout 2 columnas */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Imagen - Columna 1 */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 p-6 flex items-center justify-center min-h-[360px]">
                  <img 
                    src={cepa.imagen} 
                    alt={cepa.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Detalles - Columna 2 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Nombre y Categoría */}
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <h1 className="text-4xl font-black text-gray-900 mb-2">{cepa.nombre}</h1>
                <p className="text-lg text-gray-600 italic mb-4">{cepa.cientifico}</p>
                <p className="text-gray-700 leading-relaxed">{cepa.descripcion}</p>
              </div>

              {/* Beneficios */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200 shadow-md">
                <h3 className="text-xl font-black text-emerald-900 mb-4">Beneficios Principales</h3>
                <ul className="space-y-3">
                  {cepa.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-emerald-800">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-sm flex-shrink-0 mt-0.5">✓</span>
                      <span>{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Especificaciones Técnicas */}
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4">Especificaciones Técnicas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-xs font-bold text-blue-600 mb-1">VIABILIDAD</p>
                    <p className="text-lg font-black text-blue-900">{cepa.viabilidad}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <p className="text-xs font-bold text-purple-600 mb-1">CONCENTRACIÓN</p>
                    <p className="text-lg font-black text-purple-900">{cepa.concentracion}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <p className="text-xs font-bold text-amber-600 mb-1">ALMACENAMIENTO</p>
                    <p className="text-lg font-black text-amber-900">{cepa.almacenamiento}</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <p className="text-xs font-bold text-teal-600 mb-1">APLICACIÓN</p>
                    <p className="text-lg font-black text-teal-900">{cepa.aplicacion}</p>
                  </div>
                </div>
              </div>

              {/* Presentaciones */}
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4">Presentaciones Disponibles</h3>
                <div className="space-y-4">
                  {cepa.presentaciones.map((pres) => (
                    <button
                      key={pres.id}
                      onClick={() => setSelectedPresentacion(pres)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedPresentacion?.id === pres.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black text-gray-900">{pres.tipo} {pres.medio ? `- ${pres.medio}` : ''} {pres.volumen ? `(${pres.volumen})` : ''}</p>
                        </div>
                        <p className="text-2xl font-black text-emerald-600">S/ {pres.precio.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Opciones Personalizadas */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-black text-gray-900 mb-6">Opciones Personalizadas</h3>
                
                {/* Concentración Personalizada */}
                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-black text-blue-900 mb-3">Concentración Personalizada</h4>
                  <p className="text-sm text-blue-800 mb-4">Solicita una concentración específica. Estándar: 2 x 10^7 UFC/ml. Máximo en caldo: 30 litros</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">2 x 10</span>
                    <sup className="text-lg font-bold text-gray-800">^</sup>
                    <input
                      type="number"
                      value={customConcentration}
                      onChange={(e) => setCustomConcentration(e.target.value)}
                      placeholder="7"
                      className="w-20 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      max="10"
                    />
                    <span className="text-gray-600 text-sm">UFC/ml</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-3">Se agregará a tu carrito como solicitud especial para confirmar precio</p>
                </div>

                {/* Caldo Personalizado */}
                <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-black text-purple-900 mb-3">Caldo Personalizado</h4>
                  <p className="text-sm text-purple-800 mb-4">Solicita un volumen personalizado (máximo 30 litros con concentración 2 x 10^7)</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={customCalvinput}
                      onChange={(e) => setCustomCaldoInput(e.target.value)}
                      placeholder="10"
                      className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      min="0.1"
                      max="30"
                      step="0.1"
                    />
                    <span className="font-bold text-gray-800">litros</span>
                  </div>
                  <p className="text-xs text-purple-700 mt-3">Se agregará a tu carrito como solicitud especial para confirmar precio</p>
                </div>
              </div>

              {/* Cantidad y Botón */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white rounded-lg p-4 border border-gray-200">
                  <span className="text-gray-700 font-bold">Cantidad:</span>
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="p-2 hover:bg-gray-100 rounded">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-black">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="p-2 hover:bg-gray-100 rounded">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-lg font-black text-lg transition-all shadow-lg"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>

          {/* Carrito Flotante */}
          {cart.length > 0 && (
            <button
              onClick={() => setShowCart(!showCart)}
              className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 z-40"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-black">S/ {(cart.some(item => item.isStudent) ? totalConDescuento : total).toFixed(2)}</span>
              <span className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-black">{cart.length}</span>
            </button>
          )}

          {/* Sidebar Carrito */}
          {showCart && (
            <div className="fixed bottom-8 right-8 w-96 bg-white rounded-xl shadow-2xl p-6 z-50 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black">Mi Carrito</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-4">
                {/* Checkbox de Estudiante */}
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isStudent}
                      onChange={(e) => setIsStudent(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="font-bold text-blue-900">Soy estudiante pregrado peruano (20% DCTO)</span>
                  </label>
                </div>

                {/* Campos de Estudiante */}
                {isStudent && (
                  <div className="border border-blue-300 bg-blue-50 rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      placeholder="DNI"
                      value={studentDNI}
                      onChange={(e) => setStudentDNI(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Email institucional (@univ.edu.pe)"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <p className="text-xs text-blue-700 italic">Necesario para validar el descuento</p>
                  </div>
                )}

                {/* Items del carrito */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.presentacionId} className="border border-gray-200 rounded-lg p-3">
                      <p className="font-bold text-sm text-gray-800">{item.cepaNombre}</p>
                      <p className="text-xs text-gray-600">{item.presentacionInfo}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateCartQuantity(item.presentacionId, item.cantidad - 1)} className="p-1 hover:bg-gray-100">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold">{item.cantidad}</span>
                          <button onClick={() => updateCartQuantity(item.presentacionId, item.cantidad + 1)} className="p-1 hover:bg-gray-100">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.presentacionId)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-black text-gray-700">Subtotal:</span>
                  <span className="font-black text-gray-900">S/ {total.toFixed(2)}</span>
                </div>
                {cart.some(item => item.isStudent) && (
                  <>
                    <div className="flex justify-between text-green-600">
                      <span className="font-black">Descuento (20%):</span>
                      <span className="font-black">-S/ {ahorroEstudiante.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between bg-green-50 p-3 rounded-lg">
                      <span className="font-black text-green-900">Total:</span>
                      <span className="text-2xl font-black text-green-600">S/ {totalConDescuento.toFixed(2)}</span>
                    </div>
                  </>
                )}
                {!cart.some(item => item.isStudent) && (
                  <div className="flex justify-between">
                    <span className="font-black">TOTAL:</span>
                    <span className="text-2xl font-black text-emerald-600">S/ {total.toFixed(2)}</span>
                  </div>
                )}
                <a
                  href={`https://wa.me/?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-black flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Enviar por WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
