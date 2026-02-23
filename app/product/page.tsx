"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const INGREDIENTS = [
    { name: "Bhringraj", desc: "King of herbs for hair — known to promote growth and reduce fall." },
    { name: "Amla (Indian Gooseberry)", desc: "Rich in Vitamin C, nourishes the scalp and strengthens hair." },
    { name: "Brahmi", desc: "Calms the scalp, reduces dandruff and supports healthy follicles." },
    { name: "Neem Oil", desc: "Antibacterial properties that keep the scalp clean and healthy." },
    { name: "Coconut Oil", desc: "Deep moisturiser that reduces protein loss in hair strands." },
    { name: "Sesame Oil", desc: "Rich in minerals, conditions the scalp and prevents dryness." },
];

const BENEFITS = [
    { icon: "🌱", title: "Hair Growth Support", desc: "Ayurvedic herbs like Bhringraj and Brahmi work at the root level to support natural hair growth cycles." },
    { icon: "💪", title: "Stronger Roots", desc: "Regular application nourishes follicles with essential nutrients, reducing weakness at the root." },
    { icon: "🛡️", title: "Reduced Hair Fall", desc: "Strengthens the hair shaft and improves root grip, helping reduce excessive daily hair loss." },
    { icon: "🌿", title: "Scalp Nourishment", desc: "Natural oils penetrate deep to hydrate a dry, flaky scalp and maintain a healthy environment for hair." },
];

const REVIEWS = [
    { name: "Priya S.", city: "Mumbai", stars: 5, text: "Been using for 6 weeks and my hair fall has noticeably reduced. Smells natural and applies easily. Very happy with the product.", },
    { name: "Ravi K.", city: "Bangalore", stars: 5, text: "My wife recommended this. Honestly didn't expect much but the scalp feels so much better after 3–4 uses. Will order again.", },
    { name: "Anita M.", city: "Delhi", stars: 4, text: "Good herbal oil. Packaging was intact, delivery was on time. Takes time to show results but it's worth it for regular use.", },
    { name: "Suresh P.", city: "Chennai", stars: 5, text: "Very good product. Natural smell, not heavy like other oils. My hair feels stronger. COD option made it easy to order.", },
];

const FAQS_SHORT = [
    { q: "Is it 100% herbal?", a: "Yes. Sanjari is formulated with Ayurvedic ingredients. No harmful chemicals." },
    { q: "How long to see results?", a: "Consistent use for 4–6 weeks is recommended. Results vary by individual." },
    { q: "Is COD available?", a: "Yes, Cash on Delivery is available across India." },
    { q: "Can I return it?", a: "Returns are not accepted once delivered. Replacement is available for damaged products reported within 24 hours." },
];

const ITEM_PRICE = 349;
const SHIPPING = 60;

