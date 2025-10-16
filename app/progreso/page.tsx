"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function ProgresoPage() {
  const router = useRouter()
  const [progress, setProgress] = useState({ completedLevels: 0, totalStars: 0 })
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
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70 font-medium">Cargando progreso...</p>
        </div>
      </div>
    )
  }

  const totalLevels = 5
  const progressPercentage = (progress.completedLevels / totalLevels) * 100

  return (
    <div className="min-h-screen jungle-bg flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Button asChild variant="ghost" size="icon" className="rounded-full bg-card/80 backdrop-blur">
          <Link href="/">
            <Home className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Title */}
        <h1
          className="text-6xl md:text-7xl font-black text-primary drop-shadow-lg"
          style={{
            textShadow: "3px 3px 0px rgba(234, 179, 8, 0.5)",
          }}
        >
          PROGRESO
        </h1>

        {/* Cube Image */}
        <div className="flex justify-center py-4">
          <div className="relative w-48 h-48">
            <img
              src="/3d-mathematical-cube-with-integral-symbols.jpg"
              alt="Progress Cube"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Progress Card */}
        <div className="game-card rounded-3xl p-8 space-y-6">
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            Has completado {Math.round(progressPercentage)}%
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground">del conocimiento de integrales</p>

          <div className="pt-4 space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Niveles completados:</span>
              <span className="text-primary">
                {progress.completedLevels} / {totalLevels}
              </span>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <span>Estrellas obtenidas:</span>
              <span className="text-accent">{progress.totalStars}</span>
            </div>
          </div>
        </div>

        {/* Wooden Sign Decoration */}
        <div className="flex justify-center pt-4">
          <img src="/wooden-sign-with-animal-tracks-and-jungle-theme.jpg" alt="Wooden Sign" className="w-48 h-auto object-contain opacity-80" />
        </div>

        {/* Back Button */}
        <Button asChild size="lg" className="text-xl py-6 px-12 font-bold bg-primary hover:bg-primary/90 shadow-lg">
          <Link href="/dashboard">Volver a Temas</Link>
        </Button>
      </div>
    </div>
  )
}
