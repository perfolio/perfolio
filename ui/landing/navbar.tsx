import { useAuth0 } from "@auth0/auth0-react"
import { Transition } from "@headlessui/react"
import { Button, Logo } from "@perfolio/ui/components"
import NextLink from "next/link"
import React, { useEffect, useState } from "react"

export const Navbar: React.FC = () => {
  const { user } = useAuth0()
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    setScrolled(window.scrollY > 450)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className="w-screen px-8">
      <div className="relative flex flex-row flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <NextLink href="/">
          <a>
            <Logo withName />
          </a>
        </NextLink>

        {/* Desktop */}
        <div className="relative items-center hidden space-x-3 md:inline-flex md:ml-5 lg:justify-end">
          {user
            ? (
              <Button href="/dashboard" type="primary" size="lg">
                Go to dashboard
              </Button>
            )
            : (
              <>
                <Button href="/dashboard" type="plain">
                  Sign In
                </Button>
                <Button type="cta" href="/dashboard">
                  Start for free
                </Button>
              </>
            )}
        </div>
        {/* Mobile */}
        <Transition
          className="sm:hidden"
          show={scrolled}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="-translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="-translate-y-full opacity-0"
        >
          {user
            ? (
              <Button href="/dashboard" type="primary" size="lg">
                Go to dashboard
              </Button>
            )
            : (
              <Button type="cta" href="/dashboard">
                Sign in
              </Button>
            )}
        </Transition>
      </div>
    </nav>
  )
}
