import React from "react"
import cn from "classnames"
export type ToggleGroupProps<T extends string> = {
  size?: "sm" | "md" | "lg"
  options: T[]
  selected: T
  setSelected: (value: T) => void
}

export function ToggleGroup<T extends string>({
  size = "md",
  options,
  selected,
  setSelected,
}: ToggleGroupProps<T>): JSX.Element {
  return (
    <ul className="inline-flex overflow-hidden border border-gray-200 divide-x divide-gray-300 rounded">
      {options.map((label) => (
        <li key={label}>
          <button
            onClick={() => setSelected(label)}
            className={cn(
              "bg-white text-primary-900 transition duration-150 ease-in-out  hover:text-gray-800 hover:bg-gray-100 focus:outline-none",
              {
                "bg-gray-100 text-gray-900 font-semibold": label === selected,
                "px-1 sm:px-2 text-xs h-3 sm:h-6": size === "sm",
                "px-2 h-4 sm:px-4 text-sm sm:h-8": size === "md",
                "px-3 sm:px-4 h-6 sm:h-10": size === "lg",
              },
            )}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}
