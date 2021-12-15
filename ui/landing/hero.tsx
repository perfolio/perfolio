import { zodResolver } from "@hookform/resolvers/zod"
import { useI18n } from "next-localization"

import { Field, Form, handleSubmit, useForm } from "@perfolio/ui/form"
import React, { useState } from "react"
import { z } from "zod"
import { useSubscribeToNewsletter, useUser } from "@perfolio/pkg/hooks"
import { Button, Drawer, Heading, Text } from "@perfolio/ui/components"
import { Transition } from "@headlessui/react"
const validation = z.object({
  email: z.string().email(),
})

export const HeroSection: React.FC = (): JSX.Element => {
  const { t } = useI18n()
  const { user } = useUser()
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
        isOpen={open}
        close={() => setOpen(false)}
      >
        {done ? (
          <Text align="text-center">Thank you, we&#39;ll get back to you</Text>
        ) : (
          <Form
            ctx={ctx}
            formError={formError}
            className="flex flex-col items-start gap-4 sm:flex-row"
          >
            <Field.Input hideLabel name="email" type="email" label="email" />

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
                )
              }
              type="cta"
              disabled={submitting}
            >
              Join the waitlist
            </Button>
          </Form>
        )}
      </Drawer>
      <Transition
        appear={true}
        show={true}
        enter="ease-in-out duration-1000"
        enterFrom="opacity-0 -translate-y-full scale-75"
        enterTo="opacity-100"
      >
        <Heading h1>{t("landing.headline")}</Heading>
      </Transition>
      <Transition
        appear={true}
        show={true}
        enter="ease-in-out duration-1000 delay-150"
        enterFrom="opacity-0 -translate-y-full scale-75"
        enterTo="opacity-100"
      >
        <Text>{t("landing.subheadline")}</Text>
      </Transition>
      <Transition
        appear={true}
        show={true}
        enter="ease-in-out duration-1000 delay-1000"
        enterFrom="opacity-0 "
        enterTo="opacity-100"
        leave="ease-in-out duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {user ? (
          <div>
            <Button href="/dashboard" type="cta" size="block">
              Go to dashboard
            </Button>
          </div>
        ) : (
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
              {done ? (
                <Text align="text-center">Thank you, we&#39;ll get back to you</Text>
              ) : (
                <Form
                  ctx={ctx}
                  formError={formError}
                  className="flex flex-col items-start gap-4 sm:flex-row"
                >
                  <Field.Input
                    hideLabel
                    placeholder={t("landing.footerSubsPlaceMail")}
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
                      )
                    }
                    type="cta"
                    size="block"
                    disabled={submitting}
                  >
                    Join the waitlist
                  </Button>
                </Form>
              )}
            </div>
          </div>
        )}
      </Transition>
    </div>
  )
}
