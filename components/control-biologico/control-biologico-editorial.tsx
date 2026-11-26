"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  Check,
  Eye,
  FlaskConical,
  Leaf,
  Microscope,
  ScanSearch,
  ShieldCheck,
  Sprout,
  Target,
} from "lucide-react";
import { WhatsAppContact } from "@/components/whatsapp-contact";
import { MoreExplorer } from "@/components/public/more-explorer";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const protocol = [
  [
    "Diagnóstico",
    "Reconocemos cultivo, plaga objetivo, historial y presión actual.",
  ],
  [
    "Estrategia",
    "Definimos organismo, momento y distribución de la liberación.",
  ],
  ["Implementación", "Acompañamos al equipo durante la intervención en campo."],
  [
    "Verificación",
    "Observamos la respuesta y documentamos los siguientes ajustes.",
  ],
];
const protocolIcons = [ScanSearch, Target, Leaf, Eye];
const organisms = [
  {
    code: "CB-01",
    image: "/servicios/fito.jpg",
    alt: "Evaluación de sanidad vegetal en campo",
    kind: "Parasitoide especializado",
    name: "Billaea claripalpis",
    objective: "Diatraea saccharalis",
    crop: "Caña de azúcar",
    copy: "Controlador biológico empleado dentro de programas de manejo integrado del barrenador del tallo. La recomendación se define según presión de plaga, etapa del cultivo y condiciones de liberación.",
    points: [
      "Plan de liberación según evaluación",
      "Coordinación técnica de aplicación",
      "Seguimiento de la respuesta en campo",
    ],
  },
  {
    code: "CB-02",
    image: "/control-biologico.png",
    alt: "Observación microscópica para control biológico",
    kind: "Microavispa parasitoide",
    name: "Trichogramma sp.",
    objective: "Huevos de lepidópteros",
    crop: "Diversos cultivos",
    copy: "Alternativa biológica orientada a intervenir el ciclo de lepidópteros plaga desde la fase de huevo. Su uso se integra a una estrategia agronómica, no a una liberación aislada.",
    points: [
      "Intervención temprana",
      "Aplicación adaptable por cultivo",
      "Integración con manejo de plagas",
    ],
  },
];

