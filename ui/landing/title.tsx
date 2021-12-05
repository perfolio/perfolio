import React from "react"

export interface SectionTitleProps {
  title: string
  tag: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, tag }): JSX.Element => {
  return (
    <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold tracking-wide text-transparent uppercase bg-gradient-to-tr bg-clip-text from-primary to-secondary">
          {tag}
        </h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          {title}
        </p>
      </div>
    </div>
  )
}
