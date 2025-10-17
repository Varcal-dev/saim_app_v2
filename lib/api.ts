// lib/api.ts
// ✅ Compatible con los componentes SAIM actualizados

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export interface Level {
  id: number
  name: string
  description: string
}

export interface AttemptRequest {
  levelId: number
  n: number
  method: "LEFT" | "RIGHT" | "MIDDLE" | "TRAPEZOID"
  a: number
  b: number
}

export interface AttemptResponse {
  correct: boolean
  stars: number
  error: number
  approximation: number
  exactValue: number
  message: string
}

export interface ProgressResponse {
  completedLevels: number
  totalStars: number
  totalLevels?: number
}

export interface HintResponse {
  hint: string
  message?: string
}

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("saim_token") : null
}

async function login(data: { username: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al iniciar sesión")
  return await res.json()
}

async function register(data: { username: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al registrar usuario")
  return await res.json()
}

async function getLevels(): Promise<Level[]> {
  const res = await fetch(`${API_BASE}/niveles`)
  if (!res.ok) throw new Error("Error al obtener niveles")
  return await res.json()
}

async function getExercise(levelId: number) {
  const res = await fetch(`${API_BASE}/ejercicios/nivel/${levelId}`)
  if (!res.ok) throw new Error("Error al obtener ejercicio")
  return await res.json()
}

async function submitAttempt(data: AttemptRequest): Promise<AttemptResponse> {
  const res = await fetch(`${API_BASE}/attempts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al enviar intento")
  return await res.json()
}

async function getProgress(): Promise<ProgressResponse> {
  const res = await fetch(`${API_BASE}/progreso`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) throw new Error("Error al obtener progreso")
  return await res.json()
}

async function getHint(levelId: number): Promise<HintResponse> {
  const res = await fetch(`${API_BASE}/hints/${levelId}`)
  if (!res.ok) throw new Error("Error al obtener pista")
  return await res.json()
}

export const api = {
  getToken,
  login,
  register,
  getLevels,
  getExercise,
  submitAttempt,
  getHint,
  getProgress,
}

export type ApiClient = typeof api
