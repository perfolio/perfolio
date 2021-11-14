import React from "react"

// eslint-disable-next-line
export interface DrawerFooterProps {}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children }): JSX.Element => {
  return (
    <div className="absolute inset-x-0 bottom-0 px-2 border-t border-gray-300 bg-gray-50">
      {children}
    </div>
  )
}
