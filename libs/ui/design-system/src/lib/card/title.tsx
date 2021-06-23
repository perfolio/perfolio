import React from "react"
import { Heading } from "../heading/heading"
import { Text } from "../text/text"

export interface CardTitleProps {
  title: string
  subtitle?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({ title, subtitle }): JSX.Element => {
  return (
    <div className="p-4">
      <Heading h2>{title}</Heading>
      <Text>{subtitle}</Text>
    </div>
  )
}
