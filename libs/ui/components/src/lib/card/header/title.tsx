import React from "react"
import { Text } from "../../text/text"

export interface CardHeaderTitleProps {
  title: string
  subtitle?: string
}

export const CardHeaderTitle: React.FC<CardHeaderTitleProps> = ({
  title,
  subtitle,
}): JSX.Element => {
  return (
    <div>
      <span className="text-lg font-semibold text-gray-900">{title}</span>
      <Text>{subtitle}</Text>
    </div>
  )
}
