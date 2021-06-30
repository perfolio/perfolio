import React from "react"
import cn from "classnames"
import { Root } from "@radix-ui/react-accessible-icon"

type Size = "sm" | "md" | "lg"

export interface IconProps {
  /**
   * The accessible label for the icon. This label will be visually hidden but
   * announced to screen reader users, similar to `alt` text for `img` tags.
   */
  label: string
  size?: Size
  color?: string
}

export const Icon: React.FC<IconProps> = ({ size = "md", label, children, color }): JSX.Element => {
  return (
    <Root label={label}>
      <div
        className={cn("focus:outline-none", color, {
          "w-8 h-8": size === "sm",
          "w-10 h-10": size === "md",
          "w-16 h-16": size === "lg",
        })}
      >
        {children}
      </div>
    </Root>
  )
}

export default Icon
