"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, TrendingUp, Target } from "lucide-react"

interface DoctorStatusProps {
  attempts: number
  accuracy?: number
}

export function DoctorStatus({ attempts, accuracy = 0 }: DoctorStatusProps) {
  const getMessage = () => {
    if (attempts === 0) return "¡Comencemos! Ajusta parámetros y prueba tu primera suma de Riemann."
    if (accuracy >= 95) return "¡Excelente! Precisión sobresaliente."
    if (accuracy >= 80) return "Muy bien, vas por buen camino."
    if (accuracy >= 60) return "Buen intento. Intenta aumentar n."
    return "Sigue intentando. Pide una pista si lo necesitas."
  }

  const getStatusColor = () => {
    if (accuracy >= 95) return "text-accent"
    if (accuracy >= 80) return "text-secondary"
    if (accuracy >= 60) return "text-primary"
    return "text-muted-foreground"
  }

  return (
    <Card className="game-card p-4 rounded-2xl">
      <CardContent className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-yellow-700" />
        </div>

        <div className="flex-1">
          <div className="font-semibold text-pretty">Doctor SAIM</div>
          <div className="text-sm text-pretty">{getMessage()}</div>

          {attempts > 0 && (
            <div className="mt-3 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-pretty">
                <Target className="w-4 h-4" /> Intentos: <span className="font-medium">{attempts}</span>
              </div>
              <div className="flex items-center gap-2 text-pretty">
                <TrendingUp className="w-4 h-4" /> Precisión: <span className={`font-medium ${getStatusColor()}`}>{accuracy.toFixed(1)}%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
