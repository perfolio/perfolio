import React from "react"

// eslint-disable-next-line
export interface DrawerContentProps {}

export const DrawerContent: React.FC<DrawerContentProps> = ({ children }): JSX.Element => {
  return <div className="w-full px-2">{children}</div>
}
