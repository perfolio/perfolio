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
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
import { useTransactions, useUserSettings, useCreateTransaction } from "@perfolio/hooks"
import { useAuth0 } from "@auth0/auth0-react"

const validation = z.object({
  isin: z.string(),
  volume: z.string().transform((x: string) => parseInt(x)),
  value: z.string().transform((x: string) => parseInt(x)),
  executedAt: z.string().transform((x: string) => Time.fromDate(new Date(x)).unix()),
})
interface PageProps {
  translations: Record<string, string>
}
/**
 * / page.
 */
const NewTransactionPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  console.log(t("hello")) // @madsjordt remove this line
  const { user } = useAuth0()
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
  const { settings } = useUserSettings()
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
          <Main.Header.Title title="Add a transaction" />
        </Main.Header>
        <Main.Content>
          <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-1">
            <div className="w-full">
              <Form ctx={ctx} formError={formError} className="grid grid-cols-1 gap-8">
                <Field.AutoCompleteSelect
                  name="isin"
                  label="Asset"
                  help={
                    <Description title="TODO: @webersni">
                      Search for your asset. Try &quot;microsoft&quot; Only stocks from your
                      selected exchange will be shown here. If you would like to change this, please{" "}
                      <Link href="/settings/stocks">
                        <a className="underline text-info-400">go to settings</a>
                      </Link>
                    </Description>
                  }
                />

                <Field.Input
                  name="executedAt"
                  label="Date of transaction"
                  type="date"
                  // iconLeft={<MailIcon />}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Field.Input
                    name="volume"
                    label="How many shares"
                    type="number"
                    // iconLeft={<LockClosedIcon />}
                  />
                  <Field.Input
                    name="value"
                    label="Cost per share"
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
                          userId: user!.sub!,
                          volume: Number(volume),
                          value: Number(value),
                          executedAt: Time.fromString(executedAt as unknown as string).unix(),
                          assetId: isin,
                        }
                        await createTransaction.mutateAsync({ transaction }).catch((err) => {
                          setFormError(
                            `Sorry, we had an unexpected error. Please try again. - ${err.toString()}`,
                          )
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
                  Add transaction
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
export default NewTransactionPage

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
