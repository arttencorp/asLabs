"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Cookie,
  Database,
  FileCheck2,
  Fingerprint,
  Info,
  Landmark,
  LockKeyhole,
  Mail,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

const navigation = [
  { href: "#terminos", label: "Términos" },
  { href: "#privacidad", label: "Privacidad" },
  { href: "#cookies", label: "Cookies" },
  { href: "#propiedad", label: "Propiedad intelectual" },
  { href: "#contacto-legal", label: "Contacto" },
]

const terms = [
  {
    title: "Alcance del sitio",
    text: "Este sitio presenta las capacidades, servicios, productos y líneas de investigación de AS Laboratorios. Su contenido es informativo y no sustituye una cotización, contrato, protocolo técnico ni informe de resultados.",
  },
  {
    title: "Solicitudes y cotizaciones",
    text: "Las condiciones finales de alcance, precio, plazo, toma o envío de muestras, conservación, entrega y forma de pago se confirman en la cotización u orden correspondiente.",
  },
  {
    title: "Uso responsable",
    text: "La persona usuaria se compromete a proporcionar información veraz y a no utilizar el sitio, sus formularios o sus contenidos para actividades ilícitas, engañosas o que afecten la seguridad del servicio.",
  },
  {
    title: "Información técnica",
    text: "Las recomendaciones dependen del contexto, la muestra y el objetivo de cada proyecto. Los resultados deben interpretarse dentro del alcance declarado en el informe o servicio contratado.",
  },
  {
    title: "Disponibilidad y enlaces",
    text: "Podemos actualizar, suspender o modificar contenidos y funcionalidades. Los enlaces externos se facilitan como referencia; sus políticas y disponibilidad pertenecen a sus respectivos responsables.",
  },
  {
    title: "Legislación aplicable",
    text: "La relación se rige por la legislación peruana y por las condiciones específicas acordadas con el cliente. Cualquier diferencia se atenderá primero mediante comunicación directa y de buena fe.",
  },
]

const privacy = [
  ["Qué datos tratamos", "Datos de contacto, identificación, empresa o institución, información de facturación, contenido de consultas, solicitudes, postulaciones y datos técnicos vinculados al servicio."],
  ["Para qué los utilizamos", "Atender consultas, elaborar cotizaciones, coordinar servicios y entregas, gestionar relaciones comerciales, cumplir obligaciones legales y mejorar la experiencia del sitio."],
  ["Base del tratamiento", "El consentimiento cuando corresponda, la ejecución de medidas solicitadas o de una relación contractual y el cumplimiento de obligaciones legales aplicables."],
  ["Con quién se comparten", "Solo con personal autorizado y proveedores indispensables para operar el servicio —por ejemplo, alojamiento o comunicaciones— bajo deberes de seguridad y confidencialidad."],
  ["Por cuánto tiempo", "Durante el plazo necesario para la finalidad informada y, después, por los periodos exigidos para atender obligaciones legales, contables o posibles responsabilidades."],
  ["Tus derechos", "Puedes solicitar información, acceso, actualización, rectificación, inclusión, cancelación u oposición, según corresponda bajo la normativa peruana de protección de datos personales."],
]

const storage = [
  {
    icon: Cookie,
    title: "Funcionamiento esencial",
    text: "Podemos usar cookies técnicas para que la navegación, la seguridad y determinadas funciones operen correctamente.",
  },
  {
    icon: Database,
    title: "Almacenamiento local",
    text: "Algunas funciones, como recordar una selección o carrito, pueden guardar información directamente en tu navegador.",
  },
  {
    icon: Fingerprint,
    title: "Control del usuario",
    text: "Puedes borrar o bloquear estos datos desde tu navegador. Algunas funciones podrían dejar de recordar tus preferencias.",
  },
]

