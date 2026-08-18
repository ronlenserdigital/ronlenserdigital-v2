import * as React from "react";
import { cn } from "../../lib/utils.js";

/**
 * Native <select>, styled to the RLD token set.
 *
 * Ported from the shadcn / originui SelectNative. Same props and same API,
 * but mapped off shadcn CSS variables onto our own:
 *   bg-background        -> bg-paper
 *   border-input         -> border-hairline
 *   text-foreground      -> text-ink
 *   text-muted-foreground-> text-graphite
 *   ring-ring            -> accent
 *   bg-accent            -> bg-paper-deep
 *
 * Native on purpose. It gets the OS picker wheel on iOS and Android for free,
 * which is a better mobile experience than a custom listbox, and it costs
 * zero kilobytes.
 */

function ChevronDown({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

const SelectNative = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg",
          "border border-hairline bg-ink-soft text-sm text-paper",
          "transition-[border-color,box-shadow] outline-none",
          "focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-accent/25",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "has-[option[disabled]:checked]:text-graphite",
          props.multiple
            ? "py-1 [&>*]:px-3 [&>*]:py-1.5 [&_option:checked]:bg-ink"
            : "h-11 pe-9 ps-3",
          className
        )}
        {...props}
      >
        {children}
      </select>

      {!props.multiple && (
        <span className="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-graphite peer-disabled:opacity-50">
          <ChevronDown className="h-4 w-4" />
        </span>
      )}
    </div>
  );
});

SelectNative.displayName = "SelectNative";

export { SelectNative };
