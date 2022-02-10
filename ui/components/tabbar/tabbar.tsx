import classNames from "classnames"
import React from "react"

export type Tabs = { name: string; href: string; icon?: JSX.Element; current: boolean }[]

export interface TabBarProps {
  tabs: Tabs
}

export const TabBar: React.FC<TabBarProps> = ({ tabs }): JSX.Element => {
  return (
    <div className="block">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm",
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.icon == undefined ? null : (
                <div
                  className={classNames(
                    tab.current ? "text-primary" : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5",
                  )}
                  aria-hidden="true"
                >
                  {tab.icon}
                </div>
              )}

              <span>{tab.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default TabBar
