"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── Social Icons ─── */
function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
    );
}
function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
    );
}
function WhatsappIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.102 1.523 5.822L.057 23.427a.5.5 0 00.611.612l5.675-1.484A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.953 9.953 0 01-5.083-1.39l-.364-.214-3.773.987.996-3.694-.235-.381A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
    );
}
function ChevronDown({ open }: { open: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

/* ─── Accordion (mobile only) ─── */
function AccordionGroup({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="ftr-accordion">
            <button className="ftr-accordion__btn" onClick={() => setOpen(v => !v)} aria-expanded={open}>
                <span>{title}</span>
                <ChevronDown open={open} />
            </button>
            <div className={`ftr-accordion__body${open ? " ftr-accordion__body--open" : ""}`}>
                {children}
            </div>
        </div>
    );
}

/* ─── Link helper ─── */
function FLink({ href, children }: { href: string; children: React.ReactNode }) {
    return <Link href={href} className="ftr-link">{children}</Link>;
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
export default function Footer() {
    return (
        <footer className="ftr" aria-label="Site footer">

            {/* ── TOP DIVIDER / brand stripe ── */}
            <div className="ftr__stripe" />

            {/* ── Main body ── */}
            <div className="ftr__body">
                <div className="ftr__grid">

                    {/* ── Col 1: Brand ── */}
                    <div className="ftr__col ftr__col--brand">
                        <Link href="/" className="ftr__logo-link" aria-label="Sanjari Home">
                            <Image src="/SANJARI.png" alt="Sanjari Herbal Hair Oil" width={130} height={42} className="ftr__logo" />
                        </Link>
                        <p className="ftr__tagline">
                            Natural Ayurvedic Hair Care for Stronger, Healthier Growth.
                        </p>
                        <address className="ftr__address">
                            <p>123, Green Valley, Koramangala</p>
                            <p>Bangalore, Karnataka – 560034</p>
                            <p><a href="tel:+917867078601">📞 +91 78670 78601</a></p>
                            <p><a href="mailto:sanjariherbalhairoil@gmail.com">✉️ sanjariherbalhairoil@gmail.com</a></p>

                        </address>
                        <div className="ftr__social" aria-label="Social media">
                            <a href="https://facebook.com" className="ftr__social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                            <a href="https://instagram.com" className="ftr__social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                            <a href="https://wa.me/917867078601" className="ftr__social-icon ftr__social-icon--wa" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsappIcon /></a>
                        </div>
                    </div>

                    {/* ── Col 2: Quick Links ── */}
                    <div className="ftr__col">
                        <h3 className="ftr__heading">Quick Links</h3>
                        <nav className="ftr__nav" aria-label="Quick links">
                            <FLink href="/">Home</FLink>
                            <FLink href="/product">Product</FLink>
                            <FLink href="/#benefits">Benefits</FLink>
                            <FLink href="/#how-it-works">How It Works</FLink>
                            <FLink href="/#reviews">Reviews</FLink>
                            <FLink href="/#contact">Contact</FLink>
                        </nav>
                    </div>

                    {/* ── Col 3: Customer Support ── */}
                    <div className="ftr__col">
                        <h3 className="ftr__heading">Customer Support</h3>
                        <nav className="ftr__nav" aria-label="Support links">
                            <FLink href="/shipping-policy">Shipping Policy</FLink>
                            <FLink href="/return-policy">Return Policy</FLink>
                            <FLink href="/refund-policy">Refund Policy</FLink>
                            <FLink href="/cancellation-policy">Cancellation Policy</FLink>
                            <FLink href="/track-order">Track Order</FLink>
                            <FLink href="/faqs">FAQs</FLink>
                        </nav>
                    </div>

                    {/* ── Col 4: Legal + Trust ── */}
                    <div className="ftr__col">
                        <h3 className="ftr__heading">Legal &amp; Trust</h3>
                        <div className="ftr__gst">
                            <span className="ftr__gst-label">GST No.</span>
                            <span className="ftr__gst-val">29ABCDE1234F1Z5</span>
                        </div>
                        <nav className="ftr__nav" aria-label="Legal links">
                            <FLink href="/terms">Terms &amp; Conditions</FLink>
                            <FLink href="/privacy">Privacy Policy</FLink>
                        </nav>

                        {/* Conversion trust signals */}
                        <div className="ftr__trust-list">
                            <div className="ftr__trust-item">
                                <span className="ftr__trust-icon">🔒</span>
                                <span>Secure Payments via</span>
                                <span className="ftr__razorpay">Razorpay</span>
                            </div>
                            <div className="ftr__trust-item">
                                <span className="ftr__trust-icon">🚚</span>
                                <span>COD Available</span>
                            </div>
                            <div className="ftr__trust-item">
                                <span className="ftr__trust-icon">🌿</span>
                                <span>100% Herbal Ingredients</span>
                            </div>
                        </div>

                        {/* Certification pills — small horizontal */}
                        <div className="ftr__badges">
                            <span className="ftr__badge">🌿 GMP</span>
                            <span className="ftr__badge">✅ ISO 9001</span>
                            <span className="ftr__badge">🇮🇳 Made in India</span>
                        </div>
                    </div>
                </div>

                {/* ── MOBILE accordion ── */}
                <div className="ftr__mobile">
                    <div className="ftr__col ftr__col--brand">
                        <Link href="/" className="ftr__logo-link" aria-label="Sanjari Home">
                            <Image src="/SANJARI.png" alt="Sanjari Herbal Hair Oil" width={120} height={38} className="ftr__logo" />
                        </Link>
                        <p className="ftr__tagline">Natural Ayurvedic Hair Care for Stronger, Healthier Growth.</p>
                        <div className="ftr__social" aria-label="Social media">
                            <a href="https://facebook.com" className="ftr__social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                            <a href="https://instagram.com" className="ftr__social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                            <a href="https://wa.me/917867078601" className="ftr__social-icon ftr__social-icon--wa" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsappIcon /></a>
                        </div>
                    </div>
                    <AccordionGroup title="Quick Links">
                        <FLink href="/">Home</FLink>
                        <FLink href="/product">Product</FLink>
                        <FLink href="/#benefits">Benefits</FLink>
                        <FLink href="/#how-it-works">How It Works</FLink>
                        <FLink href="/#reviews">Reviews</FLink>
                        <FLink href="/#contact">Contact</FLink>
                    </AccordionGroup>
                    <AccordionGroup title="Customer Support">
                        <FLink href="/shipping-policy">Shipping Policy</FLink>
                        <FLink href="/return-policy">Return Policy</FLink>
                        <FLink href="/refund-policy">Refund Policy</FLink>
                        <FLink href="/cancellation-policy">Cancellation Policy</FLink>
                        <FLink href="/track-order">Track Order</FLink>
                        <FLink href="/faqs">FAQs</FLink>
                    </AccordionGroup>
                    <AccordionGroup title="Legal &amp; Trust">
                        <div className="ftr__gst" style={{ marginBottom: 10 }}>
                            <span className="ftr__gst-label">GST No.</span>
                            <span className="ftr__gst-val">29ABCDE1234F1Z5</span>
                        </div>
                        <FLink href="/terms">Terms &amp; Conditions</FLink>
                        <FLink href="/privacy">Privacy Policy</FLink>
                        <div className="ftr__trust-list" style={{ marginTop: 10 }}>
                            <div className="ftr__trust-item">
                                <span className="ftr__trust-icon">🔒</span>
                                <span>Secure Payments via</span>
                                <span className="ftr__razorpay">Razorpay</span>
                            </div>
                            <div className="ftr__trust-item">
                                <span className="ftr__trust-icon">🚚</span>
                                <span>COD Available</span>
                            </div>
                            <div className="ftr__trust-item">
                                <span className="ftr__trust-icon">🌿</span>
                                <span>100% Herbal Ingredients</span>
                            </div>
                        </div>
                        <div className="ftr__badges" style={{ marginTop: 10 }}>
                            <span className="ftr__badge">🌿 GMP</span>
                            <span className="ftr__badge">✅ ISO 9001</span>
                            <span className="ftr__badge">🇮🇳 Made in India</span>
                        </div>
                    </AccordionGroup>
                </div>
            </div>

            {/* ── Bottom strip ── */}
            <div className="ftr__bottom">
                <div className="ftr__bottom-inner">
                    <p className="ftr__copy">© 2026 Sanjari Herbal Hair Oil. All rights reserved.</p>
                    <p className="ftr__powered">Powered by <span>Zocktech</span></p>
                </div>
            </div>

            <style>{`
                /* ══════════════════════════════════════
                   FOOTER — Light Theme (Design System)
                   Background: #f7faf7 (near-white herbal)
                   Text: #212121 primary, #555 secondary
                   Green: #388E3C brand, #1a5c2a dark
                   Border: #C8E6C9
                ══════════════════════════════════════ */

                .ftr {
                    background: #f7faf7;
                    color: #212121;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    border-top: 1px solid #C8E6C9;
                }

                /* ── Green accent stripe at very top ── */
                .ftr__stripe {
                    height: 4px;
                    background: linear-gradient(90deg, #1a5c2a 0%, #388E3C 50%, #4caf50 100%);
                }

                /* ── Main body ── */
                .ftr__body {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 60px 28px 48px;
                }

                /* ── 4-col desktop grid ── */
                .ftr__grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr 1fr 1fr;
                    gap: 48px 32px;
                }

                /* ── Column headings ── */
                .ftr__heading {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #1a5c2a;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    margin: 0 0 18px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #C8E6C9;
                }

                /* ── Brand column ── */
                .ftr__logo-link { display: inline-flex; margin-bottom: 14px; }
                .ftr__logo {
                    height: 42px;
                    width: auto;
                    object-fit: contain;
                    display: block;
                }

                .ftr__tagline {
                    font-size: 0.875rem;
                    line-height: 1.7;
                    color: #555555;
                    margin: 0 0 16px;
                    max-width: 260px;
                }

                .ftr__address {
                    font-style: normal;
                    font-size: 0.82rem;
                    line-height: 1.8;
                    color: #555555;
                    margin-bottom: 20px;
                }
                .ftr__address p { margin: 0; }
                .ftr__address a {
                    color: #2d8a3e;
                    text-decoration: none;
                    transition: color 0.18s;
                }
                .ftr__address a:hover { color: #1a5c2a; }

                /* ── Social icons ── */
                .ftr__social {
                    display: flex;
                    gap: 10px;
                }
                .ftr__social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: #ffffff;
                    color: #388E3C;
                    border: 1px solid #C8E6C9;
                    text-decoration: none;
                    box-shadow: 0 1px 4px rgba(56,142,60,0.08);
                    transition: background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s;
                }
                .ftr__social-icon:hover {
                    background: #388E3C;
                    color: #ffffff;
                    border-color: #388E3C;
                    transform: translateY(-2px);
                }
                .ftr__social-icon--wa:hover { background: #25D366; border-color: #25D366; }

                /* ── Nav links ── */
                .ftr__nav {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .ftr-link {
                    font-size: 0.875rem;
                    color: #555555;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    transition: color 0.18s, padding-left 0.18s;
                    width: fit-content;
                }
                .ftr-link::before {
                    content: "→";
                    font-size: 0.68rem;
                    color: #388E3C;
                    opacity: 0;
                    transition: opacity 0.18s;
                }
                .ftr-link:hover { color: #1a5c2a; padding-left: 4px; }
                .ftr-link:hover::before { opacity: 1; }

                /* ── GST box ── */
                .ftr__gst {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    background: #ffffff;
                    border: 1px solid #C8E6C9;
                    border-left: 3px solid #388E3C;
                    border-radius: 8px;
                    padding: 10px 14px;
                    margin-bottom: 16px;
                }
                .ftr__gst-label {
                    font-size: 0.65rem;
                    font-weight: 700;
                    color: #388E3C;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }
                .ftr__gst-val {
                    font-family: "Courier New", monospace;
                    font-size: 0.82rem;
                    color: #212121;
                    letter-spacing: 0.04em;
                }

                /* ── Trust badges — small horizontal cert pills ── */
                .ftr__badges {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-top: 14px;
                }
                .ftr__badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.65rem;
                    font-weight: 600;
                    color: #555555;
                    background: #ffffff;
                    border: 1px solid #C8E6C9;
                    border-radius: 20px;
                    padding: 3px 8px;
                    white-space: nowrap;
                }

                /* ── Conversion trust signals ── */
                .ftr__trust-list {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                    margin-top: 14px;
                }
                .ftr__trust-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.79rem;
                    color: #555555;
                    line-height: 1.3;
                }
                .ftr__trust-icon {
                    font-size: 0.85rem;
                    flex-shrink: 0;
                    width: 18px;
                    text-align: center;
                }
                .ftr__razorpay {
                    font-weight: 700;
                    color: #006CB7;
                    font-size: 0.75rem;
                    letter-spacing: 0.01em;
                }

                /* ── Mobile version ── */
                .ftr__mobile { display: none; }

                /* ── Accordion ── */
                .ftr-accordion { border-top: 1px solid #C8E6C9; }
                .ftr-accordion__btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    background: none;
                    border: none;
                    padding: 14px 0;
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: #1a5c2a;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    cursor: pointer;
                    text-align: left;
                }
                .ftr-accordion__body {
                    display: none;
                    flex-direction: column;
                    gap: 10px;
                    padding-bottom: 16px;
                }
                .ftr-accordion__body--open { display: flex; }

                /* ── Bottom strip ── */
                .ftr__bottom {
                    background: #E8F5E9;
                    border-top: 1px solid #C8E6C9;
                }
                .ftr__bottom-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 16px 28px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .ftr__copy {
                    font-size: 0.8rem;
                    color: #555555;
                    margin: 0;
                }
                .ftr__powered {
                    font-size: 0.75rem;
                    color: #888888;
                    margin: 0;
                }
                .ftr__powered span {
                    color: #388E3C;
                    font-weight: 600;
                }

                /* ── Responsive ── */
                @media (max-width: 1024px) {
                    .ftr__grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 40px 32px;
                    }
                }

                @media (max-width: 768px) {
                    .ftr__grid { display: none; }
                    .ftr__mobile { display: block; }
                    .ftr__body { padding: 40px 20px 32px; }
                    .ftr__col--brand { margin-bottom: 24px; }
                    .ftr__bottom-inner {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 14px 20px;
                        gap: 4px;
                    }
                }
            `}</style>
        </footer>
    );
}
