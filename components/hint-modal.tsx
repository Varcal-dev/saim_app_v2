"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"

interface HintModalProps {
  open: boolean
  onClose: () => void
  levelId: number
}

export function HintModal({ open, onClose, levelId }: HintModalProps) {
  const [hint, setHint] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) loadHint()
  }, [open, levelId])

  const loadHint = async () => {
    setLoading(true)
    try {
      const res = await api.getHint(levelId)
      setHint((res as any).hint ?? (res as any).message ?? "Pista no disponible.")
    } catch (e) {
      console.error(e); setHint("No hay pistas disponibles en este momento.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="saim-modal z-10 max-w-2xl w-full">
        <div className="flex items-start gap-4">
          <img src="/assets/edwincillo.png" alt="edwincillo" className="w-20 h-20" />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-yellow-500">Consejo de Edwincillo</h3>
            <div className="mt-2 text-pretty">
              {loading ? <div>Cargando pista...</div> : <p>{hint}</p>}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button className="saim-btn saim-btn-yellow px-4 py-2 rounded" onClick={onClose}>Cerrar</button>
          <button className="saim-btn saim-btn-green px-4 py-2 rounded" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  )
}
