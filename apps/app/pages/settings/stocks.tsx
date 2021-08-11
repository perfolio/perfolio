import React, { useState } from "react"
import { NextPage } from "next"
import { useForm } from "react-hook-form"
import { AppLayout } from "@perfolio/app/components"
import { z } from "zod"
import { useRouter } from "next/router"
import { Button } from "@perfolio/ui/components"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import cn from "classnames"
import { useUserSettings, useExchanges, useUpdateUserSettings } from "@perfolio/hooks"
import { Card } from "@perfolio/ui/components"
import { Field, Form, handleSubmit } from "@perfolio/ui/form"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

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
            size="sm"
            type="submit"
            disabled={ctx.formState.isSubmitting}
          >
            {button?.label ?? "Save"}
          </Button>
        </Card.Footer.Actions>
      </Card.Footer>
    </Card>
  )
}

/**
 * / page.
 */
const SettingsPage: NextPage = () => {
  const { user } = useAuth0()
  const { settings } = useUserSettings()

  const { exchanges } = useExchanges()

  const router = useRouter()

  /**
   * The current defaultExchange
   */

  const currencyValidation = z.object({ defaultCurrency: z.string().min(3).max(3) })

  const updateSettings = useUpdateUserSettings()
  const onCurrencySubmit = async (values: z.infer<typeof currencyValidation>): Promise<void> => {
    await updateSettings.mutateAsync({
      userSettings: { userId: user!.sub!, defaultCurrency: values.defaultCurrency },
    })
  }

  const exchangeValidation = z.object({
    defaultRegion: z.string(),
    defaultExchange: z.string(),
  })
  const onExchangeSubmit = async (values: z.infer<typeof exchangeValidation>): Promise<void> => {
    await updateSettings.mutateAsync({
      userSettings: {
        userId: user!.sub!,
        defaultExchange: exchanges?.find((e) => e.name === values.defaultExchange)?.mic ?? null,
      },
    })
  }

  const [region, setRegion] = useState<string>(settings?.defaultExchange?.region ?? "")

  return (
    <AppLayout
      side="left"
      sidebar={
        <div className="mt-4">
          <nav className="flex-grow pb-4 pr-4 md:block md:pb-0 md:overflow-y-auto">
            <ul className="space-y-4">
              <li>
                <Link href="/settings/account">
                  <a
                    className={cn(
                      "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
                      {
                        "font-semibold text-black": router.pathname === "/settings/account",
                        "text-gray-500": router.pathname !== "/settings/account",
                      },
                    )}
                  >
                    Account
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings/stocks">
                  <a
                    className={cn(
                      "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
                      {
                        "font-semibold text-black": router.pathname === "/settings/stocks",
                        "text-gray-500": router.pathname !== "/settings/stocks",
                      },
                    )}
                  >
                    Stocks
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    >
      <div className="space-y-8">
        <Setting
          title="Currency"
          footer="All your assets will be converted to this currency"
          validation={currencyValidation}
          onSubmit={onCurrencySubmit as (values: Record<string, string | number>) => Promise<void>}
        >
          <Field.Input
            label="Currency"
            hideLabel
            name="defaultCurrency"
            type="text"
            defaultValue={settings?.defaultCurrency ?? ""}
          />
        </Setting>
        <Setting
          title="Default stock exchange"
          footer="Your preferred exchange"
          validation={exchangeValidation}
          onSubmit={onExchangeSubmit as (values: Record<string, string | number>) => Promise<void>}
        >
          <div className="items-center gap-4 md:flex">
            <Field.Select
              onChange={setRegion}
              options={[...new Set(exchanges?.map((e) => e.region))] ?? []}
              label="Region"
              name="defaultRegion"
              defaultValue={settings?.defaultExchange.region}
            />
            <Field.Select
              options={exchanges?.filter((e) => e.region === region).map((e) => e.name) ?? []}
              label="Exchange"
              name="defaultExchange"
              defaultValue={settings?.defaultExchange?.name ?? ""}
            />
          </div>
        </Setting>
      </div>
    </AppLayout>
  )
}
export default withAuthenticationRequired(SettingsPage)
