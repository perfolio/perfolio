import React from "react"
import cn from "classnames"
export type ToggleGroupProps = {
  size?: "sm" | "md" | "lg"
  options: string[]
  selected: string
  setSelected: (value: string) => void
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  size = "md",
  options,
  selected,
  setSelected,
}): JSX.Element => {
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
                "px-2 text-xs h-6": size === "sm",
                "px-4 text-sm h-8": size === "md",
                "px-4 h-10": size === "lg",
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
