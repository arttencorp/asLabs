"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Mostrar el modal cuando se carga la página
    setIsOpen(true)
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cerrar si se hace clic fuera del contenido del modal
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-lg w-full mx-4">
        {/* Botón de cerrar */}
        <button
          onClick={closeModal}
          className="absolute -top-3 -right-3 z-10 bg-white hover:bg-gray-100 rounded-full p-1 shadow transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Imagen */}
        <Image
          src="/start/agrofest.jpeg"
          alt="Agrofest 2026"
          width={600}
          height={800}
          className="w-full h-auto rounded"
          priority
        />

        {/* Botón de compra */}
        <a
          href="https://agrofest.pe/formulario-trujillo/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 transition-colors"
        >
          Compra tus entradas aquí
        </a>
      </div>
    </div>
  )
}
