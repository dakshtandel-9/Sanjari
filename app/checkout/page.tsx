"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
    /* ─── State ─────────────────────────────────────────────────────────── */
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        pincode: "",
        state: "",
        paymentMethod: "razorpay",
        agreedToPolicies: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [config, setConfig] = useState<{ shipping_charge: number; coupons: any[] }>({
        shipping_charge: 60,
        coupons: [],
    });
    const [couponInput, setCouponInput] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponStatus, setCouponStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const [quantity, setQuantity] = useState(1);


    /* ─── Config fetch ──────────────────────────────────────────────────── */
    useEffect(() => {
        // Fetch config
        fetch("/api/admin/config")
            .then(res => res.json())
            .then(data => {
                if (data.settings) {
                    const coupons = data.coupons || [];
                    setConfig({
                        shipping_charge: parseInt(data.settings.shipping_charge || "60"),
                        coupons: coupons,
                    });

                    // Check for persisted coupon from product page
                    const savedCoupon = localStorage.getItem("sanjari_coupon");
                    if (savedCoupon) {
                        setCouponInput(savedCoupon);
                        // Trigger application after state updates
                        setTimeout(() => {
                            const btn = document.querySelector(".co__coupon-btn") as HTMLButtonElement;
                            if (btn) btn.click();
                        }, 100);
                    }
                }
            });

        // Sync quantity
        const savedQty = localStorage.getItem("sanjari_qty");
        if (savedQty) {
            const parsed = parseInt(savedQty);
            if (!isNaN(parsed) && parsed > 0) {
                setQuantity(parsed);
            }
        }
    }, []);

    // Re-verify coupon if quantity changes (for percentage discounts)
    useEffect(() => {
        if (couponStatus?.type === "success") {
            applyCoupon();
        }
        localStorage.setItem("sanjari_qty", quantity.toString());
    }, [quantity]);



    /* ─── Derived prices ────────────────────────────────────────────────── */
    const itemPrice = 349;
    const subtotal = itemPrice * quantity;
    const shippingFee = formData.paymentMethod === "cod" ? config.shipping_charge : 0;
    const totalPrice = Math.max(0, subtotal + shippingFee - discount);


    /* ─── Coupon ────────────────────────────────────────────────────────── */
    const applyCoupon = (forceCode?: string) => {
        const code = (forceCode || couponInput).trim().toUpperCase();
        const found = config.coupons.find(c => c.code.toUpperCase() === code && c.is_active);
        if (found) {
            const disc = found.type === "percentage"
                ? Math.round(subtotal * (found.discount_value / 100))
                : found.discount_value;
            setDiscount(disc);
            setCouponStatus({ type: "success", message: `Applied! Discount: -₹${disc}` });
            localStorage.setItem("sanjari_coupon", code);
        } else if (!code) {
            setDiscount(0);
            setCouponStatus(null);
            localStorage.removeItem("sanjari_coupon");
        } else {
            setDiscount(0);
            setCouponStatus({ type: "error", message: "Invalid or inactive coupon code." });
            localStorage.removeItem("sanjari_coupon");
        }
    };


    /* ─── Validation ────────────────────────────────────────────────────── */
    const validate = () => {
        const e: Record<string, string> = {};
        if (!formData.fullName.trim()) e.fullName = "Full name is required";
        if (!formData.phone.match(/^\d{10}$/)) e.phone = "Enter a valid 10-digit phone number";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address";
        if (!formData.address.trim()) e.address = "Address is required";
        if (!formData.pincode.match(/^\d{6}$/)) e.pincode = "Enter a valid 6-digit pincode";
        if (!formData.state.trim()) e.state = "State is required";
        if (!formData.agreedToPolicies) e.agreedToPolicies = "You must agree to the policies to continue";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    /* ─── Handlers ──────────────────────────────────────────────────────── */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
        if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    };

    const saveOrderToSupabase = async (razorpayData?: any) => {
        try {
            const res = await fetch("/api/orders/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, amount: totalPrice, ...razorpayData }),
            });
            const data = await res.json();
            return data.data?.[0]?.order_id || null;
        } catch (err) {
            console.error("Supabase Save Error:", err);
            return null;
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalPrice, currency: "INR" }),
            });
            const order = await res.json();
            if (!res.ok) throw new Error(order.error || "Failed to create order");

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Sanjari Herbal Hair Oil",
                description: "Authentic Ayurvedic Hair Care",
                order_id: order.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        const orderId = await saveOrderToSupabase({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                        });
                        window.location.href = `/success${orderId ? `?order_id=${orderId}` : ""}`;
                    } else {
                        alert("Payment verification failed.");
                    }
                },
                prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
                theme: { color: "#2d8a3e" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error("Payment Error:", error);
            alert("Error initiating payment: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            if (formData.paymentMethod === "razorpay") {
                await handleRazorpayPayment();
            } else {
                const orderId = await saveOrderToSupabase();
                setTimeout(() => {
                    window.location.href = `/success${orderId ? `?order_id=${orderId}` : ""}`;
                    setIsSubmitting(false);
                }, 1500);
            }
        }
    };

    /* ─── Render ────────────────────────────────────────────────────────── */
    return (
        <div className="co__page">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            {/* Background blobs */}
            <div className="co__blob co__blob--1" aria-hidden="true" />
            <div className="co__blob co__blob--2" aria-hidden="true" />

            <div className="co__wrap">

                {/* ── Page header ── */}
                <div className="co__hero">
                    <div className="co__hero-left">
                        <Link href="/" aria-label="Sanjari Home">
                            <Image src="/SANJARI.png" alt="Sanjari" width={100} height={32} className="co__logo" />
                        </Link>
                        <div>
                            <h1 className="co__title">Secure Checkout</h1>
                            <p className="co__subtitle">Complete your purchase safely and quickly.</p>
                        </div>
                    </div>
                    <div className="co__hero-badge">
                        <span>🔒</span> SSL Secured
                    </div>
                </div>

                {/* ── Grid ── */}
                <div className="co__grid">

                    {/* ══ LEFT: Form ══ */}
                    <div className="co__form-col">
                        <form onSubmit={handleSubmit} noValidate>

                            {/* Section: Contact */}
                            <div className="co__section">
                                <h2 className="co__section-title">
                                    <span className="co__step-num">1</span>
                                    Contact & Delivery Info
                                </h2>

                                <div className="co__row-2">
                                    <Field label="Full Name" error={errors.fullName}>
                                        <input
                                            type="text" name="fullName" value={formData.fullName}
                                            onChange={handleChange} placeholder="Rahul Sharma"
                                            className={`co__input${errors.fullName ? " co__input--err" : ""}`}
                                        />
                                    </Field>
                                    <Field label="Phone Number" error={errors.phone}>
                                        <input
                                            type="tel" name="phone" value={formData.phone}
                                            onChange={handleChange} placeholder="7867078601"
                                            className={`co__input${errors.phone ? " co__input--err" : ""}`}
                                        />
                                    </Field>
                                </div>

                                <Field label="Email Address" error={errors.email}>
                                    <input
                                        type="email" name="email" value={formData.email}
                                        onChange={handleChange} placeholder="rahul@example.com"
                                        className={`co__input${errors.email ? " co__input--err" : ""}`}
                                    />
                                </Field>

                                <Field label="Shipping Address" error={errors.address}>
                                    <textarea
                                        name="address" value={formData.address}
                                        onChange={handleChange} rows={3}
                                        placeholder="Flat no., Building, Street, Area"
                                        className={`co__input co__textarea${errors.address ? " co__input--err" : ""}`}
                                    />
                                </Field>

                                <div className="co__row-2">
                                    <Field label="Pincode" error={errors.pincode}>
                                        <input
                                            type="text" name="pincode" value={formData.pincode}
                                            onChange={handleChange} placeholder="560001"
                                            className={`co__input${errors.pincode ? " co__input--err" : ""}`}
                                        />
                                    </Field>
                                    <Field label="State" error={errors.state}>
                                        <select
                                            name="state" value={formData.state}
                                            onChange={handleChange}
                                            className={`co__input co__select${errors.state ? " co__input--err" : ""}`}
                                        >
                                            <option value="">Select State</option>
                                            <option>Andhra Pradesh</option>
                                            <option>Assam</option>
                                            <option>Bihar</option>
                                            <option>Delhi</option>
                                            <option>Gujarat</option>
                                            <option>Haryana</option>
                                            <option>Himachal Pradesh</option>
                                            <option>Jharkhand</option>
                                            <option>Karnataka</option>
                                            <option>Kerala</option>
                                            <option>Madhya Pradesh</option>
                                            <option>Maharashtra</option>
                                            <option>Odisha</option>
                                            <option>Punjab</option>
                                            <option>Rajasthan</option>
                                            <option>Tamil Nadu</option>
                                            <option>Telangana</option>
                                            <option>Uttar Pradesh</option>
                                            <option>Uttarakhand</option>
                                            <option>West Bengal</option>
                                        </select>
                                    </Field>
                                </div>
                            </div>

                            {/* Section: Payment */}
                            <div className="co__section">
                                <h2 className="co__section-title">
                                    <span className="co__step-num">2</span>
                                    Payment Method
                                </h2>

                                <div className="co__payment-grid">
                                    {/* Razorpay */}
                                    <label className={`co__pay-card${formData.paymentMethod === "razorpay" ? " co__pay-card--active" : ""}`}>
                                        <input type="radio" name="paymentMethod" value="razorpay"
                                            checked={formData.paymentMethod === "razorpay"}
                                            onChange={handleChange} className="co__radio-hidden" />
                                        <div className="co__pay-radio">
                                            {formData.paymentMethod === "razorpay" && <div className="co__pay-dot" />}
                                        </div>
                                        <div className="co__pay-info">
                                            <span className="co__pay-title">💳 Razorpay</span>
                                            <span className="co__pay-sub">Cards, UPI, Netbanking — FREE shipping</span>
                                        </div>
                                    </label>

                                    {/* COD */}
                                    <label className={`co__pay-card${formData.paymentMethod === "cod" ? " co__pay-card--active" : ""}`}>
                                        <input type="radio" name="paymentMethod" value="cod"
                                            checked={formData.paymentMethod === "cod"}
                                            onChange={handleChange} className="co__radio-hidden" />
                                        <div className="co__pay-radio">
                                            {formData.paymentMethod === "cod" && <div className="co__pay-dot" />}
                                        </div>
                                        <div className="co__pay-info">
                                            <span className="co__pay-title">🚚 Cash on Delivery</span>
                                            <span className="co__pay-sub">Pay when you receive · +₹{config.shipping_charge} shipping</span>
                                        </div>
                                    </label>
                                </div>

                                {formData.paymentMethod === "cod" && (
                                    <div className="co__cod-notice">
                                        <span>📞</span>
                                        <p>Our team will call to confirm your order before dispatch.</p>
                                    </div>
                                )}
                            </div>

                            {/* Policy agreement */}
                            <div className="co__section">
                                <label className="co__agree-label">
                                    <input
                                        type="checkbox" name="agreedToPolicies"
                                        checked={formData.agreedToPolicies}
                                        onChange={handleChange}
                                        className="co__checkbox"
                                    />
                                    <span className="co__agree-text">
                                        I agree to the{" "}
                                        <Link href="/terms" target="_blank" className="co__agree-link">Terms & Conditions</Link>,{" "}
                                        <Link href="/refund-policy" target="_blank" className="co__agree-link">Refund Policy</Link>,{" "}
                                        <Link href="/return-policy" target="_blank" className="co__agree-link">Return Policy</Link> and{" "}
                                        <Link href="/cancellation-policy" target="_blank" className="co__agree-link">Cancellation Policy</Link>.
                                    </span>
                                </label>
                                {errors.agreedToPolicies && (
                                    <p className="co__field-err" style={{ marginTop: 8 }}>{errors.agreedToPolicies}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={isSubmitting} className="co__submit">
                                {isSubmitting
                                    ? <><div className="co__spinner" /> Processing…</>
                                    : formData.paymentMethod === "razorpay"
                                        ? "💳 Pay ₹" + totalPrice + " with Razorpay"
                                        : "✅ Place COD Order · ₹" + totalPrice
                                }
                            </button>

                        </form>
                    </div>

                    {/* ══ RIGHT: Order summary ══ */}
                    <div className="co__summary-col">
                        <div className="co__summary-card">
                            <h2 className="co__summary-title">Order Summary</h2>

                            {/* Product row */}
                            <div className="co__product-row">
                                <div className="co__product-img">🌿</div>
                                <div className="co__product-info">
                                    <strong className="co__product-name">Sanjari Herbal Hair Oil</strong>
                                    <div className="co__qty-wrap">
                                        <span className="co__product-sub">Qty:</span>
                                        <div className="co__qty-mini">
                                            <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="co__qty-btn">-</button>
                                            <span className="co__qty-val">{quantity}</span>
                                            <button type="button" onClick={() => setQuantity(quantity + 1)} className="co__qty-btn">+</button>
                                        </div>
                                    </div>
                                </div>
                                <span className="co__product-price">₹{subtotal}</span>


                            </div>

                            {/* Coupon */}
                            <div className="co__coupon">
                                <div className="co__coupon-row">
                                    <input
                                        type="text" value={couponInput}
                                        onChange={e => setCouponInput(e.target.value)}
                                        placeholder="Coupon Code"
                                        className="co__coupon-input"
                                        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                                    />
                                    <button type="button" onClick={() => applyCoupon()} className="co__coupon-btn">
                                        Apply
                                    </button>

                                </div>
                                {couponStatus && (
                                    <p className={`co__coupon-msg co__coupon-msg--${couponStatus.type}`}>
                                        {couponStatus.message}
                                    </p>
                                )}
                            </div>

                            {/* Price breakdown */}
                            <div className="co__price-list">
                                <div className="co__price-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="co__price-row co__price-row--discount">
                                        <span>Coupon Discount</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                <div className="co__price-row">
                                    <span>Shipping</span>
                                    {shippingFee > 0
                                        ? <span>₹{shippingFee}</span>
                                        : <span className="co__free">FREE</span>
                                    }
                                </div>
                                <div className="co__price-total">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>

                            {/* Trust */}
                            <div className="co__trust">
                                <div className="co__trust-item">🔒 <span>Secure Payments via Razorpay</span></div>
                                <div className="co__trust-item">🌿 <span>100% Herbal · Ayurvedic Formula</span></div>
                                <div className="co__trust-item">🚚 <span>Delivery in 5–8 Business Days</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ═══════════════════════════════════════ STYLES ════════════════════════════════════════ */}
            <style>{`
                /* ── Page ─────────────────────────────────── */
                .co__page {
                    min-height: 100vh;
                    background: #f3faf4;
                    font-family: var(--font-inter, Inter, system-ui, sans-serif);
                    color: #212121;
                    padding: 0 20px 80px;
                    position: relative;
                    overflow: hidden;
                }

                /* ── Background blobs ─────────────────────── */
                .co__blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(90px);
                    opacity: 0.4;
                    z-index: 0;
                }
                .co__blob--1 {
                    width: 500px; height: 500px;
                    top: -150px; left: -150px;
                    background: #C8E6C9;
                }
                .co__blob--2 {
                    width: 400px; height: 400px;
                    bottom: -100px; right: -100px;
                    background: #A5D6A7;
                }

                /* ── Wrap ─────────────────────────────────── */
                .co__wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding-top: 40px;
                }

                /* ── Hero header ──────────────────────────── */
                .co__hero {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    margin-bottom: 36px;
                    flex-wrap: wrap;
                }
                .co__hero-left {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                .co__logo { object-fit: contain; }
                .co__title {
                    font-family: var(--font-poppins, Poppins, sans-serif);
                    font-size: clamp(22px, 4vw, 32px);
                    font-weight: 800;
                    color: #1a5c2a;
                    margin: 0 0 2px;
                    line-height: 1.2;
                }
                .co__subtitle {
                    font-size: 0.9rem;
                    color: #777;
                    margin: 0;
                }
                .co__hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #2d8a3e;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 20px;
                    padding: 6px 14px;
                }

                /* ── Grid ─────────────────────────────────── */
                .co__grid {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 28px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .co__grid { grid-template-columns: 1fr; }
                    .co__summary-col { order: -1; }
                }

                /* ── Sections ─────────────────────────────── */
                .co__section {
                    background: #ffffff;
                    border: 1px solid #C8E6C9;
                    border-radius: 20px;
                    padding: 28px;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 20px rgba(26, 92, 42, 0.06);
                }
                .co__section-title {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1rem;
                    font-weight: 700;
                    color: #212121;
                    margin: 0 0 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .co__step-num {
                    width: 26px; height: 26px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 800;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                /* ── Form fields ──────────────────────────── */
                .co__row-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                @media (max-width: 500px) { .co__row-2 { grid-template-columns: 1fr; } }

                .co__field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
                .co__field:last-child { margin-bottom: 0; }
                .co__label {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #444;
                    letter-spacing: 0.01em;
                }
                .co__input {
                    width: 100%;
                    background: #f7fdf7;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 12px;
                    padding: 12px 14px;
                    font-size: 0.95rem;
                    color: #212121;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    font-family: inherit;
                    box-sizing: border-box;
                }
                .co__input:focus {
                    border-color: #2d8a3e;
                    box-shadow: 0 0 0 3px rgba(45, 138, 62, 0.12);
                    background: #fff;
                }
                .co__input--err {
                    border-color: #e53e3e !important;
                    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
                }
                .co__textarea { resize: vertical; min-height: 90px; }
                .co__select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    padding-right: 38px;
                    color: #212121;
                }
                .co__field-err {
                    font-size: 0.775rem;
                    color: #e53e3e;
                    margin: 0;
                }

                /* ── Payment cards ────────────────────────── */
                .co__payment-grid { display: flex; flex-direction: column; gap: 12px; }
                .co__pay-card {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 16px 18px;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 14px;
                    cursor: pointer;
                    background: #f7fdf7;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                }
                .co__pay-card:hover { border-color: #2d8a3e; background: #fff; }
                .co__pay-card--active {
                    border-color: #2d8a3e;
                    background: #E8F5E9;
                    box-shadow: 0 0 0 3px rgba(45, 138, 62, 0.1);
                }
                .co__radio-hidden { display: none; }
                .co__pay-radio {
                    width: 20px; height: 20px;
                    border-radius: 50%;
                    border: 2px solid #2d8a3e;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .co__pay-dot {
                    width: 10px; height: 10px;
                    border-radius: 50%;
                    background: #2d8a3e;
                }
                .co__pay-info { display: flex; flex-direction: column; gap: 2px; }
                .co__pay-title { font-size: 0.95rem; font-weight: 700; color: #212121; }
                .co__pay-sub   { font-size: 0.8rem; color: #777; }

                /* COD notice */
                .co__cod-notice {
                    margin-top: 14px;
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    background: #E8F5E9;
                    border: 1px solid #A5D6A7;
                    border-radius: 12px;
                    padding: 12px 14px;
                    font-size: 0.85rem;
                    color: #2d5a2d;
                }
                .co__cod-notice p { margin: 0; }

                /* ── Policy agreement ─────────────────────── */
                .co__agree-label {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    cursor: pointer;
                }
                .co__checkbox {
                    width: 18px; height: 18px;
                    border: 2px solid #A5D6A7;
                    border-radius: 5px;
                    cursor: pointer;
                    flex-shrink: 0;
                    margin-top: 1px;
                    accent-color: #2d8a3e;
                }
                .co__agree-text {
                    font-size: 0.875rem;
                    color: #555;
                    line-height: 1.6;
                }
                .co__agree-link {
                    color: #2d8a3e;
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }
                .co__agree-link:hover { color: #1a5c2a; }

                /* ── Submit button ────────────────────────── */
                .co__submit {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 24px;
                    background: linear-gradient(135deg, #2d8a3e, #388E3C);
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 700;
                    border: none;
                    border-radius: 16px;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(45, 138, 62, 0.35);
                    transition: all 0.2s;
                    font-family: inherit;
                }
                .co__submit:hover:not(:disabled) {
                    background: linear-gradient(135deg, #1a5c2a, #2d8a3e);
                    box-shadow: 0 10px 30px rgba(45, 138, 62, 0.45);
                    transform: translateY(-1px);
                }
                .co__submit:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }
                .co__spinner {
                    width: 18px; height: 18px;
                    border: 2.5px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: co-spin 0.7s linear infinite;
                }
                @keyframes co-spin { to { transform: rotate(360deg); } }

                /* ── Order Summary Card ───────────────────── */
                .co__summary-card {
                    background: #ffffff;
                    border: 1px solid #C8E6C9;
                    border-radius: 20px;
                    padding: 28px;
                    box-shadow: 0 4px 20px rgba(26, 92, 42, 0.06);
                    position: sticky;
                    top: 100px;
                }
                .co__summary-title {
                    font-family: var(--font-poppins, sans-serif);
                    font-size: 1rem;
                    font-weight: 700;
                    color: #1a5c2a;
                    margin: 0 0 20px;
                }

                /* Product */
                .co__product-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding-bottom: 20px;
                    border-bottom: 1px dashed #C8E6C9;
                    margin-bottom: 20px;
                }
                .co__product-img {
                    width: 52px; height: 52px;
                    background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
                    border: 1px solid #A5D6A7;
                    border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.6rem;
                    flex-shrink: 0;
                }
                .co__product-info { flex: 1; display: flex; flex-direction: column; gap: 3px; }
                .co__product-name { font-size: 0.9rem; font-weight: 700; color: #212121; }
                .co__product-sub  { font-size: 0.78rem; color: #888; }
                .co__product-price { font-size: 1rem; font-weight: 800; color: #1a5c2a; }

                /* Quantity controls mini */
                .co__qty-wrap { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
                .co__qty-mini {
                    display: flex;
                    align-items: center;
                    background: #f1f8f1;
                    border: 1px solid #C8E6C9;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .co__qty-btn {
                    width: 24px; height: 24px;
                    background: none;
                    border: none;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #2d8a3e;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: background 0.15s;
                }
                .co__qty-btn:hover { background: #E8F5E9; }
                .co__qty-val {
                    width: 26px;
                    text-align: center;
                    font-size: 0.8rem;
                    font-weight: 800;
                    color: #1a5c2a;
                    border-left: 1px solid #C8E6C9;
                    border-right: 1px solid #C8E6C9;
                }


                /* Coupon */
                .co__coupon { margin-bottom: 20px; }
                .co__coupon-row { display: flex; gap: 8px; }
                .co__coupon-input {
                    flex: 1;
                    background: #f7fdf7;
                    border: 1.5px solid #C8E6C9;
                    border-radius: 10px;
                    padding: 10px 12px;
                    font-size: 0.875rem;
                    color: #212121;
                    outline: none;
                    font-family: inherit;
                    transition: border-color 0.2s;
                }
                .co__coupon-input:focus { border-color: #2d8a3e; }
                .co__coupon-btn {
                    padding: 10px 16px;
                    background: #E8F5E9;
                    border: 1.5px solid #A5D6A7;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #2d8a3e;
                    cursor: pointer;
                    transition: background 0.2s;
                    font-family: inherit;
                    white-space: nowrap;
                }
                .co__coupon-btn:hover { background: #C8E6C9; }
                .co__coupon-msg { font-size: 0.8rem; margin: 8px 0 0; }
                .co__coupon-msg--success { color: #2d8a3e; }
                .co__coupon-msg--error   { color: #e53e3e; }

                /* Price list */
                .co__price-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .co__price-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                    color: #666;
                }
                .co__price-row--discount { color: #2d8a3e; font-weight: 600; }
                .co__free { color: #2d8a3e; font-weight: 700; }
                .co__price-total {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.15rem;
                    font-weight: 800;
                    color: #1a5c2a;
                    padding-top: 12px;
                    border-top: 1.5px solid #C8E6C9;
                    margin-top: 4px;
                }

                /* Trust */
                .co__trust {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    border-top: 1px dashed #C8E6C9;
                    padding-top: 16px;
                }
                .co__trust-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    color: #555;
                }
            `}</style>
        </div>
    );
}

/* ─── Field wrapper ──────────────────────────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="co__field">
            <label className="co__label">{label}</label>
            {children}
            {error && <p className="co__field-err">{error}</p>}
        </div>
    );
}
