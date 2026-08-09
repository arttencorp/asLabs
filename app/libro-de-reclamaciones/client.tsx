'use client'

import { useState } from 'react'
import { BookOpen, Search, Shield, Clock, CheckCircle2, BookMarked } from 'lucide-react'
import { ReclamacionForm } from '@/components/quejas/ReclamacionForm'
import { ReclamacionTracker } from '@/components/quejas/ReclamacionTracker'

type Tab = 'registrar' | 'consultar'

export default function LibroReclamacionesClient() {
    const [activeTab, setActiveTab] = useState<Tab>('registrar')

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#1b3a1f] via-[#1e4a22] to-[#1b3a1f] text-white py-16 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#d99b4e] blur-3xl translate-y-1/2 -translate-x-1/3" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Badge legal */}
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
                            <BookMarked className="h-4 w-4 text-[#d99b4e]" />
                            <span>Ley N.° 29571 — Código de Protección y Defensa del Consumidor</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                            Libro de<br />
                            <span className="text-[#d99b4e]">Reclamaciones</span>
                        </h1>
                        <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
                            AS Laboratorios pone a tu disposición este espacio para registrar tu queja o reclamo
                            y hacer seguimiento en tiempo real.
                        </p>

                        {/* Garantías */}
                        <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
                            {[
                                { icon: Clock, label: '15 días hábiles', sub: 'Plazo máximo de respuesta' },
                                { icon: Shield, label: '100% confidencial', sub: 'Tus datos protegidos' },
                                { icon: CheckCircle2, label: 'Seguimiento online', sub: 'Consulta tu estado' },
                            ].map(item => (
                                <div key={item.label} className="text-center">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 mb-2">
                                        <item.icon className="h-5 w-5 text-[#d99b4e]" />
                                    </div>
                                    <p className="font-semibold text-sm leading-tight">{item.label}</p>
                                    <p className="text-white/60 text-xs mt-0.5">{item.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Diferencia queja / reclamo */}
            <section className="bg-[#f8faf8] border-b border-gray-100 py-6">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                <span className="text-orange-600 font-bold text-sm">Q</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Queja</p>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Descontento con el servicio o atención recibida, sin reclamación económica directa.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-red-100 p-4 flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                <span className="text-red-600 font-bold text-sm">R</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Reclamo</p>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Disconformidad con un producto/servicio que genera una reclamación formal con posible compensación.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulario y consulta */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        {/* Tabs */}
                        <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
                            <button
                                onClick={() => setActiveTab('registrar')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'registrar'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <BookOpen className="h-4 w-4" />
                                Registrar queja / reclamo
                            </button>
                            <button
                                onClick={() => setActiveTab('consultar')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'consultar'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Search className="h-4 w-4" />
                                Consultar estado
                            </button>
                        </div>

                        {/* Contenido */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                            {activeTab === 'registrar' ? (
                                <>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Registrar tu queja o reclamo</h2>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Completa el formulario. Recibirás un código de seguimiento al finalizar.
                                    </p>
                                    <ReclamacionForm />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">Consultar estado de tu reclamo</h2>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Ingresa el código de seguimiento que recibiste al registrar tu queja o reclamo.
                                    </p>
                                    <ReclamacionTracker />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Info adicional */}
            <section className="bg-[#f8faf8] border-t border-gray-100 py-10">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-base font-semibold text-gray-700 mb-4 uppercase tracking-widest text-xs">
                            Información adicional
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
                            <div className="space-y-2">
                                <p className="font-medium text-gray-800">¿Qué sucede después de registrar?</p>
                                <ol className="list-decimal list-inside space-y-1 text-gray-500">
                                    <li>Recibes un correo de confirmación con tu código</li>
                                    <li>Nuestro equipo evalúa tu solicitud (hasta 15 días)</li>
                                    <li>Se te notifica la resolución por correo</li>
                                    <li>Puedes consultar el estado con tu código en todo momento</li>
                                </ol>
                            </div>
                            <div className="space-y-2">
                                <p className="font-medium text-gray-800">¿Necesitas ayuda inmediata?</p>
                                <p className="text-gray-500">
                                    Si tu caso es urgente, también puedes comunicarte directamente:
                                </p>
                                <div className="space-y-1">
                                    <p>📞 <a href="tel:+51961996645" className="text-[#2e7d32] hover:underline">+51 961 996 645</a></p>
                                    <p>✉️ <a href="mailto:ventas@aslaboratorios.com" className="text-[#2e7d32] hover:underline">ventas@aslaboratorios.com</a></p>
                                    <p>📍 MZ J1 San Isidro II Etapa, Trujillo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
