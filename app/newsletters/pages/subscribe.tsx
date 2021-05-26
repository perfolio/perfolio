import { BlitzPage, useRouterQuery, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import * as z from "zod"

import { AuthPageTemplate } from "app/auth/components/template"
import { CheckIcon, MailIcon } from "@heroicons/react/outline"
import createSubscription from "../mutations/createSubscription"

const Validation = z.object({
  email: z.string().email(),
})

const ResetPasswordPage: BlitzPage = () => {
  const [subscribeMutation, { isSuccess }] = useMutation(createSubscription)

  return (
    <AuthPageTemplate
      h1={isSuccess ? "Thank you!" : "Stay in touch"}
      h2={isSuccess ? "We promise we will not spam." : "Nico mach was!"}
    >
      <div>
        {isSuccess ? (
          <div className="flex items-center justify-center">
            <CheckIcon className="w-20 text-gray-800" />
          </div>
        ) : (
          <Form
            submitText="Subscribe"
            schema={Validation}
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await subscribeMutation(values)
              } catch (error) {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" type="email" iconLeft={<MailIcon />} />
          </Form>
        )}
      </div>
    </AuthPageTemplate>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
