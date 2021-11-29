import React from "react"

export interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return <div className="px-3 py-2 whitespace-no-wrap min-w-0">{children}</div>
}
