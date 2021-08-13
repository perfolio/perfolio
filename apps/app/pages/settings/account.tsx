import React, { useState } from "react"
import { NextPage, GetStaticProps } from "next"
import { useForm } from "react-hook-form"
import { AppLayout } from "@perfolio/app/components"
import { z } from "zod"
import { useRouter } from "next/router"
import { Form, handleSubmit } from "@perfolio/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import cn from "classnames"
import { Card, Button } from "@perfolio/ui/components"
import { getTranslations, useI18n } from "@perfolio/feature/i18n"
import { withAuthenticationRequired } from "@auth0/auth0-react"

interface SettingProps {
  validation: z.AnyZodObject
  title: string
  footer: string
  fields: React.ReactNode
  onSubmit: (values: Record<string, string | number>) => Promise<void>
  button?: {
    label?: string
    kind?: string
  }
}

export const Setting: React.FC<SettingProps> = ({
  validation,
  title,
  footer,
  fields,
  onSubmit,
  button,
}): JSX.Element => {
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onBlur",
    resolver: zodResolver(validation),
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title title={title} />
      </Card.Header>

      <Card.Content>
        <Form ctx={ctx} formError={formError}>
          {fields}
        </Form>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Status>{footer}</Card.Footer.Status>
        <Card.Footer.Actions>
          <Button
            loading={submitting}
            // eslint-disable-next-line
            // @ts-ignore
            onClick={() =>
              handleSubmit<z.infer<typeof validation>>(ctx, onSubmit, setSubmitting, setFormError)
            }
            kind={button?.kind ?? "primary"}
            size="sm"
            type="submit"
            disabled={ctx.formState.isSubmitting}
          >
            {button?.label ?? "Save"}
          </Button>
        </Card.Footer.Actions>
      </Card.Footer>
    </Card>
  )
}
interface PageProps {
  translations: Record<string, string>
}
/**
 * / page.
 */
const SettingsPage: NextPage<PageProps> = ({ translations }) => {
  const { t } = useI18n(translations)
  console.log(t("hello")) // @madsjordt remove this line
  const router = useRouter()

  return (
    <AppLayout
      side="left"
      sidebar={
        <div className="mt-4">
          <nav className="flex-grow pb-4 pr-4 md:block md:pb-0 md:overflow-y-auto">
            <ul className="space-y-4">
              <li>
                <Link href="/settings/account">
                  <a
                    className={cn(
                      "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
                      {
                        "font-semibold text-black": router.pathname === "/settings/account",
                        "text-gray-500": router.pathname !== "/settings/account",
                      },
                    )}
                  >
                    Account
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/settings/stocks">
                  <a
                    className={cn(
                      "block px-4 py-2transition duration-500 ease-in-out transform focus:outline-none hover:text-black",
                      {
                        "font-semibold text-black": router.pathname === "/settings/stocks",
                        "text-gray-500": router.pathname !== "/settings/stocks",
                      },
                    )}
                  >
                    Stocks
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    >
      <div className="space-y-8"></div>
    </AppLayout>
  )
}


export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const translations = getTranslations(locale, ["app"])
  return {
    props: {
      translations,
    },
  }
}
export default withAuthenticationRequired(SettingsPage)
