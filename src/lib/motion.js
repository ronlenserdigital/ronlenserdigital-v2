import { useEffect, useRef, useState } from "react";

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True once the element has entered the viewport. Fires once. */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, seen];
}

/** Counts up to a numeric target once visible. Keeps prefix/suffix intact. */
export function useCountUp(target, active, ms = 1400) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced()) return setN(target);

    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, ms]);

  return n;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*";

/** Decodes text from random glyphs once visible. */
export function useScramble(text, active, speed = 34) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!active) return;
    if (reduced()) return setOut(text);

    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (revealed > text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, active, speed]);

  return out;
}

/** Pulls an element toward the cursor while hovered. */
export function useMagnetic(strength = 0.32) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.translate = `${dx * strength}px ${dy * strength}px`;
    };
    const reset = () => {
      el.style.translate = "0px 0px";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return ref;
}

/** Live clock string for a given IANA timezone. */
export function useClock(timeZone = "America/New_York") {
  const [t, setT] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return t;
}

/** Rough open / closed status against studio hours, Mon-Sat 8am-7pm ET. */
export function useAvailability() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "short",
        hour: "numeric",
        hour12: false,
      }).formatToParts(new Date());
      const day = parts.find((p) => p.type === "weekday")?.value;
      const hour = Number(parts.find((p) => p.type === "hour")?.value);
      setOpen(day !== "Sun" && hour >= 8 && hour < 19);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  return open;
}
