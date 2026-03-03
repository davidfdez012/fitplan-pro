// Despliegue de limpieza verificado el 03-03-2026
// TIMESTAMP DE CONTROL: 04-03-2026 00:30
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Inicialización de constantes
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Verificación de configuración
if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Faltan variables de entorno críticas en el servidor.");
}

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: "2026-02-25.clover",
});

const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceRoleKey || '');

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // LOGS DE DIAGNÓSTICO CRÍTICOS
  console.log("--- DIAGNÓSTICO WEBHOOK ---");
  console.log("¿Existe secreto?:", !!webhookSecret);
  console.log("Inicio del secreto detectado:", webhookSecret?.substring(0, 10));
  console.log("Longitud del secreto:", webhookSecret?.length);
  console.log("---------------------------");

  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 400 });
  }

  console.log("Stripe webhook body length:", body.length);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("❌ Error verificando firma de Stripe:", err.message);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || session.customer_email;

    if (email) {
      const normalizedEmail = email.toLowerCase().trim();

      const { error } = await supabaseAdmin
        .from("profiles")
        .update({ plan: "pro" })
        .eq("email", normalizedEmail);

      if (error) {
        console.error("❌ Error en Supabase:", error);
      } else {
        console.log("✅ Perfil actualizado a PRO para:", normalizedEmail);
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}