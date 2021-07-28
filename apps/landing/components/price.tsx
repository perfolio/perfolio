import React from "react"
import { CheckIcon } from "@heroicons/react/outline"
import { Button, Text } from "@perfolio/ui/components"

export interface PriceProps {
  title: string
  price: number
  interval?: string
  bullets: Array<string>
  href: string
  highlighted?: boolean
  submitText: string
}
export const Price: React.FC<PriceProps> = ({
  title,
  price,
  interval,
  bullets,
  href,
  highlighted,
  submitText,
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md p-4 mx-auto shadow-xl sm:p-6 md:px-8 md:py-12">
      <h3 className="text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl">{title}</h3>
      <div className="flex items-end mt-6 leading-7 text-black">
        <p className="text-6xl font-semibold leading-none border-solid">{`$${price}`}</p>
        {interval ? <p className="text-gray-700 border-solid ">/{interval}</p> : null}
      </div>

      <ul className="my-16 space-y-4">
        {bullets.map((bullet) => {
          return (
            <li key={bullet} className="flex items-center w-full text-left">
              <span className="w-6 h-6 text-success">
                <CheckIcon />
              </span>
              <Text>{bullet}</Text>
            </li>
          )
        })}
      </ul>
      <div className="w-full">
        <Button kind={highlighted ? "cta" : "secondary"} href={href} size="auto">
          {submitText}
        </Button>
      </div>
    </div>
  )
}
