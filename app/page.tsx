"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const INGREDIENTS = [
  { name: "Bhringraj", desc: "Known to promote growth and reduce fall." },
  { name: "Amla", desc: "Rich in Vitamin C, strengthens hair." },
  { name: "Brahmi", desc: "Calms scalp and supports healthy follicles." },
  { name: "Neem", desc: "Antibacterial properties for a clean scalp." },
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

/* ─────────────────────────── HELPERS ─────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <span className="hm__stars" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? "#f59e0b" : "#E0E0E0" }}>★</span>
      ))}
    </span>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const buyNow = () => {
    localStorage.setItem("sanjari_qty", "1");
    window.location.href = "/checkout";
  };

  return (
    <div className="hm__page">

      {/* ══════════════════════════════════════════════
                1️⃣ HERO SECTION
            ══════════════════════════════════════════════ */}
      <section className="hm__hero">
        <div className="hm__hero-inner">
          {/* LEFT: Content */}
          <div className="hm__hero-content">
            <h1 className="hm__hero-title">
              Sanajri Herbal Hair Oil <br />
              <span className="hm__hero-subtitle">Natural Care for Stronger, Healthier Hair</span>
            </h1>
            <p className="hm__hero-desc">
              Ayurvedic formula designed to nourish roots and support healthy hair growth.
            </p>

            <ul className="hm__hero-bullets">
              <li>✔ Supports Hair Growth</li>
              <li>✔ Strengthens Roots</li>
              <li>✔ Reduces Hair Fall</li>
            </ul>

            <div className="hm__hero-cta-wrap">
              <button onClick={buyNow} className="hm__buy-btn">
                Buy Now – ₹{ITEM_PRICE}
              </button>
              <p className="hm__hero-shipping">₹60 Shipping | COD Available</p>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="hm__hero-image">
            <div className="hm__hero-img-wrap">
              <Image
                src="/product-hero.png"
                alt="Sanjari Herbal Hair Oil Bottle"
                fill
                className="hm__hero-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                2️⃣ TRUST STRIP
            ══════════════════════════════════════════════ */}
      <section className="hm__trust-strip">
        <div className="hm__trust-inner">
          <div className="hm__trust-item">
            <span className="hm__trust-icon">🌿</span>
            <span className="hm__trust-text">100% Herbal</span>
          </div>
          <div className="hm__trust-item">
            <span className="hm__trust-icon">💵</span>
            <span className="hm__trust-text">COD Available</span>
          </div>
          <div className="hm__trust-item">
            <span className="hm__trust-icon">🇮🇳</span>
            <span className="hm__trust-text">Pan India Shipping</span>
          </div>
          <div className="hm__trust-item">
            <span className="hm__trust-icon">🔒</span>
            <span className="hm__trust-text">Secure Payments</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                3️⃣ PRODUCT BENEFITS
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--white" id="benefits">
        <div className="hm__section-inner text-center">
          <h2 className="hm__sec-title">Why Choose Sanajri?</h2>

          <div className="hm__benefit-grid">
            <div className="hm__benefit-card">
              <div className="hm__benefit-icon">🍃</div>
              <h3 className="hm__benefit-title">Herbal Formula</h3>
            </div>
            <div className="hm__benefit-card">
              <div className="hm__benefit-icon">🌱</div>
              <h3 className="hm__benefit-title">Root Nourishment</h3>
            </div>
            <div className="hm__benefit-card">
              <div className="hm__benefit-icon">🛡️</div>
              <h3 className="hm__benefit-title">Reduces Breakage</h3>
            </div>
            <div className="hm__benefit-card">
              <div className="hm__benefit-icon">👨‍👩‍👧</div>
              <h3 className="hm__benefit-title">For Men & Women</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                4️⃣ INGREDIENT HIGHLIGHT
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--light" id="ingredients">
        <div className="hm__section-inner text-center">
          <h2 className="hm__sec-title">Key Ingredients</h2>

          <div className="hm__ing-grid">
            {INGREDIENTS.map((ing, i) => (
              <div key={i} className="hm__ing-card">
                <strong className="hm__ing-name">{ing.name}</strong>
                <p className="hm__ing-desc">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                5️⃣ HOW TO USE
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--white" id="how-to-use">
        <div className="hm__section-inner text-center">
          <h2 className="hm__sec-title">How To Use</h2>

          <div className="hm__steps-grid">
            <div className="hm__step-card">
              <div className="hm__step-icon">🖐️</div>
              <h3 className="hm__step-title">1. Apply</h3>
              <p className="hm__step-desc">Apply oil directly to the scalp and hair roots.</p>
            </div>
            <div className="hm__step-card">
              <div className="hm__step-icon">💆</div>
              <h3 className="hm__step-title">2. Massage</h3>
              <p className="hm__step-desc">Massage gently in circular motions.</p>
            </div>
            <div className="hm__step-card">
              <div className="hm__step-icon">🚿</div>
              <h3 className="hm__step-title">3. Wash</h3>
              <p className="hm__step-desc">Leave for a few hours or overnight, then wash.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                6️⃣ REAL CUSTOMER REVIEWS
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--light" id="reviews">
        <div className="hm__section-inner">
          <h2 className="hm__sec-title text-center">Customer Reviews</h2>

          <div className="hm__reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="hm__review-card">
                <div className="hm__review-header">
                  <div className="hm__review-avatar">{r.name[0]}</div>
                  <div>
                    <strong className="hm__review-name">{r.name}</strong>
                    <span className="hm__review-city">{r.city}</span>
                  </div>
                  <Stars count={r.stars} />
                </div>
                <p className="hm__review-text">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                7️⃣ DELIVERY & POLICY SUMMARY
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--white" id="delivery">
        <div className="hm__section-inner">
          <div className="hm__delivery-grid">
            <div className="hm__delivery-item">
              <span className="hm__delivery-icon">📅</span>
              <span className="hm__delivery-text">5–10 days delivery</span>
            </div>
            <div className="hm__delivery-item">
              <span className="hm__delivery-icon">🔄</span>
              <span className="hm__delivery-text">Damage replacement only</span>
            </div>
            <div className="hm__delivery-item">
              <span className="hm__delivery-icon">🚫</span>
              <span className="hm__delivery-text">No refunds</span>
            </div>
            <div className="hm__delivery-item">
              <span className="hm__delivery-icon">🔒</span>
              <span className="hm__delivery-text">Secure Razorpay payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                8️⃣ FAQ PREVIEW
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--light" id="faq">
        <div className="hm__section-inner hm__section-inner--narrow">
          <h2 className="hm__sec-title text-center">Frequently Asked Questions</h2>
          <div className="hm__faq-list">
            {FAQS_SHORT.map((item, i) => (
              <div
                key={i}
                className={`hm__faq-item${openFaq === i ? " hm__faq-item--open" : ""}`}
              >
                <button
                  className="hm__faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className={`hm__faq-chevron${openFaq === i ? " hm__faq-chevron--open" : ""}`}>▾</span>
                </button>
                <div className="hm__faq-a-wrap" style={{ maxHeight: openFaq === i ? "500px" : "0" }}>
                  <p className="hm__faq-a">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="hm__faq-more text-center mt-6">
            <Link href="/faqs" className="hm__faq-more-link">Read all FAQs →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                9️⃣ FINAL CTA SECTION
            ══════════════════════════════════════════════ */}
      <section className="hm__section hm__section--green text-center">
        <div className="hm__section-inner">
          <h2 className="hm__sec-title hm__sec-title--large">Start Your Hair Care Journey Today</h2>
          <button onClick={buyNow} className="hm__buy-btn hm__buy-btn--large mx-auto">
            Buy Now – ₹{ITEM_PRICE}
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                📱 MOBILE STICKY BAR
            ══════════════════════════════════════════════ */}
      <div className="hm__sticky-bar" aria-label="Quick purchase">
        <button onClick={buyNow} className="hm__buy-btn hm__buy-btn--full">
          Buy Now – ₹{ITEM_PRICE}
        </button>
      </div>

      {/* ══════════════════════════════════════════════
                STYLES
            ══════════════════════════════════════════════ */}
      <style>{`
                /* ── Base ──────────────────────────────────── */
                .hm__page {
                    min-height: 100vh;
                    background: #fff;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    color: #212121;
                    padding-bottom: 80px; /* room for sticky bar */
                }
                
                .text-center { text-align: center; }
                .mx-auto { margin-left: auto; margin-right: auto; }
                .mt-6 { margin-top: 24px; }

                /* ── Section shells ─────────────────────────── */
                .hm__section { padding: 80px 20px; }
                .hm__section--white { background: #ffffff; }
                .hm__section--light { background: #fafdfa; }
                .hm__section--green { background: #E8F5E9; }
                .hm__section-inner { max-width: 1080px; margin: 0 auto; }
                .hm__section-inner--narrow { max-width: 760px; }

                .hm__sec-title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(28px, 4vw, 36px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 40px;
                    line-height: 1.2;
                }
                .hm__sec-title--large {
                    font-size: clamp(32px, 5vw, 44px);
                    margin-bottom: 32px;
                }

                /* ── Buy Button ─────────────────────────────── */
                .hm__buy-btn {
                    padding: 16px 32px;
                    background: linear-gradient(135deg, #2d8a3e, #1a5c2a);
                    color: #fff;
                    font-size: 1.15rem;
                    font-weight: 800;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(45, 138, 62, 0.35);
                    transition: all 0.2s;
                    font-family: inherit;
                    letter-spacing: 0.02em;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
                .hm__buy-btn:hover {
                    background: linear-gradient(135deg, #1a5c2a, #2d8a3e);
                    box-shadow: 0 10px 32px rgba(45, 138, 62, 0.45);
                    transform: translateY(-2px);
                }
                .hm__buy-btn--large {
                    padding: 18px 48px;
                    font-size: 1.25rem;
                    border-radius: 16px;
                }
                .hm__buy-btn--full {
                    width: 100%;
                    padding: 16px;
                    border-radius: 12px;
                }

                /* ══ 1️⃣ HERO SECTION ═════════════════════════ */
                .hm__hero {
                    background: #fff;
                    padding: 60px 20px 40px;
                }
                .hm__hero-inner {
                    max-width: 1120px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 60px;
                    align-items: center;
                }
                @media (max-width: 900px) {
                    .hm__hero-inner { 
                        grid-template-columns: 1fr; 
                        gap: 20px; 
                        text-align: center;
                    }
                    .hm__hero-content { order: 1; display: flex; flex-direction: column; align-items: center; }
                    .hm__hero-bullets { align-items: flex-start; } /* keep left aligned if preferred, or center */
                    .hm__hero-image { order: 2; margin-top: 20px;}
                }

                .hm__hero-title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(38px, 5vw, 56px);
                    font-weight: 900;
                    color: #1a5c2a;
                    line-height: 1.1;
                    margin: 0 0 16px;
                    letter-spacing: -0.02em;
                }
                .hm__hero-subtitle {
                    display: block;
                    font-size: clamp(20px, 2.5vw, 28px);
                    color: #2d8a3e;
                    font-weight: 700;
                    margin-top: 8px;
                }
                .hm__hero-desc {
                    font-size: 1.1rem;
                    color: #555;
                    line-height: 1.6;
                    margin: 0 0 24px;
                    max-width: 500px;
                }

                .hm__hero-bullets {
                    list-style: none;
                    padding: 0; margin: 0 0 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .hm__hero-bullets li {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #212121;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                @media (max-width: 900px) {
                    .hm__hero-bullets { align-items: center; }
                }

                .hm__hero-cta-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                @media (max-width: 900px) {
                    .hm__hero-cta-wrap { width: 100%; max-width: 400px; }
                    .hm__hero-cta-wrap .hm__buy-btn { width: 100%; }
                }

                .hm__hero-shipping {
                    font-size: 0.85rem;
                    color: #666;
                    font-weight: 600;
                    margin: 0;
                }

                .hm__hero-image { display: flex; justify-content: center; }
                .hm__hero-img-wrap {
                    position: relative;
                    width: 100%;
                    max-width: 450px;
                    aspect-ratio: 4/5;
                    border-radius: 32px;
                    overflow: hidden;
                    background: #fafdfa;
                    border: 1px solid #E8F5E9;
                }
                .hm__hero-img { object-fit: cover; }

                /* ══ 2️⃣ TRUST STRIP ═════════════════════════ */
                .hm__trust-strip {
                    background: #E8F5E9;
                    padding: 24px 20px;
                    border-top: 1px solid #C8E6C9;
                    border-bottom: 1px solid #C8E6C9;
                }
                .hm__trust-inner {
                    max-width: 1080px;
                    margin: 0 auto;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    align-items: center;
                    gap: 20px;
                }
                .hm__trust-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .hm__trust-icon { font-size: 1.5rem; }
                .hm__trust-text {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #1a5c2a;
                }

                /* ══ 3️⃣ PRODUCT BENEFITS ════════════════════ */
                .hm__benefit-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 24px;
                }
                .hm__benefit-card {
                    background: #fff;
                    border: 1px solid #E0E0E0;
                    border-radius: 16px;
                    padding: 32px 20px;
                    text-align: center;
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .hm__benefit-card:hover { 
                    box-shadow: 0 10px 30px rgba(26, 92, 42, 0.08);
                    transform: translateY(-4px); 
                    border-color: #C8E6C9;
                }
                .hm__benefit-icon { font-size: 2.5rem; margin-bottom: 16px; }
                .hm__benefit-title { font-size: 1.1rem; font-weight: 800; color: #212121; margin: 0; }

                /* ══ 4️⃣ INGREDIENT HIGHLIGHT ════════════════ */
                .hm__ing-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 20px;
                }
                .hm__ing-card {
                    background: #fff;
                    border: 1px solid #C8E6C9;
                    border-radius: 16px;
                    padding: 24px;
                    text-align: left;
                }
                .hm__ing-name { display: block; font-size: 1.1rem; font-weight: 800; color: #1a5c2a; margin-bottom: 8px; }
                .hm__ing-desc { font-size: 0.9rem; color: #555; line-height: 1.5; margin: 0; }

                /* ══ 5️⃣ HOW TO USE ══════════════════════════ */
                .hm__steps-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 24px;
                }
                .hm__step-card {
                    background: #fafdfa;
                    border: 1px dashed #C8E6C9;
                    border-radius: 20px;
                    padding: 32px 24px;
                }
                .hm__step-icon { font-size: 2.5rem; margin-bottom: 16px; }
                .hm__step-title { font-size: 1.2rem; font-weight: 800; color: #1a5c2a; margin: 0 0 12px; }
                .hm__step-desc { font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0; }

                /* ══ 6️⃣ REVIEWS ═════════════════════════════ */
                .hm__reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }
                .hm__review-card {
                    background: #fff;
                    border: 1px solid #E0E0E0;
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .hm__review-header { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
                .hm__review-avatar {
                    width: 44px; height: 44px;
                    border-radius: 50%;
                    background: #E8F5E9;
                    color: #1a5c2a;
                    font-size: 1.1rem;
                    font-weight: 800;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .hm__review-name { display: block; font-size: 1rem; font-weight: 700; color: #212121; }
                .hm__review-city { display: block; font-size: 0.8rem; color: #888; }
                .hm__review-text { font-size: 0.95rem; color: #444; line-height: 1.6; margin: 0; font-style: italic; }
                .hm__stars { font-size: 1.1rem; letter-spacing: 1px; }

                /* ══ 7️⃣ DELIVERY & POLICY ═══════════════════ */
                .hm__delivery-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 24px;
                    background: #fafdfa;
                    padding: 32px;
                    border-radius: 20px;
                    border: 1px solid #E0E0E0;
                }
                .hm__delivery-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #fff;
                    padding: 12px 20px;
                    border-radius: 12px;
                    border: 1px solid #E0E0E0;
                }
                .hm__delivery-icon { font-size: 1.4rem; }
                .hm__delivery-text { font-size: 0.9rem; font-weight: 700; color: #444; }

                /* ══ 8️⃣ FAQ ═════════════════════════════════ */
                .hm__faq-list { display: flex; flex-direction: column; gap: 8px; }
                .hm__faq-item {
                    background: #fff;
                    border: 1px solid #E0E0E0;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: border-color 0.2s;
                }
                .hm__faq-item:hover { border-color: #C8E6C9; }
                .hm__faq-item--open { border-color: #2d8a3e; }
                .hm__faq-q {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 16px;
                    padding: 18px 20px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 700;
                    color: #212121;
                    text-align: left;
                    transition: background 0.15s;
                }
                .hm__faq-item--open .hm__faq-q { background: #f0faf0; }
                .hm__faq-chevron { font-size: 1.2rem; color: #888; transition: transform 0.25s; flex-shrink: 0; }
                .hm__faq-chevron--open { transform: rotate(180deg); color: #2d8a3e; }
                .hm__faq-a-wrap { overflow: hidden; transition: max-height 0.3s ease; }
                .hm__faq-a { font-size: 0.95rem; color: #555; line-height: 1.6; margin: 0; padding: 0 20px 20px; }
                .hm__faq-more-link {
                    display: inline-block;
                    color: #2d8a3e;
                    font-weight: 700;
                    text-decoration: none;
                    font-size: 1rem;
                    border-bottom: 2px solid #A5D6A7;
                    padding-bottom: 2px;
                    transition: color 0.2s;
                }
                .hm__faq-more-link:hover { color: #1a5c2a; }

                /* ══ 📱 MOBILE STICKY BAR ═══════════════════ */
                .hm__sticky-bar {
                    display: none;
                    position: fixed;
                    bottom: 0; left: 0; right: 0;
                    z-index: 100;
                    background: #fff;
                    border-top: 1px solid #E0E0E0;
                    padding: 12px 16px;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
                }
                @media (max-width: 768px) {
                    .hm__sticky-bar { display: block; }
                    .hm__page { padding-bottom: 84px; }
                }

            `}</style>
    </div>
  );
}
