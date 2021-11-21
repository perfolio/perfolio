import React from "react"

export interface DotsProps {
  current: number
  max: number
}

export const Dots: React.FC<DotsProps> = ({ current, max }): JSX.Element => {
  const tmp = []
  for (let i = 0; i < max; i++) {
    tmp.push(i)
  }

  return (
    <div className="flex items-center space-x-2">
      {tmp.map((i) => (
        <span
          key={i}
          className={` rounded-full ${
            i < current
              ? "bg-primary00 w-2 h-2"
              : i === current
              ? "bg-primary border-4 w-4 h-4 border-primary-light"
              : "w-2 h-2 bg-gray-300"
          }`}
        >
        </span>
      ))}
    </div>
  )
}
