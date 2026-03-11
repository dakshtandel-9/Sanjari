import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const orderData = await request.json();

        // Generate a random 6-digit number Order ID
        const customOrderId = Math.floor(100000 + Math.random() * 900000).toString();

        // Map Razorpay success to 'accepted' to match dashboard options
        const initialStatus = orderData.paymentMethod === "cod" ? "pending" : "accepted";

        // ── Attempt 1: Full insert with quantity + order_id ──────────────
        const { data, error } = await supabase
            .from("orders")
            .insert([
                {
                    order_id: customOrderId,
                    customer_name: orderData.fullName,
                    email: orderData.email,
                    phone: orderData.phone,
                    address: orderData.address,
                    pincode: orderData.pincode,
                    state: orderData.state,
                    amount: orderData.amount,
                    quantity: orderData.quantity || 1,
                    payment_method: orderData.paymentMethod,
                    status: initialStatus,
                    razorpay_order_id: orderData.razorpay_order_id || null,
                    razorpay_payment_id: orderData.razorpay_payment_id || null,
                },
            ])
            .select();

        if (!error && data && data.length > 0) {
            console.log("Order saved (full):", data[0].order_id);
            return NextResponse.json({ success: true, data });
        }

        // ── Attempt 2: Fallback without quantity (if column doesn't exist yet) ──
        if (error) {
            console.warn("Primary insert failed:", error.message, "— trying fallback without quantity…");

            const { data: fallbackData, error: fallbackError } = await supabase
                .from("orders")
                .insert([{
                    order_id: customOrderId,
                    customer_name: orderData.fullName,
                    email: orderData.email,
                    phone: orderData.phone,
                    address: orderData.address,
                    pincode: orderData.pincode,
                    state: orderData.state,
                    amount: orderData.amount,
                    payment_method: orderData.paymentMethod,
                    status: initialStatus,
                    razorpay_order_id: orderData.razorpay_order_id || null,
                    razorpay_payment_id: orderData.razorpay_payment_id || null,
                }])
                .select();

            if (fallbackError) {
                // ── Attempt 3: Minimal insert without order_id either ──
                console.warn("Fallback failed:", fallbackError.message, "— trying minimal insert…");
                const { data: minData, error: minError } = await supabase
                    .from("orders")
                    .insert([{
                        customer_name: orderData.fullName,
                        email: orderData.email,
                        phone: orderData.phone,
                        address: orderData.address,
                        pincode: orderData.pincode,
                        state: orderData.state,
                        amount: orderData.amount,
                        payment_method: orderData.paymentMethod,
                        status: initialStatus,
                        razorpay_order_id: orderData.razorpay_order_id || null,
                        razorpay_payment_id: orderData.razorpay_payment_id || null,
                    }])
                    .select();

                if (minError) throw minError;
                console.log("Order saved (minimal):", minData?.[0]?.id);
                return NextResponse.json({ success: true, data: minData });
            }

            console.log("Order saved (fallback):", fallbackData?.[0]?.order_id);
            return NextResponse.json({ success: true, data: fallbackData });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Order Save Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to save order" },
            { status: 500 }
        );
    }
}
