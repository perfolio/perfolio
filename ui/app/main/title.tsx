import React from "react"
import { Text } from "@perfolio/ui/components"

export interface MainTitleProps {
  title: string
  subtitle?: string
}

export const MainTitle: React.FC<MainTitleProps> = ({ title, subtitle }): JSX.Element => {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-base font-bold leading-normal text-gray-800 dark:text-gray-100 sm:text-lg md:text-xl lg:text-2xl">
        {title}
      </h1>
      <Text>{subtitle}</Text>
    </div>
  )
}
