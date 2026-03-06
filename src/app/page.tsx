import Link from "next/link";
import { coachConfig } from "@/config/coach";

export default function Home() {
  return (
    <div className="bg-page text-foreground">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-5 sm:px-6 lg:px-10 lg:pb-16 lg:pt-8">
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-10 border-b border-white/5 bg-background/80 px-4 py-4 backdrop-blur-md sm:mx-0 sm:rounded-3xl sm:border sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-accent text-xs text-black shadow-[0_0_24px_rgba(173,250,29,0.6)]">
            FP
          </span>
          <span className="text-base">Fit Plan Pro</span>
        </Link>

        <div className="hidden items-center gap-8 text-xs font-medium text-muted-foreground md:flex">
          <a href="#programas" className="hover:text-white">
            Programas
          </a>
          <a href="#precios" className="hover:text-white">
            Precios
          </a>
          <a href="#testimonios" className="hover:text-white">
            Testimonios
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-xs font-medium text-muted-foreground hover:text-white sm:inline"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-black shadow-[0_0_24px_rgba(173,250,29,0.6)] hover:bg-accent/90"
          >
            Empieza gratis
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mb-14 mt-4 grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-center">
      <div className="space-y-7">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          ASESORÍA ONLINE DE ALTO RENDIMIENTO
        </p>

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tu mejor versión{" "}
            <span className="text-accent">empieza aquí.</span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Fit Plan Pro es la plataforma de asesoría online diseñada para
            personas que entrenan en serio. Planes de entrenamiento y nutrición
            a medida, seguimiento cercano y una app pensada para tu día a día en
            el gimnasio.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_32px_rgba(173,250,29,0.5)] hover:bg-accent/90"
          >
            Empieza tu cambio
          </Link>
          <p className="text-xs text-muted-foreground sm:text-[13px]">
            Resultados medibles desde las primeras 4 semanas. Sin permanencia.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-3xl border border-white/5 bg-black/30 p-4 text-xs text-muted-foreground sm:text-[13px]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Clientes activos
            </p>
            <p className="mt-1 text-lg font-semibold text-white">+320</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Promedio de adherencia
            </p>
            <p className="mt-1 text-lg font-semibold text-white">92%</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Países
            </p>
            <p className="mt-1 text-lg font-semibold text-white">11</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Sesión de hoy</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            • Lista para entrenar
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-white">
            Torso fuerza — Semana 5
          </p>
          <p className="text-xs text-muted-foreground">
            Enfocada en progresión de press banca y dominadas lastradas.
          </p>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between rounded-2xl bg-muted px-3 py-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em]">
                Serie clave
              </p>
              <p className="mt-0.5 text-[13px] text-white">
                Press banca — 4 x 6 @ 80%
              </p>
            </div>
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-accent">
              +2.5 kg
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl bg-black/40 px-3 py-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em]">
                Nutrición de hoy
              </p>
              <p className="mt-0.5 text-[13px] text-white">
                2.450 kcal · 160 g proteína
              </p>
            </div>
            <p className="text-[11px] text-accent">Objetivo recomposición</p>
          </div>
        </div>

        <div className="mt-1 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
          <div className="rounded-2xl bg-black/30 p-2">
            <p>Zancadas búlgaras</p>
            <p className="mt-1 text-xs text-accent">3 x 10</p>
          </div>
          <div className="rounded-2xl bg-black/30 p-2">
            <p>Dominadas</p>
            <p className="mt-1 text-xs text-accent">4 x 6</p>
          </div>
          <div className="rounded-2xl bg-black/30 p-2">
            <p>Core antirotación</p>
            <p className="mt-1 text-xs text-accent">3 x 12</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 space-y-3 text-center md:text-left">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function Features() {
  return (
    <section id="programas" className="mb-16">
      <SectionTitle
        eyebrow="CÓMO TRABAJAMOS"
        title="Programas diseñados para tu vida real."
        subtitle="No son plantillas genéricas. Analizamos tu contexto, experiencia, horarios y material disponible para construir un plan que puedas mantener en el tiempo."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-white/5 bg-black/40 p-5">
          <p className="mb-2 text-xs font-semibold text-accent">
            Planes a medida
          </p>
          <h3 className="mb-2 text-sm font-semibold text-white">
            Entrenamiento y nutrición hechos para ti
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Diseñamos bloques de entrenamiento por objetivos y fases, con
            progresiones claras y ajustes según tu feedback y evolución real.
          </p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-black/40 p-5">
          <p className="mb-2 text-xs font-semibold text-accent">
            Seguimiento 24/7
          </p>
          <h3 className="mb-2 text-sm font-semibold text-white">
            Siempre acompañado, incluso fuera del gym
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Revisamos tus registros, vídeos de técnica y sensaciones para
            reajustar carga, volumen y distribución antes de que aparezcan
            estancamientos.
          </p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-black/40 p-5">
          <p className="mb-2 text-xs font-semibold text-accent">
            App exclusiva
          </p>
          <h3 className="mb-2 text-sm font-semibold text-white">
            Todo tu plan en un solo lugar
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Visualiza tu semana, registra cargas y tiempos de descanso, marca
            cumplimientos y revisa tu progreso con métricas claras.
          </p>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precios" className="mb-16">
      <SectionTitle
        eyebrow="PLANES Y PRECIOS"
        title="Elige el nivel de acompañamiento que necesitas."
        subtitle="Empieza gratis con lo básico y haz el upgrade cuando quieras a un acompañamiento profesional completo."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col rounded-3xl border border-white/10 bg-black/40 p-5 text-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Plan Starter
          </p>
          <p className="mb-2 text-lg font-semibold text-white">Gratis</p>
          <p className="mb-4 text-xs text-muted-foreground">
            Ideal para comenzar a estructurar tu entrenamiento sin compromiso.
          </p>
          <ul className="mb-4 space-y-2 text-xs text-muted-foreground">
            <li>• Acceso a plantillas base de entrenamiento.</li>
            <li>• Recomendaciones generales de nutrición.</li>
            <li>• Registro básico de progreso en la app.</li>
          </ul>
          <Link
            href="/login"
            className="mt-auto inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
          >
            Empezar con Starter
          </Link>
        </div>

        <div className="relative flex flex-col rounded-3xl border border-accent bg-gradient-to-b from-accent-soft to-black/80 p-5 text-sm shadow-[0_0_40px_rgba(173,250,29,0.35)]">
          <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
            MÁS ELEGIDO
          </span>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Plan Pro
          </p>
          <p className="mb-2 text-lg font-semibold text-white">
            Desde {coachConfig.monthlyPrice}€ / mes
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            Acompañamiento completo con planes 100% personalizados y ajustes
            continuos.
          </p>
          <ul className="mb-4 space-y-2 text-xs text-muted-foreground">
            <li>• Plan de entrenamiento y nutrición adaptado a tu contexto.</li>
            <li>• Revisión semanal de progreso y ajustes estratégicos.</li>
            <li>• Envío de vídeos de técnica y feedback detallado.</li>
            <li>• Soporte por chat dentro de la app (respuesta en 24 h).</li>
          </ul>
          <Link
            href="/login"
            className="mt-auto inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black hover:bg-accent/90"
          >
            Empezar con Plan Pro
          </Link>
        </div>

        <div className="flex flex-col rounded-3xl border border-white/10 bg-black/40 p-5 text-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Plan Elite
          </p>
          <p className="mb-2 text-lg font-semibold text-white">
            Bajo candidatura
          </p>
          <p className="mb-4 text-xs text-muted-foreground">
            Para atletas y perfiles que buscan un trabajo 1-a-1 al detalle.
          </p>
          <ul className="mb-4 space-y-2 text-xs text-muted-foreground">
            <li>• Planificación avanzada por bloques y picos de rendimiento.</li>
            <li>• Revisión continua de vídeos y ajustes casi en tiempo real.</li>
            <li>• Llamadas de seguimiento individuales periódicas.</li>
            <li>• Coordinación con otros profesionales (fisioterapia, etc.).</li>
          </ul>
          <Link
            href="/login"
            className="mt-auto inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
          >
            Solicitar plaza Elite
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonios" className="mb-14">
      <SectionTitle
        eyebrow="RESULTADOS REALES"
        title="Personas que ya entrenan con Fit Plan Pro."
        subtitle="Historias de alumnos que decidieron tomarse en serio su rendimiento y su físico, sin sacrificar su vida fuera del gimnasio."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <TestimonialCard
          initials="JM"
          name="Javier, 32"
          label="Emprendedor · Hipertrofia"
          quote="Venía de años entrenando sin rumbo. En 6 meses con Plan Pro he ganado 4 kg de masa magra manteniendo mi porcentaje de grasa."
        />
        <TestimonialCard
          initials="LA"
          name="Laura, 28"
          label="Sanitaria · Recomp"
          quote="Necesitaba un plan que se adaptara a mis turnos. Ahora entreno 4 días, descanso mejor y he mejorado todas mis marcas."
        />
        <TestimonialCard
          initials="MR"
          name="Miguel, 41"
          label="Padre de 2 · Salud"
          quote="Lo mejor no son solo los resultados físicos, es que por fin siento que tengo un sistema sostenible para el resto de mi vida."
        />
      </div>
    </section>
  );
}

function TestimonialCard({
  initials,
  name,
  label,
  quote,
}: {
  initials: string;
  name: string;
  label: string;
  quote: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/5 bg-black/40 p-5 text-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-xs font-semibold text-white ring-2 ring-accent/70">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-[11px] text-muted-foreground">{label}</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        “{quote}”
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-4 border-t border-white/10 pt-6 text-xs text-muted-foreground">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Fit Plan Pro. Todos los derechos reservados.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#legal" className="hover:text-white">
            Aviso legal
          </a>
          <a href="#privacidad" className="hover:text-white">
            Política de privacidad
          </a>
          <a href="#cookies" className="hover:text-white">
            Cookies
          </a>
          <a href="https://instagram.com" className="hover:text-white">
            Instagram
          </a>
          <a href="https://www.youtube.com" className="hover:text-white">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

