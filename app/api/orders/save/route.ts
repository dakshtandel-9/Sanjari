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
                    payment_method: orderData.paymentMethod,
                    status: initialStatus,
                    razorpay_order_id: orderData.razorpay_order_id || null,
                    razorpay_payment_id: orderData.razorpay_payment_id || null,
                },
            ])
            .select();

        if (error) {
            console.warn("Primary insert failed, retrying fallback...");

            const { data: fallbackData, error: fallbackError } = await supabase
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

            if (fallbackError) throw fallbackError;
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
