import React from "react"
import { DesktopNavbar, MobileNavbar } from "../navbar"
import {
  ChartSquareBarIcon,
  PlusIcon,
  BookOpenIcon,
} from "@heroicons/react/outline"
import { Profile } from "../profile/profile"
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const menu = {
  items: [
    {
      label: "Dashboard",
      icon: <ChartSquareBarIcon />,
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
          description: "Add a transaction by entering data yourself",
        },
      ],
    },
  ],
}

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  return (
    <div>
      {/* header starts here */}
      <div className="pt-6 bg-gray-900 md:pt-8 xl:pt-12">
        <div className="container px-4 mx-auto xl:px-0">
          <div className="hidden xl:flex">
            <DesktopNavbar items={menu.items} />
          </div>
          <div className="xl:hidden">
            <MobileNavbar items={menu.items} />
          </div>

          <Profile />
        </div>
      </div>
      {/* header ends here */}
    </div>
  )
}
