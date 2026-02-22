"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        pincode: "",
        state: "",
        paymentMethod: "razorpay",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [config, setConfig] = useState<{ shipping_charge: number; coupons: any[] }>({
        shipping_charge: 60,
        coupons: [],
    });

    // Coupon states
    const [couponInput, setCouponInput] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponStatus, setCouponStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    useEffect(() => {
        fetch("/api/admin/config")
            .then(res => res.json())
            .then(data => {
                if (data.settings) {
                    setConfig({
                        shipping_charge: parseInt(data.settings.shipping_charge || "60"),
                        coupons: data.coupons || [],
                    });
                }
            });
    }, []);

    const applyCoupon = () => {
        const code = couponInput.trim().toUpperCase();
        const found = config.coupons.find(c => c.code.toUpperCase() === code && c.is_active);

        if (found) {
            let disc = 0;
            if (found.type === "percentage") {
                disc = Math.round(itemPrice * (found.discount_value / 100));
            } else {
                disc = found.discount_value;
            }
            setDiscount(disc);
            setCouponStatus({
                type: "success",
                message: `Applied! Discount: -₹${disc}`,
            });
        } else if (!code) {
            setCouponStatus({ type: "error", message: "Please enter a code." });
        } else {
            setDiscount(0);
            setCouponStatus({ type: "error", message: "Invalid or inactive coupon code." });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.phone.match(/^\d{10}$/))
            newErrors.phone = "Enter a valid 10-digit phone number";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            newErrors.email = "Enter a valid email address";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.pincode.match(/^\d{6}$/))
            newErrors.pincode = "Enter a valid 6-digit pincode";
        if (!formData.state.trim()) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveOrderToSupabase = async (razorpayData?: any) => {
        try {
            const res = await fetch("/api/orders/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    amount: totalPrice,
                    ...razorpayData,
                }),
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
                body: JSON.stringify({
                    amount: totalPrice,
                    currency: "INR",
                }),
            });

            const order = await res.json();
            if (!res.ok) throw new Error(order.error || "Failed to create order");

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Sanajri Luxury",
                description: "Premium Essence Purchase",
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
                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: { color: "#A855F7" },
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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrs = { ...prev };
                delete newErrs[name];
                return newErrs;
            });
        }
    };

    const shippingFee = formData.paymentMethod === "cod" ? config.shipping_charge : 0;
    const itemPrice = 349;
    const totalPrice = Math.max(0, itemPrice + shippingFee - discount);

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

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Secure Checkout
                    </h1>
                    <p className="text-gray-400 mt-2">Complete your purchase safely and quickly.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className={`w-full bg-white/5 border ${errors.fullName ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={`w-full bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" className={`w-full bg-white/5 border ${errors.phone ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Pincode</label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="123456" className={`w-full bg-white/5 border ${errors.pincode ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                                    {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Shipping Address</label>
                                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Flat, House no., Building, Company, Apartment" rows={3} className={`w-full bg-white/5 border ${errors.address ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`} />
                                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">State</label>
                                <select name="state" value={formData.state} onChange={handleChange} className={`w-full bg-white/5 border ${errors.state ? "border-red-500" : "border-white/10"} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-300 appearance-none`}>
                                    <option value="">Select State</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                </select>
                                {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="text-lg font-semibold text-white block">Payment Method</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={`relative flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === "razorpay" ? "bg-purple-500/10 border-purple-500" : "bg-white/5 border-white/10 hover:border-white/20"}`}>
                                        <input type="radio" name="paymentMethod" value="razorpay" checked={formData.paymentMethod === "razorpay"} onChange={handleChange} className="hidden" />
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "razorpay" ? "border-purple-500" : "border-gray-500"}`}>
                                                {formData.paymentMethod === "razorpay" && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full" />}
                                            </div>
                                            <div>
                                                <span className="block font-medium">Razorpay</span>
                                                <span className="text-xs text-gray-400">Cards, UPI, Netbanking</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label className={`relative flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${formData.paymentMethod === "cod" ? "bg-purple-500/10 border-purple-500" : "bg-white/5 border-white/10 hover:border-white/20"}`}>
                                        <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleChange} className="hidden" />
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === "cod" ? "border-purple-500" : "border-gray-500"}`}>
                                                {formData.paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-purple-500 rounded-full" />}
                                            </div>
                                            <div>
                                                <span className="block font-medium">Cash on Delivery</span>
                                                <span className="text-xs text-gray-400">Pay when you receive</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span>Complete Purchase</span>}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 sticky top-8">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                                        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">Premium Essence</h3>
                                        <p className="text-sm text-gray-400">Quantity: 1</p>
                                    </div>
                                    <span className="font-bold">₹349</span>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex space-x-2">
                                        <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon Code" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                                        <button type="button" onClick={applyCoupon} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-all">Apply</button>
                                    </div>
                                    {couponStatus && <p className={`mt-2 text-xs ${couponStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>{couponStatus.message}</p>}
                                </div>
                            </div>
                            <div className="border-t border-white/10 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{itemPrice}</span>
                                </div>
                                {discount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>-₹{discount}</span></div>}
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    {shippingFee > 0 ? <span className="text-white font-medium">₹{shippingFee}</span> : <span className="text-green-400 font-medium">FREE</span>}
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-4 text-white border-t border-white/10">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
