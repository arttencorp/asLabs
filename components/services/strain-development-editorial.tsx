import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppContact } from "@/components/whatsapp-contact";

const steps = [
  [
    "Aislamiento",
    "Procesamos la matriz definida con el cliente y obtenemos hasta 30 aislados para construir una base de candidatos diversa.",
  ],
  [
    "Selección funcional",
    "Comparamos los aislados mediante pruebas de potencial controlador, promoción del crecimiento y criterios técnicos del proyecto.",
  ],
  [
    "Identificación y WGS",
    "Confirmamos identidad, ensamblamos el genoma y analizamos genes, función, relaciones filogenéticas y atributos relevantes.",
  ],
  [
    "Validación y custodia",
    "La cepa seleccionada puede probarse en parcelas demostrativas y mantenerse bajo seguimiento y control de calidad anual.",
  ],
];
const wgs = [
  "Extracción de ADN y control de calidad por fluorometría",
  "Secuenciación Illumina o MGI · paired-end 2 × 150 bp",
  "Profundidad de trabajo 100× · salida aproximada 1 Gb por muestra",
  "Más de un millón de lecturas por dirección · ≥85 % de bases Q30",
  "Control de calidad, ensamblaje, predicción y anotación de genes",
  "Análisis comparativo y filogenético",
];

export default function StrainDevelopmentEditorial() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f4f3ed] text-[#17251e]">
        <section className="relative overflow-hidden bg-[#082b20] px-5 pb-16 pt-32 text-white md:px-10 md:pb-24 lg:px-16">
          <Image
            src="/research/research-lab.png"
            alt="Desarrollo microbiano"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="relative mx-auto max-w-[1360px]">
            <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#9ed4b9]">
              Desarrollo microbiano aplicado
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1] tracking-[-.05em] md:text-7xl">
              De un aislado a una cepa con potencial real.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65">
              Aislamos, comparamos, identificamos y conservamos microorganismos
              para empresas que desarrollan biofertilizantes, biocontroladores y
              nuevas soluciones biotecnológicas.
            </p>
            <div className="mt-8 flex gap-3">
              <WhatsAppContact
                message="Hola, quisiera consultar el servicio de desarrollo de cepas"
                className="inline-flex h-11 items-center bg-[#d6a84f] px-5 text-xs font-semibold text-[#17251e]"
              >
                Consultar el servicio
              </WhatsAppContact>
              <Link
                href="/cepas"
                className="inline-flex h-11 items-center border border-white/35 px-5 text-xs"
              >
                Ver colección CULTIQ
              </Link>
            </div>
            <div className="mt-16 border-t border-white/20 pt-5">
              <span className="text-[10px] uppercase text-white/45">
                Capacidad de evaluación
              </span>
              <p className="mt-2 text-2xl">Hasta 30 aislados</p>
            </div>
          </div>
        </section>
        <section className="px-5 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[10px] uppercase text-[#0b7a55]">
              Un proceso trazable
            </p>
            <h2 className="mt-3 text-4xl font-medium md:text-6xl">
              Cada decisión se sostiene con evidencia.
            </h2>
            <div className="mt-10 grid md:grid-cols-2">
              {steps.map((x, i) => (
                <article
                  key={x[0]}
                  className="min-h-[240px] border border-[#c8d3cb] bg-white p-7"
                >
                  <span className="text-[10px]">0{i + 1}</span>
                  <h3 className="mt-10 text-2xl">{x[0]}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#65736b]">
                    {x[1]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#0a3024] px-5 py-16 text-white md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[10px] uppercase text-[#9ed4b9]">
              Genómica bacteriana
            </p>
            <h2 className="mt-3 text-4xl font-medium md:text-6xl">
              WGS con resultados utilizables.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
              El tamaño de referencia para el servicio es aproximadamente 5 Mb.
              El tamaño real se reporta a partir del ensamblaje obtenido para
              cada aislado.
            </p>
            <div className="mt-10 grid md:grid-cols-2">
              {wgs.map((x) => (
                <div key={x} className="border-t border-white/15 py-5 text-sm">
                  {x}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="grid bg-white lg:grid-cols-2">
          <article className="bg-[#e3ebdf] p-7 sm:p-10 lg:p-16">
            <h2 className="text-3xl font-medium">
              Validación en condiciones de cultivo
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#65736b]">
              Contamos con parcelas demostrativas de banano, arroz, caña de
              azúcar, plátano, arándano y otros cultivos para diseñar pruebas
              según el objetivo de la empresa.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Banano", "Arroz", "Caña de azúcar", "Plátano", "Arándano"].map(
                (x) => (
                  <span
                    key={x}
                    className="border border-[#afbeb3] px-3 py-2 text-xs"
                  >
                    {x}
                  </span>
                ),
              )}
            </div>
          </article>
          <article className="bg-white p-7 sm:p-10 lg:p-16">
            <h2 className="text-3xl font-medium">
              Entrega, conservación y seguimiento
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[#65736b]">
              <li>
                5 cultivos puros, 3 liofilizados y 2 viales puros para iniciar
                producción.
              </li>
              <li>
                Custodia de 2 cultivos en AS Laboratorios durante 5 años, con
                control de calidad anual.
              </li>
              <li>
                Evaluación anual de cultivos del cliente para vigilar mutaciones
                y posibles cambios de eficacia.
              </li>
              <li>
                Certificado de análisis, genes anotados, FASTQ y resultados
                mediante enlace disponible 90 días.
              </li>
            </ul>
          </article>
        </section>
        <section className="px-5 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1360px] border-t border-[#c7d2ca] pt-10">
            <p className="text-[10px] uppercase text-[#0b7a55]">
              Origen estratégico de los aislados
            </p>
            <p className="mt-5 max-w-4xl text-xl leading-9">
              Los proyectos destinados exclusivamente al mercado peruano se
              desarrollan con aislados obtenidos en Perú. Según el cultivo y el
              objetivo también podemos estructurar campañas regionales: banano
              en Ecuador y café en Colombia, entre otros casos técnicamente
              justificados.
            </p>
          </div>
        </section>
        <section className="bg-[#082b20] px-5 py-16 text-white md:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-medium md:text-6xl">
                ¿Listo para transformar tu producción agrícola?
              </h2>
              <p className="mt-4 text-sm text-white/60">
                Conversemos sobre tu proyecto y encontremos la mejor solución
                biotecnológica.
              </p>
            </div>
            <WhatsAppContact
              message="Hola, quisiera conversar sobre mi proyecto"
              className="inline-flex h-12 items-center gap-2 bg-[#d6a84f] px-6 text-xs font-semibold text-[#17251e]"
            >
              Contáctanos <ArrowRight className="h-4 w-4" />
            </WhatsAppContact>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
