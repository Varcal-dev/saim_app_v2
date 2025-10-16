import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calculator, Grid3x3, Lightbulb, Target } from "lucide-react"

export default function InstructivoPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Instructivo</h1>
            <p className="text-muted-foreground">Aprende cómo usar SAIM</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Objetivo del Juego</CardTitle>
                  <CardDescription>¿Qué aprenderás con SAIM?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                SAIM te ayuda a comprender las <strong>integrales definidas</strong> a través de las{" "}
                <strong>sumas de Riemann</strong>. Cada nivel presenta una función matemática que debes aproximar usando
                diferentes métodos de integración numérica.
              </p>
              <p>
                Tu objetivo es calcular correctamente el área bajo la curva eligiendo el método adecuado (izquierda,
                derecha, punto medio o trapecio) y el número correcto de subdivisiones.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Grid3x3 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <CardTitle>Cómo Jugar</CardTitle>
                  <CardDescription>Pasos para resolver cada nivel</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Analiza la función</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Observa la función matemática y el intervalo [a, b] que debes integrar.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Elige el método</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Selecciona entre suma izquierda, derecha, punto medio o trapecio según la función.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Define las subdivisiones</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Determina el número de subdivisiones (n) para aproximar el área.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Envía tu respuesta</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Confirma tus valores y recibe retroalimentación inmediata sobre tu aproximación.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Calculator className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <CardTitle>Métodos de Riemann</CardTitle>
                  <CardDescription>Técnicas de aproximación disponibles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-semibold mb-2">Suma Izquierda (LEFT)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Usa el valor de la función en el extremo izquierdo de cada subintervalo.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-semibold mb-2">Suma Derecha (RIGHT)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Usa el valor de la función en el extremo derecho de cada subintervalo.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-semibold mb-2">Punto Medio (MIDDLE)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Usa el valor de la función en el punto medio de cada subintervalo.
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-semibold mb-2">Trapecio (TRAPEZOID)</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aproxima cada subintervalo con un trapecio para mayor precisión.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-chart-3/10">
                  <Lightbulb className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <CardTitle>Sistema de Ayuda</CardTitle>
                  <CardDescription>Pistas y retroalimentación</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Si te quedas atascado, puedes solicitar una <strong>pista del Doctor</strong>. Las pistas te orientarán
                sobre qué método usar o cuántas subdivisiones considerar.
              </p>
              <p>
                Cada intento te dará retroalimentación sobre tu aproximación, mostrando el error y ayudándote a mejorar
                tu comprensión de las integrales.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/login">Comenzar a Aprender</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
