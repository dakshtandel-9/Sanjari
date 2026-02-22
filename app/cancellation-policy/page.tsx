"use client";

import Link from "next/link";

export default function CancellationPolicyPage() {
    return (
        <div className="policy-page">
            {/* ═══ HERO SECTION ═══ */}
            <div className="policy-page__hero">
                <div className="policy-page__hero-inner">
                    <div className="policy-page__badge">Cancellation Policy</div>
                    <h1 className="policy-page__title">Order Cancellation</h1>
                    <p className="policy-page__subtitle">
                        Sanjari Herbal Hair Oil — Our policy for order cancellations and modifications.
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
                        title="Order Cancellation Before Dispatch"
                        content={[
                            "Customers may request cancellation of their order only before the product is dispatched.",
                            "Cancellation requests must ideally be made within 12 hours of placing the order.",
                            "If the order has not been shipped, it will be cancelled and (if prepaid) the amount will be refunded to the original payment method within 5–7 business days."
                        ]}
                    />

                    {/* Section 2 */}
                    <PolicySection
                        num="02"
                        title="Orders Already Shipped"
                        content={[
                            "Once an order has been dispatched from our warehouse, cancellation is not possible.",
                            "Customers are advised to verify all details carefully before placing the order."
                        ]}
                    />

                    {/* Section 3 */}
                    <PolicySection
                        num="03"
                        title="COD Orders"
                        content="For Cash on Delivery (COD) orders:"
                        list={[
                            { label: "Before Dispatch", val: "Cancellation is allowed" },
                            { label: "After Dispatch", val: "Cancellation is NOT possible" },
                            { label: "Refusal", val: "May result in restriction of future orders" }
                        ]}
                        footer="Sanjari reserves the right to blacklist customers who repeatedly refuse COD deliveries."
                    />

                    {/* Section 4 */}
                    <PolicySection
                        num="04"
                        title="Incorrect Address or Contact Details"
                        content={[
                            "If an incorrect address or phone number is provided, the order may be delayed or returned.",
                            "Re-shipping charges may apply for failed deliveries due to incorrect customer information."
                        ]}
                    />

                    {/* Section 5 */}
                    <PolicySection
                        num="05"
                        title="Cancellation by Sanjari"
                        content="Sanjari reserves the right to cancel orders in the following cases:"
                        list={[
                            { label: "Inventory", val: "Product out of stock" },
                            { label: "Security", val: "Suspicious or fraudulent activity" },
                            { label: "Verification", val: "Incomplete or unverifiable details" }
                        ]}
                        footer="In such cases, prepaid amounts (if any) will be fully refunded."
                    />

                    {/* Important Business Advice Note */}
                    <div className="policy-important">
                        <div className="policy-important__icon">📞</div>
                        <div className="policy-important__content">
                            <h3 className="policy-important__title">COD Confirmation</h3>
                            <p>To ensure successful delivery and prevent RTO losses, we confirm every COD order via phone or WhatsApp before dispatch. Please ensure your contact details are correct.</p>
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
                    .policy-page__content { padding: 32px 24px; border-radius: 16px; }
                    .policy-page__hero { padding: 60px 24px 80px; }
                }

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
                .policy-header__date { font-size: 0.875rem; color: #888; }

                .ds-policy-section { margin-bottom: 40px; }
                .ds-policy-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
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
                .ds-policy-text { font-size: 1rem; color: #555; line-height: 1.7; margin: 0 0 16px; }
                .ds-policy-text p { margin: 0 0 10px; }
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
                .ds-policy-list-item:last-child { border-bottom: none; }
                .ds-policy-item-label { font-weight: 600; color: #212121; font-size: 0.9rem; }
                .ds-policy-item-val { color: #388E3C; font-weight: 500; font-size: 0.9rem; text-align: right; }
                .ds-policy-footer { font-size: 0.875rem; color: #777; font-style: italic; padding-left: 12px; border-left: 3px solid #E8F5E9; }

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
                .policy-important__icon { font-size: 1.5rem; }
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

                .policy-footer { margin-top: 48px; text-align: center; }
                .policy-back-link { color: #388E3C; font-weight: 600; text-decoration: none; transition: color 0.2s; }
                .policy-back-link:hover { color: #1B5E20; }
            `}</style>
        </div>
    );
}

function PolicySection({ num, title, content, list, footer }: {
    num: string;
    title: string;
    content?: string | string[];
    list?: { label: string; val: string }[];
    footer?: string;
}) {
    return (
        <div className="ds-policy-section">
            <div className="ds-policy-header">
                <span className="ds-policy-num">{num}</span>
                <h3 className="ds-policy-title">{title}</h3>
            </div>
            {content && (
                <div className="ds-policy-text">
                    {Array.isArray(content) ? (
                        content.map((p, i) => <p key={i}>{p}</p>)
                    ) : (
                        <p>{content}</p>
                    )}
                </div>
            )}
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
