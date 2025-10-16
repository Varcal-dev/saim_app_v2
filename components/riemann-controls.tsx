"use client"

import { useState, useEffect } from "react"
import { api, type AttemptRequest, type AttemptResponse } from "@/lib/api"

interface RiemannControlsProps {
  levelId: number
  onAttemptComplete: (result: { correct: boolean; stars: number; error?: number }) => void
  onParamsChange?: (params: { n: number; method: any; a: number; b: number }) => void
}

export function RiemannControls({ levelId, onAttemptComplete, onParamsChange }: RiemannControlsProps) {
  const [n, setN] = useState("6")
  const [method, setMethod] = useState<"LEFT" | "RIGHT" | "MIDDLE" | "TRAPEZOID">("LEFT")
  const [a, setA] = useState("-2")
  const [b, setB] = useState("2")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AttemptResponse | null>(null)

  useEffect(() => {
    onParamsChange && onParamsChange({ n: Number(n) || 4, method, a: Number(a) || -2, b: Number(b) || 2 })
  }, [n, method, a, b, onParamsChange])

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)
    try {
      const attempt: AttemptRequest = { levelId, n: Number(n), method, a: Number(a), b: Number(b) }
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
    <div className="game-card p-4 rounded-2xl">
      <h4 className="font-semibold text-yellow-300 mb-2">Controles de Riemann</h4>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-pretty">Método</label>
          <select className="w-full mt-1 rounded-md p-2" value={method} onChange={(e) => setMethod(e.target.value as any)}>
            <option value="LEFT">Izquierda</option>
            <option value="RIGHT">Derecha</option>
            <option value="MIDDLE">Punto Medio</option>
            <option value="TRAPEZOID">Trapecio</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-pretty">Subdivisiones (n)</label>
          <input type="number" min={1} max={200} className="w-full mt-1 rounded-md p-2" value={n} onChange={(e) => setN(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm text-pretty">a</label>
            <input type="number" step="0.1" className="w-full mt-1 rounded-md p-2" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-pretty">b</label>
            <input type="number" step="0.1" className="w-full mt-1 rounded-md p-2" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} className="saim-btn saim-btn-green w-full text-lg">
          {loading ? "Calculando..." : "Calcular Suma de Riemann"}
        </button>

        {result && (
          <div className={`p-3 rounded ${result.correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <div className="font-semibold">{result.message}</div>
            <div className="text-sm text-pretty mt-2">
              Tu aproximación: <code className="font-mono">{result.approximation.toFixed(4)}</code><br />
              Valor exacto: <code className="font-mono">{result.exactValue.toFixed(4)}</code><br />
              Error: <code className="font-mono">{(result.error * 100).toFixed(2)}%</code>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
