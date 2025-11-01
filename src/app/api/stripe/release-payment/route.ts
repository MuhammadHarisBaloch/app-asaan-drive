import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function POST(req: Request) {
  try {
    const { paymentIntentId, amount, currency, destination } = await req.json();

    if (!paymentIntentId || !amount || !currency) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // ⚙️ DEMO MODE ONLY
    console.log(
      `✅ Simulating payment release for paymentIntentId: ${paymentIntentId}\nAmount: ${amount}\nCurrency: ${currency}\nDestination: ${destination}`
    );

    // Uncomment for real use:
    /*
    await stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency,
      destination,
    });
    */

    return NextResponse.json({
      success: true,
      message: "Payment release simulated successfully (demo mode)",
    });
  } catch (error: any) {
    console.error("Release error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
