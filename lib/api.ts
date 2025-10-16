import type { Level, LoginRequest, LoginResponse, AttemptRequest, AttemptResponse } from "./types" // Import necessary types

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || true // Set to true for demo

const MOCK_USERS = [
  { username: "estudiante", password: "demo123", userId: 1, role: "STUDENT" },
  { username: "profesor", password: "demo123", userId: 2, role: "TEACHER" },
]

const MOCK_LEVELS: Level[] = [
  {
    id: 1,
    name: "Nivel 1: Introducción",
    description: "Aprende los conceptos básicos de las sumas de Riemann con f(x) = x²",
    difficulty: 1,
    completed: false,
    stars: 0,
  },
  {
    id: 2,
    name: "Nivel 2: Funciones Lineales",
    description: "Practica con funciones lineales f(x) = 2x + 1",
    difficulty: 2,
    completed: false,
    stars: 0,
  },
  {
    id: 3,
    name: "Nivel 3: Funciones Cúbicas",
    description: "Desafío con funciones cúbicas f(x) = x³ - 2x",
    difficulty: 3,
    completed: false,
    stars: 0,
  },
  {
    id: 4,
    name: "Nivel 4: Funciones Trigonométricas",
    description: "Explora las sumas de Riemann con f(x) = sin(x)",
    difficulty: 4,
    completed: false,
    stars: 0,
  },
  {
    id: 5,
    name: "Nivel 5: Maestro de Integrales",
    description: "Nivel avanzado con f(x) = e^x",
    difficulty: 5,
    completed: false,
    stars: 0,
  },
]

class ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("saim_token", token)
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      this.token = localStorage.getItem("saim_token")
    }
    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("saim_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Error desconocido" }))
      throw new Error(error.message || `Error ${response.status}`)
    }

    return response.json()
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
      const user = MOCK_USERS.find((u) => u.username === credentials.username && u.password === credentials.password)
      if (!user) {
        throw new Error("Usuario o contraseña incorrectos")
      }
      const response: LoginResponse = {
        token: `demo_token_${user.userId}`,
        userId: user.userId,
        username: user.username,
        role: user.role,
      }
      this.setToken(response.token)
      return response
    }

    const response = await this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    this.setToken(response.token)
    return response
  }

  async register(credentials: LoginRequest): Promise<LoginResponse> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newUser = {
        username: credentials.username,
        userId: MOCK_USERS.length + 1,
        role: "STUDENT",
      }
      const response: LoginResponse = {
        token: `demo_token_${newUser.userId}`,
        userId: newUser.userId,
        username: newUser.username,
        role: newUser.role,
      }
      this.setToken(response.token)
      return response
    }

    const response = await this.request<LoginResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
    this.setToken(response.token)
    return response
  }

  async getLevels(): Promise<Level[]> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const progress = JSON.parse(localStorage.getItem("saim_demo_progress") || "{}")
      return MOCK_LEVELS.map((level) => ({
        ...level,
        completed: progress[level.id]?.completed || false,
        stars: progress[level.id]?.stars || 0,
      }))
    }

    return this.request<Level[]>("/levels")
  }

  async getLevel(id: number): Promise<Level> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const progress = JSON.parse(localStorage.getItem("saim_demo_progress") || "{}")
      const level = MOCK_LEVELS.find((l) => l.id === id)
      if (!level) throw new Error("Nivel no encontrado")
      return {
        ...level,
        completed: progress[id]?.completed || false,
        stars: progress[id]?.stars || 0,
      }
    }

    return this.request<Level>(`/levels/${id}`)
  }

  async submitAttempt(attempt: AttemptRequest): Promise<AttemptResponse> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Calculate Riemann sum based on level
      const { levelId, n, method, a, b } = attempt
      const dx = (b - a) / n
      let approximation = 0

      // Define function based on level
      const functions: { [key: number]: (x: number) => number } = {
        1: (x) => x * x, // x²
        2: (x) => 2 * x + 1, // 2x + 1
        3: (x) => x * x * x - 2 * x, // x³ - 2x
        4: (x) => Math.sin(x), // sin(x)
        5: (x) => Math.exp(x), // e^x
      }

      const f = functions[levelId] || functions[1]

      // Calculate Riemann sum
      for (let i = 0; i < n; i++) {
        let x: number
        if (method === "LEFT") {
          x = a + i * dx
        } else if (method === "RIGHT") {
          x = a + (i + 1) * dx
        } else if (method === "MIDDLE") {
          x = a + (i + 0.5) * dx
        } else {
          // TRAPEZOID
          const x1 = a + i * dx
          const x2 = a + (i + 1) * dx
          approximation += ((f(x1) + f(x2)) / 2) * dx
          continue
        }
        approximation += f(x) * dx
      }

      // Calculate exact value (simplified for demo)
      const exactFunctions: { [key: number]: (a: number, b: number) => number } = {
        1: (a, b) => (b ** 3 - a ** 3) / 3, // ∫x² = x³/3
        2: (a, b) => b ** 2 + b - (a ** 2 + a), // ∫(2x+1) = x² + x
        3: (a, b) => (b ** 4 - a ** 4) / 4 - (b ** 2 - a ** 2), // ∫(x³-2x)
        4: (a, b) => -Math.cos(b) + Math.cos(a), // ∫sin(x) = -cos(x)
        5: (a, b) => Math.exp(b) - Math.exp(a), // ∫e^x = e^x
      }

      const exactValue = exactFunctions[levelId]?.(a, b) || approximation
      const error = Math.abs(((approximation - exactValue) / exactValue) * 100)

      // Determine stars based on error
      let stars = 0
      if (error < 1) stars = 3
      else if (error < 5) stars = 2
      else if (error < 10) stars = 1

      const correct = stars > 0

      // Save progress
      const progress = JSON.parse(localStorage.getItem("saim_demo_progress") || "{}")
      if (!progress[levelId] || progress[levelId].stars < stars) {
        progress[levelId] = { completed: correct, stars }
        localStorage.setItem("saim_demo_progress", JSON.stringify(progress))
      }

      return {
        correct,
        message: correct
          ? `¡Excelente! Tu aproximación es muy precisa (${stars} estrellas)`
          : "Intenta ajustar los parámetros para mejorar la aproximación",
        stars,
        approximation,
        exactValue,
        error,
      }
    }

    return this.request<AttemptResponse>("/game/attempt", {
      method: "POST",
      body: JSON.stringify(attempt),
    })
  }

  async getHint(levelId: number): Promise<{ hint: string }> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const hints: { [key: number]: string } = {
        1: "Para funciones cuadráticas como x², el método del punto medio suele dar mejores resultados. Intenta con n=10 subdivisiones.",
        2: "Las funciones lineales son más fáciles de aproximar. Cualquier método funciona bien, pero el trapezoidal es perfecto para líneas rectas.",
        3: "Las funciones cúbicas tienen más curvatura. Usa más subdivisiones (n≥20) y el método del punto medio para mejor precisión.",
        4: "Las funciones trigonométricas oscilan. Asegúrate de usar suficientes subdivisiones para capturar la forma de la onda.",
        5: "La función exponencial crece rápidamente. El método trapezoidal con muchas subdivisiones (n≥30) da buenos resultados.",
      }
      return { hint: hints[levelId] || "Experimenta con diferentes valores de n y métodos de aproximación." }
    }

    return this.request<{ hint: string }>(`/game/hint/${levelId}`)
  }

  async getProgress(): Promise<{ completedLevels: number; totalStars: number }> {
    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      const progress = JSON.parse(localStorage.getItem("saim_demo_progress") || "{}")
      const completedLevels = Object.values(progress).filter((p: any) => p.completed).length
      const totalStars = Object.values(progress).reduce((sum: number, p: any) => sum + (p.stars || 0), 0)
      return { completedLevels, totalStars }
    }

    return this.request("/game/progress")
  }
}

export const api = new ApiClient()
