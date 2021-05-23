import React from "react"
import { NavbarProps } from "./types"
import { DesktopNavMenu } from "./desktopNavMenu"
import { DesktopNavLink } from "./desktopNavLink"
import { ThemeSwitch } from "../switch/themeSwitch"
import { Logo } from "../logo/logo"
import {
  BellIcon,
  AdjustmentsIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline"

export const DesktopNavbar: React.FC<NavbarProps> = ({
  items,
}): JSX.Element => {
  return (
    <nav className="w-full">
      <ul className="flex items-center justify-between w-full">
        <li className="flex items-center w-4/5">
          <Logo
            withName
            imageColor="text-primary-darker dark:text-secondary-light"
            textColor="text-black dark:text-gray-lighter"
          />
          <div className="2xl:ml-14">
            <ul className="flex items-center">
              {items.map((item) => (
                <li key={item.label}>
                  {item.menu ? (
                    <DesktopNavMenu
                      label={item.label}
                      icon={item.icon}
                      menu={item.menu}
                    />
                  ) : (
                    <DesktopNavLink
                      href={item.href!}
                      label={item.label}
                      icon={item.icon}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="flex justify-end w-1/5">
          <ul className="flex items-center">
            <li>
              <div className="relative pb-1 cursor-pointer ">
                <BellIcon className="w-6 h-6 text-white" />
                <div className="w-4 h-4 rounded-full  bg-gray-800 flex items-center justify-center absolute top-0 right-0 -mr-1.5 -mt-0.5">
                  <p className="text-xs font-bold text-center text-gray-50">
                    1
                  </p>
                </div>
              </div>
            </li>
            <li>
              <a href="#">
                <div className="pb-1 xl:ml-6 2xl:ml-9 ">
                  <AdjustmentsIcon className="w-6 h-6 text-white" />
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="pb-1 xl:ml-6 2xl:ml-9 ">
                  <DotsVerticalIcon className="w-6 h-6 text-white" />
                </div>
              </a>
            </li>
            <li>
              <div className="pb-1 xl:ml-6 2xl:ml-9 ">
                <ThemeSwitch />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
