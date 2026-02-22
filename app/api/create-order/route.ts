import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
    try {
        const { amount, currency = "INR" } = await request.json();

        if (!amount) {
            return NextResponse.json(
                { error: "Amount is required" },
                { status: 400 }
            );
        }

        const options = {
            amount: (amount * 100).toString(), // amount in the smallest currency unit
            currency,
            receipt: nanoid(),
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error: any) {
        console.error("Razorpay Order Creation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create order" },
            { status: 500 }
        );
    }
}
