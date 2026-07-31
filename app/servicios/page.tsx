import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnalysisSearch } from "@/components/analysis-search"
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
  BookOpenCheck,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Award,
  Send,
  PackageCheck,
  FileCheck2,
  ShieldCheck,
  MessageCircle,
  ChevronRight,
} from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"

export const metadata: Metadata = {
  title: "Análisis y Servicios de Laboratorio en Trujillo | AS Laboratorios",
  description:
    "Análisis microbiológicos, fitopatología, bacteriología, biotecnología vegetal y apoyo a la investigación para agricultura, industria y academia.",
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
    "DC.description": "Servicios de laboratorio especializados en Trujillo, Perú",
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
      "Identificamos hongos y bacterias que afectan cultivos para orientar decisiones sanitarias con evidencia.",
    audience: "Cultivos y suelos",
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
    image: "/servicios/fito.jpg",
    count: 6,
  },
  {
    title: "Medio Ambiente",
    description:
      "Evaluamos agua, superficies y ambientes mediante indicadores microbiológicos relevantes para su control.",
    audience: "Agua y superficies",
    href: "/servicios/medio-ambiente",
    icon: Leaf,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
    services: ["Recuento aerobios mesófilos", "Coliformes totales/fecales", "Detección E. coli", "Medición de pH"],
    image: "/servicios/ambiente.jpg",
    count: 7,
  },
  {
    title: "Servicios Microbiológicos",
    description:
      "Analizamos alimentos, agua y superficies para detectar patógenos y verificar condiciones microbiológicas.",
    audience: "Alimentos y procesos",
    href: "/servicios/microbiologicos",
    icon: Microscope,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    services: ["Análisis de alimentos", "Control de calidad", "Detección de patógenos", "Recuentos microbianos"],
    image: "/servicios/servMicrobiologicos.jpeg",
    count: 48,
  },
  {
    title: "Biotecnología Vegetal",
    description:
      "Desarrollamos cultivo de tejidos, micropropagación y soluciones in vitro para material vegetal confiable.",
    audience: "Propagación vegetal",
    href: "/servicios/biotecnologia-vegetal",
    icon: FlaskConical,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    services: ["Micropropagación", "Cultivo in vitro", "Termoterapia", "Criopreservación"],
    image: "/servicios/image.png",
    count: 14,
  },
  {
    title: "Bacteriología General",
    description:
      "Preparamos suspensiones, fermentaciones y ensayos bacterianos bajo condiciones controladas y trazables.",
    audience: "Procesos bacterianos",
    href: "/servicios/bacteriologia-general",
    icon: Beaker,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    services: ["Suspensiones bacterianas", "Fermentación", "Biofertilizantes", "Curvas de crecimiento"],
    image: "/servicios/image.png",
    count: 13,
  },
  {
    title: "Apoyo a la Investigación",
    description:
      "Acompañamos tesis y proyectos con protocolos, identificación microbiana y análisis especializado.",
    audience: "Tesis y proyectos",
    href: "/servicios/apoyo-investigacion",
    icon: BookOpenCheck,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-600",
    services: [
      "Suspensiones bacterianas",
      "Análisis 16S rRNA",
      "Diseño de protocolos",
      "Análisis bioinformático",
    ],
    image: "/servicios/micro.jpeg",
    count: 9,
  },
]

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.11 0C5.58 0 .27 5.3.27 11.83c0 2.09.55 4.13 1.6 5.94L0 24l6.41-1.82a11.78 11.78 0 0 0 5.7 1.46h.01c6.53 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.43-8.33ZM12.12 21.65h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.22-3.8 1.08 1.1-3.71-.24-.38a9.83 9.83 0 0 1-1.5-5.22C2.32 6.4 6.7 2.02 12.11 2.02c2.62 0 5.09 1.02 6.95 2.88a9.76 9.76 0 0 1 2.87 6.95c0 5.41-4.4 9.8-9.81 9.8Zm5.37-7.36c-.3-.15-1.8-.88-2.08-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.29-.48-2.46-1.53a9.12 9.12 0 0 1-1.71-2.13c-.18-.3-.02-.46.14-.61.13-.13.3-.33.45-.5.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.65-.94-2.26-.25-.59-.51-.51-.69-.52h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.52 0 1.49 1.09 2.93 1.24 3.13.15.2 2.14 3.27 5.18 4.58.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.8-.74 2.06-1.45.25-.71.25-1.32.18-1.45-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  )
}

