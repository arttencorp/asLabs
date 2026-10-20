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
  Dna,
} from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export const metadata: Metadata = {
  title: "Análisis y Servicios de Laboratorio en Trujillo | AS Laboratorios",
  description:
    "Análisis microbiológicos, fitopatología, biotecnología vegetal y desarrollo de cepas con selección funcional, WGS y validación para agricultura, industria y academia.",
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
    "aislamiento de cepas bacterianas Perú",
    "selección de cepas biofertilizantes",
    "WGS bacteriano Perú",
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
    title: "Análisis de Agua y Ambiente",
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
    title: "Fisicoquímica y Bioquímica",
    description:
      "Caracterizamos azúcares, proteínas, lípidos y actividad enzimática en alimentos, muestras biológicas, agrícolas e industriales.",
    audience: "Composición y función",
    href: "/servicios/fisicoquimicos-bioquimicos",
    icon: FlaskConical,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-700",
    services: ["Análisis enzimáticos", "Proteínas totales y perfiles", "Lípidos y grasas", "Azúcares y composición"],
    image: "/servicios/micro.jpeg",
    count: 18,
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
    title: "Investigación, Bioquímica y Enzimática",
    description:
      "Acompañamos ensayos, tesis y desarrollo científico con análisis enzimáticos, bioquímicos y moleculares.",
    audience: "Investigación científica",
    href: "/servicios/apoyo-investigacion",
    icon: BookOpenCheck,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-600",
    services: ["Actividad enzimática", "Parámetros bioquímicos", "Diseño de ensayos", "Análisis molecular y bioinformático"],
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

function EditorialServices() {
  const totalServicios = servicios.reduce((acc, service) => acc + service.count, 0)

  return (
    <main className="min-h-screen bg-[#f4f6f3] font-[var(--font-poppins)] text-[#18231e]">
      <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#062b22] pb-14 pt-28 text-white sm:pt-32 lg:pb-16">
        <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(101,180,132,.26),transparent_31%)]" />
        <div className="relative mx-auto grid max-w-[1360px] gap-10 px-5 sm:px-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-medium text-[#b7d4c5]"><span className="h-2 w-2 bg-[#d5a34f]" />Servicios científicos<span className="h-px w-24 bg-white/15" /></div>
            <h1 className="mt-5 max-w-[680px] text-[clamp(2.35rem,5vw,4.85rem)] font-medium leading-[.98] tracking-[-.052em]">Una muestra. Una pregunta. Evidencia para decidir.</h1>
            <p className="mt-6 max-w-[620px] text-sm leading-7 text-white/66">Análisis microbiológicos, bioquímicos, enzimáticos y moleculares; fitopatología, biotecnología vegetal y soporte para investigación.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#especialidades" className="group inline-flex h-11 items-center gap-3 bg-[#d5a34f] px-5 text-xs font-semibold text-[#10251e] transition hover:bg-[#e4b866]">Explorar especialidades <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
              <WhatsAppContact message="Hola, necesito orientación para elegir un servicio de laboratorio" className="inline-flex h-11 items-center gap-2 border border-white/25 px-5 text-xs font-semibold text-white transition hover:bg-white hover:text-[#062b22]"><MessageCircle className="h-4 w-4" />Orientación técnica</WhatsAppContact>
            </div>
          </div>
          <div className="grid border-l border-t border-white/16 sm:grid-cols-[1.2fr_.8fr]">
            <div className="relative min-h-[300px] overflow-hidden border-b border-r border-white/16 sm:min-h-[390px]">
              <Image src="/servicios/fito.jpg" alt="Evaluación de muestras vegetales en AS Laboratorios" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5"><p className="text-[10px] text-white/52">Muestra → método → resultado</p><p className="mt-1 max-w-sm text-lg font-medium">Diseñamos la ruta analítica según la matriz y la pregunta.</p></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1">
              {[{ value: "07", label: "plataformas técnicas" }, { value: `${totalServicios}+`, label: "servicios disponibles" }, { value: "1997", label: "ciencia aplicada" }].map((stat) => <div key={stat.label} className="border-b border-r border-white/16 p-5 sm:p-6"><p className="text-2xl font-medium tracking-[-.04em] text-[#d5a34f] sm:text-3xl">{stat.value}</p><p className="mt-2 text-[9px] leading-4 text-white/48">{stat.label}</p></div>)}
              <div className="border-b border-r border-white/16 p-5 sm:p-6"><MapPin className="h-4 w-4 text-[#9bcdb4]" /><p className="mt-3 text-[10px] leading-5 text-white/58">Recepción y procesamiento técnico en Trujillo, Perú.</p></div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Especialidades" className="border-b border-[#d5ddd7] bg-white">
        <div className="mx-auto flex max-w-[1360px] overflow-x-auto [scrollbar-width:none]">
          {servicios.map((service, index) => <Link key={service.href} href={service.href} className="group flex min-w-[205px] flex-1 items-center gap-3 border-r border-[#e1e6e2] px-4 py-4 transition hover:bg-[#f0f4f0]"><span className="text-[9px] text-[#9aa69f]">{String(index + 1).padStart(2, "0")}</span><span className="text-[10px] font-semibold leading-4 text-[#30463a] group-hover:text-[#0b7a55]">{service.title}</span></Link>)}
        </div>
      </nav>

      <section id="especialidades" data-navbar-theme="light" className="scroll-mt-20 bg-[#f4f6f3] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="grid gap-4 border-b border-[#cbd5ce] pb-6 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div><p className="text-[10px] font-semibold text-[#0b7a55]">Capacidades por especialidad</p><h2 className="mt-2 max-w-[780px] text-[clamp(2rem,3.5vw,3.6rem)] font-medium leading-[1.02] tracking-[-.045em]">Encuentra el método adecuado para tu muestra.</h2></div>
            <p className="max-w-[520px] text-xs leading-6 text-[#617068] lg:justify-self-end">Cada división reúne métodos, requisitos de muestra y entregables específicos. Explora la que corresponde a tu objetivo.</p>
          </div>
          <div className="mt-7 border-l border-t border-[#cbd5ce]">
            {servicios.map((service, index) => <Link key={service.href} href={service.href} className="group grid border-b border-r border-[#cbd5ce] bg-white transition-colors hover:bg-[#f9fbf9] md:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr_340px]">
              <div className="relative min-h-[190px] overflow-hidden border-b border-[#dce3de] md:border-b-0 md:border-r"><Image src={service.image} alt={`${service.title} en AS Laboratorios`} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" sizes="300px" /><div className="absolute inset-0 bg-gradient-to-t from-[#062b22]/52 to-transparent" /><span className="absolute left-4 top-4 grid h-9 w-9 place-items-center border border-white/50 bg-white/90 text-[#0b7a55]"><service.icon className="h-4 w-4" /></span><span className="absolute bottom-4 left-4 text-[9px] font-medium text-white/80">{service.count} servicios disponibles</span></div>
              <div className="p-5 sm:p-7 lg:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-semibold text-[#0b7a55]">{service.audience}</p><h3 className="mt-2 text-xl font-medium tracking-[-.025em] text-[#17251e] sm:text-2xl">{service.title}</h3></div><span className="text-[10px] text-[#9aa69f]">{String(index + 1).padStart(2, "0")}</span></div><p className="mt-4 max-w-2xl text-xs leading-6 text-[#637168]">{service.description}</p><span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#0b7a55]">Ver métodos y requisitos <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
              <div className="hidden border-l border-[#dce3de] p-7 xl:block"><p className="text-[9px] font-semibold text-[#78867e]">Incluye</p><div className="mt-4 space-y-3">{service.services.map((item) => <span key={item} className="flex items-start gap-3 text-[11px] leading-5 text-[#42564b]"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#d5a34f]" />{item}</span>)}</div></div>
            </Link>)}
          </div>
        </div>
      </section>

      <AnalysisSearch />

      <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#062b22] py-16 text-white sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8"><div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]"><div><p className="text-[10px] font-semibold text-[#a8d8c1]">Ruta de atención</p><h2 className="mt-3 text-[clamp(2rem,3.5vw,3.6rem)] font-medium leading-[1.03] tracking-[-.04em]">De la consulta al informe, sin pasos ambiguos.</h2></div><div className="grid border-l border-t border-white/15 sm:grid-cols-3">{[
          { icon: Send, title: "Define la pregunta", text: "Cuéntanos qué necesitas medir, comprobar o investigar." },
          { icon: PackageCheck, title: "Prepara la muestra", text: "Confirmamos cantidad, recipiente y conservación antes del envío." },
          { icon: FileCheck2, title: "Recibe evidencia", text: "Entregamos el informe y resolvemos tus consultas técnicas." },
        ].map((step, index) => <div key={step.title} className="relative min-h-[220px] border-b border-r border-white/15 p-5 sm:p-6"><step.icon className="h-5 w-5 text-[#d5a34f]" /><span className="absolute right-5 top-5 text-[10px] text-white/35">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-12 text-base font-medium">{step.title}</h3><p className="mt-3 text-[11px] leading-5 text-white/55">{step.text}</p></div>)}</div></div></div>
      </section>

      <section data-navbar-theme="light" className="border-t border-[#d4ddd7] bg-white py-14 sm:py-16">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-7 px-5 sm:px-8 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="text-[10px] font-semibold text-[#0b7a55]">Orientación técnica</p><h2 className="mt-2 text-2xl font-medium tracking-[-.035em] text-[#17251e] sm:text-3xl">¿Tienes una muestra, pero aún no sabes qué análisis corresponde?</h2><p className="mt-3 text-xs leading-6 text-[#65736b]">Descríbenos la matriz y tu objetivo. Te ayudamos a definir el método, la cantidad necesaria y el entregable.</p></div><WhatsAppContact message="Hola, tengo una muestra y necesito ayuda para definir el análisis" className="inline-flex h-12 shrink-0 items-center justify-center gap-3 bg-[#0b7a55] px-6 text-xs font-semibold text-white transition hover:bg-[#086545]"><WhatsAppIcon className="h-5 w-5" />Consultar por WhatsApp</WhatsAppContact></div>
      </section>
    </main>
  )
}

export default function ServiciosPage() {
  const totalServicios = servicios.reduce((acc, s) => acc + s.count, 0)

  return (
    <>
      <ServiceStructuredData
        serviceName="Servicios de Laboratorio AS Laboratorios Trujillo"
        serviceDescription="Catálogo de servicios de laboratorio especializados en Trujillo, Perú. Análisis microbiológicos, fitopatología, biotecnología vegetal, bacteriología, desarrollo de cepas, WGS y apoyo a la investigación."
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

      <EditorialServices />

      {false && <main className="min-h-screen bg-[#f5f7f4] font-serif">
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
                <WhatsAppContact
                  message="Hola, necesito orientación para elegir un servicio de laboratorio"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#173f2e] px-6 text-sm font-bold text-white shadow-[0_16px_30px_-18px_rgba(16,61,42,0.9)] transition hover:-translate-y-0.5 hover:bg-[#245a40]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar orientación
                </WhatsAppContact>
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
                  { value: "7", label: "áreas técnicas" },
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
                  <WhatsAppContact
                    message="Hola, tengo una muestra y necesito ayuda para definir el análisis"
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#efaa48] px-6 text-sm font-bold text-[#173428] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#ffc46d]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Consultar por WhatsApp
                  </WhatsAppContact>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>}

      <Footer />
    </>
  )
}
