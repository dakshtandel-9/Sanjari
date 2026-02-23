"use client";

import Link from "next/link";

export default function ReturnPolicyPage() {
    return (
        <div className="policy-page">
            {/* ═══ HERO SECTION ═══ */}
            <div className="policy-page__hero">
                <div className="policy-page__hero-inner">
                    <div className="policy-page__badge">Return Policy</div>
                    <h1 className="policy-page__title">Returns & Replacements</h1>
                    <p className="policy-page__subtitle">
                        Sanjari Herbal Hair Oil — Our commitment to quality and hygiene.
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
                        title="No General Returns"
                        content={[
                            "Due to the nature of our product (herbal hair oil – personal care item), Sanajari does not accept returns once the product has been delivered.",
                            "All sales are considered final unless the product is damaged in transit."
                        ]}
                        list={[
                            { label: "Change of mind", val: "Not Accepted" },
                            { label: "Dissatisfaction", val: "Not Accepted" },
                            { label: "Allergic Reactions", val: "Not Accepted" },
                            { label: "Opened / Used Items", val: "Not Accepted" }
                        ]}
                    />

                    {/* Section 2 */}
                    <PolicySection
                        num="02"
                        title="Damaged Product Policy"
                        content="Returns are accepted ONLY if the product is received in a damaged condition."
                        list={[
                            { label: "Reporting Window", val: "Within 24 hours of delivery" },
                            { label: "Required Proof", val: "Photos or Unboxing video" },
                            { label: "Condition", val: "Product must be unused" }
                        ]}
                        footer="Failure to report within 24 hours may result in rejection of the claim."
                    />

                    {/* Section 3 */}
                    <PolicySection
                        num="03"
                        title="Replacement Process"
                        content={[
                            "If the damage claim is approved, a replacement will be arranged.",
                            "Our courier partner will arrange a pickup of the damaged product.",
                            "Replacement will be shipped after pickup confirmation."
                        ]}
                        footer="We do not offer refunds under any circumstances. Only replacement is provided for verified damaged items."
                    />

                    {/* Section 4 */}
                    <PolicySection
                        num="04"
                        title="COD Orders"
                        content="Cash on Delivery (COD) orders are eligible for replacement only in case of verified transit damage. COD orders cannot be returned for any other reason."
                    />

                    {/* Section 5 */}
                    <PolicySection
                        num="05"
                        title="Claim Review Timeline"
                        content="All damage claims are reviewed within 24–48 hours after receiving required proof. Sanjari reserves the right to reject claims that do not meet policy requirements."
                    />

                    {/* Section 6 */}
                    <PolicySection
                        num="06"
                        title="Non-Returnable Cases"
                        list={[
                            { label: "Time Limit", val: "Claims made after 24 hours" },
                            { label: "Packaging", val: "Minor dents without leakage" },
                            { label: "Usage", val: "Opened or used products" }
                        ]}
                    />

                    {/* Section 7 */}
                    <PolicySection
                        num="07"
                        title="Contact for Return Claims"
                        content="To initiate a damage claim, contact us at:"
                        list={[
                            { label: "Email", val: "sanjariherbalhairoil@gmail.com" },
                            { label: "WhatsApp/Call", val: "+91 78670 78601" }
                        ]}
                        footer="Please include your Order ID and clear images/video proof."
                    />

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
