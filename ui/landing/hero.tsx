import React, { useState } from "react"
import { useI18n } from "@perfolio/pkg/i18n"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, Form, useForm, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
// import Link from "next/link"
import { Button, Text } from "@perfolio/ui/components"
import { useAuth0 } from "@auth0/auth0-react"

const validation = z.object({
  email: z.string().email(),
})

export const HeroSection: React.FC = (): JSX.Element => {
  const { t } = useI18n()
  const { user } = useAuth0()
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  return (
    <div className="flex flex-col items-center w-full space-y-4 md:space-y-8 xl:space-y-12 ">
      <h1 className="py-3 -my-3 text-3xl font-extrabold text-transparent sm:text-center bg-clip-text bg-gradient-to-tr from-black to-gray-900 sm:text-5xl lg:text-6xl">
        {t("headline")}
      </h1>
      <p className="text-gray-600 sm:text-lg sm:mx-auto md:text-xl lg:mx-0 sm:text-center">
        {t("subheadline")}
      </p>
      {user ? (
        <Button href="/dashboard" kind="cta" size="auto" type="submit">
          Go to dashboard
        </Button>
      ) : done ? (
        <Text align="text-center md:text-left">{t("footerSubsDone")}</Text>
      ) : (
        <Form
          ctx={ctx}
          formError={formError}
          className="flex flex-col items-start gap-4 mt-4 sm:flex-row"
        >
          <Field.Input
            hideLabel
            placeholder={t("footerSubsPlaceMail")}
            name="email"
            type="email"
            label="email"
          />

          <Button
            loading={submitting}
            onClick={() =>
              handleSubmit<z.infer<typeof validation>>(
                ctx,
                async ({ email }) => {
                  const res = await fetch("/api/subscribe", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ email }),
                  })
                  if (res.status === 200) {
                    setDone(true)
                  } else {
                    setFormError(await res.text())
                  }
                },
                setSubmitting,
                setFormError,
              )
            }
            kind="cta"
            size="auto"
            type="submit"
            disabled={submitting}
          >
            Join the waitlist
          </Button>
        </Form>
      )}
    </div>
  )
}
