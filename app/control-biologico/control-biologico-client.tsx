"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Bug, Leaf, Shield, Users, CheckCircle2, Phone, Sprout, Target, Award, MessageCircle } from "lucide-react"

const productos = [
  {
    name: "Billaea claripalpis",
    subtitle: "Nuestro Producto Estrella",
    description:
      "Mosca parasitoide altamente efectiva para el control biológico de Diatraea saccharalis (barrenador del tallo) en cultivos de caña de azúcar. Reduce significativamente las pérdidas en la producción azucarera.",
    features: [
      "Control efectivo del barrenador del tallo",
      "Reducción de uso de pesticidas químicos",
      "Compatible con manejo integrado de plagas",
      "Liberación en campo de adultos parasitoides",
    ],
    target: "Diatraea saccharalis",
    crop: "Caña de azúcar",
    isPrimary: true,
  },
  {
    name: "Trichogramma sp",
    subtitle: "Microavispa Parasitoide",
    description:
      "Microavispa parasitoide de huevos de lepidópteros plaga. Efectiva para el control de diversas plagas en cultivos agrícolas como maíz, algodón, tomate y más.",
    features: [
      "Parasitismo de huevos de plagas",
      "Amplio espectro de control",
      "Fácil liberación en campo",
      "Ciclo de vida corto y eficiente",
    ],
    target: "Huevos de lepidópteros",
    crop: "Múltiples cultivos",
    isPrimary: false,
  },
]

const serviciosAsesoria = [
  {
    title: "Diagnóstico de Campo",
    description: "Evaluación completa de la situación fitosanitaria de tus cultivos",
    icon: Target,
  },
  {
    title: "Plan de Manejo Integrado",
    description: "Diseño de estrategias personalizadas para el control de plagas",
    icon: Sprout,
  },
  {
    title: "Capacitación",
    description: "Formación técnica para tu equipo en liberación de controladores",
    icon: Users,
  },
  {
    title: "Seguimiento",
    description: "Monitoreo continuo de la efectividad del control biológico",
    icon: Shield,
  },
]

const beneficios = [
  "Reducción del uso de pesticidas químicos",
  "Agricultura sostenible y ecológica",
  "Mejora de la calidad del producto final",
  "Protección del medio ambiente",
  "Cumplimiento de normativas ambientales",
  "Reducción de costos a largo plazo",
]

export function ControlBiologicoClient() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background font-serif">
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <Image
            src="/images/image.png"
            alt="Control Biológico - Agricultura Sostenible"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-transparent" />

          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                <Bug className="w-4 h-4" />
                Agricultura Sostenible
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Control <span className="text-green-300">Biológico</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Soluciones naturales para el manejo de plagas. Asesoría especializada y controladores biológicos para
                una agricultura más sostenible y rentable.
              </p>
            </div>
          </div>
        </section>

        {/* Asesoría Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Asesoría Profesional
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Acompañamos a los Agricultores</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Brindamos asesoría técnica especializada para implementar programas de control biológico efectivos en
                tus cultivos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviciosAsesoria.map((servicio, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-green-200 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <servicio.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{servicio.title}</h3>
                  <p className="text-muted-foreground text-sm">{servicio.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Productos Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Leaf className="w-4 h-4" />
                Controladores Biológicos
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Productos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Ofrecemos controladores biológicos de alta calidad para el manejo integrado de plagas en diversos
                cultivos.
              </p>
            </div>

            <div className="space-y-8">
              {productos.map((producto, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl overflow-hidden border ${producto.isPrimary ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50" : "border-border bg-card"}`}
                >
                  {producto.isPrimary && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg">
                        <Award className="w-4 h-4" />
                        Producto Estrella
                      </span>
                    </div>
                  )}

                  <div className="p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <div className="mb-4">
                          <span className="text-sm text-muted-foreground">{producto.subtitle}</span>
                          <h3
                            className={`text-3xl lg:text-4xl font-bold ${producto.isPrimary ? "text-green-700" : "text-foreground"} italic`}
                          >
                            {producto.name}
                          </h3>
                        </div>

                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{producto.description}</p>

                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                          {producto.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2
                                className={`w-5 h-5 ${producto.isPrimary ? "text-green-600" : "text-primary"} flex-shrink-0 mt-0.5`}
                              />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <div
                            className={`px-4 py-2 rounded-xl ${producto.isPrimary ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}
                          >
                            <span className="text-xs block">Objetivo</span>
                            <span className="font-bold text-sm">{producto.target}</span>
                          </div>
                          <div
                            className={`px-4 py-2 rounded-xl ${producto.isPrimary ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}
                          >
                            <span className="text-xs block">Cultivo</span>
                            <span className="font-bold text-sm">{producto.crop}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-80 flex items-center justify-center">
                        <a
                          href={`https://wa.me/51961996645?text=Hola,%20me%20interesa%20información%20sobre%20${encodeURIComponent(producto.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg ${
                            producto.isPrimary
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-primary hover:bg-primary/90 text-primary-foreground"
                          }`}
                        >
                          <MessageCircle className="w-5 h-5" />
                          Consultar Disponibilidad
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios Section */}
        <section className="py-16 bg-gradient-to-br from-green-900 to-green-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <Shield className="w-4 h-4" />
                  Agricultura Responsable
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Beneficios del Control Biológico</h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  El control biológico representa una alternativa sostenible y efectiva para el manejo de plagas,
                  contribuyendo a la protección del medio ambiente y la salud de los consumidores.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <span className="text-white/90">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative h-[400px] rounded-3xl overflow-hidden">
                  <Image src="/images/image.png" alt="Agricultura sostenible" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-10 md:p-14 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full blur-2xl" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    ¿Listo para una agricultura más sostenible?
                  </h2>
                  <p className="text-white/80 text-lg">
                    Contáctanos para asesoría personalizada y cotización de controladores biológicos
                  </p>
                </div>
                <a
                  href="https://wa.me/51961996645?text=Hola,%20me%20interesa%20información%20sobre%20control%20biológico%20y%20asesoría%20para%20mis%20cultivos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-2xl font-bold hover:bg-white/90 hover:scale-105 transition-all shadow-xl text-lg"
                >
                  <Phone className="w-6 h-6" />
                  Solicitar Asesoría
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
