import * as React from "react";
import { cn } from "../../lib/utils.js";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "block font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-graphite",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
