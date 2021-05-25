import React from "react"
import { Spinner } from "../spinner/spinner"
type Justify = "start" | "center" | "end" | "between" | "around"
type Size = "small" | "medium" | "large" | "auto"
export interface DefaultLinkStyleProps {
  /**
   * The type must be defined but is actually never used.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type?: any
  label?: React.ReactNode
  justify?: Justify
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: Size
}

/**
 * Default style for an element that looks like a Link.
 *
 * Controller logic should be done in a parent component by wrapping DefaultLinkStyle.
 */
export const DefaultLinkStyle: React.FC<DefaultLinkStyleProps> = ({
  label,
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
        ${spacing(size)} 
      `}
    >
      {loading ? (
        <span className="w-4 h-4 text-yellow-400">
          <Spinner />
        </span>
      ) : (
        <>
          {prefix ? <div className={iconSize(size)}>{prefix}</div> : null}
          {label ? <div className={text(size)}>{label}</div> : null}
          {suffix ? <div className={iconSize(size)}>{suffix}</div> : null}
        </>
      )}
    </div>
  )
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
