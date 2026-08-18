import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../lib/utils.js";
import { reduced } from "../../lib/motion.js";

/**
 * Fluid circular menu.
 *
 * Ported from the 21st.dev fluid-menu. Changes made on the way in:
 *   - JSX instead of TS, RLD tokens instead of gray-100 / dark:gray-800
 *   - dropped the unused `Menu` dropdown export (our Nav already covers it)
 *   - removed the dead useRef / useEffect imports from the original
 *   - added click-outside close, Escape to close, and focus return
 *   - icon-only buttons now carry a real accessible label
 *   - labels slide out on hover so it is usable by someone who does not
 *     recognise the icons
 *   - collapsed items are inert, so keyboard tabbing does not land on
 *     invisible buttons
 *   - respects prefers-reduced-motion
 */

const SIZE = 64;
const STEP = 48;

export function MenuItem({
  children,
  onClick,
  href,
  disabled = false,
  icon,
  label,
  isActive = false,
  hidden = false,
}) {
  const shared = cn(
    "group relative flex h-16 w-16 items-center justify-center rounded-full outline-none",
    "transition-colors focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
    disabled ? "cursor-not-allowed text-graphite/50" : "text-paper hover:text-cobalt",
    isActive && "text-cobalt"
  );

  const inner = (
    <>
      <span className="grid h-6 w-6 place-items-center transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>

      {label && (
        <span
          className={cn(
            "pointer-events-none absolute right-[calc(100%+12px)] rounded-full bg-ink px-3 py-1.5",
            "font-mono text-[0.625rem] tracking-[0.14em] whitespace-nowrap text-paper uppercase",
            "translate-x-2 opacity-0 transition-all duration-200",
            "group-hover:translate-x-0 group-hover:opacity-100",
            "group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          )}
        >
          {label}
        </span>
      )}
      {children}
    </>
  );

  const props = {
    className: shared,
    onClick,
    "aria-label": label,
    tabIndex: hidden ? -1 : 0,
    "aria-hidden": hidden || undefined,
  };

  if (href && !disabled) {
    return (
      <a href={href} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} role="menuitem" {...props}>
      {inner}
    </button>
  );
}

export function MenuContainer({ children, label = "Quick actions" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wrap = useRef(null);
  const toggleRef = useRef(null);
  const id = useId();

  const items = React.Children.toArray(children);
  const [first, ...rest] = items;

  // close on outside click
  useEffect(() => {
    if (!isExpanded) return;
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setIsExpanded(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [isExpanded]);

  // close on Escape, return focus to the toggle
  useEffect(() => {
    if (!isExpanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  const ms = reduced() ? 0 : 300;

  return (
    <div
      ref={wrap}
      className="relative w-16"
      data-expanded={isExpanded}
      style={{ height: SIZE + (isExpanded ? rest.length * STEP : 0) }}
    >
      <div className="relative">
        <div
          ref={toggleRef}
          onClick={() => setIsExpanded((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded((v) => !v);
            }
          }}
          role="button"
          tabIndex={0}
          aria-haspopup="menu"
          aria-expanded={isExpanded}
          aria-controls={id}
          aria-label={isExpanded ? "Close quick actions" : label}
          className={cn(
            "relative z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full",
            "bg-ink shadow-lg shadow-ink/20 will-change-transform outline-none",
            "transition-colors hover:bg-cobalt",
            "focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          )}
        >
          {first}
        </div>

        <div id={id} role="menu" aria-label={label}>
          {rest.map((child, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 flex h-16 w-16 items-center justify-center bg-ink will-change-transform"
              style={{
                transform: `translateY(${isExpanded ? (i + 1) * STEP : 0}px)`,
                opacity: isExpanded ? 1 : 0,
                zIndex: 40 - i,
                clipPath:
                  i === rest.length - 1
                    ? "circle(50% at 50% 50%)"
                    : "circle(50% at 50% 55%)",
                transition: `transform ${ms}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${ms}ms`,
                backfaceVisibility: "hidden",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {React.isValidElement(child)
                ? React.cloneElement(child, { hidden: !isExpanded })
                : child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
