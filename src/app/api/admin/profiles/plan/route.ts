import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error(
    "❌ Falta configuración de Supabase para la ruta admin/profiles/plan.",
  );
}

const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseAnonKey || !supabaseAdmin || !adminEmail) {
    return NextResponse.json(
      { error: "Configuración de servidor incompleta" },
      { status: 500 },
    );
  }

  // 1. Await obligatorio en Next.js 15
  const cookieStore = await cookies();

  // 2. Bloque blindado con try/catch para evitar errores de TypeScript en Build
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // Ignoramos el error si se llama desde un Server Component de solo lectura
        }
      },
      remove(name: string, options: any) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          // Usamos set con valor vacío en lugar de delete() para evitar incompatibilidades de tipos
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 403 },
    );
  }

  const { profileId, makePro } = (await request.json()) as {
    profileId?: string;
    makePro?: boolean;
  };

  if (!profileId || typeof makePro !== "boolean") {
    return NextResponse.json(
      { error: "Petición inválida" },
      { status: 400 },
    );
  }

  const newPlan = makePro ? "pro" : "free";

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ plan: newPlan })
    .eq("id", profileId);

  if (error) {
    console.error("Error actualizando plan:", error);
    return NextResponse.json(
      { error: "No se ha podido actualizar el plan" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, plan: newPlan });
}