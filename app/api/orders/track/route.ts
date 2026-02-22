import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get("order_id")?.trim();
        const phone = searchParams.get("phone")?.trim();

        if (!orderId && !phone) {
            return NextResponse.json(
                { error: "Please provide an Order ID or phone number." },
                { status: 400 }
            );
        }

        let query = supabase
            .from("orders")
            .select("order_id, customer_name, status, amount, payment_method, address, state, pincode, created_at");

        if (orderId) {
            query = query.eq("order_id", orderId);
        } else {
            query = query.eq("phone", phone).order("created_at", { ascending: false }).limit(3);
        }

        const { data, error } = await query;

        if (error) throw error;

        if (!data || data.length === 0) {
            return NextResponse.json(
                { error: "No order found. Please check your Order ID or phone number." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, orders: data });
    } catch (error: any) {
        console.error("Track Order Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch order" },
            { status: 500 }
        );
    }
}
