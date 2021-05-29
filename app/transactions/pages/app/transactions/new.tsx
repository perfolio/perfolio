import React, { Fragment } from "react"
import { Button, WithSidebar, Radio, AsyncButton, Input, Value, Spinner } from "app/core/components"
import { useForm } from "react-hook-form"
import { useQuery } from "blitz"
import getPrice from "app/prices/queries/getPrice"
import getCompany from "app/companies/queries/getCompany"
import { Time } from "pkg/time"
import { Listbox, Transition } from "@headlessui/react"
import { BlitzPage, Routes, invalidateQuery, useMutation } from "@blitzjs/core"
import createTransaction from "app/transactions/mutations/createTransaction"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getTransactions from "app/transactions/queries/getTransactions"
import { ActivityFeed } from "app/core/components"
import { Transaction } from "db"
import getPossibleSymbols from "app/companies/queries/getPossibleSymbols"
import { SelectorIcon, CheckIcon } from "@heroicons/react/outline"
const Suggestion: React.FC<{
  tx: Transaction
  setValue: (key: "isin", val: string) => void
  trigger: () => void
}> = ({ tx, setValue, trigger }): JSX.Element => {
  const [company] = useQuery(
    getCompany,
    {
      isin: tx.assetId,
    },
    { suspense: false },
  )

  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <img className="w-10 h-10 rounded" alt={`Logo of ${company?.name}`} src={company?.logo} />
        <div className="flex flex-col items-start ">
          <span className="font-medium text-gray-800">{company?.name}</span>
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
  symbol: string
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
  const [price, { isLoading: priceLoading }] = useQuery(
    getPrice,
    {
      isin: data.isin,
      time: Time.fromDate(new Date(data.date)).unix(),
    },
    { enabled: !!data.isin && !!data.date, suspense: false },
  )

  const [company, { isLoading: companyLoading }] = useQuery(
    getCompany,
    {
      isin: data.isin,
    },
    { enabled: !!data.isin, suspense: false },
  )

  const [possibleSymbols] = useQuery(
    getPossibleSymbols,
    { isin: data.isin },
    { enabled: !!data.isin, suspense: false },
  )

  return (
    <WithSidebar title="Add a transaction" sidebar={<ActivityFeed />}>
      <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-2">
        <div className="w-full">
          <form className="flex flex-col py-6 space-y-4">
            <Radio updateValue={(buy) => setValue("buy", buy)} options={["Buy", "Sell"]} />
            <Input
              type="text"
              label="Isin"
              placeholder="US0123456789"
              iconLeft={
                company ? (
                  <img src={company.logo} alt={`Logo of ${company.name}`} />
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
            {possibleSymbols ? (
              <div className="relative w-full">
                <Listbox value={data.symbol} onChange={(e) => setValue("symbol", e)}>
                  <Listbox.Button className="relative w-full h-12 px-3 text-center placeholder-gray-500 transition duration-300 border rounded focus:shadow focus:outline-none">
                    <span className="block truncate">{data.symbol}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto text-base origin-top-right bg-white rounded shadow-lg rigin-top-right max-h-96 ">
                      {possibleSymbols.map((symbol) => (
                        <Listbox.Option
                          key={symbol.symbol}
                          className={({ active }) =>
                            `${active ? "text-gray-900 bg-gray-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 px-4`
                          }
                          value={symbol.symbol}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? "font-medium" : "font-normal"
                                } truncate flex justify-between items-center font-mono`}
                              >
                                <div>
                                  <span className="text-xs text-gray-600">Symbol: </span>
                                  <span className="font-medium text-gray-900">{symbol.symbol}</span>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-600">Exchange: </span>
                                  <span className="font-medium text-gray-900">
                                    {symbol.exchange}
                                  </span>
                                </div>
                              </span>
                              {selected ? (
                                <span
                                  className={`${active ? "text-primary-600" : "text-primary-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
            ) : null}
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
                  required: `How many shares did you ${data.buy ? "buy" : "sell"}?`,
                })}
                error={errors.shares?.message}
              />
              <Value
                label="Price per share"
                value={price && price.value > 0 ? price.value : ""}
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
                  assetId: data.isin,
                  volume: data.shares * (data.buy ? 1 : -1),
                  value: price.value,
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
