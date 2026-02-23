"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="nf__page">
            {/* Background blobs */}
            <div className="nf__blob nf__blob--1" aria-hidden="true" />
            <div className="nf__blob nf__blob--2" aria-hidden="true" />
            <div className="nf__blob nf__blob--3" aria-hidden="true" />

            <div className={`nf__wrap${visible ? " nf__wrap--visible" : ""}`}>

                {/* Logo */}
                <Link href="/" aria-label="Sanjari Home" className="nf__logo-link">
                    <Image src="/SANJARI.png" alt="Sanjari" width={110} height={34} priority />
                </Link>

                {/* 404 Display */}
                <div className="nf__number-wrap" aria-hidden="true">
                    <span className="nf__four nf__four--left">4</span>
                    <div className="nf__leaf-wrap">
                        <span className="nf__leaf">🌿</span>
                        <div className="nf__leaf-ring" />
                    </div>
                    <span className="nf__four nf__four--right">4</span>
                </div>

                {/* Message */}
                <h1 className="nf__title">Page Not Found</h1>
                <p className="nf__subtitle">
                    Looks like this page took a detour. Let&#39;s get you back on the right path.
                </p>

                {/* Primary CTA */}
                <Link href="/" className="nf__btn-primary">
                    ← Back to Home
                </Link>

                {/* Quick links */}
                <div className="nf__links-wrap">
                    <p className="nf__links-label">Or visit one of these pages</p>
                    <div className="nf__links">
                        <Link href="/product" className="nf__link">🌿 Product</Link>
                        <Link href="/checkout" className="nf__link">🛒 Checkout</Link>
                        <Link href="/track-order" className="nf__link">📦 Track Order</Link>
                        <Link href="/faqs" className="nf__link">❓ FAQs</Link>
                    </div>
                </div>

                {/* Contact nudge */}
                <p className="nf__contact">
                    Need help?{" "}
                    <a href="mailto:hello@sanajri.in" className="nf__contact-link">
                        hello@sanajri.in
                    </a>
                </p>
            </div>

            <style>{`
                /* ── Page ───────────────────────────────────── */
                .nf__page {
                    min-height: 100vh;
                    background: #f3faf4;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 24px;
                    position: relative;
                    overflow: hidden;
                }

                /* ── Blobs ──────────────────────────────────── */
                .nf__blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(90px);
                }
                .nf__blob--1 {
                    width: 500px; height: 500px;
                    top: -160px; left: -140px;
                    background: #C8E6C9;
                    opacity: 0.55;
                }
                .nf__blob--2 {
                    width: 380px; height: 380px;
                    bottom: -100px; right: -100px;
                    background: #A5D6A7;
                    opacity: 0.45;
                }
                .nf__blob--3 {
                    width: 260px; height: 260px;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background: #E8F5E9;
                    opacity: 0.6;
                }

                /* ── Wrap ───────────────────────────────────── */
                .nf__wrap {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    max-width: 520px;
                    width: 100%;
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                .nf__wrap--visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* ── Logo ───────────────────────────────────── */
                .nf__logo-link {
                    display: inline-block;
                    margin-bottom: 48px;
                }

                /* ── 404 Number ─────────────────────────────── */
                .nf__number-wrap {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 28px;
                }
                .nf__four {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(80px, 18vw, 140px);
                    font-weight: 900;
                    color: transparent;
                    -webkit-text-stroke: 3px #2d8a3e;
                    line-height: 1;
                    user-select: none;
                }
                .nf__leaf-wrap {
                    position: relative;
                    width: clamp(70px, 14vw, 110px);
                    height: clamp(70px, 14vw, 110px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .nf__leaf {
                    font-size: clamp(48px, 10vw, 80px);
                    animation: nf-float 3.5s ease-in-out infinite;
                    display: block;
                    position: relative;
                    z-index: 1;
                }
                @keyframes nf-float {
                    0%, 100% { transform: translateY(0) rotate(-5deg); }
                    50%       { transform: translateY(-12px) rotate(5deg); }
                }
                .nf__leaf-ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 2.5px solid #A5D6A7;
                    animation: nf-ring 3.5s ease-in-out infinite;
                }
                @keyframes nf-ring {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50%       { transform: scale(1.12); opacity: 0.25; }
                }

                /* ── Text ───────────────────────────────────── */
                .nf__title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(22px, 4vw, 32px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 12px;
                }
                .nf__subtitle {
                    font-size: 1rem;
                    color: #666;
                    line-height: 1.65;
                    margin: 0 0 32px;
                    max-width: 400px;
                }

                /* ── Primary button ─────────────────────────── */
                .nf__btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 32px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 700;
                    border-radius: 14px;
                    text-decoration: none;
                    box-shadow: 0 6px 20px rgba(45, 138, 62, 0.30);
                    transition: all 0.2s;
                    margin-bottom: 36px;
                }
                .nf__btn-primary:hover {
                    background: linear-gradient(135deg, #1a5c2a, #2d8a3e);
                    box-shadow: 0 8px 28px rgba(45, 138, 62, 0.42);
                    transform: translateY(-2px);
                }

                /* ── Quick links ────────────────────────────── */
                .nf__links-wrap { width: 100%; margin-bottom: 32px; }
                .nf__links-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #aaa;
                    margin: 0 0 14px;
                }
                .nf__links {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                }
                .nf__link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    background: #fff;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #2d8a3e;
                    text-decoration: none;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(26, 92, 42, 0.06);
                }
                .nf__link:hover {
                    background: #E8F5E9;
                    border-color: #2d8a3e;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(26, 92, 42, 0.12);
                }

                /* ── Contact ────────────────────────────────── */
                .nf__contact {
                    font-size: 0.85rem;
                    color: #aaa;
                    margin: 0;
                }
                .nf__contact-link {
                    color: #2d8a3e;
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .nf__contact-link:hover { color: #1a5c2a; }
            `}</style>
        </div>
    );
}
