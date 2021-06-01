import React from "react"

export interface SectionTitleProps {
  title: string
  tag: string
  onRight?: boolean
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  tag,
  onRight,
}): JSX.Element => {
  return (
    <div
      className={`text-center md:text-left ${onRight ? "md:text-right" : ""}`}
    >
      <span className="font-semibold tracking-wide text-transparent uppercase bg-clip-text bg-gradient-to-tr from-primary-700 to-primary-900 sm:text-lg sm:leading-snug">
        {tag}
      </span>
      <p className="mt-4 mb-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 text-shadow-sm sm:text-5xl lg:text-6xl">
        {title}
      </p>
    </div>
  )
}
