'use client'

import { useState } from 'react'
import ComplaintsDialog from './complaints/complaints-dialog'

export default function FooterComplaintsButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
      >
        Abrir formulario
      </button>
      <ComplaintsDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
