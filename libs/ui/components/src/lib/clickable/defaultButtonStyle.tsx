import React from "react"
import { Loading } from "../loading/loading"
type Kind = "primary" | "secondary" | "alert" | "cta" | "plain"
type Justify = "start" | "center" | "end" | "between" | "around"
type Size = "small" | "medium" | "large" | "auto"

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
  size = "medium",
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
      {loading ? (
        <Loading color={kind === "primary" ? "text-white" : undefined} />
      ) : (
        <span className={text(size)}>{children}</span>
      )}
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
      "bg-primary text-gray-50 hover:border-gray-700 border border-transparent hover:from-gray-100 hover:to-white hover:text-black",
    secondary:
      "bg-transparent border border-gray-200 text-gray-900 hover:border-gray-400 hover:text-black",
    alert: "bg-gradient-to-tr from-error-700 to-error-600 text-white hover:to-error-400",
    cta: "from-error-600 to-secondary-500 text-white justify-center w-full text-sm text-center rounded bg-gradient-to-tr sm:text-base md:text-lg hover:from-error-600 hover:to-secondary-300 duration-200 hover:text-black",
    plain:
      "bg-transparent shadow-none hover:shadow-none hover:text-gray-900 text-gray-800 hover:font-semibold",
  }

  return [common, options[kind]].join(" ")
}

const spacing = (size: Size): string => {
  const options: Record<Size, string> = {
    small: "gap-x-1",
    medium: "gap-x-2",
    large: "gap-x-3",
    auto: "gap-x-2",
  }
  return options[size]
}

const iconSize = (size: Size): string => {
  const options: Record<Size, string> = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
    auto: "w-5 h-5",
  }
  return options[size]
}

const text = (size: Size): string => {
  const options: Record<Size, string> = {
    small: "text-sm",
    medium: "text-medium",
    large: "text-medium font-medium",
    auto: "text-medium",
  }
  return options[size]
}
const shadow = (kind: Kind, size: Size): string => {
  if (kind === "plain") {
    return ""
  }

  return {
    small: "shadow-sm hover:shadow-md",
    medium: "shadow-md hover:shadow-lg",
    large: "shadow-lg hover:shadow-2xl",
    auto: "shadow-md hover:shadow-lg",
  }[size]
}

const dimensions = (size: Size): string => {
  const options: Record<Size, string> = {
    small: "w-20 h-6",
    medium: "w-32 h-8",
    large: "w-40 h-10",
    auto: "p-2 w-full h-10",
  }

  return options[size]
}
