import { useAuth0 } from "@auth0/auth0-react"
import { Disclosure, Transition } from "@headlessui/react"
import { DotsVerticalIcon, LogoutIcon, XIcon } from "@heroicons/react/outline"
import { ChevronUpIcon } from "@heroicons/react/outline"
import { AdjustmentsIcon } from "@heroicons/react/solid"
import { Button, Drawer, Logo } from "@perfolio/ui/components"
import { ButtonStyle } from "@perfolio/ui/components"
import cn from "classnames"
import NextLink from "next/link"
import React, { useState } from "react"
import { NavbarProps } from "./types"

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
        <Button
          size="sm"
          type="plaininverted"
          icon={open ? <XIcon /> : <DotsVerticalIcon />}
          onClick={() => setOpen(!open)}
        />
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
                            <ButtonStyle
                              justify="start"
                              type="plain"
                              size="block"
                              iconLeft={item.icon}
                            >
                              {item.label}
                            </ButtonStyle>
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
                                  justify="start"
                                  href={subitem.href}
                                  key={subitem.name}
                                  type="plain"
                                  size="block"
                                  iconLeft={subitem.icon}
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
                      justify="start"
                      type="plain"
                      href={item.href ?? "/"}
                      iconLeft={item.icon}
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
                <Button type="plain" iconLeft={<AdjustmentsIcon />} href="/settings/account">
                  Settings
                </Button>
              </li>
              <li>
                <Button
                  type="plain"
                  onClick={() => logout({ returnTo: "https://perfol.io" })}
                  iconLeft={<LogoutIcon />}
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
