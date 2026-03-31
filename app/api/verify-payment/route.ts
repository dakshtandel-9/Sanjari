import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

/* ─────────────────────────────────────────────────────────────
   This route handles TWO different callers:

   1. CLIENT-SIDE (checkout page)
      POST body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
      → Verifies using RAZORPAY_KEY_SECRET

   2. RAZORPAY WEBHOOK (server-to-server)
      Headers:  x-razorpay-signature present
      Body:     Raw JSON event from Razorpay
      → Verifies using RAZORPAY_WEBHOOK_SECRET
      → Marks order as paid in Supabase automatically
───────────────────────────────────────────────────────────── */

export async function POST(request: Request) {
    const webhookSignature = request.headers.get("x-razorpay-signature");

    // ── PATH A: Razorpay Webhook (server-to-server) ──────────────────────────
    if (webhookSignature) {
        try {
            const rawBody = await request.text();

            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
                .update(rawBody)
                .digest("hex");

            if (expectedSignature !== webhookSignature) {
                console.error("Webhook: Invalid signature");
                return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
            }

            const event = JSON.parse(rawBody);
            const eventType = event.event;

            console.log("Razorpay Webhook received:", eventType);

            // Handle payment.captured or order.paid — update order status in DB
            if (eventType === "payment.captured" || eventType === "order.paid") {
                const payment = event.payload?.payment?.entity;
                const razorpayOrderId = payment?.order_id;
                const razorpayPaymentId = payment?.id;

                if (razorpayOrderId && supabase) {
                    // Update the order to mark as paid
                    const { error } = await supabase
                        .from("orders")
                        .update({
                            status: "accepted",
                            payment_status: "paid",
                            razorpay_payment_id: razorpayPaymentId,
                        })
                        .eq("razorpay_order_id", razorpayOrderId);

                    if (error) {
                        console.error("Webhook: Failed to update order:", error.message);
                    } else {
                        console.log("Webhook: Order marked paid for:", razorpayOrderId);
                    }
                }
            }

            // Handle payment.failed — mark order as failed
            if (eventType === "payment.failed") {
                const payment = event.payload?.payment?.entity;
                const razorpayOrderId = payment?.order_id;

                if (razorpayOrderId && supabase) {
                    await supabase
                        .from("orders")
                        .update({ status: "canceled", payment_status: "failed" })
                        .eq("razorpay_order_id", razorpayOrderId);

                    console.log("Webhook: Order marked failed for:", razorpayOrderId);
                }
            }

            // Always return 200 to Razorpay so it stops retrying
            return NextResponse.json({ received: true });

        } catch (error: any) {
            console.error("Webhook Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }

    // ── PATH B: Client-side checkout verification ─────────────────────────────
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            await request.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            return NextResponse.json({ message: "Payment verified successfully", success: true });
        } else {
            return NextResponse.json(
                { message: "Invalid signature", success: false },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to verify payment" },
            { status: 500 }
        );
    }
}
