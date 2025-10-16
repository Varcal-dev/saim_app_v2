"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = isLogin ? await api.login({ username, password }) : await api.register({ username, password })
      // backend should return token and username
      if (response?.token) localStorage.setItem("saim_token", response.token)
      if (response?.username) localStorage.setItem("saim_username", response.username)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al autenticar")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setUsername("estudiante")
    setPassword("demo123")
    setError("")
    setLoading(true)
    try {
      const response = await api.login({ username: "estudiante", password: "demo123" })
      if (response?.token) localStorage.setItem("saim_token", response.token)
      if (response?.username) localStorage.setItem("saim_username", response.username)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al autenticar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen jungle-bg flex items-center justify-center px-4">
      <div className="relative max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="saim-heading text-6xl">SAIM</h1>
        </div>

        <div className="game-card p-6 rounded-3xl">
          <div className="flex flex-col items-center gap-4">
            <img src="/assets/cube-gold.png" alt="cube" className="w-36 h-36 object-contain" />
            <form onSubmit={handleSubmit} className="w-full mt-2 space-y-4">
              {error && <div className="p-3 rounded bg-red-100 text-red-800">{error}</div>}
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 bg-white/90"
                required
                disabled={loading}
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-yellow-100 bg-white/90"
                required
                disabled={loading}
              />

              <button type="submit" className="saim-btn saim-btn-green w-full text-xl">
                {loading ? "Cargando..." : isLogin ? "ENTRAR" : "CREAR CUENTA"}
              </button>

              <button type="button" onClick={handleDemoLogin} className="saim-btn saim-btn-yellow w-full text-lg">
                Probar cuenta demo
              </button>

              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError("") }}
                  className="underline text-pretty"
                >
                  {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-pretty">
          <Link href="/instructivo">Instructivo</Link> • <Link href="/progreso">Progreso</Link>
        </div>
      </div>
    </div>
  )
}
