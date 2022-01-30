import { useExchanges, useUpdateSettings, useUser } from "@perfolio/pkg/hooks"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { Card } from "@perfolio/ui/components"
import { Field } from "@perfolio/ui/form"
import { GetStaticProps, NextPage } from "next"
import React, { useState } from "react"
import { z } from "zod"
import fs from "fs"
import { CheckIcon } from "@heroicons/react/outline"
import { useI18n } from "next-localization"
import { useToaster } from "@perfolio/pkg/toaster"
import { SettingCard } from "@perfolio/ui/components/settingcard"

/**
 * / page.
 */

interface PageProps {}

const SettingsPage: NextPage<PageProps> = () => {
  const { t } = useI18n()
  const { user } = useUser()

  const { exchanges } = useExchanges()
  const toast = useToaster()

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
        <div className="hidden lg:flex">
          <SideNavbar />
        </div>
      }
    >
      <div className="space-y-8">
        <Card>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:py-20 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  {t("app.setStocks")}
                </p>
                <div className="space-y-6">
                  <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    Change your default currency or stock exchange.
                  </p>
                  {/* <Text size="sm">{t("app.setPlanYearlyDiscount")}</Text> */}
                </div>
              </div>
            </div>
          </div>
        </Card>
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
  return {
    props: {
      translations: JSON.parse(fs.readFileSync(`public/locales/${locale}.json`).toString()),
    },
  }
}
