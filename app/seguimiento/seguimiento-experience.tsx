"use client"

import type React from "react"
import { useState } from "react"
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react"
import { obtenerPedidoPorCodigo } from "@/lib/supabase"
import { ESTADOS_SEGUIMIENTO } from "@/constants/seguimiento"
import { calcularTotalCotizacion, formatCurrency, formatDate, getDocumentoCliente, getNombreCompleto } from "@/utils"
import type { Pedido } from "@/components/admin/pedidos/types"

export default function SeguimientoExperience() {
  const [codigo, setCodigo] = useState("")
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!codigo.trim()) {
      setError("Ingresa el código de seguimiento que recibiste con tu pedido.")
      return
    }

    setLoading(true)
    setError(null)
    setPedido(null)
    try {
      const result = await obtenerPedidoPorCodigo(codigo.trim())
      if (!result) setError("No encontramos un pedido con ese código. Revísalo e intenta nuevamente.")
      setPedido(result)
    } catch {
      setError("No pudimos consultar el pedido en este momento. Inténtalo nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const getEstadoInfo = (estadoTipo: number) =>
    ESTADOS_SEGUIMIENTO.find((estado) => estado.id === estadoTipo) || ESTADOS_SEGUIMIENTO[0]

  const getEstadosVisibles = (estadoActual: number) => {
    const estadosNormales = ESTADOS_SEGUIMIENTO.filter((estado) => [1, 2, 3, 4, 5, 6].includes(estado.id))
    if (estadoActual === 7) {
      const cancelado = ESTADOS_SEGUIMIENTO.find((estado) => estado.id === 7)
      return cancelado ? [...estadosNormales, cancelado] : estadosNormales
    }
    if (estadoActual === 8) {
      const reembolso = ESTADOS_SEGUIMIENTO.find((estado) => estado.id === 8)
      return reembolso ? [...estadosNormales, reembolso] : estadosNormales
    }
    if (estadoActual === 9) {
      const hastaEnviado = ESTADOS_SEGUIMIENTO.filter((estado) => [1, 2, 3, 4, 5].includes(estado.id))
      const contraentrega = ESTADOS_SEGUIMIENTO.find((estado) => estado.id === 9)
      const recibido = ESTADOS_SEGUIMIENTO.find((estado) => estado.id === 6)
      return [...hastaEnviado, ...(contraentrega ? [contraentrega] : []), ...(recibido ? [recibido] : [])]
    }
    return estadosNormales
  }

  const getTotalPedido = (order: Pedido) => {
    if (!order.cotizacion?.detalle_cotizacion) return 0
    return calcularTotalCotizacion(
      order.cotizacion.detalle_cotizacion.map((item) => ({
        cantidad: item.det_cot_cant_int,
        precio: item.det_cot_prec_hist_int,
      })),
      order.cotizacion.cot_igv_bol,
    ).total
  }

  const copyTrackingCode = async () => {
    if (!pedido?.ped_cod_segui_vac) return
    await navigator.clipboard.writeText(pedido.ped_cod_segui_vac)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const currentType = pedido?.estado_pedido?.est_ped_tipo_int || 1
  const visibleStates = getEstadosVisibles(currentType)
  const currentIndex = visibleStates.findIndex((estado) => estado.id === currentType)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f7f3] text-[#173428]">
      <section data-navbar-theme="dark" className="relative overflow-hidden bg-[#092b20] pb-28 pt-32 md:pb-36 md:pt-40">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_20%,rgba(89,167,110,.35),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(239,159,56,.2),transparent_25%)]" />
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-8 top-36 h-48 w-48 rounded-full border border-white/10" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_.72fr] md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#d9eadb] backdrop-blur-md">
              <Package className="h-4 w-4 text-[#f0a23a]" /> Seguimiento de pedidos
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-.04em] text-white sm:text-5xl md:text-6xl">
              Tu pedido, claro en cada etapa.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70 md:text-lg">
              Consulta la preparación, despacho y entrega de tu pedido con el código enviado por nuestro equipo.
            </p>
          </div>
          <div className="hidden rounded-[1.75rem] border border-white/15 bg-white/[.08] p-5 text-white backdrop-blur-md md:block">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f0a23a] text-[#173428]"><Headphones className="h-5 w-5" /></div>
              <div><p className="text-sm font-semibold">¿Necesitas ayuda?</p><p className="text-xs text-white/60">Te acompañamos durante el proceso</p></div>
            </div>
            <a href="https://wa.me/51961996645" target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-[#ffd18c]">
              Hablar con un asesor <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section data-navbar-theme="light" className="relative z-10 mx-auto -mt-20 max-w-5xl px-4">
        <form onSubmit={handleSearch} className="rounded-[2rem] border border-white bg-white p-5 shadow-[0_28px_80px_-38px_rgba(9,43,32,.45)] md:p-7">
          <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div><label htmlFor="tracking-code" className="text-base font-bold text-[#173428]">Código de seguimiento</label><p className="mt-1 text-sm text-[#64756d]">Lo encontrarás en la confirmación de tu pedido.</p></div>
            <span className="mt-2 text-xs font-medium text-[#7a8b82] md:mt-0">Ejemplo: ASL2026-ABCD1234</span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7c9187]" />
              <input id="tracking-code" value={codigo} disabled={loading} onChange={(event) => setCodigo(event.target.value.toUpperCase())} placeholder="Ingresa tu código" className="h-14 w-full rounded-2xl border border-[#dce5df] bg-[#f7f9f7] pl-12 pr-4 font-mono text-base font-semibold uppercase tracking-wide outline-none transition focus:border-[#4f8d66] focus:bg-white focus:ring-4 focus:ring-[#4f8d66]/10" />
            </div>
            <button type="submit" disabled={loading || !codigo.trim()} className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#245f3e] px-7 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#194d31] disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />} Consultar estado
            </button>
          </div>
          {error && <div role="alert" className="mt-4 flex items-start gap-3 rounded-2xl bg-[#fff1eb] p-4 text-sm text-[#934227]"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><span>{error}</span></div>}
        </form>
      </section>

      {!pedido && (
        <section data-navbar-theme="light" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="mb-9 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#4e7d5f]">Consulta sencilla</p><h2 className="mt-3 text-3xl font-bold tracking-[-.03em] md:text-4xl">Toda la información en un solo lugar</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Ingresa tu código", "Usa el código único recibido en la confirmación de tu pedido.", Search],
              ["02", "Revisa el avance", "Consulta el estado actual y las etapas que faltan por completar.", Clock3],
              ["03", "Recibe tu pedido", "Encuentra la información de despacho y entrega cuando esté disponible.", Truck],
            ].map(([number, title, copy, Icon]) => (
              <article key={String(number)} className="group rounded-[1.75rem] border border-[#dfe7e1] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-[#8a9b91]">{String(number)}</span><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><Icon className="h-5 w-5" /></div></div>
                <h3 className="mt-8 text-xl font-bold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-[#687970]">{String(copy)}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {pedido && (
        <section data-navbar-theme="light" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-5 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
            <div className="rounded-[2rem] bg-[#173f2d] p-6 text-white md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#b9d5c0]">Pedido encontrado</p><h2 className="mt-2 text-2xl font-bold md:text-3xl">{pedido.ped_cod_segui_vac}</h2>{pedido.cotizacion?.cot_num_vac && <p className="mt-2 text-sm text-white/60">Cotización {pedido.cotizacion.cot_num_vac}</p>}</div>
                <button onClick={copyTrackingCode} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85"><Copy className="h-4 w-4" />{copied ? "Código copiado" : "Copiar código"}</button>
              </div>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
                <div><p className="text-xs text-white/55">Estado actual</p><p className="mt-1 text-lg font-bold text-[#ffd18c]">{getEstadoInfo(currentType).nombre}</p></div>
                <p className="text-sm text-white/70">{getEstadoInfo(currentType).descripcion}</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#dfe7e1] bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#718379]">Total del pedido</p><p className="mt-3 text-3xl font-bold tracking-tight text-[#173428]">{formatCurrency(getTotalPedido(pedido))}</p><p className="mt-2 text-xs text-[#819087]">{pedido.cotizacion?.cot_igv_bol ? "El monto incluye IGV" : "Monto registrado en la cotización"}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#dfe7e1] bg-white p-6 md:p-8">
            <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#4e7d5f]">Avance</p><h3 className="mt-2 text-2xl font-bold">Estado del pedido</h3></div>
            <div className="grid gap-0 lg:grid-cols-6">
              {visibleStates.map((estado, index) => {
                const isCompleted = index <= currentIndex
                const isCurrent = estado.id === currentType
                return <div key={estado.id} className="relative flex gap-4 pb-7 last:pb-0 lg:block lg:pb-0 lg:pr-4">
                  {index < visibleStates.length - 1 && <div className={`absolute left-[18px] top-9 h-[calc(100%-28px)] w-px lg:left-9 lg:top-[18px] lg:h-px lg:w-[calc(100%-18px)] ${isCompleted ? "bg-[#4f8d66]" : "bg-[#dce5df]"}`} />}
                  <div className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition ${isCompleted ? "border-[#4f8d66] bg-[#4f8d66] text-white" : "border-[#d7e1da] bg-white text-[#83938a]"} ${isCurrent ? "ring-4 ring-[#4f8d66]/15" : ""}`}>{isCompleted ? <Check className="h-4 w-4" /> : index + 1}</div>
                  <div className="lg:mt-5"><p className={`text-sm font-bold ${isCurrent ? "text-[#245f3e]" : isCompleted ? "text-[#344b40]" : "text-[#8a9891]"}`}>{estado.nombre}</p><p className="mt-1 text-xs leading-5 text-[#7a8a82] lg:hidden">{estado.descripcion}</p>{isCurrent && <span className="mt-2 inline-block rounded-full bg-[#e9f3eb] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#39714e]">Actual</span>}</div>
                </div>
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[#dfe7e1] bg-white p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><Package className="h-5 w-5" /></div><h3 className="text-xl font-bold">Detalle del pedido</h3></div>
              <div className="divide-y divide-[#e8eee9]">{pedido.cotizacion?.detalle_cotizacion?.map((item, index) => <div key={index} className="flex items-start justify-between gap-4 py-4"><div><p className="font-semibold text-[#294438]">{item.producto?.pro_nomb_vac || "Producto"}</p><p className="mt-1 text-xs text-[#7c8c84]">{item.det_cot_cant_int} unidades · {formatCurrency(item.det_cot_prec_hist_int)} c/u</p></div><p className="shrink-0 text-sm font-bold">{formatCurrency(item.det_cot_cant_int * item.det_cot_prec_hist_int)}</p></div>) || <p className="py-6 text-sm text-[#7c8c84]">No hay productos disponibles.</p>}</div>
            </article>

            <article className="rounded-[2rem] border border-[#dfe7e1] bg-white p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#fff0dc] text-[#a65b16]"><User className="h-5 w-5" /></div><h3 className="text-xl font-bold">Datos de entrega</h3></div>
              {pedido.cotizacion?.persona ? <div className="space-y-4 text-sm text-[#5f7168]">
                {getNombreCompleto(pedido.cotizacion.persona) && <InfoRow icon={User} text={getNombreCompleto(pedido.cotizacion.persona)} />}
                {pedido.cotizacion.persona.per_email_vac && <InfoRow icon={Mail} text={pedido.cotizacion.persona.per_email_vac} />}
                {pedido.cotizacion.persona.per_telef_int && <InfoRow icon={Phone} text={String(pedido.cotizacion.persona.per_telef_int)} />}
                {pedido.cotizacion.persona.per_direc_vac && <InfoRow icon={MapPin} text={pedido.cotizacion.persona.per_direc_vac} />}
                {getDocumentoCliente(pedido.cotizacion.persona) && <InfoRow icon={ShieldCheck} text={getDocumentoCliente(pedido.cotizacion.persona)} />}
              </div> : <p className="text-sm text-[#7c8c84]">No hay datos de entrega disponibles.</p>}
            </article>
          </div>

          <article className="mt-5 rounded-[2rem] border border-[#dfe7e1] bg-white p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eaf2ec] text-[#245f3e]"><CalendarDays className="h-5 w-5" /></div><h3 className="text-xl font-bold">Historial</h3></div>
            <div className="grid gap-3 md:grid-cols-2">
              <HistoryItem title="Pedido creado" value={formatDate(pedido.ped_fec_pedido_dt, { includeTime: true })} />
              {pedido.ped_fec_actualizada_dt !== pedido.ped_fec_pedido_dt && <HistoryItem title="Última actualización" value={formatDate(pedido.ped_fec_actualizada_dt, { includeTime: true })} />}
              {pedido.ped_cod_rastreo_vac && <HistoryItem title="Código de transporte" value={pedido.ped_cod_rastreo_vac} />}
              {pedido.cotizacion?.informacion_adicional?.inf_ad_lug_recojo_vac && <HistoryItem title="Lugar de recojo" value={pedido.cotizacion.informacion_adicional.inf_ad_lug_recojo_vac} />}
              {pedido.cotizacion?.informacion_adicional?.inf_ad_form_entr_vac && <HistoryItem title="Forma de entrega" value={pedido.cotizacion.informacion_adicional.inf_ad_form_entr_vac} />}
            </div>
          </article>

          <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-[#e8efe9] p-6 md:flex-row md:items-center md:p-8"><div><h3 className="text-xl font-bold">¿Tienes una consulta sobre tu pedido?</h3><p className="mt-1 text-sm text-[#687970]">Nuestro equipo puede ayudarte a revisar cualquier detalle.</p></div><div className="flex flex-wrap gap-3"><a href="mailto:ventas@aslaboratorios.com" className="inline-flex items-center gap-2 rounded-full border border-[#b8c9bd] bg-white px-5 py-3 text-sm font-bold"><Mail className="h-4 w-4" /> Escribir por correo</a><a href="https://wa.me/51961996645" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#245f3e] px-5 py-3 text-sm font-bold text-white"><Phone className="h-4 w-4" /> WhatsApp</a></div></div>
        </section>
      )}
    </main>
  )
}

function InfoRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return <div className="flex items-start gap-3"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#749081]" /><span>{text}</span></div>
}

function HistoryItem({ title, value }: { title: string; value: string }) {
  return <div className="flex items-start gap-3 rounded-2xl bg-[#f5f8f5] p-4"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4f8d66]" /><div><p className="text-sm font-bold text-[#314a3f]">{title}</p><p className="mt-1 text-xs leading-5 text-[#718179]">{value}</p></div></div>
}
