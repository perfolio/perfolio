import React, { useEffect, Fragment } from "react"
import { useFormContext } from "react-hook-form"
import { Text } from "@perfolio/ui/design-system"
import { SelectorIcon } from "@heroicons/react/outline"
import cn from "classnames"
import { Listbox, Transition } from "@headlessui/react"
export interface SelectProps {
  /**
   * Available options the user can choose from
   */
  options: string[]

  disabled?: boolean
  /**
   * Field name. Make sure this matches your schema.
   */
  name: string

  /**
   * Field label.
   */
  label: string

  hideLabel?: boolean

  iconLeft?: React.ReactNode

  defaultValue?: string | number
  onChange?: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  label,
  hideLabel,
  name,
  iconLeft,
  defaultValue,
}) => {
  const { setValue, watch } = useFormContext()
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
    }
  }, [defaultValue, name, setValue])

  const value = watch(name)

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value, onChange])

  return (
    <div className="w-full text-gray-800">
      <label
        htmlFor={name}
        className={cn("mb-1 block text-xs font-medium text-gray-700 uppercase", {
          "sr-only": hideLabel,
        })}
      >
        {label}
      </label>
      <div className="relative ">
        {iconLeft ? (
          <div className="absolute inset-y-0 left-0 overflow-hidden rounded-l pointer-events-none">
            <span className="flex items-center justify-center w-10 h-10 p-2 overflow-hidden border-r rounded-l">
              {iconLeft}
            </span>
          </div>
        ) : null}
        <Listbox
          value={watch(name)}
          onChange={(value) => {
            console.log(value)
            setValue(name, value)
          }}
        >
          <div className="relative mt-1">
            <Listbox.Button
              className={cn(
                "text-center h-10 w-full px-3 focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
                { "animate-pulse bg-gray-50 text-opacity-0": options.length === 0 },
              )}
            >
              <Text>{watch(name)}</Text>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.sort().map((option, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active, selected }) =>
                      cn("cursor-default select-none relative p-2 text-gray-800", {
                        "bg-gray-100": active,
                        "bg-gradient-to-tr from-gray-900 to-primary-900 text-gray-50 font-semibold":
                          selected,
                      })
                    }
                    value={option}
                  >
                    <span>{option}</span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

export default Select
