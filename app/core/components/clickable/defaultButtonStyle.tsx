import React from "react"
import { Spinner } from "../spinner/spinner"
type Type = "primary" | "secondary" | "alert" | "cta" | "plain"
type Justify = "start" | "center" | "end" | "between" | "around"
type Size = "small" | "medium" | "large" | "auto"

export interface DefaultButtonStyleProps {
  label: React.ReactNode
  type: Type
  justify?: Justify
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: Size
}

/**
 * Default style for an element that looks like a button.
 *
 * Controller logic should be done in a parent component by wrapping DefaultButtonStyle.
 */
export const DefaultButtonStyle: React.FC<DefaultButtonStyleProps> = ({
  label,
  type = "primary",
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
        ${shadow(type, size)}
        ${colors(type)}
        ${spacing(size)} 
        ${dimensions(size)}  
      `}
    >
      {loading ? (
        <span className="w-4 h-4 text-yellow-400">
          <Spinner />
        </span>
      ) : (
        <>
          {prefix ? <span className={iconSize(size)}>{prefix}</span> : null}
          {label ? <span className={text(size)}>{label}</span> : null}
          {suffix ? <span className={iconSize(size)}>{suffix}</span> : null}
        </>
      )}
    </div>
  )
}

const colors = (type: Type): string => {
  const common = ""

  const options: Record<Type, string> = {
    primary:
      "bg-gradient-to-tr from-black to-gray-900 text-gray-50 hover:border-gray-700 border border-transparent hover:from-gray-100 hover:to-white hover:text-black",
    secondary:
      "bg-transparent border border-gray-200 text-gray-900 hover:border-gray-400 hover:text-black",
    alert: "bg-gradient-to-tr from-orange-500 to-red-500 text-white hover:to-red-400",
    cta: "from-orange-600 to-yellow-500 text-white justify-center w-full text-sm text-center rounded bg-gradient-to-tr sm:text-base md:text-lg hover:from-orange-600 hover:to-yellow-300 duration-200 hover:text-black",
    plain:
      "bg-transparent shadow-none hover:shadow-none hover:text-gray-900 text-gray-800 hover:font-medium",
  }

  return [common, options[type]].join(" ")
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
const shadow = (type: Type, size: Size): string => {
  if (type === "plain") {
    return ""
  }
  return {
    small: "shadow-sm hover:shadow-md",
    medium: "shadow-md hover:shadow-lg",
    large: "shadow-xl hover:shadow-2xl",
    auto: "shadow-md hover:shadow-lg",
  }[size]
}

const dimensions = (size: Size): string => {
  const options: Record<Size, string> = {
    small: "w-20 h-6",
    medium: "w-32 h-8",
    large: "w-40 h-10",
    auto: "p-2 w-full",
  }

  return options[size]
}
