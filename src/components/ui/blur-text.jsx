import { useEffect, useMemo, useRef, useState } from "react";
import { reduced } from "../../lib/motion.js";

/**
 * Blur-in reveal. Segments text by word or letter and lifts each one out of
 * a blur as it enters the viewport.
 *
 * Extracted from the 21st.dev portfolio-hero. The rest of that component was
 * left behind: it swapped the pitch headline for a name, brought back a
 * .dark class toggle this theme does not use, hardcoded an acid lime that
 * was already rejected, added a third nav, and shipped a stock headshot.
 *
 * Two fixes on the way in:
 *   - the original's cleanup reads `ref.current` inside the effect closure,
 *     which can be stale by teardown and silently skip unobserve. Captured
 *     the node in a local instead, and disconnect the observer outright.
 *   - reduced motion renders the text at rest with no transition, instead of
 *     animating regardless.
 */
export function BlurText({
  text,
  as: Tag = "p",
  delay = 60,
  animateBy = "words",
  direction = "top",
  blur = 10,
  className = "",
  style,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced()) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : [...text]),
    [text, animateBy]
  );

  const still = reduced();

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((seg, i) => (
        <span
          key={`${seg}-${i}`}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            filter: inView ? "blur(0px)" : `blur(${blur}px)`,
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-0.4em" : "0.4em"})`,
            transition: still
              ? "none"
              : `filter 700ms cubic-bezier(.16,1,.3,1) ${i * delay}ms,
                 opacity 700ms cubic-bezier(.16,1,.3,1) ${i * delay}ms,
                 transform 700ms cubic-bezier(.16,1,.3,1) ${i * delay}ms`,
          }}
        >
          {seg}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
