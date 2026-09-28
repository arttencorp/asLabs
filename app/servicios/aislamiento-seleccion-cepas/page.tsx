import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CloudDownload,
  Dna,
  FileCheck2,
  Leaf,
  MapPin,
  PackageCheck,
  ScanSearch,
  ShieldCheck,
  Sprout,
  TestTube2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal"
import { BreadcrumbStructuredData, FAQStructuredData, ServiceStructuredData } from "@/components/structured-data"
import { constructMetadata } from "@/lib/metadata"

const canonicalPath = "/servicios/aislamiento-seleccion-cepas"

export const metadata = constructMetadata({
  title: "Aislamiento, Selección e Identificación de Cepas en Perú",
  description:
    "Desarrollo de cepas para biofertilizantes y control biológico: hasta 30 aislados, selección funcional, WGS bacteriano, bioinformática, validación en campo, transferencia y seguimiento.",
  path: canonicalPath,
  image: "/research/research-lab.png",
  keywords: [
    "aislamiento de cepas bacterianas Perú",
    "selección de cepas para biofertilizantes",
    "identificación de bacterias WGS Perú",
    "secuenciación de genoma completo bacteriano Perú",
    "desarrollo de biofertilizantes Perú",
    "cepas promotoras del crecimiento vegetal",
    "cepas para control biológico",
    "selección de microorganismos agrícolas",
    "WGS bacteriano Perú",
    "análisis bioinformático bacteriano",
    "pruebas de eficacia de cepas",
    "aislamiento bacteriano para empresas",
    "AS Laboratorios biotecnología",
  ],
})

const process = [
  {
    number: "01",
    title: "Definimos el objetivo",
    text: "Precisamos cultivo, territorio, microorganismo objetivo y función esperada: control, nutrición o promoción del crecimiento.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Aislamos candidatos",
    text: "Procesamos matrices pertinentes y conformamos una colección de trabajo de hasta 30 aislados trazables.",
    icon: TestTube2,
  },
  {
    number: "03",
    title: "Seleccionamos desempeño",
    text: "Comparamos los aislados mediante pruebas funcionales diseñadas para el objetivo técnico del producto.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Confirmamos identidad",
    text: "Caracterizamos los candidatos finalistas mediante secuenciación del genoma completo y bioinformática.",
    icon: Dna,
  },
  {
    number: "05",
    title: "Validamos en cultivo",
    text: "Evaluamos el comportamiento bajo condiciones definidas de invernadero o parcela demostrativa.",
    icon: Sprout,
  },
  {
    number: "06",
    title: "Transferimos y seguimos",
    text: "Entregamos cultivos de inicio, preservamos respaldos y acompañamos el control anual de estabilidad.",
    icon: ShieldCheck,
  },
]

const sequencingSpecs = [
  ["Preparación", "Extracción de ADN del cultivo y control de calidad por fluorometría"],
  ["Plataforma", "Secuenciación de nueva generación en Illumina o MGI"],
  ["Lecturas", "Paired-end 2 × 150 bp y más de un millón de lecturas por dirección"],
  ["Profundidad", "Objetivo de trabajo de 100× para un genoma bacteriano de referencia de ~5 Mb"],
  ["Salida", "Aproximadamente 1 Gb por muestra"],
  ["Calidad", "Criterio de 85 % de bases con Q30 o superior"],
]

const crops = ["Banano", "Arroz", "Caña de azúcar", "Plátano", "Arándano", "Otros cultivos"]

