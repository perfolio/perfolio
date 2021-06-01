import React from "react"

export interface HeroSectionProps {
  headline: string
  paragraph: React.ReactNode
  primaryButton: React.ReactNode
  secondaryButton: React.ReactNode

  children?: React.ReactNode
}

export const HeroSection: React.FC<HeroSectionProps> = (props): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full max-w-screen-xl">
      <div className="flex flex-col justify-center space-y-4 text-center md:space-y-8 xl:space-y-12 ">
        <h1 className="py-4 -my-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-gray-900 to-primary-700 text-shadow-md sm:text-5xl lg:text-6xl">
          {props.headline}
        </h1>
        <p className="text-gray-600 sm:text-lg sm:mx-auto md:text-xl lg:mx-0">
          {props.paragraph}
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <div className="items-center justify-center sm:flex ">
            <div className="">{props.primaryButton}</div>
            <div className="mt-3 sm:mt-0 sm:ml-3">{props.secondaryButton}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
