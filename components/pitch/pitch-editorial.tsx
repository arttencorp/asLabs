"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import {
  ArrowRight,
  Check,
  Dna,
  FileCheck2,
  FlaskConical,
  Handshake,
  Microscope,
  Mail,
  Network,
  Rocket,
  ScanSearch,
  Sprout,
} from "lucide-react";
import { MoreExplorer } from "@/components/public/more-explorer";
import { WhatsAppContact } from "@/components/whatsapp-contact";

const thesis = [
  [
    "Problema",
    "Las decisiones técnicas suelen fragmentarse entre diagnóstico, laboratorio, experimentación y transferencia.",
  ],
  [
    "Propuesta",
    "AS Laboratorios conecta esas etapas dentro de una plataforma científica con trazabilidad y especialidades complementarias.",
  ],
  [
    "Resultado",
    "Cada proyecto se formula alrededor de una pregunta, un protocolo, evidencia verificable y un siguiente hito de aplicación.",
  ],
];
const platform = [
  [
    "Análisis y diagnóstico",
    "Muestras agrícolas, ambientales, microbiológicas y fisicoquímicas convertidas en información utilizable.",
  ],
  [
    "Biología molecular",
    "Identificación, secuenciamiento y análisis para responder preguntas de identidad, relación y función.",
  ],
  [
    "Biotecnología vegetal",
    "Protocolos de cultivo in vitro, producción vegetal y validación de material por cultivo.",
  ],
  [
    "Microbiología aplicada",
    "Aislamiento, selección, evaluación funcional y formulación de microorganismos de interés.",
  ],
];
const funds = [
  [
    "Prototipos · pilotos · validación",
    "Innovación productiva",
    "Proyectos orientados a resolver una brecha técnica con hitos, indicadores y aplicación productiva.",
  ],
  [
    "I+D · equipamiento · conocimiento",
    "Ciencia y tecnología",
    "Investigación aplicada que desarrolla capacidades, evidencia y activos técnicos transferibles.",
  ],
  [
    "Empresa · academia · territorio",
    "Alianzas de ejecución",
    "Consorcios capaces de probar, escalar y transferir soluciones en condiciones relevantes.",
  ],
];
const route = [
  [
    "2026",
    "Fase 1",
    "Preparar",
    "Portafolio elegible",
    "Problema, línea base, alcance, socios, presupuesto e indicadores listos para cada convocatoria.",
  ],
  [
    "2027",
    "Fase 2",
    "Validar",
    "Pilotos con evidencia",
    "Ensayos y procesos documentados para contrastar desempeño técnico y viabilidad de aplicación.",
  ],
  [
    "2028",
    "Fase 3",
    "Escalar",
    "Capacidad de operación",
    "Infraestructura, control de calidad y despliegue fortalecidos junto a aliados estratégicos.",
  ],
  [
    "2029",
    "Fase 4",
    "Transferir",
    "Adopción verificable",
    "Protocolos, formación y herramientas para que el conocimiento llegue a una operación real.",
  ],
];

const chapters = [
  ["Tesis", "tesis"],
  ["Plataforma", "plataforma"],
  ["Fondos", "fondos"],
  ["Ruta", "ruta"],
  ["Contacto", "contacto"],
];
const platformIcons = [ScanSearch, Dna, Sprout, FlaskConical];
const fundingIcons = [Rocket, Microscope, Handshake];
const photos = [
  {
    title: "Microbiología y formulación",
    alt: "Investigación microbiológica en AS Laboratorios",
    src: "/research/research-lab.png",
  },
  {
    title: "Biotecnología vegetal",
    alt: "Cultivo in vitro en AS Laboratorios",
    src: "/new/HEADER.webp",
  },
  {
    title: "Análisis y validación",
    alt: "Evaluación microbiológica en laboratorio",
    src: "/servicios/servMicrobiologicos.jpeg",
  },
];

