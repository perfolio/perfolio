import { GetStaticProps, NextPage } from "next"
import React from "react"

import { AppLayout, SideNavbar } from "@perfolio/ui/app"

import { Button } from "@perfolio/ui/components"
import { useRouter } from "next/router"

import { withAuthenticationRequired } from "@auth0/auth0-react"
import { useUser } from "@perfolio/pkg/hooks"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"

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
        <Button
          onClick={async () => {
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
          type="cta"
        >
          {t("setBillingPortal")}
        </Button>
        <Button
          onClick={async () => {
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
          type="cta"
        >
          Checkout
        </Button>
      </div>
    </AppLayout>
  )
}
export default withAuthenticationRequired(SettingsPage)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = await getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
