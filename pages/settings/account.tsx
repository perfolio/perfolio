import { GetStaticProps, NextPage } from "next"
import React from "react"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { useI18n } from "next-localization"
import { SettingCard } from "@perfolio/ui/components/settingcard"
import { z } from "zod"
import {
  CheckIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"
import { useToaster } from "@perfolio/pkg/toaster"
import { Field } from "@perfolio/ui/form"
import { HeadingCard } from "@perfolio/ui/components/headingcard"
import { TabBar } from "@perfolio/ui/components/tabbar"

interface PageProps {}

const SettingsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
  const toast = useToaster()

  const languageValidation = z.object({
    defaultLanguage: z.string(),
  })

  const onLanguageSubmit = async (values: z.infer<typeof languageValidation>): Promise<void> => {
    console.log(values)
    toast.addToast({
      icon: <CheckIcon />,
      title: "Success",
      content: `Updated language to en`, // do not hardcode
    })
  }

  const tabs = [
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
    <AppLayout
      side="left"
      sidebar={
        <div className="hidden xl:flex">
          <SideNavbar />
        </div>
      }
    >
      <div className="space-y-8">
        <TabBar tabs={tabs} />
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
      </div>
    </AppLayout>
  )
}
export default SettingsPage

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const { default: translations } = await import(`@perfolio/public/locales/${locale}.json`)

  return {
    props: {
      translations,
    },
  }
}
