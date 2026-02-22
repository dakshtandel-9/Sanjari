"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-pink-600/10 blur-[150px] rounded-full translate-y-1/3 -translate-x-1/4" />


      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">New Collection 2026</span>
        </div>

        <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-tight mb-8">
          PURE <br />
          <span className="bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent italic">ESSENCE.</span>
        </h1>

        <p className="max-w-2xl text-xl text-gray-400 leading-relaxed mb-12">
          Redefining olfactory luxury. Discover scents that don't just linger, but define your legacy.
          Crafted for the modern visionary.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/product"
            className="group relative px-12 py-5 bg-white text-black font-bold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Discover Premium Essence</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 z-0 bg-white group-hover:opacity-0" />
          </Link>

          <Link
            href="#"
            className="px-12 py-5 bg-white/5 border border-white/10 backdrop-blur-md font-bold text-lg rounded-2xl hover:bg-white/10 transition-all"
          >
            Our Story
          </Link>
        </div>

        {/* Featured Product Preview */}
        <div className="mt-32 w-full max-w-5xl">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
            <Image
              src="/product-hero.png"
              alt="Sanajri Hero"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12 text-left">
              <h2 className="text-3xl font-bold mb-2">Sanajri Premium Essence</h2>
              <p className="text-gray-400 mb-6">Starting at ₹349. Limited Edition Bottle.</p>
              <Link href="/product" className="text-purple-400 font-bold hover:underline">View Product Details →</Link>
            </div>
          </div>
        </div>
      </main>



      <footer className="py-20 text-center border-t border-white/5 relative z-10">
        <p className="text-gray-600 text-sm tracking-widest uppercase mb-4">Crafted with passion in Paris & Mumbai</p>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent inline-block mb-8">
          SANAJRI
        </div>
        <p className="text-gray-500 text-xs">© 2026 SANAJRI LUXURY. COUTURE FRAGRANCES.</p>
      </footer>
    </div>
  );
}
