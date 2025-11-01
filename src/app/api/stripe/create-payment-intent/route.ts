import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: Request) {
  try {
    const {
      amount,
      currency = process.env.NEXT_PUBLIC_STRIPE_CURRENCY || "pkr",
      metadata,
    } = await req.json();
    const a = Number(amount);
    if (!a || a <= 0)
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

    const clientAmount = Math.round(a * 100); // minor units
    const paymentIntent = await stripe.paymentIntents.create({
      amount: clientAmount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: metadata || {},
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err: any) {
    console.error("create-payment-intent error:", err);
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
