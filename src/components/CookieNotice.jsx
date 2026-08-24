import { useEffect, useState } from "react";

/**
 * Cookie notice.
 *
 * Honest version. This site sets no tracking cookies: Vercel Analytics is
 * cookieless and the quote form goes straight to email. So there is nothing
 * to consent to and no accept/reject pair. One line, one dismiss, remembered
 * in localStorage so it shows once.
 */
const KEY = "rld-notice-v1";

export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Privacy notice"
      className="fixed bottom-20 left-3 right-3 z-40 mx-auto max-w-md rounded-xl border border-hairline bg-ink-soft p-4 text-sm shadow-2xl shadow-black/60 md:bottom-4 md:left-auto md:right-4"
    >
      <p className="text-graphite">
        No tracking cookies here. I use cookieless analytics to count visits, and
        the form sends straight to my inbox.{" "}
        <a href="/privacy" className="text-paper underline underline-offset-4">
          Privacy
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-3 rounded-lg bg-paper px-4 py-2 text-xs font-medium text-ink"
      >
        Got it
      </button>
    </div>
  );
}
