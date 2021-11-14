import React, { useState } from "react"
import { NavbarProps } from "./types"
import { DotsVerticalIcon, XIcon, LogoutIcon } from "@heroicons/react/outline"
import { Button, Logo, Drawer } from "@perfolio/ui/components"
import NextLink from "next/link"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/outline"
import cn from "classnames"
import { DefaultButtonStyle } from "@perfolio/ui/components/clickable/defaultButtonStyle"
import { AdjustmentsIcon } from "@heroicons/react/solid"
import { useAuth0 } from "@auth0/auth0-react"

export const MobileNavbar: React.FC<NavbarProps> = ({ items }): JSX.Element => {
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
          <Drawer.Content>
            <ul className="px-6 space-y-4">
              {items.map((item) => (
                <li key={item.label} className="h-8">
                  {item.menu ? (
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex items-center justify-between w-full focus:outline-none">
                            <DefaultButtonStyle
                              justify="justify-start"
                              kind="plain"
                              size="lg"
                              prefix={item.icon}
                            >
                              {item.label}
                            </DefaultButtonStyle>
                            <ChevronUpIcon
                              className={cn("w-5 h-5 transform duration-500", {
                                "-rotate-180": open,
                              })}
                            />
                          </Disclosure.Button>
                          <Transition
                            enter="transition duration-500 ease-out"
                            enterFrom="transform opacity-0"
                            enterTo="transform opacity-100"
                            leave="transition duration-500 ease-out"
                            leaveFrom="transform opacity-100"
                            leaveTo="transform opacity-0"
                          >
                            <Disclosure.Panel className="ml-4">
                              {item.menu!.map((subitem) => (
                                <Button
                                  justify="justify-start"
                                  href={subitem.href}
                                  key={subitem.name}
                                  kind="plain"
                                  size="lg"
                                  prefix={subitem.icon}
                                >
                                  {subitem.name}
                                </Button>
                              ))}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Button
                      justify="justify-start"
                      kind="plain"
                      href={item.href ?? "/"}
                      prefix={item.icon}
                      size="lg"
                    >
                      {item.label}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </Drawer.Content>
          <Drawer.Footer>
            <ul className="flex items-center justify-center h-20 gap-4">
              <li>
                <Button kind="plain" prefix={<AdjustmentsIcon />} href="/settings/account">
                  Settings
                </Button>
              </li>
              <li>
                <Button
                  kind="plain"
                  onClick={() => logout({ returnTo: "https://perfol.io" })}
                  prefix={<LogoutIcon />}
                >
                  Sign out
                </Button>
              </li>
            </ul>
          </Drawer.Footer>
        </Drawer>
      </div>
    </nav>
  )
}
