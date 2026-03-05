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
    "❌ Falta configuración de Supabase para la ruta admin/routines.",
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

  const cookieStore = cookies();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        cookieStore.delete({ name, ...options });
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

  const { title, content } = (await request.json()) as {
    title?: string;
    content?: string;
  };

  if (!title || !content) {
    return NextResponse.json(
      { error: "Título y contenido son obligatorios" },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("routines")
    .insert({ title, content })
    .select("id, title, content, created_at")
    .single();

  if (error) {
    console.error("Error guardando rutina:", error);
    return NextResponse.json(
      { error: "No se ha podido guardar la rutina" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, routine: data });
}

