import React from "react"
import cn from "classnames"

// eslint-disable-next-line
export interface RootProps {
  border?: boolean
}

export const Root: React.FC<RootProps> = ({ border = true, children }): JSX.Element => {
  return (
    <div
      className={cn("w-full space-y-4 sm:space-y-8 bg-white", {
        "border border-gray-300 rounded": border === true,
      })}
    >
      {children}
    </div>
  )
}
