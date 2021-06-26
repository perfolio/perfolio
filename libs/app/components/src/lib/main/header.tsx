import React from "react"

// eslint-disable-next-line
export interface MainHeaderProps {}

export const MainHeader: React.FC<MainHeaderProps> = ({ children }): JSX.Element => {
  return <div className="flex items-center justify-between p-4 bg-gray-100 md:p-6">{children}</div>
}
