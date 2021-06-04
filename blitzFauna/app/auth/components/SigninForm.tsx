import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField, Form, FORM_ERROR } from "app/core/components"

import signin from "app/auth/mutations/signin"
import { Signin } from "app/auth/validations"
import { LockClosedIcon, MailIcon } from "@heroicons/react/outline"
type SigninFormProps = {
  onSuccess?: () => void
}

export const SigninForm = (props: SigninFormProps) => {
  const [signinMutation] = useMutation(signin)
  return (
    <div>
      <Form
        submitText="Signin"
        schema={Signin}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signinMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " +
                  error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" iconLeft={<MailIcon />} />
        <LabeledTextField
          name="password"
          label="Password"
          type="password"
          iconLeft={<LockClosedIcon />}
        />
      </Form>

      <div className="flex items-center justify-between mt-4 text-sm">
        <Link href={Routes.SignupPage()}>Sign Up</Link>
        <Link href={Routes.ForgotPasswordPage()}>
          <a>Forgot your password?</a>
        </Link>
      </div>
    </div>
  )
}

export default SigninForm
