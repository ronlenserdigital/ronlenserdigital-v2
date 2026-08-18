import { useEffect, useRef, useState } from "react";

/** Adds .is-in to any .reveal descendant once it enters the viewport. */
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef?.current ?? document;
    const items = root.querySelectorAll(".reveal");
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/** Returns 0..1 progress of an element scrolling through its own height. */
export function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return setP(0);
        setP(Math.min(1, Math.max(0, -rect.top / total)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return p;
}
