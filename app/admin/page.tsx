"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Data states
    const [orders, setOrders] = useState<any[]>([]);
    const [coupons, setCoupons] = useState<any[]>([]);
    const [shippingCharge, setShippingCharge] = useState("60");
    const [activeTab, setActiveTab] = useState("orders");
    const [suppressWarning, setSuppressWarning] = useState(false);

    // Form states for adding coupon
    const [newCoupon, setNewCoupon] = useState({ code: "", discount_value: "", type: "flat" });

    // Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    useEffect(() => {
        if (localStorage.getItem("admin_auth") === "true") {
            setIsLoggedIn(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        if (!supabase) return;

        try {
            // Fetch Orders
            const { data: oData, error: oErr } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false });

            if (oErr) console.error("Orders Fetch Error:", oErr);
            setOrders(oData || []);

            // Fetch Config
            const res = await fetch("/api/admin/config");
            const data = await res.json();
            if (data.coupons) setCoupons(data.coupons);
            if (data.settings?.shipping_charge) setShippingCharge(data.settings.shipping_charge);
        } catch (err) {
            console.error("Fetch Data Error:", err);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (data.success) {
                setIsLoggedIn(true);
                localStorage.setItem("admin_auth", "true");
                fetchData();
            } else {
                setError("Invalid administrator password");
            }
        } catch (err) {
            setError("Authentication service failure");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        setIsLoggedIn(false);
    };

    const updateShipping = async () => {
        try {
            const res = await fetch("/api/admin/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "setting", data: { key: "shipping_charge", value: shippingCharge } }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Shipping charge updated!");
            } else {
                alert("Error: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            alert("Failed to update shipping charge");
        }
    };

    const addCoupon = async () => {
        try {
            const res = await fetch("/api/admin/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "coupon",
                    action: "add",
                    data: { ...newCoupon, discount_value: parseFloat(newCoupon.discount_value), is_active: true }
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setNewCoupon({ code: "", discount_value: "", type: "flat" });
                fetchData();
            } else {
                alert("Error: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            alert("Failed to add coupon");
        }
    };

    const deleteCoupon = async (id: number) => {
        try {
            const res = await fetch("/api/admin/config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "coupon", action: "delete", data: { id } }),
            });
            if (res.ok) {
                fetchData();
            } else {
                const data = await res.json();
                alert("Error: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            alert("Failed to delete coupon");
        }
    };

    const updateOrderStatus = async (orderId: number, status: string) => {
        try {
            const res = await fetch("/api/orders/update-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status }),
            });
            if (res.ok) {
                fetchData();
            } else {
                const data = await res.json();
                alert("Error: " + (data.error || "Failed to update status"));
            }
        } catch (err) {
            alert("Failed to connect to status service");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans text-white">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-8">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500/50 outline-none" />
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-2xl disabled:opacity-50">
                            {isLoading ? "Authenticating..." : "Enter Dashboard"}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const statuses = ["pending", "accepted", "rejected", "shipped", "delivered", "canceled"];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
            <div className="max-w-[100%] mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent italic">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-sm transition-all hover:bg-white/10">Sign Out</button>
                </header>

                {!supabase && !suppressWarning && (
                    <div className="mb-12 p-6 bg-red-500/10 border border-red-500/50 rounded-3xl flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h3 className="font-bold text-red-400">Supabase Connection Missing</h3>
                                <p className="text-sm text-gray-400">Please add your real Supabase credentials to the .env file to manage data.</p>
                            </div>
                        </div>
                        <button onClick={() => setSuppressWarning(true)} className="text-xs text-gray-500 underline ml-4">dismiss</button>
                    </div>
                )}

                <div className="flex space-x-4 mb-12 border-b border-white/10 pb-4">
                    {["orders", "coupons", "settings"].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-xl capitalize transition-all font-bold italic ${activeTab === tab ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-white/5"}`}>{tab}</button>
                    ))}
                </div>

                {activeTab === "orders" && (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <h2 className="text-2xl font-bold italic">Customer Orders</h2>

                            <div className="flex flex-wrap gap-4">
                                <input
                                    type="text"
                                    placeholder="Search name, email, ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-500 min-w-[250px]"
                                />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-500"
                                >
                                    <option value="all">All Status</option>
                                    {statuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                                </select>
                                <select
                                    value={paymentFilter}
                                    onChange={(e) => setPaymentFilter(e.target.value)}
                                    className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-500"
                                >
                                    <option value="all">All Payments</option>
                                    <option value="razorpay">Razorpay</option>
                                    <option value="cod">COD</option>
                                </select>
                            </div>
                        </div>

                        {orders.length === 0 ? (
                            <div className="py-20 text-center text-gray-500 italic">No orders found yet.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="text-gray-400 border-b border-white/10 italic text-[10px] uppercase tracking-wider">
                                        <tr>
                                            <th className="pb-4 pr-4">ID</th>
                                            <th className="pb-4 px-4">Date & Time</th>
                                            <th className="pb-4 px-4">Full Name</th>
                                            <th className="pb-4 px-4">Email & Phone</th>
                                            <th className="pb-4 px-4">Location (Pin/State/Addr)</th>
                                            <th className="pb-4 px-4">Amount</th>
                                            <th className="pb-4 px-4">Method</th>
                                            <th className="pb-4 pl-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {orders
                                            .filter(order => {
                                                const search = searchTerm.toLowerCase();
                                                const matchesSearch =
                                                    (order.customer_name?.toLowerCase() || "").includes(search) ||
                                                    (order.email?.toLowerCase() || "").includes(search) ||
                                                    (order.phone?.toLowerCase() || "").includes(search) ||
                                                    (order.order_id?.toLowerCase() || "").includes(search) ||
                                                    (order.id?.toString() || "").includes(search);

                                                const matchesStatus = statusFilter === "all" || (order.status?.toLowerCase().trim() === statusFilter.toLowerCase().trim());
                                                const matchesPayment = paymentFilter === "all" || (order.payment_method?.toLowerCase().trim() === paymentFilter.toLowerCase().trim());
                                                return matchesSearch && matchesStatus && matchesPayment;
                                            })
                                            .map((order) => (
                                                <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors text-[13px]">
                                                    <td className="py-4 font-bold font-mono text-purple-300">#{order.order_id || `DB-${order.id}`}</td>
                                                    <td className="py-4 px-4 text-gray-400 whitespace-nowrap">
                                                        {new Date(order.created_at).toLocaleDateString()}<br />
                                                        <span className="text-[10px]">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </td>
                                                    <td className="py-4 px-4 font-medium italic whitespace-nowrap">{order.customer_name}</td>
                                                    <td className="py-4 px-4">
                                                        <div className="font-medium text-gray-300">{order.email}</div>
                                                        <div className="text-[11px] text-gray-500">{order.phone}</div>
                                                    </td>
                                                    <td className="py-4 px-4 max-w-[200px]">
                                                        <div className="text-gray-300 font-medium">Pin: {order.pincode} | {order.state}</div>
                                                        <div className="text-[11px] text-gray-500 truncate" title={order.address}>{order.address}</div>
                                                    </td>
                                                    <td className="py-4 px-4 font-bold italic text-purple-400">₹{order.amount}</td>
                                                    <td className="py-4 px-4">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${order.payment_method === 'cod' ? 'border-yellow-500/30 text-yellow-500/80' : 'border-blue-500/30 text-blue-500/80'
                                                            }`}>
                                                            {order.payment_method}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 pl-4">
                                                        <select
                                                            value={order.status || 'pending'}
                                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                            className={`bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-bold uppercase outline-none focus:ring-1 focus:ring-purple-500 transition-all ${order.status === 'delivered' ? 'text-green-400' :
                                                                    order.status === 'canceled' || order.status === 'rejected' ? 'text-red-400' :
                                                                        order.status === 'shipped' ? 'text-blue-400' :
                                                                            'text-yellow-400'
                                                                }`}
                                                        >
                                                            {!statuses.includes(order.status) && order.status && (
                                                                <option value={order.status}>{order.status.toUpperCase()}</option>
                                                            )}
                                                            {statuses.map(s => (
                                                                <option key={s} value={s} className="bg-[#1a1a1a]">{s.toUpperCase()}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "coupons" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-8 italic">Add New Coupon</h2>
                            <div className="space-y-4">
                                <input type="text" placeholder="CODE (e.g. SAVE10)" value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-purple-500" />
                                <div className="flex space-x-4">
                                    <input type="number" placeholder="Value" value={newCoupon.discount_value} onChange={e => setNewCoupon({ ...newCoupon, discount_value: e.target.value })} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-purple-500 font-bold" />
                                    <select value={newCoupon.type} onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })} className="bg-[#1a1a1a] border border-white/10 rounded-xl px-6 outline-none focus:ring-1 focus:ring-purple-500">
                                        <option value="flat">Flat ₹</option>
                                        <option value="percentage">%</option>
                                    </select>
                                </div>
                                <button onClick={addCoupon} className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20">Add Coupon</button>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-8 italic">Active Coupons</h2>
                            {coupons.length === 0 ? (
                                <div className="text-gray-500 italic">No active coupons. Add one to see it here.</div>
                            ) : (
                                <div className="space-y-4">
                                    {coupons.map(coupon => (
                                        <div key={coupon.id} className="flex justify-between items-center p-4 border border-white/5 rounded-2xl bg-white/5">
                                            <div>
                                                <span className="font-bold text-lg">{coupon.code}</span>
                                                <p className="text-sm text-gray-400 italic font-medium">{coupon.type === 'flat' ? `₹${coupon.discount_value} OFF` : `${coupon.discount_value}% OFF`}</p>
                                            </div>
                                            <button onClick={() => deleteCoupon(coupon.id)} className="text-red-400 hover:text-red-300 text-sm transition-colors">Remove</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="max-w-md bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-8 italic text-purple-400">Store Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2 font-medium">COD Shipping Charge (₹)</label>
                                <input type="number" value={shippingCharge} onChange={e => setShippingCharge(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:ring-1 focus:ring-purple-500 font-bold" />
                            </div>
                            <button onClick={updateShipping} className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-gray-200">Update Settings</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
