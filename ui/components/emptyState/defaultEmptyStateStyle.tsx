import React from "react"

export interface DefaultEmptyStateStyleProps {
  icon?: React.ReactNode
}

export const DefaultEmptyStateStyle: React.FC<DefaultEmptyStateStyleProps> = ({
  children,
  icon,
}): JSX.Element => {
  return (
    <div className="relative block w-full p-12 text-center border border-gray-300 border-dashed rounded hover:border-gray-400 focus:outline-none">
      {icon ? <div className="w-12 h-12 max-w-sm mx-auto text-gray-400">{icon}</div> : null}
      <span className="block mt-2 text-sm font-medium text-gray-900">{children}</span>
    </div>
  )
}
