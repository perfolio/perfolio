import React from "react"

type Size = "small" | "medium" | "large"
export interface BoxProps {
  className?: string
  size?: Size
}
/**
 * A simple wrapper for any element to add a shadow effect around it.
 */
export const Box: React.FC<BoxProps> = ({ children, className, size }) => (
  <div className={`rounded-sm ${shadow(size ?? "medium")} overflow-hidden`}>
    <div className={className}>{children}</div>
  </div>
)

/**
 * Choose the correct shadow class based on size.
 *
 */
function shadow(size: Size): string {
  return {
    small: "shadow",
    medium: "shadow-lg",
    large: "shadow-xl",
  }[size]
}
