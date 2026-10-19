import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Beaker,
  Building2,
  Factory,
  FlaskConical,
  Sprout,
  TestTubes,
  Wheat,
} from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { constructMetadata } from "@/lib/metadata"

export const metadata: Metadata = constructMetadata({
  title: "Análisis enzimáticos, proteínas y lípidos en Perú | AS Laboratorios",
  description:
    "Análisis fisicoquímicos y bioquímicos de enzimas, proteínas, lípidos, azúcares, alimentos, agua, suelos y fertilizantes para investigación y control de calidad.",
  path: "/servicios/fisicoquimicos-bioquimicos",
  image: "/servicios/micro.jpeg",
})

const sectors = [
  { icon: Wheat, title: "Alimentos", text: "Materias primas, productos agroalimentarios, bebidas y productos procesados." },
  { icon: Sprout, title: "Agricultura", text: "Suelos, sustratos, fertilizantes, extractos vegetales y productos para nutrición vegetal." },
  { icon: Beaker, title: "Investigación", text: "Muestras microbianas, extractos biológicos, preparados y ensayos comparativos." },
  { icon: Factory, title: "Industria", text: "Formulaciones, matrices acuosas, materias primas y control de procesos." },
]

const capabilities = [
  {
    id: "enzimas",
    number: "01",
    icon: FlaskConical,
    color: "#0f7b68",
    title: "Análisis enzimáticos",
    description: "Actividad catalítica, comparación de tratamientos y caracterización de preparados.",
    items: ["Actividad enzimática total", "Amilasas y enzimas amilolíticas", "Proteasas", "Lipasas", "Celulasas", "Pectinasas", "Catalasa y peroxidasa", "Polifenol oxidasa", "Ensayos en extractos biológicos y muestras microbianas"],
    matrices: "Extractos biológicos, preparados enzimáticos, cultivos microbianos, alimentos y matrices compatibles.",
    deliverable: "Informe técnico con actividad enzimática, unidades de medida, condiciones del ensayo y comparación solicitada.",
  },
  {
    id: "proteinas",
    number: "02",
    icon: TestTubes,
    color: "#315f87",
    title: "Proteínas",
    description: "Cuantificación, fracciones solubles y perfiles para desarrollo, alimentos e investigación.",
    items: ["Proteínas totales", "Proteínas solubles", "Proteína cruda", "Concentración de proteína en extractos", "Comparación de proteínas entre tratamientos", "Perfil proteico", "Evaluación de preparados proteicos", "Caracterización de proteínas en alimentos"],
    matrices: "Alimentos, materias primas, biomasa, extractos vegetales, cultivos microbianos y preparados biotecnológicos.",
    deliverable: "Informe cuantitativo o comparativo según la matriz, el objetivo y el alcance analítico acordado.",
  },
  {
    id: "lipidos",
    number: "03",
    icon: Beaker,
    color: "#a36924",
    title: "Lípidos, grasas y aceites",
    description: "Composición lipídica para control de calidad, formulación y estudios aplicados.",
    items: ["Lípidos totales", "Grasa total", "Extracción de fracción lipídica", "Caracterización de aceites", "Comparación de contenido lipídico", "Evaluación de estabilidad según alcance", "Perfil de ácidos grasos según requerimiento", "Lípidos en biomasa y muestras alimentarias"],
    matrices: "Alimentos, semillas, harinas, biomasa, extractos, aceites, materias primas y formulaciones compatibles.",
    deliverable: "Informe técnico con resultados, unidades, identificación de muestra y observaciones del método aplicado.",
  },
  {
    id: "composicion",
    number: "04",
    icon: Building2,
    color: "#6a598b",
    title: "Composición fisicoquímica",
    description: "Parámetros para caracterizar productos, materias primas y procesos.",
    items: ["Azúcares totales", "Fertilizantes líquidos y sólidos", "Alimentos y materias primas", "Agua y matrices acuosas", "Suelos y sustratos", "Extractos vegetales", "Productos agroindustriales", "Formulaciones especiales"],
    matrices: "Fertilizantes, alimentos, bebidas, agua, suelos, sustratos, productos agrícolas y matrices industriales.",
    deliverable: "Informe técnico con los parámetros solicitados y resultados cuantitativos o cualitativos, según corresponda.",
  },
]

