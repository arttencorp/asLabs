"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Menu, X, ChevronDown, Microscope } from "lucide-react"

interface NavItem {
  title: string
  href?: string
  description: string
  children?: NavItem[]
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems: Record<string, NavItem> = {
    "sobre-nosotros": {
      title: "Sobre Nosotros",
      href: "/sobre-nosotros",
      description:
        "Conoce nuestra historia, misión y visión. Desde el año 2000 trabajamos en biotecnología vegetal para mejorar la agricultura peruana.",
    },
    biotecnologia: {
      title: "Biotecnología",
      description: "Descubre la ciencia detrás de nuestras soluciones innovadoras",
      children: [
        {
          title: "Qué es la Biotecnología",
          href: "/biotecnologia-vegetal",
          description: "Conoce los fundamentos de la biotecnología vegetal y sus aplicaciones",
        },
        {
          title: "Genética",
          href: "/genetica",
          description: "Explora la genética molecular: inserción de genes, plásmidos, PCR y más",
        },
      ],
    },
    plantines: {
      title: "Nuestros Plantines",
      href: "/plantines",
      description:
        "Explora nuestra variedad de plantines in vitro de alta calidad genética y fitosanitaria para diferentes cultivos.",
    },
    /*research: {
      title: "Investigación",
      href: "/research",
      description: "Explora nuestros proyectos de investigación en clonación de plantas e ingeniería genética.",
    },*/
    tienda: {
      title: "Tienda",
      description: "Productos especializados para educación y laboratorio",
      children: [
        {
          title: "Para Docentes",
          href: "#",
          description: "Materiales y recursos especializados para la enseñanza de biotecnología",
        },
        {
          title: "Para Estudiantes",
          href: "/solucion-estudiantes",
          description: "Kits educativos y materiales de laboratorio para estudiantes universitarios",
        },
      ],
    },
    seguimiento: {
      title: "Seguimiento",
      href: "/seguimiento",
      description: "Rastrea el estado de tu pedido ingresando tu número de seguimiento.",
    },
  }

