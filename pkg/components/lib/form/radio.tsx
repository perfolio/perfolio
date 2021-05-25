import React, { useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/outline"
import classNames from "classnames"

export interface RadioProps {
  label?: string
  options: string[]
  updateValue: (buy: boolean) => void
}

export const Radio: React.FC<RadioProps> = ({
  options,
  label,
  updateValue,
}): JSX.Element => {
  const [selected, setSelected] = useState(options[0]!)

  useEffect(() => {
    updateValue(selected === options[0])
  }, [selected])

  return (
    <div className="w-full space-y-1">
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="block text-xs font-medium text-gray-800 uppercase">
          {label}
        </RadioGroup.Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {options.map((option) => (
            <RadioGroup.Option
              value={option}
              key={option}
              className={({ active, checked }) =>
                classNames(
                  "border-gray-200 focus:shadow focus:border-gray-700 focus:bg-gray-50 w-full p-3 placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
                  {
                    "border-gray-400 focus:border-gray-700 focus:bg-gray-50":
                      checked || active,
                  },
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className="font-medium">
                          {option}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked || active ? (
                      <div className="flex-shrink-0 text-gray-700">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
