"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { api, type Level } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, HelpCircle } from "lucide-react"
import { GameBoard } from "@/components/game-board"
import { RiemannControls } from "@/components/riemann-controls"
import { HintModal } from "@/components/hint-modal"
import { DoctorStatus } from "@/components/doctor-status"

export interface RiemannParams {
  n: number
  method: "LEFT" | "RIGHT" | "MIDDLE" | "TRAPEZOID"
  a: number
  b: number
}

export default function NivelPage() {
  const router = useRouter()
  const params = useParams()
  const levelId = Number(params.id)

  const [level, setLevel] = useState<Level | null>(null)
  const [loading, setLoading] = useState(true)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [stars, setStars] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [riemannParams, setRiemannParams] = useState<RiemannParams>({
    n: 4,
    method: "LEFT",
    a: -2,
    b: 2,
  })

  useEffect(() => {
    const token = api.getToken()
    if (!token) {
      router.push("/login")
      return
    }

    loadLevel()
  }, [levelId, router])

  const loadLevel = async () => {
    try {
      const levelData = await api.getLevel(levelId)
      setLevel(levelData)
    } catch (error) {
      console.error("Error loading level:", error)
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  const handleAttemptComplete = (result: { correct: boolean; stars: number; error?: number }) => {
    setAttempts((prev) => prev + 1)
    if (result.error !== undefined) {
      setAccuracy((1 - result.error) * 100)
    }
    if (result.correct) {
      setStars(result.stars)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando nivel...</p>
        </div>
      </div>
    )
  }

  if (!level) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge>Nivel {level.id}</Badge>
                  <h1 className="text-lg font-bold text-balance">{level.name}</h1>
                </div>
                <p className="text-sm text-muted-foreground text-pretty">{level.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Intentos</p>
                <p className="text-lg font-bold">{attempts}</p>
              </div>
              {stars > 0 && (
                <div className="flex gap-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
              )}
              <Button variant="outline" size="sm" onClick={() => setShowHint(true)}>
                <HelpCircle className="w-4 h-4 mr-2" />
                Pista
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance">Tablero de Juego</CardTitle>
                <CardDescription className="text-pretty">
                  Visualiza la función y calcula la suma de Riemann
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GameBoard levelId={levelId} riemannParams={riemannParams} />
              </CardContent>
            </Card>

            {/* Doctor Status */}
            <DoctorStatus attempts={attempts} accuracy={accuracy} />
          </div>

          {/* Controls */}
          <div className="lg:col-span-1">
            <RiemannControls
              levelId={levelId}
              onAttemptComplete={handleAttemptComplete}
              onParamsChange={setRiemannParams}
            />
          </div>
        </div>
      </main>

      {/* Hint Modal */}
      <HintModal open={showHint} onClose={() => setShowHint(false)} levelId={levelId} />
    </div>
  )
}
