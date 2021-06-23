import React from "react"
import cn from "classnames"

type Heading = "h1" | "h2" | "h3" | "h4"

export interface TextProps {
  /**
   * Render this text as a headline.
   * Omit to render a paragraph instead.
   */
  heading?: Heading
  /**
   * Override default default colors.
   * You can even use gradients here.
   */
  color?: string
}

export const Text: React.FC<TextProps> = ({ heading, color, children }): JSX.Element => {
  const wrapper = React.createElement(
    heading ?? "p",
    {
      className: cn(
        {
          "text-gray-800 font-semibold text-6xl": heading === "h1",
          "text-gray-800 font-semibold text-4xl": heading === "h2",
          "text-gray-800 font-medium text-2xl": heading === "h3",
          "text-gray-800 font-medium text-xl": heading === "h4",
          "text-gray-700": !heading,
        },
        color,
      ),
    },
    children,
  )
  return wrapper
}

export default Text
