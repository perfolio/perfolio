import React from "react"
import classNames from "classnames"
import { InformationCircleIcon, SparklesIcon } from "@heroicons/react/outline"
import { Tooltip } from "app/core/components"
export interface ValueProps {
  value: number | string
  label?: string
  tooltip?: string
  iconLeft?: React.ReactNode
}

/**
 * General purpose Value field including a label.
 * Displays data and blends in nicely.
 */
export function Value({ label, value, tooltip, iconLeft }: ValueProps): React.ReactElement {
  return (
    <div className="w-full space-y-1">
      <label
        htmlFor={label}
        className="flex items-center space-x-2 text-xs font-medium text-gray-800 uppercase"
      >
        <span>{label}</span>
        {tooltip ? (
          <Tooltip
            leftIcon={<SparklesIcon />}
            text="Automatically calculated when you have added an isin and date"
          >
            <InformationCircleIcon className="w-4 h-4" />
          </Tooltip>
        ) : null}
      </label>
      <div className="relative">
        {iconLeft ? (
          <div className="absolute inset-y-0 left-0 flex items-center overflow-hidden rounded-l pointer-events-none bg-gray-50">
            <span className="w-12 h-12 overflow-hidden border rounded-l">{iconLeft}</span>
          </div>
        ) : null}
        <div
          className={classNames(
            "text-center h-12 w-full p-3 placeholder-gray-500 transition duration-300 border  rounded  focus:outline-none",

            { "px-14": !!iconLeft },
          )}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
