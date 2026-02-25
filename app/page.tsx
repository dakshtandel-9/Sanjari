"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const INGREDIENTS = [
  { name: "Coconut Oil (70ml)", desc: "100% pure base oil that deeply conditions the scalp and provides essential fatty acids.", icon: "/KeyIngredients/1.png" },
  { name: "Virgin Amla Oil (10ml)", desc: "Rich in Vitamin C; prevents premature greying and strengthens hair roots.", icon: "/KeyIngredients/2.png" },
  { name: "Virgin Olive Oil (10ml)", desc: "Natural moisturiser that improves hair elasticity and reduces breakage.", icon: "/KeyIngredients/3.png" },
  { name: "Bhringraj Oil (05ml)", desc: "The 'King of Herbs' that stimulates hair follicles and promotes dense growth.", icon: "/KeyIngredients/4.png" },
  { name: "Brahmi Oil (05ml)", desc: "Calms the nerves and nourishes the scalp to reduce dandruff and itching.", icon: "/KeyIngredients/5.png" },
  { name: "Aritha Extracts (2gm)", desc: "Natural cleanser that removes dirt and excess oil without stripping moisture.", icon: "/KeyIngredients/6.png" },
  { name: "Alovera Extract (5gm)", desc: "Soothes the scalp and acts as a natural conditioner for silky, smooth hair.", icon: "/KeyIngredients/7.png" },
];

const BENEFITS = [
  { icon: "/Benefits/1.png", title: "Hair Growth Support", desc: "Ayurvedic herbs like Bhringraj and Brahmi work at the root level to support natural hair growth cycles." },
  { icon: "/Benefits/2.png", title: "Stronger Roots", desc: "Regular application nourishes follicles with essential nutrients, reducing weakness at the root." },
  { icon: "/Benefits/3.png", title: "Reduced Hair Fall", desc: "Strengthens the hair shaft and improves root grip, helping reduce excessive daily hair loss." },
  { icon: "/Benefits/4.png", title: "Scalp Nourishment", desc: "Natural oils penetrate deep to hydrate a dry, flaky scalp and maintain a healthy environment for hair." },
];

