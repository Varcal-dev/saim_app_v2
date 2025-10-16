"use client"

import { useEffect, useState, useRef } from "react"
import type { RiemannParams } from "@/app/nivel/[id]/page"

interface GameBoardProps {
  levelId: number
  riemannParams?: RiemannParams
}

export function GameBoard({ levelId, riemannParams }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    const updateDimensions = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        const width = Math.min(container.clientWidth - 32, 800)
        const height = Math.min(width * 0.75, 600)
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

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Draw grid
    drawGrid(ctx, dimensions.width, dimensions.height)

    // Draw axes
    drawAxes(ctx, dimensions.width, dimensions.height)

    if (riemannParams) {
      drawRiemannRectangles(ctx, dimensions.width, dimensions.height, levelId, riemannParams)
    }

    // Draw sample function (will be replaced with actual level data)
    drawFunction(ctx, dimensions.width, dimensions.height, levelId)
  }, [dimensions, levelId, riemannParams])

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)"
    ctx.lineWidth = 1

    const gridSize = 40
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }

  const drawAxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2
    const centerY = height / 2

    ctx.strokeStyle = "rgba(100, 100, 100, 0.8)"
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(width, centerY)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, height)
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "rgba(100, 100, 100, 0.8)"
    ctx.font = "12px sans-serif"
    ctx.fillText("x", width - 20, centerY - 10)
    ctx.fillText("y", centerX + 10, 20)
  }

  const getFunction = (levelId: number): ((x: number) => number) => {
    const functions: Record<number, (x: number) => number> = {
      1: (x) => x * x, // x^2
      2: (x) => Math.sin(x), // sin(x)
      3: (x) => Math.exp((-x * x) / 4), // Gaussian
      4: (x) => 1 / (1 + x * x), // 1/(1+x^2)
      5: (x) => x * Math.sin(x), // x*sin(x)
    }
    return functions[levelId] || functions[1]
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
    const scale = 40

    const func = getFunction(levelId)
    const { n, method, a, b } = params
    const dx = (b - a) / n

    ctx.fillStyle = "rgba(139, 92, 246, 0.3)" // Semi-transparent purple
    ctx.strokeStyle = "rgba(139, 92, 246, 0.6)"
    ctx.lineWidth = 2

    for (let i = 0; i < n; i++) {
      const x0 = a + i * dx
      const x1 = a + (i + 1) * dx

      let sampleX: number
      switch (method) {
        case "LEFT":
          sampleX = x0
          break
        case "RIGHT":
          sampleX = x1
          break
        case "MIDDLE":
          sampleX = (x0 + x1) / 2
          break
        case "TRAPEZOID":
          // For trapezoid, we'll draw a trapezoid shape
          const y0 = func(x0)
          const y1 = func(x1)
          const px0 = centerX + x0 * scale
          const px1 = centerX + x1 * scale
          const py0 = centerY - y0 * scale
          const py1 = centerY - y1 * scale

          ctx.beginPath()
          ctx.moveTo(px0, centerY)
          ctx.lineTo(px0, py0)
          ctx.lineTo(px1, py1)
          ctx.lineTo(px1, centerY)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
          continue
        default:
          sampleX = x0
      }

      const y = func(sampleX)
      const px0 = centerX + x0 * scale
      const px1 = centerX + x1 * scale
      const py = centerY - y * scale

      ctx.fillRect(px0, py, px1 - px0, centerY - py)
      ctx.strokeRect(px0, py, px1 - px0, centerY - py)
    }
  }

  const drawFunction = (ctx: CanvasRenderingContext2D, width: number, height: number, levelId: number) => {
    const centerX = width / 2
    const centerY = height / 2
    const scale = 40

    ctx.strokeStyle = "oklch(0.55 0.22 260)"
    ctx.lineWidth = 3
    ctx.beginPath()

    const func = getFunction(levelId)

    for (let px = 0; px < width; px++) {
      const x = (px - centerX) / scale
      const y = func(x)
      const py = centerY - y * scale

      if (px === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    }

    ctx.stroke()
  }

  return (
    <div className="w-full bg-muted/30 rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-auto border border-border rounded"
      />
    </div>
  )
}
