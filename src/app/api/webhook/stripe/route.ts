import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY no está configurado");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL no está configurado");
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY no está configurado. Añádelo a tu .env.local.",
  );
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");

  if (!webhookSecret || !sig) {
    console.error(
      "Webhook Stripe mal configurado: falta STRIPE_WEBHOOK_SECRET o stripe-signature",
    );
    return NextResponse.json(
      { error: "Webhook no configurado correctamente" },
      { status: 400 },
    );
  }

  const body = await request.text();
  console.log("Stripe webhook body length:", body.length);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Error verificando firma de Stripe:", err);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email =
        session.customer_details && session.customer_details.email
          ? session.customer_details.email
          : session.customer_email;

      if (!email) {
        console.warn(
          "checkout.session.completed sin email. No se puede actualizar perfil.",
        );
      } else {
        const normalizedEmail = email.toLowerCase();

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ plan: "pro" })
          .eq("email", normalizedEmail);

        if (error) {
          console.error("Error actualizando plan a pro:", error);
        } else {
          console.log(
            "Perfil actualizado a PRO para el email:",
            normalizedEmail,
          );
        }
      }
    } else {
      console.log("Evento de Stripe ignorado:", event.type);
    }
  } catch (error) {
    console.error("Error manejando webhook de Stripe:", error);
    return NextResponse.json(
      { error: "Error manejando el evento de Stripe" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

console.log(
  "DEBUG - Longitud de la Key:",
  process.env.SUPABASE_SERVICE_ROLE_KEY?.length || "0",
);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY no está configurado");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL no está configurado");
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY no está configurado. Añádelo a tu .env.local.",
  );
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");

  if (!webhookSecret || !sig) {
    return NextResponse.json(
      { error: "Webhook no configurado correctamente" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  const body = await request.text();

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Error verificando firma de Stripe:", err);
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email =
          session.customer_email ||
          (session.customer_details && session.customer_details.email);

        if (!email) {
          console.warn(
            "checkout.session.completed sin email. No se puede actualizar perfil.",
          );
          break;
        }

        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ plan: "pro" })
          .eq("email", email.toLowerCase());

        if (error) {
          console.error("Error actualizando plan a pro:", error);
        }

        break;
      }
      default:
        // Otros eventos se ignoran por ahora
        break;
    }
  } catch (error) {
    console.error("Error manejando webhook de Stripe:", error);
    return NextResponse.json(
      { error: "Error manejando el evento de Stripe" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

