import React from "react"
import { Header } from "../header/header"

export interface WithSidebarProps {
  title: string
  sidebar?: React.ReactNode | React.ReactNodeArray
}

/**
 * / page.
 */
export const WithSidebar: React.FC<WithSidebarProps> = ({
  sidebar,
  title,
  children,
}): JSX.Element => {
  return (
    <>
      <Header />
      <div className="px-4 xl:px-0 dark:bg-gray-800">
        <div className="container mx-auto ">
          <div className="xl:flex">
            <div className="-mt-8 xl:w-3/4 2xl:w-4/5 xl:-mt-56">
              <div className="p-4 bg-gray-100 rounded-t shadow dark:text-gray-50 dark:bg-gray-700 md:p-6">
                <p className="text-base font-bold leading-normal text-gray-800 dark:text-gray-100 sm:text-lg md:text-xl lg:text-2xl">
                  {title}
                </p>
              </div>
              <div className="p-4 bg-white divide-y divide-gray-300 shadow-lg dark:divide-gray-700 md:p-8 xl:p-10 dark:bg-gray-900">
                {children}
              </div>
            </div>
            <div className="flex flex-col w-full pl-4 pr-4 xl:w-1/4 2xl:w-1/5 pt-7 xl:pl-8 pb-7 lg:flex-col md:flex-row xl:pr-0">
              {sidebar}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
