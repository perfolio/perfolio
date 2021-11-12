import React from "react"
import { Loading } from "../loading/loading"
type Kind = "primary" | "secondary" | "alert" | "cta" | "plain"
type Size = "sm" | "md" | "lg" | "auto"
type Shape = "square" | "round" | "auto"
type Justify = "evenly" | "center" | "end" | "between" | "around" | "start"

export interface DefaultButtonStyleProps {
  kind: Kind
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: Size
  shape?: Shape
  disabled?: boolean
  justify?: Justify
}

/**
 * Default kind for an element that looks like a button.
 *
 * Controller logic should be done in a parent component by wrapping DefaultButtonStyle.
 */
export const DefaultButtonStyle: React.FC<DefaultButtonStyleProps> = ({
  children,
  kind = "primary",
  loading,
  prefix,
  suffix,
  size = "md",
  shape = "auto",
  justify = "center",
}): JSX.Element => {
  return (
    <>
      <div
        className={`
        transition
        duration-250
        flex
        rounded
        items-center
        w-full
        whitespace-nowrap
        justify-${justify} 
        ${shadow(kind, size)}
        ${colors(kind)}
        ${spacing(size)}
        ${dimensions(size, shape)}
      `}
      >
        {prefix ? <span className={iconSize(size)}>{prefix}</span> : null}
        {loading ? <Loading /> : <span className={text(size)}>{children}</span>}
        {suffix ? <span className={iconSize(size)}>{suffix}</span> : null}
      </div>
    </>
  )
}

const colors = (kind: Kind, disabled?: boolean): string => {
  if (disabled) {
    return "bg-gray-300"
  }

  const common = ""

  const options: Record<Kind, string> = {
    primary:
      " bg-black text-white font-medium hover:border-gray-700 border border-transparent hover:bg-white hover:text-black",
    secondary:
      "bg-transparent border border-gray-300 text-gray-800 hover:border-gray-700 hover:text-black",
    alert: "bg-error text-white border border-error hover:bg-white hover:text-error font-semibold",
    cta: "bg-gradient-to-tr from-cta to-secondary font-medium text-gray-50 justify-center w-full text-sm text-center rounded sm:text-base md:text-lg hover:bg-black duration-500",
    plain:
      "bg-transparent shadow-none hover:shadow-none hover:text-gray-800 text-gray-800 hover:font-semibold",
  }

  return [common, options[kind]].join(" ")
}

const spacing = (size: Size): string => {
  const options: Record<Size, string> = {
    sm: "gap-x-1",
    md: "gap-x-2",
    lg: "gap-x-3",
    auto: "gap-x-2",
  }
  return options[size]
}

const iconSize = (size: Size): string => {
  const options: Record<Size, string> = {
    sm: "w-3 h-3 sm:w-4 sm:h-4",
    md: "w-4 h-4 sm:w-5 sm:h-5",
    lg: "w-5 h-5 sm:w-6 sm:h-6",
    auto: "w-4 h-4 sm:w-5 sm:h-5",
  }
  return options[size]
}

const text = (size: Size): string => {
  const options: Record<Size, string> = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-base sm:font-medium",
    auto: "text-base",
  }
  return options[size]
}
const shadow = (kind: Kind, size: Size): string => {
  if (kind === "plain" || kind === "secondary") {
    return ""
  }
  if (kind === "cta") {
    return "shadow-cta hover:shadow-lg"
  }

  return {
    sm: "shadow-sm hover:shadow-md",
    md: "shadow-md hover:shadow-lg",
    lg: "shadow-lg hover:shadow-2xl",
    auto: "shadow-md hover:shadow-lg",
  }[size]
}

const dimensions = (size: Size, shape: Shape): string => {
  // number[0] contains value for < sm, number[1] for >=sm
  const height: Record<Size, number[]> = {
    sm: [4, 6],
    md: [6, 8],
    lg: [8, 10],
    auto: [8, 10],
  }

  const options: Record<Size, string> = {
    sm: `w-16 h-${height.sm[0]} sm:w-20 sm:h-${height.sm[1]}`,
    md: `w-28 h-${height.md[0]} sm:w-32 sm:h-${height.md[1]}`,
    lg: `w-36 h-${height.lg[0]} sm:w-40 sm:h-${height.lg[1]}`,
    auto: `px-4 py-2 w-full h-${height.auto[0]} sm:h-${height.auto[1]}`,
  }

  switch (shape) {
    case "square":
      return `w-${height[size][0]} h-${height[size][0]} sm:w-${height[size][1]} sm:h-${height[size][1]}`
    case "round":
      return `w-${height[size][0]} h-${height[size][0]} sm:w-${height[size][1]} sm:h-${height[size][1]} rounded-full`

    case "auto":
      return options[size]
  }
}
