"use client"

import { useState, useCallback, useEffect } from "react"
import type { Document } from "../types"

const STORAGE_KEY = "aslab_documents"

export const useDocumentStore = () => {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setDocuments(JSON.parse(stored))
    }
  }, [])

  const saveDocument = useCallback((doc: Document) => {
    setDocuments((prev) => {
      const updated = prev.some((d) => d.id === doc.id) ? prev.map((d) => (d.id === doc.id ? doc : d)) : [...prev, doc]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => {
      const updated = prev.filter((d) => d.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const generateDocumentCode = () => {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `ASLAB-${year}-${random}`
  }

  return { documents, saveDocument, deleteDocument, generateDocumentCode }
}
