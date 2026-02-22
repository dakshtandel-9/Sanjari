import React from "react";
import Link from "next/link";
import styles from "./buttons.module.css";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "wide";

interface PrimaryButtonProps {
    children: React.ReactNode;
    /** Renders as an <a> via Next/Link when provided */
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: ButtonSize;
    variant?: ButtonVariant;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    type?: "button" | "submit" | "reset";
    className?: string;
    /** Optional for accessibility */
    ariaLabel?: string;
}

export default function PrimaryButton({
    children,
    href,
    onClick,
    size = "md",
    variant = "solid",
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    iconPosition = "left",
    type = "button",
    className = "",
    ariaLabel,
}: PrimaryButtonProps) {
    const cls = [
        styles.btn,
        styles.btnPrimary,
        styles[`btn--${size}`],
        variant === "wide" ? styles["btn--wide"] : "",
        fullWidth ? styles["btn--full"] : "",
        loading ? styles["btn--loading"] : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const inner = (
        <>
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            {icon && iconPosition === "left" && !loading && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
            <span className={styles.btnLabel}>{children}</span>
            {icon && iconPosition === "right" && !loading && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
        </>
    );

    if (href && !disabled && !loading) {
        return (
            <Link href={href} className={cls} aria-label={ariaLabel}>
                {inner}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={cls}
            onClick={onClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-label={ariaLabel}
            aria-busy={loading}
        >
            {inner}
        </button>
    );
}
