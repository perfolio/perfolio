import React from "react"

// eslint-disable-next-line
export interface MainHeaderProps {}

export const MainHeader: React.FC<MainHeaderProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex justify-between p-4 overflow-hidden rounded-t lg:bg-gray-100 md:p-6">
      {children}
    </div>
  )
}
