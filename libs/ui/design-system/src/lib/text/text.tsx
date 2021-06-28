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

  lineBreak?: boolean

  align?: "text-left" | "text-center" | "text-right"
  mono?: boolean
}

export const Text: React.FC<TextProps> = ({
  bold,
  color,
  children,
  size = "md",
  lineBreak,
  align,
  mono,
}): JSX.Element => {
  return (
    <p
      className={cn(
        `text-${size}`,
        "text-gray-700",
        {
          "text-semibold": bold,
          "break-words": lineBreak,
          "font-mono": mono,
        },
        align,
        color,
      )}
    >
      {children}
    </p>
  )
}
