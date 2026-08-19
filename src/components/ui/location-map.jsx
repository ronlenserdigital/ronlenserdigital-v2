import { useRef, useState } from "react";
import { reduced } from "../../lib/motion.js";

/**
 * Expandable location card.
 *
 * Ported from the 21st.dev expand-map. No framer-motion: the tilt is a CSS
 * transform driven by pointer position, the size change is a transition, and
 * the streets draw with stroke-dasharray rather than animated pathLength.
 * That is roughly 35 kB gzipped saved on a footer ornament.
 *
 * The emerald accents are gone with the rest of the colour. Everything is
 * paper on ink.
 */

const H_ROADS = [35, 65];
const V_ROADS = [30, 70];
const H_STREETS = [20, 50, 80];
const V_STREETS = [15, 45, 55, 85];

const BUILDINGS = [
  { top: "40%", left: "10%", w: "15%", h: "20%", o: 0.3, d: 500 },
  { top: "15%", left: "35%", w: "12%", h: "15%", o: 0.25, d: 600 },
  { top: "70%", left: "75%", w: "18%", h: "18%", o: 0.28, d: 700 },
  { top: "20%", right: "10%", w: "10%", h: "25%", o: 0.22, d: 550 },
  { top: "55%", left: "5%", w: "8%", h: "12%", o: 0.2, d: 650 },
  { top: "8%", left: "75%", w: "14%", h: "10%", o: 0.22, d: 750 },
];

export function LocationMap({
  location = "Fredericksburg, VA",
  coordinates = "38.3032° N, 77.4605° W",
  className = "",
}) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const card = useRef(null);

  const onMove = (e) => {
    if (reduced() || !wrap.current || !card.current) return;
    const r = wrap.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const rx = Math.max(-8, Math.min(8, (-dy / 50) * 8));
    const ry = Math.max(-8, Math.min(8, (dx / 50) * 8));
    card.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    if (card.current) card.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    setHovered(false);
  };

  return (
    <div
      ref={wrap}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`${location}. Activate to ${open ? "collapse" : "expand"} the map.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      }}
    >
      <div
        ref={card}
        className="relative overflow-hidden rounded-2xl border border-hairline bg-ink transition-[width,height,transform] duration-500 ease-[cubic-bezier(.34,1.4,.64,1)] [transform-style:preserve-3d]"
        style={{ width: open ? 360 : 240, height: open ? 280 : 140 }}
      >
        {/* street plan, revealed on expand */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            open ? "opacity-100 delay-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-ink-soft" />

          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {H_ROADS.map((y, i) => (
              <line
                key={`hr-${y}`}
                x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke="currentColor" strokeWidth="4"
                className="text-paper/25"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: open ? 0 : 1000,
                  transition: `stroke-dashoffset 800ms ease ${200 + i * 100}ms`,
                }}
              />
            ))}
            {V_ROADS.map((x, i) => (
              <line
                key={`vr-${x}`}
                x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                stroke="currentColor" strokeWidth="3"
                className="text-paper/20"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: open ? 0 : 600,
                  transition: `stroke-dashoffset 600ms ease ${400 + i * 100}ms`,
                }}
              />
            ))}
            {H_STREETS.map((y, i) => (
              <line
                key={`hs-${y}`}
                x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke="currentColor" strokeWidth="1.5"
                className="text-paper/10"
                style={{
                  strokeDasharray: 1000,
                  strokeDashoffset: open ? 0 : 1000,
                  transition: `stroke-dashoffset 500ms ease ${600 + i * 100}ms`,
                }}
              />
            ))}
            {V_STREETS.map((x, i) => (
              <line
                key={`vs-${x}`}
                x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                stroke="currentColor" strokeWidth="1.5"
                className="text-paper/10"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: open ? 0 : 600,
                  transition: `stroke-dashoffset 500ms ease ${700 + i * 100}ms`,
                }}
              />
            ))}
          </svg>

          {BUILDINGS.map((b, i) => (
            <div
              key={i}
              className="absolute rounded-sm border border-paper/15 bg-paper"
              style={{
                top: b.top, left: b.left, right: b.right,
                width: b.w, height: b.h,
                opacity: open ? b.o : 0,
                transform: open ? "scale(1)" : "scale(0.8)",
                transition: `opacity 400ms ease ${b.d}ms, transform 400ms ease ${b.d}ms`,
              }}
            />
          ))}

          {/* the pin */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%,-50%) scale(${open ? 1 : 0})`,
              transition: "transform 500ms cubic-bezier(.34,1.56,.64,1) 300ms",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="currentColor"
                className="text-paper"
              />
              <circle cx="12" cy="9" r="2.5" className="fill-ink" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
        </div>

        {/* faint grid when collapsed */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: open ? 0 : 0.05 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="rld-map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-paper" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rld-map-grid)" />
          </svg>
        </div>

        {/* content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-paper transition-opacity duration-300"
              style={{ opacity: open ? 0 : 1 }}
              aria-hidden="true"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </svg>

            <span
              className="flex items-center gap-1.5 rounded-full bg-paper/5 px-2 py-1 backdrop-blur-sm transition-transform duration-200"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-paper motion-safe:animate-pulse" />
              <span className="font-mono text-[10px] tracking-wide text-graphite uppercase">
                Live
              </span>
            </span>
          </div>

          <div className="space-y-1">
            <h3
              className="text-sm font-medium tracking-tight text-paper transition-transform duration-300"
              style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
            >
              {location}
            </h3>

            <p
              className="overflow-hidden font-mono text-xs text-graphite transition-all duration-300"
              style={{
                opacity: open ? 1 : 0,
                maxHeight: open ? "1.5rem" : 0,
              }}
            >
              {coordinates}
            </p>

            <div
              className="h-px origin-left bg-gradient-to-r from-paper/50 via-paper/25 to-transparent transition-transform duration-500"
              style={{ transform: `scaleX(${hovered || open ? 1 : 0.3})` }}
            />
          </div>
        </div>
      </div>

      <p
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-graphite transition-opacity duration-200"
        style={{ opacity: hovered && !open ? 1 : 0 }}
        aria-hidden="true"
      >
        Click to expand
      </p>
    </div>
  );
}
