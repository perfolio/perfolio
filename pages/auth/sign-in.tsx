import { useState } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"
import { magic } from "@perfolio/pkg/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useI18n } from "next-localization"

import { Field, Form, handleSubmit, useForm } from "@perfolio/ui/form"
import { z } from "zod"
// import Link from "next/link"
import { Button } from "@perfolio/ui/components"

const validation = z.object({
  email: z.string().email(),
})

const SigninPage: NextPage = () => {
  const { t } = useI18n()

  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  return (
    <Form ctx={ctx} formError={formError} className="flex flex-col items-start gap-4 sm:flex-row">
      <Field.Input
        hideLabel
        placeholder={t("landing.footerSubsPlaceMail")}
        name="email"
        type="email"
        label="email"
      />

      <Button
        loading={submitting}
        disabled={submitting}
        onClick={() =>
          handleSubmit<z.infer<typeof validation>>(
            ctx,
            async ({ email }) => {
              const didToken = await magic.auth.loginWithMagicLink({
                email,
                redirectURI:
                  typeof window !== "undefined"
                    ? new URL("/dashboard", window.location.origin).href
                    : "/",
              })

              fetch("/api/auth/sign-in", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${didToken}`,
                },
              })
                .then(() => {
                  router.push("/dashboard")
                })
                .catch((err) => {
                  setFormError(err.message)
                })
            },
            setSubmitting,
            setFormError,
          )
        }
        type="cta"
        size="block"
      >
        Sign in
      </Button>
    </Form>
  )
}

export default SigninPage
