import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import AdminDashboardClient, {
  AdminProfile,
} from "./AdminDashboardClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error(
    "❌ Faltan NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY para el dashboard de admin.",
  );
}

const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

export default async function AdminPage() {
  // Verificación de sesión y correo de administrador
  if (!supabaseUrl || !supabaseAnonKey || !adminEmail) {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    redirect("/dashboard");
  }

  let profiles: AdminProfile[] = [];

  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, email, fitness_goal, plan, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo perfiles para admin:", error);
    } else if (data) {
      profiles = data as AdminProfile[];
    }
  }

  return <AdminDashboardClient profiles={profiles} />;
}

