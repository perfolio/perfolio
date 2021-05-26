import React from "react"
import { SignupForm } from "../components/SignupForm"
import { useRouter, Routes, BlitzPage } from "blitz"

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
        <div className="flex flex-col h-full lg:flex-row">
          <div className="relative w-full h-full bg-cover lg:w-1/2 bg-gradient-to-r from-white via-white to-gray-100">
            <div className="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
              <div className="flex flex-col items-start space-y-4 tracking-tight lg:max-w-3xl">
                <div className="relative">
                  <h1 className="text-5xl font-bold text-gray-900 xl:text-6xl">{h1}</h1>
                </div>
                <p className="text-lg font-normal text-gray-500">{h2}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-y-16 bg-white lg:w-1/2">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
