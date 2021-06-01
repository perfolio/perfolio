import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import { Form, FORM_ERROR, LabeledTextField } from "app/core/components"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"

import { AuthPageTemplate } from "../components/template"
import { CheckIcon, LockClosedIcon } from "@heroicons/react/outline"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <AuthPageTemplate
      h1={isSuccess ? "Password Reset Successfully" : "Set a new password"}
      h2={
        isSuccess ? (
          <>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </>
        ) : (
          "asdb"
        )
      }
    >
      <div>
        {isSuccess ? (
          <div className="flex items-center justify-center">
            <CheckIcon className="w-20 text-gray-800" />
          </div>
        ) : (
          <Form
            submitText="Reset Password"
            schema={ResetPassword.omit({ token: true })}
            initialValues={{ password: "", passwordConfirmation: "" }}
            onSubmit={async (values) => {
              try {
                await resetPasswordMutation({
                  ...values,
                  token: query.token as string,
                })
              } catch (error) {
                if (error.name === "ResetPasswordError") {
                  return {
                    [FORM_ERROR]: error.message,
                  }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again.",
                  }
                }
              }
            }}
          >
            <LabeledTextField
              name="password"
              label="New Password"
              type="password"
              iconLeft={<LockClosedIcon />}
            />
            <LabeledTextField
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
              iconLeft={<LockClosedIcon />}
            />
          </Form>
        )}
      </div>
    </AuthPageTemplate>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
