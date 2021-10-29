import React, { useState } from "react"
import { NextPage, GetStaticProps } from "next"
import { useForm } from "react-hook-form"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { z } from "zod"
import { Button } from "@perfolio/ui/components"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUser, useExchanges, useUpdateSettings } from "@perfolio/pkg/hooks"
import { Card } from "@perfolio/ui/components"
import { Field, Form, handleSubmit } from "@perfolio/ui/form"
import { withAuthenticationRequired } from "@auth0/auth0-react"

import { getTranslations, useI18n } from "@perfolio/pkg/i18n"

interface SettingProps {
  validation: z.AnyZodObject
  title: string
  footer: string
  onSubmit: (values: Record<string, string | number>) => Promise<void>
  button?: {
    label?: string
    kind?: string
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
    <Card>
      <Card.Header>
        <Card.Header.Title title={title} />
      </Card.Header>

      <Card.Content>
        <Form ctx={ctx} formError={formError}>
          {children}
        </Form>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Status>{footer}</Card.Footer.Status>
        <Card.Footer.Actions>
          <Button
            loading={submitting}
            // eslint-disable-next-line
            // @ts-ignore
            onClick={() =>
              handleSubmit<z.infer<typeof validation>>(ctx, onSubmit, setSubmitting, setFormError)
            }
            kind={button?.kind ?? "primary"}
            type="submit"
            disabled={ctx.formState.isSubmitting}
          >
            {button?.label ?? t("setButtonLabelSave")}
          </Button>
        </Card.Footer.Actions>
      </Card.Footer>
    </Card>
  )
}

/**
 * / page.
 */

interface PageProps {
  translations: Record<string, string>
}

const SettingsPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  const { user } = useUser()

  const { exchanges } = useExchanges()

  console.log({ user })

  /**
   * The current defaultExchange
   */

  const currencyValidation = z.object({ defaultCurrency: z.string().min(3).max(3) })

  const updateSettings = useUpdateSettings()
  const onCurrencySubmit = async (values: z.infer<typeof currencyValidation>): Promise<void> => {
    await updateSettings.mutateAsync({
      settings: { defaultCurrency: values.defaultCurrency as "EUR" },
    })
  }

  const exchangeValidation = z.object({
    defaultRegion: z.string(),
    defaultExchange: z.string(),
  })
  const onExchangeSubmit = async (values: z.infer<typeof exchangeValidation>): Promise<void> => {
    await updateSettings.mutateAsync({
      settings: {
        defaultExchange: exchanges?.find((e) => e.name === values.defaultExchange)?.mic,
      },
    })
  }

  const [region, setRegion] = useState<string>(user?.settings?.defaultExchange?.region ?? "")

  return (
    <AppLayout side="left" sidebar={<SideNavbar />}>
      <div className="space-y-8">
        <Setting
          title={t("setStocksCurrencyTitle")}
          footer={t("setStocksCurrencyFooter")}
          validation={currencyValidation}
          onSubmit={onCurrencySubmit as (values: Record<string, string | number>) => Promise<void>}
        >
          <Field.Input
            label={t("setStocksCurrencyLabel")}
            hideLabel
            name="defaultCurrency"
            type="text"
            defaultValue={user?.settings?.defaultCurrency ?? ""}
          />
        </Setting>
        <Setting
          title={t("setStocksStockExTitle")}
          footer={t("setStocksStockExFooter")}
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
              options={exchanges?.filter((e) => e.region === region).map((e) => e.name) ?? []}
              label={t("setStocksStockExSelect")}
              name="defaultExchange"
              defaultValue={user?.settings?.defaultExchange?.name ?? ""}
            />
          </div>
        </Setting>
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
