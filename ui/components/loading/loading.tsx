import { Size } from "@perfolio/ui/types/size"
import cn from "classnames"
import React from "react"
export interface LoadingProps {
  size?: Size
  /**
   * Display a skeleton in this color during loading
   */
  bg?: string

  /**
   * Override
   */
  color?: string
}

export const Loading: React.FC<LoadingProps> = ({ size = "md", bg, color }): JSX.Element => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full animate-pulse",
        bg,
        {
          rounded: bg,
        },
        color,
      )}
    >
      <svg
        className={cn("animate-spin", {
          "w-3 h-3": size === "xs",
          "w-4 h-4": size === "sm",
          "w-6 h-6": size === "md",
          "w-8 h-8": size === "lg",
          "w-12 h-12": size === "xl",
          "w-16 h-16": size === "2xl",
        })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-50"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}
