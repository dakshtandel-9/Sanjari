/**
 * MobileStickyButton — Brand Guideline: "Mobile sticky bottom 'Buy Now' button"
 * Renders a fixed bottom-of-screen CTA bar on mobile devices.
 * Typically used on product pages for sticky 'Buy Now / Add to Cart' CTA.
 */
"use client";

import React from "react";
import Link from "next/link";
import styles from "./buttons.module.css";

interface MobileStickyButtonProps {
    /** Primary label e.g. "Buy Now" */
    label: string;
    /** Price string e.g. "₹349" */
    price?: string;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    loading?: boolean;
    ariaLabel?: string;
}

export default function MobileStickyButton({
    label,
    price,
    href,
    onClick,
    disabled = false,
    loading = false,
    ariaLabel,
}: MobileStickyButtonProps) {
    const cls = [
        styles.mobileStickyBtn,
        loading ? styles["btn--loading"] : "",
    ]
        .filter(Boolean)
        .join(" ");

    const inner = (
        <>
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            {!loading && (
                <>
                    <span className={styles.mobileStickyLabel}>{label}</span>
                    {price && (
                        <span className={styles.mobileStickyPrice}>{price}</span>
                    )}
                </>
            )}
        </>
    );

    if (href && !disabled && !loading) {
        return (
            <div className={styles.mobileStickyWrap}>
                <Link href={href} className={cls} aria-label={ariaLabel ?? `${label}${price ? ` – ${price}` : ""}`}>
                    {inner}
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.mobileStickyWrap}>
            <button
                type="button"
                className={cls}
                onClick={onClick}
                disabled={disabled || loading}
                aria-disabled={disabled || loading}
                aria-busy={loading}
                aria-label={ariaLabel ?? `${label}${price ? ` – ${price}` : ""}`}
            >
                {inner}
            </button>
        </div>
    );
}
