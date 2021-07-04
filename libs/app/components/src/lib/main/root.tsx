import React from "react"

// eslint-disable-next-line
export interface RootProps {}

export const Root: React.FC<RootProps> = ({ children }): JSX.Element => {
  return <div className="bg-white rounded lg:shadow-xl">{children}</div>
}
