import { useMutation, Link, Routes } from "blitz"
import { LabeledTextField, Form, FORM_ERROR } from "app/core/components"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { MailIcon, LockClosedIcon, UserIcon } from "@heroicons/react/outline"
type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {

            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" iconLeft={<MailIcon />} />
        <LabeledTextField name="name" label="Username" iconLeft={<UserIcon />} />
        <LabeledTextField
          name="password"
          label="Password"
          type="password"
          iconLeft={<LockClosedIcon />}
        />
      </Form>
      <div className="flex items-center justify-between mt-4 text-sm">
        <Link href={Routes.LoginPage()}>Log in</Link>
        <Link href={Routes.ForgotPasswordPage()}>
          <a>Forgot your password?</a>
        </Link>
      </div>
    </div>
  )
}

export default SignupForm
