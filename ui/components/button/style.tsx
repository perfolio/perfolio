import { Loading } from "@perfolio/ui/components"
import React from "react"

import cn from "classnames"
import { Size } from "@perfolio/ui/types/size"

export type ButtonType =
  | "primary"
  | "secondary"
  | "cta"
  | "warning"
  | "error"
  | "plain"
  | "plaininverted"
type Justify = "start" | "end" | "center" | "between" | "around" | "evenly"

export type ButtonStyleProps = React.PropsWithChildren<{
  size?: Size | "block"
  type?: ButtonType
  justify?: Justify

  /**
   * Display an icon instead of text
   */
  icon?: React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  loading?: boolean
  disabled?: boolean
}>

export const ButtonStyle: React.FC<ButtonStyleProps> = ({
  size = "md",
  type = "primary",
  justify = "center",
  icon,
  iconLeft,
  iconRight,
  loading,
  disabled,
  children,
}): JSX.Element => {
  return (
    <div
      className={cn(
        /**
         * Common for all variations
         */
        "flex rounded border transition-all duration-500 items-center text-center font-medium whitespace-nowrap focus:ring-0 focus:outline-none",
        /**
         * Justify
         */
        {
          "justify-start": justify === "start",
          "justify-end": justify === "end",
          "justify-center": justify === "center",
          "justify-between": justify === "between",
          "justify-around": justify === "around",
          "justify-evenly": justify === "evenly",
        },
        /**
         * Size for regular buttons
         */
        !icon && {
          "w-20 h-6 text-sm shadow-sm hover:shadow px-2 py-1": size === "sm" || size === "xs",
          "w-32 h-8 text-md shadow hover:shadow-md px-3 py-1": size === "md",
          "w-40 h-10 text-lg shadow-md hover:shadow-lg px-6 py-2": size === "lg",
          "w-full h-10 text-lg block shadow-md hover:shadow-xl px-6 py-2": size === "block",
        },
        /**
         * Edge case: single icon as button
         */
        icon && {
          "w-6 h-6 ": size === "sm" || size === "xs",
          "w-8 h-8 p-1": size === "md",
          "w-10 h-10 p-2": size === "lg" || size === "block",
        },
        /**
         * type
         */
        !disabled && {
          "bg-black text-gray-50 hover:bg-white hover:text-gray-900 border-black ":
            type === "primary",
          "bg-white text-gray-900 border-gray-900 hover:bg-black hover:text-gray-50":
            type === "secondary",
          "bg-gradient-to-tr from-primary to-secondary text-gray-50 border-transparent  hover:from-black hover:to-black shadow-cta hover:border-white":
            type === "cta",
          "text-gray-900  hover:text-primary border-0 shadow-none hover:shadow-none":
            type === "plain",
          "text-gray-50  hover:text-gray-900 border-0 shadow-none hover:shadow-none":
            type === "plaininverted",
          "bg-error text-white border-error hover:bg-white hover:text-error": type === "error",
        },
        disabled && {
          "bg-black text-gray-400": type === "primary",
          "bg-white text-gray-600 border-gray-60": type === "secondary",
          "bg-gradient-to-tr from-primary to-secondary text-gray-400 shadow-cta": type === "cta",
          "text-gray-600 border-0 shadow-none": type === "plain",
          "text-gray-400 border-0 shadow-none": type === "plaininverted",
          "bg-error-light text-gray-white border-error-light": type === "error",
        },
      )}
    >
      {iconLeft ? (
        <span
          className={cn({
            "w-4 h-4 mr-1": size === "sm" || size === "xs",
            "w-5 h-5 mr-2": size === "md",
            "w-6 h-6 mr-2": size === "lg" || size === "block",
          })}
        >
          {iconLeft}
        </span>
      ) : null}

      {loading ? (
        <Loading />
      ) : icon ? (
        <span
          className={cn({
            "w-6 h-6": size === "sm" || size === "xs",
            "w-8 h-8": size === "md",
            "w-10 h-10": size === "lg" || size === "block",
          })}
        >
          {icon}
        </span>
      ) : (
        children
      )}
      {iconRight ? (
        <span
          className={cn({
            "w-4 h-4 ml-1": size === "sm" || size === "xs",
            "w-5 h-5 ml-2": size === "md",
            "w-6 h-6 ml-2": size === "lg" || size === "block",
          })}
        >
          {iconRight}
        </span>
      ) : null}
    </div>
  )
}
