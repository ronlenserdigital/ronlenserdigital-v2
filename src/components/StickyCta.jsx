import { useEffect, useState } from "react";

/**
 * Sticky mobile CTA.
 *
 * Phone screens only. Hidden while the hero's own buttons are on screen and
 * hidden again once the quote form is on screen, so it never sits on top of
 * the thing it is pointing at. Two taps a plumber wants: call, or quote.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const quote = document.getElementById("quote");
    let heroVisible = !!hero;
    let quoteVisible = false;

    const update = () => setShow(!heroVisible && !quoteVisible);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) heroVisible = e.isIntersecting;
          if (e.target === quote) quoteVisible = e.isIntersecting;
        });
        update();
      },
      { threshold: 0.05 }
    );

    if (hero) io.observe(hero);
    else setShow(true);
    if (quote) io.observe(quote);

    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/85 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-3">
        <a
          href="tel:+15403956493"
          className="flex flex-1 items-center justify-center rounded-full border border-hairline py-3 text-sm font-medium"
          tabIndex={show ? 0 : -1}
        >
          Call
        </a>
        <a
          href="/#quote"
          className="flex flex-1 items-center justify-center rounded-full bg-paper py-3 text-sm font-medium text-ink"
          tabIndex={show ? 0 : -1}
        >
          Get a quote
        </a>
      </div>
    </div>
  );
}
