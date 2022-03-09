import { Size } from "@perfolio/ui/types/size"
import cn from "classnames"

export type ToggleGroupProps<T extends string> = {
  size?: Size
  options: { display: string; id: T }[]
  selected: T
  setSelected: (value: T) => void
  block?: boolean
}

export function ToggleGroup<T extends string>({
  size = "md",
  options,
  selected,
  setSelected,
  block,
}: ToggleGroupProps<T>): JSX.Element {
  return (
    <div
      className={cn("relative flex self-center p-0.5 bg-gray-100 rounded", {
        "w-full": block,
      })}
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelected(option.id)}
          type="button"
          className={cn(
            "rounded shadow-sm whitespace-nowrap focus:outline-none font-medium w-full hover:bg-gray-50 duration-200",
            {
              "bg-white text-gray-900": selected === option.id,
              "text-gray-500": selected !== option.id,
              "px-2 text-xs h-4 sm:h-6 ": size === "xs",
              "px-2 text-sm h-4 sm:h-6 ": size === "sm",
              "px-2 h-8 sm:px-4 text-base sm:h-10": size === "md",
              "px-2 sm:px-4 text-lg h-10 sm:h-12": size === "lg",
              "px-4 h-14 sm:px-6 text-xl sm:h-16": size === "xl",
              "px-4 sm:px-6 h-16 text-2xl sm:h-20": size === "2xl",
            },
          )}
        >
          {option.display}
        </button>
      ))}
    </div>
  )
}
