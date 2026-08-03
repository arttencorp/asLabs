"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { Sprout, CircleDot, GitBranch, Leaf, ArrowDown, ShieldAlert, Clock, Ban, ArrowRight } from "lucide-react"

interface Zone {
  id: "raices" | "rizoma" | "pseudotallo" | "hojas"
  label: string
  stage: string
  susceptibility: number
  description: string
  icon: React.ComponentType<{ className?: string }>
  marker: { x: number; y: number }
}

const zones: Zone[] = [
  {
    id: "raices",
    label: "Raíces",
    stage: "Puerta de entrada",
    susceptibility: 95,
    description:
      "El hongo sobrevive en el suelo y penetra por las raíces jóvenes y las pequeñas heridas. Es el punto de infección inicial y el más crítico de toda la planta.",
    icon: Sprout,
    marker: { x: 200, y: 512 },
  },
  {
    id: "rizoma",
    label: "Rizoma (cormo)",
    stage: "Colonización",
    susceptibility: 82,
    description:
      "Desde las raíces el patógeno coloniza el cormo y avanza hacia el sistema vascular. Aquí aparece el pardeamiento interno característico del tejido.",
    icon: CircleDot,
    marker: { x: 200, y: 456 },
  },
  {
    id: "pseudotallo",
    label: "Pseudotallo",
    stage: "Obstrucción vascular",
    susceptibility: 68,
    description:
      "El hongo bloquea los haces vasculares que llevan agua y nutrientes. Se produce una marchitez vascular con estrías pardo-rojizas visibles al cortar el tallo.",
    icon: GitBranch,
    marker: { x: 200, y: 330 },
  },
  {
    id: "hojas",
    label: "Hojas",
    stage: "Marchitez y colapso",
    susceptibility: 55,
    description:
      "El síntoma final y más visible: las hojas más viejas amarillean, se doblan y colapsan alrededor del pseudotallo hasta provocar la muerte de la planta.",
    icon: Leaf,
    marker: { x: 138, y: 120 },
  },
]

const heat = (s: number) => {
  if (s >= 90) return "#d1343e"
  if (s >= 75) return "#e65100"
  if (s >= 60) return "#f57c00"
  return "#f9a825"
}

