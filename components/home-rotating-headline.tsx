"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/components/language-experience"

const slides = {
  es: [
    {
      title: "Análisis enzimáticos y bioquímicos para investigación",
      subtitle: "Cuantificamos actividad enzimática, metabolitos y parámetros bioquímicos para ensayos, tesis y desarrollo científico.",
    },
    {
      title: "Genómica y microbiología para nuevos descubrimientos",
      subtitle: "Integramos identificación molecular, secuenciamiento y caracterización microbiana con soporte técnico especializado.",
    },
  ],
  en: [
    {
      title: "Enzymatic and biochemical analysis for research",
      subtitle: "We quantify enzymatic activity, metabolites and biochemical parameters for trials, theses and scientific development.",
    },
    {
      title: "Genomics and microbiology for new discoveries",
      subtitle: "We integrate molecular identification, sequencing and microbial characterization with specialized technical support.",
    },
  ],
}

export default function HomeRotatingHeadline() {
  const { language } = useLanguage()
  const localizedSlides = slides[language]
  const [activeSlide, setActiveSlide] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % localizedSlides.length)
    }, 2000)
    return () => window.clearTimeout(timeout)
  }, [activeSlide, reduceMotion, localizedSlides.length])

  const slide = localizedSlides[activeSlide]
  let letterIndex = 0

  return (
    <div className="max-w-[720px]" translate="no">
      <div className="h-[150px] sm:h-[156px] lg:h-[174px]">
        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.h1
              key={slide.title}
              className="col-start-1 row-start-1 max-w-[680px] text-[clamp(1.95rem,3.35vw,3.35rem)] font-medium leading-[1.025] tracking-[-0.045em] text-white"
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

      </div>

      <div className="relative h-[52px] max-w-[610px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            key={slide.subtitle}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-0 text-[12px] leading-5 text-white/68 sm:text-[13px] sm:leading-6"
          >
            {slide.subtitle}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center gap-2" aria-label={language === "en" ? "Homepage headlines" : "Titulares del Home"}>
        <span className="mr-2 text-[9px] tabular-nums text-white/45">0{activeSlide + 1} / 0{localizedSlides.length}</span>
        {localizedSlides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`${language === "en" ? "Show" : "Mostrar"}: ${item.title}`}
            aria-current={index === activeSlide ? "true" : undefined}
            className={`relative h-px overflow-hidden transition-[width,background-color] duration-300 ${index === activeSlide ? "w-12 bg-white/25" : "w-4 bg-white/[0.28] hover:bg-white/60"}`}
          >
            {index === activeSlide && (
              <motion.span
                key={`${activeSlide}-progress`}
                className="absolute inset-0 origin-left bg-[#d5a34f]"
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
