import React, { useEffect, Fragment, useState } from "react"
import { useFormContext } from "react-hook-form"
import cn from "classnames"
import { Transition } from "@headlessui/react"
import { useSearchCompaniesQuery } from "@perfolio/api/graphql"
import { Profile, Avatar, Loading, Text, Tooltip } from "@perfolio/ui/components"
import { useGetUserSettingsQuery } from "@perfolio/api/graphql"
import { useUser } from "@clerk/clerk-react"
export interface AutoCompleteSelectProps<Option> {
  /**
   * Available options the user can choose from
   */
  options: (fragment: string) => Promise<Option[]>

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
  const user = useUser()
  const [state, setState] = useState<State>(State.Start)
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

  const { data } = useGetUserSettingsQuery({ variables: { userId: user.id } })
  const settings = data?.getUserSettings
  /**
   * User search value
   */
  const [search, setSearch] = useState("")
  /**
   * Available options from iex
   */
  const { data: searchResult, loading } = useSearchCompaniesQuery({
    variables: {
      fragment: search,
      // This query only fires if it is defined
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      mic: settings?.defaultExchange.mic!,
    },
    skip: !settings?.defaultExchange.mic,
  })
  const options = searchResult?.searchCompanies
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
            <Avatar src={value.logo} size="xs" />
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
                "text-center h-10 w-full focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
                // { "animate-pulse bg-gray-50 text-opacity-0": options?.length === 0 },
              )}
            >
              {state === State.Done ? (
                <div className="flex items-center justify-center w-full h-full">{value?.name}</div>
              ) : (
                <input
                  type="text"
                  className="w-full h-full text-center focus:bg-gray-50 focus:outline-none"
                  /**
                   * If propagation is not stopped the click will also trigger the div.Button
                   * and the input loses focus.
                   */
                  value={search}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value)
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
              <ul className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {loading ? (
                  <li className="w-full h-32">
                    <Loading bg="bg-gray-50" />
                  </li>
                ) : options?.length === 0 ? (
                  <li className="relative w-full p-2 cursor-pointer">
                    <Text>No results found</Text>
                  </li>
                ) : (
                  options?.map((option, i) => {
                    const company = option?.company
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => {
                            setValue(name, option?.company)
                            setState(State.Done)
                          }}
                          className={cn("relative p-2 cursor-pointer w-full focus:outline-none", {
                            "bg-gray-100": option === value,
                            "bg-gradient-to-tr from-gray-50 to-gray-100": value,
                          })}
                        >
                          <Profile
                            image={company?.logo}
                            subtitle={company?.sector}
                            title={company?.name}
                            tag={company?.ticker}
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
