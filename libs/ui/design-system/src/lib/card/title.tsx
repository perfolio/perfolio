import React from "react"
import { Text } from "../text/text"

export interface CardTitleProps {
  title: string
  subtitle?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({ title, subtitle }): JSX.Element => {
  return (
    <div className="px-4 pt-4">
      <span className="text-lg font-semibold text-gray-900">{title}</span>
      <Text>{subtitle}</Text>
    </div>
  )
}
