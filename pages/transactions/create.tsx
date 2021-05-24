import React from "react"
import { NextPage } from "next"
import { Button, WithSidebar } from "pkg/components"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useForm } from "react-hook-form"
import { AsyncButton, Input } from "pkg/components"
import { SaveIcon } from "@heroicons/react/outline"

interface FormData {
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  /**
   * Submit the data.
   */
  async function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <WithSidebar title="Add a transaction">
      <div className="flex space-x-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="Isin"
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
            type="number"
            label="Price per share"
            register={register("price", {
              required: "Please enter a price",
              min: { value: 0, message: "Must be positive" },
            })}
            error={errors.price?.message}
          />
          <Input
            type="number"
            label="How many shares?"
            register={register("shares", {
              required: "How many shares did you buy or sell?",
            })}
            error={errors.shares?.message}
          />
          <div className="flex items-center justify-between space-x-4">
            <Input
              type="date"
              label="Date of transaction"
              register={register("date", {
                required: "When did you buy or sell?",
              })}
              error={errors.date?.message}
            />
            <Input
              type="time"
              label="Time of transaction"
              register={register("time", {
                required: "When did you buy or sell?",
              })}
              error={errors.time?.message}
            />
          </div>
          <AsyncButton
            type="primary"
            label="Sign in"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
        <div className="w-1/2">
          <div className="relative">
            <div className="md:px-5 xl:px-10">
              <div className="pb-8 border-b border-gray-200">
                <div className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl">
                  <p className="pl-3 font-bold leading-normal text-gray-800">
                    Suggestions
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 md:px-5 xl:px-10">
              <div className="space-y-8">
                <div className="flex items-center justify-start space-x-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full">
                      <img
                        className="rounded-full"
                        src="https://storage.googleapis.com/iex/api/logos/TSLA.png"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium leading-none text-gray-800">
                        Tesla Inc.
                      </p>
                      <p className="pl-3 text-xs leading-3 text-gray-500">
                        2 min ago
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">$ 499.41</span>
                      <span className="px-2 py-1 text-xs rounded-full text-success-700 bg-success-100">
                        +6,45 (+1,36 %)
                      </span>
                    </div>
                  </div>
                  <Button
                    size="small"
                    prefix={<SaveIcon />}
                    type="secondary"
                    label="Import"
                    onClick={() => {
                      console.log("a")
                    }}
                  />
                </div>
                <div className="flex items-center justify-start space-x-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full">
                      <img
                        className="rounded-full"
                        src="https://storage.googleapis.com/iex/api/logos/MSFT.png"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium leading-none text-gray-800">
                        Microsoft Inc.
                      </p>
                      <p className="pl-3 text-xs leading-3 text-gray-500">
                        4 hours ago
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">$ 1412.19</span>
                      <span className="px-2 py-1 text-xs rounded-full text-error-700 bg-error-100">
                        -5.51 (-2,36 %)
                      </span>
                    </div>
                  </div>
                  <Button
                    size="small"
                    prefix={<SaveIcon />}
                    type="secondary"
                    label="Import"
                    onClick={() => {
                      console.log("a")
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithSidebar>
  )
}

export default Page

export const getServerSideProps = withPageAuthRequired()
