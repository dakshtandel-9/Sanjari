"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const FAQ_SECTIONS = [
    {
        category: "🌿 Product Related",
        items: [
            {
                q: "Is Sanjari Hair Oil 100% herbal?",
                a: "Yes, Sanjari Herbal Hair Oil is formulated using Ayurvedic ingredients. It does not contain harmful chemicals like parabens or sulphates. We recommend reading the ingredient list on the product label for full transparency.",
            },
            {
                q: "Is it suitable for men and women?",
                a: "Yes, Sanjari Herbal Hair Oil is suitable for both men and women. It is designed to nourish the scalp and support healthy hair regardless of gender.",
            },
            {
                q: "How should I use it?",
                a: "Apply a small quantity of oil to the scalp and hair roots. Massage gently in circular motions for 3–5 minutes. Leave it on for a few hours or overnight for best results, then wash off with a mild shampoo.",
            },
            {
                q: "How long does it take to see results?",
                a: "Results vary from person to person. Consistent usage for at least 4–6 weeks is recommended to observe noticeable improvement. Factors like diet, lifestyle, and hair type also influence results.",
            },
            {
                q: "Can it help reduce hair fall?",
                a: "Sanjari Herbal Hair Oil is designed to nourish the scalp and hair roots, which may support healthier hair growth over time. Results may vary and are not guaranteed.",
            },
            {
                q: "Does it have any side effects?",
                a: "Sanjari is made with herbal ingredients and is generally safe for use. However, individuals with sensitive skin or known allergies are advised to perform a patch test on a small area of skin before full application.",
            },
        ],
    },
    {
        category: "📦 Order & Shipping",
        items: [
            {
                q: "How long does delivery take?",
                a: "Estimated delivery timelines are:\n• Metro cities: 5–7 business days\n• Other cities: 6–8 business days\n• Remote locations: 7–10 business days\n\nTimelines may vary due to courier partner delays or weather conditions.",
            },
            {
                q: "What are the shipping charges?",
                a: "Shipping charges range from ₹60 to ₹80 depending on your delivery location and are calculated at checkout. Prepaid orders via Razorpay may be eligible for reduced shipping fees.",
            },
            {
                q: "Do you offer Cash on Delivery (COD)?",
                a: "Yes, Cash on Delivery is available across India. For COD orders, our team may call or WhatsApp you to confirm before dispatch. Repeated refusals to accept COD deliveries may result in restriction of future COD services.",
            },
            {
                q: "How can I track my order?",
                a: "Once your order is dispatched, tracking details will be shared via SMS or WhatsApp. You can also visit the Track Order page on our website to check your order status.",
            },
        ],
    },
    {
        category: "↩️ Returns & Refunds",
        items: [
            {
                q: "Can I return the product?",
                a: "We do not accept returns once the product has been delivered. If you receive a damaged or tampered product, please report it within 24 hours of delivery with photo or video evidence. Replacement will be arranged after verification.",
            },
            {
                q: "Do you offer refunds?",
                a: "No. Refunds are not provided once the product has been delivered. In the case of verified transit damage reported within 24 hours, we offer a replacement — not a refund. Please review our Refund Policy for full details.",
            },
        ],
    },
    {
        category: "✅ Trust & Transparency",
        items: [
            {
                q: "Is the product certified?",
                a: "Sanjari Herbal Hair Oil follows quality manufacturing standards and complies with applicable regulations. We are committed to maintaining the highest standards of product quality and safety.",
            },
            {
                q: "Where is it manufactured?",
                a: "Sanjari Herbal Hair Oil is proudly manufactured in India. We support local Ayurvedic formulation practices and use ingredients sourced from trusted suppliers.",
            },
        ],
    },
];

