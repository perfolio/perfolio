import { CheckIcon, } from "@heroicons/react/outline"
import { Button, Icon, Text, } from "@perfolio/ui/components"
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
},) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border border-gray-200 rounded sm:items-center hover:shadow-2xl",
        {
          "border-primary shadow-cta": highlighted,
        },
      )}
    >
      {highlighted
        ? (
          <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
            <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-gradient-to-tr from-primary to-secondary">
              Most Popular
            </div>
          </div>
        )
        : null}
      <div className="text-center">
        <div className="text-lg font-semibold">{title}</div>
        <div className="flex items-center justify-center mt-2">
          <div className="mr-1 text-5xl font-bold">${price}</div>
          {interval ? <div className="text-gray-700">/ {interval}</div> : null}
        </div>
        <div className="mt-8 space-y-3">
          {features.map((feature,) => (
            <div key={feature} className="flex items-center gap-2">
              <Icon label="Checkmark" size="xs">
                <CheckIcon className="text-black" />
              </Icon>
              <Text>{feature}</Text>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-16">
        <Button href={href} type={highlighted ? "cta" : "secondary"} size="block">
          {submitText}
        </Button>
      </div>
    </div>
  )
}
