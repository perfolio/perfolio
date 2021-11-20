import { BookOpenIcon, ChartSquareBarIcon, PlusIcon } from "@heroicons/react/outline"
import { useI18n } from "@perfolio/pkg/i18n"
import { useRouter } from "next/router"
import React from "react"
import { DesktopNavbar, MobileNavbar } from "../navbar"
import { NavigationItem } from "../navbar/types"

export const Header: React.FC = (): JSX.Element => {
  const { t } = useI18n()
  const router = useRouter()

  const menu: { items: NavigationItem[] } = {
    items: [],
  }

  if ("portfolioId" in router.query) {
    const portfolioBasePath = `/portfolio/${router.query["portfolioId"]}`
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
      href: "/dashboard",
    })
  }

  return (
    <div className="h-full bg-gray-900 ">
      <div className="px-4 pt-5 lg:mx-8 xl:mx-16 lg:pt-10">
        <div className="hidden lg:flex">
          <DesktopNavbar items={menu.items} />
        </div>
        <div className="lg:hidden">
          <MobileNavbar items={menu.items} />
        </div>
      </div>
    </div>
  )
}