const REVIEWS = [
  { name: "Priya S.", city: "Mumbai", stars: 5, text: "Been using for 6 weeks and my hair fall has noticeably reduced. Smells natural and applies easily. Very happy with the product.", image: "https://i.pravatar.cc/150?u=priya" },
  { name: "Ravi K.", city: "Bangalore", stars: 5, text: "My wife recommended this. Honestly didn't expect much but the scalp feels so much better after 3–4 uses. Will order again.", image: "https://i.pravatar.cc/150?u=ravi" },
  { name: "Anita M.", city: "Delhi", stars: 4, text: "Good herbal oil. Packaging was intact, delivery was on time. Takes time to show results but it's worth it for regular use.", image: "https://i.pravatar.cc/150?u=anita" },
  { name: "Suresh P.", city: "Chennai", stars: 5, text: "Very good product. Natural smell, not heavy like other oils. My hair feels stronger. COD option made it easy to order.", image: "https://i.pravatar.cc/150?u=suresh" },
  { name: "Meera K.", city: "Hyderabad", stars: 5, text: "I was skeptical but this oil is actually quite good. My hair feels much softer and the frizz is under control.", image: "https://i.pravatar.cc/150?u=meera" },
  { name: "Arjun V.", city: "Kochi", stars: 5, text: "Strong herbal scent which I personally love. It feels like real Ayurveda. Great for scalp health.", image: "https://i.pravatar.cc/150?u=arjun" },
  { name: "Sunita R.", city: "Pune", stars: 5, text: "Best hair oil I've used so far. The packaging is premium and the product is even better. My hair fall has decreased significantly.", image: "https://i.pravatar.cc/150?u=sunita" },
  { name: "Vikram S.", city: "Jaipur", stars: 4, text: "Decent product. Takes a bit of time to wash off because it's thick, but the results are good. Smells like herbs.", image: "https://i.pravatar.cc/150?u=vikram" },
  { name: "Kavita B.", city: "Ahmedabad", stars: 5, text: "Value for money! You get a good quantity for the price, and the quality is top-notch. Seeing less hair on my brush now.", image: "https://i.pravatar.cc/150?u=kavita" },
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
    <span className="pd__stars" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? "#f59e0b" : "#E0E0E0" }}>★</span>
      ))}
    </span>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);
  const benefitsScrollRef = useRef<HTMLDivElement>(null);

  // Hero slider state
  const [slides, setSlides] = useState<{ id: number; image_url: string; mobile_image_url?: string; title: string; subtitle: string }[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const buyNow = () => {
    localStorage.setItem("sanjari_qty", "1");
    window.location.href = "/checkout";
  };

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % Math.max(slides.length, 1));
  }, [slides.length]);

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + Math.max(slides.length, 1)) % Math.max(slides.length, 1));
  };

  const goToSlide = (idx: number) => {
    setActiveSlide(idx);
    // Reset the auto-timer
    if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    sliderTimerRef.current = setInterval(nextSlide, 4500);
  };

  useEffect(() => {
    fetch("/api/admin/slides")
      .then(r => r.json())
      .then(data => { if (data.slides) setSlides(data.slides); })
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    sliderTimerRef.current = setInterval(nextSlide, 4500);
    return () => { if (sliderTimerRef.current) clearInterval(sliderTimerRef.current); };
  }, [slides.length, nextSlide]);

  // Auto-scrolling logic helper
  const setupAutoScroll = (ref: React.RefObject<HTMLDivElement | null>, speed: number) => {
    const el = ref.current;
    if (!el) return;

    let animationId: number;
    let isMouseOver = false;

    const scroll = () => {
      if (!isMouseOver) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => { isMouseOver = true; };
    const handleMouseLeave = () => { isMouseOver = false; };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  useEffect(() => {
    const cleanup1 = setupAutoScroll(scrollRef, 0.8);
    const cleanup2 = setupAutoScroll(benefitsScrollRef, 0.7);
    const cleanup3 = setupAutoScroll(reviewsScrollRef, 0.6);

    return () => {
      cleanup1?.();
      cleanup2?.();
      cleanup3?.();
    };
  }, []);

  return (
    <div className="pd__page">

      {/* ══════════════════════════════════════════════
                HERO SECTION — 70VH IMAGE SLIDER
            ══════════════════════════════════════════════ */}
      <section className="hp__hero">
        {/* Slide images */}
        <div className="hp__slider-track">
          {slides.length > 0 ? slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hp__slide ${idx === activeSlide ? "hp__slide--active" : ""}`}
              aria-hidden={idx !== activeSlide}
            >
              {/* Desktop layer */}
              <div
                className="hp__slide-layer hp__slide-layer--desktop"
                style={{ backgroundImage: `url('${slide.image_url}')` }}
              />
              {/* Mobile layer — falls back to desktop if no mobile image */}
              <div
                className="hp__slide-layer hp__slide-layer--mobile"
                style={{ backgroundImage: `url('${slide.mobile_image_url || slide.image_url}')` }}
              />
            </div>
          )) : (
            <div className="hp__slide hp__slide--active hp__slide--fallback" />
          )}
        </div>

        {/* Dark overlay */}
        <div className="hp__hero-overlay">
          <div className="hp__hero-content">
            <span className="pd__brand-tag" style={{ color: '#fff' }}>🌿 Purely Ayurvedic</span>
            <h1 className="hp__hero-title">
              {slides[activeSlide]?.title || "Sanjari Herbal Hair Oil"}
            </h1>
            <p className="hp__hero-desc">
              {slides[activeSlide]?.subtitle || "Experience the power of nature for stronger, thicker, and healthier hair."}
            </p>

            <div className="hp__hero-btns">
              <button onClick={buyNow} className="pd__buy-btn hp__hero-btn">
                Buy Now — ₹{ITEM_PRICE}
              </button>
              <Link href="#about" className="hp__secondary-btn">Learn More</Link>
            </div>

            <div className="hp__hero-trust">
              <div className="pd__trust-item-sm" style={{ color: '#fff' }}>
                <Image src="/homePageIcon/4.png" alt="Secure" width={16} height={16} className="pd__trust-icon-sm" style={{ filter: 'brightness(0) invert(1)' }} />
                <span>Secure Payment</span>
              </div>
              <div className="pd__trust-item-sm" style={{ color: '#fff' }}>
                <Image src="/homePageIcon/3.png" alt="COD" width={16} height={16} className="pd__trust-icon-sm" style={{ filter: 'brightness(0) invert(1)' }} />
                <span>COD Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows (only when >1 slides) */}
        {slides.length > 1 && (
          <>
            <button className="hp__slider-arrow hp__slider-arrow--prev" onClick={prevSlide} aria-label="Previous slide">&#8249;</button>
            <button className="hp__slider-arrow hp__slider-arrow--next" onClick={nextSlide} aria-label="Next slide">&#8250;</button>
          </>
        )}

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="hp__slider-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`hp__slider-dot ${idx === activeSlide ? "hp__slider-dot--active" : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <div className="hp__hero-scroll">
          <div className="hp__scroll-dot"></div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
                TRUST BANNER
            ══════════════════════════════════════════════ */}
      <div className="hp__trust-strip">
        <div className="hp__trust-strip-inner">
          <div className="hp__trust-strip-item">
            <div className="hp__trust-strip-icon-wrap">
              <Image src="/homePageIcon/2.png" alt="Herbal" width={32} height={32} className="hp__trust-strip-img" />
            </div>
            <span>100% Herbal</span>
          </div>
          <div className="hp__trust-strip-item">
            <div className="hp__trust-strip-icon-wrap">
              <Image src="/homePageIcon/3.png" alt="COD" width={32} height={32} className="hp__trust-strip-img" />
            </div>
            <span>COD Available</span>
          </div>
          <div className="hp__trust-strip-item">
            <div className="hp__trust-strip-icon-wrap">
              <Image src="/homePageIcon/shipping_india.png" alt="Shipping" width={32} height={32} className="hp__trust-strip-img" />
            </div>
            <span>Pan India Shipping</span>
          </div>
          <div className="hp__trust-strip-item">
            <div className="hp__trust-strip-icon-wrap">
              <Image src="/homePageIcon/4.png" alt="Secure" width={32} height={32} className="hp__trust-strip-img" />
            </div>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>

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
            women of all hair types. Each bottle is designed for consistent, everyday care.
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
                SECTION 2.5 — BEFORE & AFTER
            ══════════════════════════════════════════════ */}
      <section className="pd__section" id="results" style={{ background: '#f9f9f9' }}>
        <div className="pd__section-inner">
          <span className="pd__sec-badge">Real Results</span>
          <h2 className="pd__sec-title">Visible Transformation</h2>
          <div className="pd__before-after-container">
            <div className="pd__comparison-card">
              <div className="pd__comparison-label pd__comparison-label--before">Before</div>
              <div className="pd__comparison-img-wrap">
                <Image
                  src="/BeforeAfterImage/before.png"
                  alt="Before using Sanjari"
                  fill
                  className="pd__comparison-img"
                />
              </div>
            </div>
            <div className="pd__comparison-card">
              <div className="pd__comparison-label pd__comparison-label--after">After</div>
              <div className="pd__comparison-img-wrap">
                <Image
                  src="/BeforeAfterImage/after.png"
                  alt="After using Sanjari"
                  fill
                  className="pd__comparison-img"
                />
              </div>
            </div>
            <div className="pd__comparison-card">
              <div className="pd__comparison-label pd__comparison-label--before">Before</div>
              <div className="pd__comparison-img-wrap">
                <Image
                  src="/BeforeAfterImage/Before1.png"
                  alt="Before using Sanjari"
                  fill
                  className="pd__comparison-img"
                />
              </div>
            </div>
            <div className="pd__comparison-card">
              <div className="pd__comparison-label pd__comparison-label--after">After</div>
              <div className="pd__comparison-img-wrap">
                <Image
                  src="/BeforeAfterImage/After2.png"
                  alt="After using Sanjari"
                  fill
                  className="pd__comparison-img"
                />
              </div>
            </div>
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
          <div className="pd__ing-grid" ref={scrollRef}>
            {[...INGREDIENTS, ...INGREDIENTS].map((ing, i) => (
              <div key={i} className="pd__ing-card">
                <div className="pd__ing-icon-wrap">
                  <Image
                    src={ing.icon}
                    alt={ing.name}
                    width={48}
                    height={48}
                    className="pd__ing-img"
                  />
                </div>
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
              <div className="pd__step-icon-wrap">
                <Image src="/HowToUse/1.png" alt="Apply" width={44} height={44} className="pd__step-img" />
              </div>
              <div className="pd__step-body">
                <strong>Apply to Scalp</strong>
                <p>Take a small amount of oil and apply directly to the scalp and hair roots.</p>
              </div>
            </div>
            <div className="pd__step-connector" aria-hidden="true" />
            <div className="pd__step">
              <div className="pd__step-num">02</div>
              <div className="pd__step-icon-wrap">
                <Image src="/HowToUse/2.png" alt="Massage" width={44} height={44} className="pd__step-img" />
              </div>
              <div className="pd__step-body">
                <strong>Massage Gently</strong>
                <p>Massage in circular motions for 3–5 minutes to improve absorption and circulation.</p>
              </div>
            </div>
            <div className="pd__step-connector" aria-hidden="true" />
            <div className="pd__step">
              <div className="pd__step-num">03</div>
              <div className="pd__step-icon-wrap">
                <Image src="/HowToUse/3.png" alt="Wash" width={44} height={44} className="pd__step-img" />
              </div>
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
          <div className="pd__benefit-grid" ref={benefitsScrollRef}>
            {[...BENEFITS, ...BENEFITS].map((b, i) => (
              <div key={i} className="pd__benefit-card">
                <div className="pd__benefit-icon-wrap">
                  <Image
                    src={b.icon}
                    alt={b.title}
                    width={48}
                    height={48}
                    className="pd__benefit-img"
                  />
                </div>
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
            <div className="pd__reviews-score">4.6</div>
            <div>
              <Stars count={5} />
              <p className="pd__reviews-count">Based on 142 verified purchases</p>
            </div>
          </div>
          <div className="pd__reviews-grid" ref={reviewsScrollRef}>
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div key={i} className="pd__review-card">
                <div className="pd__review-header">
                  <div className="pd__review-avatar">
                    <Image
                      src={r.image}
                      alt={r.name}
                      fill
                      className="pd__review-img"
                    />
                  </div>
                  <div className="pd__review-user-info">
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
                <div className="pd__faq-a-wrap" style={{ maxHeight: openFaq === i ? "500px" : "0" }}>
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
                CONTACT US SECTION
            ══════════════════════════════════════════════ */}
      <ContactSection />

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
                    padding-bottom: 0px; 
                }

                /* ── Section shells ─────────────────────────── */
                .pd__section { padding: 80px 20px; }
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

                /* ══ HP HERO SECTION ═════════════════════════ */
                .hp__hero {
                    position: relative;
                    height: 70vh;
                    min-height: 480px;
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #1a3a22;
                }

                /* ── Slider track & slides ── */
                .hp__slider-track {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }
                .hp__slide {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    transition: opacity 0.9s ease;
                }
                .hp__slide--active {
                    opacity: 1;
                }
                .hp__slide--fallback {
                    background: linear-gradient(135deg, #1a5c2a 0%, #2d8a3e 50%, #155a28 100%);
                }

                /* ── Desktop / Mobile image layers ── */
                .hp__slide-layer {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                }
                /* Desktop: show desktop layer, hide mobile */
                .hp__slide-layer--desktop { display: block; }
                .hp__slide-layer--mobile  { display: none; }
                /* Mobile: swap */
                @media (max-width: 768px) {
                    .hp__slide-layer--desktop { display: none; }
                    .hp__slide-layer--mobile  { display: block; }
                }

                /* Overlay */
                .hp__hero-overlay {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.42);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    text-align: center;
                }
                .hp__hero-content {
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                .hp__hero-title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(32px, 6vw, 60px);
                    font-weight: 900;
                    color: #fff;
                    line-height: 1.12;
                    margin: 0;
                    text-shadow: 0 4px 16px rgba(0,0,0,0.4);
                    transition: opacity 0.4s ease;
                }
                .hp__hero-desc {
                    font-size: clamp(1rem, 1.8vw, 1.25rem);
                    color: #eee;
                    max-width: 560px;
                    line-height: 1.55;
                    margin: 0;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.35);
                    transition: opacity 0.4s ease;
                }
                .hp__hero-btns {
                    display: flex;
                    gap: 16px;
                    margin-top: 8px;
                }
                @media (max-width: 600px) {
                    .hp__hero-btns { flex-direction: column; width: 100%; }
                    .hp__hero { height: 70vh; min-height: 420px; }
                }
                .hp__hero-btn {
                    max-width: 280px;
                    font-size: 1.1rem;
                    padding: 16px 36px;
                }
                .hp__secondary-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 14px 28px;
                    border: 2px solid #fff;
                    border-radius: 16px;
                    color: #fff;
                    font-weight: 800;
                    text-decoration: none;
                    transition: all 0.2s;
                    backdrop-filter: blur(4px);
                }
                .hp__secondary-btn:hover {
                    background: #fff;
                    color: #1a5c2a;
                }
                .hp__hero-trust {
                    display: flex;
                    gap: 20px;
                    margin-top: 16px;
                }

                /* ── Prev/Next arrows ── */
                .hp__slider-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 4;
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(6px);
                    border: 1.5px solid rgba(255,255,255,0.25);
                    color: #fff;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    font-size: 1.6rem;
                    line-height: 1;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                .hp__slider-arrow:hover { background: rgba(255,255,255,0.3); }
                .hp__slider-arrow--prev { left: 18px; }
                .hp__slider-arrow--next { right: 18px; }

                /* ── Dot indicators ── */
                .hp__slider-dots {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 4;
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                .hp__slider-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.45);
                    border: none;
                    cursor: pointer;
                    transition: all 0.25s;
                    padding: 0;
                }
                .hp__slider-dot--active {
                    background: #fff;
                    width: 24px;
                    border-radius: 4px;
                }

                /* ── Scroll indicator ── */
                .hp__hero-scroll {
                    position: absolute;
                    bottom: 26px;
                    right: 20px;
                    width: 28px;
                    height: 46px;
                    border: 2px solid rgba(255,255,255,0.4);
                    border-radius: 14px;
                    z-index: 3;
                }
                .hp__scroll-dot {
                    width: 5px;
                    height: 5px;
                    background: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: scroll-anim 2s infinite;
                }
                @keyframes scroll-anim {
                    0% { opacity: 1; transform: translate(-50%, 0); }
                    100% { opacity: 0; transform: translate(-50%, 18px); }
                }

                .pd__brand-tag {
                    display: inline-block;
                    font-size: 0.9rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                /* ── Product Section Styles (Copied from product page) ── */
                .pd__about-text { font-size: 1rem; color: #555; line-height: 1.8; margin: 0 0 16px; }
                .pd__about-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
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
                .pd__before-after-container { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                @media (max-width: 900px) { .pd__before-after-container { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 500px) { .pd__before-after-container { grid-template-columns: 1fr; } }
                .pd__comparison-card { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid #C8E6C9; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .pd__comparison-img-wrap { position: relative; aspect-ratio: 4/5; width: 100%; }
                .pd__comparison-img { object-fit: cover; }
                .pd__comparison-label { position: absolute; top: 16px; left: 16px; z-index: 2; padding: 4px 16px; border-radius: 12px; font-size: 0.82rem; font-weight: 800; text-transform: uppercase; color: #fff; }
                .pd__comparison-label--before { background: #666; }
                .pd__comparison-label--after { background: #2d8a3e; }

                .pd__ing-grid { display: flex; gap: 20px; overflow-x: auto; padding: 8px 4px 24px; -webkit-overflow-scrolling: touch; }
                .pd__ing-grid::-webkit-scrollbar { height: 6px; }
                .pd__ing-grid::-webkit-scrollbar-track { background: #E8F5E9; border-radius: 10px; }
                .pd__ing-grid::-webkit-scrollbar-thumb { background: #A5D6A7; border-radius: 10px; }
                .pd__ing-card { flex: 0 0 320px; display: flex; gap: 14px; align-items: flex-start; background: #E8F5E9; border: 1px solid #C8E6C9; border-radius: 16px; padding: 22px; transition: all 0.2s; box-shadow: 0 4px 12px rgba(26, 92, 42, 0.04); }
                .pd__ing-card:hover { box-shadow: 0 4px 14px rgba(26, 92, 42, 0.1); }
                .pd__ing-icon-wrap { width: 48px; height: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
                .pd__ing-img { object-fit: contain; mix-blend-mode: multiply; filter: brightness(1.08) contrast(1.08); }
                .pd__ing-name { display: block; font-size: 0.95rem; font-weight: 700; color: #1a5c2a; margin-bottom: 4px; }
                .pd__ing-desc { font-size: 0.85rem; color: #666; line-height: 1.5; margin: 0; }

                .pd__steps { display: flex; flex-direction: column; gap: 0; }
                .pd__step { display: flex; align-items: flex-start; gap: 18px; padding: 24px; background: #E8F5E9; border: 1px solid #C8E6C9; border-radius: 18px; position: relative; }
                .pd__step-connector { width: 2px; height: 24px; background: linear-gradient(#A5D6A7, #A5D6A7); margin-left: 39px; }
                .pd__step-num { font-family: var(--font-poppins, sans-serif); font-size: 0.7rem; font-weight: 900; color: #fff; background: linear-gradient(135deg, #2d8a3e, #388E3C); width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .pd__step-icon-wrap { width: 48px; height: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
                .pd__step-img { object-fit: contain; mix-blend-mode: multiply; filter: brightness(1.1) contrast(1.1); }
                .pd__step-body strong { display: block; font-size: 1rem; font-weight: 700; color: #1a5c2a; margin-bottom: 4px; }
                .pd__step-body p { font-size: 0.875rem; color: #555; line-height: 1.6; margin: 0; }

                .pd__benefit-grid { display: flex; gap: 20px; overflow-x: auto; padding: 8px 4px 24px; -webkit-overflow-scrolling: touch; }
                .pd__benefit-grid::-webkit-scrollbar { height: 6px; }
                .pd__benefit-grid::-webkit-scrollbar-track { background: #E8F5E9; border-radius: 10px; }
                .pd__benefit-grid::-webkit-scrollbar-thumb { background: #A5D6A7; border-radius: 10px; }
                .pd__benefit-card { flex: 0 0 260px; background: #E8F5E9; border: 1px solid #C8E6C9; border-radius: 18px; padding: 24px; text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
                .pd__benefit-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(26, 92, 42, 0.12); }
                .pd__benefit-icon-wrap { width: 64px; height: 64px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; }
                .pd__benefit-img { object-fit: contain; mix-blend-mode: multiply; filter: brightness(1.08) contrast(1.08); }
                .pd__benefit-title { font-size: 1rem; font-weight: 800; color: #1a5c2a; margin: 0 0 8px; }
                .pd__benefit-desc { font-size: 0.85rem; color: #666; line-height: 1.6; margin: 0; }

                .pd__reviews-summary { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; padding: 20px; background: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 16px; width: fit-content; }
                .pd__reviews-score { font-family: var(--font-poppins, sans-serif); font-size: 3rem; font-weight: 900; color: #1a5c2a; line-height: 1; }
                .pd__reviews-count { font-size: 0.8rem; color: #666; margin: 4px 0 0; }
                .pd__reviews-grid { display: flex; gap: 18px; overflow-x: auto; padding: 8px 4px 24px; -webkit-overflow-scrolling: touch; }
                .pd__reviews-grid::-webkit-scrollbar { height: 6px; }
                .pd__reviews-grid::-webkit-scrollbar-track { background: #E8F5E9; border-radius: 10px; }
                .pd__reviews-grid::-webkit-scrollbar-thumb { background: #A5D6A7; border-radius: 10px; }
                .pd__review-card { flex: 0 0 320px; background: #fff; border: 1px solid #C8E6C9; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px; }
                .pd__review-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
                .pd__review-avatar { width: 38px; height: 38px; border-radius: 50%; overflow: hidden; position: relative; flex-shrink: 0; border: 1.5px solid #2d8a3e; }
                .pd__review-img { object-fit: cover; }
                .pd__review-user-info { flex: 1; }
                .pd__review-name { display: block; font-size: 0.9rem; font-weight: 700; color: #212121; }
                .pd__review-city { display: block; font-size: 0.75rem; color: #888; }
                .pd__review-text { font-size: 0.875rem; color: #444; line-height: 1.65; margin: 0; font-style: italic; }
                .pd__review-verified { font-size: 0.72rem; color: #2d8a3e; font-weight: 700; }

                .pd__faq-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
                .pd__faq-item { border: 1.5px solid #E8F5E9; border-radius: 14px; overflow: hidden; transition: border-color 0.2s; }
                .pd__faq-item:hover { border-color: #A5D6A7; }
                .pd__faq-item--open { border-color: #2d8a3e; }
                .pd__faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 16px 18px; background: none; border: none; cursor: pointer; font-family: inherit; font-size: 0.95rem; font-weight: 600; color: #212121; text-align: left; transition: background 0.15s; }
                .pd__faq-q:hover { background: #f7fdf7; }
                .pd__faq-item--open .pd__faq-q { background: #f0faf0; }
                .pd__faq-chevron { font-size: 1rem; color: #888; transition: transform 0.25s; flex-shrink: 0; }
                .pd__faq-chevron--open { transform: rotate(180deg); color: #2d8a3e; }
                .pd__faq-a-wrap { overflow: hidden; transition: max-height 0.3s ease; }
                .pd__faq-a { font-size: 0.875rem; color: #555; line-height: 1.65; margin: 0; padding: 0 18px 16px; }
                .pd__faq-more { text-align: center; }
                .pd__faq-more-link { color: #2d8a3e; font-weight: 700; text-decoration: none; font-size: 0.9rem; border-bottom: 1.5px solid #A5D6A7; padding-bottom: 2px; transition: color 0.2s; }
                .pd__faq-more-link:hover { color: #1a5c2a; }

                .pd__buy-btn {
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

                .pd__stars { font-size: 1rem; letter-spacing: 1px; }

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
                    .pd__page { padding-bottom: 80px; }
                }
                .pd__sticky-info { display: flex; flex-direction: column; }
                .pd__sticky-name { font-size: 0.85rem; font-weight: 700; color: #212121; }
                .pd__sticky-price { font-family: var(--font-poppins, sans-serif); font-size: 1.2rem; font-weight: 900; color: #1a5c2a; }
                .pd__sticky-btn { padding: 12px 28px; background: linear-gradient(135deg, #2d8a3e, #388E3C); color: #fff; font-size: 1rem; font-weight: 800; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; box-shadow: 0 4px 14px rgba(45, 138, 62, 0.30); white-space: nowrap; transition: background 0.2s; }
                .pd__sticky-btn:hover { background: linear-gradient(135deg, #1a5c2a, #2d8a3e); }

                .pd__trust-item-sm { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: #666; }
                .pd__trust-icon-sm { object-fit: contain; }

                /* ── Trust Strip ─────────────────────────── */
                .hp__trust-strip {
                    background: #F1F8F1;
                    padding: 24px 20px;
                    border-bottom: 1px solid #E0EEE0;
                }
                .hp__trust-strip-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    gap: 32px;
                    flex-wrap: wrap;
                }
                .hp__trust-strip-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    color: #1a5c2a;
                    font-weight: 700;
                }
                .hp__trust-strip-icon-wrap {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .hp__trust-strip-img {
                    width: 38px;
                    height: 38px;
                    object-fit: contain;
                    mix-blend-mode: multiply;
                }
                .hp__trust-strip-item span {
                    font-size: 1.1rem;
                    letter-spacing: -0.01em;
                }
                @media (max-width: 800px) {
                    .hp__trust-strip-inner {
                        gap: 20px;
                    }
                    .hp__trust-strip-item span {
                        font-size: 0.95rem;
                    }
                }
                @media (max-width: 600px) {
                    .hp__trust-strip { padding: 32px 20px; }
                    .hp__trust-strip-inner {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 24px;
                    }
                    .hp__trust-strip-item {
                        flex-direction: column;
                        text-align: center;
                        gap: 8px;
                    }
                }

                /* ── Contact Section ────────────────────── */
                .hp__contact {
                    background: #fff;
                    padding: 80px 20px;
                }
                .hp__contact-inner {
                    max-width: 1080px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: center;
                }
                @media (max-width: 820px) {
                    .hp__contact-inner { grid-template-columns: 1fr; gap: 40px; }
                }
                .hp__contact-left {}
                .hp__contact-badge {
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
                    margin-bottom: 16px;
                }
                .hp__contact-title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(26px, 4vw, 38px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 16px;
                    line-height: 1.15;
                }
                .hp__contact-desc {
                    font-size: 1rem;
                    color: #555;
                    line-height: 1.7;
                    margin: 0 0 32px;
                }
                .hp__contact-links { display: flex; flex-direction: column; gap: 14px; }
                .hp__contact-link {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    color: #212121;
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: color 0.2s;
                }
                .hp__contact-link:hover { color: #2d8a3e; }
                .hp__contact-link-icon {
                    width: 42px; height: 42px;
                    background: #E8F5E9;
                    border: 1px solid #C8E6C9;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                    transition: background 0.2s;
                }
                .hp__contact-link:hover .hp__contact-link-icon { background: #C8E6C9; }

                .hp__contact-form {
                    background: #f7fdf7;
                    border: 1px solid #C8E6C9;
                    border-radius: 24px;
                    padding: 36px;
                }
                .hp__contact-form-title {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1a5c2a;
                    margin: 0 0 24px;
                }
                .hp__contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-bottom: 14px;
                }
                @media (max-width: 500px) { .hp__contact-grid { grid-template-columns: 1fr; } }
                .hp__contact-field { display: flex; flex-direction: column; gap: 6px; }
                .hp__contact-label { font-size: 0.78rem; font-weight: 700; color: #2d8a3e; letter-spacing: 0.05em; text-transform: uppercase; }
                .hp__contact-input {
                    background: #fff;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 10px;
                    padding: 12px 14px;
                    font-size: 0.9rem;
                    color: #212121;
                    outline: none;
                    font-family: inherit;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .hp__contact-input:focus { border-color: #2d8a3e; box-shadow: 0 0 0 3px rgba(45,138,62,0.1); }
                .hp__contact-textarea {
                    resize: vertical;
                    min-height: 120px;
                    width: 100%;
                    box-sizing: border-box;
                    background: #fff;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 10px;
                    padding: 12px 14px;
                    font-size: 0.9rem;
                    color: #212121;
                    outline: none;
                    font-family: inherit;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    margin-bottom: 14px;
                    display: block;
                }
                .hp__contact-textarea:focus { border-color: #2d8a3e; box-shadow: 0 0 0 3px rgba(45,138,62,0.1); }
                .hp__contact-submit {
                    width: 100%;
                    padding: 15px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 800;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    font-family: inherit;
                    box-shadow: 0 6px 20px rgba(45, 138, 62, 0.3);
                    transition: all 0.2s;
                    letter-spacing: 0.01em;
                }
                .hp__contact-submit:hover { background: linear-gradient(135deg, #1a5c2a, #2d8a3e); box-shadow: 0 8px 28px rgba(45, 138, 62, 0.4); transform: translateY(-1px); }
                .hp__contact-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .hp__contact-success {
                    text-align: center;
                    padding: 24px;
                    color: #2d8a3e;
                    font-weight: 700;
                    font-size: 1rem;
                    background: #E8F5E9;
                    border-radius: 12px;
                    margin-top: 14px;
                }
            `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONTACT SECTION COMPONENT
══════════════════════════════════════════════ */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", data: form }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to send");
      }
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (e: any) {
      setErr(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="hp__contact" id="contact">
      <div className="hp__contact-inner">
        {/* Left: Info */}
        <div className="hp__contact-left">
          <span className="hp__contact-badge">Get in Touch</span>
          <h2 className="hp__contact-title">We&apos;d Love to<br />Hear From You</h2>
          <p className="hp__contact-desc">
            Have a question about our products, an order, or just want to share your experience?
            Our team is here to help — usually within 24 hours.
          </p>
          <div className="hp__contact-links">
            <a href="mailto:support@sanjari.in" className="hp__contact-link">
              <span className="hp__contact-link-icon">📧</span>
              support@sanjari.in
            </a>
            <a href="tel:+919876543210" className="hp__contact-link">
              <span className="hp__contact-link-icon">📞</span>
              +91 98765 43210
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hp__contact-link">
              <span className="hp__contact-link-icon">💬</span>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="hp__contact-form">
          <p className="hp__contact-form-title">Send Us a Message</p>
          {sent ? (
            <div className="hp__contact-success">
              ✅ Message sent! We&apos;ll get back to you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="hp__contact-grid">
                <div className="hp__contact-field">
                  <label className="hp__contact-label">Name *</label>
                  <input
                    name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    className="hp__contact-input"
                  />
                </div>
                <div className="hp__contact-field">
                  <label className="hp__contact-label">Phone</label>
                  <input
                    name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="hp__contact-input"
                  />
                </div>
              </div>
              <div className="hp__contact-field" style={{ marginBottom: 14 }}>
                <label className="hp__contact-label">Email *</label>
                <input
                  name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="hp__contact-input"
                />
              </div>
              <div className="hp__contact-field">
                <label className="hp__contact-label">Message *</label>
                <textarea
                  name="message" required
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="hp__contact-textarea"
                />
              </div>
              {err && <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: 10 }}>{err}</p>}
              <button type="submit" disabled={submitting} className="hp__contact-submit">
                {submitting ? "Sending..." : "Send Message 🌿"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