/* ─────────────────────────── HELPERS ─────────────────────────── */
function Stars({ count }: { count: number }) {
    return (
        <span className="pd__stars" aria-label={`${count} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ color: i <= count ? "#f59e0b" : "#E0E0E0" }}>★</span>
            ))}
        </span>
    );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function ProductPage() {
    const [qty, setQty] = useState(1);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeImg, setActiveImg] = useState(0);

    const total = Math.max(0, ITEM_PRICE * qty - discount);

    const applyCoupon = async () => {
        if (!coupon.trim()) { setCouponMsg({ type: "err", text: "Enter a coupon code." }); return; }
        try {
            const res = await fetch("/api/admin/config");
            const data = await res.json();
            const code = coupon.trim().toUpperCase();
            const found = (data.coupons || []).find((c: any) => c.code.toUpperCase() === code && c.is_active);
            if (found) {
                const disc = found.type === "percentage" ? Math.round(ITEM_PRICE * found.discount_value / 100) : found.discount_value;
                setDiscount(disc);
                setCouponMsg({ type: "ok", text: `Applied! -₹${disc} off` });
            } else {
                setDiscount(0);
                setCouponMsg({ type: "err", text: "Invalid or inactive coupon." });
            }
        } catch {
            setCouponMsg({ type: "err", text: "Could not check coupon. Try at checkout." });
        }
    };

    const buyNow = () => {
        window.location.href = "/checkout";
    };

    const THUMBNAILS = ["/product-hero.png", "/product-hero.png", "/product-hero.png"];

    return (
        <div className="pd__page">

            {/* ══════════════════════════════════════════════
                SECTION 1 — ABOVE THE FOLD
            ══════════════════════════════════════════════ */}
            <section className="pd__atf">
                <div className="pd__atf-inner">

                    {/* ── LEFT: Image gallery ── */}
                    <div className="pd__gallery">
                        <div className="pd__main-img-wrap">
                            <Image
                                src="/product-hero.png"
                                alt="Sanjari Herbal Hair Oil 100ml"
                                fill
                                className="pd__main-img"
                                priority
                            />
                            <div className="pd__img-badge">100ml</div>
                        </div>
                        <div className="pd__thumbs">
                            {THUMBNAILS.map((src, i) => (
                                <button
                                    key={i}
                                    className={`pd__thumb${activeImg === i ? " pd__thumb--active" : ""}`}
                                    onClick={() => setActiveImg(i)}
                                    aria-label={`Product image ${i + 1}`}
                                >
                                    <Image src={src} alt={`View ${i + 1}`} fill className="pd__thumb-img" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Details ── */}
                    <div className="pd__details">
                        {/* Brand tag */}
                        <span className="pd__brand-tag">🌿 Sanjari Herbal</span>

                        {/* Product name */}
                        <h1 className="pd__name">Sanjari Ayurvedic Hair Oil</h1>

                        {/* Stars */}
                        <div className="pd__rating-row">
                            <Stars count={5} />
                            <span className="pd__rating-count">(47 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="pd__price-block">
                            <span className="pd__price-main">₹{ITEM_PRICE}</span>
                            <div className="pd__price-meta">
                                <span className="pd__price-ship">+ ₹{SHIPPING} shipping (COD) · Free for prepaid</span>
                            </div>
                        </div>

                        {/* Short benefits */}
                        <ul className="pd__quick-benefits">
                            <li>✔ Supports Hair Growth</li>
                            <li>✔ Strengthens Roots</li>
                            <li>✔ Reduces Hair Fall</li>
                            <li>✔ Herbal Ayurvedic Formula</li>
                        </ul>

                        {/* Quantity selector */}
                        <div className="pd__qty-row">
                            <span className="pd__qty-label">Quantity</span>
                            <div className="pd__qty-ctrl">
                                <button className="pd__qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                                <span className="pd__qty-val">{qty}</span>
                                <button className="pd__qty-btn" onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
                            </div>
                        </div>

                        {/* Coupon */}
                        <div className="pd__coupon">
                            <div className="pd__coupon-row">
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={e => { setCoupon(e.target.value); setCouponMsg(null); }}
                                    placeholder="Have a coupon code?"
                                    className="pd__coupon-input"
                                    onKeyDown={e => e.key === "Enter" && applyCoupon()}
                                />
                                <button type="button" onClick={applyCoupon} className="pd__coupon-btn">Apply</button>
                            </div>
                            {couponMsg && (
                                <p className={`pd__coupon-msg pd__coupon-msg--${couponMsg.type}`}>{couponMsg.text}</p>
                            )}
                        </div>

                        {/* Total */}
                        {(qty > 1 || discount > 0) && (
                            <div className="pd__total-row">
                                <span>Total</span>
                                <strong>₹{total} {discount > 0 && <span className="pd__discount-tag">-₹{discount}</span>}</strong>
                            </div>
                        )}

                        {/* Buy Now CTA */}
                        <button onClick={buyNow} className="pd__buy-btn">
                            Buy Now — ₹{total}
                        </button>

                        {/* Trust line */}
                        <div className="pd__trust-line">
                            <span>🔒 Secure Payment via Razorpay</span>
                            <span className="pd__trust-sep">·</span>
                            <span>🚚 COD Available</span>
                            <span className="pd__trust-sep">·</span>
                            <span>🇮🇳 Made in India</span>
                        </div>

                        {/* COD badge */}
                        <div className="pd__cod-badge">
                            <span>💵</span>
                            <span>Cash on Delivery available · We'll call to confirm your order</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 2 — ABOUT
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--white" id="about">
                <div className="pd__section-inner pd__section-inner--narrow">
                    <span className="pd__sec-badge">About the Product</span>
                    <h2 className="pd__sec-title">About Sanjari Hair Oil</h2>
                    <p className="pd__about-text">
                        Sanjari Herbal Hair Oil is a carefully crafted Ayurvedic formulation designed to nourish your
                        scalp from within. Made with time-tested herbal ingredients known in traditional Indian medicine,
                        it works to strengthen hair roots, reduce daily hair fall, and support healthier hair over time.
                    </p>
                    <p className="pd__about-text">
                        Free from harmful sulphates and parabens, Sanjari is suitable for regular use by both men and
                        women of all hair types. Each 100ml bottle is designed for consistent, everyday care.
                    </p>
                    <div className="pd__about-pills">
                        <span className="pd__pill">🌿 100% Herbal</span>
                        <span className="pd__pill">✅ No Parabens</span>
                        <span className="pd__pill">🇮🇳 Made in India</span>
                        <span className="pd__pill">👨‍👩‍👧 Men & Women</span>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 3 — INGREDIENTS
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--green" id="ingredients">
                <div className="pd__section-inner">
                    <span className="pd__sec-badge">Formulation</span>
                    <h2 className="pd__sec-title">Key Ingredients</h2>
                    <div className="pd__ing-grid">
                        {INGREDIENTS.map((ing, i) => (
                            <div key={i} className="pd__ing-card">
                                <div className="pd__ing-icon">🌿</div>
                                <div>
                                    <strong className="pd__ing-name">{ing.name}</strong>
                                    <p className="pd__ing-desc">{ing.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 4 — HOW TO USE
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--white" id="how-to-use">
                <div className="pd__section-inner pd__section-inner--narrow">
                    <span className="pd__sec-badge">Usage</span>
                    <h2 className="pd__sec-title">How To Use</h2>
                    <div className="pd__steps">
                        <div className="pd__step">
                            <div className="pd__step-num">01</div>
                            <div className="pd__step-icon">🖐️</div>
                            <div className="pd__step-body">
                                <strong>Apply to Scalp</strong>
                                <p>Take a small amount of oil and apply directly to the scalp and hair roots.</p>
                            </div>
                        </div>
                        <div className="pd__step-connector" aria-hidden="true" />
                        <div className="pd__step">
                            <div className="pd__step-num">02</div>
                            <div className="pd__step-icon">💆</div>
                            <div className="pd__step-body">
                                <strong>Massage Gently</strong>
                                <p>Massage in circular motions for 3–5 minutes to improve absorption and circulation.</p>
                            </div>
                        </div>
                        <div className="pd__step-connector" aria-hidden="true" />
                        <div className="pd__step">
                            <div className="pd__step-num">03</div>
                            <div className="pd__step-icon">🌙</div>
                            <div className="pd__step-body">
                                <strong>Leave & Wash</strong>
                                <p>Leave for a few hours or overnight, then wash with a mild shampoo. Best used 2–3 times a week.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 5 — BENEFITS
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--green" id="benefits">
                <div className="pd__section-inner">
                    <span className="pd__sec-badge">Why Sanjari</span>
                    <h2 className="pd__sec-title">Benefits Explained</h2>
                    <div className="pd__benefit-grid">
                        {BENEFITS.map((b, i) => (
                            <div key={i} className="pd__benefit-card">
                                <div className="pd__benefit-icon">{b.icon}</div>
                                <h3 className="pd__benefit-title">{b.title}</h3>
                                <p className="pd__benefit-desc">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 6 — REVIEWS
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--white" id="reviews">
                <div className="pd__section-inner">
                    <span className="pd__sec-badge">What Customers Say</span>
                    <h2 className="pd__sec-title">Customer Reviews</h2>
                    <div className="pd__reviews-summary">
                        <div className="pd__reviews-score">5.0</div>
                        <div>
                            <Stars count={5} />
                            <p className="pd__reviews-count">Based on 47 verified purchases</p>
                        </div>
                    </div>
                    <div className="pd__reviews-grid">
                        {REVIEWS.map((r, i) => (
                            <div key={i} className="pd__review-card">
                                <div className="pd__review-header">
                                    <div className="pd__review-avatar">{r.name[0]}</div>
                                    <div>
                                        <strong className="pd__review-name">{r.name}</strong>
                                        <span className="pd__review-city">{r.city}</span>
                                    </div>
                                    <Stars count={r.stars} />
                                </div>
                                <p className="pd__review-text">"{r.text}"</p>
                                <span className="pd__review-verified">✔ Verified Purchase</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 7 — SHIPPING INFO
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--green" id="shipping">
                <div className="pd__section-inner pd__section-inner--narrow">
                    <span className="pd__sec-badge">Delivery</span>
                    <h2 className="pd__sec-title">Shipping Information</h2>
                    <div className="pd__ship-grid">
                        <div className="pd__ship-card">
                            <span className="pd__ship-icon">🇮🇳</span>
                            <strong>Pan India Delivery</strong>
                            <p>We deliver to all states and Union Territories across India.</p>
                        </div>
                        <div className="pd__ship-card">
                            <span className="pd__ship-icon">📅</span>
                            <strong>5–8 Business Days</strong>
                            <p>Metro cities: 5–7 days · Other cities: 6–8 days · Remote: 7–10 days</p>
                        </div>
                        <div className="pd__ship-card">
                            <span className="pd__ship-icon">💵</span>
                            <strong>COD Available</strong>
                            <p>Cash on Delivery available with a nominal shipping charge of ₹60.</p>
                        </div>
                        <div className="pd__ship-card">
                            <span className="pd__ship-icon">🔄</span>
                            <strong>Damage Replacement</strong>
                            <p>Report damaged products within 24 hours of delivery with photo evidence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 8 — FAQ (SHORT)
            ══════════════════════════════════════════════ */}
            <section className="pd__section pd__section--white" id="faq">
                <div className="pd__section-inner pd__section-inner--narrow">
                    <span className="pd__sec-badge">Common Questions</span>
                    <h2 className="pd__sec-title">Frequently Asked Questions</h2>
                    <div className="pd__faq-list">
                        {FAQS_SHORT.map((item, i) => (
                            <div
                                key={i}
                                className={`pd__faq-item${openFaq === i ? " pd__faq-item--open" : ""}`}
                            >
                                <button
                                    className="pd__faq-q"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                >
                                    <span>{item.q}</span>
                                    <span className={`pd__faq-chevron${openFaq === i ? " pd__faq-chevron--open" : ""}`}>▾</span>
                                </button>
                                <div className="pd__faq-a-wrap" style={{ maxHeight: openFaq === i ? "200px" : "0" }}>
                                    <p className="pd__faq-a">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pd__faq-more">
                        <Link href="/faqs" className="pd__faq-more-link">View all FAQs →</Link>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                MOBILE STICKY BAR
            ══════════════════════════════════════════════ */}
            <div className="pd__sticky-bar" aria-label="Quick purchase">
                <div className="pd__sticky-info">
                    <strong className="pd__sticky-name">Sanjari Hair Oil</strong>
                    <span className="pd__sticky-price">₹{ITEM_PRICE}</span>
                </div>
                <button onClick={buyNow} className="pd__sticky-btn">
                    Buy Now
                </button>
            </div>

            {/* ══════════════════════════════════════════════
                STYLES
            ══════════════════════════════════════════════ */}
            <style>{`
                /* ── Base ──────────────────────────────────── */
                .pd__page {
                    min-height: 100vh;
                    background: #fff;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    color: #212121;
                    padding-bottom: 80px; /* room for sticky bar */
                }

                /* ── Section shells ─────────────────────────── */
                .pd__section { padding: 72px 20px; }
                .pd__section--white { background: #ffffff; }
                .pd__section--green { background: #E8F5E9; }
                .pd__section-inner { max-width: 1080px; margin: 0 auto; }
                .pd__section-inner--narrow { max-width: 760px; }

                /* Section badge + title */
                .pd__sec-badge {
                    display: inline-block;
                    background: #E8F5E9;
                    color: #2d8a3e;
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    padding: 5px 14px;
                    border-radius: 20px;
                    border: 1px solid #A5D6A7;
                    margin-bottom: 14px;
                }
                .pd__sec-title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(24px, 4vw, 38px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 32px;
                    line-height: 1.15;
                }

                /* ══ SECTION 1 ══════════════════════════════ */
                .pd__atf {
                    background: #f7fdf7;
                    border-bottom: 1px solid #C8E6C9;
                    padding: 48px 20px 56px;
                }
                .pd__atf-inner {
                    max-width: 1080px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 56px;
                    align-items: start;
                }
                @media (max-width: 768px) {
                    .pd__atf-inner { grid-template-columns: 1fr; gap: 32px; }
                    .pd__details   { order: 2; }
                    .pd__gallery   { order: 1; }
                }

                /* Image gallery */
                .pd__gallery { display: flex; flex-direction: column; gap: 14px; }
                .pd__main-img-wrap {
                    position: relative;
                    aspect-ratio: 4/5;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid #C8E6C9;
                    background: #E8F5E9;
                }
                .pd__main-img     { object-fit: cover; }
                .pd__img-badge {
                    position: absolute;
                    top: 16px; right: 16px;
                    background: #fff;
                    color: #2d8a3e;
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 4px 12px;
                    border-radius: 20px;
                    border: 1px solid #A5D6A7;
                }
                .pd__thumbs { display: flex; gap: 10px; }
                .pd__thumb {
                    position: relative;
                    width: 80px; height: 80px;
                    flex-shrink: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 2px solid #C8E6C9;
                    cursor: pointer;
                    background: #E8F5E9;
                    transition: border-color 0.2s;
                }
                .pd__thumb--active { border-color: #2d8a3e; }
                .pd__thumb-img    { object-fit: cover; }

                /* Details */
                .pd__details  { display: flex; flex-direction: column; gap: 20px; }
                .pd__brand-tag {
                    display: inline-block;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #388E3C;
                    letter-spacing: 0.04em;
                }
                .pd__name {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(26px, 3.5vw, 38px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0;
                    line-height: 1.15;
                }
                .pd__rating-row { display: flex; align-items: center; gap: 10px; }
                .pd__stars      { font-size: 1rem; letter-spacing: 1px; }
                .pd__rating-count { font-size: 0.82rem; color: #888; }

                /* Price */
                .pd__price-block { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px 16px; }
                .pd__price-main {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: 2.4rem;
                    font-weight: 900;
                    color: #1a5c2a;
                    line-height: 1;
                }
                .pd__price-ship { font-size: 0.82rem; color: #888; }
                .pd__price-meta { display: flex; flex-direction: column; gap: 2px; align-self: flex-end; }

                /* Quick benefits */
                .pd__quick-benefits {
                    list-style: none;
                    padding: 0; margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .pd__quick-benefits li {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #2d5a2d;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                /* Quantity */
                .pd__qty-row  { display: flex; align-items: center; gap: 16px; }
                .pd__qty-label { font-size: 0.85rem; font-weight: 700; color: #555; }
                .pd__qty-ctrl {
                    display: flex;
                    align-items: center;
                    background: #E8F5E9;
                    border: 1.5px solid #A5D6A7;
                    border-radius: 12px;
                    overflow: hidden;
                }
                .pd__qty-btn {
                    width: 40px; height: 40px;
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #2d8a3e;
                    cursor: pointer;
                    transition: background 0.15s;
                    font-family: inherit;
                }
                .pd__qty-btn:hover { background: #C8E6C9; }
                .pd__qty-val {
                    width: 48px;
                    text-align: center;
                    font-size: 1.05rem;
                    font-weight: 800;
                    color: #1a5c2a;
                    border-left: 1px solid #A5D6A7;
                    border-right: 1px solid #A5D6A7;
                    height: 40px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Coupon */
                .pd__coupon { display: flex; flex-direction: column; gap: 6px; }
                .pd__coupon-row   { display: flex; gap: 8px; }
                .pd__coupon-input {
                    flex: 1;
                    background: #fff;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-size: 0.875rem;
                    color: #212121;
                    outline: none;
                    font-family: inherit;
                    transition: border-color 0.2s;
                }
                .pd__coupon-input:focus { border-color: #2d8a3e; }
                .pd__coupon-btn {
                    padding: 10px 16px;
                    background: #E8F5E9;
                    border: 1.5px solid #A5D6A7;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #2d8a3e;
                    cursor: pointer;
                    font-family: inherit;
                    transition: background 0.2s;
                    white-space: nowrap;
                }
                .pd__coupon-btn:hover { background: #C8E6C9; }
                .pd__coupon-msg { font-size: 0.8rem; margin: 0; }
                .pd__coupon-msg--ok  { color: #2d8a3e; font-weight: 600; }
                .pd__coupon-msg--err { color: #e53e3e; }

                /* Total */
                .pd__total-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #444;
                    padding: 10px 14px;
                    background: #f0faf0;
                    border-radius: 10px;
                    border: 1px solid #C8E6C9;
                }
                .pd__discount-tag {
                    display: inline-block;
                    font-size: 0.75rem;
                    color: #2d8a3e;
                    background: #E8F5E9;
                    border-radius: 10px;
                    padding: 1px 8px;
                    margin-left: 6px;
                }

                /* Buy Now button */
                .pd__buy-btn {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 800;
                    border: none;
                    border-radius: 16px;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(45, 138, 62, 0.35);
                    transition: all 0.2s;
                    font-family: inherit;
                    letter-spacing: 0.01em;
                }
                .pd__buy-btn:hover {
                    background: linear-gradient(135deg, #1a5c2a, #2d8a3e);
                    box-shadow: 0 10px 32px rgba(45, 138, 62, 0.45);
                    transform: translateY(-1px);
                }

                /* Trust line */
                .pd__trust-line {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 8px;
                    font-size: 0.78rem;
                    color: #666;
                    text-align: center;
                }
                .pd__trust-sep { color: #C8E6C9; }

                /* COD badge */
                .pd__cod-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 12px;
                    padding: 12px 14px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #2d5a2d;
                }

                /* ══ SECTION 2 ══════════════════════════════ */
                .pd__about-text {
                    font-size: 1rem;
                    color: #555;
                    line-height: 1.8;
                    margin: 0 0 16px;
                }
                .pd__about-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 8px;
                }
                .pd__pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 16px;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #1a5c2a;
                }

                /* ══ SECTION 3 ══════════════════════════════ */
                .pd__ing-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                }
                .pd__ing-card {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 16px;
                    padding: 18px;
                    transition: box-shadow 0.2s;
                }
                .pd__ing-card:hover { box-shadow: 0 4px 14px rgba(26, 92, 42, 0.1); }
                .pd__ing-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
                .pd__ing-name { display: block; font-size: 0.95rem; font-weight: 700; color: #1a5c2a; margin-bottom: 4px; }
                .pd__ing-desc { font-size: 0.85rem; color: #666; line-height: 1.5; margin: 0; }

                /* ══ SECTION 4 ══════════════════════════════ */
                .pd__steps { display: flex; flex-direction: column; gap: 0; }
                .pd__step {
                    display: flex;
                    align-items: flex-start;
                    gap: 18px;
                    padding: 24px;
                    background: #E8F5E9;
                    border: 1px solid #C8E6C9;
                    border-radius: 18px;
                    position: relative;
                }
                .pd__step-connector {
                    width: 2px;
                    height: 24px;
                    background: linear-gradient(#A5D6A7, #A5D6A7);
                    margin-left: 39px;
                }
                .pd__step-num {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 0.7rem;
                    font-weight: 900;
                    color: #fff;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    width: 30px; height: 30px;
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .pd__step-icon { font-size: 1.8rem; flex-shrink: 0; }
                .pd__step-body strong { display: block; font-size: 1rem; font-weight: 700; color: #1a5c2a; margin-bottom: 4px; }
                .pd__step-body p { font-size: 0.875rem; color: #555; line-height: 1.6; margin: 0; }

                /* ══ SECTION 5 ══════════════════════════════ */
                .pd__benefit-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                }
                .pd__benefit-card {
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 18px;
                    padding: 24px;
                    text-align: center;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .pd__benefit-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(26, 92, 42, 0.12);
                }
                .pd__benefit-icon  { font-size: 2rem; margin-bottom: 12px; display: block; }
                .pd__benefit-title { font-size: 1rem; font-weight: 800; color: #1a5c2a; margin: 0 0 8px; }
                .pd__benefit-desc  { font-size: 0.85rem; color: #666; line-height: 1.6; margin: 0; }

                /* ══ SECTION 6 ══════════════════════════════ */
                .pd__reviews-summary {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 28px;
                    padding: 20px;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 16px;
                    width: fit-content;
                }
                .pd__reviews-score {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 3rem;
                    font-weight: 900;
                    color: #1a5c2a;
                    line-height: 1;
                }
                .pd__reviews-count { font-size: 0.8rem; color: #666; margin: 4px 0 0; }
                .pd__reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 18px;
                }
                .pd__review-card {
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 16px;
                    padding: 22px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .pd__review-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .pd__review-avatar {
                    width: 38px; height: 38px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 800;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .pd__review-name { display: block; font-size: 0.9rem; font-weight: 700; color: #212121; }
                .pd__review-city { display: block; font-size: 0.75rem; color: #888; }
                .pd__review-text { font-size: 0.875rem; color: #444; line-height: 1.65; margin: 0; font-style: italic; }
                .pd__review-verified { font-size: 0.72rem; color: #2d8a3e; font-weight: 700; }

                /* ══ SECTION 7 ══════════════════════════════ */
                .pd__ship-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 16px;
                }
                .pd__ship-card {
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .pd__ship-icon  { font-size: 1.6rem; }
                .pd__ship-card strong { font-size: 0.95rem; font-weight: 800; color: #1a5c2a; }
                .pd__ship-card p { font-size: 0.82rem; color: #666; line-height: 1.5; margin: 0; }

                /* ══ SECTION 8 ══════════════════════════════ */
                .pd__faq-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
                .pd__faq-item {
                    border: 1.5px solid #E8F5E9;
                    border-radius: 14px;
                    overflow: hidden;
                    transition: border-color 0.2s;
                }
                .pd__faq-item:hover { border-color: #A5D6A7; }
                .pd__faq-item--open { border-color: #2d8a3e; }
                .pd__faq-q {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 18px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #212121;
                    text-align: left;
                    transition: background 0.15s;
                }
                .pd__faq-q:hover { background: #f7fdf7; }
                .pd__faq-item--open .pd__faq-q { background: #f0faf0; }
                .pd__faq-chevron { font-size: 1rem; color: #888; transition: transform 0.25s; flex-shrink: 0; }
                .pd__faq-chevron--open { transform: rotate(180deg); color: #2d8a3e; }
                .pd__faq-a-wrap { overflow: hidden; transition: max-height 0.3s ease; }
                .pd__faq-a { font-size: 0.875rem; color: #555; line-height: 1.65; margin: 0; padding: 0 18px 16px; }
                .pd__faq-more { text-align: center; }
                .pd__faq-more-link {
                    color: #2d8a3e;
                    font-weight: 700;
                    text-decoration: none;
                    font-size: 0.9rem;
                    border-bottom: 1.5px solid #A5D6A7;
                    padding-bottom: 2px;
                    transition: color 0.2s;
                }
                .pd__faq-more-link:hover { color: #1a5c2a; }

                /* ══ MOBILE STICKY BAR ══════════════════════ */
                .pd__sticky-bar {
                    display: none;
                    position: fixed;
                    bottom: 0; left: 0; right: 0;
                    z-index: 100;
                    background: #fff;
                    border-top: 1.5px solid #C8E6C9;
                    padding: 12px 20px;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    box-shadow: 0 -4px 20px rgba(26, 92, 42, 0.10);
                }
                @media (max-width: 768px) {
                    .pd__sticky-bar { display: flex; }
                    .pd__page       { padding-bottom: 80px; }
                }
                .pd__sticky-info { display: flex; flex-direction: column; }
                .pd__sticky-name { font-size: 0.85rem; font-weight: 700; color: #212121; }
                .pd__sticky-price {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1.2rem;
                    font-weight: 900;
                    color: #1a5c2a;
                }
                .pd__sticky-btn {
                    padding: 12px 28px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 800;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    font-family: inherit;
                    box-shadow: 0 4px 14px rgba(45, 138, 62, 0.30);
                    white-space: nowrap;
                    transition: background 0.2s;
                }
                .pd__sticky-btn:hover { background: linear-gradient(135deg, #1a5c2a, #2d8a3e); }
            `}</style>
        </div>
    );
}
