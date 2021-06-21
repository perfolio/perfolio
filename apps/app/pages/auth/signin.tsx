import React, { useState } from "react"
import { NextPage, GetServerSideProps } from "next"
import { signIn, getSession } from "next-auth/client"
import { Logo, Button, Form2, LabeledField, handleSubmit } from "@perfolio/components"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const SigninPage: NextPage = () => {
  const validation = z.object({ email: z.string().email() })

  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
    defaultValues: { email: "" },
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <section className="relative w-screen h-screen bg-white ">
      <div className="container w-full h-full mx-auto">
        <div className="flex flex-col items-center justify-center h-full md:flex-row">
          <div className="relative items-center justify-center hidden w-2/3 h-full md:flex md:flex-col bg-gradient-to-r from-white to-gray-100">
            <div className="absolute inset-y-0 items-center justify-center hidden md:flex">
              <svg
                className="z-0 w-full h-full p-8 text-gray-100 stroke-current"
                viewBox="0 0 194 148"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 106.208L97.3883 17.8199L134.158 54.5894M185.07 41.8615L96.6814 130.25L59.9118 93.4803"
                  strokeWidth="25"
                />
              </svg>
            </div>
            <div className="z-50 flex flex-col items-center justify-center px-8 space-y-4 tracking-tight text-center md:text-left md:items-start md:justify-start md:max-w-3xl">
              <h1 className="text-4xl font-bold text-gray-900 xl:text-7xl">Sign in</h1>
              <h2 className="text-lg font-normal text-gray-500 ">Kevin ist ein frischer Hecht!</h2>
            </div>
          </div>
          <div className="w-1/3 px-6 mx-auto space-y-4">
            <Form2 ctx={ctx} formError={formError}>
              <LabeledField label="Email" name="email" type="email" />
            </Form2>
            <Button
              loading={submitting}
              // eslint-disable-next-line
              // @ts-ignore
              onClick={() =>
                handleSubmit<z.infer<typeof validation>>(
                  ctx,
                  async ({ email }) => {
                    await signIn("email", { email })
                  },
                  setSubmitting,
                  setFormError,
                )
              }
              kind="primary"
              size="auto"
              label="Sign in"
              type="submit"
              disabled={ctx.formState.isSubmitting}
            />
          </div>
          <div className="absolute flex items-center justify-between w-full md:hidden top-12">
            <span className="w-4/5 border-b border-primary-600"></span>

            <span className="flex justify-center w-full text-gray-900 md:hidden ">
              <Logo withName />
            </span>

            <span className="w-4/5 border-b border-primary-600"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  console.log({ session })
  if (session) {
    res.writeHead(302, { Location: "/" })
    res.end()
  }
  return { props: {} }
}
export default SigninPage
