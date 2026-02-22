"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const [isVisible, setIsVisible] = useState(false);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 blur-2xl opacity-40 animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                            className={`transition-all duration-700 delay-500 ${isVisible ? "stroke-dashoffset-0" : "stroke-dashoffset-100"}`}
                            style={{
                                strokeDasharray: 50,
                                strokeDashoffset: isVisible ? 0 : 50,
                            }}
                        />
                    </svg>
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">
                Order Confirmed!
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Thank you for choosing <span className="text-white font-semibold">Sanajri</span>.
                Your premium essence is being prepared for delivery.
            </p>

            <div className="w-full space-y-4 pt-4">
                {orderId && (
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex justify-between items-center text-sm">
                        <span className="text-gray-400 italic">Order ID</span>
                        <span className="text-purple-300 font-mono font-bold text-base tracking-wider">#{orderId}</span>
                    </div>
                )}

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-gray-400 italic">Status</span>
                    <span className="text-green-400 font-medium px-3 py-1 bg-green-400/10 rounded-full">Processed</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-sm">
                    <span className="text-gray-400 italic">Delivery</span>
                    <span className="text-white font-medium">3-5 Business Days</span>
                </div>
            </div>

            <div className="mt-12 w-full flex flex-col gap-4">
                <Link
                    href="/"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-500/20 transition-all text-center group"
                >
                    Continue Shopping
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>

            <div className="mt-8 text-xs text-gray-600">
                A confirmation email has been sent to your inbox.
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 font-sans overflow-hidden relative">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] rounded-full" />

            <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <Suspense fallback={<div className="text-center italic text-gray-500">Loading order details...</div>}>
                    <SuccessContent />
                </Suspense>
            </div>
        </div>
    );
}
