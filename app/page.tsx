"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen jungle-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-green-400/20 blur-3xl rounded-full" />
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-yellow-400/10 blur-2xl rounded-full" />

      {/* Logo y título */}
      <header className="text-center z-10">
        <h1 className="saim-heading text-8xl text-yellow-300 drop-shadow-xl">SAIM</h1>
        <p className="text-white/80 mt-2 text-lg">
          Sistema de Aprendizaje Interactivo de Matemáticas
        </p>
      </header>

      {/* Imagen principal */}
      <div className="mt-10 mb-8 saim-float">
        <Image
          src="/3d-mathematical-cube-with-integral-symbols.jpg"
          alt="Cubo SAIM"
          width={280}
          height={280}
          className="rounded-2xl shadow-xl"
        />
      </div>

      {/* Botones principales */}
      <div className="flex flex-col md:flex-row gap-4 z-10">
        <Button
          asChild
          className="saim-btn saim-btn-green px-10 py-4 text-xl font-bold rounded-2xl"
        >
          <Link href="/login">INICIAR SESIÓN</Link>
        </Button>

        <Button
          asChild
          className="saim-btn saim-btn-yellow px-10 py-4 text-xl font-bold rounded-2xl"
        >
          <Link href="/registro">REGISTRARSE</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="saim-btn saim-btn-green px-10 py-4 text-xl font-bold rounded-2xl"
        >
          <Link href="/about">ACERCA DE</Link>
        </Button>
      </div>

      {/* Pie */}
      <footer className="mt-12 text-center text-white/60 text-sm z-10">
        © {new Date().getFullYear()} SAIM — Proyecto educativo desarrollado en UDLA
      </footer>
    </div>
  )
}
