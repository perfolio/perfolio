import React from "react"

// eslint-disable-next-line
export interface MainContentProps {}

export const MainContent: React.FC<MainContentProps> = ({ children }): JSX.Element => {
  return <div className="sm:p-4 rounded-b md:p-6">{children}</div>
}
