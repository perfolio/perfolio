import React, { useEffect, Fragment, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Icon } from "@perfolio/ui/components"
import { XIcon } from "@heroicons/react/outline"
import cn from "classnames"
import { Listbox, Transition } from "@headlessui/react"
import { useSearch } from "@perfolio/data-access/queries"
export interface AutoCompleteSelectProps<T> {
  /**
   * Available options the user can choose from
   */
  options: (fragment: string) => Promise<T[]>

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

  onChange?: (value: T) => void
}

export function AutoCompleteSelect<T>({
  onChange,
  label,
  hideLabel,
  name,
  iconLeft,
}: AutoCompleteSelectProps<T>): JSX.Element {
  const { setValue, watch } = useFormContext()

  const value = watch(name)

  /**
   * Carry onChange event to parent
   */
  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value, onChange])

  /**
   * Dropdown open state
   */
  const [openOverride, setOpenOverride] = useState(false)

  /**
   * User search value
   */
  const [search, setSearch] = useState("")

  /**
   * Available options from iex
   */
  const { search: options } = useSearch({ fragment: search })

  useEffect(() => {
    console.log("Triggered by options")
    setOpenOverride(!!options)
  }, [options])

  useEffect(() => {
    setOpenOverride(!value)
  }, [value])

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
        {value ? (
          <div className="absolute inset-y-0 right-0 z-50 overflow-hidden rounded-r">
            <button
              type="reset"
              onClick={(e) => {
                e.stopPropagation()
                console.log("ASDF")
                setValue(name, undefined)
              }}
              className="flex items-center justify-center w-10 h-10 p-2 overflow-hidden border-r rounded-l"
            >
              <Icon label="Clear search">
                <XIcon />
              </Icon>
            </button>
          </div>
        ) : null}
        <Listbox
          value={watch(name)}
          onChange={(value) => {
            setValue(name, value)
          }}
        >
          {({ open }) => (
            <div className="relative mt-1">
              <Listbox.Button
                as="div"
                className={cn(
                  "text-center h-10 w-full focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
                  // { "animate-pulse bg-gray-50 text-opacity-0": options?.length === 0 },
                )}
              >
                {value ? (
                  <div>{JSON.stringify(value)}</div>
                ) : (
                  <input
                    type="text"
                    className="w-full h-full text-center bg-error-200"
                    value={value || search}
                    onChange={(e) => {
                      setSearch(e.currentTarget.value)
                      setValue(name, undefined)
                    }}
                  />
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                show={open || openOverride}
              >
                <Listbox.Options
                  static
                  className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {options?.sort().map((option, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active, selected }) =>
                        cn("cursor-default select-none relative p-2 text-gray-800", {
                          "bg-gray-100": active,
                          "bg-gradient-to-tr from-gray-900 to-primary-900 text-gray-50 font-semibold":
                            selected,
                        })
                      }
                      value={option.symbol}
                    >
                      <span>{option.symbol}</span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  )
}
