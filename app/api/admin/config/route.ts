import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { data: coupons, error: cErr } = await supabase.from("coupons").select("*");
        const { data: settings, error: sErr } = await supabase.from("settings").select("*");

        if (cErr || sErr) throw (cErr || sErr);

        const config: any = {};
        settings?.forEach((s: any) => config[s.key] = s.value);

        return NextResponse.json({ coupons: coupons || [], settings: config });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { type, action, data } = await request.json();

        if (type === "coupon") {
            if (action === "add") {
                const { error } = await supabase.from("coupons").insert([data]);
                if (error) throw error;
            } else if (action === "delete") {
                const { error } = await supabase.from("coupons").delete().eq("id", data.id);
                if (error) throw error;
            }
        } else if (type === "setting") {
            const { error } = await supabase.from("settings").upsert({ key: data.key, value: data.value });
            if (error) throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
