"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { GameBoard } from "@/components/game-board"
import { RiemannControls } from "@/components/riemann-controls"
import { DoctorStatus } from "@/components/doctor-status"
import { HintModal } from "@/components/hint-modal"
import { api } from "@/lib/api"

export type RiemannParams = {
  n: number
  method: "LEFT" | "RIGHT" | "MIDDLE" | "TRAPEZOID"
  a: number
  b: number
}

export default function NivelPage() {
  const { id } = useParams()
  const levelId = Number(id)
  const router = useRouter()

  const [exercise, setExercise] = useState<any | null>(null)
  const [riemannParams, setRiemannParams] = useState<RiemannParams>({ n: 4, method: "LEFT", a: -2, b: 2 })
  const [attempts, setAttempts] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [hintOpen, setHintOpen] = useState(false)

  useEffect(() => {
    if (!levelId) return
    loadExercise(levelId)
  }, [levelId])

  const loadExercise = async (lid: number) => {
    try {
      const res = await api.getExercise(lid)
      setExercise(res)
    } catch (e) {
      console.error(e)
    }
  }

  const handleAttemptComplete = (result: { correct: boolean; stars: number; error?: number }) => {
    setAttempts((a) => a + 1)
    if (result.error !== undefined) setAccuracy(100 - result.error * 100)
    if (result.correct) {
      // optionally show modal success or advance
    }
  }

  if (!exercise) {
    return (
      <div className="min-h-screen jungle-bg flex items-center justify-center">
        <div className="text-center text-yellow-100">Cargando ejercicio...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen jungle-bg p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <button className="saim-btn saim-btn-yellow px-4 py-2" onClick={() => router.push("/dashboard")}>← Volver</button>
          <div>
            <button className="saim-btn saim-btn-green px-4 py-2 mr-2" onClick={() => setHintOpen(true)}>Pedir pista</button>
          </div>
        </div>

        <DoctorStatus attempts={attempts} accuracy={accuracy} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <GameBoard levelId={levelId} riemannParams={riemannParams} />
          </div>

          <aside className="space-y-4">
            <div className="game-card p-4 rounded-2xl">
              <h3 className="font-bold text-lg text-yellow-300 mb-2">{exercise.title}</h3>
              <p className="text-pretty">{exercise.description}</p>
            </div>

            <RiemannControls
              levelId={levelId}
              onAttemptComplete={handleAttemptComplete}
              onParamsChange={(p) => setRiemannParams(p)}
            />
          </aside>
        </div>

        <HintModal open={hintOpen} onClose={() => setHintOpen(false)} levelId={levelId} />
      </div>
    </div>
  )
}
