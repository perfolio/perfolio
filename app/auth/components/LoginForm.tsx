import { useMutation } from "blitz"
import { Input, AsyncButton } from "app/core/components"
import login from "app/auth/mutations/login"
import { useForm } from "react-hook-form"
import React from "react"
interface FormData {
  email: string
  password: string
}

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" })
  const [loginMutation] = useMutation(login)
  const onSubmit = async (values: FormData) => {
    try {
      await loginMutation(values)
      onSuccess?.()
    } catch (err) {
      console.error(err)
    }
  }

  const emailRegex =
    /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