export default function LegalExperience() {
  return (
    <main className="overflow-hidden bg-[#f4f7f4] text-[#173428]">
      <section
        data-navbar-theme="dark"
        className="relative isolate min-h-[590px] overflow-hidden bg-[#06291f] pb-28 pt-32 text-white sm:pt-36"
      >
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_8%,rgba(90,202,122,.28),transparent_28%),radial-gradient(circle_at_88%_24%,rgba(240,162,58,.16),transparent_27%),linear-gradient(135deg,#041d16_0%,#0a3d2b_52%,#06291f_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <motion.div
          aria-hidden
          className="absolute -right-28 top-28 -z-10 h-80 w-80 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-8 top-5 h-3 w-3 rounded-full bg-[#ffc66f] shadow-[0_0_28px_rgba(255,198,111,.85)]" />
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_.62fr] lg:items-end lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#dcf7e3] backdrop-blur-xl">
              <Scale className="h-4 w-4 text-[#ffc66f]" /> Centro legal
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.03] tracking-[-.045em] sm:text-5xl lg:text-[4.25rem]">
              Información clara para una relación de confianza.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.84] sm:text-lg">
              Conoce cómo usamos este sitio, protegemos tus datos y cuidamos el conocimiento técnico desarrollado por AS Laboratorios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.65 }}
            className="rounded-[30px] border border-white/15 bg-white/[0.09] p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dff4e4] text-[#195535]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white/[0.78]">
                Perú
              </span>
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[.18em] text-[#b9e3c4]">Última actualización</p>
            <p className="mt-2 text-2xl font-bold">26 de julio de 2026</p>
            <div className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-white/[0.74]">
              Marco de referencia: Ley N.º 29733 y su reglamento vigente.
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-9 max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Contenido legal"
          className="flex snap-x items-center gap-2 overflow-x-auto rounded-[24px] border border-[#d8e3da] bg-white/95 p-2 shadow-[0_22px_60px_-32px_rgba(7,48,32,.45)] backdrop-blur-xl"
        >
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="group inline-flex shrink-0 snap-start items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-[#466256] transition hover:bg-[#eaf3ec] hover:text-[#195535]"
            >
              <span className="text-[10px] text-[#8ca097]">0{index + 1}</span>
              {item.label}
              <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </a>
          ))}
        </nav>
      </div>

      <section id="terminos" data-navbar-theme="light" className="scroll-mt-28 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="01 · Términos de uso"
            title="Reglas simples, expectativas claras"
            copy="Estas condiciones ordenan el uso del sitio. Cada servicio conserva su propio alcance técnico y comercial."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {terms.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ delay: index * 0.055 }}
                className="group rounded-[28px] border border-[#dce6de] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a8c6b1] hover:shadow-[0_24px_70px_-38px_rgba(18,78,48,.42)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#91a39a]">0{index + 1}</span>
                  <CheckCircle2 className="h-5 w-5 text-[#3c8b58]" />
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-[-.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#65776e]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="privacidad" data-navbar-theme="dark" className="scroll-mt-24 bg-[#092f23] px-4 py-20 text-white sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.62fr_1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              dark
              eyebrow="02 · Privacidad"
              title="Tus datos tienen un propósito"
              copy="AS Laboratorios Control Biológico S.A.C. trata la información necesaria para responderte y prestar sus servicios."
            />
            <div className="mt-8 rounded-[26px] border border-white/12 bg-white/[0.07] p-6">
              <LockKeyhole className="h-7 w-7 text-[#bde8c8]" />
              <p className="mt-4 text-sm leading-6 text-white/[0.76]">
                Aplicamos medidas razonables de acceso, confidencialidad y conservación. Ningún entorno digital puede garantizar riesgo cero, por lo que revisamos nuestras prácticas de forma continua.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {privacy.map(([title, text], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.05 }}
                className="grid gap-4 rounded-[24px] border border-white/10 bg-white/[0.065] p-5 backdrop-blur-sm sm:grid-cols-[56px_1fr] sm:p-6"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dff4e4] font-mono text-xs font-bold text-[#195535]">0{index + 1}</span>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/[0.72]">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="cookies" data-navbar-theme="light" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="03 · Cookies y almacenamiento"
            title="Solo lo necesario para una experiencia útil"
            copy="Te explicamos qué puede conservar el navegador y cómo mantener el control."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {storage.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.09 }}
                className="relative overflow-hidden rounded-[30px] bg-[#edf4ee] p-7"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#c9dbcE]" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#245f3e] shadow-sm">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-10 text-xl font-bold">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-[#65776e]">{item.text}</p>
              </motion.article>
            ))}
          </div>
          <div className="mt-6 flex gap-3 rounded-[22px] border border-[#dce6de] bg-[#f8faf8] p-5 text-sm leading-6 text-[#5f7368]">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#3c8b58]" />
            Si incorporamos herramientas de analítica o publicidad que requieran consentimiento, actualizaremos esta política y presentaremos los controles correspondientes.
          </div>
        </div>
      </section>

      <section id="propiedad" data-navbar-theme="light" className="scroll-mt-24 bg-[#eaf1eb] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.82fr_1fr]">
          <div className="rounded-[34px] bg-[#173f2d] p-7 text-white sm:p-9">
            <Landmark className="h-8 w-8 text-[#ffc66f]" />
            <h2 className="mt-10 text-3xl font-bold tracking-[-.035em] sm:text-4xl">Conocimiento que merece cuidado</h2>
            <p className="mt-5 text-sm leading-7 text-white/[0.75]">
              Los textos, identidad visual, fotografías, gráficos, fichas y demás materiales pertenecen a AS Laboratorios o se utilizan con autorización, salvo indicación distinta.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <PropertyCard number="01" title="Uso permitido" text="Puedes consultar y compartir enlaces al sitio con fines informativos, respetando la autoría y sin alterar el contenido." />
            <PropertyCard number="02" title="Usos restringidos" text="No se permite reproducir, vender, adaptar o explotar materiales de forma comercial sin autorización previa y escrita." />
            <PropertyCard number="03" title="Marcas y terceros" text="Las marcas de terceros pertenecen a sus titulares. Su mención no implica afiliación, salvo que se indique expresamente." />
            <PropertyCard number="04" title="Contenido técnico" text="Los protocolos, informes y entregables se rigen además por las condiciones acordadas para cada proyecto o servicio." />
          </div>
        </div>
      </section>

      <section id="contacto-legal" data-navbar-theme="dark" className="scroll-mt-24 bg-[#071e17] px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#b9e3c4]">
              <Mail className="h-4 w-4" /> Contacto legal y privacidad
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-[-.035em] sm:text-5xl">¿Quieres ejercer un derecho o aclarar una condición?</h2>
            <p className="mt-5 text-sm leading-7 text-white/[0.7]">
              Escríbenos indicando tu nombre, el motivo de la solicitud y la información necesaria para identificar el caso.
            </p>
          </div>
          <a
            href="mailto:ventas@aslaboratorios.com?subject=Consulta%20legal%20o%20de%20privacidad"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f0a23a] px-6 py-3.5 text-sm font-bold text-[#173428] transition hover:-translate-y-0.5 hover:bg-[#ffc66f]"
          >
            ventas@aslaboratorios.com <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-7 text-xs leading-5 text-white/[0.5] sm:flex-row sm:items-center sm:justify-between">
          <p>MZ J1 San Isidro II Etapa · Trujillo, La Libertad, Perú</p>
          <Link
            href="https://www.gob.pe/institucion/anpd/campa%C3%B1as/128319-nuevo-reglamento-de-proteccion-de-datos-personales"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-white/[0.72] transition hover:text-white"
          >
            Marco de protección de datos en Perú <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  eyebrow: string
  title: string
  copy: string
  dark?: boolean
}) {
  return (
    <div className="max-w-3xl">
      <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] ${dark ? "text-[#b9e3c4]" : "text-[#4e7d5f]"}`}>
        <Sparkles className="h-4 w-4" /> {eyebrow}
      </p>
      <h2 className={`mt-5 text-balance text-3xl font-bold tracking-[-.04em] sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-[#173428]"}`}>
        {title}
      </h2>
      <p className={`mt-5 max-w-2xl text-base leading-7 ${dark ? "text-white/[0.7]" : "text-[#65776e]"}`}>{copy}</p>
    </div>
  )
}

function PropertyCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="rounded-[26px] border border-[#d5e1d7] bg-white p-6">
      <div className="flex items-center justify-between">
        <FileCheck2 className="h-5 w-5 text-[#3c8b58]" />
        <span className="font-mono text-xs font-bold text-[#9aaba2]">{number}</span>
      </div>
      <h3 className="mt-7 text-lg font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#65776e]">{text}</p>
    </article>
  )
}
