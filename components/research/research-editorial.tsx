"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  CircleDot,
  Dna,
  FlaskConical,
  Microscope,
  MoveUpRight,
  Network,
  ScanLine,
  Sprout,
} from "lucide-react";
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
  {
    title: "Microbiología aplicada",
    copy: "Aislamiento, selección y validación de microorganismos con potencial agrícola e industrial.",
    href: "/servicios/aislamiento-seleccion-cepas",
    color: "#99caa8",
    icon: Microscope,
  },
  {
    title: "Genómica y secuenciamiento",
    copy: "Datos moleculares para identificar, comparar y comprender material biológico.",
    href: "/excellent",
    color: "#8bc7c1",
    icon: Dna,
  },
  {
    title: "Biotecnología vegetal",
    copy: "Protocolos de propagación, caracterización y producción de plantas in vitro.",
    href: "/biotecnologia-vegetal",
    color: "#b9cf86",
    icon: Sprout,
  },
  {
    title: "Bioprocesos",
    copy: "Diseño experimental, formulación y escalamiento de soluciones biológicas.",
    href: "/control-biologico",
    color: "#e0b16a",
    icon: Network,
  },
];

const laboratories = [
  {
    title: "Microbiología y bioprocesos",
    copy: "Aislamiento, caracterización, selección y trabajo con cultivos microbianos.",
    tags: ["Aislamiento", "Selección", "Evaluación funcional"],
    image: "/servicios/servMicrobiologicos.jpeg",
    href: "/control-biologico",
  },
  {
    title: "Biología molecular y genómica",
    copy: "Extracción, identificación molecular, secuenciamiento y análisis bioinformático.",
    tags: ["ADN", "Secuenciamiento", "Bioinformática"],
    image: "/research/research-lab.png",
    href: "/excellent",
  },
  {
    title: "Biotecnología vegetal",
    copy: "Introducción, multiplicación, enraizamiento y evaluación de material vegetal.",
    tags: ["Cultivo in vitro", "Micropropagación", "Aclimatación"],
    image: "/biotecnologia-vegetal/biotecnologia.jpeg",
    href: "/biotecnologia-vegetal",
  },
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
  const [filter, setFilter] = useState<"all" | "open" | "complete">("all");
  const completed = projects.filter((project) => project.progress >= 1).length;
  const filters = [
    { value: "all", label: "Todos", count: projects.length },
    {
      value: "open",
      label: "En desarrollo",
      count: projects.length - completed,
    },
    { value: "complete", label: "Concluidos", count: completed },
  ] as const;

  return (
    <main className="overflow-x-clip bg-[#f4f6f1] text-[#183128]">
      <section
        data-navbar-theme="dark"
        className="relative isolate min-h-[470px] overflow-hidden bg-[#06261d] pt-20 md:min-h-[520px] md:pt-24"
      >
        <Image
          src="/research/research-lab.png"
          alt="Investigación aplicada en AS Laboratorios"
          fill
          priority
          className="object-cover object-[67%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#05251d_0%,rgba(5,37,29,.96)_35%,rgba(5,37,29,.48)_70%,rgba(5,37,29,.17)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,23,17,.2),rgba(3,23,17,.16)_60%,rgba(3,23,17,.78))]" />
        <div
          className="pointer-events-none absolute right-[5%] top-[16%] hidden h-[400px] w-[340px] opacity-50 lg:block"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="absolute left-1/2 h-px w-36 origin-left bg-white/35"
              style={{
                top: 34 + index * 55,
                transform: `translateX(-72px) rotate(${index % 2 ? 13 : -13}deg)`,
              }}
            >
              <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full border border-[#dca45d]/80 bg-[#0b392b]" />
              <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full border border-white/60 bg-[#0b392b]" />
            </div>
          ))}
        </div>
        <div className="relative mx-auto flex min-h-[390px] max-w-[1400px] flex-col justify-end px-5 pb-9 pt-10 md:min-h-[430px] md:px-10 md:pb-11 lg:px-16">
          <div className="max-w-[790px]">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold tracking-[.18em] text-white/65 md:text-xs">
              <span className="h-px w-10 bg-[#dca45d]" /> INVESTIGACIÓN APLICADA
            </p>
            <h1 className="max-w-[720px] text-[clamp(2.35rem,5vw,4.65rem)] font-semibold leading-[.96] tracking-[-.055em] text-white">
              Investigación que avanza hacia una aplicación.
            </h1>
            <p className="mt-4 max-w-[650px] text-sm leading-6 text-white/72 md:text-base md:leading-7">
              Integramos microbiología, genómica, biotecnología vegetal y
              experimentación para llevar una hipótesis desde la muestra hasta
              una respuesta verificable.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#portafolio"
                className="group inline-flex min-h-12 items-center gap-3 bg-white px-5 text-sm font-semibold text-[#092b21] transition-colors hover:bg-[#dbe9dc]"
              >
                Ver investigaciones{" "}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
              <a
                href="#metodo"
                className="inline-flex min-h-12 items-center gap-3 border border-white/25 bg-white/[.06] px-5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/[.13]"
              >
                Cómo investigamos{" "}
                <ScanLine className="h-4 w-4 text-[#dca45d]" />
              </a>
            </div>
          </div>
          <div className="mt-7 grid max-w-[760px] grid-cols-3 border-t border-white/15 pt-4 text-white md:max-w-[850px]">
            {[
              [projects.length, "proyectos registrados"],
              ["04", "líneas científicas"],
              ["157K+", "plantas producidas"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-r border-white/15 pr-4 last:border-r-0 last:pl-4 md:px-7 md:first:pl-0"
              >
                <p className="text-2xl font-semibold tracking-[-.04em] md:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-white/50 md:text-xs">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <nav
        data-navbar-theme="light"
        aria-label="Secciones de investigación"
        className="sticky top-[64px] z-30 border-b border-[#d8dfd9] bg-[#f4f6f1]/95 backdrop-blur-xl md:top-[72px]"
      >
        <div className="mx-auto flex max-w-[1400px] items-center overflow-x-auto px-5 [scrollbar-width:none] md:px-10 lg:px-16">
          {[
            ["Investigaciones", "portafolio"],
            ["Capacidades", "enfoque"],
            ["Método", "metodo"],
            ["Laboratorios", "laboratorios"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="border-r border-[#d8dfd9] px-5 py-4 text-xs font-semibold text-[#52675e] transition-colors first:border-l hover:bg-white hover:text-[#0d553b] md:px-7"
            >
              {label}
            </a>
          ))}
          <Link
            href="/centro-investigacion"
            className="ml-auto hidden items-center gap-2 py-4 pl-8 text-xs font-semibold text-[#0d553b] lg:inline-flex"
          >
            Centro de Investigación <MoveUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      <section
        id="portafolio"
        data-navbar-theme="light"
        className="scroll-mt-32 border-b border-[#d7dfd8] bg-white px-5 py-14 md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold text-[#0d6746]">
              Investigaciones en curso y concluidas
            </p>
            <h2 className="mt-3 max-w-[600px] text-4xl font-semibold leading-[1.02] tracking-[-.05em] md:text-5xl">
              El trabajo científico, a primera vista.
            </h2>
            <p className="mt-5 max-w-[510px] text-base leading-7 text-[#5e6f66]">
              Revisa primero el objetivo, el estado y el avance de cada
              proyecto. Después puedes explorar las capacidades y el método que
              lo hacen posible.
            </p>
            <div
              className="mt-7 flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar proyectos"
            >
              {filters.map(({ value, label, count }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  className={`min-h-11 border px-4 text-xs font-semibold transition-colors ${filter === value ? "border-[#0d6746] bg-[#0d6746] text-white" : "border-[#c7d1c9] bg-transparent text-[#53665c] hover:border-[#0d6746]"}`}
                >
                  {label} · {count}
                </button>
              ))}
            </div>
            <div className="mt-10 hidden border-l border-[#bdc9c0] pl-6 lg:block">
              <p className="text-4xl font-semibold tracking-[-.06em] text-[#0c563c]">
                157,000+
              </p>
              <p className="mt-2 max-w-[270px] text-sm leading-6 text-[#68766f]">
                plantas producidas desde protocolos concluidos registrados en el
                portafolio.
              </p>
            </div>
          </div>
          <div className="border-t border-[#bcc8bf]">
            {projects.map((project, index) => {
              const isComplete = project.progress >= 1;
              if (
                (filter === "open" && isComplete) ||
                (filter === "complete" && !isComplete)
              )
                return null;
              const href =
                project.id === "SGF-015"
                  ? "/research/secuenciamiento-fusarium"
                  : project.id === "BB-001"
                    ? "/research/banano-baby"
                    : null;
              const progress = Math.round(project.progress * 100);
              const row = (
                <article
                  key={project.id}
                  className="group border-b border-[#bcc8bf] py-6 md:py-8"
                >
                  <div className="grid gap-5 md:grid-cols-[62px_1fr_94px] md:items-start">
                    <span className="text-xs font-semibold text-[#8a968f]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="text-[11px] font-semibold text-[#0d6746]">
                          {project.category}
                        </span>
                        <span className="text-[11px] text-[#839087]">
                          {project.id}
                        </span>
                      </div>
                      <h3 className="mt-2 max-w-[660px] text-xl font-semibold leading-[1.22] tracking-[-.025em] transition-colors group-hover:text-[#0d6746] md:text-2xl">
                        {project.name}
                      </h3>
                      {project.subtitle && (
                        <p className="mt-2 text-sm text-[#66766d]">
                          {project.subtitle}
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#64746b]">
                        <span className="inline-flex items-center gap-1.5">
                          <CircleDot className="h-3 w-3" /> {project.status}
                        </span>
                        <span>{project.location}</span>
                      </div>
                      <div
                        className="mt-5 h-[3px] overflow-hidden bg-[#dce3dd]"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full bg-[#2d7b55]"
                          style={{ width: `${Math.max(2, progress)}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:block md:text-right">
                      <span className="text-2xl font-semibold tracking-[-.04em] text-[#355848]">
                        {progress}%
                      </span>
                      {href && (
                        <ArrowRight className="ml-auto mt-5 hidden h-4 w-4 transition-transform group-hover:translate-x-1 md:block" />
                      )}
                    </div>
                  </div>
                </article>
              );
              return href ? (
                <Link key={project.id} href={href}>
                  {row}
                </Link>
              ) : (
                row
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="enfoque"
        data-navbar-theme="light"
        className="scroll-mt-32 px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 border-b border-[#cad4cc] pb-12 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-[#0d6746]">
                Una plataforma científica, cuatro capacidades
              </p>
              <h2 className="mt-3 max-w-[620px] text-4xl font-semibold leading-[1.02] tracking-[-.05em] md:text-6xl">
                La investigación no termina en el laboratorio.
              </h2>
            </div>
            <p className="max-w-[650px] text-base leading-7 text-[#5a6c63] md:text-lg md:leading-8 lg:justify-self-end">
              Diseñamos cada estudio para conectar el dato con una decisión:
              elegir una cepa, validar un protocolo, caracterizar un material o
              preparar una solución para su siguiente escala.
            </p>
          </div>
          <div className="divide-y divide-[#cad4cc] border-b border-[#cad4cc]">
            {capabilities.map(
              ({ title, copy, href, color, icon: Icon }, index) => (
                <Link
                  key={title}
                  href={href}
                  className="group grid gap-5 py-7 transition-colors hover:bg-white md:grid-cols-[70px_1fr_1.1fr_44px] md:items-center md:px-4"
                >
                  <span className="text-xs font-semibold text-[#849289]">
                    0{index + 1}
                  </span>
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="h-5 w-5 text-[#0b3528]" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-[-.025em] md:text-2xl">
                      {title}
                    </h3>
                  </div>
                  <p className="max-w-[520px] text-sm leading-6 text-[#64746c] md:text-base">
                    {copy}
                  </p>
                  <span className="grid h-10 w-10 place-items-center border border-[#bdc9c0] transition-all group-hover:border-[#0d6746] group-hover:bg-[#0d6746] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="metodo"
        data-navbar-theme="dark"
        className="scroll-mt-32 bg-[#0a3025] px-5 py-20 text-white md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.68fr_1.32fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="text-sm font-semibold text-[#a9cda9]">
              Nuestro método
            </p>
            <h2 className="mt-4 max-w-[520px] text-4xl font-semibold leading-[1.04] tracking-[-.05em] md:text-6xl">
              Del fenómeno a una respuesta reproducible.
            </h2>
            <p className="mt-6 max-w-[500px] text-base leading-7 text-white/60">
              Una secuencia clara de trabajo evita que la investigación se
              convierta en una colección de datos inconexos.
            </p>
          </div>
          <div className="relative">
            <div
              className="absolute bottom-0 left-[19px] top-0 w-px bg-white/15 md:left-[31px]"
              aria-hidden="true"
            />
            {method.map(([title, copy], index) => (
              <article
                key={title}
                className="relative grid grid-cols-[40px_1fr] gap-5 border-t border-white/15 py-8 first-of-type:border-t-0 md:grid-cols-[64px_150px_1fr] md:gap-8 md:py-10"
              >
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-[#0a3025] text-xs font-semibold text-[#dca45d] md:h-16 md:w-16">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-semibold tracking-[-.035em] md:pt-4 md:text-3xl">
                  {title}
                </h3>
                <p className="col-start-2 max-w-[540px] text-sm leading-7 text-white/60 md:col-start-3 md:pt-4 md:text-base">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="laboratorios"
        data-navbar-theme="light"
        className="scroll-mt-32 bg-white px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col gap-6 border-b border-[#d6ded7] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#0d6746]">
                Capacidad conectada
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] md:text-6xl">
                Laboratorios que trabajan como uno.
              </h2>
            </div>
            <p className="max-w-[440px] text-sm leading-6 text-[#627169] md:text-base">
              Las muestras, los cultivos y los datos avanzan entre
              especialidades sin perder contexto ni trazabilidad.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#d6ded7] bg-[#d6ded7] lg:grid-cols-3">
            {laboratories.map(({ title, copy, tags, image, href }, index) => (
              <Link
                key={title}
                href={href}
                className="group relative min-h-[520px] overflow-hidden bg-[#0b2b22]"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,30,23,.08)_15%,rgba(4,30,23,.92)_90%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-8">
                  <span className="text-xs font-semibold text-white/55">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 max-w-[360px] text-2xl font-semibold leading-tight tracking-[-.035em] md:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[380px] text-sm leading-6 text-white/65">
                    {copy}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/20 pt-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Conocer capacidad{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        data-navbar-theme="dark"
        className="relative overflow-hidden bg-[#082a20] px-5 py-20 text-white md:px-10 md:py-24 lg:px-16"
      >
        <div
          aria-hidden="true"
          className="absolute -right-28 -top-36 h-96 w-96 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10"
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <FlaskConical className="h-8 w-8 text-[#dca45d]" />
            <h2 className="mt-8 max-w-[840px] text-4xl font-semibold leading-[1.02] tracking-[-.055em] md:text-6xl">
              ¿Hay una pregunta que tu operación todavía no puede responder?
            </h2>
          </div>
          <div className="max-w-[520px] lg:justify-self-end">
            <p className="text-base leading-7 text-white/65">
              Revisamos la necesidad, definimos el alcance experimental y
              conectamos las capacidades adecuadas antes de comenzar.
            </p>
            <WhatsAppContact
              message="Hola, quisiera consultar sobre un proyecto de investigación"
              className="group mt-7 inline-flex min-h-12 items-center gap-3 bg-[#dca45d] px-5 text-sm font-semibold text-[#153026] transition-colors hover:bg-[#efbf7c]"
            >
              Evaluar una investigación{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </WhatsAppContact>
          </div>
        </div>
      </section>
      <section
        data-navbar-theme="light"
        className="bg-white px-5 py-10 md:px-10 lg:px-16"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 border-b border-[#d5ded7] pb-10 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-[#53665c]">
            Continúa explorando AS Laboratorios
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              ["Centro de Investigación", "/centro-investigacion"],
              ["Control biológico", "/control-biologico"],
              ["Servicios", "/servicios"],
              ["Seguimiento", "/seguimiento"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6746] hover:underline"
              >
                {label} <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
