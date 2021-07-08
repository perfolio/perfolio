import React from "react"
import { NavbarProps } from "./types"
import { DesktopNavMenu } from "./desktopNavMenu"
import { DesktopNavLink } from "./desktopNavLink"
import { Icon, Logo } from "@perfolio/ui/components"
import { signOut } from "next-auth/client"
import { AdjustmentsIcon, LogoutIcon } from "@heroicons/react/outline"
import Link from "next/link"

export const DesktopNavbar: React.FC<NavbarProps> = ({ items }): JSX.Element => {
  return (
    <nav className="w-full">
      <ul className="flex items-center justify-between w-full">
        <li className="flex items-center w-4/5 space-x-12">
          <Link href="/">
            <a className="text-gray-200 hover:text-gray-50">
              <Logo withName />
            </a>
          </Link>
          <div className="2xl:ml-14">
            <ul className="flex items-center">
              {items.map((item) => (
                <li key={item.label}>
                  {item.menu ? (
                    <DesktopNavMenu label={item.label} icon={item.icon} menu={item.menu} />
                  ) : (
                    <DesktopNavLink href={item.href ?? ""} label={item.label} icon={item.icon} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="flex justify-end w-1/5">
          <ul className="flex items-center space-x-6 xl:space-x-9">
            {/* <li>
              <ThemeSwitch />
            </li> */}
            {/* <li className="text-gray-200 hover:text-gray-50">
              <div className="relative pb-1 cursor-pointer ">
                <BellIcon className="w-6 h-6" />
                <div className="w-4 h-4 rounded-full  bg-gray-800 flex items-center justify-center absolute top-0 right-0 -mr-1.5 -mt-0.5">
                  <p className="text-xs font-bold text-center text-gray-50">1</p>
                </div>
              </div>
            </li> */}
            <li className="text-gray-200 hover:text-gray-50">
              <a href="/settings/account">
                <Icon size="sm" label="Settings">
                  <AdjustmentsIcon />
                </Icon>
              </a>
            </li>

            <li className="text-gray-200 hover:text-gray-50">
              <button onClick={() => signOut()} className="focus:outline-none">
                <Icon size="sm" label="Sign out">
                  <LogoutIcon />
                </Icon>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
