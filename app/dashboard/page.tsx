"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api, type Level } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Home, Lock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [levels, setLevels] = useState<Level[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = api.getToken()
    if (!token) {
      router.push("/login")
      return
    }

    loadLevels()
  }, [router])

  const loadLevels = async () => {
    try {
      const levelsData = await api.getLevels()
      setLevels(levelsData)
    } catch (error) {
      console.error("Error loading levels:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLevelClick = (level: Level) => {
    if (!isLevelLocked(level)) {
      router.push(`/nivel/${level.id}`)
    }
  }

  const isLevelLocked = (level: Level) => {
    if (level.id === 1) return false
    const previousLevel = levels.find((l) => l.id === level.id - 1)
    return previousLevel ? !previousLevel.completed : true
  }

  if (loading) {
    return (
      <div className="min-h-screen jungle-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70 font-medium">Cargando niveles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen jungle-bg p-4 md:p-8">
      <div className="absolute top-4 right-4">
        <Button asChild variant="ghost" size="icon" className="rounded-full bg-card/80 backdrop-blur">
          <Link href="/">
            <Home className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1
            className="text-6xl md:text-7xl font-black text-secondary drop-shadow-lg mb-4"
            style={{
              textShadow: "3px 3px 0px rgba(34, 197, 94, 0.5)",
            }}
          >
            TEMAS
          </h1>
        </div>

        {/* Level Buttons */}
        <div className="space-y-6">
          {levels.map((level) => {
            const locked = isLevelLocked(level)
            return (
              <button
                key={level.id}
                onClick={() => handleLevelClick(level)}
                disabled={locked}
                className={`w-full game-card rounded-2xl p-6 transition-all ${
                  locked ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground text-left flex-1">{level.name}</h2>
                  {locked && <Lock className="w-8 h-8 text-muted-foreground ml-4" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Decorative flower */}
        <div className="fixed bottom-8 left-8 w-20 h-20 opacity-60">
          <img src="/orange-tropical-flower.jpg" alt="Flower" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}
