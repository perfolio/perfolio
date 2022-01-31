import { GetStaticProps, NextPage } from "next"
import React from "react"
import fs from "fs"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
//import { useRouter } from "next/router"
//import { useUser } from "@perfolio/pkg/hooks"
import { useI18n } from "next-localization"
import { SettingCard } from "@perfolio/ui/components/settingcard"
import { z } from "zod"
//import { useUpdateSettings } from "@perfolio/pkg/hooks"
import { CheckIcon } from "@heroicons/react/outline"
import { useToaster } from "@perfolio/pkg/toaster"
import { Field } from "@perfolio/ui/form"
import { HeadingCard } from "@perfolio/ui/components/headingcard"
/**
 * / page.
 */

interface PageProps {}

const SettingsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
  const toast = useToaster()
  // const router = useRouter()
  // const { user } = useUser()
  const languageValidation = z.object({
    defaultLanguage: z.string(),
  })
  //const updateSettings = useUpdateSettings()
  const onLanguageSubmit = async (values: z.infer<typeof languageValidation>): Promise<void> => {
    console.log(values)
    // const res = await updateSettings.mutateAsync({
    //   settings: {
    //     defaultExchangeId: exchanges?.find((e) => e.description === values.defaultExchange)?.mic,
    //   },
    // })
    toast.addToast({
      icon: <CheckIcon />,
      title: "Success",
      content: `Updated language to en`, // do not hardcode
    })
  }

  return (
    <AppLayout
      side="left"
      sidebar={
        <div className="hidden lg:flex">
          <SideNavbar />
        </div>
      }
    >
      <div className="space-y-8">
        <HeadingCard title={t("app.sideNavBarLabelAcc")} subtitle="Your account belongs to you." />
        <SettingCard
          title={"Language"}
          footer={"Choose your language for the application."} // do not hardcode
          validation={languageValidation}
          onSubmit={onLanguageSubmit as (values: Record<string, string | number>) => Promise<void>}
        >
          <Field.Select
            options={["en", "de"]} // do not hardcode
            label={"Language"} // do not hardcode
            hideLabel
            name="defaultLanguage"
            defaultValue={"en"} // do not hardcode
          />
        </SettingCard>

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
      </div>
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
