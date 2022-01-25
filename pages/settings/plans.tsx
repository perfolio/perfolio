import { useI18n } from "next-localization"
import { getCurrencySymbol } from "@perfolio/pkg/util/currency"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { GetStaticProps, NextPage } from "next"
import React, { useState } from "react"
import fs from "fs"
import { useUser } from "@perfolio/pkg/hooks"
import { Button, Text, ToggleGroup } from "@perfolio/ui/components"
import { useRouter } from "next/router"
import { CheckCircleIcon } from "@heroicons/react/solid"
import { Card } from "@perfolio/ui/components"

type Price = {
  id: string
  value: number
  currency: string
  interval: string
}

type Product = {
  id: string
  name: string
  description: string
  features: string[]
  prices: {
    yearly: Price
    monthly: Price
  }
}

type PageProps = {
  products: Product[]
}

const ProductCard: React.FC<Product & { selected: "yearly" | "monthly" }> = ({
  features,
  prices,
  selected,
  name,
  description,
}): JSX.Element => {
  const { t } = useI18n()
  const { user, isLoading } = useUser()
  const router = useRouter()
  return (
    <Card border={false}>
      <div className="relative">
        <div className="relative mx-auto">
          <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
            <div className="flex-1 bg-white px-6 py-8 lg:p-12">
              <Card.Header.Title title={name} subtitle={description} />
              <div className="mt-8">
                <div className="flex items-center">
                  <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-primary">
                    What&#39;s included
                  </h4>
                  <div className="flex-1 border-t-2 border-gray-200" />
                </div>
                <ul
                  role="list"
                  className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                >
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start lg:col-span-1">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-success" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
              <p className="text-lg leading-6 font-medium text-gray-900">Lorem ipsum</p>
              <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                <span>
                  {" "}
                  {`${prices[selected].value}${getCurrencySymbol(prices[selected].currency)}`}
                </span>

                <span className="ml-3 text-xl font-medium text-gray-500">
                  / {prices[selected].interval}
                </span>
              </div>
              <p className="mt-4 text-sm">
                <a href="#" className="font-medium text-gray-500 underline">
                  Learn about our membership policy
                </a>
              </p>
              <div className="mt-6">
                <Button
                  disabled={!user}
                  size="block"
                  loading={isLoading}
                  onClick={async () => {
                    if (!user) {
                      console.error(t("app.setPlanUserError"))
                      return
                    }
                    const res = await fetch(
                      `/api/stripe/checkout?priceId=${prices[selected].id}&customerId=${user.stripeCustomerId}`,
                      {
                        method: "POST",
                      },
                    )
                    if (res.status !== 200) {
                      console.error(res.body)
                    }
                    const { url } = (await res.json()) as { url: string }
                    router.push(url)
                  }}
                  type="primary"
                >
                  {t("app.setPlanSwitchPlanText")}
                </Button>
              </div>
              {/* <div className="mt-4 text-sm">
                <a href="#" className="font-medium text-gray-900">
                  Get a free sample <span className="font-normal text-gray-500">(20MB)</span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * / page.
 */
const Page: NextPage<PageProps> = ({ products }) => {
  const { t } = useI18n()
  const [selected, setSelected] = useState<"monthly" | "yearly">("monthly")
  return (
    <AppLayout side="left" sidebar={<SideNavbar />}>
      <div className="flex flex-col space-y-16">
        <Card>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:py-20 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Pricing Plans
                </p>
                <div className="space-y-6">
                  <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    {t("app.setPlanPickPlanText")}
                  </p>
                  <div className="max-w-xl mx-auto">
                    <ToggleGroup
                      options={[
                        { display: t("app.setPlanMonthlyBill"), id: "monthly" },
                        { display: t("app.setPlanYearlyBill"), id: "yearly" },
                      ]}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>
                  <Text size="sm">{t("app.setPlanYearlyDiscount")}</Text>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} selected={selected} />
        ))}
      </div>
    </AppLayout>
  )
}
export default Page

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  return {
    props: {
      translations: JSON.parse(fs.readFileSync(`public/locales/${locale}.json`).toString()),
      products: [
        {
          id: "prod_K8L177Ou3esVrr",
          name: "Growth",
          description:
            "Morbi non lacinia risus. Suspendisse placerat metus sit amet orci scelerisque condimentum. Suspendisse nulla quam, dignissim id sagittis a, ornare ac augue. Vivamus semper, leo quis volutpat luctus, nisi libero.",
          features: ["This", "That", "Stuff"],
          prices: {
            monthly: {
              id: "price_1JU4LpG0ZLpKb1P6Szj2jJQr",
              value: 3.99,
              currency: "eur",
              interval: "month",
            },
            yearly: {
              id: "price_1JU4n4G0ZLpKb1P65qQfaxEU",
              value: 40,
              currency: "eur",
              interval: "year",
            },
          },
        },
        {
          id: "prod_K8L2zOY0pLY68n",
          name: "Pro",
          description:
            "Nulla aliquet ullamcorper dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus lobortis metus nunc, eget ornare elit condimentum a. Class aptent taciti sociosqu.",
          features: ["This", "That", "Stuff"],
          prices: {
            monthly: {
              id: "price_1JU4M7G0ZLpKb1P6kaSvfWFb",
              value: 8.99,
              currency: "eur",
              interval: "month",
            },
            yearly: {
              id: "price_1JU4nXG0ZLpKb1P6RqBKwdZC",
              value: 90,
              currency: "eur",
              interval: "year",
            },
          },
        },
      ],
    },
  }
}
