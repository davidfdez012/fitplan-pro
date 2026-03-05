"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type Profile = {
  id: string;
  full_name: string | null;
  fitness_goal: string | null;
  plan: string;
  email?: string | null;
};

console.log("Clave Pública:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [editingGoal, setEditingGoal] = useState("");
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, fitness_goal, plan, email")
          .eq("id", user.id)
          .single();

        if (profileError) {
          setError("No hemos podido cargar tu perfil. Inténtalo de nuevo.");
        } else {
          const typed = data as Profile;
          setProfile(typed);
          setEditingName(typed.full_name ?? "");
          setEditingGoal(typed.fitness_goal ?? "");
        }
      } catch (e) {
        setError("Ha ocurrido un error al cargar tu panel.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/login");
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    setSavingProfile(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: editingName || null,
          fitness_goal: editingGoal || null,
        })
        .eq("id", profile.id);

      if (updateError) {
        setError("No hemos podido guardar los cambios. Prueba de nuevo.");
      } else {
        setProfile({
          ...profile,
          full_name: editingName || null,
          fitness_goal: editingGoal || null,
        });
      }
    } catch (e) {
      setError("Ha ocurrido un error al actualizar tu perfil.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpgradeToPro = async () => {
    if (!profile?.email) {
      setError(
        "No hemos encontrado tu email de perfil. Contacta con soporte para actualizar el plan.",
      );
      return;
    }

    try {
      setUpgrading(true);
      setError(null);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: profile.email }),
      });

      if (!response.ok) {
        setError("No hemos podido iniciar el pago. Inténtalo más tarde.");
        return;
      }

      const { url } = (await response.json()) as { url: string | null };
      console.log("Stripe Checkout URL:", url);

      if (!url) {
        setError("No hemos recibido la URL de pago. Inténtalo más tarde.");
        return;
      }

      window.location.href = url;
    } catch (e) {
      console.error("ERROR DE REDIRECCIÓN:", e);
      setError("Ha ocurrido un error al redirigirte al pago.");
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-page text-foreground">
        <main className="flex min-h-screen items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">
            Cargando tu espacio de entrenamiento...
          </p>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-page text-foreground">
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-sm text-muted-foreground">
            No hemos encontrado tu perfil. Si el problema persiste, contacta con soporte.
          </p>
          <Button onClick={() => router.replace("/login")}>
            Volver al login
          </Button>
        </main>
      </div>
    );
  }

  const displayName =
    profile.full_name || profile.email || "Atleta Fit Plan Pro";
  const normalizedPlan = (profile.plan || "free").toLowerCase();
  const isPro = normalizedPlan === "pro";
  const planLabel = isPro ? "PRO" : "FREE";

  return (
    <div className="bg-page text-foreground">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-accent text-xs font-semibold text-black shadow-[0_0_24px_rgba(173,250,29,0.6)]">
              FP
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                FIT PLAN PRO
              </p>
              <h1 className="text-lg font-semibold text-white">
                Panel de entrenamiento
              </h1>
            </div>
            {isPro && (
              <span className="rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-lime-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(250,204,21,0.7)]">
                MIEMBRO ELITE
              </span>
            )}
          </div>

          <Button
            variant="outline"
            className="text-xs"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </header>

        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              BIENVENIDO/A
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Hola, <span className="text-accent">{displayName}</span>!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Estás en el plan{" "}
              <span className="font-semibold text-accent">{planLabel}</span>
              {profile.fitness_goal
                ? ` con foco en ${profile.fitness_goal.toLowerCase()}.`
                : ". Define tu objetivo para personalizar aún más tu experiencia."}
            </p>

            <div className="mt-4 grid gap-3 rounded-2xl bg-black/40 p-3 text-xs text-muted-foreground sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.16em]">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Cómo quieres que te llamemos"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-[0.16em]">
                  Objetivo principal
                </label>
                <input
                  type="text"
                  value={editingGoal}
                  onChange={(e) => setEditingGoal(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Perder peso, ganar músculo..."
                />
              </div>
              <div className="sm:col-span-2 flex items-center justify-between pt-1">
                <p className="text-[11px]">
                  Estos datos nos ayudan a adaptar mejor tu experiencia y tus
                  planes.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 px-3 text-[11px]"
                  disabled={savingProfile}
                  onClick={handleSaveProfile}
                >
                  {savingProfile ? "Guardando..." : "Guardar perfil"}
                </Button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="rounded-2xl bg-black/40 p-3">
                <p className="text-[11px] uppercase tracking-[0.16em]">
                  Próxima sesión
                </p>
                <p className="mt-1 text-sm text-white">
                  Torso fuerza · Semana actual
                </p>
                <p className="mt-1 text-[11px] text-accent">
                  Orientada a progreso en básicos.
                </p>
              </div>
              <div className="rounded-2xl bg-black/40 p-3">
                <p className="text-[11px] uppercase tracking-[0.16em]">
                  Adherencia estimada
                </p>
                <p className="mt-1 text-sm text-white">– %</p>
                <p className="mt-1 text-[11px]">
                  Se calculará en cuanto registres tus primeras semanas.
                </p>
              </div>
              <div className="rounded-2xl bg-black/40 p-3">
                <p className="text-[11px] uppercase tracking-[0.16em]">
                  Próximo check-in
                </p>
                <p className="mt-1 text-sm text-white">Próximamente</p>
                <p className="mt-1 text-[11px]">
                  Tu coach te indicará la frecuencia ideal de revisiones.
                </p>
              </div>
            </div>

            {isPro && (
              <div className="mt-5 rounded-3xl border border-yellow-300/40 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-lime-400/10 p-4 text-xs text-muted-foreground">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-yellow-300">
                  Contenido exclusivo PRO
                </p>
                <p className="mt-2 text-sm text-white">
                  Accede a rutinas avanzadas, bloques de fuerza y plantillas de
                  programación de alto rendimiento.
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-black/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Bloque fuerza
                    </p>
                    <p className="mt-1 text-xs text-white">
                      12 semanas de progresión en básicos.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Hipertrofia avanzada
                    </p>
                    <p className="mt-1 text-xs text-white">
                      Torso/pierna con alto foco en volumen efectivo.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/50 p-3">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Rutinas EXPRESS
                    </p>
                    <p className="mt-1 text-xs text-white">
                      Sesiones de 45&apos; para días con poco tiempo.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {error && (
              <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                {error}
              </p>
            )}

            {!isPro && (
              <div className="rounded-3xl border border-accent bg-gradient-to-b from-accent-soft to-black/80 p-4 text-xs text-muted-foreground shadow-[0_0_40px_rgba(173,250,29,0.35)]">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  DESBLOQUEA TU POTENCIAL
                </p>
                <p className="mt-2 text-sm text-white">
                  Desbloquea el máximo potencial. Hazte PRO para ver rutinas
                  exclusivas y dietas personalizadas adaptadas a tu objetivo.
                </p>
                <Button
                  type="button"
                  className="mt-3 w-full justify-center"
                  disabled={upgrading}
                  onClick={handleUpgradeToPro}
                >
                  {upgrading ? "Conectando con Stripe..." : "Mejorar a Plan PRO"}
                </Button>
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-black/50 p-4 text-xs text-muted-foreground">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                SIGUIENTES PASOS
              </p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  Completa tu perfil con tu objetivo principal, disponibilidad
                  semanal y material de entrenamiento.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  Revisa el calendario de sesiones y marca como completado cada
                  entrenamiento.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  Sube vídeos de tus levantamientos clave para recibir feedback
                  técnico.
                </li>
              </ul>
            </div>

            <div className="relative rounded-3xl border border-white/10 bg-black/50 p-4 text-xs text-muted-foreground">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Librería de rutinas
              </p>
              <div
                className={`mt-3 grid gap-3 sm:grid-cols-3 ${
                  isPro ? "" : "pointer-events-none"
                }`}
              >
                <div
                  className={`rounded-2xl bg-black/60 p-3 ${
                    isPro ? "" : "blur-[1px] opacity-70"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.16em]">
                    Push / Pull / Legs
                  </p>
                  <p className="mt-1 text-xs text-white">
                    Dividida clásica optimizada para fuerza e hipertrofia.
                  </p>
                </div>
                <div
                  className={`rounded-2xl bg-black/60 p-3 ${
                    isPro ? "" : "blur-[1px] opacity-70"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.16em]">
                    Torso / Pierna 4D
                  </p>
                  <p className="mt-1 text-xs text-white">
                    Rutina intermedia con foco en básicos pesados.
                  </p>
                </div>
                <div
                  className={`rounded-2xl bg-black/60 p-3 ${
                    isPro ? "" : "blur-[1px] opacity-70"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.16em]">
                    Fullbody eficiente
                  </p>
                  <p className="mt-1 text-xs text-white">
                    3 sesiones a la semana para agendas apretadas.
                  </p>
                </div>
              </div>

              {!isPro && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-black/65">
                  <div className="rounded-full border border-accent/60 bg-black/80 px-4 py-2 text-[11px] font-semibold text-accent shadow-[0_0_24px_rgba(173,250,29,0.6)]">
                    Contenido bloqueado — hazte PRO para desbloquearlo
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

