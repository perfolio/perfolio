import React from "react"

// eslint-disable-next-line
export interface CardContentProps {}

export const CardContent: React.FC<CardContentProps> = ({ children }): JSX.Element => {
  return <div className="w-full px-8">{children}</div>
}
