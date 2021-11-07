import React from "react"

// eslint-disable-next-line
export interface RootProps {}

export const Root: React.FC<RootProps> = ({ children }): JSX.Element => {
  return <div className="w-full space-y-8 bg-white border border-gray-300 rounded">{children}</div>
}
