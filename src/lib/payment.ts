export async function releasePayment({
  bookingId,
  amount,
  destinationAccountId,
}: {
  bookingId: string;
  amount: number;
  destinationAccountId?: string;
}) {
  const resp = await fetch("/api/stripe/release-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": process.env.NEXT_PUBLIC_STRIPE_ADMIN_API_KEY || "", // for demo only; better call from server with auth
    },
    body: JSON.stringify({
      paymentIntentId: undefined,
      amount,
      currency: process.env.NEXT_PUBLIC_STRIPE_CURRENCY,
      destination: destinationAccountId,
    }),
  });
  return resp.json();
}

export async function refundPayment({
  paymentIntentId,
  amount,
}: {
  paymentIntentId: string;
  amount?: number;
}) {
  const resp = await fetch("/api/stripe/refund-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": process.env.NEXT_PUBLIC_STRIPE_ADMIN_API_KEY || "",
    },
    body: JSON.stringify({ paymentIntentId, amount }),
  });
  return resp.json();
}
