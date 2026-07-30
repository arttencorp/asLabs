"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

const slides = [
  {
    title: "Análisis fisicoquímicos para tus cultivos",
    subtitle: "Conoce el estado de tus muestras y toma decisiones agrícolas con mejor información.",
  },
  {
    title: "Detecta plagas y enfermedades con precisión",
    subtitle: "Identificamos patógenos a tiempo para proteger la salud y el rendimiento de tus cultivos.",
  },
  {
    title: "Plantas in vitro y calidad genética asegurada",
    subtitle: "Material vegetal uniforme, sano y producido bajo condiciones controladas.",
  },
  {
    title: "Banano, piña, pitahaya y más clones in vitro",
    subtitle: "Clones seleccionados de especies con valor productivo, comercial y ornamental.",
  },
  {
    title: "Análisis para tesistas e investigadores",
    subtitle: "Acompañamiento técnico para tesis, ensayos y proyectos científicos.",
  },
]

export default function HomeRotatingHeadline() {
  const [activeSlide, setActiveSlide] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 2000)
    return () => window.clearTimeout(timeout)
  }, [activeSlide, reduceMotion])

  const slide = slides[activeSlide]
  let letterIndex = 0

  return (
    <div className="max-w-[720px]">
      <div className="min-h-[160px] sm:min-h-[150px] lg:min-h-[138px]">
        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.h1
              key={slide.title}
              className="col-start-1 row-start-1 text-[clamp(1.85rem,3.8vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white"
              style={{ perspective: 900 }}
              initial={reduceMotion ? { opacity: 0 } : "hidden"}
              animate={reduceMotion ? { opacity: 1 } : "visible"}
              exit={reduceMotion ? { opacity: 0 } : "exit"}
              variants={{ hidden: {}, visible: {}, exit: {} }}
            >
              {slide.title.split(" ").map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}`} className="mr-[0.24em] inline-block whitespace-nowrap last:mr-0">
                  {Array.from(word).map((letter) => {
                    const index = letterIndex++
                    return (
                      <motion.span
                        key={`${letter}-${index}`}
                        className="inline-block will-change-[transform,opacity,filter]"
                        style={{
                          backfaceVisibility: "hidden",
                          transformOrigin: "50% 58%",
                          transformStyle: "preserve-3d",
                        }}
                        variants={{
                          hidden: {
                            opacity: 0,
                            rotateX: -82,
                            y: "0.5em",
                            z: -22,
                            filter: "blur(6px)",
                            scale: 0.97,
                          },
                          visible: {
                            opacity: 1,
                            rotateX: 0,
                            y: 0,
                            z: 0,
                            filter: "blur(0px)",
                            scale: 1,
                            transition: {
                              delay: 0.12 + index * 0.012,
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            rotateX: 76,
                            y: "-0.4em",
                            z: -16,
                            filter: "blur(5px)",
                            scale: 0.98,
                            transition: {
                              delay: Math.min(index * 0.004, 0.18),
                              duration: 0.3,
                              ease: [0.7, 0, 0.84, 0],
                            },
                          },
                        }}
                      >
                        {letter}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="mt-3 grid max-w-2xl">
          <AnimatePresence initial={false}>
            <motion.p
              key={slide.subtitle}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.38, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="col-start-1 row-start-1 text-sm leading-5 text-white/75 sm:text-[15px] sm:leading-6"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2" aria-label="Titulares del Home">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Mostrar: ${item.title}`}
            aria-current={index === activeSlide ? "true" : undefined}
            className={`relative h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-300 ${index === activeSlide ? "w-10 bg-white/25" : "w-3 bg-white/[0.35] hover:bg-white/60"}`}
          >
            {index === activeSlide && (
              <motion.span
                key={`${activeSlide}-progress`}
                className="absolute inset-0 origin-left rounded-full bg-[#f0a23a]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduceMotion ? 0 : 2, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
