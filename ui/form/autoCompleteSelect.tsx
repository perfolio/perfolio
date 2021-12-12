import { Transition } from "@headlessui/react"
import { useSearch } from "@perfolio/pkg/hooks"
import { Avatar, Description, Loading, Profile, Tooltip } from "@perfolio/ui/components"
import cn from "classnames"
import React, { Fragment, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
export interface AutoCompleteSelectProps<Option> {
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

  onChange?: (option: Option) => void

  help?: React.ReactNode
  renderOption?: (option: Option) => JSX.Element
}

enum State {
  Start,
  Selecting,
  Done,
}

export function AutoCompleteSelect<Option>({
  onChange,
  label,
  hideLabel,
  help,
  name,
}: AutoCompleteSelectProps<Option>): JSX.Element {
  const [state, setState] = useState<State>(State.Start)
  const {
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const assetId = watch(name)

  /**
   * Carry onChange event to parent
   */
  useEffect(() => {
    if (onChange) {
      onChange(assetId)
    }
  }, [assetId, onChange])

  /**
   * User search value
   */
  const [fragment, setFragment] = useState("")

  /**
   * All matches on our database
   */
  const { search, isLoading } = useSearch(fragment)
  const options = search?.documents.map((d) => d.content.asset) ?? []
  const selected = options.find((o) => o.id === assetId)
  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]
  return (
    <div className="w-full text-gray-800">
      <label
        htmlFor={name}
        className={cn("flex items-center mb-1 gap-2 text-xs font-medium text-gray-700 uppercase", {
          "sr-only": hideLabel,
        })}
      >
        {label}
        {help ? <Tooltip side="bottom">{help}</Tooltip> : null}
      </label>
      <div className="relative ">
        {state === State.Done ? (
          <div className="absolute inset-y-0 left-0 flex items-center w-10 h-10 p-2 overflow-hidden rounded-l pointer-events-none">
            <Avatar src={selected?.logo ?? ""} size="xs" />
          </div>
        ) : null}

        {state === State.Done ? (
          <button
            className="absolute inset-0 z-10 w-full h-full cursor-text"
            type="reset"
            onClick={() => {
              /**
               * Go back to the state where the user can enter a search and select an option.
               * This also unmounts the button because value is now falsy
               */
              setValue(name, undefined)
              setState(State.Selecting)
            }}
          />
        ) : null}
        <div>
          <div className="relative mt-1">
            <div
              className={cn(
                "text-center h-10 w-full focus:shadow placeholder-gray-500 transition duration-500 border  rounded  focus:outline-none",
                // { "animate-pulse bg-gray-50 text-opacity-0": options?.length === 0 },
              )}
            >
              {state === State.Done ? (
                <div className="flex items-center justify-center w-full h-full">
                  {selected?.ticker}
                </div>
              ) : (
                <input
                  type="text"
                  className={cn(
                    "text-center h-10 w-full px-3 focus:shadow placeholder-gray-500 transition duration-500 border  rounded  focus:outline-none",
                    {
                      "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
                      "border-error focus:border-error-dark focus:bg-error-light": error,
                      "appearance-none bg-transparent": isSubmitting,
                    },
                  )}
                  /**
                   * If propagation is not stopped the click will also trigger the div.Button
                   * and the input loses focus.
                   */
                  value={fragment}
                  onChange={(e) => {
                    setFragment(e.currentTarget.value)
                    setState(State.Selecting)
                  }}
                />
              )}
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={state === State.Selecting}
            >
              <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-xl max-h-60 focus:outline-none">
                {isLoading ? (
                  <li className="w-full h-32">
                    <Loading bg="bg-gray-50" />
                  </li>
                ) : options.length === 0 ? (
                  <li className="relative w-full p-8">
                    <Description title="No results found">
                      We are continuously improving our service, please enter the ISIN manually to
                      add it to our database.
                    </Description>
                  </li>
                ) : (
                  options.map((option, i) => {
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => {
                            setValue(name, option?.id)
                            setState(State.Done)
                          }}
                          className={cn(
                            "relative p-2 cursor-pointer w-full focus:outline-none hover:bg-gray-50 duration-500",
                            {
                              "bg-gray-100": option?.id === assetId,
                              "bg-gradient-to-tr from-gray-50 to-gray-100": assetId,
                            },
                          )}
                        >
                          <Profile
                            image={option?.logo}
                            subtitle={option?.ticker}
                            title={option?.name}
                            tag={option?.isin}
                          />
                        </button>
                      </li>
                    )
                  })
                )}
              </ul>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  )
}
