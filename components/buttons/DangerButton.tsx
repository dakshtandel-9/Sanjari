import React from "react";
import styles from "./buttons.module.css";

interface DangerButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    type?: "button" | "submit" | "reset";
    className?: string;
    ariaLabel?: string;
}

export default function DangerButton({
    children,
    onClick,
    size = "md",
    fullWidth = false,
    disabled = false,
    loading = false,
    icon,
    iconPosition = "left",
    type = "button",
    className = "",
    ariaLabel,
}: DangerButtonProps) {
    const cls = [
        styles.btn,
        styles.btnDanger,
        styles[`btn--${size}`],
        fullWidth ? styles["btn--full"] : "",
        loading ? styles["btn--loading"] : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={cls}
            onClick={onClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            aria-busy={loading}
            aria-label={ariaLabel}
        >
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            {icon && iconPosition === "left" && !loading && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
            <span className={styles.btnLabel}>{children}</span>
            {icon && iconPosition === "right" && !loading && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
        </button>
    );
}
