"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "@/lib/api"

type Level = {
  id: number
  name: string
  description: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [levels, setLevels] = useState<Level[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = api.getToken()
    if (!token) {
      router.push("/login")
      return
    }
    loadLevels()
  }, [router])

  const loadLevels = async () => {
    try {
      const levelsData = await api.getLevels()
      setLevels(levelsData)
    } catch (error) {
      console.error("Error loading levels:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen jungle-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-yellow-100 font-medium">Cargando niveles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen jungle-bg p-6 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="saim-heading text-7xl">SAIM</h1>
        <p className="text-pretty mt-2">Sistema de Aprendizaje Interactivo de Matemáticas</p>
      </header>

      <main className="w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/nivel/1" className="saim-btn saim-btn-green p-6 rounded-2xl text-xl text-center block">
            JUGAR
          </Link>
          <Link href="/instructivo" className="saim-btn saim-btn-yellow p-6 rounded-2xl text-xl text-center block">
            INSTRUCCIONES
          </Link>
          <Link href="/progreso" className="saim-btn saim-btn-green p-6 rounded-2xl text-xl text-center block">
            PROGRESO
          </Link>
          <Link href="/login" className="saim-btn saim-btn-green p-6 rounded-2xl text-xl text-center block">
            CERRAR SESIÓN
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Temas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {levels.map((level) => (
              <div key={level.id} className="game-card p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{level.name}</h3>
                  <p className="text-sm text-pretty">{level.description}</p>
                </div>
                <div>
                  <Link href={`/nivel/${level.id}`} className="saim-btn saim-btn-yellow px-4 py-2 rounded-lg">
                    Jugar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
