import React, { useState } from "react"
import { MobileNavLink } from "./mobileNavLink"
import { MobileNavMenu } from "./mobileNavMenu"
import { NavbarProps } from "./types"
import { BellIcon, DotsVerticalIcon, XIcon } from "@heroicons/react/outline"
import { Logo } from "../logo/logo"
import { Transition } from "@headlessui/react"
import { Link } from "../clickable"
import { AdjustmentsIcon } from "@heroicons/react/solid"
import { ThemeSwitch } from "../switch/themeSwitch"
export const MobileNavbar: React.FC<NavbarProps> = ({ items }): JSX.Element => {
  const [open, setOpen] = useState(false)
  return (
    <nav className="flex items-center justify-between w-full">
      <div>
        <Logo imageColor="text-primary-50" />
      </div>
      <div>
        <button className="w-6 h-6 cursor-pointer text-gray-50" onClick={() => setOpen(!open)}>
          {open ? <XIcon /> : <DotsVerticalIcon />}
        </button>
        <Transition
          className="absolute top-0 left-0 z-20 w-full mt-20 bg-white rounded shadow-xl"
          show={open}
          enter="transition duration-500 ease-out"
          enterFrom="transform opacity-0 translate-y-full"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition duration-300 ease-out"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform  opacity-0 translate-y-full"
        >
          <ul className="py-1 transition duration-300 ease-out shadow opacity-100 ">
            {items.map((item) => (
              <li key={item.label}>
                {item.menu ? (
                  <MobileNavMenu label={item.label} icon={item.icon} menu={item.menu} />
                ) : (
                  <MobileNavLink href={item.href!} label={item.label} icon={item.icon} />
                )}
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center h-20 space-x-8 text-gray-700 border-t border-gray-300">
            <li>
              <Link size="large" prefix={<BellIcon />} href="/" />
            </li>
            <li>
              <Link size="large" prefix={<AdjustmentsIcon />} href="/" />
            </li>
            <li>
              <Link size="large" prefix={<DotsVerticalIcon />} href="/" />
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
        </Transition>
      </div>
    </nav>
  )
}
