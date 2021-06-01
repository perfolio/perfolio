import React from "react"
import {
  Button,
  WithSidebar,
  Radio,
  AsyncButton,
  Input,
  Value,
  Spinner,
} from "app/core/components"
import { useForm } from "react-hook-form"
import { useQuery } from "blitz"
import { Time } from "pkg/time"
import { BlitzPage, Routes, invalidateQuery, useMutation } from "@blitzjs/core"
import createTransaction from "app/transactions/mutations/createTransaction"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getTransactions from "app/transactions/queries/getTransactions"
import { ActivityFeed } from "app/core/components"
import { Transaction } from "db"
import { useSymbol } from "app/companies/hooks/useSymbol"
import { usePrice } from "app/prices/hooks/usePrice"
import { useCompany } from "app/companies/hooks/useCompany"
const Suggestion: React.FC<{
  tx: Transaction
  setValue: (key: "isin", val: string) => void
  trigger: () => void
}> = ({ tx, setValue, trigger }): JSX.Element => {
  const { symbol } = useSymbol(tx.assetId)
  const { company } = useCompany(symbol?.symbol)

  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <img
          className="w-10 h-10 rounded"
          alt={`Logo of ${company?.name}`}
          src={company?.logo}
        />
        <div className="flex flex-col items-start truncate ">
          <span className="font-medium text-gray-800 ">{company?.name}</span>
          <span className="text-xs text-gray-600 md:text-sm">{tx.assetId}</span>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-sm text-right text-gray-600">{`added ${Time.ago(
          tx.createdAt.getTime() / 1000,
        )}`}</span>
        <div>
          <Button
            label="Add"
            kind="secondary"
            size="small"
            onClick={() => {
              setValue("isin", tx.assetId)
              trigger()
            }}
          />
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
const NewTransactionPage: BlitzPage = () => {
  const user = useCurrentUser()
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "all", defaultValues: { date: new Date() } })

  const [addTransaction] = useMutation(createTransaction, {
    onSuccess: () => {
      invalidateQuery(getTransactions)
    },
  })
  const [transactions] = useQuery(
    getTransactions,
    {
      userId: user!.id,
    },
    { enabled: !!user, suspense: false },
  )
  const uniqueAssets: Record<string, Transaction> = {}
  transactions
    ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .forEach((tx) => {
      if (!(tx.assetId in uniqueAssets)) {
        uniqueAssets[tx.assetId] = tx
      }
    })
  const data = watch()
  const { symbol } = useSymbol(data.isin)

  const { price, isLoading: priceLoading } = usePrice(
    symbol?.symbol,
    data.date ? Time.fromDate(new Date(data.date)) : undefined,
  )

  const { company, isLoading: companyLoading } = useCompany(symbol?.symbol)

  return (
    <WithSidebar title="Add a transaction" sidebar={<ActivityFeed />}>
      <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-2">
        <div className="w-full">
          <form className="flex flex-col py-6 space-y-4">
            <Radio
              updateValue={(buy) => setValue("buy", buy)}
              options={["Buy", "Sell"]}
            />
            <Input
              type="text"
              label="Isin"
              placeholder="US0123456789"
              iconLeft={
                company ? (
                  <img src={company?.logo} alt={`Logo of ${company?.name}`} />
                ) : companyLoading ? (
                  <Spinner />
                ) : null
              }
              register={register("isin", {
                required: "What did you buy or sell?",

                pattern: {
                  value: /[A-Z]{2}[a-zA-Z0-9]{10}/,
                  message: "Please enter a valid isin",
                },
              })}
              error={errors.isin?.message}
            />

            <Input
              type="date"
              label="Date of transaction"
              register={register("date", {
                required: `When did you ${data.buy ? "buy" : "sell"}?`,
              })}
              error={errors.date?.message}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                label="How many shares?"
                register={register("shares", {
                  required: `How many shares did you ${
                    data.buy ? "buy" : "sell"
                  }?`,
                })}
                error={errors.shares?.message}
              />
              <Value
                label="Price per share"
                value={price && price > 0 ? price.toFixed(2) : ""}
                tooltip="Automatically fetched when all data is entered correctly"
                iconLeft={
                  price ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="font-medium text-gray-700">$</span>
                    </div>
                  ) : priceLoading ? (
                    <Spinner />
                  ) : null
                }
              />
            </div>
            <AsyncButton
              size="auto"
              kind="primary"
              label="Add Transaction"
              onClick={handleSubmit(async (data: FormData) => {
                if (!price) {
                  throw new Error("Wait for price to load")
                }
                await addTransaction({
                  assetId: data.isin.trim(),
                  volume: data.shares * (data.buy ? 1 : -1),
                  value: price,
                  executedAt: Time.fromDate(new Date(data.date)).unix(),
                })
              })}
            />
          </form>
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
    </WithSidebar>
  )
}
NewTransactionPage.authenticate = { redirectTo: Routes.LoginPage().pathname }

export default NewTransactionPage
