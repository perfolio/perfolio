import cn from "classnames"
import React from "react"

export interface TextProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  /**
   * Override default default colors.
   * You can even use gradients here.
   */
  color?: string

  /**
   * If enabled this will render the text semibold
   */
  bold?: boolean
  /**
   * Enable line break on words
   */
  lineBreak?: boolean

  /**
   * Available options: "text-left" | "text-center" | "text-right"
   * Can be combined with breakpoint prefixes
   */
  align?: string
  /**
   * Use a monospace font
   */
  mono?: boolean

  /**
   * Truncate the text to prevent overflows
   */
  truncate?: boolean
}

export const Text: React.FC<TextProps> = ({
  bold,
  color,
  children,
  size = "md",
  lineBreak,
  align,
  mono,
  truncate,
}): JSX.Element => {
  return (
    <p
      className={cn(
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-md": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-gray-700": !color,
          "font-semibold": bold,
          "break-words": lineBreak,
          "font-mono": mono,
          "truncate text-ellipsis whitespace-nowrap": truncate,
        },
        align,
        color,
      )}
    >
      {children}
    </p>
  )
}
