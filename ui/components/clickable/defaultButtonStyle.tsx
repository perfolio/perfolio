import React from "react"
import { Loading } from "../loading/loading"
type Kind = "primary" | "secondary" | "alert" | "cta" | "plain"
type Justify = "start" | "center" | "end" | "between" | "around"
type Size = "sm" | "md" | "lg" | "auto"

export interface DefaultButtonStyleProps {
  kind: Kind
  justify?: Justify
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: Size
  disabled?: boolean
}

/**
 * Default kind for an element that looks like a button.
 *
 * Controller logic should be done in a parent component by wrapping DefaultButtonStyle.
 */
export const DefaultButtonStyle: React.FC<DefaultButtonStyleProps> = ({
  children,
  kind = "primary",
  justify = "center",
  loading,
  prefix,
  suffix,
  size = "md",
}): JSX.Element => {
  return (
    <div
      className={`
        transition
        duration-250
        flex
        rounded
        items-center
        whitespace-nowrap
        
        justify-${justify}
        ${shadow(kind, size)}
        ${colors(kind)}
        ${spacing(size)}
        ${dimensions(size)}
      `}
    >
      {prefix ? <span className={iconSize(size)}>{prefix}</span> : null}
      {loading ? <Loading /> : <span className={text(size)}>{children}</span>}
      {suffix ? <span className={iconSize(size)}>{suffix}</span> : null}
    </div>
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
    alert: "bg-gradient-to-tr from-error-dark to-error text-white hover:to-error",
    cta: "bg-gradient-to-tr from-cta to-secondary font-medium text-gray-50 justify-center w-full text-sm text-center rounded sm:text-base md:text-lg hover:bg-black duration-500",
    plain:
      "bg-transparent shadow-none hover:shadow-none hover:text-gray-600 text-gray-800 hover:font-semibold",
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
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    auto: "w-5 h-5",
  }
  return options[size]
}

const text = (size: Size): string => {
  const options: Record<Size, string> = {
    sm: "text-sm",
    md: "text-medium",
    lg: "text-medium font-medium",
    auto: "text-medium",
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

const dimensions = (size: Size): string => {
  const options: Record<Size, string> = {
    sm: "w-20 h-6",
    md: "w-32 h-8",
    lg: "w-40 h-10",
    auto: "px-4 py-2 w-full h-10",
  }

  return options[size]
}
