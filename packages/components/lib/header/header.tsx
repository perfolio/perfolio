import React from "react"
import { BookOpenIcon } from "@heroicons/react/outline"
import { DesktopNavbar, MobileNavbar } from "../navbar"
import { HomeIcon } from "@heroicons/react/outline"
import { PlusIcon } from "@heroicons/react/solid"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const menu = {
  items: [
    {
      label: "Dashboard",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      label: "Transactions",
      icon: <BookOpenIcon />,
      menu: [
        {
          name: "My Transactions",
          href: "/transactions",
          icon: <BookOpenIcon />,
          description: "See your existing transactions",
        },
        {
          name: "Add manually",
          href: "/transactions/create",
          icon: <PlusIcon />,
          description: "See your existing transactions",
        },
      ],
    },
  ],
}

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  return (
    <div>
      {/* header starts here */}
      <div className="pt-6 md:pt-8 xl:pt-12 bg-gradient-to-tr from-primary-darker to-primary-dark dark:from-black dark:to-secondary-dark">
        <div className="container px-4 mx-auto xl:px-0">
          <div className="hidden xl:flex">
            <DesktopNavbar items={menu.items} />
          </div>
          <div className="xl:hidden">
            <MobileNavbar items={menu.items} />
          </div>

          <div className="flex-wrap items-center xl:flex">
            <div className="xl:w-3/4 2xl:w-4/5"></div>
            <div className="flex flex-col items-center py-16 xl:w-1/4 2xl:w-1/5 xl:pl-8 md:py-12">
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/olympus/profile.png"
                    alt="profile"
                  />
                  <p className="mt-2 text-xs font-semibold text-center text-white sm:text-sm md:text-base">
                    Ricardo Boveta
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-7">
                <div>
                  <p className="text-xs text-gray-300">Products</p>
                  <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50">
                    28
                  </p>
                </div>
                <div className="ml-12">
                  <p className="text-xs text-gray-300">Revenue</p>
                  <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50">
                    $2890
                  </p>
                </div>
                <div className="ml-12">
                  <p className="text-xs text-gray-300">Average</p>
                  <p className="mt-2 text-base sm:text-lg md:text-xl 2xl:text-2xl text-gray-50">
                    $169
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header ends here */}
    </div>
  )
}
