import React from "react"

/* eslint-disable-next-line */
export interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon,
}): JSX.Element => {
  return (
    <div className="mt-2">
      <div className="flex flex-col items-center justify-center space-x-4 md:block md:space-x-0">
        <div className="flex justify-center w-12 h-12 rounded bg-gradient-to-t from-info-700 to-primary-700">
          <span className="w-full h-full p-2 text-white">{icon}</span>
        </div>
        <h2 className="mt-3 font-semibold tracking-wide text-gray-800 uppercase sm:text-lg sm:leading-snug">
          {title}
        </h2>
      </div>
      <p className="mt-1 text-base leading-6 text-center text-gray-600 sm:text-left">
        {description}{" "}
      </p>
    </div>
  )
}

export default Feature
