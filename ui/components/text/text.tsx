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

  contentEditable?: boolean
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
  contentEditable = false,
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
        {
          "px-3 focus:shadow placeholder-gray-500 transition duration-500 border  rounded  focus:outline-none border-gray-200 focus:border-gray-700 focus:bg-gray-50":
            contentEditable,
        },
      )}
      contentEditable={contentEditable}
    >
      {children}
    </p>
  )
}
