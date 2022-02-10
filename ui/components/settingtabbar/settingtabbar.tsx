import { CurrencyDollarIcon, TrendingUpIcon, UserCircleIcon } from "@heroicons/react/outline"
import { useI18n } from "next-localization"
import React from "react"
import { TabBar, Tabs } from "../tabbar"

export interface SettingTabBarProps {
  additionalTabs?: Tabs
}

export const SettingTabBar: React.FC<SettingTabBarProps> = ({ additionalTabs }): JSX.Element => {
  const { t } = useI18n()

  const defaultTabs = [
    {
      name: t("app.sideNavBarLabelAcc"),
      href: "/settings/account",
      icon: <UserCircleIcon />,
      current: true,
    },
    {
      name: t("app.sideNavBarLabelStocks"),
      href: "/settings/stocks",
      icon: <TrendingUpIcon />,
      current: false,
    },
    {
      name: t("app.sideNavBarLabelPlans"),
      href: "/settings/plans",
      icon: <CurrencyDollarIcon />,
      current: false,
    },
  ]

  return (
    <div className=" xl:hidden">
      <TabBar
        tabs={additionalTabs === undefined ? defaultTabs : [...defaultTabs, ...additionalTabs]}
      />
    </div>
  )
}

export default SettingTabBar
