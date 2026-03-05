"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export type AdminProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  fitness_goal: string | null;
  plan: string | null;
  created_at: string | null;
};

export type AdminRoutine = {
  id: string;
  title: string | null;
  content: string | null;
};

const PRO_PRICE_EUR = 59;

export default function AdminDashboardClient({
  profiles,
  routine,
}: {
  profiles: AdminProfile[];
  routine: AdminRoutine | null;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [routineTitle, setRoutineTitle] = useState(routine?.title || "");
  const [routineContent, setRoutineContent] = useState(routine?.content || "");
  const [savingRoutine, setSavingRoutine] = useState(false);

  const totalUsers = profiles.length;
  const totalPro = profiles.filter(
    (p) => (p.plan || "").toLowerCase() === "pro",
  ).length;
  const conversionRate =
    totalUsers > 0 ? Math.round((totalPro / totalUsers) * 100) : 0;
  const estimatedMonthlyRevenue = totalPro * PRO_PRICE_EUR;

  const filteredProfiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter((p) => {
      const name = (p.full_name || "").toLowerCase();
      const email = (p.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [profiles, query]);

  const formatDate = (value: string | null) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const handleTogglePlan = async (profile: AdminProfile) => {
    const isProRow = (profile.plan || "").toLowerCase() === "pro";
    const makePro = !isProRow;

    try {
      setUpdatingId(profile.id);
      const response = await fetch("/api/admin/profiles/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: profile.id, makePro }),
      });

      if (!response.ok) {
        toast.error("No se ha podido actualizar el plan.");
        return;
      }

      toast.success(
        makePro
          ? "Plan actualizado a PRO correctamente."
          : "Plan cambiado a FREE correctamente.",
      );
      router.refresh();
    } catch (error) {
      toast.error("Ha ocurrido un error al actualizar el plan.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveRoutine = async () => {
    if (!routineTitle.trim() || !routineContent.trim()) {
      toast.error("Título y contenido son obligatorios.");
      return;
    }

    try {
      setSavingRoutine(true);
      const response = await fetch("/api/admin/routines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: routineTitle.trim(),
          content: routineContent.trim(),
        }),
      });

      if (!response.ok) {
        toast.error("No se ha podido guardar la rutina.");
        return;
      }

      toast.success("Rutina de la semana guardada correctamente.");
      router.refresh();
    } catch (error) {
      toast.error("Ha ocurrido un error al guardar la rutina.");
    } finally {
      setSavingRoutine(false);
    }
  };

  return (
    <div className="bg-black text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Panel del creador
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-50">
              Dashboard de negocio
            </h1>
            <p className="mt-1 text-xs text-zinc-500">
              Visualiza tus alumnos, ingresos estimados y conversiones en un
              solo lugar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="h-9 rounded-full border-zinc-700 text-[11px] text-zinc-200 hover:bg-zinc-900"
              type="button"
            >
              Exportar CSV
            </Button>
            <Button
              className="h-9 rounded-full bg-gradient-to-r from-lime-300 via-yellow-300 to-amber-300 text-[11px] font-semibold text-black shadow-[0_0_28px_rgba(190,242,100,0.8)] hover:opacity-95"
              type="button"
            >
              Enviar notificación global
            </Button>
          </div>
        </header>

        <section className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Ingresos mensuales estimados
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-50">
                {estimatedMonthlyRevenue.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                {totalPro} alumnos PRO x {PRO_PRICE_EUR}€/mes
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Total alumnos PRO
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-50">
                {totalPro}
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                {totalUsers} alumnos registrados
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">
              <Users className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Tasa de conversión
              </p>
              <p className="mt-2 text-lg font-semibold text-zinc-50">
                {conversionRate}
                <span className="text-sm align-middle">%</span>
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Porcentaje de alumnos PRO vs totales
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-300">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </section>

        <section className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              {filteredProfiles.length} alumno
              {filteredProfiles.length === 1 ? "" : "s"} coinciden con tu
              búsqueda
            </span>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar por nombre o email"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-full border border-zinc-800 bg-zinc-950 px-8 py-2 text-xs text-zinc-100 outline-none ring-0 transition focus:border-lime-300 focus:ring-1 focus:ring-lime-300"
            />
          </div>
        </section>

        <section className="mt-2 rounded-3xl border border-zinc-900 bg-zinc-950/70 p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  <th className="py-2 pr-4">Alumno</th>
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4">Objetivo</th>
                  <th className="py-2 pr-4">Registro</th>
                  <th className="py-2 pr-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((profile) => {
                  const isProRow =
                    (profile.plan || "").toLowerCase() === "pro";
                  const planLabelRow = isProRow
                    ? "PRO"
                    : (profile.plan || "FREE").toUpperCase();
                  const badgeClasses = isProRow
                    ? "bg-lime-400/15 text-lime-300 border border-lime-400/50"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-700";

                  return (
                    <tr
                      key={profile.id}
                      className="border-b border-zinc-900/80 last:border-b-0"
                    >
                      <td className="py-2 pr-4 align-top">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-zinc-100">
                            {profile.full_name || "Sin nombre"}
                          </span>
                          <span className="text-[11px] text-zinc-500">
                            {profile.email || "Sin email"}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${badgeClasses}`}
                        >
                          {planLabelRow}
                        </span>
                      </td>
                      <td className="py-2 pr-4 align-top">
                        <span className="text-[11px] text-zinc-400">
                          {profile.fitness_goal || "Sin objetivo definido"}
                        </span>
                      </td>
                      <td className="py-2 pr-4 align-top">
                        <span className="text-[11px] text-zinc-500">
                          {formatDate(profile.created_at)}
                        </span>
                      </td>
                      <td className="py-2 pr-0 align-top">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-7 rounded-full px-3 text-[10px]"
                          disabled={updatingId === profile.id}
                          onClick={() => handleTogglePlan(profile)}
                        >
                          {updatingId === profile.id
                            ? "Actualizando..."
                            : isProRow
                            ? "Quitar PRO"
                            : "Hacer PRO"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}

                {filteredProfiles.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-6 text-center text-[11px] text-zinc-500"
                    >
                      No se han encontrado alumnos con ese criterio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-900 bg-zinc-950/70 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Rutina de la semana
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Define el foco principal para tus alumnos PRO.
              </p>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Título
              </label>
              <input
                type="text"
                value={routineTitle}
                onChange={(event) => setRoutineTitle(event.target.value)}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 outline-none ring-0 transition focus:border-lime-300 focus:ring-1 focus:ring-lime-300"
                placeholder="Ej. Torso fuerza · Semana 3"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                Descripción / Indicaciones
              </label>
              <textarea
                value={routineContent}
                onChange={(event) => setRoutineContent(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 outline-none ring-0 transition focus:border-lime-300 focus:ring-1 focus:ring-lime-300"
                placeholder="Resumen de la estructura semanal, foco de intensidad, recomendaciones clave..."
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                className="h-8 rounded-full px-4 text-[11px]"
                disabled={savingRoutine}
                onClick={handleSaveRoutine}
              >
                {savingRoutine ? "Guardando..." : "Guardar rutina"}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

