import React from "react"
import { Icon, Text } from "@perfolio/ui/components"
/* eslint-disable-next-line */
export interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const Feature: React.FC<FeatureProps> = ({ title, description, icon }): JSX.Element => {
  return (
    <div className="p-8 mt-2 text-center">
      <div className="flex flex-col items-center justify-center space-x-4 md:space-x-0">
        <Icon label={title} color="text-white">
          <div className="p-1 rounded bg-primary">{icon}</div>
        </Icon>
        <h2 className="mt-3 font-semibold tracking-wide text-gray-800 uppercase sm:text-lg sm:leading-snug">
          {title}
        </h2>
      </div>
      <Text>{description}</Text>
    </div>
  )
}

export default Feature
