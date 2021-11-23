import { zodResolver } from "@hookform/resolvers/zod"
import { useI18n } from "@perfolio/pkg/i18n"
import { Field, Form, handleSubmit, useForm } from "@perfolio/ui/form"
import React, { useState } from "react"
import { z } from "zod"
// import Link from "next/link"
import { useAuth0 } from "@auth0/auth0-react"
import { useSubscribeToNewsletter } from "@perfolio/pkg/hooks"
import { Button, Drawer, Heading, Text } from "@perfolio/ui/components"
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
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const subscribe = useSubscribeToNewsletter()
  return (
    <div className="flex flex-col items-center w-full space-y-4 text-center md:space-y-8 xl:space-y-12">
      <Drawer
        title="Join the waitlist"
        subtitle="We will invite you as soon as possible"
        open={open}
        setOpen={setOpen}
      >
        {done ? <Text align="text-center">Thank you, we'll get back to you</Text> : (
          <Form
            ctx={ctx}
            formError={formError}
            className="flex flex-col items-start gap-4 sm:flex-row"
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
                    await subscribe
                      .mutateAsync({ email })
                      .catch((err) => {
                        setFormError(err.message)
                      })
                      .finally(() => {
                        setDone(true)
                        setTimeout(() => setOpen(false), 1000)
                      })
                  },
                  setSubmitting,
                  setFormError,
                )}
              type="cta"
              disabled={submitting}
            >
              Join the waitlist
            </Button>
          </Form>
        )}
      </Drawer>
      <Heading h1>{t("headline")}</Heading>
      <Text>{t("subheadline")}</Text>
      {user
        ? (
          <div>
            <Button href="/dashboard" type="cta" size="block">
              Go to dashboard
            </Button>
          </div>
        )
        : (
          <div className="pt-8 md:pt-4">
            <div className="flex items-center justify-center md:hidden">
              <Button
                onClick={() => {
                  setOpen(true)
                }}
                type="plain"
                size="lg"
                htmlType="submit"
              >
                Subscribe
              </Button>
              <Button href="/dashboard" type="cta" size="lg">
                Sign in
              </Button>
            </div>
            <div className="hidden md:block">
              {done
                ? <Text align="text-center">Thank you, we'll get back to you</Text>
                : (
                  <Form
                    ctx={ctx}
                    formError={formError}
                    className="flex flex-col items-start gap-4 sm:flex-row"
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
                            await subscribe
                              .mutateAsync({ email })
                              .catch((err) => {
                                setFormError(err.message)
                              })
                              .finally(() => {
                                setDone(true)
                              })
                          },
                          setSubmitting,
                          setFormError,
                        )}
                      type="cta"
                      size="block"
                      htmlType="submit"
                      disabled={submitting}
                    >
                      Join the waitlist
                    </Button>
                  </Form>
                )}
            </div>
          </div>
        )}
    </div>
  )
}
