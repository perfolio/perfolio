import React from "react"

export const CardFooterActions: React.FC = ({ children }): JSX.Element => {
  return <div className="flex items-center justify-between space-x-2">{children}</div>
}
