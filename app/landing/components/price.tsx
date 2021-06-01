import React from "react"
import { CheckIcon } from "@heroicons/react/outline"
import { Button } from "app/core/components"
export interface PriceProps {
  title: string
  description: string
  price: number
  interval?: string
  bullets: Array<string>
  href: string
  highlighted?: boolean
}
export const Price: React.FC<PriceProps> = ({
  title,
  description,
  price,
  interval,
  bullets,
  href,
  highlighted,
}) => (
  <div className="flex flex-col items-center w-full max-w-md p-4 mx-auto my-0 space-y-6 sm:p-6 md:px-8 md:py-12">
    <h3 className="m-0 text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl">
      {title}
    </h3>
    <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
      <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
        <p className="text-6xl font-semibold leading-none border-solid ">
          {price === 0 ? "Free" : `$${price}`}
        </p>
        {price !== 0 ? <p className="m-0 border-solid ">/{interval}</p> : null}
      </div>
    </div>
    <p className="text-base leading-normal text-left text-gray-900 border-0 border-gray-200">
      {description}
    </p>
    <ul className="flex-1 p-0 mt-4 ml-5 leading-7 text-gray-900 border-0 border-gray-200">
      {bullets.map((bullet) => {
        return (
          <li
            key={bullet}
            className="inline-flex items-center w-full mb-2 ml-5 font-semibold text-left border-solid"
          >
            <span className="w-6 h-6 text-blue-600">
              <CheckIcon />
            </span>
            <span className="ml-2">{bullet}</span>
          </li>
        )
      })}
    </ul>
    <div className="w-full">
      <Button
        kind={highlighted ? "primary" : "secondary"}
        href={href}
        label="Choose plan"
        size="auto"
      />
    </div>
  </div>
)