export function ControlBiologicoEditorial() {
  return (
    <>
      <Navbar overlay />
      <main className="overflow-hidden text-[#17382c]">
        <section
          data-navbar-theme="dark"
          className="relative min-h-[520px] overflow-hidden bg-[#082b20] pt-24 text-white md:min-h-[570px] md:pt-28"
        >
          <Image
            src="/control-biologico.png"
            alt="Microscopía aplicada al control biológico"
            fill
            priority
            className="object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#06271d_0%,rgba(6,39,29,.96)_38%,rgba(6,39,29,.44)_72%,rgba(6,39,29,.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,25,18,.1),rgba(4,25,18,.62))]" />
          <div className="relative mx-auto flex min-h-[420px] max-w-[1400px] flex-col justify-end px-5 pb-12 md:min-h-[460px] md:px-10 md:pb-14 lg:px-16">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.2em] text-[#bdd8c5]">
              <span className="h-px w-10 bg-[#d3a058]" /> División agrícola
            </p>
            <h1 className="mt-4 max-w-[760px] text-[clamp(2.5rem,5.2vw,5rem)] font-semibold leading-[.95] tracking-[-.055em]">
              Control biológico con lectura de campo.
            </h1>
            <p className="mt-5 max-w-[650px] text-base leading-7 text-white/72 md:text-lg">
              Organismos benéficos, criterio técnico y seguimiento para integrar
              una respuesta biológica al manejo de plagas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#controladores"
                className="inline-flex min-h-12 items-center gap-3 bg-white px-5 text-sm font-semibold text-[#12382a] transition-colors hover:bg-[#e0ebdf]"
              >
                Ver controladores <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppContact
                message="Hola, quisiera evaluar un caso de control biológico"
                className="inline-flex min-h-12 items-center gap-3 border border-white/30 bg-white/[.08] px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/[.14]"
              >
                Evaluar mi caso
              </WhatsAppContact>
            </div>
          </div>
        </section>
        <section
          data-navbar-theme="light"
          className="border-b border-[#cdd6cf] bg-white"
        >
          <div className="mx-auto grid max-w-[1400px] divide-y divide-[#d2dad4] px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-10 lg:px-16">
            {[
              ["Campo", "El problema se observa antes de recomendar."],
              ["Biología", "El organismo se selecciona por su objetivo."],
              ["Seguimiento", "La respuesta se revisa después de liberar."],
            ].map((x, i) => (
              <div
                key={x[0]}
                className="grid grid-cols-[38px_1fr] gap-3 py-5 md:px-6 md:first:pl-0"
              >
                <span className="font-mono text-xs text-[#6f8378]">
                  0{i + 1}
                </span>
                <div>
                  <h2 className="text-sm font-semibold">{x[0]}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#66766e]">
                    {x[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          data-navbar-theme="light"
          className="bg-[#f4f3ed] px-5 py-16 md:px-10 md:py-24 lg:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <header className="grid gap-8 border-b border-[#c4d0c7] pb-9 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#43725b]">
                  Protocolo de intervención
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-.045em] md:text-5xl">
                  No empezamos por el producto.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[#5e7067] lg:justify-self-end">
                Una liberación funciona mejor cuando forma parte de una decisión
                agronómica: identificar el objetivo, elegir el momento, ejecutar
                y volver a observar.
              </p>
            </header>
            <div className="grid border-b border-[#c4d0c7] md:grid-cols-4">
              {protocol.map(([title, copy], index) => {
                const Icon = protocolIcons[index];
                return (
                  <article
                    key={title}
                    className="border-b border-[#cdd6cf] py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-[#347354]" />
                      <span className="font-mono text-xs text-[#8a9890]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-semibold tracking-[-.025em]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#617169]">
                      {copy}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="controladores"
          data-navbar-theme="light"
          className="bg-white px-5 py-16 md:px-10 md:py-24 lg:px-16"
        >
          <div className="mx-auto max-w-[1400px]">
            <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#43725b]">
                  Controladores disponibles
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] md:text-5xl">
                  Dos organismos, dos objetivos.
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-[#627269]">
                La ficha ayuda a orientar la conversación. La recomendación
                final depende siempre del diagnóstico del cultivo.
              </p>
            </header>
            <div className="space-y-px bg-[#bdcbc1]">
              {organisms.map((organism, index) => (
                <article
                  key={organism.code}
                  className="grid bg-[#f6f7f2] lg:grid-cols-[.72fr_1.28fr]"
                >
                  <div
                    className={`relative min-h-[290px] overflow-hidden lg:min-h-[430px] ${index === 1 ? "lg:order-2" : ""}`}
                  >
                    <Image
                      src={organism.image}
                      alt={organism.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition duration-700 hover:scale-[1.035]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a2c21]/55 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 bg-[#0a3024]/90 px-3 py-2 font-mono text-[10px] tracking-[.14em] text-white backdrop-blur-md">
                      {organism.code}
                    </span>
                  </div>
                  <div
                    className={`p-6 md:p-10 lg:p-12 ${index === 1 ? "lg:order-1" : ""}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#4d7763]">
                      {organism.kind}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold italic tracking-[-.04em] md:text-5xl">
                      {organism.name}
                    </h3>
                    <dl className="mt-7 grid gap-px bg-[#cbd5ce] sm:grid-cols-2">
                      <div className="bg-white p-4">
                        <dt className="text-[10px] uppercase tracking-[.15em] text-[#829087]">
                          Objetivo
                        </dt>
                        <dd className="mt-1 text-sm font-semibold italic">
                          {organism.objective}
                        </dd>
                      </div>
                      <div className="bg-white p-4">
                        <dt className="text-[10px] uppercase tracking-[.15em] text-[#829087]">
                          Cultivo
                        </dt>
                        <dd className="mt-1 text-sm font-semibold">
                          {organism.crop}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-7 text-base leading-7 text-[#576960]">
                      {organism.copy}
                    </p>
                    <ul className="mt-6 space-y-3 border-t border-[#cbd5ce] pt-5">
                      {organism.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-[#405b4e]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2b7452]" />{" "}
                          {point}
                        </li>
                      ))}
                    </ul>
                    <WhatsAppContact
                      message={`Hola, quisiera consultar disponibilidad de ${organism.name}`}
                      className="group mt-7 inline-flex min-h-12 items-center gap-3 bg-[#143f2f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#205b42]"
                    >
                      Consultar disponibilidad{" "}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </WhatsAppContact>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          data-navbar-theme="dark"
          className="bg-[#0a3024] px-5 py-16 text-white md:px-10 md:py-20 lg:px-16"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <FlaskConical className="h-7 w-7 text-[#d4a15c]" />
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">
                Biología, operación y evidencia en la misma estrategia.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
                El control biológico se integra mejor cuando el equipo entiende
                por qué, cuándo y cómo se libera.
              </p>
            </div>
            <div className="grid gap-px bg-white/15 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Menor presión química",
                  copy: "Integra herramientas biológicas al manejo.",
                },
                {
                  icon: Microscope,
                  title: "Criterio técnico",
                  copy: "Cada recomendación parte del caso real.",
                },
                {
                  icon: Sprout,
                  title: "Continuidad",
                  copy: "Seguimiento para orientar el siguiente paso.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <article key={title} className="bg-[#10392c] p-6">
                  <Icon className="h-5 w-5 text-[#a8cdb4]" />
                  <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          data-navbar-theme="light"
          className="bg-[#f4f3ed] px-5 py-16 md:px-10 md:py-20 lg:px-16"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <Bug className="h-6 w-6 text-[#2d704f]" />
              <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em] md:text-4xl">
                Antes de coordinar
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#607168]">
                Resolvemos las preguntas operativas más comunes antes de evaluar
                el caso.
              </p>
            </div>
            <div className="border-t border-[#becac1]">
              {[
                [
                  "¿Qué controlador biológico necesita mi cultivo?",
                  "Depende de la plaga, el cultivo, el momento del ciclo y las condiciones del campo. Por eso revisamos el caso antes de proponer la liberación.",
                ],
                [
                  "¿Atienden fuera de Trujillo?",
                  "Sí. La disponibilidad, el destino y las condiciones de traslado se confirman antes de coordinar la atención en otras zonas del Perú.",
                ],
                [
                  "¿La atención incluye acompañamiento?",
                  "Podemos incluir planificación, orientación para la liberación y seguimiento según el alcance técnico acordado.",
                ],
              ].map(([question, answer]) => (
                <details
                  key={question}
                  className="group border-b border-[#becac1] py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold">
                    {question}{" "}
                    <span
                      aria-hidden="true"
                      className="text-xl font-light text-[#3f755b] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-6 text-[#5c6e65]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <MoreExplorer
          current="/control-biologico"
          title="Una estrategia de campo antes que un producto aislado."
          description="Relacionamos cultivo, plaga y condiciones de aplicación para orientar una intervención biológica responsable."
          details={[
            {
              label: "Para quién",
              text: "Productores, fundos, asociaciones y equipos técnicos agrícolas.",
            },
            {
              label: "Qué puedes hacer",
              text: "Conocer controladores, proceso de evaluación y acompañamiento.",
            },
            {
              label: "Qué obtienes",
              text: "Definir una ruta de manejo con selección, liberación y seguimiento.",
            },
          ]}
          action={{ label: "Ver controladores", href: "#controladores" }}
        />
        <section
          data-navbar-theme="dark"
          className="bg-[#17241e] px-5 py-14 text-white md:px-10 lg:px-16"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/50">
                Evaluación inicial
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] md:text-3xl">
                Cuéntanos qué cultivo y qué plaga estás observando.
              </h2>
            </div>
            <WhatsAppContact
              message="Hola, quisiera evaluar un caso de control biológico"
              className="inline-flex min-h-12 w-fit items-center gap-3 bg-[#d4a15c] px-5 text-sm font-semibold text-[#173229] transition-colors hover:bg-[#e6b875]"
            >
              Hablar con un asesor <ArrowRight className="h-4 w-4" />
            </WhatsAppContact>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
