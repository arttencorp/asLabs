"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { pipelineData } from "@/data/pipeline-data";
import { WhatsAppContact } from "@/components/whatsapp-contact";

const projects = pipelineData.flatMap((category) =>
  category.subsections.flatMap((section) =>
    section.projects.map((project) => ({
      ...project,
      category: category.title,
    })),
  ),
);
const capabilities = [
  [
    "Microbiología aplicada",
    "Aislamiento, selección y evaluación funcional de microorganismos.",
  ],
  [
    "Genómica y secuenciamiento",
    "Identidad, comparación y lectura de información molecular.",
  ],
  [
    "Biotecnología vegetal",
    "Cultivo in vitro, clonación y validación de material vegetal.",
  ],
  [
    "Bioprocesos",
    "Escalamiento, formulación y control de procesos biológicos.",
  ],
];
const method = [
  [
    "Observar",
    "Definimos el problema, la muestra y la pregunta que debe responderse.",
  ],
  [
    "Caracterizar",
    "Medimos, aislamos o secuenciamos con un protocolo trazable.",
  ],
  [
    "Validar",
    "Comparamos resultados y verificamos desempeño bajo condiciones definidas.",
  ],
  [
    "Transferir",
    "Convertimos evidencia en un protocolo, cultivo o decisión aplicable.",
  ],
];