  return (
    <>
      {/* Top navigation bar - Hidden on mobile */}
      <div className="bg-[#2e7d32] text-white text-xs hidden lg:block">
        <div className="container mx-auto flex justify-end items-center gap-4 py-1 px-4">
          <Link href="#" className="hover:underline">
            Carreras
          </Link>
          <Link href="/legal" className="hover:underline">
            Legal
          </Link>
          <Link href="/pitch-deck" className="hover:underline">
            Pitch Deck
          </Link>
          <Link href="#" className="hover:underline">
            Blog
          </Link>
          <Link href="/tienda" className="hover:underline font-medium">
            Tienda Online
          </Link>
          <Link href="/admin/analytics" className="hover:underline font-medium text-yellow-300">
            Analytics
          </Link>
          <div className="flex items-center gap-1">
            <Link href="#" className="hover:underline">
              Health Care Professionals
            </Link>
            <ExternalLink className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <Link href="#" className="hover:underline">
              Investors
            </Link>
            <ExternalLink className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1">
            <Link href="#" className="hover:underline">
              Clinical Trials
            </Link>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white border-b py-1.5 lg:py-2 relative z-20 font-serif">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/as-labs-logo.png"
                alt="AS Labs Logo"
                width={150}
                height={60}
                priority
                className="h-auto w-auto max-h-12 lg:max-h-16"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-4 text-sm font-serif">
              {Object.entries(navItems).map(([key, item]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveItem(key)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  {item.children ? (
                    <div
                      className={`hover:text-[#2e7d32] py-2 transition-colors duration-200 flex items-center gap-1 cursor-pointer ${activeItem === key ? "text-[#2e7d32]" : ""
                        }`}
                    >
                      {item.title}
                      <ChevronDown className="h-4 w-4" />
                      {key === "biotecnologia" && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold ml-1">
                          Ciencia
                        </span>
                      )}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#2e7d32] transition-all duration-300 ${activeItem === key ? "w-full" : "w-0"
                          }`}
                      ></span>
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className={`hover:text-[#2e7d32] py-2 transition-colors duration-200 flex items-center gap-2 relative ${activeItem === key ? "text-[#2e7d32]" : ""
                        }`}
                    >
                      {item.title}
                      {key === "seguimiento" && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">Track</span>
                      )}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#2e7d32] transition-all duration-300 ${activeItem === key ? "w-full" : "w-0"
                          }`}
                      ></span>
                    </Link>
                  )}

                  {activeItem === key && (
                    <div
                      className="absolute left-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 z-30 animate-fadeIn"
                      style={{
                        animation: "fadeIn 0.3s ease-in-out",
                        transformOrigin: "top center",
                      }}
                    >
                      <div className="flex">
                        <div className="w-1/2 p-6 animate-slideRight" style={{ animation: "slideRight 0.4s ease-out" }}>
                          <h3 className="text-lg font-bold text-[#2e7d32] mb-2 font-serif">{item.title}</h3>
                          <p className="text-gray-600 font-serif">{item.description}</p>

                          {item.children ? (
                            <div className="mt-4 space-y-3">
                              {item.children.map((child, index) => (
                                <Link
                                  key={index}
                                  href={child.href || "#"}
                                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <div className="font-medium text-[#2e7d32] font-serif">{child.title}</div>
                                  <div className="text-sm text-gray-600 mt-1 font-serif">{child.description}</div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <Link
                              href={item.href || "#"}
                              className="inline-flex items-center text-[#2e7d32] font-medium mt-4 group font-serif"
                            >
                              Explorar
                              <svg
                                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 12h14M12 5l7 7-7 7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          )}
                        </div>
                        <div
                          className="w-1/2 relative animate-slideLeft bg-gradient-to-br from-[#2e7d32] to-[#81c784] flex items-center justify-center"
                          style={{ animation: "slideLeft 0.4s ease-out" }}
                        >
                          <div className="text-white text-opacity-20 font-bold text-4xl font-serif">AS Labs</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/51961996645"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full transition-colors duration-300 font-serif"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="https://forms.cloud.microsoft/r/wQWhqq0wR6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-[#148b7d] hover:bg-[#62a9a0] text-white px-4 py-2 rounded-full transition-colors duration-300 font-serif"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Microscope className="h-4 w-4" />
                </svg>

                Investiga con nosotros
              </a>
            </div>

          </div>

          {/* Mobile Right Side */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="https://wa.me/51961996645"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-[#25D366] hover:bg-[#128C7E] text-white px-3 py-2 rounded-full transition-colors duration-300 font-serif"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-30">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {Object.entries(navItems).map(([key, item]) => (
                  <div key={key}>
                    {item.children ? (
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900 py-2 border-b border-gray-100 font-serif">
                          {item.title}
                        </div>
                        {item.children.map((child, index) => (
                          <Link
                            key={index}
                            href={child.href || "#"}
                            className="block py-2 pl-4 text-gray-700 hover:text-[#2e7d32] font-serif"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="block py-2 text-gray-700 hover:text-[#2e7d32] border-b border-gray-100 last:border-b-0 font-serif"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          {item.title}
                          {key === "seguimiento" && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              Track
                            </span>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <Link href="/legal" className="block py-1 text-sm text-gray-600 hover:text-[#2e7d32] font-serif">
                      Legal
                    </Link>
                    <Link
                      href="/pitch-deck"
                      className="block py-1 text-sm text-gray-600 hover:text-[#2e7d32] font-serif"
                    >
                      Pitch Deck
                    </Link>
                    <Link
                      href="/tienda"
                      className="block py-1 text-sm text-gray-600 hover:text-[#2e7d32] font-medium font-serif"
                    >
                      Tienda Online
                    </Link>
                    <Link
                      href="/admin/analytics"
                      className="block py-1 text-sm text-yellow-600 hover:text-[#2e7d32] font-medium font-serif"
                    >
                      Analytics Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .animate-slideRight {
          animation: slideRight 0.4s ease-out;
        }
        
        .animate-slideLeft {
          animation: slideLeft 0.4s ease-out;
        }
      `}</style>
    </>
  )
}