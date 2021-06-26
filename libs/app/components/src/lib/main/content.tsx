import React from "react"

// eslint-disable-next-line
export interface MainContentProps {}

export const MainContent: React.FC<MainContentProps> = ({ children }): JSX.Element => {
  return <div className="p-4 md:p-6">{children}</div>
}
