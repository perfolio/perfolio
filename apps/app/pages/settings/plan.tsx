import React, { useState } from "react"
import { NextPage, GetStaticProps } from "next"
import { AppLayout, SideNavbar } from "@perfolio/app/components"
import { getCurrencySymbol } from "@perfolio/util/currency"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"

import { useRouter } from "next/router"
import { Button, Icon, Text, ToggleGroup } from "@perfolio/ui/components"
import { useUser } from "@perfolio/hooks"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import { Card } from "@perfolio/ui/components"
import { CheckCircleIcon } from "@heroicons/react/solid"

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
  translations: Record<string, string>
}

const ProductCard: React.FC<Product & { selected: "yearly" | "monthly" }> = ({
  features,
  prices,
  selected,
}): JSX.Element => {
  const { t } = useI18n()
  const { user, isLoading } = useUser()
  const router = useRouter()
  return (
    <div className="flex flex-col justify-between space-y-6 lg:flex-row lg:space-y-0">
      <div className="flex flex-col space-y-8 lg:w-3/5 2xl:w-3/4">
        <div className="flex items-center">
          <span className="font-semibold uppercase text-primary whitespace-nowrap">
            {t("setPlanWhatsIncl")}
          </span>
          <div className="flex-grow w-full mx-4 border-b border-primary"></div>
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
      <div className="flex flex-col items-center justify-center p-12 -m-12 space-y-10 lg:w-2/5 2xl:w-1/4 bg-gray-50">
        <div className="flex items-end justify-center">
          <span className="text-5xl font-bold text-gray-800">{`${
            prices[selected].value
          }${getCurrencySymbol(prices[selected].currency)}`}</span>
          <span className="font-semibold text-gray-700 whitespace-nowrap">
            / {prices[selected].interval}
          </span>
        </div>
        <Button
          disabled={!user}
          loading={isLoading}
          onClick={async () => {
            if (!user) {
              console.error(t("setPlanUserError"))
              return
            }
            const res = await fetch(
              `/api/stripe/checkout/${prices[selected].id}?customerId=${user.stripeCustomerId}`,
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
          kind="primary"
          size="auto"
        >
          {t("setPlanSwitchPlanText")}
        </Button>
      </div>
    </div>
  )
}

/**
 * / page.
 */
const Page: NextPage<PageProps> = ({ products, translations }) => {
  const { t } = useI18n(translations)
  const [selected, setSelected] = useState<"monthly" | "yearly">("monthly")
  return (
    <AppLayout side="left" sidebar={<SideNavbar />}>
      <div className="flex flex-col space-y-16">
        <Card>
          <div className="flex flex-col items-center p-8 my-8 space-y-6">
            <h2 className="text-5xl font-black text-gray-900 ">Pricing Plans</h2>

            <Text size="lg">{t("setPlanPickPlanText")}</Text>
            <ToggleGroup
              options={[
                { display: t("setPlanMonthlyBill"), id: "monthly" },
                { display: t("setPlanYearlyBill"), id: "yearly" },
              ]}
              selected={selected}
              setSelected={setSelected}
            />
            <Text size="sm">{t("setPlanYearlyDiscount")}</Text>
          </div>
        </Card>
        {products.map((product) => (
          <Card key={product.id}>
            <Card.Header>
              <Card.Header.Title title={product.name} subtitle={product.description} />
            </Card.Header>
            <Card.Content>
              <ProductCard {...product} selected={selected} />
            </Card.Content>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}
export default withAuthenticationRequired(Page)

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])

  return {
    props: {
      translations,
      products: [
        {
          id: "prod_K8L177Ou3esVrr",
          name: "Pro",
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
          name: "Premium",
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
