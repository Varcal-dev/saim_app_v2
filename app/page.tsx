import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen jungle-bg p-6 flex flex-col items-center">
      {/* fondo suave */}
      <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full bg-white/6 blur-3xl -z-10" />
      <div className="absolute right-[-80px] bottom-[-80px] w-72 h-72 rounded-full bg-black/6 blur-2xl -z-10" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
            .saim-float { animation: float 6s ease-in-out infinite; }
          `,
        }}
      />

      <header className="text-center mb-8">
        <h1 className="saim-heading text-7xl">SAIM</h1>
        <p className="text-pretty mt-2">Sistema de Aprendizaje Interactivo de Matemáticas</p>
      </header>

      <main className="w-full max-w-4xl">
        <div className="game-card p-8 md:p-12 rounded-2xl text-center">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-44 h-44 md:w-56 md:h-56 saim-float rounded-xl bg-white/6 flex items-center justify-center shadow-xl p-4">
              <Image
                src="/3d-mathematical-cube-with-integral-symbols.jpg"
                alt="Cubo matemático"
                width={360}
                height={360}
                className="object-contain"
                priority
              />
            </div>

            <div className="flex-1 text-left space-y-4">
              <h2 className="text-2xl font-bold text-yellow-300">Bienvenido</h2>
              <p className="text-white/80">
                Explora niveles interactivos, resuelve problemas y sigue tu progreso con estadísticas visuales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <Button
                  asChild
                  size="lg"
                  className="col-span-1 md:col-span-3 text-lg py-3 font-bold saim-btn saim-btn-green"
                >
                  <Link href="/dashboard">JUGAR</Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="col-span-1 py-3 font-semibold saim-btn saim-btn-yellow"
                >
                  <Link href="/instructivo">INSTRUCCIONES</Link>
                </Button>

                <Button
                  asChild
                  size="default"
                  variant="outline"
                  className="col-span-1 py-3 font-semibold saim-btn saim-btn-green"
                >
                  <Link href="/progreso">PROGRESO</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <div className="w-14 h-14 opacity-90 rounded-full overflow-hidden shadow-md">
                <Image src="/orange-tropical-flower.jpg" alt="Flor decorativa" width={56} height={56} className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto w-full px-6 py-6 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} SAIM — Proyecto educativo
      </footer>
    </div>
  )
}