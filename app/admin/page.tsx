"use client";

import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

/* ═══════════════════════════════════════════
   ICONS
═══════════════════════════════════════════ */
const Icon = {
    orders: () => (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
    ),
    slides: () => (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
    ),
    coupons: () => (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
    ),
    contacts: () => (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
    ),
    settings: () => (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
    ),
    logout: () => (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
    ),
    trash: () => (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
    ),
};

const TABS = [
    { id: "orders", label: "Orders", Icon: Icon.orders },
    { id: "slides", label: "Slides", Icon: Icon.slides },
    { id: "contacts", label: "Contacts", Icon: Icon.contacts },
    { id: "coupons", label: "Coupons", Icon: Icon.coupons },
    { id: "settings", label: "Settings", Icon: Icon.settings },
];

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("orders");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Data
    const [orders, setOrders] = useState<any[]>([]);
    const [coupons, setCoupons] = useState<any[]>([]);
    const [slides, setSlides] = useState<any[]>([]);
    const [contacts, setContacts] = useState<any[]>([]);
    const [shippingCharge, setShippingCharge] = useState("60");
    const [suppressWarning, setSuppressWarning] = useState(false);

    // Coupon form
    const [newCoupon, setNewCoupon] = useState({ code: "", discount_value: "", type: "flat" });

    // Order filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    // Slide upload
    const [slideTitle, setSlideTitle] = useState("");
    const [slideSubtitle, setSlideSubtitle] = useState("");
    const [slideFile, setSlideFile] = useState<File | null>(null);
    const [slidePreview, setSlidePreview] = useState<string | null>(null);
    const [mobileSlidrFile, setMobileSlideFile] = useState<File | null>(null);
    const [mobileSlidePreview, setMobileSlidePreview] = useState<string | null>(null);
    const [slideUploading, setSlideUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mobileFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (localStorage.getItem("admin_auth") === "true") {
            setIsLoggedIn(true);
            fetchAll();
        }
    }, []);

    const fetchAll = async () => {
        if (!supabase) return;
        const { data: oData } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
        setOrders(oData || []);
        const res = await fetch("/api/admin/config");
        const data = await res.json();
        if (data.coupons) setCoupons(data.coupons);
        if (data.settings?.shipping_charge) setShippingCharge(data.settings.shipping_charge);
        fetchSlides();
        fetchContacts();
    };

    const fetchSlides = async () => {
        const res = await fetch("/api/admin/slides");
        const data = await res.json();
        if (data.slides) setSlides(data.slides);
    };

    const fetchContacts = async () => {
        const res = await fetch("/api/admin/contacts");
        const data = await res.json();
        if (data.contacts) setContacts(data.contacts);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); setError("");
        try {
            const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
            const data = await res.json();
            if (data.success) { setIsLoggedIn(true); localStorage.setItem("admin_auth", "true"); fetchAll(); }
            else setError("Invalid administrator password");
        } catch { setError("Authentication service failure"); }
        finally { setIsLoading(false); }
    };

    const handleLogout = () => { localStorage.removeItem("admin_auth"); setIsLoggedIn(false); };

    const updateShipping = async () => {
        const res = await fetch("/api/admin/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "setting", data: { key: "shipping_charge", value: shippingCharge } }) });
        if (res.ok) alert("Shipping charge updated!");
    };

    const addCoupon = async () => {
        const res = await fetch("/api/admin/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "coupon", action: "add", data: { ...newCoupon, discount_value: parseFloat(newCoupon.discount_value), is_active: true } }) });
        if (res.ok) { setNewCoupon({ code: "", discount_value: "", type: "flat" }); fetchAll(); }
    };

    const deleteCoupon = async (id: number) => {
        const res = await fetch("/api/admin/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "coupon", action: "delete", data: { id } }) });
        if (res.ok) fetchAll();
    };

    const deleteContact = async (id: number) => {
        if (!confirm("Delete this message?")) return;
        const res = await fetch("/api/admin/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete", data: { id } }) });
        if (res.ok) fetchContacts();
    };

    const updateOrderStatus = async (orderId: number, status: string) => {
        const res = await fetch("/api/orders/update-status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, status }) });
        if (res.ok) fetchAll();
    };

    const uploadFileToSupabase = async (file: File, prefix: string): Promise<string> => {
        const ext = file.name.split(".").pop();
        const fileName = `${prefix}_${Date.now()}.${ext}`;
        const { error } = await supabase!.storage.from("hero-slides").upload(fileName, file, { upsert: true });
        if (error) throw error;
        const { data: urlData } = supabase!.storage.from("hero-slides").getPublicUrl(fileName);
        return urlData.publicUrl;
    };

    const uploadSlide = async () => {
        if (!slideFile || !supabase) { alert(!slideFile ? "Please select a desktop image." : "Supabase not configured."); return; }
        setSlideUploading(true);
        try {
            const imageUrl = await uploadFileToSupabase(slideFile, "desktop");
            const mobileImageUrl = mobileSlidrFile ? await uploadFileToSupabase(mobileSlidrFile, "mobile") : null;
            const res = await fetch("/api/admin/slides", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "add", data: { image_url: imageUrl, mobile_image_url: mobileImageUrl, title: slideTitle, subtitle: slideSubtitle, sort_order: slides.length } }) });
            if (!res.ok) throw new Error((await res.json()).error || "Failed");
            setSlideFile(null); setSlidePreview(null); setMobileSlideFile(null); setMobileSlidePreview(null); setSlideTitle(""); setSlideSubtitle("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (mobileFileInputRef.current) mobileFileInputRef.current.value = "";
            fetchSlides(); alert("Slide uploaded!");
        } catch (err: any) { alert("Error: " + err.message); }
        finally { setSlideUploading(false); }
    };

    const deleteSlide = async (id: number) => {
        if (!confirm("Delete this slide?")) return;
        const res = await fetch("/api/admin/slides", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete", data: { id } }) });
        if (res.ok) fetchSlides();
    };

    const statuses = ["pending", "accepted", "rejected", "shipped", "delivered", "canceled"];

    /* ── LOGIN ── */
    if (!isLoggedIn) return (
        <div className="adm-login">
            <div className="adm-login__card">
                <div className="adm-login__brand">
                    <span className="adm-login__leaf">🌿</span>
                    <h1 className="adm-login__title">Sanjari Admin</h1>
                    <p className="adm-login__sub">Sign in to manage your store</p>
                </div>
                <form onSubmit={handleLogin} className="adm-login__form">
                    <div className="adm-field">
                        <label className="adm-label">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" className="adm-input" autoFocus />
                    </div>
                    {error && <p className="adm-error">{error}</p>}
                    <button type="submit" disabled={isLoading} className="adm-btn--primary" style={{ width: "100%" }}>
                        {isLoading ? "Signing in…" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );

    /* ── DASHBOARD ── */
    const pendingCount = orders.filter(o => o.status === "pending").length;
    const todayRevenue = orders.filter(o => { const d = new Date(o.created_at); const n = new Date(); return d.toDateString() === n.toDateString(); }).reduce((s, o) => s + Number(o.amount || 0), 0);

    return (
        <div className="adm">

            {/* ── Sidebar ── */}
            <aside className={`adm-sidebar ${sidebarOpen ? "adm-sidebar--open" : ""}`}>
                <div className="adm-sidebar__brand">
                    <span className="adm-sidebar__leaf">🌿</span>
                    <span className="adm-sidebar__name">Sanjari</span>
                </div>
                <nav className="adm-sidebar__nav">
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => { setActiveTab(t.id); setSidebarOpen(false); }} className={`adm-sidebar__link ${activeTab === t.id ? "adm-sidebar__link--active" : ""}`}>
                            <t.Icon />{t.label}
                            {t.id === "orders" && pendingCount > 0 && <span className="adm-sidebar__badge">{pendingCount}</span>}
                            {t.id === "contacts" && contacts.length > 0 && <span className="adm-sidebar__badge">{contacts.length}</span>}
                        </button>
                    ))}
                </nav>
                <button onClick={handleLogout} className="adm-sidebar__logout"><Icon.logout />Sign Out</button>
            </aside>

            {/* ── Mobile overlay ── */}
            {sidebarOpen && <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />}

            {/* ── Main ── */}
            <main className="adm-main">

                {/* Top bar */}
                <header className="adm-topbar">
                    <button className="adm-topbar__hamburger" onClick={() => setSidebarOpen(s => !s)} aria-label="Menu">
                        <span /><span /><span />
                    </button>
                    <div className="adm-topbar__title">{TABS.find(t => t.id === activeTab)?.label}</div>
                    <div className="adm-topbar__actions">
                        {!supabase && !suppressWarning && (
                            <button className="adm-topbar__warn" onClick={() => setSuppressWarning(true)}>⚠ Supabase missing <span>×</span></button>
                        )}
                    </div>
                </header>

                {/* Stat cards (orders tab) */}
                {activeTab === "orders" && (
                    <div className="adm-stats">
                        <div className="adm-stat"><div className="adm-stat__label">Total Orders</div><div className="adm-stat__val">{orders.length}</div></div>
                        <div className="adm-stat adm-stat--yellow"><div className="adm-stat__label">Pending</div><div className="adm-stat__val">{pendingCount}</div></div>
                        <div className="adm-stat adm-stat--green"><div className="adm-stat__label">Today&apos;s Revenue</div><div className="adm-stat__val">₹{todayRevenue.toLocaleString("en-IN")}</div></div>
                        <div className="adm-stat"><div className="adm-stat__label">Active Coupons</div><div className="adm-stat__val">{coupons.length}</div></div>
                    </div>
                )}

                <div className="adm-content">

                    {/* ── ORDERS ── */}
                    {activeTab === "orders" && (
                        <div className="adm-card">
                            <div className="adm-card__head">
                                <h2 className="adm-card__title">Customer Orders</h2>
                                <div className="adm-filters">
                                    <input type="text" placeholder="Search name, email, ID…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="adm-input adm-input--sm" />
                                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="adm-select">
                                        <option value="all">All Status</option>
                                        {statuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                                    </select>
                                    <select value={paymentFilter} onChange={e => setPaymentFilter(e.target.value)} className="adm-select">
                                        <option value="all">All Payments</option>
                                        <option value="razorpay">Razorpay</option>
                                        <option value="cod">COD</option>
                                    </select>
                                </div>
                            </div>
                            {orders.length === 0 ? (
                                <div className="adm-empty">📦 No orders yet.</div>
                            ) : (
                                <div className="adm-table-wrap">
                                    <table className="adm-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th><th>Date</th><th>Customer</th><th>Email / Phone</th>
                                                <th>Location</th><th>Amount</th><th>Method</th><th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.filter(o => {
                                                const s = searchTerm.toLowerCase();
                                                const match = !s || [o.customer_name, o.email, o.phone, o.order_id, String(o.id)].some(v => (v || "").toLowerCase().includes(s));
                                                const st = statusFilter === "all" || o.status?.toLowerCase() === statusFilter;
                                                const pm = paymentFilter === "all" || o.payment_method?.toLowerCase() === paymentFilter;
                                                return match && st && pm;
                                            }).map(o => (
                                                <tr key={o.id}>
                                                    <td className="adm-table__id">#{o.order_id || `${o.id}`}</td>
                                                    <td>{new Date(o.created_at).toLocaleDateString()}<br /><span className="adm-table__sub">{new Date(o.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></td>
                                                    <td className="adm-table__name">{o.customer_name}</td>
                                                    <td>{o.email}<br /><span className="adm-table__sub">{o.phone}</span></td>
                                                    <td><span className="adm-table__sub">Pin: {o.pincode} · {o.state}</span><br /><span className="adm-table__addr" title={o.address}>{o.address}</span></td>
                                                    <td className="adm-table__amt">₹{o.amount}</td>
                                                    <td><span className={`adm-badge ${o.payment_method === "cod" ? "adm-badge--yellow" : "adm-badge--blue"}`}>{o.payment_method}</span></td>
                                                    <td>
                                                        <select value={o.status || "pending"} onChange={e => updateOrderStatus(o.id, e.target.value)} className={`adm-status-sel ${o.status === "delivered" ? "adm-status-sel--green" : o.status === "canceled" || o.status === "rejected" ? "adm-status-sel--red" : o.status === "shipped" ? "adm-status-sel--blue" : "adm-status-sel--yellow"}`}>
                                                            {!statuses.includes(o.status) && o.status && <option value={o.status}>{o.status.toUpperCase()}</option>}
                                                            {statuses.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
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

                    {/* ── SLIDES ── */}
                    {activeTab === "slides" && (
                        <div className="adm-split">
                            <div className="adm-card">
                                <h2 className="adm-card__title">Upload Hero Slide</h2>
                                <p className="adm-card__desc">Upload images for the homepage hero carousel. Recommended: 1920×1080px desktop, 9:16 portrait mobile.</p>
                                <div className="adm-img-pickers">
                                    <div>
                                        <p className="adm-label" style={{ marginBottom: 8 }}>🖥️ Desktop Image <span style={{ color: "#2d8a3e" }}>*</span></p>
                                        <div onClick={() => fileInputRef.current?.click()} className="adm-upload-zone">
                                            {slidePreview
                                                ? <img src={slidePreview} alt="Desktop preview" className="adm-upload-zone__img" />
                                                : <><span className="adm-upload-zone__icon">🖼️</span><span className="adm-upload-zone__txt">Click to select</span></>}
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) { setSlideFile(f); setSlidePreview(URL.createObjectURL(f)); } }} />
                                    </div>
                                    <div>
                                        <p className="adm-label" style={{ marginBottom: 8 }}>📱 Mobile Image <span style={{ color: "#888", fontWeight: 400 }}>(optional)</span></p>
                                        <div onClick={() => mobileFileInputRef.current?.click()} className="adm-upload-zone adm-upload-zone--mobile">
                                            {mobileSlidePreview
                                                ? <img src={mobileSlidePreview} alt="Mobile preview" className="adm-upload-zone__img" />
                                                : <><span className="adm-upload-zone__icon">📱</span><span className="adm-upload-zone__txt">Click to select</span></>}
                                        </div>
                                        <input ref={mobileFileInputRef} type="file" accept="image/*" hidden onChange={e => { const f = e.target.files?.[0]; if (f) { setMobileSlideFile(f); setMobileSlidePreview(URL.createObjectURL(f)); } }} />
                                    </div>
                                </div>
                                <div className="adm-field" style={{ marginTop: 20 }}>
                                    <label className="adm-label">Slide Title <span className="adm-opt">(optional)</span></label>
                                    <input type="text" value={slideTitle} onChange={e => setSlideTitle(e.target.value)} placeholder="e.g. Sanjari Herbal Hair Oil" className="adm-input" />
                                </div>
                                <div className="adm-field">
                                    <label className="adm-label">Slide Subtitle <span className="adm-opt">(optional)</span></label>
                                    <input type="text" value={slideSubtitle} onChange={e => setSlideSubtitle(e.target.value)} placeholder="e.g. 100% Natural • Ayurvedic Formula" className="adm-input" />
                                </div>
                                <button onClick={uploadSlide} disabled={slideUploading || !slideFile} className="adm-btn--primary" style={{ width: "100%", marginTop: 20 }}>
                                    {slideUploading ? "Uploading…" : "Upload Slide"}
                                </button>
                            </div>

                            <div className="adm-card">
                                <div className="adm-card__head">
                                    <h2 className="adm-card__title">Current Slides</h2>
                                    <button onClick={fetchSlides} className="adm-btn--ghost">↻ Refresh</button>
                                </div>
                                {slides.length === 0
                                    ? <div className="adm-empty">📷 No slides yet.</div>
                                    : (
                                        <div className="adm-slides-grid">
                                            {slides.map((slide, idx) => (
                                                <div key={slide.id} className="adm-slide-card">
                                                    <div className="adm-slide-card__img-wrap">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={slide.image_url} alt={slide.title || `Slide ${idx + 1}`} className="adm-slide-card__img" />
                                                        {slide.mobile_image_url && <span className="adm-slide-card__mob-badge">📱 Mobile</span>}
                                                        <span className="adm-slide-card__num">#{idx + 1}</span>
                                                    </div>
                                                    <div className="adm-slide-card__body">
                                                        <p className="adm-slide-card__title">{slide.title || <span className="adm-muted">No title</span>}</p>
                                                        <p className="adm-slide-card__sub">{slide.subtitle || <span className="adm-muted">No subtitle</span>}</p>
                                                        <button onClick={() => deleteSlide(slide.id)} className="adm-btn--danger" style={{ width: "100%", marginTop: 10 }}><Icon.trash /> Delete</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* ── CONTACTS ── */}
                    {activeTab === "contacts" && (
                        <div className="adm-card">
                            <div className="adm-card__head">
                                <h2 className="adm-card__title">Contact Messages</h2>
                                <button onClick={fetchContacts} className="adm-btn--ghost">↻ Refresh</button>
                            </div>
                            {contacts.length === 0
                                ? <div className="adm-empty">📬 No contact messages yet.</div>
                                : (
                                    <div className="adm-contacts">
                                        {contacts.map(c => (
                                            <div key={c.id} className="adm-contact-card">
                                                <div className="adm-contact-card__head">
                                                    <div className="adm-contact-card__avatar">{c.name?.[0]?.toUpperCase() || "?"}</div>
                                                    <div>
                                                        <p className="adm-contact-card__name">{c.name}</p>
                                                        <p className="adm-contact-card__meta">{c.email}{c.phone ? ` · ${c.phone}` : ""}</p>
                                                    </div>
                                                    <span className="adm-contact-card__date">{new Date(c.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <p className="adm-contact-card__msg">&ldquo;{c.message}&rdquo;</p>
                                                <div className="adm-contact-card__actions">
                                                    <a href={`mailto:${c.email}`} className="adm-btn--secondary">Reply via Email</a>
                                                    <button onClick={() => deleteContact(c.id)} className="adm-btn--danger"><Icon.trash /> Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>
                    )}

                    {/* ── COUPONS ── */}
                    {activeTab === "coupons" && (
                        <div className="adm-split">
                            <div className="adm-card">
                                <h2 className="adm-card__title">Add New Coupon</h2>
                                <div className="adm-field">
                                    <label className="adm-label">Coupon Code</label>
                                    <input type="text" placeholder="e.g. SAVE10" value={newCoupon.code} onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })} className="adm-input" />
                                </div>
                                <div className="adm-row">
                                    <div className="adm-field" style={{ flex: 1 }}>
                                        <label className="adm-label">Discount Value</label>
                                        <input type="number" placeholder="e.g. 50" value={newCoupon.discount_value} onChange={e => setNewCoupon({ ...newCoupon, discount_value: e.target.value })} className="adm-input" />
                                    </div>
                                    <div className="adm-field">
                                        <label className="adm-label">Type</label>
                                        <select value={newCoupon.type} onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })} className="adm-select">
                                            <option value="flat">Flat ₹</option>
                                            <option value="percentage">Percentage %</option>
                                        </select>
                                    </div>
                                </div>
                                <button onClick={addCoupon} className="adm-btn--primary" style={{ width: "100%", marginTop: 8 }}>Add Coupon</button>
                            </div>
                            <div className="adm-card">
                                <h2 className="adm-card__title">Active Coupons</h2>
                                {coupons.length === 0
                                    ? <div className="adm-empty">🏷️ No coupons yet.</div>
                                    : (
                                        <div className="adm-coupon-list">
                                            {coupons.map(c => (
                                                <div key={c.id} className="adm-coupon">
                                                    <div>
                                                        <span className="adm-coupon__code">{c.code}</span>
                                                        <span className="adm-coupon__val">{c.type === "flat" ? `₹${c.discount_value} OFF` : `${c.discount_value}% OFF`}</span>
                                                    </div>
                                                    <button onClick={() => deleteCoupon(c.id)} className="adm-btn--danger"><Icon.trash /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* ── SETTINGS ── */}
                    {activeTab === "settings" && (
                        <div className="adm-card" style={{ maxWidth: 480 }}>
                            <h2 className="adm-card__title">Store Settings</h2>
                            <div className="adm-field">
                                <label className="adm-label">COD Shipping Charge (₹)</label>
                                <input type="number" value={shippingCharge} onChange={e => setShippingCharge(e.target.value)} className="adm-input" />
                            </div>
                            <button onClick={updateShipping} className="adm-btn--primary" style={{ width: "100%", marginTop: 8 }}>Save Settings</button>
                        </div>
                    )}

                </div>
            </main>

            <style>{`
        /* ═══ BASE ═══════════════════════════════ */
        .adm {
          display: flex; min-height: 100vh;
          background: #f4faf4;
          font-family: var(--font-inter, Inter, system-ui, sans-serif);
          color: #212121;
        }

        /* ═══ LOGIN ══════════════════════════════ */
        .adm-login {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #f0faf0 0%, #e8f5e9 100%);
          padding: 24px;
        }
        .adm-login__card {
          background: #fff; border: 1px solid #C8E6C9; border-radius: 24px;
          padding: 48px 40px; width: 100%; max-width: 400px;
          box-shadow: 0 8px 40px rgba(26,92,42,0.10);
        }
        .adm-login__brand { text-align: center; margin-bottom: 36px; }
        .adm-login__leaf { font-size: 2.5rem; display: block; margin-bottom: 12px; }
        .adm-login__title { font-family: var(--font-poppins, sans-serif); font-size: 1.75rem; font-weight: 800; color: #1a5c2a; margin: 0 0 6px; }
        .adm-login__sub { color: #666; font-size: 0.9rem; margin: 0; }
        .adm-login__form { display: flex; flex-direction: column; gap: 16px; }
        .adm-error { color: #D32F2F; font-size: 0.85rem; background: #fff3f3; border: 1px solid #ffcdd2; border-radius: 8px; padding: 10px 14px; margin: 0; }

        /* ═══ SIDEBAR ════════════════════════════ */
        .adm-sidebar {
          width: 240px; flex-shrink: 0; background: #fff;
          border-right: 1px solid #C8E6C9;
          display: flex; flex-direction: column;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        @media (max-width: 900px) {
          .adm-sidebar {
            position: fixed; left: -260px; top: 0; bottom: 0; z-index: 200;
            transition: left 0.28s cubic-bezier(.4,0,.2,1);
            box-shadow: 4px 0 24px rgba(0,0,0,0.1);
            width: 260px;
          }
          .adm-sidebar--open { left: 0; }
        }
        .adm-sidebar__brand {
          display: flex; align-items: center; gap: 10px;
          padding: 24px 20px 20px;
          border-bottom: 1px solid #E8F5E9;
        }
        .adm-sidebar__leaf { font-size: 1.4rem; }
        .adm-sidebar__name { font-family: var(--font-poppins, sans-serif); font-size: 1.1rem; font-weight: 800; color: #1a5c2a; }
        .adm-sidebar__nav { flex: 1; display: flex; flex-direction: column; padding: 12px 10px; gap: 2px; }
        .adm-sidebar__link {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 14px; border-radius: 10px;
          font-size: 0.9rem; font-weight: 600; color: #555;
          background: none; border: none; cursor: pointer; text-align: left;
          transition: background 0.15s, color 0.15s;
          position: relative;
        }
        .adm-sidebar__link:hover { background: #E8F5E9; color: #1a5c2a; }
        .adm-sidebar__link--active { background: #E8F5E9; color: #1a5c2a; font-weight: 700; }
        .adm-sidebar__badge {
          margin-left: auto; background: #D32F2F; color: #fff;
          font-size: 0.65rem; font-weight: 800; min-width: 18px; height: 18px;
          border-radius: 99px; display: flex; align-items: center; justify-content: center; padding: 0 4px;
        }
        .adm-sidebar__logout {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; font-size: 0.85rem; font-weight: 600;
          color: #888; background: none; border: none; border-top: 1px solid #E8F5E9;
          cursor: pointer; transition: color 0.15s;
        }
        .adm-sidebar__logout:hover { color: #D32F2F; }
        .adm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 199; }

        /* ═══ MAIN ═══════════════════════════════ */
        .adm-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

        .adm-topbar {
          background: #fff; border-bottom: 1px solid #C8E6C9;
          padding: 0 28px; height: 64px;
          display: flex; align-items: center; gap: 16px;
          position: sticky; top: 0; z-index: 100;
        }
        .adm-topbar__hamburger {
          display: none; flex-direction: column; gap: 4px;
          background: none; border: none; cursor: pointer; padding: 6px;
        }
        .adm-topbar__hamburger span { display: block; width: 20px; height: 2px; background: #1a5c2a; border-radius: 2px; }
        @media (max-width: 900px) { .adm-topbar__hamburger { display: flex; } }
        .adm-topbar__title { font-family: var(--font-poppins, sans-serif); font-size: 1.1rem; font-weight: 700; color: #1a5c2a; }
        .adm-topbar__actions { margin-left: auto; display: flex; align-items: center; gap: 10px; }
        .adm-topbar__warn {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 600;
          background: #fff3f3; color: #D32F2F; border: 1px solid #ffcdd2;
          padding: 6px 12px; border-radius: 8px; cursor: pointer;
        }

        /* ═══ STAT CARDS ═════════════════════════ */
        .adm-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
          padding: 24px 28px 0;
        }
        @media (max-width: 900px) { .adm-stats { grid-template-columns: repeat(2, 1fr); padding: 16px 16px 0; } }
        @media (max-width: 480px) { .adm-stats { grid-template-columns: 1fr 1fr; } }
        .adm-stat {
          background: #fff; border: 1px solid #C8E6C9; border-radius: 16px;
          padding: 20px 22px; border-top: 3px solid #C8E6C9;
        }
        .adm-stat--green { border-top-color: #2d8a3e; }
        .adm-stat--yellow { border-top-color: #f59e0b; }
        .adm-stat__label { font-size: 0.78rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
        .adm-stat__val { font-family: var(--font-poppins, sans-serif); font-size: 1.8rem; font-weight: 800; color: #1a5c2a; }

        /* ═══ CONTENT ════════════════════════════ */
        .adm-content { padding: 24px 28px 48px; flex: 1; }
        @media (max-width: 900px) { .adm-content { padding: 16px 16px 48px; } }

        /* ═══ CARDS ══════════════════════════════ */
        .adm-card {
          background: #fff; border: 1px solid #C8E6C9; border-radius: 20px;
          padding: 28px; margin-bottom: 20px;
        }
        .adm-card__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .adm-card__title { font-family: var(--font-poppins, sans-serif); font-size: 1.1rem; font-weight: 700; color: #1a5c2a; margin: 0 0 16px; }
        .adm-card__head .adm-card__title { margin: 0; }
        .adm-card__desc { font-size: 0.875rem; color: #666; margin: -8px 0 20px; line-height: 1.6; }

        .adm-split { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 860px) { .adm-split { grid-template-columns: 1fr; } }

        /* ═══ FORMS ══════════════════════════════ */
        .adm-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .adm-field:last-child { margin-bottom: 0; }
        .adm-label { font-size: 0.75rem; font-weight: 700; color: #2d8a3e; text-transform: uppercase; letter-spacing: 0.06em; }
        .adm-opt { font-size: 0.7rem; color: #aaa; font-weight: 400; text-transform: none; letter-spacing: 0; }
        .adm-input {
          background: #f7fdf7; border: 1.5px solid #C8E6C9; border-radius: 10px;
          padding: 11px 14px; font-size: 0.9rem; color: #212121;
          outline: none; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .adm-input--sm { padding: 8px 12px; font-size: 0.85rem; min-width: 200px; }
        .adm-input:focus { border-color: #2d8a3e; box-shadow: 0 0 0 3px rgba(45,138,62,0.08); }
        .adm-select {
          background: #f7fdf7; border: 1.5px solid #C8E6C9; border-radius: 10px;
          padding: 11px 14px; font-size: 0.9rem; color: #212121;
          outline: none; font-family: inherit; cursor: pointer;
          transition: border-color 0.2s;
        }
        .adm-select:focus { border-color: #2d8a3e; }
        .adm-row { display: flex; gap: 12px; align-items: flex-end; }

        /* ═══ BUTTONS ════════════════════════════ */
        .adm-btn--primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 22px; background: linear-gradient(135deg, #2d8a3e, #388E3C);
          color: #fff; font-size: 0.9rem; font-weight: 700; border: none; border-radius: 10px;
          cursor: pointer; font-family: inherit; letter-spacing: 0.01em;
          box-shadow: 0 4px 16px rgba(45,138,62,0.25); transition: all 0.2s;
        }
        .adm-btn--primary:hover { background: linear-gradient(135deg, #1a5c2a, #2d8a3e); box-shadow: 0 6px 22px rgba(45,138,62,0.35); transform: translateY(-1px); }
        .adm-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .adm-btn--secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 9px 18px; background: #fff; border: 1.5px solid #2d8a3e;
          color: #2d8a3e; font-size: 0.85rem; font-weight: 700; border-radius: 9px;
          cursor: pointer; font-family: inherit; text-decoration: none; transition: all 0.2s;
        }
        .adm-btn--secondary:hover { background: #E8F5E9; }
        .adm-btn--ghost {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; background: none; border: 1.5px solid #C8E6C9;
          color: #666; font-size: 0.82rem; font-weight: 600; border-radius: 8px;
          cursor: pointer; font-family: inherit; transition: all 0.15s;
        }
        .adm-btn--ghost:hover { border-color: #A5D6A7; color: #2d8a3e; background: #E8F5E9; }
        .adm-btn--danger {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 8px 16px; background: none; border: 1.5px solid #ffcdd2;
          color: #D32F2F; font-size: 0.82rem; font-weight: 700; border-radius: 9px;
          cursor: pointer; font-family: inherit; transition: all 0.2s;
        }
        .adm-btn--danger:hover { background: #fff3f3; border-color: #D32F2F; }

        /* ═══ TABLE ══════════════════════════════ */
        .adm-table-wrap { overflow-x: auto; }
        .adm-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        .adm-table th { text-align: left; padding: 10px 12px; background: #E8F5E9; color: #2d8a3e; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #C8E6C9; white-space: nowrap; }
        .adm-table th:first-child { border-radius: 8px 0 0 8px; }
        .adm-table th:last-child { border-radius: 0 8px 8px 0; }
        .adm-table td { padding: 14px 12px; border-bottom: 1px solid #f0faf0; vertical-align: top; }
        .adm-table tr:last-child td { border-bottom: none; }
        .adm-table tr:hover td { background: #f9fdf9; }
        .adm-table__id { font-weight: 700; font-family: monospace; color: #2d8a3e; }
        .adm-table__name { font-weight: 600; }
        .adm-table__sub { font-size: 0.72rem; color: #888; }
        .adm-table__addr { font-size: 0.72rem; color: #888; max-width: 160px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .adm-table__amt { font-weight: 800; color: #1a5c2a; }
        .adm-filters { display: flex; flex-wrap: wrap; gap: 10px; }

        /* ═══ BADGES ═════════════════════════════ */
        .adm-badge { font-size: 0.68rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; }
        .adm-badge--yellow { background: #fff8e1; color: #f59e0b; border: 1px solid #fde68a; }
        .adm-badge--blue { background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }

        .adm-status-sel { border: 1.5px solid #C8E6C9; border-radius: 8px; padding: 6px 10px; font-size: 0.72rem; font-weight: 700; background: #f7fdf7; outline: none; font-family: inherit; cursor: pointer; }
        .adm-status-sel--green { color: #2d8a3e; border-color: #A5D6A7; }
        .adm-status-sel--red { color: #D32F2F; border-color: #ffcdd2; }
        .adm-status-sel--blue { color: #3b82f6; border-color: #bfdbfe; }
        .adm-status-sel--yellow { color: #f59e0b; border-color: #fde68a; }

        /* ═══ SLIDES ═════════════════════════════ */
        .adm-img-pickers { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 540px) { .adm-img-pickers { grid-template-columns: 1fr; } }
        .adm-upload-zone {
          aspect-ratio: 16/9; border: 2px dashed #A5D6A7; border-radius: 14px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; overflow: hidden; background: #f7fdf7; position: relative;
          transition: border-color 0.2s, background 0.2s;
        }
        .adm-upload-zone:hover { border-color: #2d8a3e; background: #E8F5E9; }
        .adm-upload-zone--mobile { border-color: #C8E6C9; }
        .adm-upload-zone__icon { font-size: 2rem; margin-bottom: 8px; }
        .adm-upload-zone__txt { font-size: 0.8rem; color: #888; }
        .adm-upload-zone__img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
        .adm-slides-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .adm-slide-card { border: 1px solid #C8E6C9; border-radius: 14px; overflow: hidden; }
        .adm-slide-card__img-wrap { aspect-ratio: 16/9; position: relative; }
        .adm-slide-card__img { width: 100%; height: 100%; object-fit: cover; }
        .adm-slide-card__mob-badge { position: absolute; top: 8px; right: 8px; background: #E8F5E9; color: #2d8a3e; font-size: 0.65rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; border: 1px solid #A5D6A7; }
        .adm-slide-card__num { position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.55); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .adm-slide-card__body { padding: 14px; background: #f7fdf7; }
        .adm-slide-card__title { font-weight: 700; font-size: 0.85rem; color: #1a5c2a; margin: 0 0 2px; }
        .adm-slide-card__sub { font-size: 0.75rem; color: #888; margin: 0; }
        .adm-muted { color: #bbb; font-style: italic; }

        /* ═══ CONTACTS ═══════════════════════════ */
        .adm-contacts { display: flex; flex-direction: column; gap: 14px; }
        .adm-contact-card { border: 1px solid #C8E6C9; border-radius: 16px; padding: 20px; background: #f7fdf7; }
        .adm-contact-card__head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .adm-contact-card__avatar {
          width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #2d8a3e, #388E3C); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 1.1rem;
        }
        .adm-contact-card__name { font-weight: 700; font-size: 0.95rem; color: #1a5c2a; margin: 0 0 2px; }
        .adm-contact-card__meta { font-size: 0.78rem; color: #666; margin: 0; }
        .adm-contact-card__date { margin-left: auto; font-size: 0.75rem; color: #aaa; flex-shrink: 0; }
        .adm-contact-card__msg { font-size: 0.9rem; color: #444; line-height: 1.65; font-style: italic; margin: 0 0 16px; padding: 14px; background: #fff; border-radius: 10px; border: 1px solid #E8F5E9; }
        .adm-contact-card__actions { display: flex; gap: 10px; flex-wrap: wrap; }

        /* ═══ COUPONS ════════════════════════════ */
        .adm-coupon-list { display: flex; flex-direction: column; gap: 10px; }
        .adm-coupon { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border: 1px solid #C8E6C9; border-radius: 12px; background: #f7fdf7; }
        .adm-coupon__code { display: block; font-weight: 800; font-size: 0.95rem; color: #1a5c2a; font-family: monospace; letter-spacing: 0.05em; }
        .adm-coupon__val { display: block; font-size: 0.78rem; color: #666; margin-top: 2px; }

        /* ═══ MISC ═══════════════════════════════ */
        .adm-empty { padding: 48px 20px; text-align: center; color: #aaa; font-size: 0.95rem; font-style: italic; }
      `}</style>
        </div>
    );
}
