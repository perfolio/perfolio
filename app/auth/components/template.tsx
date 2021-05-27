import { Logo } from "app/core/components"
import React from "react"

export interface AuthPageTemplateProps {
  h1: React.ReactNode
  h2?: React.ReactNode
}

export const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({
  h1,
  h2,
  children,
}): JSX.Element => {
  return (
    <section className="bg-white ">
      <div className="h-screen mx-auto max-w-7xl">
        <span className="fixed flex justify-center w-full mt-4 md:hidden">
          <Logo imageColor="text-primary-900" textColor="text-gray-900" withName />
        </span>

        <div className="flex flex-col items-center justify-center h-full space-y-10 md:space-y-0 md:flex-row">
          <div className="w-full md:h-full md:bg-gradient-to-r md:from-white md:via-white md:to-gray-100">
            <div className="flex flex-col items-center justify-center w-full md:h-full">
              <div className="flex flex-col items-center justify-center space-y-4 tracking-tight md:items-start md:justify-start lg:max-w-3xl">
                <h1 className="text-5xl font-bold text-center text-gray-900 xl:text-6xl">{h1}</h1>
                <h2 className="text-lg font-normal text-gray-500 ">{h2}</h2>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-y-16 md:max-w-sm md:w-full">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
