import React, { useState } from "react"
import { Logo, Button } from "app/core/components"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { Link as NextLink } from "blitz"
export interface NavbarProps {
  links?: { label: string; href: string }[]
}

export const Navbar: React.FC<NavbarProps> = ({
  links = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
  ],
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="w-screen px-8">
      <div className="relative flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-sm hover:text-white bg-gradient-to-tr hover:from-orange-700 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="block w-6 h-6" />
            <XIcon className="hidden w-6 h-6" />
          </button>
        </div>

        <NextLink href="/">
          <a>
            <Logo withName />
          </a>
        </NextLink>

        {/* Desktop */}
        <div className="items-center justify-center hidden w-full h-full py-5 -ml-0 space-x-12 text-base md:flex md:-ml-5 md:py-0 md:absolute">
          {links.map((link) => {
            return (
              <NextLink href={link.href} key={link.label}>
                <a className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                  {link.label}
                </a>
              </NextLink>
            )
          })}
        </div>

        <div className="relative items-center hidden space-x-3 md:inline-flex md:ml-5 lg:justify-end">
          <Button href="/auth/signin" label="Sign in" kind="plain" />

          <Button label="Start for free" kind="primary" href="/auth/signup" />
        </div>
      </div>
      {/* Mobile */}
      {mobileOpen ? (
        <div className="sm:hidden">
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => {
              return (
                <NextLink href={link.href} key={link.label}>
                  <a className="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900">
                    {link.label}
                  </a>
                </NextLink>
              )
            })}
          </div>
        </div>
      ) : null}
    </nav>
  )
}
