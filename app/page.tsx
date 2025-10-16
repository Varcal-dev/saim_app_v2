import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen jungle-bg flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/">
            <Home className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1
            className="text-7xl md:text-8xl font-black text-primary drop-shadow-lg"
            style={{
              textShadow: "4px 4px 0px rgba(234, 179, 8, 0.5), 8px 8px 0px rgba(34, 197, 94, 0.3)",
            }}
          >
            SAIM
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 font-medium">
            Sistema de Aprendizaje Interactivo de Matemáticas
          </p>
        </div>

        {/* 3D Cube Illustration */}
        <div className="flex justify-center py-8">
          <div className="relative w-48 h-48">
            <img
              src="/3d-mathematical-cube-with-integral-symbols.jpg"
              alt="SAIM Cube"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            className="w-full max-w-md text-2xl py-8 font-bold bg-primary hover:bg-primary/90 text-secondary shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Link href="/dashboard">JUGAR</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full max-w-md text-2xl py-8 font-bold bg-card hover:bg-card/90 border-4 border-primary shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Link href="/instructivo">INSTRUCCIONES</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full max-w-md text-2xl py-8 font-bold bg-card hover:bg-card/90 border-4 border-primary shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Link href="/progreso">PROGRESO</Link>
          </Button>
        </div>

        {/* Decorative flower */}
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-70">
          <img src="/orange-tropical-flower.jpg" alt="Flower" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}
