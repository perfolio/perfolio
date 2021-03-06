import cn from "classnames"
import React from "react"
import { Text } from "../text/text"
export interface DescriptionProps {
  title?: React.ReactNode | string
  noCaps?: boolean
}

export const Description: React.FC<DescriptionProps> = ({
  title,
  children,
  noCaps,
}): JSX.Element => {
  return (
    <div className="space-y-1">
      <span
        className={cn("text-sm font-medium text-gray-900 whitespace-nowrap", {
          uppercase: !noCaps,
        })}
      >
        {title}
      </span>
      <Text size="sm">{children}</Text>
    </div>
  )
}
