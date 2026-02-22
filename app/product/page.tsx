"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);

    const product = {
        name: "Sanajri Premium Essence",
        tagline: "The Zenith of Luxury Fragrance",
        price: 349,
        description: "Experience the epitome of elegance with Sanajri Premium Essence. Crafted with the rarest botanical extracts and distilled through time-honored traditions, this fragrance is designed for those who command presence and exude sophistication.",
        notes: ["Agarwood (Oud)", "Damask Rose", "Saffron", "Leather Accord"],
        features: ["Long-lasting 24h+ wear", "Artisanal glass bottle", "Cruelty-free & Vegan"],
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">

            <main className="max-w-7xl mx-auto px-4 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Image Gallery Section */}
                <div className="space-y-6">
                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl">
                        <Image
                            src="/product-hero.png"
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-purple-500/50 transition-colors">
                                <Image
                                    src="/product-hero.png"
                                    alt={`Preview ${i}`}
                                    width={150}
                                    height={150}
                                    className="object-cover opacity-50 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col space-y-8 lg:sticky lg:top-32">
                    <div>
                        <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Premium Collection</span>
                        <h1 className="text-5xl md:text-6xl font-bold mt-2 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-gray-400 text-xl mt-4 italic">
                            "{product.tagline}"
                        </p>
                    </div>

                    <div className="flex items-baseline space-x-4">
                        <span className="text-4xl font-bold">₹{product.price}</span>
                        <span className="text-gray-500 line-through text-lg decoration-purple-500/50">₹1,299</span>
                        <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded">73% OFF</span>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg max-w-xl">
                        {product.description}
                    </p>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Fragrance Notes</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.notes.map((note) => (
                                <span key={note} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                                    {note}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 space-y-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center hover:text-purple-400 transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center hover:text-purple-400 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">Only 12 bottles remaining in stock.</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/checkout"
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-5 rounded-3xl shadow-lg shadow-purple-500/20 transition-all text-center text-lg"
                            >
                                Buy Now
                            </Link>
                            <button className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-5 rounded-3xl transition-all text-lg">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-white/5">
                        {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-3 text-sm text-gray-400">
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Placeholder */}
            <footer className="mt-24 py-12 border-t border-white/5 text-center text-gray-600 text-xs">
                © 2026 SANAJRI LUXURY. ALL RIGHTS RESERVED.
            </footer>
        </div>
    );
}
