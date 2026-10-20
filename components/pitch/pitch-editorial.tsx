"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

export default function PitchEditorial() {
  return (
    <main className="bg-[#f4f3ed] text-[#17251e]">
      <section className="relative min-h-[560px] overflow-hidden bg-[#071f18] pt-24 text-white md:min-h-[620px] md:pt-28">
        <Image
          src="/new/bannerasnuevo.webp"
          alt="AS Laboratorios"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071f18] via-[#071f18]/85 to-transparent" />
        <div className="relative mx-auto max-w-[1360px] px-5 py-16 md:px-10 lg:px-16">
          <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#9ed4b9]">
            Dossier de innovación
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[.98] tracking-[-.05em] md:text-7xl">
            Ciencia lista para competir por fondos.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65">
            Una plataforma de análisis, biotecnología e investigación aplicada
            preparada para concursos financiados, cofinanciamiento y alianzas de
            ejecución.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="#tesis"
              className="inline-flex h-11 items-center gap-2 bg-[#d6a84f] px-5 text-xs font-semibold text-[#17251e]"
            >
              Leer la propuesta <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppContact
              message="Hola, quisiera plantear una alianza"
              className="inline-flex h-11 items-center border border-white/40 px-5 text-xs font-semibold"
            >
              Plantear una alianza
            </WhatsAppContact>
          </div>
          <div className="mt-16 flex flex-wrap gap-8 text-[10px] text-white/45">
            <span>01 Tesis</span>
            <span>02 Plataforma</span>
            <span>03 Fondos</span>
            <span>04 Ruta</span>
            <span>05 Contacto</span>
          </div>
        </div>
      </section>
      <section
        id="tesis"
        className="scroll-mt-32 px-5 py-16 md:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-[1360px]">
          <p className="text-[10px] font-semibold uppercase text-[#0b7a55]">
            La tesis
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-medium tracking-[-.045em] md:text-6xl">
            La brecha no es producir datos. Es convertirlos en decisiones.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#65736b]">
            Productores, empresas e investigadores necesitan respuestas
            confiables y capacidades que acompañen el trayecto desde la muestra
            hasta la validación.
          </p>
          <div className="mt-10">
            {thesis.map((x, i) => (
              <article
                key={x[0]}
                className="grid gap-5 border-b border-[#bdc9c0] py-7 md:grid-cols-[58px_150px_1fr] md:items-start"
              >
                <span className="text-[10px]">0{i + 1}</span>
                <h3 className="text-lg font-medium">{x[0]}</h3>
                <p className="text-sm leading-7 text-[#65736b]">{x[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="plataforma" className="scroll-mt-32 bg-[#0a3024] px-5 py-16 text-white md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-[1360px]">
          <header className="grid gap-7 border-b border-white/15 pb-9 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase text-[#9ed4b9]">
                Plataforma científica
              </p>
              <h2 className="mt-3 text-4xl font-medium md:text-6xl">
                Capacidades que se conectan.
              </h2>
            </div>
            <p className="text-sm leading-7 text-white/60">
              Los módulos pueden operar de forma independiente o integrarse
              dentro de un proyecto de investigación, validación o desarrollo
              tecnológico.
            </p>
          </header>
          <div className="grid lg:grid-cols-4">
            {platform.map((x, i) => (
              <article
                key={x[0]}
                className="border-b border-white/15 py-7 last:border-b-0 md:border-r md:px-6 md:first:pl-0 lg:border-b-0"
              >
                <span className="text-[10px] text-white/40">0{i + 1}</span>
                <h3 className="mt-8 text-lg">{x[0]}</h3>
                <p className="mt-3 text-xs leading-6 text-white/55">{x[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1360px] md:grid-cols-3">
          {[
            "Microbiología y formulación",
            "Biotecnología vegetal",
            "Análisis y validación",
          ].map((x, i) => (
            <div
              key={x}
              className="relative min-h-[180px] overflow-hidden border-r border-[#d3dbd5] p-6"
            >
              <Image
                src={
                  i === 1
                    ? "/plant-genetics-research.png"
                    : "/laboratory-research.png"
                }
                alt={x}
                fill
                className="object-cover opacity-35"
              />
              <span className="relative text-sm font-medium">{x}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="scroll-mt-32 px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-[1360px]">
          <header className="grid gap-7 border-b border-[#c3cec6] pb-9 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase text-[#0b7a55]">
                Rutas de financiamiento
              </p>
              <h2 className="mt-3 text-4xl font-medium md:text-6xl">
                Un proyecto distinto para cada instrumento.
              </h2>
            </div>
            <p className="text-sm leading-7 text-[#65736b]">
              Priorizamos convocatorias cuya lógica de financiamiento coincida
              con la madurez, el riesgo y el resultado esperado del proyecto.
            </p>
          </header>
          {funds.map((x, i) => (
            <article
              key={x[1]}
              className="grid gap-5 border-b border-[#c3cec6] py-7 md:grid-cols-[70px_1fr_1fr_36px] md:items-center"
            >
              <span className="text-[9px] uppercase text-[#78867e]">
                {x[0]}
              </span>
              <h3 className="text-xl">{x[1]}</h3>
              <p className="text-xs leading-6 text-[#65736b]">{x[2]}</p>
              <span>0{i + 1}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="scroll-mt-32 bg-[#17241f] px-5 py-16 text-white md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-[1360px]">
          <p className="text-[10px] uppercase text-[#9ed4b9]">Hoja de ruta</p>
          <h2 className="mt-3 text-4xl font-medium md:text-6xl">
            Del expediente a la transferencia.
          </h2>
          <div className="mt-10">
            {route.map((x) => (
              <article
                key={x[0]}
                className="grid gap-4 border-b border-white/15 py-6 md:grid-cols-[86px_120px_1fr]"
              >
                <div>
                  <span className="text-xs text-white/45">{x[0]}</span>
                  <p className="mt-3 text-[9px] uppercase">{x[1]}</p>
                </div>
                <h3 className="text-xl">{x[2]}</h3>
                <div>
                  <h4 className="text-sm">{x[3]}</h4>
                  <p className="mt-3 text-xs leading-6 text-white/55">{x[4]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1360px]">
          <h2 className="text-4xl font-medium">Qué aporta AS Laboratorios</h2>
          <div className="mt-8 grid md:grid-cols-4">
            {[
              "Definición del problema y alcance",
              "Protocolo e indicadores verificables",
              "Ejecución científica y trazabilidad",
              "Documentación para seguimiento y cierre",
            ].map((x) => (
              <div key={x} className="border border-[#d0d9d2] p-6 text-sm">
                {x}
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
      <section className="scroll-mt-32 bg-[#082b20] px-5 py-16 text-white md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1360px]">
          <h2 className="text-4xl font-medium md:text-6xl">
            Construyamos una propuesta que pueda ejecutarse.
          </h2>
          <p className="mt-5 max-w-2xl text-sm text-white/60">
            Revisamos la convocatoria, el encaje técnico y los hitos antes de
            formular una alianza.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="mailto:contacto@aslaboratorios.com"
              className="inline-flex h-11 items-center bg-[#d6a84f] px-5 text-xs font-semibold text-[#17251e]"
            >
              Enviar propuesta
            </a>
            <WhatsAppContact
              message="Hola, quisiera conversar sobre una propuesta"
              className="inline-flex h-11 items-center border border-white/35 px-5 text-xs font-semibold"
            >
              Conversar por WhatsApp
            </WhatsAppContact>
          </div>
        </div>
      </section>
    </main>
  );
}
