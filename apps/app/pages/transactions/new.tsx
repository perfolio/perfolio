import React, { useState } from "react"
import { z } from "zod"

import { Button, Description } from "@perfolio/ui/components"
import { Main, AppLayout, Sidebar, ActivityFeed } from "@perfolio/app/components"
import { Time } from "@perfolio/util/time"
import { NextPage, GetStaticProps } from "next"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCurrencySymbol } from "@perfolio/util/currency"
import Link from "next/link"
import { Asset } from "@perfolio/api/graphql"
import { CheckIcon } from "@heroicons/react/outline"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
import { withAuthenticationRequired } from "@perfolio/app/middleware"
import { useTransactions, useSettings, useCreateTransaction } from "@perfolio/hooks"
import { useToaster } from "@perfolio/toaster"
import { useUser } from "@perfolio/hooks"
const validation = z.object({
  isin: z.string(),
  volume: z.string().transform((x: string) => parseInt(x)),
  value: z.string().transform((x: string) => parseInt(x)),
  executedAt: z.string().transform((x: string) => Time.fromDate(new Date(x)).unix()),
})

/**
 * / page.
 */

interface PageProps {
  translations: Record<string, string>
}

const NewTransactionPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  const { user } = useUser()
  const { addToast } = useToaster()
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const createTransaction = useCreateTransaction()
  const { transactions } = useTransactions()
  const uniqueAssets: Record<string, Asset> = {}

  ;(transactions ?? [])
    .sort((a, b) => b.executedAt - a.executedAt)
    .forEach((tx) => {
      if (!(tx.asset.id in uniqueAssets)) {
        uniqueAssets[tx.asset.id] = tx.asset as Asset
      }
    })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { settings } = useSettings()
  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <ActivityFeed />
        </Sidebar>
      }
    >
      <Main>
        <Main.Header>
          <Main.Header.Title title={t("transNewHeader")} />
        </Main.Header>
        <Main.Content>
          <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-1">
            <div className="w-full">
              <Form ctx={ctx} formError={formError} className="grid grid-cols-1 gap-8">
                <Field.AutoCompleteSelect
                  name="isin"
                  label={t("transNewAssetLabel")}
                  help={
                    <Description title={t("transNewFieldDescrTitle")}>
                      {t("transNewFieldDescr")}
                      <Link href="/settings/stocks">
                        <a className="underline text-info-400">{t("transNewFieldDescrLink")}</a>
                      </Link>
                    </Description>
                  }
                />

                <Field.Input
                  name="executedAt"
                  label={t("transNewDateOfTrans")}
                  type="date"
                  // iconLeft={<MailIcon />}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Field.Input
                    name="volume"
                    label={t("transNewNumberShares")}
                    type="number"
                    // iconLeft={<LockClosedIcon />}
                  />
                  <Field.Input
                    name="value"
                    label={t("transNewCostPerShare")}
                    type="number"
                    iconLeft={
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="font-medium text-gray-700">
                          {getCurrencySymbol(settings?.defaultCurrency)}
                        </span>
                      </div>
                    }
                  />
                </div>

                <Button
                  loading={submitting}
                  onClick={() =>
                    handleSubmit<z.infer<typeof validation>>(
                      ctx,
                      async ({ isin, volume, value, executedAt }) => {
                        const transaction = {
                          userId: user!.id!,
                          volume: Number(volume),
                          value: Number(value),
                          executedAt: Time.fromString(executedAt as unknown as string).unix(),
                          assetId: isin,
                        }
                        await createTransaction.mutateAsync({ transaction }).catch((err) => {
                          setFormError(t("transNewFormError") + `${err.toString()}`)
                        })
                        addToast({
                          icon: <CheckIcon />,
                          role: "info",
                          title: t("transNewTransAdded"),
                          content: `You ${
                            volume > 0 ? "bought" : "sold"
                          } ${volume} shares of ${isin}`,
                        })
                      },
                      setSubmitting,
                      setFormError,
                    )
                  }
                  kind="primary"
                  size="auto"
                  type="submit"
                  disabled={submitting}
                >
                  {t("transNewAddTrans")}
                </Button>
              </Form>
            </div>
            {/* <div className="w-full">
              <div className="flex items-center justify-between px-6 py-6">
                <p className="text-sm font-semibold leading-tight text-gray-800 lg:text-xl">
                  Suggestions
                </p>
              </div>
              <div className="px-6 pt-6 overflow-x-auto">
                <div className="w-full whitespace-nowrap">
                  <ul className="flex flex-col divide-y divide-gray-100">
                    {Object.values(uniqueAssets).slice(0,5).map((tx) => {
                      return (
                        <Suggestion
                          key={tx.id}
                          tx={tx}
                          trigger={() => ctx.trigger("asset")}
                          setValue={(asset) => ctx.setValue("asset", { ...asset, exchange: "" })}
                        />
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </Main.Content>
      </Main>
    </AppLayout>
  )
}
export default withAuthenticationRequired(NewTransactionPage)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
