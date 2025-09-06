"use client"

import { 
  Users, 
  TrendingUp, 
  Target, 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  FlaskConical 
} from "lucide-react"
import { handleWhatsAppContact } from "./utils"

export default function CallToActionSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 sm:w-64 h-32 sm:h-64 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 sm:w-48 h-24 sm:h-48 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Título principal */}
          <div className="mb-8">
            <span className="inline-block bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4">
              Transforma tu Agricultura Hoy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              ¿Listo para <span className="text-emerald-400 relative">
                Maximizar
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-emerald-400 rounded"></div>
              </span> tus Ganancias?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Únete a más de <strong className="text-emerald-400">500+ agricultores exitosos</strong> que han 
              transformado sus cultivos con nuestros plantines de elite genética
            </p>
          </div>

          {/* Estadísticas destacadas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">500+</div>
              <div className="text-base sm:text-lg opacity-90">Agricultores Exitosos</div>
              <div className="text-xs sm:text-sm opacity-70 mt-2">Confiando en nuestra tecnología</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">60%</div>
              <div className="text-base sm:text-lg opacity-90">Más Productividad</div>
              <div className="text-xs sm:text-sm opacity-70 mt-2">Promedio vs plantines tradicionales</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-base sm:text-lg opacity-90">Tasa de Supervivencia</div>
              <div className="text-xs sm:text-sm opacity-70 mt-2">Tecnología in vitro comprobada</div>
            </div>
          </div>

          {/* Botones de acción principales */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <button
              onClick={() =>
                handleWhatsAppContact(
                  "¡Hola! Quiero una consulta completa sobre plantines premium. Estoy listo para transformar mi agricultura y maximizar mis ganancias."
                )
              }
              className="group bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 flex items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-base sm:text-lg lg:text-xl font-bold">Asesoría VIP Gratuita</div>
                <div className="text-xs sm:text-sm opacity-80">Respuesta en menos de 5 minutos</div>
              </div>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
            </button>

            <div className="text-white/60 hidden lg:block">o</div>

            <a
              href="tel:+51999999999"
              className="group bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              <div className="text-left">
                <div>Llamar Ahora</div>
                <div className="text-xs sm:text-sm opacity-70 group-hover:opacity-100">Línea directa</div>
              </div>
            </a>
          </div>

          {/* Garantías y beneficios */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">¿Por qué elegir AS Laboratorios?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-base sm:text-lg">Garantía Total</div>
                  <div className="text-xs sm:text-sm opacity-80">100% de satisfacción garantizada</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-base sm:text-lg">Envío Nacional</div>
                  <div className="text-xs sm:text-sm opacity-80">Llegamos a todo el Perú</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-base sm:text-lg">Soporte Técnico</div>
                  <div className="text-xs sm:text-sm opacity-80">Asesoría especializada incluida</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
