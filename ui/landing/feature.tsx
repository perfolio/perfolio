import { Icon } from "@perfolio/ui/components"
import React from "react"
/* eslint-disable-next-line */
export interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const Feature: React.FC<FeatureProps> = ({ title, description, icon }): JSX.Element => {
  return (
    <div key={title} className="pt-6 text-center h-full">
      <div className="flow-root px-6 pb-8 bg-white rounded shadow-ambient h-full">
        <div className="-mt-6">
          <div>
            <span className="inline-flex items-center justify-center p-3 rounded-md shadow-lg bg-gradient-to-tr from-primary to-secondary">
              <Icon size="sm" label={title} color="text-white">
                {icon}
              </Icon>
            </span>
          </div>
          <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900 uppercase">
            {title}
          </h3>
          <p className="mt-5 text-base text-gray-500">{description} </p>
        </div>
      </div>
    </div>
  )
}

export default Feature
