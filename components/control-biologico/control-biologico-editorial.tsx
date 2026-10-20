"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
const organisms = [
  {
    code: "CB-01",
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
      <main className="bg-[#f4f3ed] text-[#17251e]">
        <section className="relative min-h-[520px] overflow-hidden bg-[#082b20] pt-24 text-white md:min-h-[570px] md:pt-28">
          <Image
            src="/control-biologico.png"
            alt="Control biológico"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082b20] via-[#082b20]/85 to-transparent" />
          <div className="relative mx-auto max-w-[1360px] px-5 py-16 md:px-10 lg:px-16">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#9ed4b9]">
              División agrícola
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-.045em] md:text-7xl">
              Control biológico con lectura de campo.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
              Organismos benéficos, criterio técnico y seguimiento para integrar
              una respuesta biológica al manejo de plagas.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="#controladores"
                className="inline-flex h-11 items-center gap-2 bg-[#d6a84f] px-5 text-xs font-semibold text-[#13271f]"
              >
                Ver controladores <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppContact
                message="Hola, quisiera evaluar un caso de control biológico"
                className="inline-flex h-11 items-center border border-white/40 px-5 text-xs font-semibold"
              >
                Evaluar mi caso
              </WhatsAppContact>
            </div>
          </div>
        </section>
        <section className="border-b border-[#cdd6cf] bg-white">
          <div className="mx-auto grid max-w-[1360px] md:grid-cols-3">
            {[
              ["Campo", "El problema se observa antes de recomendar."],
              ["Biología", "El organismo se selecciona por su objetivo."],
              ["Seguimiento", "La respuesta se revisa después de liberar."],
            ].map((x, i) => (
              <div
                key={x[0]}
                className="border-b border-[#cdd6cf] p-6 md:border-b-0 md:border-r"
              >
                <span className="text-[10px] text-[#76877e]">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-medium">{x[0]}</h3>
                <p className="mt-2 text-xs text-[#65736b]">{x[1]}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1360px]">
            <header className="grid gap-8 border-b border-[#c4d0c7] pb-9 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase text-[#0b7a55]">
                  Protocolo de intervención
                </p>
                <h2 className="mt-3 text-4xl font-medium tracking-[-.04em] md:text-6xl">
                  No empezamos por el producto.
                </h2>
              </div>
              <p className="text-sm leading-7 text-[#5e6d65]">
                Una liberación funciona mejor cuando forma parte de una decisión
                agronómica: identificar el objetivo, elegir el momento, ejecutar
                y volver a observar.
              </p>
            </header>
            <div className="grid md:grid-cols-4">
              {protocol.map((x, i) => (
                <article
                  key={x[0]}
                  className="border-b border-[#cdd6cf] py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="text-[10px] text-[#819087]">0{i + 1}</span>
                  <h3 className="mt-8 text-lg font-medium">{x[0]}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#65736b]">
                    {x[1]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="controladores"
          className="bg-white px-5 py-16 md:px-10 md:py-24 lg:px-16"
        >
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[10px] font-semibold uppercase text-[#0b7a55]">
              Controladores disponibles
            </p>
            <h2 className="mt-3 text-4xl font-medium tracking-[-.04em] md:text-6xl">
              Dos organismos, dos objetivos.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#65736b]">
              La ficha ayuda a orientar la conversación. La recomendación final
              depende siempre del diagnóstico del cultivo.
            </p>
            <div className="mt-10 space-y-5">
              {organisms.map((o) => (
                <article
                  key={o.code}
                  className="grid bg-[#f6f7f2] lg:grid-cols-[.72fr_1.28fr]"
                >
                  <div className="border-b border-[#cdd6cf] p-7 lg:border-b-0 lg:border-r">
                    <span className="text-[10px]">{o.code}</span>
                    <p className="mt-10 text-[10px] font-semibold uppercase text-[#0b7a55]">
                      {o.kind}
                    </p>
                    <h3 className="mt-3 text-3xl font-medium">{o.name}</h3>
                    <dl className="mt-8 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <dt className="text-[9px] uppercase text-[#7b8981]">
                          Objetivo
                        </dt>
                        <dd className="mt-2">{o.objective}</dd>
                      </div>
                      <div>
                        <dt className="text-[9px] uppercase text-[#7b8981]">
                          Cultivo
                        </dt>
                        <dd className="mt-2">{o.crop}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="p-7 lg:p-10">
                    <p className="max-w-2xl text-sm leading-7 text-[#58675f]">
                      {o.copy}
                    </p>
                    <ul className="mt-8 space-y-3 text-xs">
                      {o.points.map((p) => (
                    <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <WhatsAppContact
                      message={`Hola, quisiera consultar disponibilidad de ${o.name}`}
                      className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-[#0b7a55]"
                    >
                      Consultar disponibilidad{" "}
                      <ArrowRight className="h-4 w-4" />
                    </WhatsAppContact>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#0a3024] px-5 py-16 text-white md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1360px]">
            <h2 className="max-w-4xl text-4xl font-medium tracking-[-.04em] md:text-6xl">
              Biología, operación y evidencia en la misma estrategia.
            </h2>
            <p className="mt-5 max-w-2xl text-sm text-white/60">
              El control biológico se integra mejor cuando el equipo entiende
              por qué, cuándo y cómo se libera.
            </p>
            <div className="mt-10 grid md:grid-cols-3">
              {[
                [
                  "Menor presión química",
                  "Integra herramientas biológicas al manejo.",
                ],
                ["Criterio técnico", "Cada recomendación parte del caso real."],
                ["Continuidad", "Seguimiento para orientar el siguiente paso."],
              ].map((x) => (
                <article key={x[0]} className="bg-[#10392c] p-6">
                  <h3 className="text-lg">{x[0]}</h3>
                  <p className="mt-3 text-xs text-white/55">{x[1]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#f4f3ed] px-5 py-16 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-[1360px]">
            <h2 className="text-4xl font-medium">Antes de coordinar</h2>
            <p className="mt-3 text-sm text-[#65736b]">
              Resolvemos las preguntas operativas más comunes antes de evaluar
              el caso.
            </p>
            {[
              "¿Qué controlador biológico necesita mi cultivo?",
              "¿Atienden fuera de Trujillo?",
              "¿La atención incluye acompañamiento?",
            ].map((q) => (
              <details key={q} className="border-b border-[#c7d1ca] py-6">
                <summary className="cursor-pointer text-lg">
                  {q} <span className="float-right">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-xs leading-6 text-[#65736b]">
                  Depende de la plaga, el cultivo, la etapa del problema y las
                  condiciones del campo. Revisamos el caso antes de recomendar
                  una intervención.
                </p>
              </details>
            ))}
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
        <section className="bg-[#17241e] px-5 py-14 text-white md:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase text-[#9ed4b9]">
                Evaluación inicial
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl">
                Cuéntanos qué cultivo y qué plaga estás observando.
              </h2>
            </div>
            <WhatsAppContact
              message="Hola, quisiera evaluar un caso de control biológico"
              className="inline-flex h-12 items-center bg-[#d6a84f] px-6 text-xs font-semibold text-[#17251e]"
            >
              Hablar con un asesor
            </WhatsAppContact>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
