import { UseFormRegisterReturn } from "react-hook-form"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import React from "react"
import classNames from "classnames"
/**
 * @see [https://www.w3schools.com/html/html_form_input_types.asp](https://www.w3schools.com/html/html_form_input_types.asp)
 */
type Type =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"

export interface InputProps {
  type: Type
  value?: string | number
  label?: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: string
  disabled?: boolean
  iconLeft?: React.ReactNode
}

/**
 * General purpose input field including a label.
 * This is intended to be used together with react-form-hooks.
 */
export function Input({
  type,
  // rename to labelName because it collides with the HTMLElement <label>
  label,
  placeholder,
  register,
  value,
  disabled,
  error,
  iconLeft,
}: InputProps): React.ReactElement {
  if (type === "checkbox") {
    return (
      <div className="w-full space-y-1">
        <label
          htmlFor={register.name}
          className="block text-xs font-medium text-gray-800 uppercase"
        >
          {label}
        </label>
        <input
          disabled={disabled}
          type={type}
          value={value}
          id={register.name}
          className={classNames(
            "px-3 focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
            {
              "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
              "border-error-400 focus:border-error-700 focus:bg-error-50": error,
              "appearance-none bg-transparent": disabled,
              "px-14": !!iconLeft,
            },
          )}
          placeholder={placeholder}
          {...register}
        />
        {error ? (
          <div className="flex items-center pt-2 pb-4 space-x-1 text-sm text-error-500">
            <ExclamationCircleIcon className="w-4 h-4" />
            <p>
              <span className="font-semibold">Error:</span> {error}
            </p>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="w-full space-y-1">
      <label htmlFor={register.name} className="block text-xs font-medium text-gray-800 uppercase">
        {label}
      </label>
      <div className="relative ">
        {iconLeft ? (
          <div className="absolute inset-y-0 left-0 flex items-center overflow-hidden rounded-l pointer-events-none">
            <span className="w-12 h-12 overflow-hidden border rounded-l">{iconLeft}</span>
          </div>
        ) : null}
        <input
          disabled={disabled}
          type={type}
          value={value}
          id={register.name}
          className={classNames(
            "text-center h-12 w-full px-3 focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
            {
              "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
              "border-error-400 focus:border-error-700 focus:bg-error-50": error,
              "appearance-none bg-transparent": disabled,
              "px-14": !!iconLeft,
            },
          )}
          placeholder={placeholder}
          {...register}
        />
      </div>
      {error ? (
        <div className="flex items-center pt-2 pb-4 space-x-1 text-sm text-error-500">
          <ExclamationCircleIcon className="w-4 h-4" />
          <p>
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>
      ) : null}
    </div>
  )
}
