import { useI18n } from "next-localization"

import { getCurrencySymbol } from "@perfolio/pkg/util/currency"
import { AppLayout, SideNavbar } from "@perfolio/ui/app"
import { GetStaticProps, NextPage } from "next"
import React, { useState } from "react"
import fs from "fs"
import { useUser } from "@perfolio/pkg/hooks"
import { Button, Icon, Text, ToggleGroup } from "@perfolio/ui/components"
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
    <Card>
      <div className="relative flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 2xl:w-3/4">
          <Card.Header>
            <Card.Header.Title title={name} subtitle={description} />
          </Card.Header>
          <Card.Content>
            <div className="flex flex-col justify-between space-y-6 lg:flex-row lg:space-y-0">
              <div className="flex flex-col w-full space-y-8">
                <div className="flex items-center">
                  <span className="font-semibold uppercase text-primary whitespace-nowrap">
                    {t("app.setPlanWhatsIncl")}
                  </span>
                  <div className="grow w-full mx-4 border-b border-primary"></div>
                </div>
                <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Icon label="Checkmark" size="xs">
                        <CheckCircleIcon className="text-success" />
                      </Icon>
                      <Text>{feature}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card.Content>
        </div>
        <div className="flex flex-col items-center justify-center h-full p-12 space-y-10 lg:absolute lg:right-0 lg:inset-y-0 lg:w-2/5 2xl:w-1/4 bg-gray-50">
          <div className="flex items-end justify-center">
            <span className="text-5xl font-bold text-gray-800">
              {`${prices[selected].value}${getCurrencySymbol(prices[selected].currency)}`}
            </span>
            <span className="font-semibold text-gray-700 whitespace-nowrap">
              / {prices[selected].interval}
            </span>
          </div>
          <Button
            disabled={!user}
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
          <div className="flex flex-col items-center p-8 my-8 space-y-6 text-center">
            <Card.Header>
              <Card.Header.Title
                title="Pricing Plans"
                subtitle={t("app.setPlanPickPlanText")}
              ></Card.Header.Title>
            </Card.Header>
            <ToggleGroup
              options={[
                { display: t("app.setPlanMonthlyBill"), id: "monthly" },
                { display: t("app.setPlanYearlyBill"), id: "yearly" },
              ]}
              selected={selected}
              setSelected={setSelected}
            />
            <Text size="sm">{t("app.setPlanYearlyDiscount")}</Text>
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
