import React from "react"

export interface MainCardProps {
  title: string
}

export const MainCard: React.FC<MainCardProps> = ({ title, children }): JSX.Element => {
  return (
    <div className="">
      <div className="p-4 bg-gray-100 rounded-t shadow dark:text-gray-50 dark:bg-gray-700 md:p-6">
        <p className="text-base font-bold leading-normal text-gray-800 dark:text-gray-100 sm:text-lg md:text-xl lg:text-2xl">
          {title}
        </p>
      </div>
      <div className="p-4 bg-white divide-y divide-gray-300 shadow-lg dark:divide-gray-700 md:p-8 xl:p-10 dark:bg-gray-900">
        {children}
      </div>
    </div>
  )
}