export default function PitchEditorial() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  return (
    <main className="overflow-x-clip bg-[#f3f4ef] text-[#17382c]">
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-[#d8a059]"
        />
      )}
      <section
        data-navbar-theme="dark"
        className="relative min-h-[560px] overflow-hidden bg-[#071f18] pt-24 text-white md:min-h-[620px] md:pt-28"
      >
        <Image
          src="/new/bannerasnuevo.webp"
          alt="Capacidades científicas y productivas de AS Laboratorios"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#061f17_0%,rgba(6,31,23,.96)_45%,rgba(6,31,23,.47)_76%,rgba(6,31,23,.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,15,.12),rgba(4,20,15,.72))]" />
        <div className="relative mx-auto flex min-h-[460px] max-w-[1400px] flex-col justify-end px-5 pb-12 md:min-h-[510px] md:px-10 md:pb-14 lg:px-16">
          <div className="max-w-[850px]">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.2em] text-[#bed7c7]">
              <span className="h-px w-10 bg-[#d9a35d]" /> Dossier de innovación
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,5.5vw,5.2rem)] font-semibold leading-[.94] tracking-[-.06em]">
              Ciencia lista para competir por fondos.
            </h1>
            <p className="mt-5 max-w-[690px] text-base leading-7 text-white/72 md:text-lg">
              Una plataforma de análisis, biotecnología e investigación aplicada
              preparada para concursos financiados, cofinanciamiento y alianzas
              de ejecución.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="#tesis"
                className="inline-flex min-h-12 items-center gap-3 bg-white px-5 text-sm font-semibold text-[#14372a] transition-colors hover:bg-[#e2ece3]"
              >
                Leer la propuesta <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#contacto"
                className="inline-flex min-h-12 items-center border border-white/30 bg-white/[.08] px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/[.14]"
              >
                Plantear una alianza
              </a>
            </div>
          </div>
        </div>
      </section>
      <nav
        data-navbar-theme="light"
        aria-label="Capítulos del dossier"
        className="sticky top-[64px] z-30 border-b border-[#ced7d0] bg-[#f3f4ef]/95 backdrop-blur-xl md:top-[72px]"
      >
        <div className="mx-auto flex max-w-[1400px] overflow-x-auto px-5 [scrollbar-width:none] md:px-10 lg:px-16">
          {chapters.map(([label, id], index) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex shrink-0 items-center gap-2 border-r border-[#d0d9d2] px-4 py-4 text-xs font-semibold text-[#53675d] first:border-l hover:bg-white hover:text-[#14523b]"
            >
              <span className="font-mono text-[9px] text-[#8b9891]">
                0{index + 1}
              </span>{" "}
              {label}
            </a>
          ))}
        </div>
      </nav>
      <section
        id="tesis"
        data-navbar-theme="light"
        className="scroll-mt-32 px-5 py-16 md:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-36">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#4b715f]">
              La tesis
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-.045em] md:text-5xl">
              La brecha no es producir datos. Es convertirlos en decisiones.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5c6e65]">
              Productores, empresas e investigadores necesitan respuestas
              confiables y capacidades que acompañen el trayecto desde la
              muestra hasta la validación.
            </p>
          </div>
          <div className="border-t border-[#bdc9c0]">
            {thesis.map((x, i) => (
              <article
                key={x[0]}
                className="grid gap-5 border-b border-[#bdc9c0] py-7 md:grid-cols-[58px_150px_1fr] md:items-start"
              >
                <span className="font-mono text-xs text-[#809087]">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-semibold">{x[0]}</h3>
                <p className="text-sm leading-7 text-[#5b6e64] md:text-base">
                  {x[1]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="plataforma"
        data-navbar-theme="dark"
        className="scroll-mt-32 bg-[#0a3024] px-5 py-16 text-white md:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <header className="grid gap-7 border-b border-white/15 pb-9 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#9fc3ad]">
                Plataforma científica
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-[-.045em] md:text-5xl">
                Capacidades que se conectan.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/60 lg:justify-self-end">
              Los módulos pueden operar de forma independiente o integrarse
              dentro de un proyecto de investigación, validación o desarrollo
              tecnológico.
            </p>
          </header>
          <div className="grid border-b border-white/15 md:grid-cols-2 lg:grid-cols-4">
            {platform.map(([title, description], index) => {
              const Icon = platformIcons[index];
              return (
                <article
                  key={title}
                  className="border-b border-white/15 py-7 last:border-b-0 md:border-r md:px-6 md:first:pl-0 lg:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-[#b4d2bd]" />
                    <span className="font-mono text-xs text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-9 text-xl font-semibold tracking-[-.025em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section data-navbar-theme="light" className="bg-white">
        <div className="grid min-h-[420px] lg:grid-cols-3">
          {photos.map(({ title, alt, src }) => (
            <div
              key={title}
              className="group relative min-h-[290px] overflow-hidden lg:min-h-[420px]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08271e]/75 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 text-sm font-semibold text-white">
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="fondos"
        data-navbar-theme="light"
        className="scroll-mt-32 px-5 py-16 md:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <header className="grid gap-7 border-b border-[#c3cec6] pb-9 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#4a725f]">
                Rutas de financiamiento
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] md:text-5xl">
                Un proyecto distinto para cada instrumento.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#5e7067] lg:justify-self-end">
              Priorizamos convocatorias cuya lógica de financiamiento coincida
              con la madurez, el riesgo y el resultado esperado del proyecto.
            </p>
          </header>
          <div className="divide-y divide-[#c3cec6] border-b border-[#c3cec6]">
            {funds.map(([category, title, description], index) => {
              const Icon = fundingIcons[index];
              return (
                <article
                  key={title}
                  className="grid gap-5 py-7 md:grid-cols-[70px_1fr_1fr_36px] md:items-center"
                >
                  <span className="grid h-11 w-11 place-items-center border border-[#b9c9be] bg-white text-[#2c6c4e]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#74867c]">
                      {category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                  </div>
                  <p className="text-sm leading-6 text-[#5d6e65]">
                    {description}
                  </p>
                  <span className="font-mono text-xs text-[#89968f]">
                    0{index + 1}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        id="ruta"
        data-navbar-theme="dark"
        className="scroll-mt-32 bg-[#17241f] px-5 py-16 text-white md:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a4b9ad]">
                Hoja de ruta
              </p>
              <h2 className="mt-3 text-4xl font-medium md:text-6xl">
                Del expediente a la transferencia.
              </h2>
            </div>
            <div className="border-t border-white/15">
              {route.map((x) => (
                <article
                  key={x[0]}
                  className="grid gap-4 border-b border-white/15 py-6 md:grid-cols-[86px_120px_1fr]"
                >
                  <div>
                    <span className="text-2xl font-semibold text-[#d8a35d]">
                      {x[0]}
                    </span>
                    <p className="mt-1 text-[10px] uppercase tracking-[.14em] text-white/35">
                      {x[1]}
                    </p>
                  </div>
                  <h3 className="text-xl">{x[2]}</h3>
                  <div>
                    <p className="text-base font-semibold">{x[3]}</p>
                    <p className="mt-2 text-sm leading-6 text-white/52">
                      {x[4]}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        data-navbar-theme="light"
        className="bg-white px-5 py-16 md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <FileCheck2 className="h-6 w-6 text-[#2e6e50]" />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.04em]">
              Qué aporta AS Laboratorios
            </h2>
          </div>
          <div className="grid gap-px bg-[#c8d2ca] sm:grid-cols-2">
            {[
              "Definición del problema y alcance",
              "Protocolo e indicadores verificables",
              "Ejecución científica y trazabilidad",
              "Documentación para seguimiento y cierre",
            ].map((x) => (
              <div
                key={x}
                className="flex items-start gap-3 bg-[#f4f6f2] p-5 text-sm font-medium"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2e7352]" /> {x}
              </div>
            ))}
          </div>
        </div>
      </section>
      <MoreExplorer
        current="/pitch-deck"
        title="Una tesis de innovación preparada para fondos y alianzas."
        description="Presenta la plataforma científica, la evidencia y la ruta de ejecución de AS Laboratorios para oportunidades no dilutivas."
        details={[
          {
            label: "Para quién",
            text: "Fondos, concursos, instituciones y socios de innovación.",
          },
          {
            label: "Qué puedes hacer",
            text: "Revisar oportunidad, capacidades, evidencia y hoja de ruta.",
          },
          {
            label: "Qué obtienes",
            text: "Identificar módulos financiables con aplicación agrícola y científica.",
          },
        ]}
        action={{ label: "Ver la propuesta", href: "#tesis" }}
      />
      <section
        id="contacto"
        data-navbar-theme="dark"
        className="scroll-mt-32 bg-[#082b20] px-5 py-16 text-white md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Network className="h-6 w-6 text-[#d9a35d]" />
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">
              Construyamos una propuesta que pueda ejecutarse.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              Revisamos la convocatoria, el encaje técnico y los hitos antes de
              formular una alianza.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href="mailto:ventas@aslaboratorios.com?subject=Alianza%20para%20fondo%20concursable"
              className="inline-flex min-h-12 items-center gap-3 bg-white px-5 text-sm font-semibold text-[#15372a]"
            >
              Enviar propuesta <Mail className="h-4 w-4" />
            </a>
            <WhatsAppContact
              message="Hola, quisiera conversar sobre una propuesta"
              className="inline-flex min-h-12 items-center border border-white/25 px-5 text-sm font-semibold"
            >
              Conversar por WhatsApp
            </WhatsAppContact>
          </div>
        </div>
      </section>
    </main>
  );
}