export default function ResearchEditorial() {
  return (
    <main className="overflow-hidden bg-[#f4f6f3] font-[var(--font-poppins)] text-[#17251e]">
      <section
        data-navbar-theme="dark"
        className="relative isolate min-h-[470px] overflow-hidden bg-[#06261d] pt-20 md:min-h-[520px] md:pt-24"
      >
        <Image
          src="/research/research-lab.png"
          alt="Investigación aplicada en AS Laboratorios"
          fill
          priority
          className="-z-20 object-cover object-[64%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,35,26,.98),rgba(4,35,26,.78)_55%,rgba(4,35,26,.32))]" />
        <div className="mx-auto max-w-[1360px] px-5 py-16 text-white md:px-10 lg:px-16">
          <p className="text-[10px] font-semibold tracking-[.15em] text-[#9ed4b9]">
            INVESTIGACIÓN APLICADA
          </p>
          <h1 className="mt-5 max-w-[760px] text-[clamp(2.5rem,5vw,4.9rem)] font-medium leading-[.98] tracking-[-.052em]">
            Investigación que avanza hacia una aplicación.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65">
            Integramos microbiología, genómica, biotecnología vegetal y
            experimentación para llevar una hipótesis desde la muestra hasta una
            respuesta verificable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#portafolio"
              className="inline-flex h-11 items-center gap-3 bg-[#d5a34f] px-5 text-xs font-semibold text-[#10251e]"
            >
              Ver investigaciones <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#metodo"
              className="inline-flex h-11 items-center border border-white/35 px-5 text-xs font-semibold"
            >
              Cómo investigamos
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 text-[10px] text-white/55">
            <span>18 proyectos registrados</span>
            <span>04 líneas científicas</span>
            <span>157K+ plantas producidas</span>
          </div>
          <nav className="mt-8 flex flex-wrap gap-5 text-[10px] text-white/55">
            <a href="#portafolio">Investigaciones</a>
            <a href="#enfoque">Capacidades</a>
            <a href="#metodo">Método</a>
            <a href="#laboratorios">Laboratorios</a>
            <Link href="/centro-investigacion">Centro de Investigación</Link>
          </nav>
        </div>
      </section>

      <section
        id="portafolio"
        data-navbar-theme="light"
        className="scroll-mt-32 border-b border-[#d7dfd8] bg-white px-5 py-14 md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="grid gap-6 border-b border-[#bdc9c0] pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold text-[#0b7a55]">
                Investigaciones en curso y concluidas
              </p>
              <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.6rem)] font-medium leading-[1.02] tracking-[-.045em]">
                El trabajo científico, a primera vista.
              </h2>
            </div>
            <p className="max-w-2xl text-xs leading-6 text-[#627168]">
              Revisa primero el objetivo, el estado y el avance de cada
              proyecto. Después puedes explorar las capacidades y el método que
              lo hacen posible.
            </p>
          </div>
          <div className="mt-5">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="group border-b border-[#bcc8bf] py-6 md:py-8"
              >
                <div className="grid gap-4 md:grid-cols-[44px_170px_1fr_220px_70px] md:items-start">
                  <span className="text-[10px] text-[#8c9a92]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[9px] font-semibold text-[#0b7a55]">
                      {project.category}
                    </p>
                    <p className="mt-2 text-[10px] text-[#718078]">
                      {project.id}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-.02em]">
                      {project.name}
                    </h3>
                    {project.subtitle && (
                      <p className="mt-2 text-xs text-[#65736b]">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="text-[10px] leading-5 text-[#65736b]">
                    <p>{project.status}</p>
                    <p>{project.location}</p>
                  </div>
                  <span className="text-sm font-medium text-[#0b7a55]">
                    {Math.round(project.progress * 100)}%
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="enfoque"
        className="scroll-mt-32 px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-[1360px]">
          <p className="text-[10px] font-semibold text-[#0b7a55]">
            Una plataforma científica, cuatro capacidades
          </p>
          <h2 className="mt-3 max-w-3xl text-[clamp(2rem,3.5vw,3.6rem)] font-medium tracking-[-.045em]">
            La investigación no termina en el laboratorio.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#65736b]">
            Diseñamos cada estudio para conectar el dato con una decisión:
            elegir una cepa, validar un protocolo, caracterizar un material o
            preparar una solución para su siguiente escala.
          </p>
          <div className="mt-10 grid border-l border-t border-[#c5d0c7] md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([title, copy], index) => (
              <div
                key={title}
                className="min-h-[230px] border-b border-r border-[#c5d0c7] bg-white p-6"
              >
                <span className="text-[10px] text-[#97a39d]">0{index + 1}</span>
                <h3 className="mt-12 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-[#65736b]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="metodo"
        data-navbar-theme="dark"
        className="scroll-mt-32 bg-[#0a3025] px-5 py-20 text-white md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-[1360px]">
          <p className="text-[10px] font-semibold text-[#9ed4b9]">
            Nuestro método
          </p>
          <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.6rem)] font-medium tracking-[-.045em]">
            Del fenómeno a una respuesta reproducible.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">
            Una secuencia clara de trabajo evita que la investigación se
            convierta en una colección de datos inconexos.
          </p>
          <div className="mt-10">
            {method.map(([title, copy], index) => (
              <article
                key={title}
                className="relative grid grid-cols-[40px_1fr] gap-5 border-t border-white/15 py-8 first:border-t-0 md:grid-cols-[64px_150px_1fr] md:gap-8 md:py-10"
              >
                <span className="text-[10px] text-white/35">0{index + 1}</span>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-xs leading-6 text-white/58">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="laboratorios"
        className="scroll-mt-32 bg-white px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-[1360px]">
          <p className="text-[10px] font-semibold text-[#0b7a55]">
            Capacidad conectada
          </p>
          <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.6rem)] font-medium tracking-[-.045em]">
            Laboratorios que trabajan como uno.
          </h2>
          <p className="mt-4 max-w-2xl text-xs leading-6 text-[#65736b]">
            Las muestras, los cultivos y los datos avanzan entre especialidades
            sin perder contexto ni trazabilidad.
          </p>
          <div className="mt-10 grid border-l border-t border-[#c5d0c7] md:grid-cols-3">
            {[
              "Microbiología y bioprocesos",
              "Biología molecular y genómica",
              "Biotecnología vegetal",
            ].map((title, index) => (
              <div
                key={title}
                className="border-b border-r border-[#c5d0c7] p-6"
              >
                <span className="text-[10px] text-[#97a39d]">0{index + 1}</span>
                <h3 className="mt-12 text-lg font-medium">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden bg-[#082a20] px-5 py-20 text-white md:px-10 md:py-24 lg:px-16"
      >
        <div className="mx-auto flex max-w-[1360px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-3xl text-3xl font-medium tracking-[-.04em] md:text-5xl">
              ¿Hay una pregunta que tu operación todavía no puede responder?
            </h2>
            <p className="mt-4 max-w-2xl text-xs leading-6 text-white/60">
              Revisamos la necesidad, definimos el alcance experimental y
              conectamos las capacidades adecuadas al proyecto.
            </p>
          </div>
          <WhatsAppContact
            message="Hola, quisiera consultar sobre un proyecto de investigación"
            className="inline-flex h-12 items-center gap-3 bg-[#d5a34f] px-6 text-xs font-semibold text-[#10251e]"
          >
            Conversar sobre el proyecto <ArrowRight className="h-4 w-4" />
          </WhatsAppContact>
        </div>
      </section>
      <section className="bg-white px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-5 text-xs">
          <span className="font-semibold">
            Continúa explorando AS Laboratorios
          </span>
          <Link href="/centro-investigacion">Centro de Investigación</Link>
          <Link href="/control-biologico">Control biológico</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/seguimiento">Seguimiento</Link>
        </div>
      </section>
    </main>
  );
}
