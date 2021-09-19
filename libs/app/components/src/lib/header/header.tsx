import React from "react"
import { DesktopNavbar, MobileNavbar } from "../navbar"
import { ChartSquareBarIcon, PlusIcon, BookOpenIcon } from "@heroicons/react/outline"
import { useI18n } from "@perfolio/feature/i18n"
import { useRouter } from "next/router"
import { NavigationItem } from "../navbar/types"
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  const { t } = useI18n()
  const router = useRouter()

  const menu: { items: NavigationItem[] } = {
    items: [],
  }

  if ("portfolioId" in router.query) {
    const portfolioBasePath = `/portfolio/${router.query.portfolioId}`
    menu.items.push({
      label: t("headerLabelDash"),
      icon: <ChartSquareBarIcon />,
      href: portfolioBasePath,
    })
    menu.items.push({
      label: t("headerLabelTrans"),
      icon: <BookOpenIcon />,
      menu: [
        {
          name: t("headerLabelMyTrans"),
          href: `${portfolioBasePath}/transactions`,
          icon: <BookOpenIcon />,
          description: t("headerDescrMyTrans"),
        },
        {
          name: t("headerLabelAddTrans"),
          href: `${portfolioBasePath}/transactions/new`,
          icon: <PlusIcon />,
          description: t("headerDescrAddTrans"),
        },
      ],
    })
  } else {
    menu.items.push({
      label: "Portfolios",
      icon: <BookOpenIcon />,
      href: "/",
    })
  }

  return (
    <div className="flex items-center h-full bg-gray-900 lg:block lg:pt-10">
      <div className="px-4 lg:mx-8 xl:mx-16">
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
