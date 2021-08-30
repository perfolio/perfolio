import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import cn from "classnames"
export const SideNavbar: React.FC = (): JSX.Element => {
  const router = useRouter()

  const links: { href: string; label: string }[] = [
    {
      label: "Account",
      href: "/settings/account",
    },
    {
      label: "Stocks",
      href: "/settings/stocks",
    },
    {
      label: "Plans",
      href: "/settings/plans",
    },
  ]

  return (
    <nav className="mt-8">
      <ul className="space-y-4">
        {links.map(({ href, label }) => (
          <li>
            <Link href={href}>
              <a
                className={cn(
                  "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
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
