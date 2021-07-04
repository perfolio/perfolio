import React from "react"
// import { z } from "zod"
// import { Form } from "@perfolio/ui/form"
import { Loading, Button } from "@perfolio/ui/components"
import { Main, AppLayout, Sidebar, ActivityFeed } from "@perfolio/app/components"
import { Avatar, Text } from "@perfolio/ui/components"
import { withAuthentication } from "@perfolio/app/middleware"
import { useForm } from "react-hook-form"
import { Time } from "@perfolio/util/time"
import { NextPage } from "next"
import { Transaction } from "@perfolio/data-access/db"
import { useTransactions, useCompany, useAsset } from "@perfolio/data-access/queries"
// import { useCreateTransaction } from "@perfolio/data-access/mutations"

const Suggestion: React.FC<{
  tx: Transaction
  setValue: (key: "isin", val: string) => void
  trigger: () => void
}> = ({ tx, setValue, trigger }): JSX.Element => {
  const { asset } = useAsset({ isin: tx.data.assetId })
  const { company } = useCompany(asset?.data?.symbol)
  return (
    <li className="flex items-center justify-between w-full gap-4 py-3">
      <div className="flex items-center w-3/5">
        <div>{company?.logo ? <Avatar size="lg" src={company.logo} /> : <Loading />}</div>
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
              setValue("isin", tx.data.assetId)
              trigger()
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </li>
  )
}

interface FormData {
  buy: boolean
  isin: string
  price: number
  shares: number
  date: Date
}

/**
 * / page.
 */
const NewTransactionPage: NextPage = () => {
  const {
    setValue,
    trigger,
    // watch,
    // formState: { errors },
  } = useForm<FormData>({ mode: "all", defaultValues: { date: new Date() } })

  // const { mutateAsync: createTransaction } = useCreateTransaction()
  const { transactions } = useTransactions()
  const uniqueAssets: Record<string, Transaction> = {}
  transactions
    ?.sort((a, b) => b.ts - a.ts)
    .forEach((tx) => {
      if (!(tx.data.assetId in uniqueAssets)) {
        uniqueAssets[tx.data.assetId] = tx
      }
    })
  // const data = watch()
  // const { asset } = useAsset({ isin: data.isin })

  // const { company, isLoading: companyLoading } = useCompany(asset?.data.symbol)

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
              {/* <Form
                submitText="Add Transaction"
                schema={z.object({
                  assetId: z.string().regex(/[A-Z]{2}[a-zA-Z0-9]{10}/, "This is not a valid isin."),
                  volume: z.string().transform((x: string) => parseInt(x)),
                  value: z.string().transform((x: string) => parseInt(x)),
                  executedAt: z
                    .string()
                    .transform((x: string) => Time.fromDate(new Date(x)).unix()),
                })}
                // initialValues={{assetId: "", executedAt: Time.today().unix()}}
                onSubmit={async (tx) => {
                  try {
                    await createTransaction(tx)
                  } catch (error) {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
                  }
                  return
                }}
              >
                <LabeledField
                  name="assetId"
                  label="Isin"
                  iconLeft={
                    company ? (
                      <img
                        src={company.logo}
                        alt={`Logo of ${company.name}`}
                        width={64}
                        height={64}
                      />
                    ) : companyLoading ? (
                      <Loading />
                    ) : null
                  }
                />
                <LabeledField
                  name="executedAt"
                  label="Date of transaction"
                  type="date"
                  // iconLeft={<MailIcon />}
                />

                <div className="grid grid-cols-2 gap-2">
                  <LabeledField
                    name="volume"
                    label="How many shares"
                    type="number"
                    // iconLeft={<LockClosedIcon />}
                  />
                  <LabeledField
                    name="value"
                    label="Cost per share"
                    type="number"
                    iconLeft={
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="font-medium text-gray-700">$</span>
                      </div>
                    }
                  />
                </div>
              </Form> */}
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
                          trigger={() => trigger("isin")}
                          setValue={setValue}
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
