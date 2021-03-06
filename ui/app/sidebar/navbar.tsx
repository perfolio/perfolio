import { useI18n } from "next-localization"
import cn from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
export const SideNavbar: React.FC = (): JSX.Element => {
  const router = useRouter()
  const { t } = useI18n()

  const links: { href: string; label: string }[] = [
    {
      label: t("app.sideNavBarLabelAcc"),
      href: "/settings/account",
    },
    {
      label: t("app.sideNavBarLabelStocks"),
      href: "/settings/stocks",
    },
    {
      label: t("app.sideNavBarLabelPlans"),
      href: "/settings/plans",
    },
  ]

  return (
    <nav className="mt-8">
      <ul className="space-y-4">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link href={href}>
              <a
                className={cn(
                  "block px-4 py-2transition duration-500 ease-in-out focus:outline-none hover:text-black",
                  {
                    "font-semibold text-black": router.pathname === href,
                    "text-gray-500": router.pathname !== href,
                  },
                )}
              >
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
