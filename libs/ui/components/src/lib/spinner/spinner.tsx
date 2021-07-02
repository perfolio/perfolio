import React from "react"
import cn from "classnames"
export interface SpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size = "md" }): JSX.Element => {
  return (
    <div className={className}>
      <span className="flex items-center justify-center w-full h-full animate-pulse">
        <svg
          className={cn("animate-spin", {
            "w-8 h-8": size === "sm",
            "w-10 h-10": size === "md",
            "w-16 h-16": size === "lg",
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
      </span>
    </div>
  )
}
