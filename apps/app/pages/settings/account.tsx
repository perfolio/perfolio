import React from "react"
import { NextPage } from "next"

import { AppLayout } from "@perfolio/app/components"

import { useRouter } from "next/router"
import { Button } from "@perfolio/ui/components"

import Link from "next/link"
import cn from "classnames"
import { useAuth0 } from "@auth0/auth0-react"

import { withAuthenticationRequired } from "@auth0/auth0-react"

/**
 * / page.
 */
const SettingsPage: NextPage = () => {
  const router = useRouter()
  const { user } = useAuth0()
  return (
    <AppLayout
      side="left"
      sidebar={
        <div className="mt-4">
          <nav className="flex-grow pb-4 pr-4 md:block md:pb-0 md:overflow-y-auto">
            <ul className="space-y-4">
              <li>
                <Link href="/settings/account">
                  <a
                    className={cn(
                      "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
                      {
                        "font-semibold text-black": router.pathname === "/settings/account",
                        "text-gray-500": router.pathname !== "/settings/account",
                      },
                    )}
                  >
                    Account
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings/stocks">
                  <a
                    className={cn(
                      "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
                      {
                        "font-semibold text-black": router.pathname === "/settings/stocks",
                        "text-gray-500": router.pathname !== "/settings/stocks",
                      },
                    )}
                  >
                    Stocks
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    >
      <div className="space-y-8">
        <Button
          onClick={async () => {
            const res = await fetch("/api/stripe/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                priceId: "price_1JTm1QG0ZLpKb1P6SuSNh7Rb",
                email: user?.email,
              }),
            })
            if (res.status !== 200) {
              console.error(res.body)
            }
            const { checkoutUrl } = (await res.json()) as { checkoutUrl: string }
            router.push(checkoutUrl)
          }}
          kind="cta"
        >
          Pay up
        </Button>
      </div>
    </AppLayout>
  )
}
export default withAuthenticationRequired(SettingsPage)
