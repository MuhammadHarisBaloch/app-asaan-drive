// app/api/stripe/create-payment-intent/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);
    const currency = body.currency || process.env.STRIPE_CURRENCY || "usd";

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const amountInMinor = Math.round(amount * 100); // e.g. Rs -> paise or USD -> cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInMinor,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: body.metadata || {},
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
