import React from "react"
import { Text, } from "../../text/text"

export interface CardHeaderTitleProps {
  title: string
  subtitle?: string
}

export const CardHeaderTitle: React.FC<CardHeaderTitleProps> = ({
  title,
  subtitle,
},): JSX.Element => {
  return (
    <div className="flex flex-col items-start">
      <span className="text-2xl sm:text-4xl font-black text-gray-900 ">{title}</span>
      {subtitle
        ? (
          <div className="mt-4">
            <Text>{subtitle}</Text>
          </div>
        )
        : null}
    </div>
  )
}
