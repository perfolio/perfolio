import React from "react"
import cn from "classnames"

export interface TextProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
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
        `text-${size}`,
        {
          "text-gray-700": !color,
          "font-semibold": bold,
          "break-words": lineBreak,
          "font-mono": mono,
          "truncate overflow-ellipsis": truncate,
        },
        align,
        color,
      )}
    >
      {children}
    </p>
  )
}
