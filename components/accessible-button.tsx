"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AccessibleButtonProps extends ButtonProps {
  "aria-label"?: string
  "aria-describedby"?: string
  loading?: boolean
  loadingText?: string
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ className, children, loading, loadingText, disabled, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "transition-all duration-200 ease-in-out",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "hover:scale-105 active:scale-95",
          loading && "cursor-not-allowed opacity-70",
          className,
        )}
        disabled={disabled || loading}
        aria-label={ariaLabel || (typeof children === "string" ? children : undefined)}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="sr-only">Loading</span>
            {loadingText || children}
          </div>
        ) : (
          children
        )}
      </Button>
    )
  },
)
AccessibleButton.displayName = "AccessibleButton"
