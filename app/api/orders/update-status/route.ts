import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("orders")
            .update({ status })
            .eq("id", orderId)
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error("Status Update Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update status" },
            { status: 500 }
        );
    }
}
