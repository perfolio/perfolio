import React, { useState } from "react"
import { MobileNavLink } from "./mobileNavLink"
import { MobileNavMenu } from "./mobileNavMenu"
import { NavbarProps } from "./types"
import { DotsVerticalIcon, XIcon, LogoutIcon } from "@heroicons/react/outline"
import { Link, Logo, Icon, Drawer } from "@perfolio/ui/components"
import NextLink from "next/link"
import { AdjustmentsIcon } from "@heroicons/react/solid"
import { useAuth0 } from "@auth0/auth0-react"

import { useI18n } from "@perfolio/pkg/i18n"

export const MobileNavbar: React.FC<NavbarProps> = ({ items }): JSX.Element => {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const { logout } = useAuth0()
  return (
    <nav className="flex items-center justify-between w-full">
      <NextLink href="/dashboard">
        <a className="text-gray-200 hover:text-gray-50">
          <Logo />
        </a>
      </NextLink>
      <div>
        <button className="w-6 h-6 cursor-pointer text-gray-50" onClick={() => setOpen(!open)}>
          {open ? <XIcon /> : <DotsVerticalIcon />}
        </button>
        <Drawer open={open} setOpen={setOpen}>
          <ul className="py-1 transition duration-500 ease-out shadow opacity-100 ">
            {items.map((item) => (
              <li key={item.label}>
                {item.menu ? (
                  <MobileNavMenu label={item.label} icon={item.icon} menu={item.menu} />
                ) : (
                  <MobileNavLink href={item.href ?? "/"} label={item.label} icon={item.icon} />
                )}
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center h-20 space-x-8 text-gray-700 border-t border-gray-300">
            {/* <li>
              <Link size="lg" prefix={<BellIcon />} href="/" />
            </li> */}
            <li>
              <Link size="lg" prefix={<AdjustmentsIcon />} href="/settings/account" />
            </li>
            <li>
              <Link size="lg" prefix={<DotsVerticalIcon />} href="/" />
            </li>
            <li>
              <button
                className="focus:outline-none"
                onClick={() => logout({ returnTo: "https://perfol.io" })}
              >
                <Icon size="sm" label={t("mobiNavBarSignOut")}>
                  <LogoutIcon />
                </Icon>
              </button>
            </li>
          </ul>
        </Drawer>
      </div>
    </nav>
  )
}
