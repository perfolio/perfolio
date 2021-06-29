import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import classNames from "classnames"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import cn from "classnames"
export interface InputProps {
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
  /**
   *  Field type. Doesn't include radio buttons and checkboxes
   */
  type?: "text" | "password" | "email" | "number" | "date"

  iconLeft?: React.ReactNode

  defaultValue?: string | number
}

export const Input: React.FC<InputProps> = ({
  disabled,
  label,
  hideLabel,
  name,
  iconLeft,
  type,
  defaultValue,
}) => {
  const {
    register,
    formState: { isSubmitting, errors },
    setValue,
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue)
    }
  }, [defaultValue, name, setValue])
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
        <input
          id={name}
          disabled={disabled || isSubmitting}
          {...register(name)}
          type={type}
          className={classNames(
            "text-center h-10 w-full px-3 focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
            {
              "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
              "border-error-400 focus:border-error-700 focus:bg-error-50": error,
              "appearance-none bg-transparent": isSubmitting,
            },
          )}
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

export default Input
