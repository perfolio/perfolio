import React from "react"
import { NextPage } from "next"
import {
  Button,
  WithSidebar,
  Radio,
  AsyncButton,
  Input,
  Value,
  Spinner,
} from "pkg/components"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useForm } from "react-hook-form"
import { usePrice, useCompany } from "pkg/hooks"
import { Time } from "pkg/time"

interface FormData {
  buy: boolean
  isin: string
  price: number
  shares: number
  date: Date
  time: Date
}

/**
 * / page.
 */
const Page: NextPage = () => {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "all", defaultValues: { date: new Date() } })

  /**
   * Submit the data.
   */
  async function onSubmit(data: FormData) {
    console.debug(data)
  }
  const data = watch()
  const { data: price, isLoading: priceLoading } = usePrice({
    isin: data.isin,
    time: Time.fromDate(new Date(data.date)),
  })

  const { data: company, isLoading: companyLoading } = useCompany({
    isin: data.isin,
  })

  return (
    <WithSidebar title="Add a transaction">
      <div className="grid grid-cols-1 divide-y divide-gray-200 lg:gap-8 lg:divide-x lg:divide-y-0 lg:grid-cols-2">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col py-6 space-y-4"
          >
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
                  <img src={company.logo} />
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
                value={price && price > 0 ? price : ""}
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
              type="primary"
              label="Add Transaction"
              onClick={handleSubmit(onSubmit)}
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
                <li className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-10 h-10 rounded"
                      src="https://storage.googleapis.com/iex/api/logos/TSLA.png"
                    />
                    <div className="flex flex-col items-start ">
                      <div className="flex items-center space-x-3 text-sm leading-none">
                        <span className="font-semibold text-gray-800">
                          Tesla Inc.
                        </span>
                        <span className="text-sm text-gray-700">$3015.24</span>
                      </div>
                      <span className="text-xs leading-none text-gray-600 md:text-sm">
                        US88160R1014
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-sm text-right text-gray-600">
                      Added 1 month ago
                    </span>
                    <Button
                      label="Add"
                      type="secondary"
                      size="small"
                      onClick={() => {
                        setValue("isin", "US88160R1014")
                        setValue("shares", data.shares ?? 1)
                        trigger("isin")
                      }}
                    />
                  </div>
                </li>
                <li className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-10 h-10 rounded"
                      src="https://storage.googleapis.com/iex/api/logos/AAPL.png"
                    />
                    <div className="flex flex-col items-start ">
                      <div className="flex items-center space-x-3 text-sm leading-none">
                        <span className="font-semibold text-gray-800">
                          Apple
                        </span>
                        <span className="text-sm text-gray-700">$152.12</span>
                      </div>
                      <span className="text-xs leading-none text-gray-600 md:text-sm">
                        US0378331005
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-sm text-right text-gray-600">
                      Added 2 weeks ago
                    </span>
                    <Button
                      label="Add"
                      type="secondary"
                      size="small"
                      onClick={() => {
                        setValue("isin", "US0378331005")
                        setValue("shares", data.shares ?? 1)
                        trigger("isin")
                      }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WithSidebar>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
