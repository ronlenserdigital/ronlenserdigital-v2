import * as React from "react";
import { cn } from "../../lib/utils.js";

const base =
  "w-full rounded-lg border border-hairline bg-paper px-3 text-sm text-ink " +
  "placeholder:text-graphite/60 outline-none transition-[border-color,box-shadow] " +
  "focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent/25 " +
  "disabled:pointer-events-none disabled:opacity-50";

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, "h-11", className)} {...props} />
));
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, "min-h-28 py-3 resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export { Input, Textarea };
