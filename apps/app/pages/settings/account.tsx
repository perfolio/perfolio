import React from "react"
import { NextPage, GetStaticProps } from "next"

import { AppLayout } from "@perfolio/app/components"

import { useRouter } from "next/router"
import { AsyncButton } from "@perfolio/ui/components"

import Link from "next/link"
import cn from "classnames"
import { useUser } from "@perfolio/hooks"

import { getTranslations, useI18n } from "@perfolio/feature/i18n"

import { withAuthenticationRequired } from "@auth0/auth0-react"

/**
 * / page.
 */

interface PageProps {
  translations: Record<string, string>
}

const SettingsPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  const router = useRouter()
  const { user } = useUser()
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
                    {t("setAccLink")}
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
                    {t("setStocksLink")}
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    >
      <div className="space-y-8">
        <AsyncButton
          onClick={async () => {
            console.log({ user })
            const res = await fetch(`/api/stripe/create-portal-session/${user?.stripeCustomerId}`, {
              method: "POST",
            })
            if (res.status !== 200) {
              console.error(res.body)
            }
            const { url } = (await res.json()) as { url: string }
            router.push(url)
          }}
          kind="cta"
        >
          {t("setBillingPortal")}
        </AsyncButton>
      </div>
    </AppLayout>
  )
}
export default withAuthenticationRequired(SettingsPage)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
