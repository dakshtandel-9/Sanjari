import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { data, error } = await supabase
            .from("hero_slides")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) throw error;

        return NextResponse.json({ slides: data || [] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const { action, data } = await request.json();

        if (action === "add") {
            const { error } = await supabase.from("hero_slides").insert([{
                image_url: data.image_url,
                mobile_image_url: data.mobile_image_url || null,
                title: data.title || "",
                subtitle: data.subtitle || "",
                sort_order: data.sort_order || 0,
                is_active: true,
            }]);
            if (error) throw error;
        } else if (action === "delete") {
            // Also delete the file from storage
            const { data: slide } = await supabase
                .from("hero_slides")
                .select("image_url")
                .eq("id", data.id)
                .single();

            if (slide?.image_url) {
                const path = slide.image_url.split("/hero-slides/")[1];
                if (path) {
                    await supabase.storage.from("hero-slides").remove([path]);
                }
            }

            const { error } = await supabase.from("hero_slides").delete().eq("id", data.id);
            if (error) throw error;
        } else if (action === "reorder") {
            // data.slides is an array of { id, sort_order }
            for (const s of data.slides) {
                await supabase.from("hero_slides").update({ sort_order: s.sort_order }).eq("id", s.id);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
