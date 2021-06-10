import React from "react"
import { Header } from "../../header/header"
// import { Profile } from "../profile/profile"

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
      <div className="h-60">
         <Header />
      </div>
      <div className="px-4 xl:px-0 dark:bg-gray-800">
        <div className="container mx-auto ">
          <div className="xl:flex">
            <div className="-mt-8 xl:w-3/4 2xl:w-4/5 xl:-mt-28">
              <div className="p-4 bg-gray-100 rounded-t shadow dark:text-gray-50 dark:bg-gray-700 md:p-6">
                <p className="text-base font-bold leading-normal text-gray-800 dark:text-gray-100 sm:text-lg md:text-xl lg:text-2xl">
                  {title}
                </p>
              </div>
              <div className="p-4 bg-white divide-y divide-gray-300 shadow-lg dark:divide-gray-700 md:p-8 xl:p-10 dark:bg-gray-900">
                {children}
              </div>
            </div>
            <div className="ml-6 xl:w-1/4 2xl:w-1/5">
              <div className="w-full mb-8 -mt-8 xl:-mt-28 xl:mb-28">
                {/* <Profile /> */}
              </div>
              {sidebar}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
