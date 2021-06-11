import React from "react"

/* eslint-disable-next-line */
export interface HeaderProps {
  labels: string[]
}

export const Header: React.FC<HeaderProps> = ({ labels }): JSX.Element => {
  return (
    <thead>
      <tr>
        {labels && labels.length > 0
          ? labels.map((label, i) => (
              <th
                key={i}
                className={`
                ${i === 0 ? "text-left" : "text-right"}
                px-6 py-4 text-xs font-medium leading-4 tracking-wider text-gray-700 uppercase bg-gray-50`}
              >
                {label}
              </th>
            ))
          : [0, 1, 2, 3, 4].map((_, i) => (
              <th key={i}>
                <span className="inline-flex w-full h-2 max-w-xs rounded-full md:h-3 bg-gradient-to-t from-gray-50 to-gray-300"></span>
              </th>
            ))}
      </tr>
    </thead>
  )
}

export default Header
