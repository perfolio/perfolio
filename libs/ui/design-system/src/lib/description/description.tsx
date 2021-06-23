import { Text } from "../text/text"
import React from "react"

export interface DescriptionProps {
  title?: React.ReactNode | string
}

export const Description: React.FC<DescriptionProps> = ({ title, children }): JSX.Element => {
  return (
    <div className="space-y-1">
      <span className="text-sm font-medium text-gray-900 uppercase whitespace-nowrap">{title}</span>
      <Text size="sm">{children}</Text>
    </div>
  )
}
