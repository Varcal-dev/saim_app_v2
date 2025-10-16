"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"

export default function ProgresoPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<{ completedLevels: number; totalStars: number; totalLevels?: number }>({ completedLevels: 0, totalStars: 0, totalLevels: undefined })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = api.getToken()
    if (!token) {
      router.push("/login")
      return
    }
    loadProgress()
  }, [router])

  const loadProgress = async () => {
    try {
      const progressData = await api.getProgress()
      setProgress(progressData)
    } catch (error) {
      console.error("Error loading progress:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen jungle-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-yellow-100 font-medium">Cargando progreso...</p>
        </div>
      </div>
    )
  }

  
  const totalLevels = progress.totalLevels ?? 5
  const progressPercentage = totalLevels ? Math.round((progress.completedLevels / totalLevels) * 100) : 0

  return (
    <div className="min-h-screen jungle-bg flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="saim-heading text-6xl text-center mb-6">PROGRESO</h1>

        <div className="game-card p-6 rounded-3xl text-center">
          <img src="/assets/progress-cube.png" alt="cube" className="mx-auto w-36 mb-4" />
          <p className="text-3xl font-bold text-yellow-300">{progressPercentage}%</p>
          <p className="text-pretty mt-2">Has completado {progress.completedLevels} niveles</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-pretty">Niveles completados</div>
              <div className="text-xl font-bold">{progress.completedLevels}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-pretty">Estrellas</div>
              <div className="text-xl font-bold">{progress.totalStars}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="saim-btn saim-btn-green px-6 py-3 rounded-2xl">Volver a Temas</Link>
        </div>
      </div>
    </div>
  )
}
