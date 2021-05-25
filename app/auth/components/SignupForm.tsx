import { useMutation } from "blitz"
import { Input, AsyncButton } from "app/core/components"
import signup from "app/auth/mutations/signup"
import { useForm } from "react-hook-form"
import React from "react"
interface FormData {
  email: string
  password: string
}

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" })

  const [signupMutation] = useMutation(signup)

  const onSubmit = async (values: FormData) => {
    try {
      await signupMutation(values)
      onSuccess?.()
    } catch (error) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      }
    }
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-col-1">
      <Input
        type="email"
        label="Email"
        placeholder="my@email.com"
        register={register("email", {
          required: "Please enter your email",
          pattern: {
            value: emailRegex,
            message: "Please enter a valid email",
          },
        })}
        error={errors.email?.message}
      />
      <Input
        type="password"
        label="Password"
        register={register("password", {
          required: "Please enter a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />
      <AsyncButton size="auto" type="primary" label="Sign up" onClick={handleSubmit(onSubmit)} />
    </form>
  )
}
