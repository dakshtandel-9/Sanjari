"use client";

import Link from "next/link";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* ─── Inner component (needs useSearchParams inside Suspense) ────────────── */
function SuccessContent() {
    const [visible, setVisible] = useState(false);
    const [checkDrawn, setCheckDrawn] = useState(false);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    useEffect(() => {
        // stagger the entrance animations
        const t1 = setTimeout(() => setVisible(true), 50);
        const t2 = setTimeout(() => setCheckDrawn(true), 400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <div className={`succ__inner ${visible ? "succ__inner--visible" : ""}`}>

            {/* ── Checkmark circle ── */}
            <div className="succ__check-wrap">
                {/* Animated ring */}
                <div className="succ__ring" />
                {/* Green orb */}
                <div className="succ__orb">
                    <svg
                        viewBox="0 0 52 52"
                        className="succ__svg"
                        aria-hidden="true"
                    >
                        <circle
                            className="succ__svg-circle"
                            cx="26" cy="26" r="25"
                            fill="none"
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth="1"
                        />
                        <path
                            className={`succ__svg-check ${checkDrawn ? "succ__svg-check--drawn" : ""}`}
                            fill="none"
                            stroke="#fff"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 27 l9 9 l16-18"
                        />
                    </svg>
                </div>
                {/* Confetti dots */}
                {["🌿", "✨", "🍃", "⭐", "🌱"].map((e, i) => (
                    <span key={i} className={`succ__confetti succ__confetti--${i + 1}`}>{e}</span>
                ))}
            </div>

            {/* ── Headline ── */}
            <h1 className="succ__title">Order Confirmed! 🎉</h1>
            <p className="succ__subtitle">
                Thank you for choosing{" "}
                <strong className="succ__brand">Sanjari Herbal Hair Oil</strong>.
                Your order is confirmed and will be packed with care.
            </p>

            {/* ── Order details card ── */}
            <div className="succ__card">
                {orderId && (
                    <div className="succ__row">
                        <span className="succ__row-label">Order ID</span>
                        <span className="succ__row-val succ__row-val--id">#{orderId}</span>
                    </div>
                )}
                <div className="succ__row">
                    <span className="succ__row-label">Status</span>
                    <span className="succ__status-pill">✓ Confirmed</span>
                </div>
                <div className="succ__row">
                    <span className="succ__row-label">Estimated Delivery</span>
                    <span className="succ__row-val">5–8 Business Days</span>
                </div>
                <div className="succ__row succ__row--last">
                    <span className="succ__row-label">Product</span>
                    <span className="succ__row-val">Sanjari Herbal Hair Oil</span>
                </div>
            </div>

            {/* ── COD notice ── */}
            <div className="succ__cod-notice">
                <span className="succ__cod-icon">📞</span>
                <p>
                    <strong>COD customers:</strong> Our team will call or WhatsApp you
                    to confirm your order before dispatch.
                </p>
            </div>

            {/* ── CTA buttons ── */}
            <div className="succ__actions">
                <Link href="/" className="succ__btn succ__btn--primary">
                    ← Back to Home
                </Link>
            </div>

            {/* ── Footer note ── */}
            <p className="succ__footer-note">
                Questions? Email us at{" "}
                <a href="mailto:sanjariherbalhairoil@gmail.com" className="succ__email">sanjariherbalhairoil@gmail.com</a>
            </p>
        </div>
    );
}

/* ─── Step sub-component ─────────────────────────────────────────────────── */
function Step({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="succ__step">
            <div className="succ__step-icon">{icon}</div>
            <div className="succ__step-body">
                <strong className="succ__step-title">{title}</strong>
                <p className="succ__step-desc">{desc}</p>
            </div>
        </div>
    );
}

/* ─── Page shell ─────────────────────────────────────────────────────────── */
export default function SuccessPage() {
    return (
        <div className="succ__page">
            {/* Background decorations */}
            <div className="succ__bg-blob succ__bg-blob--1" aria-hidden="true" />
            <div className="succ__bg-blob succ__bg-blob--2" aria-hidden="true" />
            <div className="succ__bg-blob succ__bg-blob--3" aria-hidden="true" />

            <div className="succ__wrap">
                <div className="succ__box">
                    <Suspense
                        fallback={
                            <div className="succ__loading">
                                <div className="succ__spinner" />
                                <p>Loading your order details…</p>
                            </div>
                        }
                    >
                        <SuccessContent />
                    </Suspense>
                </div>
            </div>

            <style>{`
                /* ── Page shell ─────────────────────────── */
                .succ__page {
                    min-height: 100vh;
                    background: #f3faf4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px 80px;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    position: relative;
                    overflow: hidden;
                }

                /* ── Background blobs ───────────────────── */
                .succ__bg-blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(80px);
                    opacity: 0.45;
                }
                .succ__bg-blob--1 {
                    width: 420px; height: 420px;
                    top: -120px; left: -120px;
                    background: #C8E6C9;
                }
                .succ__bg-blob--2 {
                    width: 320px; height: 320px;
                    bottom: -80px; right: -80px;
                    background: #A5D6A7;
                }
                .succ__bg-blob--3 {
                    width: 200px; height: 200px;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    background: #E8F5E9;
                    opacity: 0.6;
                }

                /* ── Wrap ───────────────────────────────── */
                .succ__wrap {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 520px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 28px;
                }

                /* ── Logo ───────────────────────────────── */
                .succ__logo-link { display: inline-block; }
                .succ__logo      { object-fit: contain; }

                /* ── Card box ───────────────────────────── */
                .succ__box {
                    width: 100%;
                    background: #ffffff;
                    border-radius: 28px;
                    border: 1px solid #C8E6C9;
                    box-shadow: 0 16px 60px rgba(26, 92, 42, 0.1);
                    padding: 44px 40px 40px;
                    overflow: hidden;
                }
                @media (max-width: 500px) {
                    .succ__box { padding: 36px 24px 32px; border-radius: 20px; }
                }

                /* ── Inner fade-up animation ────────────── */
                .succ__inner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                }
                .succ__inner--visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* ── Check circle ───────────────────────── */
                .succ__check-wrap {
                    position: relative;
                    width: 96px;
                    height: 96px;
                    margin-bottom: 28px;
                }
                .succ__ring {
                    position: absolute;
                    inset: -8px;
                    border-radius: 50%;
                    border: 2px solid #A5D6A7;
                    animation: succ-ring-pulse 2.4s ease-in-out infinite;
                }
                @keyframes succ-ring-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50%       { transform: scale(1.12); opacity: 0.15; }
                }
                .succ__orb {
                    width: 96px; height: 96px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2d8a3e 0%, #388E3C 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 32px rgba(56, 142, 60, 0.40);
                    position: relative;
                    z-index: 1;
                }
                .succ__svg {
                    width: 52px; height: 52px;
                }
                .succ__svg-check {
                    stroke-dasharray: 60;
                    stroke-dashoffset: 60;
                    transition: stroke-dashoffset 0.65s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
                }
                .succ__svg-check--drawn {
                    stroke-dashoffset: 0;
                }

                /* ── Confetti ───────────────────────────── */
                .succ__confetti {
                    position: absolute;
                    font-size: 1.1rem;
                    animation: succ-confetti 3s ease-in-out infinite;
                    pointer-events: none;
                }
                .succ__confetti--1 { top: -10px; right: -4px;  animation-delay: 0s;    }
                .succ__confetti--2 { top: 8px;   left: -12px;  animation-delay: 0.4s;  }
                .succ__confetti--3 { bottom: -4px; right: -10px; animation-delay: 0.8s; }
                .succ__confetti--4 { bottom: 4px;  left: -6px;  animation-delay: 1.2s;  }
                .succ__confetti--5 { top: -12px;  left: 30px;  animation-delay: 0.6s;  }
                @keyframes succ-confetti {
                    0%, 100% { transform: translateY(0)   rotate(0deg);   opacity: 0.9; }
                    50%      { transform: translateY(-6px) rotate(15deg);  opacity: 0.6; }
                }

                /* ── Headline ───────────────────────────── */
                .succ__title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(24px, 5vw, 32px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 10px;
                    line-height: 1.15;
                }
                .succ__subtitle {
                    font-size: 1rem;
                    color: #555;
                    line-height: 1.65;
                    margin: 0 0 28px;
                    max-width: 380px;
                }
                .succ__brand {
                    color: #2d8a3e;
                    font-weight: 700;
                }

                /* ── Order details card ─────────────────── */
                .succ__card {
                    width: 100%;
                    background: #f7fdf7;
                    border: 1px solid #C8E6C9;
                    border-radius: 16px;
                    overflow: hidden;
                    margin-bottom: 28px;
                    text-align: left;
                }
                .succ__row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 13px 18px;
                    border-bottom: 1px dashed #C8E6C9;
                    gap: 12px;
                }
                .succ__row--last { border-bottom: none; }
                .succ__row-label {
                    font-size: 0.85rem;
                    color: #888;
                    font-weight: 500;
                    flex-shrink: 0;
                }
                .succ__row-val {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #212121;
                    text-align: right;
                }
                .succ__row-val--id {
                    font-family: monospace;
                    letter-spacing: 0.05em;
                    color: #2d8a3e;
                    font-size: 0.85rem;
                }
                .succ__status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #2d8a3e;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 20px;
                    padding: 4px 12px;
                }

                /* ── What happens next steps ────────────── */
                .succ__steps {
                    width: 100%;
                    margin-bottom: 24px;
                    text-align: left;
                }
                .succ__steps-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #888;
                    margin: 0 0 14px;
                }
                .succ__steps-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    border: 1px solid #C8E6C9;
                    border-radius: 16px;
                    overflow: hidden;
                }
                .succ__step {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    padding: 14px 18px;
                    border-bottom: 1px solid #E8F5E9;
                    background: #fff;
                    transition: background 0.15s;
                }
                .succ__step:last-child { border-bottom: none; }
                .succ__step:hover      { background: #f7fdf7; }
                .succ__step-icon {
                    font-size: 1.3rem;
                    flex-shrink: 0;
                    margin-top: 1px;
                }
                .succ__step-title {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #212121;
                    display: block;
                    margin-bottom: 2px;
                }
                .succ__step-desc {
                    font-size: 0.82rem;
                    color: #777;
                    line-height: 1.5;
                    margin: 0;
                }

                /* ── COD notice ─────────────────────────── */
                .succ__cod-notice {
                    width: 100%;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 14px;
                    padding: 14px 16px;
                    margin-bottom: 28px;
                    text-align: left;
                }
                .succ__cod-icon { font-size: 1.25rem; flex-shrink: 0; }
                .succ__cod-notice p {
                    font-size: 0.85rem;
                    color: #2d5a2d;
                    line-height: 1.5;
                    margin: 0;
                }

                /* ── Action buttons ─────────────────────── */
                .succ__actions {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                .succ__btn {
                    display: block;
                    width: 100%;
                    text-align: center;
                    padding: 14px 24px;
                    border-radius: 14px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .succ__btn--primary {
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    box-shadow: 0 6px 20px rgba(56,142,60,0.30);
                }
                .succ__btn--primary:hover {
                    background: linear-gradient(135deg, #1a5c2a, #2d8a3e);
                    box-shadow: 0 8px 28px rgba(56,142,60,0.40);
                    transform: translateY(-1px);
                }
                .succ__btn--ghost {
                    background: transparent;
                    color: #388E3C;
                    border: 1.5px solid #A5D6A7;
                }
                .succ__btn--ghost:hover {
                    background: #E8F5E9;
                    border-color: #388E3C;
                }

                /* ── Footer note ────────────────────────── */
                .succ__footer-note {
                    font-size: 0.8rem;
                    color: #aaa;
                    margin: 0;
                }
                .succ__email {
                    color: #388E3C;
                    font-weight: 600;
                    text-decoration: none;
                }
                .succ__email:hover { text-decoration: underline; }

                /* ── Loading spinner ────────────────────── */
                .succ__loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 14px;
                    padding: 40px 0;
                    color: #888;
                    font-size: 0.9rem;
                }
                .succ__spinner {
                    width: 32px; height: 32px;
                    border: 3px solid #E8F5E9;
                    border-top-color: #388E3C;
                    border-radius: 50%;
                    animation: succ-spin 0.75s linear infinite;
                }
                @keyframes succ-spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
