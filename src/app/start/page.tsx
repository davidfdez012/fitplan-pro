"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Sparkles,
  Star,
  HelpCircle,
  Dumbbell,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function StartPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-10">
        <motion.section
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative mb-4">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-lime-300 via-amber-300 to-fuchsia-500 opacity-60 blur-xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 ring-2 ring-lime-300/80">
              <Dumbbell className="h-9 w-9 text-lime-300" />
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Alex Rivera · Coach Online
          </h1>
          <p className="mt-2 max-w-xs text-sm text-zinc-400">
            Transforma tu físico con{" "}
            <span className="text-lime-300">ciencia</span>,{" "}
            <span className="text-lime-300">disciplina</span> y una estrategia
            que puedas mantener toda la vida.
          </p>
        </motion.section>

        <motion.section
          className="mt-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-2 rounded-full border border-lime-400/40 bg-zinc-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-300">
            <Star className="h-3 w-3 text-lime-300" />
            <span>+500 alumnos transformados</span>
          </div>
        </motion.section>

        <motion.section
          className="mt-7 space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
        >
          <div className="rounded-3xl border border-lime-400/40 bg-gradient-to-b from-lime-300/10 via-zinc-950 to-black p-5 shadow-[0_0_40px_rgba(190,242,100,0.5)]">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-lime-200">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Plan Elite</span>
              </div>
              <span className="rounded-full bg-zinc-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-lime-300">
                Cupos limitados
              </span>
            </div>
            <p className="text-sm font-semibold text-zinc-50">
              Acompañamiento 1-a-1 para llevar tu físico y rendimiento al
              siguiente nivel.
            </p>
            <p className="mt-2 text-xs text-zinc-400">
              Incluye planificación de entrenamiento, nutrición y ajustes
              estratégicos semanales.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-zinc-200">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-lime-300" />
                Rutinas personalizadas por bloques de objetivos.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-lime-300" />
                Dietas y guías nutricionales adaptadas a tu contexto.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-lime-300" />
                Soporte cercano con feedback de vídeo y ajustes 24/7.
              </li>
            </ul>

            <p className="mt-4 text-xs text-zinc-400">
              Desde{" "}
              <span className="text-base font-semibold text-lime-300">
                89€ / mes
              </span>{" "}
              · Sin permanencia · Plazas reducidas.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.24, duration: 0.3, ease: "easeOut" }}
          >
            <Link
              href="/login"
              className="group relative block"
            >
              <div className="absolute inset-0 rounded-full bg-lime-300 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
              <button
                className="relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-300 via-yellow-300 to-amber-300 px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-black shadow-[0_0_50px_rgba(190,242,100,0.9)] transition-transform duration-150 group-active:scale-[0.97]"
                type="button"
              >
                <span>EMPEZAR MI CAMBIO AHORA</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <p className="mt-2 text-[11px] text-center text-zinc-500">
              Inicia sesión o crea tu cuenta. Te guiaremos paso a paso hasta el
              checkout.
            </p>
          </motion.div>
        </motion.section>

        <motion.section
          className="mt-8 space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.28, duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Testimonios reales</span>
          </div>

          <div className="space-y-3">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 text-left">
              <p className="text-xs text-zinc-300">
                🔥{" "}
                <span className="font-semibold text-zinc-100">
                  &quot;En 5 meses he perdido 9 kg
                </span>{" "}
                manteniendo fuerza y masa muscular. Lo que más valoro es la
                claridad de cada sesión.&quot;
              </p>
              <p className="mt-2 text-[11px] text-zinc-500">— Marta, 32 años</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 text-left">
              <p className="text-xs text-zinc-300">
                🔥{" "}
                <span className="font-semibold text-zinc-100">
                  &quot;Por fin siento que entreno con propósito
                </span>
                . Mis marcas han subido y mi energía en el día a día también.&quot;
              </p>
              <p className="mt-2 text-[11px] text-zinc-500">
                — Diego, 28 años
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mt-8 space-y-3"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.34, duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
            <span>Preguntas rápidas</span>
          </div>

          <div className="space-y-3 text-left text-xs text-zinc-300">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-3">
              <p className="font-semibold text-zinc-100">
                ¿Es para principiantes?
              </p>
              <p className="mt-1 text-zinc-400">
                Sí. Adaptamos volumen, frecuencia y selección de ejercicios a tu
                nivel actual para que avances sin lesionarte.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-3">
              <p className="font-semibold text-zinc-100">
                ¿Cómo accedo al contenido?
              </p>
              <p className="mt-1 text-zinc-400">
                Una vez completes el pago, tendrás acceso al panel con tus
                rutinas, vídeos explicativos y seguimiento directo.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-3">
              <p className="font-semibold text-zinc-100">
                ¿Puedo cancelar cuando quiera?
              </p>
              <p className="mt-1 text-zinc-400">
                Sí. No hay permanencia. Puedes pausar o cancelar tu plan en
                cualquier momento desde tu panel.
              </p>
            </div>
          </div>
        </motion.section>

        <footer className="mt-8 text-center text-[10px] text-zinc-600">
          <p>Fit Plan Pro · Asesoría Online</p>
          <p className="mt-1">Resultados reales, sin atajos.</p>
        </footer>
      </main>
    </div>
  );
}

