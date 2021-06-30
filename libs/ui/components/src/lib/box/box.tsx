import React from "react"

type Size = "sm" | "md" | "lg"
export interface BoxProps {
  className?: string
  size?: Size
}
/**
 * A simple wrapper for any element to add a shadow effect around it.
 */
export const Box: React.FC<BoxProps> = ({ children, className, size }) => (
  <div className={`rounded-sm ${shadow(size ?? "md")} overflow-hidden`}>
    <div className={className}>{children}</div>
  </div>
)

/**
 * Choose the correct shadow class based on size.
 *
 */
function shadow(size: Size): string {
  return {
    sm: "shadow",
    md: "shadow-lg",
    lg: "shadow-xl",
  }[size]
}