/* ---------- Banana plant illustration ---------- */
function PlantSVG({ active }: { active: number }) {
  const activeId = zones[active].id
  const on = (id: string) => id === activeId
  const dim = (id: string) => (on(id) ? 1 : 0.32)
  const glow = (id: string) => (on(id) ? "url(#fus-glow)" : "none")
  const marker = zones[active].marker
  const color = heat(zones[active].susceptibility)

  // one broad arching banana leaf, tip pointing up from crown origin
  const blade = "M0,0 C 26,-46 24,-134 4,-196 C 2,-200 -2,-200 -4,-196 C -24,-134 -26,-46 0,0 Z"

  return (
    <svg viewBox="0 0 400 560" className="w-[260px] sm:w-[320px] lg:w-[360px] h-auto mx-auto">
      <defs>
        <linearGradient id="fus-leaf" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0%" stopColor="#1b5e20" />
          <stop offset="55%" stopColor="#43a047" />
          <stop offset="100%" stopColor="#66bb6a" />
        </linearGradient>
        <linearGradient id="fus-stem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#66bb6a" />
          <stop offset="45%" stopColor="#43a047" />
          <stop offset="100%" stopColor="#2e7d32" />
        </linearGradient>
        <radialGradient id="fus-corm" cx="50%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#b08968" />
          <stop offset="100%" stopColor="#6f4e37" />
        </radialGradient>
        <linearGradient id="fus-fruit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8bc34a" />
          <stop offset="100%" stopColor="#558b2f" />
        </linearGradient>
        <filter id="fus-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="200" cy="500" rx="150" ry="16" fill="#2e7d32" opacity="0.08" />

      {/* ROOTS */}
      <g style={{ opacity: dim("raices"), transition: "opacity .45s" }} filter={glow("raices")}>
        {[
          "M200,470 C170,494 132,500 112,545",
          "M200,470 C188,500 176,520 162,556",
          "M200,470 C200,502 202,528 200,560",
          "M200,470 C212,500 226,522 240,556",
          "M200,470 C232,494 270,500 290,545",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#8d6e63" strokeWidth="4" strokeLinecap="round" />
        ))}
      </g>

      {/* CORM */}
      <g style={{ opacity: dim("rizoma"), transition: "opacity .45s" }} filter={glow("rizoma")}>
        <ellipse cx="200" cy="466" rx="50" ry="38" fill="url(#fus-corm)" />
        <ellipse cx="192" cy="456" rx="24" ry="12" fill="#fff" opacity="0.18" />
      </g>

      {/* PSEUDOSTEM + banana bunch */}
      <g style={{ opacity: dim("pseudotallo"), transition: "opacity .45s" }} filter={glow("pseudotallo")}>
        <path d="M172,462 C168,360 178,262 186,196 L214,196 C222,262 232,360 228,462 Z" fill="url(#fus-stem)" />
        {/* left highlight */}
        <path d="M182,458 C179,360 186,262 192,200 L198,200 C196,262 191,360 194,458 Z" fill="#fff" opacity="0.18" />
        {/* sheath lines */}
        {[420, 360, 300, 250].map((y, i) => (
          <path key={i} d={`M176,${y} Q200,${y + 8} 224,${y}`} fill="none" stroke="#1b5e20" strokeWidth="1.5" opacity="0.25" />
        ))}
        {/* hanging bunch */}
        <path d="M210,205 C238,214 250,240 250,262" fill="none" stroke="#5d4037" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(250 ${250 + row * 15})`}>
            {[-1, 1].map((s) => (
              <path
                key={s}
                d={`M0,0 q ${10 * s},2 ${13 * s},-9`}
                fill="none"
                stroke="url(#fus-fruit)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ))}
          </g>
        ))}
        <ellipse cx="250" cy="300" rx="9" ry="15" fill="#6a1b9a" />
      </g>

      {/* LEAVES */}
      <g style={{ opacity: dim("hojas"), transition: "opacity .45s" }} filter={glow("hojas")}>
        {[
          { r: -74, sy: 1.02 },
          { r: -40, sy: 1.08 },
          { r: -12, sy: 1.12 },
          { r: 20, sy: 1.06 },
          { r: 56, sy: 1.0 },
        ].map((lf, i) => (
          <g key={i} transform={`translate(200 194) rotate(${lf.r}) scale(1 ${lf.sy})`}>
            <path d={blade} fill="url(#fus-leaf)" />
            <line x1="0" y1="0" x2="0" y2="-190" stroke="#0f3d16" strokeWidth="2" opacity="0.35" />
          </g>
        ))}
        <circle cx="200" cy="196" r="9" fill="#1b5e20" />
      </g>

      {/* pulsing marker on active zone */}
      <g>
        <circle cx={marker.x} cy={marker.y} r="9" fill={color} />
        <circle cx={marker.x} cy={marker.y} r="9" fill="none" stroke={color} strokeWidth="2.5">
          <animate attributeName="r" from="9" to="26" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.7" to="0" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  )
}

export default function FusariumPlantSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const sentinels = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = sentinels.current.filter(Boolean) as HTMLDivElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            setActive((prev) => (prev === idx ? prev : idx))
          }
        })
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // subtle 3D tilt following the cursor (desktop)
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 })
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 })
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect()
      tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 12)
      tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 9)
    },
    [tiltX, tiltY]
  )
  const onMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [tiltX, tiltY])

  const activeZone = zones[active]
  const ActiveIcon = activeZone.icon
  const color = heat(activeZone.susceptibility)

  const facts = [
    { icon: Ban, title: "Sin cura química", text: "No existe tratamiento que lo elimine del cultivo." },
    { icon: Clock, title: "Décadas en el suelo", text: "Sus esporas persisten viables por más de 30 años." },
    { icon: ShieldAlert, title: "Amenaza global", text: "La Raza 4 Tropical pone en riesgo la exportación de banano." },
  ]

  return (
    <>
      {/* ---------- Intro: por qué importa ---------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d32] mb-3">
              <span className="h-px w-6 bg-[#2e7d32]/50" />
              Investigación · Fitopatología
              <span className="h-px w-6 bg-[#2e7d32]/50" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#01283c] leading-tight mb-4">
              Por qué combatimos el <span className="text-[#e65100]">Fusarium</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              El <em>Fusarium oxysporum</em> f. sp. <em>cubense</em> Raza 4 Tropical (Foc R4T) causa el <strong>Mal de
              Panamá</strong>, la enfermedad más destructiva del banano en el mundo. En AS Laboratorios desarrollamos
              clones resistentes y diagnóstico temprano para proteger los cultivos peruanos. Recorre la planta para ver
              cómo avanza la infección.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {facts.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#2e7d32]/[0.04] p-5 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#e65100]/10 text-[#e65100] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-[#01283c] text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- Interactive scroll experience (desktop) ---------- */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block bg-gradient-to-b from-white via-[#f2f9f3] to-white"
        style={{ height: `${zones.length * 100}vh` }}
      >
        {/* sentinels: one per zone, at its center of the scroll length */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {zones.map((_, i) => (
            <div
              key={i}
              data-idx={i}
              ref={(el) => {
                sentinels.current[i] = el
              }}
              className="absolute left-0 w-full h-px"
              style={{ top: `${((i + 0.5) / zones.length) * 100}%` }}
            />
          ))}
        </div>

        <div className="sticky top-0 h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl border border-[#2e7d32]/10 bg-white shadow-[0_30px_70px_-30px_rgba(1,40,60,0.25)] overflow-hidden grid grid-cols-2">
              {/* Plant panel */}
              <div
                className="relative bg-gradient-to-br from-[#eaf5eb] to-[#f7fbf6] flex items-center justify-center py-10"
                style={{ perspective: "1200px" }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
              >
                <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.25]"></div>
                <div className="pointer-events-none absolute -top-16 -left-10 w-72 h-72 rounded-full bg-[#43a047]/15 blur-3xl"></div>
                <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }} className="relative">
                  <PlantSVG active={active} />
                </motion.div>

                {/* progress rail */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {zones.map((z, i) => (
                    <div
                      key={z.id}
                      className="w-1.5 rounded-full transition-all duration-300"
                      style={{
                        height: i === active ? 34 : 14,
                        backgroundColor: i === active ? heat(z.susceptibility) : "rgba(46,125,50,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Info panel */}
              <div className="p-8 xl:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d32] mb-6">
                  <span className="h-px w-6 bg-[#2e7d32]/50" />
                  El avance de la infección
                </div>

                {/* stepper */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {zones.map((z, i) => {
                    const Icon = z.icon
                    const isOn = i === active
                    return (
                      <div
                        key={z.id}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                          isOn
                            ? "border-transparent text-white shadow-sm"
                            : "border-gray-200 text-gray-400 bg-white"
                        }`}
                        style={isOn ? { backgroundColor: heat(z.susceptibility) } : undefined}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {z.label}
                      </div>
                    )
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeZone.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="flex items-center justify-center w-12 h-12 rounded-xl"
                        style={{ backgroundColor: `${color}18`, color }}
                      >
                        <ActiveIcon className="w-6 h-6" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400">
                          Paso {active + 1} de {zones.length} · {activeZone.stage}
                        </p>
                        <h3 className="text-2xl font-bold text-[#01283c] font-serif">{activeZone.label}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6 min-h-[72px]">{activeZone.description}</p>

                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Susceptibilidad al Fusarium</span>
                      <span className="text-sm font-bold" style={{ color }}>
                        {activeZone.susceptibility}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${activeZone.susceptibility}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="/research"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#2e7d32] group"
                  >
                    Nuestra investigación en resistencia
                    <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#2e7d32] transition-all duration-300 group-hover:bg-[#2e7d32] group-hover:text-white group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                  {active < zones.length - 1 && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                      <ArrowDown className="w-3.5 h-3.5 animate-bounce" /> Sigue bajando
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Mobile fallback (stacked) ---------- */}
      <section className="lg:hidden bg-gradient-to-b from-white to-[#f2f9f3] py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-[#2e7d32]/10 bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-[#eaf5eb] to-[#f7fbf6] flex items-center justify-center py-8 relative">
              <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.25]"></div>
              <PlantSVG active={active} />
            </div>
            <div className="p-6 space-y-4">
              {zones.map((z, i) => {
                const Icon = z.icon
                return (
                  <button
                    key={z.id}
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-2xl border p-4 transition-all ${
                      i === active ? "border-[#2e7d32]/40 bg-[#2e7d32]/[0.04]" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{ backgroundColor: `${heat(z.susceptibility)}18`, color: heat(z.susceptibility) }}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-gray-400">{z.stage}</p>
                        <p className="font-bold text-[#01283c]">{z.label}</p>
                      </div>
                      <span className="ml-auto text-sm font-bold" style={{ color: heat(z.susceptibility) }}>
                        {z.susceptibility}%
                      </span>
                    </div>
                    {i === active && <p className="text-sm text-gray-600 leading-relaxed mt-2">{z.description}</p>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
