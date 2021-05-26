import React, { forwardRef, useState, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import classNames from "classnames"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
export interface LabeledTextFieldProps {
  /**
   * Field name.
   */
  name: string
  /**
   * Field label.
   */
  label: string
  /**
   *  Field type. Doesn't include radio buttons and checkboxes
   */
  type?: "text" | "password" | "email" | "number" | "date"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>

  iconLeft?: React.ReactNode
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, name, iconLeft, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <div {...outerProps} className="w-full space-y-1 text-gray-800">
        <label className="block text-xs font-medium text-gray-700 uppercase">{label}</label>
        <div className="relative ">
          {iconLeft ? (
            <div className="absolute inset-y-0 left-0 overflow-hidden rounded-l pointer-events-none">
              <span className="flex items-center justify-center w-12 h-12 p-3 overflow-hidden border-r rounded-l">
                {iconLeft}
              </span>
            </div>
          ) : null}
          <input
            disabled={isSubmitting}
            {...register(name)}
            {...props}
            className={classNames(
              "text-center h-12 w-full px-3 focus:shadow placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",
              {
                "border-gray-200 focus:border-gray-700 focus:bg-gray-50": !error,
                "border-error-400 focus:border-error-700 focus:bg-error-50": error,
                "appearance-none bg-transparent": isSubmitting,
                "px-14": !!iconLeft,
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
  },
)

export default LabeledTextField