const faqs = [
  {
    question: "¿Cuántos aislados se evalúan?",
    answer:
      "El programa puede trabajar con hasta 30 aislados. La cantidad final depende de la matriz, el objetivo técnico y la recuperación obtenida durante el aislamiento.",
  },
  {
    question: "¿La secuenciación WGS demuestra por sí sola la eficacia de una cepa?",
    answer:
      "No. El WGS aporta identidad, información genética, comparación y trazabilidad. El potencial controlador o promotor se determina mediante pruebas funcionales y, cuando corresponde, validación en cultivo.",
  },
  {
    question: "¿Qué recibe la empresa al finalizar?",
    answer:
      "El esquema contempla cinco cultivos puros, tres cultivos liofilizados y dos cultivos en vial puro, además de los informes y datos definidos para el proyecto.",
  },
  {
    question: "¿Cómo funciona el resguardo de la cepa?",
    answer:
      "AS Laboratorios conserva dos cultivos de respaldo durante cinco años y realiza un control de calidad anual. También se puede revisar anualmente el cultivo de producción del cliente para detectar cambios relevantes.",
  },
  {
    question: "¿El origen geográfico garantiza el resultado?",
    answer:
      "El origen ecológicamente pertinente mejora la relevancia del proceso de selección, pero no sustituye la validación. Cada candidato debe demostrar su desempeño en los ensayos acordados.",
  },
]

