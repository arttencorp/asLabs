import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SoilAnalysisSearch } from "@/components/services/soil-analysis-search"
import {
  ServiceStructuredData,
  BreadcrumbStructuredData,
  ItemListStructuredData,
  LocalBusinessStructuredData,
  OrganizationStructuredData,
} from "@/components/structured-data"
import {
  Microscope,
  Leaf,
  FlaskConical,
  Bug,
  Beaker,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Award,
} from "lucide-react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title:
    "Servicios de Laboratorio en Trujillo Perú | Análisis Microbiológicos, Fitopatología, Biotecnología | AS Laboratorios",
  description:
    "Laboratorio certificado en Trujillo, La Libertad, Perú. Más de 100 servicios: análisis microbiológicos de alimentos y agua, fitopatología, biotecnología vegetal, bacteriología. Resultados confiables para agricultura e industria. Cotiza ahora: +51 961 996 645.",
  keywords: [
    // Keywords geográficas principales
    "laboratorio Trujillo",
    "laboratorio La Libertad",
    "laboratorio Perú",
    "análisis de laboratorio Trujillo",
    "servicios de laboratorio Trujillo Perú",
    // Keywords de servicios
    "análisis microbiológicos Trujillo",
    "análisis microbiológicos Perú",
    "análisis de alimentos Trujillo",
    "análisis de agua Trujillo",
    "fitopatología Trujillo",
    "fitopatología Perú",
    "biotecnología vegetal Trujillo",
    "biotecnología vegetal Perú",
    "bacteriología Trujillo",
    "análisis de suelos Trujillo",
    // Keywords long-tail
    "laboratorio certificado Trujillo",
    "laboratorio acreditado La Libertad",
    "análisis microbiológicos alimentos Perú",
    "detección Salmonella Trujillo",
    "detección E. coli Perú",
    "análisis coliformes Trujillo",
    "cultivo tejidos vegetales Trujillo",
    "micropropagación in vitro Perú",
    "control calidad alimentos Trujillo",
    // Keywords de negocio
    "AS Laboratorios",
    "AS Labs Trujillo",
    "mejor laboratorio Trujillo",
    "laboratorio agrícola Perú",
    "laboratorio industrial Trujillo",
  ],
  alternates: {
    canonical: "https://aslaboratorios.com/servicios",
    languages: {
      "es-PE": "https://aslaboratorios.com/servicios",
    },
  },
  openGraph: {
    title: "Servicios de Laboratorio Certificado en Trujillo, Perú | AS Laboratorios",
    description:
      "Más de 100 servicios especializados: microbiología, fitopatología, biotecnología vegetal, bacteriología. Laboratorio líder en Trujillo, La Libertad. Resultados precisos y certificados.",
    url: "https://aslaboratorios.com/servicios",
    siteName: "AS Laboratorios",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://aslaboratorios.com/aslabs-logo.png",
        width: 1200,
        height: 630,
        alt: "Servicios de Laboratorio AS Laboratorios Trujillo Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Laboratorio en Trujillo | AS Laboratorios Perú",
    description:
      "Análisis microbiológicos, fitopatología, biotecnología vegetal y más. Laboratorio certificado en Trujillo, La Libertad.",
    images: ["https://aslaboratorios.com/aslabs-logo.png"],
    creator: "@aslaboratorios",
    site: "@aslaboratorios",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "Servicios de Laboratorio",
  authors: [{ name: "AS Laboratorios", url: "https://aslaboratorios.com" }],
  creator: "AS Laboratorios",
  publisher: "AS Laboratorios",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  other: {
    "geo.region": "PE-LAL",
    "geo.placename": "Trujillo",
    "geo.position": "-8.1116;-79.0287",
    ICBM: "-8.1116, -79.0287",
    "DC.title": "Servicios de Laboratorio AS Laboratorios Trujillo",
    "DC.creator": "AS Laboratorios",
    "DC.subject": "Laboratorio, Microbiología, Biotecnología, Fitopatología, Trujillo, Perú",
    "DC.description": "Servicios de laboratorio certificados en Trujillo, Perú",
    "DC.publisher": "AS Laboratorios",
    "DC.language": "es-PE",
    "revisit-after": "7 days",
    rating: "General",
    distribution: "Global",
  },
}

const servicios = [
  {
    title: "Fitopatología",
    description:
      "Identificación y análisis de patógenos en plantas y suelos agrícolas. Servicio líder en Trujillo y La Libertad para detectar bacterias, hongos y microorganismos fitopatógenos que afectan tus cultivos.",
    href: "/servicios/fitopatologia",
    icon: Bug,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    services: [
      "Detección de patógenos vegetales",
      "Pruebas de susceptibilidad",
      "Análisis de suelos agrícolas",
      "Presencia de hongos y bacterias",
    ],
    image: "/images/image.png",
    count: 6,
  },
  {
    title: "Medio Ambiente",
    description:
      "Análisis microbiológico de agua, superficies y ambientes en Trujillo. Garantizamos la calidad ambiental mediante detección de coliformes, E. coli y aerobios mesófilos según normativa peruana.",
    href: "/servicios/medio-ambiente",
    icon: Leaf,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
    services: ["Recuento aerobios mesófilos", "Coliformes totales/fecales", "Detección E. coli", "Medición de pH"],
    image: "/images/image.png",
    count: 7,
  },
  {
    title: "Servicios Microbiológicos",
    description:
      "Análisis completos de alimentos, agua, leche y cosméticos en Trujillo, Perú. Detectamos Salmonella, Listeria, Staphylococcus y otros microorganismos patógenos con certificación para industria alimentaria.",
    href: "/servicios/microbiologicos",
    icon: Microscope,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    services: ["Análisis de alimentos", "Control de calidad", "Detección de patógenos", "Recuentos microbianos"],
    image: "/images/image.png",
    count: 48,
  },
  {
    title: "Biotecnología Vegetal",
    description:
      "Cultivo de tejidos vegetales y micropropagación in vitro en La Libertad. Producimos plantas libres de patógenos mediante técnicas avanzadas de biotecnología para frutales y ornamentales.",
    href: "/servicios/biotecnologia-vegetal",
    icon: FlaskConical,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    services: ["Micropropagación", "Cultivo in vitro", "Termoterapia", "Criopreservación"],
    image: "/images/image.png",
    count: 14,
  },
  {
    title: "Bacteriología General",
    description:
      "Suspensiones McFarland, fermentación y curvas de crecimiento en Trujillo. Desarrollamos biofertilizantes y bioestimulantes para agricultura sostenible en todo el norte del Perú.",
    href: "/servicios/bacteriologia-general",
    icon: Beaker,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    services: ["Suspensiones bacterianas", "Fermentación", "Biofertilizantes", "Curvas de crecimiento"],
    image: "/images/image.png",
    count: 13,
  },
]

