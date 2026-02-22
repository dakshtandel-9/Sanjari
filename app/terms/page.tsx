"use client";

import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="policy-page">
            {/* ═══ HERO ═══ */}
            <div className="policy-page__hero">
                <div className="policy-page__hero-inner">
                    <div className="policy-page__badge">Legal</div>
                    <h1 className="policy-page__title">Terms & Conditions</h1>
                    <p className="policy-page__subtitle">
                        Sanjari Herbal Hair Oil — Please read these terms carefully before placing an order.
                    </p>
                </div>
            </div>

            <div className="policy-page__body">
                <div className="policy-page__content">

                    {/* Header */}
                    <div className="policy-header">
                        <h2 className="policy-header__name">Sanjari Herbal Hair Oil</h2>
                        <p className="policy-header__date">Last Updated: February 23, 2026</p>
                    </div>

                    {/* 01 */}
                    <PolicySection num="01" title="Introduction"
                        content={[
                            "Welcome to Sanjari Herbal Hair Oil (\u201cSanjari\u201d, \u201cwe\u201d, \u201cour\u201d, \u201cus\u201d).",
                            "By accessing or purchasing from our website, you agree to comply with and be bound by the following Terms & Conditions.",
                            "If you do not agree, please do not use our website.",
                        ]}
                    />

                    {/* 02 */}
                    <PolicySection num="02" title="Product Information"
                        content="Sanjari Herbal Hair Oil is an Ayurvedic personal care product. While we strive to provide accurate product descriptions, results may vary from person to person."
                        list={[
                            { label: "Hair growth results", val: "Not guaranteed" },
                            { label: "Elimination of hair fall", val: "Not guaranteed" },
                            { label: "Suitability for all types", val: "Not guaranteed" },
                        ]}
                    />

                    {/* 03 */}
                    <PolicySection num="03" title="Pricing & Payments"
                        content={[
                            "All prices are displayed in INR (Indian Rupees).",
                            "Shipping charges (₹60–₹80) are calculated at checkout.",
                            "We accept prepaid payments via Razorpay (Cards, UPI, Netbanking) and Cash on Delivery (COD).",
                            "Sanjari reserves the right to modify prices without prior notice.",
                        ]}
                    />

                    {/* 04 */}
                    <PolicySection num="04" title="Order Acceptance"
                        content="Once an order is placed, you will receive a confirmation. However, Sanjari reserves the right to cancel or refuse any order in the following cases:"
                        list={[
                            { label: "Stock unavailability", val: "Order cancelled" },
                            { label: "Suspicious activity", val: "Order refused" },
                            { label: "Incomplete information", val: "Order on hold" },
                            { label: "Operational constraints", val: "Order cancelled" },
                        ]}
                        footer="If a prepaid order is cancelled by us, a full refund will be processed to the original payment method."
                    />

                    {/* 05 */}
                    <PolicySection num="05" title="Shipping & Delivery"
                        content="Delivery timelines are estimates and may vary. Sanjari is not liable for delays caused by:"
                        list={[
                            { label: "Courier partner delays", val: "Beyond our control" },
                            { label: "Weather conditions", val: "Beyond our control" },
                            { label: "Remote location constraints", val: "7–10 business days" },
                        ]}
                        footer="For full details, please refer to our Shipping Policy."
                    />

                    {/* 06 */}
                    <PolicySection num="06" title="Returns & Refunds"
                        content="Sanjari follows a strict policy:"
                        list={[
                            { label: "Returns after delivery", val: "Not accepted" },
                            { label: "Refunds after delivery", val: "Not issued" },
                            { label: "Transit damage (24 hrs)", val: "Replacement only" },
                        ]}
                        footer="Please refer to our Return Policy and Refund Policy pages for full details."
                    />

                    {/* 07 */}
                    <PolicySection num="07" title="COD Orders"
                        content="For Cash on Delivery (COD) orders:"
                        list={[
                            { label: "Cancellation before dispatch", val: "Allowed" },
                            { label: "Cancellation after dispatch", val: "Not possible" },
                            { label: "Refusal of delivery", val: "May restrict future COD" },
                            { label: "Repeated misuse", val: "May result in blacklisting" },
                        ]}
                    />

                    {/* 08 */}
                    <PolicySection num="08" title="User Responsibilities"
                        content="By placing an order, you confirm that:"
                        list={[
                            { label: "Accuracy of details", val: "Your responsibility" },
                            { label: "Legal capacity", val: "Must be 18+" },
                            { label: "No fraudulent use", val: "Strictly prohibited" },
                        ]}
                    />

                    {/* 09 */}
                    <PolicySection num="09" title="Intellectual Property"
                        content="All content on this website — including the logo, product images, text, and design — is the property of Sanjari and may not be reproduced, copied, or distributed without prior written permission."
                    />

                    {/* 10 */}
                    <PolicySection num="10" title="Limitation of Liability"
                        content="Sanjari shall not be liable for:"
                        list={[
                            { label: "Allergic reactions", val: "Patch test recommended" },
                            { label: "Product misuse", val: "User's responsibility" },
                            { label: "Indirect damages", val: "Not covered" },
                            { label: "Dissatisfaction", val: "Results may vary" },
                        ]}
                        footer="Customers are advised to perform a patch test before regular use of any new hair care product."
                    />

                    {/* 11 */}
                    <PolicySection num="11" title="Governing Law"
                        content="These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of courts in Karnataka, India."
                    />

                    {/* 12 */}
                    <PolicySection num="12" title="Contact Information"
                        content="For any questions or concerns regarding these Terms:"
                        list={[
                            { label: "Email", val: "hello@sanajri.in" },
                            { label: "Phone/WhatsApp", val: "+91 97412 87340" },
                        ]}
                    />

                    {/* Important legal box */}
                    <div className="policy-important">
                        <div className="policy-important__icon">⚖️</div>
                        <div className="policy-important__content">
                            <h3 className="policy-important__title">Agreement at Checkout</h3>
                            <p>
                                By completing a purchase on this website, you confirm that you have read, understood,
                                and agreed to these Terms & Conditions, as well as our{" "}
                                <Link href="/refund-policy" className="pi-link">Refund Policy</Link>,{" "}
                                <Link href="/return-policy" className="pi-link">Return Policy</Link>, and{" "}
                                <Link href="/cancellation-policy" className="pi-link">Cancellation Policy</Link>.
                            </p>
                        </div>
                    </div>

                    {/* Related policies */}
                    <div className="policy-related">
                        <p className="policy-related__label">Related Policies</p>
                        <div className="policy-related__links">
                            <Link href="/shipping-policy" className="policy-related__link">📦 Shipping Policy</Link>
                            <Link href="/return-policy" className="policy-related__link">↩️ Return Policy</Link>
                            <Link href="/refund-policy" className="policy-related__link">💳 Refund Policy</Link>
                            <Link href="/cancellation-policy" className="policy-related__link">✕ Cancellation Policy</Link>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="policy-footer">
                        <Link href="/" className="policy-back-link">← Back to Home</Link>
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
                    pointer-events: none;
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
                    max-width: 620px;
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
                    .policy-page__content { padding: 32px 24px; border-radius: 16px; }
                    .policy-page__hero    { padding: 60px 24px 80px; }
                }

                /* HEADER */
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

                /* SECTIONS */
                .ds-policy-section { margin-bottom: 40px; }
                .ds-policy-header  { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
                .ds-policy-num {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 0.725rem;
                    font-weight: 800;
                    color: #388E3C;
                    background: #e8f5e9;
                    width: 28px; height: 28px;
                    display: flex; align-items: center; justify-content: center;
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
                .ds-policy-item-val   { color: #388E3C; font-weight: 500; font-size: 0.9rem; text-align: right; }
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
                .policy-important__icon { font-size: 1.5rem; flex-shrink: 0; }
                .policy-important__title {
                    font-family: var(--font-poppins, sans-serif);
                    font-weight: 700;
                    font-size: 1rem;
                    color: #1a5c2a;
                    margin: 0 0 6px;
                }
                .policy-important__content p {
                    font-size: 0.95rem;
                    color: #2d5a2d;
                    line-height: 1.6;
                    margin: 0;
                }
                .pi-link {
                    color: #1a5c2a;
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .pi-link:hover { color: #388E3C; }

                /* RELATED POLICIES */
                .policy-related {
                    margin-top: 32px;
                    padding: 24px;
                    background: #fafafa;
                    border: 1px solid #E8F5E9;
                    border-radius: 16px;
                }
                .policy-related__label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #888;
                    margin: 0 0 14px;
                }
                .policy-related__links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .policy-related__link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #388E3C;
                    background: #E8F5E9;
                    border: 1px solid #C8E6C9;
                    border-radius: 20px;
                    padding: 6px 14px;
                    text-decoration: none;
                    transition: background 0.15s, color 0.15s;
                }
                .policy-related__link:hover { background: #C8E6C9; color: #1a5c2a; }

                /* FOOTER */
                .policy-footer   { margin-top: 40px; text-align: center; }
                .policy-back-link {
                    color: #388E3C;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .policy-back-link:hover { color: #1B5E20; }
            `}</style>
        </div>
    );
}

/* ─── Reusable section component ───────────────────────────────────────────── */
function PolicySection({
    num, title, content, list, footer,
}: {
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
                    {Array.isArray(content)
                        ? content.map((p, i) => <p key={i}>{p}</p>)
                        : <p>{content}</p>}
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
