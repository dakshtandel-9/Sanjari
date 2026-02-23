"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Order = {
    order_id: string;
    customer_name: string;
    status: "pending" | "accepted" | "shipped" | "completed" | "cancelled";
    amount: number;
    payment_method: string;
    address: string;
    state: string;
    pincode: string;
    created_at: string;
};

/* ─── Status config ──────────────────────────────────────────────────────── */
const STATUS_STEPS = ["pending", "accepted", "shipped", "completed"] as const;

const STATUS_META: Record<string, { label: string; icon: string; color: string; desc: string }> = {
    pending: { label: "Order Placed", icon: "📋", color: "#f59e0b", desc: "Awaiting confirmation from our team." },
    accepted: { label: "Confirmed", icon: "✅", color: "#2d8a3e", desc: "Your order has been confirmed and is being prepared." },
    shipped: { label: "Shipped", icon: "🚚", color: "#2d8a3e", desc: "Your order is on its way to you." },
    completed: { label: "Delivered", icon: "🏠", color: "#2d8a3e", desc: "Your order has been successfully delivered." },
    cancelled: { label: "Cancelled", icon: "✕", color: "#e53e3e", desc: "This order was cancelled." },
};

const PAYMENT_LABEL: Record<string, string> = {
    razorpay: "Razorpay (Prepaid)",
    cod: "Cash on Delivery",
};

