import React, { useState } from "react"
import { Button, Text, Heading, Loading } from "@perfolio/ui/components"
import { Form, Field, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useVerifyRequest } from "@perfolio/hooks"

interface VerifyFormProps {
  onSuccess: () => void
  email: string
}

export const VerifyForm: React.FC<VerifyFormProps> = ({ onSuccess, email }): JSX.Element => {
  const validation = z.object({
    0: z.string().regex(/^[\d]{1}$/),
    1: z.string().regex(/^[\d]{1}$/),
    2: z.string().regex(/^[\d]{1}$/),
    3: z.string().regex(/^[\d]{1}$/),
    4: z.string().regex(/^[\d]{1}$/),
    5: z.string().regex(/^[\d]{1}$/),
  })

  const [focus, setFocus] = useState(0)

  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })
  const verifyRequest = useVerifyRequest()
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="w-full">
      <div className="space-y-4 text-center">
        <Heading h2>OTP Verification</Heading>
        <Text>Please enter the OTP you received in your email</Text>
        <Text bold>{email}</Text>
      </div>
      {submitting ? (
        <Loading />
      ) : (
        <div>
          <Form ctx={ctx} formError={formError} className="flex items-start justify-between mt-12">
            {new Array(6).fill(0).map((_, i) => (
              <Field.Digit
                key={i}
                setFocusOnMe={() => setFocus(i)}
                name={i.toString()}
                focus={focus === i}
                onChange={async () => {
                  setFocus(i + 1)

                  if (i === 5) {
                    // There's a weird bug where the last digit is not set to local state yet
                    // so we wait a little
                    await new Promise((resolve) => setTimeout(resolve, 100))
                    await handleSubmit<z.infer<typeof validation>>(
                      ctx,
                      async (digits) => {
                        await verifyRequest.mutateAsync({
                          email,
                          otp: Object.values(digits).join(""),
                        })
                        onSuccess()
                      },
                      setSubmitting,
                      setFormError,
                    )
                  }
                }}
              />
            ))}
          </Form>

          <div className="mt-8">
            <Button
              loading={submitting}
              // eslint-disable-next-line
              // @ts-ignore
              onClick={() =>
                handleSubmit<z.infer<typeof validation>>(
                  ctx,
                  async (digits) => {
                    await verifyRequest.mutateAsync({ email, otp: Object.values(digits).join("") })
                    onSuccess()
                  },
                  setSubmitting,
                  setFormError,
                )
              }
              kind="primary"
              size="auto"
              type="submit"
              disabled={ctx.formState.isSubmitting}
            >
              Sign in
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
