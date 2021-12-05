import React, { useState } from "react"
import { z } from "zod"

import { withAuthenticationRequired } from "@auth0/auth0-react"
import { CheckIcon } from "@heroicons/react/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { Asset } from "@perfolio/pkg/api"
import { getTranslations, useI18n } from "@perfolio/pkg/i18n"
import { getCurrencySymbol } from "@perfolio/pkg/util/currency"
import { Time } from "@perfolio/pkg/util/time"
import { AppLayout, Main, Sidebar } from "@perfolio/ui/app"
import { Button, Description } from "@perfolio/ui/components"
import { Field, Form, handleSubmit, useForm } from "@perfolio/ui/form"
import { GetStaticProps, NextPage } from "next"
import Link from "next/link"

import {
  useCreateExchangeTradedAsset,
  useCreateTransaction,
  usePortfolio,
  useUser,
} from "@perfolio/pkg/hooks"
import { useToaster } from "@perfolio/pkg/toaster"
import { useRouter } from "next/router"
const validation = z.object({
  assetId: z.string(),
  volume: z.string().transform((x: string) => parseFloat(x)),
  value: z.string().transform((x: string) => parseFloat(x)),
  executedAt: z.string().transform((x: string) => Time.fromDate(new Date(x)).unix()),
})

const createAssetValidation = z.object({
  isin: z.string(),
})

/**
 * / page.
 */

interface PageProps {
  translations: Record<string, string>
}

const NewTransactionPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  const { user } = useUser()
  const { addToast } = useToaster()
  const router = useRouter()
  const portfolioId = router.query["portfolioId"] as string
  const newTransactionContext = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const createAssetContext = useForm<z.infer<typeof createAssetValidation>>({
    mode: "onBlur",
    resolver: zodResolver(createAssetValidation),
  })
  const createExchangeTradedAsset = useCreateExchangeTradedAsset()
  const createTransaction = useCreateTransaction()
  const { portfolio } = usePortfolio()
  const uniqueAssets: Record<string, Asset> = {}
  ;(portfolio?.transactions ?? [])
    .sort((a, b) => b.executedAt - a.executedAt)
    .forEach((tx) => {
      if (!(tx.asset.id in uniqueAssets)) {
        uniqueAssets[tx.asset.id] = tx.asset as Asset
      }
    })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)

  return (
    <AppLayout
      sidebar={
        <Sidebar>
          <Form
            ctx={createAssetContext}
            formError={formError}
            className="grid w-full grid-cols-1 gap-8 md:gap-10 lg:gap-12"
          >
            <Field.Input name="isin" label="Add new asset by isin" type="text" />

            <Button
              loading={submitting}
              onClick={() =>
                handleSubmit<z.infer<typeof createAssetValidation>>(
                  createAssetContext,
                  async ({ isin }) => {
                    await createExchangeTradedAsset.mutateAsync({ isin }).catch((err) => {
                      setFormError(t("transNewFormError") + `${err.toString()}`)
                    })
                    addToast({
                      icon: <CheckIcon />,
                      role: "info",
                      title: "Asset added",
                      content: `It will be available in the search in a few minutes`,
                      ttl: 30,
                    })
                  },
                  setSubmitting,
                  setFormError,
                )
              }
              size="block"
              type="secondary"
            >
              Add asset
            </Button>
          </Form>
        </Sidebar>
      }
    >
      <Main>
        <Main.Header>
          <Main.Header.Title title={t("transNewHeader")} />
        </Main.Header>
        <Main.Content>
          <div className="grid grid-cols-1 gap-8 divide-y divide-gray-200 md:gap-10 lg:gap-12 lg:divide-x lg:divide-y-0 lg:grid-cols-1">
            <div className="w-full">
              <Form
                ctx={newTransactionContext}
                formError={formError}
                className="grid w-full grid-cols-1 gap-8 md:gap-10 lg:gap-12"
              >
                <Field.AutoCompleteSelect
                  name="assetId"
                  label={t("transNewAssetLabel")}
                  help={
                    <Description title={t("transNewFieldDescrTitle")}>
                      {t("transNewFieldDescr")}
                      <Link href="/settings/stocks">
                        <a className="underline text-info-400">{t("transNewFieldDescrLink")}</a>
                      </Link>
                    </Description>
                  }
                />

                <Field.Input
                  name="executedAt"
                  label={t("transNewDateOfTrans")}
                  type="date"
                  // iconLeft={<MailIcon />}
                />

                <div className="grid grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                  <Field.Input
                    name="volume"
                    label={t("transNewNumberShares")}
                    type="number"
                    // iconLeft={<LockClosedIcon />}
                  />
                  <Field.Input
                    name="value"
                    label={t("transNewCostPerShare")}
                    type="number"
                    iconLeft={
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="font-medium text-gray-700">
                          {getCurrencySymbol(user?.settings?.defaultCurrency)}
                        </span>
                      </div>
                    }
                  />
                </div>

                <Button
                  loading={submitting}
                  onClick={() =>
                    handleSubmit<z.infer<typeof validation>>(
                      newTransactionContext,
                      async ({ assetId, volume, value, executedAt }) => {
                        const transaction = {
                          portfolioId,
                          volume: Number(volume),
                          value: Number(value),
                          executedAt: Time.fromString(executedAt as unknown as string).unix(),
                          assetId: assetId,
                          mic: user?.settings?.defaultExchange.mic,
                        }
                        await createTransaction.mutateAsync({ transaction }).catch((err) => {
                          setFormError(t("transNewFormError") + `${err.toString()}`)
                        })
                        addToast({
                          icon: <CheckIcon />,
                          role: "info",
                          title: t("transNewTransAdded"),
                          content: `You ${
                            volume > 0 ? "bought" : "sold"
                          } ${volume} shares of ${assetId}`,
                        })
                      },
                      setSubmitting,
                      setFormError,
                    )
                  }
                  size="block"
                  type="primary"
                >
                  {t("transNewAddTrans")}
                </Button>
              </Form>
            </div>
          </div>
        </Main.Content>
      </Main>
    </AppLayout>
  )
}
export default withAuthenticationRequired(NewTransactionPage)

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = await getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
