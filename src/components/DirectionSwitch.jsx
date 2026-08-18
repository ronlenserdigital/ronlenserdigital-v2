import { useEffect, useState } from "react";

/**
 * Temporary. Lets Ron flip between visual directions on the live site.
 * Delete this file and the <DirectionSwitch /> mount once a direction is picked.
 *
 * Visible in dev, or on any URL with ?pick in the query string.
 */

const DIRECTIONS = [
  { id: "volt", name: "Volt", note: "Black, bone, acid lime. Syne." },
  { id: "steel", name: "Steel", note: "Concrete, charcoal, safety orange. Archivo wide." },
  { id: "oxblood", name: "Oxblood", note: "Near black, bone, deep red. Fraunces." },
];

export function DirectionSwitch() {
  const [dir, setDir] = useState(
    () => localStorage.getItem("rld-dir") || "volt"
  );
  const [open, setOpen] = useState(false);

  const visible =
    import.meta.env.DEV ||
    (typeof window !== "undefined" && window.location.search.includes("pick"));

  useEffect(() => {
    document.documentElement.setAttribute("data-dir", dir);
    localStorage.setItem("rld-dir", dir);
  }, [dir]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[70] md:bottom-8 md:left-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-ink px-4 py-2.5 font-mono text-[0.625rem] tracking-[0.16em] text-paper uppercase shadow-lg"
      >
        {open ? "Close" : `Direction: ${dir}`}
      </button>

      {open && (
        <div className="mt-3 w-72 rounded-xl border border-hairline bg-paper p-2 shadow-2xl">
          {DIRECTIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDir(d.id)}
              className={`block w-full rounded-lg px-3 py-3 text-left transition-colors ${
                dir === d.id ? "bg-ink text-paper" : "hover:bg-paper-deep"
              }`}
            >
              <span className="block text-sm font-medium">{d.name}</span>
              <span
                className={`mt-0.5 block text-xs ${
                  dir === d.id ? "text-paper/60" : "text-graphite"
                }`}
              >
                {d.note}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
