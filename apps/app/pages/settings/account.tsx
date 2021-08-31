import React from "react"
import { NextPage } from "next"

import { AppLayout, SideNavbar } from "@perfolio/app/components"

import { useRouter } from "next/router"
import { AsyncButton } from "@perfolio/ui/components"

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
    <AppLayout side="left" sidebar={<SideNavbar />}>
      <div className="space-y-8">
        <AsyncButton
          onClick={async () => {
            console.log({ user })
            if (!user) {
              console.error("User not yet loaded")
              return
            }
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
        <AsyncButton
          onClick={async () => {
            console.log({ user })
            if (!user) {
              console.error("User not yet loaded")
              return
            }
            const res = await fetch(
              `/api/stripe/checkout/plan_K8CG6n6MPm30fB?customerId=${user.stripeCustomerId}`,
              {
                method: "POST",
              },
            )
            if (res.status !== 200) {
              console.error(res.body)
            }
            const { url } = (await res.json()) as { url: string }
            router.push(url)
          }}
          kind="cta"
        >
          Checkout
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
