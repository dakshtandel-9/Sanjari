"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Check if the page has already loaded (for SSR/Hydration)
        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading);
            // Fallback: maximum 3 seconds
            const timeout = setTimeout(finishLoading, 3000);
            return () => {
                window.removeEventListener("load", finishLoading);
                clearTimeout(timeout);
            };
        }
    }, []);

    const finishLoading = () => {
        setFadeOut(true);
        setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
        }, 600); // Match this with CSS transition duration
    };

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-600 ease-in-out ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <div className={`transition-all duration-700 ease-out transform ${fadeOut ? "scale-110 opacity-0" : "scale-100 opacity-100"
                    }`}>
                    <Image
                        src="/SANJARI.png"
                        alt="Sanjari Herbal Logo"
                        width={180}
                        height={180}
                        className="animate-pulse-slow"
                        priority
                    />
                </div>

                {/* Loading Spinner / Line */}
                <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#1a5c2a] transition-all duration-[2000ms] ease-out ${fadeOut ? "w-full" : "w-1/3 animate-loading-bar"
                        }`}
                    />
                </div>

                <p className="mt-4 text-[#1a5c2a] font-semibold tracking-widest text-xs uppercase animate-pulse">
                    Purely Ayurvedic
                </p>
            </div>

            <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; transform: translateX(0%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
        body {
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default Preloader;
