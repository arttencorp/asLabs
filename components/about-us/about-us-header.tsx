"use client"

import { useState } from "react"
import Image from "next/image"

export default function AboutUsHeader() {
  const [activeTab, setActiveTab] = useState("mission")

  const tabContent = {
    mission: {
      title: "Nuestra misión",
      content:
        "Nuestra misión es desarrollar y proveer soluciones biotecnológicas innovadoras y sostenibles para la agricultura peruana, contribuyendo a la seguridad alimentaria, la conservación del medio ambiente y la formación de nuevas generaciones de científicos a través de nuestros materiales educativos.",
    },
    leadership: {
      title: "Liderazgo",
      content:
        "Nuestro equipo directivo está formado por profesionales con más de 20 años de experiencia en biotecnología vegetal y control biológico. Liderados por especialistas en microbiología, agronomía y biotecnología, trabajamos para ofrecer soluciones que combinen ciencia de vanguardia con aplicaciones prácticas para el agricultor peruano.",
    },
    story: {
      title: "Nuestra historia",
      content:
        "Fundada en el año 2000, AS Laboratorios Control Biológico S.A.C. comenzó como un pequeño laboratorio especializado en cultivo in vitro de plantas de banano. A lo largo de dos décadas, hemos expandido nuestras operaciones para incluir el desarrollo de microorganismos benéficos para el control biológico y la producción de materiales educativos para universidades. Hoy somos referentes en biotecnología vegetal en Perú.",
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-[#01283c] mb-2">Sobre nosotros</h1>
            <p className="text-sm text-gray-500 mb-2">Explorar:</p>
            <div className="flex border-b mb-6">
              <button
                onClick={() => setActiveTab("mission")}
                className={`pb-2 mr-6 font-medium ${
                  activeTab === "mission"
                    ? "text-[#d1343e] border-b-2 border-[#d1343e]"
                    : "text-gray-500 hover:text-[#2e7d32]"
                }`}
              >
                Nuestra misión
              </button>
              <button
                onClick={() => setActiveTab("leadership")}
                className={`pb-2 mr-6 font-medium ${
                  activeTab === "leadership"
                    ? "text-[#d1343e] border-b-2 border-[#d1343e]"
                    : "text-gray-500 hover:text-[#2e7d32]"
                }`}
              >
                Liderazgo
              </button>
              <button
                onClick={() => setActiveTab("story")}
                className={`pb-2 font-medium ${
                  activeTab === "story"
                    ? "text-[#d1343e] border-b-2 border-[#d1343e]"
                    : "text-gray-500 hover:text-[#2e7d32]"
                }`}
              >
                Nuestra historia
              </button>
            </div>
            <p className="text-base text-[#01283c] mb-6 leading-relaxed">{tabContent[activeTab].content}</p>
            <div className="mt-8">
              <svg
                className="text-[#2e7d32] w-full"
                height="120"
                viewBox="0 0 400 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 60C50 20 100 100 150 60C200 20 250 100 300 60C350 20 400 100 450 60"
                  stroke="#4FC3F7"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative max-w-md mx-auto">
              <Image
                src="/scientist-laptop.png"
                alt="Científico en laboratorio de AS Labs"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div className="absolute -bottom-10 -left-10 w-32 h-32">
                <Image
                  src="/microscope-scientist.png"
                  alt="Investigación en microorganismos"
                  width={128}
                  height={128}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