export default function StrainDevelopmentPage() {
  return (
    <>
      <ServiceStructuredData
        serviceName="Aislamiento, Selección e Identificación de Cepas"
        serviceDescription="Programa para empresas de biofertilizantes y control biológico con aislamiento de hasta 30 candidatos, selección funcional, WGS, bioinformática, validación, transferencia y seguimiento anual."
        serviceUrl="https://aslaboratorios.com/servicios/aislamiento-seleccion-cepas"
        serviceType="Desarrollo y caracterización de cepas microbianas"
        serviceArea={["La Libertad", "Lima", "Piura", "Lambayeque", "Arequipa"]}
        image="/research/research-lab.png"
        offers={[
          { name: "Aislamiento de cepas", description: "Recuperación trazable de hasta 30 aislados según el objetivo del proyecto" },
          { name: "Selección funcional", description: "Pruebas comparativas para control biológico o promoción del crecimiento" },
          { name: "WGS bacteriano", description: "Secuenciación del genoma completo y análisis bioinformático" },
          { name: "Transferencia y seguimiento", description: "Entrega de cultivos, resguardo por cinco años y control anual" },
        ]}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Inicio", url: "https://aslaboratorios.com" },
          { name: "Servicios", url: "https://aslaboratorios.com/servicios" },
          { name: "Desarrollo de Cepas", url: "https://aslaboratorios.com/servicios/aislamiento-seleccion-cepas" },
        ]}
      />
      <FAQStructuredData questions={faqs} />
      <Navbar overlay />

      <main className="min-h-screen bg-[#f4f7f3]">
        <section className="relative isolate min-h-[690px] overflow-hidden bg-[#082b20] pt-28 text-white sm:min-h-[720px] sm:pt-32">
          <Image
            src="/research/research-lab.png"
            alt="Investigación y selección de cepas microbianas en AS Laboratorios"
            fill
            priority
            className="-z-20 object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,39,28,.96)_0%,rgba(7,48,34,.86)_48%,rgba(7,42,31,.42)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_34%,rgba(163,230,53,.18),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#082b20] to-transparent" />

          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-8 lg:pb-24">
            <ScrollReveal className="max-w-3xl">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-emerald-50 backdrop-blur-xl transition hover:bg-white/15"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Servicios para empresas
              </Link>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.23em] text-lime-300">
                De la biodiversidad a una cepa lista para escalar
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl">
                Aislamiento, selección e identificación de cepas
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-50/80 sm:text-lg sm:leading-8">
                Diseñamos programas para empresas de biofertilizantes y control biológico: recuperamos candidatos,
                medimos su desempeño, confirmamos su identidad y acompañamos su transferencia y estabilidad.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppContact
                  message="Hola, deseo evaluar un proyecto de aislamiento, selección e identificación de cepas para mi empresa."
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-lime-300 px-6 text-sm font-black text-emerald-950 shadow-[0_18px_45px_-22px_rgba(190,242,100,.9)] transition hover:-translate-y-1 hover:bg-lime-200"
                >
                  Evaluar mi proyecto
                  <ArrowRight className="h-4 w-4" />
                </WhatsAppContact>
                <a
                  href="#proceso"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  Ver el proceso
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="grid grid-cols-3 gap-2.5 lg:mb-1">
              {[
                ["Hasta 30", "aislados"],
                ["100×", "profundidad WGS"],
                ["5 años", "de resguardo"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[22px] border border-white/20 bg-[#092f23]/70 p-4 backdrop-blur-xl sm:p-5">
                  <p className="text-xl font-black text-lime-300 sm:text-2xl">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-emerald-50/60">{label}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        <div className="relative z-10 mx-auto -mt-6 w-[calc(100%-2rem)] max-w-6xl">
          <nav className="flex gap-1.5 overflow-x-auto rounded-2xl border border-white bg-white/90 p-2 shadow-[0_20px_55px_-30px_rgba(5,46,32,.55)] backdrop-blur-2xl [scrollbar-width:none]">
            {[
              ["Proceso", "#proceso"],
              ["Selección", "#seleccion"],
              ["WGS", "#wgs"],
              ["Parcelas", "#parcelas"],
              ["Transferencia", "#transferencia"],
              ["Preguntas", "#preguntas"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold text-[#446457] transition hover:bg-emerald-50 hover:text-emerald-800">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <section id="proceso" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Programa integral</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] text-emerald-950 sm:text-5xl">Seis etapas, una cepa trazable</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
                El proyecto conecta microbiología, ensayos funcionales, genómica y campo. Cada filtro reduce candidatos
                hasta llegar a los aislados que realmente justifican continuar.
              </p>
            </ScrollReveal>

            <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
              {process.map((step) => (
                <StaggerItem key={step.number} className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-[28px] border border-emerald-950/10 bg-white p-6 shadow-[0_20px_55px_-42px_rgba(4,56,38,.5)] transition duration-500 hover:-translate-y-1.5 hover:border-emerald-700/30 hover:shadow-[0_28px_65px_-38px_rgba(4,56,38,.55)] sm:p-7">
                    <span className="absolute right-5 top-4 text-5xl font-black text-emerald-950/[.05]">{step.number}</span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-950 text-lime-300">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-7 text-[10px] font-black uppercase tracking-[.2em] text-emerald-600">Etapa {step.number}</p>
                    <h3 className="mt-2 text-xl font-bold text-emerald-950">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section id="seleccion" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <ScrollReveal className="relative min-h-[510px] overflow-hidden rounded-[36px] bg-emerald-950">
              <Image src="/servicios/micro.jpeg" alt="Selección experimental de aislados microbianos" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/15 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/20 bg-emerald-950/80 p-6 text-white backdrop-blur-xl sm:inset-x-7 sm:bottom-7">
                <p className="text-xs font-black uppercase tracking-[.18em] text-lime-300">Embudo de selección</p>
                <p className="mt-2 text-2xl font-semibold">No elegimos por apariencia: comparamos evidencia.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Selección funcional</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] text-emerald-950 sm:text-5xl">Del aislado prometedor al candidato útil</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Partimos de hasta 30 aislados y aplicamos pruebas definidas según el propósito del producto. El diseño
                puede orientarse a antagonismo, promoción del crecimiento, nutrición vegetal u otro atributo medible.
              </p>
              <div className="mt-7 space-y-3">
                {[
                  "Matriz, cultivo y condiciones de uso definidos desde el inicio",
                  "Pruebas comparativas con criterios de avance previamente acordados",
                  "Selección de los candidatos de mayor desempeño y reproducibilidad",
                  "Validación posterior en invernadero o parcela cuando el proyecto lo requiere",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-[#f3f7f2] p-4 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="wgs" className="scroll-mt-24 bg-[#082f23] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="grid gap-7 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3.5 py-2 text-xs font-bold text-lime-300">
                  <Dna className="h-4 w-4" />
                  Whole Genome Sequencing
                </span>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Identidad, genoma y trazabilidad</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-emerald-50/70 lg:justify-self-end">
                El WGS caracteriza al candidato finalista y permite documentar su genoma. La eficacia se confirma por
                los ensayos funcionales; la genómica aporta una capa independiente de identidad, comparación y seguimiento.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
              <StaggerGroup className="grid gap-3 sm:grid-cols-2" staggerDelay={0.06}>
                {sequencingSpecs.map(([label, value]) => (
                  <StaggerItem key={label}>
                    <div className="h-full rounded-[24px] border border-white/10 bg-white/[.055] p-5 backdrop-blur-sm">
                      <p className="text-[10px] font-black uppercase tracking-[.18em] text-lime-300">{label}</p>
                      <p className="mt-2 text-sm leading-6 text-emerald-50/80">{value}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <ScrollReveal delay={0.15} className="rounded-[30px] bg-lime-300 p-7 text-emerald-950 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[.18em]">Análisis bioinformático</p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Control de calidad de los datos",
                    "Ensamblaje del genoma",
                    "Predicción de genes",
                    "Anotación funcional y avanzada",
                    "Análisis comparativo y filogenético",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-6">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 rounded-2xl bg-emerald-950 p-5 text-sm leading-6 text-emerald-50/80">
                  Los parámetros indicados son valores de trabajo para un genoma bacteriano de referencia de aproximadamente
                  5 Mb. El tamaño real se reporta a partir del ensamblaje obtenido.
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="parcelas" className="scroll-mt-24 bg-[#eef4ea] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Validación agronómica</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] text-emerald-950 sm:text-5xl">Parcelas demostrativas para observar la respuesta</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Contamos con acceso a escenarios de prueba para evaluar candidatos en cultivos relevantes y bajo un protocolo definido para cada proyecto.
              </p>
            </ScrollReveal>
            <StaggerGroup className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6" staggerDelay={0.06}>
              {crops.map((crop, index) => (
                <StaggerItem key={crop}>
                  <div className="group flex h-36 flex-col justify-between rounded-[24px] border border-emerald-950/10 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-700/30 hover:shadow-xl">
                    <Leaf className="h-6 w-6 text-emerald-700 transition-transform group-hover:-rotate-6 group-hover:scale-110" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{String(index + 1).padStart(2, "0")}</p>
                      <p className="mt-1 font-bold text-emerald-950">{crop}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <ScrollReveal className="mt-12 overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white">
              <div className="grid lg:grid-cols-[.72fr_1.28fr]">
                <div className="bg-emerald-950 p-7 text-white sm:p-9">
                  <MapPin className="h-8 w-8 text-lime-300" />
                  <h3 className="mt-7 text-3xl font-semibold">El origen forma parte del diseño</h3>
                  <p className="mt-4 text-sm leading-6 text-emerald-50/70">
                    Seleccionamos la procedencia de las muestras según el cultivo, el mercado de uso y el ambiente donde se espera aplicar la cepa.
                  </p>
                </div>
                <div className="grid gap-px bg-emerald-950/10 sm:grid-cols-3">
                  {[
                    ["Perú", "Para proyectos de uso nacional, priorizamos aislados obtenidos en el país."],
                    ["Ecuador", "En proyectos para banano podemos trabajar con aislamiento local cuando el destino de uso lo requiere."],
                    ["Colombia", "Para café podemos evaluar aislamiento de origen colombiano según el alcance acordado."],
                  ].map(([country, text]) => (
                    <div key={country} className="bg-white p-6 sm:p-7">
                      <p className="text-lg font-black text-emerald-800">{country}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="border-t border-emerald-950/10 bg-amber-50 px-6 py-4 text-xs leading-5 text-amber-900 sm:px-9">
                La procedencia aumenta la pertinencia ecológica, pero no constituye por sí sola una garantía de eficacia. El desempeño se verifica mediante pruebas funcionales y validación experimental.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section id="transferencia" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Transferencia y continuidad</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] text-emerald-950 sm:text-5xl">La cepa no queda sola después de la entrega</h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
                Entregamos material para iniciar el trabajo y mantenemos un respaldo independiente para sostener la trazabilidad y observar posibles cambios a lo largo del tiempo.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                {
                  icon: PackageCheck,
                  eyebrow: "Entrega al cliente",
                  title: "10 cultivos de inicio",
                  points: ["5 cultivos puros", "3 cultivos liofilizados", "2 cultivos en vial puro"],
                  className: "bg-emerald-950 text-white",
                },
                {
                  icon: ShieldCheck,
                  eyebrow: "Respaldo AS Labs",
                  title: "Custodia durante 5 años",
                  points: ["2 cultivos de reserva", "Control de calidad anual", "Trazabilidad del material conservado"],
                  className: "bg-[#e5f2df] text-emerald-950",
                },
                {
                  icon: Dna,
                  eyebrow: "Seguimiento",
                  title: "Revisión anual del cultivo",
                  points: ["Comparación de estabilidad", "Búsqueda de cambios relevantes", "Evaluación ante pérdida de desempeño"],
                  className: "bg-[#f4ead8] text-emerald-950",
                },
              ].map((card) => (
                <ScrollReveal key={card.title} className={`rounded-[30px] p-7 sm:p-8 ${card.className}`}>
                  <card.icon className="h-7 w-7" />
                  <p className="mt-10 text-[10px] font-black uppercase tracking-[.18em] opacity-65">{card.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{card.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {card.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 opacity-80">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mt-6 rounded-[30px] border border-emerald-950/10 bg-[#f7faf6] p-7 sm:p-9">
              <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
                <div>
                  <CloudDownload className="h-8 w-8 text-emerald-700" />
                  <h3 className="mt-5 text-2xl font-semibold text-emerald-950">Documentación y datos incluidos</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Certificado de Análisis",
                    "Lista de genes anotados",
                    "Archivos crudos FASTQ",
                    "Resultados bioinformáticos analizados",
                    "Tamaño real del genoma ensamblado",
                    "Enlace en la nube disponible por 90 días",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-medium text-slate-700 shadow-sm">
                      <FileCheck2 className="h-5 w-5 shrink-0 text-emerald-700" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 border-t border-emerald-950/10 pt-5 text-xs leading-5 text-slate-500">
                La entrega digital se coordina por FTP o Google Drive. La plataforma de secuenciación y los parámetros finales se confirman según la muestra y el alcance técnico contratado.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section id="preguntas" className="scroll-mt-24 bg-[#f1f5ef] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <ScrollReveal>
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Antes de iniciar</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-.04em] text-emerald-950">Preguntas frecuentes</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                Cada programa se define a partir del cultivo, el territorio, el objetivo del producto y el nivel de evidencia que necesita la empresa.
              </p>
            </ScrollReveal>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[22px] border border-emerald-950/10 bg-white p-5 open:border-emerald-700/25 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-emerald-950">
                    {faq.question}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700 transition group-open:rotate-90">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="max-w-3xl pt-4 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f1f5ef] px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
          <ScrollReveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-emerald-950 p-8 text-white shadow-[0_32px_80px_-42px_rgba(2,45,31,.8)] sm:p-12 lg:p-14">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lime-300/15 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[.2em] text-lime-300">Proyecto a medida</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-.03em] sm:text-4xl">Cuéntanos qué microorganismo y resultado necesita tu empresa</h2>
                <p className="mt-4 text-sm leading-6 text-emerald-50/70 sm:text-base">
                  Prepararemos un alcance con matrices, número de aislados, pruebas de selección, validación, entregables y cronograma.
                </p>
              </div>
              <WhatsAppContact
                message="Hola, represento a una empresa y deseo diseñar un programa de aislamiento, selección e identificación de cepas."
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-lime-300 px-7 text-sm font-black text-emerald-950 transition hover:-translate-y-1 hover:bg-lime-200"
              >
                Conversar con el equipo
                <ArrowRight className="h-4 w-4" />
              </WhatsAppContact>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  )
}
