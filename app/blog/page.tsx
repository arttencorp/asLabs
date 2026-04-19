import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog y Noticias | AS Laboratorios Trujillo",
  description:
    "Lee los últimos artículos y noticias sobre investigación bacteriológica, innovación, infraestructura y avances científicos en AS Laboratorios.",
  keywords: ["blog", "noticias", "investigación", "innovación", "AS Labs"],
  openGraph: {
    title: "Blog y Noticias | AS Laboratorios",
    description: "Descubre los últimos avances e innovaciones en AS Laboratorios Trujillo.",
    type: "website",
    url: "https://aslaboratorios.com/blog",
  },
}

const blogPosts = [
  {
    id: "bioreactores",
    title: "Implementación de producción con bioreactores para investigación",
    area: "Investigación",
    excerpt:
      "AS Labs impulsa una nueva etapa en producción controlada para investigación mediante tecnología de bioreactores. Mejora en reproducibilidad y escalamiento de procesos.",
    date: "19 de abril, 2026",
    href: "/blog/implementacion-bioreactores",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "biologia-molecular",
    title: "Implementación de nuestro nuevo laboratorio de biología molecular",
    area: "Infraestructura",
    excerpt:
      "AS Labs fortalece su capacidad científica con la implementación de un nuevo laboratorio de biología molecular. Infraestructura moderna para investigación molecular.",
    date: "15 de abril, 2026",
    href: "/blog/laboratorio-biologia-molecular",
    color: "from-purple-500 to-pink-500",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Blog y Noticias
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Mantente actualizado con los últimos avances, investigaciones e innovaciones en AS Laboratorios. Descubre nuestros
              logros en infraestructura, tecnología y investigación científica.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} href={post.href}>
                  <article className="h-full group cursor-pointer">
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      {/* Header Gradient */}
                      <div
                        className={`h-3 bg-gradient-to-r ${post.color}`}
                      />

                      {/* Content */}
                      <div className="p-8 flex flex-col h-full">
                        {/* Area Badge */}
                        <div className="mb-4">
                          <span
                            className={`inline-block text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full bg-gradient-to-r ${post.color} text-white`}
                          >
                            {post.area}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-[#2e7d32] transition-colors leading-tight">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-base mb-8 flex-grow leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#2e7d32] font-semibold hover:gap-3 transition-all">
                            <span>Leer más</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Empty State Message */}
            {blogPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No hay artículos disponibles en este momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-serif font-bold mb-6">
              ¿Tienes preguntas sobre nuestros servicios?
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Contáctanos para conocer más sobre nuestros servicios de investigación, infraestructura y soluciones
              biotecnológicas.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-[#2e7d32] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Ponte en contacto
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
