import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils.js";

/**
 * Tubelight navbar.
 *
 * Ported from the 21st.dev tubelight-navbar. Changes on the way in:
 *   - <a> instead of next/link, this is Vite not Next
 *   - the lamp glide is a measured sliding indicator, not framer-motion
 *     layoutId. Saves ~35 kB gzipped and looks the same.
 *   - shadcn tokens mapped to ours: bg-primary -> bg-accent,
 *     text-foreground -> text-paper, bg-muted -> bg-hairline
 *   - scroll spy, so the active pill follows the section in view instead
 *     of only updating on click
 *   - aria-current on the active link
 *   - respects prefers-reduced-motion, indicator snaps instead of glides
 *   - re-measures on resize and on font load, so the pill never drifts
 *
 * items: [{ name, url, icon }] where url is a hash like "#work".
 */
export function NavBar({ items, className }) {
  const [active, setActive] = useState(items[0]?.name);
  const [box, setBox] = useState({ left: 0, width: 0 });
  const [armed, setArmed] = useState(false);
  const wrap = useRef(null);
  const refs = useRef({});

  // measure the active pill and park the indicator on it
  const measure = () => {
    const el = refs.current[active];
    const parent = wrap.current;
    if (!el || !parent) return;
    setBox({ left: el.offsetLeft, width: el.offsetWidth });
  };

  useLayoutEffect(() => {
    measure();
    const id = requestAnimationFrame(() => {
      measure();
      setArmed(true);
    });
    return () => cancelAnimationFrame(id);
  }, [active, items]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  // scroll spy
  useEffect(() => {
    const targets = items
      .map((it) => ({ name: it.name, el: document.querySelector(it.url) }))
      .filter((t) => t.el);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const hit = targets.find((t) => t.el === visible.target);
        if (hit) setActive(hit.name);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    targets.forEach((t) => io.observe(t.el));
    return () => io.disconnect();
  }, [items]);

  return (
    <div
      className={cn(
        "fixed bottom-24 left-1/2 z-50 -translate-x-1/2 md:top-4 md:bottom-auto",
        className
      )}
    >
      <nav
        ref={wrap}
        aria-label="Sections"
        className="relative flex items-center gap-1 rounded-full border border-hairline bg-ink/70 p-1 shadow-lg shadow-ink/25 backdrop-blur-lg"
      >
        {/* the lamp */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1 bottom-1 rounded-full bg-hairline",
            armed && "motion-safe:transition-all motion-safe:duration-500",
            "motion-safe:ease-[cubic-bezier(.34,1.56,.64,1)]"
          )}
          style={{ left: box.left, width: box.width }}
        >
          <span className="absolute -top-[5px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
            <span className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-accent/25 blur-md" />
            <span className="absolute -top-1 h-6 w-8 rounded-full bg-accent/25 blur-md" />
            <span className="absolute top-0 left-2 h-4 w-4 rounded-full bg-accent/25 blur-sm" />
          </span>
        </span>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;
          return (
            <a
              key={item.name}
              href={item.url}
              ref={(el) => (refs.current[item.name] = el)}
              onClick={() => setActive(item.name)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-6",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                isActive ? "text-paper" : "text-graphite hover:text-paper"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
                <span className="sr-only">{item.name}</span>
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
