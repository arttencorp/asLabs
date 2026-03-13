"use client"

import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative w-full h-96 bg-gradient-to-r from-[#01283c] to-[#2e7d32] overflow-hidden flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 text-balance">AS Laboratorios</h1>
        <p className="text-xl text-gray-100 max-w-2xl mx-auto text-balance">
          Innovación biotecnológica al servicio de la agricultura peruana
        </p>
      </div>
    </section>
  )
}
