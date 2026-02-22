"use client";

import Link from "next/link";

export default function ShippingPolicyPage() {
    return (
        <div className="policy-page">
            {/* ═══ HERO SECTION ═══ */}
            <div className="policy-page__hero">
                <div className="policy-page__hero-inner">
                    <div className="policy-page__badge">Legal & Information</div>
                    <h1 className="policy-page__title">Shipping Policy</h1>
                    <p className="policy-page__subtitle">
                        Sanjari Herbal Hair Oil — Global standards for local delivery.
                        Effective as of February 22, 2026.
                    </p>
                </div>
            </div>

            <div className="policy-page__body">
                <div className="policy-page__content">

                    {/* Header Info */}
                    <div className="policy-section policy-header">
                        <h2 className="policy-header__name">Sanjari Herbal Hair Oil</h2>
                        <p className="policy-header__date">Last Updated: February 22, 2026</p>
                    </div>

                    {/* Section 1 */}
                    <PolicySection
                        num="01"
                        title="Shipping Coverage"
                        content="Sanajri Herbal Hair Oil ships across Pan India, including metro cities, non-metro cities, and select remote locations. Currently, we do not offer international shipping."
                    />

                    {/* Section 2 */}
                    <PolicySection
                        num="02"
                        title="Order Processing Time"
                        content={[
                            "All orders are processed within 1–2 business days after confirmation.",
                            "Orders placed on Sundays or public holidays will be processed on the next working day.",
                            "Once shipped, you will receive tracking details via the Track Order page."
                        ]}
                    />

                    {/* Section 3 */}
                    <PolicySection
                        num="03"
                        title="Estimated Delivery Time"
                        content="Delivery timelines vary based on location:"
                        list={[
                            { label: "Metro Cities", val: "5–7 business days" },
                            { label: "Other Cities", val: "6–8 business days" },
                            { label: "Remote Areas", val: "7–10 business days" }
                        ]}
                        footer="Please note that delivery timelines are estimates and may vary due to courier delays, weather conditions, or unforeseen circumstances."
                    />

                    {/* Section 4 */}
                    <PolicySection
                        num="04"
                        title="Shipping Charges"
                        content="Shipping charges vary based on delivery location:"
                        list={[
                            { label: "Standard Rate", val: "₹60 – ₹80 per order (calculated at checkout)" }
                        ]}
                        footer="Shipping charges will be clearly displayed before payment confirmation."
                    />

                    {/* Section 5 */}
                    <PolicySection
                        num="05"
                        title="Order Tracking"
                        content={[
                            "Customers can track their orders using the Track Order page available on our website.",
                            "Tracking details will be updated once the order is dispatched."
                        ]}
                    />

                    {/* Section 6 */}
                    <PolicySection
                        num="06"
                        title="Delivery Attempts & Non-Availability"
                        content="Our courier partner will attempt delivery at the provided shipping address. If the customer is unavailable, the address is incorrect, or the package is refused, it may be returned to our warehouse."
                        list={[
                            { label: "Re-shipping", val: "Additional charges may apply for re-dispatch." },
                            { label: "COD Orders", val: "May not be eligible for re-dispatch without confirmation." }
                        ]}
                    />

                    {/* Section 7 */}
                    <PolicySection
                        num="07"
                        title="Address Changes"
                        content={[
                            "Address changes are allowed only before dispatch.",
                            "Once the order is shipped, address modifications may not be possible.",
                            "Customers are advised to verify shipping details carefully before placing the order."
                        ]}
                    />

                    {/* Section 8 */}
                    <PolicySection
                        num="08"
                        title="Damaged or Tampered Package"
                        content="If the product is received in a damaged condition:"
                        list={[
                            { label: "Reporting", val: "Must report within 24 hours of delivery." },
                            { label: "Evidence", val: "Share clear photos/videos of damaged product and packaging." },
                            { label: "Resolution", val: "After verification, a replacement will be arranged." }
                        ]}
                        footer="Claims reported after 24 hours may not be eligible for replacement."
                    />

                    {/* Section 9 */}
                    <PolicySection
                        num="09"
                        title="Delivery Delays"
                        content="While we aim to deliver within the estimated timeframe, delays may occur due to weather conditions, courier issues, remote constraints, or public holidays. Sanajri will not be liable for delays caused by external factors beyond our control."
                    />

                    {/* Final Note (Important) */}
                    <div className="policy-important">
                        <div className="policy-important__icon">💡</div>
                        <div className="policy-important__content">
                            <h3 className="policy-important__title">Important Note on COD</h3>
                            <p>To prevent delivery failures, all Cash on Delivery (COD) orders are confirmed via phone or WhatsApp before dispatch. Orders that remain unconfirmed for 48 hours may be automatically cancelled.</p>
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="policy-footer">
                        <Link href="/" className="policy-back-link">
                            ← Back to Home
                        </Link>
                    </div>

                </div>
            </div>

            <style>{`
                .policy-page {
                    min-height: 100vh;
                    background: #f7faf7;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    color: #212121;
                    padding-bottom: 80px;
                }

                /* HERO */
                .policy-page__hero {
                    background: linear-gradient(135deg, #1a5c2a 0%, #2d8a3e 60%, #388E3C 100%);
                    padding: 80px 24px 100px;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }
                .policy-page__hero::before {
                    content: "";
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 300px; height: 300px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                }
                .policy-page__hero-inner {
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }
                .policy-page__badge {
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
                .policy-page__title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(32px, 6vw, 56px);
                    font-weight: 800;
                    color: #ffffff;
                    line-height: 1.1;
                    margin: 0 0 16px;
                }
                .policy-page__subtitle {
                    font-size: 1.1rem;
                    color: rgba(255,255,255,0.85);
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* BODY */
                .policy-page__body {
                    max-width: 800px;
                    margin: -50px auto 0;
                    padding: 0 20px;
                    position: relative;
                    z-index: 2;
                }
                .policy-page__content {
                    background: #fff;
                    border-radius: 24px;
                    padding: 48px;
                    box-shadow: 0 10px 40px rgba(26, 92, 42, 0.08);
                    border: 1px solid #C8E6C9;
                }

                @media (max-width: 600px) {
                    .policy-page__content {
                        padding: 32px 24px;
                        border-radius: 16px;
                    }
                    .policy-page__hero {
                        padding: 60px 24px 80px;
                    }
                }

                /* SECTIONS */
                .policy-header {
                    margin-bottom: 40px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #E8F5E9;
                }
                .policy-header__name {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1a5c2a;
                    margin: 0 0 4px;
                }
                .policy-header__date {
                    font-size: 0.875rem;
                    color: #888;
                }

                .ds-policy-section {
                    margin-bottom: 40px;
                }
                .ds-policy-section:last-of-type {
                    margin-bottom: 0;
                }
                .ds-policy-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 14px;
                }
                .ds-policy-num {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 0.725rem;
                    font-weight: 800;
                    color: #388E3C;
                    background: #e8f5e9;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    flex-shrink: 0;
                }
                .ds-policy-title {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: #212121;
                    margin: 0;
                }
                .ds-policy-text {
                    font-size: 1rem;
                    color: #555;
                    line-height: 1.7;
                    margin: 0 0 16px;
                }
                .ds-policy-text p {
                    margin: 0 0 10px;
                }
                .ds-policy-list {
                    background: #f9fdf9;
                    border: 1px solid #E8F5E9;
                    border-radius: 12px;
                    padding: 16px 20px;
                    margin-bottom: 16px;
                }
                .ds-policy-list-item {
                    display: flex;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 8px 0;
                    border-bottom: 1px dashed #C8E6C9;
                }
                .ds-policy-list-item:last-child {
                    border-bottom: none;
                }
                .ds-policy-item-label {
                    font-weight: 600;
                    color: #212121;
                    font-size: 0.9rem;
                }
                .ds-policy-item-val {
                    color: #388E3C;
                    font-weight: 500;
                    font-size: 0.9rem;
                    text-align: right;
                }
                .ds-policy-footer {
                    font-size: 0.875rem;
                    color: #777;
                    font-style: italic;
                    padding-left: 12px;
                    border-left: 3px solid #E8F5E9;
                }

                /* IMPORTANT BOX */
                .policy-important {
                    margin-top: 48px;
                    background: #E8F5E9;
                    border: 1px solid #388E3C;
                    border-radius: 16px;
                    padding: 24px;
                    display: flex;
                    gap: 20px;
                }
                .policy-important__icon {
                    font-size: 1.5rem;
                }
                .policy-important__title {
                    font-family: var(--font-poppins, sans-serif);
                    font-weight: 700;
                    font-size: 1rem;
                    color: #1a5c2a;
                    margin: 0 0 4px;
                }
                .policy-important__content p {
                    font-size: 0.95rem;
                    color: #2d5a2d;
                    line-height: 1.5;
                    margin: 0;
                }

                /* FOOTER */
                .policy-footer {
                    margin-top: 48px;
                    text-align: center;
                }
                .policy-back-link {
                    color: #388E3C;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .policy-back-link:hover {
                    color: #1B5E20;
                }
            `}</style>
        </div>
    );
}

function PolicySection({ num, title, content, list, footer }: {
    num: string;
    title: string;
    content: string | string[];
    list?: { label: string; val: string }[];
    footer?: string;
}) {
    return (
        <div className="ds-policy-section">
            <div className="ds-policy-header">
                <span className="ds-policy-num">{num}</span>
                <h3 className="ds-policy-title">{title}</h3>
            </div>
            <div className="ds-policy-text">
                {Array.isArray(content) ? (
                    content.map((p, i) => <p key={i}>{p}</p>)
                ) : (
                    <p>{content}</p>
                )}
            </div>
            {list && (
                <div className="ds-policy-list">
                    {list.map((item, i) => (
                        <div key={i} className="ds-policy-list-item">
                            <span className="ds-policy-item-label">{item.label}</span>
                            <span className="ds-policy-item-val">{item.val}</span>
                        </div>
                    ))}
                </div>
            )}
            {footer && <p className="ds-policy-footer">{footer}</p>}
        </div>
    );
}
