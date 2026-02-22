import React from "react";
import Link from "next/link";
import styles from "./buttons.module.css";

interface SecondaryButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    type?: "button" | "submit" | "reset";
    className?: string;
    ariaLabel?: string;
}

export default function SecondaryButton({
    children,
    href,
    onClick,
    size = "md",
    fullWidth = false,
    disabled = false,
    icon,
    iconPosition = "left",
    type = "button",
    className = "",
    ariaLabel,
}: SecondaryButtonProps) {
    const cls = [
        styles.btn,
        styles.btnSecondary,
        styles[`btn--${size}`],
        fullWidth ? styles["btn--full"] : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const inner = (
        <>
            {icon && iconPosition === "left" && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
            <span className={styles.btnLabel}>{children}</span>
            {icon && iconPosition === "right" && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
        </>
    );

    if (href && !disabled) {
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
            disabled={disabled}
            aria-disabled={disabled}
            aria-label={ariaLabel}
        >
            {inner}
        </button>
    );
}
