import React, { useState } from "react"
import { NextPage } from "next"
import { Logo, Button } from "@perfolio/ui/components"
import { z } from "zod"
import { Form, Field, handleSubmit } from "@perfolio/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Description } from "@perfolio/ui/components"
import { useSubscribeToNewsletter } from "@perfolio/hooks"

const Subscribe: NextPage = () => {
  const validation = z.object({ email: z.string().email() })

  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
    defaultValues: { email: "" },
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = useSubscribeToNewsletter()

  return (
    <section className="relative w-screen h-screen bg-white ">
      <div className="container w-full h-full mx-auto">
        <div className="flex flex-col items-center justify-center w-full h-full md:flex-row">
          <div className="relative items-center justify-center hidden w-2/3 h-full md:flex md:flex-col bg-gradient-to-r from-white to-gray-100">
            <div className="absolute inset-y-0 items-center justify-center hidden md:flex">
              <svg
                className="z-0 w-full h-full p-8 text-gray-100 fill-current"
                viewBox="0 0 354 283"
                fill="fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M247.35 70.671L176.678 0 0 176.678l35.336 35.336L176.678 70.671l35.336 35.336 35.336-35.336zM106.007 212.014l70.671 70.671 176.679-176.678-35.336-35.336-141.343 141.343-35.335-35.336-35.336 35.336z" />
              </svg>
            </div>
            <div className="z-50 flex flex-col items-center justify-center px-8 space-y-4 tracking-tight text-center md:text-left md:items-start md:justify-start md:max-w-3xl">
              <h1 className="text-4xl font-bold text-gray-900 xl:text-7xl">Stay in touch</h1>
              <h2 className="text-lg font-normal text-gray-500 ">description</h2>
            </div>
          </div>
          <div className="w-full max-w-sm px-6 space-y-4">
            {subscribed ? (
              <Description title="Thank you!">We will be in touch</Description>
            ) : (
              <>
                <Form ctx={ctx} formError={formError}>
                  <Field.Input label="Email" name="email" type="email" />
                </Form>
                <Button
                  loading={submitting}
                  // eslint-disable-next-line
                  // @ts-ignore
                  onClick={() =>
                    handleSubmit<z.infer<typeof validation>>(
                      ctx,
                      async ({ email }) => {
                        await subscribe.mutateAsync({ email })
                        setSubscribed(true)
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
                  Subscribe
                </Button>
              </>
            )}
          </div>
          <div className="absolute flex items-center justify-between w-full md:hidden top-12">
            <span className="w-4/5 border-b border-primary00"></span>

            <span className="flex justify-center w-full text-gray-900 md:hidden ">
              <Logo withName />
            </span>

            <span className="w-4/5 border-b border-primary00"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
