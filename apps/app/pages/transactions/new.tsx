import React, { useState } from "react"
import { z } from "zod"
import { Button, Description } from "@perfolio/ui/components"
import { Main, AppLayout, Sidebar, ActivityFeed } from "@perfolio/app/components"
import { Time } from "@perfolio/util/time"
import { NextPage } from "next"
import { Transaction } from "@perfolio/integrations/fauna"
import { useTransactions } from "@perfolio/data-access/queries"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApi } from "@perfolio/data-access/api-client"
import { getCurrencySymbol } from "@perfolio/util/currency"
import Link from "next/link"
import { useGetUserSettingsQuery, useCreateTransactionMutation } from "@perfolio/api/graphql"
import { useUser } from "@clerk/clerk-react"
// const Suggestion: React.FC<{
//   tx: Transaction
//   setValue: (val: { name: string; ticker: string; figi: string, exchange:string }) => void
//   trigger: () => void
// }> = ({ tx, setValue, trigger }): JSX.Element => {
//   const { ticker } = useTickerFromFigi({ figi: tx.data.assetId })
//   const { company } = useCompany(ticker)
//   return (
//     <li className="flex items-center justify-between w-full gap-4 py-3">
//       <div className="flex items-center w-3/5 gap-2">
//         <div>{company?.logo ? <Avatar src={company.logo} /> : <Loading />}</div>
//         <div className="overflow-hidden">
//           <Text truncate bold>
//             {company?.name}
//           </Text>
//           <Text size="sm">{tx.data.assetId}</Text>
//         </div>
//       </div>
//       <div className="flex flex-col items-end w-2/5 space-y-1">
//         <span className="text-sm text-right text-gray-600">{`added ${Time.ago(
//           tx.ts / 1_000_000,
//         )}`}</span>
//         <div>
//           <Button
//             kind="secondary"
//             size="small"
//             onClick={() => {
//               console.log({
//                 name: company?.name ?? "",
//                 ticker: company?.ticker ?? "",
//                 figi: tx.data.assetId,
//               })
//               setValue({
//                 name: company?.name ?? "",
//                 ticker: company?.ticker ?? "",
//                 figi: tx.data.assetId,
//                 exchange: ""
//               })
//               trigger()
//             }}
//           >
//             Add
//           </Button>
//         </div>
//       </div>
//     </li>
//   )
// }

const validation = z.object({
  ticker: z.string(),
  volume: z.string().transform((x: string) => parseInt(x)),
  value: z.string().transform((x: string) => parseInt(x)),
  executedAt: z.string().transform((x: string) => Time.fromDate(new Date(x)).unix()),
})

/**
 * / page.
 */
const NewTransactionPage: NextPage = () => {
  const user = useUser()
  const api = useApi()
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const [createTransaction] = useCreateTransactionMutation()
  const { transactions } = useTransactions()
  const uniqueAssets: Record<string, Transaction> = {}
  transactions
    ?.sort((a, b) => b.ts - a.ts)
    .forEach((tx) => {
      if (!(tx.data.assetId in uniqueAssets)) {
        uniqueAssets[tx.data.assetId] = tx
      }
    })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { data } = useGetUserSettingsQuery({ variables: { userId: user.id } })
  const settings = data?.getUserSettings
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
                  options={(fragment: string) => api.search.search({ fragment })}
                  name="ticker"
                  label="Asset"
                  help={
                    <Description title="TODO: @webersni">
                      Search for your asset. Try "microsoft" Only stocks from your selected exchange
                      will be shown here. If you would like to change this, please{" "}
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
                      async ({ ticker, volume, value, executedAt }) => {
                        const transaction = {
                          userId: user.id,
                          volume: Number(volume),
                          value: Number(value),
                          executedAt: Time.fromString(executedAt as unknown as string).unix(),
                          assetId: ticker,
                        }
                        await createTransaction({ variables: { transaction } }).catch((err) => {
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
