"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/* ─── Offer bar messages ─── */
const OFFERS = [
    "🌿 Free Shipping on Orders Above ₹499 — Limited Time!",
    "🪴 100% Natural · No Parabens · No Sulphates · Dermatologist Tested",
    "✨ Use Code SANJARI10 for 10% OFF on Your First Order →",
];

/* ─── Nav links ─── */
const NAV = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },

    { label: "Benefits", href: "/#benefits" },
    { label: "How To Use", href: "/#how-to-use" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Contact", href: "/#contact" },
];

/* ═══ Cart icon ═══ */
function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
        </svg>
    );
}

/* ═══ Close icon ═══ */
function CloseIcon({ size = 18 }: { size?: number }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}

/* ═══ HEADER ═══ */
export default function Header() {
    const pathname = usePathname();

    /* ── Offer bar ── */
    const [offerIdx, setOfferIdx] = useState(0);
    const [offerAnim, setOfferAnim] = useState(false);
    const [offerHidden, setOfferHidden] = useState(false);

    useEffect(() => {
        const id = setInterval(() => {
            setOfferAnim(true);
            setTimeout(() => {
                setOfferIdx(i => (i + 1) % OFFERS.length);
                setOfferAnim(false);
            }, 350);
        }, 4500);
        return () => clearInterval(id);
    }, []);

    /* ── Scroll shadow ── */
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    /* ── Cart count from localStorage ── */
    const [cartCount, setCartCount] = useState(0);
    const readCart = useCallback(() => {
        try {
            const raw = localStorage.getItem("cart");
            if (!raw) { setCartCount(0); return; }
            const items: { qty?: number }[] = JSON.parse(raw);
            setCartCount(items.reduce((s, i) => s + (i.qty ?? 1), 0));
        } catch { setCartCount(0); }
    }, []);
    useEffect(() => {
        readCart();
        window.addEventListener("storage", readCart);
        return () => window.removeEventListener("storage", readCart);
    }, [readCart]);

    /* ── Mobile drawer ── */
    const [drawerOpen, setDrawerOpen] = useState(false);
    const closeDrawer = () => setDrawerOpen(false);

    /* Track client mount for portal (avoids SSR mismatch) */
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [drawerOpen]);

    useEffect(() => { closeDrawer(); }, [pathname]);

    return (
        <>
            {/* ═══════════════════════════════════════
          STICKY WRAPPER — keeps both bars together
      ═══════════════════════════════════════ */}
            <div className="site-sticky-wrap">

                {/* ── Offer Bar ── */}
                {!offerHidden && (
                    <div className="offer-bar" role="banner">
                        <p
                            className={`offer-bar__text ${offerAnim ? "offer-bar__text--hidden" : "offer-bar__text--visible"}`}
                            aria-live="polite"
                        >
                            {OFFERS[offerIdx]}
                        </p>

                        {/* Dot indicators */}
                        <div className="offer-bar__dots" aria-hidden="true">
                            {OFFERS.map((_, i) => (
                                <span
                                    key={i}
                                    className={`offer-bar__dot ${i === offerIdx ? "offer-bar__dot--active" : ""}`}
                                />
                            ))}
                        </div>

                        <button
                            className="offer-bar__close"
                            aria-label="Dismiss offer"
                            onClick={() => setOfferHidden(true)}
                        >
                            <CloseIcon size={14} />
                        </button>
                    </div>
                )}

                {/* ── Main Header ── */}
                <header
                    className={`site-header${scrolled ? " site-header--scrolled" : ""}`}
                    role="banner"
                >
                    <div className="site-header__inner">

                        {/* Logo Column */}
                        <div className="site-header__logo-wrap">
                            <Link
                                href="/"
                                className="site-header__logo-link"
                                aria-label="Sanjari Herbal Hair Oil – Back to home"
                            >
                                <Image
                                    src="/SANJARI.png"
                                    alt="Sanjari Herbal Hair Oil"
                                    width={140}
                                    height={44}
                                    priority
                                    className="site-header__logo-img"
                                />
                            </Link>
                        </div>

                        {/* Desktop Nav Column (Center) */}
                        <nav className="site-header__nav" aria-label="Primary navigation">
                            {NAV.map(({ label, href }) => {
                                const base = href.split("#")[0];
                                const isActive = pathname === href || (base !== "/" && base !== "" && pathname.startsWith(base));
                                return (
                                    <Link
                                        key={label}
                                        href={href}
                                        className={`site-header__nav-link${isActive ? " site-header__nav-link--active" : ""}`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Actions Column (Right) */}
                        <div className="site-header__actions">
                            <Link
                                href="/checkout"
                                className="site-header__cart"
                                aria-label="Buy Now"
                            >
                                <span className="site-header__cart-label">Buy Now</span>
                            </Link>

                            {/* Mobile Hamburger */}
                            <button
                                className={`site-header__hamburger${drawerOpen ? " site-header__hamburger--open" : ""}`}
                                onClick={() => setDrawerOpen(v => !v)}
                                aria-expanded={drawerOpen}
                                aria-controls="mobile-drawer"
                                aria-label={drawerOpen ? "Close menu" : "Open menu"}
                            >
                                <span className="site-header__hamburger-bar" />
                                <span className="site-header__hamburger-bar" />
                                <span className="site-header__hamburger-bar" />
                            </button>
                        </div>

                    </div>
                </header>

            </div>{/* end .site-sticky-wrap */}

            {/* ═══════════════════════════════════════
          MOBILE DRAWER — rendered via portal into document.body
          to escape the sticky header's stacking context
      ═══════════════════════════════════════ */}
            {mounted && createPortal(
                <div
                    id="mobile-drawer"
                    className={`site-header__drawer${drawerOpen ? " site-header__drawer--open" : ""}`}
                    aria-hidden={!drawerOpen}
                    role="dialog"
                    aria-label="Navigation menu"
                >
                    {/* Backdrop */}
                    <div className="site-header__drawer-backdrop" onClick={closeDrawer} aria-hidden="true" />

                    {/* Panel */}
                    <div className="site-header__drawer-panel">

                        {/* Drawer header with logo */}
                        <div className="site-header__drawer-header">
                            <Link href="/" onClick={closeDrawer} aria-label="Sanjari Home" className="site-header__drawer-logo">
                                <Image
                                    src="/SANJARI.png"
                                    alt="Sanjari Herbal Hair Oil"
                                    width={110}
                                    height={35}
                                />
                            </Link>
                            <button
                                className="site-header__drawer-close"
                                onClick={closeDrawer}
                                aria-label="Close navigation menu"
                            >
                                <CloseIcon size={22} />
                            </button>
                        </div>

                        {/* Drawer Nav */}
                        <nav className="site-header__drawer-nav" aria-label="Mobile navigation">
                            {NAV.map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="site-header__drawer-link"
                                    onClick={closeDrawer}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* Drawer Footer — Cart CTA */}
                        <div className="site-header__drawer-footer">
                            <Link
                                href="/checkout"
                                className="site-header__drawer-cart"
                                onClick={closeDrawer}
                            >
                                Buy Now
                            </Link>
                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
