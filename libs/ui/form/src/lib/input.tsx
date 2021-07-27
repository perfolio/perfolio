import React, { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import classNames from "classnames"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import cn from "classnames"
import { Tooltip } from "@perfolio/ui/components"
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
  help?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  disabled,
  label,
  hideLabel,
  name,
  iconLeft,
  type,
  defaultValue,
  help,
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
        className={cn("flex items-center mb-1 gap-2 text-xs font-medium text-gray-700 uppercase", {
          "sr-only": hideLabel,
        })}
      >
        {label}
        {help ? <Tooltip side="bottom">{help}</Tooltip> : null}
      </label>
      <div className="relative ">
        {iconLeft ? (
          <div className="absolute inset-y-0 left-0 flex items-center overflow-hidden rounded-l pointer-events-none">
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-l">
              <div className="w-8 h-8 p-1 border-r">{iconLeft}</div>
            </div>
          </div>
        ) : null}
        <input
          id={name}
          disabled={disabled || isSubmitting}
          {...register(name)}
          type={type}
          className={classNames(
            "text-center h-10 w-full px-3 focus:shadow placeholder-gray-500 transition duration-500 border  rounded  focus:outline-none",
            {
              "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
              "border-error focus:border-error-dark focus:bg-error-light": error,
              "appearance-none bg-transparent": isSubmitting,
            },
          )}
        />
      </div>

      {error ? (
        <div className="flex items-center pt-2 pb-4 space-x-1 text-sm text-error">
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