export default function ServiciosPage() {
  const totalServicios = servicios.reduce((acc, s) => acc + s.count, 0)

  return (
    <>
      <ServiceStructuredData
        serviceName="Servicios de Laboratorio AS Laboratorios Trujillo"
        serviceDescription="Catálogo de servicios de laboratorio especializados en Trujillo, La Libertad, Perú. Análisis microbiológicos, fitopatología, biotecnología vegetal, bacteriología y apoyo a la investigación."
        serviceUrl="https://aslaboratorios.com/servicios"
        serviceType="Servicios de Laboratorio"
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

      <main className="min-h-screen bg-[#f5f7f4] font-serif">
        <section className="relative overflow-hidden bg-[#e9f0ea] pb-16 pt-28 sm:pt-32 lg:pb-20">
          <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#b9d5bd]/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#f1c67e]/20 blur-3xl" />

          <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#b8cfbd] bg-white/65 px-3.5 py-1.5 text-xs font-bold text-[#245c3d] backdrop-blur-md">
                  <Microscope className="h-4 w-4" />
                  {totalServicios}+ servicios especializados
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd8cd] bg-white/65 px-3.5 py-1.5 text-xs font-medium text-[#587064] backdrop-blur-md">
                  <MapPin className="h-4 w-4 text-[#2e7048]" />
                  Trujillo, Perú
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-[#173a2c] sm:text-5xl">
                Ciencia aplicada para tomar mejores decisiones
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5d7167] sm:text-lg">
                Análisis, biotecnología y soporte técnico para agricultura, alimentos, ambiente e investigación. Te
                ayudamos a elegir el servicio y a preparar correctamente tu muestra.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/51961996645?text=Hola,%20necesito%20orientación%20para%20elegir%20un%20servicio%20de%20laboratorio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#173f2e] px-6 text-sm font-bold text-white shadow-[0_16px_30px_-18px_rgba(16,61,42,0.9)] transition hover:-translate-y-0.5 hover:bg-[#245a40]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar orientación
                </a>
                <a
                  href="#especialidades"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#b7c8bb] bg-white/70 px-6 text-sm font-bold text-[#254d39] transition hover:border-[#8dad94] hover:bg-white"
                >
                  Ver especialidades
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-[#c8d6ca] pt-5">
                {[
                  { value: "6", label: "áreas técnicas" },
                  { value: `${totalServicios}+`, label: "servicios" },
                  { value: "1997", label: "desde" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xl font-bold text-[#1d5137] sm:text-2xl">{item.value}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#6c7f75]">{item.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="relative mx-auto w-full max-w-xl">
              <div className="relative h-[410px] overflow-hidden rounded-[30px] border border-white/80 bg-[#dfe9df] shadow-[0_30px_70px_-35px_rgba(12,54,36,0.55)] sm:h-[460px]">
                <Image
                  src="/servicios/fito.jpg"
                  alt="Especialista de AS Laboratorios trabajando con una muestra vegetal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082b1e]/80 via-[#123f2a]/10 to-transparent" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/85 px-3 py-2 text-xs font-bold text-[#24583d] shadow-lg backdrop-blur-xl sm:left-6 sm:top-6">
                  <ShieldCheck className="h-4 w-4" />
                  Atención técnica desde el primer contacto
                </div>

                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/30 bg-[#103928]/90 p-5 text-white shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b9d7c2]">Antes de enviar tu muestra</p>
                  <p className="mt-2 text-xl font-bold">Confirma qué necesitas evaluar</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/80">
                    {["Tipo de muestra", "Cantidad necesaria", "Conservación", "Tiempo de entrega"].map((item) => (
                      <span key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#91c89d]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="relative z-20 mx-auto -mt-6 w-[calc(100%-2rem)] max-w-6xl">
          <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/90 bg-white/90 p-2 shadow-[0_18px_45px_-24px_rgba(15,55,38,0.42)] backdrop-blur-2xl [scrollbar-width:none]">
            <span className="shrink-0 rounded-xl bg-[#173f2e] px-4 py-2.5 text-xs font-bold text-white">Especialidades</span>
            {servicios.map((servicio) => (
              <Link
                key={servicio.href}
                href={servicio.href}
                className="shrink-0 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#52675c] transition hover:bg-[#edf3ee] hover:text-[#245f3e]"
              >
                {servicio.title}
              </Link>
            ))}
          </div>
        </div>

        <section id="especialidades" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <ScrollReveal className="mb-9 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2e7048]">Áreas de servicio</span>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#173a2c] sm:text-4xl">Encuentra la especialidad adecuada</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[#66796f] md:justify-self-end sm:text-base">
                Explora cada área para conocer sus análisis, alcances y aplicaciones. Si aún no sabes cuál elegir,
                puedes buscar por el nombre del microorganismo, muestra o necesidad.
              </p>
            </ScrollReveal>

            <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {servicios.map((servicio) => (
                <StaggerItem key={servicio.title} className="h-full">
                  <Link
                    href={servicio.href}
                    className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dfe7e1] bg-[#fbfcfb] transition duration-500 hover:-translate-y-1.5 hover:border-[#b9cfbe] hover:shadow-[0_24px_55px_-28px_rgba(18,64,44,0.45)]"
                    aria-label={`Ver servicios de ${servicio.title}`}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={servicio.image || "/placeholder.svg"}
                        alt={`${servicio.title} en AS Laboratorios`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${servicio.color} opacity-35`} />
                      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/70 bg-white/90 shadow-lg backdrop-blur-md">
                          <servicio.icon className={`h-5 w-5 ${servicio.textColor}`} />
                        </span>
                        <span className="rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[#345845] shadow-md backdrop-blur-md">
                          {servicio.count} servicios
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${servicio.textColor}`}>{servicio.audience}</p>
                      <h3 className="mt-2 text-xl font-bold text-[#203e31] transition-colors group-hover:text-[#2e7048]">{servicio.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#687a71]">{servicio.description}</p>

                      <div className="mt-5 space-y-2.5 border-t border-[#e2e9e4] pt-4">
                        {servicio.services.slice(0, 3).map((service) => (
                          <span key={service} className="flex items-center gap-2 text-xs text-[#566a60]">
                            <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${servicio.textColor}`} />
                            {service}
                          </span>
                        ))}
                      </div>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#285f40]">
                        Explorar especialidad
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <AnalysisSearch />

        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <ScrollReveal className="mb-9 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2e7048]">De la consulta al resultado</span>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#183c2d] sm:text-4xl">Una atención clara en tres pasos</h2>
              <p className="mt-3 text-sm leading-6 text-[#66796f] sm:text-base">
                Coordinamos contigo el servicio, la recepción de la muestra y el entregable para reducir dudas antes de iniciar.
              </p>
            </ScrollReveal>
            <StaggerGroup className="grid gap-4 md:grid-cols-3" staggerDelay={0.1}>
              {[
                { icon: Send, number: "01", title: "Cuéntanos qué necesitas", text: "Indica qué deseas evaluar, controlar o investigar y en qué tipo de muestra." },
                { icon: PackageCheck, number: "02", title: "Prepara y entrega la muestra", text: "Te indicamos cantidad, recipiente, conservación y condiciones de recepción." },
                { icon: FileCheck2, number: "03", title: "Recibe resultados claros", text: "Obtén el informe correspondiente y orientación para resolver consultas técnicas." },
              ].map((step) => (
                <StaggerItem key={step.number}>
                  <div className="group h-full rounded-[24px] border border-[#dfe7e1] bg-[#f8faf8] p-6 transition hover:-translate-y-1 hover:border-[#b9d1bf] hover:shadow-xl sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e1ede3] text-[#2e7048]"><step.icon className="h-5 w-5" /></span>
                      <span className="text-3xl font-bold text-[#d9e5dc]">{step.number}</span>
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-[#234436]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6d7e75]">{step.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="bg-[#f5f7f4] py-14 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-[28px] bg-[#123b2a] px-6 py-8 shadow-[0_30px_70px_-40px_rgba(8,42,28,0.8)] sm:px-10 sm:py-10 lg:px-12">
                <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#62a670]/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#ef9f38]/15 blur-3xl" />
                <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#a9d3b2]">Orientación sin compromiso</span>
                    <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">¿No encuentras exactamente el análisis que buscas?</h2>
                    <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                      Escríbenos qué muestra tienes y qué necesitas comprobar. Nuestro equipo te ayudará a definir el servicio adecuado.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/51961996645?text=Hola,%20tengo%20una%20muestra%20y%20necesito%20ayuda%20para%20definir%20el%20análisis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#efaa48] px-6 text-sm font-bold text-[#173428] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#ffc46d]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
