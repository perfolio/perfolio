import { CheckIcon } from "@heroicons/react/outline"
import { Button } from "@perfolio/ui/components"
import cn from "classnames"
import React from "react"

export interface PriceProps {
  title: string
  price: number
  interval?: string
  features: Array<string>
  href: string
  highlighted?: boolean
  submitText: string
}
export const Price: React.FC<PriceProps> = ({
  title,
  price,
  interval,
  features,
  href,
  highlighted,
  submitText,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col transition-shadow duration-300 shadow-cta overflow-hidden bg-white  rounded hover:shadow-2xl",
        {
          "border border-primary ": highlighted,
        },
      )}
    >
      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
        <div>
          <h3
            className="inline-flex px-4 py-1 text-sm font-semibold tracking-wide uppercase rounded bg-primary-light text-primary"
            id="tier-standard"
          >
            {title}
          </h3>
        </div>
        <div className="flex items-baseline mt-4 text-6xl font-extrabold">
          ${price}
          <span className="ml-1 text-2xl font-medium text-gray-500">/{interval}</span>
        </div>
        {/* <p className="mt-5 text-lg text-gray-500">{tier.description}</p> */}
      </div>
      <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-8 space-y-6 bg-gray-50 sm:p-10 sm:pt-6">
        <ul role="list" className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <div className="shrink-0">
                <CheckIcon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <p className="ml-3 text-base text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
        <div className="w-full mt-16">
          <Button href={href} type={highlighted ? "cta" : "secondary"} size="block">
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  )
}
