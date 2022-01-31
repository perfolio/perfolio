import React from "react"
import { Card } from "../card"

export interface HeadingCardProps {
  title: string
  subtitle?: string
  additionalContent?: JSX.Element
}

export const HeadingCard: React.FC<HeadingCardProps> = ({
  title,
  subtitle = "",
  additionalContent,
}): JSX.Element => {
  return (
    <Card>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              {title}
            </p>
            <div className="space-y-6">
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">{subtitle}</p>
              {additionalContent}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default HeadingCard
