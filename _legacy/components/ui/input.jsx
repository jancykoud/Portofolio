import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[48px] rounded-lg border font-inter text-sm bg-primary px-4 py-3 outline-none transition-colors",
        "border-border-warm placeholder:text-muted text-primary-dark",
        "focus:border-accent",
        className
      )}
      ref={ref}
      {...props}
    />
  );
})
Input.displayName = "Input"

export { Input }
