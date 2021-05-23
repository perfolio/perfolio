import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import Link from "next/link"
import cn from "classnames"
import React, { Fragment } from "react"
import { MenuProps } from "./types"
export const DesktopNavMenu: React.FC<MenuProps> = ({
  label,
  icon,
  menu,
}): JSX.Element => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              "inline-flex items-center px-3 py-2 space-x-2 text-base font-medium text-white group text-opacity-90 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
              { "text-opacity-100": open },
            )}
          >
            <div className="w-5 h-5">{icon}</div>
            <span>{label}</span>

            <ChevronDownIcon
              className="w-5 h-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
              aria-hidden="true"
            />
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
            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-md">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative gap-8 bg-white p-7">
                  {menu.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-primary-dark dark:text-secondary-dark sm:h-12 sm:w-12">
                          {item.icon}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
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
      )}
    </Popover>
  )
}
