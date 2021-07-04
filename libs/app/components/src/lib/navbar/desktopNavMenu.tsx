import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { NavLink } from "./navLink"
import React, { Fragment } from "react"
import { MenuProps } from "./types"
export const DesktopNavMenu: React.FC<MenuProps> = ({ label, icon, menu }): JSX.Element => {
  return (
    <Popover className="relative">
      <>
        <Popover.Button>
          <NavLink prefix={icon} label={label} postfix={<ChevronDownIcon />} />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-20 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-md">
            <div className="overflow-hidden rounded shadow-xl dark:shadow-none dark:border dark:border-gray-700">
              <div className="relative p-4 space-y-8 bg-gray-100 dark:bg-gray-900 ">
                {menu.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a className="flex items-center p-2 space-x-4 transition duration-150 ease-in-out rounded hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 hover:bg-gray-300est">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 p-2 text-white rounded roundedsm:h-12 sm:w-12 sm:h-12 bg-gradient-to-tr from-primary-900 to-primary-700 dark:from-error-700 dark:to-secondary-700">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  )
}
