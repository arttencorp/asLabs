"use client"

import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  area: string
  excerpt: string
  date: string
  href: string
  color: string
}

const blogPosts: BlogPost[] = [
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

export default function HomeBlogSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold text-[#2e7d32] uppercase tracking-[0.2em] bg-[#e8f5e9] px-5 py-3 rounded-full border border-[#2e7d32]/20">
              Blog y Noticias
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            Últimas Noticias e Innovaciones
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Mantente actualizado con los últimos avances, implementaciones y logros en investigación e infraestructura de AS
            Laboratorios.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={post.href}>
              <article className="h-full group cursor-pointer">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Header Gradient */}
                  <div
                    className={`h-2 bg-gradient-to-r ${post.color}`}
                  />

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Area Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gradient-to-r ${post.color} text-white`}
                      >
                        {post.area}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-[#2e7d32] transition-colors leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm sm:text-base mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2e7d32] font-semibold hover:gap-3 transition-all">
                        <span className="text-sm">Leer más</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2e7d32] font-semibold text-base hover:gap-3 transition-all"
          >
            <span>VER TODOS LOS ARTÍCULOS</span>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 8L16 12L12 16M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
