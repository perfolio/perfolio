import cn from "classnames"
import React from "react"
import { Header } from "../header/header"
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
      <div className="h-20 md:h-42 lg:h-56 ">
        <Header />
      </div>
      <div className="px-4 lg:mx-8 xl:mx-16 pb-16">
        <div className={`xl:flex gap-6 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
          <main
            className={cn("w-full  lg:-mt-28 ", {
              "xl:w-3/4 2xl:w-4/5": sidebar,
            })}
          >
            {children}
          </main>
          {sidebar ? <div className="w-full xl:w-1/4 2xl:w-1/5 ">{sidebar}</div> : null}
        </div>
      </div>
    </>
  )
}
