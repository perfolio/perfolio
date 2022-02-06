import { useExchanges, useUpdateSettings, useUser } from "@perfolio/pkg/hooks"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { Field } from "@perfolio/ui/form"
import { GetStaticProps, NextPage } from "next"
import React, { useState } from "react"
import { z } from "zod"
import {
  CheckIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"
import { useI18n } from "next-localization"
import { useToaster } from "@perfolio/pkg/toaster"
import { SettingCard } from "@perfolio/ui/components/settingcard"
import { HeadingCard } from "@perfolio/ui/components/headingcard"
import { TabBar } from "@perfolio/ui/components/tabbar"

/**
 * / page.
 */

interface PageProps {}

const SettingsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
  const { user } = useUser()

  const { exchanges } = useExchanges()
  const toast = useToaster()

  const tabs = [
    {
      name: t("app.sideNavBarLabelAcc"),
      href: "/settings/account",
      icon: <UserCircleIcon />,
      current: false,
    },
    {
      name: t("app.sideNavBarLabelStocks"),
      href: "/settings/stocks",
      icon: <TrendingUpIcon />,
      current: true,
    },
    {
      name: t("app.sideNavBarLabelPlans"),
      href: "/settings/plans",
      icon: <CurrencyDollarIcon />,
      current: false,
    },
  ]

  /**
   * The current defaultExchange
   */

  const currencyValidation = z.object({
    defaultCurrency: z.string().min(3).max(3),
  })

  const updateSettings = useUpdateSettings()
  const onCurrencySubmit = async (values: z.infer<typeof currencyValidation>): Promise<void> => {
    const res = await updateSettings.mutateAsync({
      settings: { defaultCurrency: values.defaultCurrency },
    })
    toast.addToast({
      icon: <CheckIcon />,
      title: "Success",
      content: `Updated currency to ${res.updateSettings.defaultCurrency}`,
    })
  }

  const exchangeValidation = z.object({
    defaultRegion: z.string(),
    defaultExchange: z.string(),
  })
  const onExchangeSubmit = async (values: z.infer<typeof exchangeValidation>): Promise<void> => {
    const res = await updateSettings.mutateAsync({
      settings: {
        defaultExchangeId: exchanges?.find((e) => e.description === values.defaultExchange)?.mic,
      },
    })
    toast.addToast({
      icon: <CheckIcon />,
      title: "Success",
      content: `Updated default exchange to ${res.updateSettings.defaultExchange.mic}`,
    })
  }

  const [region, setRegion] = useState<string>(user?.settings?.defaultExchange?.region ?? "")

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
        <HeadingCard
          title={t("app.setStocks")}
          subtitle="Change your default currency or stock exchange."
        />
        <SettingCard
          title={t("app.setStocksCurrencyTitle")}
          footer={t("app.setStocksCurrencyFooter")}
          validation={currencyValidation}
          onSubmit={onCurrencySubmit as (values: Record<string, string | number>) => Promise<void>}
        >
          <Field.Select
            options={["USD", "EUR"]} // do not hardcode
            label={t("app.setStocksCurrencyLabel")}
            hideLabel
            name="defaultCurrency"
            defaultValue={user?.settings?.defaultCurrency ?? ""}
          />
        </SettingCard>
        <SettingCard
          title={t("app.setStocksStockExTitle")}
          footer={t("app.setStocksStockExFooter")}
          validation={exchangeValidation}
          onSubmit={onExchangeSubmit as (values: Record<string, string | number>) => Promise<void>}
        >
          <div className="items-center gap-4 md:flex">
            <Field.Select
              onChange={setRegion}
              options={[...new Set(exchanges?.map((e) => e.region))] ?? []}
              label="Region"
              name="defaultRegion"
              defaultValue={user?.settings?.defaultExchange.region}
            />
            <Field.Select
              options={
                exchanges?.filter((e) => e.region === region).map((e) => e.description) ?? []
              }
              label={t("app.setStocksStockExSelect")}
              name="defaultExchange"
              defaultValue={user?.settings?.defaultExchange?.description ?? ""}
            />
          </div>
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
