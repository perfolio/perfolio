import React from "react"
import { Header } from "../header/header"
import cn from "classnames"
export interface AppLayoutProps {
  sidebar?: React.ReactNode | React.ReactNodeArray
  side?: "left" | "right"
}

/**
 * / page.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  sidebar,
  children,
  side = "right",
}): JSX.Element => {
  return (
    <>
      <div className="h-60">
        <Header />
      </div>
      <div className="container mx-auto">
        <div className={`xl:flex space-x-8 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
          <main
            className={cn("w-full -mt-8  xl:-mt-28 ", {
              "xl:w-3/4 2xl:w-4/5": sidebar,
            })}
          >
            {children}
          </main>
          {sidebar ? <div className="xl:w-1/4 2xl:w-1/5 ">{sidebar}</div> : null}
        </div>
      </div>
    </>
  )
}
