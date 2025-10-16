"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, TrendingUp, Target } from "lucide-react"

interface DoctorStatusProps {
  attempts: number
  accuracy?: number
}

export function DoctorStatus({ attempts, accuracy = 0 }: DoctorStatusProps) {
  const getMessage = () => {
    if (attempts === 0) {
      return "¡Comencemos! Configura los parámetros y calcula tu primera suma de Riemann."
    }
    if (accuracy >= 95) {
      return "¡Excelente trabajo! Tu precisión es sobresaliente."
    }
    if (accuracy >= 80) {
      return "¡Muy bien! Estás en el camino correcto."
    }
    if (accuracy >= 60) {
      return "Buen intento. Prueba aumentar el número de subdivisiones."
    }
    return "Sigue intentando. Recuerda que puedes pedir una pista."
  }

  const getStatusColor = () => {
    if (accuracy >= 95) return "text-accent"
    if (accuracy >= 80) return "text-secondary"
    if (accuracy >= 60) return "text-primary"
    return "text-muted-foreground"
  }

  return (
    <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-sm text-balance">Doctor SAIM</h3>
              <p className="text-sm text-muted-foreground text-pretty mt-1">{getMessage()}</p>
            </div>

            {attempts > 0 && (
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Intentos:</span>
                  <span className="font-medium">{attempts}</span>
                </div>
                {accuracy > 0 && (
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Precisión:</span>
                    <span className={`font-medium ${getStatusColor()}`}>{accuracy.toFixed(1)}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