export default function ServiciosPage() {
  const totalServicios = servicios.reduce((acc, s) => acc + s.count, 0)

  return (
    <>
      <OrganizationStructuredData />
      <LocalBusinessStructuredData />
      <ServiceStructuredData
        serviceName="Servicios de Laboratorio AS Laboratorios Trujillo"
        serviceDescription="Catálogo completo de más de 100 servicios de laboratorio especializados en Trujillo, La Libertad, Perú. Análisis microbiológicos, fitopatología, biotecnología vegetal y bacteriología con certificación."
        serviceUrl="https://aslaboratorios.com/servicios"
        serviceType="Servicios de Laboratorio Certificados"
        serviceArea={["La Libertad", "Lambayeque", "Piura", "Cajamarca", "Ancash", "Lima", "Ica", "Arequipa"]}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios de Laboratorio", url: "https://aslaboratorios.com/servicios" },
        ]}
      />
      <ItemListStructuredData
        listName="Categorías de Servicios de Laboratorio AS Laboratorios Trujillo"
        listUrl="https://aslaboratorios.com/servicios"
        items={servicios.map((s, i) => ({
          name: s.title,
          description: s.description,
          position: i + 1,
        }))}
      />
      <Navbar />

      <main className="min-h-screen bg-background font-serif">
        {/* Hero Section - Optimized */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Image Grid */}
          <div className="absolute inset-0 grid grid-cols-5 opacity-30">
            {servicios.map((s, i) => (
              <div key={i} className="relative h-full">
                <Image
                  src={s.image || "/placeholder.svg"}
                  alt={`Servicio de ${s.title} AS Laboratorios Trujillo`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Microscope className="w-4 h-4" />
                  {totalServicios}+ servicios especializados
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  Trujillo, La Libertad, Perú
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium">
                  <Award className="w-4 h-4" />
                  Laboratorio Certificado
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Servicios de <span className="text-primary">Laboratorio</span> en Trujillo, Perú
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-6">
                Soluciones integrales en análisis microbiológicos, fitopatología, biotecnología vegetal y bacteriología
                con los más altos estándares de calidad. Laboratorio líder en La Libertad con más de 20 años de
                experiencia.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  +51 961 996 645
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Lun-Vie: 8am-6pm | Sáb: 8am-1pm
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Huancavelica 315, Palermo, Trujillo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Soil Analysis Search Section */}
        <Suspense fallback={null}>
          <SoilAnalysisSearch />
        </Suspense>

        {/* Services Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-8">
              {servicios.map((servicio, index) => (
                <Link
                  key={servicio.title}
                  href={servicio.href}
                  className="group block bg-card rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                  aria-label={`Ver servicios de ${servicio.title} en Trujillo`}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div
                      className={`relative w-full lg:w-[400px] h-64 lg:h-[280px] flex-shrink-0 overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      <Image
                        src={servicio.image || "/placeholder.svg"}
                        alt={`Servicio de ${servicio.title} - AS Laboratorios Trujillo Perú`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${servicio.color} opacity-30 group-hover:opacity-20 transition-opacity`}
                      />
                      <div className="absolute top-4 left-4">
                        <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                          <servicio.icon className={`w-7 h-7 ${servicio.textColor}`} />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span
                          className={`inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm ${servicio.textColor} text-sm font-bold rounded-full shadow-lg`}
                        >
                          {servicio.count} servicios
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div
                      className={`flex-1 p-8 lg:p-10 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {servicio.title}
                        </h2>
                        <div
                          className={`w-12 h-12 rounded-full ${servicio.bgColor} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all`}
                        >
                          <ArrowRight
                            className={`w-6 h-6 ${servicio.textColor} group-hover:translate-x-1 transition-transform`}
                          />
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed text-base lg:text-lg">
                        {servicio.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        {servicio.services.map((service, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className={`w-5 h-5 ${servicio.textColor} flex-shrink-0`} />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-10 md:p-14 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full blur-2xl" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
                    ¿Necesitas análisis de laboratorio en Trujillo?
                  </h2>
                  <p className="text-primary-foreground/80 text-lg">
                    Contáctanos para cotizaciones especiales o consultas técnicas. Atendemos toda La Libertad y norte
                    del Perú.
                  </p>
                </div>
                <a
                  href="https://wa.me/51961996645?text=Hola,%20necesito%20información%20sobre%20servicios%20de%20laboratorio%20en%20Trujillo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:bg-white/90 hover:scale-105 transition-all shadow-xl text-lg"
                  aria-label="Contactar AS Laboratorios Trujillo por WhatsApp"
                >
                  <Phone className="w-6 h-6" />
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
