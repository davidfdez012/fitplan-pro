"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === "login";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();

      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
        } else {
          router.push("/dashboard");
        }
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("Ha ocurrido un error inesperado. Vuelve a intentarlo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-page text-foreground">
      <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid w-full gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <section className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              ACCESO FIT PLAN PRO
            </p>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Activa tu espacio de{" "}
                <span className="text-accent">entrenamiento online.</span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Gestiona tus planes, registra tus entrenamientos y habla con tu
                coach desde la misma app. Inicia sesión si ya eres alumno o crea
                tu cuenta para empezar con el plan Starter.
              </p>
            </div>

            <ul className="grid gap-3 text-xs text-muted-foreground sm:text-[13px]">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                Acceso a tu calendario de entrenamiento y nutrición.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                Registro de cargas, tiempos de descanso y sensaciones.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                Comunicación directa con tu entrenador desde el móvil.
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-black/60 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.9)] sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {isLogin ? "Iniciar sesión" : "Crear cuenta"}
                </p>
                <h2 className="text-lg font-semibold text-white">
                  {isLogin
                    ? "Accede a tu cuenta"
                    : "Da el primer paso con Fit Plan Pro"}
                </h2>
              </div>
              <div className="flex gap-1 rounded-full bg-white/5 p-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`rounded-full px-3 py-1 ${
                    isLogin ? "bg-accent text-black" : "text-muted-foreground"
                  }`}
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`rounded-full px-3 py-1 ${
                    !isLogin ? "bg-accent text-black" : "text-muted-foreground"
                  }`}
                >
                  Crear cuenta
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-sm">
                <label htmlFor="email" className="text-xs text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="tuemail@correo.com"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label
                  htmlFor="password"
                  className="text-xs text-muted-foreground"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/60 px-3 py-2 text-sm text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <p>
                  {isLogin
                    ? "¿Aún no tienes cuenta? Crea una gratis."
                    : "¿Ya tienes cuenta? Inicia sesión aquí."}
                </p>
                <button
                  type="button"
                  onClick={() => setMode(isLogin ? "signup" : "login")}
                  className="font-semibold text-accent hover:underline"
                >
                  {isLogin ? "Crear cuenta" : "Iniciar sesión"}
                </button>
              </div>

              {error && (
                <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 w-full justify-center"
              >
                {loading
                  ? "Procesando..."
                  : isLogin
                  ? "Iniciar sesión"
                  : "Crear cuenta"}
              </Button>
            </form>

            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              Al continuar aceptas nuestras condiciones de uso y políticas de
              privacidad. Podrás cambiar o cancelar tu plan en cualquier
              momento.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

