import { Root } from "@radix-ui/react-accessible-icon"
import cn from "classnames"
import React from "react"

type Size = "xs" | "sm" | "md" | "lg"

export interface IconProps {
  /**
   * The accessible label for the icon. This label will be visually hidden but
   * announced to screen reader users, similar to `alt` text for `img` tags.
   */
  label: string
  size?: Size
  color?: string
}

export const Icon: React.FC<IconProps> = (
  { size = "md", label, children, color },
): JSX.Element => {
  return (
    <Root label={label}>
      <div
        className={cn("focus:outline-none", color, {
          "w-3 h-3 sm:w-5 sm:h-5": size === "xs",
          "w-6 h-6 sm:w-8 sm:h-8": size === "sm",
          "w-8 h-8 sm:w-10 sm:h-10": size === "md",
          "w-14 h-14 sm:w-16 sm:h-16": size === "lg",
        })}
      >
        {children}
      </div>
    </Root>
  )
}

export default Icon
