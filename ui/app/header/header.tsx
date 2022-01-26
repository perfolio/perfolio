import {
  AdjustmentsIcon,
  BookOpenIcon,
  ChartSquareBarIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrendingUpIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"
import { useI18n } from "next-localization"
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

  const links: { href: string; label: string; icon: JSX.Element }[] = [
    {
      label: t("app.sideNavBarLabelAcc"),
      href: "/settings/account",
      icon: <UserCircleIcon />,
    },
    {
      label: t("app.sideNavBarLabelStocks"),
      href: "/settings/stocks",
      icon: <TrendingUpIcon />,
    },
    {
      label: t("app.sideNavBarLabelPlans"),
      href: "/settings/plans",
      icon: <CurrencyDollarIcon />,
    },
  ]

  if ("portfolioId" in router.query) {
    const portfolioBasePath = `/portfolio/${router.query["portfolioId"]}`
    menu.items.push({
      label: t("app.headerLabelDash"),
      icon: <ChartSquareBarIcon />,
      href: portfolioBasePath,
    })
    menu.items.push({
      label: t("app.headerLabelTrans"),
      icon: <BookOpenIcon />,
      menu: [
        {
          name: t("app.headerLabelMyTrans"),
          href: `${portfolioBasePath}/transactions`,
          icon: <BookOpenIcon />,
          description: t("app.headerDescrMyTrans"),
        },
        {
          name: t("app.headerLabelAddTrans"),
          href: `${portfolioBasePath}/transactions/new`,
          icon: <PlusIcon />,
          description: t("app.headerDescrAddTrans"),
        },
      ],
    })
  } else if (router.pathname.includes("settings")) {
    menu.items.push({
      label: "Portfolios",
      icon: <BookOpenIcon />,
      href: "/dashboard",
    })

    let submenu: { icon: JSX.Element; name: string; href: string; description: string }[] = []

    links.map((link) =>
      submenu.push({
        name: link.label,
        icon: link.icon,
        href: link.href,
        description: "",
      }),
    )

    menu.items.push({
      label: "Settings",
      icon: <AdjustmentsIcon />,
      href: "/dashboard",
      menu: submenu,
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
