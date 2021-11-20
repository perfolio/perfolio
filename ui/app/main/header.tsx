import React from "react"

// eslint-disable-next-line
export interface MainHeaderProps {}

export const MainHeader: React.FC<MainHeaderProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex justify-between px-4 pt-4 overflow-hidden rounded-t md:px-6 md:pt-6">
      {children}
    </div>
  )
}
