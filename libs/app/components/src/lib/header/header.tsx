import React from "react"
import { DesktopNavbar, MobileNavbar } from "../navbar"
import { ChartSquareBarIcon, PlusIcon, BookOpenIcon } from "@heroicons/react/outline"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

const menu = {
  items: [
    {
      label: {t("headerLabelDash")},
      icon: <ChartSquareBarIcon />,
      href: "/",
    },
    {
      label: {t("headerLabelTrans")},
      icon: <BookOpenIcon />,
      menu: [
        {
          name: {t("headerLabelMyTrans")},
          href: "/transactions",
          icon: <BookOpenIcon />,
          description: {t("headerDescrMyTrans")},
        },
        {
          name: {t("headerLabelAddTrans")},
          href: "/transactions/new",
          icon: <PlusIcon />,
          description: {t("headerDescrAddTrans")},
        },
      ],
    },
  ],
}

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  return (
    <div className="flex items-center h-full bg-gray-900 lg:block lg:pt-10">
      <div className="container px-4 mx-auto">
        <div className="hidden xl:flex">
          <DesktopNavbar items={menu.items} />
        </div>
        <div className="xl:hidden">
          <MobileNavbar items={menu.items} />
        </div>
      </div>
    </div>
  )
}
