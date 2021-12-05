import { GetStaticProps, NextPage } from "next"
import React from "react"
import fs from "fs"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"

import { Button } from "@perfolio/ui/components"
import { useRouter } from "next/router"

import { withAuthenticationRequired } from "@auth0/auth0-react"
import { useUser } from "@perfolio/pkg/hooks"
import { useI18n } from "next-localization"

/**
 * / page.
 */

interface PageProps {}

const SettingsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
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
          {t("app.setBillingPortal")}
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
  return {
    props: {
      translations: JSON.parse(fs.readFileSync(`public/locales/${locale}.json`).toString()),
    },
  }
}
