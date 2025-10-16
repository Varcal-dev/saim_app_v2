"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api } from "@/lib/api"
import { Calculator, Info } from "lucide-react"

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
      let response
      if (isLogin) {
        response = await api.login({ username, password })
      } else {
        response = await api.register({ username, password })
      }
      localStorage.setItem("saim_username", response.username)
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
      localStorage.setItem("saim_username", response.username)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al autenticar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Calculator className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">SAIM</h1>
          <p className="text-sm text-muted-foreground">Sistema de Aprendizaje Interactivo de Matemáticas</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Modo Demo:</strong> Usa las credenciales de prueba o crea una cuenta nueva para explorar la
            aplicación.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</CardTitle>
            <CardDescription>
              {isLogin ? "Ingresa tus credenciales para continuar" : "Crea una cuenta para comenzar a aprender"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="tu_usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              </Button>

              {isLogin && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleDemoLogin}
                  disabled={loading}
                >
                  Probar con cuenta demo
                </Button>
              )}

              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError("")
                  }}
                  className="text-primary hover:underline"
                  disabled={loading}
                >
                  {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>

              <div className="text-sm text-center">
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Volver al inicio
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-sm space-y-2">
              <p className="font-semibold">Credenciales de prueba:</p>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  Usuario: <code className="px-1 py-0.5 bg-background rounded">estudiante</code>
                </p>
                <p>
                  Contraseña: <code className="px-1 py-0.5 bg-background rounded">demo123</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
