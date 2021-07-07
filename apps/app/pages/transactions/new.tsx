import React, { useState, useEffect } from "react"
import { z } from "zod"
import { Loading, Button, Description } from "@perfolio/ui/components"
import { Main, AppLayout, Sidebar, ActivityFeed } from "@perfolio/app/components"
import { Avatar, Text } from "@perfolio/ui/components"
import { withAuthentication } from "@perfolio/app/middleware"
import { Time } from "@perfolio/util/time"
import { NextPage } from "next"
import { Transaction } from "@perfolio/integrations/fauna"
import {
  useTransactions,
  useCompany,
  useTickerFromFigi,
  useSettings,
} from "@perfolio/data-access/queries"
import { useCreateTransaction } from "@perfolio/data-access/mutations"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApi } from "@perfolio/data-access/api-client"
import { getCurrencySymbol } from "@perfolio/util/currency"
import Link from "next/link"

const Suggestion: React.FC<{
  tx: Transaction
  setValue?: (key: "isin", val: string) => void
  trigger?: () => void
}> = ({ tx }): JSX.Element => {
  const { ticker } = useTickerFromFigi({ figi: tx.data.assetId })
  const { company } = useCompany(ticker)
  return (
    <li className="flex items-center justify-between w-full gap-4 py-3">
      <div className="flex items-center w-3/5 gap-2">
        <div>{company?.logo ? <Avatar src={company.logo} /> : <Loading />}</div>
        <div className="overflow-hidden">
          <Text truncate bold>
            {company?.name}
          </Text>
          <Text size="sm">{tx.data.assetId}</Text>
        </div>
      </div>
      <div className="flex flex-col items-end w-2/5 space-y-1">
        <span className="text-sm text-right text-gray-600">{`added ${Time.ago(
          tx.ts / 1_000_000,
        )}`}</span>
        <div>
          <Button
            kind="secondary"
            size="small"
            onClick={() => {
              // setValue("isin", tx.data.assetId)
              // trigger()
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </li>
  )
}

const validation = z.object({
  asset: z.object({
    name: z.string(),
    currency: z.string(),
    figi: z.string(),
    exchange: z.string(),
  }),
  volume: z.string().transform((x: string) => parseInt(x)),
  value: z.string().transform((x: string) => parseInt(x)),
  executedAt: z.string().transform((x: string) => Time.fromDate(new Date(x)).unix()),
})

/**
 * / page.
 */
const NewTransactionPage: NextPage = () => {
  const api = useApi()
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const formData = ctx.watch()
  const { mutateAsync: createTransaction } = useCreateTransaction()
  const { transactions } = useTransactions()
  const uniqueAssets: Record<string, Transaction> = {}
  transactions
    ?.sort((a, b) => b.ts - a.ts)
    .forEach((tx) => {
      if (!(tx.data.assetId in uniqueAssets)) {
        uniqueAssets[tx.data.assetId] = tx
      }
    })
  const { settings } = useSettings()
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)

  useEffect(() => {
    if (!settings || !formData.asset) {
      return
    }

    if (settings.defaultCurrency !== formData.asset.currency) {
      setFormError(
        <span>
          The currency at {formData.asset.exchange} does not match your preferred currency. Please
          choose a different exchange or{" "}
          <Link href="/settings/">
            <a className="underline">change your settings</a>
          </Link>
        </span>,
      )
    }
  }, [formData.asset, settings])
  const [submitting, setSubmitting] = useState(false)
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
          <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-2">
            <div className="w-full">
              <Form
                ctx={ctx}
                formError={formError}
                className="grid grid-cols-1 gap-8"
                // submitText="Add Transaction"
                // schema={z.object({
                //   assetId: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/, "This is not a valid isin."),
                //   volume: z.string().transform((x: string) => parseInt(x)),
                //   value: z.string().transform((x: string) => parseInt(x)),
                //   executedAt: z
                //     .string()
                //     .transform((x: string) => Time.fromDate(new Date(x)).unix()),
                // })}
                // // initialValues={{assetId: "", executedAt: Time.today().unix()}}
                // onSubmit={async (tx) => {
                //   try {
                //     await createTransaction(tx)
                //   } catch (error) {
                //     return {
                //       [FORM_ERROR]:
                //         "Sorry, we had an unexpected error. Please try again. - " +
                //         error.toString(),
                //     }
                //   }
                //   return
                // }}
              >
                <Field.AutoCompleteSelect
                  options={(fragment: string) => api.search.search({ fragment })}
                  name="asset"
                  label="Asset"
                  help={
                    <Description title="TODO: @webersni">
                      Search for your asset. Try <pre>microsoft</pre>
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
                          {getCurrencySymbol(ctx.watch("asset")?.currency)}
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
                      async ({ asset: { figi }, volume, value, executedAt }) => {
                        try {
                          await createTransaction({
                            volume: Number(volume),
                            value: Number(value),
                            executedAt: Time.fromString(executedAt as unknown as string).unix(),
                            assetId: figi,
                          })
                        } catch (err) {
                          setFormError(
                            `Sorry, we had an unexpected error. Please try again. - ${err.toString()}`,
                          )
                        }
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
            <div className="w-full">
              <div className="flex items-center justify-between px-6 py-6">
                <p className="text-sm font-semibold leading-tight text-gray-800 lg:text-xl">
                  Suggestions
                </p>
              </div>
              <div className="px-6 pt-6 overflow-x-auto">
                <div className="w-full whitespace-nowrap">
                  <ul className="flex flex-col divide-y divide-gray-100">
                    {Object.values(uniqueAssets).map((tx) => {
                      return (
                        <Suggestion
                          key={tx.id}
                          tx={tx}
                          // trigger={() => ctx.trigger("isin")}
                          // setValue={ctx.setValue}
                        />
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Main.Content>
      </Main>
    </AppLayout>
  )
}

export default withAuthentication(NewTransactionPage)
