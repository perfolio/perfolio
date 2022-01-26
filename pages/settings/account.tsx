import { GetStaticProps, NextPage } from "next"
import React from "react"
import fs from "fs"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"

import { Card } from "@perfolio/ui/components"
//import { useRouter } from "next/router"

//import { useUser } from "@perfolio/pkg/hooks"
import { useI18n } from "next-localization"

/**
 * / page.
 */

interface PageProps {}

const SettingsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
  // const router = useRouter()
  // const { user } = useUser()
  return (
    <AppLayout
      side="left"
      sidebar={
        <div className="hidden lg:flex">
          <SideNavbar />
        </div>
      }
    >
      <Card>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                {t("app.sideNavBarLabelAcc")}
              </p>
              <div className="space-y-6">
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                  Your account belongs to you.
                </p>
                {/* <Text size="sm">{t("app.setPlanYearlyDiscount")}</Text> */}
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* <div className="space-y-8">
        <Button
          onClick={async () => {
            if (!user) {
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
      </div> */}
    </AppLayout>
  )
}
export default SettingsPage

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  return {
    props: {
      translations: JSON.parse(fs.readFileSync(`public/locales/${locale}.json`).toString()),
    },
  }
}
