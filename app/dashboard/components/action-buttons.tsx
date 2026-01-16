"use client"

interface ActionButtonsProps {
  onSave: () => void
  onPreview: () => void
  onNew: () => void
}

export default function ActionButtons({ onSave, onPreview, onNew }: ActionButtonsProps) {
  return (
    <div className="mt-8 flex gap-4 justify-center flex-wrap">
      <button
        onClick={onSave}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-serif font-semibold transition-colors"
      >
        Guardar Borrador
      </button>
      <button
        onClick={onPreview}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-serif font-semibold transition-colors"
      >
        Vista Previa
      </button>
      <button
        onClick={onNew}
        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-serif font-semibold transition-colors"
      >
        Nuevo Documento
      </button>
    </div>
  )
}
