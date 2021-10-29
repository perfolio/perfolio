import React from "react"
import { Loading } from "../loading/loading"
type Justify = "start" | "center" | "end" | "between" | "around"
type Size = "sm" | "md" | "lg" | "auto"
export interface DefaultLinkStyleProps {
  /**
   * The type must be defined but is actually never used.
   */
  kind?: any
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
  children,
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
        ${spacing(size)} 
      `}
    >
      {loading ? (
        <span className="w-4 h-4">
          <Loading />
        </span>
      ) : (
        <>
          {prefix ? <div className={iconSize(size)}>{prefix}</div> : null}
          {children ? <div className={text(size)}>{children}</div> : null}
          {suffix ? <div className={iconSize(size)}>{suffix}</div> : null}
        </>
      )}
    </div>
  )
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
    sm: "text-small",
    md: "text-medium",
    lg: "text-medium font-medium",
    auto: "text-medium",
  }
  return options[size]
}
