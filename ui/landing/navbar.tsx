import { useAuth0 } from "@auth0/auth0-react"
import { Popover, Transition } from "@headlessui/react"
import { AdjustmentsIcon, SparklesIcon, SunIcon, VariableIcon } from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { Button, ButtonStyle, Logo } from "@perfolio/ui/components"
import cn from "classnames"
import Link from "next/link"
import React, { Fragment, useEffect, useState } from "react"
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

  const sellingPoints = [
    {
      name: "Simple Portfolio Analytics",
      description:
        "Simple portfolio analytics tool you can use to optimize your portfolio's risk return",
      href: "/insights-for-everyone#simple-metrics",
      icon: AdjustmentsIcon,
    },
    {
      name: "Intuitive yet powerful",
      description: "More than just your ordinary stock portfolio",
      href: "/insights-for-everyone#intuitive-powerful",
      icon: SparklesIcon,
    },
    {
      name: "Sustainability Insights",
      description: "No longer need to panic when looking at sustainability ratings",
      href: "/insights-for-everyone#sustainability-insights",
      icon: SunIcon,
    },
    {
      name: "Why metrics?",
      description:
        "Sophisticated metrics to make profound investment decisions. For single stocks and your entire portfolio",
      href: "/insights-for-everyone#why-metrics",
      icon: VariableIcon,
    },
  ]

  return (
    <nav className="w-screen px-8">
      <div className="relative flex flex-row flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <Link href="/">
          <a>
            <Logo withName />
          </a>
        </Link>

        {/* Desktop */}
        <div className="relative items-center hidden space-x-3 sm:inline-flex sm:ml-5 lg:justify-end">
          <Popover.Group as="nav" className="hidden space-x-10 sm:flex">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button>
                    <ButtonStyle
                      type="plain"
                      iconRight={
                        <ChevronDownIcon
                          className={cn(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-2 h-5 w-5 group-hover:text-gray-500",
                          )}
                          aria-hidden="true"
                        />
                      }
                    >
                      Why Perfolio
                    </ButtonStyle>
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
                    <Popover.Panel className="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="overflow-hidden rounded shadow-lg">
                        <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                          {sellingPoints.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <a className="flex items-start p-3 -m-3 rounded hover:bg-gray-50">
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-primary"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                        <div className="px-5 py-5 space-y-6 bg-gray-50 sm:flex sm:flex-row-reverse sm:space-y-0 sm:space-x-10 sm:px-8">
                          <Link href="/insights-for-everyone">
                            <a className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 rounded hover:bg-gray-100">
                              Learn more
                            </a>
                          </Link>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
          {user ? (
            <Button href="/dashboard" type="primary" size="lg">
              Go to dashboard
            </Button>
          ) : (
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
          {user ? (
            <Button href="/dashboard" type="primary" size="lg">
              Go to dashboard
            </Button>
          ) : (
            <Button type="cta" href="/dashboard">
              Sign in
            </Button>
          )}
        </Transition>
      </div>
    </nav>
  )
}
