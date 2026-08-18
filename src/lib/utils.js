/**
 * Minimal className joiner. Filters falsy values and flattens.
 * Same call signature as shadcn's cn() so ported components drop in
 * unchanged, without pulling clsx + tailwind-merge.
 */
export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .join(" ")
    .trim();
}
