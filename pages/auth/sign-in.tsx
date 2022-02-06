import React, { useState } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"
import { zodResolver } from "@hookform/resolvers/zod"
import { magic } from "@perfolio/pkg/auth"
import { Field, Form, handleSubmit, useForm } from "@perfolio/ui/form"
import { z } from "zod"
import { MailIcon } from "@heroicons/react/outline"
import { Button, Drawer } from "@perfolio/ui/components"
import { useSignIn } from "@perfolio/pkg/hooks"
const validation = z.object({
  email: z.string().email(),
})

const SigninPage: NextPage = () => {
  const ctx = useForm<z.infer<typeof validation>>({
    mode: "onSubmit",
    resolver: zodResolver(validation),
  })
  const [formError, setFormError] = useState<string | React.ReactNode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const signIn = useSignIn()

  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div className="relative flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <Drawer isOpen={isOpen} height="75%">
        <Drawer.Content>
          <div className="flex items-center justify-center h-full py-20 md:h-screen">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary-light">
                <MailIcon className="w-10 h-10 text-primary" aria-hidden="true" />
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Check your mail
              </h1>
              <div className="mt-4 text-base text-gray-700">
                <p>
                  We emailed a magic link to <strong>{ctx.getValues("email")}</strong>
                </p>
                <p>Come back to this tab after you clicked the link in the email.</p>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer>
      <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
        <svg
          className="fill-current w-14 h-14"
          width="354"
          height="283"
          fill="fill-current"
          viewBox="0 0 354 283"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M247.35 70.671L176.678 0 0 176.678l35.336 35.336L176.678 70.671l35.336 35.336 35.336-35.336zM106.007 212.014l70.671 70.671 176.679-176.678-35.336-35.336-141.343 141.343-35.335-35.336-35.336 35.336z" />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Sign in to perfol.io
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Or{" "}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            start your 30-day free trial
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 sm:px-10">
          <Form ctx={ctx} formError={formError} className="flex flex-col items-start gap-4">
            <Field.Input placeholder="Email address" name="email" type="email" label="email" />

            <Button
              loading={submitting}
              disabled={submitting}
              onClick={() =>
                handleSubmit<z.infer<typeof validation>>(
                  ctx,
                  async ({ email }) => {
                    setOpen(true)

                    const didToken = await magic().auth.loginWithMagicLink({
                      email,
                      showUI: false,
                    })

                    if (!didToken) {
                      throw new Error("Token is null")
                    }

                    signIn.mutateAsync({ didToken })

                    setOpen(false)
                    router.push("/dashboard")
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

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-gray-50">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div>
                <a
                  href="#"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Twitter</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              <div>
                <button
                  onClick={async () => {
                    await magic().oauth.loginWithRedirect({
                      provider: "github",
                      redirectURI: window?.origin + "/auth/callback",
                      scope: ["user:email"],
                    })
                  }}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SigninPage
