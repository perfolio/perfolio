import React from "react"

export interface CardProps {
  title: string
  footer: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, children, footer }): JSX.Element => {
  return (
    <div className="bg-white rounded-sm shadow-lg">
      <div className="p-6">
        <div className="dark:text-gray-50 dark:bg-gray-700">
          <p className="text-base font-bold leading-normal text-gray-800 sm:text-lg md:text-xl">
            {title}
          </p>
        </div>

        <div className="mt-2 divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900">
          {children}
        </div>
      </div>
      <footer className="flex items-center justify-between w-full px-6 py-4 border-t bg-gray-50">
        {footer}
      </footer>
    </div>
  )
}
