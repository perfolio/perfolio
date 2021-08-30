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
    <div className="flex flex-col space-y-4">
      <span className="text-4xl font-black text-gray-900 ">{title}</span>
      <Text>{subtitle}</Text>
    </div>
  )
}
