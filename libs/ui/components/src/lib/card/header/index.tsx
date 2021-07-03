import React from "react"

// eslint-disable-next-line
export interface CardHeaderProps {}

export const CardHeader: React.FC<CardHeaderProps> = ({ children }): JSX.Element => {
  return <div className="flex items-center justify-between px-4 pt-4">{children}</div>
}