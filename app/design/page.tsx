"use client";

import {
    PrimaryButton,
    SecondaryButton,
    GhostButton,
    DangerButton,
    MobileStickyButton,
} from "@/components/buttons";
import { useState } from "react";

/* ─── Icon helpers ─── */
function LeafIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M17 8C8 10 5.9 16.17 3.82 19.5c1.3 0 4.18-1 6.18-4 .5 1 2 2 4 2s7-3 7-11c0 0-1 .5-4 1.5z" />
        </svg>
    );
}
function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
        </svg>
    );
}

/* ─── Color palette data ─── */
const COLORS = [
    {
        group: "Primary",
        swatches: [
            { name: "Primary Brand Green", hex: "#388E3C", usage: "Buttons · Price highlights · Key headings · Icons", ratio: "10%", textColor: "#fff" },
            { name: "Hover Green", hex: "#2E7D32", usage: "Button hover states", ratio: "—", textColor: "#fff" },
            { name: "Dark Green", hex: "#1B5E20", usage: "Button active / pressed states", ratio: "—", textColor: "#fff" },
        ],
    },
    {
        group: "Background",
        swatches: [
            { name: "Pure White", hex: "#FFFFFF", usage: "Primary background · 70% of all surfaces", ratio: "70%", textColor: "#212121", border: true },
            { name: "Light Herbal", hex: "#E8F5E9", usage: "Section backgrounds · Feature areas · Nav hover", ratio: "20%", textColor: "#212121" },
            { name: "Green Border", hex: "#C8E6C9", usage: "Dividers · Input borders", ratio: "—", textColor: "#212121" },
        ],
    },
    {
        group: "Text",
        swatches: [
            { name: "Primary Text", hex: "#212121", usage: "Headings · Body copy", ratio: "—", textColor: "#fff" },
            { name: "Secondary Text", hex: "#555555", usage: "Subheadings · Descriptions · Captions", ratio: "—", textColor: "#fff" },
            { name: "Borders / Dividers", hex: "#E0E0E0", usage: "Cards · Input borders · Separators", ratio: "—", textColor: "#212121", border: true },
        ],
    },
    {
        group: "Accent",
        swatches: [
            { name: "Accent Red", hex: "#D32F2F", usage: "Discounts · Sale badges · Urgency only. Max 5% usage.", ratio: "5%", textColor: "#fff" },
            { name: "Danger Hover", hex: "#B71C1C", usage: "Red hover state", ratio: "—", textColor: "#fff" },
        ],
    },
];

/* ─── Typography scale data ─── */
const TYPE_SCALE = [
    { label: "H1 — Desktop", size: "42px", weight: "700 Bold", font: "Poppins", usage: "Page hero headings", sampleSize: "2.625rem", sampleWeight: 700 },
    { label: "H1 — Mobile", size: "28px", weight: "700 Bold", font: "Poppins", usage: "Mobile hero headings", sampleSize: "1.75rem", sampleWeight: 700 },
    { label: "H2 — Desktop", size: "32px", weight: "700 Bold", font: "Poppins", usage: "Section headings", sampleSize: "2rem", sampleWeight: 700 },
    { label: "H2 — Mobile", size: "22px", weight: "600 SemiBold", font: "Poppins", usage: "Mobile section headings", sampleSize: "1.375rem", sampleWeight: 600 },
    { label: "H3", size: "24px", weight: "600 SemiBold", font: "Poppins", usage: "Sub-section titles", sampleSize: "1.5rem", sampleWeight: 600 },
    { label: "Body", size: "16px", weight: "400 Regular", font: "Inter", usage: "All paragraph / body copy", sampleSize: "1rem", sampleWeight: 400 },
    { label: "Small", size: "14px", weight: "400 Regular", font: "Inter", usage: "Captions · Labels · Meta info", sampleSize: "0.875rem", sampleWeight: 400 },
    { label: "CTA / Button", size: "16px", weight: "600 SemiBold", font: "Poppins", usage: "Button labels · CTAs · Badges", sampleSize: "1rem", sampleWeight: 600 },
];

