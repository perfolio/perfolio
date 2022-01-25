import cn from "classnames"
import React from "react"

export interface HeadingProps {
  /**
   * Render this text as a h1.
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
  uppercase?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
  h1,
  h2,
  h3,
  h4,
  color,
  uppercase = false,
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
        "text-gray-800",
        {
          "text-6xl font-black": heading === "h1",
          "text-3xl font-black": heading === "h2",
          "text-xl font-bold": heading === "h3",
          "text-base font-semibold": heading === "h4",
        },
        { uppercase: uppercase === true },
        color,
      ),
    },
    children,
  )
  return wrapper
}

export default Heading
