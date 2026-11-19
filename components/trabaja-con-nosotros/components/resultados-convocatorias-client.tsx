'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  Loader2,
  MapPin,
} from 'lucide-react'
import { CONVOCATORIA_ETAPAS, obtenerConvocatoriasConResultadosPublicados } from '@/lib/supabase/convocatorias'
import type { ConvocatoriaPublica } from '@/types/database'

export default function ResultadosConvocatoriasClient() {
  const [convocatorias, setConvocatorias] = useState<ConvocatoriaPublica[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    obtenerConvocatoriasConResultadosPublicados()
      .then(setConvocatorias)
      .catch(() => setError('No pudimos cargar los resultados. Inténtalo nuevamente en unos minutos.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-[#f3f6f3] text-[#173b2b]">
      <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#0a3022] px-5 pb-20 pt-28 text-white md:px-10 md:pb-24 md:pt-36 lg:px-16">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/trabaja-con-nosotros" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver a convocatorias
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#cce6d2]">
                <FileCheck2 className="h-4 w-4 text-[#f1b35a]" /> Proceso de selección
              </span>
              <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[.98] tracking-[-.055em]">
                Resultados de convocatorias
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Consulta los documentos oficiales publicados para cada etapa. Los resultados se incorporan progresivamente durante el proceso.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[.17em] text-white/45">Etapas del proceso</p>
              <p className="mt-3 text-4xl font-black text-[#f1b35a]">05</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Desde la relación de participantes aptos hasta los resultados finales.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          {loading && (
            <div className="flex min-h-72 items-center justify-center rounded-3xl border border-[#d7e3d9] bg-white">
              <div className="text-center"><Loader2 className="mx-auto h-9 w-9 animate-spin text-[#2f7049]" /><p className="mt-3 text-sm text-[#6a7b72]">Cargando resultados...</p></div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-800">{error}</div>
          )}

          {!loading && !error && convocatorias.length === 0 && (
            <div className="rounded-3xl border border-[#d7e3d9] bg-white px-6 py-16 text-center shadow-[0_25px_70px_-52px_rgba(15,60,38,.55)]">
              <Clock3 className="mx-auto h-11 w-11 text-[#6f907b]" />
              <h2 className="mt-5 text-2xl font-black">Aún no hay resultados publicados</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6a7b72]">Cuando se publique el primer documento de una convocatoria aparecerá en esta sección.</p>
              <Link href="/trabaja-con-nosotros" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#173b2b] px-5 py-3 text-sm font-bold text-white">Ver oportunidades</Link>
            </div>
          )}

          {!loading && !error && convocatorias.length > 0 && (
            <div className="space-y-8">
              {convocatorias.map(({ puesto, resultados }) => {
                const porEtapa = new Map(resultados.map((resultado) => [resultado.etapa, resultado]))
                return (
                  <article key={puesto.puest_id_int} className="overflow-hidden rounded-[28px] border border-[#d7e3d9] bg-white shadow-[0_28px_80px_-58px_rgba(15,60,38,.6)]">
                    <header className="border-b border-[#dfe8e0] bg-[#edf4ee] px-5 py-6 sm:px-8">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#4e7d5f]">Convocatoria</p>
                          <h2 className="mt-2 text-2xl font-black tracking-[-.025em] text-[#173b2b]">{puesto.puest_nom_vac}</h2>
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#607268]">
                            {puesto.puest_lugar_vac && <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{puesto.puest_lugar_vac}</span>}
                            {puesto.modalidad_trabajo?.modalid_nom_vac && <span>{puesto.modalidad_trabajo.modalid_nom_vac}</span>}
                            {puesto.puest_vacantes_vac && <span>{puesto.puest_vacantes_vac} vacante(s)</span>}
                          </div>
                        </div>
                        <span className="w-fit rounded-full border border-[#bad2c0] bg-white px-3 py-1.5 text-xs font-bold text-[#356849]">
                          {puesto.Estado_Puesto?.estpuest_nom_vac || 'Proceso publicado'}
                        </span>
                      </div>
                    </header>

                    <div className="grid gap-0 lg:grid-cols-5">
                      {CONVOCATORIA_ETAPAS.map((etapa, index) => {
                        const resultado = porEtapa.get(etapa.id)
                        return (
                          <section key={etapa.id} className={`relative min-h-64 border-b border-[#e3ebe4] p-5 lg:border-b-0 ${index < 4 ? 'lg:border-r' : ''}`}>
                            <div className="flex items-center justify-between">
                              <span className={`grid h-9 w-9 place-items-center rounded-full text-xs font-black ${resultado ? 'bg-[#2f7049] text-white' : 'bg-[#e8eee9] text-[#809087]'}`}>{etapa.id}</span>
                              {resultado ? <CheckCircle2 className="h-5 w-5 text-[#2f7049]" /> : <Clock3 className="h-5 w-5 text-[#9aa79f]" />}
                            </div>
                            <h3 className="mt-5 text-base font-black leading-5 text-[#244534]">{etapa.titulo}</h3>
                            <p className="mt-2 text-xs leading-5 text-[#748279]">{etapa.descripcion}</p>
                            <div className="mt-6">
                              {resultado ? (
                                <div className="space-y-2">
                                  <a href={resultado.archivo_url} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#173b2b] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#245a41]">
                                    <ExternalLink className="h-4 w-4" /> Ver PDF
                                  </a>
                                  <a href={resultado.descarga_url} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#cbd9ce] px-3 py-2.5 text-xs font-bold text-[#315e43] transition hover:bg-[#f1f6f2]">
                                    <Download className="h-4 w-4" /> Descargar
                                  </a>
                                  {resultado.publicado_at_dt && <p className="pt-1 text-center text-[10px] text-[#87938c]">Publicado {new Date(resultado.publicado_at_dt).toLocaleDateString('es-PE')}</p>}
                                </div>
                              ) : (
                                <div className="rounded-xl border border-dashed border-[#ccd8ce] bg-[#f8faf8] px-3 py-4 text-center text-xs font-medium text-[#87938c]">Pendiente de publicación</div>
                              )}
                            </div>
                          </section>
                        )
                      })}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
