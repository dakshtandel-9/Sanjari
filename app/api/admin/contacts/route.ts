import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    : null;

export async function GET() {
    if (!supabase) return NextResponse.json({ contacts: [] });
    const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ contacts: data || [] });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { action, data } = body;

    if (action === "delete") {
        if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        const { error } = await supabase.from("contact_messages").delete().eq("id", data.id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    }

    // Submit a new contact message (no supabase check needed — use upsert)
    if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    const { name, email, phone, message } = data;
    if (!name || !email || !message) {
        return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }
    const { error } = await supabase.from("contact_messages").insert([{ name, email, phone, message }]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
