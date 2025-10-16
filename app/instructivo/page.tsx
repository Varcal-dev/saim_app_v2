import Link from "next/link"

export default function InstructivoPage() {
  return (
    <div className="min-h-screen jungle-bg p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="saim-heading text-5xl text-center">Instructivo</h1>

        <div className="grid gap-4">
          <div className="game-card p-6 rounded-2xl">
            <h2 className="font-bold text-lg text-yellow-300">Objetivo del Juego</h2>
            <p className="text-pretty mt-2">
              SAIM te ayuda a comprender las <strong>integrales definidas</strong> mediante <strong>sumas de Riemann</strong>.
              Selecciona método y subdivisiones, grafica y compara tu aproximación con el valor exacto.
            </p>
          </div>

          <div className="game-card p-6 rounded-2xl">
            <h2 className="font-bold text-lg text-yellow-300">Cómo jugar</h2>
            <ol className="list-decimal ml-5 text-pretty mt-2 space-y-2">
              <li>Selecciona el método (Izquierda, Derecha, Punto medio, Trapecio).</li>
              <li>Define el número de subdivisiones (n) y el intervalo [a,b].</li>
              <li>Observa el tablero con la curva y rectángulos; presiona "Calcular".</li>
              <li>Recibe retroalimentación y gana estrellas según precisión.</li>
            </ol>
          </div>

          <div className="game-card p-6 rounded-2xl">
            <h2 className="font-bold text-lg text-yellow-300">Pistas</h2>
            <p className="text-pretty mt-2">Si te quedas atascado, pide una pista educativa. Edwincillo y Doctor SAIM te guían.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard" className="saim-btn saim-btn-green px-8 py-3 rounded-2xl">Volver al Menú</Link>
        </div>
      </div>
    </div>
  )
}
