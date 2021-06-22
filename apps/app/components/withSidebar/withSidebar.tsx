import React from "react"
import { Header } from "../header/header"
export interface WithSidebarProps {
  sidebar?: React.ReactNode | React.ReactNodeArray
  side?: "left" | "right"
}

/**
 * / page.
 */
export const WithSidebar: React.FC<WithSidebarProps> = ({
  sidebar,
  children,
  side = "right",
}): JSX.Element => {
  return (
    <>
      <div className="h-60">
        <Header />
      </div>
      <div className="px-4 xl:px-0 dark:bg-gray-800">
        <div className="container mx-auto ">
          <div className={`xl:flex space-x-8 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
            <main className="-mt-8 xl:w-3/4 2xl:w-4/5 xl:-mt-28">{children}</main>
            <div className="mt-4 xl:w-1/4 2xl:w-1/5 ">{sidebar}</div>
          </div>
        </div>
      </div>
    </>
  )
}
