import React from "react"
import { Icon } from "@perfolio/ui/components"
/* eslint-disable-next-line */
export interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const Feature: React.FC<FeatureProps> = ({ title, description, icon }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
      <div className="mr-4 ">
        <Icon size="sm" label={title} color="text-gray-900">
          {icon}{" "}
        </Icon>
      </div>
      <div>
        <h6 className="mb-3 text-xl font-bold leading-5 text-center uppercase md:text-left">
          {title}
        </h6>
        <p className="text-sm text-center text-gray-900 md:text-left">{description}</p>
      </div>
    </div>
  )
}

export default Feature
