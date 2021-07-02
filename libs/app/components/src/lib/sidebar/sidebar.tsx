import React from "react"
export interface SidebarProps {
  aboveFold?: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ aboveFold, children }): JSX.Element => {
  return (
    <aside className="relative">
      <div className="absolute w-full -mt-10 xl:-mt-36 ">{aboveFold}</div>
      <div className="mt-4">
        <div className="flex flex-col divide-y">{children}</div>
      </div>
    </aside>
  )
}
