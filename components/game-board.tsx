"use client"

import { useEffect, useState, useRef } from "react"
import type { RiemannParams } from "@/app/nivel/[id]/page"

interface GameBoardProps {
  levelId: number
  riemannParams?: RiemannParams
}

export function GameBoard({ levelId, riemannParams }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 840, height: 420 })

  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const width = Math.min(container.clientWidth - 32, 920)
        const height = Math.min(Math.round(width * 0.5), 520)
        setDimensions({ width, height })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // background board image underneath (optional)
    // draw grid
    drawGrid(ctx, dimensions.width, dimensions.height)
    drawAxes(ctx, dimensions.width, dimensions.height)
    drawFunction(ctx, dimensions.width, dimensions.height, levelId)

    if (riemannParams) {
      drawRiemannRectangles(ctx, dimensions.width, dimensions.height, levelId, riemannParams)
    }
  }, [dimensions, levelId, riemannParams])

  /* Helper drawing functions (same logic as antes, scaled). Kept simple here. */
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = "rgba(250,250,245,0.02)"
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = "rgba(0,0,0,0.05)"
    for (let x = 0; x <= width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
    }
    for (let y = 0; y <= height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
    }
  }

  const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerY = height / 2
    ctx.strokeStyle = "rgba(20,40,20,0.6)"
    ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(0, centerY); ctx.lineTo(width, centerY); ctx.stroke()
  }

  const getFunction = (levelId: number): ((x: number) => number) => {
    const table: Record<number, (x: number) => number> = {
      1: (x) => x * x,
      2: (x) => Math.sin(x),
      3: (x) => Math.exp(-x * x / 4),
      4: (x) => 1 / (1 + x * x),
      5: (x) => x * Math.sin(x),
    }
    return table[levelId] ?? table[1]
  }

  const drawFunction = (ctx: CanvasRenderingContext2D, width: number, height: number, levelId: number) => {
    const centerX = width / 2
    const centerY = height / 2
    const scale = Math.max(30, Math.round(width / 20))
    ctx.strokeStyle = "#1f8a3a"
    ctx.lineWidth = 3
    ctx.beginPath()
    const f = getFunction(levelId)
    for (let px = 0; px <= width; px++) {
      const x = (px - centerX) / scale
      const y = f(x)
      const py = centerY - y * scale
      if (px === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.stroke()
  }

  const drawRiemannRectangles = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    levelId: number,
    params: RiemannParams,
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const scale = Math.max(30, Math.round(width / 20))
    const f = getFunction(levelId)
    const { n, method, a, b } = params
    const dx = (b - a) / Math.max(1, n)
    ctx.fillStyle = "rgba(34,197,94,0.28)"
    ctx.strokeStyle = "rgba(34,197,94,0.6)"
    for (let i = 0; i < n; i++) {
      const x0 = a + i * dx
      const x1 = a + (i + 1) * dx
      let sampleX = x0
      if (method === "RIGHT") sampleX = x1
      if (method === "MIDDLE") sampleX = (x0 + x1) / 2

      if (method === "TRAPEZOID") {
        const y0 = f(x0); const y1 = f(x1)
        const px0 = centerX + x0 * scale; const px1 = centerX + x1 * scale
        const py0 = centerY - y0 * scale; const py1 = centerY - y1 * scale
        ctx.beginPath(); ctx.moveTo(px0, centerY); ctx.lineTo(px0, py0); ctx.lineTo(px1, py1); ctx.lineTo(px1, centerY); ctx.closePath()
        ctx.fill(); ctx.stroke()
      } else {
        const y = f(sampleX)
        const px0 = centerX + x0 * scale
        const px1 = centerX + x1 * scale
        const py = centerY - y * scale
        ctx.fillRect(px0, py, px1 - px0, centerY - py)
        ctx.strokeRect(px0, py, px1 - px0, centerY - py)
      }
    }
  }

  return (
    <div className="relative bg-transparent rounded-lg p-4 flex items-center justify-center">
      {/* Left character */}
      <img src="/assets/explorer.png" alt="explorer" className="hidden md:block w-28 mr-4" />
      <div className="bg-card p-2 rounded-xl shadow-inner">
        <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="rounded-lg border border-border" />
      </div>
      {/* Right character */}
      <img src="/assets/antagonist.png" alt="antagonist" className="hidden md:block w-28 ml-4" />
    </div>
  )
}
