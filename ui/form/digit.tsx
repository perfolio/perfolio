import { ExclamationCircleIcon, } from "@heroicons/react/outline"
import classNames from "classnames"
import React, { useEffect, useState, } from "react"
import { useFormContext, } from "react-hook-form"
export interface DigitInputProps {
  /**
   * Field name. Make sure this matches your schema.
   */
  name: string

  focus?: boolean
  onChange?: () => void
  setFocusOnMe: () => void
}

export const Digit: React.FC<DigitInputProps> = ({ focus, onChange, name, setFocusOnMe, },) => {
  const {
    register,
    formState: { isSubmitting, errors, },
    setFocus,
  } = useFormContext()
  const error = Array.isArray(errors[name],)
    ? errors[name].join(", ",)
    : errors[name]?.message || errors[name]

  useEffect(() => {
    if (focus) {
      setFocus(name,)
    }
  }, [focus, name, setFocus,],)

  const [hasValue, setHasValue,] = useState(false,)

  return (
    <div>
      <input
        onFocusCapture={(e,) => {
          setFocusOnMe()
          e.currentTarget.select()
        }}
        id={name}
        {...register(name,)}
        autoComplete="off"
        maxLength={1}
        type="text"
        pattern="[\d]{1}"
        onChange={(e,) => {
          const { value, } = e.currentTarget
          setHasValue(value !== "",)
          if (onChange && value !== "") {
            onChange()
          }
          e.currentTarget.blur()
        }}
        className={classNames(
          "appearance-none text-center h-12 md:h-14 w-12 md:w-14 px-3 text-xl font-medium focus:shadow placeholder-gray-500 transition duration-500 border  rounded  focus:outline-none",
          {
            "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
            "appearance-none bg-transparent": isSubmitting,
            "bg-black text-white": hasValue && !error,
            "border-error focus:border-error-dark focus:bg-error-light bg-white text-error": error,
          },
        )}
      />

      {error
        ? (
          <div className="flex items-center pt-2 pb-4 space-x-1 text-sm text-error">
            <ExclamationCircleIcon className="w-4 h-4" />
            <p>
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        )
        : null}
    </div>
  )
}
