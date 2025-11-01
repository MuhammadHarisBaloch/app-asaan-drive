import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function POST(req: Request) {
  try {
    const { paymentIntentId } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Missing paymentIntentId" },
        { status: 400 }
      );
    }

    // ⚙️ DEMO MODE ONLY
    console.log(`🔁 Simulating refund for paymentIntentId: ${paymentIntentId}`);

    // Uncomment this for real use:
    // await stripe.refunds.create({ payment_intent: paymentIntentId });

    return NextResponse.json({
      success: true,
      message: "Refund simulated successfully (demo mode)",
    });
  } catch (error: any) {
    console.error("Refund error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
