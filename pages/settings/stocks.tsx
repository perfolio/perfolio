import { zodResolver } from "@hookform/resolvers/zod"
import { useExchanges, useUpdateSettings, useUser } from "@perfolio/pkg/hooks"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { Button, ButtonType } from "@perfolio/ui/components"
import { Card } from "@perfolio/ui/components"
import { Field, Form, handleSubmit } from "@perfolio/ui/form"
import { GetStaticProps, NextPage } from "next"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import fs from "fs"
import { CheckIcon } from "@heroicons/react/outline"
import { useI18n } from "next-localization"
import { useToaster } from "@perfolio/pkg/toaster"

interface SettingProps {
  validation: z.AnyZodObject
  title: string
  footer: string
  onSubmit: (values: Record<string, string | number>) => Promise<void>
  button?: {
    label?: string
    type?: ButtonType
  }
}

const Setting: React.FC<SettingProps> = ({
  validation,
  title,
  footer,
  children,
  onSubmit,
  button,
}): JSX.Element => {
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const { t } = useI18n()
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
      <Card border={false}>
        <Card.Header>
          <Card.Header.Title title={title} />
        </Card.Header>
        <Card.Content>
          <Form ctx={ctx} formError={formError}>
            {children}
          </Form>
        </Card.Content>
        <Card.Footer>
          <div className="hidden justify-between sm:flex sm:w-full">
            <Card.Footer.Status>{footer}</Card.Footer.Status>
            <Card.Footer.Actions>
              <Button
                loading={submitting}
                // eslint-disable-next-line
                // @ts-ignore
                onClick={() =>
                  handleSubmit<z.infer<typeof validation>>(
                    ctx,
                    onSubmit,
                    setSubmitting,
                    setFormError,
                  )
                }
                type={button?.type ?? "primary"}
                htmlType="submit"
                disabled={ctx.formState.isSubmitting}
              >
                {button?.label ?? t("app.setButtonLabelSave")}
              </Button>
            </Card.Footer.Actions>
          </div>
          <div className="block w-full sm:hidden space-y-2">
            <Card.Footer.Status>{footer}</Card.Footer.Status>
            <Card.Footer.Actions>
              <Button
                size="block"
                loading={submitting}
                // eslint-disable-next-line
                // @ts-ignore
                onClick={() =>
                  handleSubmit<z.infer<typeof validation>>(
                    ctx,
                    onSubmit,
                    setSubmitting,
                    setFormError,
                  )
                }
                type={button?.type ?? "primary"}
                htmlType="submit"
                disabled={ctx.formState.isSubmitting}
              >
                {button?.label ?? t("app.setButtonLabelSave")}
              </Button>
            </Card.Footer.Actions>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

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
        <Setting
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
        </Setting>
        <Setting
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
        </Setting>
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