/* ─── Progress bar component ─────────────────────────────────────────────── */
function OrderProgress({ status }: { status: string }) {
    const isCancelled = status === "cancelled";
    const activeIdx = STATUS_STEPS.indexOf(status as any);

    if (isCancelled) {
        return (
            <div className="trk__cancelled">
                <span className="trk__cancelled-icon">✕</span>
                <span>This order has been cancelled.</span>
            </div>
        );
    }

    return (
        <div className="trk__progress">
            {STATUS_STEPS.map((step, i) => {
                const done = i <= activeIdx;
                const current = i === activeIdx;
                const meta = STATUS_META[step];
                return (
                    <div key={step} className="trk__progress-step">
                        {/* Connector line before */}
                        {i > 0 && (
                            <div className={`trk__connector${done ? " trk__connector--done" : ""}`} />
                        )}
                        {/* Dot */}
                        <div className={`trk__dot${done ? " trk__dot--done" : ""}${current ? " trk__dot--current" : ""}`}>
                            {done ? <span className="trk__dot-icon">{meta.icon}</span>
                                : <span className="trk__dot-num">{i + 1}</span>}
                        </div>
                        {/* Label */}
                        <span className={`trk__step-label${done ? " trk__step-label--done" : ""}`}>
                            {meta.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

/* ─── Single order card ──────────────────────────────────────────────────── */
function OrderCard({ order }: { order: Order }) {
    const meta = STATUS_META[order.status] ?? STATUS_META.pending;
    const date = new Date(order.created_at).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
    });

    return (
        <div className="trk__card">
            {/* Card header */}
            <div className="trk__card-header">
                <div>
                    <p className="trk__card-id">Order #{order.order_id}</p>
                    <p className="trk__card-date">Placed on {date}</p>
                </div>
                <span className="trk__status-pill" style={{ background: meta.color + "18", color: meta.color, borderColor: meta.color + "40" }}>
                    {meta.icon} {meta.label}
                </span>
            </div>

            {/* Progress */}
            <OrderProgress status={order.status} />

            {/* Status description */}
            <div className="trk__status-desc">
                <span className="trk__status-desc-dot" style={{ background: meta.color }} />
                <p>{meta.desc}</p>
            </div>

            {/* Details grid */}
            <div className="trk__details">
                <div className="trk__detail">
                    <span className="trk__detail-label">Customer</span>
                    <span className="trk__detail-val">{order.customer_name}</span>
                </div>
                <div className="trk__detail">
                    <span className="trk__detail-label">Amount Paid</span>
                    <span className="trk__detail-val trk__detail-val--green">₹{order.amount}</span>
                </div>
                <div className="trk__detail">
                    <span className="trk__detail-label">Payment</span>
                    <span className="trk__detail-val">{PAYMENT_LABEL[order.payment_method] ?? order.payment_method}</span>
                </div>
                <div className="trk__detail">
                    <span className="trk__detail-label">Delivery To</span>
                    <span className="trk__detail-val">{order.state} – {order.pincode}</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function TrackOrderPage() {
    const [tab, setTab] = useState<"id" | "phone">("id");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [errMsg, setErrMsg] = useState("");

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        const val = input.trim();
        if (!val) { setErrMsg("Please enter a value."); return; }

        setLoading(true);
        setOrders(null);
        setErrMsg("");

        try {
            const param = tab === "id" ? `order_id=${encodeURIComponent(val)}` : `phone=${encodeURIComponent(val)}`;
            const res = await fetch(`/api/orders/track?${param}`);
            const data = await res.json();

            if (!res.ok || !data.success) {
                setErrMsg(data.error || "Something went wrong. Please try again.");
            } else {
                setOrders(data.orders);
            }
        } catch {
            setErrMsg("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="trk__page">
            {/* Background blobs */}
            <div className="trk__blob trk__blob--1" aria-hidden="true" />
            <div className="trk__blob trk__blob--2" aria-hidden="true" />

            {/* ── HERO ── */}
            <div className="trk__hero">
                <div className="trk__hero-inner">
                    <div className="trk__badge">Track Your Order</div>
                    <h1 className="trk__title">Where Is My Order?</h1>
                    <p className="trk__subtitle">
                        Enter your Order ID or registered phone number to see your delivery status.
                    </p>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="trk__body">

                {/* Search card */}
                <div className="trk__search-card">
                    {/* Tab toggle */}
                    <div className="trk__tabs" role="tablist">
                        <button
                            role="tab"
                            aria-selected={tab === "id"}
                            className={`trk__tab${tab === "id" ? " trk__tab--active" : ""}`}
                            onClick={() => { setTab("id"); setErrMsg(""); setOrders(null); setInput(""); }}
                        >
                            🔢 Order ID
                        </button>
                        <button
                            role="tab"
                            aria-selected={tab === "phone"}
                            className={`trk__tab${tab === "phone" ? " trk__tab--active" : ""}`}
                            onClick={() => { setTab("phone"); setErrMsg(""); setOrders(null); setInput(""); }}
                        >
                            📞 Phone Number
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleTrack} className="trk__form">
                        <div className="trk__input-wrap">
                            <input
                                type={tab === "phone" ? "tel" : "text"}
                                value={input}
                                onChange={e => { setInput(e.target.value); setErrMsg(""); }}
                                placeholder={tab === "id" ? "Enter your 6-digit Order ID (e.g. 123456)" : "Enter your 10-digit phone number"}
                                className={`trk__input${errMsg ? " trk__input--err" : ""}`}
                                maxLength={tab === "phone" ? 10 : 20}
                                autoComplete="off"
                            />
                            <button type="submit" className="trk__submit" disabled={loading}>
                                {loading
                                    ? <div className="trk__spinner" />
                                    : "Track →"
                                }
                            </button>
                        </div>
                        {errMsg && (
                            <p className="trk__err">{errMsg}</p>
                        )}
                    </form>

                    <p className="trk__hint">
                        {tab === "id"
                            ? "Your Order ID was shared on the order confirmation page."
                            : "We'll show all recent orders linked to your number."}
                    </p>
                </div>

                {/* ── Results ── */}
                {orders && orders.length > 0 && (
                    <div className="trk__results">
                        <p className="trk__results-label">
                            {orders.length === 1 ? "Order Found" : `${orders.length} Orders Found`}
                        </p>
                        {orders.map(o => <OrderCard key={o.order_id} order={o} />)}
                    </div>
                )}

                {/* Help box */}
                <div className="trk__help">
                    <div className="trk__help-icon">📞</div>
                    <div>
                        <p className="trk__help-title">Need help with your order?</p>
                        <p className="trk__help-sub">
                            Email us at{" "}
                            <a href="mailto:sanjariherbalhairoil@gmail.com" className="trk__link">sanjariherbalhairoil@gmail.com</a>
                            {" "}or WhatsApp us at{" "}
                            <a href="https://wa.me/917867078601" target="_blank" rel="noopener noreferrer" className="trk__link">+91 78670 78601</a>
                        </p>
                    </div>
                </div>

                <div className="trk__back-wrap">
                    <Link href="/" className="trk__back">← Back to Home</Link>
                </div>
            </div>

            {/* ═══════════════════ STYLES ═══════════════════ */}
            <style>{`
                /* ── Page ──────────────────────────────────── */
                .trk__page {
                    min-height: 100vh;
                    background: #f7faf7;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    color: #212121;
                    padding-bottom: 80px;
                    position: relative;
                    overflow: hidden;
                }

                /* ── Blobs ─────────────────────────────────── */
                .trk__blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(90px);
                    opacity: 0.35;
                    z-index: 0;
                }
                .trk__blob--1 { width: 400px; height: 400px; top: 0; left: -100px; background: #C8E6C9; }
                .trk__blob--2 { width: 300px; height: 300px; bottom: 100px; right: -80px; background: #A5D6A7; }

                /* ── Hero ──────────────────────────────────── */
                .trk__hero {
                    background: linear-gradient(135deg, #1a5c2a 0%, #2d8a3e 60%, #388E3C 100%);
                    padding: 80px 24px 100px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .trk__hero::before {
                    content: "";
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 280px; height: 280px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    pointer-events: none;
                }
                .trk__hero-inner { max-width: 700px; margin: 0 auto; position: relative; z-index: 1; }
                .trk__badge {
                    display: inline-block;
                    background: rgba(255,255,255,0.15);
                    color: rgba(255,255,255,0.9);
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 6px 16px;
                    border-radius: 20px;
                    margin-bottom: 18px;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .trk__title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(28px, 5vw, 48px);
                    font-weight: 800;
                    color: #fff;
                    margin: 0 0 14px;
                    line-height: 1.15;
                }
                .trk__subtitle {
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.85);
                    line-height: 1.65;
                    margin: 0 auto;
                    max-width: 520px;
                }
                @media (max-width: 600px) {
                    .trk__hero { padding: 60px 20px 80px; }
                }

                /* ── Body ──────────────────────────────────── */
                .trk__body {
                    position: relative;
                    z-index: 2;
                    max-width: 680px;
                    margin: -50px auto 0;
                    padding: 0 20px;
                }

                /* ── Search card ───────────────────────────── */
                .trk__search-card {
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 24px;
                    padding: 36px 36px 28px;
                    box-shadow: 0 10px 40px rgba(26, 92, 42, 0.10);
                    margin-bottom: 24px;
                }
                @media (max-width: 500px) {
                    .trk__search-card { padding: 24px 20px; border-radius: 16px; }
                }

                /* Tabs */
                .trk__tabs {
                    display: flex;
                    gap: 8px;
                    background: #f0faf0;
                    border-radius: 12px;
                    padding: 4px;
                    margin-bottom: 24px;
                }
                .trk__tab {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    background: transparent;
                    border-radius: 9px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #777;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: inherit;
                }
                .trk__tab--active {
                    background: #fff;
                    color: #1a5c2a;
                    box-shadow: 0 2px 8px rgba(26, 92, 42, 0.12);
                }

                /* Input */
                .trk__form { display: flex; flex-direction: column; gap: 8px; }
                .trk__input-wrap { display: flex; gap: 10px; }
                .trk__input {
                    flex: 1;
                    background: #f7fdf7;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 14px;
                    padding: 14px 16px;
                    font-size: 0.97rem;
                    color: #212121;
                    outline: none;
                    font-family: inherit;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .trk__input:focus {
                    border-color: #2d8a3e;
                    box-shadow: 0 0 0 3px rgba(45, 138, 62, 0.12);
                    background: #fff;
                }
                .trk__input--err { border-color: #e53e3e !important; }
                .trk__submit {
                    padding: 14px 24px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 0.95rem;
                    font-weight: 700;
                    border: none;
                    border-radius: 14px;
                    cursor: pointer;
                    white-space: nowrap;
                    font-family: inherit;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 100px;
                    box-shadow: 0 4px 16px rgba(45, 138, 62, 0.3);
                }
                .trk__submit:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 20px rgba(45, 138, 62, 0.4);
                }
                .trk__submit:disabled { opacity: 0.7; cursor: not-allowed; }
                .trk__err  { font-size: 0.82rem; color: #e53e3e; margin: 0; }
                .trk__hint { font-size: 0.8rem; color: #999; margin: 10px 0 0; }

                /* Spinner */
                .trk__spinner {
                    width: 18px; height: 18px;
                    border: 2.5px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: trk-spin 0.7s linear infinite;
                }
                @keyframes trk-spin { to { transform: rotate(360deg); } }

                /* ── Results ───────────────────────────────── */
                .trk__results { margin-bottom: 24px; }
                .trk__results-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #888;
                    margin: 0 0 14px;
                }

                /* ── Order card ────────────────────────────── */
                .trk__card {
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 20px;
                    padding: 28px;
                    box-shadow: 0 4px 20px rgba(26, 92, 42, 0.07);
                    margin-bottom: 16px;
                }
                .trk__card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-bottom: 24px;
                }
                .trk__card-id {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1rem;
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 4px;
                }
                .trk__card-date { font-size: 0.8rem; color: #888; margin: 0; }
                .trk__status-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    border: 1px solid;
                    border-radius: 20px;
                    padding: 5px 12px;
                    white-space: nowrap;
                }

                /* ── Progress bar ──────────────────────────── */
                .trk__progress {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    position: relative;
                    margin-bottom: 20px;
                    padding: 0 4px;
                }
                .trk__progress-step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    flex: 1;
                }
                .trk__connector {
                    position: absolute;
                    top: 18px;
                    left: -50%;
                    width: 100%;
                    height: 3px;
                    background: #E8F5E9;
                    z-index: 0;
                    transition: background 0.3s;
                }
                .trk__connector--done { background: #2d8a3e; }
                .trk__dot {
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    border: 2.5px solid #C8E6C9;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 1;
                    transition: all 0.3s;
                }
                .trk__dot--done {
                    background: #E8F5E9;
                    border-color: #2d8a3e;
                }
                .trk__dot--current {
                    background: #2d8a3e;
                    border-color: #2d8a3e;
                    box-shadow: 0 0 0 4px rgba(45, 138, 62, 0.2);
                }
                .trk__dot--current .trk__dot-icon { filter: brightness(10); }
                .trk__dot-icon { font-size: 1rem; line-height: 1; }
                .trk__dot-num  { font-size: 0.75rem; font-weight: 700; color: #bbb; }
                .trk__step-label {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #bbb;
                    text-align: center;
                    line-height: 1.3;
                }
                .trk__step-label--done { color: #2d8a3e; }

                /* Cancelled */
                .trk__cancelled {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #fff5f5;
                    border: 1px solid #fed7d7;
                    border-radius: 12px;
                    padding: 14px 16px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #c53030;
                    margin-bottom: 20px;
                }
                .trk__cancelled-icon {
                    width: 28px; height: 28px;
                    background: #e53e3e;
                    color: #fff;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                /* Status description */
                .trk__status-desc {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    background: #f7fdf7;
                    border: 1px solid #E8F5E9;
                    border-radius: 10px;
                    padding: 12px 14px;
                    margin-bottom: 20px;
                }
                .trk__status-desc-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                    margin-top: 5px;
                }
                .trk__status-desc p { font-size: 0.875rem; color: #444; line-height: 1.5; margin: 0; }

                /* Details grid */
                .trk__details {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }
                @media (max-width: 460px) { .trk__details { grid-template-columns: 1fr; } }
                .trk__detail {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    padding: 12px 14px;
                    background: #f9fdf9;
                    border: 1px solid #E8F5E9;
                    border-radius: 10px;
                }
                .trk__detail-label { font-size: 0.72rem; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.04em; }
                .trk__detail-val   { font-size: 0.9rem; font-weight: 600; color: #212121; }
                .trk__detail-val--green { color: #2d8a3e; }

                /* ── Help box ──────────────────────────────── */
                .trk__help {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 28px;
                }
                .trk__help-icon  { font-size: 1.4rem; flex-shrink: 0; }
                .trk__help-title { font-weight: 700; color: #1a5c2a; font-size: 0.95rem; margin: 0 0 4px; }
                .trk__help-sub   { font-size: 0.85rem; color: #2d5a2d; line-height: 1.6; margin: 0; }
                .trk__link { color: #1a5c2a; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
                .trk__link:hover { color: #2d8a3e; }

                /* ── Back ──────────────────────────────────── */
                .trk__back-wrap { text-align: center; }
                .trk__back { color: #388E3C; font-weight: 600; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
                .trk__back:hover { color: #1B5E20; }
            `}</style>
        </div>
    );
}
