import { BlitzPage, useMutation, Link, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { AuthPageTemplate } from "../components/template"
import { MailIcon, CheckCircleIcon } from "@heroicons/react/outline"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <AuthPageTemplate
      h1={isSuccess ? "Password change requested" : "Request password reset"}
      h2={
        isSuccess
          ? " If your email is in our system, you will receive instructions to reset your password shortly."
          : "It happens.."
      }
    >
      <div>
        {isSuccess ? (
          <div className="flex items-center justify-center">
            <CheckCircleIcon className="w-20 text-success-500" />
          </div>
        ) : (
          <>
            <Form
              submitText="Send Reset Password Instructions"
              schema={ForgotPassword}
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error) {
                  return {
                    [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                  }
                }
              }}
            >
              <LabeledTextField name="email" label="Email" iconLeft={<MailIcon />} />
            </Form>
            <div className="flex items-center justify-between mt-4 text-sm">
              <Link href={Routes.LoginPage()}>Log in</Link>
              <Link href={Routes.SignupPage()}>Sign up</Link>
            </div>
          </>
        )}
      </div>
    </AuthPageTemplate>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"

export default ForgotPasswordPage
