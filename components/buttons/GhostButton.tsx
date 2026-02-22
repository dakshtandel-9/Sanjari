import React from "react";
import styles from "./buttons.module.css";

interface GhostButtonProps {
    children: React.ReactNode;
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

export default function GhostButton({
    children,
    onClick,
    size = "md",
    fullWidth = false,
    disabled = false,
    icon,
    iconPosition = "left",
    type = "button",
    className = "",
    ariaLabel,
}: GhostButtonProps) {
    const cls = [
        styles.btn,
        styles.btnGhost,
        styles[`btn--${size}`],
        fullWidth ? styles["btn--full"] : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={cls}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
            aria-label={ariaLabel}
        >
            {icon && iconPosition === "left" && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
            <span className={styles.btnLabel}>{children}</span>
            {icon && iconPosition === "right" && (
                <span className={styles.btnIcon}>{icon}</span>
            )}
        </button>
    );
}
