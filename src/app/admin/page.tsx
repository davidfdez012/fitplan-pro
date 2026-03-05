import { createClient } from "@supabase/supabase-js";
import AdminDashboardClient, {
  AdminProfile,
} from "./AdminDashboardClient";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    "❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY para el dashboard de admin.",
  );
}

const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

export default async function AdminPage() {
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

