import React from "react"
import Wrapper from "../wrapper/wrapper"

/* eslint-disable-next-line */
export interface IconProps {
  icon: React.ReactNode
  color?: string
  label?: React.ReactNode
  content?: React.ReactNode
  align?: string
}
/**
 *
 * Set label to emtpy string ("") to display it in a loading state.
 */
export const Icon = ({
  icon,
  color,
  label,
  content,
  align,
}: IconProps): JSX.Element => {
  align = align ?? "justify-center"
  const colors = color ? `text-${color}-800 bg-${color}-200` : ""

  return (
    <Wrapper>
      <div className={`flex items-center ${align}`}>
        <div className="flex-shrink-0 w-10 h-10">
          <div className={`${colors} flex items-center justify-center h-full`}>
            <span>{icon}</span>
          </div>
        </div>
        <div className="flex flex-col items-start pl-2">
          {typeof label !== "undefined" ? (
            label === "" ? (
              <span className="w-16 h-4 bg-gray-300 rounded animate-pulse"></span>
            ) : (
              <span className="text-sm text-gray-900">{label}</span>
            )
          ) : null}
          {content ? (
            <span className="text-xs text-gray-700 whitespace-nowrap">
              {content}
            </span>
          ) : null}
        </div>
      </div>
    </Wrapper>
  )
}

export default Icon
