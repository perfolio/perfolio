import React, { useState } from "react"
import { Button } from "@perfolio/ui/components"
import { Form, Field, handleSubmit } from "@perfolio/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignUp } from "@clerk/nextjs"

interface RequestFormProps {
  onSuccess: (email: string) => void
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSuccess }): JSX.Element => {
  const validation = z.object({ email: z.string().email() })
  const signUp = useSignUp()

  const requestContext = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
    defaultValues: { email: "" },
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <>
      <Form ctx={requestContext} formError={formError}>
        <Field.Input label="Email" name="email" type="email" placeholder="andreas@perfol.io" />
      </Form>
      <Button
        loading={submitting}
        // eslint-disable-next-line
        // @ts-ignore
        onClick={() =>
          handleSubmit<z.infer<typeof validation>>(
            requestContext,
            async ({ email }) => {
              await signUp.create({ emailAddress: email })
              await signUp.prepareEmailAddressVerification()

              onSuccess(email)
            },
            setSubmitting,
            setFormError,
          )
        }
        kind="primary"
        size="auto"
        type="submit"
        disabled={requestContext.formState.isSubmitting}
      >
        Sign in
      </Button>
    </>
  )
}
