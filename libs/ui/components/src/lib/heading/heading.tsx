import React from "react"
import cn from "classnames"

export interface HeadingProps {
  /**
   * Render this text as a h1.
   *
   *
   */
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  /**
   * Override default default colors.
   * You can even use gradients here.
   */
  color?: string
}

export const Heading: React.FC<HeadingProps> = ({
  h1,
  h2,
  h3,
  h4,
  color,
  children,
}): JSX.Element => {
  let heading = ""
  if (h4) heading = "h4"
  if (h3) heading = "h3"
  if (h2) heading = "h2"
  if (h1) heading = "h1"

  if (heading === "") {
    throw new Error(`You must specify exactly one heading level`)
  }

  const wrapper = React.createElement(
    heading,
    {
      className: cn(
        "text-gray-800 font-semibold",
        {
          "text-6xl": heading === "h1",
          "text-3xl": heading === "h2",
          "text-xl": heading === "h3",
          "text-base": heading === "h4",
        },
        color,
      ),
    },
    children,
  )
  return wrapper
}

export default Heading
