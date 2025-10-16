"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lightbulb, Stethoscope } from "lucide-react"

interface HintModalProps {
  open: boolean
  onClose: () => void
  levelId: number
}

export function HintModal({ open, onClose, levelId }: HintModalProps) {
  const [hint, setHint] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setHint("")
      loadHint()
    }
  }, [open, levelId])

  const loadHint = async () => {
    setLoading(true)
    try {
      const response = await api.getHint(levelId)
      setHint(response.hint)
    } catch (error) {
      console.error("Error loading hint:", error)
      setHint("No hay pistas disponibles en este momento.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-balance text-xl">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-accent" />
            </div>
            Consejo del Doctor SAIM
          </DialogTitle>
          <DialogDescription className="text-pretty">
            El Doctor SAIM está aquí para ayudarte a entender mejor las sumas de Riemann
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Doctor Character */}
              <div className="flex items-start gap-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg p-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-accent-foreground" />
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-lg">Pista Educativa</h3>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <p className="text-sm leading-relaxed text-pretty">{hint}</p>
                  </div>
                </div>
              </div>

              {/* Additional Tips */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Recuerda
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-3">
                  <li>• Más subdivisiones (n) = mayor precisión</li>
                  <li>• El método del trapecio suele ser más preciso</li>
                  <li>• Observa cómo los rectángulos se ajustan a la curva</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={onClose}>Entendido, vamos a intentarlo</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