export default function PhysicochemicalBiochemicalPage() {
  return (
    <main className="bg-[#f4f6f3] font-[var(--font-poppins)] text-[#17211d]">
      <Navbar />

      <header data-navbar-theme="dark" className="relative overflow-hidden bg-[#062b22] px-5 pb-14 pt-28 text-white sm:px-8 sm:pt-32 lg:px-12 lg:pb-16">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="relative mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div>
            <p className="text-sm text-[#9bcdb4]">Fisicoquímica y bioquímica aplicada</p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,5.4vw,5.4rem)] font-medium leading-[.96] tracking-[-.055em]">Medimos composición. Entendemos función.</h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">Análisis enzimáticos, proteínas, lípidos y parámetros fisicoquímicos para investigación, desarrollo de productos y control de calidad.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#capacidades" className="inline-flex h-11 items-center gap-2 bg-[#d8ac5a] px-5 text-xs font-semibold text-[#173128] transition hover:bg-[#e7bd70]">Ver capacidades <ArrowRight className="h-4 w-4" /></Link>
              <WhatsAppContact mode="modal" className="inline-flex h-11 items-center gap-2 border border-white/30 px-5 text-xs font-semibold text-white transition hover:bg-white hover:text-[#173128]">Consultar mi muestra</WhatsAppContact>
            </div>
          </div>
          <div className="grid border-l border-t border-white/20 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <Link key={capability.id} href={`#${capability.id}`} className="group flex min-h-28 items-center justify-between border-b border-r border-white/20 px-5 text-base font-semibold transition hover:bg-white/[0.08]">
                {capability.id === "enzimas" ? "Enzimas" : capability.id === "lipidos" ? "Lípidos" : capability.id === "composicion" ? "Composición" : capability.title}
                <ArrowRight className="h-4 w-4 text-[#d8ac5a] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className="border-b border-[#cbd5ce] bg-white">
        <div className="mx-auto grid max-w-[1380px] sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-b border-r border-[#dce3de] p-5 sm:min-h-40 lg:border-b-0">
              <Icon className="h-5 w-5 text-[#0c7453]" />
              <h2 className="mt-6 text-sm font-semibold">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-[#65736c]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="capacidades" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-6 border-b border-[#c6d0c9] pb-7 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <h2 className="text-3xl font-medium tracking-[-.04em] sm:text-5xl">Capacidades organizadas por pregunta analítica.</h2>
            <p className="max-w-2xl text-sm leading-7 text-[#65736c] lg:justify-self-end">Cada alcance se confirma según la matriz, la concentración esperada y el uso previsto del resultado. Así evitamos aplicar un método inadecuado a una muestra compleja.</p>
          </div>
          <div className="mt-8 space-y-4">
            {capabilities.map(({ id, number, icon: Icon, color, title, description, items, matrices, deliverable }) => (
              <article key={id} id={id} className="scroll-mt-24 border border-[#cbd5ce] bg-white">
                <div className="grid lg:grid-cols-[300px_1fr]">
                  <div className="border-b border-[#dce3de] p-6 lg:border-b-0 lg:border-r lg:p-8">
                    <Icon className="h-6 w-6" style={{ color }} />
                    <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.18em] text-[#718078]">Capacidad {number}</p>
                    <h3 className="mt-3 text-2xl font-medium tracking-[-.03em]">{title}</h3>
                    <p className="mt-3 text-xs leading-6 text-[#65736c]">{description}</p>
                  </div>
                  <div className="grid gap-0 md:grid-cols-[1fr_.72fr]">
                    <div className="p-6 lg:p-8">
                      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                        {items.map((item) => <div key={item} className="border-b border-[#e2e7e3] pb-3 text-xs leading-5 text-[#35483f]">{item}</div>)}
                      </div>
                    </div>
                    <div className="border-t border-[#dce3de] bg-[#f4f7f4] p-6 md:border-l md:border-t-0 lg:p-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#718078]">Matrices</p>
                      <p className="mt-3 text-xs leading-6 text-[#52645b]">{matrices}</p>
                      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[.16em] text-[#718078]">Entregable</p>
                      <p className="mt-3 text-xs leading-6 text-[#52645b]">{deliverable}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-navbar-theme="dark" className="bg-[#15372b] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-sm text-[#9bcdb4]">Ruta analítica</p><h2 className="mt-3 text-4xl font-medium tracking-[-.045em]">De la muestra a un resultado interpretable.</h2></div>
          <div className="grid border-l border-t border-white/15 sm:grid-cols-3">
            {[
              ["1", "Revisión", "Definimos matriz, objetivo, rango esperado y condiciones de recepción."],
              ["2", "Ensayo", "Seleccionamos el procedimiento compatible y ejecutamos los controles necesarios."],
              ["3", "Informe", "Entregamos resultados, unidades, alcance y observaciones relevantes."],
            ].map(([number, title, text]) => <div key={number} className="min-h-52 border-b border-r border-white/15 p-5"><span className="text-xs text-[#d8ac5a]">{number}</span><h3 className="mt-12 text-lg font-medium">{title}</h3><p className="mt-3 text-xs leading-6 text-white/58">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl"><h2 className="text-3xl font-medium tracking-[-.04em]">Cuéntanos qué necesitas medir.</h2><p className="mt-3 text-sm leading-6 text-[#65736c]">Indica la matriz, el objetivo y cuántas muestras tienes. Te confirmaremos el alcance, los requisitos de recepción y el entregable antes de iniciar.</p></div>
          <WhatsAppContact mode="modal" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-[#0b7654] px-6 text-xs font-semibold text-white transition hover:bg-[#075f43]">Revisar mi muestra <ArrowRight className="h-4 w-4" /></WhatsAppContact>
        </div>
      </section>

      <Footer />
    </main>
  )
}
