import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const priceIdPro = process.env.STRIPE_PRICE_ID_PRO;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY no está configurado");
}

if (!priceIdPro) {
  throw new Error("STRIPE_PRICE_ID_PRO no está configurado");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido para crear la sesión de pago" },
        { status: 400 },
      );
    }

    const origin = request.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: priceIdPro,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?status=success`,
      cancel_url: `${origin}/dashboard?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creando sesión de checkout:", error);
    return NextResponse.json(
      { error: "No se ha podido crear la sesión de pago" },
      { status: 500 },
    );
  }
}

