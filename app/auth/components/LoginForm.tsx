import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { LockClosedIcon, MailIcon } from "@heroicons/react/outline"
type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
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

export default LoginForm