/* ─── Component ─── */
export default function DesignPage() {
    const [copiedHex, setCopiedHex] = useState<string | null>(null);
    const [loadingDemo, setLoadingDemo] = useState(false);

    const copyHex = (hex: string) => {
        navigator.clipboard.writeText(hex).then(() => {
            setCopiedHex(hex);
            setTimeout(() => setCopiedHex(null), 1800);
        });
    };

    const triggerLoading = () => {
        setLoadingDemo(true);
        setTimeout(() => setLoadingDemo(false), 2000);
    };

    return (
        <div className="design-page">

            {/* ═══ PAGE HEADER ═══ */}
            <div className="design-page__hero">
                <div className="design-page__hero-inner">
                    <div className="design-page__badge">Brand Design System</div>
                    <h1 className="design-page__title">Sanjari Design System</h1>
                    <p className="design-page__subtitle">
                        Based on the Sanjari Herbal Hair Oil Brand Guidelines —
                        Color tokens, typography scale, and UI component library.
                    </p>
                </div>
            </div>

            <div className="design-page__body">

                {/* ════════════════════════════════════════
            1. COLOR SYSTEM
        ════════════════════════════════════════ */}
                <Section id="colors" label="01" title="Color System" description='Primary Brand Green: #388E3C · Color usage ratio: 70% White · 20% Light Green · 10% Primary Green · 5% Red Accent'>

                    {COLORS.map((group) => (
                        <div key={group.group} className="ds-color-group">
                            <h3 className="ds-group-label">{group.group}</h3>
                            <div className="ds-color-grid">
                                {group.swatches.map((s) => (
                                    <button
                                        key={s.hex}
                                        className="ds-swatch"
                                        onClick={() => copyHex(s.hex)}
                                        title={`Click to copy ${s.hex}`}
                                        style={{ background: s.hex, border: s.border ? "1px solid #e0e0e0" : "none" }}
                                    >
                                        <div className="ds-swatch__body" style={{ color: s.textColor }}>
                                            <span className="ds-swatch__hex">{copiedHex === s.hex ? "✓ Copied!" : s.hex}</span>
                                            <span className="ds-swatch__name">{s.name}</span>
                                            {s.ratio !== "—" && <span className="ds-swatch__ratio">{s.ratio}</span>}
                                        </div>
                                        <div className="ds-swatch__usage" style={{ color: s.textColor }}>{s.usage}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Usage ratio bar */}
                    <div className="ds-ratio-section">
                        <h3 className="ds-group-label">Color Usage Ratio</h3>
                        <div className="ds-ratio-bar">
                            <div className="ds-ratio-bar__segment" style={{ width: "70%", background: "#f5f5f5", border: "1px solid #e0e0e0" }}>
                                <span className="ds-ratio-bar__label" style={{ color: "#212121" }}>White · 70%</span>
                            </div>
                            <div className="ds-ratio-bar__segment" style={{ width: "20%", background: "#E8F5E9" }}>
                                <span className="ds-ratio-bar__label" style={{ color: "#388E3C" }}>Light Green · 20%</span>
                            </div>
                            <div className="ds-ratio-bar__segment" style={{ width: "10%", background: "#388E3C" }}>
                                <span className="ds-ratio-bar__label" style={{ color: "#fff" }}>Brand · 10%</span>
                            </div>
                        </div>
                        <div className="ds-ratio-note">
                            🔴 Accent Red (#D32F2F) used at maximum 5% — discounts and sale urgency only.
                        </div>
                    </div>
                </Section>

                {/* ════════════════════════════════════════
            2. TYPOGRAPHY SYSTEM
        ════════════════════════════════════════ */}
                <Section id="typography" label="02" title="Typography System" description="Heading Font: Poppins (Bold / SemiBold) · Body Font: Inter (Regular) · Line Height: 1.6">

                    <div className="ds-type-fonts">
                        <div className="ds-type-font-card">
                            <div className="ds-type-font-name" style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 700 }}>Poppins</div>
                            <div className="ds-type-font-meta">Headings · CTAs · Buttons · Brand voice</div>
                            <div className="ds-type-font-preview" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                                Aa Bb Cc Dd Ee Ff Gg Hh Ii
                            </div>
                            <div className="ds-type-font-weights" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                                <span style={{ fontWeight: 400 }}>Regular 400</span>
                                <span style={{ fontWeight: 600 }}>SemiBold 600</span>
                                <span style={{ fontWeight: 700 }}>Bold 700</span>
                                <span style={{ fontWeight: 800 }}>ExtraBold 800</span>
                            </div>
                        </div>
                        <div className="ds-type-font-card">
                            <div className="ds-type-font-name" style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700 }}>Inter</div>
                            <div className="ds-type-font-meta">Body copy · Descriptions · UI text · Navigation</div>
                            <div className="ds-type-font-preview" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                                Aa Bb Cc Dd Ee Ff Gg Hh Ii
                            </div>
                            <div className="ds-type-font-weights" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                                <span style={{ fontWeight: 400 }}>Regular 400</span>
                                <span style={{ fontWeight: 500 }}>Medium 500</span>
                                <span style={{ fontWeight: 600 }}>SemiBold 600</span>
                                <span style={{ fontWeight: 700 }}>Bold 700</span>
                            </div>
                        </div>
                    </div>

                    <div className="ds-type-scale">
                        <div className="ds-type-scale-header">
                            <span>Token</span><span>Font</span><span>Size</span><span>Weight</span><span>Preview</span>
                        </div>
                        {TYPE_SCALE.map((t) => (
                            <div key={t.label} className="ds-type-scale-row">
                                <div className="ds-type-scale-token">
                                    <span className="ds-type-scale-label">{t.label}</span>
                                    <span className="ds-type-scale-usage">{t.usage}</span>
                                </div>
                                <span className="ds-type-scale-font"
                                    style={{ fontFamily: t.font === "Poppins" ? "var(--font-poppins)" : "var(--font-inter)" }}>
                                    {t.font}
                                </span>
                                <span className="ds-type-scale-size">{t.size}</span>
                                <span className="ds-type-scale-weight">{t.weight}</span>
                                <span
                                    className="ds-type-scale-preview"
                                    style={{
                                        fontSize: t.sampleSize,
                                        fontWeight: t.sampleWeight,
                                        fontFamily: t.font === "Poppins" ? "var(--font-poppins), sans-serif" : "var(--font-inter), sans-serif",
                                    }}
                                >
                                    Sanjari Herbal
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="ds-type-specimen">
                        <div className="ds-type-specimen-sample">
                            <p className="ds-specimen-h1">Pure Natural. Pure Results.</p>
                            <p className="ds-specimen-h2">100% Herbal Hair Care</p>
                            <p className="ds-specimen-h3">Cold-Pressed Bhringraj Oil</p>
                            <p className="ds-specimen-body">
                                Sanjari Herbal Hair Oil is crafted from 100% natural ingredients — cold-pressed
                                bhringraj, amla, and coconut base. No parabens, no sulphates. Just pure herbal
                                goodness for stronger, shinier hair.
                            </p>
                            <p className="ds-specimen-small">Starting at ₹349 · Free shipping above ₹499</p>
                        </div>
                    </div>
                </Section>

                {/* ════════════════════════════════════════
            3. BUTTON SYSTEM
        ════════════════════════════════════════ */}
                <Section id="buttons" label="03" title="Button Design System" description="Primary Brand Green #388E3C · Hover #2E7D32 · Poppins SemiBold 16px · Border Radius 8px · Padding 14px 24px">

                    {/* Primary */}
                    <div className="ds-btn-group">
                        <div className="ds-btn-group-header">
                            <span className="ds-btn-group-title">Primary Button</span>
                            <span className="ds-btn-group-desc">Main CTA — green background · white text · shadow lift on hover. Use for Buy Now, Add to Cart.</span>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">sm</span>
                                <PrimaryButton size="sm">Buy Now</PrimaryButton>
                            </div>
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">md (default)</span>
                                <PrimaryButton size="md">Buy Now</PrimaryButton>
                            </div>
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">lg</span>
                                <PrimaryButton size="lg">Buy Now</PrimaryButton>
                            </div>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">with icon</span>
                                <PrimaryButton icon={<LeafIcon />}>Shop Herbal Oils</PrimaryButton>
                            </div>
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">icon right</span>
                                <PrimaryButton icon={<CartIcon />} iconPosition="right">Add to Cart</PrimaryButton>
                            </div>
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">loading</span>
                                <PrimaryButton loading={loadingDemo} onClick={triggerLoading}>
                                    {loadingDemo ? "Loading…" : "Click Me"}
                                </PrimaryButton>
                            </div>
                            <div className="ds-btn-demo">
                                <span className="ds-btn-demo-label">disabled</span>
                                <PrimaryButton disabled>Out of Stock</PrimaryButton>
                            </div>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo" style={{ width: "100%" }}>
                                <span className="ds-btn-demo-label">full width</span>
                                <PrimaryButton fullWidth>Proceed to Checkout</PrimaryButton>
                            </div>
                        </div>
                    </div>

                    {/* Secondary */}
                    <div className="ds-btn-group">
                        <div className="ds-btn-group-header">
                            <span className="ds-btn-group-title">Secondary Button</span>
                            <span className="ds-btn-group-desc">White background · green border + text · fills light green on hover. Use for Our Story, Learn More.</span>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">sm</span><SecondaryButton size="sm">Our Story</SecondaryButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">md</span><SecondaryButton size="md">Our Story</SecondaryButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">lg</span><SecondaryButton size="lg">Our Story</SecondaryButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">with icon</span><SecondaryButton icon={<LeafIcon />}>View Ingredients</SecondaryButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">disabled</span><SecondaryButton disabled>Disabled</SecondaryButton></div>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo" style={{ width: "100%" }}>
                                <span className="ds-btn-demo-label">full width</span>
                                <SecondaryButton fullWidth>Explore All Products</SecondaryButton>
                            </div>
                        </div>
                    </div>

                    {/* Ghost */}
                    <div className="ds-btn-group">
                        <div className="ds-btn-group-header">
                            <span className="ds-btn-group-title">Ghost Button</span>
                            <span className="ds-btn-group-desc">No background · no border · green text only. For tertiary or low-emphasis actions.</span>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">sm</span><GhostButton size="sm">Skip</GhostButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">md</span><GhostButton size="md">Learn More</GhostButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">lg</span><GhostButton size="lg">Read About Us</GhostButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">with icon</span><GhostButton icon={<LeafIcon />}>Why Natural?</GhostButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">disabled</span><GhostButton disabled>Disabled</GhostButton></div>
                        </div>
                    </div>

                    {/* Danger */}
                    <div className="ds-btn-group">
                        <div className="ds-btn-group-header">
                            <span className="ds-btn-group-title">Danger / Sale Button</span>
                            <span className="ds-btn-group-desc">Brand Accent Red #D32F2F — for discounts, sale urgency, or destructive actions. Brand guidelines: max 5% usage.</span>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">sm</span><DangerButton size="sm">10% OFF</DangerButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">md</span><DangerButton size="md">Flash Sale — Ends Tonight</DangerButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">lg</span><DangerButton size="lg">Limited Sale</DangerButton></div>
                            <div className="ds-btn-demo"><span className="ds-btn-demo-label">disabled</span><DangerButton disabled>Ended</DangerButton></div>
                        </div>
                    </div>

                    {/* Mobile Sticky */}
                    <div className="ds-btn-group">
                        <div className="ds-btn-group-header">
                            <span className="ds-btn-group-title">Mobile Sticky Bottom CTA</span>
                            <span className="ds-btn-group-desc">Visible only on mobile (≤768px) — fixed at bottom of viewport. Brand guideline: use on product pages for maximum conversion.</span>
                        </div>
                        <div className="ds-btn-row">
                            <div className="ds-btn-mobile-preview">
                                <div className="ds-btn-mobile-frame">
                                    <div className="ds-btn-mobile-screen">
                                        <div className="ds-btn-mobile-content">
                                            <div style={{ fontSize: 14, color: "#555", textAlign: "center" }}>Product content here…</div>
                                        </div>
                                        <div className="ds-btn-mobile-sticky">
                                            <div className="ds-btn-mobile-sticky-inner">
                                                <span style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>Buy Now</span>
                                                <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", padding: "2px 10px", borderRadius: 20, fontSize: 13, fontWeight: 800, fontFamily: "var(--font-poppins), sans-serif" }}>₹349</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="ds-btn-mobile-note">↑ Live preview of sticky button layout on mobile</p>
                            </div>
                        </div>
                    </div>

                    {/* Code snippet */}
                    <div className="ds-code-block">
                        <div className="ds-code-label">Usage</div>
                        <pre className="ds-code">{`import { PrimaryButton, SecondaryButton, GhostButton, DangerButton, MobileStickyButton } from "@/components/buttons";

<PrimaryButton href="/product">Buy Now</PrimaryButton>
<PrimaryButton size="lg" icon={<CartIcon />}>Add to Cart</PrimaryButton>
<SecondaryButton>Our Story</SecondaryButton>
<GhostButton>Learn More</GhostButton>
<DangerButton>50% OFF Today Only</DangerButton>
<MobileStickyButton label="Buy Now" price="₹349" href="/product" />`}</pre>
                    </div>

                </Section>

            </div>

            {/* Mobile sticky demo — shows on mobile only */}
            <MobileStickyButton label="Buy Now" price="₹349" href="/product" />

            <style>{`
        /* ═══ PAGE LAYOUT ═══ */
        .design-page {
          min-height: 100vh;
          background: #f7faf7;
          font-family: var(--font-inter, Inter, system-ui, sans-serif);
          color: #212121;
          padding-bottom: 80px;
        }

        .design-page__hero {
          background: linear-gradient(135deg, #1a5c2a 0%, #2d8a3e 60%, #388E3C 100%);
          padding: 64px 24px 72px;
          position: relative;
          overflow: hidden;
        }
        .design-page__hero::before {
          content: "";
          position: absolute;
          top: -60px; right: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
        }
        .design-page__hero::after {
          content: "";
          position: absolute;
          bottom: -80px; left: -40px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }
        .design-page__hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .design-page__badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .design-page__title {
          font-family: var(--font-poppins, Poppins, sans-serif);
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          margin: 0 0 14px;
        }
        .design-page__subtitle {
          font-size: 1rem;
          color: rgba(255,255,255,0.8);
          line-height: 1.65;
          max-width: 600px;
        }

        .design-page__body {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ═══ SECTION WRAPPER ═══ */
        .ds-section {
          margin-top: 56px;
        }
        .ds-section-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e8f5e9;
        }
        .ds-section-num {
          font-family: var(--font-poppins, Poppins, sans-serif);
          font-size: 0.7rem;
          font-weight: 700;
          color: #388E3C;
          background: #e8f5e9;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.08em;
          flex-shrink: 0;
          margin-top: 4px;
        }
        .ds-section-title {
          font-family: var(--font-poppins, Poppins, sans-serif);
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 700;
          color: #212121;
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .ds-section-desc {
          font-size: 0.875rem;
          color: #555;
          line-height: 1.6;
          margin: 0;
        }

        /* ═══ COLOR SWATCHES ═══ */
        .ds-color-group { margin-bottom: 32px; }
        .ds-group-label {
          font-family: var(--font-poppins, sans-serif);
          font-size: 0.8rem;
          font-weight: 600;
          color: #388E3C;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 12px;
        }
        .ds-color-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .ds-swatch {
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: 0;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
        }
        .ds-swatch:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
        .ds-swatch__body {
          padding: 24px 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-height: 90px;
        }
        .ds-swatch__hex { font-family: "Courier New", monospace; font-size: 0.85rem; font-weight: 700; opacity: 0.9; }
        .ds-swatch__name { font-size: 0.78rem; font-weight: 600; opacity: 0.85; }
        .ds-swatch__ratio { 
          margin-top: 4px;
          font-size: 0.7rem;
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          width: fit-content;
          font-weight: 700;
        }
        .ds-swatch__usage {
          padding: 8px 16px 14px;
          font-size: 0.72rem;
          line-height: 1.5;
          opacity: 0.75;
          border-top: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.06);
        }

        /* ═══ RATIO BAR ═══ */
        .ds-ratio-section { margin-top: 8px; }
        .ds-ratio-bar {
          display: flex;
          height: 52px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          margin-bottom: 12px;
        }
        .ds-ratio-bar__segment {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .ds-ratio-bar__label {
          font-size: 0.72rem;
          font-weight: 700;
          white-space: nowrap;
          padding: 0 8px;
        }
        .ds-ratio-note {
          font-size: 0.8rem;
          color: #D32F2F;
          background: #fff3f3;
          border: 1px solid #ffcdd2;
          border-radius: 8px;
          padding: 10px 14px;
          font-weight: 500;
        }

        /* ═══ TYPOGRAPHY ═══ */
        .ds-type-fonts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }
        @media(max-width:600px){ .ds-type-fonts { grid-template-columns: 1fr; } }

        .ds-type-font-card {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 24px;
        }
        .ds-type-font-name {
          font-size: 1.6rem;
          color: #212121;
          margin-bottom: 4px;
        }
        .ds-type-font-meta { font-size: 0.8rem; color: #555; margin-bottom: 16px; }
        .ds-type-font-preview {
          font-size: 1.15rem;
          color: #388E3C;
          margin-bottom: 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .ds-type-font-weights { display: flex; flex-direction: column; gap: 5px; font-size: 0.875rem; color: #212121; }
        .ds-type-font-weights span { color: #374151; }

        .ds-type-scale {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .ds-type-scale-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr 2fr;
          gap: 8px;
          padding: 10px 20px;
          background: #E8F5E9;
          font-size: 0.72rem;
          font-weight: 700;
          color: #388E3C;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .ds-type-scale-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr 2fr;
          gap: 8px;
          padding: 12px 20px;
          align-items: center;
          border-top: 1px solid #f0f7f0;
          transition: background 0.15s;
        }
        .ds-type-scale-row:hover { background: #f9fdf9; }
        .ds-type-scale-token { display: flex; flex-direction: column; gap: 2px; }
        .ds-type-scale-label { font-size: 0.8rem; font-weight: 600; color: #212121; }
        .ds-type-scale-usage { font-size: 0.7rem; color: #888; }
        .ds-type-scale-font { font-size: 0.8rem; color: #388E3C; font-weight: 500; }
        .ds-type-scale-size { font-family: "Courier New", monospace; font-size: 0.8rem; color: #555; }
        .ds-type-scale-weight { font-size: 0.78rem; color: #555; }
        .ds-type-scale-preview { color: #212121; line-height: 1.2; }

        @media(max-width:700px){
          .ds-type-scale-header,.ds-type-scale-row { grid-template-columns: 1.5fr 1fr 1fr; }
          .ds-type-scale-header span:nth-child(4),.ds-type-scale-header span:nth-child(5),
          .ds-type-scale-row > *:nth-child(4),.ds-type-scale-row > *:nth-child(5) { display: none; }
        }

        .ds-type-specimen {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 32px;
        }
        .ds-specimen-h1 { font-family: var(--font-poppins,sans-serif); font-size: clamp(24px,5vw,42px); font-weight: 700; color: #212121; margin: 0 0 8px; line-height: 1.15; }
        .ds-specimen-h2 { font-family: var(--font-poppins,sans-serif); font-size: clamp(18px,3.5vw,32px); font-weight: 700; color: #212121; margin: 0 0 8px; line-height: 1.2; }
        .ds-specimen-h3 { font-family: var(--font-poppins,sans-serif); font-size: 24px; font-weight: 600; color: #388E3C; margin: 0 0 14px; }
        .ds-specimen-body { font-family: var(--font-inter,sans-serif); font-size: 16px; font-weight: 400; color: #555; line-height: 1.6; margin: 0 0 10px; }
        .ds-specimen-small { font-family: var(--font-inter,sans-serif); font-size: 14px; color: #888; line-height: 1.6; margin: 0; }

        /* ═══ BUTTONS ═══ */
        .ds-btn-group {
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .ds-btn-group-header { margin-bottom: 20px; }
        .ds-btn-group-title { font-family: var(--font-poppins,sans-serif); font-weight: 700; font-size: 0.95rem; color: #212121; display: block; margin-bottom: 4px; }
        .ds-btn-group-desc { font-size: 0.8rem; color: #555; line-height: 1.6; }
        .ds-btn-row { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px; align-items: flex-end; }
        .ds-btn-row:last-child { margin-bottom: 0; }
        .ds-btn-demo { display: flex; flex-direction: column; gap: 6px; }
        .ds-btn-demo-label { font-size: 0.65rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.08em; }

        /* Mobile sticky preview mock */
        .ds-btn-mobile-preview { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
        .ds-btn-mobile-frame { border: 2px solid #e0e0e0; border-radius: 20px; overflow: hidden; width: 220px; box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
        .ds-btn-mobile-screen { display: flex; flex-direction: column; height: 160px; background: #f9faf9; }
        .ds-btn-mobile-content { flex: 1; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .ds-btn-mobile-sticky { background: #fff; border-top: 1px solid #e8f5e9; padding: 8px 12px 10px; }
        .ds-btn-mobile-sticky-inner { display: flex; align-items: center; justify-content: center; gap: 10px; background: #388E3C; border-radius: 8px; padding: 10px 16px; }
        .ds-btn-mobile-note { font-size: 0.72rem; color: #888; line-height: 1.5; max-width: 220px; }

        /* Code block */
        .ds-code-block { background: #1a1a2e; border-radius: 10px; overflow: hidden; }
        .ds-code-label { background: rgba(255,255,255,0.08); color: #a5d6a7; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 16px; }
        .ds-code { color: #e2e8f0; font-family: "Courier New", Courier, monospace; font-size: 0.82rem; line-height: 1.7; padding: 20px; margin: 0; overflow-x: auto; white-space: pre; }
      `}</style>
        </div>
    );
}

/* ═══ Section wrapper component ═══ */
function Section({ id, label, title, description, children }: {
    id: string; label: string; title: string; description: string; children: React.ReactNode;
}) {
    return (
        <section className="ds-section" id={id}>
            <div className="ds-section-header">
                <span className="ds-section-num">{label}</span>
                <div>
                    <h2 className="ds-section-title">{title}</h2>
                    <p className="ds-section-desc">{description}</p>
                </div>
            </div>
            {children}
        </section>
    );
}
