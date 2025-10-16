"use client"

import { useState, useEffect } from "react"
import { api, type AttemptRequest, type AttemptResponse } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"
import type { RiemannParams } from "@/app/nivel/[id]/page"

interface RiemannControlsProps {
  levelId: number
  onAttemptComplete: (result: { correct: boolean; stars: number; error?: number }) => void
  onParamsChange?: (params: RiemannParams) => void
}

export function RiemannControls({ levelId, onAttemptComplete, onParamsChange }: RiemannControlsProps) {
  const [n, setN] = useState("4")
  const [method, setMethod] = useState<"LEFT" | "RIGHT" | "MIDDLE" | "TRAPEZOID">("LEFT")
  const [a, setA] = useState("-2")
  const [b, setB] = useState("2")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AttemptResponse | null>(null)

  useEffect(() => {
    if (onParamsChange) {
      onParamsChange({
        n: Number(n) || 4,
        method,
        a: Number(a) || -2,
        b: Number(b) || 2,
      })
    }
  }, [n, method, a, b, onParamsChange])

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)

    try {
      const attempt: AttemptRequest = {
        levelId,
        n: Number(n),
        method,
        a: Number(a),
        b: Number(b),
      }

      const response = await api.submitAttempt(attempt)
      setResult(response)
      onAttemptComplete({ correct: response.correct, stars: response.stars, error: response.error })
    } catch (error) {
      console.error("Error submitting attempt:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Controles de Riemann</CardTitle>
        <CardDescription className="text-pretty">Configura los parámetros para calcular la suma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="method">Método</Label>
          <Select value={method} onValueChange={(value: any) => setMethod(value)}>
            <SelectTrigger id="method">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LEFT">Izquierda</SelectItem>
              <SelectItem value="RIGHT">Derecha</SelectItem>
              <SelectItem value="MIDDLE">Punto Medio</SelectItem>
              <SelectItem value="TRAPEZOID">Trapecio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="n">Número de subdivisiones (n)</Label>
          <Input
            id="n"
            type="number"
            min="1"
            max="100"
            value={n}
            onChange={(e) => setN(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="a">Límite inferior (a)</Label>
            <Input
              id="a"
              type="number"
              step="0.1"
              value={a}
              onChange={(e) => setA(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="b">Límite superior (b)</Label>
            <Input
              id="b"
              type="number"
              step="0.1"
              value={b}
              onChange={(e) => setB(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Calculando..." : "Calcular Suma de Riemann"}
        </Button>

        {result && (
          <Alert variant={result.correct ? "default" : "destructive"}>
            <div className="flex items-start gap-3">
              {result.correct ? (
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 mt-0.5" />
              )}
              <div className="flex-1 space-y-2">
                <AlertDescription className="font-medium">{result.message}</AlertDescription>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Tu aproximación:</span>{" "}
                    <span className="font-mono">{result.approximation.toFixed(4)}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Valor exacto:</span>{" "}
                    <span className="font-mono">{result.exactValue.toFixed(4)}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Error:</span>{" "}
                    <span className="font-mono">{(result.error * 100).toFixed(2)}%</span>
                  </p>
                </div>
              </div>
            </div>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