/* ─── Accordion item ─────────────────────────────────────────────────────── */
function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`faq__item${open ? " faq__item--open" : ""}`}>
            <button
                className="faq__question"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span className="faq__q-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="faq__q-text">{q}</span>
                <span className={`faq__chevron${open ? " faq__chevron--open" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
            <div
                className="faq__answer-wrap"
                style={{ maxHeight: open ? "600px" : "0" }}
            >
                <div className="faq__answer">
                    {a.split("\n").map((line, i) =>
                        line.trim() === "" ? null : (
                            <p key={i} className="faq__answer-p">{line}</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function FAQPage() {
    return (
        <div className="faq__page">
            {/* ── HERO ── */}
            <div className="faq__hero">
                <div className="faq__hero-inner">
                    <div className="faq__badge">Support</div>
                    <h1 className="faq__title">Frequently Asked Questions</h1>
                    <p className="faq__subtitle">
                        Everything you need to know about Sanjari Herbal Hair Oil —
                        from usage to orders to our policies.
                    </p>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="faq__body">
                <div className="faq__content">

                    {FAQ_SECTIONS.map((section, si) => (
                        <div key={si} className="faq__section">
                            <h2 className="faq__section-title">{section.category}</h2>
                            <div className="faq__list">
                                {section.items.map((item, ii) => (
                                    <AccordionItem
                                        key={ii}
                                        q={item.q}
                                        a={item.a}
                                        index={FAQ_SECTIONS
                                            .slice(0, si)
                                            .reduce((acc, s) => acc + s.items.length, 0) + ii}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Still have questions */}
                    <div className="faq__contact-box">
                        <div className="faq__contact-icon">💬</div>
                        <div className="faq__contact-body">
                            <h3 className="faq__contact-title">Still have questions?</h3>
                            <p className="faq__contact-sub">
                                Our team is happy to help. Reach out to us directly.
                            </p>
                            <div className="faq__contact-links">
                                <a href="mailto:sanjariherbalhairoil@gmail.com" className="faq__contact-btn faq__contact-btn--primary">
                                    ✉️ sanjariherbalhairoil@gmail.com
                                </a>
                                <a href="https://wa.me/917867078601" target="_blank" rel="noopener noreferrer"
                                    className="faq__contact-btn faq__contact-btn--ghost">
                                    💬 WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Related policy links */}
                    <div className="faq__policies">
                        <p className="faq__policies-label">Related Policies</p>
                        <div className="faq__policies-links">
                            <Link href="/shipping-policy" className="faq__policy-link">📦 Shipping Policy</Link>
                            <Link href="/return-policy" className="faq__policy-link">↩️ Return Policy</Link>
                            <Link href="/refund-policy" className="faq__policy-link">💳 Refund Policy</Link>
                            <Link href="/cancellation-policy" className="faq__policy-link">✕ Cancellation Policy</Link>
                            <Link href="/terms" className="faq__policy-link">⚖️ Terms & Conditions</Link>
                        </div>
                    </div>

                    <div className="faq__footer">
                        <Link href="/" className="faq__back">← Back to Home</Link>
                    </div>
                </div>
            </div>

            <style>{`
                /* ── Page ───────────────────────────────────── */
                .faq__page {
                    min-height: 100vh;
                    background: #f7faf7;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    color: #212121;
                    padding-bottom: 80px;
                }

                /* ── Hero ───────────────────────────────────── */
                .faq__hero {
                    background: linear-gradient(135deg, #1a5c2a 0%, #2d8a3e 60%, #388E3C 100%);
                    padding: 80px 24px 100px;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }
                .faq__hero::before {
                    content: "";
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 300px; height: 300px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    pointer-events: none;
                }
                .faq__hero::after {
                    content: "";
                    position: absolute;
                    bottom: -40px; left: -40px;
                    width: 200px; height: 200px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.04);
                    pointer-events: none;
                }
                .faq__hero-inner {
                    max-width: 720px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }
                .faq__badge {
                    display: inline-block;
                    background: rgba(255,255,255,0.15);
                    color: rgba(255,255,255,0.9);
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 6px 16px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .faq__title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(30px, 6vw, 52px);
                    font-weight: 800;
                    color: #fff;
                    margin: 0 0 16px;
                    line-height: 1.1;
                }
                .faq__subtitle {
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.85);
                    line-height: 1.65;
                    max-width: 560px;
                    margin: 0 auto;
                }

                /* ── Body ───────────────────────────────────── */
                .faq__body {
                    max-width: 820px;
                    margin: -50px auto 0;
                    padding: 0 20px;
                    position: relative;
                    z-index: 2;
                }
                .faq__content {
                    background: #fff;
                    border-radius: 24px;
                    padding: 48px;
                    box-shadow: 0 10px 40px rgba(26, 92, 42, 0.08);
                    border: 1px solid #C8E6C9;
                }
                @media (max-width: 600px) {
                    .faq__content { padding: 32px 20px; border-radius: 16px; }
                    .faq__hero    { padding: 60px 24px 80px; }
                }

                /* ── Sections ───────────────────────────────── */
                .faq__section { margin-bottom: 40px; }
                .faq__section:last-of-type { margin-bottom: 0; }
                .faq__section-title {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 0.9rem;
                    font-weight: 800;
                    color: #2d8a3e;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    margin: 0 0 16px;
                    padding-bottom: 12px;
                    border-bottom: 1.5px solid #E8F5E9;
                }

                /* ── FAQ list ───────────────────────────────── */
                .faq__list {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                /* ── Accordion item ─────────────────────────── */
                .faq__item {
                    border: 1.5px solid #E8F5E9;
                    border-radius: 14px;
                    overflow: hidden;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #fff;
                }
                .faq__item:hover {
                    border-color: #A5D6A7;
                }
                .faq__item--open {
                    border-color: #2d8a3e;
                    box-shadow: 0 4px 16px rgba(45, 138, 62, 0.1);
                }

                /* ── Question button ────────────────────────── */
                .faq__question {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 18px 20px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    font-family: inherit;
                    transition: background 0.15s;
                }
                .faq__question:hover { background: #f7fdf7; }
                .faq__item--open .faq__question { background: #f0faf0; }

                .faq__q-num {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #388E3C;
                    background: #E8F5E9;
                    min-width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    font-family: var(--font-poppins, sans-serif);
                }
                .faq__q-text {
                    flex: 1;
                    font-size: 0.97rem;
                    font-weight: 600;
                    color: #212121;
                    line-height: 1.45;
                }
                .faq__chevron {
                    color: #888;
                    transition: transform 0.3s ease, color 0.2s;
                    flex-shrink: 0;
                }
                .faq__chevron--open {
                    transform: rotate(180deg);
                    color: #2d8a3e;
                }

                /* ── Answer ─────────────────────────────────── */
                .faq__answer-wrap {
                    overflow: hidden;
                    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .faq__answer {
                    padding: 0 20px 20px 62px;
                }
                @media (max-width: 500px) {
                    .faq__answer { padding: 0 16px 16px 16px; }
                }
                .faq__answer-p {
                    font-size: 0.92rem;
                    color: #555;
                    line-height: 1.7;
                    margin: 0 0 8px;
                }
                .faq__answer-p:last-child { margin-bottom: 0; }

                /* ── Contact box ────────────────────────────── */
                .faq__contact-box {
                    margin-top: 48px;
                    display: flex;
                    gap: 20px;
                    align-items: flex-start;
                    background: linear-gradient(135deg, #E8F5E9, #f0faf0);
                    border: 1px solid #A5D6A7;
                    border-radius: 18px;
                    padding: 28px;
                }
                .faq__contact-icon { font-size: 1.8rem; flex-shrink: 0; }
                .faq__contact-title {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #1a5c2a;
                    margin: 0 0 4px;
                }
                .faq__contact-sub {
                    font-size: 0.875rem;
                    color: #555;
                    margin: 0 0 18px;
                }
                .faq__contact-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .faq__contact-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 10px 18px;
                    border-radius: 12px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .faq__contact-btn--primary {
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    box-shadow: 0 4px 14px rgba(45,138,62,0.25);
                }
                .faq__contact-btn--primary:hover {
                    background: linear-gradient(135deg, #1a5c2a, #2d8a3e);
                    box-shadow: 0 6px 20px rgba(45,138,62,0.35);
                    transform: translateY(-1px);
                }
                .faq__contact-btn--ghost {
                    background: #fff;
                    color: #2d8a3e;
                    border: 1.5px solid #A5D6A7;
                }
                .faq__contact-btn--ghost:hover {
                    background: #E8F5E9;
                    border-color: #2d8a3e;
                }

                /* ── Policies pills ─────────────────────────── */
                .faq__policies {
                    margin-top: 32px;
                    padding: 24px;
                    background: #fafafa;
                    border: 1px solid #E8F5E9;
                    border-radius: 16px;
                }
                .faq__policies-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #888;
                    margin: 0 0 14px;
                }
                .faq__policies-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .faq__policy-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #388E3C;
                    background: #E8F5E9;
                    border: 1px solid #C8E6C9;
                    border-radius: 20px;
                    padding: 6px 14px;
                    text-decoration: none;
                    transition: background 0.15s, color 0.15s;
                }
                .faq__policy-link:hover { background: #C8E6C9; color: #1a5c2a; }

                /* ── Back link ──────────────────────────────── */
                .faq__footer   { margin-top: 36px; text-align: center; }
                .faq__back {
                    color: #388E3C;
                    font-weight: 600;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color 0.2s;
                }
                .faq__back:hover { color: #1B5E20; }
            `}</style>
        </div>
    );
}
