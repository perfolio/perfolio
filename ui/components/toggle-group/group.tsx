import cn from "classnames"
export type ToggleGroupProps<T extends string> = {
  size?: "sm" | "md" | "lg"
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
              "px-1 sm:px-2 text-xs h-3 sm:h-6": size === "sm",
              "px-1 h-4 sm:px-4 text-sm sm:h-8": size === "md",
              "px-2 sm:px-4 h-6 sm:h-10": size === "lg",
            },
          )}
        >
          {option.display}
        </button>
      ))}
    </div>
  )
}
