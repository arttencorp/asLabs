"use client"
import Link from "next/link"
import CategorySection from "@/components/research/category-section"
import { ingenieriaGenetica, clonacionPlantas, secuenciamiento } from "@/data/pipeline-data"

export default function HomeResearchSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#2e7d32] mb-4 font-serif">Nuestras Líneas de Investigación</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Conoce nuestros proyectos de investigación en biotecnología vegetal y mejoramiento genético para la
            agricultura sostenible.
          </p>
        </div>

        <div className="space-y-8 animate-fadeIn">
          <CategorySection title="SECUENCIAMIENTO" subsections={secuenciamiento} color="blue" />
          <CategorySection title="MEJORAMIENTO GENÉTICO" subsections={ingenieriaGenetica} color="green" />
          <CategorySection title="CLONACIÓN DE PLANTAS" subsections={clonacionPlantas} color="green" />

          <div className="text-center mt-8">
            <Link
              href="/research"
              className="inline-flex items-center text-[#2e7d32] font-medium hover:text-[#4caf50] transition-colors"
            >
              VER TODAS NUESTRAS LÍNEAS DE INVESTIGACIÓN
              <div className="ml-2 flex items-center justify-center w-6 h-6 rounded-full border border-[#2e7d32]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
