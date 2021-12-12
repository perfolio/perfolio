import { Transition } from "@headlessui/react"
import { AdjustmentsIcon, LogoutIcon } from "@heroicons/react/outline"
import { magic } from "@perfolio/pkg/auth"
import { Icon, Loading, Logo } from "@perfolio/ui/components"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useIsFetching } from "react-query"
import { DesktopNavLink } from "./desktopNavLink"
import { DesktopNavMenu } from "./desktopNavMenu"
import { NavbarProps } from "./types"

export const DesktopNavbar: React.FC<NavbarProps> = ({ items }): JSX.Element => {
  const isFetching = useIsFetching()
  const router = useRouter()
  return (
    <nav className="w-full">
      <ul className="flex items-center justify-between w-full">
        <li className="flex items-center w-4/5 space-x-12">
          <Link href="/dashboard">
            <a className="text-gray-200 hover:text-gray-50">
              <Logo withName />
            </a>
          </Link>
          <div className="2xl:ml-14">
            <ul className="flex items-center">
              {items.map((item, i) => (
                <li key={i}>
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
            <li className="text-gray-200 hover:text-gray-50">
              <Icon size="sm" label="Fetching data">
                <Transition
                  show={isFetching > 0}
                  enter="transition ease-in-out duration-1000"
                  enterFrom=" opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in-out duration-1000"
                  leaveFrom="opacity-100"
                  leaveTo=" opacity-0"
                >
                  <Loading />
                </Transition>
              </Icon>
            </li>
            <li className="text-gray-200 hover:text-gray-50">
              <Link href="/settings/account">
                <a>
                  <Icon size="sm" label="Settings">
                    <AdjustmentsIcon />
                  </Icon>
                </a>
              </Link>
            </li>

            <li className="text-gray-200 hover:text-gray-50">
              <button
                className="focus:outline-none"
                onClick={async () => {
                  await magic().user.logout()
                  router.push("/")
                }}
              >
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
